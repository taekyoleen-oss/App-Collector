import Link from "next/link"
import { SiteNav } from "@/components/site-nav"

export default function PromptsLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <header className="border-b-2 border-foreground bg-card">
        <div className="container mx-auto px-4 py-4">
          <Link
            href="/"
            className="text-lg font-bold text-primary hover:underline inline-block"
          >
            ← App Playground
          </Link>
        </div>
      </header>
      <SiteNav />
      {children}
    </>
  )
}
