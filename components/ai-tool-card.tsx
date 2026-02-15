"use client"

import { Card, CardContent, CardHeader } from "@/components/ui/card"
import { FileText } from "lucide-react"
import { cn } from "@/lib/utils"

export interface AiToolCardProps {
  title: string
  description: string
  /** PDF 또는 외부 URL. 예: /ai-tools/cursor-guide.pdf */
  href: string
  /** 파스텔 톤 스타일 (AI 도구 설명 섹션용) */
  variant?: "default" | "pastel"
  /** 지정 시 카드 클릭 시 이 콜백을 호출하고, 링크 이동 대신 모달에서 PDF/이미지를 띄웁니다 */
  onOpenInViewer?: () => void
}

export function AiToolCard({ title, description, href, variant = "default", onOpenInViewer }: AiToolCardProps) {
  const isPastel = variant === "pastel"
  const displayTitle = title.replace(/\.pdf$/i, "")
  const cardClassName = cn(
    "block h-full text-inherit no-underline focus:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 rounded-xl",
    "transition-all duration-200 cursor-pointer",
    isPastel
      ? "border-2 border-amber-200/70 bg-white/90 shadow-[3px_3px_0px_0px] shadow-amber-300/30 hover:shadow-[4px_4px_0px_0px] hover:shadow-amber-300/40 hover:translate-x-[-1px] hover:translate-y-[-1px]"
      : "border-2 border-foreground shadow-[3px_3px_0px_0px] shadow-foreground hover:shadow-[4px_4px_0px_0px] hover:translate-x-[-1px] hover:translate-y-[-1px] bg-card"
  )

  const cardContent = (
    <Card className="h-full border-0 shadow-none py-0 gap-0 [.border-b]:pb-0">
      <CardHeader className="pb-2 pt-4 px-4">
        <div className="flex items-center gap-2">
          <div
            className={cn(
              "p-2 flex-shrink-0 border-2",
              isPastel ? "bg-amber-50 border-amber-200/80" : "bg-muted border-foreground"
            )}
          >
            <FileText className="h-4 w-4" />
          </div>
          <span className={cn("font-bold break-words", isPastel ? "text-base text-foreground/90" : "text-base")}>
            {displayTitle}
          </span>
        </div>
      </CardHeader>
      <CardContent className="px-4 pb-4 pt-0">
        <p className={cn("text-sm line-clamp-3", isPastel ? "text-foreground/75" : "text-foreground/80")}>
          {description}
        </p>
        <p className={cn("text-xs mt-2 font-medium", isPastel ? "text-amber-700/90" : "text-primary")}>
          {onOpenInViewer ? "클릭하면 문서 보기 →" : "클릭하면 문서 열기 →"}
        </p>
      </CardContent>
    </Card>
  )

  if (onOpenInViewer) {
    return (
      <button
        type="button"
        onClick={() => onOpenInViewer()}
        className={cardClassName}
      >
        {cardContent}
      </button>
    )
  }

  return (
    <a href={href} target="_self" rel="noopener" className={cardClassName}>
      {cardContent}
    </a>
  )
}
