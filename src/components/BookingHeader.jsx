import Icon from './Icon.jsx'

/**
 * BookingHeader — en-tête forêt de la réservation : retour, titre (serif) et
 * progression segmentée.
 */
export default function BookingHeader({ title, step, total, onBack }) {
  return (
    <div className="bg-forest px-4 pb-4 pt-1">
      <div className="flex items-center gap-2">
        <button
          onClick={onBack}
          className="flex h-9 w-9 items-center justify-center rounded-full text-mint transition active:scale-95"
          aria-label="Retour"
        >
          <Icon name="chevronLeft" size={22} strokeWidth={2.2} />
        </button>
        <h1 className="flex-1 font-display text-[18px] font-semibold text-cream">
          {title}
        </h1>
      </div>
      {total > 0 && (
        <div className="mt-2 flex gap-1.5 px-1">
          {Array.from({ length: total }).map((_, i) => (
            <span
              key={i}
              className={`h-1.5 flex-1 rounded-full transition ${
                i < step ? 'bg-coral' : 'bg-forest-line'
              }`}
            />
          ))}
        </div>
      )}
    </div>
  )
}
