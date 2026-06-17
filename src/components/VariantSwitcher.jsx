/**
 * VariantSwitcher — contrôle de comparaison des deux niveaux d'intervention
 * du chatbot. C'est l'outil qui fait réagir le client.
 */
const VARIANTS = [
  {
    id: 'optional',
    title: 'Assistant optionnel',
    blurb:
      'L’app s’ouvre sur un menu d’actions. Le chatbot reste une bulle d’aide discrète.',
  },
  {
    id: 'primary',
    title: 'Porte d’entrée principale',
    blurb:
      'L’app s’ouvre directement sur la conversation. Tout passe par le chatbot.',
  },
]

export default function VariantSwitcher({ value, onChange }) {
  const active = VARIANTS.find((v) => v.id === value)
  return (
    <div className="w-full max-w-md">
      <p className="mb-2 text-center text-xs font-bold uppercase tracking-wide text-neutral-400">
        Niveau d’intervention du chatbot
      </p>
      <div className="flex gap-1 rounded-2xl bg-white p-1 shadow-sm">
        {VARIANTS.map((v) => (
          <button
            key={v.id}
            onClick={() => onChange(v.id)}
            className={[
              'flex-1 rounded-xl px-3 py-2.5 text-sm font-bold transition',
              value === v.id
                ? 'bg-brand-600 text-white shadow'
                : 'text-neutral-500 hover:bg-brand-50',
            ].join(' ')}
          >
            {v.title}
          </button>
        ))}
      </div>
      <p className="mt-2 text-center text-sm text-neutral-600">{active?.blurb}</p>
    </div>
  )
}
