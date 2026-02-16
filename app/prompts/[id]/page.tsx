import Link from "next/link"
import { redirect, notFound } from "next/navigation"
import { getPromptExample, updatePromptExample, deletePromptExample } from "../actions"
import { UpdateLastUsed } from "./update-last-used"
import { PromptDetailClient } from "./prompt-detail-client"
import { ArrowLeft } from "lucide-react"

export const dynamic = "force-dynamic"

export default async function PromptDetailPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params
  let item: Awaited<ReturnType<typeof getPromptExample>>
  try {
    item = await getPromptExample(id)
  } catch {
    notFound()
  }

  async function submit(formData: FormData) {
    "use server"
    const title = (formData.get("title") as string)?.trim()
    if (!title) return
    await updatePromptExample(id, {
      title,
      content: (formData.get("content") as string) ?? "",
      related_links: (formData.get("related_links") as string) ?? "",
    })
    redirect("/prompts?category=" + encodeURIComponent(item.category))
  }

  async function remove() {
    "use server"
    await deletePromptExample(id)
    redirect("/prompts?category=" + encodeURIComponent(item.category))
  }

  return (
    <main className="min-h-screen bg-background">
      <UpdateLastUsed id={id} />
      <div className="container mx-auto px-4 py-8 max-w-3xl">
        <Link
          href={`/prompts?category=${encodeURIComponent(item.category)}`}
          className="inline-flex items-center gap-2 text-sm text-foreground/70 hover:underline mb-6"
        >
          <ArrowLeft className="h-4 w-4" />
          목록으로
        </Link>

        <PromptDetailClient item={item} submit={submit} remove={remove} />
      </div>
    </main>
  )
}
