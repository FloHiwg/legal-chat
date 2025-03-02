export interface Message {
  role: 'user' | 'assistant'
  content: string
}

export interface Action {
  type: string
  description: string
  status: 'pending' | 'completed' | 'error'
}

export interface ChatMessage {
  role: string
  content: string
}

export interface ChatResponse {
  type: 'message' | 'data_collection'
  response?: string
  required_fields?: Record<string, string>
  history: ChatMessage[]
  user_info?: Record<string, string>
} 