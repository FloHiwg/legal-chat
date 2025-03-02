import { useMutation, useQueryClient } from '@tanstack/react-query'
import { ChatResponse } from '@/types'

const submitUserData = async (data: Record<string, string>): Promise<ChatResponse> => {
  const response = await fetch('/api/submit-user-data', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(data),
  })

  if (!response.ok) {
    throw new Error('Failed to submit user data')
  }

  return response.json()
}

export function useSubmitUserData() {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: submitUserData,
    onSuccess: () => {
      // Invalidate chat history to trigger a refetch
      queryClient.invalidateQueries({ queryKey: ['chatHistory'] })
    },
  })
} 