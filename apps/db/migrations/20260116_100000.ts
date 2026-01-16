import { MigrateUpArgs, MigrateDownArgs, sql } from '@payloadcms/db-postgres'

const slugifySql = (column: string) => `
  regexp_replace(
    regexp_replace(
      regexp_replace(lower(trim(${column})), '\\s+', '-', 'g'),
      '[^a-z0-9\\-]', '', 'g'
    ),
    '(^-+|-+$)', '', 'g'
  )
`

export async function up({ db }: MigrateUpArgs): Promise<void> {
  await db.execute(sql`
    CREATE TABLE "tags" (
      "id" serial PRIMARY KEY NOT NULL,
      "title" varchar NOT NULL,
      "slug" varchar NOT NULL,
      "description" varchar,
      "posts_count" integer,
      "updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
      "created_at" timestamp(3) with time zone DEFAULT now() NOT NULL
    );

    CREATE UNIQUE INDEX "tags_slug_idx" ON "tags" USING btree ("slug");
    CREATE INDEX "tags_updated_at_idx" ON "tags" USING btree ("updated_at");
    CREATE INDEX "tags_created_at_idx" ON "tags" USING btree ("created_at");

    ALTER TABLE "categories" ADD COLUMN "posts_count" integer;

    ALTER TABLE "posts_rels" ADD COLUMN "tags_id" integer;
    ALTER TABLE "_posts_v_rels" ADD COLUMN "tags_id" integer;
    ALTER TABLE "artifacts_rels" ADD COLUMN "tags_id" integer;
    ALTER TABLE "_artifacts_v_rels" ADD COLUMN "tags_id" integer;
    ALTER TABLE "people_rels" ADD COLUMN "tags_id" integer;
    ALTER TABLE "_people_v_rels" ADD COLUMN "tags_id" integer;
    ALTER TABLE "places_rels" ADD COLUMN "tags_id" integer;
    ALTER TABLE "_places_v_rels" ADD COLUMN "tags_id" integer;
    ALTER TABLE "custom_items_rels" ADD COLUMN "tags_id" integer;
    ALTER TABLE "_custom_items_v_rels" ADD COLUMN "tags_id" integer;

    CREATE INDEX "posts_rels_tags_id_idx" ON "posts_rels" USING btree ("tags_id");
    CREATE INDEX "_posts_v_rels_tags_id_idx" ON "_posts_v_rels" USING btree ("tags_id");
    CREATE INDEX "artifacts_rels_tags_id_idx" ON "artifacts_rels" USING btree ("tags_id");
    CREATE INDEX "_artifacts_v_rels_tags_id_idx" ON "_artifacts_v_rels" USING btree ("tags_id");
    CREATE INDEX "people_rels_tags_id_idx" ON "people_rels" USING btree ("tags_id");
    CREATE INDEX "_people_v_rels_tags_id_idx" ON "_people_v_rels" USING btree ("tags_id");
    CREATE INDEX "places_rels_tags_id_idx" ON "places_rels" USING btree ("tags_id");
    CREATE INDEX "_places_v_rels_tags_id_idx" ON "_places_v_rels" USING btree ("tags_id");
    CREATE INDEX "custom_items_rels_tags_id_idx" ON "custom_items_rels" USING btree ("tags_id");
    CREATE INDEX "_custom_items_v_rels_tags_id_idx" ON "_custom_items_v_rels" USING btree ("tags_id");

    ALTER TABLE "posts_rels" ADD CONSTRAINT "posts_rels_tags_fk" FOREIGN KEY ("tags_id") REFERENCES "public"."tags"("id") ON DELETE cascade ON UPDATE no action;
    ALTER TABLE "_posts_v_rels" ADD CONSTRAINT "_posts_v_rels_tags_fk" FOREIGN KEY ("tags_id") REFERENCES "public"."tags"("id") ON DELETE cascade ON UPDATE no action;
    ALTER TABLE "artifacts_rels" ADD CONSTRAINT "artifacts_rels_tags_fk" FOREIGN KEY ("tags_id") REFERENCES "public"."tags"("id") ON DELETE cascade ON UPDATE no action;
    ALTER TABLE "_artifacts_v_rels" ADD CONSTRAINT "_artifacts_v_rels_tags_fk" FOREIGN KEY ("tags_id") REFERENCES "public"."tags"("id") ON DELETE cascade ON UPDATE no action;
    ALTER TABLE "people_rels" ADD CONSTRAINT "people_rels_tags_fk" FOREIGN KEY ("tags_id") REFERENCES "public"."tags"("id") ON DELETE cascade ON UPDATE no action;
    ALTER TABLE "_people_v_rels" ADD CONSTRAINT "_people_v_rels_tags_fk" FOREIGN KEY ("tags_id") REFERENCES "public"."tags"("id") ON DELETE cascade ON UPDATE no action;
    ALTER TABLE "places_rels" ADD CONSTRAINT "places_rels_tags_fk" FOREIGN KEY ("tags_id") REFERENCES "public"."tags"("id") ON DELETE cascade ON UPDATE no action;
    ALTER TABLE "_places_v_rels" ADD CONSTRAINT "_places_v_rels_tags_fk" FOREIGN KEY ("tags_id") REFERENCES "public"."tags"("id") ON DELETE cascade ON UPDATE no action;
    ALTER TABLE "custom_items_rels" ADD CONSTRAINT "custom_items_rels_tags_fk" FOREIGN KEY ("tags_id") REFERENCES "public"."tags"("id") ON DELETE cascade ON UPDATE no action;
    ALTER TABLE "_custom_items_v_rels" ADD CONSTRAINT "_custom_items_v_rels_tags_fk" FOREIGN KEY ("tags_id") REFERENCES "public"."tags"("id") ON DELETE cascade ON UPDATE no action;
  `)

  await db.execute(sql`
    WITH raw_tags AS (
      SELECT trim("tag") AS tag FROM "posts_tags" WHERE "tag" IS NOT NULL AND trim("tag") <> ''
      UNION
      SELECT trim("tag") AS tag FROM "artifacts_tags" WHERE "tag" IS NOT NULL AND trim("tag") <> ''
      UNION
      SELECT trim("tag") AS tag FROM "people_tags" WHERE "tag" IS NOT NULL AND trim("tag") <> ''
      UNION
      SELECT trim("tag") AS tag FROM "places_tags" WHERE "tag" IS NOT NULL AND trim("tag") <> ''
      UNION
      SELECT trim("tag") AS tag FROM "custom_items_tags" WHERE "tag" IS NOT NULL AND trim("tag") <> ''
    ),
    normalized AS (
      SELECT
        tag,
        ${sql.raw(slugifySql('"tag"'))} AS slug
      FROM raw_tags
    ),
    deduped AS (
      SELECT DISTINCT ON (slug) tag, slug
      FROM normalized
      WHERE slug <> ''
      ORDER BY slug, tag
    )
    INSERT INTO "tags" ("title", "slug", "created_at", "updated_at")
    SELECT tag, slug, now(), now()
    FROM deduped;
  `)

  await db.execute(sql`
    INSERT INTO "posts_rels" ("order", "parent_id", "path", "tags_id")
    SELECT pt."_order", pt."_parent_id", 'tags', t."id"
    FROM "posts_tags" pt
    JOIN "tags" t
      ON t."slug" = ${sql.raw(slugifySql('pt."tag"'))}
    WHERE pt."tag" IS NOT NULL AND trim(pt."tag") <> '';

    INSERT INTO "_posts_v_rels" ("order", "parent_id", "path", "tags_id")
    SELECT pt."_order", pt."_parent_id", 'tags', t."id"
    FROM "_posts_v_version_tags" pt
    JOIN "tags" t
      ON t."slug" = ${sql.raw(slugifySql('pt."tag"'))}
    WHERE pt."tag" IS NOT NULL AND trim(pt."tag") <> '';

    INSERT INTO "artifacts_rels" ("order", "parent_id", "path", "tags_id")
    SELECT at."_order", at."_parent_id", 'tags', t."id"
    FROM "artifacts_tags" at
    JOIN "tags" t
      ON t."slug" = ${sql.raw(slugifySql('at."tag"'))}
    WHERE at."tag" IS NOT NULL AND trim(at."tag") <> '';

    INSERT INTO "_artifacts_v_rels" ("order", "parent_id", "path", "tags_id")
    SELECT at."_order", at."_parent_id", 'tags', t."id"
    FROM "_artifacts_v_version_tags" at
    JOIN "tags" t
      ON t."slug" = ${sql.raw(slugifySql('at."tag"'))}
    WHERE at."tag" IS NOT NULL AND trim(at."tag") <> '';

    INSERT INTO "people_rels" ("order", "parent_id", "path", "tags_id")
    SELECT pt."_order", pt."_parent_id", 'tags', t."id"
    FROM "people_tags" pt
    JOIN "tags" t
      ON t."slug" = ${sql.raw(slugifySql('pt."tag"'))}
    WHERE pt."tag" IS NOT NULL AND trim(pt."tag") <> '';

    INSERT INTO "_people_v_rels" ("order", "parent_id", "path", "tags_id")
    SELECT pt."_order", pt."_parent_id", 'tags', t."id"
    FROM "_people_v_version_tags" pt
    JOIN "tags" t
      ON t."slug" = ${sql.raw(slugifySql('pt."tag"'))}
    WHERE pt."tag" IS NOT NULL AND trim(pt."tag") <> '';

    INSERT INTO "places_rels" ("order", "parent_id", "path", "tags_id")
    SELECT pt."_order", pt."_parent_id", 'tags', t."id"
    FROM "places_tags" pt
    JOIN "tags" t
      ON t."slug" = ${sql.raw(slugifySql('pt."tag"'))}
    WHERE pt."tag" IS NOT NULL AND trim(pt."tag") <> '';

    INSERT INTO "_places_v_rels" ("order", "parent_id", "path", "tags_id")
    SELECT pt."_order", pt."_parent_id", 'tags', t."id"
    FROM "_places_v_version_tags" pt
    JOIN "tags" t
      ON t."slug" = ${sql.raw(slugifySql('pt."tag"'))}
    WHERE pt."tag" IS NOT NULL AND trim(pt."tag") <> '';

    INSERT INTO "custom_items_rels" ("order", "parent_id", "path", "tags_id")
    SELECT ct."_order", ct."_parent_id", 'tags', t."id"
    FROM "custom_items_tags" ct
    JOIN "tags" t
      ON t."slug" = ${sql.raw(slugifySql('ct."tag"'))}
    WHERE ct."tag" IS NOT NULL AND trim(ct."tag") <> '';

    INSERT INTO "_custom_items_v_rels" ("order", "parent_id", "path", "tags_id")
    SELECT ct."_order", ct."_parent_id", 'tags', t."id"
    FROM "_custom_items_v_version_tags" ct
    JOIN "tags" t
      ON t."slug" = ${sql.raw(slugifySql('ct."tag"'))}
    WHERE ct."tag" IS NOT NULL AND trim(ct."tag") <> '';
  `)

  await db.execute(sql`
    DROP TABLE IF EXISTS "posts_tags";
    DROP TABLE IF EXISTS "_posts_v_version_tags";
    DROP TABLE IF EXISTS "artifacts_tags";
    DROP TABLE IF EXISTS "_artifacts_v_version_tags";
    DROP TABLE IF EXISTS "people_tags";
    DROP TABLE IF EXISTS "_people_v_version_tags";
    DROP TABLE IF EXISTS "places_tags";
    DROP TABLE IF EXISTS "_places_v_version_tags";
    DROP TABLE IF EXISTS "custom_items_tags";
    DROP TABLE IF EXISTS "_custom_items_v_version_tags";
  `)
}

