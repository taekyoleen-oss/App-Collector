# PDF를 그림 파일로 변환해서 게시하기

PDF 내장 이미지 디코딩 오류(JpegError 등)를 피하려면, PDF를 **페이지별 이미지**로 변환해 두고 그 이미지를 보여주는 방식이 안정적입니다.

## 1. 어떤 형식이 좋은가?

| 형식 | 장점 | 단점 | 권장 |
|------|------|------|------|
| **PNG** | 무손실, 텍스트/도형 선명 | 용량 큼 | 압축(optipng/pngquant) 후 사용 시 좋음 |
| **JPEG** | 용량 작음 | 손실 압축, 글자 테두리 번짐 | 사진 위주일 때만 |
| **WebP** | PNG보다 25~35% 작게, 품질 좋음, 브라우저 지원 좋음 | 구형 브라우저는 미지원(현재는 거의 지원) | **웹 게시용으로 가장 추천** |
| **AVIF** | WebP보다 더 작음 | 인코딩 느림, 구형 환경 일부 미지원 | 선택 사항 |

**정리**:  
- **웹에서 페이지 이미지로 보여줄 때** → **WebP** (용량·품질 균형 좋음).  
- **무손실이 꼭 필요할 때** → **PNG** + pngquant/optipng으로 압축.

## 2. 폴더 구조

변환된 이미지는 다음처럼 두면 됩니다.

```
public/ai-tools/
  bananaNL 및 Grabbit 으로 노트북ML 강화.pdf   ← 원본 PDF (새 탭에서 열기용)
  bananaNL 및 Grabbit 으로 노트북ML 강화/      ← 같은 이름의 폴더
    page-1.webp
    page-2.webp
    page-3.webp
    ...
```

- **폴더 이름**: PDF 파일명에서 `.pdf`만 뺀 이름과 동일하게.  
- **파일 이름**: `page-1`, `page-2`, … 순서대로.  
- **확장자**: WebP 권장 (`.webp`). PNG로 할 경우 `.png`로 통일.

## 3. 변환 방법

### A. 스크립트 사용 (프로젝트에 포함된 스크립트)

1. **Poppler 설치** (pdftoppm 사용)
   - Windows: `choco install poppler` 또는 [Poppler for Windows](https://github.com/oschwartz10612/poppler-windows/releases)에서 바이너리 받아 PATH에 추가
   - macOS: `brew install poppler`
   - Linux: `sudo apt install poppler-utils` (또는 해당 배포판 패키지)

2. **변환 실행**
   ```bash
   node scripts/pdf-to-images.cjs "public/ai-tools/bananaNL 및 Grabbit 으로 노트북ML 강화.pdf"
   ```
   - 출력 폴더: 같은 경로에 `bananaNL 및 Grabbit 으로 노트북ML 강화/` 생성
   - 파일명: `page-1.png`, `page-2.png`, … (스크립트가 pdftoppm 출력을 이 이름으로 정리함)
   - 기본: PNG(150 DPI). 용량을 줄이려면 아래처럼 WebP로 다시 변환할 수 있음.

3. **WebP로 압축(선택)**  
   PNG가 너무 크면 [Squoosh](https://squoosh.app/)에서 일괄 변환하거나, Node에서 `sharp`로 변환 가능:
   ```bash
   pnpm add -D sharp
   node -e "
   const sharp = require('sharp');
   const fs = require('fs');
   const path = require('path');
   const dir = 'public/ai-tools/bananaNL 및 Grabbit 으로 노트북ML 강화';
   fs.readdirSync(dir).filter(f=>f.endsWith('.png')).forEach(f=>{
     sharp(path.join(dir,f)).webp({quality:80}).toFile(path.join(dir, f.replace('.png','.webp')));
   });
   "
   ```
   변환 후 `imageExt: "webp"` 로 두고, 필요하면 기존 PNG는 삭제해도 됨.

### B. 수동 변환

- **Adobe Acrobat**: 파일 → 내보내기 → 이미지 → PNG/JPEG
- **온라인 도구**: “PDF to PNG”, “PDF to WebP” 등 검색 후 사용
- **ImageMagick** (설치된 경우):  
  `magick convert -density 150 input.pdf output/page-%d.png`

## 4. 앱에서 이미지로 보이게 하기

`app/page.tsx`의 `aiTools`에서 해당 항목에 **이미지 폴더 정보**를 넣으면, 모달에서 PDF 대신 **이미지 뷰어**로 표시됩니다.

```ts
{
  title: "bananaNL 및 Grabbit 으로 노트북ML 강화.pdf",
  description: "…",
  href: "/api/view-pdf?file=" + encodeURIComponent("bananaNL 및 Grabbit 으로 노트북ML 강화.pdf"),
  // 아래 세 개를 넣으면 이 문서는 이미지로 표시됩니다 (PDF 뷰어 대신).
  imagesBaseUrl: "/ai-tools/bananaNL 및 Grabbit 으로 노트북ML 강화",
  imageCount: 42,   // 실제 페이지 수로 변경
  imageExt: "webp"  // "png" 또는 "webp"
}
```

- `imagesBaseUrl`: `public/ai-tools/` 아래 폴더 경로 (앞에 `/` 한 개, URL 인코딩 전).
- `imageCount`: 변환된 이미지 개수(페이지 수).
- `imageExt`: `"webp"` 또는 `"png"`.

이렇게 하면 **PDF를 그림 파일로 만들어서 게시**한 것과 동일하게, 디코딩 오류 없이 안정적으로 볼 수 있습니다.
