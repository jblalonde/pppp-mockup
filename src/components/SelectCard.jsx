/**
 * SelectCard — rangée sélectionnable (clinique, service…).
 * Affiche un état sélectionné net pour guider le choix.
 */
export default function SelectCard({ icon, title, subtitle, trailing, selected, onClick }) {
  return (
    <button
      onClick={onClick}
      className={[
        'flex w-full items-center gap-3 rounded-2xl border px-3.5 py-3 text-left transition active:scale-[0.99]',
        selected
          ? 'border-brand-500 bg-brand-50 ring-2 ring-brand-500/30'
          : 'border-black/5 bg-white hover:border-brand-200',
      ].join(' ')}
    >
      {icon && (
        <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-brand-100 text-xl">
          {icon}
        </div>
      )}
      <div className="min-w-0 flex-1">
        <div className="truncate text-[14px] font-bold text-neutral-800">
          {title}
        </div>
        {subtitle && (
          <div className="truncate text-xs text-neutral-500">{subtitle}</div>
        )}
      </div>
      {trailing && (
        <span className="shrink-0 text-xs font-semibold text-neutral-400">
          {trailing}
        </span>
      )}
      {selected && (
        <span className="flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-brand-500 text-white">
          <svg width="12" height="12" viewBox="0 0 24 24" fill="none">
            <path
              d="M5 13l4 4L19 7"
              stroke="currentColor"
              strokeWidth="3"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </span>
      )}
    </button>
  )
}
