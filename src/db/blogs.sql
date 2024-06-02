CREATE TABLE "user" (
  "user_id" uuid PRIMARY KEY DEFAULT (gen_random_uuid()),
  "name" varchar NOT NULL,
  "email" varchar NOT NULL,
  "password" varchar NOT NULL,
  "created_at" timestamp DEFAULT (now())
);

CREATE TABLE "blog" (
  "user_id" uuid NOT NULL,
  "blog_id" uuid PRIMARY KEY DEFAULT (gen_random_uuid()),
  "title" varchar NOT NULL,
  "text" varchar NOT NULL,
  "created_at" timestamp DEFAULT (now())
);

CREATE TABLE "comment" (
  "user_id" uuid NOT NULL,
  "blog_id" uuid NOT NULL,
  "comment_id" uuid NOT NULL DEFAULT (gen_random_uuid()),
  "text" varchar NOT NULL,
  "created_at" timestamp DEFAULT (now())
);

ALTER TABLE "comment" ADD FOREIGN KEY ("blog_id") REFERENCES "blog" ("blog_id") ON DELETE CASCADE ON UPDATE CASCADE;

ALTER TABLE "blog" ADD FOREIGN KEY ("user_id") REFERENCES "user" ("user_id") ON DELETE CASCADE ON UPDATE CASCADE;

ALTER TABLE "comment" ADD FOREIGN KEY ("user_id") REFERENCES "user" ("user_id") ON DELETE CASCADE ON UPDATE CASCADE;
