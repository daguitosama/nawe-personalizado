create table personalizado_orders (
  order_id uuid default gen_random_uuid() primary key,
  order_date timestamp without time zone default now(),
  order_corpus text not null,
  client_name text not null,
  client_phone text not null,
  client_email text,
  is_attended boolean default false
);
