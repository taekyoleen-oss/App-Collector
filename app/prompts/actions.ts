"use server"

import { createClient, SUPABASE_NOT_CONFIGURED } from "@/lib/supabase/server"
import type { PromptExampleInsert, PromptExampleUpdate } from "@/lib/supabase/types"
import { revalidatePath } from "next/cache"
import { notFound, redirect } from "next/navigation"

export type SortOption = "last_used" | "title_asc" | "title_desc" | "created_desc" | "created_asc"

export async function getPromptCategories() {
  const supabase = createClient()
  if (!supabase) return []
  const { data, error } = await supabase
    .from("prompt_categories")
    .select("id, name, sort_order")
    .order("sort_order", { ascending: true })
  if (error) return []
  return (data ?? []) as { id: string; name: string; sort_order: number }[]
}

export async function createPromptCategory(name: string) {
  const supabase = createClient()
  if (!supabase) throw new Error(SUPABASE_NOT_CONFIGURED)
  const trimmed = name.trim()
  if (!trimmed) throw new Error("카테고리 이름을 입력하세요.")
  const { data, error } = await supabase
    .from("prompt_categories")
    .insert({ name: trimmed, sort_order: 999 })
    .select()
    .single()
  if (error) throw error
  revalidatePath("/prompts")
  revalidatePath("/prompts/new")
  return data
}

const CATEGORY_NOT_EMPTY_MESSAGE =
  "이 카테고리에 항목이 있어 삭제할 수 없습니다. 내용을 모두 비운 후 삭제해 주세요."

export async function deletePromptCategory(categoryName: string) {
  const supabase = createClient()
  if (!supabase) throw new Error(SUPABASE_NOT_CONFIGURED)
  const { count, error: countError } = await supabase
    .from("prompt_examples")
    .select("*", { count: "exact", head: true })
    .eq("category", categoryName)
  if (countError) throw countError
  if (count != null && count > 0) throw new Error(CATEGORY_NOT_EMPTY_MESSAGE)
  const { error: deleteError } = await supabase
    .from("prompt_categories")
    .delete()
    .eq("name", categoryName)
  if (deleteError) throw deleteError
  revalidatePath("/prompts")
  revalidatePath("/prompts/new")
  redirect("/prompts")
}

export async function getPromptExamples(category: string, sort: SortOption = "last_used") {
  const supabase = createClient()
  if (!supabase) return []
  let query = supabase
    .from("prompt_examples")
    .select("*")
    .eq("category", category)

  switch (sort) {
    case "last_used":
      query = query.order("last_used_at", { ascending: false, nullsFirst: false })
      break
    case "title_asc":
      query = query.order("title", { ascending: true })
      break
    case "title_desc":
      query = query.order("title", { ascending: false })
      break
    case "created_desc":
      query = query.order("created_at", { ascending: false })
      break
    case "created_asc":
      query = query.order("created_at", { ascending: true })
      break
  }

  const { data, error } = await query
  if (error) throw error
  return data ?? []
}

export async function getPromptExample(id: string) {
  const supabase = createClient()
  if (!supabase) notFound()
  const { data, error } = await supabase
    .from("prompt_examples")
    .select("*")
    .eq("id", id)
    .single()
  if (error) throw error
  return data
}

export async function createPromptExample(input: PromptExampleInsert) {
  const supabase = createClient()
  if (!supabase) throw new Error(SUPABASE_NOT_CONFIGURED)
  const { data, error } = await supabase.from("prompt_examples").insert(input).select().single()
  if (error) throw error
  revalidatePath("/prompts")
  return data
}

export async function updatePromptExample(id: string, input: PromptExampleUpdate) {
  const supabase = createClient()
  if (!supabase) throw new Error(SUPABASE_NOT_CONFIGURED)
  const { data, error } = await supabase
    .from("prompt_examples")
    .update({ ...input, last_used_at: new Date().toISOString() })
    .eq("id", id)
    .select()
    .single()
  if (error) throw error
  revalidatePath("/prompts")
  revalidatePath(`/prompts/${id}`)
  return data
}

export async function updateLastUsed(id: string) {
  const supabase = createClient()
  if (!supabase) return
  await supabase
    .from("prompt_examples")
    .update({ last_used_at: new Date().toISOString() })
    .eq("id", id)
  revalidatePath("/prompts")
}

export async function deletePromptExample(id: string) {
  const supabase = createClient()
  if (!supabase) throw new Error(SUPABASE_NOT_CONFIGURED)
  const { error } = await supabase.from("prompt_examples").delete().eq("id", id)
  if (error) throw error
  revalidatePath("/prompts")
}
