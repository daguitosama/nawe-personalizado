
begin;

create table admins(
    admin_id serial primary key,
    username text not null,
    password_hash text not null
);

create table customers (
  customer_id serial primary key,
  customer_name text not null,
  customer_phone text,
  customer_email text
);


create table products(
    product_id serial primary key,
    product_name varchar(300) not null,
    product_price numeric not null CHECK (product_price > 0)
);

create table orders (
  order_id serial primary key,
  order_state text not null,
  order_total_cost numeric not null,
  order_created_date timestamp(0) without time zone not null default now()
);

create table order_items(
    order_item_id serial primary key,
    order_item_product_id integer references products(product_id),
    order_item_product_quantity numeric CHECK (order_item_product_quantity > 0),
    order_item_import numeric not null
);

create table orders_order_items(
    order_id integer references orders(order_id),
    order_item_id integer references order_items (order_item_id),
    primary key (order_id, order_item_id)
);

create table orders_customers (
    order_id integer references orders (order_id),
    customer_id integer references customers (customer_id),
    primary key (order_id, customer_id)
);
commit;
end;