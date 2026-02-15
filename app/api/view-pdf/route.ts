import { NextRequest, NextResponse } from "next/server"
import path from "path"
import fs from "fs"

/**
 * PDF를 브라우저에서 열기(다운로드 방지) 위해
 * Content-Disposition: inline 으로 제공합니다.
 * public/ai-tools/ 아래 파일만 허용합니다.
 */
export async function GET(request: NextRequest) {
  const fileParam = request.nextUrl.searchParams.get("file")
  if (!fileParam) {
    return NextResponse.json({ error: "file query required" }, { status: 400 })
  }

  const decoded = decodeURIComponent(fileParam)
  const basename = path.basename(decoded)
  if (basename !== decoded || basename.includes("..") || path.isAbsolute(decoded)) {
    return NextResponse.json({ error: "Invalid file name" }, { status: 400 })
  }

  const publicDir = path.normalize(path.resolve(process.cwd(), "public", "ai-tools"))
  const filePath = path.normalize(path.join(publicDir, basename))

  if (!filePath.startsWith(publicDir)) {
    return NextResponse.json({ error: "Forbidden" }, { status: 403 })
  }

  try {
    const stat = await fs.promises.stat(filePath)
    if (!stat.isFile()) {
      return NextResponse.json({ error: "Not a file" }, { status: 404 })
    }
    const buffer = await fs.promises.readFile(filePath)
    const headers = new Headers({
      "Content-Type": "application/pdf",
      "Content-Disposition": "inline; filename=\"" + basename.replace(/"/g, "%22") + "\"",
      "Content-Length": String(buffer.length),
      "Cache-Control": "public, max-age=3600",
      "X-Frame-Options": "SAMEORIGIN",
    })
    return new Response(buffer, { status: 200, headers })
  } catch (err) {
    return NextResponse.json({ error: "File not found" }, { status: 404 })
  }
}
