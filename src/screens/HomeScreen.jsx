import { useState } from 'react'
import StatusBar from '../components/StatusBar.jsx'
import Icon from '../components/Icon.jsx'
import BottomTabBar from '../components/BottomTabBar.jsx'
import CallSheet from '../components/CallSheet.jsx'

/**
 * HomeScreen — accueil "Soins" (variante 1 : assistant optionnel).
 * Direction visuelle Sploot : header vert forêt + feuille crème avec une
 * grille d'actions. Le clavardage avec l'assistant est UNE option parmi
 * d'autres (icône d'en-tête + tuile « Clavardage »), pas la porte d'entrée.
 */
const TABS = [
  { id: 'care', label: 'Soins', icon: 'home' },
  { id: 'record', label: 'Dossier', icon: 'record' },
  { id: 'plan', label: 'Suivi', icon: 'plan' },
  { id: 'account', label: 'Compte', icon: 'user' },
]

export default function HomeScreen({ onBook, onOpenChat }) {
  const [showCall, setShowCall] = useState(false)

  const actions = [
    { id: 'standard', icon: 'bag', title: 'Visite standard', sub: 'Sur rendez-vous', onClick: onBook },
    { id: 'urgent', icon: 'alert', title: 'Urgence', sub: 'Aujourd’hui ou demain', accent: true, onClick: onBook },
    { id: 'chat', icon: 'chat', title: 'Clavardage', sub: 'Écrire à l’assistant', onClick: onOpenChat },
    { id: 'phone', icon: 'phone', title: 'Appel', sub: 'Nous joindre', onClick: () => setShowCall(true) },
    { id: 'video', icon: 'video', title: 'Téléconsultation', sub: 'Par vidéo', onClick: onBook },
    { id: 'rx', icon: 'pill', title: 'Renouvellement', sub: 'Prescriptions', onClick: onBook },
  ]

  return (
    <div className="relative flex h-full flex-col bg-forest">
      <StatusBar dark />

      {/* En-tête forêt */}
      <div className="px-5 pb-5 pt-1">
        <div className="flex items-center justify-between">
          <h1 className="font-display text-2xl font-semibold text-cream">
            Bonjour, Camille
          </h1>
          <div className="flex items-center gap-3 text-mint">
            <button onClick={onOpenChat} aria-label="Clavardage">
              <Icon name="chat" size={24} />
            </button>
            <button aria-label="Notifications">
              <Icon name="bell" size={24} />
            </button>
          </div>
        </div>

        <p className="mt-4 text-[13px] font-bold text-cream/80">
          Rappels de suivi
        </p>
        <div className="mt-2 overflow-hidden rounded-2xl border-l-4 border-coral bg-cream p-3.5 shadow-lg">
          <div className="flex items-center gap-3">
            <div className="flex h-12 w-12 shrink-0 flex-col items-center justify-center rounded-xl bg-coral-soft text-coral">
              <span className="text-[10px] font-bold uppercase leading-none">Juil</span>
              <span className="text-lg font-extrabold leading-none">13</span>
            </div>
            <div className="min-w-0 flex-1">
              <div className="flex items-center gap-1.5 text-coral">
                <Icon name="paw" size={14} />
                <span className="text-[11px] font-bold">Miou</span>
              </div>
              <p className="text-sm font-extrabold text-forest">
                Vaccin de rappel à prévoir
              </p>
              <p className="text-xs text-neutral-500">
                Protégez Miou — réservez dès maintenant.
              </p>
            </div>
          </div>
        </div>
        <div className="mt-3 flex justify-center gap-1.5">
          {[0, 1, 2, 3].map((i) => (
            <span
              key={i}
              className={`h-1.5 rounded-full ${i === 0 ? 'w-4 bg-cream' : 'w-1.5 bg-cream/30'}`}
            />
          ))}
        </div>
      </div>

      {/* Feuille crème — grille d'actions */}
      <div className="flex-1 overflow-y-auto rounded-t-3xl bg-cream px-4 pb-4 pt-5">
        <div className="grid grid-cols-2 gap-3">
          {actions.map((a) => (
            <button
              key={a.id}
              onClick={a.onClick}
              className="flex flex-col gap-3 rounded-2xl bg-cream-card p-4 text-left transition active:scale-[0.98]"
            >
              <span className={a.accent ? 'text-coral' : 'text-forest'}>
                <Icon name={a.icon} size={26} strokeWidth={1.7} />
              </span>
              <span>
                <span className="block font-display text-[16px] font-semibold leading-tight text-forest">
                  {a.title}
                </span>
                <span className={`text-xs ${a.accent ? 'text-coral' : 'text-neutral-500'}`}>
                  {a.sub}
                </span>
              </span>
            </button>
          ))}
        </div>
      </div>

      <BottomTabBar tabs={TABS} active="care" />

      {showCall && (
        <CallSheet
          onClose={() => setShowCall(false)}
          onTalkToHuman={() => {
            setShowCall(false)
            onOpenChat()
          }}
        />
      )}
    </div>
  )
}
