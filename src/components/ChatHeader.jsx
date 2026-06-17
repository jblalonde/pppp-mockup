/**
 * ChatHeader — en-tête de la conversation avec branding du réseau de cliniques.
 * Le bouton "Parler à un humain" est TOUJOURS visible (point clé du cadrage :
 * garder l'option humaine accessible en tout temps).
 */
export default function ChatHeader({ onTalkToHuman, onClose }) {
  return (
    <div className="sticky top-0 z-10 border-b border-black/5 bg-white/90 px-4 py-3 backdrop-blur">
      <div className="flex items-center gap-3">
        {onClose && (
          <button
            onClick={onClose}
            className="-ml-1 flex h-9 w-9 items-center justify-center rounded-full text-brand-700 transition hover:bg-brand-50 active:scale-95"
            aria-label="Fermer"
          >
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
              <path
                d="M15 18l-6-6 6-6"
                stroke="currentColor"
                strokeWidth="2.2"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </button>
        )}
        <div className="flex h-10 w-10 items-center justify-center rounded-full bg-brand-100 text-xl">
          🐾
        </div>
        <div className="min-w-0 flex-1">
          <div className="flex items-center gap-1.5">
            <h1 className="truncate text-[15px] font-extrabold text-brand-800">
              VétéSoin
            </h1>
            <span className="inline-block h-2 w-2 rounded-full bg-brand-400" />
          </div>
          <p className="truncate text-xs text-neutral-500">
            Assistant · répond en quelques secondes
          </p>
        </div>
        <button
          onClick={onTalkToHuman}
          className="flex shrink-0 items-center gap-1.5 rounded-full border border-brand-200 bg-white px-3 py-1.5 text-xs font-bold text-brand-700 transition hover:bg-brand-50 active:scale-95"
        >
          <span className="text-sm">💬</span>
          Parler à un humain
        </button>
      </div>
    </div>
  )
}
