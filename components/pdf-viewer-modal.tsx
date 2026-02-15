"use client"

import { useMemo, useState, useEffect } from "react"
import dynamic from "next/dynamic"
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import { ExternalLink } from "lucide-react"
import { ImageGalleryViewer } from "@/components/image-gallery-viewer"

const PdfImageViewer = dynamic(
  () => import("@/components/pdf-image-viewer").then((m) => m.PdfImageViewer),
  { ssr: false, loading: () => <div className="flex items-center justify-center py-16 text-foreground/60">뷰어 불러오는 중…</div> }
)

interface PdfViewerModalProps {
  open: boolean
  onOpenChange: (open: boolean) => void
  /** PDF URL (새 탭에서 열기용) */
  pdfUrl: string
  title?: string
  /** 이미지로 게시한 경우: public 기준 폴더 경로. 예: /ai-tools/문서명. imageCount 생략 시 API로 자동 조회 */
  imagesBaseUrl?: string
  imageCount?: number
  imageExt?: "webp" | "png"
  /** 파일명 규칙: "N" = 1.png, 2.png / "page-N" = page-1.png, page-2.png. 생략 시 API 응답 사용 */
  imageNaming?: "N" | "page-N"
}

/**
 * PDF 또는 페이지별 이미지를 모달에 표시합니다.
 * imagesBaseUrl + imageExt 만 넣어도 됨. imageCount 생략 시 /api/ai-tools-images 로 개수 자동 조회.
 */
export function PdfViewerModal({
  open,
  onOpenChange,
  pdfUrl,
  title,
  imagesBaseUrl,
  imageCount: imageCountProp = 0,
  imageExt: imageExtProp = "webp",
  imageNaming: imageNamingProp,
}: PdfViewerModalProps) {
  const [fetchedCount, setFetchedCount] = useState<number | null>(null)
  const [fetchedExt, setFetchedExt] = useState<"webp" | "png" | null>(null)
  const [fetchedNaming, setFetchedNaming] = useState<"N" | "page-N" | null>(null)
  const [fetchDone, setFetchDone] = useState(false)

  const folderName = useMemo(() => {
    if (!imagesBaseUrl) return ""
    const base = imagesBaseUrl.startsWith("/") ? imagesBaseUrl : `/${imagesBaseUrl}`
    const segments = base.split("/").filter(Boolean)
    return segments.length ? segments[segments.length - 1] : ""
  }, [imagesBaseUrl])

  useEffect(() => {
    if (!open || !folderName || imageCountProp > 0) {
      setFetchDone(true)
      return
    }
    setFetchedCount(null)
    setFetchedExt(null)
    setFetchedNaming(null)
    setFetchDone(false)
    fetch(`/api/ai-tools-images?folder=${encodeURIComponent(folderName)}`)
      .then((r) => r.ok ? r.json() : null)
      .then((data: { count: number; ext: string; naming?: string } | null) => {
        if (data && data.count > 0) {
          setFetchedCount(data.count)
          setFetchedExt(data.ext === "webp" ? "webp" : "png")
          setFetchedNaming(data.naming === "N" ? "N" : "page-N")
        }
        setFetchDone(true)
      })
      .catch(() => setFetchDone(true))
  }, [open, folderName, imageCountProp])

  const imageCount = imageCountProp > 0 ? imageCountProp : (fetchedCount ?? 0)
  const imageExt = imageCountProp > 0 ? imageExtProp : (fetchedExt ?? imageExtProp)
  const imageNaming = imageNamingProp ?? (fetchedNaming ?? "page-N")

  const imageUrls = useMemo(() => {
    if (!imagesBaseUrl || !imageCount) return []
    const base = imagesBaseUrl.startsWith("/") ? imagesBaseUrl : `/${imagesBaseUrl}`
    const encodedBase = base.split("/").map((p) => encodeURIComponent(p)).join("/")
    return Array.from(
      { length: imageCount },
      (_, i) =>
        imageNaming === "N"
          ? `${encodedBase}/${i + 1}.${imageExt}`
          : `${encodedBase}/page-${i + 1}.${imageExt}`
    )
  }, [imagesBaseUrl, imageCount, imageExt, imageNaming])

  const useImageViewer = imageUrls.length > 0

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent
        className="max-w-[95vw] w-full h-[90vh] sm:max-w-4xl flex flex-col p-0 gap-0"
        showCloseButton={true}
      >
        {title && (
          <DialogHeader className="px-4 py-3 border-b shrink-0 flex flex-row items-center justify-between gap-2 pr-12">
            <DialogTitle className="text-base font-medium truncate min-w-0 flex-1">
              {title}
            </DialogTitle>
            <a
              href={pdfUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="text-xs text-primary hover:underline shrink-0 flex items-center gap-1"
            >
              새 탭에서 열기 <ExternalLink className="h-3 w-3" />
            </a>
          </DialogHeader>
        )}
        <div className="flex-1 min-h-0 flex flex-col overflow-hidden" style={{ minHeight: "60vh" }}>
          {open && (pdfUrl || imageUrls.length) ? (
            useImageViewer ? (
              <ImageGalleryViewer imageUrls={imageUrls} title={title} />
            ) : imagesBaseUrl && imageCountProp === 0 && !fetchDone ? (
              <div className="flex items-center justify-center py-16 text-foreground/60">이미지 목록 불러오는 중…</div>
            ) : (
              <PdfImageViewer pdfUrl={pdfUrl} title={title} />
            )
          ) : null}
        </div>
      </DialogContent>
    </Dialog>
  )
}
