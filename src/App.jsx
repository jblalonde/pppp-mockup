import { useState } from 'react'
import PhoneFrame from './components/PhoneFrame.jsx'
import ChatScreen from './screens/ChatScreen.jsx'

/**
 * App — coquille de la maquette.
 *
 * `screen` pilote l'écran affiché dans le cadre mobile. `bookingContext` porte
 * le motif/animal qualifiés par le chatbot vers l'écran de réservation
 * (pré-remplissage — finalisé en Phase 4).
 */
export default function App() {
  const [screen, setScreen] = useState('chat')
  const [bookingContext, setBookingContext] = useState(null)

  function goToBooking(ctx) {
    setBookingContext(ctx)
    setScreen('booking')
  }

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
        {screen === 'chat' && <ChatScreen onGoToBooking={goToBooking} />}
        {screen === 'booking' && (
          <BookingPlaceholder
            context={bookingContext}
            onBack={() => setScreen('chat')}
          />
        )}
      </PhoneFrame>
    </div>
  )
}

/** Placeholder de l'écran de réservation — remplacé en Phase 3. */
function BookingPlaceholder({ context, onBack }) {
  return (
    <div className="flex h-full flex-col items-center justify-center gap-4 px-8 text-center">
      <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-brand-100 text-3xl">
        📅
      </div>
      <h2 className="text-lg font-bold text-brand-800">Écran de réservation</h2>
      <p className="text-sm text-neutral-500">
        Contexte transmis par l’assistant&nbsp;:
        <br />
        <span className="font-semibold text-brand-700">
          {context?.reason} pour {context?.animal}
        </span>
      </p>
      <p className="text-xs text-neutral-400">(À construire en Phase 3)</p>
      <button
        onClick={onBack}
        className="mt-2 rounded-full border border-brand-300 px-4 py-2 text-sm font-bold text-brand-700"
      >
        ← Retour à la conversation
      </button>
    </div>
  )
}
