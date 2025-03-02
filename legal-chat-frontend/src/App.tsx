import { useState } from 'react'
import './App.css'
import { ChatPanel } from '@/components/ChatPanel'
import { ActionsPanel } from '@/components/ActionsPanel'
import { Message, Action } from '@/types'

function App() {
  const [messages, setMessages] = useState<Message[]>([])
  const [input, setInput] = useState('')
  const [actions, setActions] = useState<Action[]>([])

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (!input.trim()) return

    // Add user message
    setMessages(prev => [...prev, { role: 'user', content: input }])
    
    // Simulate AI response (replace with actual API call)
    setTimeout(() => {
      setMessages(prev => [...prev, { 
        role: 'assistant', 
        content: 'This is a sample response.' 
      }])
      // Simulate an action being triggered
      setActions(prev => [...prev, {
        type: 'ANALYZE',
        description: 'Analyzing legal document',
        status: 'pending'
      }])
    }, 1000)

    setInput('')
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
