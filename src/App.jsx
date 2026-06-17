import { useState } from 'react'
import PhoneFrame from './components/PhoneFrame.jsx'
import ChatScreen from './screens/ChatScreen.jsx'
import BookingScreen from './screens/BookingScreen.jsx'

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
          <BookingScreen
            context={bookingContext}
            onBack={() => setScreen('chat')}
            onRestart={() => {
              setBookingContext(null)
              setScreen('chat')
            }}
          />
        )}
      </PhoneFrame>
    </div>
  )
}
