"use client"

import { useState } from "react"
import { AiToolCard } from "@/components/ai-tool-card"
import { PdfViewerModal } from "@/components/pdf-viewer-modal"

export interface AiToolItem {
  title: string
  description: string
  href: string
  /** 이미지로 게시한 경우: public 기준 폴더 경로. 예: /ai-tools/문서명 */
  imagesBaseUrl?: string
  imageCount?: number
  imageExt?: "webp" | "png"
  /** 파일명 규칙: "N" = 1.png, 2.png / "page-N" = page-1.png. 생략 시 API가 폴더에서 자동 판별 */
  imageNaming?: "N" | "page-N"
}

export function AiToolsSection({ tools }: { tools: AiToolItem[] }) {
  const [viewer, setViewer] = useState<{
    open: boolean
    url: string
    title: string
    imagesBaseUrl?: string
    imageCount?: number
    imageExt?: "webp" | "png"
    imageNaming?: "N" | "page-N"
  }>({
    open: false,
    url: "",
    title: "",
  })

  const handleOpen = (tool: AiToolItem) => {
    setViewer({
      open: true,
      url: tool.href,
      title: tool.title.replace(/\.pdf$/i, ""),
      imagesBaseUrl: tool.imagesBaseUrl,
      imageCount: tool.imageCount,
      imageExt: tool.imageExt,
      imageNaming: tool.imageNaming,
    })
  }

  return (
    <>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {tools.map((tool) => (
          <AiToolCard
            key={tool.title}
            title={tool.title}
            description={tool.description}
            href={tool.href}
            variant="pastel"
            onOpenInViewer={() => handleOpen(tool)}
          />
        ))}
      </div>
      <PdfViewerModal
        open={viewer.open}
        onOpenChange={(open) => setViewer((prev) => ({ ...prev, open }))}
        pdfUrl={viewer.url}
        title={viewer.title}
        imagesBaseUrl={viewer.imagesBaseUrl}
        imageCount={viewer.imageCount}
        imageExt={viewer.imageExt}
        imageNaming={viewer.imageNaming}
      />
    </>
  )
}
