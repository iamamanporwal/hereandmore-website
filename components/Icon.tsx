import type { IconName } from '@/lib/content/types'

const paths: Record<IconName, string> = {
  aim: 'M12 3v3m0 12v3M3 12h3m12 0h3M12 8a4 4 0 1 0 0 8 4 4 0 0 0 0-8Z',
  people: 'M9 11a3 3 0 1 0 0-6 3 3 0 0 0 0 6Zm8 8v-1a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v1m15-11a3 3 0 0 1 0 6m5 5v-1a4 4 0 0 0-3-3.87',
  layers: 'm12 3 9 5-9 5-9-5 9-5Zm9 9-9 5-9-5m18 4-9 5-9-5',
  broadcast: 'M5.6 5.6a9 9 0 0 0 0 12.8M18.4 5.6a9 9 0 0 1 0 12.8M8.5 8.5a5 5 0 0 0 0 7m7-7a5 5 0 0 1 0 7M12 11a1 1 0 1 0 0 2 1 1 0 0 0 0-2Z',
  record: 'M4 5h16v14H4zM4 9h16M9 13h7M9 16h4',
  map: 'm9 4-6 3v13l6-3 6 3 6-3V4l-6 3-6-3Zm0 0v13m6-10v13',
  shield: 'M12 3 4 6v6c0 4.5 3.2 8.3 8 9 4.8-.7 8-4.5 8-9V6l-8-3Zm-3 9 2 2 4-4',
  spark: 'M12 3v5m0 8v5M5.6 5.6l3.5 3.5m5.8 5.8 3.5 3.5M3 12h5m8 0h5M5.6 18.4l3.5-3.5m5.8-5.8 3.5-3.5',
  contract: 'M7 3h7l5 5v13H7zM14 3v5h5M10 13h6m-6 4h4',
  clock: 'M12 3a9 9 0 1 0 0 18 9 9 0 0 0 0-18Zm0 4v5l3 2',
}

export function Icon({ name, size = 22 }: { name: IconName; size?: number }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.3"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
      focusable="false"
    >
      <path d={paths[name]} />
    </svg>
  )
}

export function Arrow() {
  return (
    <svg className="arrow" width="14" height="14" viewBox="0 0 14 14" fill="none" stroke="currentColor" strokeWidth="1.4" aria-hidden="true">
      <path d="M2 7h10M8 3l4 4-4 4" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  )
}
