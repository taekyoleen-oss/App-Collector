import Link from "next/link"
import { redirect } from "next/navigation"
import { createPromptExample, getPromptCategories } from "../actions"
import { PROMPT_CATEGORIES } from "../constants"
import { PromptForm } from "../prompt-form"
import { ArrowLeft } from "lucide-react"

export const dynamic = "force-dynamic"

export default async function NewPromptPage({
  searchParams,
}: {
  searchParams: Promise<{ category?: string }>
}) {
  const params = await searchParams
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

  async function submit(formData: FormData) {
    "use server"
    const title = (formData.get("title") as string)?.trim()
    if (!title) return
    await createPromptExample({
      category,
      title,
      content: (formData.get("content") as string) ?? "",
      related_links: (formData.get("related_links") as string) ?? "",
      attachment_urls: [],
    })
    redirect("/prompts?category=" + encodeURIComponent(category))
  }

  return (
    <main className="min-h-screen bg-background">
      <div className="container mx-auto px-4 py-8 max-w-3xl">
        <Link
          href={`/prompts?category=${encodeURIComponent(category)}`}
          className="inline-flex items-center gap-2 text-sm text-foreground/70 hover:underline mb-6"
        >
          <ArrowLeft className="h-4 w-4" />
          목록으로
        </Link>
        <h1 className="text-2xl font-bold mb-6">새 프롬프트 예제</h1>
        <p className="text-sm text-foreground/60 mb-6">분류: {category}</p>
        <PromptForm category={category} submit={submit} />
      </div>
    </main>
  )
}
