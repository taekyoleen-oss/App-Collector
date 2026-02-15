import { NextRequest, NextResponse } from "next/server"
import path from "path"
import fs from "fs"

/**
 * ai-tools 하위 폴더에 있는 이미지 개수·확장자·이름 규칙을 반환합니다.
 * - 1.png, 2.png 형태 또는 page-1.png, page-2.png 형태 모두 지원.
 */
export async function GET(request: NextRequest) {
  const folderParam = request.nextUrl.searchParams.get("folder")
  if (!folderParam) {
    return NextResponse.json({ error: "folder query required" }, { status: 400 })
  }

  const decoded = decodeURIComponent(folderParam)
  const basename = path.basename(decoded)
  if (basename !== decoded || basename.includes("..")) {
    return NextResponse.json({ error: "Invalid folder name" }, { status: 400 })
  }

  const publicDir = path.normalize(path.resolve(process.cwd(), "public", "ai-tools"))
  const targetDir = path.normalize(path.join(publicDir, basename))

  if (!targetDir.startsWith(publicDir)) {
    return NextResponse.json({ error: "Forbidden" }, { status: 403 })
  }

  try {
    const stat = await fs.promises.stat(targetDir)
    if (!stat.isDirectory()) {
      return NextResponse.json({ error: "Not a directory" }, { status: 404 })
    }
    const files = await fs.promises.readdir(targetDir)
    const numPng = files.filter((f) => /^\d+\.png$/i.test(f))
    const numWebp = files.filter((f) => /^\d+\.webp$/i.test(f))
    const pagePng = files.filter((f) => /^page-\d+\.png$/i.test(f))
    const pageWebp = files.filter((f) => /^page-\d+\.webp$/i.test(f))
    const countNum = Math.max(numPng.length, numWebp.length)
    const countPage = Math.max(pagePng.length, pageWebp.length)
    if (countNum >= countPage && countNum > 0) {
      const ext = numWebp.length >= numPng.length ? "webp" : "png"
      return NextResponse.json({ count: countNum, ext, naming: "N" })
    }
    if (countPage > 0) {
      const ext = pageWebp.length >= pagePng.length ? "webp" : "png"
      return NextResponse.json({ count: countPage, ext, naming: "page-N" })
    }
    return NextResponse.json({ count: 0, ext: "png", naming: "page-N" })
  } catch {
    return NextResponse.json({ error: "Folder not found" }, { status: 404 })
  }
}
