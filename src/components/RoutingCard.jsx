/**
 * RoutingCard — confirmation CÔTÉ CLIENT que la demande a été acheminée à une
 * personne nommée avec un rôle (principe : boucle fermée + dé-anonymisation).
 */
export default function RoutingCard({ staff, note }) {
  return (
    <div className="rounded-2xl border-l-4 border-coral bg-white p-3.5 shadow-sm">
      <div className="mb-2.5 flex items-center gap-1.5 text-xs font-bold text-coral">
        <span>✅</span>
        <span>Demande acheminée</span>
      </div>
      <div className="flex items-center gap-3">
        <div
          className={`flex h-11 w-11 items-center justify-center rounded-full text-xl ${staff.tint}`}
        >
          {staff.emoji}
        </div>
        <div className="min-w-0 flex-1">
          <p className="truncate text-sm font-extrabold text-forest">
            {staff.name}
          </p>
          <p className="truncate text-xs text-neutral-500">{staff.role}</p>
        </div>
      </div>
      <p className="mt-2.5 rounded-lg bg-cream-card px-3 py-2 text-xs text-neutral-600">
        {note}
      </p>
    </div>
  )
}
