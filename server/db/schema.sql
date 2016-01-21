BEGIN;

CREATE SCHEMA knowit_schema;

CREATE TABLE knowit_schema.student
(
  id serial PRIMARY KEY,
  username character varying(240) NOT NULL UNIQUE,
  firstname character varying(240) NOT NULL,
  lastname character varying(240) NOT NULL,
  email character varying(240) NOT NULL UNIQUE
);

CREATE TABLE knowit_schema.learnable
(
  id serial PRIMARY KEY,
  text text NOT NULL,
  createdAt date NOT NULL,
  tags text ARRAY DEFAULT ARRAY['General'],
  userid integer NOT NULL REFERENCES knowit_schema.student (id)
    ON UPDATE CASCADE ON DELETE CASCADE
);

COMMIT;
