import React from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { ExternalLink } from "lucide-react"

interface AppCardProps {
  title: string
  description: string
  features: string[]
  link: string
  icon: React.ReactNode
  accentColor: string
}

/** "대상: 브랜드(모델), ..." 형식 문자열을 { label, rows: [브랜드, 모델][] } 로 파싱 */
function parseTargetTable(feature: string): { label: string; rows: [string, string][] } | null {
  if (!feature.startsWith("대상:")) return null
  const rest = feature.slice(3).trim()
  const parts = rest.split(/,\s+/)
  const rows: [string, string][] = []
  for (const part of parts) {
    const match = part.match(/^([^(]+)\(([^)]+)\)\s*(.*)$/)
    if (match) {
      const brand = match[1].trim()
      const model = match[3] ? `${match[2]} ${match[3].trim()}` : match[2]
      rows.push([brand, model])
    }
  }
  if (rows.length === 0) return null
  return { label: "대상", rows }
}

function FeatureItem({ feature, index }: { feature: string; index: number }) {
  const table = parseTargetTable(feature)
  if (table) {
    return (
      <li key={index} className="list-none -mx-1">
        <div className="border-2 border-foreground shadow-[3px_3px_0px_0px] shadow-foreground bg-background/50 rounded-md overflow-hidden">
          <div className="text-xs font-bold text-foreground/80 py-1.5 px-3 border-b border-foreground/30 bg-muted/40">
            {table.label}
          </div>
          <table className="w-full text-sm border-collapse">
            <thead>
              <tr className="border-b-2 border-foreground bg-muted/60">
                <th className="text-left font-bold py-2 px-3 w-[4.5rem]">브랜드</th>
                <th className="text-left font-bold py-2 px-3">모델</th>
              </tr>
            </thead>
            <tbody>
              {table.rows.map(([brand, model], i) => (
                <tr key={i} className="border-b border-foreground/30 last:border-b-0">
                  <td className="py-1.5 px-3 font-medium">{brand}</td>
                  <td className="py-1.5 px-3 text-foreground/90">{model}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </li>
    )
  }
  return (
    <li key={index} className="flex items-center gap-2">
      <span className="w-2 h-2 bg-foreground flex-shrink-0" />
      <span className="text-sm">{feature}</span>
    </li>
  )
}

export function AppCard({ title, description, features, link, icon, accentColor }: AppCardProps) {
  return (
    <Card className={`border-2 border-foreground shadow-[4px_4px_0px_0px] shadow-foreground hover:shadow-[6px_6px_0px_0px] hover:translate-x-[-2px] hover:translate-y-[-2px] transition-all duration-200 ${accentColor}`}>
      <CardHeader>
        <div className="flex items-center gap-3">
          <div className="p-3 bg-background border-2 border-foreground">
            {icon}
          </div>
          <CardTitle className="text-xl font-bold">{title}</CardTitle>
        </div>
        <CardDescription className="text-foreground/80 mt-2 text-base">
          {description}
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <ul className="space-y-2">
          {features.map((feature, index) => (
            <FeatureItem key={index} feature={feature} index={index} />
          ))}
        </ul>
        <Button 
          asChild 
          className="w-full border-2 border-foreground shadow-[3px_3px_0px_0px] shadow-foreground hover:shadow-[4px_4px_0px_0px] hover:translate-x-[-1px] hover:translate-y-[-1px] active:shadow-none active:translate-x-0 active:translate-y-0 transition-all duration-150 font-bold"
        >
          <a href={link} target="_blank" rel="noopener noreferrer">
            앱 열기
            <ExternalLink className="ml-2 h-4 w-4" />
          </a>
        </Button>
      </CardContent>
    </Card>
  )
}
