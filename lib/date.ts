/**
 * Publication dates, formatted the same way everywhere.
 *
 * Article dates are plain calendar days ("2026-01-15"), which `Date` parses as UTC
 * midnight. Formatting one without pinning the zone therefore renders it in whatever
 * timezone the machine happens to be in, so a build west of UTC prints the day before —
 * and, in a client component, a reader west of the server would hydrate a different day
 * than was served. Pinning to UTC makes the output depend only on the date itself.
 */

const LOCALE = 'en-GB'

export function formatDate(iso: string): string {
  return new Date(iso).toLocaleDateString(LOCALE, {
    day: 'numeric',
    month: 'long',
    year: 'numeric',
    timeZone: 'UTC',
  })
}

/** The same date, with the month abbreviated — for secondary metadata like "Updated". */
export function formatDateShort(iso: string): string {
  return new Date(iso).toLocaleDateString(LOCALE, {
    day: 'numeric',
    month: 'short',
    year: 'numeric',
    timeZone: 'UTC',
  })
}
