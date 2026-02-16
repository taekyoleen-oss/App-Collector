"use client"

import { useEffect } from "react"
import { updateLastUsed } from "../actions"

/** 상세 페이지 마운트 시 최근 사용 시각만 갱신. revalidatePath는 액션 내부에서만 호출되므로 렌더 중 호출 에러를 피함. */
export function UpdateLastUsed({ id }: { id: string }) {
  useEffect(() => {
    updateLastUsed(id)
  }, [id])
  return null
}
