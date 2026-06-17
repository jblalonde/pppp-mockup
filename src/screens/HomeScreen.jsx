import StatusBar from '../components/StatusBar.jsx'

/**
 * HomeScreen — accueil "menu classique" de la VARIANTE 1 (assistant optionnel).
 * L'app s'ouvre sur des actions directes ; le chatbot reste accessible via une
 * bulle discrète (FAB) en bas à droite — il assiste, il n'est pas la porte
 * d'entrée.
 */
const ACTIONS = [
  { id: 'rdv', icon: '📅', label: 'Prendre rendez-vous', tint: 'bg-brand-100' },
  { id: 'vaccin', icon: '💉', label: 'Rappels de vaccins', tint: 'bg-sky-100' },
  { id: 'prescription', icon: '💊', label: 'Renouveler une prescription', tint: 'bg-amber-100' },
  { id: 'animaux', icon: '🐾', label: 'Mes animaux', tint: 'bg-rose-100' },
]

export default function HomeScreen({ onBook, onOpenChat }) {
  return (
    <div className="relative flex h-full flex-col bg-cream">
      <StatusBar />

      {/* En-tête d'accueil */}
      <div className="px-5 pb-4 pt-2">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <div className="flex h-10 w-10 items-center justify-center rounded-full bg-brand-100 text-xl">
              🐾
            </div>
            <div>
              <p className="text-xs text-neutral-500">Réseau</p>
              <h1 className="text-[17px] font-extrabold leading-tight text-brand-800">
                VétéSoin
              </h1>
            </div>
          </div>
          <button className="flex h-9 w-9 items-center justify-center rounded-full bg-white text-neutral-500 shadow-sm">
            👤
          </button>
        </div>
        <p className="mt-4 text-[22px] font-extrabold leading-tight text-neutral-800">
          Bonjour 👋
        </p>
        <p className="text-sm text-neutral-500">
          Que pouvons-nous faire pour votre animal aujourd’hui&nbsp;?
        </p>
      </div>

      {/* Grille d'actions principales */}
      <div className="flex-1 overflow-y-auto px-5 pb-28">
        <div className="grid grid-cols-2 gap-3">
          {ACTIONS.map((a) => (
            <button
              key={a.id}
              onClick={onBook}
              className="flex flex-col items-start gap-3 rounded-2xl bg-white p-4 text-left shadow-sm transition hover:shadow-md active:scale-[0.98]"
            >
              <span
                className={`flex h-11 w-11 items-center justify-center rounded-xl ${a.tint} text-xl`}
              >
                {a.icon}
              </span>
              <span className="text-sm font-bold leading-snug text-neutral-800">
                {a.label}
              </span>
            </button>
          ))}
        </div>

        {/* Prochain rendez-vous (factice) */}
        <p className="mt-6 px-1 text-xs font-bold uppercase tracking-wide text-neutral-400">
          Prochain rendez-vous
        </p>
        <div className="mt-2 flex items-center gap-3 rounded-2xl bg-white p-4 shadow-sm">
          <div className="flex h-12 w-12 flex-col items-center justify-center rounded-xl bg-brand-500 text-white">
            <span className="text-[10px] font-semibold leading-none">JUIN</span>
            <span className="text-lg font-extrabold leading-none">19</span>
          </div>
          <div className="min-w-0 flex-1">
            <p className="truncate text-sm font-bold text-neutral-800">
              Vaccination · Miou
            </p>
            <p className="truncate text-xs text-neutral-500">
              VétéSoin Plateau · 14:15
            </p>
          </div>
        </div>
      </div>

      {/* Bulle chatbot DISCRÈTE — l'assistant reste optionnel */}
      <button
        onClick={onOpenChat}
        className="absolute bottom-5 right-5 flex items-center gap-2 rounded-full bg-brand-600 py-3 pl-3.5 pr-4 text-white shadow-xl shadow-brand-600/30 transition hover:bg-brand-700 active:scale-95"
      >
        <span className="relative flex h-6 w-6 items-center justify-center">
          <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-white/40" />
          <span className="text-base">💬</span>
        </span>
        <span className="text-sm font-bold">Aide</span>
      </button>
    </div>
  )
}
