"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { PromptForm } from "../prompt-form"
import { Pencil, Copy, Check } from "lucide-react"
import type { PromptExample } from "@/lib/supabase/types"

type SubmitAction = (formData: FormData) => Promise<void>

interface PromptDetailClientProps {
  item: PromptExample
  submit: SubmitAction
  remove: () => Promise<void>
}

export function PromptDetailClient({ item, submit, remove }: PromptDetailClientProps) {
  const [isEditing, setIsEditing] = useState(false)
  const [copied, setCopied] = useState(false)

  const contentToCopy = item.content?.trim() ?? ""

  async function handleCopyContent() {
    if (!contentToCopy) return
    try {
      await navigator.clipboard.writeText(contentToCopy)
      setCopied(true)
      setTimeout(() => setCopied(false), 2000)
    } catch {
      // fallback for older browsers
      const textArea = document.createElement("textarea")
      textArea.value = contentToCopy
      document.body.appendChild(textArea)
      textArea.select()
      document.execCommand("copy")
      document.body.removeChild(textArea)
      setCopied(true)
      setTimeout(() => setCopied(false), 2000)
    }
  }

  const relatedLines = (item.related_links?.trim() ?? "").split(/\r?\n/).filter(Boolean)
  const attachments = item.attachment_urls ?? []

  if (isEditing) {
    return (
      <PromptForm
          category={item.category}
          submit={submit}
          initialValues={{
            title: item.title,
            content: item.content ?? "",
            related_links: item.related_links ?? "",
            attachment_urls: item.attachment_urls ?? [],
          }}
          isEdit
          onDelete={remove}
          onCancel={() => setIsEditing(false)}
        />
    )
  }

  return (
    <>
      <div className="rounded-xl border-2 border-foreground/15 bg-card p-6 mb-6 shadow-[3px_3px_0px_0px] shadow-foreground/10">
        <h1 className="text-xl font-bold text-foreground mb-3">{item.title || "제목 없음"}</h1>
        <div className="text-foreground text-sm leading-relaxed whitespace-pre-wrap break-words mb-4">
          {item.content?.trim() || "내용 없음"}
        </div>
        {(relatedLines.length > 0 || attachments.length > 0) && (
          <div className="pt-3 border-t border-foreground/10 space-y-2">
            {relatedLines.length > 0 && (
              <div>
                <p className="text-[11px] text-foreground/50 mb-1">관련 링크</p>
                <ul className="text-xs text-foreground/60 space-y-0.5">
                  {relatedLines.map((line, i) => (
                    <li key={i}>
                      <a href={line.startsWith("http") ? line : `https://${line}`} target="_blank" rel="noopener noreferrer" className="hover:underline break-all">
                        {line}
                      </a>
                    </li>
                  ))}
                </ul>
              </div>
            )}
            {attachments.length > 0 && (
              <div>
                <p className="text-[11px] text-foreground/50 mb-1">별첨</p>
                <ul className="text-xs text-foreground/60 space-y-0.5">
                  {attachments.map((url, i) => (
                    <li key={i}>
                      <a href={url} target="_blank" rel="noopener noreferrer" className="hover:underline break-all">{url}</a>
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </div>
        )}
      </div>
      <div className="flex flex-wrap gap-2">
        <Button
          type="button"
          onClick={handleCopyContent}
          disabled={!contentToCopy}
          variant="outline"
          className="border-2 border-foreground shadow-[2px_2px_0px_0px] shadow-foreground/20 hover:shadow-[3px_3px_0px_0px] hover:translate-x-[-1px] hover:translate-y-[-1px]"
        >
          {copied ? <Check className="h-4 w-4 text-green-600" /> : <Copy className="h-4 w-4" />}
          {copied ? "복사됨" : "내용 복사"}
        </Button>
        <Button
          type="button"
          onClick={() => setIsEditing(true)}
          className="border-2 border-foreground shadow-[3px_3px_0px_0px] shadow-foreground/20 hover:shadow-[4px_4px_0px_0px] hover:translate-x-[-1px] hover:translate-y-[-1px]"
        >
          <Pencil className="h-4 w-4" />
          수정
        </Button>
      </div>
    </>
  )
}
