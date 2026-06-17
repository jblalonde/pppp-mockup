import { useEffect, useRef, useState } from 'react'
import StatusBar from '../components/StatusBar.jsx'
import ChatHeader from '../components/ChatHeader.jsx'
import ChatBubble from '../components/ChatBubble.jsx'
import TypingDots from '../components/TypingDots.jsx'
import QuickReplies from '../components/QuickReplies.jsx'
import PrimaryButton from '../components/PrimaryButton.jsx'
import Composer from '../components/Composer.jsx'
import RoutingCard from '../components/RoutingCard.jsx'
import { routeFor, HUMAN_ROUTING } from '../data/staff.js'

/**
 * Conversation scriptée : l'assistant qualifie le besoin (motif → animal),
 * ACHEMINE la demande vers la bonne personne (carte de routage), puis redirige
 * vers la prise de rendez-vous.
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
    bot: (ctx) => [
      `Parfait — ${ctx.reason} pour ${ctx.animal}, c’est noté.`,
      'Je transmets votre demande à la bonne personne de l’équipe 👇',
    ],
    cta: 'Voir les disponibilités',
    replies: [{ label: 'J’ai une autre question', next: 'other' }],
  },
  other: {
    bot: [
      'Bien sûr ! Posez-moi votre question, ou touchez « Parler à un humain » en haut à tout moment.',
    ],
    replies: [{ label: 'Reprendre depuis le début', next: 'start' }],
  },
}

// Motif qualifié -> libellé affichable dans la console équipe.
const REASON_LABEL = {
  'une consultation': 'Consultation',
  'un vaccin': 'Vaccin',
  'un renouvellement': 'Renouvellement de prescription',
}

let msgId = 0
const nextId = () => ++msgId

export default function ChatScreen({ onGoToBooking, onClose, onRoute }) {
  const [messages, setMessages] = useState([])
  const [node, setNode] = useState(null)
  const [typing, setTyping] = useState(false)
  const ctxRef = useRef({ reason: 'une consultation', animal: 'votre animal' })
  const routedRef = useRef(false)
  const startedRef = useRef(false)
  const scrollRef = useRef(null)

  // Joue les messages d'un nœud, un par un, en montrant l'indicateur d'écriture
  // avant CHAQUE message. Bornes sûres : on ne pousse jamais de message vide.
  function playNode(nodeId) {
    const def = FLOW[nodeId]
    const lines =
      (typeof def.bot === 'function' ? def.bot(ctxRef.current) : def.bot) ?? []

    const finish = () => {
      setNode(nodeId)
      if (nodeId === 'offer') routeRequest()
    }
    if (lines.length === 0) {
      finish()
      return
    }

    let i = 0
    const showLine = () => {
      setTyping(true)
      setTimeout(() => {
        setTyping(false)
        setMessages((m) => [...m, { id: nextId(), from: 'bot', text: lines[i] }])
        i += 1
        if (i < lines.length) setTimeout(showLine, 300)
        else finish()
      }, 750)
    }
    showLine()
  }

  // Achemine la demande qualifiée : carte côté client + remontée à la console.
  function routeRequest() {
    const ctx = ctxRef.current
    const { staff, why } = routeFor(ctx.reason)
    const first = staff.name.split(' ')[0].replace('Dre', '').trim()
    setMessages((m) => [
      ...m,
      {
        id: nextId(),
        type: 'routing',
        staff,
        note: `${first} prend en charge votre demande. Vous pouvez aussi réserver directement ci-dessous.`,
      },
    ])
    if (!routedRef.current) {
      routedRef.current = true
      onRoute?.({
        motif: REASON_LABEL[ctx.reason] ?? 'Demande',
        animal: capitalize(ctx.animal),
        why,
        staffId: staff.id,
      })
    }
  }

  useEffect(() => {
    // Garde anti-double-exécution (StrictMode lance l'effet deux fois en dev).
    if (startedRef.current) return
    startedRef.current = true
    playNode('start')
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

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
      const { staff, why } = HUMAN_ROUTING
      setMessages((m) => [
        ...m,
        {
          id: nextId(),
          from: 'bot',
          text: 'Bien sûr 🤝 Je transfère votre demande à l’équipe de la réception.',
        },
        {
          id: nextId(),
          type: 'routing',
          staff,
          note: `${staff.name.split(' ')[0]} de la réception vous répond ici dans quelques minutes.`,
        },
      ])
      setNode('other')
      onRoute?.({
        motif: 'Demande de contact humain',
        animal: capitalize(ctxRef.current.animal),
        why,
        staffId: staff.id,
      })
    }, 900)
  }

  const def = node ? FLOW[node] : null

  return (
    <div className="flex h-full flex-col bg-forest">
      <StatusBar dark />
      <ChatHeader onTalkToHuman={handleHuman} onClose={onClose} />

      <div
        ref={scrollRef}
        className="flex-1 space-y-3 overflow-y-auto rounded-t-3xl bg-cream px-4 py-4"
      >
        {messages.map((m) => {
          if (m.type === 'routing')
            return <RoutingCard key={m.id} staff={m.staff} note={m.note} />
          if (!m.text) return null // jamais de bulle vide
          return (
            <ChatBubble key={m.id} from={m.from}>
              {m.text}
            </ChatBubble>
          )
        })}

        {typing && <TypingDots />}

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

function capitalize(s) {
  return s.charAt(0).toUpperCase() + s.slice(1)
}
