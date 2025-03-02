import { Button } from "@/components/ui/button"
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardFooter,
} from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { useState } from "react"

interface DataCollectionFormProps {
  fields: Record<string, string>
  onSubmit: (data: Record<string, string>) => void
  onCancel: () => void
}

export function DataCollectionForm({ fields, onSubmit, onCancel }: DataCollectionFormProps) {
  const [formData, setFormData] = useState<Record<string, string>>({})

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    onSubmit(formData)
  }

  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle>Please provide the following information</CardTitle>
      </CardHeader>
      <form onSubmit={handleSubmit}>
        <CardContent className="space-y-4">
          {Object.entries(fields).map(([key, description]) => (
            <div key={key} className="space-y-2">
              <Label htmlFor={key}>{description}</Label>
              <Input
                id={key}
                value={formData[key] || ''}
                onChange={(e) => setFormData(prev => ({
                  ...prev,
                  [key]: e.target.value
                }))}
                required
              />
            </div>
          ))}
        </CardContent>
        <CardFooter className="flex justify-end space-x-2">
          <Button type="button" variant="outline" onClick={onCancel}>
            Cancel
          </Button>
          <Button type="submit">Submit</Button>
        </CardFooter>
      </form>
    </Card>
  )
} 