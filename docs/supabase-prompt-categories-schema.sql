-- 프롬프트 예제 카테고리 테이블 (Supabase SQL Editor에서 실행)
-- prompt_examples.category 값과 연동: 여기서 관리한 이름만 탭으로 표시·선택 가능

create table if not exists public.prompt_categories (
  id uuid primary key default gen_random_uuid(),
  name text not null unique,
  sort_order int not null default 0,
  created_at timestamptz default now() not null
);

comment on table public.prompt_categories is '프롬프트 예제 분류 (노트북LM, 커서 AI 등). 사용자가 추가 가능.';
comment on column public.prompt_categories.name is '표시 이름 (prompt_examples.category와 동일 값 사용)';
comment on column public.prompt_categories.sort_order is '정렬 순서 (작을수록 앞)';

alter table public.prompt_categories enable row level security;

create policy "Allow read for all" on public.prompt_categories for select using (true);
create policy "Allow insert for all" on public.prompt_categories for insert with check (true);
create policy "Allow update for all" on public.prompt_categories for update using (true);
create policy "Allow delete for all" on public.prompt_categories for delete using (true);

-- 기본 카테고리 (이미 있으면 무시)
insert into public.prompt_categories (name, sort_order)
values
  ('노트북LM', 0),
  ('커서 AI', 1),
  ('제미나이', 2)
on conflict (name) do nothing;
