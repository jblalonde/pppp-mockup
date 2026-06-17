import Icon from './Icon.jsx'

/**
 * ChatHeader — en-tête forêt de la conversation. Branding + statut.
 * Le bouton "Parler à un humain" est TOUJOURS visible (garder l'option
 * humaine accessible en tout temps). `onClose` (optionnel) ferme le chat.
 */
export default function ChatHeader({ onTalkToHuman, onClose }) {
  return (
    <div className="bg-forest px-4 pb-3 pt-1">
      <div className="flex items-center gap-3">
        {onClose && (
          <button
            onClick={onClose}
            className="-ml-1 flex h-9 w-9 items-center justify-center rounded-full text-mint transition active:scale-95"
            aria-label="Fermer"
          >
            <Icon name="chevronLeft" size={22} strokeWidth={2.2} />
          </button>
        )}
        <div className="flex h-10 w-10 items-center justify-center rounded-full bg-forest-soft text-mint">
          <Icon name="paw" size={20} />
        </div>
        <div className="min-w-0 flex-1">
          <h1 className="truncate font-display text-[17px] font-semibold text-cream">
            Assistant VétéSoin
          </h1>
          <p className="flex items-center gap-1.5 truncate text-xs text-mint">
            <span className="inline-block h-1.5 w-1.5 rounded-full bg-mint" />
            En ligne · répond en quelques secondes
          </p>
        </div>
        <button
          onClick={onTalkToHuman}
          className="shrink-0 rounded-full bg-cream px-3 py-1.5 text-xs font-bold text-forest transition hover:bg-white active:scale-95"
        >
          Parler à un humain
        </button>
      </div>
    </div>
  )
}
