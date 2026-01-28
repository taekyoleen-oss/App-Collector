import { AppCard } from "@/components/app-card"
import { FileText, Languages, Eraser, Image, Link as LinkIcon } from "lucide-react"

const apps = [
  {
    title: "PDF Master",
    description: "PDF 파일을 손쉽게 관리하세요. 여러 PDF를 하나로 합치거나, 필요한 페이지만 추출하거나, 불필요한 페이지를 삭제할 수 있습니다.",
    features: [
      "여러 PDF 파일 합치기",
      "PDF 페이지 분할 및 추출",
      "특정 페이지 삭제",
      "빠르고 간편한 처리"
    ],
    link: "https://pdf-master-merge-delete-split-192259229963.us-west1.run.app/",
    icon: <FileText className="h-6 w-6" />,
    accentColor: "bg-primary/20"
  },
  {
    title: "English Tutor",
    description: "한글로 문장을 입력하면 자연스러운 영어로 자동 번역해 드립니다. 주제에 맞는 영어 대화문도 생성하여 실전 회화 연습에 도움을 줍니다.",
    features: [
      "한글 → 영어 자동 번역",
      "주제별 영어 대화문 생성",
      "자연스러운 표현 학습",
      "AI 기반 맞춤 학습"
    ],
    link: "https://gemini-english-tutor-192259229963.us-west1.run.app",
    icon: <Languages className="h-6 w-6" />,
    accentColor: "bg-secondary/40"
  },
  {
    title: "Magic Eraser AI",
    description: "이미지에서 원하지 않는 부분을 마법처럼 지워보세요. AI가 자동으로 배경을 복원하여 깔끔한 결과물을 만들어 드립니다.",
    features: [
      "이미지 특정 부위 삭제",
      "AI 자동 배경 복원",
      "간편한 브러시 도구",
      "고품질 결과물 출력"
    ],
    link: "https://magic-eraser-ai-956594633589.us-west1.run.app",
    icon: <Eraser className="h-6 w-6" />,
    accentColor: "bg-accent/40"
  },
  {
    title: "StyleSync AI",
    description: "기존 이미지를 기반으로 새로운 이미지를 유사한 스타일로 변환해 드립니다. AI가 이미지의 스타일을 분석하여 일관된 결과물을 생성합니다.",
    features: [
      "이미지 스타일 동기화",
      "AI 기반 스타일 분석",
      "유사한 스타일 이미지 생성",
      "고품질 변환 결과"
    ],
    link: "https://stylesync-ai-292738906478.us-west1.run.app/",
    icon: <Image className="h-6 w-6" />,
    accentColor: "bg-purple-500/20"
  }
]

const referenceLinks = [
  {
    title: "TweakCN",
    url: "https://tweakcn.com/",
    description: "개발자들을 위한 유용한 도구와 리소스를 제공하는 웹사이트입니다."
  },
  {
    title: "Aspose File Format Apps",
    url: "https://metrics.aspose.app/",
    description: "PDF, Word, Excel, PowerPoint, Visio, Project, OneNote, OpenOffice, CAD, 3D 등 다양한 파일 형식을 무료로 처리할 수 있는 온라인 도구 모음입니다."
  },
  {
    title: "v0 by Vercel",
    url: "https://v0.app/",
    description: "AI를 활용하여 에이전트, 앱, 웹사이트를 빠르게 구축할 수 있는 도구입니다. 템플릿과 컴포넌트를 제공하며, GitHub 연동 및 Vercel 배포를 지원합니다."
  },
  {
    title: "Gamma",
    url: "https://gamma.app/",
    description: "AI 기반 프레젠테이션 및 문서 생성 도구입니다. 텍스트만 입력하면 자동으로 아름다운 슬라이드와 문서를 만들어주며, 인터랙티브한 콘텐츠를 쉽게 제작할 수 있습니다."
  }
]

export default function Home() {
  return (
    <main className="min-h-screen bg-background">
      {/* Header */}
      <header className="border-b-2 border-foreground bg-card">
        <div className="container mx-auto px-4 py-6">
          <h1 className="text-3xl md:text-4xl font-bold text-center">
            <span className="inline-block px-4 py-2 bg-primary text-primary-foreground border-2 border-foreground shadow-[4px_4px_0px_0px] shadow-foreground">
              App Playground
            </span>
          </h1>
          <p className="text-center mt-4 text-lg text-foreground/80">
            다양한 유틸리티 앱을 테스트해 보세요
          </p>
        </div>
      </header>

      {/* Main Content */}
      <section className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {apps.map((app) => (
            <AppCard key={app.title} {...app} />
          ))}
        </div>
      </section>

      {/* Reference Links Section */}
      <section className="container mx-auto px-4 py-12 border-t-2 border-foreground/20">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-2xl md:text-3xl font-bold mb-6 text-center">
            <span className="inline-block px-4 py-2 bg-muted border-2 border-foreground shadow-[3px_3px_0px_0px] shadow-foreground">
              참고 링크
            </span>
          </h2>
          <div className="space-y-4">
            {referenceLinks.map((link, index) => (
              <div
                key={index}
                className="border-2 border-foreground bg-card p-4 shadow-[3px_3px_0px_0px] shadow-foreground hover:shadow-[4px_4px_0px_0px] hover:translate-x-[-1px] hover:translate-y-[-1px] transition-all duration-200"
              >
                <div className="flex items-start gap-4">
                  <div className="p-2 bg-background border-2 border-foreground flex-shrink-0">
                    <LinkIcon className="h-5 w-5" />
                  </div>
                  <div className="flex-1">
                    <a
                      href={link.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-lg font-bold text-primary hover:underline inline-flex items-center gap-2"
                    >
                      {link.title}
                      <span className="text-sm">↗</span>
                    </a>
                    <p className="text-sm text-foreground/70 mt-1">
                      {link.description}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t-2 border-foreground bg-card mt-auto">
        <div className="container mx-auto px-4 py-6 text-center">
          <p className="text-sm text-foreground/70">
            더 많은 앱이 곧 추가됩니다!
          </p>
        </div>
      </footer>
    </main>
  )
}
