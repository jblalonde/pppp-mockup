import { useEffect, useRef, useState } from 'react'
import StatusBar from '../components/StatusBar.jsx'
import ChatHeader from '../components/ChatHeader.jsx'
import ChatBubble from '../components/ChatBubble.jsx'
import TypingDots from '../components/TypingDots.jsx'
import QuickReplies from '../components/QuickReplies.jsx'
import PrimaryButton from '../components/PrimaryButton.jsx'
import Composer from '../components/Composer.jsx'

/**
 * Conversation scriptée : l'assistant qualifie le besoin (motif → animal)
 * puis redirige vers la prise de rendez-vous. Chaque nœud contient les
 * messages du bot et les réponses rapides proposées.
 */
const FLOW = {
  start: {
    bot: [
      'Bonjour ! Je suis l’assistant de VétéSoin 🐾',
      'Comment puis-je vous aider aujourd’hui ?',
    ],
    replies: [
      { label: 'Prendre un rendez-vous', set: { reason: 'une consultation' }, next: 'animal' },
      { label: 'Rappel de vaccin 💉', set: { reason: 'un vaccin' }, next: 'animal' },
      { label: 'Renouveler une prescription', set: { reason: 'un renouvellement' }, next: 'animal' },
    ],
  },
  animal: {
    bot: ['Avec plaisir. C’est pour quel animal ?'],
    replies: [
      { label: 'Chien 🐶', set: { animal: 'votre chien' }, next: 'offer' },
      { label: 'Chat 🐱', set: { animal: 'votre chat' }, next: 'offer' },
      { label: 'Autre', set: { animal: 'votre animal' }, next: 'offer' },
    ],
  },
  offer: {
    // Les messages utilisent le contexte accumulé (motif + animal).
    bot: (ctx) => [
      `Parfait — ${ctx.reason} pour ${ctx.animal}, c’est noté.`,
      'Plusieurs de nos 8 cliniques ont des disponibilités cette semaine. Je vous montre les prochains créneaux près de chez vous ?',
    ],
    cta: 'Voir les disponibilités',
    replies: [{ label: 'J’ai une autre question', next: 'other' }],
  },
  other: {
    bot: [
      'Bien sûr ! Posez-moi votre question, ou touchez « Parler à un humain » en haut à tout moment.',
    ],
    replies: [
      { label: 'Reprendre depuis le début', next: 'start' },
    ],
  },
}

let msgId = 0
const nextId = () => ++msgId

export default function ChatScreen({ onGoToBooking, onClose }) {
  const [messages, setMessages] = useState([])
  const [node, setNode] = useState(null)
  const [typing, setTyping] = useState(false)
  const ctxRef = useRef({ reason: 'une consultation', animal: 'votre animal' })
  const scrollRef = useRef(null)

  // Joue les messages d'un nœud avec un délai "en train d'écrire…".
  function playNode(nodeId) {
    const def = FLOW[nodeId]
    const lines =
      typeof def.bot === 'function' ? def.bot(ctxRef.current) : def.bot

    setTyping(true)
    let i = 0
    const pushNext = () => {
      setTyping(false)
      setMessages((m) => [...m, { id: nextId(), from: 'bot', text: lines[i] }])
      i += 1
      if (i < lines.length) {
        setTyping(true)
        setTimeout(pushNext, 650)
      } else {
        setNode(nodeId)
      }
    }
    setTimeout(pushNext, 700)
  }

  // Démarre la conversation au montage.
  useEffect(() => {
    playNode('start')
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  // Garde la vue collée en bas.
  useEffect(() => {
    scrollRef.current?.scrollTo({ top: 999999, behavior: 'smooth' })
  }, [messages, typing, node])

  function handleReply(opt) {
    if (opt.set) ctxRef.current = { ...ctxRef.current, ...opt.set }
    setMessages((m) => [...m, { id: nextId(), from: 'user', text: opt.label }])
    setNode(null)
    playNode(opt.next)
  }

  function handleHuman() {
    setMessages((m) => [
      ...m,
      { id: nextId(), from: 'user', text: 'Je préfère parler à quelqu’un' },
    ])
    setNode(null)
    setTyping(true)
    setTimeout(() => {
      setTyping(false)
      setMessages((m) => [
        ...m,
        {
          id: nextId(),
          from: 'bot',
          text: 'Bien sûr 🤝 Je transfère votre demande à l’équipe de la réception. Une personne vous répond ici même dans quelques minutes.',
        },
      ])
      setNode('other')
    }, 900)
  }

  const def = node ? FLOW[node] : null

  return (
    <div className="flex h-full flex-col bg-cream">
      <StatusBar />
      <ChatHeader onTalkToHuman={handleHuman} onClose={onClose} />

      <div ref={scrollRef} className="flex-1 space-y-3 overflow-y-auto px-4 py-4">
        {messages.map((m) => (
          <ChatBubble key={m.id} from={m.from}>
            {m.text}
          </ChatBubble>
        ))}

        {typing && <TypingDots />}

        {/* Interactions du nœud courant */}
        {def && !typing && (
          <div className="space-y-3 pt-1">
            {def.cta && (
              <PrimaryButton onClick={() => onGoToBooking(ctxRef.current)}>
                {def.cta}
                <span className="text-lg leading-none">→</span>
              </PrimaryButton>
            )}
            {def.replies && (
              <QuickReplies options={def.replies} onSelect={handleReply} />
            )}
          </div>
        )}
      </div>

      <Composer />
    </div>
  )
}
