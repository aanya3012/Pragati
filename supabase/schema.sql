create extension if not exists "uuid-ossp";

create table if not exists public.profiles (
  id uuid primary key references auth.users(id) on delete cascade,
  name text,
  email text,
  avatar_url text,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table if not exists public.onboarding_state (
  user_id uuid primary key references public.profiles(id) on delete cascade,
  journey_phase text not null,
  covered_topics text[] not null default '{}',
  estimated_total_solved text not null,
  preferred_platforms text[] not null default '{}',
  weekly_goal text not null,
  confidence_level integer not null default 50,
  completed boolean not null default false,
  updated_at timestamptz not null default now()
);

create table if not exists public.daily_logs (
  id uuid primary key default uuid_generate_v4(),
  user_id uuid not null references public.profiles(id) on delete cascade,
  log_date date not null,
  solved_easy integer not null default 0 check (solved_easy >= 0),
  solved_medium integer not null default 0 check (solved_medium >= 0),
  solved_hard integer not null default 0 check (solved_hard >= 0),
  topics text[] not null default '{}',
  hours_studied numeric(4, 2) not null default 0 check (hours_studied >= 0),
  project_work_notes text,
  learning_notes text,
  growth_score integer not null default 0,
  created_at timestamptz not null default now(),
  unique (user_id, log_date)
);

create table if not exists public.growth_metrics (
  user_id uuid primary key references public.profiles(id) on delete cascade,
  momentum_score integer not null default 0,
  consistency_score integer not null default 0,
  topic_diversity_score integer not null default 0,
  growth_delta numeric(6, 2) not null default 0,
  percentile integer not null default 0,
  updated_at timestamptz not null default now()
);

create table if not exists public.streak_history (
  user_id uuid primary key references public.profiles(id) on delete cascade,
  current_streak integer not null default 0,
  longest_streak integer not null default 0,
  last_logged_date date
);

alter table public.profiles enable row level security;
alter table public.onboarding_state enable row level security;
alter table public.daily_logs enable row level security;
alter table public.growth_metrics enable row level security;
alter table public.streak_history enable row level security;

create policy "profiles are readable by owner" on public.profiles for select using (auth.uid() = id);
create policy "profiles are insertable by owner" on public.profiles for insert with check (auth.uid() = id);
create policy "profiles are updateable by owner" on public.profiles for update using (auth.uid() = id);

create policy "onboarding readable by owner" on public.onboarding_state for select using (auth.uid() = user_id);
create policy "onboarding insertable by owner" on public.onboarding_state for insert with check (auth.uid() = user_id);
create policy "onboarding updateable by owner" on public.onboarding_state for update using (auth.uid() = user_id);

create policy "logs readable by owner" on public.daily_logs for select using (auth.uid() = user_id);
create policy "logs insertable by owner" on public.daily_logs for insert with check (auth.uid() = user_id);
create policy "logs updateable by owner" on public.daily_logs for update using (auth.uid() = user_id);

create policy "metrics readable by owner" on public.growth_metrics for select using (auth.uid() = user_id);
create policy "metrics insertable by owner" on public.growth_metrics for insert with check (auth.uid() = user_id);
create policy "metrics updateable by owner" on public.growth_metrics for update using (auth.uid() = user_id);

create policy "streaks readable by owner" on public.streak_history for select using (auth.uid() = user_id);
create policy "streaks insertable by owner" on public.streak_history for insert with check (auth.uid() = user_id);
create policy "streaks updateable by owner" on public.streak_history for update using (auth.uid() = user_id);

create or replace function public.handle_new_user()
returns trigger
language plpgsql
security definer
set search_path = public
as $$
begin
  insert into public.profiles (id, email, name, avatar_url)
  values (
    new.id,
    new.email,
    coalesce(new.raw_user_meta_data->>'name', split_part(new.email, '@', 1)),
    new.raw_user_meta_data->>'avatar_url'
  )
  on conflict (id) do nothing;
  return new;
end;
$$;

drop trigger if exists on_auth_user_created on auth.users;
create trigger on_auth_user_created
after insert on auth.users
for each row execute procedure public.handle_new_user();
