import { useState } from 'react'
import PhoneFrame from './components/PhoneFrame.jsx'

/**
 * App — coquille de la maquette.
 *
 * `screen` pilote l'écran affiché dans le cadre mobile. Les phases suivantes
 * brancheront ici l'écran A (chatbot) et l'écran B (réservation), ainsi que
 * le sélecteur de variantes (assistant optionnel vs porte d'entrée principale).
 */
export default function App() {
  const [screen] = useState('placeholder')

  return (
    <div className="flex min-h-screen flex-col items-center gap-8 bg-gradient-to-br from-cream-deep to-cream px-6 py-12">
      <header className="text-center">
        <h1 className="text-2xl font-extrabold text-brand-800">
          Réseau Vétérinaire — Maquette
        </h1>
        <p className="mt-1 max-w-md text-sm text-neutral-600">
          Prototype mobile pour cadrer le rôle du chatbot et la prise de
          rendez-vous.
        </p>
      </header>

      <PhoneFrame>
        {screen === 'placeholder' && <Placeholder />}
      </PhoneFrame>
    </div>
  )
}

/** Écran temporaire — remplacé en Phase 2. Confirme que le setup fonctionne. */
function Placeholder() {
  return (
    <div className="flex h-full flex-col items-center justify-center gap-3 px-8 text-center">
      <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-brand-100 text-3xl">
        🐾
      </div>
      <h2 className="text-lg font-bold text-brand-800">Setup OK</h2>
      <p className="text-sm text-neutral-500">
        Phase 0 terminée. Les écrans chatbot et réservation arrivent aux phases
        suivantes.
      </p>
    </div>
  )
}
