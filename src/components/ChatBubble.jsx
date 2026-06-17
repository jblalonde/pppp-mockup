/**
 * ChatBubble — bulle de conversation.
 * `from`: 'bot' (gauche, blanc) ou 'user' (droite, sarcelle).
 */
export default function ChatBubble({ from = 'bot', children }) {
  const isBot = from === 'bot'
  return (
    <div className={`flex ${isBot ? 'justify-start' : 'justify-end'}`}>
      <div
        className={[
          'max-w-[78%] rounded-2xl px-4 py-2.5 text-[14px] leading-snug shadow-sm',
          isBot
            ? 'rounded-tl-md bg-white text-forest'
            : 'rounded-tr-md bg-forest text-cream',
        ].join(' ')}
      >
        {children}
      </div>
    </div>
  )
}
