/**
 * QuickReplies — suggestions de réponse cliquables (parti pris "sobre" :
 * on guide l'utilisateur par des boutons plutôt que par la saisie libre).
 */
export default function QuickReplies({ options, onSelect }) {
  return (
    <div className="flex flex-wrap justify-end gap-2">
      {options.map((opt) => (
        <button
          key={opt.label}
          onClick={() => onSelect(opt)}
          className="rounded-full border border-brand-300 bg-white px-3.5 py-2 text-[13px] font-bold text-brand-700 transition hover:bg-brand-50 active:scale-95"
        >
          {opt.label}
        </button>
      ))}
    </div>
  )
}
