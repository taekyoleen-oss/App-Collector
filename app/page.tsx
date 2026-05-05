import { AppCard } from "@/components/app-card"
import { CardViewAppLauncher } from "@/components/card-view-app-launcher"
import { AiToolsSection } from "@/components/ai-tools-section"
import { SiteNav } from "@/components/site-nav"
import { makeAppCardId } from "@/lib/app-card-id"
import { FileText, Languages, Eraser, Image, Link as LinkIcon, Calculator, Headphones, SquareFunction, PenTool, ListTodo, Newspaper, Sparkles, Presentation, CalendarDays, Activity, Network, Briefcase, ShieldCheck, Flame, CloudSun } from "lucide-react"

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
    link: "https://english-tutor-six.vercel.app/",
    icon: <Languages className="h-6 w-6" />,
    accentColor: "bg-secondary/20",
    buttonAccent: "bg-secondary/25 text-foreground/90 border-secondary/30 hover:bg-secondary/35"
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
    accentColor: "bg-emerald-500/20",
    buttonAccent: "bg-emerald-500/25 text-emerald-800 border-emerald-500/30 hover:bg-emerald-500/35 dark:text-emerald-200"
  },
  {
    title: "날씨에 맞춘 복장 추천",
    description:
      "날씨 정보를 바탕으로 객관적인 근거를 제시하며, 시간대에 맞는 복장을 추천해 드립니다. 산책·등산·골프 등 외부 활동별로 옷차림을 안내하고, 성별과 더위·추위 민감도에 따라 맞춤 안내를 제공합니다.",
    features: [
      "날씨 데이터 기반의 객관적 복장 추천",
      "시간대별 맞춤 복장 제안",
      "외부 활동 유형별 옷차림 안내",
      "성별·체감(더위·추위) 민감도별 구분 안내"
    ],
    link: "https://weather-outfit-eight.vercel.app/",
    icon: <CloudSun className="h-6 w-6" />,
    accentColor: "bg-lime-500/20",
    buttonAccent: "bg-lime-500/25 text-lime-900 border-lime-500/30 hover:bg-lime-500/35 dark:text-lime-100"
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
    link: "https://pdf-master-8bzg.vercel.app/",
    icon: <FileText className="h-6 w-6" />,
    accentColor: "bg-primary/20",
    buttonAccent: "bg-primary/20 text-primary border-primary/30 hover:bg-primary/30"
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
    accentColor: "bg-accent/40",
    buttonAccent: "bg-accent/50 text-accent-foreground border-accent/60 hover:bg-accent/70"
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
    link: "https://style-sync-ai-peach.vercel.app/",
    icon: <Image className="h-6 w-6" />,
    accentColor: "bg-purple-500/20",
    buttonAccent: "bg-purple-500/25 text-purple-800 border-purple-500/30 hover:bg-purple-500/35 dark:text-purple-200"
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
    link: "https://pro-exam-calculator.vercel.app/",
    icon: <Calculator className="h-6 w-6" />,
    accentColor: "bg-blue-500/20",
    buttonAccent: "bg-blue-500/25 text-blue-800 border-blue-500/30 hover:bg-blue-500/35 dark:text-blue-200"
  },
  {
    title: "보험수리 화이트보드",
    description: "보험수리 계산을 편리하게 할 수 있는 보드로써 수리 기호 등이 포함되어 있음",
    features: [
      "보험수리 계산용 화이트보드",
      "수리 기호·KaTeX 수식 입력",
      "타임라인·화살표 등 도형 지원",
      "PNG 내보내기·저장"
    ],
    link: "https://actuarial-whiteboard.vercel.app/",
    icon: <PenTool className="h-6 w-6" />,
    accentColor: "bg-slate-500/20",
    buttonAccent: "bg-slate-500/25 text-slate-800 border-slate-500/30 hover:bg-slate-500/35 dark:text-slate-200"
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
    link: "https://mathocr-formula-in-office-converter.vercel.app/",
    icon: <SquareFunction className="h-6 w-6" />,
    accentColor: "bg-amber-500/20",
    buttonAccent: "bg-amber-500/25 text-amber-800 border-amber-500/30 hover:bg-amber-500/35 dark:text-amber-200"
  },
  {
    title: "NotebookLM Slide Cleaner",
    description: "NotebookLM 슬라이드의 워터마크를 자동으로 제거하고, 다른 영역의 표시도 일괄 제거할 수 있습니다. 파일 내 페이지 이동·삭제 등 편집도 가능합니다.",
    features: [
      "NotebookLM의 pdf 및 PPT의 워터마크 자동 제거",
      "다른 영역 표시 일괄 제거",
      "파일 내 페이지 이동·삭제",
      "슬라이드·PDF 정리 편의"
    ],
    link: "https://notebook-lm-slide-cleaner.vercel.app/",
    icon: <FileText className="h-6 w-6" />,
    accentColor: "bg-teal-500/20",
    buttonAccent: "bg-teal-500/25 text-teal-800 border-teal-500/30 hover:bg-teal-500/35 dark:text-teal-200"
  },
  {
    title: "논문 번역",
    description: "영어 및 일본어로 된 논문을 한국어로 자동 번역해 드립니다. AI 기능을 사용하여 최대한 원본을 유지하면서 번역하도록 하여 학습에 도움을 줍니다.",
    features: [
      "영어 또는 일본어의 논문의 자동 번역",
      "주요 용어에 대해 표준적인 언어 유지",
      "최대한 원문의 내용을 유지하여 번역",
      "수식 및 표도 원문과 동일하게 유지"
    ],
    link: "https://dcocument-translate-production.up.railway.app/",
    icon: <Languages className="h-6 w-6" />,
    accentColor: "bg-indigo-500/20",
    buttonAccent: "bg-indigo-500/25 text-indigo-800 border-indigo-500/30 hover:bg-indigo-500/35 dark:text-indigo-200"
  },
  {
    title: "Todo-Memo",
    description: "일정 관리와 메모를 한 화면에서 함께 관리하는 앱입니다. 개인별 로그인으로 나만의 할 일·메모를 저장하며, 외부 DB를 사용해 네이버 메모처럼 안정적으로 보관합니다.",
    features: [
      "일정(할 일)과 메모를 한 번에 관리",
      "개인별 계정으로 데이터 분리 저장",
      "외부 DB 연동으로 안정적 보관",
      "네이버 메모와 유사한 사용 경험"
    ],
    link: "https://todo-memo-sand.vercel.app/dashboard",
    icon: <ListTodo className="h-6 w-6" />,
    accentColor: "bg-rose-500/20",
    buttonAccent: "bg-rose-500/25 text-rose-800 border-rose-500/30 hover:bg-rose-500/35 dark:text-rose-200"
  },
  {
    title: "보험 뉴스 대시보드",
    description: "보험 관련 기사를 AI가 오전 8시·오후 2시에 자동으로 발췌·정리하는 앱입니다. 업계동향, 상품, 언더라이팅, 정책 등 카테고리별로 관리하며, 요약만으로 기사 내용을 빠르게 확인할 수 있습니다.",
    features: [
      "오전 8시·오후 2시 자동 수집 및 AI 정리",
      "업계동향·상품·언더라이팅·정책 등 카테고리 구분",
      "요약으로 기사 열지 않고 내용 확인",
      "보험 뉴스 한곳에서 대시보드로 조회"
    ],
    link: "https://taekyoleen-oss-insurance-article.vercel.app/",
    icon: <Newspaper className="h-6 w-6" />,
    accentColor: "bg-sky-500/20",
    buttonAccent: "bg-sky-500/25 text-sky-800 border-sky-500/30 hover:bg-sky-500/35 dark:text-sky-200",
    pdfLink: "Insurance_article.pdf",
    pdfLabel: "소개자료"
  },
  {
    title: "비개발자의 개발실",
    description: "바이브코딩으로 만든 앱을 공유하고 함께 발전시키는 공간입니다. 필요 시 요청을 받아 앱을 바이브코딩으로 제작해 드리며, 프롬프트·도구·노하우 등 정보도 공유합니다.",
    features: [
      "바이브코딩으로 만든 앱 공유 및 소개",
      "요청 시 바이브코딩으로 앱 개발 지원",
      "프롬프트·도구·노하우 정보 공유",
      "비개발자도 AI로 앱을 만드는 경험 공유"
    ],
    link: "https://vibe-coding-lab-leen-taekyos-projects.vercel.app/",
    icon: <Sparkles className="h-6 w-6" />,
    accentColor: "bg-violet-500/20",
    buttonAccent: "bg-violet-500/25 text-violet-800 border-violet-500/30 hover:bg-violet-500/35 dark:text-violet-200"
  },
  {
    title: "강의 지원 앱",
    description: "PDF 파일에 대해 전체보기 및 펜, 네모, 원 등 다양한 시각적 요소를 추가해 강의를 지원하는 앱입니다.",
    features: [
      "PDF 파일 페이지 이동 및 전체보기 지원",
      "펜, 네모, 원 등 다양한 그리기 도구",
      "직관적인 시각적 요소를 통한 강조 표시",
      "효율적인 강의 진행을 돕는 보조 도구 모음"
    ],
    link: "https://lecture-assistant-chi.vercel.app/",
    icon: <Presentation className="h-6 w-6" />,
    accentColor: "bg-orange-500/20",
    buttonAccent: "bg-orange-500/25 text-orange-800 border-orange-500/30 hover:bg-orange-500/35 dark:text-orange-200",
    pdfLink: "lecture-assistant.pdf",
    pdfLabel: "소개자료"
  },
  {
    title: "사내 그룹웨어",
    description: "소규모 기업을 위한 일정 공유·관리 앱입니다. 개인 일정과 팀/전체 일정을 나누어 공유할 수 있으며, 공지사항과 To-Do도 함께 관리할 수 있습니다.",
    features: [
      "개인 일정 및 팀·전체 일정 공유",
      "공지사항 등록 및 조회",
      "To-Do 관리 기능",
      "소규모 기업에 최적화된 그룹웨어"
    ],
    link: "https://company-groupware-nine.vercel.app/login",
    icon: <CalendarDays className="h-6 w-6" />,
    accentColor: "bg-cyan-500/20",
    buttonAccent: "bg-cyan-500/25 text-cyan-800 border-cyan-500/30 hover:bg-cyan-500/35 dark:text-cyan-200",
    pdfLink: "사내 그룹웨어.pdf",
    pdfLabel: "소개자료"
  },
  {
    title: "보험료 자동산출 시스템",
    description: "생명보험 보험료 및 책임준비금을 모듈 형식으로 자동 산출하는 앱입니다. 간단한 클릭만으로 보험료를 산출할 수 있으며, 간결화된 방식으로 전체 흐름 및 산출결과를 파악할 수 있습니다.",
    features: [
      "모듈형 생명보험 보험료 산출",
      "책임준비금 자동 계산",
      "간결한 흐름 및 결과 조회",
      "클릭만으로 빠른 산출"
    ],
    link: "https://life-matrix-flow-new.vercel.app/",
    icon: <Activity className="h-6 w-6" />,
    accentColor: "bg-green-500/20",
    buttonAccent: "bg-green-500/25 text-green-800 border-green-500/30 hover:bg-green-500/35 dark:text-green-200",
    pdfLink: "보험료_자동산출_설명서.pdf",
    pdfLabel: "소개자료"
  },
  {
    title: "머신러닝 자동 플로우",
    description: "머신러닝을 모듈화하고 이를 파이썬으로 구현하여 검증이 가능하고 다양한 모델을 조합하여 산출이 가능합니다.",
    features: [
      "머신러닝 모듈화 및 파이썬 구현",
      "다양한 모델 조합 산출",
      "결과 검증 기능",
      "자동화된 ML 워크플로우"
    ],
    link: "https://ml-auto-flow-new.vercel.app/",
    icon: <Network className="h-6 w-6" />,
    accentColor: "bg-blue-600/20",
    buttonAccent: "bg-blue-600/25 text-blue-800 border-blue-600/30 hover:bg-blue-600/35 dark:text-blue-200",
    pdfLink: "머신러닝_자동플로우_설명서.pdf",
    pdfLabel: "소개자료"
  },
  {
    title: "재보험 정청산 관리",
    description: "보험료 배분 및 재보험 특성에 맞게 정산 및 청산, 그리고 보고서를 생성해 내는 앱입니다. (테스트용 계정: test@reinsurance.com / password)",
    features: [
      "보험료 배분 및 정산",
      "재보험 특화 청산 관리",
      "정산 보고서 자동 생성",
      "빠른 재보험 결산 흐름 파악"
    ],
    link: "https://reinsurance-settlement.vercel.app/",
    icon: <Briefcase className="h-6 w-6" />,
    accentColor: "bg-indigo-600/20",
    buttonAccent: "bg-indigo-600/25 text-indigo-800 border-indigo-600/30 hover:bg-indigo-600/35 dark:text-indigo-200",
    pdfLink: "재보험_정청산시스템_소개.pdf",
    pdfLabel: "소개자료"
  },
  {
    title: "보험 상품 검증 플랫폼",
    description: "보험사와 외부 검증기관의 상품 및 위험률을 검증하고 관리하는 앱으로 상호간에 검증과정 및 그 결과를 각각 보여주고 이를 관리할 수 있습니다.",
    features: [
      "보험사 및 검증기관 양방향 관리",
      "상품 및 위험률 검증 과정 기록/관리",
      "검증 단계별 결과 실시간 공유",
      "투명하고 효율적인 검증 프로세스 지원"
    ],
    link: "https://insurer-product-proof-platform-three.vercel.app/",
    icon: <ShieldCheck className="h-6 w-6" />,
    accentColor: "bg-fuchsia-500/20",
    buttonAccent: "bg-fuchsia-500/25 text-fuchsia-800 border-fuchsia-500/30 hover:bg-fuchsia-500/35 dark:text-fuchsia-200",
    pdfLink: "보험상품 검증 플랫폼.pdf",
    pdfLabel: "소개자료"
  },
  {
    title: "화재보험 보험료 자동산출",
    description: "일반화재보험 및 장기화재보험의 보험료를 간단한 클릭만으로 산출하는 앱입니다. AI가 산출 내역을 평가하며, 필요시 인수 거절 등의 기능도 제공합니다.",
    features: [
      "일반/장기 화재보험 보험료 산출",
      "클릭 기반의 간편한 사용성",
      "AI 기반 보험료 및 위험 평가",
      "인수 거절 등 맞춤형 판정 기능"
    ],
    link: "https://fire-insurance-uw-system.vercel.app/",
    icon: <Flame className="h-6 w-6" />,
    accentColor: "bg-red-500/20",
    buttonAccent: "bg-red-500/25 text-red-800 border-red-500/30 hover:bg-red-500/35 dark:text-red-200"
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
    imageExt: "png" as const,
  },
  {
    title: "Cursor 로 Supabase 설정하기",
    description: "Cursor에서 Supabase DB 구성부터 웹 연동까지 설정 과정을 정리했습니다.",
    href: "#",
    imagesBaseUrl: "/ai-tools/Cursor로 Supabase 설정 과정",
    imageExt: "png" as const,
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
    title: "SlideDeckCleaner",
    url: "https://www.slidedeckcleaner.com/",
    descriptionEmphasis: "NotebookLM 워터마크 제거.",
    description: "NotebookLM 슬라이드·PDF·비디오에서 워터마크를 제거하는 무료 온라인 도구입니다. 브라우저에서 로컬로 처리하여 개인정보를 보호합니다."
  },
  {
    title: "NotebookLM Remover",
    url: "https://notebooklmremover.com/ko",
    secondaryLink: { label: "NotebookLM 워터마크 제거", url: "https://www.slidedeckcleaner.com/" },
    description: "NotebookLM 슬라이드·PDF·비디오에서 워터마크를 제거하는 무료 온라인 도구입니다. 브라우저에서 로컬로 처리하여 개인정보를 보호합니다."
  },
  {
    title: "Vercel",
    url: "https://vercel.com/",
    description: "웹 앱을 빌드하고 배포하기 위한 AI 클라우드 플랫폼입니다. Next.js 등 다양한 프레임워크를 지원하며, Git 연동·자동 배포·글로벌 CDN을 제공합니다."
  },
  {
    title: "Railway",
    url: "https://railway.com/dashboard",
    description: "앱과 서비스를 배포·운영하기 위한 클라우드 플랫폼입니다. 데이터베이스, 백엔드, 프론트엔드 등을 한 곳에서 배포하고 관리할 수 있습니다."
  }
]

