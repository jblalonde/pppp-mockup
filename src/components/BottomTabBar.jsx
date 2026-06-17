import Icon from './Icon.jsx'

/**
 * BottomTabBar — navigation par onglets (style app mobile native).
 * `tabs`: [{ id, label, icon }]. `active`: id de l'onglet courant.
 * Décoratif pour la maquette (seul l'onglet actif est mis en avant).
 */
export default function BottomTabBar({ tabs, active, onSelect }) {
  return (
    <div className="flex items-stretch justify-around border-t border-black/5 bg-cream px-2 pb-5 pt-2">
      {tabs.map((t) => {
        const isActive = t.id === active
        return (
          <button
            key={t.id}
            onClick={() => onSelect?.(t.id)}
            className={`flex flex-1 flex-col items-center gap-1 py-1 ${
              isActive ? 'text-forest' : 'text-neutral-400'
            }`}
          >
            <Icon name={t.icon} size={22} strokeWidth={isActive ? 2.1 : 1.7} />
            <span className={`text-[11px] ${isActive ? 'font-extrabold' : 'font-semibold'}`}>
              {t.label}
            </span>
          </button>
        )
      })}
    </div>
  )
}
