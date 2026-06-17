/** PrimaryButton — call-to-action principal (ex. "Voir les disponibilités"). */
export default function PrimaryButton({ children, onClick }) {
  return (
    <button
      onClick={onClick}
      className="flex w-full items-center justify-center gap-2 rounded-2xl bg-brand-600 px-5 py-3.5 text-[15px] font-extrabold text-white shadow-lg shadow-brand-600/25 transition hover:bg-brand-700 active:scale-[0.98]"
    >
      {children}
    </button>
  )
}
