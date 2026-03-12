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
  /** 카드 톤과 조화되는 앱 열기 버튼용 클래스 (배경·글자·테두리·호버) */
  buttonAccent?: string
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
        <div className="border border-border/50 shadow-sm bg-background/60 rounded-lg overflow-hidden">
          <div className="text-xs font-bold text-foreground/80 py-1.5 px-3 border-b border-border/50 bg-muted/40">
            {table.label}
          </div>
          <table className="w-full text-sm border-collapse">
            <thead>
              <tr className="border-b border-border bg-muted/60">
                <th className="text-left font-bold py-2 px-3 w-[4.5rem]">브랜드</th>
                <th className="text-left font-bold py-2 px-3">모델</th>
              </tr>
            </thead>
            <tbody>
              {table.rows.map(([brand, model], i) => (
                <tr key={i} className="border-b border-border/50 last:border-b-0">
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

export function AppCard({ title, description, features, link, icon, accentColor, buttonAccent }: AppCardProps) {
  return (
    <Card className={`border border-border/60 shadow-md hover:shadow-lg transition-all duration-200 flex flex-col h-full rounded-xl overflow-hidden ${accentColor}`}>
      <CardHeader>
        <div className="flex items-center gap-3">
          <div className="p-3 bg-background/80 rounded-xl shadow-sm">
            {icon}
          </div>
          <CardTitle className="text-xl font-bold">{title}</CardTitle>
        </div>
        <CardDescription className="text-foreground/80 mt-2 text-base">
          {description}
        </CardDescription>
      </CardHeader>
      <CardContent className="flex flex-1 flex-col gap-4 pt-0">
        <ul className="space-y-2 flex-1">
          {features.map((feature, index) => (
            <FeatureItem key={index} feature={feature} index={index} />
          ))}
        </ul>
        <Button 
          asChild 
          className={`w-full mt-auto rounded-xl shadow-sm font-semibold transition-all duration-200 ${buttonAccent ?? "bg-primary/15 text-primary hover:bg-primary/25 border border-primary/20"}`}
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
