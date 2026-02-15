import { createClient as createSupabaseClient } from "@supabase/supabase-js"
import type { Database } from "./types"

export function createClient() {
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL
  const key = process.env.SUPABASE_SERVICE_ROLE_KEY ?? process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY
  if (!url || !key) {
    throw new Error(
      "Supabase가 설정되지 않았습니다. .env.local에 NEXT_PUBLIC_SUPABASE_URL과 NEXT_PUBLIC_SUPABASE_ANON_KEY를 넣고 docs/supabase-setup-guide.md를 참고하세요."
    )
  }
  return createSupabaseClient<Database>(url, key)
}
