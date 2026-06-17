import Icon from './Icon.jsx'

/**
 * CallSheet — feuille (bottom sheet) déclenchée par l'action « Appel ».
 * Montre un numéro à composer (contact humain direct) et garde une seconde
 * porte vers un humain (clavardage), pour ne jamais enfermer l'utilisateur.
 */
const PHONE_DISPLAY = '514 555-0199'
const PHONE_TEL = '+15145550199'

export default function CallSheet({ onClose, onTalkToHuman }) {
  return (
    <div className="absolute inset-0 z-30 flex items-end" role="dialog">
      {/* Fond */}
      <button
        aria-label="Fermer"
        onClick={onClose}
        className="animate-fade absolute inset-0 bg-forest/45"
      />

      {/* Feuille */}
      <div className="animate-sheet relative w-full rounded-t-3xl bg-cream px-5 pb-8 pt-3">
        <div className="mx-auto mb-4 h-1.5 w-10 rounded-full bg-black/10" />

        <div className="flex flex-col items-center text-center">
          <div className="flex h-14 w-14 items-center justify-center rounded-full bg-forest text-cream">
            <Icon name="phone" size={26} />
          </div>
          <h2 className="mt-3 font-display text-xl font-semibold text-forest">
            Appeler la réception
          </h2>
          <p className="mt-1 text-sm text-neutral-500">
            Une personne de l’équipe vous répond directement.
          </p>

          <p className="mt-4 font-display text-3xl font-semibold tracking-tight text-forest">
            {PHONE_DISPLAY}
          </p>
          <p className="text-xs text-neutral-500">
            Lun. au ven., 8 h à 18 h · Sam. 9 h à 14 h
          </p>

          <a
            href={`tel:${PHONE_TEL}`}
            className="mt-4 flex w-full items-center justify-center gap-2 rounded-full bg-forest px-5 py-3.5 text-[15px] font-extrabold text-cream transition hover:bg-forest-deep active:scale-[0.98]"
          >
            <Icon name="phone" size={20} />
            Appeler maintenant
          </a>

          {/* Seconde porte vers un humain — toujours disponible */}
          <div className="my-3 flex w-full items-center gap-3 text-xs text-neutral-400">
            <span className="h-px flex-1 bg-black/10" />
            ou
            <span className="h-px flex-1 bg-black/10" />
          </div>
          <button
            onClick={onTalkToHuman}
            className="flex w-full items-center justify-center gap-2 rounded-full border border-forest/25 bg-white px-5 py-3 text-sm font-bold text-forest transition hover:bg-cream-card active:scale-[0.98]"
          >
            <Icon name="chat" size={18} />
            Parler à un humain par message
          </button>
        </div>
      </div>
    </div>
  )
}
