import { useState } from 'react'
import './App.css'
import { ChatPanel } from '@/components/ChatPanel'
import { ActionsPanel } from '@/components/ActionsPanel'
import { Message, Action } from '@/types'
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import axios from 'axios'

const API_URL = 'http://127.0.0.1:5000/api'

function App() {
  const [input, setInput] = useState('')
  const [actions, setActions] = useState<Action[]>([])
  const queryClient = useQueryClient()

  // Fetch chat history
  const { data: historyData } = useQuery({
    queryKey: ['chatHistory'],
    queryFn: async () => {
      const response = await axios.get(`${API_URL}/history`)
      return response.data.history as Message[]
    }
  })

  const messages = historyData || []

  // Send message mutation
  const chatMutation = useMutation({
    mutationFn: async (message: string) => {
      const response = await axios.post(`${API_URL}/chat`, { message })
      return response.data
    },
    onSuccess: () => {
      // Invalidate and refetch chat history
      queryClient.invalidateQueries({ queryKey: ['chatHistory'] })
    }
  })

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
