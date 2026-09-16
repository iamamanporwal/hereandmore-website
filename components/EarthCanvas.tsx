'use client'

import { useEffect, useRef, useState } from 'react'

/**
 * Earth, rendered as a single WebGL2 fragment shader.
 *
 * An orthographic sphere: for every pixel inside the disc the surface normal is recovered
 * analytically, so there is no geometry, no raymarching and no texture to download — one draw
 * call over one quad. Continents come from domain-warped fbm sampled on the rotated normal, so
 * they are organic and seamless rather than a scatter of dots.
 *
 * Cost control: renders at 0.75× CSS resolution with DPR capped at 1.5, and the loop stops
 * entirely whenever the section is off screen or the tab is hidden.
 */

const VERT = `#version 300 es
in vec2 p; void main(){ gl_Position = vec4(p, 0.0, 1.0); }`

const FRAG = `#version 300 es
precision highp float;
out vec4 frag;
uniform vec2 uCenter;      // sphere centre, in pixels
uniform float uRadius;     // sphere radius, in pixels
uniform vec2 uRes;
uniform float uTime;
uniform int uOctaves;

const vec3 L = normalize(vec3(-0.30, 0.26, -0.92));  // sun almost directly behind: we see the
                                                    // night face, lit only along a crescent limb

float hash(vec3 p){
  p = fract(p * 0.3183099 + vec3(0.71, 0.113, 0.419));
  p *= 17.0;
  return fract(p.x * p.y * p.z * (p.x + p.y + p.z));
}
float noise(vec3 x){
  vec3 i = floor(x), f = fract(x);
  f = f * f * (3.0 - 2.0 * f);
  return mix(mix(mix(hash(i), hash(i + vec3(1,0,0)), f.x),
                 mix(hash(i + vec3(0,1,0)), hash(i + vec3(1,1,0)), f.x), f.y),
             mix(mix(hash(i + vec3(0,0,1)), hash(i + vec3(1,0,1)), f.x),
                 mix(hash(i + vec3(0,1,1)), hash(i + vec3(1,1,1)), f.x), f.y), f.z);
}
float fbm(vec3 p, int oct){
  float a = 0.5, s = 0.0;
  for (int i = 0; i < 6; i++){
    if (i >= oct) break;
    s += a * noise(p);
    p *= 2.03;
    a *= 0.5;
  }
  return s;
}
mat3 rotY(float a){ float c = cos(a), s = sin(a); return mat3(c,0,-s, 0,1,0, s,0,c); }

void main(){
  vec2 frag2 = gl_FragCoord.xy;
  vec2 q = (frag2 - uCenter) / uRadius;
  float d = length(q);

  vec3 col = vec3(0.004, 0.012, 0.018);

  // Starfield, only outside the disc.
  if (d > 1.0){
    vec2 sp = floor(frag2 / 3.0);
    float st = hash(vec3(sp, 1.0));
    if (st > 0.9975){
      float tw = 0.55 + 0.45 * sin(uTime * 0.0013 + st * 90.0);
      col += vec3(0.78, 0.86, 0.95) * (st - 0.9975) * 360.0 * tw;
    }
  }

  // Atmosphere: a rim OUTSIDE the limb. Gating it matters — ungated, this term sits at full
  // strength across the whole disc and washes the night face blue.
  float outside = smoothstep(0.986, 1.016, d);
  float halo = (exp(-max(0.0, d - 1.0) * 26.0) * 0.6 + exp(-max(0.0, d - 1.0) * 7.0) * 0.18) * outside;
  vec3 air = vec3(0.35, 0.66, 0.92);

  if (d < 1.0){
    // Analytic normal for an orthographic sphere.
    vec3 n = vec3(q, sqrt(max(0.0, 1.0 - d * d)));
    float ndl = dot(n, L);

    vec3 rot = rotY(uTime * 0.000042) * n;

    // Domain-warped fbm: warping is what turns noise blobs into coastlines.
    vec3 warp = vec3(fbm(rot * 1.1 + 11.0, uOctaves), fbm(rot * 1.1 + 23.0, uOctaves), fbm(rot * 1.1 + 37.0, uOctaves));
    float h = fbm(rot * 1.9 + warp * 1.25, uOctaves);
    float land = smoothstep(0.50, 0.565, h);
    float shore = smoothstep(0.47, 0.51, h) * (1.0 - land);

    vec3 ocean = mix(vec3(0.016, 0.055, 0.115), vec3(0.03, 0.12, 0.2), smoothstep(0.34, 0.5, h));
    vec3 ground = mix(vec3(0.14, 0.17, 0.10), vec3(0.28, 0.25, 0.15), smoothstep(0.55, 0.72, h));
    ground = mix(ground, vec3(0.42, 0.40, 0.33), smoothstep(0.70, 0.80, h));
    vec3 albedo = mix(ocean, ground, land) + vec3(0.18, 0.20, 0.16) * shore;

    float day = max(0.0, ndl);
    vec3 lit = albedo * day * 0.95;

    // Specular glint, on water only.
    vec3 h2 = normalize(L + vec3(0.0, 0.0, 1.0));
    float spec = pow(max(0.0, dot(n, h2)), 90.0) * (1.0 - land) * day;
    lit += vec3(0.5, 0.62, 0.72) * spec * 0.7;

    // Terminator scattering: the warm band where the sun grazes the surface. This is the
    // detail that reads as a real planet rather than a lit ball.
    float band = exp(-pow(ndl / 0.07, 2.0));
    lit += vec3(0.98, 0.47, 0.18) * band * 0.4;

    // Night side: city light clustered onto land by a thresholded second fbm.
    float night = smoothstep(0.06, -0.24, ndl);
    float pop = fbm(rot * 8.0 + 5.0, uOctaves);
    float cities = smoothstep(0.52, 0.70, pop) * land * night;
    float flicker = 0.86 + 0.14 * sin(uTime * 0.0016 + pop * 120.0);
    lit += vec3(1.0, 0.72, 0.36) * cities * 3.6 * flicker;
    lit += vec3(1.0, 0.58, 0.22) * cities * 1.1;

    // Cloud deck on its own slower rotation, lit and casting a soft shadow.
    vec3 crot = rotY(uTime * 0.000027 + 1.7) * n;
    float cl = fbm(crot * 2.6 + vec3(0.0, uTime * 0.000008, 0.0), uOctaves);
    float cloud = smoothstep(0.52, 0.70, cl);
    lit = mix(lit, vec3(0.84, 0.88, 0.92) * (day * 1.1 + band * 0.18), cloud * (0.22 + 0.55 * day));
    lit *= 1.0 - cloud * 0.12 * (1.0 - day) * (1.0 - cities);

    // Limb darkening and the inner edge of the atmosphere.
    float fres = pow(1.0 - n.z, 3.0);
    lit *= mix(1.0, 0.62, fres * 0.7);
    lit += air * fres * (0.03 + 0.66 * max(0.0, ndl)) * 0.38;

    col = lit;
  }

  col += air * halo * (0.18 + 0.82 * smoothstep(-0.2, 0.9, -q.x + q.y));
  // Gentle filmic shoulder so the bright limb does not clip to a hard white edge.
  col = col / (col + 0.85) * 1.34;
  frag = vec4(col, 1.0);
}`

