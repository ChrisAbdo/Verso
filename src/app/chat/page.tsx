'use client'

import { useChat } from 'ai/react'
import { Container } from '@/components/Container'
import AnimatedText from '@/components/streaming/animated-text'
import { MessageInput } from '@/components/chat/message-input'
import { IconOpenAI, IconUser } from '@/components/ui/icons'

export default function Chat() {
  const {
    messages,
    input,
    setInput,
    handleInputChange,
    handleSubmit,
    data,
    stop,
    isLoading,
  } = useChat()
  return (
    <Container>
      <div className="mb-24 flex w-full flex-col overflow-y-auto">
        <ul role="list" className="mt-8 divide-y divide-black/10">
          {messages.length > 0
            ? messages.map((m) => (
                <li
                  key={m.id}
                  className={`px-4 py-4 ${m.role === 'user' ? '' : 'bg-muted'}`}
                >
                  <div className="flex items-center gap-x-3">
                    {m.role === 'user' ? <IconUser /> : <IconOpenAI />}
                    <h3 className="flex-auto truncate text-sm font-semibold leading-6">
                      {m.role === 'user' ? 'You' : 'GPT-4'}
                    </h3>
                  </div>
                  <AnimatedText content={m.content} />
                </li>
              ))
            : null}
        </ul>

        <div className="fixed bottom-0 left-0 right-0 mx-auto flex h-16 max-w-7xl items-center justify-center border-t border-black/10 bg-white/90 px-4">
          <MessageInput
            input={input}
            setInput={setInput}
            // @ts-ignore
            handleSubmit={handleSubmit}
            stop={stop}
            isLoading={isLoading}
          />
        </div>
      </div>
    </Container>
  )
}
