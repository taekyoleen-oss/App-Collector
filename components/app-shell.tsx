"use client"

import * as React from "react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { LayoutGrid, Link2, Bot, MessageSquareText, Menu, X, PanelLeftClose, ArrowUp } from "lucide-react"

import { cn } from "@/lib/utils"
import { useIsMobile } from "@/components/ui/use-mobile"

type NavItem = {
  /** 메뉴 라벨 */
  label: string
  /** 이동 경로 (해시 포함 가능) */
  href: string
  /** 아이콘 */
  icon: React.ComponentType<{ className?: string }>
  /** 해시 기반 동일 페이지 이동 여부 (스크롤) */
  isHash?: boolean
  /** 스크롤스파이로 추적할 섹션 id (홈 전용) */
  sectionId?: string
}

const navItems: NavItem[] = [
  { label: "카드보기", href: "/", icon: LayoutGrid, sectionId: "card-view" },
  { label: "참고 링크", href: "/#reference-links", icon: Link2, isHash: true, sectionId: "reference-links" },
  { label: "AI 도구 설명", href: "/#ai-tools", icon: Bot, isHash: true, sectionId: "ai-tools" },
  { label: "프롬프트 예제", href: "/prompts", icon: MessageSquareText },
]

const SIDEBAR_WIDTH = "16rem"
const STORAGE_KEY = "app-sidebar-open"

