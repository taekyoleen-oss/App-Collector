"use client"

import * as React from "react"
import { addRecentApp } from "@/lib/recent-apps"

type AppOpenLinkProps = React.ComponentProps<"a"> & {
  appTitle: string
}

export function AppOpenLink({ appTitle, href, onClick, children, ...rest }: AppOpenLinkProps) {
  const handleClick = (e: React.MouseEvent<HTMLAnchorElement>) => {
    onClick?.(e)
    if (e.defaultPrevented || !href) return
    addRecentApp({ title: appTitle, link: String(href) })
  }

  return (
    <a href={href} onClick={handleClick} {...rest}>
      {children}
    </a>
  )
}
