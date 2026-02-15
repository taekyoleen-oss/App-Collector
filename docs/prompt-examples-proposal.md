# 프롬프트 예제 카테고리 구성안

## 1. 목적

앱별(노트북LM, 커서 AI, 제미나이 등) **프롬프트 예제**를 저장·조회·수정·삭제하는 웹 페이지를 추가합니다.  
각 항목을 클릭하면 **메모장 형태**의 상세 페이지에서 내용을 편집할 수 있습니다.

---

## 2. 화면 구성 제안

### 2.1 상단 메뉴

- 기존: **카드보기** | **참고 링크** | **AI 도구 설명**
- 추가: **프롬프트 예제** → `/prompts` 로 이동

### 2.2 프롬프트 예제 메인 (`/prompts`)

- **분류(카테고리)**: 노트북LM, 커서 AI, 제미나이 등 **탭 또는 버튼**으로 선택
- **목록**: 선택한 카테고리별로 항목을 **테이블/카드**로 표시
  - 표시 정보: 제목, 최종 수정일(또는 최근 사용일), 미리보기(내용 일부)
- **정렬 옵션**
  - 최근 사용한 순
  - 제목 오름차순 / 제목 내림차순
  - 생성일 최신순 / 오래된 순
- **동작**
  - **새로 만들기**: 해당 카테고리로 메모 추가
  - **행(항목) 클릭**: 해당 항목의 메모 상세/편집 페이지로 이동

### 2.3 메모 상세/편집 페이지 (`/prompts/[id]` 또는 `/prompts/new`)

- **메모장 형태** 레이아웃
  - **제목** (한 줄 입력)
  - **내용** (긴 텍스트, textarea 또는 에디터)
  - **관련 링크** (여러 줄 또는 링크 추가 버튼)
  - **별첨** (파일 목록 + 추가 버튼 → Supabase Storage 업로드)
- **버튼**: 저장, 삭제, 목록으로 돌아가기
- **저장 시**: `updated_at`, “최근 사용”용 필드 갱신

---

## 3. DB 구성 (Supabase)

### 3.1 테이블: `prompt_examples`

| 열 이름 (한글) | 컬럼명 | 타입 | 설명 |
|----------------|--------|------|------|
| (자동) | id | uuid | PK, default gen_random_uuid() |
| 이름(분류) | category | text | 노트북LM, 커서 AI, 제미나이 등 |
| 제목 | title | text | NOT NULL |
| 내용 | content | text | 긴 텍스트 |
| 관련 링크 | related_links | text | URL 여러 개는 줄바꿈 또는 JSON 등으로 저장 |
| 별첨 | attachment_urls | text[] 또는 jsonb | Supabase Storage 경로 또는 URL 목록 |
| 생성일시 | created_at | timestamptz | default now() |
| 수정일시 | updated_at | timestamptz | default now() |
| 최근 사용 | last_used_at | timestamptz | 정렬용, 열람/수정 시 갱신 |

### 3.2 정렬과의 매핑

- **최근 사용한 순** → `last_used_at DESC NULLS LAST`
- **제목 오름차순** → `title ASC`
- **제목 내림차순** → `title DESC`
- **생성일 최신순** → `created_at DESC`
- **생성일 오래된 순** → `created_at ASC`

### 3.3 별첨 파일 (선택)

- Supabase **Storage** 버킷 예: `prompt-attachments`
- 업로드 시 **경로 예**: `{category}/{prompt_id}/{파일명}`
- DB에는 **파일 URL 또는 path 목록**만 `attachment_urls`에 저장

---

## 4. 필요한 작업 요약

| 항목 | 내용 |
|------|------|
| Supabase 프로젝트 | 새 프로젝트 생성 또는 기존 프로젝트 사용 |
| 테이블 생성 | 위 스키마로 `prompt_examples` 테이블 생성 |
| RLS 정책 | 읽기/쓰기 정책 설정 (필요 시 인증 연동) |
| Storage (선택) | 별첨용 버킷 생성 및 정책 |
| 환경 변수 | `NEXT_PUBLIC_SUPABASE_URL`, `SUPABASE_SERVICE_ROLE_KEY` 또는 `NEXT_PUBLIC_SUPABASE_ANON_KEY` |
| 앱 구현 | 메뉴 추가, `/prompts` 목록, `/prompts/[id]` 메모 편집, CRUD Server Actions |

---

## 5. 카테고리 고정값 제안

초기 분류는 다음처럼 **고정 목록**으로 두고, 필요 시 나중에 “카테고리 관리”로 확장할 수 있습니다.

- **노트북LM**
- **커서 AI**
- **제미나이**
- **(추가)** 원하시는 이름으로 더 넣기

이 구성을 기준으로 DB 설계와 화면을 구현하면 됩니다.

---

## 6. 구현된 항목 (참고)

- 상단 메뉴에 **프롬프트 예제** 링크 추가 → `/prompts` 이동
- **목록 페이지** `/prompts`: 카테고리(노트북LM, 커서 AI, 제미나이) 탭, 정렬(최근 사용 순, 제목 오름/내림차순, 생성일 순), 새로 만들기, 항목 클릭 시 상세로 이동
- **상세/편집 페이지** `/prompts/[id]`: 제목·내용·관련 링크 메모장 형태 편집, 저장·삭제
- **새 항목 페이지** `/prompts/new`: 동일 폼으로 생성
- **Supabase**: `lib/supabase`, `app/prompts/actions.ts` (Server Actions), 테이블 스키마는 `docs/supabase-prompt-examples-schema.sql`
- **별첨(파일)**: DB 컬럼과 UI 안내만 준비됨. 실제 업로드는 Supabase Storage 연동 시 추가 가능
