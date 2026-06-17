/** Barre d'état iOS factice — ajoute du réalisme au cadre mobile. */
export default function StatusBar({ dark = false }) {
  const color = dark ? 'text-white' : 'text-neutral-800'
  return (
    <div
      className={`flex items-center justify-between px-7 pt-3 pb-1 text-[13px] font-semibold ${color}`}
    >
      <span>9:41</span>
      <div className="flex items-center gap-1.5">
        {/* Réseau */}
        <svg width="17" height="11" viewBox="0 0 17 11" fill="currentColor">
          <rect x="0" y="7" width="3" height="4" rx="1" />
          <rect x="4.5" y="5" width="3" height="6" rx="1" />
          <rect x="9" y="2.5" width="3" height="8.5" rx="1" />
          <rect x="13.5" y="0" width="3" height="11" rx="1" />
        </svg>
        {/* Wifi */}
        <svg width="16" height="11" viewBox="0 0 16 12" fill="currentColor">
          <path d="M8 2.2c2.3 0 4.4.9 6 2.4l-1.2 1.3A6.7 6.7 0 0 0 8 4 6.7 6.7 0 0 0 3.2 5.9L2 4.6A8.7 8.7 0 0 1 8 2.2Zm0 3.4c1.4 0 2.6.5 3.6 1.4l-1.3 1.3A3.3 3.3 0 0 0 8 7.3c-.9 0-1.7.3-2.3.9L4.4 6.9A5.1 5.1 0 0 1 8 5.6Zm0 3.3c.6 0 1.1.2 1.5.6L8 10.9 6.5 9.5c.4-.4.9-.6 1.5-.6Z" />
        </svg>
        {/* Batterie */}
        <svg width="26" height="13" viewBox="0 0 26 13" fill="none">
          <rect
            x="0.5"
            y="0.5"
            width="22"
            height="12"
            rx="3.5"
            stroke="currentColor"
            opacity="0.4"
          />
          <rect x="2" y="2" width="17" height="9" rx="2" fill="currentColor" />
          <rect
            x="24"
            y="4"
            width="1.5"
            height="5"
            rx="0.75"
            fill="currentColor"
            opacity="0.4"
          />
        </svg>
      </div>
    </div>
  )
}
