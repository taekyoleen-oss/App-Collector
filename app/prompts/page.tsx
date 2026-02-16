import Link from "next/link"
import { isSupabaseConfigured } from "@/lib/supabase/server"
import { getPromptExamples, getPromptCategories } from "./actions"
import { PROMPT_CATEGORIES, SORT_OPTIONS } from "./constants"
import type { SortOption } from "./actions"
import { PromptCard } from "./prompt-card"
import { AddCategoryButton } from "./add-category-button"
import { DeleteCategoryButton } from "./delete-category-button"
import { Plus } from "lucide-react"

export const dynamic = "force-dynamic"

export default async function PromptsPage({
  searchParams,
}: {
  searchParams: Promise<{ category?: string; sort?: string }>
}) {
  const params = await searchParams
  const configured = isSupabaseConfigured()
  let categoryNames: string[] = []
  try {
    const fromDb = await getPromptCategories()
    categoryNames = fromDb.length > 0 ? fromDb.map((c) => c.name) : [...PROMPT_CATEGORIES]
  } catch {
    categoryNames = [...PROMPT_CATEGORIES]
  }
  const category = categoryNames.includes(params.category ?? "")
    ? (params.category as string)
    : categoryNames[0] ?? PROMPT_CATEGORIES[0]
  const validSorts: SortOption[] = ["last_used", "title_asc", "title_desc", "created_desc", "created_asc"]
  const sort: SortOption = validSorts.includes(params.sort as SortOption) ? (params.sort as SortOption) : "last_used"

  let items: Awaited<ReturnType<typeof getPromptExamples>> = []
  let error: string | null = null
  try {
    const result = await getPromptExamples(category, sort)
    items = Array.isArray(result) ? result : []
  } catch (e) {
    error = e instanceof Error ? e.message : "목록을 불러올 수 없습니다."
  }

  return (
    <main className="min-h-screen bg-background">
      <div className="container mx-auto px-4 py-8 max-w-4xl">
        <h1 className="text-2xl font-bold mb-6">프롬프트 예제</h1>

        {!configured && (
          <div className="mb-6 p-4 bg-muted text-foreground rounded-md text-sm border border-border">
            Supabase를 설정하면 여기서 프롬프트를 저장·관리할 수 있습니다. 로컬은{" "}
            <code className="text-xs">.env.local</code>, 배포(Vercel 등)는 대시보드의 환경 변수에{" "}
            <code className="text-xs">NEXT_PUBLIC_SUPABASE_URL</code>,{" "}
            <code className="text-xs">NEXT_PUBLIC_SUPABASE_ANON_KEY</code>를 넣고{" "}
            <code className="text-xs">docs/supabase-setup-guide.md</code>를 참고하세요.
          </div>
        )}

        {error && (
          <div className="mb-6 p-4 bg-destructive/10 text-destructive rounded-md text-sm">
            {error}
          </div>
        )}

        <div className="flex flex-wrap items-center gap-2 mb-6">
          {categoryNames.map((c) => (
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
          {configured && <AddCategoryButton />}
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

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          <Link
            href={`/prompts/new?category=${encodeURIComponent(category)}`}
            className="flex flex-col min-h-[200px] rounded-xl border-2 border-dashed border-foreground/30 bg-muted/30 p-5 hover:border-foreground/50 hover:bg-muted/50 transition-all duration-200 justify-center items-center text-foreground/60"
          >
            <Plus className="h-10 w-10 mb-2" />
            <span className="text-sm font-medium">간단한 내용은 여기에 메모하세요</span>
            <span className="text-xs mt-1">새로 만들기</span>
          </Link>
          {items.length === 0 && !error && (
            <div className="sm:col-span-2 lg:col-span-2 flex items-center justify-center py-12 text-foreground/60 text-center">
              {configured ? "아직 항목이 없습니다. 위 카드를 눌러 추가하세요." : "Supabase 설정 후 새로 만들기로 추가할 수 있습니다."}
            </div>
          )}
          {items.map((item, index) => (
            <PromptCard key={item?.id ?? index} item={item!} />
          ))}
        </div>

        {configured && category && (
          <DeleteCategoryButton categoryName={category} />
        )}
      </div>
    </main>
  )
}
