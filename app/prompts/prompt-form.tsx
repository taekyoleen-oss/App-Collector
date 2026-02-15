"use client"

import { useTransition } from "react"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Button } from "@/components/ui/button"
import { Label } from "@/components/ui/label"
import { DeleteButton } from "./delete-button"

type SubmitAction = (formData: FormData) => Promise<void>

interface PromptFormProps {
  category: string
  submit: SubmitAction
  initialValues?: {
    title: string
    content: string
    related_links: string
    attachment_urls: string[]
  }
  isEdit?: boolean
  onDelete?: () => Promise<void>
}

export function PromptForm({
  category,
  submit,
  initialValues,
  isEdit,
  onDelete,
}: PromptFormProps) {
  const [pending, startTransition] = useTransition()

  return (
    <form
      action={(fd) => startTransition(() => submit(fd))}
      className="space-y-6 border-2 border-foreground/20 rounded-lg p-6 bg-card"
    >
      <div>
        <Label htmlFor="title">제목</Label>
        <Input
          id="title"
          name="title"
          defaultValue={initialValues?.title}
          placeholder="제목을 입력하세요"
          required
          className="mt-1"
        />
      </div>
      <div>
        <Label htmlFor="content">내용</Label>
        <Textarea
          id="content"
          name="content"
          defaultValue={initialValues?.content}
          placeholder="프롬프트 내용을 입력하세요 (메모장처럼 길게 작성 가능)"
          rows={12}
          className="mt-1 font-mono text-sm"
        />
      </div>
      <div>
        <Label htmlFor="related_links">관련 링크 (한 줄에 하나씩)</Label>
        <Textarea
          id="related_links"
          name="related_links"
          defaultValue={initialValues?.related_links}
          placeholder="https://..."
          rows={3}
          className="mt-1"
        />
      </div>
      {initialValues?.attachment_urls && initialValues.attachment_urls.length > 0 && (
        <div>
          <Label>별첨</Label>
          <ul className="mt-1 text-sm text-foreground/70 list-disc list-inside">
            {initialValues.attachment_urls.map((url, i) => (
              <li key={i}>
                <a href={url} target="_blank" rel="noopener noreferrer" className="underline">
                  {url}
                </a>
              </li>
            ))}
          </ul>
          <p className="text-xs text-foreground/50 mt-1">파일 추가는 추후 Storage 연동 시 지원 예정입니다.</p>
        </div>
      )}
      {isEdit && !(initialValues?.attachment_urls?.length) && (
        <p className="text-xs text-foreground/50">별첨: 파일 추가는 Supabase Storage 연동 후 지원 예정입니다.</p>
      )}

      <div className="flex gap-3">
        <Button type="submit" disabled={pending}>
          {pending ? "저장 중…" : "저장"}
        </Button>
        {isEdit && onDelete && <DeleteButton onDelete={onDelete} disabled={pending} />}
      </div>
    </form>
  )
}
