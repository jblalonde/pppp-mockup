/**
 * Icon — petit jeu d'icônes au trait (style ligne), couleur héritée via
 * `currentColor`. Utilisé pour les tuiles d'action et la navigation.
 */
const PATHS = {
  bag: (
    <>
      <rect x="3" y="8" width="18" height="12" rx="2.5" />
      <path d="M8 8V6.5A2.5 2.5 0 0 1 10.5 4h3A2.5 2.5 0 0 1 16 6.5V8" />
      <path d="M12 12v4M10 14h4" />
    </>
  ),
  alert: (
    <>
      <path d="M12 4l8.5 14.5a1 1 0 0 1-.87 1.5H4.37a1 1 0 0 1-.87-1.5L12 4z" />
      <path d="M12 10v4" />
      <circle cx="12" cy="17" r="0.4" fill="currentColor" />
    </>
  ),
  chat: (
    <>
      <path d="M4 6a2 2 0 0 1 2-2h12a2 2 0 0 1 2 2v8a2 2 0 0 1-2 2H9l-4 3.5V16H6a2 2 0 0 1-2-2z" />
      <path d="M9 10h.01M12.5 10h.01M16 10h.01" />
    </>
  ),
  phone: (
    <path d="M6.5 4h3l1.5 4-2 1.5a11 11 0 0 0 5 5L15.5 12l4 1.5v3a1.5 1.5 0 0 1-1.6 1.5A14 14 0 0 1 5 6.1 1.5 1.5 0 0 1 6.5 4z" />
  ),
  video: (
    <>
      <rect x="3" y="6" width="12" height="12" rx="2.5" />
      <path d="M15 10.5l5-3v9l-5-3" />
    </>
  ),
  pill: (
    <>
      <rect x="3.5" y="9" width="17" height="6" rx="3" transform="rotate(45 12 12)" />
      <path d="M9 9l6 6" />
    </>
  ),
  home: (
    <>
      <path d="M4 11l8-6.5 8 6.5" />
      <path d="M6 10v9.5h12V10" />
    </>
  ),
  record: (
    <>
      <path d="M7 3h11a1 1 0 0 1 1 1v16a1 1 0 0 1-1 1H7a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2z" />
      <path d="M5 19a2 2 0 0 1 2-2h12" />
    </>
  ),
  plan: (
    <>
      <rect x="3" y="7" width="18" height="13" rx="2" />
      <path d="M9 7V5.5A1.5 1.5 0 0 1 10.5 4h3A1.5 1.5 0 0 1 15 5.5V7" />
    </>
  ),
  user: (
    <>
      <circle cx="12" cy="8.5" r="3.5" />
      <path d="M5 20c0-3.5 3.1-5.5 7-5.5s7 2 7 5.5" />
    </>
  ),
  bell: (
    <>
      <path d="M6 9.5a6 6 0 0 1 12 0c0 4 1.5 5.5 2 6H4c.5-.5 2-2 2-6z" />
      <path d="M10 20a2 2 0 0 0 4 0" />
    </>
  ),
  calendar: (
    <>
      <rect x="3.5" y="5" width="17" height="16" rx="2.5" />
      <path d="M3.5 9.5h17M8 3v4M16 3v4" />
    </>
  ),
  check: <path d="M5 13l4 4L19 7" />,
  chevronLeft: <path d="M15 18l-6-6 6-6" />,
  chevronRight: <path d="M9 6l6 6-6 6" />,
  plus: <path d="M12 5v14M5 12h14" />,
  paw: (
    <>
      <circle cx="7" cy="10" r="1.6" fill="currentColor" stroke="none" />
      <circle cx="12" cy="8" r="1.6" fill="currentColor" stroke="none" />
      <circle cx="17" cy="10" r="1.6" fill="currentColor" stroke="none" />
      <path
        d="M12 12c-2.5 0-4.5 1.8-4.5 4 0 1.6 1.6 2.4 4.5 2.4s4.5-.8 4.5-2.4c0-2.2-2-4-4.5-4z"
        fill="currentColor"
        stroke="none"
      />
    </>
  ),
  pin: (
    <>
      <path d="M12 21s7-6 7-11a7 7 0 0 0-14 0c0 5 7 11 7 11z" />
      <circle cx="12" cy="10" r="2.5" />
    </>
  ),
  stethoscope: (
    <>
      <path d="M6 4v5a4 4 0 0 0 8 0V4" />
      <path d="M10 17a4 4 0 0 0 8 0v-2" />
      <circle cx="18" cy="13" r="2" />
    </>
  ),
}

export default function Icon({ name, size = 22, strokeWidth = 1.7, className = '' }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={strokeWidth}
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
    >
      {PATHS[name] ?? null}
    </svg>
  )
}
