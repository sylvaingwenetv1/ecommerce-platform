create table profiles (
  id uuid primary key references auth.users(id) on delete cascade,
  role text not null check (role in ('admin','owner','client')),
  full_name text,
  phone text,
  created_at timestamptz default now()
);

create table categories (
  id uuid primary key default gen_random_uuid(),
  name_fr text not null,
  name_en text not null
);

create table products (
  id uuid primary key default gen_random_uuid(),
  owner_id uuid references profiles(id) on delete cascade,
  category_id uuid references categories(id),
  title_fr text not null,
  title_en text,
  description_fr text,
  description_en text,
  price numeric not null,
  image_url text,
  model_3d_url text,
  created_at timestamptz default now()
);

create table cart_items (
  id uuid primary key default gen_random_uuid(),
  client_id uuid references profiles(id) on delete cascade,
  product_id uuid references products(id) on delete cascade,
  quantity int not null default 1,
  created_at timestamptz default now()
);

create table orders (
  id uuid primary key default gen_random_uuid(),
  client_id uuid references profiles(id),
  status text not null default 'pending',
  total numeric not null default 0,
  created_at timestamptz default now()
);

create table order_items (
  id uuid primary key default gen_random_uuid(),
  order_id uuid references orders(id) on delete cascade,
  product_id uuid references products(id),
  quantity int not null,
  unit_price numeric not null
);

create table appointments (
  id uuid primary key default gen_random_uuid(),
  order_id uuid references orders(id) on delete cascade,
  scheduled_at timestamptz not null,
  status text not null default 'scheduled'
);

create table notifications (
  id uuid primary key default gen_random_uuid(),
  profile_id uuid references profiles(id) on delete cascade,
  content text not null,
  read boolean default false,
  created_at timestamptz default now()
);

create table messages (
  id uuid primary key default gen_random_uuid(),
  sender_id uuid references profiles(id),
  receiver_id uuid references profiles(id),
  content text not null,
  created_at timestamptz default now()
);

create table payments (
  id uuid primary key default gen_random_uuid(),
  order_id uuid references orders(id) on delete cascade,
  amount numeric not null,
  status text not null default 'pending',
  paid_at timestamptz
);

create policy "profiles_select_own" on profiles for select using (auth.uid() = id);
create policy "profiles_update_own" on profiles for update using (auth.uid() = id);

create policy "products_public_read" on products for select using (true);
create policy "products_owner_write" on products for all using (auth.uid() = owner_id);

create policy "cart_own" on cart_items for all using (auth.uid() = client_id);

create policy "orders_own" on orders for select using (auth.uid() = client_id);
create policy "orders_insert_own" on orders for insert with check (auth.uid() = client_id);
