import { useState } from 'react'
import PhoneFrame from './components/PhoneFrame.jsx'
import VariantSwitcher from './components/VariantSwitcher.jsx'
import PerspectiveSwitcher from './components/PerspectiveSwitcher.jsx'
import HomeScreen from './screens/HomeScreen.jsx'
import ChatScreen from './screens/ChatScreen.jsx'
import BookingScreen from './screens/BookingScreen.jsx'
import TeamDashboard from './screens/TeamDashboard.jsx'
import { SEED_REQUESTS } from './data/staff.js'

/**
 * App — coquille de la maquette.
 *
 * Deux niveaux de bascule :
 *  - `perspective` : 'client' (mobile) vs 'team' (console réception desktop).
 *  - `variant`     : niveau d'intervention du chatbot côté client.
 *
 * Boucle fermée : une demande acheminée par l'assistant (onRoute) est ajoutée
 * à `requests` et apparaît dans la console équipe, assignée à la bonne personne.
 */
const defaultScreen = (variant) => (variant === 'primary' ? 'chat' : 'home')
let reqSeq = 0

export default function App() {
  const [perspective, setPerspective] = useState('client')
  const [variant, setVariant] = useState('optional')
  const [screen, setScreen] = useState(defaultScreen('optional'))
  const [bookingContext, setBookingContext] = useState(null)
  const [bookingReturn, setBookingReturn] = useState('home')
  const [requests, setRequests] = useState(SEED_REQUESTS)
  const [unseen, setUnseen] = useState(0)

  function changeVariant(v) {
    setVariant(v)
    setBookingContext(null)
    setScreen(defaultScreen(v))
  }

  function changePerspective(p) {
    setPerspective(p)
    if (p === 'team') setUnseen(0) // les nouvelles demandes sont "vues"
  }

  function goToBooking(ctx) {
    setBookingContext(ctx ?? null)
    setBookingReturn(screen)
    setScreen('booking')
  }

  function restart() {
    setBookingContext(null)
    setScreen(defaultScreen(variant))
  }

  // Le chatbot achemine une demande -> elle entre dans la console équipe.
  function handleRoute(req) {
    setRequests((list) => [
      {
        id: `live-${++reqSeq}`,
        client: 'Vous (démo)',
        status: 'new',
        time: 'À l’instant',
        channel: 'Assistant',
        ...req,
      },
      ...list,
    ])
    setUnseen((n) => n + 1)
  }

  return (
    <div className="flex min-h-screen flex-col items-center gap-6 bg-sand px-6 py-10">
      <header className="text-center">
        <h1 className="font-display text-3xl font-semibold text-forest">
          Réseau Vétérinaire — Maquette
        </h1>
        <p className="mt-1 max-w-xl text-sm text-forest/60">
          Le même flux, vu des deux côtés : l’expérience du client et la boîte de
          réception où aboutissent les demandes acheminées par l’assistant.
        </p>
      </header>

      <PerspectiveSwitcher
        value={perspective}
        onChange={changePerspective}
        badge={unseen}
      />

      {perspective === 'client' && (
        <VariantSwitcher value={variant} onChange={changeVariant} />
      )}

      <PhoneFrame>
        {perspective === 'team' ? (
          <TeamDashboard requests={requests} />
        ) : (
          <>
            {screen === 'home' && (
              <HomeScreen
                onBook={() => goToBooking(null)}
                onOpenChat={() => setScreen('chat')}
              />
            )}
            {screen === 'chat' && (
              <ChatScreen
                onGoToBooking={goToBooking}
                onRoute={handleRoute}
                onClose={
                  variant === 'optional' ? () => setScreen('home') : undefined
                }
              />
            )}
            {screen === 'booking' && (
              <BookingScreen
                context={bookingContext}
                onBack={() => setScreen(bookingReturn)}
                onRestart={restart}
              />
            )}
          </>
        )}
      </PhoneFrame>

      {perspective === 'client' && unseen > 0 && (
        <p className="max-w-xs text-center text-xs text-forest/60">
          ✨ Demande acheminée — ouvrez la{' '}
          <button
            onClick={() => changePerspective('team')}
            className="font-bold text-coral underline"
          >
            boîte de réception équipe
          </button>{' '}
          pour la voir arriver.
        </p>
      )}
    </div>
  )
}
