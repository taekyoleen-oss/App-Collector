"use client"

import * as React from "react"
import { Check, ChevronsUpDown, ExternalLink } from "lucide-react"
import { Button } from "@/components/ui/button"
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/components/ui/command"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { cn } from "@/lib/utils"
import {
  addRecentApp,
  getRecentApps,
  RECENT_APPS_STORAGE_KEY,
  RECENT_APPS_UPDATED_EVENT,
  type RecentApp,
} from "@/lib/recent-apps"

export type AppLauncherItem = {
  title: string
  link: string
  cardId: string
}

type CardViewAppLauncherProps = {
  apps: AppLauncherItem[]
  className?: string
}

export function CardViewAppLauncher({ apps, className }: CardViewAppLauncherProps) {
  const [open, setOpen] = React.useState(false)
  const [selectedCardId, setSelectedCardId] = React.useState<string | null>(null)
  const [recent, setRecent] = React.useState<RecentApp[]>([])

  const refreshRecent = React.useCallback(() => {
    setRecent(getRecentApps())
  }, [])

  React.useEffect(() => {
    refreshRecent()
    const onStorage = (e: StorageEvent) => {
      if (e.key === null || e.key === RECENT_APPS_STORAGE_KEY) refreshRecent()
    }
    const onCustom = () => refreshRecent()
    window.addEventListener("storage", onStorage)
    window.addEventListener(RECENT_APPS_UPDATED_EVENT, onCustom)
    return () => {
      window.removeEventListener("storage", onStorage)
      window.removeEventListener(RECENT_APPS_UPDATED_EVENT, onCustom)
    }
  }, [refreshRecent])

  const scrollToCard = (cardId: string) => {
    // Popover가 닫히며 포커스·레이아웃이 바뀐 뒤 스크롤해야 대상 요소를 안정적으로 찾을 수 있음
    requestAnimationFrame(() => {
      requestAnimationFrame(() => {
        const el = document.getElementById(cardId)
        el?.scrollIntoView({ behavior: "smooth", block: "start" })
      })
    })
  }

  const openApp = (item: RecentApp) => {
    addRecentApp(item)
    window.open(item.link, "_blank", "noopener,noreferrer")
  }

  const selectedApp = selectedCardId ? apps.find((a) => a.cardId === selectedCardId) : undefined

  return (
    <div className={cn("mb-10 space-y-6", className)}>
      <div className="max-w-xl mx-auto md:mx-0">
        <label className="text-sm font-medium text-foreground/90 mb-2 block">
          앱 카드로 이동
        </label>
        <Popover open={open} onOpenChange={setOpen}>
          <PopoverTrigger asChild>
            <Button
              variant="outline"
              role="combobox"
              aria-expanded={open}
              className="w-full justify-between rounded-xl h-11 font-normal text-left"
            >
              <span className="truncate">
                {selectedApp ? selectedApp.title : "앱을 검색하거나 선택하세요…"}
              </span>
              <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
            </Button>
          </PopoverTrigger>
          <PopoverContent
            className="w-[var(--radix-popover-trigger-width)] p-0"
            align="start"
            onCloseAutoFocus={(e) => e.preventDefault()}
          >
            <Command>
              <CommandInput placeholder="앱 이름 검색…" />
              <CommandList>
                <CommandEmpty>일치하는 앱이 없습니다.</CommandEmpty>
                <CommandGroup heading="앱 목록">
                  {apps.map((app) => (
                    <CommandItem
                      key={app.cardId}
                      value={app.cardId}
                      keywords={[app.title]}
                      onSelect={(raw) => {
                        // cmdk 1.x는 value 문자열을 그대로 전달함(소문자로 통일하지 않음). 영문 대소문자 불일치 시 기존 로직은 매칭 실패함.
                        const target =
                          apps.find((a) => a.cardId === raw) ??
                          apps.find((a) => a.cardId.toLowerCase() === raw.toLowerCase())
                        if (!target) return
                        setSelectedCardId(target.cardId)
                        setOpen(false)
                        scrollToCard(target.cardId)
                      }}
                    >
                      <Check
                        className={cn(
                          "h-4 w-4",
                          selectedCardId === app.cardId ? "opacity-100" : "opacity-0",
                        )}
                      />
                      {app.title}
                    </CommandItem>
                  ))}
                </CommandGroup>
              </CommandList>
            </Command>
          </PopoverContent>
        </Popover>
        <p className="text-xs text-muted-foreground mt-2">
          선택하면 해당 앱 카드 위치로 스크롤됩니다.
        </p>
      </div>

      <div>
        <h3 className="text-sm font-medium text-foreground/90 mb-3">최근 실행한 앱</h3>
        {recent.length > 0 ? (
          <div className="flex flex-wrap gap-2">
            {recent.map((item) => (
              <Button
                key={item.link}
                type="button"
                variant="secondary"
                size="sm"
                className="rounded-xl gap-1.5 max-w-full"
                onClick={() => openApp(item)}
              >
                <span className="truncate">{item.title}</span>
                <ExternalLink className="h-3.5 w-3.5 shrink-0 opacity-70" />
              </Button>
            ))}
          </div>
        ) : (
          <p className="text-sm text-muted-foreground rounded-xl border border-dashed border-border/70 bg-muted/20 px-4 py-3">
            아직 기록이 없습니다. 아래 카드에서 「앱 열기」를 누르면 이 브라우저에 최대 8개까지 저장됩니다.
          </p>
        )}
        <p className="text-xs text-muted-foreground mt-2">
          버튼을 누르면 새 탭에서 앱이 열리고, 목록 맨 앞으로 다시 올라옵니다.
        </p>
      </div>
    </div>
  )
}
