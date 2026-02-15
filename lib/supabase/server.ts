import { createClient as createSupabaseClient } from "@supabase/supabase-js"
import type { Database } from "./types"

const SUPABASE_NOT_CONFIGURED =
  "Supabase가 설정되지 않았습니다. 로컬은 .env.local, 배포(Vercel 등)는 대시보드의 환경 변수에 NEXT_PUBLIC_SUPABASE_URL과 NEXT_PUBLIC_SUPABASE_ANON_KEY를 설정하세요. docs/supabase-setup-guide.md 참고."

/** env가 없으면 null 반환 (배포 시 env 미설정 시에도 앱이 죽지 않도록) */
export function createClient() {
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL
  const key = process.env.SUPABASE_SERVICE_ROLE_KEY ?? process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY
  if (!url || !key) return null
  return createSupabaseClient<Database>(url, key)
}

export function isSupabaseConfigured(): boolean {
  return !!(process.env.NEXT_PUBLIC_SUPABASE_URL && (process.env.SUPABASE_SERVICE_ROLE_KEY ?? process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY))
}

export { SUPABASE_NOT_CONFIGURED }
