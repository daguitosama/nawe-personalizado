
create table customers (
  customer_id serial primary key,
  customer_name text not null,
  customer_phone text,
  customer_email text,
)

create table orders (
  order_id serial primary key,
  order_stage text not null,
  order_total_cost numeric not null,
  order_created_date timestamp (0) with out time zone not null default now()
)

create table order_item(
    order_item_id serial primary key,
    order_item_name text not null,
    order_item_cost numeric not null
)

create table orders_order_items(
    order_id integer references orders ('order_id'),
    order_item_id integer references order_item ('order_item_id'),
    primary key (order_id, order_item_id)
)

create table orders_customers (
    order_id integer references orders ('order_id'),
    customer_id integer references customer ('customer_id'),
    primary key (order_id, customer_id)
)

create table admins(
    admin_id serial primary key,
    username text not null,
    password_hash text not null,
)