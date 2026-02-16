"use client"

import { useState } from "react"
import { useTransition } from "react"
import { deletePromptCategory } from "./actions"
import { Trash2 } from "lucide-react"

interface DeleteCategoryButtonProps {
  categoryName: string
}

export function DeleteCategoryButton({ categoryName }: DeleteCategoryButtonProps) {
  const [pending, startTransition] = useTransition()
  const [message, setMessage] = useState<string | null>(null)

  function handleClick() {
    setMessage(null)
    startTransition(async () => {
      try {
        await deletePromptCategory(categoryName)
      } catch (err) {
        setMessage(err instanceof Error ? err.message : "삭제에 실패했습니다.")
      }
    })
  }

  return (
    <div className="mt-8 pt-6 border-t border-foreground/10">
      <button
        type="button"
        onClick={handleClick}
        disabled={pending}
        className="inline-flex items-center gap-1 text-xs text-foreground/50 hover:text-foreground/70 disabled:opacity-50"
      >
        <Trash2 className="h-3.5 w-3.5" />
        카테고리 삭제
      </button>
      {message && (
        <p className="mt-2 text-xs text-destructive">{message}</p>
      )}
    </div>
  )
}
