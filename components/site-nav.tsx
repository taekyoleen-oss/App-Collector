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
    <nav className="sticky top-0 z-10 bg-background/95 backdrop-blur-sm py-2">
      <div className="container mx-auto px-4">
        <ul className="flex flex-wrap items-center justify-center gap-x-4 gap-y-1 text-sm">
          {navItems.map((item) => (
            <li key={item.href}>
              <Link
                href={item.href}
                className="text-foreground/80 hover:text-foreground hover:underline"
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