export function AppShell({ children }: { children: React.ReactNode }) {
  const isMobile = useIsMobile()
  const pathname = usePathname()

  // 사이드바 열림 상태. 데스크톱은 기본 열림, 모바일은 닫힘. 데스크톱 선호는 localStorage에 저장.
  const [open, setOpen] = React.useState(true)
  const [hydrated, setHydrated] = React.useState(false)

  React.useEffect(() => {
    setHydrated(true)
    const saved = typeof window !== "undefined" ? window.localStorage.getItem(STORAGE_KEY) : null
    if (saved !== null) {
      setOpen(saved === "true")
    }
  }, [])

  // 모바일 전환 시 자동으로 닫음
  React.useEffect(() => {
    if (isMobile) setOpen(false)
  }, [isMobile])

  const toggle = React.useCallback(() => {
    setOpen((prev) => {
      const next = !prev
      if (!isMobile && typeof window !== "undefined") {
        window.localStorage.setItem(STORAGE_KEY, String(next))
      }
      return next
    })
  }, [isMobile])

  const close = React.useCallback(() => setOpen(false), [])

  // 모바일에서 열린 상태일 때 Esc로 닫기
  React.useEffect(() => {
    if (!isMobile || !open) return
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") close()
    }
    window.addEventListener("keydown", onKey)
    return () => window.removeEventListener("keydown", onKey)
  }, [isMobile, open, close])

  // 스크롤스파이: 홈에서 현재 보이는 섹션을 활성화
  const [activeSection, setActiveSection] = React.useState<string>("card-view")
  const isHome = pathname === "/"

  React.useEffect(() => {
    if (!isHome) return
    const ids = navItems.map((i) => i.sectionId).filter(Boolean) as string[]
    const sections = ids
      .map((id) => document.getElementById(id))
      .filter((el): el is HTMLElement => el !== null)
    if (sections.length === 0) return

    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((e) => e.isIntersecting)
          .sort((a, b) => b.intersectionRatio - a.intersectionRatio)
        if (visible[0]) setActiveSection(visible[0].target.id)
      },
      { rootMargin: "-45% 0px -45% 0px", threshold: [0, 0.25, 0.5, 1] },
    )
    sections.forEach((s) => observer.observe(s))
    return () => observer.disconnect()
  }, [isHome])

  const isActive = (item: NavItem) => {
    if (item.href === "/prompts") return pathname.startsWith("/prompts")
    if (isHome && item.sectionId) return activeSection === item.sectionId
    return false
  }

  const handleNavClick = () => {
    if (isMobile) close()
  }

  return (
    <div className="min-h-screen">
      {/* 상단 앱 바 */}
      <header className="sticky top-0 z-50 flex h-14 items-center gap-2 border-b border-border/40 bg-background/80 px-3 backdrop-blur-md">
        <button
          type="button"
          onClick={toggle}
          aria-label={open ? "메뉴 닫기" : "메뉴 열기"}
          aria-expanded={open}
          aria-controls="app-sidebar"
          className="inline-flex h-10 w-10 items-center justify-center rounded-lg text-foreground/80 transition-colors hover:bg-muted/70 hover:text-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
        >
          {open && !isMobile ? <PanelLeftClose className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
        </button>
        <Link href="/" className="flex items-center gap-2 font-bold tracking-tight">
          <span className="inline-flex h-7 w-7 items-center justify-center rounded-lg bg-primary text-primary-foreground">
            <LayoutGrid className="h-4 w-4" />
          </span>
          <span className="text-base">App Playground</span>
        </Link>
      </header>

      {/* 모바일 오버레이 배경 */}
      {hydrated && isMobile && open && (
        <div
          className="fixed inset-0 top-14 z-30 bg-foreground/30 backdrop-blur-sm"
          onClick={close}
          aria-hidden="true"
        />
      )}

      {/* 사이드바 */}
      <aside
        id="app-sidebar"
        aria-label="주요 메뉴"
        className={cn(
          "fixed bottom-0 left-0 top-14 z-40 flex flex-col border-r border-sidebar-border bg-sidebar transition-transform duration-300 ease-in-out",
          open ? "translate-x-0" : "-translate-x-full",
        )}
        style={{ width: SIDEBAR_WIDTH }}
      >
        <nav className="flex-1 overflow-y-auto p-3">
          <p className="px-3 pb-2 pt-1 text-xs font-semibold uppercase tracking-wider text-sidebar-foreground/50">
            메뉴
          </p>
          <ul className="space-y-1">
            {navItems.map((item) => {
              const active = isActive(item)
              const Icon = item.icon
              const className = cn(
                "group flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium transition-colors",
                active
                  ? "bg-sidebar-primary text-sidebar-primary-foreground shadow-sm"
                  : "text-sidebar-foreground/80 hover:bg-sidebar-accent hover:text-sidebar-accent-foreground",
              )
              return (
                <li key={item.href}>
                  {item.isHash ? (
                    <a href={item.href} className={className} onClick={handleNavClick} aria-current={active ? "true" : undefined}>
                      <Icon className="h-5 w-5 shrink-0" />
                      <span>{item.label}</span>
                    </a>
                  ) : (
                    <Link href={item.href} className={className} onClick={handleNavClick} aria-current={active ? "page" : undefined}>
                      <Icon className="h-5 w-5 shrink-0" />
                      <span>{item.label}</span>
                    </Link>
                  )}
                </li>
              )
            })}
          </ul>
        </nav>

        {/* 모바일 닫기 버튼 */}
        {isMobile && (
          <div className="border-t border-sidebar-border p-3">
            <button
              type="button"
              onClick={close}
              className="flex w-full items-center justify-center gap-2 rounded-lg px-3 py-2 text-sm font-medium text-sidebar-foreground/70 transition-colors hover:bg-sidebar-accent hover:text-sidebar-accent-foreground"
            >
              <X className="h-4 w-4" />
              메뉴 닫기
            </button>
          </div>
        )}

        <div className="border-t border-sidebar-border px-4 py-3">
          <p className="text-xs text-sidebar-foreground/50">다양한 유틸리티 앱 모음</p>
        </div>
      </aside>

      {/* 본문 — 데스크톱에서 사이드바가 열리면 좌측 여백 확보 */}
      <div className={cn("transition-[padding] duration-300 ease-in-out", open && "lg:pl-64")}>
        {children}
      </div>

      <BackToTop />
    </div>
  )
}

/** 우측 하단 맨 위로 버튼 */
function BackToTop() {
  const [visible, setVisible] = React.useState(false)

  React.useEffect(() => {
    const onScroll = () => setVisible(window.scrollY > 400)
    onScroll()
    window.addEventListener("scroll", onScroll, { passive: true })
    return () => window.removeEventListener("scroll", onScroll)
  }, [])

  return (
    <button
      type="button"
      onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
      aria-label="맨 위로 이동"
      className={cn(
        "fixed bottom-6 right-6 z-50 inline-flex h-11 w-11 items-center justify-center rounded-full bg-primary text-primary-foreground shadow-lg shadow-primary/30 transition-all duration-300 hover:bg-primary/90 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring",
        visible ? "translate-y-0 opacity-100" : "pointer-events-none translate-y-4 opacity-0",
      )}
    >
      <ArrowUp className="h-5 w-5" />
    </button>
  )
}
