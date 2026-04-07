import { NextRequest, NextResponse } from "next/server"
import path from "path"
import fs from "fs"

/**
 * PDF를 브라우저에서 열기(다운로드 방지) 위해
 * Content-Disposition: inline 으로 제공합니다.
 * public/ai-tools/ 폴더를 먼저 확인하고, 없으면 public/ 폴더에서 찾습니다.
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

  const publicRoot = path.normalize(path.resolve(process.cwd(), "public"))
  const aiToolsDir = path.normalize(path.join(publicRoot, "ai-tools"))
  
  let targetBasename = basename
  let targetDir = aiToolsDir

  try {
    const files = await fs.promises.readdir(aiToolsDir)
    const match = files.find(f => f.normalize('NFC') === basename.normalize('NFC'))
    if (match) {
      targetBasename = match
    } else {
      const publicFiles = await fs.promises.readdir(publicRoot)
      const publicMatch = publicFiles.find(f => f.normalize('NFC') === basename.normalize('NFC'))
      if (publicMatch) {
         targetDir = publicRoot
         targetBasename = publicMatch
      } else {
         throw new Error("Not a file")
      }
    }
  } catch (err) {
    return NextResponse.json({ error: "File not found by readdir" }, { status: 404 })
  }

  const filePath = path.normalize(path.join(targetDir, targetBasename))

  if (!filePath.startsWith(publicRoot)) {
    return NextResponse.json({ error: "Forbidden" }, { status: 403 })
  }

  try {
    const stat = await fs.promises.stat(filePath)
    if (!stat.isFile()) {
      return NextResponse.json({ error: "Not a file" }, { status: 404 })
    }
    const buffer = await fs.promises.readFile(filePath)
    const encodedBasename = encodeURIComponent(basename);
    const headers = new Headers({
      "Content-Type": "application/pdf",
      "Content-Disposition": `inline; filename="${encodedBasename}"; filename*=UTF-8''${encodedBasename}`,
      "Content-Length": String(buffer.length),
      "Cache-Control": "public, max-age=3600",
      "X-Frame-Options": "SAMEORIGIN",
    })
    return new Response(buffer, { status: 200, headers })
  } catch (err) {
    console.error("View PDF Error:", err)
    return NextResponse.json({ error: "File not found", details: String(err), filePath_checked: filePath }, { status: 404 })
  }
}
