import { useState } from 'react'
import { STAFF, STATUS } from '../data/staff.js'

/**
 * TeamDashboard — CÔTÉ ÉQUIPE. Console de réception (présentée en cadre
 * "desktop") qui reçoit les demandes acheminées par l'assistant, triées par
 * statut et assignées à une personne + rôle. Démontre concrètement
 * "comment l'acheminement se fait".
 */
const FILTERS = [
  { id: 'all', label: 'Toutes' },
  { id: 'new', label: 'Nouveau' },
  { id: 'in_progress', label: 'En cours' },
  { id: 'done', label: 'Traité' },
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
    <div className="w-full max-w-5xl overflow-hidden rounded-2xl border border-black/10 bg-white shadow-2xl shadow-neutral-900/20">
      {/* Chrome desktop */}
      <div className="flex items-center gap-2 border-b border-black/5 bg-neutral-100 px-4 py-2.5">
        <span className="h-3 w-3 rounded-full bg-rose-400" />
        <span className="h-3 w-3 rounded-full bg-amber-400" />
        <span className="h-3 w-3 rounded-full bg-brand-400" />
        <span className="ml-3 text-xs font-semibold text-neutral-500">
          console.vetesoin.ca/reception
        </span>
      </div>

      <div className="flex min-h-[560px]">
        {/* Sidebar équipe */}
        <aside className="hidden w-60 shrink-0 flex-col border-r border-black/5 bg-cream/60 p-4 sm:flex">
          <div className="flex items-center gap-2">
            <div className="flex h-9 w-9 items-center justify-center rounded-full bg-brand-100 text-lg">
              🐾
            </div>
            <div>
              <p className="text-sm font-extrabold leading-tight text-brand-800">
                VétéSoin
              </p>
              <p className="text-[11px] text-neutral-500">Console réception</p>
            </div>
          </div>

          <p className="mt-6 text-[11px] font-bold uppercase tracking-wide text-neutral-400">
            Équipe — acheminement
          </p>
          <div className="mt-2 space-y-1.5">
            {team.map((s) => (
              <div
                key={s.id}
                className="flex items-center gap-2.5 rounded-xl bg-white px-2.5 py-2 shadow-sm"
              >
                <div
                  className={`flex h-8 w-8 items-center justify-center rounded-full text-base ${s.tint}`}
                >
                  {s.emoji}
                </div>
                <div className="min-w-0 flex-1">
                  <p className="truncate text-[13px] font-bold text-neutral-800">
                    {s.name}
                  </p>
                  <p className="truncate text-[11px] text-neutral-500">
                    {s.role}
                  </p>
                </div>
                <span className="flex h-5 min-w-5 items-center justify-center rounded-full bg-brand-100 px-1.5 text-[11px] font-bold text-brand-700">
                  {countFor(s.id)}
                </span>
              </div>
            ))}
          </div>
        </aside>

        {/* Liste des demandes */}
        <main className="flex-1 p-5">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-lg font-extrabold text-neutral-800">
                Demandes entrantes
              </h2>
              <p className="text-xs text-neutral-500">
                Acheminées automatiquement par l’assistant
              </p>
            </div>
            <div className="flex items-center gap-1.5 rounded-full bg-brand-50 px-3 py-1.5 text-xs font-bold text-brand-700">
              <span className="h-2 w-2 animate-pulse rounded-full bg-brand-500" />
              {newCount} nouvelle{newCount > 1 ? 's' : ''}
            </div>
          </div>

          {/* Filtres */}
          <div className="mt-4 flex flex-wrap gap-2">
            {FILTERS.map((f) => (
              <button
                key={f.id}
                onClick={() => setFilter(f.id)}
                className={[
                  'rounded-full px-3.5 py-1.5 text-xs font-bold transition',
                  filter === f.id
                    ? 'bg-brand-600 text-white'
                    : 'bg-neutral-100 text-neutral-500 hover:bg-neutral-200',
                ].join(' ')}
              >
                {f.label}
              </button>
            ))}
          </div>

          {/* Cartes */}
          <div className="mt-4 space-y-2.5">
            {visible.map((r) => (
              <RequestRow key={r.id} req={r} />
            ))}
            {visible.length === 0 && (
              <p className="py-12 text-center text-sm text-neutral-400">
                Aucune demande dans ce filtre.
              </p>
            )}
          </div>
        </main>
      </div>
    </div>
  )
}

function RequestRow({ req }) {
  const staff = STAFF[req.staffId]
  const status = STATUS[req.status] ?? STATUS.assigned
  const isNew = req.status === 'new'

  return (
    <div
      className={[
        'rounded-2xl border p-3.5 transition',
        isNew
          ? 'border-brand-300 bg-brand-50/60 ring-1 ring-brand-300'
          : 'border-black/5 bg-white',
      ].join(' ')}
    >
      <div className="flex items-start gap-3">
        {/* Statut + motif */}
        <div className="min-w-0 flex-1">
          <div className="flex items-center gap-2">
            <span
              className={`inline-flex items-center gap-1.5 rounded-full px-2 py-0.5 text-[11px] font-bold ${status.chip}`}
            >
              <span className={`h-1.5 w-1.5 rounded-full ${status.dot}`} />
              {status.label}
            </span>
            <span className="rounded-full bg-neutral-100 px-2 py-0.5 text-[11px] font-semibold text-neutral-500">
              💬 {req.channel}
            </span>
            <span className="text-[11px] text-neutral-400">{req.time}</span>
          </div>
          <p className="mt-1.5 text-[15px] font-extrabold text-neutral-800">
            {req.motif}
          </p>
          <p className="text-xs text-neutral-500">
            {req.client} · {req.animal}
          </p>
          <p className="mt-1.5 text-[11px] text-neutral-400">
            ↳ Acheminement&nbsp;: {req.why}
          </p>
        </div>

        {/* Assigné à */}
        <div className="flex shrink-0 items-center gap-2 rounded-xl bg-cream-deep/70 px-2.5 py-2">
          <div
            className={`flex h-8 w-8 items-center justify-center rounded-full text-base ${staff.tint}`}
          >
            {staff.emoji}
          </div>
          <div className="hidden text-right sm:block">
            <p className="text-[12px] font-bold leading-tight text-neutral-800">
              {staff.name}
            </p>
            <p className="text-[10px] text-neutral-500">{staff.role}</p>
          </div>
        </div>
      </div>
    </div>
  )
}
