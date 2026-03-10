"use client"

import Link from "next/link"

const navItems = [
  { href: "/", label: "카드보기" },
  { href: "/#reference-links", label: "참고 링크" },
  { href: "/#ai-tools", label: "AI 도구 설명" },
  { href: "/prompts", label: "프롬프트 예제" },
]

export function SiteNav() {
  return (
    <nav className="sticky top-0 z-10 bg-background/80 backdrop-blur-md border-b border-border/40 py-3">
      <div className="container mx-auto px-4">
        <ul className="flex flex-wrap items-center justify-center gap-1 text-sm">
          {navItems.map((item) => (
            <li key={item.href}>
              <Link
                href={item.href}
                className="block px-4 py-2 rounded-lg text-foreground/80 hover:text-foreground hover:bg-muted/60 transition-colors"
              >
                {item.label}
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </nav>
  )
}
