import { UseChatHelpers } from 'ai/react'
import * as React from 'react'
import Textarea from 'react-textarea-autosize'

import { Button, buttonVariants } from '@/components/ui/button'
import { IconArrowElbow, IconPlus } from '../ui/icons'
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from '@/components/ui/tooltip'
import { useEnterSubmit } from '@/lib/hooks/use-enter-submit'
import { cn } from '@/lib/utils'
import { useRouter } from 'next/navigation'
import { Container } from '../Container'
import LoadingDots from '../loading/loading-dots'
import LoadingSpinner from '../loading/loading-spinner'

export interface PromptProps
  extends Pick<UseChatHelpers, 'input' | 'setInput'> {
  isLoading: boolean
  handleSubmit: (e: React.FormEvent<HTMLFormElement>) => Promise<void>
  stop: () => void
}

export function MessageInput({
  input,
  setInput,
  isLoading,
  handleSubmit,
  stop,
}: PromptProps) {
  const { formRef, onKeyDown } = useEnterSubmit()
  const inputRef = React.useRef<HTMLTextAreaElement>(null)
  const router = useRouter()

  React.useEffect(() => {
    if (inputRef.current) {
      inputRef.current.focus()
    }
  }, [])

  return (
    <form
      onSubmit={handleSubmit}
      ref={formRef}
      className="mx-auto mb-16 w-full rounded"
    >
      <div className="mb-2 flex items-center justify-center space-x-2">
        {isLoading ? (
          <Button disabled size="icon">
            <LoadingDots color="#000" />
          </Button>
        ) : null}
        {isLoading ? <Button onClick={stop}>Stop Generating</Button> : null}
      </div>

      <div className="relative flex max-h-60 w-full flex-col overflow-hidden bg-background px-8 sm:rounded-md sm:border sm:px-12">
        <button
          onClick={(e) => {
            e.preventDefault()
            router.refresh()
            router.push('/')
          }}
          className={cn(
            buttonVariants({ size: 'sm', variant: 'outline' }),
            'absolute left-0 top-4 h-8 w-8 rounded-full bg-background p-0 sm:left-4',
          )}
        >
          <IconPlus />
          <span className="sr-only">New Chat</span>
        </button>

        <Textarea
          ref={inputRef}
          tabIndex={0}
          onKeyDown={onKeyDown}
          rows={1}
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="Send a message."
          spellCheck={false}
          className="min-h-[60px] w-full resize-none bg-transparent px-4 py-[1.3rem] focus-within:outline-none sm:text-sm"
        />
        <div className="absolute right-0 top-4 sm:right-4">
          <Button
            type="submit"
            size="icon"
            disabled={isLoading || input === ''}
          >
            <IconArrowElbow />
            <span className="sr-only">Send message</span>
          </Button>
        </div>
      </div>
    </form>
  )
}