function compile(gl: WebGL2RenderingContext, type: number, src: string) {
  const sh = gl.createShader(type)!
  gl.shaderSource(sh, src)
  gl.compileShader(sh)
  if (!gl.getShaderParameter(sh, gl.COMPILE_STATUS)) {
    gl.deleteShader(sh)
    return null
  }
  return sh
}

export function EarthCanvas() {
  const ref = useRef<HTMLCanvasElement>(null)
  const [live, setLive] = useState(false)

  useEffect(() => {
    const canvas = ref.current
    if (!canvas) return
    const gl = canvas.getContext('webgl2', { antialias: false, alpha: false, powerPreference: 'low-power' })
    if (!gl) return

    const vs = compile(gl, gl.VERTEX_SHADER, VERT)
    const fs = compile(gl, gl.FRAGMENT_SHADER, FRAG)
    if (!vs || !fs) return
    const prog = gl.createProgram()!
    gl.attachShader(prog, vs)
    gl.attachShader(prog, fs)
    gl.linkProgram(prog)
    if (!gl.getProgramParameter(prog, gl.LINK_STATUS)) return
    gl.useProgram(prog)

    const buf = gl.createBuffer()
    gl.bindBuffer(gl.ARRAY_BUFFER, buf)
    gl.bufferData(gl.ARRAY_BUFFER, new Float32Array([-1, -1, 3, -1, -1, 3]), gl.STATIC_DRAW)
    const loc = gl.getAttribLocation(prog, 'p')
    gl.enableVertexAttribArray(loc)
    gl.vertexAttribPointer(loc, 2, gl.FLOAT, false, 0, 0)

    const u = {
      center: gl.getUniformLocation(prog, 'uCenter'),
      radius: gl.getUniformLocation(prog, 'uRadius'),
      res: gl.getUniformLocation(prog, 'uRes'),
      time: gl.getUniformLocation(prog, 'uTime'),
      oct: gl.getUniformLocation(prog, 'uOctaves'),
    }

    const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    let w = 0
    let h = 0

    const resize = () => {
      const r = canvas.getBoundingClientRect()
      const dpr = Math.min(window.devicePixelRatio || 1, 1.5)
      const scale = 0.75
      w = Math.max(1, Math.round(r.width * dpr * scale))
      h = Math.max(1, Math.round(r.height * dpr * scale))
      canvas.width = w
      canvas.height = h
      gl.viewport(0, 0, w, h)
      gl.uniform2f(u.res, w, h)
      // Cropped by the page edge: centred right of middle and mostly below the fold of the
      // section, so we are looking at part of a planet rather than a logo.
      // Shallow enough a crop that we see the disc interior, not only its limb — the
      // night face and its city lights live in the interior.
      gl.uniform2f(u.center, w * 0.62, -h * 0.2)
      gl.uniform1f(u.radius, Math.max(w, h) * 0.54)
      gl.uniform1i(u.oct, r.width < 768 ? 3 : 5)
    }

    const draw = (t: number) => {
      gl.uniform1f(u.time, t)
      gl.drawArrays(gl.TRIANGLES, 0, 3)
    }

    resize()
    draw(0)
    setLive(true)

    if (reduced) return () => {}

    let raf = 0
    let running = false
    const loop = (now: number) => {
      if (!running) return
      draw(now)
      raf = requestAnimationFrame(loop)
    }
    const start = () => {
      if (running) return
      running = true
      raf = requestAnimationFrame(loop)
    }
    const stop = () => {
      running = false
      cancelAnimationFrame(raf)
    }

    // Never burn a frame on a planet nobody is looking at.
    const io = new IntersectionObserver((e) => (e[0].isIntersecting && !document.hidden ? start() : stop()), { threshold: 0.01 })
    io.observe(canvas)
    const onVis = () => (document.hidden ? stop() : io.takeRecords(), undefined)
    document.addEventListener('visibilitychange', onVis)
    const ro = new ResizeObserver(() => {
      resize()
      if (!running) draw(performance.now())
    })
    ro.observe(canvas)

    return () => {
      stop()
      io.disconnect()
      ro.disconnect()
      document.removeEventListener('visibilitychange', onVis)
    }
  }, [])

  return <canvas ref={ref} className="earth__gl" data-live={live || undefined} aria-hidden="true" />
}
