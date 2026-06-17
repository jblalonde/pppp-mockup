import Icon from './Icon.jsx'

/**
 * TypingDots — indicateur "l'assistant écrit…" : petit avatar + trois points
 * animés, pour montrer clairement que quelqu'un est en train de répondre.
 */
export default function TypingDots() {
  return (
    <div className="flex items-end gap-2">
      <div className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-forest text-mint">
        <Icon name="paw" size={15} />
      </div>
      <div className="flex items-center gap-1.5 rounded-2xl rounded-bl-md bg-white px-4 py-3 shadow-sm">
        {[0, 1, 2].map((i) => (
          <span
            key={i}
            className="h-2.5 w-2.5 animate-bounce rounded-full bg-brand-400"
            style={{ animationDelay: `${i * 0.18}s`, animationDuration: '0.9s' }}
          />
        ))}
      </div>
    </div>
  )
}
