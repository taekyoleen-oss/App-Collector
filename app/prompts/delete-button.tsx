"use client"

import { useTransition } from "react"
import { Button } from "@/components/ui/button"

interface DeleteButtonProps {
  onDelete: () => Promise<void>
  disabled?: boolean
}

export function DeleteButton({ onDelete, disabled }: DeleteButtonProps) {
  const [pending, startTransition] = useTransition()

  const handleClick = () => {
    if (!confirm("정말 삭제할까요?")) return
    startTransition(() => onDelete())
  }

  return (
    <Button type="button" variant="outline" onClick={handleClick} disabled={disabled || pending}>
      {pending ? "삭제 중…" : "삭제"}
    </Button>
  )
}