export default function Home() {
  return (
    <main className="min-h-screen bg-background">
      <SiteNav />
      {/* Header */}
      <header className="border-b border-border/60 bg-card/50 backdrop-blur-sm">
        <div className="container mx-auto px-4 py-8">
          <h1 className="text-3xl md:text-4xl font-bold text-center">
            <span className="inline-block px-6 py-3 bg-primary text-primary-foreground rounded-2xl shadow-lg shadow-primary/25">
              App Playground
            </span>
          </h1>
          <p className="text-center mt-4 text-lg text-muted-foreground">
            다양한 유틸리티 앱을 테스트해 보세요
          </p>
        </div>
      </header>

      {/* Main Content - 카드보기 */}
      <section id="card-view" className="container mx-auto px-4 py-12 scroll-mt-24">
        <CardViewAppLauncher
          apps={apps.map((app) => ({
            title: app.title,
            link: app.link,
            cardId: makeAppCardId(app.title),
          }))}
        />
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {apps.map((app) => (
            <AppCard key={app.title} {...app} cardId={makeAppCardId(app.title)} />
          ))}
        </div>
      </section>

      {/* Reference Links Section */}
      <section id="reference-links" className="container mx-auto px-4 py-12 border-t border-border/40 scroll-mt-24">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-2xl md:text-3xl font-bold mb-6 text-center">
            <span className="inline-block px-5 py-2.5 bg-muted rounded-xl shadow-sm">
              참고 링크
            </span>
          </h2>
          <div className="space-y-4">
            {referenceLinks.map((link, index) => (
              <div
                key={index}
                className="border border-border/60 bg-card p-4 rounded-xl shadow-sm hover:shadow-md hover:border-primary/20 transition-all duration-200"
              >
                <div className="flex items-start gap-4">
                  <div className="p-2.5 bg-muted/80 rounded-lg flex-shrink-0">
                    <LinkIcon className="h-5 w-5" />
                  </div>
                  <div className="flex-1">
                    <div className="flex flex-wrap items-center gap-x-2 gap-y-1">
                      <a
                        href={link.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-lg font-bold text-primary hover:underline inline-flex items-center gap-1"
                      >
                        {link.title}
                        <span className="text-sm">↗</span>
                      </a>
                      {"secondaryLink" in link && link.secondaryLink && (
                        <>
                          <span className="text-foreground/40">|</span>
                          <a
                            href={link.secondaryLink.url}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-lg font-bold text-primary hover:underline inline-flex items-center gap-1"
                          >
                            {link.secondaryLink.label}
                            <span className="text-sm">↗</span>
                          </a>
                        </>
                      )}
                    </div>
                    <p className="text-sm text-foreground/70 mt-1">
                      {"descriptionEmphasis" in link && link.descriptionEmphasis ? (
                        <>
                          <span className="font-bold text-foreground">{link.descriptionEmphasis}</span>{" "}
                          {link.description}
                        </>
                      ) : (
                        link.description
                      )}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* AI 도구 설명 Section - 파스텔 톤 */}
      <section id="ai-tools" className="border-t border-border/40 scroll-mt-24 bg-muted/30">
        <div className="container mx-auto px-4 py-12">
          <div className="max-w-5xl mx-auto">
            <h2 className="text-2xl md:text-3xl font-bold mb-6 text-center">
              <span className="inline-block px-5 py-2.5 bg-[oklch(0.94_0.04_75)] rounded-xl shadow-sm border border-amber-200/50">
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
      <footer className="border-t border-border/60 bg-card/50 mt-auto">
        <div className="container mx-auto px-4 py-6 text-center">
          <p className="text-sm text-muted-foreground">
            더 많은 앱이 곧 추가됩니다!
          </p>
        </div>
      </footer>
    </main>
  )
}
