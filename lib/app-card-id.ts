/** 카드 스크롤 앵커용 id (제목 기준, 순서 변경에도 동일 앱은 동일 id) */
export function makeAppCardId(title: string): string {
  const base = title
    .trim()
    .replace(/\s+/g, "-")
    .replace(/[^\p{L}\p{N}\-]/gu, "")
  const slug = base.length > 0 ? base.slice(0, 96) : "app"
  return `app-card-${slug}`
}
