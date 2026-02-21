import { AppCard } from "@/components/app-card"
import { AiToolsSection } from "@/components/ai-tools-section"
import { SiteNav } from "@/components/site-nav"
import { FileText, Languages, Eraser, Image, Link as LinkIcon, Calculator, Headphones, SquareFunction } from "lucide-react"

const apps = [
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
    title: "English Buddy(MP3)",
    description: "영어 문장 MP3를 반복해서 듣고 자막을 통해 연습하는 앱입니다.",
    features: [
      "영어 MP3 반복 청취",
      "자막을 통한 듣기 연습",
      "편리한 반복 재생",
      "청취·발음 연습 지원"
    ],
    link: "https://english-buddy-866656523453.us-west1.run.app/",
    icon: <Headphones className="h-6 w-6" />,
    accentColor: "bg-emerald-500/20"
  },
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
  },
  {
    title: "Actuary Pro Calc",
    description: "계리사 시험 1차에서 사용 가능한 계산기입니다. 시험에서 허용하는 계산기를 사용하여 수식을 계산하고 이에 대한 계산과정을 보여줍니다.",
    features: [
      "대상: 카시오(JS-40B/JS-40GT), 사프(EL-N942X), 캐논(LS-1200V/TS-1200TG) 계산기",
      "M+, M- 기능 활용 가능",
      "시험환경에 적합 계산 기능",
      "계산과정의 직관적인 설명"
    ],
    link: "https://pro-exam-calculator-rice-house-style-190779861158.us-west1.run.app/",
    icon: <Calculator className="h-6 w-6" />,
    accentColor: "bg-blue-500/20"
  },
  {
    title: "이미지 수식변환기",
    description: "이미지나 간단한 텍스트를 LaTeX, PPT, Word 수식으로 변환해 드립니다. 논문·보고서·발표 자료 작성에 활용할 수 있습니다.",
    features: [
      "이미지를 LaTeX, PPT, Word 수식으로 변환",
      "간단한 텍스트를 LaTeX, PPT, Word 수식으로 변환",
      "다양한 출력 형식 지원",
      "수식 복사·붙여넣기 편의"
    ],
    link: "https://mathocr-formula-to-office-converter-190779861158.us-west1.run.app/",
    icon: <SquareFunction className="h-6 w-6" />,
    accentColor: "bg-amber-500/20"
  },
  {
    title: "NotebookLM Slide Cleaner",
    description: "NotebookLM 슬라이드의 워터마크를 자동으로 제거하고, 다른 영역의 표시도 일괄 제거할 수 있습니다. 파일 내 페이지 이동·삭제 등 편집도 가능합니다.",
    features: [
      "NotebookLM 워터마크 자동 제거",
      "다른 영역 표시 일괄 제거",
      "파일 내 페이지 이동·삭제",
      "슬라이드·PDF 정리 편의"
    ],
    link: "https://notebooklm-slide-cleaner-190779861158.us-west1.run.app",
    icon: <FileText className="h-6 w-6" />,
    accentColor: "bg-teal-500/20"
  }
]

