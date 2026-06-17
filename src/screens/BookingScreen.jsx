import { useState } from 'react'
import StatusBar from '../components/StatusBar.jsx'
import Icon from '../components/Icon.jsx'
import BookingHeader from '../components/BookingHeader.jsx'
import SelectCard from '../components/SelectCard.jsx'
import PrimaryButton from '../components/PrimaryButton.jsx'
import {
  CLINICS,
  SERVICES,
  REASON_TO_SERVICE,
  DAYS,
  SLOTS,
} from '../data/booking.js'

const STEPS = ['clinic', 'service', 'datetime', 'confirm']
const TITLES = {
  clinic: 'Choisir une clinique',
  service: 'Type de rendez-vous',
  datetime: 'Date et heure',
  confirm: 'Confirmer',
}

/**
 * BookingScreen — prise de rendez-vous en 4 étapes.
 * `context` (motif/animal venant du chatbot) présélectionne le service et
 * s'affiche dans le récapitulatif (transition décrite en Phase 4).
 */
export default function BookingScreen({ context, onBack, onRestart }) {
  const [stepIdx, setStepIdx] = useState(0)
  const [clinic, setClinic] = useState(null)
  const [service, setService] = useState(
    REASON_TO_SERVICE[context?.reason] ?? null,
  )
  const [day, setDay] = useState(null)
  const [slot, setSlot] = useState(null)
  const [done, setDone] = useState(false)

  const step = STEPS[stepIdx]

  // Validité de l'étape courante pour activer le bouton "Continuer".
  const canContinue =
    (step === 'clinic' && clinic) ||
    (step === 'service' && service) ||
    (step === 'datetime' && day && slot) ||
    step === 'confirm'

  function handleBack() {
    if (stepIdx === 0) onBack()
    else setStepIdx((i) => i - 1)
  }

  function handleContinue() {
    if (step === 'confirm') setDone(true)
    else setStepIdx((i) => i + 1)
  }

  if (done) {
    return (
      <Success
        clinic={CLINICS.find((c) => c.id === clinic)}
        onRestart={onRestart}
      />
    )
  }

  return (
    <div className="flex h-full flex-col bg-forest">
      <StatusBar dark />
      <BookingHeader
        title={TITLES[step]}
        step={stepIdx + 1}
        total={STEPS.length}
        onBack={handleBack}
      />

      <div className="flex-1 space-y-2.5 overflow-y-auto rounded-t-3xl bg-cream px-4 py-4">
        {step === 'clinic' && (
          <>
            <p className="px-1 pb-1 text-xs text-neutral-500">
              8 cliniques près de vous
            </p>
            {CLINICS.map((c) => (
              <SelectCard
                key={c.id}
                icon="🏥"
                title={c.name}
                subtitle={c.area}
                trailing={c.distance}
                selected={clinic === c.id}
                onClick={() => setClinic(c.id)}
              />
            ))}
          </>
        )}

        {step === 'service' && (
          <>
            {context && (
              <div className="mb-1 flex items-center gap-2 rounded-xl bg-coral-soft px-3 py-2 text-xs text-forest">
                <span>✨</span>
                <span>
                  Présélectionné d’après votre échange avec l’assistant.
                </span>
              </div>
            )}
            {SERVICES.map((s) => (
              <SelectCard
                key={s.id}
                icon={s.icon}
                title={s.label}
                subtitle={s.desc}
                selected={service === s.id}
                onClick={() => setService(s.id)}
              />
            ))}
          </>
        )}

        {step === 'datetime' && (
          <>
            <p className="px-1 text-xs font-bold uppercase tracking-wide text-neutral-400">
              Date
            </p>
            <div className="flex gap-2 overflow-x-auto pb-1">
              {DAYS.map((d) => (
                <button
                  key={d.id}
                  onClick={() => setDay(d.id)}
                  className={[
                    'flex w-14 shrink-0 flex-col items-center rounded-2xl border py-2.5 transition active:scale-95',
                    day === d.id
                      ? 'border-forest bg-forest text-cream'
                      : 'border-black/5 bg-white text-neutral-700',
                  ].join(' ')}
                >
                  <span className="text-[11px] font-semibold opacity-80">
                    {d.weekday}
                  </span>
                  <span className="text-lg font-extrabold leading-tight">
                    {d.day}
                  </span>
                  <span className="text-[10px] opacity-70">{d.month}</span>
                </button>
              ))}
            </div>

            <p className="px-1 pt-3 text-xs font-bold uppercase tracking-wide text-neutral-400">
              Heure
            </p>
            <div className="grid grid-cols-3 gap-2">
              {SLOTS.map((t) => (
                <button
                  key={t}
                  onClick={() => setSlot(t)}
                  disabled={!day}
                  className={[
                    'rounded-xl border py-2.5 text-sm font-bold transition active:scale-95',
                    slot === t
                      ? 'border-forest bg-forest text-cream'
                      : 'border-black/5 bg-white text-neutral-700 disabled:opacity-40',
                  ].join(' ')}
                >
                  {t}
                </button>
              ))}
            </div>
            {!day && (
              <p className="px-1 pt-1 text-xs text-neutral-400">
                Choisissez d’abord une date.
              </p>
            )}
          </>
        )}

        {step === 'confirm' && (
          <Summary
            clinic={CLINICS.find((c) => c.id === clinic)}
            service={SERVICES.find((s) => s.id === service)}
            day={DAYS.find((d) => d.id === day)}
            slot={slot}
            context={context}
          />
        )}
      </div>

      <div className="border-t border-black/5 bg-cream px-4 py-3">
        <PrimaryButton
          onClick={canContinue ? handleContinue : undefined}
        >
          {step === 'confirm' ? 'Confirmer le rendez-vous' : 'Continuer'}
          {step !== 'confirm' && <span className="text-lg leading-none">→</span>}
        </PrimaryButton>
        {!canContinue && (
          <p className="pt-1.5 text-center text-xs text-neutral-400">
            Faites une sélection pour continuer.
          </p>
        )}
      </div>
    </div>
  )
}

