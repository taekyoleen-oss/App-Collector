const fs = require("fs")
const path = require("path")
const cwd = process.cwd()
const publicDest = path.join(cwd, "public", "pdf.worker.min.mjs")

function tryCopy(src) {
  if (fs.existsSync(src)) {
    fs.copyFileSync(src, publicDest)
    console.log("pdf.worker.min.mjs copied to public/")
    return true
  }
  return false
}

// 1) pnpm: node_modules/.pnpm/pdfjs-dist@*/
try {
  const pnpmDir = path.join(cwd, "node_modules", ".pnpm")
  if (fs.existsSync(pnpmDir)) {
    const dirs = fs.readdirSync(pnpmDir).filter((d) => d.startsWith("pdfjs-dist@"))
    if (dirs.length > 0) {
      const first = path.join(pnpmDir, dirs[0], "node_modules", "pdfjs-dist", "build", "pdf.worker.min.mjs")
      if (tryCopy(first)) process.exit(0)
    }
  }
} catch (_) {}

// 2) node_modules/pdfjs-dist (hoisted)
const hoisted = path.join(cwd, "node_modules", "pdfjs-dist", "build", "pdf.worker.min.mjs")
if (tryCopy(hoisted)) process.exit(0)

console.warn("pdf.worker.min.mjs not found. PDF 뷰어가 동작하려면 public/pdf.worker.min.mjs가 필요합니다.")