/** AI 도구 설명 카드용 데이터. PDF는 public/ai-tools/ 에 두고, href는 /api/view-pdf?file=파일명. 이미지로 게시 시 imagesBaseUrl, imageCount, imageExt 를 넣으면 이미지 뷰어로 표시됩니다. */
const aiTools = [
  {
    title: "bananaNL 및 Grabbit 으로 노트북ML 강화.pdf",
    description: "bananaNL로 다양한 슬라이드 양식 적용 · Grabbit으로 웹사이트 저장 등 기능 강화",
    href: "/api/view-pdf?file=" + encodeURIComponent("bananaNL 및 Grabbit 으로 노트북ML 강화.pdf"),
    // ZIP을 public/ai-tools/에 풀어 'bananaNL 및 Grabbit 으로 노트북ML 강화' 폴더가 생기면 이미지 뷰어로 바로 표시됨 (개수는 API가 자동 조회)
    imagesBaseUrl: "/ai-tools/bananaNL 및 Grabbit 으로 노트북ML 강화",
    imageExt: "png",
  },
  {
    title: "Cursor 로 Supabase 설정하기",
    description: "Cursor에서 Supabase DB 구성부터 웹 연동까지 설정 과정을 정리했습니다.",
    href: "#",
    imagesBaseUrl: "/ai-tools/Cursor로 Supabase 설정 과정",
    imageExt: "png",
  },
  {
    title: "ChatGPT 활용 가이드",
    description: "ChatGPT를 업무와 학습에 활용하는 방법을 정리했습니다.",
    href: "/api/view-pdf?file=" + encodeURIComponent("chatgpt-guide.pdf")
  },
  {
    title: "Claude 사용법",
    description: "Claude AI 도구의 주요 기능과 활용 팁을 설명합니다.",
    href: "/api/view-pdf?file=" + encodeURIComponent("claude-guide.pdf")
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
  },
  {
    title: "Codia AI",
    url: "https://codia.ai/",
    description: "AI 기반 디자인·개발 플랫폼입니다. 스크린샷·PDF·웹을 Figma로 변환하고, Figma 디자인을 코드로 내보내는 등 디자인과 코드 간 변환을 자동화합니다."
  },
  {
    title: "Stitch",
    url: "https://stitch.withgoogle.com/?pli=1",
    description: "Google에서 제공하는 AI 디자인 도구입니다. AI와 함께 디자인하고 시각적 콘텐츠를 만들 수 있습니다."
  },
  {
    title: "NotebookLM 워터마크 제거",
    links: [
      { title: "SlideDeckCleaner", url: "https://www.slidedeckcleaner.com/" },
      { title: "NotebookLM Remover (한국어)", url: "https://notebooklmremover.com/ko" }
    ],
    description: "NotebookLM 슬라이드·PDF·비디오에서 워터마크를 제거하는 무료 온라인 도구입니다. 브라우저에서 로컬로 처리하여 개인정보를 보호합니다."
  }
]

export default function Home() {
  return (
    <main className="min-h-screen bg-background">
      <SiteNav />
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

      {/* Main Content - 카드보기 */}
      <section id="card-view" className="container mx-auto px-4 py-12 scroll-mt-24">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {apps.map((app) => (
            <AppCard key={app.title} {...app} />
          ))}
        </div>
      </section>

      {/* Reference Links Section */}
      <section id="reference-links" className="container mx-auto px-4 py-12 border-t-2 border-foreground/20 scroll-mt-24">
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
                    {"links" in link && link.links ? (
                      <div className="flex flex-wrap items-center gap-x-3 gap-y-1">
                        <span className="text-lg font-bold text-foreground">{link.title}</span>
                        {link.links.map((item, i) => (
                          <a
                            key={i}
                            href={item.url}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-primary hover:underline inline-flex items-center gap-1 font-medium"
                          >
                            {item.title}
                            <span className="text-sm">↗</span>
                          </a>
                        ))}
                      </div>
                    ) : (
                      <a
                        href={link.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-lg font-bold text-primary hover:underline inline-flex items-center gap-2"
                      >
                        {link.title}
                        <span className="text-sm">↗</span>
                      </a>
                    )}
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

      {/* AI 도구 설명 Section - 파스텔 톤 */}
      <section id="ai-tools" className="border-t-2 border-foreground/20 scroll-mt-24 bg-[oklch(0.98_0.015_85)]">
        <div className="container mx-auto px-4 py-12">
          <div className="max-w-5xl mx-auto">
            <h2 className="text-2xl md:text-3xl font-bold mb-6 text-center">
              <span className="inline-block px-4 py-2 bg-[oklch(0.94_0.04_75)] border-2 border-amber-200/80 shadow-[3px_3px_0px_0px] shadow-amber-300/40">
                AI 도구 설명
              </span>
            </h2>
            <p className="text-center text-foreground/70 mb-8 max-w-2xl mx-auto">
              AI 관련 도구의 사용 방법을 소개하는 문서입니다. 카드를 클릭하면 화면에서 바로 PDF를 볼 수 있습니다.
            </p>
            <AiToolsSection tools={aiTools} />
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