/** Récapitulatif avant confirmation. */
function Summary({ clinic, service, day, slot, context }) {
  const rows = [
    { icon: '🏥', label: 'Clinique', value: clinic ? `${clinic.name} · ${clinic.area}` : '—' },
    { icon: service?.icon ?? '🩺', label: 'Rendez-vous', value: service?.label ?? '—' },
    { icon: '📅', label: 'Quand', value: day ? `${day.weekday} ${day.day} ${day.month} · ${slot}` : '—' },
  ]
  if (context?.animal) {
    rows.push({ icon: '🐾', label: 'Pour', value: capitalize(context.animal) })
  }
  return (
    <div className="space-y-2.5">
      <p className="px-1 pb-1 text-xs text-neutral-500">
        Vérifiez les détails avant de confirmer.
      </p>
      <div className="divide-y divide-black/5 rounded-2xl bg-white px-4">
        {rows.map((r) => (
          <div key={r.label} className="flex items-center gap-3 py-3">
            <span className="text-lg">{r.icon}</span>
            <span className="w-24 text-xs font-semibold uppercase tracking-wide text-neutral-400">
              {r.label}
            </span>
            <span className="flex-1 text-right text-sm font-bold text-neutral-800">
              {r.value}
            </span>
          </div>
        ))}
      </div>
      <div className="flex items-start gap-2 rounded-xl bg-coral-soft px-3 py-2.5 text-xs text-forest">
        <span>💬</span>
        <span>
          Un rappel vous sera envoyé. Vous pourrez modifier ou annuler à tout
          moment.
        </span>
      </div>
    </div>
  )
}

/** État de succès après confirmation. */
function Success({ clinic, onRestart }) {
  return (
    <div className="flex h-full flex-col bg-forest">
      <StatusBar dark />
      <div className="flex flex-1 flex-col items-center justify-center gap-4 px-8 text-center">
        <div className="flex h-20 w-20 items-center justify-center rounded-full bg-coral text-cream">
          <Icon name="check" size={40} strokeWidth={2.4} />
        </div>
        <h2 className="font-display text-2xl font-semibold text-cream">
          Rendez-vous confirmé !
        </h2>
        <p className="text-sm text-cream/75">
          Votre demande à {clinic?.name ?? 'la clinique'} est enregistrée. Vous
          recevrez une confirmation par courriel et un rappel la veille.
        </p>
        <button
          onClick={onRestart}
          className="mt-3 rounded-full bg-cream px-5 py-2.5 text-sm font-bold text-forest transition hover:bg-white"
        >
          Revenir à l’accueil
        </button>
      </div>
    </div>
  )
}

function capitalize(s) {
  return s.charAt(0).toUpperCase() + s.slice(1)
}
