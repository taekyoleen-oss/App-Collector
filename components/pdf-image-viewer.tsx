"use client"

import { useState, useCallback, useEffect, useMemo } from "react"
import { Document, Page, pdfjs } from "react-pdf"
import "react-pdf/dist/Page/AnnotationLayer.css"
import "react-pdf/dist/Page/TextLayer.css"

// public에 복사한 worker 사용 (CDN 대신 동일 오리진으로 로드)
if (typeof window !== "undefined") {
  pdfjs.GlobalWorkerOptions.workerSrc = "/pdf.worker.min.mjs"
}


interface PdfImageViewerProps {
  pdfUrl: string
  title?: string
}

/**
 * PDF를 페이지별로 캔버스(이미지)에 렌더링하여 보여줍니다.
 */
export function PdfImageViewer({ pdfUrl, title }: PdfImageViewerProps) {
  const [pdfData, setPdfData] = useState<ArrayBuffer | null>(null)
  const [numPages, setNumPages] = useState<number | null>(null)
  const [error, setError] = useState<string | null>(null)
  const [loadError, setLoadError] = useState<string | null>(null)

  const documentOptions = useMemo(
    () => ({
      standardFontDataUrl: `https://unpkg.com/pdfjs-dist@${pdfjs.version}/standard_fonts/`,
      cMapUrl: `https://unpkg.com/pdfjs-dist@${pdfjs.version}/cmaps/`,
      cMapPacked: true,
      useSystemFonts: false,
      verbosity: 0, // 0 = errors only. PDF 내장 이미지 디코딩 경고(JpegError 등)를 콘솔에 안 띄움
    }),
    []
  )

  useEffect(() => {
    if (!pdfUrl) {
      setPdfData(null)
      setNumPages(null)
      return
    }
    setPdfData(null)
    setNumPages(null)
    setLoadError(null)
    setError(null)
    fetch(pdfUrl)
      .then((res) => {
        if (!res.ok) throw new Error(`HTTP ${res.status}`)
        return res.arrayBuffer()
      })
      .then(setPdfData)
      .catch((e) => setLoadError(e?.message ?? "PDF를 불러올 수 없습니다."))
  }, [pdfUrl])

  const onDocumentLoadSuccess = useCallback(({ numPages }: { numPages: number }) => {
    setNumPages(numPages)
    setError(null)
  }, [])

  const onDocumentLoadError = useCallback((err: Error) => {
    setError(err?.message ?? "PDF를 파싱할 수 없습니다.")
  }, [])

  const fileProp = useMemo(
    () => (pdfData ? { data: pdfData } : undefined),
    [pdfData]
  )

  if (!pdfUrl) return null

  if (loadError) {
    return (
      <div className="flex items-center justify-center p-8">
        <p className="text-sm text-destructive">{loadError}</p>
      </div>
    )
  }

  if (!pdfData) {
    return (
      <div className="flex items-center justify-center py-16 text-foreground/60">
        PDF 불러오는 중…
      </div>
    )
  }

  return (
    <div className="flex flex-col h-full min-h-[400px]">
      {error && (
        <div className="p-4 bg-destructive/10 text-destructive text-sm rounded-md shrink-0">
          {error}
        </div>
      )}
      <div className="flex-1 overflow-auto min-h-0 bg-muted/20">
        <Document
          file={fileProp}
          options={documentOptions}
          onLoadSuccess={onDocumentLoadSuccess}
          onLoadError={onDocumentLoadError}
          className="flex flex-col items-center gap-6 p-4"
        >
          {numPages !== null &&
            Array.from(new Array(numPages), (_, i) => i + 1).map((pageNumber) => (
              <div
                key={pageNumber}
                className="shadow-md bg-white"
                style={{ minWidth: 280 }}
              >
                <Page
                  pageNumber={pageNumber}
                  width={Math.min(800, typeof window !== "undefined" ? window.innerWidth * 0.9 : 800)}
                  scale={1.2}
                  renderTextLayer={true}
                  renderAnnotationLayer={true}
                  loading={
                    <div
                      className="flex items-center justify-center bg-muted/30 text-foreground/50 text-sm"
                      style={{ width: 600, height: 400 }}
                    >
                      {pageNumber}페이지 렌더링 중…
                    </div>
                  }
                />
              </div>
            ))}
        </Document>
      </div>
      {numPages !== null && (
        <p className="shrink-0 py-2 text-center text-xs text-foreground/60">
          총 {numPages}페이지
        </p>
      )}
    </div>
  )
}
