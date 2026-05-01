export type RecentApp = {
  title: string
  link: string
}

export const RECENT_APPS_STORAGE_KEY = "app-collecter-recent-apps"
export const RECENT_APPS_UPDATED_EVENT = "app-collecter-recent-updated"

const MAX_RECENT = 8

export function getRecentApps(): RecentApp[] {
  if (typeof window === "undefined") return []
  try {
    const raw = localStorage.getItem(RECENT_APPS_STORAGE_KEY)
    if (!raw) return []
    const parsed = JSON.parse(raw) as unknown
    if (!Array.isArray(parsed)) return []
    return parsed
      .filter(
        (x): x is RecentApp =>
          x != null &&
          typeof x === "object" &&
          typeof (x as RecentApp).title === "string" &&
          typeof (x as RecentApp).link === "string",
      )
      .slice(0, MAX_RECENT)
  } catch {
    return []
  }
}

export function addRecentApp(entry: RecentApp): void {
  if (typeof window === "undefined") return
  const prev = getRecentApps().filter((a) => a.link !== entry.link)
  const next = [entry, ...prev].slice(0, MAX_RECENT)
  localStorage.setItem(RECENT_APPS_STORAGE_KEY, JSON.stringify(next))
  window.dispatchEvent(new CustomEvent(RECENT_APPS_UPDATED_EVENT))
}
