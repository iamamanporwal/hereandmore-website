'use client'

import { useState } from 'react'
import { site } from '@/lib/site'
import { Arrow } from './Icon'

type Errors = Partial<Record<'name' | 'email' | 'idea' | 'form', string>>

/**
 * The access request form.
 *
 * Progressive by construction: it is a real <form> with a real action, so it degrades to a
 * normal submission if the JavaScript never arrives. Errors are announced, the first invalid
 * field takes focus, and a failed delivery still tells the person how to reach us rather than
 * swallowing their message.
 */
export function AccessForm() {
  const [state, setState] = useState<'idle' | 'sending' | 'sent'>('idle')
  const [errors, setErrors] = useState<Errors>({})
  const [delivered, setDelivered] = useState(true)

  async function onSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault()
    const form = event.currentTarget
    const data = Object.fromEntries(new FormData(form))
    setState('sending')
    setErrors({})

    try {
      const res = await fetch('/api/access', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
      })
      const body = await res.json()
      if (!res.ok) {
        setErrors(body.errors ?? { form: 'Something went wrong. Please email us instead.' })
        setState('idle')
        const first = Object.keys(body.errors ?? {})[0]
        if (first) form.querySelector<HTMLElement>(`[name="${first}"]`)?.focus()
        return
      }
      setDelivered(body.delivered !== false)
      setState('sent')
      form.reset()
    } catch {
      setErrors({ form: 'We could not reach the server. Please email us instead.' })
      setState('idle')
    }
  }

  if (state === 'sent') {
    return (
      <div className="form-done" role="status">
        <h3 className="h-ui">Thank you — that is enough to start.</h3>
        <p>
          {delivered
            ? 'A person reads every one of these, usually the same day. We will reply with what is shipped, what is roadmap, and a real number for your group.'
            : `Your request was received but our notification did not go through. To be certain we see it, send the same thing to ${site.email}.`}
        </p>
      </div>
    )
  }

  return (
    <form className="form" onSubmit={onSubmit} action="/api/access" method="post" noValidate>
      <p className="form__intro">
        Two paragraphs is plenty. What you want to build, and what has stopped it so far.
      </p>

      <div className="field">
        <label htmlFor="af-name">Your name</label>
        <input id="af-name" name="name" type="text" autoComplete="name" required aria-describedby={errors.name ? 'af-name-err' : undefined} aria-invalid={errors.name ? true : undefined} />
        {errors.name ? <p className="field__error" id="af-name-err">{errors.name}</p> : null}
      </div>

      <div className="field">
        <label htmlFor="af-email">Email</label>
        <input id="af-email" name="email" type="email" autoComplete="email" required aria-describedby={errors.email ? 'af-email-err' : undefined} aria-invalid={errors.email ? true : undefined} />
        {errors.email ? <p className="field__error" id="af-email-err">{errors.email}</p> : null}
      </div>

      <div className="field">
        <label htmlFor="af-org">
          Company or group <span className="field__optional">optional</span>
        </label>
        <input id="af-org" name="org" type="text" autoComplete="organization" />
      </div>

      <div className="field">
        <label htmlFor="af-idea">What do you want to build?</label>
        <textarea id="af-idea" name="idea" rows={5} required aria-describedby={errors.idea ? 'af-idea-err' : undefined} aria-invalid={errors.idea ? true : undefined} />
        {errors.idea ? <p className="field__error" id="af-idea-err">{errors.idea}</p> : null}
      </div>

      {/* Not shown to people; bots fill in everything they can find. */}
      <div className="field field--trap" aria-hidden="true">
        <label htmlFor="af-cw">Company website</label>
        <input id="af-cw" name="company_website" type="text" tabIndex={-1} autoComplete="off" />
      </div>

      {errors.form ? <p className="field__error" role="alert">{errors.form}</p> : null}

      <button className="btn btn--primary" type="submit" disabled={state === 'sending'}>
        {state === 'sending' ? 'Sending…' : 'Send it'} <Arrow />
      </button>

      <p className="form__note">
        Or email <a href={`mailto:${site.email}`}>{site.email}</a> directly. We never add you to a
        marketing list.
      </p>
    </form>
  )
}
