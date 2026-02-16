import Link from "next/link"
import { Link2, Paperclip } from "lucide-react"
import type { PromptExample } from "@/lib/supabase/types"

function formatDate(iso: string | null | undefined): string {
  if (!iso) return ""
  try {
    const d = new Date(iso)
    return `${d.getFullYear().toString().slice(2)}. ${d.getMonth() + 1}. ${d.getDate()}.`
  } catch {
    return ""
  }
}

/** 한 카드: 제목·내용을 크게, 관련 링크·별첨·날짜는 작게 (첨부 이미지 스타일) */
export function PromptCard({ item }: { item: PromptExample }) {
  const content = item.content?.trim() ?? ""
  const relatedLines = (item.related_links?.trim() ?? "").split(/\r?\n/).filter(Boolean)
  const attachments = item.attachment_urls ?? []

  return (
    <Link
      href={`/prompts/${item.id}`}
      className="block h-full rounded-xl border-2 border-foreground/15 bg-card p-5 shadow-[3px_3px_0px_0px] shadow-foreground/10 hover:border-foreground/30 hover:shadow-[4px_4px_0px_0px] hover:shadow-foreground/20 transition-all duration-200 flex flex-col"
    >
      <h3 className="text-lg font-bold text-foreground mb-3 line-clamp-1">
        {item.title || "제목 없음"}
      </h3>
      <div className="flex-1 min-h-0">
        <p className="text-foreground text-sm leading-relaxed whitespace-pre-wrap line-clamp-6 break-words">
          {content || "내용 없음"}
        </p>
      </div>
      {(relatedLines.length > 0 || attachments.length > 0) && (
        <div className="mt-4 pt-3 border-t border-foreground/10 space-y-1.5">
          {relatedLines.length > 0 && (
            <div className="flex items-start gap-1.5">
              <Link2 className="h-3.5 w-3.5 text-foreground/50 flex-shrink-0 mt-0.5" />
              <div className="text-xs text-foreground/60 min-w-0 space-y-0.5 line-clamp-3">
                {relatedLines.slice(0, 3).map((line, i) => (
                  <a
                    key={i}
                    href={line.startsWith("http") ? line : `https://${line}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    onClick={(e) => e.stopPropagation()}
                    className="block truncate hover:underline"
                  >
                    {line}
                  </a>
                ))}
                {relatedLines.length > 3 && (
                  <span className="text-foreground/40">외 {relatedLines.length - 3}개</span>
                )}
              </div>
            </div>
          )}
          {attachments.length > 0 && (
            <div className="flex items-start gap-1.5">
              <Paperclip className="h-3.5 w-3.5 text-foreground/50 flex-shrink-0 mt-0.5" />
              <div className="text-xs text-foreground/50">
                별첨 {attachments.length}개
              </div>
            </div>
          )}
        </div>
      )}
      <p className="text-[11px] text-foreground/40 mt-3">
        내 메모 · {formatDate(item.last_used_at || item.updated_at || item.created_at)}
      </p>
    </Link>
  )
}
