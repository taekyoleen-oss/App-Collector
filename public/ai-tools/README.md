# AI 도구 설명 PDF 저장 위치

이 폴더에 **AI 도구 설명** 메뉴에서 열릴 PDF 파일을 넣으세요.

## 폴더 구조

```
public/
  ai-tools/
    cursor-guide.pdf
    (원하는 PDF 추가)
    문서명/              ← 이미지로 게시한 경우: 이 폴더에 page-1.png, page-2.png, ...
      page-1.png
      page-2.png
      ...
```

### ZIP으로 이미지 넣기 (바로 사용)

`bananaNL 및 Grabbit 으로 노트북ML 강화.zip` 같은 **페이지별 이미지 ZIP**이 있다면:

1. ZIP을 **이 폴더(public/ai-tools/)** 에서 풀어 주세요.
2. **파일명 규칙**은 다음 두 가지 모두 지원됩니다.
   - **`1.png`, `2.png`, `3.png`, …** (숫자만)
   - **`page-1.png`, `page-2.png`, …**
3. 풀린 결과가 **`bananaNL 및 Grabbit 으로 노트북ML 강화`** 폴더이고, 그 안에 위 규칙대로 이미지가 있으면 **추가 설정 없이** 해당 카드에서 이미지 뷰어로 바로 열립니다.
4. ZIP 안에 폴더 없이 `1.png`, `2.png` … 만 있다면, **`bananaNL 및 Grabbit 으로 노트북ML 강화`** 라는 폴더를 만들고 그 안에 이미지들을 넣으면 됩니다.

## 사용 방법

1. **PDF 파일 추가**: 이 폴더(`public/ai-tools/`)에 PDF 파일을 복사하거나 저장합니다.
2. **파일명 규칙**: 영문·숫자·하이픈 사용을 권장합니다. (예: `cursor-guide.pdf`)
3. **카드와 연결**: `app/page.tsx` 안의 `aiTools` 배열에 항목을 추가/수정합니다.

   ```ts
   const aiTools = [
     {
       title: "Cursor 사용 가이드",           // 카드에 표시될 제목
       description: "Cursor IDE 사용법...",  // 카드에 표시될 짧은 설명
       href: "/ai-tools/cursor-guide.pdf"   // public/ai-tools/ 아래 파일 경로
     },
     // 새 항목 추가
     {
       title: "새 가이드",
       description: "설명 텍스트",
       href: "/ai-tools/new-guide.pdf"
     }
   ]
   ```

4. **다른 형식**: PDF 대신 웹 링크를 쓰려면 `href`에 전체 URL을 넣으면 됩니다.
   - 예: `href: "https://example.com/guide.pdf"`

## PDF가 보이게 하는 방법

- **현재 구성**: 카드를 클릭하면 `href` 주소가 **새 탭**에서 열립니다.
  - 브라우저가 PDF를 다운로드하거나, 브라우저/OS 기본 PDF 뷰어로 표시합니다.
- **프로젝트 내에서 보이게 하려면** (선택 사항):
  - 같은 탭에서 열기: `AiToolCard`에서 `window.open(href, "_self")` 로 변경하면 됩니다.
  - 모달/iframe으로 보기: 별도 모달 컴포넌트를 만들어 `<iframe src={pdfUrl} />` 로 띄우는 방식으로 확장할 수 있습니다.

이 폴더의 README.md는 배포 시 제외해도 됩니다 (필요하면 .gitignore에 추가).
