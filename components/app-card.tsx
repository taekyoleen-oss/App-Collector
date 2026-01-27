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
            <li key={index} className="flex items-center gap-2">
              <span className="w-2 h-2 bg-foreground" />
              <span className="text-sm">{feature}</span>
            </li>
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
