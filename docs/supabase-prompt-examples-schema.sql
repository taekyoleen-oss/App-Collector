-- 프롬프트 예제용 테이블 (Supabase SQL Editor에서 실행)
-- 1. 테이블 생성
create table if not exists public.prompt_examples (
  id uuid primary key default gen_random_uuid(),
  category text not null,
  title text not null,
  content text default '',
  related_links text default '',
  attachment_urls text[] default '{}',
  created_at timestamptz default now() not null,
  updated_at timestamptz default now() not null,
  last_used_at timestamptz
);

comment on table public.prompt_examples is '앱별 프롬프트 예제 (노트북LM, 커서 AI, 제미나이 등)';
comment on column public.prompt_examples.category is '분류: 노트북LM, 커서 AI, 제미나이 등';
comment on column public.prompt_examples.related_links is '관련 링크 (줄바꿈 구분 또는 JSON)';
comment on column public.prompt_examples.attachment_urls is 'Supabase Storage URL 또는 경로 배열';
comment on column public.prompt_examples.last_used_at is '최근 열람/수정 시 갱신 (정렬용)';

-- 2. updated_at 자동 갱신 트리거
create or replace function public.set_updated_at()
returns trigger as $$
begin
  new.updated_at = now();
  return new;
end;
$$ language plpgsql;

drop trigger if exists prompt_examples_updated_at on public.prompt_examples;
create trigger prompt_examples_updated_at
  before update on public.prompt_examples
  for each row execute function public.set_updated_at();

-- 3. RLS 활성화 (필요 시 정책 추가)
alter table public.prompt_examples enable row level security;

-- 4. 익명/인증 읽기·쓰기 허용 예시 (개발용 – 프로덕션에서는 조건 추가 권장)
create policy "Allow read for all" on public.prompt_examples for select using (true);
create policy "Allow insert for all" on public.prompt_examples for insert with check (true);
create policy "Allow update for all" on public.prompt_examples for update using (true);
create policy "Allow delete for all" on public.prompt_examples for delete using (true);

-- 5. (선택) Storage 버킷은 Supabase 대시보드에서 생성
-- 버킷 이름: prompt-attachments, Public 또는 인증 정책 설정
