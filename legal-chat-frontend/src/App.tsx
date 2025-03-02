import { useState } from 'react'
import './App.css'
import { ChatPanel } from '@/components/ChatPanel'
import { ActionsPanel } from '@/components/ActionsPanel'
import { Action } from '@/types'
import { useChatHistory, useSendMessage } from '@/hooks/useChat'

function App() {
  const [input, setInput] = useState('')
  const [actions, setActions] = useState<Action[]>([])

  // Use the extracted hooks
  const { data: historyData } = useChatHistory()
  const chatMutation = useSendMessage()

  const messages = historyData || []

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!input.trim()) return

    try {
      await chatMutation.mutateAsync(input)
      
      // Simulate an action being triggered
      setActions(prev => [...prev, {
        type: 'ANALYZE',
        description: 'Analyzing legal document',
        status: 'pending'
      }])

      setInput('')
    } catch (error) {
      console.error('Error sending message:', error)
    }
  }

  return (
    <div className="flex h-screen p-4 gap-4">
      <div className="flex-1">
        <ChatPanel
          messages={messages}
          input={input}
          setInput={setInput}
          onSubmit={handleSubmit}
        />
      </div>
      <div className="flex-1">
        <ActionsPanel actions={actions} />
      </div>
    </div>
  )
}

export default App
