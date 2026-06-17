/**
 * BookingHeader — en-tête de l'écran de réservation : retour, titre et
 * progression (barre segmentée selon l'étape courante).
 */
export default function BookingHeader({ title, step, total, onBack }) {
  return (
    <div className="sticky top-0 z-10 border-b border-black/5 bg-white/90 px-4 pb-3 pt-1 backdrop-blur">
      <div className="flex items-center gap-2">
        <button
          onClick={onBack}
          className="flex h-9 w-9 items-center justify-center rounded-full text-brand-700 transition hover:bg-brand-50 active:scale-95"
          aria-label="Retour"
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
        <h1 className="flex-1 text-[15px] font-extrabold text-brand-800">
          {title}
        </h1>
      </div>
      {total > 0 && (
        <div className="mt-2 flex gap-1.5 px-1">
          {Array.from({ length: total }).map((_, i) => (
            <span
              key={i}
              className={`h-1.5 flex-1 rounded-full transition ${
                i < step ? 'bg-brand-500' : 'bg-brand-100'
              }`}
            />
          ))}
        </div>
      )}
    </div>
  )
}
