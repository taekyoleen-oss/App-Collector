import Link from "next/link"
import { getPromptExamples } from "./actions"
import { PROMPT_CATEGORIES, SORT_OPTIONS } from "./constants"
import type { SortOption } from "./actions"
import { Plus, FileText } from "lucide-react"

export const dynamic = "force-dynamic"

export default async function PromptsPage({
  searchParams,
}: {
  searchParams: Promise<{ category?: string; sort?: string }>
}) {
  const params = await searchParams
  const category = params.category ?? PROMPT_CATEGORIES[0]
  const sort = (params.sort ?? "last_used") as SortOption

  let items: Awaited<ReturnType<typeof getPromptExamples>> = []
  let error: string | null = null
  try {
    items = await getPromptExamples(category, sort)
  } catch (e) {
    error = e instanceof Error ? e.message : "목록을 불러올 수 없습니다."
  }

  return (
    <main className="min-h-screen bg-background">
      <div className="container mx-auto px-4 py-8 max-w-4xl">
        <h1 className="text-2xl font-bold mb-6">프롬프트 예제</h1>

        {error && (
          <div className="mb-6 p-4 bg-destructive/10 text-destructive rounded-md text-sm">
            {error}
            <p className="mt-2 text-foreground/80">
              <code className="text-xs">docs/supabase-setup-guide.md</code>
              를 확인하고 .env.local 에 URL과 키를 설정하세요.
            </p>
          </div>
        )}

        <div className="flex flex-wrap gap-2 mb-6">
          {PROMPT_CATEGORIES.map((c) => (
            <Link
              key={c}
              href={`/prompts?category=${encodeURIComponent(c)}&sort=${encodeURIComponent(sort)}`}
              className={`px-4 py-2 rounded-md border-2 text-sm font-medium transition-colors ${
                c === category
                  ? "bg-primary text-primary-foreground border-primary"
                  : "bg-background border-foreground/30 hover:border-foreground/60"
              }`}
            >
              {c}
            </Link>
          ))}
        </div>

        <div className="flex flex-wrap items-center gap-4 mb-4">
          <span className="text-sm text-foreground/70">정렬:</span>
          {SORT_OPTIONS.map((opt) => (
            <Link
              key={opt.value}
              href={`/prompts?category=${encodeURIComponent(category)}&sort=${opt.value}`}
              className={`text-sm ${sort === opt.value ? "font-semibold underline" : "text-foreground/70 hover:underline"}`}
            >
              {opt.label}
            </Link>
          ))}
        </div>

        <Link
          href={`/prompts/new?category=${encodeURIComponent(category)}`}
          className="inline-flex items-center gap-2 px-4 py-2 mb-6 rounded-md border-2 border-foreground bg-card shadow-[2px_2px_0px_0px] shadow-foreground hover:shadow-[3px_3px_0px_0px] text-sm font-medium"
        >
          <Plus className="h-4 w-4" />
          새로 만들기
        </Link>

        <ul className="space-y-2">
          {items.length === 0 && !error && (
            <li className="text-foreground/60 py-8 text-center">아직 항목이 없습니다. 새로 만들기를 눌러 추가하세요.</li>
          )}
          {items.map((item) => (
            <li key={item.id}>
              <Link
                href={`/prompts/${item.id}`}
                className="flex items-center gap-3 p-4 rounded-lg border-2 border-foreground/20 bg-card hover:border-foreground/40 hover:shadow-[2px_2px_0px_0px] hover:shadow-foreground/20 transition-all"
              >
                <FileText className="h-5 w-5 flex-shrink-0 text-foreground/60" />
                <div className="min-w-0 flex-1">
                  <p className="font-medium truncate">{item.title}</p>
                  <p className="text-sm text-foreground/60 truncate">
                    {item.content?.slice(0, 80)}
                    {item.content && item.content.length > 80 ? "…" : ""}
                  </p>
                </div>
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </main>
  )
}
