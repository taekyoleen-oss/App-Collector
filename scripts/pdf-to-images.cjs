/**
 * PDF를 페이지별 이미지(PNG)로 변환합니다.
 * Poppler(pdftoppm) 필요: Windows choco install poppler, macOS brew install poppler
 *
 * 사용: node scripts/pdf-to-images.cjs "public/ai-tools/파일명.pdf"
 * 출력: public/ai-tools/파일명/page-1.png, page-2.png, ...
 */

const fs = require("fs")
const path = require("path")
const { spawnSync } = require("child_process")

const pdfPath = process.argv[2]
if (!pdfPath || !fs.existsSync(pdfPath)) {
  console.error("사용법: node scripts/pdf-to-images.cjs <PDF 경로>")
  console.error("예: node scripts/pdf-to-images.cjs \"public/ai-tools/bananaNL 및 Grabbit 으로 노트북ML 강화.pdf\"")
  process.exit(1)
}

const resolvedPdf = path.resolve(pdfPath)
const dir = path.dirname(resolvedPdf)
const basename = path.basename(resolvedPdf, ".pdf")
const outDir = path.join(dir, basename)

if (!fs.existsSync(outDir)) {
  fs.mkdirSync(outDir, { recursive: true })
}

const prefix = path.join(outDir, "page")
// pdftoppm: -png, -r 150 (DPI). 출력: page-1.png, page-2.png, ...
const result = spawnSync("pdftoppm", ["-png", "-r", "150", resolvedPdf, prefix], {
  stdio: "inherit",
  shell: true,
})

if (result.status !== 0) {
  console.error("pdftoppm 실행 실패. Poppler가 설치되어 있는지 확인하세요.")
  console.error("  Windows: choco install poppler")
  console.error("  macOS:   brew install poppler")
  console.error("  Linux:   sudo apt install poppler-utils")
  process.exit(1)
}

// pdftoppm 출력은 page-01.png, page-02.png 형태일 수 있음. page-1.png 형태로 맞추려면 rename
const files = fs.readdirSync(outDir).filter((f) => f.startsWith("page-") && f.endsWith(".png"))
const padLen = String(files.length).length
files.sort((a, b) => {
  const nA = parseInt(a.replace(/\D/g, ""), 10)
  const nB = parseInt(b.replace(/\D/g, ""), 10)
  return nA - nB
})
files.forEach((f, i) => {
  const pageNum = i + 1
  const newName = `page-${pageNum}.png`
  const oldPath = path.join(outDir, f)
  const newPath = path.join(outDir, newName)
  if (oldPath !== newPath) fs.renameSync(oldPath, newPath)
})

console.log(`완료: ${outDir} (${files.length}개 페이지)`)
