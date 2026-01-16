/// <reference path="../.astro/types.d.ts" />
/// <reference types="astro/client" />

interface ImportMetaEnv {
  readonly PUBLIC_SITE_URL: string;
  readonly PUBLIC_CMS_URL: string;
  readonly DATABASE_URI: string;
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}
