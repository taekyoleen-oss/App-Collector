"use client"

import { useState } from "react"
import { useTransition } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { createPromptCategory } from "./actions"
import { FolderPlus } from "lucide-react"

export function AddCategoryButton() {
  const [open, setOpen] = useState(false)
  const [name, setName] = useState("")
  const [pending, startTransition] = useTransition()
  const [error, setError] = useState<string | null>(null)

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    setError(null)
    const trimmed = name.trim()
    if (!trimmed) {
      setError("카테고리 이름을 입력하세요.")
      return
    }
    startTransition(async () => {
      try {
        await createPromptCategory(trimmed)
        setName("")
        setOpen(false)
      } catch (err) {
        setError(err instanceof Error ? err.message : "추가에 실패했습니다.")
      }
    })
  }

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button
          type="button"
          variant="outline"
          className="border-2 border-foreground shadow-[2px_2px_0px_0px] shadow-foreground/20 hover:shadow-[3px_3px_0px_0px] hover:translate-x-[-1px] hover:translate-y-[-1px]"
        >
          <FolderPlus className="h-4 w-4" />
          카테고리 추가
        </Button>
      </DialogTrigger>
      <DialogContent>
        <form onSubmit={handleSubmit}>
          <DialogHeader>
            <DialogTitle>카테고리 추가</DialogTitle>
          </DialogHeader>
          <div className="py-4">
            <Label htmlFor="category-name" className="text-sm">
              이름
            </Label>
            <Input
              id="category-name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="예: 클로드"
              className="mt-2"
              disabled={pending}
              autoFocus
            />
            {error && (
              <p className="mt-2 text-sm text-destructive">{error}</p>
            )}
          </div>
          <DialogFooter>
            <Button type="submit" disabled={pending}>
              {pending ? "추가 중…" : "추가"}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  )
}
