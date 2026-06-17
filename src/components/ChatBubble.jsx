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
            ? 'rounded-tl-md bg-white text-neutral-700'
            : 'rounded-tr-md bg-brand-500 text-white',
        ].join(' ')}
      >
        {children}
      </div>
    </div>
  )
}
