/** PrimaryButton — call-to-action principal (ex. "Voir les disponibilités"). */
export default function PrimaryButton({ children, onClick }) {
  return (
    <button
      onClick={onClick}
      className="flex w-full items-center justify-center gap-2 rounded-full bg-forest px-5 py-3.5 text-[15px] font-extrabold text-cream shadow-lg shadow-forest/25 transition hover:bg-forest-deep active:scale-[0.98]"
    >
      {children}
    </button>
  )
}
