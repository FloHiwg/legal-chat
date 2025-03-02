import { Action } from '@/types'

export function ActionCard({ type, description, status }: Action) {
  return (
    <div className="border rounded-lg p-4">
      <h3 className="font-medium">{type}</h3>
      <p className="text-sm text-gray-600">{description}</p>
      <span
        className={`text-sm ${
          status === 'completed'
            ? 'text-green-500'
            : status === 'failed'
            ? 'text-red-500'
            : 'text-yellow-500'
        }`}
      >
        {status}
      </span>
    </div>
  )
} 