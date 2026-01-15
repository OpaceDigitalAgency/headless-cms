import { MigrateUpArgs, MigrateDownArgs, sql } from '@payloadcms/db-postgres'

export async function up({ db, payload, req }: MigrateUpArgs): Promise<void> {
  await db.execute(sql`
   ALTER TABLE "content_types" ADD COLUMN "meta_title" varchar;
  ALTER TABLE "content_types" ADD COLUMN "meta_description" varchar;
  ALTER TABLE "content_types" ADD COLUMN "meta_image_id" integer;
  ALTER TABLE "search_rels" ADD COLUMN "content_types_id" integer;
  ALTER TABLE "content_types" ADD CONSTRAINT "content_types_meta_image_id_media_id_fk" FOREIGN KEY ("meta_image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "search_rels" ADD CONSTRAINT "search_rels_content_types_fk" FOREIGN KEY ("content_types_id") REFERENCES "public"."content_types"("id") ON DELETE cascade ON UPDATE no action;
  CREATE INDEX "content_types_meta_meta_image_idx" ON "content_types" USING btree ("meta_image_id");
  CREATE INDEX "search_rels_content_types_id_idx" ON "search_rels" USING btree ("content_types_id");`)
}

export async function down({ db, payload, req }: MigrateDownArgs): Promise<void> {
  await db.execute(sql`
   ALTER TABLE "content_types" DROP CONSTRAINT "content_types_meta_image_id_media_id_fk";
  
  ALTER TABLE "search_rels" DROP CONSTRAINT "search_rels_content_types_fk";
  
  DROP INDEX "content_types_meta_meta_image_idx";
  DROP INDEX "search_rels_content_types_id_idx";
  ALTER TABLE "content_types" DROP COLUMN "meta_title";
  ALTER TABLE "content_types" DROP COLUMN "meta_description";
  ALTER TABLE "content_types" DROP COLUMN "meta_image_id";
  ALTER TABLE "search_rels" DROP COLUMN "content_types_id";`)
}
