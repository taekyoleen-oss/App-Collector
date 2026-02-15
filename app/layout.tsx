import React from "react"
import type { Metadata } from 'next'

import { Analytics } from '@vercel/analytics/next'
import './globals.css'

import { Geist, Geist_Mono, Source_Serif_4 } from 'next/font/google'

// Initialize fonts (preload: false로 초기 로드 시 미사용 폰트 preload 경고 완화)
const _geist = Geist({ subsets: ['latin'], weight: ["100","200","300","400","500","600","700","800","900"], preload: false })
const _geistMono = Geist_Mono({ subsets: ['latin'], weight: ["100","200","300","400","500","600","700","800","900"], preload: false })
const _sourceSerif_4 = Source_Serif_4({ subsets: ['latin'], weight: ["200","300","400","500","600","700","800","900"], preload: false })

export const metadata: Metadata = {
  title: 'App Playground',
  description: 'PDF Master, English Tutor, Magic Eraser AI 등 다양한 유틸리티 앱을 테스트해 보세요',
  // 아이콘 미지정 시 브라우저 기본(지구본 등) 표시
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en">
      <body className={`font-sans antialiased`}>
        {children}
        <Analytics />
      </body>
    </html>
  )
}
