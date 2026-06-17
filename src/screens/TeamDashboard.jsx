import { useState } from 'react'
import StatusBar from '../components/StatusBar.jsx'
import Icon from '../components/Icon.jsx'
import BottomTabBar from '../components/BottomTabBar.jsx'
import { STAFF, STATUS } from '../data/staff.js'

/**
 * TeamDashboard — CÔTÉ ÉQUIPE, en MOBILE. Boîte de réception de la réception :
 * les demandes acheminées par l'assistant arrivent ici, triées par statut et
 * assignées à une personne + rôle. Démontre concrètement l'acheminement.
 */
const FILTERS = [
  { id: 'all', label: 'Toutes' },
  { id: 'new', label: 'Nouveau' },
  { id: 'in_progress', label: 'En cours' },
  { id: 'done', label: 'Traité' },
]

const TABS = [
  { id: 'inbox', label: 'Demandes', icon: 'chat' },
  { id: 'agenda', label: 'Agenda', icon: 'calendar' },
  { id: 'clients', label: 'Clients', icon: 'paw' },
  { id: 'account', label: 'Compte', icon: 'user' },
]

export default function TeamDashboard({ requests }) {
  const [filter, setFilter] = useState('all')

  const visible =
    filter === 'all'
      ? requests
      : requests.filter((r) =>
          filter === 'in_progress'
            ? r.status === 'in_progress' || r.status === 'assigned'
            : r.status === filter,
        )

  const team = Object.values(STAFF)
  const countFor = (id) => requests.filter((r) => r.staffId === id).length
  const newCount = requests.filter((r) => r.status === 'new').length

  return (
    <div className="flex h-full flex-col bg-forest">
      <StatusBar dark />

      {/* En-tête forêt */}
      <div className="px-5 pb-4 pt-1">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="font-display text-2xl font-semibold text-cream">
              Réception
            </h1>
            <p className="text-xs text-mint">VétéSoin · 8 cliniques</p>
          </div>
          <div className="flex items-center gap-1.5 rounded-full bg-coral px-3 py-1.5 text-xs font-bold text-cream">
            <span className="h-2 w-2 animate-pulse rounded-full bg-cream" />
            {newCount} nouvelle{newCount > 1 ? 's' : ''}
          </div>
        </div>

        {/* Charge de l'équipe (répartition de l'acheminement) */}
        <div className="mt-4 flex gap-2">
          {team.map((s) => (
            <div
              key={s.id}
              className="flex flex-1 items-center gap-2 rounded-xl bg-forest-soft px-2.5 py-2"
            >
              <div
                className={`flex h-7 w-7 items-center justify-center rounded-full text-sm ${s.tint}`}
              >
                {s.emoji}
              </div>
              <div className="min-w-0">
                <p className="truncate text-[12px] font-bold leading-none text-cream">
                  {s.name.split(' ')[0]}
                </p>
                <p className="text-[10px] text-mint">{countFor(s.id)} demande(s)</p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Feuille crème — liste */}
      <div className="flex flex-1 flex-col overflow-hidden rounded-t-3xl bg-cream">
        <div className="px-4 pt-4">
          <div className="flex items-center justify-between">
            <h2 className="font-display text-[17px] font-semibold text-forest">
              Demandes entrantes
            </h2>
          </div>
          <p className="text-xs text-neutral-500">
            Acheminées automatiquement par l’assistant
          </p>

          {/* Filtres */}
          <div className="mt-3 flex gap-2 overflow-x-auto pb-1">
            {FILTERS.map((f) => (
              <button
                key={f.id}
                onClick={() => setFilter(f.id)}
                className={[
                  'shrink-0 rounded-full px-3.5 py-1.5 text-xs font-bold transition',
                  filter === f.id
                    ? 'bg-forest text-cream'
                    : 'bg-cream-card text-neutral-500',
                ].join(' ')}
              >
                {f.label}
              </button>
            ))}
          </div>
        </div>

        <div className="flex-1 space-y-2.5 overflow-y-auto px-4 pb-4 pt-3">
          {visible.map((r) => (
            <RequestCard key={r.id} req={r} />
          ))}
          {visible.length === 0 && (
            <p className="py-12 text-center text-sm text-neutral-400">
              Aucune demande dans ce filtre.
            </p>
          )}
        </div>
      </div>

      <BottomTabBar tabs={TABS} active="inbox" />
    </div>
  )
}

function RequestCard({ req }) {
  const staff = STAFF[req.staffId]
  const status = STATUS[req.status] ?? STATUS.assigned
  const isNew = req.status === 'new'

  return (
    <div
      className={[
        'rounded-2xl border p-3.5 transition',
        isNew
          ? 'border-coral bg-coral-soft/40'
          : 'border-black/5 bg-white',
      ].join(' ')}
    >
      <div className="flex items-center gap-2">
        <span
          className={`inline-flex items-center gap-1.5 rounded-full px-2 py-0.5 text-[11px] font-bold ${status.chip}`}
        >
          <span className={`h-1.5 w-1.5 rounded-full ${status.dot}`} />
          {status.label}
        </span>
        <span className="rounded-full bg-cream-card px-2 py-0.5 text-[11px] font-semibold text-neutral-500">
          💬 {req.channel}
        </span>
        <span className="ml-auto text-[11px] text-neutral-400">{req.time}</span>
      </div>

      <p className="mt-2 font-display text-[16px] font-semibold leading-tight text-forest">
        {req.motif}
      </p>
      <p className="text-xs text-neutral-500">
        {req.client} · {req.animal}
      </p>

      <div className="mt-3 flex items-center gap-2.5 border-t border-black/5 pt-3">
        <div
          className={`flex h-9 w-9 items-center justify-center rounded-full text-base ${staff.tint}`}
        >
          {staff.emoji}
        </div>
        <div className="min-w-0 flex-1">
          <p className="truncate text-[13px] font-bold text-forest">
            {staff.name}
          </p>
          <p className="truncate text-[11px] text-neutral-500">{staff.role}</p>
        </div>
        <span className="text-[11px] font-semibold text-coral">Assigné</span>
      </div>

      <p className="mt-2 text-[11px] text-neutral-400">
        ↳ Acheminement&nbsp;: {req.why}
      </p>
    </div>
  )
}
