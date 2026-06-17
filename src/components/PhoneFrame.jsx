/**
 * PhoneFrame — cadre mobile type iPhone pour présenter les écrans de la maquette.
 * Largeur ~375px, encoche, et zone de contenu scrollable.
 */
export default function PhoneFrame({ children }) {
  return (
    <div className="relative h-[760px] w-[375px] shrink-0 rounded-[44px] bg-neutral-900 p-[10px] shadow-2xl shadow-neutral-900/30">
      {/* Encoche */}
      <div className="absolute left-1/2 top-[10px] z-20 h-[26px] w-[140px] -translate-x-1/2 rounded-b-2xl bg-neutral-900" />
      {/* Écran */}
      <div className="relative h-full w-full overflow-hidden rounded-[36px] bg-forest">
        <div className="h-full w-full overflow-y-auto">{children}</div>
      </div>
    </div>
  )
}
