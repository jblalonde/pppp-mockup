/**
 * PerspectiveSwitcher — bascule de haut niveau entre les deux points de vue de
 * la démo : ce que voit le CLIENT vs ce que voit l'ÉQUIPE de réception.
 */
const VIEWS = [
  { id: 'client', icon: '📱', label: 'Expérience client' },
  { id: 'team', icon: '📨', label: 'Réception équipe' },
]

export default function PerspectiveSwitcher({ value, onChange, badge = 0 }) {
  return (
    <div className="flex gap-1 rounded-full bg-white p-1 shadow-md">
      {VIEWS.map((v) => (
        <button
          key={v.id}
          onClick={() => onChange(v.id)}
          className={[
            'relative flex items-center gap-2 rounded-full px-5 py-2.5 text-sm font-bold transition',
            value === v.id
              ? 'bg-forest text-cream'
              : 'text-forest/50 hover:bg-cream-card',
          ].join(' ')}
        >
          <span>{v.icon}</span>
          {v.label}
          {v.id === 'team' && badge > 0 && (
            <span className="flex h-5 min-w-5 items-center justify-center rounded-full bg-coral px-1.5 text-[11px] font-bold text-cream">
              {badge}
            </span>
          )}
        </button>
      ))}
    </div>
  )
}
