export const PROMPT_CATEGORIES = ["노트북LM", "커서 AI", "제미나이"] as const
export type PromptCategory = (typeof PROMPT_CATEGORIES)[number]

export const SORT_OPTIONS: { value: import("./actions").SortOption; label: string }[] = [
  { value: "last_used", label: "최근 사용 순" },
  { value: "title_asc", label: "제목 오름차순" },
  { value: "title_desc", label: "제목 내림차순" },
  { value: "created_desc", label: "생성일 최신순" },
  { value: "created_asc", label: "생성일 오래된 순" },
]
