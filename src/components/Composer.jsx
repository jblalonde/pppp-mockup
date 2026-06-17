/**
 * Composer — barre de saisie en bas de la conversation.
 * Visuelle (non fonctionnelle) : crédibilise le chatbot tout en gardant le
 * parti pris "réponses rapides" comme interaction principale.
 */
export default function Composer() {
  return (
    <div className="border-t border-black/5 bg-white px-3 py-2.5">
      <div className="flex items-center gap-2">
        <div className="flex flex-1 items-center rounded-full bg-cream-deep px-4 py-2.5">
          <span className="text-sm text-neutral-400">Écrire un message…</span>
        </div>
        <button className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-brand-600 text-white transition active:scale-95">
          <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
            <path d="M3.4 20.4 21.5 12 3.4 3.6 3.4 10l11 2-11 2z" />
          </svg>
        </button>
      </div>
    </div>
  )
}
