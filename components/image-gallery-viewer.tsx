"use client"

interface ImageGalleryViewerProps {
  imageUrls: string[]
  title?: string
}

/**
 * 페이지별 이미지 URL 목록을 세로 스크롤로 보여줍니다.
 * PDF 대신 이미지로 게시한 문서용.
 */
export function ImageGalleryViewer({ imageUrls, title }: ImageGalleryViewerProps) {
  if (!imageUrls.length) {
    return (
      <div className="flex items-center justify-center py-16 text-foreground/60">
        이미지가 없습니다.
      </div>
    )
  }

  return (
    <div className="flex flex-col h-full min-h-[400px]">
      <div className="flex-1 overflow-auto min-h-0 bg-muted/20">
        <div className="flex flex-col items-center gap-6 p-4">
          {imageUrls.map((url, i) => (
            <div key={i} className="shadow-md bg-white" style={{ minWidth: 280 }}>
              <img
                src={url}
                alt={title ? `${title} ${i + 1}페이지` : `페이지 ${i + 1}`}
                className="block w-full h-auto max-w-full"
                loading="lazy"
              />
            </div>
          ))}
        </div>
      </div>
      <p className="shrink-0 py-2 text-center text-xs text-foreground/60">
        총 {imageUrls.length}페이지
      </p>
    </div>
  )
}
