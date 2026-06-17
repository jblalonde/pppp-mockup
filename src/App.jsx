import { useState } from 'react'
import PhoneFrame from './components/PhoneFrame.jsx'
import VariantSwitcher from './components/VariantSwitcher.jsx'
import HomeScreen from './screens/HomeScreen.jsx'
import ChatScreen from './screens/ChatScreen.jsx'
import BookingScreen from './screens/BookingScreen.jsx'

/**
 * App — coquille de la maquette + comparateur des deux variantes.
 *
 * `variant` pilote le niveau d'intervention du chatbot :
 *   - 'optional' : l'app s'ouvre sur l'accueil (menu), chatbot via bulle discrète.
 *   - 'primary'  : l'app s'ouvre directement sur la conversation.
 *
 * `screen` est l'écran courant. `bookingReturn` mémorise où revenir après la
 * réservation. `bookingContext` porte le motif/animal qualifiés par le chatbot.
 */
const defaultScreen = (variant) => (variant === 'primary' ? 'chat' : 'home')

export default function App() {
  const [variant, setVariant] = useState('optional')
  const [screen, setScreen] = useState(defaultScreen('optional'))
  const [bookingContext, setBookingContext] = useState(null)
  const [bookingReturn, setBookingReturn] = useState('home')

  // Changer de variante réinitialise le parcours pour repartir au point d'entrée.
  function changeVariant(v) {
    setVariant(v)
    setBookingContext(null)
    setScreen(defaultScreen(v))
  }

  function goToBooking(ctx) {
    setBookingContext(ctx ?? null)
    setBookingReturn(screen) // revenir d'où l'on vient (accueil ou conversation)
    setScreen('booking')
  }

  function restart() {
    setBookingContext(null)
    setScreen(defaultScreen(variant))
  }

  return (
    <div className="flex min-h-screen flex-col items-center gap-6 bg-gradient-to-br from-cream-deep to-cream px-6 py-10">
      <header className="text-center">
        <h1 className="text-2xl font-extrabold text-brand-800">
          Réseau Vétérinaire — Maquette
        </h1>
        <p className="mt-1 max-w-md text-sm text-neutral-600">
          Comparez deux rôles possibles du chatbot. Basculez ci-dessous et
          testez le parcours dans chaque cas.
        </p>
      </header>

      <VariantSwitcher value={variant} onChange={changeVariant} />

      <PhoneFrame>
        {screen === 'home' && (
          <HomeScreen
            onBook={() => goToBooking(null)}
            onOpenChat={() => setScreen('chat')}
          />
        )}
        {screen === 'chat' && (
          <ChatScreen
            onGoToBooking={goToBooking}
            // En mode "optionnel", le chat se ferme et revient à l'accueil.
            onClose={variant === 'optional' ? () => setScreen('home') : undefined}
          />
        )}
        {screen === 'booking' && (
          <BookingScreen
            context={bookingContext}
            onBack={() => setScreen(bookingReturn)}
            onRestart={restart}
          />
        )}
      </PhoneFrame>
    </div>
  )
}
