export interface Message {
  role: 'user' | 'assistant'
  content: string
}

export interface Action {
  type: string
  description: string
  status: 'pending' | 'completed' | 'failed'
} 