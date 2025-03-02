import { ActionCard } from '@/components/ActionCard'
import { Action } from '@/types'
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"

interface ActionsPanelProps {
  actions: Action[]
}

export function ActionsPanel({ actions }: ActionsPanelProps) {
  return (
    <Card className="h-full">
      <CardHeader>
        <CardTitle>Actions</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        {actions.map((action, index) => (
          <ActionCard key={index} {...action} />
        ))}
      </CardContent>
    </Card>
  )
} 