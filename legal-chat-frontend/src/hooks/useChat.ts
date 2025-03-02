import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query'
import axios from 'axios'
import { Message } from '@/types'

const API_URL = 'http://127.0.0.1:5000/api'

export function useChatHistory() {
  return useQuery({
    queryKey: ['chatHistory'],
    queryFn: async () => {
      const response = await axios.get(`${API_URL}/history`)
      return response.data.history as Message[]
    }
  })
}

export function useSendMessage() {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: async (message: string) => {
      const response = await axios.post(`${API_URL}/chat`, { message })
      return response.data
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['chatHistory'] })
    }
  })
} 