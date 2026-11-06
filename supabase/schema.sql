-- Oludeniz Tours yönetim paneli — Supabase SQL Editor'de BİR KEZ çalıştır.
-- Erişim: sadece "staff" tablosundaki e-postayla giriş yapan kullanıcılar okuyup yazabilir.

create table if not exists public.staff (
  email text primary key,
  name text,
  created_at timestamptz not null default now()
);

create table if not exists public.suppliers (
  id bigint generated always as identity primary key,
  name text not null unique,
  phone text,
  note text,
  created_at timestamptz not null default now()
);

create table if not exists public.bookings (
  id bigint generated always as identity primary key,
  created_at timestamptz not null default now(),
  tour_date date,
  customer text not null,
  phone text,
  service text not null,
  guests int not null default 1 check (guests > 0),
  currency text not null default 'USD' check (currency in ('USD','EUR','TRY','GBP')),
  sale_total numeric(12,2) not null default 0,
  deposit numeric(12,2) not null default 0,
  payment_method text check (payment_method in ('Nakit','Kart','Havale','Kapıda','Online')),
  supplier_id bigint references public.suppliers(id) on delete set null,
  cost_total numeric(12,2) not null default 0,
  supplier_paid text not null default 'Hayır' check (supplier_paid in ('Evet','Hayır','Kısmen')),
  status text not null default 'Onaylı' check (status in ('Onaylı','Tamamlandı','İptal','Ertelendi')),
  note text,
  created_by text default (auth.jwt() ->> 'email')
);

create table if not exists public.cash_entries (
  id bigint generated always as identity primary key,
  created_at timestamptz not null default now(),
  entry_date date not null default current_date,
  description text not null,
  direction text not null check (direction in ('Giriş','Çıkış')),
  currency text not null default 'TRY' check (currency in ('USD','EUR','TRY','GBP')),
  amount numeric(12,2) not null check (amount >= 0),
  method text check (method in ('Nakit','Kart','Havale','Online')),
  category text check (category in ('Rezervasyon','Tedarikçi ödemesi','Komisyon','Reklam','Yakıt','Ofis','Maaş','Vergi','Diğer')),
  booking_id bigint references public.bookings(id) on delete set null,
  supplier_id bigint references public.suppliers(id) on delete set null,
  created_by text default (auth.jwt() ->> 'email')
);

create index if not exists bookings_tour_date_idx on public.bookings (tour_date);
create index if not exists bookings_supplier_idx on public.bookings (supplier_id);
create index if not exists cash_entry_date_idx on public.cash_entries (entry_date);
create index if not exists cash_booking_idx on public.cash_entries (booking_id);
create index if not exists cash_supplier_idx on public.cash_entries (supplier_id);

-- Erişim kontrolü
create or replace function public.is_staff() returns boolean
language sql stable security definer set search_path = '' as $$
  select exists (select 1 from public.staff s where lower(s.email) = lower(auth.jwt() ->> 'email'));
$$;
revoke execute on function public.is_staff() from public, anon;
grant execute on function public.is_staff() to authenticated;

alter table public.staff enable row level security;
alter table public.suppliers enable row level security;
alter table public.bookings enable row level security;
alter table public.cash_entries enable row level security;

drop policy if exists staff_read on public.staff;
create policy staff_read on public.staff for select to authenticated using ((select public.is_staff()));

do $$ declare t text; begin
  foreach t in array array['suppliers','bookings','cash_entries'] loop
    execute format('drop policy if exists %1$s_all on public.%1$s', t);
    execute format('create policy %1$s_all on public.%1$s for all to authenticated using ((select public.is_staff())) with check ((select public.is_staff()))', t);
  end loop;
end $$;

-- Yetkili kullanıcı (gerekirse başka e-posta ekle)
insert into public.staff (email, name) values ('mrtandempilot@gmail.com', 'Ceyhun') on conflict do nothing;
