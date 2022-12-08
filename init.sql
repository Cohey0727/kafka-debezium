CREATE SCHEMA example;

CREATE TABLE example.books (
    id uuid default gen_random_uuid() not null constraint books_pk primary key,
    name varchar
);

INSERT INTO example.books (name) VALUES ('book1');