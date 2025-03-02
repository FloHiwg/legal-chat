import { ChatMessage } from '@/components/ChatMessage'
import { ChatInput } from '@/components/ChatInput'
import { Message } from '@/types'
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"

interface ChatPanelProps {
  messages: Message[]
  input: string
  setInput: (input: string) => void
  onSubmit: (e: React.FormEvent) => void
}

export function ChatPanel({ messages, input, setInput, onSubmit }: ChatPanelProps) {
  return (
    <Card className="h-full flex flex-col">
      <CardHeader>
        <CardTitle>Chat</CardTitle>
      </CardHeader>
      <CardContent className="flex-1 overflow-y-auto space-y-4">
        {messages.map((message, index) => (
          <ChatMessage key={index} {...message} />
        ))}
      </CardContent>
      <CardFooter>
        <ChatInput input={input} setInput={setInput} onSubmit={onSubmit} />
      </CardFooter>
    </Card>
  )
} 