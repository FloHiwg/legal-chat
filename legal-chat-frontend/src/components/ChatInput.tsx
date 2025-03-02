interface ChatInputProps {
  input: string
  setInput: (input: string) => void
  onSubmit: (e: React.FormEvent) => void
}

export function ChatInput({ input, setInput, onSubmit }: ChatInputProps) {
  return (
    <form onSubmit={onSubmit} className="w-full">
      <div className="flex space-x-4">
        <input
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          className="flex-1 px-4 py-2 rounded-lg border border-gray-300 focus:outline-none focus:border-blue-500"
          placeholder="Type your message..."
        />
        <button
          type="submit"
          className="px-6 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 focus:outline-none"
        >
          Send
        </button>
      </div>
    </form>
  )
} 