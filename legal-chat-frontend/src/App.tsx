import { useState } from 'react'
import './App.css'
import { ChatPanel } from '@/components/ChatPanel'
import { ActionsPanel } from '@/components/ActionsPanel'
import { DataCollectionForm } from '@/components/DataCollectionForm'
import { Action, ChatResponse } from '@/types'
import { useChatHistory, useSendMessage } from '@/hooks/useChat'
import { useSubmitUserData } from './hooks/useUserData'


function App() {
  const [input, setInput] = useState('')
  const [actions, setActions] = useState<Action[]>([])
  const [dataCollectionFields, setDataCollectionFields] = useState<Record<string, string> | null>(null)

  // Use the extracted hooks
  const { data: historyData } = useChatHistory()
  const chatMutation = useSendMessage()
  const submitDataMutation = useSubmitUserData()

  const messages = historyData || []

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!input.trim()) return

    try {
      const response: ChatResponse = await chatMutation.mutateAsync(input)
      
      if (response.type === 'data_collection') {
        setDataCollectionFields(response.required_fields || {})
      }

      setInput('')
    } catch (error) {
      console.error('Error sending message:', error)
    }
  }

  const handleDataSubmit = async (data: Record<string, string>) => {
    try {
      await submitDataMutation.mutateAsync(data)
      setDataCollectionFields(null)
    } catch (error) {
      console.error('Error submitting data:', error)
    }
  }

  return (
    <div className="flex h-screen p-4 gap-4">
      <div className="flex-1">
        {dataCollectionFields ? (
          <DataCollectionForm
            fields={dataCollectionFields}
            onSubmit={handleDataSubmit}
            onCancel={() => setDataCollectionFields(null)}
          />
        ) : (
          <ChatPanel
            messages={messages}
            input={input}
            setInput={setInput}
            onSubmit={handleSubmit}
          />
        )}
      </div>
      <div className="flex-1">
        <ActionsPanel actions={actions} />
      </div>
    </div>
  )
}

export default App