export async function down({ db }: MigrateDownArgs): Promise<void> {
  await db.execute(sql`
    ALTER TABLE "posts_rels" DROP CONSTRAINT IF EXISTS "posts_rels_tags_fk";
    ALTER TABLE "_posts_v_rels" DROP CONSTRAINT IF EXISTS "_posts_v_rels_tags_fk";
    ALTER TABLE "artifacts_rels" DROP CONSTRAINT IF EXISTS "artifacts_rels_tags_fk";
    ALTER TABLE "_artifacts_v_rels" DROP CONSTRAINT IF EXISTS "_artifacts_v_rels_tags_fk";
    ALTER TABLE "people_rels" DROP CONSTRAINT IF EXISTS "people_rels_tags_fk";
    ALTER TABLE "_people_v_rels" DROP CONSTRAINT IF EXISTS "_people_v_rels_tags_fk";
    ALTER TABLE "places_rels" DROP CONSTRAINT IF EXISTS "places_rels_tags_fk";
    ALTER TABLE "_places_v_rels" DROP CONSTRAINT IF EXISTS "_places_v_rels_tags_fk";
    ALTER TABLE "custom_items_rels" DROP CONSTRAINT IF EXISTS "custom_items_rels_tags_fk";
    ALTER TABLE "_custom_items_v_rels" DROP CONSTRAINT IF EXISTS "_custom_items_v_rels_tags_fk";

    DROP INDEX IF EXISTS "posts_rels_tags_id_idx";
    DROP INDEX IF EXISTS "_posts_v_rels_tags_id_idx";
    DROP INDEX IF EXISTS "artifacts_rels_tags_id_idx";
    DROP INDEX IF EXISTS "_artifacts_v_rels_tags_id_idx";
    DROP INDEX IF EXISTS "people_rels_tags_id_idx";
    DROP INDEX IF EXISTS "_people_v_rels_tags_id_idx";
    DROP INDEX IF EXISTS "places_rels_tags_id_idx";
    DROP INDEX IF EXISTS "_places_v_rels_tags_id_idx";
    DROP INDEX IF EXISTS "custom_items_rels_tags_id_idx";
    DROP INDEX IF EXISTS "_custom_items_v_rels_tags_id_idx";

    ALTER TABLE "posts_rels" DROP COLUMN IF EXISTS "tags_id";
    ALTER TABLE "_posts_v_rels" DROP COLUMN IF EXISTS "tags_id";
    ALTER TABLE "artifacts_rels" DROP COLUMN IF EXISTS "tags_id";
    ALTER TABLE "_artifacts_v_rels" DROP COLUMN IF EXISTS "tags_id";
    ALTER TABLE "people_rels" DROP COLUMN IF EXISTS "tags_id";
    ALTER TABLE "_people_v_rels" DROP COLUMN IF EXISTS "tags_id";
    ALTER TABLE "places_rels" DROP COLUMN IF EXISTS "tags_id";
    ALTER TABLE "_places_v_rels" DROP COLUMN IF EXISTS "tags_id";
    ALTER TABLE "custom_items_rels" DROP COLUMN IF EXISTS "tags_id";
    ALTER TABLE "_custom_items_v_rels" DROP COLUMN IF EXISTS "tags_id";

    ALTER TABLE "categories" DROP COLUMN IF EXISTS "posts_count";

    DROP TABLE IF EXISTS "tags";
  `)
}
