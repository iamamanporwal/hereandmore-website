import { NextResponse } from 'next/server'
import { site } from '@/lib/site'

export const runtime = 'nodejs'
export const dynamic = 'force-dynamic'

/**
 * Access requests.
 *
 * Delivery is configured with one environment variable and nothing else:
 *   ACCESS_WEBHOOK_URL   — anything that accepts a JSON POST (Slack, Zapier, a CRM, your own API)
 *   RESEND_API_KEY       — alternatively, send the request as email via Resend
 *
 * With neither set the submission is accepted and logged rather than silently dropped, and the
 * form tells the person to email instead. That way the page is never a dead end while the
 * plumbing is being connected.
 */

const MAX = { name: 120, email: 200, org: 160, idea: 4000 }

function clean(value: unknown, max: number): string {
  return typeof value === 'string' ? value.trim().slice(0, max) : ''
}

export async function POST(request: Request) {
  let payload: Record<string, unknown>
  try {
    payload = await request.json()
  } catch {
    return NextResponse.json({ ok: false, error: 'Could not read that request.' }, { status: 400 })
  }

  // Bots fill in every field they can see; people never see this one.
  if (clean(payload.company_website, 200)) {
    return NextResponse.json({ ok: true })
  }

  const name = clean(payload.name, MAX.name)
  const email = clean(payload.email, MAX.email)
  const org = clean(payload.org, MAX.org)
  const idea = clean(payload.idea, MAX.idea)

  const errors: Record<string, string> = {}
  if (!name) errors.name = 'Tell us your name.'
  if (!email) errors.email = 'We need an email address to reply to.'
  else if (!/^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(email)) errors.email = 'That does not look like an email address.'
  if (idea.length < 20) errors.idea = 'A sentence or two about what you want to build, please.'

  if (Object.keys(errors).length) {
    return NextResponse.json({ ok: false, errors }, { status: 422 })
  }

  const record = { name, email, org, idea, receivedAt: new Date().toISOString(), source: 'website /demo' }

  try {
    if (process.env.ACCESS_WEBHOOK_URL) {
      const res = await fetch(process.env.ACCESS_WEBHOOK_URL, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(record),
      })
      if (!res.ok) throw new Error(`webhook responded ${res.status}`)
      return NextResponse.json({ ok: true, delivered: true })
    }

    if (process.env.RESEND_API_KEY) {
      const res = await fetch('https://api.resend.com/emails', {
        method: 'POST',
        headers: {
          Authorization: `Bearer ${process.env.RESEND_API_KEY}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          from: process.env.ACCESS_FROM_EMAIL ?? `HERE & More <onboarding@resend.dev>`,
          to: [process.env.ACCESS_TO_EMAIL ?? site.email],
          reply_to: email,
          subject: `Access request — ${name}${org ? ` (${org})` : ''}`,
          text: `${name} <${email}>\n${org ? `${org}\n` : ''}\n${idea}\n\nReceived ${record.receivedAt}`,
        }),
      })
      if (!res.ok) throw new Error(`resend responded ${res.status}`)
      return NextResponse.json({ ok: true, delivered: true })
    }
  } catch (error) {
    // Never lose a request because the plumbing is misconfigured.
    console.error('[access] delivery failed', error, record)
    return NextResponse.json({ ok: true, delivered: false })
  }

  console.info('[access] no delivery configured; request received', record)
  return NextResponse.json({ ok: true, delivered: false })
}
