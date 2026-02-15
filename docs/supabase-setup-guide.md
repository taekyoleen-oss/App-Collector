# Supabase 연동 가이드 (프롬프트 예제)

## 1. Supabase 프로젝트 준비

1. [Supabase](https://supabase.com) 로그인 후 **New project** 로 프로젝트 생성
2. **Settings → API** 에서 다음 값 확인:
   - **Project URL** → `NEXT_PUBLIC_SUPABASE_URL`
   - **anon public** key → `NEXT_PUBLIC_SUPABASE_ANON_KEY`  
   - (서버 전용 사용 시) **service_role** key → `SUPABASE_SERVICE_ROLE_KEY`

## 2. 테이블 생성

1. Supabase 대시보드 **SQL Editor** 이동
2. `docs/supabase-prompt-examples-schema.sql` 내용을 복사해 붙여넣고 **Run** 실행
3. **Table Editor**에서 `prompt_examples` 테이블이 생성되었는지 확인

## 3. 환경 변수 설정

### 로컬 개발 (.env.local)

프로젝트 루트에 `.env.local` 파일을 만들고 다음을 추가합니다.

```env
NEXT_PUBLIC_SUPABASE_URL=https://xxxxx.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...
```

- **anon key**만으로 읽기/쓰기 정책을 “모두 허용”해 두었다면 위 두 개만 있으면 됩니다.
- 나중에 RLS로 “로그인한 사용자만” 제한할 경우, 서버에서만 쓰는 **service_role** key는 절대 클라이언트에 노출하지 말고, Server Action 등 서버 코드에서만 사용하세요.

### 배포 시 주의: .env.local은 배포에 포함되지 않습니다

- `.env.local`은 **로컬에서만** 사용됩니다. 이 파일은 보안상 `.gitignore`에 포함되어 있어 **Git에 커밋되지 않고, Vercel 등에 업로드되지 않습니다.**
- 따라서 **배포된 사이트(Vercel 등)에서 Supabase를 쓰려면, 배포 플랫폼 대시보드에서 환경 변수를 따로 설정**해야 합니다. 아래는 Vercel 기준입니다.

### Vercel에 환경 변수 넣는 방법

1. [Vercel 대시보드](https://vercel.com) 로그인 후 해당 프로젝트 선택
2. 상단 **Settings** → 왼쪽 메뉴 **Environment Variables** 이동
3. **Key**에 `NEXT_PUBLIC_SUPABASE_URL`, **Value**에 Supabase 프로젝트 URL 입력 후 **Save**
4. 같은 방식으로 **Key** `NEXT_PUBLIC_SUPABASE_ANON_KEY`, **Value**에 anon key 입력 후 **Save**
5. **Environment**는 Production(필수), Preview, Development 중 필요한 것에 체크 (보통 Production만 해도 됨)
6. 저장 후 **Deployments** 탭에서 최신 배포를 선택 → **Redeploy** 하면 새 환경 변수가 적용됩니다. (이미 배포된 빌드는 환경 변수 변경만으로는 갱신되지 않으므로 재배포 필요)

## 4. 패키지 설치

```bash
pnpm add @supabase/supabase-js
```

## 5. 별첨(파일) 사용 시 (선택)

1. Supabase **Storage** 메뉴에서 **New bucket** 생성 (예: `prompt-attachments`)
2. Public 버킷이면 URL로 바로 접근 가능
3. 앱에서는 “파일 선택 → 업로드 → 반환된 URL을 `attachment_urls`에 추가”하는 흐름으로 구현하면 됩니다.

## 6. 정리

- DB 목록: **분류(이름)** · **제목** · **내용** · **관련 링크** · **별첨**
- 정렬: 최근 사용 순, 제목 오름/내림차순, 생성일 순 등은 쿼리에서 `order by`로 처리
- 이 문서와 `supabase-prompt-examples-schema.sql`을 함께 두고, 팀원이 동일한 DB 구조로 맞추면 됩니다.
