import { MigrateUpArgs, MigrateDownArgs, sql } from '@payloadcms/db-postgres'

export async function up({ db, payload, req }: MigrateUpArgs): Promise<void> {
  await db.execute(sql`
   CREATE TYPE "public"."enum_pages_blocks_contact_form_variant" AS ENUM('modern', 'classic', 'minimal');
  CREATE TYPE "public"."enum_pages_blocks_social_links_custom_links_platform" AS ENUM('facebook', 'twitter', 'instagram', 'linkedin', 'youtube', 'tiktok', 'github', 'discord');
  CREATE TYPE "public"."enum_pages_blocks_social_links_variant" AS ENUM('horizontal', 'grid', 'large');
  CREATE TYPE "public"."enum__pages_v_blocks_contact_form_variant" AS ENUM('modern', 'classic', 'minimal');
  CREATE TYPE "public"."enum__pages_v_blocks_social_links_custom_links_platform" AS ENUM('facebook', 'twitter', 'instagram', 'linkedin', 'youtube', 'tiktok', 'github', 'discord');
  CREATE TYPE "public"."enum__pages_v_blocks_social_links_variant" AS ENUM('horizontal', 'grid', 'large');
  CREATE TYPE "public"."enum_global_blocks_blocks_hero_links_variant" AS ENUM('primary', 'secondary', 'outline');
  CREATE TYPE "public"."enum_global_blocks_blocks_hero_variant" AS ENUM('standard', 'minimal', 'fullscreen', 'split', 'video', 'hero-led');
  CREATE TYPE "public"."enum_global_blocks_blocks_hero_overlay" AS ENUM('none', 'light', 'dark', 'gradient');
  CREATE TYPE "public"."enum_global_blocks_blocks_hero_text_align" AS ENUM('left', 'center', 'right');
  CREATE TYPE "public"."enum_global_blocks_blocks_content_columns_size" AS ENUM('oneThird', 'half', 'twoThirds', 'full');
  CREATE TYPE "public"."enum_global_blocks_blocks_content_background_color" AS ENUM('none', 'muted', 'dark', 'accent');
  CREATE TYPE "public"."enum_global_blocks_blocks_content_padding_top" AS ENUM('none', 'small', 'medium', 'large');
  CREATE TYPE "public"."enum_global_blocks_blocks_content_padding_bottom" AS ENUM('none', 'small', 'medium', 'large');
  CREATE TYPE "public"."enum_global_blocks_blocks_media_size" AS ENUM('small', 'default', 'large', 'fullWidth');
  CREATE TYPE "public"."enum_global_blocks_blocks_media_position" AS ENUM('left', 'center', 'right');
  CREATE TYPE "public"."enum_global_blocks_blocks_cta_links_variant" AS ENUM('primary', 'secondary', 'outline');
  CREATE TYPE "public"."enum_global_blocks_blocks_cta_variant" AS ENUM('standard', 'banner', 'card', 'inline');
  CREATE TYPE "public"."enum_global_blocks_blocks_cta_background_color" AS ENUM('none', 'muted', 'dark', 'accent');
  CREATE TYPE "public"."enum_global_blocks_blocks_archive_populate_by" AS ENUM('collection', 'selection');
  CREATE TYPE "public"."enum_global_blocks_blocks_archive_relation_to" AS ENUM('posts', 'pages', 'categories', 'tags');
  CREATE TYPE "public"."enum_global_blocks_blocks_archive_variant" AS ENUM('grid', 'list', 'cards', 'carousel');
  CREATE TYPE "public"."enum_global_blocks_blocks_archive_columns" AS ENUM('2', '3', '4');
  CREATE TYPE "public"."enum_global_blocks_blocks_form_variant" AS ENUM('default', 'card', 'inline', 'fullWidth');
  CREATE TYPE "public"."enum_global_blocks_blocks_form_background_color" AS ENUM('none', 'muted', 'dark');
  CREATE TYPE "public"."enum_global_blocks_blocks_quote_align" AS ENUM('left', 'center', 'right');
  CREATE TYPE "public"."enum_global_blocks_blocks_quote_variant" AS ENUM('simple', 'card', 'large');
  CREATE TYPE "public"."enum_global_blocks_blocks_features_variant" AS ENUM('grid', 'list');
  CREATE TYPE "public"."enum_global_blocks_blocks_stats_variant" AS ENUM('grid', 'list', 'cards');
  CREATE TYPE "public"."enum_global_blocks_blocks_logo_cloud_variant" AS ENUM('grid', 'ticker');
  CREATE TYPE "public"."enum_global_blocks_blocks_testimonials_variant" AS ENUM('standard', 'grid', 'cards');
  CREATE TYPE "public"."enum_global_blocks_blocks_faq_variant" AS ENUM('accordion', 'grid', 'list');
  CREATE TYPE "public"."enum_global_blocks_blocks_pricing_plans_links_variant" AS ENUM('primary', 'secondary', 'outline');
  CREATE TYPE "public"."enum_global_blocks_blocks_pricing_variant" AS ENUM('cards', 'table', 'comparison');
  CREATE TYPE "public"."enum_global_blocks_blocks_team_variant" AS ENUM('grid', 'list', 'cards');
  CREATE TYPE "public"."enum_global_blocks_blocks_embed_aspect_ratio" AS ENUM('16:9', '4:3', '1:1', '21:9');
  CREATE TYPE "public"."enum_global_blocks_blocks_spacer_style" AS ENUM('space', 'divider');
  CREATE TYPE "public"."enum_global_blocks_blocks_spacer_size" AS ENUM('xs', 'sm', 'md', 'lg', 'xl');
  CREATE TYPE "public"."enum_global_blocks_blocks_spacer_line_style" AS ENUM('solid', 'dashed', 'dotted');
  CREATE TYPE "public"."enum_global_blocks_blocks_gallery_variant" AS ENUM('grid', 'masonry', 'carousel', 'lightbox', 'slider');
  CREATE TYPE "public"."enum_global_blocks_blocks_gallery_columns" AS ENUM('2', '3', '4', '5', '6');
  CREATE TYPE "public"."enum_global_blocks_blocks_gallery_gap" AS ENUM('none', 'small', 'medium', 'large');
  CREATE TYPE "public"."enum_global_blocks_blocks_gallery_aspect_ratio" AS ENUM('auto', 'square', 'landscape', 'portrait', 'wide');
  CREATE TYPE "public"."enum_global_blocks_blocks_grid_variant" AS ENUM('cards', 'features', 'icons', 'stats', 'team', 'testimonials', 'logos');
  CREATE TYPE "public"."enum_global_blocks_blocks_grid_columns" AS ENUM('1', '2', '3', '4', '5', '6');
  CREATE TYPE "public"."enum_global_blocks_blocks_grid_gap" AS ENUM('none', 'small', 'medium', 'large');
  CREATE TYPE "public"."enum_global_blocks_blocks_grid_alignment" AS ENUM('left', 'center', 'right');
  CREATE TYPE "public"."enum_global_blocks_blocks_grid_hover_effect" AS ENUM('none', 'lift', 'scale', 'glow');
  CREATE TYPE "public"."enum_global_blocks_blocks_timeline_variant" AS ENUM('vertical', 'alternating', 'horizontal', 'compact');
  CREATE TYPE "public"."enum_global_blocks_blocks_timeline_line_style" AS ENUM('solid', 'dashed', 'dotted', 'gradient');
  CREATE TYPE "public"."enum_global_blocks_blocks_timeline_marker_style" AS ENUM('circle', 'diamond', 'square', 'icon', 'number', 'image');
  CREATE TYPE "public"."enum_global_blocks_blocks_timeline_sort_order" AS ENUM('chronological', 'reverse', 'manual');
  CREATE TYPE "public"."enum_global_blocks_blocks_timeline_background_color" AS ENUM('transparent', 'muted', 'dark', 'accent');
  CREATE TYPE "public"."enum_block_library_block_type" AS ENUM('hero', 'cta', 'features', 'content', 'logoCloud', 'faq', 'testimonials', 'grid', 'videoFeature', 'html', 'archive', 'form', 'embed', 'pricing', 'quote', 'stats', 'team', 'timeline', 'gallery', 'spacer', 'media');
  CREATE TYPE "public"."enum_block_template_builder_blocks_hero_links_variant" AS ENUM('primary', 'secondary', 'outline');
  CREATE TYPE "public"."enum_block_template_builder_blocks_hero_variant" AS ENUM('standard', 'minimal', 'fullscreen', 'split', 'video', 'hero-led');
  CREATE TYPE "public"."enum_block_template_builder_blocks_hero_overlay" AS ENUM('none', 'light', 'dark', 'gradient');
  CREATE TYPE "public"."enum_block_template_builder_blocks_hero_text_align" AS ENUM('left', 'center', 'right');
  CREATE TYPE "public"."enum_block_template_builder_blocks_content_columns_size" AS ENUM('oneThird', 'half', 'twoThirds', 'full');
  CREATE TYPE "public"."enum_block_template_builder_blocks_content_background_color" AS ENUM('none', 'muted', 'dark', 'accent');
  CREATE TYPE "public"."enum_block_template_builder_blocks_content_padding_top" AS ENUM('none', 'small', 'medium', 'large');
  CREATE TYPE "public"."enum_block_template_builder_blocks_content_padding_bottom" AS ENUM('none', 'small', 'medium', 'large');
  CREATE TYPE "public"."enum_block_template_builder_blocks_media_size" AS ENUM('small', 'default', 'large', 'fullWidth');
  CREATE TYPE "public"."enum_block_template_builder_blocks_media_position" AS ENUM('left', 'center', 'right');
  CREATE TYPE "public"."enum_block_template_builder_blocks_cta_links_variant" AS ENUM('primary', 'secondary', 'outline');
  CREATE TYPE "public"."enum_block_template_builder_blocks_cta_variant" AS ENUM('standard', 'banner', 'card', 'inline');
  CREATE TYPE "public"."enum_block_template_builder_blocks_cta_background_color" AS ENUM('none', 'muted', 'dark', 'accent');
  CREATE TYPE "public"."enum_block_template_builder_blocks_archive_populate_by" AS ENUM('collection', 'selection');
  CREATE TYPE "public"."enum_block_template_builder_blocks_archive_relation_to" AS ENUM('posts', 'pages', 'categories', 'tags');
  CREATE TYPE "public"."enum_block_template_builder_blocks_archive_variant" AS ENUM('grid', 'list', 'cards', 'carousel');
  CREATE TYPE "public"."enum_block_template_builder_blocks_archive_columns" AS ENUM('2', '3', '4');
  CREATE TYPE "public"."enum_block_template_builder_blocks_form_variant" AS ENUM('default', 'card', 'inline', 'fullWidth');
  CREATE TYPE "public"."enum_block_template_builder_blocks_form_background_color" AS ENUM('none', 'muted', 'dark');
  CREATE TYPE "public"."enum_block_template_builder_blocks_quote_align" AS ENUM('left', 'center', 'right');
  CREATE TYPE "public"."enum_block_template_builder_blocks_quote_variant" AS ENUM('simple', 'card', 'large');
  CREATE TYPE "public"."enum_block_template_builder_blocks_features_variant" AS ENUM('grid', 'list');
  CREATE TYPE "public"."enum_block_template_builder_blocks_stats_variant" AS ENUM('grid', 'list', 'cards');
  CREATE TYPE "public"."enum_block_template_builder_blocks_logo_cloud_variant" AS ENUM('grid', 'ticker');
  CREATE TYPE "public"."enum_block_template_builder_blocks_testimonials_variant" AS ENUM('standard', 'grid', 'cards');
  CREATE TYPE "public"."enum_block_template_builder_blocks_faq_variant" AS ENUM('accordion', 'grid', 'list');
  CREATE TYPE "public"."enum_block_template_builder_blocks_pricing_plans_links_variant" AS ENUM('primary', 'secondary', 'outline');
  CREATE TYPE "public"."enum_block_template_builder_blocks_pricing_variant" AS ENUM('cards', 'table', 'comparison');
  CREATE TYPE "public"."enum_block_template_builder_blocks_team_variant" AS ENUM('grid', 'list', 'cards');
  CREATE TYPE "public"."enum_block_template_builder_blocks_embed_aspect_ratio" AS ENUM('16:9', '4:3', '1:1', '21:9');
  CREATE TYPE "public"."enum_block_template_builder_blocks_spacer_style" AS ENUM('space', 'divider');
  CREATE TYPE "public"."enum_block_template_builder_blocks_spacer_size" AS ENUM('xs', 'sm', 'md', 'lg', 'xl');
  CREATE TYPE "public"."enum_block_template_builder_blocks_spacer_line_style" AS ENUM('solid', 'dashed', 'dotted');
  CREATE TYPE "public"."enum_block_template_builder_blocks_gallery_variant" AS ENUM('grid', 'masonry', 'carousel', 'lightbox', 'slider');
  CREATE TYPE "public"."enum_block_template_builder_blocks_gallery_columns" AS ENUM('2', '3', '4', '5', '6');
  CREATE TYPE "public"."enum_block_template_builder_blocks_gallery_gap" AS ENUM('none', 'small', 'medium', 'large');
  CREATE TYPE "public"."enum_block_template_builder_blocks_gallery_aspect_ratio" AS ENUM('auto', 'square', 'landscape', 'portrait', 'wide');
  CREATE TYPE "public"."enum_block_template_builder_blocks_grid_variant" AS ENUM('cards', 'features', 'icons', 'stats', 'team', 'testimonials', 'logos');
  CREATE TYPE "public"."enum_block_template_builder_blocks_grid_columns" AS ENUM('1', '2', '3', '4', '5', '6');
  CREATE TYPE "public"."enum_block_template_builder_blocks_grid_gap" AS ENUM('none', 'small', 'medium', 'large');
  CREATE TYPE "public"."enum_block_template_builder_blocks_grid_alignment" AS ENUM('left', 'center', 'right');
  CREATE TYPE "public"."enum_block_template_builder_blocks_grid_hover_effect" AS ENUM('none', 'lift', 'scale', 'glow');
  CREATE TYPE "public"."enum_block_template_builder_blocks_timeline_variant" AS ENUM('vertical', 'alternating', 'horizontal', 'compact');
  CREATE TYPE "public"."enum_block_template_builder_blocks_timeline_line_style" AS ENUM('solid', 'dashed', 'dotted', 'gradient');
  CREATE TYPE "public"."enum_block_template_builder_blocks_timeline_marker_style" AS ENUM('circle', 'diamond', 'square', 'icon', 'number', 'image');
  CREATE TYPE "public"."enum_block_template_builder_blocks_timeline_sort_order" AS ENUM('chronological', 'reverse', 'manual');
  CREATE TYPE "public"."enum_block_template_builder_blocks_timeline_background_color" AS ENUM('transparent', 'muted', 'dark', 'accent');
  CREATE TYPE "public"."enum_content_types_custom_fields_type" AS ENUM('text', 'textarea', 'number', 'date', 'checkbox', 'select', 'url', 'email');
  CREATE TYPE "public"."enum_content_types_icon" AS ENUM('box', 'product', 'archive', 'shopping-bag', 'person', 'location', 'event', 'document', 'archive-item', 'image', 'settings', 'users');
  CREATE TYPE "public"."enum_content_types_template" AS ENUM('archive-item', 'product', 'person', 'place', 'event', 'article');
  CREATE TYPE "public"."enum_custom_items_blocks_hero_links_variant" AS ENUM('primary', 'secondary', 'outline');
  CREATE TYPE "public"."enum_custom_items_blocks_hero_variant" AS ENUM('standard', 'minimal', 'fullscreen', 'split', 'video', 'hero-led');
  CREATE TYPE "public"."enum_custom_items_blocks_hero_overlay" AS ENUM('none', 'light', 'dark', 'gradient');
  CREATE TYPE "public"."enum_custom_items_blocks_hero_text_align" AS ENUM('left', 'center', 'right');
  CREATE TYPE "public"."enum_custom_items_blocks_content_columns_size" AS ENUM('oneThird', 'half', 'twoThirds', 'full');
  CREATE TYPE "public"."enum_custom_items_blocks_content_background_color" AS ENUM('none', 'muted', 'dark', 'accent');
  CREATE TYPE "public"."enum_custom_items_blocks_content_padding_top" AS ENUM('none', 'small', 'medium', 'large');
  CREATE TYPE "public"."enum_custom_items_blocks_content_padding_bottom" AS ENUM('none', 'small', 'medium', 'large');
  CREATE TYPE "public"."enum_custom_items_blocks_media_size" AS ENUM('small', 'default', 'large', 'fullWidth');
  CREATE TYPE "public"."enum_custom_items_blocks_media_position" AS ENUM('left', 'center', 'right');
  CREATE TYPE "public"."enum_custom_items_blocks_cta_links_variant" AS ENUM('primary', 'secondary', 'outline');
  CREATE TYPE "public"."enum_custom_items_blocks_cta_variant" AS ENUM('standard', 'banner', 'card', 'inline');
  CREATE TYPE "public"."enum_custom_items_blocks_cta_background_color" AS ENUM('none', 'muted', 'dark', 'accent');
  CREATE TYPE "public"."enum_custom_items_blocks_quote_align" AS ENUM('left', 'center', 'right');
  CREATE TYPE "public"."enum_custom_items_blocks_quote_variant" AS ENUM('simple', 'card', 'large');
  CREATE TYPE "public"."enum_custom_items_blocks_features_variant" AS ENUM('grid', 'list');
  CREATE TYPE "public"."enum_custom_items_blocks_stats_variant" AS ENUM('grid', 'list', 'cards');
  CREATE TYPE "public"."enum_custom_items_blocks_logo_cloud_variant" AS ENUM('grid', 'ticker');
  CREATE TYPE "public"."enum_custom_items_blocks_testimonials_variant" AS ENUM('standard', 'grid', 'cards');
  CREATE TYPE "public"."enum_custom_items_blocks_faq_variant" AS ENUM('accordion', 'grid', 'list');
  CREATE TYPE "public"."enum_custom_items_blocks_pricing_plans_links_variant" AS ENUM('primary', 'secondary', 'outline');
  CREATE TYPE "public"."enum_custom_items_blocks_pricing_variant" AS ENUM('cards', 'table', 'comparison');
  CREATE TYPE "public"."enum_custom_items_blocks_team_variant" AS ENUM('grid', 'list', 'cards');
  CREATE TYPE "public"."enum_custom_items_blocks_embed_aspect_ratio" AS ENUM('16:9', '4:3', '1:1', '21:9');
  CREATE TYPE "public"."enum_custom_items_blocks_gallery_variant" AS ENUM('grid', 'masonry', 'carousel', 'lightbox', 'slider');
  CREATE TYPE "public"."enum_custom_items_blocks_gallery_columns" AS ENUM('2', '3', '4', '5', '6');
  CREATE TYPE "public"."enum_custom_items_blocks_gallery_gap" AS ENUM('none', 'small', 'medium', 'large');
  CREATE TYPE "public"."enum_custom_items_blocks_gallery_aspect_ratio" AS ENUM('auto', 'square', 'landscape', 'portrait', 'wide');
  CREATE TYPE "public"."enum_custom_items_blocks_grid_variant" AS ENUM('cards', 'features', 'icons', 'stats', 'team', 'testimonials', 'logos');
  CREATE TYPE "public"."enum_custom_items_blocks_grid_columns" AS ENUM('1', '2', '3', '4', '5', '6');
  CREATE TYPE "public"."enum_custom_items_blocks_grid_gap" AS ENUM('none', 'small', 'medium', 'large');
  CREATE TYPE "public"."enum_custom_items_blocks_grid_alignment" AS ENUM('left', 'center', 'right');
  CREATE TYPE "public"."enum_custom_items_blocks_grid_hover_effect" AS ENUM('none', 'lift', 'scale', 'glow');
  CREATE TYPE "public"."enum_custom_items_blocks_timeline_variant" AS ENUM('vertical', 'alternating', 'horizontal', 'compact');
  CREATE TYPE "public"."enum_custom_items_blocks_timeline_line_style" AS ENUM('solid', 'dashed', 'dotted', 'gradient');
  CREATE TYPE "public"."enum_custom_items_blocks_timeline_marker_style" AS ENUM('circle', 'diamond', 'square', 'icon', 'number', 'image');
  CREATE TYPE "public"."enum_custom_items_blocks_timeline_sort_order" AS ENUM('chronological', 'reverse', 'manual');
  CREATE TYPE "public"."enum_custom_items_blocks_timeline_background_color" AS ENUM('transparent', 'muted', 'dark', 'accent');
  CREATE TYPE "public"."enum_custom_items_blocks_archive_populate_by" AS ENUM('collection', 'selection');
  CREATE TYPE "public"."enum_custom_items_blocks_archive_relation_to" AS ENUM('posts', 'pages', 'categories', 'tags');
  CREATE TYPE "public"."enum_custom_items_blocks_archive_variant" AS ENUM('grid', 'list', 'cards', 'carousel');
  CREATE TYPE "public"."enum_custom_items_blocks_archive_columns" AS ENUM('2', '3', '4');
  CREATE TYPE "public"."enum_custom_items_blocks_form_variant" AS ENUM('default', 'card', 'inline', 'fullWidth');
  CREATE TYPE "public"."enum_custom_items_blocks_form_background_color" AS ENUM('none', 'muted', 'dark');
  CREATE TYPE "public"."enum_custom_items_blocks_spacer_style" AS ENUM('space', 'divider');
  CREATE TYPE "public"."enum_custom_items_blocks_spacer_size" AS ENUM('xs', 'sm', 'md', 'lg', 'xl');
  CREATE TYPE "public"."enum_custom_items_blocks_spacer_line_style" AS ENUM('solid', 'dashed', 'dotted');
  CREATE TYPE "public"."enum_custom_items_status" AS ENUM('draft', 'published');
  CREATE TYPE "public"."enum__custom_items_v_blocks_hero_links_variant" AS ENUM('primary', 'secondary', 'outline');
  CREATE TYPE "public"."enum__custom_items_v_blocks_hero_variant" AS ENUM('standard', 'minimal', 'fullscreen', 'split', 'video', 'hero-led');
  CREATE TYPE "public"."enum__custom_items_v_blocks_hero_overlay" AS ENUM('none', 'light', 'dark', 'gradient');
  CREATE TYPE "public"."enum__custom_items_v_blocks_hero_text_align" AS ENUM('left', 'center', 'right');
  CREATE TYPE "public"."enum__custom_items_v_blocks_content_columns_size" AS ENUM('oneThird', 'half', 'twoThirds', 'full');
  CREATE TYPE "public"."enum__custom_items_v_blocks_content_background_color" AS ENUM('none', 'muted', 'dark', 'accent');
  CREATE TYPE "public"."enum__custom_items_v_blocks_content_padding_top" AS ENUM('none', 'small', 'medium', 'large');
  CREATE TYPE "public"."enum__custom_items_v_blocks_content_padding_bottom" AS ENUM('none', 'small', 'medium', 'large');
  CREATE TYPE "public"."enum__custom_items_v_blocks_media_size" AS ENUM('small', 'default', 'large', 'fullWidth');
  CREATE TYPE "public"."enum__custom_items_v_blocks_media_position" AS ENUM('left', 'center', 'right');
  CREATE TYPE "public"."enum__custom_items_v_blocks_cta_links_variant" AS ENUM('primary', 'secondary', 'outline');
  CREATE TYPE "public"."enum__custom_items_v_blocks_cta_variant" AS ENUM('standard', 'banner', 'card', 'inline');
  CREATE TYPE "public"."enum__custom_items_v_blocks_cta_background_color" AS ENUM('none', 'muted', 'dark', 'accent');
  CREATE TYPE "public"."enum__custom_items_v_blocks_quote_align" AS ENUM('left', 'center', 'right');
  CREATE TYPE "public"."enum__custom_items_v_blocks_quote_variant" AS ENUM('simple', 'card', 'large');
  CREATE TYPE "public"."enum__custom_items_v_blocks_features_variant" AS ENUM('grid', 'list');
  CREATE TYPE "public"."enum__custom_items_v_blocks_stats_variant" AS ENUM('grid', 'list', 'cards');
  CREATE TYPE "public"."enum__custom_items_v_blocks_logo_cloud_variant" AS ENUM('grid', 'ticker');
  CREATE TYPE "public"."enum__custom_items_v_blocks_testimonials_variant" AS ENUM('standard', 'grid', 'cards');
  CREATE TYPE "public"."enum__custom_items_v_blocks_faq_variant" AS ENUM('accordion', 'grid', 'list');
  CREATE TYPE "public"."enum__custom_items_v_blocks_pricing_plans_links_variant" AS ENUM('primary', 'secondary', 'outline');
  CREATE TYPE "public"."enum__custom_items_v_blocks_pricing_variant" AS ENUM('cards', 'table', 'comparison');
  CREATE TYPE "public"."enum__custom_items_v_blocks_team_variant" AS ENUM('grid', 'list', 'cards');
  CREATE TYPE "public"."enum__custom_items_v_blocks_embed_aspect_ratio" AS ENUM('16:9', '4:3', '1:1', '21:9');
  CREATE TYPE "public"."enum__custom_items_v_blocks_gallery_variant" AS ENUM('grid', 'masonry', 'carousel', 'lightbox', 'slider');
  CREATE TYPE "public"."enum__custom_items_v_blocks_gallery_columns" AS ENUM('2', '3', '4', '5', '6');
  CREATE TYPE "public"."enum__custom_items_v_blocks_gallery_gap" AS ENUM('none', 'small', 'medium', 'large');
  CREATE TYPE "public"."enum__custom_items_v_blocks_gallery_aspect_ratio" AS ENUM('auto', 'square', 'landscape', 'portrait', 'wide');
  CREATE TYPE "public"."enum__custom_items_v_blocks_grid_variant" AS ENUM('cards', 'features', 'icons', 'stats', 'team', 'testimonials', 'logos');
  CREATE TYPE "public"."enum__custom_items_v_blocks_grid_columns" AS ENUM('1', '2', '3', '4', '5', '6');
  CREATE TYPE "public"."enum__custom_items_v_blocks_grid_gap" AS ENUM('none', 'small', 'medium', 'large');
  CREATE TYPE "public"."enum__custom_items_v_blocks_grid_alignment" AS ENUM('left', 'center', 'right');
  CREATE TYPE "public"."enum__custom_items_v_blocks_grid_hover_effect" AS ENUM('none', 'lift', 'scale', 'glow');
  CREATE TYPE "public"."enum__custom_items_v_blocks_timeline_variant" AS ENUM('vertical', 'alternating', 'horizontal', 'compact');
  CREATE TYPE "public"."enum__custom_items_v_blocks_timeline_line_style" AS ENUM('solid', 'dashed', 'dotted', 'gradient');
  CREATE TYPE "public"."enum__custom_items_v_blocks_timeline_marker_style" AS ENUM('circle', 'diamond', 'square', 'icon', 'number', 'image');
  CREATE TYPE "public"."enum__custom_items_v_blocks_timeline_sort_order" AS ENUM('chronological', 'reverse', 'manual');
  CREATE TYPE "public"."enum__custom_items_v_blocks_timeline_background_color" AS ENUM('transparent', 'muted', 'dark', 'accent');
  CREATE TYPE "public"."enum__custom_items_v_blocks_archive_populate_by" AS ENUM('collection', 'selection');
  CREATE TYPE "public"."enum__custom_items_v_blocks_archive_relation_to" AS ENUM('posts', 'pages', 'categories', 'tags');
  CREATE TYPE "public"."enum__custom_items_v_blocks_archive_variant" AS ENUM('grid', 'list', 'cards', 'carousel');
  CREATE TYPE "public"."enum__custom_items_v_blocks_archive_columns" AS ENUM('2', '3', '4');
  CREATE TYPE "public"."enum__custom_items_v_blocks_form_variant" AS ENUM('default', 'card', 'inline', 'fullWidth');
  CREATE TYPE "public"."enum__custom_items_v_blocks_form_background_color" AS ENUM('none', 'muted', 'dark');
  CREATE TYPE "public"."enum__custom_items_v_blocks_spacer_style" AS ENUM('space', 'divider');
  CREATE TYPE "public"."enum__custom_items_v_blocks_spacer_size" AS ENUM('xs', 'sm', 'md', 'lg', 'xl');
  CREATE TYPE "public"."enum__custom_items_v_blocks_spacer_line_style" AS ENUM('solid', 'dashed', 'dotted');
  CREATE TYPE "public"."enum__custom_items_v_version_status" AS ENUM('draft', 'published');
  CREATE TYPE "public"."enum_archive_items_blocks_hero_links_variant" AS ENUM('primary', 'secondary', 'outline');
  CREATE TYPE "public"."enum_archive_items_blocks_hero_variant" AS ENUM('standard', 'minimal', 'fullscreen', 'split', 'video', 'hero-led');
  CREATE TYPE "public"."enum_archive_items_blocks_hero_overlay" AS ENUM('none', 'light', 'dark', 'gradient');
  CREATE TYPE "public"."enum_archive_items_blocks_hero_text_align" AS ENUM('left', 'center', 'right');
  CREATE TYPE "public"."enum_archive_items_blocks_content_columns_size" AS ENUM('oneThird', 'half', 'twoThirds', 'full');
  CREATE TYPE "public"."enum_archive_items_blocks_content_background_color" AS ENUM('none', 'muted', 'dark', 'accent');
  CREATE TYPE "public"."enum_archive_items_blocks_content_padding_top" AS ENUM('none', 'small', 'medium', 'large');
  CREATE TYPE "public"."enum_archive_items_blocks_content_padding_bottom" AS ENUM('none', 'small', 'medium', 'large');
  CREATE TYPE "public"."enum_archive_items_blocks_media_size" AS ENUM('small', 'default', 'large', 'fullWidth');
  CREATE TYPE "public"."enum_archive_items_blocks_media_position" AS ENUM('left', 'center', 'right');
  CREATE TYPE "public"."enum_archive_items_blocks_cta_links_variant" AS ENUM('primary', 'secondary', 'outline');
  CREATE TYPE "public"."enum_archive_items_blocks_cta_variant" AS ENUM('standard', 'banner', 'card', 'inline');
  CREATE TYPE "public"."enum_archive_items_blocks_cta_background_color" AS ENUM('none', 'muted', 'dark', 'accent');
  CREATE TYPE "public"."enum_archive_items_blocks_archive_populate_by" AS ENUM('collection', 'selection');
  CREATE TYPE "public"."enum_archive_items_blocks_archive_relation_to" AS ENUM('posts', 'pages', 'categories', 'tags');
  CREATE TYPE "public"."enum_archive_items_blocks_archive_variant" AS ENUM('grid', 'list', 'cards', 'carousel');
  CREATE TYPE "public"."enum_archive_items_blocks_archive_columns" AS ENUM('2', '3', '4');
  CREATE TYPE "public"."enum_archive_items_blocks_form_variant" AS ENUM('default', 'card', 'inline', 'fullWidth');
  CREATE TYPE "public"."enum_archive_items_blocks_form_background_color" AS ENUM('none', 'muted', 'dark');
  CREATE TYPE "public"."enum_archive_items_blocks_gallery_variant" AS ENUM('grid', 'masonry', 'carousel', 'lightbox', 'slider');
  CREATE TYPE "public"."enum_archive_items_blocks_gallery_columns" AS ENUM('2', '3', '4', '5', '6');
  CREATE TYPE "public"."enum_archive_items_blocks_gallery_gap" AS ENUM('none', 'small', 'medium', 'large');
  CREATE TYPE "public"."enum_archive_items_blocks_gallery_aspect_ratio" AS ENUM('auto', 'square', 'landscape', 'portrait', 'wide');
  CREATE TYPE "public"."enum_archive_items_blocks_grid_variant" AS ENUM('cards', 'features', 'icons', 'stats', 'team', 'testimonials', 'logos');
  CREATE TYPE "public"."enum_archive_items_blocks_grid_columns" AS ENUM('1', '2', '3', '4', '5', '6');
  CREATE TYPE "public"."enum_archive_items_blocks_grid_gap" AS ENUM('none', 'small', 'medium', 'large');
  CREATE TYPE "public"."enum_archive_items_blocks_grid_alignment" AS ENUM('left', 'center', 'right');
  CREATE TYPE "public"."enum_archive_items_blocks_grid_hover_effect" AS ENUM('none', 'lift', 'scale', 'glow');
  CREATE TYPE "public"."enum_archive_items_blocks_timeline_variant" AS ENUM('vertical', 'alternating', 'horizontal', 'compact');
  CREATE TYPE "public"."enum_archive_items_blocks_timeline_line_style" AS ENUM('solid', 'dashed', 'dotted', 'gradient');
  CREATE TYPE "public"."enum_archive_items_blocks_timeline_marker_style" AS ENUM('circle', 'diamond', 'square', 'icon', 'number', 'image');
  CREATE TYPE "public"."enum_archive_items_blocks_timeline_sort_order" AS ENUM('chronological', 'reverse', 'manual');
  CREATE TYPE "public"."enum_archive_items_blocks_timeline_background_color" AS ENUM('transparent', 'muted', 'dark', 'accent');
  CREATE TYPE "public"."enum_archive_items_template" AS ENUM('detail', 'gallery', 'timeline');
  CREATE TYPE "public"."enum_archive_items_status" AS ENUM('draft', 'published');
  CREATE TYPE "public"."enum__archive_items_v_blocks_hero_links_variant" AS ENUM('primary', 'secondary', 'outline');
  CREATE TYPE "public"."enum__archive_items_v_blocks_hero_variant" AS ENUM('standard', 'minimal', 'fullscreen', 'split', 'video', 'hero-led');
  CREATE TYPE "public"."enum__archive_items_v_blocks_hero_overlay" AS ENUM('none', 'light', 'dark', 'gradient');
  CREATE TYPE "public"."enum__archive_items_v_blocks_hero_text_align" AS ENUM('left', 'center', 'right');
  CREATE TYPE "public"."enum__archive_items_v_blocks_content_columns_size" AS ENUM('oneThird', 'half', 'twoThirds', 'full');
  CREATE TYPE "public"."enum__archive_items_v_blocks_content_background_color" AS ENUM('none', 'muted', 'dark', 'accent');
  CREATE TYPE "public"."enum__archive_items_v_blocks_content_padding_top" AS ENUM('none', 'small', 'medium', 'large');
  CREATE TYPE "public"."enum__archive_items_v_blocks_content_padding_bottom" AS ENUM('none', 'small', 'medium', 'large');
  CREATE TYPE "public"."enum__archive_items_v_blocks_media_size" AS ENUM('small', 'default', 'large', 'fullWidth');
  CREATE TYPE "public"."enum__archive_items_v_blocks_media_position" AS ENUM('left', 'center', 'right');
  CREATE TYPE "public"."enum__archive_items_v_blocks_cta_links_variant" AS ENUM('primary', 'secondary', 'outline');
  CREATE TYPE "public"."enum__archive_items_v_blocks_cta_variant" AS ENUM('standard', 'banner', 'card', 'inline');
  CREATE TYPE "public"."enum__archive_items_v_blocks_cta_background_color" AS ENUM('none', 'muted', 'dark', 'accent');
  CREATE TYPE "public"."enum__archive_items_v_blocks_archive_populate_by" AS ENUM('collection', 'selection');
  CREATE TYPE "public"."enum__archive_items_v_blocks_archive_relation_to" AS ENUM('posts', 'pages', 'categories', 'tags');
  CREATE TYPE "public"."enum__archive_items_v_blocks_archive_variant" AS ENUM('grid', 'list', 'cards', 'carousel');
  CREATE TYPE "public"."enum__archive_items_v_blocks_archive_columns" AS ENUM('2', '3', '4');
  CREATE TYPE "public"."enum__archive_items_v_blocks_form_variant" AS ENUM('default', 'card', 'inline', 'fullWidth');
  CREATE TYPE "public"."enum__archive_items_v_blocks_form_background_color" AS ENUM('none', 'muted', 'dark');
  CREATE TYPE "public"."enum__archive_items_v_blocks_gallery_variant" AS ENUM('grid', 'masonry', 'carousel', 'lightbox', 'slider');
  CREATE TYPE "public"."enum__archive_items_v_blocks_gallery_columns" AS ENUM('2', '3', '4', '5', '6');
  CREATE TYPE "public"."enum__archive_items_v_blocks_gallery_gap" AS ENUM('none', 'small', 'medium', 'large');
  CREATE TYPE "public"."enum__archive_items_v_blocks_gallery_aspect_ratio" AS ENUM('auto', 'square', 'landscape', 'portrait', 'wide');
  CREATE TYPE "public"."enum__archive_items_v_blocks_grid_variant" AS ENUM('cards', 'features', 'icons', 'stats', 'team', 'testimonials', 'logos');
  CREATE TYPE "public"."enum__archive_items_v_blocks_grid_columns" AS ENUM('1', '2', '3', '4', '5', '6');
  CREATE TYPE "public"."enum__archive_items_v_blocks_grid_gap" AS ENUM('none', 'small', 'medium', 'large');
  CREATE TYPE "public"."enum__archive_items_v_blocks_grid_alignment" AS ENUM('left', 'center', 'right');
  CREATE TYPE "public"."enum__archive_items_v_blocks_grid_hover_effect" AS ENUM('none', 'lift', 'scale', 'glow');
  CREATE TYPE "public"."enum__archive_items_v_blocks_timeline_variant" AS ENUM('vertical', 'alternating', 'horizontal', 'compact');
  CREATE TYPE "public"."enum__archive_items_v_blocks_timeline_line_style" AS ENUM('solid', 'dashed', 'dotted', 'gradient');
  CREATE TYPE "public"."enum__archive_items_v_blocks_timeline_marker_style" AS ENUM('circle', 'diamond', 'square', 'icon', 'number', 'image');
  CREATE TYPE "public"."enum__archive_items_v_blocks_timeline_sort_order" AS ENUM('chronological', 'reverse', 'manual');
  CREATE TYPE "public"."enum__archive_items_v_blocks_timeline_background_color" AS ENUM('transparent', 'muted', 'dark', 'accent');
  CREATE TYPE "public"."enum__archive_items_v_version_template" AS ENUM('detail', 'gallery', 'timeline');
  CREATE TYPE "public"."enum__archive_items_v_version_status" AS ENUM('draft', 'published');
  CREATE TYPE "public"."enum_people_role" AS ENUM('artist', 'sculptor', 'architect', 'craftsman', 'patron', 'collector', 'ruler', 'scholar', 'team', 'contributor', 'other');
  CREATE TYPE "public"."enum_people_social_links_platform" AS ENUM('linkedin', 'twitter', 'instagram', 'facebook', 'youtube', 'github', 'other');
  CREATE TYPE "public"."enum_people_blocks_hero_links_variant" AS ENUM('primary', 'secondary', 'outline');
  CREATE TYPE "public"."enum_people_blocks_hero_variant" AS ENUM('standard', 'minimal', 'fullscreen', 'split', 'video', 'hero-led');
  CREATE TYPE "public"."enum_people_blocks_hero_overlay" AS ENUM('none', 'light', 'dark', 'gradient');
  CREATE TYPE "public"."enum_people_blocks_hero_text_align" AS ENUM('left', 'center', 'right');
  CREATE TYPE "public"."enum_people_blocks_content_columns_size" AS ENUM('oneThird', 'half', 'twoThirds', 'full');
  CREATE TYPE "public"."enum_people_blocks_content_background_color" AS ENUM('none', 'muted', 'dark', 'accent');
  CREATE TYPE "public"."enum_people_blocks_content_padding_top" AS ENUM('none', 'small', 'medium', 'large');
  CREATE TYPE "public"."enum_people_blocks_content_padding_bottom" AS ENUM('none', 'small', 'medium', 'large');
  CREATE TYPE "public"."enum_people_blocks_media_size" AS ENUM('small', 'default', 'large', 'fullWidth');
  CREATE TYPE "public"."enum_people_blocks_media_position" AS ENUM('left', 'center', 'right');
  CREATE TYPE "public"."enum_people_blocks_cta_links_variant" AS ENUM('primary', 'secondary', 'outline');
  CREATE TYPE "public"."enum_people_blocks_cta_variant" AS ENUM('standard', 'banner', 'card', 'inline');
  CREATE TYPE "public"."enum_people_blocks_cta_background_color" AS ENUM('none', 'muted', 'dark', 'accent');
  CREATE TYPE "public"."enum_people_blocks_quote_align" AS ENUM('left', 'center', 'right');
  CREATE TYPE "public"."enum_people_blocks_quote_variant" AS ENUM('simple', 'card', 'large');
  CREATE TYPE "public"."enum_people_blocks_features_variant" AS ENUM('grid', 'list');
  CREATE TYPE "public"."enum_people_blocks_stats_variant" AS ENUM('grid', 'list', 'cards');
  CREATE TYPE "public"."enum_people_blocks_logo_cloud_variant" AS ENUM('grid', 'ticker');
  CREATE TYPE "public"."enum_people_blocks_testimonials_variant" AS ENUM('standard', 'grid', 'cards');
  CREATE TYPE "public"."enum_people_blocks_faq_variant" AS ENUM('accordion', 'grid', 'list');
  CREATE TYPE "public"."enum_people_blocks_pricing_plans_links_variant" AS ENUM('primary', 'secondary', 'outline');
  CREATE TYPE "public"."enum_people_blocks_pricing_variant" AS ENUM('cards', 'table', 'comparison');
  CREATE TYPE "public"."enum_people_blocks_team_variant" AS ENUM('grid', 'list', 'cards');
  CREATE TYPE "public"."enum_people_blocks_embed_aspect_ratio" AS ENUM('16:9', '4:3', '1:1', '21:9');
  CREATE TYPE "public"."enum_people_blocks_archive_populate_by" AS ENUM('collection', 'selection');
  CREATE TYPE "public"."enum_people_blocks_archive_relation_to" AS ENUM('posts', 'pages', 'categories', 'tags');
  CREATE TYPE "public"."enum_people_blocks_archive_variant" AS ENUM('grid', 'list', 'cards', 'carousel');
  CREATE TYPE "public"."enum_people_blocks_archive_columns" AS ENUM('2', '3', '4');
  CREATE TYPE "public"."enum_people_blocks_form_variant" AS ENUM('default', 'card', 'inline', 'fullWidth');
  CREATE TYPE "public"."enum_people_blocks_form_background_color" AS ENUM('none', 'muted', 'dark');
  CREATE TYPE "public"."enum_people_blocks_gallery_variant" AS ENUM('grid', 'masonry', 'carousel', 'lightbox', 'slider');
  CREATE TYPE "public"."enum_people_blocks_gallery_columns" AS ENUM('2', '3', '4', '5', '6');
  CREATE TYPE "public"."enum_people_blocks_gallery_gap" AS ENUM('none', 'small', 'medium', 'large');
  CREATE TYPE "public"."enum_people_blocks_gallery_aspect_ratio" AS ENUM('auto', 'square', 'landscape', 'portrait', 'wide');
  CREATE TYPE "public"."enum_people_blocks_grid_variant" AS ENUM('cards', 'features', 'icons', 'stats', 'team', 'testimonials', 'logos');
  CREATE TYPE "public"."enum_people_blocks_grid_columns" AS ENUM('1', '2', '3', '4', '5', '6');
  CREATE TYPE "public"."enum_people_blocks_grid_gap" AS ENUM('none', 'small', 'medium', 'large');
  CREATE TYPE "public"."enum_people_blocks_grid_alignment" AS ENUM('left', 'center', 'right');
  CREATE TYPE "public"."enum_people_blocks_grid_hover_effect" AS ENUM('none', 'lift', 'scale', 'glow');
  CREATE TYPE "public"."enum_people_blocks_timeline_variant" AS ENUM('vertical', 'alternating', 'horizontal', 'compact');
  CREATE TYPE "public"."enum_people_blocks_timeline_line_style" AS ENUM('solid', 'dashed', 'dotted', 'gradient');
  CREATE TYPE "public"."enum_people_blocks_timeline_marker_style" AS ENUM('circle', 'diamond', 'square', 'icon', 'number', 'image');
  CREATE TYPE "public"."enum_people_blocks_timeline_sort_order" AS ENUM('chronological', 'reverse', 'manual');
  CREATE TYPE "public"."enum_people_blocks_timeline_background_color" AS ENUM('transparent', 'muted', 'dark', 'accent');
  CREATE TYPE "public"."enum_people_blocks_spacer_style" AS ENUM('space', 'divider');
  CREATE TYPE "public"."enum_people_blocks_spacer_size" AS ENUM('xs', 'sm', 'md', 'lg', 'xl');
  CREATE TYPE "public"."enum_people_blocks_spacer_line_style" AS ENUM('solid', 'dashed', 'dotted');
  CREATE TYPE "public"."enum_people_template" AS ENUM('profile', 'card', 'biography');
  CREATE TYPE "public"."enum_people_status" AS ENUM('draft', 'published');
  CREATE TYPE "public"."enum__people_v_version_role" AS ENUM('artist', 'sculptor', 'architect', 'craftsman', 'patron', 'collector', 'ruler', 'scholar', 'team', 'contributor', 'other');
  CREATE TYPE "public"."enum__people_v_version_social_links_platform" AS ENUM('linkedin', 'twitter', 'instagram', 'facebook', 'youtube', 'github', 'other');
  CREATE TYPE "public"."enum__people_v_blocks_hero_links_variant" AS ENUM('primary', 'secondary', 'outline');
  CREATE TYPE "public"."enum__people_v_blocks_hero_variant" AS ENUM('standard', 'minimal', 'fullscreen', 'split', 'video', 'hero-led');
  CREATE TYPE "public"."enum__people_v_blocks_hero_overlay" AS ENUM('none', 'light', 'dark', 'gradient');
  CREATE TYPE "public"."enum__people_v_blocks_hero_text_align" AS ENUM('left', 'center', 'right');
  CREATE TYPE "public"."enum__people_v_blocks_content_columns_size" AS ENUM('oneThird', 'half', 'twoThirds', 'full');
  CREATE TYPE "public"."enum__people_v_blocks_content_background_color" AS ENUM('none', 'muted', 'dark', 'accent');
  CREATE TYPE "public"."enum__people_v_blocks_content_padding_top" AS ENUM('none', 'small', 'medium', 'large');
  CREATE TYPE "public"."enum__people_v_blocks_content_padding_bottom" AS ENUM('none', 'small', 'medium', 'large');
  CREATE TYPE "public"."enum__people_v_blocks_media_size" AS ENUM('small', 'default', 'large', 'fullWidth');
  CREATE TYPE "public"."enum__people_v_blocks_media_position" AS ENUM('left', 'center', 'right');
  CREATE TYPE "public"."enum__people_v_blocks_cta_links_variant" AS ENUM('primary', 'secondary', 'outline');
  CREATE TYPE "public"."enum__people_v_blocks_cta_variant" AS ENUM('standard', 'banner', 'card', 'inline');
  CREATE TYPE "public"."enum__people_v_blocks_cta_background_color" AS ENUM('none', 'muted', 'dark', 'accent');
  CREATE TYPE "public"."enum__people_v_blocks_quote_align" AS ENUM('left', 'center', 'right');
  CREATE TYPE "public"."enum__people_v_blocks_quote_variant" AS ENUM('simple', 'card', 'large');
  CREATE TYPE "public"."enum__people_v_blocks_features_variant" AS ENUM('grid', 'list');
  CREATE TYPE "public"."enum__people_v_blocks_stats_variant" AS ENUM('grid', 'list', 'cards');
  CREATE TYPE "public"."enum__people_v_blocks_logo_cloud_variant" AS ENUM('grid', 'ticker');
  CREATE TYPE "public"."enum__people_v_blocks_testimonials_variant" AS ENUM('standard', 'grid', 'cards');
  CREATE TYPE "public"."enum__people_v_blocks_faq_variant" AS ENUM('accordion', 'grid', 'list');
  CREATE TYPE "public"."enum__people_v_blocks_pricing_plans_links_variant" AS ENUM('primary', 'secondary', 'outline');
  CREATE TYPE "public"."enum__people_v_blocks_pricing_variant" AS ENUM('cards', 'table', 'comparison');
  CREATE TYPE "public"."enum__people_v_blocks_team_variant" AS ENUM('grid', 'list', 'cards');
  CREATE TYPE "public"."enum__people_v_blocks_embed_aspect_ratio" AS ENUM('16:9', '4:3', '1:1', '21:9');
  CREATE TYPE "public"."enum__people_v_blocks_archive_populate_by" AS ENUM('collection', 'selection');
  CREATE TYPE "public"."enum__people_v_blocks_archive_relation_to" AS ENUM('posts', 'pages', 'categories', 'tags');
  CREATE TYPE "public"."enum__people_v_blocks_archive_variant" AS ENUM('grid', 'list', 'cards', 'carousel');
  CREATE TYPE "public"."enum__people_v_blocks_archive_columns" AS ENUM('2', '3', '4');
  CREATE TYPE "public"."enum__people_v_blocks_form_variant" AS ENUM('default', 'card', 'inline', 'fullWidth');
  CREATE TYPE "public"."enum__people_v_blocks_form_background_color" AS ENUM('none', 'muted', 'dark');
  CREATE TYPE "public"."enum__people_v_blocks_gallery_variant" AS ENUM('grid', 'masonry', 'carousel', 'lightbox', 'slider');
  CREATE TYPE "public"."enum__people_v_blocks_gallery_columns" AS ENUM('2', '3', '4', '5', '6');
  CREATE TYPE "public"."enum__people_v_blocks_gallery_gap" AS ENUM('none', 'small', 'medium', 'large');
  CREATE TYPE "public"."enum__people_v_blocks_gallery_aspect_ratio" AS ENUM('auto', 'square', 'landscape', 'portrait', 'wide');
  CREATE TYPE "public"."enum__people_v_blocks_grid_variant" AS ENUM('cards', 'features', 'icons', 'stats', 'team', 'testimonials', 'logos');
  CREATE TYPE "public"."enum__people_v_blocks_grid_columns" AS ENUM('1', '2', '3', '4', '5', '6');
  CREATE TYPE "public"."enum__people_v_blocks_grid_gap" AS ENUM('none', 'small', 'medium', 'large');
  CREATE TYPE "public"."enum__people_v_blocks_grid_alignment" AS ENUM('left', 'center', 'right');
  CREATE TYPE "public"."enum__people_v_blocks_grid_hover_effect" AS ENUM('none', 'lift', 'scale', 'glow');
  CREATE TYPE "public"."enum__people_v_blocks_timeline_variant" AS ENUM('vertical', 'alternating', 'horizontal', 'compact');
  CREATE TYPE "public"."enum__people_v_blocks_timeline_line_style" AS ENUM('solid', 'dashed', 'dotted', 'gradient');
  CREATE TYPE "public"."enum__people_v_blocks_timeline_marker_style" AS ENUM('circle', 'diamond', 'square', 'icon', 'number', 'image');
  CREATE TYPE "public"."enum__people_v_blocks_timeline_sort_order" AS ENUM('chronological', 'reverse', 'manual');
  CREATE TYPE "public"."enum__people_v_blocks_timeline_background_color" AS ENUM('transparent', 'muted', 'dark', 'accent');
  CREATE TYPE "public"."enum__people_v_blocks_spacer_style" AS ENUM('space', 'divider');
  CREATE TYPE "public"."enum__people_v_blocks_spacer_size" AS ENUM('xs', 'sm', 'md', 'lg', 'xl');
  CREATE TYPE "public"."enum__people_v_blocks_spacer_line_style" AS ENUM('solid', 'dashed', 'dotted');
  CREATE TYPE "public"."enum__people_v_version_template" AS ENUM('profile', 'card', 'biography');
  CREATE TYPE "public"."enum__people_v_version_status" AS ENUM('draft', 'published');
  CREATE TYPE "public"."enum_places_hours_day" AS ENUM('monday', 'tuesday', 'wednesday', 'thursday', 'friday', 'saturday', 'sunday');
  CREATE TYPE "public"."enum_places_blocks_hero_links_variant" AS ENUM('primary', 'secondary', 'outline');
  CREATE TYPE "public"."enum_places_blocks_hero_variant" AS ENUM('standard', 'minimal', 'fullscreen', 'split', 'video', 'hero-led');
  CREATE TYPE "public"."enum_places_blocks_hero_overlay" AS ENUM('none', 'light', 'dark', 'gradient');
  CREATE TYPE "public"."enum_places_blocks_hero_text_align" AS ENUM('left', 'center', 'right');
  CREATE TYPE "public"."enum_places_blocks_content_columns_size" AS ENUM('oneThird', 'half', 'twoThirds', 'full');
  CREATE TYPE "public"."enum_places_blocks_content_background_color" AS ENUM('none', 'muted', 'dark', 'accent');
  CREATE TYPE "public"."enum_places_blocks_content_padding_top" AS ENUM('none', 'small', 'medium', 'large');
  CREATE TYPE "public"."enum_places_blocks_content_padding_bottom" AS ENUM('none', 'small', 'medium', 'large');
  CREATE TYPE "public"."enum_places_blocks_media_size" AS ENUM('small', 'default', 'large', 'fullWidth');
  CREATE TYPE "public"."enum_places_blocks_media_position" AS ENUM('left', 'center', 'right');
  CREATE TYPE "public"."enum_places_blocks_cta_links_variant" AS ENUM('primary', 'secondary', 'outline');
  CREATE TYPE "public"."enum_places_blocks_cta_variant" AS ENUM('standard', 'banner', 'card', 'inline');
  CREATE TYPE "public"."enum_places_blocks_cta_background_color" AS ENUM('none', 'muted', 'dark', 'accent');
  CREATE TYPE "public"."enum_places_blocks_quote_align" AS ENUM('left', 'center', 'right');
  CREATE TYPE "public"."enum_places_blocks_quote_variant" AS ENUM('simple', 'card', 'large');
  CREATE TYPE "public"."enum_places_blocks_features_variant" AS ENUM('grid', 'list');
  CREATE TYPE "public"."enum_places_blocks_stats_variant" AS ENUM('grid', 'list', 'cards');
  CREATE TYPE "public"."enum_places_blocks_logo_cloud_variant" AS ENUM('grid', 'ticker');
  CREATE TYPE "public"."enum_places_blocks_testimonials_variant" AS ENUM('standard', 'grid', 'cards');
  CREATE TYPE "public"."enum_places_blocks_faq_variant" AS ENUM('accordion', 'grid', 'list');
  CREATE TYPE "public"."enum_places_blocks_pricing_plans_links_variant" AS ENUM('primary', 'secondary', 'outline');
  CREATE TYPE "public"."enum_places_blocks_pricing_variant" AS ENUM('cards', 'table', 'comparison');
  CREATE TYPE "public"."enum_places_blocks_team_variant" AS ENUM('grid', 'list', 'cards');
  CREATE TYPE "public"."enum_places_blocks_embed_aspect_ratio" AS ENUM('16:9', '4:3', '1:1', '21:9');
  CREATE TYPE "public"."enum_places_blocks_archive_populate_by" AS ENUM('collection', 'selection');
  CREATE TYPE "public"."enum_places_blocks_archive_relation_to" AS ENUM('posts', 'pages', 'categories', 'tags');
  CREATE TYPE "public"."enum_places_blocks_archive_variant" AS ENUM('grid', 'list', 'cards', 'carousel');
  CREATE TYPE "public"."enum_places_blocks_archive_columns" AS ENUM('2', '3', '4');
  CREATE TYPE "public"."enum_places_blocks_form_variant" AS ENUM('default', 'card', 'inline', 'fullWidth');
  CREATE TYPE "public"."enum_places_blocks_form_background_color" AS ENUM('none', 'muted', 'dark');
  CREATE TYPE "public"."enum_places_blocks_gallery_variant" AS ENUM('grid', 'masonry', 'carousel', 'lightbox', 'slider');
  CREATE TYPE "public"."enum_places_blocks_gallery_columns" AS ENUM('2', '3', '4', '5', '6');
  CREATE TYPE "public"."enum_places_blocks_gallery_gap" AS ENUM('none', 'small', 'medium', 'large');
  CREATE TYPE "public"."enum_places_blocks_gallery_aspect_ratio" AS ENUM('auto', 'square', 'landscape', 'portrait', 'wide');
  CREATE TYPE "public"."enum_places_blocks_grid_variant" AS ENUM('cards', 'features', 'icons', 'stats', 'team', 'testimonials', 'logos');
  CREATE TYPE "public"."enum_places_blocks_grid_columns" AS ENUM('1', '2', '3', '4', '5', '6');
  CREATE TYPE "public"."enum_places_blocks_grid_gap" AS ENUM('none', 'small', 'medium', 'large');
  CREATE TYPE "public"."enum_places_blocks_grid_alignment" AS ENUM('left', 'center', 'right');
  CREATE TYPE "public"."enum_places_blocks_grid_hover_effect" AS ENUM('none', 'lift', 'scale', 'glow');
  CREATE TYPE "public"."enum_places_blocks_timeline_variant" AS ENUM('vertical', 'alternating', 'horizontal', 'compact');
  CREATE TYPE "public"."enum_places_blocks_timeline_line_style" AS ENUM('solid', 'dashed', 'dotted', 'gradient');
  CREATE TYPE "public"."enum_places_blocks_timeline_marker_style" AS ENUM('circle', 'diamond', 'square', 'icon', 'number', 'image');
  CREATE TYPE "public"."enum_places_blocks_timeline_sort_order" AS ENUM('chronological', 'reverse', 'manual');
  CREATE TYPE "public"."enum_places_blocks_timeline_background_color" AS ENUM('transparent', 'muted', 'dark', 'accent');
  CREATE TYPE "public"."enum_places_blocks_spacer_style" AS ENUM('space', 'divider');
  CREATE TYPE "public"."enum_places_blocks_spacer_size" AS ENUM('xs', 'sm', 'md', 'lg', 'xl');
  CREATE TYPE "public"."enum_places_blocks_spacer_line_style" AS ENUM('solid', 'dashed', 'dotted');
  CREATE TYPE "public"."enum_places_template" AS ENUM('location', 'map', 'card');
  CREATE TYPE "public"."enum_places_place_type" AS ENUM('city', 'region', 'country', 'venue', 'store', 'museum', 'archaeological', 'historical', 'other');
  CREATE TYPE "public"."enum_places_status" AS ENUM('draft', 'published');
  CREATE TYPE "public"."enum__places_v_version_hours_day" AS ENUM('monday', 'tuesday', 'wednesday', 'thursday', 'friday', 'saturday', 'sunday');
  CREATE TYPE "public"."enum__places_v_blocks_hero_links_variant" AS ENUM('primary', 'secondary', 'outline');
  CREATE TYPE "public"."enum__places_v_blocks_hero_variant" AS ENUM('standard', 'minimal', 'fullscreen', 'split', 'video', 'hero-led');
  CREATE TYPE "public"."enum__places_v_blocks_hero_overlay" AS ENUM('none', 'light', 'dark', 'gradient');
  CREATE TYPE "public"."enum__places_v_blocks_hero_text_align" AS ENUM('left', 'center', 'right');
  CREATE TYPE "public"."enum__places_v_blocks_content_columns_size" AS ENUM('oneThird', 'half', 'twoThirds', 'full');
  CREATE TYPE "public"."enum__places_v_blocks_content_background_color" AS ENUM('none', 'muted', 'dark', 'accent');
  CREATE TYPE "public"."enum__places_v_blocks_content_padding_top" AS ENUM('none', 'small', 'medium', 'large');
  CREATE TYPE "public"."enum__places_v_blocks_content_padding_bottom" AS ENUM('none', 'small', 'medium', 'large');
  CREATE TYPE "public"."enum__places_v_blocks_media_size" AS ENUM('small', 'default', 'large', 'fullWidth');
  CREATE TYPE "public"."enum__places_v_blocks_media_position" AS ENUM('left', 'center', 'right');
  CREATE TYPE "public"."enum__places_v_blocks_cta_links_variant" AS ENUM('primary', 'secondary', 'outline');
  CREATE TYPE "public"."enum__places_v_blocks_cta_variant" AS ENUM('standard', 'banner', 'card', 'inline');
  CREATE TYPE "public"."enum__places_v_blocks_cta_background_color" AS ENUM('none', 'muted', 'dark', 'accent');
  CREATE TYPE "public"."enum__places_v_blocks_quote_align" AS ENUM('left', 'center', 'right');
  CREATE TYPE "public"."enum__places_v_blocks_quote_variant" AS ENUM('simple', 'card', 'large');
  CREATE TYPE "public"."enum__places_v_blocks_features_variant" AS ENUM('grid', 'list');
  CREATE TYPE "public"."enum__places_v_blocks_stats_variant" AS ENUM('grid', 'list', 'cards');
  CREATE TYPE "public"."enum__places_v_blocks_logo_cloud_variant" AS ENUM('grid', 'ticker');
  CREATE TYPE "public"."enum__places_v_blocks_testimonials_variant" AS ENUM('standard', 'grid', 'cards');
  CREATE TYPE "public"."enum__places_v_blocks_faq_variant" AS ENUM('accordion', 'grid', 'list');
  CREATE TYPE "public"."enum__places_v_blocks_pricing_plans_links_variant" AS ENUM('primary', 'secondary', 'outline');
  CREATE TYPE "public"."enum__places_v_blocks_pricing_variant" AS ENUM('cards', 'table', 'comparison');
  CREATE TYPE "public"."enum__places_v_blocks_team_variant" AS ENUM('grid', 'list', 'cards');
  CREATE TYPE "public"."enum__places_v_blocks_embed_aspect_ratio" AS ENUM('16:9', '4:3', '1:1', '21:9');
  CREATE TYPE "public"."enum__places_v_blocks_archive_populate_by" AS ENUM('collection', 'selection');
  CREATE TYPE "public"."enum__places_v_blocks_archive_relation_to" AS ENUM('posts', 'pages', 'categories', 'tags');
  CREATE TYPE "public"."enum__places_v_blocks_archive_variant" AS ENUM('grid', 'list', 'cards', 'carousel');
  CREATE TYPE "public"."enum__places_v_blocks_archive_columns" AS ENUM('2', '3', '4');
  CREATE TYPE "public"."enum__places_v_blocks_form_variant" AS ENUM('default', 'card', 'inline', 'fullWidth');
  CREATE TYPE "public"."enum__places_v_blocks_form_background_color" AS ENUM('none', 'muted', 'dark');
  CREATE TYPE "public"."enum__places_v_blocks_gallery_variant" AS ENUM('grid', 'masonry', 'carousel', 'lightbox', 'slider');
  CREATE TYPE "public"."enum__places_v_blocks_gallery_columns" AS ENUM('2', '3', '4', '5', '6');
  CREATE TYPE "public"."enum__places_v_blocks_gallery_gap" AS ENUM('none', 'small', 'medium', 'large');
  CREATE TYPE "public"."enum__places_v_blocks_gallery_aspect_ratio" AS ENUM('auto', 'square', 'landscape', 'portrait', 'wide');
  CREATE TYPE "public"."enum__places_v_blocks_grid_variant" AS ENUM('cards', 'features', 'icons', 'stats', 'team', 'testimonials', 'logos');
  CREATE TYPE "public"."enum__places_v_blocks_grid_columns" AS ENUM('1', '2', '3', '4', '5', '6');
  CREATE TYPE "public"."enum__places_v_blocks_grid_gap" AS ENUM('none', 'small', 'medium', 'large');
  CREATE TYPE "public"."enum__places_v_blocks_grid_alignment" AS ENUM('left', 'center', 'right');
  CREATE TYPE "public"."enum__places_v_blocks_grid_hover_effect" AS ENUM('none', 'lift', 'scale', 'glow');
  CREATE TYPE "public"."enum__places_v_blocks_timeline_variant" AS ENUM('vertical', 'alternating', 'horizontal', 'compact');
  CREATE TYPE "public"."enum__places_v_blocks_timeline_line_style" AS ENUM('solid', 'dashed', 'dotted', 'gradient');
  CREATE TYPE "public"."enum__places_v_blocks_timeline_marker_style" AS ENUM('circle', 'diamond', 'square', 'icon', 'number', 'image');
  CREATE TYPE "public"."enum__places_v_blocks_timeline_sort_order" AS ENUM('chronological', 'reverse', 'manual');
  CREATE TYPE "public"."enum__places_v_blocks_timeline_background_color" AS ENUM('transparent', 'muted', 'dark', 'accent');
  CREATE TYPE "public"."enum__places_v_blocks_spacer_style" AS ENUM('space', 'divider');
  CREATE TYPE "public"."enum__places_v_blocks_spacer_size" AS ENUM('xs', 'sm', 'md', 'lg', 'xl');
  CREATE TYPE "public"."enum__places_v_blocks_spacer_line_style" AS ENUM('solid', 'dashed', 'dotted');
  CREATE TYPE "public"."enum__places_v_version_template" AS ENUM('location', 'map', 'card');
  CREATE TYPE "public"."enum__places_v_version_place_type" AS ENUM('city', 'region', 'country', 'venue', 'store', 'museum', 'archaeological', 'historical', 'other');
  CREATE TYPE "public"."enum__places_v_version_status" AS ENUM('draft', 'published');
  CREATE TYPE "public"."enum_events_blocks_hero_links_variant" AS ENUM('primary', 'secondary', 'outline');
  CREATE TYPE "public"."enum_events_blocks_hero_variant" AS ENUM('standard', 'minimal', 'fullscreen', 'split', 'video', 'hero-led');
  CREATE TYPE "public"."enum_events_blocks_hero_overlay" AS ENUM('none', 'light', 'dark', 'gradient');
  CREATE TYPE "public"."enum_events_blocks_hero_text_align" AS ENUM('left', 'center', 'right');
  CREATE TYPE "public"."enum_events_blocks_content_columns_size" AS ENUM('oneThird', 'half', 'twoThirds', 'full');
  CREATE TYPE "public"."enum_events_blocks_content_background_color" AS ENUM('none', 'muted', 'dark', 'accent');
  CREATE TYPE "public"."enum_events_blocks_content_padding_top" AS ENUM('none', 'small', 'medium', 'large');
  CREATE TYPE "public"."enum_events_blocks_content_padding_bottom" AS ENUM('none', 'small', 'medium', 'large');
  CREATE TYPE "public"."enum_events_blocks_media_size" AS ENUM('small', 'default', 'large', 'fullWidth');
  CREATE TYPE "public"."enum_events_blocks_media_position" AS ENUM('left', 'center', 'right');
  CREATE TYPE "public"."enum_events_blocks_cta_links_variant" AS ENUM('primary', 'secondary', 'outline');
  CREATE TYPE "public"."enum_events_blocks_cta_variant" AS ENUM('standard', 'banner', 'card', 'inline');
  CREATE TYPE "public"."enum_events_blocks_cta_background_color" AS ENUM('none', 'muted', 'dark', 'accent');
  CREATE TYPE "public"."enum_events_blocks_archive_populate_by" AS ENUM('collection', 'selection');
  CREATE TYPE "public"."enum_events_blocks_archive_relation_to" AS ENUM('posts', 'pages', 'categories', 'tags');
  CREATE TYPE "public"."enum_events_blocks_archive_variant" AS ENUM('grid', 'list', 'cards', 'carousel');
  CREATE TYPE "public"."enum_events_blocks_archive_columns" AS ENUM('2', '3', '4');
  CREATE TYPE "public"."enum_events_blocks_form_variant" AS ENUM('default', 'card', 'inline', 'fullWidth');
  CREATE TYPE "public"."enum_events_blocks_form_background_color" AS ENUM('none', 'muted', 'dark');
  CREATE TYPE "public"."enum_events_blocks_gallery_variant" AS ENUM('grid', 'masonry', 'carousel', 'lightbox', 'slider');
  CREATE TYPE "public"."enum_events_blocks_gallery_columns" AS ENUM('2', '3', '4', '5', '6');
  CREATE TYPE "public"."enum_events_blocks_gallery_gap" AS ENUM('none', 'small', 'medium', 'large');
  CREATE TYPE "public"."enum_events_blocks_gallery_aspect_ratio" AS ENUM('auto', 'square', 'landscape', 'portrait', 'wide');
  CREATE TYPE "public"."enum_events_blocks_grid_variant" AS ENUM('cards', 'features', 'icons', 'stats', 'team', 'testimonials', 'logos');
  CREATE TYPE "public"."enum_events_blocks_grid_columns" AS ENUM('1', '2', '3', '4', '5', '6');
  CREATE TYPE "public"."enum_events_blocks_grid_gap" AS ENUM('none', 'small', 'medium', 'large');
  CREATE TYPE "public"."enum_events_blocks_grid_alignment" AS ENUM('left', 'center', 'right');
  CREATE TYPE "public"."enum_events_blocks_grid_hover_effect" AS ENUM('none', 'lift', 'scale', 'glow');
  CREATE TYPE "public"."enum_events_blocks_timeline_variant" AS ENUM('vertical', 'alternating', 'horizontal', 'compact');
  CREATE TYPE "public"."enum_events_blocks_timeline_line_style" AS ENUM('solid', 'dashed', 'dotted', 'gradient');
  CREATE TYPE "public"."enum_events_blocks_timeline_marker_style" AS ENUM('circle', 'diamond', 'square', 'icon', 'number', 'image');
  CREATE TYPE "public"."enum_events_blocks_timeline_sort_order" AS ENUM('chronological', 'reverse', 'manual');
  CREATE TYPE "public"."enum_events_blocks_timeline_background_color" AS ENUM('transparent', 'muted', 'dark', 'accent');
  CREATE TYPE "public"."enum_events_event_type" AS ENUM('exhibition', 'workshop', 'conference', 'performance', 'lecture', 'tour', 'opening', 'other');
  CREATE TYPE "public"."enum_events_recurring_frequency" AS ENUM('daily', 'weekly', 'monthly', 'yearly');
  CREATE TYPE "public"."enum_events_price_currency" AS ENUM('GBP', 'USD', 'EUR');
  CREATE TYPE "public"."enum_events_event_status" AS ENUM('upcoming', 'ongoing', 'completed', 'cancelled', 'postponed');
  CREATE TYPE "public"."enum_events_template" AS ENUM('event', 'calendar', 'card');
  CREATE TYPE "public"."enum_events_status" AS ENUM('draft', 'published');
  CREATE TYPE "public"."enum__events_v_blocks_hero_links_variant" AS ENUM('primary', 'secondary', 'outline');
  CREATE TYPE "public"."enum__events_v_blocks_hero_variant" AS ENUM('standard', 'minimal', 'fullscreen', 'split', 'video', 'hero-led');
  CREATE TYPE "public"."enum__events_v_blocks_hero_overlay" AS ENUM('none', 'light', 'dark', 'gradient');
  CREATE TYPE "public"."enum__events_v_blocks_hero_text_align" AS ENUM('left', 'center', 'right');
  CREATE TYPE "public"."enum__events_v_blocks_content_columns_size" AS ENUM('oneThird', 'half', 'twoThirds', 'full');
  CREATE TYPE "public"."enum__events_v_blocks_content_background_color" AS ENUM('none', 'muted', 'dark', 'accent');
  CREATE TYPE "public"."enum__events_v_blocks_content_padding_top" AS ENUM('none', 'small', 'medium', 'large');
  CREATE TYPE "public"."enum__events_v_blocks_content_padding_bottom" AS ENUM('none', 'small', 'medium', 'large');
  CREATE TYPE "public"."enum__events_v_blocks_media_size" AS ENUM('small', 'default', 'large', 'fullWidth');
  CREATE TYPE "public"."enum__events_v_blocks_media_position" AS ENUM('left', 'center', 'right');
  CREATE TYPE "public"."enum__events_v_blocks_cta_links_variant" AS ENUM('primary', 'secondary', 'outline');
  CREATE TYPE "public"."enum__events_v_blocks_cta_variant" AS ENUM('standard', 'banner', 'card', 'inline');
  CREATE TYPE "public"."enum__events_v_blocks_cta_background_color" AS ENUM('none', 'muted', 'dark', 'accent');
  CREATE TYPE "public"."enum__events_v_blocks_archive_populate_by" AS ENUM('collection', 'selection');
  CREATE TYPE "public"."enum__events_v_blocks_archive_relation_to" AS ENUM('posts', 'pages', 'categories', 'tags');
  CREATE TYPE "public"."enum__events_v_blocks_archive_variant" AS ENUM('grid', 'list', 'cards', 'carousel');
  CREATE TYPE "public"."enum__events_v_blocks_archive_columns" AS ENUM('2', '3', '4');
  CREATE TYPE "public"."enum__events_v_blocks_form_variant" AS ENUM('default', 'card', 'inline', 'fullWidth');
  CREATE TYPE "public"."enum__events_v_blocks_form_background_color" AS ENUM('none', 'muted', 'dark');
  CREATE TYPE "public"."enum__events_v_blocks_gallery_variant" AS ENUM('grid', 'masonry', 'carousel', 'lightbox', 'slider');
  CREATE TYPE "public"."enum__events_v_blocks_gallery_columns" AS ENUM('2', '3', '4', '5', '6');
  CREATE TYPE "public"."enum__events_v_blocks_gallery_gap" AS ENUM('none', 'small', 'medium', 'large');
  CREATE TYPE "public"."enum__events_v_blocks_gallery_aspect_ratio" AS ENUM('auto', 'square', 'landscape', 'portrait', 'wide');
  CREATE TYPE "public"."enum__events_v_blocks_grid_variant" AS ENUM('cards', 'features', 'icons', 'stats', 'team', 'testimonials', 'logos');
  CREATE TYPE "public"."enum__events_v_blocks_grid_columns" AS ENUM('1', '2', '3', '4', '5', '6');
  CREATE TYPE "public"."enum__events_v_blocks_grid_gap" AS ENUM('none', 'small', 'medium', 'large');
  CREATE TYPE "public"."enum__events_v_blocks_grid_alignment" AS ENUM('left', 'center', 'right');
  CREATE TYPE "public"."enum__events_v_blocks_grid_hover_effect" AS ENUM('none', 'lift', 'scale', 'glow');
  CREATE TYPE "public"."enum__events_v_blocks_timeline_variant" AS ENUM('vertical', 'alternating', 'horizontal', 'compact');
  CREATE TYPE "public"."enum__events_v_blocks_timeline_line_style" AS ENUM('solid', 'dashed', 'dotted', 'gradient');
  CREATE TYPE "public"."enum__events_v_blocks_timeline_marker_style" AS ENUM('circle', 'diamond', 'square', 'icon', 'number', 'image');
  CREATE TYPE "public"."enum__events_v_blocks_timeline_sort_order" AS ENUM('chronological', 'reverse', 'manual');
  CREATE TYPE "public"."enum__events_v_blocks_timeline_background_color" AS ENUM('transparent', 'muted', 'dark', 'accent');
  CREATE TYPE "public"."enum__events_v_version_event_type" AS ENUM('exhibition', 'workshop', 'conference', 'performance', 'lecture', 'tour', 'opening', 'other');
  CREATE TYPE "public"."enum__events_v_version_recurring_frequency" AS ENUM('daily', 'weekly', 'monthly', 'yearly');
  CREATE TYPE "public"."enum__events_v_version_price_currency" AS ENUM('GBP', 'USD', 'EUR');
  CREATE TYPE "public"."enum__events_v_version_event_status" AS ENUM('upcoming', 'ongoing', 'completed', 'cancelled', 'postponed');
  CREATE TYPE "public"."enum__events_v_version_template" AS ENUM('event', 'calendar', 'card');
  CREATE TYPE "public"."enum__events_v_version_status" AS ENUM('draft', 'published');
  CREATE TYPE "public"."enum_page_templates_blocks_logo_cloud_variant" AS ENUM('grid', 'ticker');
  CREATE TYPE "public"."enum_page_templates_blocks_testimonials_variant" AS ENUM('standard', 'grid', 'cards');
  CREATE TYPE "public"."enum_page_templates_blocks_content_columns_size" AS ENUM('oneThird', 'half', 'twoThirds', 'full');
  CREATE TYPE "public"."enum_page_templates_blocks_content_background_color" AS ENUM('none', 'muted', 'dark', 'accent');
  CREATE TYPE "public"."enum_page_templates_blocks_content_padding_top" AS ENUM('none', 'small', 'medium', 'large');
  CREATE TYPE "public"."enum_page_templates_blocks_content_padding_bottom" AS ENUM('none', 'small', 'medium', 'large');
  CREATE TYPE "public"."enum_page_templates_blocks_faq_variant" AS ENUM('accordion', 'grid', 'list');
  CREATE TYPE "public"."enum_page_templates_blocks_cta_links_variant" AS ENUM('primary', 'secondary', 'outline');
  CREATE TYPE "public"."enum_page_templates_blocks_cta_variant" AS ENUM('standard', 'banner', 'card', 'inline');
  CREATE TYPE "public"."enum_page_templates_blocks_cta_background_color" AS ENUM('none', 'muted', 'dark', 'accent');
  CREATE TABLE "pages_blocks_contact_form" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"heading" varchar DEFAULT 'Get in Touch',
  	"description" varchar DEFAULT 'Have a question? Fill out the form below and we''ll get back to you as soon as possible.',
  	"variant" "enum_pages_blocks_contact_form_variant" DEFAULT 'modern',
  	"show_contact_info" boolean DEFAULT true,
  	"office_address" varchar,
  	"email" varchar,
  	"phone" varchar,
  	"disclaimer" varchar,
  	"form_id" integer,
  	"submit_button_text" varchar DEFAULT 'Send Message',
  	"success_message" varchar DEFAULT 'Thank you for your message! We''ll get back to you soon.',
  	"block_name" varchar
  );
  
  CREATE TABLE "pages_blocks_social_links_custom_links" (
  	"_order" integer NOT NULL,
  	"_parent_id" varchar NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"platform" "enum_pages_blocks_social_links_custom_links_platform",
  	"url" varchar
  );
  
  CREATE TABLE "pages_blocks_social_links" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"heading" varchar DEFAULT 'Connect With Us',
  	"description" varchar,
  	"variant" "enum_pages_blocks_social_links_variant" DEFAULT 'horizontal',
  	"show_labels" boolean DEFAULT false,
  	"use_global_links" boolean DEFAULT true,
  	"block_name" varchar
  );
  
  CREATE TABLE "pages_blocks_video_feature" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"heading" varchar,
  	"video_url" varchar,
  	"caption" varchar,
  	"check_items" varchar,
  	"block_name" varchar
  );
  
  CREATE TABLE "pages_blocks_reusable_block" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"library_item_id" integer,
  	"block_name" varchar
  );
  
  CREATE TABLE "_pages_v_blocks_contact_form" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"heading" varchar DEFAULT 'Get in Touch',
  	"description" varchar DEFAULT 'Have a question? Fill out the form below and we''ll get back to you as soon as possible.',
  	"variant" "enum__pages_v_blocks_contact_form_variant" DEFAULT 'modern',
  	"show_contact_info" boolean DEFAULT true,
  	"office_address" varchar,
  	"email" varchar,
  	"phone" varchar,
  	"disclaimer" varchar,
  	"form_id" integer,
  	"submit_button_text" varchar DEFAULT 'Send Message',
  	"success_message" varchar DEFAULT 'Thank you for your message! We''ll get back to you soon.',
  	"_uuid" varchar,
  	"block_name" varchar
  );
  
  CREATE TABLE "_pages_v_blocks_social_links_custom_links" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"platform" "enum__pages_v_blocks_social_links_custom_links_platform",
  	"url" varchar,
  	"_uuid" varchar
  );
  
  CREATE TABLE "_pages_v_blocks_social_links" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"heading" varchar DEFAULT 'Connect With Us',
  	"description" varchar,
  	"variant" "enum__pages_v_blocks_social_links_variant" DEFAULT 'horizontal',
  	"show_labels" boolean DEFAULT false,
  	"use_global_links" boolean DEFAULT true,
  	"_uuid" varchar,
  	"block_name" varchar
  );
  
  CREATE TABLE "_pages_v_blocks_video_feature" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"heading" varchar,
  	"video_url" varchar,
  	"caption" varchar,
  	"check_items" varchar,
  	"_uuid" varchar,
  	"block_name" varchar
  );
  
  CREATE TABLE "_pages_v_blocks_reusable_block" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"library_item_id" integer,
  	"_uuid" varchar,
  	"block_name" varchar
  );
  
  CREATE TABLE "faqs" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"question" varchar NOT NULL,
  	"answer" jsonb NOT NULL,
  	"category" varchar,
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL
  );
  
  CREATE TABLE "testimonials" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"quote" varchar NOT NULL,
  	"name" varchar NOT NULL,
  	"role" varchar,
  	"location" varchar,
  	"company" varchar,
  	"avatar_id" integer,
  	"rating" numeric,
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL
  );
  
  CREATE TABLE "locations_faqs" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"question" varchar NOT NULL,
  	"answer" jsonb NOT NULL
  );
  
  CREATE TABLE "locations_nearby_locations" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"name" varchar NOT NULL
  );
  
  CREATE TABLE "locations" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"location_name" varchar NOT NULL,
  	"location_slug" varchar NOT NULL,
  	"h1" varchar NOT NULL,
  	"intro_copy" jsonb,
  	"extra_copy" jsonb,
  	"qa_score" numeric,
  	"status" varchar,
  	"canonical_path" varchar,
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL
  );
  
  CREATE TABLE "logo_clouds" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"label" varchar NOT NULL,
  	"media_id" integer NOT NULL,
  	"url" varchar,
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL
  );
  
  CREATE TABLE "global_blocks_blocks_hero_links" (
  	"_order" integer NOT NULL,
  	"_parent_id" varchar NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"label" varchar NOT NULL,
  	"url" varchar,
  	"page_id" integer,
  	"variant" "enum_global_blocks_blocks_hero_links_variant" DEFAULT 'primary',
  	"new_tab" boolean
  );
  
  CREATE TABLE "global_blocks_blocks_hero" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"variant" "enum_global_blocks_blocks_hero_variant" DEFAULT 'standard',
  	"eyebrow" varchar,
  	"heading" varchar NOT NULL,
  	"description" varchar,
  	"image_id" integer,
  	"video_url" varchar,
  	"overlay" "enum_global_blocks_blocks_hero_overlay" DEFAULT 'dark',
  	"text_align" "enum_global_blocks_blocks_hero_text_align" DEFAULT 'center',
  	"block_name" varchar
  );
  
  CREATE TABLE "global_blocks_blocks_content_columns" (
  	"_order" integer NOT NULL,
  	"_parent_id" varchar NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"size" "enum_global_blocks_blocks_content_columns_size" DEFAULT 'full',
  	"rich_text" jsonb,
  	"enable_link" boolean,
  	"link_label" varchar,
  	"link_url" varchar,
  	"link_page_id" integer,
  	"link_new_tab" boolean
  );
  
  CREATE TABLE "global_blocks_blocks_content" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"background_color" "enum_global_blocks_blocks_content_background_color" DEFAULT 'none',
  	"padding_top" "enum_global_blocks_blocks_content_padding_top" DEFAULT 'medium',
  	"padding_bottom" "enum_global_blocks_blocks_content_padding_bottom" DEFAULT 'medium',
  	"block_name" varchar
  );
  
  CREATE TABLE "global_blocks_blocks_media" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"media_id" integer NOT NULL,
  	"caption" varchar,
  	"size" "enum_global_blocks_blocks_media_size" DEFAULT 'default',
  	"position" "enum_global_blocks_blocks_media_position" DEFAULT 'center',
  	"enable_link" boolean,
  	"link_url" varchar,
  	"link_page_id" integer,
  	"link_new_tab" boolean,
  	"block_name" varchar
  );
  
  CREATE TABLE "global_blocks_blocks_cta_links" (
  	"_order" integer NOT NULL,
  	"_parent_id" varchar NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"label" varchar NOT NULL,
  	"url" varchar,
  	"page_id" integer,
  	"variant" "enum_global_blocks_blocks_cta_links_variant" DEFAULT 'primary',
  	"new_tab" boolean
  );
  
  CREATE TABLE "global_blocks_blocks_cta" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"variant" "enum_global_blocks_blocks_cta_variant" DEFAULT 'standard',
  	"heading" varchar NOT NULL,
  	"description" varchar,
  	"image_id" integer,
  	"background_color" "enum_global_blocks_blocks_cta_background_color" DEFAULT 'none',
  	"block_name" varchar
  );
  
  CREATE TABLE "global_blocks_blocks_archive" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"heading" varchar,
  	"description" varchar,
  	"populate_by" "enum_global_blocks_blocks_archive_populate_by" DEFAULT 'collection',
  	"relation_to" "enum_global_blocks_blocks_archive_relation_to" DEFAULT 'posts',
  	"limit" numeric DEFAULT 6,
  	"variant" "enum_global_blocks_blocks_archive_variant" DEFAULT 'grid',
  	"columns" "enum_global_blocks_blocks_archive_columns" DEFAULT '3',
  	"show_image" boolean DEFAULT true,
  	"show_excerpt" boolean DEFAULT true,
  	"show_date" boolean DEFAULT true,
  	"show_author" boolean DEFAULT false,
  	"link_show" boolean,
  	"link_label" varchar DEFAULT 'View All',
  	"link_url" varchar,
  	"block_name" varchar
  );
  
  CREATE TABLE "global_blocks_blocks_form" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"form_id" integer NOT NULL,
  	"enable_intro" boolean,
  	"intro_content" jsonb,
  	"variant" "enum_global_blocks_blocks_form_variant" DEFAULT 'default',
  	"background_color" "enum_global_blocks_blocks_form_background_color" DEFAULT 'none',
  	"block_name" varchar
  );
  
  CREATE TABLE "global_blocks_blocks_quote" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"quote" varchar NOT NULL,
  	"author" varchar,
  	"role" varchar,
  	"align" "enum_global_blocks_blocks_quote_align" DEFAULT 'left',
  	"variant" "enum_global_blocks_blocks_quote_variant" DEFAULT 'simple',
  	"block_name" varchar
  );
  
  CREATE TABLE "global_blocks_blocks_features_items" (
  	"_order" integer NOT NULL,
  	"_parent_id" varchar NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"heading" varchar NOT NULL,
  	"description" varchar,
  	"icon" varchar,
  	"media_id" integer
  );
  
  CREATE TABLE "global_blocks_blocks_features" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"heading" varchar,
  	"description" varchar,
  	"variant" "enum_global_blocks_blocks_features_variant" DEFAULT 'grid',
  	"block_name" varchar
  );
  
  CREATE TABLE "global_blocks_blocks_stats_items" (
  	"_order" integer NOT NULL,
  	"_parent_id" varchar NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"value" varchar NOT NULL,
  	"label" varchar NOT NULL,
  	"description" varchar
  );
  
  CREATE TABLE "global_blocks_blocks_stats" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"heading" varchar,
  	"description" varchar,
  	"variant" "enum_global_blocks_blocks_stats_variant" DEFAULT 'grid',
  	"block_name" varchar
  );
  
  CREATE TABLE "global_blocks_blocks_logo_cloud_items" (
  	"_order" integer NOT NULL,
  	"_parent_id" varchar NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"media_id" integer NOT NULL,
  	"label" varchar,
  	"url" varchar
  );
  
  CREATE TABLE "global_blocks_blocks_logo_cloud" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"heading" varchar,
  	"description" varchar,
  	"variant" "enum_global_blocks_blocks_logo_cloud_variant" DEFAULT 'grid',
  	"block_name" varchar
  );
  
  CREATE TABLE "global_blocks_blocks_testimonials_items" (
  	"_order" integer NOT NULL,
  	"_parent_id" varchar NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"quote" varchar NOT NULL,
  	"name" varchar NOT NULL,
  	"role" varchar,
  	"company" varchar,
  	"avatar_id" integer,
  	"rating" numeric
  );
  
  CREATE TABLE "global_blocks_blocks_testimonials" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"heading" varchar,
  	"description" varchar,
  	"variant" "enum_global_blocks_blocks_testimonials_variant" DEFAULT 'standard',
  	"block_name" varchar
  );
  
  CREATE TABLE "global_blocks_blocks_faq_items" (
  	"_order" integer NOT NULL,
  	"_parent_id" varchar NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"question" varchar NOT NULL,
  	"answer" jsonb NOT NULL
  );
  
  CREATE TABLE "global_blocks_blocks_faq" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"heading" varchar,
  	"description" varchar,
  	"variant" "enum_global_blocks_blocks_faq_variant" DEFAULT 'accordion',
  	"block_name" varchar
  );
  
  CREATE TABLE "global_blocks_blocks_pricing_plans_features" (
  	"_order" integer NOT NULL,
  	"_parent_id" varchar NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"feature" varchar NOT NULL
  );
  
  CREATE TABLE "global_blocks_blocks_pricing_plans_links" (
  	"_order" integer NOT NULL,
  	"_parent_id" varchar NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"label" varchar NOT NULL,
  	"url" varchar,
  	"page_id" integer,
  	"variant" "enum_global_blocks_blocks_pricing_plans_links_variant" DEFAULT 'primary'
  );
  
  CREATE TABLE "global_blocks_blocks_pricing_plans" (
  	"_order" integer NOT NULL,
  	"_parent_id" varchar NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"name" varchar NOT NULL,
  	"price" varchar NOT NULL,
  	"period" varchar DEFAULT 'per month',
  	"description" varchar,
  	"featured" boolean
  );
  
  CREATE TABLE "global_blocks_blocks_pricing" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"heading" varchar,
  	"description" varchar,
  	"variant" "enum_global_blocks_blocks_pricing_variant" DEFAULT 'cards',
  	"block_name" varchar
  );
  
  CREATE TABLE "global_blocks_blocks_team_items_socials" (
  	"_order" integer NOT NULL,
  	"_parent_id" varchar NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"label" varchar NOT NULL,
  	"url" varchar NOT NULL
  );
  
  CREATE TABLE "global_blocks_blocks_team_items" (
  	"_order" integer NOT NULL,
  	"_parent_id" varchar NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"name" varchar NOT NULL,
  	"role" varchar,
  	"bio" varchar,
  	"photo_id" integer
  );
  
  CREATE TABLE "global_blocks_blocks_team" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"heading" varchar,
  	"description" varchar,
  	"variant" "enum_global_blocks_blocks_team_variant" DEFAULT 'grid',
  	"block_name" varchar
  );
  
  CREATE TABLE "global_blocks_blocks_embed" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"heading" varchar,
  	"url" varchar NOT NULL,
  	"caption" varchar,
  	"aspect_ratio" "enum_global_blocks_blocks_embed_aspect_ratio" DEFAULT '16:9',
  	"block_name" varchar
  );
  
  CREATE TABLE "global_blocks_blocks_spacer" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"style" "enum_global_blocks_blocks_spacer_style" DEFAULT 'space',
  	"size" "enum_global_blocks_blocks_spacer_size" DEFAULT 'md',
  	"line_style" "enum_global_blocks_blocks_spacer_line_style" DEFAULT 'solid',
  	"block_name" varchar
  );
  
  CREATE TABLE "global_blocks_blocks_html" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"html" varchar NOT NULL,
  	"block_name" varchar
  );
  
  CREATE TABLE "global_blocks_blocks_gallery_images" (
  	"_order" integer NOT NULL,
  	"_parent_id" varchar NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"image_id" integer NOT NULL,
  	"caption" varchar,
  	"link_url" varchar,
  	"link_page_id" integer,
  	"link_new_tab" boolean
  );
  
  CREATE TABLE "global_blocks_blocks_gallery" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"heading" varchar,
  	"description" varchar,
  	"variant" "enum_global_blocks_blocks_gallery_variant" DEFAULT 'grid' NOT NULL,
  	"columns" "enum_global_blocks_blocks_gallery_columns" DEFAULT '3',
  	"gap" "enum_global_blocks_blocks_gallery_gap" DEFAULT 'medium',
  	"aspect_ratio" "enum_global_blocks_blocks_gallery_aspect_ratio" DEFAULT 'auto',
  	"show_captions" boolean DEFAULT true,
  	"enable_lightbox" boolean DEFAULT true,
  	"autoplay" boolean DEFAULT false,
  	"autoplay_speed" numeric DEFAULT 5000,
  	"block_name" varchar
  );
  
  CREATE TABLE "global_blocks_blocks_grid_items" (
  	"_order" integer NOT NULL,
  	"_parent_id" varchar NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"image_id" integer,
  	"icon" varchar,
  	"heading" varchar NOT NULL,
  	"eyebrow" varchar,
  	"description" varchar,
  	"stat" varchar,
  	"link_url" varchar,
  	"link_page_id" integer,
  	"link_label" varchar,
  	"link_new_tab" boolean
  );
  
  CREATE TABLE "global_blocks_blocks_grid" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"heading" varchar,
  	"description" varchar,
  	"variant" "enum_global_blocks_blocks_grid_variant" DEFAULT 'cards' NOT NULL,
  	"columns" "enum_global_blocks_blocks_grid_columns" DEFAULT '3' NOT NULL,
  	"gap" "enum_global_blocks_blocks_grid_gap" DEFAULT 'medium',
  	"alignment" "enum_global_blocks_blocks_grid_alignment" DEFAULT 'left',
  	"show_border" boolean DEFAULT true,
  	"show_shadow" boolean DEFAULT true,
  	"hover_effect" "enum_global_blocks_blocks_grid_hover_effect" DEFAULT 'none',
  	"cta_show" boolean,
  	"cta_label" varchar,
  	"cta_url" varchar,
  	"cta_page_id" integer,
  	"block_name" varchar
  );
  
  CREATE TABLE "global_blocks_blocks_timeline_events" (
  	"_order" integer NOT NULL,
  	"_parent_id" varchar NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"date" varchar NOT NULL,
  	"heading" varchar NOT NULL,
  	"description" jsonb,
  	"image_id" integer,
  	"icon" varchar,
  	"color" varchar,
  	"link_url" varchar,
  	"link_page_id" integer,
  	"link_label" varchar DEFAULT 'Learn More',
  	"link_new_tab" boolean,
  	"featured" boolean
  );
  
  CREATE TABLE "global_blocks_blocks_timeline" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"heading" varchar,
  	"description" varchar,
  	"variant" "enum_global_blocks_blocks_timeline_variant" DEFAULT 'vertical' NOT NULL,
  	"line_style" "enum_global_blocks_blocks_timeline_line_style" DEFAULT 'solid',
  	"marker_style" "enum_global_blocks_blocks_timeline_marker_style" DEFAULT 'circle',
  	"show_connectors" boolean DEFAULT true,
  	"show_dates" boolean DEFAULT true,
  	"animate_on_scroll" boolean DEFAULT true,
  	"sort_order" "enum_global_blocks_blocks_timeline_sort_order" DEFAULT 'chronological',
  	"background_color" "enum_global_blocks_blocks_timeline_background_color" DEFAULT 'transparent',
  	"block_name" varchar
  );
  
  CREATE TABLE "global_blocks" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"title" varchar NOT NULL,
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL
  );
  
  CREATE TABLE "global_blocks_rels" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"order" integer,
  	"parent_id" integer NOT NULL,
  	"path" varchar NOT NULL,
  	"categories_id" integer,
  	"tags_id" integer,
  	"posts_id" integer,
  	"pages_id" integer
  );
  
  CREATE TABLE "block_library" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"name" varchar NOT NULL,
  	"block_type" "enum_block_library_block_type" NOT NULL,
  	"block_data" jsonb NOT NULL,
  	"description" varchar,
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL
  );
  
  CREATE TABLE "block_template_builder_blocks_hero_links" (
  	"_order" integer NOT NULL,
  	"_parent_id" varchar NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"label" varchar NOT NULL,
  	"url" varchar,
  	"page_id" integer,
  	"variant" "enum_block_template_builder_blocks_hero_links_variant" DEFAULT 'primary',
  	"new_tab" boolean
  );
  
  CREATE TABLE "block_template_builder_blocks_hero" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"variant" "enum_block_template_builder_blocks_hero_variant" DEFAULT 'standard',
  	"eyebrow" varchar,
  	"heading" varchar NOT NULL,
  	"description" varchar,
  	"image_id" integer,
  	"video_url" varchar,
  	"overlay" "enum_block_template_builder_blocks_hero_overlay" DEFAULT 'dark',
  	"text_align" "enum_block_template_builder_blocks_hero_text_align" DEFAULT 'center',
  	"block_name" varchar
  );
  
  CREATE TABLE "block_template_builder_blocks_content_columns" (
  	"_order" integer NOT NULL,
  	"_parent_id" varchar NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"size" "enum_block_template_builder_blocks_content_columns_size" DEFAULT 'full',
  	"rich_text" jsonb,
  	"enable_link" boolean,
  	"link_label" varchar,
  	"link_url" varchar,
  	"link_page_id" integer,
  	"link_new_tab" boolean
  );
  
  CREATE TABLE "block_template_builder_blocks_content" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"background_color" "enum_block_template_builder_blocks_content_background_color" DEFAULT 'none',
  	"padding_top" "enum_block_template_builder_blocks_content_padding_top" DEFAULT 'medium',
  	"padding_bottom" "enum_block_template_builder_blocks_content_padding_bottom" DEFAULT 'medium',
  	"block_name" varchar
  );
  
  CREATE TABLE "block_template_builder_blocks_media" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"media_id" integer NOT NULL,
  	"caption" varchar,
  	"size" "enum_block_template_builder_blocks_media_size" DEFAULT 'default',
  	"position" "enum_block_template_builder_blocks_media_position" DEFAULT 'center',
  	"enable_link" boolean,
  	"link_url" varchar,
  	"link_page_id" integer,
  	"link_new_tab" boolean,
  	"block_name" varchar
  );
  
  CREATE TABLE "block_template_builder_blocks_cta_links" (
  	"_order" integer NOT NULL,
  	"_parent_id" varchar NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"label" varchar NOT NULL,
  	"url" varchar,
  	"page_id" integer,
  	"variant" "enum_block_template_builder_blocks_cta_links_variant" DEFAULT 'primary',
  	"new_tab" boolean
  );
  
  CREATE TABLE "block_template_builder_blocks_cta" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"variant" "enum_block_template_builder_blocks_cta_variant" DEFAULT 'standard',
  	"heading" varchar NOT NULL,
  	"description" varchar,
  	"image_id" integer,
  	"background_color" "enum_block_template_builder_blocks_cta_background_color" DEFAULT 'none',
  	"block_name" varchar
  );
  
  CREATE TABLE "block_template_builder_blocks_archive" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"heading" varchar,
  	"description" varchar,
  	"populate_by" "enum_block_template_builder_blocks_archive_populate_by" DEFAULT 'collection',
  	"relation_to" "enum_block_template_builder_blocks_archive_relation_to" DEFAULT 'posts',
  	"limit" numeric DEFAULT 6,
  	"variant" "enum_block_template_builder_blocks_archive_variant" DEFAULT 'grid',
  	"columns" "enum_block_template_builder_blocks_archive_columns" DEFAULT '3',
  	"show_image" boolean DEFAULT true,
  	"show_excerpt" boolean DEFAULT true,
  	"show_date" boolean DEFAULT true,
  	"show_author" boolean DEFAULT false,
  	"link_show" boolean,
  	"link_label" varchar DEFAULT 'View All',
  	"link_url" varchar,
  	"block_name" varchar
  );
  
  CREATE TABLE "block_template_builder_blocks_form" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"form_id" integer NOT NULL,
  	"enable_intro" boolean,
  	"intro_content" jsonb,
  	"variant" "enum_block_template_builder_blocks_form_variant" DEFAULT 'default',
  	"background_color" "enum_block_template_builder_blocks_form_background_color" DEFAULT 'none',
  	"block_name" varchar
  );
  
  CREATE TABLE "block_template_builder_blocks_quote" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"quote" varchar NOT NULL,
  	"author" varchar,
  	"role" varchar,
  	"align" "enum_block_template_builder_blocks_quote_align" DEFAULT 'left',
  	"variant" "enum_block_template_builder_blocks_quote_variant" DEFAULT 'simple',
  	"block_name" varchar
  );
  
  CREATE TABLE "block_template_builder_blocks_features_items" (
  	"_order" integer NOT NULL,
  	"_parent_id" varchar NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"heading" varchar NOT NULL,
  	"description" varchar,
  	"icon" varchar,
  	"media_id" integer
  );
  
  CREATE TABLE "block_template_builder_blocks_features" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"heading" varchar,
  	"description" varchar,
  	"variant" "enum_block_template_builder_blocks_features_variant" DEFAULT 'grid',
  	"block_name" varchar
  );
  
  CREATE TABLE "block_template_builder_blocks_stats_items" (
  	"_order" integer NOT NULL,
  	"_parent_id" varchar NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"value" varchar NOT NULL,
  	"label" varchar NOT NULL,
  	"description" varchar
  );
  
  CREATE TABLE "block_template_builder_blocks_stats" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"heading" varchar,
  	"description" varchar,
  	"variant" "enum_block_template_builder_blocks_stats_variant" DEFAULT 'grid',
  	"block_name" varchar
  );
  
  CREATE TABLE "block_template_builder_blocks_logo_cloud_items" (
  	"_order" integer NOT NULL,
  	"_parent_id" varchar NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"media_id" integer NOT NULL,
  	"label" varchar,
  	"url" varchar
  );
  
  CREATE TABLE "block_template_builder_blocks_logo_cloud" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"heading" varchar,
  	"description" varchar,
  	"variant" "enum_block_template_builder_blocks_logo_cloud_variant" DEFAULT 'grid',
  	"block_name" varchar
  );
  
  CREATE TABLE "block_template_builder_blocks_testimonials_items" (
  	"_order" integer NOT NULL,
  	"_parent_id" varchar NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"quote" varchar NOT NULL,
  	"name" varchar NOT NULL,
  	"role" varchar,
  	"company" varchar,
  	"avatar_id" integer,
  	"rating" numeric
  );
  
  CREATE TABLE "block_template_builder_blocks_testimonials" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"heading" varchar,
  	"description" varchar,
  	"variant" "enum_block_template_builder_blocks_testimonials_variant" DEFAULT 'standard',
  	"block_name" varchar
  );
  
  CREATE TABLE "block_template_builder_blocks_faq_items" (
  	"_order" integer NOT NULL,
  	"_parent_id" varchar NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"question" varchar NOT NULL,
  	"answer" jsonb NOT NULL
  );
  
  CREATE TABLE "block_template_builder_blocks_faq" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"heading" varchar,
  	"description" varchar,
  	"variant" "enum_block_template_builder_blocks_faq_variant" DEFAULT 'accordion',
  	"block_name" varchar
  );
  
  CREATE TABLE "block_template_builder_blocks_pricing_plans_features" (
  	"_order" integer NOT NULL,
  	"_parent_id" varchar NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"feature" varchar NOT NULL
  );
  
  CREATE TABLE "block_template_builder_blocks_pricing_plans_links" (
  	"_order" integer NOT NULL,
  	"_parent_id" varchar NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"label" varchar NOT NULL,
  	"url" varchar,
  	"page_id" integer,
  	"variant" "enum_block_template_builder_blocks_pricing_plans_links_variant" DEFAULT 'primary'
  );
  
  CREATE TABLE "block_template_builder_blocks_pricing_plans" (
  	"_order" integer NOT NULL,
  	"_parent_id" varchar NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"name" varchar NOT NULL,
  	"price" varchar NOT NULL,
  	"period" varchar DEFAULT 'per month',
  	"description" varchar,
  	"featured" boolean
  );
  
  CREATE TABLE "block_template_builder_blocks_pricing" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"heading" varchar,
  	"description" varchar,
  	"variant" "enum_block_template_builder_blocks_pricing_variant" DEFAULT 'cards',
  	"block_name" varchar
  );
  
  CREATE TABLE "block_template_builder_blocks_team_items_socials" (
  	"_order" integer NOT NULL,
  	"_parent_id" varchar NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"label" varchar NOT NULL,
  	"url" varchar NOT NULL
  );
  
  CREATE TABLE "block_template_builder_blocks_team_items" (
  	"_order" integer NOT NULL,
  	"_parent_id" varchar NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"name" varchar NOT NULL,
  	"role" varchar,
  	"bio" varchar,
  	"photo_id" integer
  );
  
  CREATE TABLE "block_template_builder_blocks_team" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"heading" varchar,
  	"description" varchar,
  	"variant" "enum_block_template_builder_blocks_team_variant" DEFAULT 'grid',
  	"block_name" varchar
  );
  
  CREATE TABLE "block_template_builder_blocks_embed" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"heading" varchar,
  	"url" varchar NOT NULL,
  	"caption" varchar,
  	"aspect_ratio" "enum_block_template_builder_blocks_embed_aspect_ratio" DEFAULT '16:9',
  	"block_name" varchar
  );
  
  CREATE TABLE "block_template_builder_blocks_spacer" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"style" "enum_block_template_builder_blocks_spacer_style" DEFAULT 'space',
  	"size" "enum_block_template_builder_blocks_spacer_size" DEFAULT 'md',
  	"line_style" "enum_block_template_builder_blocks_spacer_line_style" DEFAULT 'solid',
  	"block_name" varchar
  );
  
  CREATE TABLE "block_template_builder_blocks_html" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"html" varchar NOT NULL,
  	"block_name" varchar
  );
  
  CREATE TABLE "block_template_builder_blocks_gallery_images" (
  	"_order" integer NOT NULL,
  	"_parent_id" varchar NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"image_id" integer NOT NULL,
  	"caption" varchar,
  	"link_url" varchar,
  	"link_page_id" integer,
  	"link_new_tab" boolean
  );
  
  CREATE TABLE "block_template_builder_blocks_gallery" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"heading" varchar,
  	"description" varchar,
  	"variant" "enum_block_template_builder_blocks_gallery_variant" DEFAULT 'grid' NOT NULL,
  	"columns" "enum_block_template_builder_blocks_gallery_columns" DEFAULT '3',
  	"gap" "enum_block_template_builder_blocks_gallery_gap" DEFAULT 'medium',
  	"aspect_ratio" "enum_block_template_builder_blocks_gallery_aspect_ratio" DEFAULT 'auto',
  	"show_captions" boolean DEFAULT true,
  	"enable_lightbox" boolean DEFAULT true,
  	"autoplay" boolean DEFAULT false,
  	"autoplay_speed" numeric DEFAULT 5000,
  	"block_name" varchar
  );
  
  CREATE TABLE "block_template_builder_blocks_grid_items" (
  	"_order" integer NOT NULL,
  	"_parent_id" varchar NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"image_id" integer,
  	"icon" varchar,
  	"heading" varchar NOT NULL,
  	"eyebrow" varchar,
  	"description" varchar,
  	"stat" varchar,
  	"link_url" varchar,
  	"link_page_id" integer,
  	"link_label" varchar,
  	"link_new_tab" boolean
  );
  
  CREATE TABLE "block_template_builder_blocks_grid" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"heading" varchar,
  	"description" varchar,
  	"variant" "enum_block_template_builder_blocks_grid_variant" DEFAULT 'cards' NOT NULL,
  	"columns" "enum_block_template_builder_blocks_grid_columns" DEFAULT '3' NOT NULL,
  	"gap" "enum_block_template_builder_blocks_grid_gap" DEFAULT 'medium',
  	"alignment" "enum_block_template_builder_blocks_grid_alignment" DEFAULT 'left',
  	"show_border" boolean DEFAULT true,
  	"show_shadow" boolean DEFAULT true,
  	"hover_effect" "enum_block_template_builder_blocks_grid_hover_effect" DEFAULT 'none',
  	"cta_show" boolean,
  	"cta_label" varchar,
  	"cta_url" varchar,
  	"cta_page_id" integer,
  	"block_name" varchar
  );
  
  CREATE TABLE "block_template_builder_blocks_timeline_events" (
  	"_order" integer NOT NULL,
  	"_parent_id" varchar NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"date" varchar NOT NULL,
  	"heading" varchar NOT NULL,
  	"description" jsonb,
  	"image_id" integer,
  	"icon" varchar,
  	"color" varchar,
  	"link_url" varchar,
  	"link_page_id" integer,
  	"link_label" varchar DEFAULT 'Learn More',
  	"link_new_tab" boolean,
  	"featured" boolean
  );
  
  CREATE TABLE "block_template_builder_blocks_timeline" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"heading" varchar,
  	"description" varchar,
  	"variant" "enum_block_template_builder_blocks_timeline_variant" DEFAULT 'vertical' NOT NULL,
  	"line_style" "enum_block_template_builder_blocks_timeline_line_style" DEFAULT 'solid',
  	"marker_style" "enum_block_template_builder_blocks_timeline_marker_style" DEFAULT 'circle',
  	"show_connectors" boolean DEFAULT true,
  	"show_dates" boolean DEFAULT true,
  	"animate_on_scroll" boolean DEFAULT true,
  	"sort_order" "enum_block_template_builder_blocks_timeline_sort_order" DEFAULT 'chronological',
  	"background_color" "enum_block_template_builder_blocks_timeline_background_color" DEFAULT 'transparent',
  	"block_name" varchar
  );
  
  CREATE TABLE "block_template_builder" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"updated_at" timestamp(3) with time zone,
  	"created_at" timestamp(3) with time zone
  );
  
  CREATE TABLE "block_template_builder_rels" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"order" integer,
  	"parent_id" integer NOT NULL,
  	"path" varchar NOT NULL,
  	"categories_id" integer,
  	"tags_id" integer,
  	"posts_id" integer,
  	"pages_id" integer
  );
  
  CREATE TABLE "content_types_custom_fields" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"name" varchar NOT NULL,
  	"label" varchar NOT NULL,
  	"type" "enum_content_types_custom_fields_type" DEFAULT 'text' NOT NULL,
  	"required" boolean DEFAULT false,
  	"options" varchar
  );
  
  CREATE TABLE "content_types" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"name" varchar NOT NULL,
  	"slug" varchar NOT NULL,
  	"singular_label" varchar NOT NULL,
  	"plural_label" varchar NOT NULL,
  	"icon" "enum_content_types_icon" DEFAULT 'box',
  	"template" "enum_content_types_template" DEFAULT 'archive-item' NOT NULL,
  	"template_id" varchar,
  	"uninstalled" boolean DEFAULT false,
  	"description" varchar,
  	"has_archive" boolean DEFAULT true,
  	"archive_slug" varchar,
  	"seed_data_has_seed_data" boolean DEFAULT false,
  	"seed_data_sample_count" numeric DEFAULT 5,
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL
  );
  
  CREATE TABLE "custom_items_blocks_hero_links" (
  	"_order" integer NOT NULL,
  	"_parent_id" varchar NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"label" varchar,
  	"url" varchar,
  	"page_id" integer,
  	"variant" "enum_custom_items_blocks_hero_links_variant" DEFAULT 'primary',
  	"new_tab" boolean
  );
  
  CREATE TABLE "custom_items_blocks_hero" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"variant" "enum_custom_items_blocks_hero_variant" DEFAULT 'standard',
  	"eyebrow" varchar,
  	"heading" varchar,
  	"description" varchar,
  	"image_id" integer,
  	"video_url" varchar,
  	"overlay" "enum_custom_items_blocks_hero_overlay" DEFAULT 'dark',
  	"text_align" "enum_custom_items_blocks_hero_text_align" DEFAULT 'center',
  	"block_name" varchar
  );
  
  CREATE TABLE "custom_items_blocks_content_columns" (
  	"_order" integer NOT NULL,
  	"_parent_id" varchar NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"size" "enum_custom_items_blocks_content_columns_size" DEFAULT 'full',
  	"rich_text" jsonb,
  	"enable_link" boolean,
  	"link_label" varchar,
  	"link_url" varchar,
  	"link_page_id" integer,
  	"link_new_tab" boolean
  );
  
  CREATE TABLE "custom_items_blocks_content" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"background_color" "enum_custom_items_blocks_content_background_color" DEFAULT 'none',
  	"padding_top" "enum_custom_items_blocks_content_padding_top" DEFAULT 'medium',
  	"padding_bottom" "enum_custom_items_blocks_content_padding_bottom" DEFAULT 'medium',
  	"block_name" varchar
  );
  
  CREATE TABLE "custom_items_blocks_media" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"media_id" integer,
  	"caption" varchar,
  	"size" "enum_custom_items_blocks_media_size" DEFAULT 'default',
  	"position" "enum_custom_items_blocks_media_position" DEFAULT 'center',
  	"enable_link" boolean,
  	"link_url" varchar,
  	"link_page_id" integer,
  	"link_new_tab" boolean,
  	"block_name" varchar
  );
  
  CREATE TABLE "custom_items_blocks_cta_links" (
  	"_order" integer NOT NULL,
  	"_parent_id" varchar NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"label" varchar,
  	"url" varchar,
  	"page_id" integer,
  	"variant" "enum_custom_items_blocks_cta_links_variant" DEFAULT 'primary',
  	"new_tab" boolean
  );
  
  CREATE TABLE "custom_items_blocks_cta" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"variant" "enum_custom_items_blocks_cta_variant" DEFAULT 'standard',
  	"heading" varchar,
  	"description" varchar,
  	"image_id" integer,
  	"background_color" "enum_custom_items_blocks_cta_background_color" DEFAULT 'none',
  	"block_name" varchar
  );
  
  CREATE TABLE "custom_items_blocks_quote" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"quote" varchar,
  	"author" varchar,
  	"role" varchar,
  	"align" "enum_custom_items_blocks_quote_align" DEFAULT 'left',
  	"variant" "enum_custom_items_blocks_quote_variant" DEFAULT 'simple',
  	"block_name" varchar
  );
  
  CREATE TABLE "custom_items_blocks_features_items" (
  	"_order" integer NOT NULL,
  	"_parent_id" varchar NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"heading" varchar,
  	"description" varchar,
  	"icon" varchar,
  	"media_id" integer
  );
  
  CREATE TABLE "custom_items_blocks_features" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"heading" varchar,
  	"description" varchar,
  	"variant" "enum_custom_items_blocks_features_variant" DEFAULT 'grid',
  	"block_name" varchar
  );
  
  CREATE TABLE "custom_items_blocks_stats_items" (
  	"_order" integer NOT NULL,
  	"_parent_id" varchar NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"value" varchar,
  	"label" varchar,
  	"description" varchar
  );
  
  CREATE TABLE "custom_items_blocks_stats" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"heading" varchar,
  	"description" varchar,
  	"variant" "enum_custom_items_blocks_stats_variant" DEFAULT 'grid',
  	"block_name" varchar
  );
  
  CREATE TABLE "custom_items_blocks_logo_cloud_items" (
  	"_order" integer NOT NULL,
  	"_parent_id" varchar NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"media_id" integer,
  	"label" varchar,
  	"url" varchar
  );
  
  CREATE TABLE "custom_items_blocks_logo_cloud" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"heading" varchar,
  	"description" varchar,
  	"variant" "enum_custom_items_blocks_logo_cloud_variant" DEFAULT 'grid',
  	"block_name" varchar
  );
  
  CREATE TABLE "custom_items_blocks_testimonials_items" (
  	"_order" integer NOT NULL,
  	"_parent_id" varchar NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"quote" varchar,
  	"name" varchar,
  	"role" varchar,
  	"company" varchar,
  	"avatar_id" integer,
  	"rating" numeric
  );
  
  CREATE TABLE "custom_items_blocks_testimonials" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"heading" varchar,
  	"description" varchar,
  	"variant" "enum_custom_items_blocks_testimonials_variant" DEFAULT 'standard',
  	"block_name" varchar
  );
  
  CREATE TABLE "custom_items_blocks_faq_items" (
  	"_order" integer NOT NULL,
  	"_parent_id" varchar NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"question" varchar,
  	"answer" jsonb
  );
  
  CREATE TABLE "custom_items_blocks_faq" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"heading" varchar,
  	"description" varchar,
  	"variant" "enum_custom_items_blocks_faq_variant" DEFAULT 'accordion',
  	"block_name" varchar
  );
  
  CREATE TABLE "custom_items_blocks_pricing_plans_features" (
  	"_order" integer NOT NULL,
  	"_parent_id" varchar NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"feature" varchar
  );
  
  CREATE TABLE "custom_items_blocks_pricing_plans_links" (
  	"_order" integer NOT NULL,
  	"_parent_id" varchar NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"label" varchar,
  	"url" varchar,
  	"page_id" integer,
  	"variant" "enum_custom_items_blocks_pricing_plans_links_variant" DEFAULT 'primary'
  );
  
  CREATE TABLE "custom_items_blocks_pricing_plans" (
  	"_order" integer NOT NULL,
  	"_parent_id" varchar NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"name" varchar,
  	"price" varchar,
  	"period" varchar DEFAULT 'per month',
  	"description" varchar,
  	"featured" boolean
  );
  
  CREATE TABLE "custom_items_blocks_pricing" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"heading" varchar,
  	"description" varchar,
  	"variant" "enum_custom_items_blocks_pricing_variant" DEFAULT 'cards',
  	"block_name" varchar
  );
  
  CREATE TABLE "custom_items_blocks_team_items_socials" (
  	"_order" integer NOT NULL,
  	"_parent_id" varchar NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"label" varchar,
  	"url" varchar
  );
  
  CREATE TABLE "custom_items_blocks_team_items" (
  	"_order" integer NOT NULL,
  	"_parent_id" varchar NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"name" varchar,
  	"role" varchar,
  	"bio" varchar,
  	"photo_id" integer
  );
  
  CREATE TABLE "custom_items_blocks_team" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"heading" varchar,
  	"description" varchar,
  	"variant" "enum_custom_items_blocks_team_variant" DEFAULT 'grid',
  	"block_name" varchar
  );
  
  CREATE TABLE "custom_items_blocks_embed" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"heading" varchar,
  	"url" varchar,
  	"caption" varchar,
  	"aspect_ratio" "enum_custom_items_blocks_embed_aspect_ratio" DEFAULT '16:9',
  	"block_name" varchar
  );
  
  CREATE TABLE "custom_items_blocks_gallery_images" (
  	"_order" integer NOT NULL,
  	"_parent_id" varchar NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"image_id" integer,
  	"caption" varchar,
  	"link_url" varchar,
  	"link_page_id" integer,
  	"link_new_tab" boolean
  );
  
  CREATE TABLE "custom_items_blocks_gallery" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"heading" varchar,
  	"description" varchar,
  	"variant" "enum_custom_items_blocks_gallery_variant" DEFAULT 'grid',
  	"columns" "enum_custom_items_blocks_gallery_columns" DEFAULT '3',
  	"gap" "enum_custom_items_blocks_gallery_gap" DEFAULT 'medium',
  	"aspect_ratio" "enum_custom_items_blocks_gallery_aspect_ratio" DEFAULT 'auto',
  	"show_captions" boolean DEFAULT true,
  	"enable_lightbox" boolean DEFAULT true,
  	"autoplay" boolean DEFAULT false,
  	"autoplay_speed" numeric DEFAULT 5000,
  	"block_name" varchar
  );
  
  CREATE TABLE "custom_items_blocks_grid_items" (
  	"_order" integer NOT NULL,
  	"_parent_id" varchar NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"image_id" integer,
  	"icon" varchar,
  	"heading" varchar,
  	"eyebrow" varchar,
  	"description" varchar,
  	"stat" varchar,
  	"link_url" varchar,
  	"link_page_id" integer,
  	"link_label" varchar,
  	"link_new_tab" boolean
  );
  
  CREATE TABLE "custom_items_blocks_grid" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"heading" varchar,
  	"description" varchar,
  	"variant" "enum_custom_items_blocks_grid_variant" DEFAULT 'cards',
  	"columns" "enum_custom_items_blocks_grid_columns" DEFAULT '3',
  	"gap" "enum_custom_items_blocks_grid_gap" DEFAULT 'medium',
  	"alignment" "enum_custom_items_blocks_grid_alignment" DEFAULT 'left',
  	"show_border" boolean DEFAULT true,
  	"show_shadow" boolean DEFAULT true,
  	"hover_effect" "enum_custom_items_blocks_grid_hover_effect" DEFAULT 'none',
  	"cta_show" boolean,
  	"cta_label" varchar,
  	"cta_url" varchar,
  	"cta_page_id" integer,
  	"block_name" varchar
  );
  
  CREATE TABLE "custom_items_blocks_timeline_events" (
  	"_order" integer NOT NULL,
  	"_parent_id" varchar NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"date" varchar,
  	"heading" varchar,
  	"description" jsonb,
  	"image_id" integer,
  	"icon" varchar,
  	"color" varchar,
  	"link_url" varchar,
  	"link_page_id" integer,
  	"link_label" varchar DEFAULT 'Learn More',
  	"link_new_tab" boolean,
  	"featured" boolean
  );
  
  CREATE TABLE "custom_items_blocks_timeline" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"heading" varchar,
  	"description" varchar,
  	"variant" "enum_custom_items_blocks_timeline_variant" DEFAULT 'vertical',
  	"line_style" "enum_custom_items_blocks_timeline_line_style" DEFAULT 'solid',
  	"marker_style" "enum_custom_items_blocks_timeline_marker_style" DEFAULT 'circle',
  	"show_connectors" boolean DEFAULT true,
  	"show_dates" boolean DEFAULT true,
  	"animate_on_scroll" boolean DEFAULT true,
  	"sort_order" "enum_custom_items_blocks_timeline_sort_order" DEFAULT 'chronological',
  	"background_color" "enum_custom_items_blocks_timeline_background_color" DEFAULT 'transparent',
  	"block_name" varchar
  );
  
  CREATE TABLE "custom_items_blocks_archive" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"heading" varchar,
  	"description" varchar,
  	"populate_by" "enum_custom_items_blocks_archive_populate_by" DEFAULT 'collection',
  	"relation_to" "enum_custom_items_blocks_archive_relation_to" DEFAULT 'posts',
  	"limit" numeric DEFAULT 6,
  	"variant" "enum_custom_items_blocks_archive_variant" DEFAULT 'grid',
  	"columns" "enum_custom_items_blocks_archive_columns" DEFAULT '3',
  	"show_image" boolean DEFAULT true,
  	"show_excerpt" boolean DEFAULT true,
  	"show_date" boolean DEFAULT true,
  	"show_author" boolean DEFAULT false,
  	"link_show" boolean,
  	"link_label" varchar DEFAULT 'View All',
  	"link_url" varchar,
  	"block_name" varchar
  );
  
  CREATE TABLE "custom_items_blocks_form" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"form_id" integer,
  	"enable_intro" boolean,
  	"intro_content" jsonb,
  	"variant" "enum_custom_items_blocks_form_variant" DEFAULT 'default',
  	"background_color" "enum_custom_items_blocks_form_background_color" DEFAULT 'none',
  	"block_name" varchar
  );
  
  CREATE TABLE "custom_items_blocks_spacer" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"style" "enum_custom_items_blocks_spacer_style" DEFAULT 'space',
  	"size" "enum_custom_items_blocks_spacer_size" DEFAULT 'md',
  	"line_style" "enum_custom_items_blocks_spacer_line_style" DEFAULT 'solid',
  	"block_name" varchar
  );
  
  CREATE TABLE "custom_items_blocks_html" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"html" varchar,
  	"block_name" varchar
  );
  
  CREATE TABLE "custom_items_gallery" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"image_id" integer,
  	"caption" varchar
  );
  
  CREATE TABLE "custom_items" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"title" varchar,
  	"slug" varchar,
  	"excerpt" varchar,
  	"content" jsonb,
  	"featured_image_id" integer,
  	"custom_data" jsonb,
  	"content_type_id" integer,
  	"status" "enum_custom_items_status" DEFAULT 'draft',
  	"published_at" timestamp(3) with time zone,
  	"author_id" integer,
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"_status" "enum_custom_items_status" DEFAULT 'draft'
  );
  
  CREATE TABLE "custom_items_rels" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"order" integer,
  	"parent_id" integer NOT NULL,
  	"path" varchar NOT NULL,
  	"categories_id" integer,
  	"tags_id" integer,
  	"posts_id" integer,
  	"pages_id" integer
  );
  
  CREATE TABLE "_custom_items_v_blocks_hero_links" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"label" varchar,
  	"url" varchar,
  	"page_id" integer,
  	"variant" "enum__custom_items_v_blocks_hero_links_variant" DEFAULT 'primary',
  	"new_tab" boolean,
  	"_uuid" varchar
  );
  
  CREATE TABLE "_custom_items_v_blocks_hero" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"variant" "enum__custom_items_v_blocks_hero_variant" DEFAULT 'standard',
  	"eyebrow" varchar,
  	"heading" varchar,
  	"description" varchar,
  	"image_id" integer,
  	"video_url" varchar,
  	"overlay" "enum__custom_items_v_blocks_hero_overlay" DEFAULT 'dark',
  	"text_align" "enum__custom_items_v_blocks_hero_text_align" DEFAULT 'center',
  	"_uuid" varchar,
  	"block_name" varchar
  );
  
  CREATE TABLE "_custom_items_v_blocks_content_columns" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"size" "enum__custom_items_v_blocks_content_columns_size" DEFAULT 'full',
  	"rich_text" jsonb,
  	"enable_link" boolean,
  	"link_label" varchar,
  	"link_url" varchar,
  	"link_page_id" integer,
  	"link_new_tab" boolean,
  	"_uuid" varchar
  );
  
  CREATE TABLE "_custom_items_v_blocks_content" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"background_color" "enum__custom_items_v_blocks_content_background_color" DEFAULT 'none',
  	"padding_top" "enum__custom_items_v_blocks_content_padding_top" DEFAULT 'medium',
  	"padding_bottom" "enum__custom_items_v_blocks_content_padding_bottom" DEFAULT 'medium',
  	"_uuid" varchar,
  	"block_name" varchar
  );
  
  CREATE TABLE "_custom_items_v_blocks_media" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"media_id" integer,
  	"caption" varchar,
  	"size" "enum__custom_items_v_blocks_media_size" DEFAULT 'default',
  	"position" "enum__custom_items_v_blocks_media_position" DEFAULT 'center',
  	"enable_link" boolean,
  	"link_url" varchar,
  	"link_page_id" integer,
  	"link_new_tab" boolean,
  	"_uuid" varchar,
  	"block_name" varchar
  );
  
  CREATE TABLE "_custom_items_v_blocks_cta_links" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"label" varchar,
  	"url" varchar,
  	"page_id" integer,
  	"variant" "enum__custom_items_v_blocks_cta_links_variant" DEFAULT 'primary',
  	"new_tab" boolean,
  	"_uuid" varchar
  );
  
  CREATE TABLE "_custom_items_v_blocks_cta" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"variant" "enum__custom_items_v_blocks_cta_variant" DEFAULT 'standard',
  	"heading" varchar,
  	"description" varchar,
  	"image_id" integer,
  	"background_color" "enum__custom_items_v_blocks_cta_background_color" DEFAULT 'none',
  	"_uuid" varchar,
  	"block_name" varchar
  );
  
  CREATE TABLE "_custom_items_v_blocks_quote" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"quote" varchar,
  	"author" varchar,
  	"role" varchar,
  	"align" "enum__custom_items_v_blocks_quote_align" DEFAULT 'left',
  	"variant" "enum__custom_items_v_blocks_quote_variant" DEFAULT 'simple',
  	"_uuid" varchar,
  	"block_name" varchar
  );
  
  CREATE TABLE "_custom_items_v_blocks_features_items" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"heading" varchar,
  	"description" varchar,
  	"icon" varchar,
  	"media_id" integer,
  	"_uuid" varchar
  );
  
  CREATE TABLE "_custom_items_v_blocks_features" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"heading" varchar,
  	"description" varchar,
  	"variant" "enum__custom_items_v_blocks_features_variant" DEFAULT 'grid',
  	"_uuid" varchar,
  	"block_name" varchar
  );
  
  CREATE TABLE "_custom_items_v_blocks_stats_items" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"value" varchar,
  	"label" varchar,
  	"description" varchar,
  	"_uuid" varchar
  );
  
  CREATE TABLE "_custom_items_v_blocks_stats" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"heading" varchar,
  	"description" varchar,
  	"variant" "enum__custom_items_v_blocks_stats_variant" DEFAULT 'grid',
  	"_uuid" varchar,
  	"block_name" varchar
  );
  
  CREATE TABLE "_custom_items_v_blocks_logo_cloud_items" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"media_id" integer,
  	"label" varchar,
  	"url" varchar,
  	"_uuid" varchar
  );
  
  CREATE TABLE "_custom_items_v_blocks_logo_cloud" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"heading" varchar,
  	"description" varchar,
  	"variant" "enum__custom_items_v_blocks_logo_cloud_variant" DEFAULT 'grid',
  	"_uuid" varchar,
  	"block_name" varchar
  );
  
  CREATE TABLE "_custom_items_v_blocks_testimonials_items" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"quote" varchar,
  	"name" varchar,
  	"role" varchar,
  	"company" varchar,
  	"avatar_id" integer,
  	"rating" numeric,
  	"_uuid" varchar
  );
  
  CREATE TABLE "_custom_items_v_blocks_testimonials" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"heading" varchar,
  	"description" varchar,
  	"variant" "enum__custom_items_v_blocks_testimonials_variant" DEFAULT 'standard',
  	"_uuid" varchar,
  	"block_name" varchar
  );
  
  CREATE TABLE "_custom_items_v_blocks_faq_items" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"question" varchar,
  	"answer" jsonb,
  	"_uuid" varchar
  );
  
  CREATE TABLE "_custom_items_v_blocks_faq" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"heading" varchar,
  	"description" varchar,
  	"variant" "enum__custom_items_v_blocks_faq_variant" DEFAULT 'accordion',
  	"_uuid" varchar,
  	"block_name" varchar
  );
  
  CREATE TABLE "_custom_items_v_blocks_pricing_plans_features" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"feature" varchar,
  	"_uuid" varchar
  );
  
  CREATE TABLE "_custom_items_v_blocks_pricing_plans_links" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"label" varchar,
  	"url" varchar,
  	"page_id" integer,
  	"variant" "enum__custom_items_v_blocks_pricing_plans_links_variant" DEFAULT 'primary',
  	"_uuid" varchar
  );
  
  CREATE TABLE "_custom_items_v_blocks_pricing_plans" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"name" varchar,
  	"price" varchar,
  	"period" varchar DEFAULT 'per month',
  	"description" varchar,
  	"featured" boolean,
  	"_uuid" varchar
  );
  
  CREATE TABLE "_custom_items_v_blocks_pricing" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"heading" varchar,
  	"description" varchar,
  	"variant" "enum__custom_items_v_blocks_pricing_variant" DEFAULT 'cards',
  	"_uuid" varchar,
  	"block_name" varchar
  );
  
  CREATE TABLE "_custom_items_v_blocks_team_items_socials" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"label" varchar,
  	"url" varchar,
  	"_uuid" varchar
  );
  
  CREATE TABLE "_custom_items_v_blocks_team_items" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"name" varchar,
  	"role" varchar,
  	"bio" varchar,
  	"photo_id" integer,
  	"_uuid" varchar
  );
  
  CREATE TABLE "_custom_items_v_blocks_team" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"heading" varchar,
  	"description" varchar,
  	"variant" "enum__custom_items_v_blocks_team_variant" DEFAULT 'grid',
  	"_uuid" varchar,
  	"block_name" varchar
  );
  
  CREATE TABLE "_custom_items_v_blocks_embed" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"heading" varchar,
  	"url" varchar,
  	"caption" varchar,
  	"aspect_ratio" "enum__custom_items_v_blocks_embed_aspect_ratio" DEFAULT '16:9',
  	"_uuid" varchar,
  	"block_name" varchar
  );
  
  CREATE TABLE "_custom_items_v_blocks_gallery_images" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"image_id" integer,
  	"caption" varchar,
  	"link_url" varchar,
  	"link_page_id" integer,
  	"link_new_tab" boolean,
  	"_uuid" varchar
  );
  
  CREATE TABLE "_custom_items_v_blocks_gallery" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"heading" varchar,
  	"description" varchar,
  	"variant" "enum__custom_items_v_blocks_gallery_variant" DEFAULT 'grid',
  	"columns" "enum__custom_items_v_blocks_gallery_columns" DEFAULT '3',
  	"gap" "enum__custom_items_v_blocks_gallery_gap" DEFAULT 'medium',
  	"aspect_ratio" "enum__custom_items_v_blocks_gallery_aspect_ratio" DEFAULT 'auto',
  	"show_captions" boolean DEFAULT true,
  	"enable_lightbox" boolean DEFAULT true,
  	"autoplay" boolean DEFAULT false,
  	"autoplay_speed" numeric DEFAULT 5000,
  	"_uuid" varchar,
  	"block_name" varchar
  );
  
  CREATE TABLE "_custom_items_v_blocks_grid_items" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"image_id" integer,
  	"icon" varchar,
  	"heading" varchar,
  	"eyebrow" varchar,
  	"description" varchar,
  	"stat" varchar,
  	"link_url" varchar,
  	"link_page_id" integer,
  	"link_label" varchar,
  	"link_new_tab" boolean,
  	"_uuid" varchar
  );
  
  CREATE TABLE "_custom_items_v_blocks_grid" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"heading" varchar,
  	"description" varchar,
  	"variant" "enum__custom_items_v_blocks_grid_variant" DEFAULT 'cards',
  	"columns" "enum__custom_items_v_blocks_grid_columns" DEFAULT '3',
  	"gap" "enum__custom_items_v_blocks_grid_gap" DEFAULT 'medium',
  	"alignment" "enum__custom_items_v_blocks_grid_alignment" DEFAULT 'left',
  	"show_border" boolean DEFAULT true,
  	"show_shadow" boolean DEFAULT true,
  	"hover_effect" "enum__custom_items_v_blocks_grid_hover_effect" DEFAULT 'none',
  	"cta_show" boolean,
  	"cta_label" varchar,
  	"cta_url" varchar,
  	"cta_page_id" integer,
  	"_uuid" varchar,
  	"block_name" varchar
  );
  
  CREATE TABLE "_custom_items_v_blocks_timeline_events" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"date" varchar,
  	"heading" varchar,
  	"description" jsonb,
  	"image_id" integer,
  	"icon" varchar,
  	"color" varchar,
  	"link_url" varchar,
  	"link_page_id" integer,
  	"link_label" varchar DEFAULT 'Learn More',
  	"link_new_tab" boolean,
  	"featured" boolean,
  	"_uuid" varchar
  );
  
  CREATE TABLE "_custom_items_v_blocks_timeline" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"heading" varchar,
  	"description" varchar,
  	"variant" "enum__custom_items_v_blocks_timeline_variant" DEFAULT 'vertical',
  	"line_style" "enum__custom_items_v_blocks_timeline_line_style" DEFAULT 'solid',
  	"marker_style" "enum__custom_items_v_blocks_timeline_marker_style" DEFAULT 'circle',
  	"show_connectors" boolean DEFAULT true,
  	"show_dates" boolean DEFAULT true,
  	"animate_on_scroll" boolean DEFAULT true,
  	"sort_order" "enum__custom_items_v_blocks_timeline_sort_order" DEFAULT 'chronological',
  	"background_color" "enum__custom_items_v_blocks_timeline_background_color" DEFAULT 'transparent',
  	"_uuid" varchar,
  	"block_name" varchar
  );
  
  CREATE TABLE "_custom_items_v_blocks_archive" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"heading" varchar,
  	"description" varchar,
  	"populate_by" "enum__custom_items_v_blocks_archive_populate_by" DEFAULT 'collection',
  	"relation_to" "enum__custom_items_v_blocks_archive_relation_to" DEFAULT 'posts',
  	"limit" numeric DEFAULT 6,
  	"variant" "enum__custom_items_v_blocks_archive_variant" DEFAULT 'grid',
  	"columns" "enum__custom_items_v_blocks_archive_columns" DEFAULT '3',
  	"show_image" boolean DEFAULT true,
  	"show_excerpt" boolean DEFAULT true,
  	"show_date" boolean DEFAULT true,
  	"show_author" boolean DEFAULT false,
  	"link_show" boolean,
  	"link_label" varchar DEFAULT 'View All',
  	"link_url" varchar,
  	"_uuid" varchar,
  	"block_name" varchar
  );
  
  CREATE TABLE "_custom_items_v_blocks_form" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"form_id" integer,
  	"enable_intro" boolean,
  	"intro_content" jsonb,
  	"variant" "enum__custom_items_v_blocks_form_variant" DEFAULT 'default',
  	"background_color" "enum__custom_items_v_blocks_form_background_color" DEFAULT 'none',
  	"_uuid" varchar,
  	"block_name" varchar
  );
  
  CREATE TABLE "_custom_items_v_blocks_spacer" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"style" "enum__custom_items_v_blocks_spacer_style" DEFAULT 'space',
  	"size" "enum__custom_items_v_blocks_spacer_size" DEFAULT 'md',
  	"line_style" "enum__custom_items_v_blocks_spacer_line_style" DEFAULT 'solid',
  	"_uuid" varchar,
  	"block_name" varchar
  );
  
  CREATE TABLE "_custom_items_v_blocks_html" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"html" varchar,
  	"_uuid" varchar,
  	"block_name" varchar
  );
  
  CREATE TABLE "_custom_items_v_version_gallery" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"image_id" integer,
  	"caption" varchar,
  	"_uuid" varchar
  );
  
  CREATE TABLE "_custom_items_v" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"parent_id" integer,
  	"version_title" varchar,
  	"version_slug" varchar,
  	"version_excerpt" varchar,
  	"version_content" jsonb,
  	"version_featured_image_id" integer,
  	"version_custom_data" jsonb,
  	"version_content_type_id" integer,
  	"version_status" "enum__custom_items_v_version_status" DEFAULT 'draft',
  	"version_published_at" timestamp(3) with time zone,
  	"version_author_id" integer,
  	"version_updated_at" timestamp(3) with time zone,
  	"version_created_at" timestamp(3) with time zone,
  	"version__status" "enum__custom_items_v_version_status" DEFAULT 'draft',
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"latest" boolean,
  	"autosave" boolean
  );
  
  CREATE TABLE "_custom_items_v_rels" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"order" integer,
  	"parent_id" integer NOT NULL,
  	"path" varchar NOT NULL,
  	"categories_id" integer,
  	"tags_id" integer,
  	"posts_id" integer,
  	"pages_id" integer
  );
  
  CREATE TABLE "archive_items_gallery" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"image_id" integer,
  	"caption" varchar
  );
  
  CREATE TABLE "archive_items_blocks_hero_links" (
  	"_order" integer NOT NULL,
  	"_parent_id" varchar NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"label" varchar,
  	"url" varchar,
  	"page_id" integer,
  	"variant" "enum_archive_items_blocks_hero_links_variant" DEFAULT 'primary',
  	"new_tab" boolean
  );
  
  CREATE TABLE "archive_items_blocks_hero" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"variant" "enum_archive_items_blocks_hero_variant" DEFAULT 'standard',
  	"eyebrow" varchar,
  	"heading" varchar,
  	"description" varchar,
  	"image_id" integer,
  	"video_url" varchar,
  	"overlay" "enum_archive_items_blocks_hero_overlay" DEFAULT 'dark',
  	"text_align" "enum_archive_items_blocks_hero_text_align" DEFAULT 'center',
  	"block_name" varchar
  );
  
  CREATE TABLE "archive_items_blocks_content_columns" (
  	"_order" integer NOT NULL,
  	"_parent_id" varchar NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"size" "enum_archive_items_blocks_content_columns_size" DEFAULT 'full',
  	"rich_text" jsonb,
  	"enable_link" boolean,
  	"link_label" varchar,
  	"link_url" varchar,
  	"link_page_id" integer,
  	"link_new_tab" boolean
  );
  
  CREATE TABLE "archive_items_blocks_content" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"background_color" "enum_archive_items_blocks_content_background_color" DEFAULT 'none',
  	"padding_top" "enum_archive_items_blocks_content_padding_top" DEFAULT 'medium',
  	"padding_bottom" "enum_archive_items_blocks_content_padding_bottom" DEFAULT 'medium',
  	"block_name" varchar
  );
  
  CREATE TABLE "archive_items_blocks_media" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"media_id" integer,
  	"caption" varchar,
  	"size" "enum_archive_items_blocks_media_size" DEFAULT 'default',
  	"position" "enum_archive_items_blocks_media_position" DEFAULT 'center',
  	"enable_link" boolean,
  	"link_url" varchar,
  	"link_page_id" integer,
  	"link_new_tab" boolean,
  	"block_name" varchar
  );
  
  CREATE TABLE "archive_items_blocks_cta_links" (
  	"_order" integer NOT NULL,
  	"_parent_id" varchar NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"label" varchar,
  	"url" varchar,
  	"page_id" integer,
  	"variant" "enum_archive_items_blocks_cta_links_variant" DEFAULT 'primary',
  	"new_tab" boolean
  );
  
  CREATE TABLE "archive_items_blocks_cta" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"variant" "enum_archive_items_blocks_cta_variant" DEFAULT 'standard',
  	"heading" varchar,
  	"description" varchar,
  	"image_id" integer,
  	"background_color" "enum_archive_items_blocks_cta_background_color" DEFAULT 'none',
  	"block_name" varchar
  );
  
  CREATE TABLE "archive_items_blocks_archive" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"heading" varchar,
  	"description" varchar,
  	"populate_by" "enum_archive_items_blocks_archive_populate_by" DEFAULT 'collection',
  	"relation_to" "enum_archive_items_blocks_archive_relation_to" DEFAULT 'posts',
  	"limit" numeric DEFAULT 6,
  	"variant" "enum_archive_items_blocks_archive_variant" DEFAULT 'grid',
  	"columns" "enum_archive_items_blocks_archive_columns" DEFAULT '3',
  	"show_image" boolean DEFAULT true,
  	"show_excerpt" boolean DEFAULT true,
  	"show_date" boolean DEFAULT true,
  	"show_author" boolean DEFAULT false,
  	"link_show" boolean,
  	"link_label" varchar DEFAULT 'View All',
  	"link_url" varchar,
  	"block_name" varchar
  );
  
  CREATE TABLE "archive_items_blocks_form" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"form_id" integer,
  	"enable_intro" boolean,
  	"intro_content" jsonb,
  	"variant" "enum_archive_items_blocks_form_variant" DEFAULT 'default',
  	"background_color" "enum_archive_items_blocks_form_background_color" DEFAULT 'none',
  	"block_name" varchar
  );
  
  CREATE TABLE "archive_items_blocks_gallery_images" (
  	"_order" integer NOT NULL,
  	"_parent_id" varchar NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"image_id" integer,
  	"caption" varchar,
  	"link_url" varchar,
  	"link_page_id" integer,
  	"link_new_tab" boolean
  );
  
  CREATE TABLE "archive_items_blocks_gallery" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"heading" varchar,
  	"description" varchar,
  	"variant" "enum_archive_items_blocks_gallery_variant" DEFAULT 'grid',
  	"columns" "enum_archive_items_blocks_gallery_columns" DEFAULT '3',
  	"gap" "enum_archive_items_blocks_gallery_gap" DEFAULT 'medium',
  	"aspect_ratio" "enum_archive_items_blocks_gallery_aspect_ratio" DEFAULT 'auto',
  	"show_captions" boolean DEFAULT true,
  	"enable_lightbox" boolean DEFAULT true,
  	"autoplay" boolean DEFAULT false,
  	"autoplay_speed" numeric DEFAULT 5000,
  	"block_name" varchar
  );
  
  CREATE TABLE "archive_items_blocks_grid_items" (
  	"_order" integer NOT NULL,
  	"_parent_id" varchar NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"image_id" integer,
  	"icon" varchar,
  	"heading" varchar,
  	"eyebrow" varchar,
  	"description" varchar,
  	"stat" varchar,
  	"link_url" varchar,
  	"link_page_id" integer,
  	"link_label" varchar,
  	"link_new_tab" boolean
  );
  
  CREATE TABLE "archive_items_blocks_grid" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"heading" varchar,
  	"description" varchar,
  	"variant" "enum_archive_items_blocks_grid_variant" DEFAULT 'cards',
  	"columns" "enum_archive_items_blocks_grid_columns" DEFAULT '3',
  	"gap" "enum_archive_items_blocks_grid_gap" DEFAULT 'medium',
  	"alignment" "enum_archive_items_blocks_grid_alignment" DEFAULT 'left',
  	"show_border" boolean DEFAULT true,
  	"show_shadow" boolean DEFAULT true,
  	"hover_effect" "enum_archive_items_blocks_grid_hover_effect" DEFAULT 'none',
  	"cta_show" boolean,
  	"cta_label" varchar,
  	"cta_url" varchar,
  	"cta_page_id" integer,
  	"block_name" varchar
  );
  
  CREATE TABLE "archive_items_blocks_timeline_events" (
  	"_order" integer NOT NULL,
  	"_parent_id" varchar NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"date" varchar,
  	"heading" varchar,
  	"description" jsonb,
  	"image_id" integer,
  	"icon" varchar,
  	"color" varchar,
  	"link_url" varchar,
  	"link_page_id" integer,
  	"link_label" varchar DEFAULT 'Learn More',
  	"link_new_tab" boolean,
  	"featured" boolean
  );
  
  CREATE TABLE "archive_items_blocks_timeline" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"heading" varchar,
  	"description" varchar,
  	"variant" "enum_archive_items_blocks_timeline_variant" DEFAULT 'vertical',
  	"line_style" "enum_archive_items_blocks_timeline_line_style" DEFAULT 'solid',
  	"marker_style" "enum_archive_items_blocks_timeline_marker_style" DEFAULT 'circle',
  	"show_connectors" boolean DEFAULT true,
  	"show_dates" boolean DEFAULT true,
  	"animate_on_scroll" boolean DEFAULT true,
  	"sort_order" "enum_archive_items_blocks_timeline_sort_order" DEFAULT 'chronological',
  	"background_color" "enum_archive_items_blocks_timeline_background_color" DEFAULT 'transparent',
  	"block_name" varchar
  );
  
  CREATE TABLE "archive_items" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"title" varchar,
  	"featured_image_id" integer,
  	"excerpt" varchar,
  	"rich_content" jsonb,
  	"specifications_height" varchar,
  	"specifications_width" varchar,
  	"specifications_depth" varchar,
  	"specifications_weight" varchar,
  	"specifications_materials" varchar,
  	"specifications_condition" varchar,
  	"date_created" varchar,
  	"date_acquired" timestamp(3) with time zone,
  	"provenance" jsonb,
  	"catalog_number" varchar,
  	"slug" varchar,
  	"featured" boolean,
  	"on_display" boolean,
  	"location" varchar,
  	"template" "enum_archive_items_template" DEFAULT 'detail',
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"_status" "enum_archive_items_status" DEFAULT 'draft'
  );
  
  CREATE TABLE "archive_items_rels" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"order" integer,
  	"parent_id" integer NOT NULL,
  	"path" varchar NOT NULL,
  	"people_id" integer,
  	"places_id" integer,
  	"archive_items_id" integer,
  	"categories_id" integer,
  	"tags_id" integer,
  	"posts_id" integer,
  	"pages_id" integer
  );
  
  CREATE TABLE "_archive_items_v_version_gallery" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"image_id" integer,
  	"caption" varchar,
  	"_uuid" varchar
  );
  
  CREATE TABLE "_archive_items_v_blocks_hero_links" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"label" varchar,
  	"url" varchar,
  	"page_id" integer,
  	"variant" "enum__archive_items_v_blocks_hero_links_variant" DEFAULT 'primary',
  	"new_tab" boolean,
  	"_uuid" varchar
  );
  
  CREATE TABLE "_archive_items_v_blocks_hero" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"variant" "enum__archive_items_v_blocks_hero_variant" DEFAULT 'standard',
  	"eyebrow" varchar,
  	"heading" varchar,
  	"description" varchar,
  	"image_id" integer,
  	"video_url" varchar,
  	"overlay" "enum__archive_items_v_blocks_hero_overlay" DEFAULT 'dark',
  	"text_align" "enum__archive_items_v_blocks_hero_text_align" DEFAULT 'center',
  	"_uuid" varchar,
  	"block_name" varchar
  );
  
  CREATE TABLE "_archive_items_v_blocks_content_columns" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"size" "enum__archive_items_v_blocks_content_columns_size" DEFAULT 'full',
  	"rich_text" jsonb,
  	"enable_link" boolean,
  	"link_label" varchar,
  	"link_url" varchar,
  	"link_page_id" integer,
  	"link_new_tab" boolean,
  	"_uuid" varchar
  );
  
  CREATE TABLE "_archive_items_v_blocks_content" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"background_color" "enum__archive_items_v_blocks_content_background_color" DEFAULT 'none',
  	"padding_top" "enum__archive_items_v_blocks_content_padding_top" DEFAULT 'medium',
  	"padding_bottom" "enum__archive_items_v_blocks_content_padding_bottom" DEFAULT 'medium',
  	"_uuid" varchar,
  	"block_name" varchar
  );
  
  CREATE TABLE "_archive_items_v_blocks_media" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"media_id" integer,
  	"caption" varchar,
  	"size" "enum__archive_items_v_blocks_media_size" DEFAULT 'default',
  	"position" "enum__archive_items_v_blocks_media_position" DEFAULT 'center',
  	"enable_link" boolean,
  	"link_url" varchar,
  	"link_page_id" integer,
  	"link_new_tab" boolean,
  	"_uuid" varchar,
  	"block_name" varchar
  );
  
  CREATE TABLE "_archive_items_v_blocks_cta_links" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"label" varchar,
  	"url" varchar,
  	"page_id" integer,
  	"variant" "enum__archive_items_v_blocks_cta_links_variant" DEFAULT 'primary',
  	"new_tab" boolean,
  	"_uuid" varchar
  );
  
  CREATE TABLE "_archive_items_v_blocks_cta" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"variant" "enum__archive_items_v_blocks_cta_variant" DEFAULT 'standard',
  	"heading" varchar,
  	"description" varchar,
  	"image_id" integer,
  	"background_color" "enum__archive_items_v_blocks_cta_background_color" DEFAULT 'none',
  	"_uuid" varchar,
  	"block_name" varchar
  );
  
  CREATE TABLE "_archive_items_v_blocks_archive" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"heading" varchar,
  	"description" varchar,
  	"populate_by" "enum__archive_items_v_blocks_archive_populate_by" DEFAULT 'collection',
  	"relation_to" "enum__archive_items_v_blocks_archive_relation_to" DEFAULT 'posts',
  	"limit" numeric DEFAULT 6,
  	"variant" "enum__archive_items_v_blocks_archive_variant" DEFAULT 'grid',
  	"columns" "enum__archive_items_v_blocks_archive_columns" DEFAULT '3',
  	"show_image" boolean DEFAULT true,
  	"show_excerpt" boolean DEFAULT true,
  	"show_date" boolean DEFAULT true,
  	"show_author" boolean DEFAULT false,
  	"link_show" boolean,
  	"link_label" varchar DEFAULT 'View All',
  	"link_url" varchar,
  	"_uuid" varchar,
  	"block_name" varchar
  );
  
  CREATE TABLE "_archive_items_v_blocks_form" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"form_id" integer,
  	"enable_intro" boolean,
  	"intro_content" jsonb,
  	"variant" "enum__archive_items_v_blocks_form_variant" DEFAULT 'default',
  	"background_color" "enum__archive_items_v_blocks_form_background_color" DEFAULT 'none',
  	"_uuid" varchar,
  	"block_name" varchar
  );
  
  CREATE TABLE "_archive_items_v_blocks_gallery_images" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"image_id" integer,
  	"caption" varchar,
  	"link_url" varchar,
  	"link_page_id" integer,
  	"link_new_tab" boolean,
  	"_uuid" varchar
  );
  
  CREATE TABLE "_archive_items_v_blocks_gallery" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"heading" varchar,
  	"description" varchar,
  	"variant" "enum__archive_items_v_blocks_gallery_variant" DEFAULT 'grid',
  	"columns" "enum__archive_items_v_blocks_gallery_columns" DEFAULT '3',
  	"gap" "enum__archive_items_v_blocks_gallery_gap" DEFAULT 'medium',
  	"aspect_ratio" "enum__archive_items_v_blocks_gallery_aspect_ratio" DEFAULT 'auto',
  	"show_captions" boolean DEFAULT true,
  	"enable_lightbox" boolean DEFAULT true,
  	"autoplay" boolean DEFAULT false,
  	"autoplay_speed" numeric DEFAULT 5000,
  	"_uuid" varchar,
  	"block_name" varchar
  );
  
  CREATE TABLE "_archive_items_v_blocks_grid_items" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"image_id" integer,
  	"icon" varchar,
  	"heading" varchar,
  	"eyebrow" varchar,
  	"description" varchar,
  	"stat" varchar,
  	"link_url" varchar,
  	"link_page_id" integer,
  	"link_label" varchar,
  	"link_new_tab" boolean,
  	"_uuid" varchar
  );
  
  CREATE TABLE "_archive_items_v_blocks_grid" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"heading" varchar,
  	"description" varchar,
  	"variant" "enum__archive_items_v_blocks_grid_variant" DEFAULT 'cards',
  	"columns" "enum__archive_items_v_blocks_grid_columns" DEFAULT '3',
  	"gap" "enum__archive_items_v_blocks_grid_gap" DEFAULT 'medium',
  	"alignment" "enum__archive_items_v_blocks_grid_alignment" DEFAULT 'left',
  	"show_border" boolean DEFAULT true,
  	"show_shadow" boolean DEFAULT true,
  	"hover_effect" "enum__archive_items_v_blocks_grid_hover_effect" DEFAULT 'none',
  	"cta_show" boolean,
  	"cta_label" varchar,
  	"cta_url" varchar,
  	"cta_page_id" integer,
  	"_uuid" varchar,
  	"block_name" varchar
  );
  
  CREATE TABLE "_archive_items_v_blocks_timeline_events" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"date" varchar,
  	"heading" varchar,
  	"description" jsonb,
  	"image_id" integer,
  	"icon" varchar,
  	"color" varchar,
  	"link_url" varchar,
  	"link_page_id" integer,
  	"link_label" varchar DEFAULT 'Learn More',
  	"link_new_tab" boolean,
  	"featured" boolean,
  	"_uuid" varchar
  );
  
  CREATE TABLE "_archive_items_v_blocks_timeline" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"heading" varchar,
  	"description" varchar,
  	"variant" "enum__archive_items_v_blocks_timeline_variant" DEFAULT 'vertical',
  	"line_style" "enum__archive_items_v_blocks_timeline_line_style" DEFAULT 'solid',
  	"marker_style" "enum__archive_items_v_blocks_timeline_marker_style" DEFAULT 'circle',
  	"show_connectors" boolean DEFAULT true,
  	"show_dates" boolean DEFAULT true,
  	"animate_on_scroll" boolean DEFAULT true,
  	"sort_order" "enum__archive_items_v_blocks_timeline_sort_order" DEFAULT 'chronological',
  	"background_color" "enum__archive_items_v_blocks_timeline_background_color" DEFAULT 'transparent',
  	"_uuid" varchar,
  	"block_name" varchar
  );
  
  CREATE TABLE "_archive_items_v" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"parent_id" integer,
  	"version_title" varchar,
  	"version_featured_image_id" integer,
  	"version_excerpt" varchar,
  	"version_rich_content" jsonb,
  	"version_specifications_height" varchar,
  	"version_specifications_width" varchar,
  	"version_specifications_depth" varchar,
  	"version_specifications_weight" varchar,
  	"version_specifications_materials" varchar,
  	"version_specifications_condition" varchar,
  	"version_date_created" varchar,
  	"version_date_acquired" timestamp(3) with time zone,
  	"version_provenance" jsonb,
  	"version_catalog_number" varchar,
  	"version_slug" varchar,
  	"version_featured" boolean,
  	"version_on_display" boolean,
  	"version_location" varchar,
  	"version_template" "enum__archive_items_v_version_template" DEFAULT 'detail',
  	"version_updated_at" timestamp(3) with time zone,
  	"version_created_at" timestamp(3) with time zone,
  	"version__status" "enum__archive_items_v_version_status" DEFAULT 'draft',
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"latest" boolean,
  	"autosave" boolean
  );
  
  CREATE TABLE "_archive_items_v_rels" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"order" integer,
  	"parent_id" integer NOT NULL,
  	"path" varchar NOT NULL,
  	"people_id" integer,
  	"places_id" integer,
  	"archive_items_id" integer,
  	"categories_id" integer,
  	"tags_id" integer,
  	"posts_id" integer,
  	"pages_id" integer
  );
  
  CREATE TABLE "people_role" (
  	"order" integer NOT NULL,
  	"parent_id" integer NOT NULL,
  	"value" "enum_people_role",
  	"id" serial PRIMARY KEY NOT NULL
  );
  
  CREATE TABLE "people_movements" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"movement" varchar
  );
  
  CREATE TABLE "people_social_links" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"platform" "enum_people_social_links_platform",
  	"url" varchar
  );
  
  CREATE TABLE "people_blocks_hero_links" (
  	"_order" integer NOT NULL,
  	"_parent_id" varchar NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"label" varchar,
  	"url" varchar,
  	"page_id" integer,
  	"variant" "enum_people_blocks_hero_links_variant" DEFAULT 'primary',
  	"new_tab" boolean
  );
  
  CREATE TABLE "people_blocks_hero" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"variant" "enum_people_blocks_hero_variant" DEFAULT 'standard',
  	"eyebrow" varchar,
  	"heading" varchar,
  	"description" varchar,
  	"image_id" integer,
  	"video_url" varchar,
  	"overlay" "enum_people_blocks_hero_overlay" DEFAULT 'dark',
  	"text_align" "enum_people_blocks_hero_text_align" DEFAULT 'center',
  	"block_name" varchar
  );
  
  CREATE TABLE "people_blocks_content_columns" (
  	"_order" integer NOT NULL,
  	"_parent_id" varchar NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"size" "enum_people_blocks_content_columns_size" DEFAULT 'full',
  	"rich_text" jsonb,
  	"enable_link" boolean,
  	"link_label" varchar,
  	"link_url" varchar,
  	"link_page_id" integer,
  	"link_new_tab" boolean
  );
  
  CREATE TABLE "people_blocks_content" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"background_color" "enum_people_blocks_content_background_color" DEFAULT 'none',
  	"padding_top" "enum_people_blocks_content_padding_top" DEFAULT 'medium',
  	"padding_bottom" "enum_people_blocks_content_padding_bottom" DEFAULT 'medium',
  	"block_name" varchar
  );
  
  CREATE TABLE "people_blocks_media" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"media_id" integer,
  	"caption" varchar,
  	"size" "enum_people_blocks_media_size" DEFAULT 'default',
  	"position" "enum_people_blocks_media_position" DEFAULT 'center',
  	"enable_link" boolean,
  	"link_url" varchar,
  	"link_page_id" integer,
  	"link_new_tab" boolean,
  	"block_name" varchar
  );
  
  CREATE TABLE "people_blocks_cta_links" (
  	"_order" integer NOT NULL,
  	"_parent_id" varchar NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"label" varchar,
  	"url" varchar,
  	"page_id" integer,
  	"variant" "enum_people_blocks_cta_links_variant" DEFAULT 'primary',
  	"new_tab" boolean
  );
  
  CREATE TABLE "people_blocks_cta" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"variant" "enum_people_blocks_cta_variant" DEFAULT 'standard',
  	"heading" varchar,
  	"description" varchar,
  	"image_id" integer,
  	"background_color" "enum_people_blocks_cta_background_color" DEFAULT 'none',
  	"block_name" varchar
  );
  
  CREATE TABLE "people_blocks_quote" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"quote" varchar,
  	"author" varchar,
  	"role" varchar,
  	"align" "enum_people_blocks_quote_align" DEFAULT 'left',
  	"variant" "enum_people_blocks_quote_variant" DEFAULT 'simple',
  	"block_name" varchar
  );
  
  CREATE TABLE "people_blocks_features_items" (
  	"_order" integer NOT NULL,
  	"_parent_id" varchar NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"heading" varchar,
  	"description" varchar,
  	"icon" varchar,
  	"media_id" integer
  );
  
  CREATE TABLE "people_blocks_features" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"heading" varchar,
  	"description" varchar,
  	"variant" "enum_people_blocks_features_variant" DEFAULT 'grid',
  	"block_name" varchar
  );
  
  CREATE TABLE "people_blocks_stats_items" (
  	"_order" integer NOT NULL,
  	"_parent_id" varchar NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"value" varchar,
  	"label" varchar,
  	"description" varchar
  );
  
  CREATE TABLE "people_blocks_stats" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"heading" varchar,
  	"description" varchar,
  	"variant" "enum_people_blocks_stats_variant" DEFAULT 'grid',
  	"block_name" varchar
  );
  
  CREATE TABLE "people_blocks_logo_cloud_items" (
  	"_order" integer NOT NULL,
  	"_parent_id" varchar NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"media_id" integer,
  	"label" varchar,
  	"url" varchar
  );
  
  CREATE TABLE "people_blocks_logo_cloud" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"heading" varchar,
  	"description" varchar,
  	"variant" "enum_people_blocks_logo_cloud_variant" DEFAULT 'grid',
  	"block_name" varchar
  );
  
  CREATE TABLE "people_blocks_testimonials_items" (
  	"_order" integer NOT NULL,
  	"_parent_id" varchar NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"quote" varchar,
  	"name" varchar,
  	"role" varchar,
  	"company" varchar,
  	"avatar_id" integer,
  	"rating" numeric
  );
  
  CREATE TABLE "people_blocks_testimonials" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"heading" varchar,
  	"description" varchar,
  	"variant" "enum_people_blocks_testimonials_variant" DEFAULT 'standard',
  	"block_name" varchar
  );
  
  CREATE TABLE "people_blocks_faq_items" (
  	"_order" integer NOT NULL,
  	"_parent_id" varchar NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"question" varchar,
  	"answer" jsonb
  );
  
  CREATE TABLE "people_blocks_faq" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"heading" varchar,
  	"description" varchar,
  	"variant" "enum_people_blocks_faq_variant" DEFAULT 'accordion',
  	"block_name" varchar
  );
  
  CREATE TABLE "people_blocks_pricing_plans_features" (
  	"_order" integer NOT NULL,
  	"_parent_id" varchar NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"feature" varchar
  );
  
  CREATE TABLE "people_blocks_pricing_plans_links" (
  	"_order" integer NOT NULL,
  	"_parent_id" varchar NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"label" varchar,
  	"url" varchar,
  	"page_id" integer,
  	"variant" "enum_people_blocks_pricing_plans_links_variant" DEFAULT 'primary'
  );
  
  CREATE TABLE "people_blocks_pricing_plans" (
  	"_order" integer NOT NULL,
  	"_parent_id" varchar NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"name" varchar,
  	"price" varchar,
  	"period" varchar DEFAULT 'per month',
  	"description" varchar,
  	"featured" boolean
  );
  
  CREATE TABLE "people_blocks_pricing" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"heading" varchar,
  	"description" varchar,
  	"variant" "enum_people_blocks_pricing_variant" DEFAULT 'cards',
  	"block_name" varchar
  );
  
  CREATE TABLE "people_blocks_team_items_socials" (
  	"_order" integer NOT NULL,
  	"_parent_id" varchar NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"label" varchar,
  	"url" varchar
  );
  
  CREATE TABLE "people_blocks_team_items" (
  	"_order" integer NOT NULL,
  	"_parent_id" varchar NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"name" varchar,
  	"role" varchar,
  	"bio" varchar,
  	"photo_id" integer
  );
  
  CREATE TABLE "people_blocks_team" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"heading" varchar,
  	"description" varchar,
  	"variant" "enum_people_blocks_team_variant" DEFAULT 'grid',
  	"block_name" varchar
  );
  
  CREATE TABLE "people_blocks_embed" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"heading" varchar,
  	"url" varchar,
  	"caption" varchar,
  	"aspect_ratio" "enum_people_blocks_embed_aspect_ratio" DEFAULT '16:9',
  	"block_name" varchar
  );
  
  CREATE TABLE "people_blocks_archive" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"heading" varchar,
  	"description" varchar,
  	"populate_by" "enum_people_blocks_archive_populate_by" DEFAULT 'collection',
  	"relation_to" "enum_people_blocks_archive_relation_to" DEFAULT 'posts',
  	"limit" numeric DEFAULT 6,
  	"variant" "enum_people_blocks_archive_variant" DEFAULT 'grid',
  	"columns" "enum_people_blocks_archive_columns" DEFAULT '3',
  	"show_image" boolean DEFAULT true,
  	"show_excerpt" boolean DEFAULT true,
  	"show_date" boolean DEFAULT true,
  	"show_author" boolean DEFAULT false,
  	"link_show" boolean,
  	"link_label" varchar DEFAULT 'View All',
  	"link_url" varchar,
  	"block_name" varchar
  );
  
  CREATE TABLE "people_blocks_form" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"form_id" integer,
  	"enable_intro" boolean,
  	"intro_content" jsonb,
  	"variant" "enum_people_blocks_form_variant" DEFAULT 'default',
  	"background_color" "enum_people_blocks_form_background_color" DEFAULT 'none',
  	"block_name" varchar
  );
  
  CREATE TABLE "people_blocks_gallery_images" (
  	"_order" integer NOT NULL,
  	"_parent_id" varchar NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"image_id" integer,
  	"caption" varchar,
  	"link_url" varchar,
  	"link_page_id" integer,
  	"link_new_tab" boolean
  );
  
  CREATE TABLE "people_blocks_gallery" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"heading" varchar,
  	"description" varchar,
  	"variant" "enum_people_blocks_gallery_variant" DEFAULT 'grid',
  	"columns" "enum_people_blocks_gallery_columns" DEFAULT '3',
  	"gap" "enum_people_blocks_gallery_gap" DEFAULT 'medium',
  	"aspect_ratio" "enum_people_blocks_gallery_aspect_ratio" DEFAULT 'auto',
  	"show_captions" boolean DEFAULT true,
  	"enable_lightbox" boolean DEFAULT true,
  	"autoplay" boolean DEFAULT false,
  	"autoplay_speed" numeric DEFAULT 5000,
  	"block_name" varchar
  );
  
  CREATE TABLE "people_blocks_grid_items" (
  	"_order" integer NOT NULL,
  	"_parent_id" varchar NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"image_id" integer,
  	"icon" varchar,
  	"heading" varchar,
  	"eyebrow" varchar,
  	"description" varchar,
  	"stat" varchar,
  	"link_url" varchar,
  	"link_page_id" integer,
  	"link_label" varchar,
  	"link_new_tab" boolean
  );
  
  CREATE TABLE "people_blocks_grid" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"heading" varchar,
  	"description" varchar,
  	"variant" "enum_people_blocks_grid_variant" DEFAULT 'cards',
  	"columns" "enum_people_blocks_grid_columns" DEFAULT '3',
  	"gap" "enum_people_blocks_grid_gap" DEFAULT 'medium',
  	"alignment" "enum_people_blocks_grid_alignment" DEFAULT 'left',
  	"show_border" boolean DEFAULT true,
  	"show_shadow" boolean DEFAULT true,
  	"hover_effect" "enum_people_blocks_grid_hover_effect" DEFAULT 'none',
  	"cta_show" boolean,
  	"cta_label" varchar,
  	"cta_url" varchar,
  	"cta_page_id" integer,
  	"block_name" varchar
  );
  
  CREATE TABLE "people_blocks_timeline_events" (
  	"_order" integer NOT NULL,
  	"_parent_id" varchar NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"date" varchar,
  	"heading" varchar,
  	"description" jsonb,
  	"image_id" integer,
  	"icon" varchar,
  	"color" varchar,
  	"link_url" varchar,
  	"link_page_id" integer,
  	"link_label" varchar DEFAULT 'Learn More',
  	"link_new_tab" boolean,
  	"featured" boolean
  );
  
  CREATE TABLE "people_blocks_timeline" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"heading" varchar,
  	"description" varchar,
  	"variant" "enum_people_blocks_timeline_variant" DEFAULT 'vertical',
  	"line_style" "enum_people_blocks_timeline_line_style" DEFAULT 'solid',
  	"marker_style" "enum_people_blocks_timeline_marker_style" DEFAULT 'circle',
  	"show_connectors" boolean DEFAULT true,
  	"show_dates" boolean DEFAULT true,
  	"animate_on_scroll" boolean DEFAULT true,
  	"sort_order" "enum_people_blocks_timeline_sort_order" DEFAULT 'chronological',
  	"background_color" "enum_people_blocks_timeline_background_color" DEFAULT 'transparent',
  	"block_name" varchar
  );
  
  CREATE TABLE "people_blocks_spacer" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"style" "enum_people_blocks_spacer_style" DEFAULT 'space',
  	"size" "enum_people_blocks_spacer_size" DEFAULT 'md',
  	"line_style" "enum_people_blocks_spacer_line_style" DEFAULT 'solid',
  	"block_name" varchar
  );
  
  CREATE TABLE "people_blocks_html" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"html" varchar,
  	"block_name" varchar
  );
  
  CREATE TABLE "people" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"name" varchar,
  	"portrait_id" integer,
  	"short_bio" varchar,
  	"biography" jsonb,
  	"birth_date" varchar,
  	"death_date" varchar,
  	"birth_place_id" integer,
  	"death_place_id" integer,
  	"nationality" varchar,
  	"email" varchar,
  	"phone" varchar,
  	"website" varchar,
  	"slug" varchar,
  	"template" "enum_people_template" DEFAULT 'profile',
  	"featured" boolean,
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"_status" "enum_people_status" DEFAULT 'draft'
  );
  
  CREATE TABLE "people_rels" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"order" integer,
  	"parent_id" integer NOT NULL,
  	"path" varchar NOT NULL,
  	"people_id" integer,
  	"categories_id" integer,
  	"tags_id" integer,
  	"posts_id" integer,
  	"pages_id" integer
  );
  
  CREATE TABLE "_people_v_version_role" (
  	"order" integer NOT NULL,
  	"parent_id" integer NOT NULL,
  	"value" "enum__people_v_version_role",
  	"id" serial PRIMARY KEY NOT NULL
  );
  
  CREATE TABLE "_people_v_version_movements" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"movement" varchar,
  	"_uuid" varchar
  );
  
  CREATE TABLE "_people_v_version_social_links" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"platform" "enum__people_v_version_social_links_platform",
  	"url" varchar,
  	"_uuid" varchar
  );
  
  CREATE TABLE "_people_v_blocks_hero_links" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"label" varchar,
  	"url" varchar,
  	"page_id" integer,
  	"variant" "enum__people_v_blocks_hero_links_variant" DEFAULT 'primary',
  	"new_tab" boolean,
  	"_uuid" varchar
  );
  
  CREATE TABLE "_people_v_blocks_hero" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"variant" "enum__people_v_blocks_hero_variant" DEFAULT 'standard',
  	"eyebrow" varchar,
  	"heading" varchar,
  	"description" varchar,
  	"image_id" integer,
  	"video_url" varchar,
  	"overlay" "enum__people_v_blocks_hero_overlay" DEFAULT 'dark',
  	"text_align" "enum__people_v_blocks_hero_text_align" DEFAULT 'center',
  	"_uuid" varchar,
  	"block_name" varchar
  );
  
  CREATE TABLE "_people_v_blocks_content_columns" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"size" "enum__people_v_blocks_content_columns_size" DEFAULT 'full',
  	"rich_text" jsonb,
  	"enable_link" boolean,
  	"link_label" varchar,
  	"link_url" varchar,
  	"link_page_id" integer,
  	"link_new_tab" boolean,
  	"_uuid" varchar
  );
  
  CREATE TABLE "_people_v_blocks_content" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"background_color" "enum__people_v_blocks_content_background_color" DEFAULT 'none',
  	"padding_top" "enum__people_v_blocks_content_padding_top" DEFAULT 'medium',
  	"padding_bottom" "enum__people_v_blocks_content_padding_bottom" DEFAULT 'medium',
  	"_uuid" varchar,
  	"block_name" varchar
  );
  
  CREATE TABLE "_people_v_blocks_media" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"media_id" integer,
  	"caption" varchar,
  	"size" "enum__people_v_blocks_media_size" DEFAULT 'default',
  	"position" "enum__people_v_blocks_media_position" DEFAULT 'center',
  	"enable_link" boolean,
  	"link_url" varchar,
  	"link_page_id" integer,
  	"link_new_tab" boolean,
  	"_uuid" varchar,
  	"block_name" varchar
  );
  
  CREATE TABLE "_people_v_blocks_cta_links" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"label" varchar,
  	"url" varchar,
  	"page_id" integer,
  	"variant" "enum__people_v_blocks_cta_links_variant" DEFAULT 'primary',
  	"new_tab" boolean,
  	"_uuid" varchar
  );
  
  CREATE TABLE "_people_v_blocks_cta" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"variant" "enum__people_v_blocks_cta_variant" DEFAULT 'standard',
  	"heading" varchar,
  	"description" varchar,
  	"image_id" integer,
  	"background_color" "enum__people_v_blocks_cta_background_color" DEFAULT 'none',
  	"_uuid" varchar,
  	"block_name" varchar
  );
  
  CREATE TABLE "_people_v_blocks_quote" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"quote" varchar,
  	"author" varchar,
  	"role" varchar,
  	"align" "enum__people_v_blocks_quote_align" DEFAULT 'left',
  	"variant" "enum__people_v_blocks_quote_variant" DEFAULT 'simple',
  	"_uuid" varchar,
  	"block_name" varchar
  );
  
  CREATE TABLE "_people_v_blocks_features_items" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"heading" varchar,
  	"description" varchar,
  	"icon" varchar,
  	"media_id" integer,
  	"_uuid" varchar
  );
  
  CREATE TABLE "_people_v_blocks_features" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"heading" varchar,
  	"description" varchar,
  	"variant" "enum__people_v_blocks_features_variant" DEFAULT 'grid',
  	"_uuid" varchar,
  	"block_name" varchar
  );
  
  CREATE TABLE "_people_v_blocks_stats_items" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"value" varchar,
  	"label" varchar,
  	"description" varchar,
  	"_uuid" varchar
  );
  
  CREATE TABLE "_people_v_blocks_stats" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"heading" varchar,
  	"description" varchar,
  	"variant" "enum__people_v_blocks_stats_variant" DEFAULT 'grid',
  	"_uuid" varchar,
  	"block_name" varchar
  );
  
  CREATE TABLE "_people_v_blocks_logo_cloud_items" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"media_id" integer,
  	"label" varchar,
  	"url" varchar,
  	"_uuid" varchar
  );
  
  CREATE TABLE "_people_v_blocks_logo_cloud" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"heading" varchar,
  	"description" varchar,
  	"variant" "enum__people_v_blocks_logo_cloud_variant" DEFAULT 'grid',
  	"_uuid" varchar,
  	"block_name" varchar
  );
  
  CREATE TABLE "_people_v_blocks_testimonials_items" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"quote" varchar,
  	"name" varchar,
  	"role" varchar,
  	"company" varchar,
  	"avatar_id" integer,
  	"rating" numeric,
  	"_uuid" varchar
  );
  
  CREATE TABLE "_people_v_blocks_testimonials" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"heading" varchar,
  	"description" varchar,
  	"variant" "enum__people_v_blocks_testimonials_variant" DEFAULT 'standard',
  	"_uuid" varchar,
  	"block_name" varchar
  );
  
  CREATE TABLE "_people_v_blocks_faq_items" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"question" varchar,
  	"answer" jsonb,
  	"_uuid" varchar
  );
  
  CREATE TABLE "_people_v_blocks_faq" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"heading" varchar,
  	"description" varchar,
  	"variant" "enum__people_v_blocks_faq_variant" DEFAULT 'accordion',
  	"_uuid" varchar,
  	"block_name" varchar
  );
  
  CREATE TABLE "_people_v_blocks_pricing_plans_features" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"feature" varchar,
  	"_uuid" varchar
  );
  
  CREATE TABLE "_people_v_blocks_pricing_plans_links" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"label" varchar,
  	"url" varchar,
  	"page_id" integer,
  	"variant" "enum__people_v_blocks_pricing_plans_links_variant" DEFAULT 'primary',
  	"_uuid" varchar
  );
  
  CREATE TABLE "_people_v_blocks_pricing_plans" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"name" varchar,
  	"price" varchar,
  	"period" varchar DEFAULT 'per month',
  	"description" varchar,
  	"featured" boolean,
  	"_uuid" varchar
  );
  
  CREATE TABLE "_people_v_blocks_pricing" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"heading" varchar,
  	"description" varchar,
  	"variant" "enum__people_v_blocks_pricing_variant" DEFAULT 'cards',
  	"_uuid" varchar,
  	"block_name" varchar
  );
  
  CREATE TABLE "_people_v_blocks_team_items_socials" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"label" varchar,
  	"url" varchar,
  	"_uuid" varchar
  );
  
  CREATE TABLE "_people_v_blocks_team_items" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"name" varchar,
  	"role" varchar,
  	"bio" varchar,
  	"photo_id" integer,
  	"_uuid" varchar
  );
  
  CREATE TABLE "_people_v_blocks_team" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"heading" varchar,
  	"description" varchar,
  	"variant" "enum__people_v_blocks_team_variant" DEFAULT 'grid',
  	"_uuid" varchar,
  	"block_name" varchar
  );
  
  CREATE TABLE "_people_v_blocks_embed" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"heading" varchar,
  	"url" varchar,
  	"caption" varchar,
  	"aspect_ratio" "enum__people_v_blocks_embed_aspect_ratio" DEFAULT '16:9',
  	"_uuid" varchar,
  	"block_name" varchar
  );
  
  CREATE TABLE "_people_v_blocks_archive" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"heading" varchar,
  	"description" varchar,
  	"populate_by" "enum__people_v_blocks_archive_populate_by" DEFAULT 'collection',
  	"relation_to" "enum__people_v_blocks_archive_relation_to" DEFAULT 'posts',
  	"limit" numeric DEFAULT 6,
  	"variant" "enum__people_v_blocks_archive_variant" DEFAULT 'grid',
  	"columns" "enum__people_v_blocks_archive_columns" DEFAULT '3',
  	"show_image" boolean DEFAULT true,
  	"show_excerpt" boolean DEFAULT true,
  	"show_date" boolean DEFAULT true,
  	"show_author" boolean DEFAULT false,
  	"link_show" boolean,
  	"link_label" varchar DEFAULT 'View All',
  	"link_url" varchar,
  	"_uuid" varchar,
  	"block_name" varchar
  );
  
  CREATE TABLE "_people_v_blocks_form" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"form_id" integer,
  	"enable_intro" boolean,
  	"intro_content" jsonb,
  	"variant" "enum__people_v_blocks_form_variant" DEFAULT 'default',
  	"background_color" "enum__people_v_blocks_form_background_color" DEFAULT 'none',
  	"_uuid" varchar,
  	"block_name" varchar
  );
  
  CREATE TABLE "_people_v_blocks_gallery_images" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"image_id" integer,
  	"caption" varchar,
  	"link_url" varchar,
  	"link_page_id" integer,
  	"link_new_tab" boolean,
  	"_uuid" varchar
  );
  
  CREATE TABLE "_people_v_blocks_gallery" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"heading" varchar,
  	"description" varchar,
  	"variant" "enum__people_v_blocks_gallery_variant" DEFAULT 'grid',
  	"columns" "enum__people_v_blocks_gallery_columns" DEFAULT '3',
  	"gap" "enum__people_v_blocks_gallery_gap" DEFAULT 'medium',
  	"aspect_ratio" "enum__people_v_blocks_gallery_aspect_ratio" DEFAULT 'auto',
  	"show_captions" boolean DEFAULT true,
  	"enable_lightbox" boolean DEFAULT true,
  	"autoplay" boolean DEFAULT false,
  	"autoplay_speed" numeric DEFAULT 5000,
  	"_uuid" varchar,
  	"block_name" varchar
  );
  
  CREATE TABLE "_people_v_blocks_grid_items" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"image_id" integer,
  	"icon" varchar,
  	"heading" varchar,
  	"eyebrow" varchar,
  	"description" varchar,
  	"stat" varchar,
  	"link_url" varchar,
  	"link_page_id" integer,
  	"link_label" varchar,
  	"link_new_tab" boolean,
  	"_uuid" varchar
  );
  
  CREATE TABLE "_people_v_blocks_grid" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"heading" varchar,
  	"description" varchar,
  	"variant" "enum__people_v_blocks_grid_variant" DEFAULT 'cards',
  	"columns" "enum__people_v_blocks_grid_columns" DEFAULT '3',
  	"gap" "enum__people_v_blocks_grid_gap" DEFAULT 'medium',
  	"alignment" "enum__people_v_blocks_grid_alignment" DEFAULT 'left',
  	"show_border" boolean DEFAULT true,
  	"show_shadow" boolean DEFAULT true,
  	"hover_effect" "enum__people_v_blocks_grid_hover_effect" DEFAULT 'none',
  	"cta_show" boolean,
  	"cta_label" varchar,
  	"cta_url" varchar,
  	"cta_page_id" integer,
  	"_uuid" varchar,
  	"block_name" varchar
  );
  
  CREATE TABLE "_people_v_blocks_timeline_events" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"date" varchar,
  	"heading" varchar,
  	"description" jsonb,
  	"image_id" integer,
  	"icon" varchar,
  	"color" varchar,
  	"link_url" varchar,
  	"link_page_id" integer,
  	"link_label" varchar DEFAULT 'Learn More',
  	"link_new_tab" boolean,
  	"featured" boolean,
  	"_uuid" varchar
  );
  
  CREATE TABLE "_people_v_blocks_timeline" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"heading" varchar,
  	"description" varchar,
  	"variant" "enum__people_v_blocks_timeline_variant" DEFAULT 'vertical',
  	"line_style" "enum__people_v_blocks_timeline_line_style" DEFAULT 'solid',
  	"marker_style" "enum__people_v_blocks_timeline_marker_style" DEFAULT 'circle',
  	"show_connectors" boolean DEFAULT true,
  	"show_dates" boolean DEFAULT true,
  	"animate_on_scroll" boolean DEFAULT true,
  	"sort_order" "enum__people_v_blocks_timeline_sort_order" DEFAULT 'chronological',
  	"background_color" "enum__people_v_blocks_timeline_background_color" DEFAULT 'transparent',
  	"_uuid" varchar,
  	"block_name" varchar
  );
  
  CREATE TABLE "_people_v_blocks_spacer" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"style" "enum__people_v_blocks_spacer_style" DEFAULT 'space',
  	"size" "enum__people_v_blocks_spacer_size" DEFAULT 'md',
  	"line_style" "enum__people_v_blocks_spacer_line_style" DEFAULT 'solid',
  	"_uuid" varchar,
  	"block_name" varchar
  );
  
  CREATE TABLE "_people_v_blocks_html" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"html" varchar,
  	"_uuid" varchar,
  	"block_name" varchar
  );
  
  CREATE TABLE "_people_v" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"parent_id" integer,
  	"version_name" varchar,
  	"version_portrait_id" integer,
  	"version_short_bio" varchar,
  	"version_biography" jsonb,
  	"version_birth_date" varchar,
  	"version_death_date" varchar,
  	"version_birth_place_id" integer,
  	"version_death_place_id" integer,
  	"version_nationality" varchar,
  	"version_email" varchar,
  	"version_phone" varchar,
  	"version_website" varchar,
  	"version_slug" varchar,
  	"version_template" "enum__people_v_version_template" DEFAULT 'profile',
  	"version_featured" boolean,
  	"version_updated_at" timestamp(3) with time zone,
  	"version_created_at" timestamp(3) with time zone,
  	"version__status" "enum__people_v_version_status" DEFAULT 'draft',
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"latest" boolean,
  	"autosave" boolean
  );
  
  CREATE TABLE "_people_v_rels" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"order" integer,
  	"parent_id" integer NOT NULL,
  	"path" varchar NOT NULL,
  	"people_id" integer,
  	"categories_id" integer,
  	"tags_id" integer,
  	"posts_id" integer,
  	"pages_id" integer
  );
  
  CREATE TABLE "places_historical_names" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"name" varchar,
  	"period" varchar
  );
  
  CREATE TABLE "places_hours" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"day" "enum_places_hours_day",
  	"open" varchar,
  	"close" varchar,
  	"closed" boolean
  );
  
  CREATE TABLE "places_gallery" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"image_id" integer,
  	"caption" varchar
  );
  
  CREATE TABLE "places_blocks_hero_links" (
  	"_order" integer NOT NULL,
  	"_parent_id" varchar NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"label" varchar,
  	"url" varchar,
  	"page_id" integer,
  	"variant" "enum_places_blocks_hero_links_variant" DEFAULT 'primary',
  	"new_tab" boolean
  );
  
  CREATE TABLE "places_blocks_hero" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"variant" "enum_places_blocks_hero_variant" DEFAULT 'standard',
  	"eyebrow" varchar,
  	"heading" varchar,
  	"description" varchar,
  	"image_id" integer,
  	"video_url" varchar,
  	"overlay" "enum_places_blocks_hero_overlay" DEFAULT 'dark',
  	"text_align" "enum_places_blocks_hero_text_align" DEFAULT 'center',
  	"block_name" varchar
  );
  
  CREATE TABLE "places_blocks_content_columns" (
  	"_order" integer NOT NULL,
  	"_parent_id" varchar NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"size" "enum_places_blocks_content_columns_size" DEFAULT 'full',
  	"rich_text" jsonb,
  	"enable_link" boolean,
  	"link_label" varchar,
  	"link_url" varchar,
  	"link_page_id" integer,
  	"link_new_tab" boolean
  );
  
  CREATE TABLE "places_blocks_content" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"background_color" "enum_places_blocks_content_background_color" DEFAULT 'none',
  	"padding_top" "enum_places_blocks_content_padding_top" DEFAULT 'medium',
  	"padding_bottom" "enum_places_blocks_content_padding_bottom" DEFAULT 'medium',
  	"block_name" varchar
  );
  
  CREATE TABLE "places_blocks_media" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"media_id" integer,
  	"caption" varchar,
  	"size" "enum_places_blocks_media_size" DEFAULT 'default',
  	"position" "enum_places_blocks_media_position" DEFAULT 'center',
  	"enable_link" boolean,
  	"link_url" varchar,
  	"link_page_id" integer,
  	"link_new_tab" boolean,
  	"block_name" varchar
  );
  
  CREATE TABLE "places_blocks_cta_links" (
  	"_order" integer NOT NULL,
  	"_parent_id" varchar NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"label" varchar,
  	"url" varchar,
  	"page_id" integer,
  	"variant" "enum_places_blocks_cta_links_variant" DEFAULT 'primary',
  	"new_tab" boolean
  );
  
  CREATE TABLE "places_blocks_cta" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"variant" "enum_places_blocks_cta_variant" DEFAULT 'standard',
  	"heading" varchar,
  	"description" varchar,
  	"image_id" integer,
  	"background_color" "enum_places_blocks_cta_background_color" DEFAULT 'none',
  	"block_name" varchar
  );
  
  CREATE TABLE "places_blocks_quote" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"quote" varchar,
  	"author" varchar,
  	"role" varchar,
  	"align" "enum_places_blocks_quote_align" DEFAULT 'left',
  	"variant" "enum_places_blocks_quote_variant" DEFAULT 'simple',
  	"block_name" varchar
  );
  
  CREATE TABLE "places_blocks_features_items" (
  	"_order" integer NOT NULL,
  	"_parent_id" varchar NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"heading" varchar,
  	"description" varchar,
  	"icon" varchar,
  	"media_id" integer
  );
  
  CREATE TABLE "places_blocks_features" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"heading" varchar,
  	"description" varchar,
  	"variant" "enum_places_blocks_features_variant" DEFAULT 'grid',
  	"block_name" varchar
  );
  
  CREATE TABLE "places_blocks_stats_items" (
  	"_order" integer NOT NULL,
  	"_parent_id" varchar NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"value" varchar,
  	"label" varchar,
  	"description" varchar
  );
  
  CREATE TABLE "places_blocks_stats" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"heading" varchar,
  	"description" varchar,
  	"variant" "enum_places_blocks_stats_variant" DEFAULT 'grid',
  	"block_name" varchar
  );
  
  CREATE TABLE "places_blocks_logo_cloud_items" (
  	"_order" integer NOT NULL,
  	"_parent_id" varchar NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"media_id" integer,
  	"label" varchar,
  	"url" varchar
  );
  
  CREATE TABLE "places_blocks_logo_cloud" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"heading" varchar,
  	"description" varchar,
  	"variant" "enum_places_blocks_logo_cloud_variant" DEFAULT 'grid',
  	"block_name" varchar
  );
  
  CREATE TABLE "places_blocks_testimonials_items" (
  	"_order" integer NOT NULL,
  	"_parent_id" varchar NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"quote" varchar,
  	"name" varchar,
  	"role" varchar,
  	"company" varchar,
  	"avatar_id" integer,
  	"rating" numeric
  );
  
  CREATE TABLE "places_blocks_testimonials" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"heading" varchar,
  	"description" varchar,
  	"variant" "enum_places_blocks_testimonials_variant" DEFAULT 'standard',
  	"block_name" varchar
  );
  
  CREATE TABLE "places_blocks_faq_items" (
  	"_order" integer NOT NULL,
  	"_parent_id" varchar NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"question" varchar,
  	"answer" jsonb
  );
  
  CREATE TABLE "places_blocks_faq" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"heading" varchar,
  	"description" varchar,
  	"variant" "enum_places_blocks_faq_variant" DEFAULT 'accordion',
  	"block_name" varchar
  );
  
  CREATE TABLE "places_blocks_pricing_plans_features" (
  	"_order" integer NOT NULL,
  	"_parent_id" varchar NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"feature" varchar
  );
  
  CREATE TABLE "places_blocks_pricing_plans_links" (
  	"_order" integer NOT NULL,
  	"_parent_id" varchar NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"label" varchar,
  	"url" varchar,
  	"page_id" integer,
  	"variant" "enum_places_blocks_pricing_plans_links_variant" DEFAULT 'primary'
  );
  
  CREATE TABLE "places_blocks_pricing_plans" (
  	"_order" integer NOT NULL,
  	"_parent_id" varchar NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"name" varchar,
  	"price" varchar,
  	"period" varchar DEFAULT 'per month',
  	"description" varchar,
  	"featured" boolean
  );
  
  CREATE TABLE "places_blocks_pricing" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"heading" varchar,
  	"description" varchar,
  	"variant" "enum_places_blocks_pricing_variant" DEFAULT 'cards',
  	"block_name" varchar
  );
  
  CREATE TABLE "places_blocks_team_items_socials" (
  	"_order" integer NOT NULL,
  	"_parent_id" varchar NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"label" varchar,
  	"url" varchar
  );
  
  CREATE TABLE "places_blocks_team_items" (
  	"_order" integer NOT NULL,
  	"_parent_id" varchar NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"name" varchar,
  	"role" varchar,
  	"bio" varchar,
  	"photo_id" integer
  );
  
  CREATE TABLE "places_blocks_team" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"heading" varchar,
  	"description" varchar,
  	"variant" "enum_places_blocks_team_variant" DEFAULT 'grid',
  	"block_name" varchar
  );
  
  CREATE TABLE "places_blocks_embed" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"heading" varchar,
  	"url" varchar,
  	"caption" varchar,
  	"aspect_ratio" "enum_places_blocks_embed_aspect_ratio" DEFAULT '16:9',
  	"block_name" varchar
  );
  
  CREATE TABLE "places_blocks_archive" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"heading" varchar,
  	"description" varchar,
  	"populate_by" "enum_places_blocks_archive_populate_by" DEFAULT 'collection',
  	"relation_to" "enum_places_blocks_archive_relation_to" DEFAULT 'posts',
  	"limit" numeric DEFAULT 6,
  	"variant" "enum_places_blocks_archive_variant" DEFAULT 'grid',
  	"columns" "enum_places_blocks_archive_columns" DEFAULT '3',
  	"show_image" boolean DEFAULT true,
  	"show_excerpt" boolean DEFAULT true,
  	"show_date" boolean DEFAULT true,
  	"show_author" boolean DEFAULT false,
  	"link_show" boolean,
  	"link_label" varchar DEFAULT 'View All',
  	"link_url" varchar,
  	"block_name" varchar
  );
  
  CREATE TABLE "places_blocks_form" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"form_id" integer,
  	"enable_intro" boolean,
  	"intro_content" jsonb,
  	"variant" "enum_places_blocks_form_variant" DEFAULT 'default',
  	"background_color" "enum_places_blocks_form_background_color" DEFAULT 'none',
  	"block_name" varchar
  );
  
  CREATE TABLE "places_blocks_gallery_images" (
  	"_order" integer NOT NULL,
  	"_parent_id" varchar NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"image_id" integer,
  	"caption" varchar,
  	"link_url" varchar,
  	"link_page_id" integer,
  	"link_new_tab" boolean
  );
  
  CREATE TABLE "places_blocks_gallery" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"heading" varchar,
  	"description" varchar,
  	"variant" "enum_places_blocks_gallery_variant" DEFAULT 'grid',
  	"columns" "enum_places_blocks_gallery_columns" DEFAULT '3',
  	"gap" "enum_places_blocks_gallery_gap" DEFAULT 'medium',
  	"aspect_ratio" "enum_places_blocks_gallery_aspect_ratio" DEFAULT 'auto',
  	"show_captions" boolean DEFAULT true,
  	"enable_lightbox" boolean DEFAULT true,
  	"autoplay" boolean DEFAULT false,
  	"autoplay_speed" numeric DEFAULT 5000,
  	"block_name" varchar
  );
  
  CREATE TABLE "places_blocks_grid_items" (
  	"_order" integer NOT NULL,
  	"_parent_id" varchar NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"image_id" integer,
  	"icon" varchar,
  	"heading" varchar,
  	"eyebrow" varchar,
  	"description" varchar,
  	"stat" varchar,
  	"link_url" varchar,
  	"link_page_id" integer,
  	"link_label" varchar,
  	"link_new_tab" boolean
  );
  
  CREATE TABLE "places_blocks_grid" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"heading" varchar,
  	"description" varchar,
  	"variant" "enum_places_blocks_grid_variant" DEFAULT 'cards',
  	"columns" "enum_places_blocks_grid_columns" DEFAULT '3',
  	"gap" "enum_places_blocks_grid_gap" DEFAULT 'medium',
  	"alignment" "enum_places_blocks_grid_alignment" DEFAULT 'left',
  	"show_border" boolean DEFAULT true,
  	"show_shadow" boolean DEFAULT true,
  	"hover_effect" "enum_places_blocks_grid_hover_effect" DEFAULT 'none',
  	"cta_show" boolean,
  	"cta_label" varchar,
  	"cta_url" varchar,
  	"cta_page_id" integer,
  	"block_name" varchar
  );
  
  CREATE TABLE "places_blocks_timeline_events" (
  	"_order" integer NOT NULL,
  	"_parent_id" varchar NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"date" varchar,
  	"heading" varchar,
  	"description" jsonb,
  	"image_id" integer,
  	"icon" varchar,
  	"color" varchar,
  	"link_url" varchar,
  	"link_page_id" integer,
  	"link_label" varchar DEFAULT 'Learn More',
  	"link_new_tab" boolean,
  	"featured" boolean
  );
  
  CREATE TABLE "places_blocks_timeline" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"heading" varchar,
  	"description" varchar,
  	"variant" "enum_places_blocks_timeline_variant" DEFAULT 'vertical',
  	"line_style" "enum_places_blocks_timeline_line_style" DEFAULT 'solid',
  	"marker_style" "enum_places_blocks_timeline_marker_style" DEFAULT 'circle',
  	"show_connectors" boolean DEFAULT true,
  	"show_dates" boolean DEFAULT true,
  	"animate_on_scroll" boolean DEFAULT true,
  	"sort_order" "enum_places_blocks_timeline_sort_order" DEFAULT 'chronological',
  	"background_color" "enum_places_blocks_timeline_background_color" DEFAULT 'transparent',
  	"block_name" varchar
  );
  
  CREATE TABLE "places_blocks_spacer" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"style" "enum_places_blocks_spacer_style" DEFAULT 'space',
  	"size" "enum_places_blocks_spacer_size" DEFAULT 'md',
  	"line_style" "enum_places_blocks_spacer_line_style" DEFAULT 'solid',
  	"block_name" varchar
  );
  
  CREATE TABLE "places_blocks_html" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"html" varchar,
  	"block_name" varchar
  );
  
  CREATE TABLE "places" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"name" varchar,
  	"featured_image_id" integer,
  	"short_description" varchar,
  	"description" jsonb,
  	"historical_significance" jsonb,
  	"address_street" varchar,
  	"address_street2" varchar,
  	"address_city" varchar,
  	"address_region" varchar,
  	"address_postal_code" varchar,
  	"address_country" varchar,
  	"phone" varchar,
  	"email" varchar,
  	"website" varchar,
  	"slug" varchar,
  	"template" "enum_places_template" DEFAULT 'location',
  	"place_type" "enum_places_place_type",
  	"featured" boolean,
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"_status" "enum_places_status" DEFAULT 'draft'
  );
  
  CREATE TABLE "places_rels" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"order" integer,
  	"parent_id" integer NOT NULL,
  	"path" varchar NOT NULL,
  	"places_id" integer,
  	"categories_id" integer,
  	"tags_id" integer,
  	"posts_id" integer,
  	"pages_id" integer
  );
  
  CREATE TABLE "_places_v_version_historical_names" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"name" varchar,
  	"period" varchar,
  	"_uuid" varchar
  );
  
  CREATE TABLE "_places_v_version_hours" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"day" "enum__places_v_version_hours_day",
  	"open" varchar,
  	"close" varchar,
  	"closed" boolean,
  	"_uuid" varchar
  );
  
  CREATE TABLE "_places_v_version_gallery" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"image_id" integer,
  	"caption" varchar,
  	"_uuid" varchar
  );
  
  CREATE TABLE "_places_v_blocks_hero_links" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"label" varchar,
  	"url" varchar,
  	"page_id" integer,
  	"variant" "enum__places_v_blocks_hero_links_variant" DEFAULT 'primary',
  	"new_tab" boolean,
  	"_uuid" varchar
  );
  
  CREATE TABLE "_places_v_blocks_hero" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"variant" "enum__places_v_blocks_hero_variant" DEFAULT 'standard',
  	"eyebrow" varchar,
  	"heading" varchar,
  	"description" varchar,
  	"image_id" integer,
  	"video_url" varchar,
  	"overlay" "enum__places_v_blocks_hero_overlay" DEFAULT 'dark',
  	"text_align" "enum__places_v_blocks_hero_text_align" DEFAULT 'center',
  	"_uuid" varchar,
  	"block_name" varchar
  );
  
  CREATE TABLE "_places_v_blocks_content_columns" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"size" "enum__places_v_blocks_content_columns_size" DEFAULT 'full',
  	"rich_text" jsonb,
  	"enable_link" boolean,
  	"link_label" varchar,
  	"link_url" varchar,
  	"link_page_id" integer,
  	"link_new_tab" boolean,
  	"_uuid" varchar
  );
  
  CREATE TABLE "_places_v_blocks_content" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"background_color" "enum__places_v_blocks_content_background_color" DEFAULT 'none',
  	"padding_top" "enum__places_v_blocks_content_padding_top" DEFAULT 'medium',
  	"padding_bottom" "enum__places_v_blocks_content_padding_bottom" DEFAULT 'medium',
  	"_uuid" varchar,
  	"block_name" varchar
  );
  
  CREATE TABLE "_places_v_blocks_media" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"media_id" integer,
  	"caption" varchar,
  	"size" "enum__places_v_blocks_media_size" DEFAULT 'default',
  	"position" "enum__places_v_blocks_media_position" DEFAULT 'center',
  	"enable_link" boolean,
  	"link_url" varchar,
  	"link_page_id" integer,
  	"link_new_tab" boolean,
  	"_uuid" varchar,
  	"block_name" varchar
  );
  
  CREATE TABLE "_places_v_blocks_cta_links" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"label" varchar,
  	"url" varchar,
  	"page_id" integer,
  	"variant" "enum__places_v_blocks_cta_links_variant" DEFAULT 'primary',
  	"new_tab" boolean,
  	"_uuid" varchar
  );
  
  CREATE TABLE "_places_v_blocks_cta" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"variant" "enum__places_v_blocks_cta_variant" DEFAULT 'standard',
  	"heading" varchar,
  	"description" varchar,
  	"image_id" integer,
  	"background_color" "enum__places_v_blocks_cta_background_color" DEFAULT 'none',
  	"_uuid" varchar,
  	"block_name" varchar
  );
  
  CREATE TABLE "_places_v_blocks_quote" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"quote" varchar,
  	"author" varchar,
  	"role" varchar,
  	"align" "enum__places_v_blocks_quote_align" DEFAULT 'left',
  	"variant" "enum__places_v_blocks_quote_variant" DEFAULT 'simple',
  	"_uuid" varchar,
  	"block_name" varchar
  );
  
  CREATE TABLE "_places_v_blocks_features_items" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"heading" varchar,
  	"description" varchar,
  	"icon" varchar,
  	"media_id" integer,
  	"_uuid" varchar
  );
  
  CREATE TABLE "_places_v_blocks_features" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"heading" varchar,
  	"description" varchar,
  	"variant" "enum__places_v_blocks_features_variant" DEFAULT 'grid',
  	"_uuid" varchar,
  	"block_name" varchar
  );
  
  CREATE TABLE "_places_v_blocks_stats_items" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"value" varchar,
  	"label" varchar,
  	"description" varchar,
  	"_uuid" varchar
  );
  
  CREATE TABLE "_places_v_blocks_stats" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"heading" varchar,
  	"description" varchar,
  	"variant" "enum__places_v_blocks_stats_variant" DEFAULT 'grid',
  	"_uuid" varchar,
  	"block_name" varchar
  );
  
  CREATE TABLE "_places_v_blocks_logo_cloud_items" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"media_id" integer,
  	"label" varchar,
  	"url" varchar,
  	"_uuid" varchar
  );
  
  CREATE TABLE "_places_v_blocks_logo_cloud" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"heading" varchar,
  	"description" varchar,
  	"variant" "enum__places_v_blocks_logo_cloud_variant" DEFAULT 'grid',
  	"_uuid" varchar,
  	"block_name" varchar
  );
  
  CREATE TABLE "_places_v_blocks_testimonials_items" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"quote" varchar,
  	"name" varchar,
  	"role" varchar,
  	"company" varchar,
  	"avatar_id" integer,
  	"rating" numeric,
  	"_uuid" varchar
  );
  
  CREATE TABLE "_places_v_blocks_testimonials" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"heading" varchar,
  	"description" varchar,
  	"variant" "enum__places_v_blocks_testimonials_variant" DEFAULT 'standard',
  	"_uuid" varchar,
  	"block_name" varchar
  );
  
  CREATE TABLE "_places_v_blocks_faq_items" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"question" varchar,
  	"answer" jsonb,
  	"_uuid" varchar
  );
  
  CREATE TABLE "_places_v_blocks_faq" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"heading" varchar,
  	"description" varchar,
  	"variant" "enum__places_v_blocks_faq_variant" DEFAULT 'accordion',
  	"_uuid" varchar,
  	"block_name" varchar
  );
  
  CREATE TABLE "_places_v_blocks_pricing_plans_features" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"feature" varchar,
  	"_uuid" varchar
  );
  
  CREATE TABLE "_places_v_blocks_pricing_plans_links" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"label" varchar,
  	"url" varchar,
  	"page_id" integer,
  	"variant" "enum__places_v_blocks_pricing_plans_links_variant" DEFAULT 'primary',
  	"_uuid" varchar
  );
  
  CREATE TABLE "_places_v_blocks_pricing_plans" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"name" varchar,
  	"price" varchar,
  	"period" varchar DEFAULT 'per month',
  	"description" varchar,
  	"featured" boolean,
  	"_uuid" varchar
  );
  
  CREATE TABLE "_places_v_blocks_pricing" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"heading" varchar,
  	"description" varchar,
  	"variant" "enum__places_v_blocks_pricing_variant" DEFAULT 'cards',
  	"_uuid" varchar,
  	"block_name" varchar
  );
  
  CREATE TABLE "_places_v_blocks_team_items_socials" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"label" varchar,
  	"url" varchar,
  	"_uuid" varchar
  );
  
  CREATE TABLE "_places_v_blocks_team_items" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"name" varchar,
  	"role" varchar,
  	"bio" varchar,
  	"photo_id" integer,
  	"_uuid" varchar
  );
  
  CREATE TABLE "_places_v_blocks_team" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"heading" varchar,
  	"description" varchar,
  	"variant" "enum__places_v_blocks_team_variant" DEFAULT 'grid',
  	"_uuid" varchar,
  	"block_name" varchar
  );
  
  CREATE TABLE "_places_v_blocks_embed" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"heading" varchar,
  	"url" varchar,
  	"caption" varchar,
  	"aspect_ratio" "enum__places_v_blocks_embed_aspect_ratio" DEFAULT '16:9',
  	"_uuid" varchar,
  	"block_name" varchar
  );
  
  CREATE TABLE "_places_v_blocks_archive" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"heading" varchar,
  	"description" varchar,
  	"populate_by" "enum__places_v_blocks_archive_populate_by" DEFAULT 'collection',
  	"relation_to" "enum__places_v_blocks_archive_relation_to" DEFAULT 'posts',
  	"limit" numeric DEFAULT 6,
  	"variant" "enum__places_v_blocks_archive_variant" DEFAULT 'grid',
  	"columns" "enum__places_v_blocks_archive_columns" DEFAULT '3',
  	"show_image" boolean DEFAULT true,
  	"show_excerpt" boolean DEFAULT true,
  	"show_date" boolean DEFAULT true,
  	"show_author" boolean DEFAULT false,
  	"link_show" boolean,
  	"link_label" varchar DEFAULT 'View All',
  	"link_url" varchar,
  	"_uuid" varchar,
  	"block_name" varchar
  );
  
  CREATE TABLE "_places_v_blocks_form" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"form_id" integer,
  	"enable_intro" boolean,
  	"intro_content" jsonb,
  	"variant" "enum__places_v_blocks_form_variant" DEFAULT 'default',
  	"background_color" "enum__places_v_blocks_form_background_color" DEFAULT 'none',
  	"_uuid" varchar,
  	"block_name" varchar
  );
  
  CREATE TABLE "_places_v_blocks_gallery_images" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"image_id" integer,
  	"caption" varchar,
  	"link_url" varchar,
  	"link_page_id" integer,
  	"link_new_tab" boolean,
  	"_uuid" varchar
  );
  
  CREATE TABLE "_places_v_blocks_gallery" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"heading" varchar,
  	"description" varchar,
  	"variant" "enum__places_v_blocks_gallery_variant" DEFAULT 'grid',
  	"columns" "enum__places_v_blocks_gallery_columns" DEFAULT '3',
  	"gap" "enum__places_v_blocks_gallery_gap" DEFAULT 'medium',
  	"aspect_ratio" "enum__places_v_blocks_gallery_aspect_ratio" DEFAULT 'auto',
  	"show_captions" boolean DEFAULT true,
  	"enable_lightbox" boolean DEFAULT true,
  	"autoplay" boolean DEFAULT false,
  	"autoplay_speed" numeric DEFAULT 5000,
  	"_uuid" varchar,
  	"block_name" varchar
  );
  
  CREATE TABLE "_places_v_blocks_grid_items" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"image_id" integer,
  	"icon" varchar,
  	"heading" varchar,
  	"eyebrow" varchar,
  	"description" varchar,
  	"stat" varchar,
  	"link_url" varchar,
  	"link_page_id" integer,
  	"link_label" varchar,
  	"link_new_tab" boolean,
  	"_uuid" varchar
  );
  
  CREATE TABLE "_places_v_blocks_grid" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"heading" varchar,
  	"description" varchar,
  	"variant" "enum__places_v_blocks_grid_variant" DEFAULT 'cards',
  	"columns" "enum__places_v_blocks_grid_columns" DEFAULT '3',
  	"gap" "enum__places_v_blocks_grid_gap" DEFAULT 'medium',
  	"alignment" "enum__places_v_blocks_grid_alignment" DEFAULT 'left',
  	"show_border" boolean DEFAULT true,
  	"show_shadow" boolean DEFAULT true,
  	"hover_effect" "enum__places_v_blocks_grid_hover_effect" DEFAULT 'none',
  	"cta_show" boolean,
  	"cta_label" varchar,
  	"cta_url" varchar,
  	"cta_page_id" integer,
  	"_uuid" varchar,
  	"block_name" varchar
  );
  
  CREATE TABLE "_places_v_blocks_timeline_events" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"date" varchar,
  	"heading" varchar,
  	"description" jsonb,
  	"image_id" integer,
  	"icon" varchar,
  	"color" varchar,
  	"link_url" varchar,
  	"link_page_id" integer,
  	"link_label" varchar DEFAULT 'Learn More',
  	"link_new_tab" boolean,
  	"featured" boolean,
  	"_uuid" varchar
  );
  
  CREATE TABLE "_places_v_blocks_timeline" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"heading" varchar,
  	"description" varchar,
  	"variant" "enum__places_v_blocks_timeline_variant" DEFAULT 'vertical',
  	"line_style" "enum__places_v_blocks_timeline_line_style" DEFAULT 'solid',
  	"marker_style" "enum__places_v_blocks_timeline_marker_style" DEFAULT 'circle',
  	"show_connectors" boolean DEFAULT true,
  	"show_dates" boolean DEFAULT true,
  	"animate_on_scroll" boolean DEFAULT true,
  	"sort_order" "enum__places_v_blocks_timeline_sort_order" DEFAULT 'chronological',
  	"background_color" "enum__places_v_blocks_timeline_background_color" DEFAULT 'transparent',
  	"_uuid" varchar,
  	"block_name" varchar
  );
  
  CREATE TABLE "_places_v_blocks_spacer" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"style" "enum__places_v_blocks_spacer_style" DEFAULT 'space',
  	"size" "enum__places_v_blocks_spacer_size" DEFAULT 'md',
  	"line_style" "enum__places_v_blocks_spacer_line_style" DEFAULT 'solid',
  	"_uuid" varchar,
  	"block_name" varchar
  );
  
  CREATE TABLE "_places_v_blocks_html" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"html" varchar,
  	"_uuid" varchar,
  	"block_name" varchar
  );
  
  CREATE TABLE "_places_v" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"parent_id" integer,
  	"version_name" varchar,
  	"version_featured_image_id" integer,
  	"version_short_description" varchar,
  	"version_description" jsonb,
  	"version_historical_significance" jsonb,
  	"version_address_street" varchar,
  	"version_address_street2" varchar,
  	"version_address_city" varchar,
  	"version_address_region" varchar,
  	"version_address_postal_code" varchar,
  	"version_address_country" varchar,
  	"version_phone" varchar,
  	"version_email" varchar,
  	"version_website" varchar,
  	"version_slug" varchar,
  	"version_template" "enum__places_v_version_template" DEFAULT 'location',
  	"version_place_type" "enum__places_v_version_place_type",
  	"version_featured" boolean,
  	"version_updated_at" timestamp(3) with time zone,
  	"version_created_at" timestamp(3) with time zone,
  	"version__status" "enum__places_v_version_status" DEFAULT 'draft',
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"latest" boolean,
  	"autosave" boolean
  );
  
  CREATE TABLE "_places_v_rels" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"order" integer,
  	"parent_id" integer NOT NULL,
  	"path" varchar NOT NULL,
  	"places_id" integer,
  	"categories_id" integer,
  	"tags_id" integer,
  	"posts_id" integer,
  	"pages_id" integer
  );
  
  CREATE TABLE "events_blocks_hero_links" (
  	"_order" integer NOT NULL,
  	"_parent_id" varchar NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"label" varchar,
  	"url" varchar,
  	"page_id" integer,
  	"variant" "enum_events_blocks_hero_links_variant" DEFAULT 'primary',
  	"new_tab" boolean
  );
  
  CREATE TABLE "events_blocks_hero" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"variant" "enum_events_blocks_hero_variant" DEFAULT 'standard',
  	"eyebrow" varchar,
  	"heading" varchar,
  	"description" varchar,
  	"image_id" integer,
  	"video_url" varchar,
  	"overlay" "enum_events_blocks_hero_overlay" DEFAULT 'dark',
  	"text_align" "enum_events_blocks_hero_text_align" DEFAULT 'center',
  	"block_name" varchar
  );
  
  CREATE TABLE "events_blocks_content_columns" (
  	"_order" integer NOT NULL,
  	"_parent_id" varchar NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"size" "enum_events_blocks_content_columns_size" DEFAULT 'full',
  	"rich_text" jsonb,
  	"enable_link" boolean,
  	"link_label" varchar,
  	"link_url" varchar,
  	"link_page_id" integer,
  	"link_new_tab" boolean
  );
  
  CREATE TABLE "events_blocks_content" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"background_color" "enum_events_blocks_content_background_color" DEFAULT 'none',
  	"padding_top" "enum_events_blocks_content_padding_top" DEFAULT 'medium',
  	"padding_bottom" "enum_events_blocks_content_padding_bottom" DEFAULT 'medium',
  	"block_name" varchar
  );
  
  CREATE TABLE "events_blocks_media" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"media_id" integer,
  	"caption" varchar,
  	"size" "enum_events_blocks_media_size" DEFAULT 'default',
  	"position" "enum_events_blocks_media_position" DEFAULT 'center',
  	"enable_link" boolean,
  	"link_url" varchar,
  	"link_page_id" integer,
  	"link_new_tab" boolean,
  	"block_name" varchar
  );
  
  CREATE TABLE "events_blocks_cta_links" (
  	"_order" integer NOT NULL,
  	"_parent_id" varchar NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"label" varchar,
  	"url" varchar,
  	"page_id" integer,
  	"variant" "enum_events_blocks_cta_links_variant" DEFAULT 'primary',
  	"new_tab" boolean
  );
  
  CREATE TABLE "events_blocks_cta" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"variant" "enum_events_blocks_cta_variant" DEFAULT 'standard',
  	"heading" varchar,
  	"description" varchar,
  	"image_id" integer,
  	"background_color" "enum_events_blocks_cta_background_color" DEFAULT 'none',
  	"block_name" varchar
  );
  
  CREATE TABLE "events_blocks_archive" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"heading" varchar,
  	"description" varchar,
  	"populate_by" "enum_events_blocks_archive_populate_by" DEFAULT 'collection',
  	"relation_to" "enum_events_blocks_archive_relation_to" DEFAULT 'posts',
  	"limit" numeric DEFAULT 6,
  	"variant" "enum_events_blocks_archive_variant" DEFAULT 'grid',
  	"columns" "enum_events_blocks_archive_columns" DEFAULT '3',
  	"show_image" boolean DEFAULT true,
  	"show_excerpt" boolean DEFAULT true,
  	"show_date" boolean DEFAULT true,
  	"show_author" boolean DEFAULT false,
  	"link_show" boolean,
  	"link_label" varchar DEFAULT 'View All',
  	"link_url" varchar,
  	"block_name" varchar
  );
  
  CREATE TABLE "events_blocks_form" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"form_id" integer,
  	"enable_intro" boolean,
  	"intro_content" jsonb,
  	"variant" "enum_events_blocks_form_variant" DEFAULT 'default',
  	"background_color" "enum_events_blocks_form_background_color" DEFAULT 'none',
  	"block_name" varchar
  );
  
  CREATE TABLE "events_blocks_gallery_images" (
  	"_order" integer NOT NULL,
  	"_parent_id" varchar NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"image_id" integer,
  	"caption" varchar,
  	"link_url" varchar,
  	"link_page_id" integer,
  	"link_new_tab" boolean
  );
  
  CREATE TABLE "events_blocks_gallery" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"heading" varchar,
  	"description" varchar,
  	"variant" "enum_events_blocks_gallery_variant" DEFAULT 'grid',
  	"columns" "enum_events_blocks_gallery_columns" DEFAULT '3',
  	"gap" "enum_events_blocks_gallery_gap" DEFAULT 'medium',
  	"aspect_ratio" "enum_events_blocks_gallery_aspect_ratio" DEFAULT 'auto',
  	"show_captions" boolean DEFAULT true,
  	"enable_lightbox" boolean DEFAULT true,
  	"autoplay" boolean DEFAULT false,
  	"autoplay_speed" numeric DEFAULT 5000,
  	"block_name" varchar
  );
  
  CREATE TABLE "events_blocks_grid_items" (
  	"_order" integer NOT NULL,
  	"_parent_id" varchar NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"image_id" integer,
  	"icon" varchar,
  	"heading" varchar,
  	"eyebrow" varchar,
  	"description" varchar,
  	"stat" varchar,
  	"link_url" varchar,
  	"link_page_id" integer,
  	"link_label" varchar,
  	"link_new_tab" boolean
  );
  
  CREATE TABLE "events_blocks_grid" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"heading" varchar,
  	"description" varchar,
  	"variant" "enum_events_blocks_grid_variant" DEFAULT 'cards',
  	"columns" "enum_events_blocks_grid_columns" DEFAULT '3',
  	"gap" "enum_events_blocks_grid_gap" DEFAULT 'medium',
  	"alignment" "enum_events_blocks_grid_alignment" DEFAULT 'left',
  	"show_border" boolean DEFAULT true,
  	"show_shadow" boolean DEFAULT true,
  	"hover_effect" "enum_events_blocks_grid_hover_effect" DEFAULT 'none',
  	"cta_show" boolean,
  	"cta_label" varchar,
  	"cta_url" varchar,
  	"cta_page_id" integer,
  	"block_name" varchar
  );
  
  CREATE TABLE "events_blocks_timeline_events" (
  	"_order" integer NOT NULL,
  	"_parent_id" varchar NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"date" varchar,
  	"heading" varchar,
  	"description" jsonb,
  	"image_id" integer,
  	"icon" varchar,
  	"color" varchar,
  	"link_url" varchar,
  	"link_page_id" integer,
  	"link_label" varchar DEFAULT 'Learn More',
  	"link_new_tab" boolean,
  	"featured" boolean
  );
  
  CREATE TABLE "events_blocks_timeline" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"heading" varchar,
  	"description" varchar,
  	"variant" "enum_events_blocks_timeline_variant" DEFAULT 'vertical',
  	"line_style" "enum_events_blocks_timeline_line_style" DEFAULT 'solid',
  	"marker_style" "enum_events_blocks_timeline_marker_style" DEFAULT 'circle',
  	"show_connectors" boolean DEFAULT true,
  	"show_dates" boolean DEFAULT true,
  	"animate_on_scroll" boolean DEFAULT true,
  	"sort_order" "enum_events_blocks_timeline_sort_order" DEFAULT 'chronological',
  	"background_color" "enum_events_blocks_timeline_background_color" DEFAULT 'transparent',
  	"block_name" varchar
  );
  
  CREATE TABLE "events" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"title" varchar,
  	"featured_image_id" integer,
  	"excerpt" varchar,
  	"rich_content" jsonb,
  	"event_type" "enum_events_event_type",
  	"start_date" timestamp(3) with time zone,
  	"end_date" timestamp(3) with time zone,
  	"all_day" boolean,
  	"recurring_is_recurring" boolean,
  	"recurring_frequency" "enum_events_recurring_frequency",
  	"recurring_recurrence_end" timestamp(3) with time zone,
  	"venue_id" integer,
  	"online_event" boolean,
  	"online_url" varchar,
  	"custom_location" varchar,
  	"requires_registration" boolean,
  	"registration_url" varchar,
  	"capacity" numeric,
  	"registered" numeric DEFAULT 0,
  	"price_is_free" boolean DEFAULT true,
  	"price_amount" numeric,
  	"price_currency" "enum_events_price_currency" DEFAULT 'GBP',
  	"slug" varchar,
  	"featured" boolean,
  	"event_status" "enum_events_event_status" DEFAULT 'upcoming',
  	"template" "enum_events_template" DEFAULT 'event',
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"_status" "enum_events_status" DEFAULT 'draft'
  );
  
  CREATE TABLE "events_rels" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"order" integer,
  	"parent_id" integer NOT NULL,
  	"path" varchar NOT NULL,
  	"categories_id" integer,
  	"tags_id" integer,
  	"people_id" integer,
  	"events_id" integer,
  	"posts_id" integer,
  	"pages_id" integer
  );
  
  CREATE TABLE "_events_v_blocks_hero_links" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"label" varchar,
  	"url" varchar,
  	"page_id" integer,
  	"variant" "enum__events_v_blocks_hero_links_variant" DEFAULT 'primary',
  	"new_tab" boolean,
  	"_uuid" varchar
  );
  
  CREATE TABLE "_events_v_blocks_hero" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"variant" "enum__events_v_blocks_hero_variant" DEFAULT 'standard',
  	"eyebrow" varchar,
  	"heading" varchar,
  	"description" varchar,
  	"image_id" integer,
  	"video_url" varchar,
  	"overlay" "enum__events_v_blocks_hero_overlay" DEFAULT 'dark',
  	"text_align" "enum__events_v_blocks_hero_text_align" DEFAULT 'center',
  	"_uuid" varchar,
  	"block_name" varchar
  );
  
  CREATE TABLE "_events_v_blocks_content_columns" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"size" "enum__events_v_blocks_content_columns_size" DEFAULT 'full',
  	"rich_text" jsonb,
  	"enable_link" boolean,
  	"link_label" varchar,
  	"link_url" varchar,
  	"link_page_id" integer,
  	"link_new_tab" boolean,
  	"_uuid" varchar
  );
  
  CREATE TABLE "_events_v_blocks_content" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"background_color" "enum__events_v_blocks_content_background_color" DEFAULT 'none',
  	"padding_top" "enum__events_v_blocks_content_padding_top" DEFAULT 'medium',
  	"padding_bottom" "enum__events_v_blocks_content_padding_bottom" DEFAULT 'medium',
  	"_uuid" varchar,
  	"block_name" varchar
  );
  
  CREATE TABLE "_events_v_blocks_media" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"media_id" integer,
  	"caption" varchar,
  	"size" "enum__events_v_blocks_media_size" DEFAULT 'default',
  	"position" "enum__events_v_blocks_media_position" DEFAULT 'center',
  	"enable_link" boolean,
  	"link_url" varchar,
  	"link_page_id" integer,
  	"link_new_tab" boolean,
  	"_uuid" varchar,
  	"block_name" varchar
  );
  
  CREATE TABLE "_events_v_blocks_cta_links" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"label" varchar,
  	"url" varchar,
  	"page_id" integer,
  	"variant" "enum__events_v_blocks_cta_links_variant" DEFAULT 'primary',
  	"new_tab" boolean,
  	"_uuid" varchar
  );
  
  CREATE TABLE "_events_v_blocks_cta" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"variant" "enum__events_v_blocks_cta_variant" DEFAULT 'standard',
  	"heading" varchar,
  	"description" varchar,
  	"image_id" integer,
  	"background_color" "enum__events_v_blocks_cta_background_color" DEFAULT 'none',
  	"_uuid" varchar,
  	"block_name" varchar
  );
  
  CREATE TABLE "_events_v_blocks_archive" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"heading" varchar,
  	"description" varchar,
  	"populate_by" "enum__events_v_blocks_archive_populate_by" DEFAULT 'collection',
  	"relation_to" "enum__events_v_blocks_archive_relation_to" DEFAULT 'posts',
  	"limit" numeric DEFAULT 6,
  	"variant" "enum__events_v_blocks_archive_variant" DEFAULT 'grid',
  	"columns" "enum__events_v_blocks_archive_columns" DEFAULT '3',
  	"show_image" boolean DEFAULT true,
  	"show_excerpt" boolean DEFAULT true,
  	"show_date" boolean DEFAULT true,
  	"show_author" boolean DEFAULT false,
  	"link_show" boolean,
  	"link_label" varchar DEFAULT 'View All',
  	"link_url" varchar,
  	"_uuid" varchar,
  	"block_name" varchar
  );
  
  CREATE TABLE "_events_v_blocks_form" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"form_id" integer,
  	"enable_intro" boolean,
  	"intro_content" jsonb,
  	"variant" "enum__events_v_blocks_form_variant" DEFAULT 'default',
  	"background_color" "enum__events_v_blocks_form_background_color" DEFAULT 'none',
  	"_uuid" varchar,
  	"block_name" varchar
  );
  
  CREATE TABLE "_events_v_blocks_gallery_images" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"image_id" integer,
  	"caption" varchar,
  	"link_url" varchar,
  	"link_page_id" integer,
  	"link_new_tab" boolean,
  	"_uuid" varchar
  );
  
  CREATE TABLE "_events_v_blocks_gallery" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"heading" varchar,
  	"description" varchar,
  	"variant" "enum__events_v_blocks_gallery_variant" DEFAULT 'grid',
  	"columns" "enum__events_v_blocks_gallery_columns" DEFAULT '3',
  	"gap" "enum__events_v_blocks_gallery_gap" DEFAULT 'medium',
  	"aspect_ratio" "enum__events_v_blocks_gallery_aspect_ratio" DEFAULT 'auto',
  	"show_captions" boolean DEFAULT true,
  	"enable_lightbox" boolean DEFAULT true,
  	"autoplay" boolean DEFAULT false,
  	"autoplay_speed" numeric DEFAULT 5000,
  	"_uuid" varchar,
  	"block_name" varchar
  );
  
  CREATE TABLE "_events_v_blocks_grid_items" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"image_id" integer,
  	"icon" varchar,
  	"heading" varchar,
  	"eyebrow" varchar,
  	"description" varchar,
  	"stat" varchar,
  	"link_url" varchar,
  	"link_page_id" integer,
  	"link_label" varchar,
  	"link_new_tab" boolean,
  	"_uuid" varchar
  );
  
  CREATE TABLE "_events_v_blocks_grid" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"heading" varchar,
  	"description" varchar,
  	"variant" "enum__events_v_blocks_grid_variant" DEFAULT 'cards',
  	"columns" "enum__events_v_blocks_grid_columns" DEFAULT '3',
  	"gap" "enum__events_v_blocks_grid_gap" DEFAULT 'medium',
  	"alignment" "enum__events_v_blocks_grid_alignment" DEFAULT 'left',
  	"show_border" boolean DEFAULT true,
  	"show_shadow" boolean DEFAULT true,
  	"hover_effect" "enum__events_v_blocks_grid_hover_effect" DEFAULT 'none',
  	"cta_show" boolean,
  	"cta_label" varchar,
  	"cta_url" varchar,
  	"cta_page_id" integer,
  	"_uuid" varchar,
  	"block_name" varchar
  );
  
  CREATE TABLE "_events_v_blocks_timeline_events" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"date" varchar,
  	"heading" varchar,
  	"description" jsonb,
  	"image_id" integer,
  	"icon" varchar,
  	"color" varchar,
  	"link_url" varchar,
  	"link_page_id" integer,
  	"link_label" varchar DEFAULT 'Learn More',
  	"link_new_tab" boolean,
  	"featured" boolean,
  	"_uuid" varchar
  );
  
  CREATE TABLE "_events_v_blocks_timeline" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"heading" varchar,
  	"description" varchar,
  	"variant" "enum__events_v_blocks_timeline_variant" DEFAULT 'vertical',
  	"line_style" "enum__events_v_blocks_timeline_line_style" DEFAULT 'solid',
  	"marker_style" "enum__events_v_blocks_timeline_marker_style" DEFAULT 'circle',
  	"show_connectors" boolean DEFAULT true,
  	"show_dates" boolean DEFAULT true,
  	"animate_on_scroll" boolean DEFAULT true,
  	"sort_order" "enum__events_v_blocks_timeline_sort_order" DEFAULT 'chronological',
  	"background_color" "enum__events_v_blocks_timeline_background_color" DEFAULT 'transparent',
  	"_uuid" varchar,
  	"block_name" varchar
  );
  
  CREATE TABLE "_events_v" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"parent_id" integer,
  	"version_title" varchar,
  	"version_featured_image_id" integer,
  	"version_excerpt" varchar,
  	"version_rich_content" jsonb,
  	"version_event_type" "enum__events_v_version_event_type",
  	"version_start_date" timestamp(3) with time zone,
  	"version_end_date" timestamp(3) with time zone,
  	"version_all_day" boolean,
  	"version_recurring_is_recurring" boolean,
  	"version_recurring_frequency" "enum__events_v_version_recurring_frequency",
  	"version_recurring_recurrence_end" timestamp(3) with time zone,
  	"version_venue_id" integer,
  	"version_online_event" boolean,
  	"version_online_url" varchar,
  	"version_custom_location" varchar,
  	"version_requires_registration" boolean,
  	"version_registration_url" varchar,
  	"version_capacity" numeric,
  	"version_registered" numeric DEFAULT 0,
  	"version_price_is_free" boolean DEFAULT true,
  	"version_price_amount" numeric,
  	"version_price_currency" "enum__events_v_version_price_currency" DEFAULT 'GBP',
  	"version_slug" varchar,
  	"version_featured" boolean,
  	"version_event_status" "enum__events_v_version_event_status" DEFAULT 'upcoming',
  	"version_template" "enum__events_v_version_template" DEFAULT 'event',
  	"version_updated_at" timestamp(3) with time zone,
  	"version_created_at" timestamp(3) with time zone,
  	"version__status" "enum__events_v_version_status" DEFAULT 'draft',
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"latest" boolean,
  	"autosave" boolean
  );
  
  CREATE TABLE "_events_v_rels" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"order" integer,
  	"parent_id" integer NOT NULL,
  	"path" varchar NOT NULL,
  	"categories_id" integer,
  	"tags_id" integer,
  	"people_id" integer,
  	"events_id" integer,
  	"posts_id" integer,
  	"pages_id" integer
  );
  
  CREATE TABLE "header_top_bar_links" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"label" varchar NOT NULL,
  	"url" varchar,
  	"page_id" integer,
  	"new_tab" boolean
  );
  
  CREATE TABLE "page_templates_blocks_logo_cloud_items" (
  	"_order" integer NOT NULL,
  	"_parent_id" varchar NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"media_id" integer NOT NULL,
  	"label" varchar,
  	"url" varchar
  );
  
  CREATE TABLE "page_templates_blocks_logo_cloud" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"heading" varchar,
  	"description" varchar,
  	"variant" "enum_page_templates_blocks_logo_cloud_variant" DEFAULT 'grid',
  	"block_name" varchar
  );
  
  CREATE TABLE "page_templates_blocks_video_feature" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"heading" varchar,
  	"video_url" varchar,
  	"caption" varchar,
  	"check_items" varchar,
  	"block_name" varchar
  );
  
  CREATE TABLE "page_templates_blocks_testimonials_items" (
  	"_order" integer NOT NULL,
  	"_parent_id" varchar NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"quote" varchar NOT NULL,
  	"name" varchar NOT NULL,
  	"role" varchar,
  	"company" varchar,
  	"avatar_id" integer,
  	"rating" numeric
  );
  
  CREATE TABLE "page_templates_blocks_testimonials" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"heading" varchar,
  	"description" varchar,
  	"variant" "enum_page_templates_blocks_testimonials_variant" DEFAULT 'standard',
  	"block_name" varchar
  );
  
  CREATE TABLE "page_templates_blocks_content_columns" (
  	"_order" integer NOT NULL,
  	"_parent_id" varchar NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"size" "enum_page_templates_blocks_content_columns_size" DEFAULT 'full',
  	"rich_text" jsonb,
  	"enable_link" boolean,
  	"link_label" varchar,
  	"link_url" varchar,
  	"link_page_id" integer,
  	"link_new_tab" boolean
  );
  
  CREATE TABLE "page_templates_blocks_content" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"background_color" "enum_page_templates_blocks_content_background_color" DEFAULT 'none',
  	"padding_top" "enum_page_templates_blocks_content_padding_top" DEFAULT 'medium',
  	"padding_bottom" "enum_page_templates_blocks_content_padding_bottom" DEFAULT 'medium',
  	"block_name" varchar
  );
  
  CREATE TABLE "page_templates_blocks_faq_items" (
  	"_order" integer NOT NULL,
  	"_parent_id" varchar NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"question" varchar NOT NULL,
  	"answer" jsonb NOT NULL
  );
  
  CREATE TABLE "page_templates_blocks_faq" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"heading" varchar,
  	"description" varchar,
  	"variant" "enum_page_templates_blocks_faq_variant" DEFAULT 'accordion',
  	"block_name" varchar
  );
  
  CREATE TABLE "page_templates_blocks_cta_links" (
  	"_order" integer NOT NULL,
  	"_parent_id" varchar NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"label" varchar NOT NULL,
  	"url" varchar,
  	"page_id" integer,
  	"variant" "enum_page_templates_blocks_cta_links_variant" DEFAULT 'primary',
  	"new_tab" boolean
  );
  
  CREATE TABLE "page_templates_blocks_cta" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"variant" "enum_page_templates_blocks_cta_variant" DEFAULT 'standard',
  	"heading" varchar NOT NULL,
  	"description" varchar,
  	"image_id" integer,
  	"background_color" "enum_page_templates_blocks_cta_background_color" DEFAULT 'none',
  	"block_name" varchar
  );
  
  CREATE TABLE "page_templates" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"updated_at" timestamp(3) with time zone,
  	"created_at" timestamp(3) with time zone
  );
  
  ALTER TABLE "payload_locked_documents_rels" ADD COLUMN "faqs_id" integer;
  ALTER TABLE "payload_locked_documents_rels" ADD COLUMN "testimonials_id" integer;
  ALTER TABLE "payload_locked_documents_rels" ADD COLUMN "locations_id" integer;
  ALTER TABLE "payload_locked_documents_rels" ADD COLUMN "logo_clouds_id" integer;
  ALTER TABLE "payload_locked_documents_rels" ADD COLUMN "global_blocks_id" integer;
  ALTER TABLE "payload_locked_documents_rels" ADD COLUMN "block_library_id" integer;
  ALTER TABLE "payload_locked_documents_rels" ADD COLUMN "block_template_builder_id" integer;
  ALTER TABLE "payload_locked_documents_rels" ADD COLUMN "content_types_id" integer;
  ALTER TABLE "payload_locked_documents_rels" ADD COLUMN "custom_items_id" integer;
  ALTER TABLE "payload_locked_documents_rels" ADD COLUMN "archive_items_id" integer;
  ALTER TABLE "payload_locked_documents_rels" ADD COLUMN "people_id" integer;
  ALTER TABLE "payload_locked_documents_rels" ADD COLUMN "places_id" integer;
  ALTER TABLE "payload_locked_documents_rels" ADD COLUMN "events_id" integer;
  ALTER TABLE "footer" ADD COLUMN "email" varchar;
  ALTER TABLE "pages_blocks_contact_form" ADD CONSTRAINT "pages_blocks_contact_form_form_id_forms_id_fk" FOREIGN KEY ("form_id") REFERENCES "public"."forms"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "pages_blocks_contact_form" ADD CONSTRAINT "pages_blocks_contact_form_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pages_blocks_social_links_custom_links" ADD CONSTRAINT "pages_blocks_social_links_custom_links_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages_blocks_social_links"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pages_blocks_social_links" ADD CONSTRAINT "pages_blocks_social_links_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pages_blocks_video_feature" ADD CONSTRAINT "pages_blocks_video_feature_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pages_blocks_reusable_block" ADD CONSTRAINT "pages_blocks_reusable_block_library_item_id_global_blocks_id_fk" FOREIGN KEY ("library_item_id") REFERENCES "public"."global_blocks"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "pages_blocks_reusable_block" ADD CONSTRAINT "pages_blocks_reusable_block_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_pages_v_blocks_contact_form" ADD CONSTRAINT "_pages_v_blocks_contact_form_form_id_forms_id_fk" FOREIGN KEY ("form_id") REFERENCES "public"."forms"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "_pages_v_blocks_contact_form" ADD CONSTRAINT "_pages_v_blocks_contact_form_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_pages_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_pages_v_blocks_social_links_custom_links" ADD CONSTRAINT "_pages_v_blocks_social_links_custom_links_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_pages_v_blocks_social_links"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_pages_v_blocks_social_links" ADD CONSTRAINT "_pages_v_blocks_social_links_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_pages_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_pages_v_blocks_video_feature" ADD CONSTRAINT "_pages_v_blocks_video_feature_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_pages_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_pages_v_blocks_reusable_block" ADD CONSTRAINT "_pages_v_blocks_reusable_block_library_item_id_global_blocks_id_fk" FOREIGN KEY ("library_item_id") REFERENCES "public"."global_blocks"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "_pages_v_blocks_reusable_block" ADD CONSTRAINT "_pages_v_blocks_reusable_block_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_pages_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "testimonials" ADD CONSTRAINT "testimonials_avatar_id_media_id_fk" FOREIGN KEY ("avatar_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "locations_faqs" ADD CONSTRAINT "locations_faqs_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."locations"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "locations_nearby_locations" ADD CONSTRAINT "locations_nearby_locations_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."locations"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "logo_clouds" ADD CONSTRAINT "logo_clouds_media_id_media_id_fk" FOREIGN KEY ("media_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "global_blocks_blocks_hero_links" ADD CONSTRAINT "global_blocks_blocks_hero_links_page_id_pages_id_fk" FOREIGN KEY ("page_id") REFERENCES "public"."pages"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "global_blocks_blocks_hero_links" ADD CONSTRAINT "global_blocks_blocks_hero_links_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."global_blocks_blocks_hero"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "global_blocks_blocks_hero" ADD CONSTRAINT "global_blocks_blocks_hero_image_id_media_id_fk" FOREIGN KEY ("image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "global_blocks_blocks_hero" ADD CONSTRAINT "global_blocks_blocks_hero_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."global_blocks"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "global_blocks_blocks_content_columns" ADD CONSTRAINT "global_blocks_blocks_content_columns_link_page_id_pages_id_fk" FOREIGN KEY ("link_page_id") REFERENCES "public"."pages"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "global_blocks_blocks_content_columns" ADD CONSTRAINT "global_blocks_blocks_content_columns_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."global_blocks_blocks_content"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "global_blocks_blocks_content" ADD CONSTRAINT "global_blocks_blocks_content_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."global_blocks"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "global_blocks_blocks_media" ADD CONSTRAINT "global_blocks_blocks_media_media_id_media_id_fk" FOREIGN KEY ("media_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "global_blocks_blocks_media" ADD CONSTRAINT "global_blocks_blocks_media_link_page_id_pages_id_fk" FOREIGN KEY ("link_page_id") REFERENCES "public"."pages"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "global_blocks_blocks_media" ADD CONSTRAINT "global_blocks_blocks_media_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."global_blocks"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "global_blocks_blocks_cta_links" ADD CONSTRAINT "global_blocks_blocks_cta_links_page_id_pages_id_fk" FOREIGN KEY ("page_id") REFERENCES "public"."pages"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "global_blocks_blocks_cta_links" ADD CONSTRAINT "global_blocks_blocks_cta_links_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."global_blocks_blocks_cta"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "global_blocks_blocks_cta" ADD CONSTRAINT "global_blocks_blocks_cta_image_id_media_id_fk" FOREIGN KEY ("image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "global_blocks_blocks_cta" ADD CONSTRAINT "global_blocks_blocks_cta_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."global_blocks"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "global_blocks_blocks_archive" ADD CONSTRAINT "global_blocks_blocks_archive_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."global_blocks"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "global_blocks_blocks_form" ADD CONSTRAINT "global_blocks_blocks_form_form_id_forms_id_fk" FOREIGN KEY ("form_id") REFERENCES "public"."forms"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "global_blocks_blocks_form" ADD CONSTRAINT "global_blocks_blocks_form_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."global_blocks"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "global_blocks_blocks_quote" ADD CONSTRAINT "global_blocks_blocks_quote_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."global_blocks"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "global_blocks_blocks_features_items" ADD CONSTRAINT "global_blocks_blocks_features_items_media_id_media_id_fk" FOREIGN KEY ("media_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "global_blocks_blocks_features_items" ADD CONSTRAINT "global_blocks_blocks_features_items_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."global_blocks_blocks_features"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "global_blocks_blocks_features" ADD CONSTRAINT "global_blocks_blocks_features_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."global_blocks"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "global_blocks_blocks_stats_items" ADD CONSTRAINT "global_blocks_blocks_stats_items_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."global_blocks_blocks_stats"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "global_blocks_blocks_stats" ADD CONSTRAINT "global_blocks_blocks_stats_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."global_blocks"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "global_blocks_blocks_logo_cloud_items" ADD CONSTRAINT "global_blocks_blocks_logo_cloud_items_media_id_media_id_fk" FOREIGN KEY ("media_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "global_blocks_blocks_logo_cloud_items" ADD CONSTRAINT "global_blocks_blocks_logo_cloud_items_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."global_blocks_blocks_logo_cloud"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "global_blocks_blocks_logo_cloud" ADD CONSTRAINT "global_blocks_blocks_logo_cloud_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."global_blocks"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "global_blocks_blocks_testimonials_items" ADD CONSTRAINT "global_blocks_blocks_testimonials_items_avatar_id_media_id_fk" FOREIGN KEY ("avatar_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "global_blocks_blocks_testimonials_items" ADD CONSTRAINT "global_blocks_blocks_testimonials_items_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."global_blocks_blocks_testimonials"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "global_blocks_blocks_testimonials" ADD CONSTRAINT "global_blocks_blocks_testimonials_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."global_blocks"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "global_blocks_blocks_faq_items" ADD CONSTRAINT "global_blocks_blocks_faq_items_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."global_blocks_blocks_faq"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "global_blocks_blocks_faq" ADD CONSTRAINT "global_blocks_blocks_faq_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."global_blocks"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "global_blocks_blocks_pricing_plans_features" ADD CONSTRAINT "global_blocks_blocks_pricing_plans_features_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."global_blocks_blocks_pricing_plans"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "global_blocks_blocks_pricing_plans_links" ADD CONSTRAINT "global_blocks_blocks_pricing_plans_links_page_id_pages_id_fk" FOREIGN KEY ("page_id") REFERENCES "public"."pages"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "global_blocks_blocks_pricing_plans_links" ADD CONSTRAINT "global_blocks_blocks_pricing_plans_links_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."global_blocks_blocks_pricing_plans"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "global_blocks_blocks_pricing_plans" ADD CONSTRAINT "global_blocks_blocks_pricing_plans_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."global_blocks_blocks_pricing"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "global_blocks_blocks_pricing" ADD CONSTRAINT "global_blocks_blocks_pricing_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."global_blocks"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "global_blocks_blocks_team_items_socials" ADD CONSTRAINT "global_blocks_blocks_team_items_socials_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."global_blocks_blocks_team_items"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "global_blocks_blocks_team_items" ADD CONSTRAINT "global_blocks_blocks_team_items_photo_id_media_id_fk" FOREIGN KEY ("photo_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "global_blocks_blocks_team_items" ADD CONSTRAINT "global_blocks_blocks_team_items_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."global_blocks_blocks_team"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "global_blocks_blocks_team" ADD CONSTRAINT "global_blocks_blocks_team_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."global_blocks"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "global_blocks_blocks_embed" ADD CONSTRAINT "global_blocks_blocks_embed_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."global_blocks"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "global_blocks_blocks_spacer" ADD CONSTRAINT "global_blocks_blocks_spacer_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."global_blocks"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "global_blocks_blocks_html" ADD CONSTRAINT "global_blocks_blocks_html_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."global_blocks"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "global_blocks_blocks_gallery_images" ADD CONSTRAINT "global_blocks_blocks_gallery_images_image_id_media_id_fk" FOREIGN KEY ("image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "global_blocks_blocks_gallery_images" ADD CONSTRAINT "global_blocks_blocks_gallery_images_link_page_id_pages_id_fk" FOREIGN KEY ("link_page_id") REFERENCES "public"."pages"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "global_blocks_blocks_gallery_images" ADD CONSTRAINT "global_blocks_blocks_gallery_images_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."global_blocks_blocks_gallery"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "global_blocks_blocks_gallery" ADD CONSTRAINT "global_blocks_blocks_gallery_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."global_blocks"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "global_blocks_blocks_grid_items" ADD CONSTRAINT "global_blocks_blocks_grid_items_image_id_media_id_fk" FOREIGN KEY ("image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "global_blocks_blocks_grid_items" ADD CONSTRAINT "global_blocks_blocks_grid_items_link_page_id_pages_id_fk" FOREIGN KEY ("link_page_id") REFERENCES "public"."pages"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "global_blocks_blocks_grid_items" ADD CONSTRAINT "global_blocks_blocks_grid_items_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."global_blocks_blocks_grid"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "global_blocks_blocks_grid" ADD CONSTRAINT "global_blocks_blocks_grid_cta_page_id_pages_id_fk" FOREIGN KEY ("cta_page_id") REFERENCES "public"."pages"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "global_blocks_blocks_grid" ADD CONSTRAINT "global_blocks_blocks_grid_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."global_blocks"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "global_blocks_blocks_timeline_events" ADD CONSTRAINT "global_blocks_blocks_timeline_events_image_id_media_id_fk" FOREIGN KEY ("image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "global_blocks_blocks_timeline_events" ADD CONSTRAINT "global_blocks_blocks_timeline_events_link_page_id_pages_id_fk" FOREIGN KEY ("link_page_id") REFERENCES "public"."pages"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "global_blocks_blocks_timeline_events" ADD CONSTRAINT "global_blocks_blocks_timeline_events_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."global_blocks_blocks_timeline"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "global_blocks_blocks_timeline" ADD CONSTRAINT "global_blocks_blocks_timeline_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."global_blocks"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "global_blocks_rels" ADD CONSTRAINT "global_blocks_rels_parent_fk" FOREIGN KEY ("parent_id") REFERENCES "public"."global_blocks"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "global_blocks_rels" ADD CONSTRAINT "global_blocks_rels_categories_fk" FOREIGN KEY ("categories_id") REFERENCES "public"."categories"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "global_blocks_rels" ADD CONSTRAINT "global_blocks_rels_tags_fk" FOREIGN KEY ("tags_id") REFERENCES "public"."tags"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "global_blocks_rels" ADD CONSTRAINT "global_blocks_rels_posts_fk" FOREIGN KEY ("posts_id") REFERENCES "public"."posts"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "global_blocks_rels" ADD CONSTRAINT "global_blocks_rels_pages_fk" FOREIGN KEY ("pages_id") REFERENCES "public"."pages"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "block_template_builder_blocks_hero_links" ADD CONSTRAINT "block_template_builder_blocks_hero_links_page_id_pages_id_fk" FOREIGN KEY ("page_id") REFERENCES "public"."pages"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "block_template_builder_blocks_hero_links" ADD CONSTRAINT "block_template_builder_blocks_hero_links_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."block_template_builder_blocks_hero"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "block_template_builder_blocks_hero" ADD CONSTRAINT "block_template_builder_blocks_hero_image_id_media_id_fk" FOREIGN KEY ("image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "block_template_builder_blocks_hero" ADD CONSTRAINT "block_template_builder_blocks_hero_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."block_template_builder"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "block_template_builder_blocks_content_columns" ADD CONSTRAINT "block_template_builder_blocks_content_columns_link_page_id_pages_id_fk" FOREIGN KEY ("link_page_id") REFERENCES "public"."pages"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "block_template_builder_blocks_content_columns" ADD CONSTRAINT "block_template_builder_blocks_content_columns_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."block_template_builder_blocks_content"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "block_template_builder_blocks_content" ADD CONSTRAINT "block_template_builder_blocks_content_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."block_template_builder"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "block_template_builder_blocks_media" ADD CONSTRAINT "block_template_builder_blocks_media_media_id_media_id_fk" FOREIGN KEY ("media_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "block_template_builder_blocks_media" ADD CONSTRAINT "block_template_builder_blocks_media_link_page_id_pages_id_fk" FOREIGN KEY ("link_page_id") REFERENCES "public"."pages"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "block_template_builder_blocks_media" ADD CONSTRAINT "block_template_builder_blocks_media_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."block_template_builder"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "block_template_builder_blocks_cta_links" ADD CONSTRAINT "block_template_builder_blocks_cta_links_page_id_pages_id_fk" FOREIGN KEY ("page_id") REFERENCES "public"."pages"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "block_template_builder_blocks_cta_links" ADD CONSTRAINT "block_template_builder_blocks_cta_links_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."block_template_builder_blocks_cta"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "block_template_builder_blocks_cta" ADD CONSTRAINT "block_template_builder_blocks_cta_image_id_media_id_fk" FOREIGN KEY ("image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "block_template_builder_blocks_cta" ADD CONSTRAINT "block_template_builder_blocks_cta_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."block_template_builder"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "block_template_builder_blocks_archive" ADD CONSTRAINT "block_template_builder_blocks_archive_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."block_template_builder"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "block_template_builder_blocks_form" ADD CONSTRAINT "block_template_builder_blocks_form_form_id_forms_id_fk" FOREIGN KEY ("form_id") REFERENCES "public"."forms"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "block_template_builder_blocks_form" ADD CONSTRAINT "block_template_builder_blocks_form_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."block_template_builder"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "block_template_builder_blocks_quote" ADD CONSTRAINT "block_template_builder_blocks_quote_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."block_template_builder"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "block_template_builder_blocks_features_items" ADD CONSTRAINT "block_template_builder_blocks_features_items_media_id_media_id_fk" FOREIGN KEY ("media_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "block_template_builder_blocks_features_items" ADD CONSTRAINT "block_template_builder_blocks_features_items_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."block_template_builder_blocks_features"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "block_template_builder_blocks_features" ADD CONSTRAINT "block_template_builder_blocks_features_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."block_template_builder"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "block_template_builder_blocks_stats_items" ADD CONSTRAINT "block_template_builder_blocks_stats_items_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."block_template_builder_blocks_stats"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "block_template_builder_blocks_stats" ADD CONSTRAINT "block_template_builder_blocks_stats_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."block_template_builder"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "block_template_builder_blocks_logo_cloud_items" ADD CONSTRAINT "block_template_builder_blocks_logo_cloud_items_media_id_media_id_fk" FOREIGN KEY ("media_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "block_template_builder_blocks_logo_cloud_items" ADD CONSTRAINT "block_template_builder_blocks_logo_cloud_items_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."block_template_builder_blocks_logo_cloud"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "block_template_builder_blocks_logo_cloud" ADD CONSTRAINT "block_template_builder_blocks_logo_cloud_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."block_template_builder"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "block_template_builder_blocks_testimonials_items" ADD CONSTRAINT "block_template_builder_blocks_testimonials_items_avatar_id_media_id_fk" FOREIGN KEY ("avatar_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "block_template_builder_blocks_testimonials_items" ADD CONSTRAINT "block_template_builder_blocks_testimonials_items_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."block_template_builder_blocks_testimonials"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "block_template_builder_blocks_testimonials" ADD CONSTRAINT "block_template_builder_blocks_testimonials_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."block_template_builder"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "block_template_builder_blocks_faq_items" ADD CONSTRAINT "block_template_builder_blocks_faq_items_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."block_template_builder_blocks_faq"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "block_template_builder_blocks_faq" ADD CONSTRAINT "block_template_builder_blocks_faq_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."block_template_builder"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "block_template_builder_blocks_pricing_plans_features" ADD CONSTRAINT "block_template_builder_blocks_pricing_plans_features_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."block_template_builder_blocks_pricing_plans"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "block_template_builder_blocks_pricing_plans_links" ADD CONSTRAINT "block_template_builder_blocks_pricing_plans_links_page_id_pages_id_fk" FOREIGN KEY ("page_id") REFERENCES "public"."pages"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "block_template_builder_blocks_pricing_plans_links" ADD CONSTRAINT "block_template_builder_blocks_pricing_plans_links_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."block_template_builder_blocks_pricing_plans"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "block_template_builder_blocks_pricing_plans" ADD CONSTRAINT "block_template_builder_blocks_pricing_plans_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."block_template_builder_blocks_pricing"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "block_template_builder_blocks_pricing" ADD CONSTRAINT "block_template_builder_blocks_pricing_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."block_template_builder"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "block_template_builder_blocks_team_items_socials" ADD CONSTRAINT "block_template_builder_blocks_team_items_socials_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."block_template_builder_blocks_team_items"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "block_template_builder_blocks_team_items" ADD CONSTRAINT "block_template_builder_blocks_team_items_photo_id_media_id_fk" FOREIGN KEY ("photo_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "block_template_builder_blocks_team_items" ADD CONSTRAINT "block_template_builder_blocks_team_items_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."block_template_builder_blocks_team"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "block_template_builder_blocks_team" ADD CONSTRAINT "block_template_builder_blocks_team_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."block_template_builder"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "block_template_builder_blocks_embed" ADD CONSTRAINT "block_template_builder_blocks_embed_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."block_template_builder"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "block_template_builder_blocks_spacer" ADD CONSTRAINT "block_template_builder_blocks_spacer_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."block_template_builder"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "block_template_builder_blocks_html" ADD CONSTRAINT "block_template_builder_blocks_html_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."block_template_builder"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "block_template_builder_blocks_gallery_images" ADD CONSTRAINT "block_template_builder_blocks_gallery_images_image_id_media_id_fk" FOREIGN KEY ("image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "block_template_builder_blocks_gallery_images" ADD CONSTRAINT "block_template_builder_blocks_gallery_images_link_page_id_pages_id_fk" FOREIGN KEY ("link_page_id") REFERENCES "public"."pages"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "block_template_builder_blocks_gallery_images" ADD CONSTRAINT "block_template_builder_blocks_gallery_images_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."block_template_builder_blocks_gallery"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "block_template_builder_blocks_gallery" ADD CONSTRAINT "block_template_builder_blocks_gallery_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."block_template_builder"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "block_template_builder_blocks_grid_items" ADD CONSTRAINT "block_template_builder_blocks_grid_items_image_id_media_id_fk" FOREIGN KEY ("image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "block_template_builder_blocks_grid_items" ADD CONSTRAINT "block_template_builder_blocks_grid_items_link_page_id_pages_id_fk" FOREIGN KEY ("link_page_id") REFERENCES "public"."pages"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "block_template_builder_blocks_grid_items" ADD CONSTRAINT "block_template_builder_blocks_grid_items_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."block_template_builder_blocks_grid"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "block_template_builder_blocks_grid" ADD CONSTRAINT "block_template_builder_blocks_grid_cta_page_id_pages_id_fk" FOREIGN KEY ("cta_page_id") REFERENCES "public"."pages"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "block_template_builder_blocks_grid" ADD CONSTRAINT "block_template_builder_blocks_grid_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."block_template_builder"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "block_template_builder_blocks_timeline_events" ADD CONSTRAINT "block_template_builder_blocks_timeline_events_image_id_media_id_fk" FOREIGN KEY ("image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "block_template_builder_blocks_timeline_events" ADD CONSTRAINT "block_template_builder_blocks_timeline_events_link_page_id_pages_id_fk" FOREIGN KEY ("link_page_id") REFERENCES "public"."pages"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "block_template_builder_blocks_timeline_events" ADD CONSTRAINT "block_template_builder_blocks_timeline_events_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."block_template_builder_blocks_timeline"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "block_template_builder_blocks_timeline" ADD CONSTRAINT "block_template_builder_blocks_timeline_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."block_template_builder"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "block_template_builder_rels" ADD CONSTRAINT "block_template_builder_rels_parent_fk" FOREIGN KEY ("parent_id") REFERENCES "public"."block_template_builder"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "block_template_builder_rels" ADD CONSTRAINT "block_template_builder_rels_categories_fk" FOREIGN KEY ("categories_id") REFERENCES "public"."categories"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "block_template_builder_rels" ADD CONSTRAINT "block_template_builder_rels_tags_fk" FOREIGN KEY ("tags_id") REFERENCES "public"."tags"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "block_template_builder_rels" ADD CONSTRAINT "block_template_builder_rels_posts_fk" FOREIGN KEY ("posts_id") REFERENCES "public"."posts"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "block_template_builder_rels" ADD CONSTRAINT "block_template_builder_rels_pages_fk" FOREIGN KEY ("pages_id") REFERENCES "public"."pages"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "content_types_custom_fields" ADD CONSTRAINT "content_types_custom_fields_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."content_types"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "custom_items_blocks_hero_links" ADD CONSTRAINT "custom_items_blocks_hero_links_page_id_pages_id_fk" FOREIGN KEY ("page_id") REFERENCES "public"."pages"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "custom_items_blocks_hero_links" ADD CONSTRAINT "custom_items_blocks_hero_links_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."custom_items_blocks_hero"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "custom_items_blocks_hero" ADD CONSTRAINT "custom_items_blocks_hero_image_id_media_id_fk" FOREIGN KEY ("image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "custom_items_blocks_hero" ADD CONSTRAINT "custom_items_blocks_hero_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."custom_items"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "custom_items_blocks_content_columns" ADD CONSTRAINT "custom_items_blocks_content_columns_link_page_id_pages_id_fk" FOREIGN KEY ("link_page_id") REFERENCES "public"."pages"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "custom_items_blocks_content_columns" ADD CONSTRAINT "custom_items_blocks_content_columns_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."custom_items_blocks_content"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "custom_items_blocks_content" ADD CONSTRAINT "custom_items_blocks_content_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."custom_items"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "custom_items_blocks_media" ADD CONSTRAINT "custom_items_blocks_media_media_id_media_id_fk" FOREIGN KEY ("media_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "custom_items_blocks_media" ADD CONSTRAINT "custom_items_blocks_media_link_page_id_pages_id_fk" FOREIGN KEY ("link_page_id") REFERENCES "public"."pages"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "custom_items_blocks_media" ADD CONSTRAINT "custom_items_blocks_media_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."custom_items"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "custom_items_blocks_cta_links" ADD CONSTRAINT "custom_items_blocks_cta_links_page_id_pages_id_fk" FOREIGN KEY ("page_id") REFERENCES "public"."pages"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "custom_items_blocks_cta_links" ADD CONSTRAINT "custom_items_blocks_cta_links_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."custom_items_blocks_cta"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "custom_items_blocks_cta" ADD CONSTRAINT "custom_items_blocks_cta_image_id_media_id_fk" FOREIGN KEY ("image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "custom_items_blocks_cta" ADD CONSTRAINT "custom_items_blocks_cta_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."custom_items"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "custom_items_blocks_quote" ADD CONSTRAINT "custom_items_blocks_quote_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."custom_items"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "custom_items_blocks_features_items" ADD CONSTRAINT "custom_items_blocks_features_items_media_id_media_id_fk" FOREIGN KEY ("media_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "custom_items_blocks_features_items" ADD CONSTRAINT "custom_items_blocks_features_items_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."custom_items_blocks_features"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "custom_items_blocks_features" ADD CONSTRAINT "custom_items_blocks_features_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."custom_items"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "custom_items_blocks_stats_items" ADD CONSTRAINT "custom_items_blocks_stats_items_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."custom_items_blocks_stats"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "custom_items_blocks_stats" ADD CONSTRAINT "custom_items_blocks_stats_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."custom_items"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "custom_items_blocks_logo_cloud_items" ADD CONSTRAINT "custom_items_blocks_logo_cloud_items_media_id_media_id_fk" FOREIGN KEY ("media_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "custom_items_blocks_logo_cloud_items" ADD CONSTRAINT "custom_items_blocks_logo_cloud_items_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."custom_items_blocks_logo_cloud"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "custom_items_blocks_logo_cloud" ADD CONSTRAINT "custom_items_blocks_logo_cloud_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."custom_items"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "custom_items_blocks_testimonials_items" ADD CONSTRAINT "custom_items_blocks_testimonials_items_avatar_id_media_id_fk" FOREIGN KEY ("avatar_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "custom_items_blocks_testimonials_items" ADD CONSTRAINT "custom_items_blocks_testimonials_items_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."custom_items_blocks_testimonials"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "custom_items_blocks_testimonials" ADD CONSTRAINT "custom_items_blocks_testimonials_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."custom_items"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "custom_items_blocks_faq_items" ADD CONSTRAINT "custom_items_blocks_faq_items_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."custom_items_blocks_faq"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "custom_items_blocks_faq" ADD CONSTRAINT "custom_items_blocks_faq_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."custom_items"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "custom_items_blocks_pricing_plans_features" ADD CONSTRAINT "custom_items_blocks_pricing_plans_features_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."custom_items_blocks_pricing_plans"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "custom_items_blocks_pricing_plans_links" ADD CONSTRAINT "custom_items_blocks_pricing_plans_links_page_id_pages_id_fk" FOREIGN KEY ("page_id") REFERENCES "public"."pages"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "custom_items_blocks_pricing_plans_links" ADD CONSTRAINT "custom_items_blocks_pricing_plans_links_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."custom_items_blocks_pricing_plans"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "custom_items_blocks_pricing_plans" ADD CONSTRAINT "custom_items_blocks_pricing_plans_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."custom_items_blocks_pricing"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "custom_items_blocks_pricing" ADD CONSTRAINT "custom_items_blocks_pricing_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."custom_items"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "custom_items_blocks_team_items_socials" ADD CONSTRAINT "custom_items_blocks_team_items_socials_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."custom_items_blocks_team_items"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "custom_items_blocks_team_items" ADD CONSTRAINT "custom_items_blocks_team_items_photo_id_media_id_fk" FOREIGN KEY ("photo_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "custom_items_blocks_team_items" ADD CONSTRAINT "custom_items_blocks_team_items_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."custom_items_blocks_team"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "custom_items_blocks_team" ADD CONSTRAINT "custom_items_blocks_team_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."custom_items"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "custom_items_blocks_embed" ADD CONSTRAINT "custom_items_blocks_embed_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."custom_items"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "custom_items_blocks_gallery_images" ADD CONSTRAINT "custom_items_blocks_gallery_images_image_id_media_id_fk" FOREIGN KEY ("image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "custom_items_blocks_gallery_images" ADD CONSTRAINT "custom_items_blocks_gallery_images_link_page_id_pages_id_fk" FOREIGN KEY ("link_page_id") REFERENCES "public"."pages"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "custom_items_blocks_gallery_images" ADD CONSTRAINT "custom_items_blocks_gallery_images_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."custom_items_blocks_gallery"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "custom_items_blocks_gallery" ADD CONSTRAINT "custom_items_blocks_gallery_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."custom_items"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "custom_items_blocks_grid_items" ADD CONSTRAINT "custom_items_blocks_grid_items_image_id_media_id_fk" FOREIGN KEY ("image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "custom_items_blocks_grid_items" ADD CONSTRAINT "custom_items_blocks_grid_items_link_page_id_pages_id_fk" FOREIGN KEY ("link_page_id") REFERENCES "public"."pages"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "custom_items_blocks_grid_items" ADD CONSTRAINT "custom_items_blocks_grid_items_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."custom_items_blocks_grid"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "custom_items_blocks_grid" ADD CONSTRAINT "custom_items_blocks_grid_cta_page_id_pages_id_fk" FOREIGN KEY ("cta_page_id") REFERENCES "public"."pages"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "custom_items_blocks_grid" ADD CONSTRAINT "custom_items_blocks_grid_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."custom_items"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "custom_items_blocks_timeline_events" ADD CONSTRAINT "custom_items_blocks_timeline_events_image_id_media_id_fk" FOREIGN KEY ("image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "custom_items_blocks_timeline_events" ADD CONSTRAINT "custom_items_blocks_timeline_events_link_page_id_pages_id_fk" FOREIGN KEY ("link_page_id") REFERENCES "public"."pages"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "custom_items_blocks_timeline_events" ADD CONSTRAINT "custom_items_blocks_timeline_events_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."custom_items_blocks_timeline"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "custom_items_blocks_timeline" ADD CONSTRAINT "custom_items_blocks_timeline_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."custom_items"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "custom_items_blocks_archive" ADD CONSTRAINT "custom_items_blocks_archive_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."custom_items"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "custom_items_blocks_form" ADD CONSTRAINT "custom_items_blocks_form_form_id_forms_id_fk" FOREIGN KEY ("form_id") REFERENCES "public"."forms"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "custom_items_blocks_form" ADD CONSTRAINT "custom_items_blocks_form_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."custom_items"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "custom_items_blocks_spacer" ADD CONSTRAINT "custom_items_blocks_spacer_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."custom_items"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "custom_items_blocks_html" ADD CONSTRAINT "custom_items_blocks_html_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."custom_items"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "custom_items_gallery" ADD CONSTRAINT "custom_items_gallery_image_id_media_id_fk" FOREIGN KEY ("image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "custom_items_gallery" ADD CONSTRAINT "custom_items_gallery_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."custom_items"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "custom_items" ADD CONSTRAINT "custom_items_featured_image_id_media_id_fk" FOREIGN KEY ("featured_image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "custom_items" ADD CONSTRAINT "custom_items_content_type_id_content_types_id_fk" FOREIGN KEY ("content_type_id") REFERENCES "public"."content_types"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "custom_items" ADD CONSTRAINT "custom_items_author_id_users_id_fk" FOREIGN KEY ("author_id") REFERENCES "public"."users"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "custom_items_rels" ADD CONSTRAINT "custom_items_rels_parent_fk" FOREIGN KEY ("parent_id") REFERENCES "public"."custom_items"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "custom_items_rels" ADD CONSTRAINT "custom_items_rels_categories_fk" FOREIGN KEY ("categories_id") REFERENCES "public"."categories"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "custom_items_rels" ADD CONSTRAINT "custom_items_rels_tags_fk" FOREIGN KEY ("tags_id") REFERENCES "public"."tags"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "custom_items_rels" ADD CONSTRAINT "custom_items_rels_posts_fk" FOREIGN KEY ("posts_id") REFERENCES "public"."posts"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "custom_items_rels" ADD CONSTRAINT "custom_items_rels_pages_fk" FOREIGN KEY ("pages_id") REFERENCES "public"."pages"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_custom_items_v_blocks_hero_links" ADD CONSTRAINT "_custom_items_v_blocks_hero_links_page_id_pages_id_fk" FOREIGN KEY ("page_id") REFERENCES "public"."pages"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "_custom_items_v_blocks_hero_links" ADD CONSTRAINT "_custom_items_v_blocks_hero_links_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_custom_items_v_blocks_hero"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_custom_items_v_blocks_hero" ADD CONSTRAINT "_custom_items_v_blocks_hero_image_id_media_id_fk" FOREIGN KEY ("image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "_custom_items_v_blocks_hero" ADD CONSTRAINT "_custom_items_v_blocks_hero_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_custom_items_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_custom_items_v_blocks_content_columns" ADD CONSTRAINT "_custom_items_v_blocks_content_columns_link_page_id_pages_id_fk" FOREIGN KEY ("link_page_id") REFERENCES "public"."pages"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "_custom_items_v_blocks_content_columns" ADD CONSTRAINT "_custom_items_v_blocks_content_columns_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_custom_items_v_blocks_content"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_custom_items_v_blocks_content" ADD CONSTRAINT "_custom_items_v_blocks_content_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_custom_items_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_custom_items_v_blocks_media" ADD CONSTRAINT "_custom_items_v_blocks_media_media_id_media_id_fk" FOREIGN KEY ("media_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "_custom_items_v_blocks_media" ADD CONSTRAINT "_custom_items_v_blocks_media_link_page_id_pages_id_fk" FOREIGN KEY ("link_page_id") REFERENCES "public"."pages"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "_custom_items_v_blocks_media" ADD CONSTRAINT "_custom_items_v_blocks_media_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_custom_items_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_custom_items_v_blocks_cta_links" ADD CONSTRAINT "_custom_items_v_blocks_cta_links_page_id_pages_id_fk" FOREIGN KEY ("page_id") REFERENCES "public"."pages"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "_custom_items_v_blocks_cta_links" ADD CONSTRAINT "_custom_items_v_blocks_cta_links_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_custom_items_v_blocks_cta"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_custom_items_v_blocks_cta" ADD CONSTRAINT "_custom_items_v_blocks_cta_image_id_media_id_fk" FOREIGN KEY ("image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "_custom_items_v_blocks_cta" ADD CONSTRAINT "_custom_items_v_blocks_cta_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_custom_items_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_custom_items_v_blocks_quote" ADD CONSTRAINT "_custom_items_v_blocks_quote_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_custom_items_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_custom_items_v_blocks_features_items" ADD CONSTRAINT "_custom_items_v_blocks_features_items_media_id_media_id_fk" FOREIGN KEY ("media_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "_custom_items_v_blocks_features_items" ADD CONSTRAINT "_custom_items_v_blocks_features_items_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_custom_items_v_blocks_features"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_custom_items_v_blocks_features" ADD CONSTRAINT "_custom_items_v_blocks_features_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_custom_items_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_custom_items_v_blocks_stats_items" ADD CONSTRAINT "_custom_items_v_blocks_stats_items_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_custom_items_v_blocks_stats"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_custom_items_v_blocks_stats" ADD CONSTRAINT "_custom_items_v_blocks_stats_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_custom_items_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_custom_items_v_blocks_logo_cloud_items" ADD CONSTRAINT "_custom_items_v_blocks_logo_cloud_items_media_id_media_id_fk" FOREIGN KEY ("media_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "_custom_items_v_blocks_logo_cloud_items" ADD CONSTRAINT "_custom_items_v_blocks_logo_cloud_items_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_custom_items_v_blocks_logo_cloud"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_custom_items_v_blocks_logo_cloud" ADD CONSTRAINT "_custom_items_v_blocks_logo_cloud_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_custom_items_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_custom_items_v_blocks_testimonials_items" ADD CONSTRAINT "_custom_items_v_blocks_testimonials_items_avatar_id_media_id_fk" FOREIGN KEY ("avatar_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "_custom_items_v_blocks_testimonials_items" ADD CONSTRAINT "_custom_items_v_blocks_testimonials_items_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_custom_items_v_blocks_testimonials"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_custom_items_v_blocks_testimonials" ADD CONSTRAINT "_custom_items_v_blocks_testimonials_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_custom_items_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_custom_items_v_blocks_faq_items" ADD CONSTRAINT "_custom_items_v_blocks_faq_items_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_custom_items_v_blocks_faq"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_custom_items_v_blocks_faq" ADD CONSTRAINT "_custom_items_v_blocks_faq_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_custom_items_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_custom_items_v_blocks_pricing_plans_features" ADD CONSTRAINT "_custom_items_v_blocks_pricing_plans_features_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_custom_items_v_blocks_pricing_plans"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_custom_items_v_blocks_pricing_plans_links" ADD CONSTRAINT "_custom_items_v_blocks_pricing_plans_links_page_id_pages_id_fk" FOREIGN KEY ("page_id") REFERENCES "public"."pages"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "_custom_items_v_blocks_pricing_plans_links" ADD CONSTRAINT "_custom_items_v_blocks_pricing_plans_links_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_custom_items_v_blocks_pricing_plans"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_custom_items_v_blocks_pricing_plans" ADD CONSTRAINT "_custom_items_v_blocks_pricing_plans_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_custom_items_v_blocks_pricing"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_custom_items_v_blocks_pricing" ADD CONSTRAINT "_custom_items_v_blocks_pricing_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_custom_items_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_custom_items_v_blocks_team_items_socials" ADD CONSTRAINT "_custom_items_v_blocks_team_items_socials_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_custom_items_v_blocks_team_items"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_custom_items_v_blocks_team_items" ADD CONSTRAINT "_custom_items_v_blocks_team_items_photo_id_media_id_fk" FOREIGN KEY ("photo_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "_custom_items_v_blocks_team_items" ADD CONSTRAINT "_custom_items_v_blocks_team_items_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_custom_items_v_blocks_team"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_custom_items_v_blocks_team" ADD CONSTRAINT "_custom_items_v_blocks_team_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_custom_items_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_custom_items_v_blocks_embed" ADD CONSTRAINT "_custom_items_v_blocks_embed_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_custom_items_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_custom_items_v_blocks_gallery_images" ADD CONSTRAINT "_custom_items_v_blocks_gallery_images_image_id_media_id_fk" FOREIGN KEY ("image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "_custom_items_v_blocks_gallery_images" ADD CONSTRAINT "_custom_items_v_blocks_gallery_images_link_page_id_pages_id_fk" FOREIGN KEY ("link_page_id") REFERENCES "public"."pages"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "_custom_items_v_blocks_gallery_images" ADD CONSTRAINT "_custom_items_v_blocks_gallery_images_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_custom_items_v_blocks_gallery"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_custom_items_v_blocks_gallery" ADD CONSTRAINT "_custom_items_v_blocks_gallery_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_custom_items_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_custom_items_v_blocks_grid_items" ADD CONSTRAINT "_custom_items_v_blocks_grid_items_image_id_media_id_fk" FOREIGN KEY ("image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "_custom_items_v_blocks_grid_items" ADD CONSTRAINT "_custom_items_v_blocks_grid_items_link_page_id_pages_id_fk" FOREIGN KEY ("link_page_id") REFERENCES "public"."pages"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "_custom_items_v_blocks_grid_items" ADD CONSTRAINT "_custom_items_v_blocks_grid_items_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_custom_items_v_blocks_grid"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_custom_items_v_blocks_grid" ADD CONSTRAINT "_custom_items_v_blocks_grid_cta_page_id_pages_id_fk" FOREIGN KEY ("cta_page_id") REFERENCES "public"."pages"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "_custom_items_v_blocks_grid" ADD CONSTRAINT "_custom_items_v_blocks_grid_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_custom_items_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_custom_items_v_blocks_timeline_events" ADD CONSTRAINT "_custom_items_v_blocks_timeline_events_image_id_media_id_fk" FOREIGN KEY ("image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "_custom_items_v_blocks_timeline_events" ADD CONSTRAINT "_custom_items_v_blocks_timeline_events_link_page_id_pages_id_fk" FOREIGN KEY ("link_page_id") REFERENCES "public"."pages"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "_custom_items_v_blocks_timeline_events" ADD CONSTRAINT "_custom_items_v_blocks_timeline_events_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_custom_items_v_blocks_timeline"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_custom_items_v_blocks_timeline" ADD CONSTRAINT "_custom_items_v_blocks_timeline_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_custom_items_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_custom_items_v_blocks_archive" ADD CONSTRAINT "_custom_items_v_blocks_archive_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_custom_items_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_custom_items_v_blocks_form" ADD CONSTRAINT "_custom_items_v_blocks_form_form_id_forms_id_fk" FOREIGN KEY ("form_id") REFERENCES "public"."forms"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "_custom_items_v_blocks_form" ADD CONSTRAINT "_custom_items_v_blocks_form_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_custom_items_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_custom_items_v_blocks_spacer" ADD CONSTRAINT "_custom_items_v_blocks_spacer_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_custom_items_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_custom_items_v_blocks_html" ADD CONSTRAINT "_custom_items_v_blocks_html_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_custom_items_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_custom_items_v_version_gallery" ADD CONSTRAINT "_custom_items_v_version_gallery_image_id_media_id_fk" FOREIGN KEY ("image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "_custom_items_v_version_gallery" ADD CONSTRAINT "_custom_items_v_version_gallery_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_custom_items_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_custom_items_v" ADD CONSTRAINT "_custom_items_v_parent_id_custom_items_id_fk" FOREIGN KEY ("parent_id") REFERENCES "public"."custom_items"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "_custom_items_v" ADD CONSTRAINT "_custom_items_v_version_featured_image_id_media_id_fk" FOREIGN KEY ("version_featured_image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "_custom_items_v" ADD CONSTRAINT "_custom_items_v_version_content_type_id_content_types_id_fk" FOREIGN KEY ("version_content_type_id") REFERENCES "public"."content_types"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "_custom_items_v" ADD CONSTRAINT "_custom_items_v_version_author_id_users_id_fk" FOREIGN KEY ("version_author_id") REFERENCES "public"."users"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "_custom_items_v_rels" ADD CONSTRAINT "_custom_items_v_rels_parent_fk" FOREIGN KEY ("parent_id") REFERENCES "public"."_custom_items_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_custom_items_v_rels" ADD CONSTRAINT "_custom_items_v_rels_categories_fk" FOREIGN KEY ("categories_id") REFERENCES "public"."categories"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_custom_items_v_rels" ADD CONSTRAINT "_custom_items_v_rels_tags_fk" FOREIGN KEY ("tags_id") REFERENCES "public"."tags"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_custom_items_v_rels" ADD CONSTRAINT "_custom_items_v_rels_posts_fk" FOREIGN KEY ("posts_id") REFERENCES "public"."posts"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_custom_items_v_rels" ADD CONSTRAINT "_custom_items_v_rels_pages_fk" FOREIGN KEY ("pages_id") REFERENCES "public"."pages"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "archive_items_gallery" ADD CONSTRAINT "archive_items_gallery_image_id_media_id_fk" FOREIGN KEY ("image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "archive_items_gallery" ADD CONSTRAINT "archive_items_gallery_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."archive_items"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "archive_items_blocks_hero_links" ADD CONSTRAINT "archive_items_blocks_hero_links_page_id_pages_id_fk" FOREIGN KEY ("page_id") REFERENCES "public"."pages"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "archive_items_blocks_hero_links" ADD CONSTRAINT "archive_items_blocks_hero_links_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."archive_items_blocks_hero"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "archive_items_blocks_hero" ADD CONSTRAINT "archive_items_blocks_hero_image_id_media_id_fk" FOREIGN KEY ("image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "archive_items_blocks_hero" ADD CONSTRAINT "archive_items_blocks_hero_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."archive_items"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "archive_items_blocks_content_columns" ADD CONSTRAINT "archive_items_blocks_content_columns_link_page_id_pages_id_fk" FOREIGN KEY ("link_page_id") REFERENCES "public"."pages"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "archive_items_blocks_content_columns" ADD CONSTRAINT "archive_items_blocks_content_columns_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."archive_items_blocks_content"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "archive_items_blocks_content" ADD CONSTRAINT "archive_items_blocks_content_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."archive_items"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "archive_items_blocks_media" ADD CONSTRAINT "archive_items_blocks_media_media_id_media_id_fk" FOREIGN KEY ("media_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "archive_items_blocks_media" ADD CONSTRAINT "archive_items_blocks_media_link_page_id_pages_id_fk" FOREIGN KEY ("link_page_id") REFERENCES "public"."pages"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "archive_items_blocks_media" ADD CONSTRAINT "archive_items_blocks_media_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."archive_items"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "archive_items_blocks_cta_links" ADD CONSTRAINT "archive_items_blocks_cta_links_page_id_pages_id_fk" FOREIGN KEY ("page_id") REFERENCES "public"."pages"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "archive_items_blocks_cta_links" ADD CONSTRAINT "archive_items_blocks_cta_links_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."archive_items_blocks_cta"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "archive_items_blocks_cta" ADD CONSTRAINT "archive_items_blocks_cta_image_id_media_id_fk" FOREIGN KEY ("image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "archive_items_blocks_cta" ADD CONSTRAINT "archive_items_blocks_cta_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."archive_items"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "archive_items_blocks_archive" ADD CONSTRAINT "archive_items_blocks_archive_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."archive_items"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "archive_items_blocks_form" ADD CONSTRAINT "archive_items_blocks_form_form_id_forms_id_fk" FOREIGN KEY ("form_id") REFERENCES "public"."forms"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "archive_items_blocks_form" ADD CONSTRAINT "archive_items_blocks_form_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."archive_items"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "archive_items_blocks_gallery_images" ADD CONSTRAINT "archive_items_blocks_gallery_images_image_id_media_id_fk" FOREIGN KEY ("image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "archive_items_blocks_gallery_images" ADD CONSTRAINT "archive_items_blocks_gallery_images_link_page_id_pages_id_fk" FOREIGN KEY ("link_page_id") REFERENCES "public"."pages"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "archive_items_blocks_gallery_images" ADD CONSTRAINT "archive_items_blocks_gallery_images_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."archive_items_blocks_gallery"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "archive_items_blocks_gallery" ADD CONSTRAINT "archive_items_blocks_gallery_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."archive_items"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "archive_items_blocks_grid_items" ADD CONSTRAINT "archive_items_blocks_grid_items_image_id_media_id_fk" FOREIGN KEY ("image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "archive_items_blocks_grid_items" ADD CONSTRAINT "archive_items_blocks_grid_items_link_page_id_pages_id_fk" FOREIGN KEY ("link_page_id") REFERENCES "public"."pages"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "archive_items_blocks_grid_items" ADD CONSTRAINT "archive_items_blocks_grid_items_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."archive_items_blocks_grid"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "archive_items_blocks_grid" ADD CONSTRAINT "archive_items_blocks_grid_cta_page_id_pages_id_fk" FOREIGN KEY ("cta_page_id") REFERENCES "public"."pages"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "archive_items_blocks_grid" ADD CONSTRAINT "archive_items_blocks_grid_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."archive_items"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "archive_items_blocks_timeline_events" ADD CONSTRAINT "archive_items_blocks_timeline_events_image_id_media_id_fk" FOREIGN KEY ("image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "archive_items_blocks_timeline_events" ADD CONSTRAINT "archive_items_blocks_timeline_events_link_page_id_pages_id_fk" FOREIGN KEY ("link_page_id") REFERENCES "public"."pages"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "archive_items_blocks_timeline_events" ADD CONSTRAINT "archive_items_blocks_timeline_events_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."archive_items_blocks_timeline"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "archive_items_blocks_timeline" ADD CONSTRAINT "archive_items_blocks_timeline_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."archive_items"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "archive_items" ADD CONSTRAINT "archive_items_featured_image_id_media_id_fk" FOREIGN KEY ("featured_image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "archive_items_rels" ADD CONSTRAINT "archive_items_rels_parent_fk" FOREIGN KEY ("parent_id") REFERENCES "public"."archive_items"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "archive_items_rels" ADD CONSTRAINT "archive_items_rels_people_fk" FOREIGN KEY ("people_id") REFERENCES "public"."people"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "archive_items_rels" ADD CONSTRAINT "archive_items_rels_places_fk" FOREIGN KEY ("places_id") REFERENCES "public"."places"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "archive_items_rels" ADD CONSTRAINT "archive_items_rels_archive_items_fk" FOREIGN KEY ("archive_items_id") REFERENCES "public"."archive_items"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "archive_items_rels" ADD CONSTRAINT "archive_items_rels_categories_fk" FOREIGN KEY ("categories_id") REFERENCES "public"."categories"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "archive_items_rels" ADD CONSTRAINT "archive_items_rels_tags_fk" FOREIGN KEY ("tags_id") REFERENCES "public"."tags"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "archive_items_rels" ADD CONSTRAINT "archive_items_rels_posts_fk" FOREIGN KEY ("posts_id") REFERENCES "public"."posts"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "archive_items_rels" ADD CONSTRAINT "archive_items_rels_pages_fk" FOREIGN KEY ("pages_id") REFERENCES "public"."pages"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_archive_items_v_version_gallery" ADD CONSTRAINT "_archive_items_v_version_gallery_image_id_media_id_fk" FOREIGN KEY ("image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "_archive_items_v_version_gallery" ADD CONSTRAINT "_archive_items_v_version_gallery_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_archive_items_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_archive_items_v_blocks_hero_links" ADD CONSTRAINT "_archive_items_v_blocks_hero_links_page_id_pages_id_fk" FOREIGN KEY ("page_id") REFERENCES "public"."pages"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "_archive_items_v_blocks_hero_links" ADD CONSTRAINT "_archive_items_v_blocks_hero_links_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_archive_items_v_blocks_hero"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_archive_items_v_blocks_hero" ADD CONSTRAINT "_archive_items_v_blocks_hero_image_id_media_id_fk" FOREIGN KEY ("image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "_archive_items_v_blocks_hero" ADD CONSTRAINT "_archive_items_v_blocks_hero_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_archive_items_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_archive_items_v_blocks_content_columns" ADD CONSTRAINT "_archive_items_v_blocks_content_columns_link_page_id_pages_id_fk" FOREIGN KEY ("link_page_id") REFERENCES "public"."pages"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "_archive_items_v_blocks_content_columns" ADD CONSTRAINT "_archive_items_v_blocks_content_columns_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_archive_items_v_blocks_content"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_archive_items_v_blocks_content" ADD CONSTRAINT "_archive_items_v_blocks_content_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_archive_items_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_archive_items_v_blocks_media" ADD CONSTRAINT "_archive_items_v_blocks_media_media_id_media_id_fk" FOREIGN KEY ("media_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "_archive_items_v_blocks_media" ADD CONSTRAINT "_archive_items_v_blocks_media_link_page_id_pages_id_fk" FOREIGN KEY ("link_page_id") REFERENCES "public"."pages"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "_archive_items_v_blocks_media" ADD CONSTRAINT "_archive_items_v_blocks_media_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_archive_items_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_archive_items_v_blocks_cta_links" ADD CONSTRAINT "_archive_items_v_blocks_cta_links_page_id_pages_id_fk" FOREIGN KEY ("page_id") REFERENCES "public"."pages"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "_archive_items_v_blocks_cta_links" ADD CONSTRAINT "_archive_items_v_blocks_cta_links_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_archive_items_v_blocks_cta"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_archive_items_v_blocks_cta" ADD CONSTRAINT "_archive_items_v_blocks_cta_image_id_media_id_fk" FOREIGN KEY ("image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "_archive_items_v_blocks_cta" ADD CONSTRAINT "_archive_items_v_blocks_cta_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_archive_items_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_archive_items_v_blocks_archive" ADD CONSTRAINT "_archive_items_v_blocks_archive_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_archive_items_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_archive_items_v_blocks_form" ADD CONSTRAINT "_archive_items_v_blocks_form_form_id_forms_id_fk" FOREIGN KEY ("form_id") REFERENCES "public"."forms"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "_archive_items_v_blocks_form" ADD CONSTRAINT "_archive_items_v_blocks_form_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_archive_items_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_archive_items_v_blocks_gallery_images" ADD CONSTRAINT "_archive_items_v_blocks_gallery_images_image_id_media_id_fk" FOREIGN KEY ("image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "_archive_items_v_blocks_gallery_images" ADD CONSTRAINT "_archive_items_v_blocks_gallery_images_link_page_id_pages_id_fk" FOREIGN KEY ("link_page_id") REFERENCES "public"."pages"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "_archive_items_v_blocks_gallery_images" ADD CONSTRAINT "_archive_items_v_blocks_gallery_images_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_archive_items_v_blocks_gallery"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_archive_items_v_blocks_gallery" ADD CONSTRAINT "_archive_items_v_blocks_gallery_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_archive_items_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_archive_items_v_blocks_grid_items" ADD CONSTRAINT "_archive_items_v_blocks_grid_items_image_id_media_id_fk" FOREIGN KEY ("image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "_archive_items_v_blocks_grid_items" ADD CONSTRAINT "_archive_items_v_blocks_grid_items_link_page_id_pages_id_fk" FOREIGN KEY ("link_page_id") REFERENCES "public"."pages"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "_archive_items_v_blocks_grid_items" ADD CONSTRAINT "_archive_items_v_blocks_grid_items_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_archive_items_v_blocks_grid"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_archive_items_v_blocks_grid" ADD CONSTRAINT "_archive_items_v_blocks_grid_cta_page_id_pages_id_fk" FOREIGN KEY ("cta_page_id") REFERENCES "public"."pages"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "_archive_items_v_blocks_grid" ADD CONSTRAINT "_archive_items_v_blocks_grid_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_archive_items_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_archive_items_v_blocks_timeline_events" ADD CONSTRAINT "_archive_items_v_blocks_timeline_events_image_id_media_id_fk" FOREIGN KEY ("image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "_archive_items_v_blocks_timeline_events" ADD CONSTRAINT "_archive_items_v_blocks_timeline_events_link_page_id_pages_id_fk" FOREIGN KEY ("link_page_id") REFERENCES "public"."pages"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "_archive_items_v_blocks_timeline_events" ADD CONSTRAINT "_archive_items_v_blocks_timeline_events_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_archive_items_v_blocks_timeline"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_archive_items_v_blocks_timeline" ADD CONSTRAINT "_archive_items_v_blocks_timeline_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_archive_items_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_archive_items_v" ADD CONSTRAINT "_archive_items_v_parent_id_archive_items_id_fk" FOREIGN KEY ("parent_id") REFERENCES "public"."archive_items"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "_archive_items_v" ADD CONSTRAINT "_archive_items_v_version_featured_image_id_media_id_fk" FOREIGN KEY ("version_featured_image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "_archive_items_v_rels" ADD CONSTRAINT "_archive_items_v_rels_parent_fk" FOREIGN KEY ("parent_id") REFERENCES "public"."_archive_items_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_archive_items_v_rels" ADD CONSTRAINT "_archive_items_v_rels_people_fk" FOREIGN KEY ("people_id") REFERENCES "public"."people"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_archive_items_v_rels" ADD CONSTRAINT "_archive_items_v_rels_places_fk" FOREIGN KEY ("places_id") REFERENCES "public"."places"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_archive_items_v_rels" ADD CONSTRAINT "_archive_items_v_rels_archive_items_fk" FOREIGN KEY ("archive_items_id") REFERENCES "public"."archive_items"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_archive_items_v_rels" ADD CONSTRAINT "_archive_items_v_rels_categories_fk" FOREIGN KEY ("categories_id") REFERENCES "public"."categories"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_archive_items_v_rels" ADD CONSTRAINT "_archive_items_v_rels_tags_fk" FOREIGN KEY ("tags_id") REFERENCES "public"."tags"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_archive_items_v_rels" ADD CONSTRAINT "_archive_items_v_rels_posts_fk" FOREIGN KEY ("posts_id") REFERENCES "public"."posts"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_archive_items_v_rels" ADD CONSTRAINT "_archive_items_v_rels_pages_fk" FOREIGN KEY ("pages_id") REFERENCES "public"."pages"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "people_role" ADD CONSTRAINT "people_role_parent_fk" FOREIGN KEY ("parent_id") REFERENCES "public"."people"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "people_movements" ADD CONSTRAINT "people_movements_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."people"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "people_social_links" ADD CONSTRAINT "people_social_links_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."people"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "people_blocks_hero_links" ADD CONSTRAINT "people_blocks_hero_links_page_id_pages_id_fk" FOREIGN KEY ("page_id") REFERENCES "public"."pages"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "people_blocks_hero_links" ADD CONSTRAINT "people_blocks_hero_links_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."people_blocks_hero"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "people_blocks_hero" ADD CONSTRAINT "people_blocks_hero_image_id_media_id_fk" FOREIGN KEY ("image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "people_blocks_hero" ADD CONSTRAINT "people_blocks_hero_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."people"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "people_blocks_content_columns" ADD CONSTRAINT "people_blocks_content_columns_link_page_id_pages_id_fk" FOREIGN KEY ("link_page_id") REFERENCES "public"."pages"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "people_blocks_content_columns" ADD CONSTRAINT "people_blocks_content_columns_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."people_blocks_content"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "people_blocks_content" ADD CONSTRAINT "people_blocks_content_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."people"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "people_blocks_media" ADD CONSTRAINT "people_blocks_media_media_id_media_id_fk" FOREIGN KEY ("media_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "people_blocks_media" ADD CONSTRAINT "people_blocks_media_link_page_id_pages_id_fk" FOREIGN KEY ("link_page_id") REFERENCES "public"."pages"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "people_blocks_media" ADD CONSTRAINT "people_blocks_media_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."people"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "people_blocks_cta_links" ADD CONSTRAINT "people_blocks_cta_links_page_id_pages_id_fk" FOREIGN KEY ("page_id") REFERENCES "public"."pages"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "people_blocks_cta_links" ADD CONSTRAINT "people_blocks_cta_links_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."people_blocks_cta"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "people_blocks_cta" ADD CONSTRAINT "people_blocks_cta_image_id_media_id_fk" FOREIGN KEY ("image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "people_blocks_cta" ADD CONSTRAINT "people_blocks_cta_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."people"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "people_blocks_quote" ADD CONSTRAINT "people_blocks_quote_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."people"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "people_blocks_features_items" ADD CONSTRAINT "people_blocks_features_items_media_id_media_id_fk" FOREIGN KEY ("media_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "people_blocks_features_items" ADD CONSTRAINT "people_blocks_features_items_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."people_blocks_features"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "people_blocks_features" ADD CONSTRAINT "people_blocks_features_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."people"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "people_blocks_stats_items" ADD CONSTRAINT "people_blocks_stats_items_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."people_blocks_stats"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "people_blocks_stats" ADD CONSTRAINT "people_blocks_stats_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."people"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "people_blocks_logo_cloud_items" ADD CONSTRAINT "people_blocks_logo_cloud_items_media_id_media_id_fk" FOREIGN KEY ("media_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "people_blocks_logo_cloud_items" ADD CONSTRAINT "people_blocks_logo_cloud_items_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."people_blocks_logo_cloud"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "people_blocks_logo_cloud" ADD CONSTRAINT "people_blocks_logo_cloud_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."people"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "people_blocks_testimonials_items" ADD CONSTRAINT "people_blocks_testimonials_items_avatar_id_media_id_fk" FOREIGN KEY ("avatar_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "people_blocks_testimonials_items" ADD CONSTRAINT "people_blocks_testimonials_items_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."people_blocks_testimonials"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "people_blocks_testimonials" ADD CONSTRAINT "people_blocks_testimonials_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."people"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "people_blocks_faq_items" ADD CONSTRAINT "people_blocks_faq_items_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."people_blocks_faq"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "people_blocks_faq" ADD CONSTRAINT "people_blocks_faq_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."people"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "people_blocks_pricing_plans_features" ADD CONSTRAINT "people_blocks_pricing_plans_features_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."people_blocks_pricing_plans"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "people_blocks_pricing_plans_links" ADD CONSTRAINT "people_blocks_pricing_plans_links_page_id_pages_id_fk" FOREIGN KEY ("page_id") REFERENCES "public"."pages"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "people_blocks_pricing_plans_links" ADD CONSTRAINT "people_blocks_pricing_plans_links_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."people_blocks_pricing_plans"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "people_blocks_pricing_plans" ADD CONSTRAINT "people_blocks_pricing_plans_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."people_blocks_pricing"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "people_blocks_pricing" ADD CONSTRAINT "people_blocks_pricing_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."people"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "people_blocks_team_items_socials" ADD CONSTRAINT "people_blocks_team_items_socials_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."people_blocks_team_items"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "people_blocks_team_items" ADD CONSTRAINT "people_blocks_team_items_photo_id_media_id_fk" FOREIGN KEY ("photo_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "people_blocks_team_items" ADD CONSTRAINT "people_blocks_team_items_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."people_blocks_team"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "people_blocks_team" ADD CONSTRAINT "people_blocks_team_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."people"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "people_blocks_embed" ADD CONSTRAINT "people_blocks_embed_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."people"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "people_blocks_archive" ADD CONSTRAINT "people_blocks_archive_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."people"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "people_blocks_form" ADD CONSTRAINT "people_blocks_form_form_id_forms_id_fk" FOREIGN KEY ("form_id") REFERENCES "public"."forms"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "people_blocks_form" ADD CONSTRAINT "people_blocks_form_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."people"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "people_blocks_gallery_images" ADD CONSTRAINT "people_blocks_gallery_images_image_id_media_id_fk" FOREIGN KEY ("image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "people_blocks_gallery_images" ADD CONSTRAINT "people_blocks_gallery_images_link_page_id_pages_id_fk" FOREIGN KEY ("link_page_id") REFERENCES "public"."pages"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "people_blocks_gallery_images" ADD CONSTRAINT "people_blocks_gallery_images_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."people_blocks_gallery"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "people_blocks_gallery" ADD CONSTRAINT "people_blocks_gallery_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."people"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "people_blocks_grid_items" ADD CONSTRAINT "people_blocks_grid_items_image_id_media_id_fk" FOREIGN KEY ("image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "people_blocks_grid_items" ADD CONSTRAINT "people_blocks_grid_items_link_page_id_pages_id_fk" FOREIGN KEY ("link_page_id") REFERENCES "public"."pages"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "people_blocks_grid_items" ADD CONSTRAINT "people_blocks_grid_items_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."people_blocks_grid"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "people_blocks_grid" ADD CONSTRAINT "people_blocks_grid_cta_page_id_pages_id_fk" FOREIGN KEY ("cta_page_id") REFERENCES "public"."pages"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "people_blocks_grid" ADD CONSTRAINT "people_blocks_grid_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."people"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "people_blocks_timeline_events" ADD CONSTRAINT "people_blocks_timeline_events_image_id_media_id_fk" FOREIGN KEY ("image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "people_blocks_timeline_events" ADD CONSTRAINT "people_blocks_timeline_events_link_page_id_pages_id_fk" FOREIGN KEY ("link_page_id") REFERENCES "public"."pages"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "people_blocks_timeline_events" ADD CONSTRAINT "people_blocks_timeline_events_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."people_blocks_timeline"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "people_blocks_timeline" ADD CONSTRAINT "people_blocks_timeline_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."people"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "people_blocks_spacer" ADD CONSTRAINT "people_blocks_spacer_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."people"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "people_blocks_html" ADD CONSTRAINT "people_blocks_html_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."people"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "people" ADD CONSTRAINT "people_portrait_id_media_id_fk" FOREIGN KEY ("portrait_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "people" ADD CONSTRAINT "people_birth_place_id_places_id_fk" FOREIGN KEY ("birth_place_id") REFERENCES "public"."places"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "people" ADD CONSTRAINT "people_death_place_id_places_id_fk" FOREIGN KEY ("death_place_id") REFERENCES "public"."places"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "people_rels" ADD CONSTRAINT "people_rels_parent_fk" FOREIGN KEY ("parent_id") REFERENCES "public"."people"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "people_rels" ADD CONSTRAINT "people_rels_people_fk" FOREIGN KEY ("people_id") REFERENCES "public"."people"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "people_rels" ADD CONSTRAINT "people_rels_categories_fk" FOREIGN KEY ("categories_id") REFERENCES "public"."categories"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "people_rels" ADD CONSTRAINT "people_rels_tags_fk" FOREIGN KEY ("tags_id") REFERENCES "public"."tags"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "people_rels" ADD CONSTRAINT "people_rels_posts_fk" FOREIGN KEY ("posts_id") REFERENCES "public"."posts"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "people_rels" ADD CONSTRAINT "people_rels_pages_fk" FOREIGN KEY ("pages_id") REFERENCES "public"."pages"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_people_v_version_role" ADD CONSTRAINT "_people_v_version_role_parent_fk" FOREIGN KEY ("parent_id") REFERENCES "public"."_people_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_people_v_version_movements" ADD CONSTRAINT "_people_v_version_movements_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_people_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_people_v_version_social_links" ADD CONSTRAINT "_people_v_version_social_links_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_people_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_people_v_blocks_hero_links" ADD CONSTRAINT "_people_v_blocks_hero_links_page_id_pages_id_fk" FOREIGN KEY ("page_id") REFERENCES "public"."pages"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "_people_v_blocks_hero_links" ADD CONSTRAINT "_people_v_blocks_hero_links_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_people_v_blocks_hero"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_people_v_blocks_hero" ADD CONSTRAINT "_people_v_blocks_hero_image_id_media_id_fk" FOREIGN KEY ("image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "_people_v_blocks_hero" ADD CONSTRAINT "_people_v_blocks_hero_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_people_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_people_v_blocks_content_columns" ADD CONSTRAINT "_people_v_blocks_content_columns_link_page_id_pages_id_fk" FOREIGN KEY ("link_page_id") REFERENCES "public"."pages"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "_people_v_blocks_content_columns" ADD CONSTRAINT "_people_v_blocks_content_columns_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_people_v_blocks_content"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_people_v_blocks_content" ADD CONSTRAINT "_people_v_blocks_content_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_people_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_people_v_blocks_media" ADD CONSTRAINT "_people_v_blocks_media_media_id_media_id_fk" FOREIGN KEY ("media_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "_people_v_blocks_media" ADD CONSTRAINT "_people_v_blocks_media_link_page_id_pages_id_fk" FOREIGN KEY ("link_page_id") REFERENCES "public"."pages"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "_people_v_blocks_media" ADD CONSTRAINT "_people_v_blocks_media_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_people_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_people_v_blocks_cta_links" ADD CONSTRAINT "_people_v_blocks_cta_links_page_id_pages_id_fk" FOREIGN KEY ("page_id") REFERENCES "public"."pages"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "_people_v_blocks_cta_links" ADD CONSTRAINT "_people_v_blocks_cta_links_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_people_v_blocks_cta"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_people_v_blocks_cta" ADD CONSTRAINT "_people_v_blocks_cta_image_id_media_id_fk" FOREIGN KEY ("image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "_people_v_blocks_cta" ADD CONSTRAINT "_people_v_blocks_cta_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_people_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_people_v_blocks_quote" ADD CONSTRAINT "_people_v_blocks_quote_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_people_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_people_v_blocks_features_items" ADD CONSTRAINT "_people_v_blocks_features_items_media_id_media_id_fk" FOREIGN KEY ("media_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "_people_v_blocks_features_items" ADD CONSTRAINT "_people_v_blocks_features_items_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_people_v_blocks_features"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_people_v_blocks_features" ADD CONSTRAINT "_people_v_blocks_features_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_people_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_people_v_blocks_stats_items" ADD CONSTRAINT "_people_v_blocks_stats_items_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_people_v_blocks_stats"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_people_v_blocks_stats" ADD CONSTRAINT "_people_v_blocks_stats_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_people_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_people_v_blocks_logo_cloud_items" ADD CONSTRAINT "_people_v_blocks_logo_cloud_items_media_id_media_id_fk" FOREIGN KEY ("media_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "_people_v_blocks_logo_cloud_items" ADD CONSTRAINT "_people_v_blocks_logo_cloud_items_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_people_v_blocks_logo_cloud"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_people_v_blocks_logo_cloud" ADD CONSTRAINT "_people_v_blocks_logo_cloud_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_people_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_people_v_blocks_testimonials_items" ADD CONSTRAINT "_people_v_blocks_testimonials_items_avatar_id_media_id_fk" FOREIGN KEY ("avatar_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "_people_v_blocks_testimonials_items" ADD CONSTRAINT "_people_v_blocks_testimonials_items_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_people_v_blocks_testimonials"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_people_v_blocks_testimonials" ADD CONSTRAINT "_people_v_blocks_testimonials_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_people_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_people_v_blocks_faq_items" ADD CONSTRAINT "_people_v_blocks_faq_items_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_people_v_blocks_faq"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_people_v_blocks_faq" ADD CONSTRAINT "_people_v_blocks_faq_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_people_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_people_v_blocks_pricing_plans_features" ADD CONSTRAINT "_people_v_blocks_pricing_plans_features_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_people_v_blocks_pricing_plans"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_people_v_blocks_pricing_plans_links" ADD CONSTRAINT "_people_v_blocks_pricing_plans_links_page_id_pages_id_fk" FOREIGN KEY ("page_id") REFERENCES "public"."pages"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "_people_v_blocks_pricing_plans_links" ADD CONSTRAINT "_people_v_blocks_pricing_plans_links_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_people_v_blocks_pricing_plans"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_people_v_blocks_pricing_plans" ADD CONSTRAINT "_people_v_blocks_pricing_plans_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_people_v_blocks_pricing"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_people_v_blocks_pricing" ADD CONSTRAINT "_people_v_blocks_pricing_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_people_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_people_v_blocks_team_items_socials" ADD CONSTRAINT "_people_v_blocks_team_items_socials_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_people_v_blocks_team_items"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_people_v_blocks_team_items" ADD CONSTRAINT "_people_v_blocks_team_items_photo_id_media_id_fk" FOREIGN KEY ("photo_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "_people_v_blocks_team_items" ADD CONSTRAINT "_people_v_blocks_team_items_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_people_v_blocks_team"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_people_v_blocks_team" ADD CONSTRAINT "_people_v_blocks_team_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_people_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_people_v_blocks_embed" ADD CONSTRAINT "_people_v_blocks_embed_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_people_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_people_v_blocks_archive" ADD CONSTRAINT "_people_v_blocks_archive_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_people_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_people_v_blocks_form" ADD CONSTRAINT "_people_v_blocks_form_form_id_forms_id_fk" FOREIGN KEY ("form_id") REFERENCES "public"."forms"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "_people_v_blocks_form" ADD CONSTRAINT "_people_v_blocks_form_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_people_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_people_v_blocks_gallery_images" ADD CONSTRAINT "_people_v_blocks_gallery_images_image_id_media_id_fk" FOREIGN KEY ("image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "_people_v_blocks_gallery_images" ADD CONSTRAINT "_people_v_blocks_gallery_images_link_page_id_pages_id_fk" FOREIGN KEY ("link_page_id") REFERENCES "public"."pages"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "_people_v_blocks_gallery_images" ADD CONSTRAINT "_people_v_blocks_gallery_images_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_people_v_blocks_gallery"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_people_v_blocks_gallery" ADD CONSTRAINT "_people_v_blocks_gallery_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_people_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_people_v_blocks_grid_items" ADD CONSTRAINT "_people_v_blocks_grid_items_image_id_media_id_fk" FOREIGN KEY ("image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "_people_v_blocks_grid_items" ADD CONSTRAINT "_people_v_blocks_grid_items_link_page_id_pages_id_fk" FOREIGN KEY ("link_page_id") REFERENCES "public"."pages"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "_people_v_blocks_grid_items" ADD CONSTRAINT "_people_v_blocks_grid_items_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_people_v_blocks_grid"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_people_v_blocks_grid" ADD CONSTRAINT "_people_v_blocks_grid_cta_page_id_pages_id_fk" FOREIGN KEY ("cta_page_id") REFERENCES "public"."pages"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "_people_v_blocks_grid" ADD CONSTRAINT "_people_v_blocks_grid_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_people_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_people_v_blocks_timeline_events" ADD CONSTRAINT "_people_v_blocks_timeline_events_image_id_media_id_fk" FOREIGN KEY ("image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "_people_v_blocks_timeline_events" ADD CONSTRAINT "_people_v_blocks_timeline_events_link_page_id_pages_id_fk" FOREIGN KEY ("link_page_id") REFERENCES "public"."pages"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "_people_v_blocks_timeline_events" ADD CONSTRAINT "_people_v_blocks_timeline_events_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_people_v_blocks_timeline"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_people_v_blocks_timeline" ADD CONSTRAINT "_people_v_blocks_timeline_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_people_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_people_v_blocks_spacer" ADD CONSTRAINT "_people_v_blocks_spacer_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_people_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_people_v_blocks_html" ADD CONSTRAINT "_people_v_blocks_html_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_people_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_people_v" ADD CONSTRAINT "_people_v_parent_id_people_id_fk" FOREIGN KEY ("parent_id") REFERENCES "public"."people"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "_people_v" ADD CONSTRAINT "_people_v_version_portrait_id_media_id_fk" FOREIGN KEY ("version_portrait_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "_people_v" ADD CONSTRAINT "_people_v_version_birth_place_id_places_id_fk" FOREIGN KEY ("version_birth_place_id") REFERENCES "public"."places"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "_people_v" ADD CONSTRAINT "_people_v_version_death_place_id_places_id_fk" FOREIGN KEY ("version_death_place_id") REFERENCES "public"."places"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "_people_v_rels" ADD CONSTRAINT "_people_v_rels_parent_fk" FOREIGN KEY ("parent_id") REFERENCES "public"."_people_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_people_v_rels" ADD CONSTRAINT "_people_v_rels_people_fk" FOREIGN KEY ("people_id") REFERENCES "public"."people"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_people_v_rels" ADD CONSTRAINT "_people_v_rels_categories_fk" FOREIGN KEY ("categories_id") REFERENCES "public"."categories"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_people_v_rels" ADD CONSTRAINT "_people_v_rels_tags_fk" FOREIGN KEY ("tags_id") REFERENCES "public"."tags"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_people_v_rels" ADD CONSTRAINT "_people_v_rels_posts_fk" FOREIGN KEY ("posts_id") REFERENCES "public"."posts"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_people_v_rels" ADD CONSTRAINT "_people_v_rels_pages_fk" FOREIGN KEY ("pages_id") REFERENCES "public"."pages"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "places_historical_names" ADD CONSTRAINT "places_historical_names_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."places"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "places_hours" ADD CONSTRAINT "places_hours_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."places"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "places_gallery" ADD CONSTRAINT "places_gallery_image_id_media_id_fk" FOREIGN KEY ("image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "places_gallery" ADD CONSTRAINT "places_gallery_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."places"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "places_blocks_hero_links" ADD CONSTRAINT "places_blocks_hero_links_page_id_pages_id_fk" FOREIGN KEY ("page_id") REFERENCES "public"."pages"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "places_blocks_hero_links" ADD CONSTRAINT "places_blocks_hero_links_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."places_blocks_hero"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "places_blocks_hero" ADD CONSTRAINT "places_blocks_hero_image_id_media_id_fk" FOREIGN KEY ("image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "places_blocks_hero" ADD CONSTRAINT "places_blocks_hero_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."places"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "places_blocks_content_columns" ADD CONSTRAINT "places_blocks_content_columns_link_page_id_pages_id_fk" FOREIGN KEY ("link_page_id") REFERENCES "public"."pages"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "places_blocks_content_columns" ADD CONSTRAINT "places_blocks_content_columns_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."places_blocks_content"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "places_blocks_content" ADD CONSTRAINT "places_blocks_content_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."places"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "places_blocks_media" ADD CONSTRAINT "places_blocks_media_media_id_media_id_fk" FOREIGN KEY ("media_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "places_blocks_media" ADD CONSTRAINT "places_blocks_media_link_page_id_pages_id_fk" FOREIGN KEY ("link_page_id") REFERENCES "public"."pages"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "places_blocks_media" ADD CONSTRAINT "places_blocks_media_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."places"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "places_blocks_cta_links" ADD CONSTRAINT "places_blocks_cta_links_page_id_pages_id_fk" FOREIGN KEY ("page_id") REFERENCES "public"."pages"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "places_blocks_cta_links" ADD CONSTRAINT "places_blocks_cta_links_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."places_blocks_cta"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "places_blocks_cta" ADD CONSTRAINT "places_blocks_cta_image_id_media_id_fk" FOREIGN KEY ("image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "places_blocks_cta" ADD CONSTRAINT "places_blocks_cta_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."places"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "places_blocks_quote" ADD CONSTRAINT "places_blocks_quote_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."places"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "places_blocks_features_items" ADD CONSTRAINT "places_blocks_features_items_media_id_media_id_fk" FOREIGN KEY ("media_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "places_blocks_features_items" ADD CONSTRAINT "places_blocks_features_items_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."places_blocks_features"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "places_blocks_features" ADD CONSTRAINT "places_blocks_features_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."places"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "places_blocks_stats_items" ADD CONSTRAINT "places_blocks_stats_items_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."places_blocks_stats"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "places_blocks_stats" ADD CONSTRAINT "places_blocks_stats_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."places"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "places_blocks_logo_cloud_items" ADD CONSTRAINT "places_blocks_logo_cloud_items_media_id_media_id_fk" FOREIGN KEY ("media_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "places_blocks_logo_cloud_items" ADD CONSTRAINT "places_blocks_logo_cloud_items_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."places_blocks_logo_cloud"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "places_blocks_logo_cloud" ADD CONSTRAINT "places_blocks_logo_cloud_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."places"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "places_blocks_testimonials_items" ADD CONSTRAINT "places_blocks_testimonials_items_avatar_id_media_id_fk" FOREIGN KEY ("avatar_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "places_blocks_testimonials_items" ADD CONSTRAINT "places_blocks_testimonials_items_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."places_blocks_testimonials"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "places_blocks_testimonials" ADD CONSTRAINT "places_blocks_testimonials_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."places"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "places_blocks_faq_items" ADD CONSTRAINT "places_blocks_faq_items_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."places_blocks_faq"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "places_blocks_faq" ADD CONSTRAINT "places_blocks_faq_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."places"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "places_blocks_pricing_plans_features" ADD CONSTRAINT "places_blocks_pricing_plans_features_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."places_blocks_pricing_plans"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "places_blocks_pricing_plans_links" ADD CONSTRAINT "places_blocks_pricing_plans_links_page_id_pages_id_fk" FOREIGN KEY ("page_id") REFERENCES "public"."pages"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "places_blocks_pricing_plans_links" ADD CONSTRAINT "places_blocks_pricing_plans_links_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."places_blocks_pricing_plans"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "places_blocks_pricing_plans" ADD CONSTRAINT "places_blocks_pricing_plans_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."places_blocks_pricing"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "places_blocks_pricing" ADD CONSTRAINT "places_blocks_pricing_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."places"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "places_blocks_team_items_socials" ADD CONSTRAINT "places_blocks_team_items_socials_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."places_blocks_team_items"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "places_blocks_team_items" ADD CONSTRAINT "places_blocks_team_items_photo_id_media_id_fk" FOREIGN KEY ("photo_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "places_blocks_team_items" ADD CONSTRAINT "places_blocks_team_items_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."places_blocks_team"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "places_blocks_team" ADD CONSTRAINT "places_blocks_team_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."places"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "places_blocks_embed" ADD CONSTRAINT "places_blocks_embed_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."places"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "places_blocks_archive" ADD CONSTRAINT "places_blocks_archive_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."places"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "places_blocks_form" ADD CONSTRAINT "places_blocks_form_form_id_forms_id_fk" FOREIGN KEY ("form_id") REFERENCES "public"."forms"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "places_blocks_form" ADD CONSTRAINT "places_blocks_form_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."places"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "places_blocks_gallery_images" ADD CONSTRAINT "places_blocks_gallery_images_image_id_media_id_fk" FOREIGN KEY ("image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "places_blocks_gallery_images" ADD CONSTRAINT "places_blocks_gallery_images_link_page_id_pages_id_fk" FOREIGN KEY ("link_page_id") REFERENCES "public"."pages"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "places_blocks_gallery_images" ADD CONSTRAINT "places_blocks_gallery_images_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."places_blocks_gallery"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "places_blocks_gallery" ADD CONSTRAINT "places_blocks_gallery_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."places"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "places_blocks_grid_items" ADD CONSTRAINT "places_blocks_grid_items_image_id_media_id_fk" FOREIGN KEY ("image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "places_blocks_grid_items" ADD CONSTRAINT "places_blocks_grid_items_link_page_id_pages_id_fk" FOREIGN KEY ("link_page_id") REFERENCES "public"."pages"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "places_blocks_grid_items" ADD CONSTRAINT "places_blocks_grid_items_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."places_blocks_grid"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "places_blocks_grid" ADD CONSTRAINT "places_blocks_grid_cta_page_id_pages_id_fk" FOREIGN KEY ("cta_page_id") REFERENCES "public"."pages"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "places_blocks_grid" ADD CONSTRAINT "places_blocks_grid_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."places"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "places_blocks_timeline_events" ADD CONSTRAINT "places_blocks_timeline_events_image_id_media_id_fk" FOREIGN KEY ("image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "places_blocks_timeline_events" ADD CONSTRAINT "places_blocks_timeline_events_link_page_id_pages_id_fk" FOREIGN KEY ("link_page_id") REFERENCES "public"."pages"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "places_blocks_timeline_events" ADD CONSTRAINT "places_blocks_timeline_events_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."places_blocks_timeline"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "places_blocks_timeline" ADD CONSTRAINT "places_blocks_timeline_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."places"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "places_blocks_spacer" ADD CONSTRAINT "places_blocks_spacer_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."places"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "places_blocks_html" ADD CONSTRAINT "places_blocks_html_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."places"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "places" ADD CONSTRAINT "places_featured_image_id_media_id_fk" FOREIGN KEY ("featured_image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "places_rels" ADD CONSTRAINT "places_rels_parent_fk" FOREIGN KEY ("parent_id") REFERENCES "public"."places"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "places_rels" ADD CONSTRAINT "places_rels_places_fk" FOREIGN KEY ("places_id") REFERENCES "public"."places"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "places_rels" ADD CONSTRAINT "places_rels_categories_fk" FOREIGN KEY ("categories_id") REFERENCES "public"."categories"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "places_rels" ADD CONSTRAINT "places_rels_tags_fk" FOREIGN KEY ("tags_id") REFERENCES "public"."tags"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "places_rels" ADD CONSTRAINT "places_rels_posts_fk" FOREIGN KEY ("posts_id") REFERENCES "public"."posts"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "places_rels" ADD CONSTRAINT "places_rels_pages_fk" FOREIGN KEY ("pages_id") REFERENCES "public"."pages"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_places_v_version_historical_names" ADD CONSTRAINT "_places_v_version_historical_names_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_places_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_places_v_version_hours" ADD CONSTRAINT "_places_v_version_hours_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_places_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_places_v_version_gallery" ADD CONSTRAINT "_places_v_version_gallery_image_id_media_id_fk" FOREIGN KEY ("image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "_places_v_version_gallery" ADD CONSTRAINT "_places_v_version_gallery_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_places_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_places_v_blocks_hero_links" ADD CONSTRAINT "_places_v_blocks_hero_links_page_id_pages_id_fk" FOREIGN KEY ("page_id") REFERENCES "public"."pages"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "_places_v_blocks_hero_links" ADD CONSTRAINT "_places_v_blocks_hero_links_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_places_v_blocks_hero"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_places_v_blocks_hero" ADD CONSTRAINT "_places_v_blocks_hero_image_id_media_id_fk" FOREIGN KEY ("image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "_places_v_blocks_hero" ADD CONSTRAINT "_places_v_blocks_hero_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_places_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_places_v_blocks_content_columns" ADD CONSTRAINT "_places_v_blocks_content_columns_link_page_id_pages_id_fk" FOREIGN KEY ("link_page_id") REFERENCES "public"."pages"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "_places_v_blocks_content_columns" ADD CONSTRAINT "_places_v_blocks_content_columns_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_places_v_blocks_content"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_places_v_blocks_content" ADD CONSTRAINT "_places_v_blocks_content_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_places_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_places_v_blocks_media" ADD CONSTRAINT "_places_v_blocks_media_media_id_media_id_fk" FOREIGN KEY ("media_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "_places_v_blocks_media" ADD CONSTRAINT "_places_v_blocks_media_link_page_id_pages_id_fk" FOREIGN KEY ("link_page_id") REFERENCES "public"."pages"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "_places_v_blocks_media" ADD CONSTRAINT "_places_v_blocks_media_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_places_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_places_v_blocks_cta_links" ADD CONSTRAINT "_places_v_blocks_cta_links_page_id_pages_id_fk" FOREIGN KEY ("page_id") REFERENCES "public"."pages"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "_places_v_blocks_cta_links" ADD CONSTRAINT "_places_v_blocks_cta_links_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_places_v_blocks_cta"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_places_v_blocks_cta" ADD CONSTRAINT "_places_v_blocks_cta_image_id_media_id_fk" FOREIGN KEY ("image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "_places_v_blocks_cta" ADD CONSTRAINT "_places_v_blocks_cta_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_places_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_places_v_blocks_quote" ADD CONSTRAINT "_places_v_blocks_quote_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_places_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_places_v_blocks_features_items" ADD CONSTRAINT "_places_v_blocks_features_items_media_id_media_id_fk" FOREIGN KEY ("media_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "_places_v_blocks_features_items" ADD CONSTRAINT "_places_v_blocks_features_items_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_places_v_blocks_features"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_places_v_blocks_features" ADD CONSTRAINT "_places_v_blocks_features_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_places_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_places_v_blocks_stats_items" ADD CONSTRAINT "_places_v_blocks_stats_items_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_places_v_blocks_stats"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_places_v_blocks_stats" ADD CONSTRAINT "_places_v_blocks_stats_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_places_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_places_v_blocks_logo_cloud_items" ADD CONSTRAINT "_places_v_blocks_logo_cloud_items_media_id_media_id_fk" FOREIGN KEY ("media_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "_places_v_blocks_logo_cloud_items" ADD CONSTRAINT "_places_v_blocks_logo_cloud_items_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_places_v_blocks_logo_cloud"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_places_v_blocks_logo_cloud" ADD CONSTRAINT "_places_v_blocks_logo_cloud_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_places_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_places_v_blocks_testimonials_items" ADD CONSTRAINT "_places_v_blocks_testimonials_items_avatar_id_media_id_fk" FOREIGN KEY ("avatar_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "_places_v_blocks_testimonials_items" ADD CONSTRAINT "_places_v_blocks_testimonials_items_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_places_v_blocks_testimonials"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_places_v_blocks_testimonials" ADD CONSTRAINT "_places_v_blocks_testimonials_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_places_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_places_v_blocks_faq_items" ADD CONSTRAINT "_places_v_blocks_faq_items_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_places_v_blocks_faq"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_places_v_blocks_faq" ADD CONSTRAINT "_places_v_blocks_faq_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_places_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_places_v_blocks_pricing_plans_features" ADD CONSTRAINT "_places_v_blocks_pricing_plans_features_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_places_v_blocks_pricing_plans"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_places_v_blocks_pricing_plans_links" ADD CONSTRAINT "_places_v_blocks_pricing_plans_links_page_id_pages_id_fk" FOREIGN KEY ("page_id") REFERENCES "public"."pages"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "_places_v_blocks_pricing_plans_links" ADD CONSTRAINT "_places_v_blocks_pricing_plans_links_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_places_v_blocks_pricing_plans"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_places_v_blocks_pricing_plans" ADD CONSTRAINT "_places_v_blocks_pricing_plans_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_places_v_blocks_pricing"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_places_v_blocks_pricing" ADD CONSTRAINT "_places_v_blocks_pricing_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_places_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_places_v_blocks_team_items_socials" ADD CONSTRAINT "_places_v_blocks_team_items_socials_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_places_v_blocks_team_items"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_places_v_blocks_team_items" ADD CONSTRAINT "_places_v_blocks_team_items_photo_id_media_id_fk" FOREIGN KEY ("photo_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "_places_v_blocks_team_items" ADD CONSTRAINT "_places_v_blocks_team_items_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_places_v_blocks_team"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_places_v_blocks_team" ADD CONSTRAINT "_places_v_blocks_team_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_places_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_places_v_blocks_embed" ADD CONSTRAINT "_places_v_blocks_embed_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_places_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_places_v_blocks_archive" ADD CONSTRAINT "_places_v_blocks_archive_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_places_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_places_v_blocks_form" ADD CONSTRAINT "_places_v_blocks_form_form_id_forms_id_fk" FOREIGN KEY ("form_id") REFERENCES "public"."forms"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "_places_v_blocks_form" ADD CONSTRAINT "_places_v_blocks_form_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_places_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_places_v_blocks_gallery_images" ADD CONSTRAINT "_places_v_blocks_gallery_images_image_id_media_id_fk" FOREIGN KEY ("image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "_places_v_blocks_gallery_images" ADD CONSTRAINT "_places_v_blocks_gallery_images_link_page_id_pages_id_fk" FOREIGN KEY ("link_page_id") REFERENCES "public"."pages"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "_places_v_blocks_gallery_images" ADD CONSTRAINT "_places_v_blocks_gallery_images_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_places_v_blocks_gallery"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_places_v_blocks_gallery" ADD CONSTRAINT "_places_v_blocks_gallery_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_places_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_places_v_blocks_grid_items" ADD CONSTRAINT "_places_v_blocks_grid_items_image_id_media_id_fk" FOREIGN KEY ("image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "_places_v_blocks_grid_items" ADD CONSTRAINT "_places_v_blocks_grid_items_link_page_id_pages_id_fk" FOREIGN KEY ("link_page_id") REFERENCES "public"."pages"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "_places_v_blocks_grid_items" ADD CONSTRAINT "_places_v_blocks_grid_items_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_places_v_blocks_grid"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_places_v_blocks_grid" ADD CONSTRAINT "_places_v_blocks_grid_cta_page_id_pages_id_fk" FOREIGN KEY ("cta_page_id") REFERENCES "public"."pages"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "_places_v_blocks_grid" ADD CONSTRAINT "_places_v_blocks_grid_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_places_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_places_v_blocks_timeline_events" ADD CONSTRAINT "_places_v_blocks_timeline_events_image_id_media_id_fk" FOREIGN KEY ("image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "_places_v_blocks_timeline_events" ADD CONSTRAINT "_places_v_blocks_timeline_events_link_page_id_pages_id_fk" FOREIGN KEY ("link_page_id") REFERENCES "public"."pages"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "_places_v_blocks_timeline_events" ADD CONSTRAINT "_places_v_blocks_timeline_events_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_places_v_blocks_timeline"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_places_v_blocks_timeline" ADD CONSTRAINT "_places_v_blocks_timeline_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_places_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_places_v_blocks_spacer" ADD CONSTRAINT "_places_v_blocks_spacer_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_places_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_places_v_blocks_html" ADD CONSTRAINT "_places_v_blocks_html_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_places_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_places_v" ADD CONSTRAINT "_places_v_parent_id_places_id_fk" FOREIGN KEY ("parent_id") REFERENCES "public"."places"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "_places_v" ADD CONSTRAINT "_places_v_version_featured_image_id_media_id_fk" FOREIGN KEY ("version_featured_image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "_places_v_rels" ADD CONSTRAINT "_places_v_rels_parent_fk" FOREIGN KEY ("parent_id") REFERENCES "public"."_places_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_places_v_rels" ADD CONSTRAINT "_places_v_rels_places_fk" FOREIGN KEY ("places_id") REFERENCES "public"."places"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_places_v_rels" ADD CONSTRAINT "_places_v_rels_categories_fk" FOREIGN KEY ("categories_id") REFERENCES "public"."categories"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_places_v_rels" ADD CONSTRAINT "_places_v_rels_tags_fk" FOREIGN KEY ("tags_id") REFERENCES "public"."tags"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_places_v_rels" ADD CONSTRAINT "_places_v_rels_posts_fk" FOREIGN KEY ("posts_id") REFERENCES "public"."posts"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_places_v_rels" ADD CONSTRAINT "_places_v_rels_pages_fk" FOREIGN KEY ("pages_id") REFERENCES "public"."pages"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "events_blocks_hero_links" ADD CONSTRAINT "events_blocks_hero_links_page_id_pages_id_fk" FOREIGN KEY ("page_id") REFERENCES "public"."pages"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "events_blocks_hero_links" ADD CONSTRAINT "events_blocks_hero_links_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."events_blocks_hero"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "events_blocks_hero" ADD CONSTRAINT "events_blocks_hero_image_id_media_id_fk" FOREIGN KEY ("image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "events_blocks_hero" ADD CONSTRAINT "events_blocks_hero_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."events"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "events_blocks_content_columns" ADD CONSTRAINT "events_blocks_content_columns_link_page_id_pages_id_fk" FOREIGN KEY ("link_page_id") REFERENCES "public"."pages"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "events_blocks_content_columns" ADD CONSTRAINT "events_blocks_content_columns_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."events_blocks_content"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "events_blocks_content" ADD CONSTRAINT "events_blocks_content_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."events"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "events_blocks_media" ADD CONSTRAINT "events_blocks_media_media_id_media_id_fk" FOREIGN KEY ("media_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "events_blocks_media" ADD CONSTRAINT "events_blocks_media_link_page_id_pages_id_fk" FOREIGN KEY ("link_page_id") REFERENCES "public"."pages"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "events_blocks_media" ADD CONSTRAINT "events_blocks_media_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."events"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "events_blocks_cta_links" ADD CONSTRAINT "events_blocks_cta_links_page_id_pages_id_fk" FOREIGN KEY ("page_id") REFERENCES "public"."pages"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "events_blocks_cta_links" ADD CONSTRAINT "events_blocks_cta_links_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."events_blocks_cta"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "events_blocks_cta" ADD CONSTRAINT "events_blocks_cta_image_id_media_id_fk" FOREIGN KEY ("image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "events_blocks_cta" ADD CONSTRAINT "events_blocks_cta_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."events"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "events_blocks_archive" ADD CONSTRAINT "events_blocks_archive_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."events"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "events_blocks_form" ADD CONSTRAINT "events_blocks_form_form_id_forms_id_fk" FOREIGN KEY ("form_id") REFERENCES "public"."forms"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "events_blocks_form" ADD CONSTRAINT "events_blocks_form_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."events"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "events_blocks_gallery_images" ADD CONSTRAINT "events_blocks_gallery_images_image_id_media_id_fk" FOREIGN KEY ("image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "events_blocks_gallery_images" ADD CONSTRAINT "events_blocks_gallery_images_link_page_id_pages_id_fk" FOREIGN KEY ("link_page_id") REFERENCES "public"."pages"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "events_blocks_gallery_images" ADD CONSTRAINT "events_blocks_gallery_images_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."events_blocks_gallery"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "events_blocks_gallery" ADD CONSTRAINT "events_blocks_gallery_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."events"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "events_blocks_grid_items" ADD CONSTRAINT "events_blocks_grid_items_image_id_media_id_fk" FOREIGN KEY ("image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "events_blocks_grid_items" ADD CONSTRAINT "events_blocks_grid_items_link_page_id_pages_id_fk" FOREIGN KEY ("link_page_id") REFERENCES "public"."pages"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "events_blocks_grid_items" ADD CONSTRAINT "events_blocks_grid_items_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."events_blocks_grid"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "events_blocks_grid" ADD CONSTRAINT "events_blocks_grid_cta_page_id_pages_id_fk" FOREIGN KEY ("cta_page_id") REFERENCES "public"."pages"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "events_blocks_grid" ADD CONSTRAINT "events_blocks_grid_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."events"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "events_blocks_timeline_events" ADD CONSTRAINT "events_blocks_timeline_events_image_id_media_id_fk" FOREIGN KEY ("image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "events_blocks_timeline_events" ADD CONSTRAINT "events_blocks_timeline_events_link_page_id_pages_id_fk" FOREIGN KEY ("link_page_id") REFERENCES "public"."pages"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "events_blocks_timeline_events" ADD CONSTRAINT "events_blocks_timeline_events_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."events_blocks_timeline"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "events_blocks_timeline" ADD CONSTRAINT "events_blocks_timeline_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."events"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "events" ADD CONSTRAINT "events_featured_image_id_media_id_fk" FOREIGN KEY ("featured_image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "events" ADD CONSTRAINT "events_venue_id_places_id_fk" FOREIGN KEY ("venue_id") REFERENCES "public"."places"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "events_rels" ADD CONSTRAINT "events_rels_parent_fk" FOREIGN KEY ("parent_id") REFERENCES "public"."events"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "events_rels" ADD CONSTRAINT "events_rels_categories_fk" FOREIGN KEY ("categories_id") REFERENCES "public"."categories"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "events_rels" ADD CONSTRAINT "events_rels_tags_fk" FOREIGN KEY ("tags_id") REFERENCES "public"."tags"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "events_rels" ADD CONSTRAINT "events_rels_people_fk" FOREIGN KEY ("people_id") REFERENCES "public"."people"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "events_rels" ADD CONSTRAINT "events_rels_events_fk" FOREIGN KEY ("events_id") REFERENCES "public"."events"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "events_rels" ADD CONSTRAINT "events_rels_posts_fk" FOREIGN KEY ("posts_id") REFERENCES "public"."posts"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "events_rels" ADD CONSTRAINT "events_rels_pages_fk" FOREIGN KEY ("pages_id") REFERENCES "public"."pages"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_events_v_blocks_hero_links" ADD CONSTRAINT "_events_v_blocks_hero_links_page_id_pages_id_fk" FOREIGN KEY ("page_id") REFERENCES "public"."pages"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "_events_v_blocks_hero_links" ADD CONSTRAINT "_events_v_blocks_hero_links_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_events_v_blocks_hero"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_events_v_blocks_hero" ADD CONSTRAINT "_events_v_blocks_hero_image_id_media_id_fk" FOREIGN KEY ("image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "_events_v_blocks_hero" ADD CONSTRAINT "_events_v_blocks_hero_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_events_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_events_v_blocks_content_columns" ADD CONSTRAINT "_events_v_blocks_content_columns_link_page_id_pages_id_fk" FOREIGN KEY ("link_page_id") REFERENCES "public"."pages"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "_events_v_blocks_content_columns" ADD CONSTRAINT "_events_v_blocks_content_columns_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_events_v_blocks_content"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_events_v_blocks_content" ADD CONSTRAINT "_events_v_blocks_content_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_events_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_events_v_blocks_media" ADD CONSTRAINT "_events_v_blocks_media_media_id_media_id_fk" FOREIGN KEY ("media_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "_events_v_blocks_media" ADD CONSTRAINT "_events_v_blocks_media_link_page_id_pages_id_fk" FOREIGN KEY ("link_page_id") REFERENCES "public"."pages"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "_events_v_blocks_media" ADD CONSTRAINT "_events_v_blocks_media_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_events_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_events_v_blocks_cta_links" ADD CONSTRAINT "_events_v_blocks_cta_links_page_id_pages_id_fk" FOREIGN KEY ("page_id") REFERENCES "public"."pages"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "_events_v_blocks_cta_links" ADD CONSTRAINT "_events_v_blocks_cta_links_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_events_v_blocks_cta"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_events_v_blocks_cta" ADD CONSTRAINT "_events_v_blocks_cta_image_id_media_id_fk" FOREIGN KEY ("image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "_events_v_blocks_cta" ADD CONSTRAINT "_events_v_blocks_cta_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_events_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_events_v_blocks_archive" ADD CONSTRAINT "_events_v_blocks_archive_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_events_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_events_v_blocks_form" ADD CONSTRAINT "_events_v_blocks_form_form_id_forms_id_fk" FOREIGN KEY ("form_id") REFERENCES "public"."forms"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "_events_v_blocks_form" ADD CONSTRAINT "_events_v_blocks_form_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_events_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_events_v_blocks_gallery_images" ADD CONSTRAINT "_events_v_blocks_gallery_images_image_id_media_id_fk" FOREIGN KEY ("image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "_events_v_blocks_gallery_images" ADD CONSTRAINT "_events_v_blocks_gallery_images_link_page_id_pages_id_fk" FOREIGN KEY ("link_page_id") REFERENCES "public"."pages"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "_events_v_blocks_gallery_images" ADD CONSTRAINT "_events_v_blocks_gallery_images_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_events_v_blocks_gallery"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_events_v_blocks_gallery" ADD CONSTRAINT "_events_v_blocks_gallery_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_events_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_events_v_blocks_grid_items" ADD CONSTRAINT "_events_v_blocks_grid_items_image_id_media_id_fk" FOREIGN KEY ("image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "_events_v_blocks_grid_items" ADD CONSTRAINT "_events_v_blocks_grid_items_link_page_id_pages_id_fk" FOREIGN KEY ("link_page_id") REFERENCES "public"."pages"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "_events_v_blocks_grid_items" ADD CONSTRAINT "_events_v_blocks_grid_items_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_events_v_blocks_grid"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_events_v_blocks_grid" ADD CONSTRAINT "_events_v_blocks_grid_cta_page_id_pages_id_fk" FOREIGN KEY ("cta_page_id") REFERENCES "public"."pages"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "_events_v_blocks_grid" ADD CONSTRAINT "_events_v_blocks_grid_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_events_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_events_v_blocks_timeline_events" ADD CONSTRAINT "_events_v_blocks_timeline_events_image_id_media_id_fk" FOREIGN KEY ("image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "_events_v_blocks_timeline_events" ADD CONSTRAINT "_events_v_blocks_timeline_events_link_page_id_pages_id_fk" FOREIGN KEY ("link_page_id") REFERENCES "public"."pages"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "_events_v_blocks_timeline_events" ADD CONSTRAINT "_events_v_blocks_timeline_events_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_events_v_blocks_timeline"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_events_v_blocks_timeline" ADD CONSTRAINT "_events_v_blocks_timeline_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_events_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_events_v" ADD CONSTRAINT "_events_v_parent_id_events_id_fk" FOREIGN KEY ("parent_id") REFERENCES "public"."events"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "_events_v" ADD CONSTRAINT "_events_v_version_featured_image_id_media_id_fk" FOREIGN KEY ("version_featured_image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "_events_v" ADD CONSTRAINT "_events_v_version_venue_id_places_id_fk" FOREIGN KEY ("version_venue_id") REFERENCES "public"."places"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "_events_v_rels" ADD CONSTRAINT "_events_v_rels_parent_fk" FOREIGN KEY ("parent_id") REFERENCES "public"."_events_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_events_v_rels" ADD CONSTRAINT "_events_v_rels_categories_fk" FOREIGN KEY ("categories_id") REFERENCES "public"."categories"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_events_v_rels" ADD CONSTRAINT "_events_v_rels_tags_fk" FOREIGN KEY ("tags_id") REFERENCES "public"."tags"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_events_v_rels" ADD CONSTRAINT "_events_v_rels_people_fk" FOREIGN KEY ("people_id") REFERENCES "public"."people"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_events_v_rels" ADD CONSTRAINT "_events_v_rels_events_fk" FOREIGN KEY ("events_id") REFERENCES "public"."events"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_events_v_rels" ADD CONSTRAINT "_events_v_rels_posts_fk" FOREIGN KEY ("posts_id") REFERENCES "public"."posts"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_events_v_rels" ADD CONSTRAINT "_events_v_rels_pages_fk" FOREIGN KEY ("pages_id") REFERENCES "public"."pages"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "header_top_bar_links" ADD CONSTRAINT "header_top_bar_links_page_id_pages_id_fk" FOREIGN KEY ("page_id") REFERENCES "public"."pages"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "header_top_bar_links" ADD CONSTRAINT "header_top_bar_links_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."header"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "page_templates_blocks_logo_cloud_items" ADD CONSTRAINT "page_templates_blocks_logo_cloud_items_media_id_media_id_fk" FOREIGN KEY ("media_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "page_templates_blocks_logo_cloud_items" ADD CONSTRAINT "page_templates_blocks_logo_cloud_items_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."page_templates_blocks_logo_cloud"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "page_templates_blocks_logo_cloud" ADD CONSTRAINT "page_templates_blocks_logo_cloud_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."page_templates"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "page_templates_blocks_video_feature" ADD CONSTRAINT "page_templates_blocks_video_feature_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."page_templates"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "page_templates_blocks_testimonials_items" ADD CONSTRAINT "page_templates_blocks_testimonials_items_avatar_id_media_id_fk" FOREIGN KEY ("avatar_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "page_templates_blocks_testimonials_items" ADD CONSTRAINT "page_templates_blocks_testimonials_items_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."page_templates_blocks_testimonials"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "page_templates_blocks_testimonials" ADD CONSTRAINT "page_templates_blocks_testimonials_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."page_templates"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "page_templates_blocks_content_columns" ADD CONSTRAINT "page_templates_blocks_content_columns_link_page_id_pages_id_fk" FOREIGN KEY ("link_page_id") REFERENCES "public"."pages"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "page_templates_blocks_content_columns" ADD CONSTRAINT "page_templates_blocks_content_columns_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."page_templates_blocks_content"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "page_templates_blocks_content" ADD CONSTRAINT "page_templates_blocks_content_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."page_templates"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "page_templates_blocks_faq_items" ADD CONSTRAINT "page_templates_blocks_faq_items_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."page_templates_blocks_faq"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "page_templates_blocks_faq" ADD CONSTRAINT "page_templates_blocks_faq_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."page_templates"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "page_templates_blocks_cta_links" ADD CONSTRAINT "page_templates_blocks_cta_links_page_id_pages_id_fk" FOREIGN KEY ("page_id") REFERENCES "public"."pages"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "page_templates_blocks_cta_links" ADD CONSTRAINT "page_templates_blocks_cta_links_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."page_templates_blocks_cta"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "page_templates_blocks_cta" ADD CONSTRAINT "page_templates_blocks_cta_image_id_media_id_fk" FOREIGN KEY ("image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "page_templates_blocks_cta" ADD CONSTRAINT "page_templates_blocks_cta_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."page_templates"("id") ON DELETE cascade ON UPDATE no action;
  CREATE INDEX "pages_blocks_contact_form_order_idx" ON "pages_blocks_contact_form" USING btree ("_order");
  CREATE INDEX "pages_blocks_contact_form_parent_id_idx" ON "pages_blocks_contact_form" USING btree ("_parent_id");
  CREATE INDEX "pages_blocks_contact_form_path_idx" ON "pages_blocks_contact_form" USING btree ("_path");
  CREATE INDEX "pages_blocks_contact_form_form_idx" ON "pages_blocks_contact_form" USING btree ("form_id");
  CREATE INDEX "pages_blocks_social_links_custom_links_order_idx" ON "pages_blocks_social_links_custom_links" USING btree ("_order");
  CREATE INDEX "pages_blocks_social_links_custom_links_parent_id_idx" ON "pages_blocks_social_links_custom_links" USING btree ("_parent_id");
  CREATE INDEX "pages_blocks_social_links_order_idx" ON "pages_blocks_social_links" USING btree ("_order");
  CREATE INDEX "pages_blocks_social_links_parent_id_idx" ON "pages_blocks_social_links" USING btree ("_parent_id");
  CREATE INDEX "pages_blocks_social_links_path_idx" ON "pages_blocks_social_links" USING btree ("_path");
  CREATE INDEX "pages_blocks_video_feature_order_idx" ON "pages_blocks_video_feature" USING btree ("_order");
  CREATE INDEX "pages_blocks_video_feature_parent_id_idx" ON "pages_blocks_video_feature" USING btree ("_parent_id");
  CREATE INDEX "pages_blocks_video_feature_path_idx" ON "pages_blocks_video_feature" USING btree ("_path");
  CREATE INDEX "pages_blocks_reusable_block_order_idx" ON "pages_blocks_reusable_block" USING btree ("_order");
  CREATE INDEX "pages_blocks_reusable_block_parent_id_idx" ON "pages_blocks_reusable_block" USING btree ("_parent_id");
  CREATE INDEX "pages_blocks_reusable_block_path_idx" ON "pages_blocks_reusable_block" USING btree ("_path");
  CREATE INDEX "pages_blocks_reusable_block_library_item_idx" ON "pages_blocks_reusable_block" USING btree ("library_item_id");
  CREATE INDEX "_pages_v_blocks_contact_form_order_idx" ON "_pages_v_blocks_contact_form" USING btree ("_order");
  CREATE INDEX "_pages_v_blocks_contact_form_parent_id_idx" ON "_pages_v_blocks_contact_form" USING btree ("_parent_id");
  CREATE INDEX "_pages_v_blocks_contact_form_path_idx" ON "_pages_v_blocks_contact_form" USING btree ("_path");
  CREATE INDEX "_pages_v_blocks_contact_form_form_idx" ON "_pages_v_blocks_contact_form" USING btree ("form_id");
  CREATE INDEX "_pages_v_blocks_social_links_custom_links_order_idx" ON "_pages_v_blocks_social_links_custom_links" USING btree ("_order");
  CREATE INDEX "_pages_v_blocks_social_links_custom_links_parent_id_idx" ON "_pages_v_blocks_social_links_custom_links" USING btree ("_parent_id");
  CREATE INDEX "_pages_v_blocks_social_links_order_idx" ON "_pages_v_blocks_social_links" USING btree ("_order");
  CREATE INDEX "_pages_v_blocks_social_links_parent_id_idx" ON "_pages_v_blocks_social_links" USING btree ("_parent_id");
  CREATE INDEX "_pages_v_blocks_social_links_path_idx" ON "_pages_v_blocks_social_links" USING btree ("_path");
  CREATE INDEX "_pages_v_blocks_video_feature_order_idx" ON "_pages_v_blocks_video_feature" USING btree ("_order");
  CREATE INDEX "_pages_v_blocks_video_feature_parent_id_idx" ON "_pages_v_blocks_video_feature" USING btree ("_parent_id");
  CREATE INDEX "_pages_v_blocks_video_feature_path_idx" ON "_pages_v_blocks_video_feature" USING btree ("_path");
  CREATE INDEX "_pages_v_blocks_reusable_block_order_idx" ON "_pages_v_blocks_reusable_block" USING btree ("_order");
  CREATE INDEX "_pages_v_blocks_reusable_block_parent_id_idx" ON "_pages_v_blocks_reusable_block" USING btree ("_parent_id");
  CREATE INDEX "_pages_v_blocks_reusable_block_path_idx" ON "_pages_v_blocks_reusable_block" USING btree ("_path");
  CREATE INDEX "_pages_v_blocks_reusable_block_library_item_idx" ON "_pages_v_blocks_reusable_block" USING btree ("library_item_id");
  CREATE INDEX "faqs_updated_at_idx" ON "faqs" USING btree ("updated_at");
  CREATE INDEX "faqs_created_at_idx" ON "faqs" USING btree ("created_at");
  CREATE INDEX "testimonials_avatar_idx" ON "testimonials" USING btree ("avatar_id");
  CREATE INDEX "testimonials_updated_at_idx" ON "testimonials" USING btree ("updated_at");
  CREATE INDEX "testimonials_created_at_idx" ON "testimonials" USING btree ("created_at");
  CREATE INDEX "locations_faqs_order_idx" ON "locations_faqs" USING btree ("_order");
  CREATE INDEX "locations_faqs_parent_id_idx" ON "locations_faqs" USING btree ("_parent_id");
  CREATE INDEX "locations_nearby_locations_order_idx" ON "locations_nearby_locations" USING btree ("_order");
  CREATE INDEX "locations_nearby_locations_parent_id_idx" ON "locations_nearby_locations" USING btree ("_parent_id");
  CREATE UNIQUE INDEX "locations_location_slug_idx" ON "locations" USING btree ("location_slug");
  CREATE INDEX "locations_updated_at_idx" ON "locations" USING btree ("updated_at");
  CREATE INDEX "locations_created_at_idx" ON "locations" USING btree ("created_at");
  CREATE INDEX "logo_clouds_media_idx" ON "logo_clouds" USING btree ("media_id");
  CREATE INDEX "logo_clouds_updated_at_idx" ON "logo_clouds" USING btree ("updated_at");
  CREATE INDEX "logo_clouds_created_at_idx" ON "logo_clouds" USING btree ("created_at");
  CREATE INDEX "global_blocks_blocks_hero_links_order_idx" ON "global_blocks_blocks_hero_links" USING btree ("_order");
  CREATE INDEX "global_blocks_blocks_hero_links_parent_id_idx" ON "global_blocks_blocks_hero_links" USING btree ("_parent_id");
  CREATE INDEX "global_blocks_blocks_hero_links_page_idx" ON "global_blocks_blocks_hero_links" USING btree ("page_id");
  CREATE INDEX "global_blocks_blocks_hero_order_idx" ON "global_blocks_blocks_hero" USING btree ("_order");
  CREATE INDEX "global_blocks_blocks_hero_parent_id_idx" ON "global_blocks_blocks_hero" USING btree ("_parent_id");
  CREATE INDEX "global_blocks_blocks_hero_path_idx" ON "global_blocks_blocks_hero" USING btree ("_path");
  CREATE INDEX "global_blocks_blocks_hero_image_idx" ON "global_blocks_blocks_hero" USING btree ("image_id");
  CREATE INDEX "global_blocks_blocks_content_columns_order_idx" ON "global_blocks_blocks_content_columns" USING btree ("_order");
  CREATE INDEX "global_blocks_blocks_content_columns_parent_id_idx" ON "global_blocks_blocks_content_columns" USING btree ("_parent_id");
  CREATE INDEX "global_blocks_blocks_content_columns_link_link_page_idx" ON "global_blocks_blocks_content_columns" USING btree ("link_page_id");
  CREATE INDEX "global_blocks_blocks_content_order_idx" ON "global_blocks_blocks_content" USING btree ("_order");
  CREATE INDEX "global_blocks_blocks_content_parent_id_idx" ON "global_blocks_blocks_content" USING btree ("_parent_id");
  CREATE INDEX "global_blocks_blocks_content_path_idx" ON "global_blocks_blocks_content" USING btree ("_path");
  CREATE INDEX "global_blocks_blocks_media_order_idx" ON "global_blocks_blocks_media" USING btree ("_order");
  CREATE INDEX "global_blocks_blocks_media_parent_id_idx" ON "global_blocks_blocks_media" USING btree ("_parent_id");
  CREATE INDEX "global_blocks_blocks_media_path_idx" ON "global_blocks_blocks_media" USING btree ("_path");
  CREATE INDEX "global_blocks_blocks_media_media_idx" ON "global_blocks_blocks_media" USING btree ("media_id");
  CREATE INDEX "global_blocks_blocks_media_link_link_page_idx" ON "global_blocks_blocks_media" USING btree ("link_page_id");
  CREATE INDEX "global_blocks_blocks_cta_links_order_idx" ON "global_blocks_blocks_cta_links" USING btree ("_order");
  CREATE INDEX "global_blocks_blocks_cta_links_parent_id_idx" ON "global_blocks_blocks_cta_links" USING btree ("_parent_id");
  CREATE INDEX "global_blocks_blocks_cta_links_page_idx" ON "global_blocks_blocks_cta_links" USING btree ("page_id");
  CREATE INDEX "global_blocks_blocks_cta_order_idx" ON "global_blocks_blocks_cta" USING btree ("_order");
  CREATE INDEX "global_blocks_blocks_cta_parent_id_idx" ON "global_blocks_blocks_cta" USING btree ("_parent_id");
  CREATE INDEX "global_blocks_blocks_cta_path_idx" ON "global_blocks_blocks_cta" USING btree ("_path");
  CREATE INDEX "global_blocks_blocks_cta_image_idx" ON "global_blocks_blocks_cta" USING btree ("image_id");
  CREATE INDEX "global_blocks_blocks_archive_order_idx" ON "global_blocks_blocks_archive" USING btree ("_order");
  CREATE INDEX "global_blocks_blocks_archive_parent_id_idx" ON "global_blocks_blocks_archive" USING btree ("_parent_id");
  CREATE INDEX "global_blocks_blocks_archive_path_idx" ON "global_blocks_blocks_archive" USING btree ("_path");
  CREATE INDEX "global_blocks_blocks_form_order_idx" ON "global_blocks_blocks_form" USING btree ("_order");
  CREATE INDEX "global_blocks_blocks_form_parent_id_idx" ON "global_blocks_blocks_form" USING btree ("_parent_id");
  CREATE INDEX "global_blocks_blocks_form_path_idx" ON "global_blocks_blocks_form" USING btree ("_path");
  CREATE INDEX "global_blocks_blocks_form_form_idx" ON "global_blocks_blocks_form" USING btree ("form_id");
  CREATE INDEX "global_blocks_blocks_quote_order_idx" ON "global_blocks_blocks_quote" USING btree ("_order");
  CREATE INDEX "global_blocks_blocks_quote_parent_id_idx" ON "global_blocks_blocks_quote" USING btree ("_parent_id");
  CREATE INDEX "global_blocks_blocks_quote_path_idx" ON "global_blocks_blocks_quote" USING btree ("_path");
  CREATE INDEX "global_blocks_blocks_features_items_order_idx" ON "global_blocks_blocks_features_items" USING btree ("_order");
  CREATE INDEX "global_blocks_blocks_features_items_parent_id_idx" ON "global_blocks_blocks_features_items" USING btree ("_parent_id");
  CREATE INDEX "global_blocks_blocks_features_items_media_idx" ON "global_blocks_blocks_features_items" USING btree ("media_id");
  CREATE INDEX "global_blocks_blocks_features_order_idx" ON "global_blocks_blocks_features" USING btree ("_order");
  CREATE INDEX "global_blocks_blocks_features_parent_id_idx" ON "global_blocks_blocks_features" USING btree ("_parent_id");
  CREATE INDEX "global_blocks_blocks_features_path_idx" ON "global_blocks_blocks_features" USING btree ("_path");
  CREATE INDEX "global_blocks_blocks_stats_items_order_idx" ON "global_blocks_blocks_stats_items" USING btree ("_order");
  CREATE INDEX "global_blocks_blocks_stats_items_parent_id_idx" ON "global_blocks_blocks_stats_items" USING btree ("_parent_id");
  CREATE INDEX "global_blocks_blocks_stats_order_idx" ON "global_blocks_blocks_stats" USING btree ("_order");
  CREATE INDEX "global_blocks_blocks_stats_parent_id_idx" ON "global_blocks_blocks_stats" USING btree ("_parent_id");
  CREATE INDEX "global_blocks_blocks_stats_path_idx" ON "global_blocks_blocks_stats" USING btree ("_path");
  CREATE INDEX "global_blocks_blocks_logo_cloud_items_order_idx" ON "global_blocks_blocks_logo_cloud_items" USING btree ("_order");
  CREATE INDEX "global_blocks_blocks_logo_cloud_items_parent_id_idx" ON "global_blocks_blocks_logo_cloud_items" USING btree ("_parent_id");
  CREATE INDEX "global_blocks_blocks_logo_cloud_items_media_idx" ON "global_blocks_blocks_logo_cloud_items" USING btree ("media_id");
  CREATE INDEX "global_blocks_blocks_logo_cloud_order_idx" ON "global_blocks_blocks_logo_cloud" USING btree ("_order");
  CREATE INDEX "global_blocks_blocks_logo_cloud_parent_id_idx" ON "global_blocks_blocks_logo_cloud" USING btree ("_parent_id");
  CREATE INDEX "global_blocks_blocks_logo_cloud_path_idx" ON "global_blocks_blocks_logo_cloud" USING btree ("_path");
  CREATE INDEX "global_blocks_blocks_testimonials_items_order_idx" ON "global_blocks_blocks_testimonials_items" USING btree ("_order");
  CREATE INDEX "global_blocks_blocks_testimonials_items_parent_id_idx" ON "global_blocks_blocks_testimonials_items" USING btree ("_parent_id");
  CREATE INDEX "global_blocks_blocks_testimonials_items_avatar_idx" ON "global_blocks_blocks_testimonials_items" USING btree ("avatar_id");
  CREATE INDEX "global_blocks_blocks_testimonials_order_idx" ON "global_blocks_blocks_testimonials" USING btree ("_order");
  CREATE INDEX "global_blocks_blocks_testimonials_parent_id_idx" ON "global_blocks_blocks_testimonials" USING btree ("_parent_id");
  CREATE INDEX "global_blocks_blocks_testimonials_path_idx" ON "global_blocks_blocks_testimonials" USING btree ("_path");
  CREATE INDEX "global_blocks_blocks_faq_items_order_idx" ON "global_blocks_blocks_faq_items" USING btree ("_order");
  CREATE INDEX "global_blocks_blocks_faq_items_parent_id_idx" ON "global_blocks_blocks_faq_items" USING btree ("_parent_id");
  CREATE INDEX "global_blocks_blocks_faq_order_idx" ON "global_blocks_blocks_faq" USING btree ("_order");
  CREATE INDEX "global_blocks_blocks_faq_parent_id_idx" ON "global_blocks_blocks_faq" USING btree ("_parent_id");
  CREATE INDEX "global_blocks_blocks_faq_path_idx" ON "global_blocks_blocks_faq" USING btree ("_path");
  CREATE INDEX "global_blocks_blocks_pricing_plans_features_order_idx" ON "global_blocks_blocks_pricing_plans_features" USING btree ("_order");
  CREATE INDEX "global_blocks_blocks_pricing_plans_features_parent_id_idx" ON "global_blocks_blocks_pricing_plans_features" USING btree ("_parent_id");
  CREATE INDEX "global_blocks_blocks_pricing_plans_links_order_idx" ON "global_blocks_blocks_pricing_plans_links" USING btree ("_order");
  CREATE INDEX "global_blocks_blocks_pricing_plans_links_parent_id_idx" ON "global_blocks_blocks_pricing_plans_links" USING btree ("_parent_id");
  CREATE INDEX "global_blocks_blocks_pricing_plans_links_page_idx" ON "global_blocks_blocks_pricing_plans_links" USING btree ("page_id");
  CREATE INDEX "global_blocks_blocks_pricing_plans_order_idx" ON "global_blocks_blocks_pricing_plans" USING btree ("_order");
  CREATE INDEX "global_blocks_blocks_pricing_plans_parent_id_idx" ON "global_blocks_blocks_pricing_plans" USING btree ("_parent_id");
  CREATE INDEX "global_blocks_blocks_pricing_order_idx" ON "global_blocks_blocks_pricing" USING btree ("_order");
  CREATE INDEX "global_blocks_blocks_pricing_parent_id_idx" ON "global_blocks_blocks_pricing" USING btree ("_parent_id");
  CREATE INDEX "global_blocks_blocks_pricing_path_idx" ON "global_blocks_blocks_pricing" USING btree ("_path");
  CREATE INDEX "global_blocks_blocks_team_items_socials_order_idx" ON "global_blocks_blocks_team_items_socials" USING btree ("_order");
  CREATE INDEX "global_blocks_blocks_team_items_socials_parent_id_idx" ON "global_blocks_blocks_team_items_socials" USING btree ("_parent_id");
  CREATE INDEX "global_blocks_blocks_team_items_order_idx" ON "global_blocks_blocks_team_items" USING btree ("_order");
  CREATE INDEX "global_blocks_blocks_team_items_parent_id_idx" ON "global_blocks_blocks_team_items" USING btree ("_parent_id");
  CREATE INDEX "global_blocks_blocks_team_items_photo_idx" ON "global_blocks_blocks_team_items" USING btree ("photo_id");
  CREATE INDEX "global_blocks_blocks_team_order_idx" ON "global_blocks_blocks_team" USING btree ("_order");
  CREATE INDEX "global_blocks_blocks_team_parent_id_idx" ON "global_blocks_blocks_team" USING btree ("_parent_id");
  CREATE INDEX "global_blocks_blocks_team_path_idx" ON "global_blocks_blocks_team" USING btree ("_path");
  CREATE INDEX "global_blocks_blocks_embed_order_idx" ON "global_blocks_blocks_embed" USING btree ("_order");
  CREATE INDEX "global_blocks_blocks_embed_parent_id_idx" ON "global_blocks_blocks_embed" USING btree ("_parent_id");
  CREATE INDEX "global_blocks_blocks_embed_path_idx" ON "global_blocks_blocks_embed" USING btree ("_path");
  CREATE INDEX "global_blocks_blocks_spacer_order_idx" ON "global_blocks_blocks_spacer" USING btree ("_order");
  CREATE INDEX "global_blocks_blocks_spacer_parent_id_idx" ON "global_blocks_blocks_spacer" USING btree ("_parent_id");
  CREATE INDEX "global_blocks_blocks_spacer_path_idx" ON "global_blocks_blocks_spacer" USING btree ("_path");
  CREATE INDEX "global_blocks_blocks_html_order_idx" ON "global_blocks_blocks_html" USING btree ("_order");
  CREATE INDEX "global_blocks_blocks_html_parent_id_idx" ON "global_blocks_blocks_html" USING btree ("_parent_id");
  CREATE INDEX "global_blocks_blocks_html_path_idx" ON "global_blocks_blocks_html" USING btree ("_path");
  CREATE INDEX "global_blocks_blocks_gallery_images_order_idx" ON "global_blocks_blocks_gallery_images" USING btree ("_order");
  CREATE INDEX "global_blocks_blocks_gallery_images_parent_id_idx" ON "global_blocks_blocks_gallery_images" USING btree ("_parent_id");
  CREATE INDEX "global_blocks_blocks_gallery_images_image_idx" ON "global_blocks_blocks_gallery_images" USING btree ("image_id");
  CREATE INDEX "global_blocks_blocks_gallery_images_link_link_page_idx" ON "global_blocks_blocks_gallery_images" USING btree ("link_page_id");
  CREATE INDEX "global_blocks_blocks_gallery_order_idx" ON "global_blocks_blocks_gallery" USING btree ("_order");
  CREATE INDEX "global_blocks_blocks_gallery_parent_id_idx" ON "global_blocks_blocks_gallery" USING btree ("_parent_id");
  CREATE INDEX "global_blocks_blocks_gallery_path_idx" ON "global_blocks_blocks_gallery" USING btree ("_path");
  CREATE INDEX "global_blocks_blocks_grid_items_order_idx" ON "global_blocks_blocks_grid_items" USING btree ("_order");
  CREATE INDEX "global_blocks_blocks_grid_items_parent_id_idx" ON "global_blocks_blocks_grid_items" USING btree ("_parent_id");
  CREATE INDEX "global_blocks_blocks_grid_items_image_idx" ON "global_blocks_blocks_grid_items" USING btree ("image_id");
  CREATE INDEX "global_blocks_blocks_grid_items_link_link_page_idx" ON "global_blocks_blocks_grid_items" USING btree ("link_page_id");
  CREATE INDEX "global_blocks_blocks_grid_order_idx" ON "global_blocks_blocks_grid" USING btree ("_order");
  CREATE INDEX "global_blocks_blocks_grid_parent_id_idx" ON "global_blocks_blocks_grid" USING btree ("_parent_id");
  CREATE INDEX "global_blocks_blocks_grid_path_idx" ON "global_blocks_blocks_grid" USING btree ("_path");
  CREATE INDEX "global_blocks_blocks_grid_cta_cta_page_idx" ON "global_blocks_blocks_grid" USING btree ("cta_page_id");
  CREATE INDEX "global_blocks_blocks_timeline_events_order_idx" ON "global_blocks_blocks_timeline_events" USING btree ("_order");
  CREATE INDEX "global_blocks_blocks_timeline_events_parent_id_idx" ON "global_blocks_blocks_timeline_events" USING btree ("_parent_id");
  CREATE INDEX "global_blocks_blocks_timeline_events_image_idx" ON "global_blocks_blocks_timeline_events" USING btree ("image_id");
  CREATE INDEX "global_blocks_blocks_timeline_events_link_link_page_idx" ON "global_blocks_blocks_timeline_events" USING btree ("link_page_id");
  CREATE INDEX "global_blocks_blocks_timeline_order_idx" ON "global_blocks_blocks_timeline" USING btree ("_order");
  CREATE INDEX "global_blocks_blocks_timeline_parent_id_idx" ON "global_blocks_blocks_timeline" USING btree ("_parent_id");
  CREATE INDEX "global_blocks_blocks_timeline_path_idx" ON "global_blocks_blocks_timeline" USING btree ("_path");
  CREATE INDEX "global_blocks_updated_at_idx" ON "global_blocks" USING btree ("updated_at");
  CREATE INDEX "global_blocks_created_at_idx" ON "global_blocks" USING btree ("created_at");
  CREATE INDEX "global_blocks_rels_order_idx" ON "global_blocks_rels" USING btree ("order");
  CREATE INDEX "global_blocks_rels_parent_idx" ON "global_blocks_rels" USING btree ("parent_id");
  CREATE INDEX "global_blocks_rels_path_idx" ON "global_blocks_rels" USING btree ("path");
  CREATE INDEX "global_blocks_rels_categories_id_idx" ON "global_blocks_rels" USING btree ("categories_id");
  CREATE INDEX "global_blocks_rels_tags_id_idx" ON "global_blocks_rels" USING btree ("tags_id");
  CREATE INDEX "global_blocks_rels_posts_id_idx" ON "global_blocks_rels" USING btree ("posts_id");
  CREATE INDEX "global_blocks_rels_pages_id_idx" ON "global_blocks_rels" USING btree ("pages_id");
  CREATE INDEX "block_library_updated_at_idx" ON "block_library" USING btree ("updated_at");
  CREATE INDEX "block_library_created_at_idx" ON "block_library" USING btree ("created_at");
  CREATE INDEX "block_template_builder_blocks_hero_links_order_idx" ON "block_template_builder_blocks_hero_links" USING btree ("_order");
  CREATE INDEX "block_template_builder_blocks_hero_links_parent_id_idx" ON "block_template_builder_blocks_hero_links" USING btree ("_parent_id");
  CREATE INDEX "block_template_builder_blocks_hero_links_page_idx" ON "block_template_builder_blocks_hero_links" USING btree ("page_id");
  CREATE INDEX "block_template_builder_blocks_hero_order_idx" ON "block_template_builder_blocks_hero" USING btree ("_order");
  CREATE INDEX "block_template_builder_blocks_hero_parent_id_idx" ON "block_template_builder_blocks_hero" USING btree ("_parent_id");
  CREATE INDEX "block_template_builder_blocks_hero_path_idx" ON "block_template_builder_blocks_hero" USING btree ("_path");
  CREATE INDEX "block_template_builder_blocks_hero_image_idx" ON "block_template_builder_blocks_hero" USING btree ("image_id");
  CREATE INDEX "block_template_builder_blocks_content_columns_order_idx" ON "block_template_builder_blocks_content_columns" USING btree ("_order");
  CREATE INDEX "block_template_builder_blocks_content_columns_parent_id_idx" ON "block_template_builder_blocks_content_columns" USING btree ("_parent_id");
  CREATE INDEX "block_template_builder_blocks_content_columns_link_link__idx" ON "block_template_builder_blocks_content_columns" USING btree ("link_page_id");
  CREATE INDEX "block_template_builder_blocks_content_order_idx" ON "block_template_builder_blocks_content" USING btree ("_order");
  CREATE INDEX "block_template_builder_blocks_content_parent_id_idx" ON "block_template_builder_blocks_content" USING btree ("_parent_id");
  CREATE INDEX "block_template_builder_blocks_content_path_idx" ON "block_template_builder_blocks_content" USING btree ("_path");
  CREATE INDEX "block_template_builder_blocks_media_order_idx" ON "block_template_builder_blocks_media" USING btree ("_order");
  CREATE INDEX "block_template_builder_blocks_media_parent_id_idx" ON "block_template_builder_blocks_media" USING btree ("_parent_id");
  CREATE INDEX "block_template_builder_blocks_media_path_idx" ON "block_template_builder_blocks_media" USING btree ("_path");
  CREATE INDEX "block_template_builder_blocks_media_media_idx" ON "block_template_builder_blocks_media" USING btree ("media_id");
  CREATE INDEX "block_template_builder_blocks_media_link_link_page_idx" ON "block_template_builder_blocks_media" USING btree ("link_page_id");
  CREATE INDEX "block_template_builder_blocks_cta_links_order_idx" ON "block_template_builder_blocks_cta_links" USING btree ("_order");
  CREATE INDEX "block_template_builder_blocks_cta_links_parent_id_idx" ON "block_template_builder_blocks_cta_links" USING btree ("_parent_id");
  CREATE INDEX "block_template_builder_blocks_cta_links_page_idx" ON "block_template_builder_blocks_cta_links" USING btree ("page_id");
  CREATE INDEX "block_template_builder_blocks_cta_order_idx" ON "block_template_builder_blocks_cta" USING btree ("_order");
  CREATE INDEX "block_template_builder_blocks_cta_parent_id_idx" ON "block_template_builder_blocks_cta" USING btree ("_parent_id");
  CREATE INDEX "block_template_builder_blocks_cta_path_idx" ON "block_template_builder_blocks_cta" USING btree ("_path");
  CREATE INDEX "block_template_builder_blocks_cta_image_idx" ON "block_template_builder_blocks_cta" USING btree ("image_id");
  CREATE INDEX "block_template_builder_blocks_archive_order_idx" ON "block_template_builder_blocks_archive" USING btree ("_order");
  CREATE INDEX "block_template_builder_blocks_archive_parent_id_idx" ON "block_template_builder_blocks_archive" USING btree ("_parent_id");
  CREATE INDEX "block_template_builder_blocks_archive_path_idx" ON "block_template_builder_blocks_archive" USING btree ("_path");
  CREATE INDEX "block_template_builder_blocks_form_order_idx" ON "block_template_builder_blocks_form" USING btree ("_order");
  CREATE INDEX "block_template_builder_blocks_form_parent_id_idx" ON "block_template_builder_blocks_form" USING btree ("_parent_id");
  CREATE INDEX "block_template_builder_blocks_form_path_idx" ON "block_template_builder_blocks_form" USING btree ("_path");
  CREATE INDEX "block_template_builder_blocks_form_form_idx" ON "block_template_builder_blocks_form" USING btree ("form_id");
  CREATE INDEX "block_template_builder_blocks_quote_order_idx" ON "block_template_builder_blocks_quote" USING btree ("_order");
  CREATE INDEX "block_template_builder_blocks_quote_parent_id_idx" ON "block_template_builder_blocks_quote" USING btree ("_parent_id");
  CREATE INDEX "block_template_builder_blocks_quote_path_idx" ON "block_template_builder_blocks_quote" USING btree ("_path");
  CREATE INDEX "block_template_builder_blocks_features_items_order_idx" ON "block_template_builder_blocks_features_items" USING btree ("_order");
  CREATE INDEX "block_template_builder_blocks_features_items_parent_id_idx" ON "block_template_builder_blocks_features_items" USING btree ("_parent_id");
  CREATE INDEX "block_template_builder_blocks_features_items_media_idx" ON "block_template_builder_blocks_features_items" USING btree ("media_id");
  CREATE INDEX "block_template_builder_blocks_features_order_idx" ON "block_template_builder_blocks_features" USING btree ("_order");
  CREATE INDEX "block_template_builder_blocks_features_parent_id_idx" ON "block_template_builder_blocks_features" USING btree ("_parent_id");
  CREATE INDEX "block_template_builder_blocks_features_path_idx" ON "block_template_builder_blocks_features" USING btree ("_path");
  CREATE INDEX "block_template_builder_blocks_stats_items_order_idx" ON "block_template_builder_blocks_stats_items" USING btree ("_order");
  CREATE INDEX "block_template_builder_blocks_stats_items_parent_id_idx" ON "block_template_builder_blocks_stats_items" USING btree ("_parent_id");
  CREATE INDEX "block_template_builder_blocks_stats_order_idx" ON "block_template_builder_blocks_stats" USING btree ("_order");
  CREATE INDEX "block_template_builder_blocks_stats_parent_id_idx" ON "block_template_builder_blocks_stats" USING btree ("_parent_id");
  CREATE INDEX "block_template_builder_blocks_stats_path_idx" ON "block_template_builder_blocks_stats" USING btree ("_path");
  CREATE INDEX "block_template_builder_blocks_logo_cloud_items_order_idx" ON "block_template_builder_blocks_logo_cloud_items" USING btree ("_order");
  CREATE INDEX "block_template_builder_blocks_logo_cloud_items_parent_id_idx" ON "block_template_builder_blocks_logo_cloud_items" USING btree ("_parent_id");
  CREATE INDEX "block_template_builder_blocks_logo_cloud_items_media_idx" ON "block_template_builder_blocks_logo_cloud_items" USING btree ("media_id");
  CREATE INDEX "block_template_builder_blocks_logo_cloud_order_idx" ON "block_template_builder_blocks_logo_cloud" USING btree ("_order");
  CREATE INDEX "block_template_builder_blocks_logo_cloud_parent_id_idx" ON "block_template_builder_blocks_logo_cloud" USING btree ("_parent_id");
  CREATE INDEX "block_template_builder_blocks_logo_cloud_path_idx" ON "block_template_builder_blocks_logo_cloud" USING btree ("_path");
  CREATE INDEX "block_template_builder_blocks_testimonials_items_order_idx" ON "block_template_builder_blocks_testimonials_items" USING btree ("_order");
  CREATE INDEX "block_template_builder_blocks_testimonials_items_parent_id_idx" ON "block_template_builder_blocks_testimonials_items" USING btree ("_parent_id");
  CREATE INDEX "block_template_builder_blocks_testimonials_items_avatar_idx" ON "block_template_builder_blocks_testimonials_items" USING btree ("avatar_id");
  CREATE INDEX "block_template_builder_blocks_testimonials_order_idx" ON "block_template_builder_blocks_testimonials" USING btree ("_order");
  CREATE INDEX "block_template_builder_blocks_testimonials_parent_id_idx" ON "block_template_builder_blocks_testimonials" USING btree ("_parent_id");
  CREATE INDEX "block_template_builder_blocks_testimonials_path_idx" ON "block_template_builder_blocks_testimonials" USING btree ("_path");
  CREATE INDEX "block_template_builder_blocks_faq_items_order_idx" ON "block_template_builder_blocks_faq_items" USING btree ("_order");
  CREATE INDEX "block_template_builder_blocks_faq_items_parent_id_idx" ON "block_template_builder_blocks_faq_items" USING btree ("_parent_id");
  CREATE INDEX "block_template_builder_blocks_faq_order_idx" ON "block_template_builder_blocks_faq" USING btree ("_order");
  CREATE INDEX "block_template_builder_blocks_faq_parent_id_idx" ON "block_template_builder_blocks_faq" USING btree ("_parent_id");
  CREATE INDEX "block_template_builder_blocks_faq_path_idx" ON "block_template_builder_blocks_faq" USING btree ("_path");
  CREATE INDEX "block_template_builder_blocks_pricing_plans_features_order_idx" ON "block_template_builder_blocks_pricing_plans_features" USING btree ("_order");
  CREATE INDEX "block_template_builder_blocks_pricing_plans_features_parent_id_idx" ON "block_template_builder_blocks_pricing_plans_features" USING btree ("_parent_id");
  CREATE INDEX "block_template_builder_blocks_pricing_plans_links_order_idx" ON "block_template_builder_blocks_pricing_plans_links" USING btree ("_order");
  CREATE INDEX "block_template_builder_blocks_pricing_plans_links_parent_id_idx" ON "block_template_builder_blocks_pricing_plans_links" USING btree ("_parent_id");
  CREATE INDEX "block_template_builder_blocks_pricing_plans_links_page_idx" ON "block_template_builder_blocks_pricing_plans_links" USING btree ("page_id");
  CREATE INDEX "block_template_builder_blocks_pricing_plans_order_idx" ON "block_template_builder_blocks_pricing_plans" USING btree ("_order");
  CREATE INDEX "block_template_builder_blocks_pricing_plans_parent_id_idx" ON "block_template_builder_blocks_pricing_plans" USING btree ("_parent_id");
  CREATE INDEX "block_template_builder_blocks_pricing_order_idx" ON "block_template_builder_blocks_pricing" USING btree ("_order");
  CREATE INDEX "block_template_builder_blocks_pricing_parent_id_idx" ON "block_template_builder_blocks_pricing" USING btree ("_parent_id");
  CREATE INDEX "block_template_builder_blocks_pricing_path_idx" ON "block_template_builder_blocks_pricing" USING btree ("_path");
  CREATE INDEX "block_template_builder_blocks_team_items_socials_order_idx" ON "block_template_builder_blocks_team_items_socials" USING btree ("_order");
  CREATE INDEX "block_template_builder_blocks_team_items_socials_parent_id_idx" ON "block_template_builder_blocks_team_items_socials" USING btree ("_parent_id");
  CREATE INDEX "block_template_builder_blocks_team_items_order_idx" ON "block_template_builder_blocks_team_items" USING btree ("_order");
  CREATE INDEX "block_template_builder_blocks_team_items_parent_id_idx" ON "block_template_builder_blocks_team_items" USING btree ("_parent_id");
  CREATE INDEX "block_template_builder_blocks_team_items_photo_idx" ON "block_template_builder_blocks_team_items" USING btree ("photo_id");
  CREATE INDEX "block_template_builder_blocks_team_order_idx" ON "block_template_builder_blocks_team" USING btree ("_order");
  CREATE INDEX "block_template_builder_blocks_team_parent_id_idx" ON "block_template_builder_blocks_team" USING btree ("_parent_id");
  CREATE INDEX "block_template_builder_blocks_team_path_idx" ON "block_template_builder_blocks_team" USING btree ("_path");
  CREATE INDEX "block_template_builder_blocks_embed_order_idx" ON "block_template_builder_blocks_embed" USING btree ("_order");
  CREATE INDEX "block_template_builder_blocks_embed_parent_id_idx" ON "block_template_builder_blocks_embed" USING btree ("_parent_id");
  CREATE INDEX "block_template_builder_blocks_embed_path_idx" ON "block_template_builder_blocks_embed" USING btree ("_path");
  CREATE INDEX "block_template_builder_blocks_spacer_order_idx" ON "block_template_builder_blocks_spacer" USING btree ("_order");
  CREATE INDEX "block_template_builder_blocks_spacer_parent_id_idx" ON "block_template_builder_blocks_spacer" USING btree ("_parent_id");
  CREATE INDEX "block_template_builder_blocks_spacer_path_idx" ON "block_template_builder_blocks_spacer" USING btree ("_path");
  CREATE INDEX "block_template_builder_blocks_html_order_idx" ON "block_template_builder_blocks_html" USING btree ("_order");
  CREATE INDEX "block_template_builder_blocks_html_parent_id_idx" ON "block_template_builder_blocks_html" USING btree ("_parent_id");
  CREATE INDEX "block_template_builder_blocks_html_path_idx" ON "block_template_builder_blocks_html" USING btree ("_path");
  CREATE INDEX "block_template_builder_blocks_gallery_images_order_idx" ON "block_template_builder_blocks_gallery_images" USING btree ("_order");
  CREATE INDEX "block_template_builder_blocks_gallery_images_parent_id_idx" ON "block_template_builder_blocks_gallery_images" USING btree ("_parent_id");
  CREATE INDEX "block_template_builder_blocks_gallery_images_image_idx" ON "block_template_builder_blocks_gallery_images" USING btree ("image_id");
  CREATE INDEX "block_template_builder_blocks_gallery_images_link_link_p_idx" ON "block_template_builder_blocks_gallery_images" USING btree ("link_page_id");
  CREATE INDEX "block_template_builder_blocks_gallery_order_idx" ON "block_template_builder_blocks_gallery" USING btree ("_order");
  CREATE INDEX "block_template_builder_blocks_gallery_parent_id_idx" ON "block_template_builder_blocks_gallery" USING btree ("_parent_id");
  CREATE INDEX "block_template_builder_blocks_gallery_path_idx" ON "block_template_builder_blocks_gallery" USING btree ("_path");
  CREATE INDEX "block_template_builder_blocks_grid_items_order_idx" ON "block_template_builder_blocks_grid_items" USING btree ("_order");
  CREATE INDEX "block_template_builder_blocks_grid_items_parent_id_idx" ON "block_template_builder_blocks_grid_items" USING btree ("_parent_id");
  CREATE INDEX "block_template_builder_blocks_grid_items_image_idx" ON "block_template_builder_blocks_grid_items" USING btree ("image_id");
  CREATE INDEX "block_template_builder_blocks_grid_items_link_link_page_idx" ON "block_template_builder_blocks_grid_items" USING btree ("link_page_id");
  CREATE INDEX "block_template_builder_blocks_grid_order_idx" ON "block_template_builder_blocks_grid" USING btree ("_order");
  CREATE INDEX "block_template_builder_blocks_grid_parent_id_idx" ON "block_template_builder_blocks_grid" USING btree ("_parent_id");
  CREATE INDEX "block_template_builder_blocks_grid_path_idx" ON "block_template_builder_blocks_grid" USING btree ("_path");
  CREATE INDEX "block_template_builder_blocks_grid_cta_cta_page_idx" ON "block_template_builder_blocks_grid" USING btree ("cta_page_id");
  CREATE INDEX "block_template_builder_blocks_timeline_events_order_idx" ON "block_template_builder_blocks_timeline_events" USING btree ("_order");
  CREATE INDEX "block_template_builder_blocks_timeline_events_parent_id_idx" ON "block_template_builder_blocks_timeline_events" USING btree ("_parent_id");
  CREATE INDEX "block_template_builder_blocks_timeline_events_image_idx" ON "block_template_builder_blocks_timeline_events" USING btree ("image_id");
  CREATE INDEX "block_template_builder_blocks_timeline_events_link_link__idx" ON "block_template_builder_blocks_timeline_events" USING btree ("link_page_id");
  CREATE INDEX "block_template_builder_blocks_timeline_order_idx" ON "block_template_builder_blocks_timeline" USING btree ("_order");
  CREATE INDEX "block_template_builder_blocks_timeline_parent_id_idx" ON "block_template_builder_blocks_timeline" USING btree ("_parent_id");
  CREATE INDEX "block_template_builder_blocks_timeline_path_idx" ON "block_template_builder_blocks_timeline" USING btree ("_path");
  CREATE INDEX "block_template_builder_rels_order_idx" ON "block_template_builder_rels" USING btree ("order");
  CREATE INDEX "block_template_builder_rels_parent_idx" ON "block_template_builder_rels" USING btree ("parent_id");
  CREATE INDEX "block_template_builder_rels_path_idx" ON "block_template_builder_rels" USING btree ("path");
  CREATE INDEX "block_template_builder_rels_categories_id_idx" ON "block_template_builder_rels" USING btree ("categories_id");
  CREATE INDEX "block_template_builder_rels_tags_id_idx" ON "block_template_builder_rels" USING btree ("tags_id");
  CREATE INDEX "block_template_builder_rels_posts_id_idx" ON "block_template_builder_rels" USING btree ("posts_id");
  CREATE INDEX "block_template_builder_rels_pages_id_idx" ON "block_template_builder_rels" USING btree ("pages_id");
  CREATE INDEX "content_types_custom_fields_order_idx" ON "content_types_custom_fields" USING btree ("_order");
  CREATE INDEX "content_types_custom_fields_parent_id_idx" ON "content_types_custom_fields" USING btree ("_parent_id");
  CREATE UNIQUE INDEX "content_types_slug_idx" ON "content_types" USING btree ("slug");
  CREATE INDEX "content_types_updated_at_idx" ON "content_types" USING btree ("updated_at");
  CREATE INDEX "content_types_created_at_idx" ON "content_types" USING btree ("created_at");
  CREATE INDEX "custom_items_blocks_hero_links_order_idx" ON "custom_items_blocks_hero_links" USING btree ("_order");
  CREATE INDEX "custom_items_blocks_hero_links_parent_id_idx" ON "custom_items_blocks_hero_links" USING btree ("_parent_id");
  CREATE INDEX "custom_items_blocks_hero_links_page_idx" ON "custom_items_blocks_hero_links" USING btree ("page_id");
  CREATE INDEX "custom_items_blocks_hero_order_idx" ON "custom_items_blocks_hero" USING btree ("_order");
  CREATE INDEX "custom_items_blocks_hero_parent_id_idx" ON "custom_items_blocks_hero" USING btree ("_parent_id");
  CREATE INDEX "custom_items_blocks_hero_path_idx" ON "custom_items_blocks_hero" USING btree ("_path");
  CREATE INDEX "custom_items_blocks_hero_image_idx" ON "custom_items_blocks_hero" USING btree ("image_id");
  CREATE INDEX "custom_items_blocks_content_columns_order_idx" ON "custom_items_blocks_content_columns" USING btree ("_order");
  CREATE INDEX "custom_items_blocks_content_columns_parent_id_idx" ON "custom_items_blocks_content_columns" USING btree ("_parent_id");
  CREATE INDEX "custom_items_blocks_content_columns_link_link_page_idx" ON "custom_items_blocks_content_columns" USING btree ("link_page_id");
  CREATE INDEX "custom_items_blocks_content_order_idx" ON "custom_items_blocks_content" USING btree ("_order");
  CREATE INDEX "custom_items_blocks_content_parent_id_idx" ON "custom_items_blocks_content" USING btree ("_parent_id");
  CREATE INDEX "custom_items_blocks_content_path_idx" ON "custom_items_blocks_content" USING btree ("_path");
  CREATE INDEX "custom_items_blocks_media_order_idx" ON "custom_items_blocks_media" USING btree ("_order");
  CREATE INDEX "custom_items_blocks_media_parent_id_idx" ON "custom_items_blocks_media" USING btree ("_parent_id");
  CREATE INDEX "custom_items_blocks_media_path_idx" ON "custom_items_blocks_media" USING btree ("_path");
  CREATE INDEX "custom_items_blocks_media_media_idx" ON "custom_items_blocks_media" USING btree ("media_id");
  CREATE INDEX "custom_items_blocks_media_link_link_page_idx" ON "custom_items_blocks_media" USING btree ("link_page_id");
  CREATE INDEX "custom_items_blocks_cta_links_order_idx" ON "custom_items_blocks_cta_links" USING btree ("_order");
  CREATE INDEX "custom_items_blocks_cta_links_parent_id_idx" ON "custom_items_blocks_cta_links" USING btree ("_parent_id");
  CREATE INDEX "custom_items_blocks_cta_links_page_idx" ON "custom_items_blocks_cta_links" USING btree ("page_id");
  CREATE INDEX "custom_items_blocks_cta_order_idx" ON "custom_items_blocks_cta" USING btree ("_order");
  CREATE INDEX "custom_items_blocks_cta_parent_id_idx" ON "custom_items_blocks_cta" USING btree ("_parent_id");
  CREATE INDEX "custom_items_blocks_cta_path_idx" ON "custom_items_blocks_cta" USING btree ("_path");
  CREATE INDEX "custom_items_blocks_cta_image_idx" ON "custom_items_blocks_cta" USING btree ("image_id");
  CREATE INDEX "custom_items_blocks_quote_order_idx" ON "custom_items_blocks_quote" USING btree ("_order");
  CREATE INDEX "custom_items_blocks_quote_parent_id_idx" ON "custom_items_blocks_quote" USING btree ("_parent_id");
  CREATE INDEX "custom_items_blocks_quote_path_idx" ON "custom_items_blocks_quote" USING btree ("_path");
  CREATE INDEX "custom_items_blocks_features_items_order_idx" ON "custom_items_blocks_features_items" USING btree ("_order");
  CREATE INDEX "custom_items_blocks_features_items_parent_id_idx" ON "custom_items_blocks_features_items" USING btree ("_parent_id");
  CREATE INDEX "custom_items_blocks_features_items_media_idx" ON "custom_items_blocks_features_items" USING btree ("media_id");
  CREATE INDEX "custom_items_blocks_features_order_idx" ON "custom_items_blocks_features" USING btree ("_order");
  CREATE INDEX "custom_items_blocks_features_parent_id_idx" ON "custom_items_blocks_features" USING btree ("_parent_id");
  CREATE INDEX "custom_items_blocks_features_path_idx" ON "custom_items_blocks_features" USING btree ("_path");
  CREATE INDEX "custom_items_blocks_stats_items_order_idx" ON "custom_items_blocks_stats_items" USING btree ("_order");
  CREATE INDEX "custom_items_blocks_stats_items_parent_id_idx" ON "custom_items_blocks_stats_items" USING btree ("_parent_id");
  CREATE INDEX "custom_items_blocks_stats_order_idx" ON "custom_items_blocks_stats" USING btree ("_order");
  CREATE INDEX "custom_items_blocks_stats_parent_id_idx" ON "custom_items_blocks_stats" USING btree ("_parent_id");
  CREATE INDEX "custom_items_blocks_stats_path_idx" ON "custom_items_blocks_stats" USING btree ("_path");
  CREATE INDEX "custom_items_blocks_logo_cloud_items_order_idx" ON "custom_items_blocks_logo_cloud_items" USING btree ("_order");
  CREATE INDEX "custom_items_blocks_logo_cloud_items_parent_id_idx" ON "custom_items_blocks_logo_cloud_items" USING btree ("_parent_id");
  CREATE INDEX "custom_items_blocks_logo_cloud_items_media_idx" ON "custom_items_blocks_logo_cloud_items" USING btree ("media_id");
  CREATE INDEX "custom_items_blocks_logo_cloud_order_idx" ON "custom_items_blocks_logo_cloud" USING btree ("_order");
  CREATE INDEX "custom_items_blocks_logo_cloud_parent_id_idx" ON "custom_items_blocks_logo_cloud" USING btree ("_parent_id");
  CREATE INDEX "custom_items_blocks_logo_cloud_path_idx" ON "custom_items_blocks_logo_cloud" USING btree ("_path");
  CREATE INDEX "custom_items_blocks_testimonials_items_order_idx" ON "custom_items_blocks_testimonials_items" USING btree ("_order");
  CREATE INDEX "custom_items_blocks_testimonials_items_parent_id_idx" ON "custom_items_blocks_testimonials_items" USING btree ("_parent_id");
  CREATE INDEX "custom_items_blocks_testimonials_items_avatar_idx" ON "custom_items_blocks_testimonials_items" USING btree ("avatar_id");
  CREATE INDEX "custom_items_blocks_testimonials_order_idx" ON "custom_items_blocks_testimonials" USING btree ("_order");
  CREATE INDEX "custom_items_blocks_testimonials_parent_id_idx" ON "custom_items_blocks_testimonials" USING btree ("_parent_id");
  CREATE INDEX "custom_items_blocks_testimonials_path_idx" ON "custom_items_blocks_testimonials" USING btree ("_path");
  CREATE INDEX "custom_items_blocks_faq_items_order_idx" ON "custom_items_blocks_faq_items" USING btree ("_order");
  CREATE INDEX "custom_items_blocks_faq_items_parent_id_idx" ON "custom_items_blocks_faq_items" USING btree ("_parent_id");
  CREATE INDEX "custom_items_blocks_faq_order_idx" ON "custom_items_blocks_faq" USING btree ("_order");
  CREATE INDEX "custom_items_blocks_faq_parent_id_idx" ON "custom_items_blocks_faq" USING btree ("_parent_id");
  CREATE INDEX "custom_items_blocks_faq_path_idx" ON "custom_items_blocks_faq" USING btree ("_path");
  CREATE INDEX "custom_items_blocks_pricing_plans_features_order_idx" ON "custom_items_blocks_pricing_plans_features" USING btree ("_order");
  CREATE INDEX "custom_items_blocks_pricing_plans_features_parent_id_idx" ON "custom_items_blocks_pricing_plans_features" USING btree ("_parent_id");
  CREATE INDEX "custom_items_blocks_pricing_plans_links_order_idx" ON "custom_items_blocks_pricing_plans_links" USING btree ("_order");
  CREATE INDEX "custom_items_blocks_pricing_plans_links_parent_id_idx" ON "custom_items_blocks_pricing_plans_links" USING btree ("_parent_id");
  CREATE INDEX "custom_items_blocks_pricing_plans_links_page_idx" ON "custom_items_blocks_pricing_plans_links" USING btree ("page_id");
  CREATE INDEX "custom_items_blocks_pricing_plans_order_idx" ON "custom_items_blocks_pricing_plans" USING btree ("_order");
  CREATE INDEX "custom_items_blocks_pricing_plans_parent_id_idx" ON "custom_items_blocks_pricing_plans" USING btree ("_parent_id");
  CREATE INDEX "custom_items_blocks_pricing_order_idx" ON "custom_items_blocks_pricing" USING btree ("_order");
  CREATE INDEX "custom_items_blocks_pricing_parent_id_idx" ON "custom_items_blocks_pricing" USING btree ("_parent_id");
  CREATE INDEX "custom_items_blocks_pricing_path_idx" ON "custom_items_blocks_pricing" USING btree ("_path");
  CREATE INDEX "custom_items_blocks_team_items_socials_order_idx" ON "custom_items_blocks_team_items_socials" USING btree ("_order");
  CREATE INDEX "custom_items_blocks_team_items_socials_parent_id_idx" ON "custom_items_blocks_team_items_socials" USING btree ("_parent_id");
  CREATE INDEX "custom_items_blocks_team_items_order_idx" ON "custom_items_blocks_team_items" USING btree ("_order");
  CREATE INDEX "custom_items_blocks_team_items_parent_id_idx" ON "custom_items_blocks_team_items" USING btree ("_parent_id");
  CREATE INDEX "custom_items_blocks_team_items_photo_idx" ON "custom_items_blocks_team_items" USING btree ("photo_id");
  CREATE INDEX "custom_items_blocks_team_order_idx" ON "custom_items_blocks_team" USING btree ("_order");
  CREATE INDEX "custom_items_blocks_team_parent_id_idx" ON "custom_items_blocks_team" USING btree ("_parent_id");
  CREATE INDEX "custom_items_blocks_team_path_idx" ON "custom_items_blocks_team" USING btree ("_path");
  CREATE INDEX "custom_items_blocks_embed_order_idx" ON "custom_items_blocks_embed" USING btree ("_order");
  CREATE INDEX "custom_items_blocks_embed_parent_id_idx" ON "custom_items_blocks_embed" USING btree ("_parent_id");
  CREATE INDEX "custom_items_blocks_embed_path_idx" ON "custom_items_blocks_embed" USING btree ("_path");
  CREATE INDEX "custom_items_blocks_gallery_images_order_idx" ON "custom_items_blocks_gallery_images" USING btree ("_order");
  CREATE INDEX "custom_items_blocks_gallery_images_parent_id_idx" ON "custom_items_blocks_gallery_images" USING btree ("_parent_id");
  CREATE INDEX "custom_items_blocks_gallery_images_image_idx" ON "custom_items_blocks_gallery_images" USING btree ("image_id");
  CREATE INDEX "custom_items_blocks_gallery_images_link_link_page_idx" ON "custom_items_blocks_gallery_images" USING btree ("link_page_id");
  CREATE INDEX "custom_items_blocks_gallery_order_idx" ON "custom_items_blocks_gallery" USING btree ("_order");
  CREATE INDEX "custom_items_blocks_gallery_parent_id_idx" ON "custom_items_blocks_gallery" USING btree ("_parent_id");
  CREATE INDEX "custom_items_blocks_gallery_path_idx" ON "custom_items_blocks_gallery" USING btree ("_path");
  CREATE INDEX "custom_items_blocks_grid_items_order_idx" ON "custom_items_blocks_grid_items" USING btree ("_order");
  CREATE INDEX "custom_items_blocks_grid_items_parent_id_idx" ON "custom_items_blocks_grid_items" USING btree ("_parent_id");
  CREATE INDEX "custom_items_blocks_grid_items_image_idx" ON "custom_items_blocks_grid_items" USING btree ("image_id");
  CREATE INDEX "custom_items_blocks_grid_items_link_link_page_idx" ON "custom_items_blocks_grid_items" USING btree ("link_page_id");
  CREATE INDEX "custom_items_blocks_grid_order_idx" ON "custom_items_blocks_grid" USING btree ("_order");
  CREATE INDEX "custom_items_blocks_grid_parent_id_idx" ON "custom_items_blocks_grid" USING btree ("_parent_id");
  CREATE INDEX "custom_items_blocks_grid_path_idx" ON "custom_items_blocks_grid" USING btree ("_path");
  CREATE INDEX "custom_items_blocks_grid_cta_cta_page_idx" ON "custom_items_blocks_grid" USING btree ("cta_page_id");
  CREATE INDEX "custom_items_blocks_timeline_events_order_idx" ON "custom_items_blocks_timeline_events" USING btree ("_order");
  CREATE INDEX "custom_items_blocks_timeline_events_parent_id_idx" ON "custom_items_blocks_timeline_events" USING btree ("_parent_id");
  CREATE INDEX "custom_items_blocks_timeline_events_image_idx" ON "custom_items_blocks_timeline_events" USING btree ("image_id");
  CREATE INDEX "custom_items_blocks_timeline_events_link_link_page_idx" ON "custom_items_blocks_timeline_events" USING btree ("link_page_id");
  CREATE INDEX "custom_items_blocks_timeline_order_idx" ON "custom_items_blocks_timeline" USING btree ("_order");
  CREATE INDEX "custom_items_blocks_timeline_parent_id_idx" ON "custom_items_blocks_timeline" USING btree ("_parent_id");
  CREATE INDEX "custom_items_blocks_timeline_path_idx" ON "custom_items_blocks_timeline" USING btree ("_path");
  CREATE INDEX "custom_items_blocks_archive_order_idx" ON "custom_items_blocks_archive" USING btree ("_order");
  CREATE INDEX "custom_items_blocks_archive_parent_id_idx" ON "custom_items_blocks_archive" USING btree ("_parent_id");
  CREATE INDEX "custom_items_blocks_archive_path_idx" ON "custom_items_blocks_archive" USING btree ("_path");
  CREATE INDEX "custom_items_blocks_form_order_idx" ON "custom_items_blocks_form" USING btree ("_order");
  CREATE INDEX "custom_items_blocks_form_parent_id_idx" ON "custom_items_blocks_form" USING btree ("_parent_id");
  CREATE INDEX "custom_items_blocks_form_path_idx" ON "custom_items_blocks_form" USING btree ("_path");
  CREATE INDEX "custom_items_blocks_form_form_idx" ON "custom_items_blocks_form" USING btree ("form_id");
  CREATE INDEX "custom_items_blocks_spacer_order_idx" ON "custom_items_blocks_spacer" USING btree ("_order");
  CREATE INDEX "custom_items_blocks_spacer_parent_id_idx" ON "custom_items_blocks_spacer" USING btree ("_parent_id");
  CREATE INDEX "custom_items_blocks_spacer_path_idx" ON "custom_items_blocks_spacer" USING btree ("_path");
  CREATE INDEX "custom_items_blocks_html_order_idx" ON "custom_items_blocks_html" USING btree ("_order");
  CREATE INDEX "custom_items_blocks_html_parent_id_idx" ON "custom_items_blocks_html" USING btree ("_parent_id");
  CREATE INDEX "custom_items_blocks_html_path_idx" ON "custom_items_blocks_html" USING btree ("_path");
  CREATE INDEX "custom_items_gallery_order_idx" ON "custom_items_gallery" USING btree ("_order");
  CREATE INDEX "custom_items_gallery_parent_id_idx" ON "custom_items_gallery" USING btree ("_parent_id");
  CREATE INDEX "custom_items_gallery_image_idx" ON "custom_items_gallery" USING btree ("image_id");
  CREATE INDEX "custom_items_featured_image_idx" ON "custom_items" USING btree ("featured_image_id");
  CREATE INDEX "custom_items_content_type_idx" ON "custom_items" USING btree ("content_type_id");
  CREATE INDEX "custom_items_author_idx" ON "custom_items" USING btree ("author_id");
  CREATE INDEX "custom_items_updated_at_idx" ON "custom_items" USING btree ("updated_at");
  CREATE INDEX "custom_items_created_at_idx" ON "custom_items" USING btree ("created_at");
  CREATE INDEX "custom_items__status_idx" ON "custom_items" USING btree ("_status");
  CREATE UNIQUE INDEX "slug_contentType_idx" ON "custom_items" USING btree ("slug","content_type_id");
  CREATE INDEX "custom_items_rels_order_idx" ON "custom_items_rels" USING btree ("order");
  CREATE INDEX "custom_items_rels_parent_idx" ON "custom_items_rels" USING btree ("parent_id");
  CREATE INDEX "custom_items_rels_path_idx" ON "custom_items_rels" USING btree ("path");
  CREATE INDEX "custom_items_rels_categories_id_idx" ON "custom_items_rels" USING btree ("categories_id");
  CREATE INDEX "custom_items_rels_tags_id_idx" ON "custom_items_rels" USING btree ("tags_id");
  CREATE INDEX "custom_items_rels_posts_id_idx" ON "custom_items_rels" USING btree ("posts_id");
  CREATE INDEX "custom_items_rels_pages_id_idx" ON "custom_items_rels" USING btree ("pages_id");
  CREATE INDEX "_custom_items_v_blocks_hero_links_order_idx" ON "_custom_items_v_blocks_hero_links" USING btree ("_order");
  CREATE INDEX "_custom_items_v_blocks_hero_links_parent_id_idx" ON "_custom_items_v_blocks_hero_links" USING btree ("_parent_id");
  CREATE INDEX "_custom_items_v_blocks_hero_links_page_idx" ON "_custom_items_v_blocks_hero_links" USING btree ("page_id");
  CREATE INDEX "_custom_items_v_blocks_hero_order_idx" ON "_custom_items_v_blocks_hero" USING btree ("_order");
  CREATE INDEX "_custom_items_v_blocks_hero_parent_id_idx" ON "_custom_items_v_blocks_hero" USING btree ("_parent_id");
  CREATE INDEX "_custom_items_v_blocks_hero_path_idx" ON "_custom_items_v_blocks_hero" USING btree ("_path");
  CREATE INDEX "_custom_items_v_blocks_hero_image_idx" ON "_custom_items_v_blocks_hero" USING btree ("image_id");
  CREATE INDEX "_custom_items_v_blocks_content_columns_order_idx" ON "_custom_items_v_blocks_content_columns" USING btree ("_order");
  CREATE INDEX "_custom_items_v_blocks_content_columns_parent_id_idx" ON "_custom_items_v_blocks_content_columns" USING btree ("_parent_id");
  CREATE INDEX "_custom_items_v_blocks_content_columns_link_link_page_idx" ON "_custom_items_v_blocks_content_columns" USING btree ("link_page_id");
  CREATE INDEX "_custom_items_v_blocks_content_order_idx" ON "_custom_items_v_blocks_content" USING btree ("_order");
  CREATE INDEX "_custom_items_v_blocks_content_parent_id_idx" ON "_custom_items_v_blocks_content" USING btree ("_parent_id");
  CREATE INDEX "_custom_items_v_blocks_content_path_idx" ON "_custom_items_v_blocks_content" USING btree ("_path");
  CREATE INDEX "_custom_items_v_blocks_media_order_idx" ON "_custom_items_v_blocks_media" USING btree ("_order");
  CREATE INDEX "_custom_items_v_blocks_media_parent_id_idx" ON "_custom_items_v_blocks_media" USING btree ("_parent_id");
  CREATE INDEX "_custom_items_v_blocks_media_path_idx" ON "_custom_items_v_blocks_media" USING btree ("_path");
  CREATE INDEX "_custom_items_v_blocks_media_media_idx" ON "_custom_items_v_blocks_media" USING btree ("media_id");
  CREATE INDEX "_custom_items_v_blocks_media_link_link_page_idx" ON "_custom_items_v_blocks_media" USING btree ("link_page_id");
  CREATE INDEX "_custom_items_v_blocks_cta_links_order_idx" ON "_custom_items_v_blocks_cta_links" USING btree ("_order");
  CREATE INDEX "_custom_items_v_blocks_cta_links_parent_id_idx" ON "_custom_items_v_blocks_cta_links" USING btree ("_parent_id");
  CREATE INDEX "_custom_items_v_blocks_cta_links_page_idx" ON "_custom_items_v_blocks_cta_links" USING btree ("page_id");
  CREATE INDEX "_custom_items_v_blocks_cta_order_idx" ON "_custom_items_v_blocks_cta" USING btree ("_order");
  CREATE INDEX "_custom_items_v_blocks_cta_parent_id_idx" ON "_custom_items_v_blocks_cta" USING btree ("_parent_id");
  CREATE INDEX "_custom_items_v_blocks_cta_path_idx" ON "_custom_items_v_blocks_cta" USING btree ("_path");
  CREATE INDEX "_custom_items_v_blocks_cta_image_idx" ON "_custom_items_v_blocks_cta" USING btree ("image_id");
  CREATE INDEX "_custom_items_v_blocks_quote_order_idx" ON "_custom_items_v_blocks_quote" USING btree ("_order");
  CREATE INDEX "_custom_items_v_blocks_quote_parent_id_idx" ON "_custom_items_v_blocks_quote" USING btree ("_parent_id");
  CREATE INDEX "_custom_items_v_blocks_quote_path_idx" ON "_custom_items_v_blocks_quote" USING btree ("_path");
  CREATE INDEX "_custom_items_v_blocks_features_items_order_idx" ON "_custom_items_v_blocks_features_items" USING btree ("_order");
  CREATE INDEX "_custom_items_v_blocks_features_items_parent_id_idx" ON "_custom_items_v_blocks_features_items" USING btree ("_parent_id");
  CREATE INDEX "_custom_items_v_blocks_features_items_media_idx" ON "_custom_items_v_blocks_features_items" USING btree ("media_id");
  CREATE INDEX "_custom_items_v_blocks_features_order_idx" ON "_custom_items_v_blocks_features" USING btree ("_order");
  CREATE INDEX "_custom_items_v_blocks_features_parent_id_idx" ON "_custom_items_v_blocks_features" USING btree ("_parent_id");
  CREATE INDEX "_custom_items_v_blocks_features_path_idx" ON "_custom_items_v_blocks_features" USING btree ("_path");
  CREATE INDEX "_custom_items_v_blocks_stats_items_order_idx" ON "_custom_items_v_blocks_stats_items" USING btree ("_order");
  CREATE INDEX "_custom_items_v_blocks_stats_items_parent_id_idx" ON "_custom_items_v_blocks_stats_items" USING btree ("_parent_id");
  CREATE INDEX "_custom_items_v_blocks_stats_order_idx" ON "_custom_items_v_blocks_stats" USING btree ("_order");
  CREATE INDEX "_custom_items_v_blocks_stats_parent_id_idx" ON "_custom_items_v_blocks_stats" USING btree ("_parent_id");
  CREATE INDEX "_custom_items_v_blocks_stats_path_idx" ON "_custom_items_v_blocks_stats" USING btree ("_path");
  CREATE INDEX "_custom_items_v_blocks_logo_cloud_items_order_idx" ON "_custom_items_v_blocks_logo_cloud_items" USING btree ("_order");
  CREATE INDEX "_custom_items_v_blocks_logo_cloud_items_parent_id_idx" ON "_custom_items_v_blocks_logo_cloud_items" USING btree ("_parent_id");
  CREATE INDEX "_custom_items_v_blocks_logo_cloud_items_media_idx" ON "_custom_items_v_blocks_logo_cloud_items" USING btree ("media_id");
  CREATE INDEX "_custom_items_v_blocks_logo_cloud_order_idx" ON "_custom_items_v_blocks_logo_cloud" USING btree ("_order");
  CREATE INDEX "_custom_items_v_blocks_logo_cloud_parent_id_idx" ON "_custom_items_v_blocks_logo_cloud" USING btree ("_parent_id");
  CREATE INDEX "_custom_items_v_blocks_logo_cloud_path_idx" ON "_custom_items_v_blocks_logo_cloud" USING btree ("_path");
  CREATE INDEX "_custom_items_v_blocks_testimonials_items_order_idx" ON "_custom_items_v_blocks_testimonials_items" USING btree ("_order");
  CREATE INDEX "_custom_items_v_blocks_testimonials_items_parent_id_idx" ON "_custom_items_v_blocks_testimonials_items" USING btree ("_parent_id");
  CREATE INDEX "_custom_items_v_blocks_testimonials_items_avatar_idx" ON "_custom_items_v_blocks_testimonials_items" USING btree ("avatar_id");
  CREATE INDEX "_custom_items_v_blocks_testimonials_order_idx" ON "_custom_items_v_blocks_testimonials" USING btree ("_order");
  CREATE INDEX "_custom_items_v_blocks_testimonials_parent_id_idx" ON "_custom_items_v_blocks_testimonials" USING btree ("_parent_id");
  CREATE INDEX "_custom_items_v_blocks_testimonials_path_idx" ON "_custom_items_v_blocks_testimonials" USING btree ("_path");
  CREATE INDEX "_custom_items_v_blocks_faq_items_order_idx" ON "_custom_items_v_blocks_faq_items" USING btree ("_order");
  CREATE INDEX "_custom_items_v_blocks_faq_items_parent_id_idx" ON "_custom_items_v_blocks_faq_items" USING btree ("_parent_id");
  CREATE INDEX "_custom_items_v_blocks_faq_order_idx" ON "_custom_items_v_blocks_faq" USING btree ("_order");
  CREATE INDEX "_custom_items_v_blocks_faq_parent_id_idx" ON "_custom_items_v_blocks_faq" USING btree ("_parent_id");
  CREATE INDEX "_custom_items_v_blocks_faq_path_idx" ON "_custom_items_v_blocks_faq" USING btree ("_path");
  CREATE INDEX "_custom_items_v_blocks_pricing_plans_features_order_idx" ON "_custom_items_v_blocks_pricing_plans_features" USING btree ("_order");
  CREATE INDEX "_custom_items_v_blocks_pricing_plans_features_parent_id_idx" ON "_custom_items_v_blocks_pricing_plans_features" USING btree ("_parent_id");
  CREATE INDEX "_custom_items_v_blocks_pricing_plans_links_order_idx" ON "_custom_items_v_blocks_pricing_plans_links" USING btree ("_order");
  CREATE INDEX "_custom_items_v_blocks_pricing_plans_links_parent_id_idx" ON "_custom_items_v_blocks_pricing_plans_links" USING btree ("_parent_id");
  CREATE INDEX "_custom_items_v_blocks_pricing_plans_links_page_idx" ON "_custom_items_v_blocks_pricing_plans_links" USING btree ("page_id");
  CREATE INDEX "_custom_items_v_blocks_pricing_plans_order_idx" ON "_custom_items_v_blocks_pricing_plans" USING btree ("_order");
  CREATE INDEX "_custom_items_v_blocks_pricing_plans_parent_id_idx" ON "_custom_items_v_blocks_pricing_plans" USING btree ("_parent_id");
  CREATE INDEX "_custom_items_v_blocks_pricing_order_idx" ON "_custom_items_v_blocks_pricing" USING btree ("_order");
  CREATE INDEX "_custom_items_v_blocks_pricing_parent_id_idx" ON "_custom_items_v_blocks_pricing" USING btree ("_parent_id");
  CREATE INDEX "_custom_items_v_blocks_pricing_path_idx" ON "_custom_items_v_blocks_pricing" USING btree ("_path");
  CREATE INDEX "_custom_items_v_blocks_team_items_socials_order_idx" ON "_custom_items_v_blocks_team_items_socials" USING btree ("_order");
  CREATE INDEX "_custom_items_v_blocks_team_items_socials_parent_id_idx" ON "_custom_items_v_blocks_team_items_socials" USING btree ("_parent_id");
  CREATE INDEX "_custom_items_v_blocks_team_items_order_idx" ON "_custom_items_v_blocks_team_items" USING btree ("_order");
  CREATE INDEX "_custom_items_v_blocks_team_items_parent_id_idx" ON "_custom_items_v_blocks_team_items" USING btree ("_parent_id");
  CREATE INDEX "_custom_items_v_blocks_team_items_photo_idx" ON "_custom_items_v_blocks_team_items" USING btree ("photo_id");
  CREATE INDEX "_custom_items_v_blocks_team_order_idx" ON "_custom_items_v_blocks_team" USING btree ("_order");
  CREATE INDEX "_custom_items_v_blocks_team_parent_id_idx" ON "_custom_items_v_blocks_team" USING btree ("_parent_id");
  CREATE INDEX "_custom_items_v_blocks_team_path_idx" ON "_custom_items_v_blocks_team" USING btree ("_path");
  CREATE INDEX "_custom_items_v_blocks_embed_order_idx" ON "_custom_items_v_blocks_embed" USING btree ("_order");
  CREATE INDEX "_custom_items_v_blocks_embed_parent_id_idx" ON "_custom_items_v_blocks_embed" USING btree ("_parent_id");
  CREATE INDEX "_custom_items_v_blocks_embed_path_idx" ON "_custom_items_v_blocks_embed" USING btree ("_path");
  CREATE INDEX "_custom_items_v_blocks_gallery_images_order_idx" ON "_custom_items_v_blocks_gallery_images" USING btree ("_order");
  CREATE INDEX "_custom_items_v_blocks_gallery_images_parent_id_idx" ON "_custom_items_v_blocks_gallery_images" USING btree ("_parent_id");
  CREATE INDEX "_custom_items_v_blocks_gallery_images_image_idx" ON "_custom_items_v_blocks_gallery_images" USING btree ("image_id");
  CREATE INDEX "_custom_items_v_blocks_gallery_images_link_link_page_idx" ON "_custom_items_v_blocks_gallery_images" USING btree ("link_page_id");
  CREATE INDEX "_custom_items_v_blocks_gallery_order_idx" ON "_custom_items_v_blocks_gallery" USING btree ("_order");
  CREATE INDEX "_custom_items_v_blocks_gallery_parent_id_idx" ON "_custom_items_v_blocks_gallery" USING btree ("_parent_id");
  CREATE INDEX "_custom_items_v_blocks_gallery_path_idx" ON "_custom_items_v_blocks_gallery" USING btree ("_path");
  CREATE INDEX "_custom_items_v_blocks_grid_items_order_idx" ON "_custom_items_v_blocks_grid_items" USING btree ("_order");
  CREATE INDEX "_custom_items_v_blocks_grid_items_parent_id_idx" ON "_custom_items_v_blocks_grid_items" USING btree ("_parent_id");
  CREATE INDEX "_custom_items_v_blocks_grid_items_image_idx" ON "_custom_items_v_blocks_grid_items" USING btree ("image_id");
  CREATE INDEX "_custom_items_v_blocks_grid_items_link_link_page_idx" ON "_custom_items_v_blocks_grid_items" USING btree ("link_page_id");
  CREATE INDEX "_custom_items_v_blocks_grid_order_idx" ON "_custom_items_v_blocks_grid" USING btree ("_order");
  CREATE INDEX "_custom_items_v_blocks_grid_parent_id_idx" ON "_custom_items_v_blocks_grid" USING btree ("_parent_id");
  CREATE INDEX "_custom_items_v_blocks_grid_path_idx" ON "_custom_items_v_blocks_grid" USING btree ("_path");
  CREATE INDEX "_custom_items_v_blocks_grid_cta_cta_page_idx" ON "_custom_items_v_blocks_grid" USING btree ("cta_page_id");
  CREATE INDEX "_custom_items_v_blocks_timeline_events_order_idx" ON "_custom_items_v_blocks_timeline_events" USING btree ("_order");
  CREATE INDEX "_custom_items_v_blocks_timeline_events_parent_id_idx" ON "_custom_items_v_blocks_timeline_events" USING btree ("_parent_id");
  CREATE INDEX "_custom_items_v_blocks_timeline_events_image_idx" ON "_custom_items_v_blocks_timeline_events" USING btree ("image_id");
  CREATE INDEX "_custom_items_v_blocks_timeline_events_link_link_page_idx" ON "_custom_items_v_blocks_timeline_events" USING btree ("link_page_id");
  CREATE INDEX "_custom_items_v_blocks_timeline_order_idx" ON "_custom_items_v_blocks_timeline" USING btree ("_order");
  CREATE INDEX "_custom_items_v_blocks_timeline_parent_id_idx" ON "_custom_items_v_blocks_timeline" USING btree ("_parent_id");
  CREATE INDEX "_custom_items_v_blocks_timeline_path_idx" ON "_custom_items_v_blocks_timeline" USING btree ("_path");
  CREATE INDEX "_custom_items_v_blocks_archive_order_idx" ON "_custom_items_v_blocks_archive" USING btree ("_order");
  CREATE INDEX "_custom_items_v_blocks_archive_parent_id_idx" ON "_custom_items_v_blocks_archive" USING btree ("_parent_id");
  CREATE INDEX "_custom_items_v_blocks_archive_path_idx" ON "_custom_items_v_blocks_archive" USING btree ("_path");
  CREATE INDEX "_custom_items_v_blocks_form_order_idx" ON "_custom_items_v_blocks_form" USING btree ("_order");
  CREATE INDEX "_custom_items_v_blocks_form_parent_id_idx" ON "_custom_items_v_blocks_form" USING btree ("_parent_id");
  CREATE INDEX "_custom_items_v_blocks_form_path_idx" ON "_custom_items_v_blocks_form" USING btree ("_path");
  CREATE INDEX "_custom_items_v_blocks_form_form_idx" ON "_custom_items_v_blocks_form" USING btree ("form_id");
  CREATE INDEX "_custom_items_v_blocks_spacer_order_idx" ON "_custom_items_v_blocks_spacer" USING btree ("_order");
  CREATE INDEX "_custom_items_v_blocks_spacer_parent_id_idx" ON "_custom_items_v_blocks_spacer" USING btree ("_parent_id");
  CREATE INDEX "_custom_items_v_blocks_spacer_path_idx" ON "_custom_items_v_blocks_spacer" USING btree ("_path");
  CREATE INDEX "_custom_items_v_blocks_html_order_idx" ON "_custom_items_v_blocks_html" USING btree ("_order");
  CREATE INDEX "_custom_items_v_blocks_html_parent_id_idx" ON "_custom_items_v_blocks_html" USING btree ("_parent_id");
  CREATE INDEX "_custom_items_v_blocks_html_path_idx" ON "_custom_items_v_blocks_html" USING btree ("_path");
  CREATE INDEX "_custom_items_v_version_gallery_order_idx" ON "_custom_items_v_version_gallery" USING btree ("_order");
  CREATE INDEX "_custom_items_v_version_gallery_parent_id_idx" ON "_custom_items_v_version_gallery" USING btree ("_parent_id");
  CREATE INDEX "_custom_items_v_version_gallery_image_idx" ON "_custom_items_v_version_gallery" USING btree ("image_id");
  CREATE INDEX "_custom_items_v_parent_idx" ON "_custom_items_v" USING btree ("parent_id");
  CREATE INDEX "_custom_items_v_version_version_featured_image_idx" ON "_custom_items_v" USING btree ("version_featured_image_id");
  CREATE INDEX "_custom_items_v_version_version_content_type_idx" ON "_custom_items_v" USING btree ("version_content_type_id");
  CREATE INDEX "_custom_items_v_version_version_author_idx" ON "_custom_items_v" USING btree ("version_author_id");
  CREATE INDEX "_custom_items_v_version_version_updated_at_idx" ON "_custom_items_v" USING btree ("version_updated_at");
  CREATE INDEX "_custom_items_v_version_version_created_at_idx" ON "_custom_items_v" USING btree ("version_created_at");
  CREATE INDEX "_custom_items_v_version_version__status_idx" ON "_custom_items_v" USING btree ("version__status");
  CREATE INDEX "_custom_items_v_created_at_idx" ON "_custom_items_v" USING btree ("created_at");
  CREATE INDEX "_custom_items_v_updated_at_idx" ON "_custom_items_v" USING btree ("updated_at");
  CREATE INDEX "_custom_items_v_latest_idx" ON "_custom_items_v" USING btree ("latest");
  CREATE INDEX "_custom_items_v_autosave_idx" ON "_custom_items_v" USING btree ("autosave");
  CREATE INDEX "version_slug_version_contentType_idx" ON "_custom_items_v" USING btree ("version_slug","version_content_type_id");
  CREATE INDEX "_custom_items_v_rels_order_idx" ON "_custom_items_v_rels" USING btree ("order");
  CREATE INDEX "_custom_items_v_rels_parent_idx" ON "_custom_items_v_rels" USING btree ("parent_id");
  CREATE INDEX "_custom_items_v_rels_path_idx" ON "_custom_items_v_rels" USING btree ("path");
  CREATE INDEX "_custom_items_v_rels_categories_id_idx" ON "_custom_items_v_rels" USING btree ("categories_id");
  CREATE INDEX "_custom_items_v_rels_tags_id_idx" ON "_custom_items_v_rels" USING btree ("tags_id");
  CREATE INDEX "_custom_items_v_rels_posts_id_idx" ON "_custom_items_v_rels" USING btree ("posts_id");
  CREATE INDEX "_custom_items_v_rels_pages_id_idx" ON "_custom_items_v_rels" USING btree ("pages_id");
  CREATE INDEX "archive_items_gallery_order_idx" ON "archive_items_gallery" USING btree ("_order");
  CREATE INDEX "archive_items_gallery_parent_id_idx" ON "archive_items_gallery" USING btree ("_parent_id");
  CREATE INDEX "archive_items_gallery_image_idx" ON "archive_items_gallery" USING btree ("image_id");
  CREATE INDEX "archive_items_blocks_hero_links_order_idx" ON "archive_items_blocks_hero_links" USING btree ("_order");
  CREATE INDEX "archive_items_blocks_hero_links_parent_id_idx" ON "archive_items_blocks_hero_links" USING btree ("_parent_id");
  CREATE INDEX "archive_items_blocks_hero_links_page_idx" ON "archive_items_blocks_hero_links" USING btree ("page_id");
  CREATE INDEX "archive_items_blocks_hero_order_idx" ON "archive_items_blocks_hero" USING btree ("_order");
  CREATE INDEX "archive_items_blocks_hero_parent_id_idx" ON "archive_items_blocks_hero" USING btree ("_parent_id");
  CREATE INDEX "archive_items_blocks_hero_path_idx" ON "archive_items_blocks_hero" USING btree ("_path");
  CREATE INDEX "archive_items_blocks_hero_image_idx" ON "archive_items_blocks_hero" USING btree ("image_id");
  CREATE INDEX "archive_items_blocks_content_columns_order_idx" ON "archive_items_blocks_content_columns" USING btree ("_order");
  CREATE INDEX "archive_items_blocks_content_columns_parent_id_idx" ON "archive_items_blocks_content_columns" USING btree ("_parent_id");
  CREATE INDEX "archive_items_blocks_content_columns_link_link_page_idx" ON "archive_items_blocks_content_columns" USING btree ("link_page_id");
  CREATE INDEX "archive_items_blocks_content_order_idx" ON "archive_items_blocks_content" USING btree ("_order");
  CREATE INDEX "archive_items_blocks_content_parent_id_idx" ON "archive_items_blocks_content" USING btree ("_parent_id");
  CREATE INDEX "archive_items_blocks_content_path_idx" ON "archive_items_blocks_content" USING btree ("_path");
  CREATE INDEX "archive_items_blocks_media_order_idx" ON "archive_items_blocks_media" USING btree ("_order");
  CREATE INDEX "archive_items_blocks_media_parent_id_idx" ON "archive_items_blocks_media" USING btree ("_parent_id");
  CREATE INDEX "archive_items_blocks_media_path_idx" ON "archive_items_blocks_media" USING btree ("_path");
  CREATE INDEX "archive_items_blocks_media_media_idx" ON "archive_items_blocks_media" USING btree ("media_id");
  CREATE INDEX "archive_items_blocks_media_link_link_page_idx" ON "archive_items_blocks_media" USING btree ("link_page_id");
  CREATE INDEX "archive_items_blocks_cta_links_order_idx" ON "archive_items_blocks_cta_links" USING btree ("_order");
  CREATE INDEX "archive_items_blocks_cta_links_parent_id_idx" ON "archive_items_blocks_cta_links" USING btree ("_parent_id");
  CREATE INDEX "archive_items_blocks_cta_links_page_idx" ON "archive_items_blocks_cta_links" USING btree ("page_id");
  CREATE INDEX "archive_items_blocks_cta_order_idx" ON "archive_items_blocks_cta" USING btree ("_order");
  CREATE INDEX "archive_items_blocks_cta_parent_id_idx" ON "archive_items_blocks_cta" USING btree ("_parent_id");
  CREATE INDEX "archive_items_blocks_cta_path_idx" ON "archive_items_blocks_cta" USING btree ("_path");
  CREATE INDEX "archive_items_blocks_cta_image_idx" ON "archive_items_blocks_cta" USING btree ("image_id");
  CREATE INDEX "archive_items_blocks_archive_order_idx" ON "archive_items_blocks_archive" USING btree ("_order");
  CREATE INDEX "archive_items_blocks_archive_parent_id_idx" ON "archive_items_blocks_archive" USING btree ("_parent_id");
  CREATE INDEX "archive_items_blocks_archive_path_idx" ON "archive_items_blocks_archive" USING btree ("_path");
  CREATE INDEX "archive_items_blocks_form_order_idx" ON "archive_items_blocks_form" USING btree ("_order");
  CREATE INDEX "archive_items_blocks_form_parent_id_idx" ON "archive_items_blocks_form" USING btree ("_parent_id");
  CREATE INDEX "archive_items_blocks_form_path_idx" ON "archive_items_blocks_form" USING btree ("_path");
  CREATE INDEX "archive_items_blocks_form_form_idx" ON "archive_items_blocks_form" USING btree ("form_id");
  CREATE INDEX "archive_items_blocks_gallery_images_order_idx" ON "archive_items_blocks_gallery_images" USING btree ("_order");
  CREATE INDEX "archive_items_blocks_gallery_images_parent_id_idx" ON "archive_items_blocks_gallery_images" USING btree ("_parent_id");
  CREATE INDEX "archive_items_blocks_gallery_images_image_idx" ON "archive_items_blocks_gallery_images" USING btree ("image_id");
  CREATE INDEX "archive_items_blocks_gallery_images_link_link_page_idx" ON "archive_items_blocks_gallery_images" USING btree ("link_page_id");
  CREATE INDEX "archive_items_blocks_gallery_order_idx" ON "archive_items_blocks_gallery" USING btree ("_order");
  CREATE INDEX "archive_items_blocks_gallery_parent_id_idx" ON "archive_items_blocks_gallery" USING btree ("_parent_id");
  CREATE INDEX "archive_items_blocks_gallery_path_idx" ON "archive_items_blocks_gallery" USING btree ("_path");
  CREATE INDEX "archive_items_blocks_grid_items_order_idx" ON "archive_items_blocks_grid_items" USING btree ("_order");
  CREATE INDEX "archive_items_blocks_grid_items_parent_id_idx" ON "archive_items_blocks_grid_items" USING btree ("_parent_id");
  CREATE INDEX "archive_items_blocks_grid_items_image_idx" ON "archive_items_blocks_grid_items" USING btree ("image_id");
  CREATE INDEX "archive_items_blocks_grid_items_link_link_page_idx" ON "archive_items_blocks_grid_items" USING btree ("link_page_id");
  CREATE INDEX "archive_items_blocks_grid_order_idx" ON "archive_items_blocks_grid" USING btree ("_order");
  CREATE INDEX "archive_items_blocks_grid_parent_id_idx" ON "archive_items_blocks_grid" USING btree ("_parent_id");
  CREATE INDEX "archive_items_blocks_grid_path_idx" ON "archive_items_blocks_grid" USING btree ("_path");
  CREATE INDEX "archive_items_blocks_grid_cta_cta_page_idx" ON "archive_items_blocks_grid" USING btree ("cta_page_id");
  CREATE INDEX "archive_items_blocks_timeline_events_order_idx" ON "archive_items_blocks_timeline_events" USING btree ("_order");
  CREATE INDEX "archive_items_blocks_timeline_events_parent_id_idx" ON "archive_items_blocks_timeline_events" USING btree ("_parent_id");
  CREATE INDEX "archive_items_blocks_timeline_events_image_idx" ON "archive_items_blocks_timeline_events" USING btree ("image_id");
  CREATE INDEX "archive_items_blocks_timeline_events_link_link_page_idx" ON "archive_items_blocks_timeline_events" USING btree ("link_page_id");
  CREATE INDEX "archive_items_blocks_timeline_order_idx" ON "archive_items_blocks_timeline" USING btree ("_order");
  CREATE INDEX "archive_items_blocks_timeline_parent_id_idx" ON "archive_items_blocks_timeline" USING btree ("_parent_id");
  CREATE INDEX "archive_items_blocks_timeline_path_idx" ON "archive_items_blocks_timeline" USING btree ("_path");
  CREATE INDEX "archive_items_featured_image_idx" ON "archive_items" USING btree ("featured_image_id");
  CREATE UNIQUE INDEX "archive_items_catalog_number_idx" ON "archive_items" USING btree ("catalog_number");
  CREATE UNIQUE INDEX "archive_items_slug_idx" ON "archive_items" USING btree ("slug");
  CREATE INDEX "archive_items_updated_at_idx" ON "archive_items" USING btree ("updated_at");
  CREATE INDEX "archive_items_created_at_idx" ON "archive_items" USING btree ("created_at");
  CREATE INDEX "archive_items__status_idx" ON "archive_items" USING btree ("_status");
  CREATE INDEX "archive_items_rels_order_idx" ON "archive_items_rels" USING btree ("order");
  CREATE INDEX "archive_items_rels_parent_idx" ON "archive_items_rels" USING btree ("parent_id");
  CREATE INDEX "archive_items_rels_path_idx" ON "archive_items_rels" USING btree ("path");
  CREATE INDEX "archive_items_rels_people_id_idx" ON "archive_items_rels" USING btree ("people_id");
  CREATE INDEX "archive_items_rels_places_id_idx" ON "archive_items_rels" USING btree ("places_id");
  CREATE INDEX "archive_items_rels_archive_items_id_idx" ON "archive_items_rels" USING btree ("archive_items_id");
  CREATE INDEX "archive_items_rels_categories_id_idx" ON "archive_items_rels" USING btree ("categories_id");
  CREATE INDEX "archive_items_rels_tags_id_idx" ON "archive_items_rels" USING btree ("tags_id");
  CREATE INDEX "archive_items_rels_posts_id_idx" ON "archive_items_rels" USING btree ("posts_id");
  CREATE INDEX "archive_items_rels_pages_id_idx" ON "archive_items_rels" USING btree ("pages_id");
  CREATE INDEX "_archive_items_v_version_gallery_order_idx" ON "_archive_items_v_version_gallery" USING btree ("_order");
  CREATE INDEX "_archive_items_v_version_gallery_parent_id_idx" ON "_archive_items_v_version_gallery" USING btree ("_parent_id");
  CREATE INDEX "_archive_items_v_version_gallery_image_idx" ON "_archive_items_v_version_gallery" USING btree ("image_id");
  CREATE INDEX "_archive_items_v_blocks_hero_links_order_idx" ON "_archive_items_v_blocks_hero_links" USING btree ("_order");
  CREATE INDEX "_archive_items_v_blocks_hero_links_parent_id_idx" ON "_archive_items_v_blocks_hero_links" USING btree ("_parent_id");
  CREATE INDEX "_archive_items_v_blocks_hero_links_page_idx" ON "_archive_items_v_blocks_hero_links" USING btree ("page_id");
  CREATE INDEX "_archive_items_v_blocks_hero_order_idx" ON "_archive_items_v_blocks_hero" USING btree ("_order");
  CREATE INDEX "_archive_items_v_blocks_hero_parent_id_idx" ON "_archive_items_v_blocks_hero" USING btree ("_parent_id");
  CREATE INDEX "_archive_items_v_blocks_hero_path_idx" ON "_archive_items_v_blocks_hero" USING btree ("_path");
  CREATE INDEX "_archive_items_v_blocks_hero_image_idx" ON "_archive_items_v_blocks_hero" USING btree ("image_id");
  CREATE INDEX "_archive_items_v_blocks_content_columns_order_idx" ON "_archive_items_v_blocks_content_columns" USING btree ("_order");
  CREATE INDEX "_archive_items_v_blocks_content_columns_parent_id_idx" ON "_archive_items_v_blocks_content_columns" USING btree ("_parent_id");
  CREATE INDEX "_archive_items_v_blocks_content_columns_link_link_page_idx" ON "_archive_items_v_blocks_content_columns" USING btree ("link_page_id");
  CREATE INDEX "_archive_items_v_blocks_content_order_idx" ON "_archive_items_v_blocks_content" USING btree ("_order");
  CREATE INDEX "_archive_items_v_blocks_content_parent_id_idx" ON "_archive_items_v_blocks_content" USING btree ("_parent_id");
  CREATE INDEX "_archive_items_v_blocks_content_path_idx" ON "_archive_items_v_blocks_content" USING btree ("_path");
  CREATE INDEX "_archive_items_v_blocks_media_order_idx" ON "_archive_items_v_blocks_media" USING btree ("_order");
  CREATE INDEX "_archive_items_v_blocks_media_parent_id_idx" ON "_archive_items_v_blocks_media" USING btree ("_parent_id");
  CREATE INDEX "_archive_items_v_blocks_media_path_idx" ON "_archive_items_v_blocks_media" USING btree ("_path");
  CREATE INDEX "_archive_items_v_blocks_media_media_idx" ON "_archive_items_v_blocks_media" USING btree ("media_id");
  CREATE INDEX "_archive_items_v_blocks_media_link_link_page_idx" ON "_archive_items_v_blocks_media" USING btree ("link_page_id");
  CREATE INDEX "_archive_items_v_blocks_cta_links_order_idx" ON "_archive_items_v_blocks_cta_links" USING btree ("_order");
  CREATE INDEX "_archive_items_v_blocks_cta_links_parent_id_idx" ON "_archive_items_v_blocks_cta_links" USING btree ("_parent_id");
  CREATE INDEX "_archive_items_v_blocks_cta_links_page_idx" ON "_archive_items_v_blocks_cta_links" USING btree ("page_id");
  CREATE INDEX "_archive_items_v_blocks_cta_order_idx" ON "_archive_items_v_blocks_cta" USING btree ("_order");
  CREATE INDEX "_archive_items_v_blocks_cta_parent_id_idx" ON "_archive_items_v_blocks_cta" USING btree ("_parent_id");
  CREATE INDEX "_archive_items_v_blocks_cta_path_idx" ON "_archive_items_v_blocks_cta" USING btree ("_path");
  CREATE INDEX "_archive_items_v_blocks_cta_image_idx" ON "_archive_items_v_blocks_cta" USING btree ("image_id");
  CREATE INDEX "_archive_items_v_blocks_archive_order_idx" ON "_archive_items_v_blocks_archive" USING btree ("_order");
  CREATE INDEX "_archive_items_v_blocks_archive_parent_id_idx" ON "_archive_items_v_blocks_archive" USING btree ("_parent_id");
  CREATE INDEX "_archive_items_v_blocks_archive_path_idx" ON "_archive_items_v_blocks_archive" USING btree ("_path");
  CREATE INDEX "_archive_items_v_blocks_form_order_idx" ON "_archive_items_v_blocks_form" USING btree ("_order");
  CREATE INDEX "_archive_items_v_blocks_form_parent_id_idx" ON "_archive_items_v_blocks_form" USING btree ("_parent_id");
  CREATE INDEX "_archive_items_v_blocks_form_path_idx" ON "_archive_items_v_blocks_form" USING btree ("_path");
  CREATE INDEX "_archive_items_v_blocks_form_form_idx" ON "_archive_items_v_blocks_form" USING btree ("form_id");
  CREATE INDEX "_archive_items_v_blocks_gallery_images_order_idx" ON "_archive_items_v_blocks_gallery_images" USING btree ("_order");
  CREATE INDEX "_archive_items_v_blocks_gallery_images_parent_id_idx" ON "_archive_items_v_blocks_gallery_images" USING btree ("_parent_id");
  CREATE INDEX "_archive_items_v_blocks_gallery_images_image_idx" ON "_archive_items_v_blocks_gallery_images" USING btree ("image_id");
  CREATE INDEX "_archive_items_v_blocks_gallery_images_link_link_page_idx" ON "_archive_items_v_blocks_gallery_images" USING btree ("link_page_id");
  CREATE INDEX "_archive_items_v_blocks_gallery_order_idx" ON "_archive_items_v_blocks_gallery" USING btree ("_order");
  CREATE INDEX "_archive_items_v_blocks_gallery_parent_id_idx" ON "_archive_items_v_blocks_gallery" USING btree ("_parent_id");
  CREATE INDEX "_archive_items_v_blocks_gallery_path_idx" ON "_archive_items_v_blocks_gallery" USING btree ("_path");
  CREATE INDEX "_archive_items_v_blocks_grid_items_order_idx" ON "_archive_items_v_blocks_grid_items" USING btree ("_order");
  CREATE INDEX "_archive_items_v_blocks_grid_items_parent_id_idx" ON "_archive_items_v_blocks_grid_items" USING btree ("_parent_id");
  CREATE INDEX "_archive_items_v_blocks_grid_items_image_idx" ON "_archive_items_v_blocks_grid_items" USING btree ("image_id");
  CREATE INDEX "_archive_items_v_blocks_grid_items_link_link_page_idx" ON "_archive_items_v_blocks_grid_items" USING btree ("link_page_id");
  CREATE INDEX "_archive_items_v_blocks_grid_order_idx" ON "_archive_items_v_blocks_grid" USING btree ("_order");
  CREATE INDEX "_archive_items_v_blocks_grid_parent_id_idx" ON "_archive_items_v_blocks_grid" USING btree ("_parent_id");
  CREATE INDEX "_archive_items_v_blocks_grid_path_idx" ON "_archive_items_v_blocks_grid" USING btree ("_path");
  CREATE INDEX "_archive_items_v_blocks_grid_cta_cta_page_idx" ON "_archive_items_v_blocks_grid" USING btree ("cta_page_id");
  CREATE INDEX "_archive_items_v_blocks_timeline_events_order_idx" ON "_archive_items_v_blocks_timeline_events" USING btree ("_order");
  CREATE INDEX "_archive_items_v_blocks_timeline_events_parent_id_idx" ON "_archive_items_v_blocks_timeline_events" USING btree ("_parent_id");
  CREATE INDEX "_archive_items_v_blocks_timeline_events_image_idx" ON "_archive_items_v_blocks_timeline_events" USING btree ("image_id");
  CREATE INDEX "_archive_items_v_blocks_timeline_events_link_link_page_idx" ON "_archive_items_v_blocks_timeline_events" USING btree ("link_page_id");
  CREATE INDEX "_archive_items_v_blocks_timeline_order_idx" ON "_archive_items_v_blocks_timeline" USING btree ("_order");
  CREATE INDEX "_archive_items_v_blocks_timeline_parent_id_idx" ON "_archive_items_v_blocks_timeline" USING btree ("_parent_id");
  CREATE INDEX "_archive_items_v_blocks_timeline_path_idx" ON "_archive_items_v_blocks_timeline" USING btree ("_path");
  CREATE INDEX "_archive_items_v_parent_idx" ON "_archive_items_v" USING btree ("parent_id");
  CREATE INDEX "_archive_items_v_version_version_featured_image_idx" ON "_archive_items_v" USING btree ("version_featured_image_id");
  CREATE INDEX "_archive_items_v_version_version_catalog_number_idx" ON "_archive_items_v" USING btree ("version_catalog_number");
  CREATE INDEX "_archive_items_v_version_version_slug_idx" ON "_archive_items_v" USING btree ("version_slug");
  CREATE INDEX "_archive_items_v_version_version_updated_at_idx" ON "_archive_items_v" USING btree ("version_updated_at");
  CREATE INDEX "_archive_items_v_version_version_created_at_idx" ON "_archive_items_v" USING btree ("version_created_at");
  CREATE INDEX "_archive_items_v_version_version__status_idx" ON "_archive_items_v" USING btree ("version__status");
  CREATE INDEX "_archive_items_v_created_at_idx" ON "_archive_items_v" USING btree ("created_at");
  CREATE INDEX "_archive_items_v_updated_at_idx" ON "_archive_items_v" USING btree ("updated_at");
  CREATE INDEX "_archive_items_v_latest_idx" ON "_archive_items_v" USING btree ("latest");
  CREATE INDEX "_archive_items_v_autosave_idx" ON "_archive_items_v" USING btree ("autosave");
  CREATE INDEX "_archive_items_v_rels_order_idx" ON "_archive_items_v_rels" USING btree ("order");
  CREATE INDEX "_archive_items_v_rels_parent_idx" ON "_archive_items_v_rels" USING btree ("parent_id");
  CREATE INDEX "_archive_items_v_rels_path_idx" ON "_archive_items_v_rels" USING btree ("path");
  CREATE INDEX "_archive_items_v_rels_people_id_idx" ON "_archive_items_v_rels" USING btree ("people_id");
  CREATE INDEX "_archive_items_v_rels_places_id_idx" ON "_archive_items_v_rels" USING btree ("places_id");
  CREATE INDEX "_archive_items_v_rels_archive_items_id_idx" ON "_archive_items_v_rels" USING btree ("archive_items_id");
  CREATE INDEX "_archive_items_v_rels_categories_id_idx" ON "_archive_items_v_rels" USING btree ("categories_id");
  CREATE INDEX "_archive_items_v_rels_tags_id_idx" ON "_archive_items_v_rels" USING btree ("tags_id");
  CREATE INDEX "_archive_items_v_rels_posts_id_idx" ON "_archive_items_v_rels" USING btree ("posts_id");
  CREATE INDEX "_archive_items_v_rels_pages_id_idx" ON "_archive_items_v_rels" USING btree ("pages_id");
  CREATE INDEX "people_role_order_idx" ON "people_role" USING btree ("order");
  CREATE INDEX "people_role_parent_idx" ON "people_role" USING btree ("parent_id");
  CREATE INDEX "people_movements_order_idx" ON "people_movements" USING btree ("_order");
  CREATE INDEX "people_movements_parent_id_idx" ON "people_movements" USING btree ("_parent_id");
  CREATE INDEX "people_social_links_order_idx" ON "people_social_links" USING btree ("_order");
  CREATE INDEX "people_social_links_parent_id_idx" ON "people_social_links" USING btree ("_parent_id");
  CREATE INDEX "people_blocks_hero_links_order_idx" ON "people_blocks_hero_links" USING btree ("_order");
  CREATE INDEX "people_blocks_hero_links_parent_id_idx" ON "people_blocks_hero_links" USING btree ("_parent_id");
  CREATE INDEX "people_blocks_hero_links_page_idx" ON "people_blocks_hero_links" USING btree ("page_id");
  CREATE INDEX "people_blocks_hero_order_idx" ON "people_blocks_hero" USING btree ("_order");
  CREATE INDEX "people_blocks_hero_parent_id_idx" ON "people_blocks_hero" USING btree ("_parent_id");
  CREATE INDEX "people_blocks_hero_path_idx" ON "people_blocks_hero" USING btree ("_path");
  CREATE INDEX "people_blocks_hero_image_idx" ON "people_blocks_hero" USING btree ("image_id");
  CREATE INDEX "people_blocks_content_columns_order_idx" ON "people_blocks_content_columns" USING btree ("_order");
  CREATE INDEX "people_blocks_content_columns_parent_id_idx" ON "people_blocks_content_columns" USING btree ("_parent_id");
  CREATE INDEX "people_blocks_content_columns_link_link_page_idx" ON "people_blocks_content_columns" USING btree ("link_page_id");
  CREATE INDEX "people_blocks_content_order_idx" ON "people_blocks_content" USING btree ("_order");
  CREATE INDEX "people_blocks_content_parent_id_idx" ON "people_blocks_content" USING btree ("_parent_id");
  CREATE INDEX "people_blocks_content_path_idx" ON "people_blocks_content" USING btree ("_path");
  CREATE INDEX "people_blocks_media_order_idx" ON "people_blocks_media" USING btree ("_order");
  CREATE INDEX "people_blocks_media_parent_id_idx" ON "people_blocks_media" USING btree ("_parent_id");
  CREATE INDEX "people_blocks_media_path_idx" ON "people_blocks_media" USING btree ("_path");
  CREATE INDEX "people_blocks_media_media_idx" ON "people_blocks_media" USING btree ("media_id");
  CREATE INDEX "people_blocks_media_link_link_page_idx" ON "people_blocks_media" USING btree ("link_page_id");
  CREATE INDEX "people_blocks_cta_links_order_idx" ON "people_blocks_cta_links" USING btree ("_order");
  CREATE INDEX "people_blocks_cta_links_parent_id_idx" ON "people_blocks_cta_links" USING btree ("_parent_id");
  CREATE INDEX "people_blocks_cta_links_page_idx" ON "people_blocks_cta_links" USING btree ("page_id");
  CREATE INDEX "people_blocks_cta_order_idx" ON "people_blocks_cta" USING btree ("_order");
  CREATE INDEX "people_blocks_cta_parent_id_idx" ON "people_blocks_cta" USING btree ("_parent_id");
  CREATE INDEX "people_blocks_cta_path_idx" ON "people_blocks_cta" USING btree ("_path");
  CREATE INDEX "people_blocks_cta_image_idx" ON "people_blocks_cta" USING btree ("image_id");
  CREATE INDEX "people_blocks_quote_order_idx" ON "people_blocks_quote" USING btree ("_order");
  CREATE INDEX "people_blocks_quote_parent_id_idx" ON "people_blocks_quote" USING btree ("_parent_id");
  CREATE INDEX "people_blocks_quote_path_idx" ON "people_blocks_quote" USING btree ("_path");
  CREATE INDEX "people_blocks_features_items_order_idx" ON "people_blocks_features_items" USING btree ("_order");
  CREATE INDEX "people_blocks_features_items_parent_id_idx" ON "people_blocks_features_items" USING btree ("_parent_id");
  CREATE INDEX "people_blocks_features_items_media_idx" ON "people_blocks_features_items" USING btree ("media_id");
  CREATE INDEX "people_blocks_features_order_idx" ON "people_blocks_features" USING btree ("_order");
  CREATE INDEX "people_blocks_features_parent_id_idx" ON "people_blocks_features" USING btree ("_parent_id");
  CREATE INDEX "people_blocks_features_path_idx" ON "people_blocks_features" USING btree ("_path");
  CREATE INDEX "people_blocks_stats_items_order_idx" ON "people_blocks_stats_items" USING btree ("_order");
  CREATE INDEX "people_blocks_stats_items_parent_id_idx" ON "people_blocks_stats_items" USING btree ("_parent_id");
  CREATE INDEX "people_blocks_stats_order_idx" ON "people_blocks_stats" USING btree ("_order");
  CREATE INDEX "people_blocks_stats_parent_id_idx" ON "people_blocks_stats" USING btree ("_parent_id");
  CREATE INDEX "people_blocks_stats_path_idx" ON "people_blocks_stats" USING btree ("_path");
  CREATE INDEX "people_blocks_logo_cloud_items_order_idx" ON "people_blocks_logo_cloud_items" USING btree ("_order");
  CREATE INDEX "people_blocks_logo_cloud_items_parent_id_idx" ON "people_blocks_logo_cloud_items" USING btree ("_parent_id");
  CREATE INDEX "people_blocks_logo_cloud_items_media_idx" ON "people_blocks_logo_cloud_items" USING btree ("media_id");
  CREATE INDEX "people_blocks_logo_cloud_order_idx" ON "people_blocks_logo_cloud" USING btree ("_order");
  CREATE INDEX "people_blocks_logo_cloud_parent_id_idx" ON "people_blocks_logo_cloud" USING btree ("_parent_id");
  CREATE INDEX "people_blocks_logo_cloud_path_idx" ON "people_blocks_logo_cloud" USING btree ("_path");
  CREATE INDEX "people_blocks_testimonials_items_order_idx" ON "people_blocks_testimonials_items" USING btree ("_order");
  CREATE INDEX "people_blocks_testimonials_items_parent_id_idx" ON "people_blocks_testimonials_items" USING btree ("_parent_id");
  CREATE INDEX "people_blocks_testimonials_items_avatar_idx" ON "people_blocks_testimonials_items" USING btree ("avatar_id");
  CREATE INDEX "people_blocks_testimonials_order_idx" ON "people_blocks_testimonials" USING btree ("_order");
  CREATE INDEX "people_blocks_testimonials_parent_id_idx" ON "people_blocks_testimonials" USING btree ("_parent_id");
  CREATE INDEX "people_blocks_testimonials_path_idx" ON "people_blocks_testimonials" USING btree ("_path");
  CREATE INDEX "people_blocks_faq_items_order_idx" ON "people_blocks_faq_items" USING btree ("_order");
  CREATE INDEX "people_blocks_faq_items_parent_id_idx" ON "people_blocks_faq_items" USING btree ("_parent_id");
  CREATE INDEX "people_blocks_faq_order_idx" ON "people_blocks_faq" USING btree ("_order");
  CREATE INDEX "people_blocks_faq_parent_id_idx" ON "people_blocks_faq" USING btree ("_parent_id");
  CREATE INDEX "people_blocks_faq_path_idx" ON "people_blocks_faq" USING btree ("_path");
  CREATE INDEX "people_blocks_pricing_plans_features_order_idx" ON "people_blocks_pricing_plans_features" USING btree ("_order");
  CREATE INDEX "people_blocks_pricing_plans_features_parent_id_idx" ON "people_blocks_pricing_plans_features" USING btree ("_parent_id");
  CREATE INDEX "people_blocks_pricing_plans_links_order_idx" ON "people_blocks_pricing_plans_links" USING btree ("_order");
  CREATE INDEX "people_blocks_pricing_plans_links_parent_id_idx" ON "people_blocks_pricing_plans_links" USING btree ("_parent_id");
  CREATE INDEX "people_blocks_pricing_plans_links_page_idx" ON "people_blocks_pricing_plans_links" USING btree ("page_id");
  CREATE INDEX "people_blocks_pricing_plans_order_idx" ON "people_blocks_pricing_plans" USING btree ("_order");
  CREATE INDEX "people_blocks_pricing_plans_parent_id_idx" ON "people_blocks_pricing_plans" USING btree ("_parent_id");
  CREATE INDEX "people_blocks_pricing_order_idx" ON "people_blocks_pricing" USING btree ("_order");
  CREATE INDEX "people_blocks_pricing_parent_id_idx" ON "people_blocks_pricing" USING btree ("_parent_id");
  CREATE INDEX "people_blocks_pricing_path_idx" ON "people_blocks_pricing" USING btree ("_path");
  CREATE INDEX "people_blocks_team_items_socials_order_idx" ON "people_blocks_team_items_socials" USING btree ("_order");
  CREATE INDEX "people_blocks_team_items_socials_parent_id_idx" ON "people_blocks_team_items_socials" USING btree ("_parent_id");
  CREATE INDEX "people_blocks_team_items_order_idx" ON "people_blocks_team_items" USING btree ("_order");
  CREATE INDEX "people_blocks_team_items_parent_id_idx" ON "people_blocks_team_items" USING btree ("_parent_id");
  CREATE INDEX "people_blocks_team_items_photo_idx" ON "people_blocks_team_items" USING btree ("photo_id");
  CREATE INDEX "people_blocks_team_order_idx" ON "people_blocks_team" USING btree ("_order");
  CREATE INDEX "people_blocks_team_parent_id_idx" ON "people_blocks_team" USING btree ("_parent_id");
  CREATE INDEX "people_blocks_team_path_idx" ON "people_blocks_team" USING btree ("_path");
  CREATE INDEX "people_blocks_embed_order_idx" ON "people_blocks_embed" USING btree ("_order");
  CREATE INDEX "people_blocks_embed_parent_id_idx" ON "people_blocks_embed" USING btree ("_parent_id");
  CREATE INDEX "people_blocks_embed_path_idx" ON "people_blocks_embed" USING btree ("_path");
  CREATE INDEX "people_blocks_archive_order_idx" ON "people_blocks_archive" USING btree ("_order");
  CREATE INDEX "people_blocks_archive_parent_id_idx" ON "people_blocks_archive" USING btree ("_parent_id");
  CREATE INDEX "people_blocks_archive_path_idx" ON "people_blocks_archive" USING btree ("_path");
  CREATE INDEX "people_blocks_form_order_idx" ON "people_blocks_form" USING btree ("_order");
  CREATE INDEX "people_blocks_form_parent_id_idx" ON "people_blocks_form" USING btree ("_parent_id");
  CREATE INDEX "people_blocks_form_path_idx" ON "people_blocks_form" USING btree ("_path");
  CREATE INDEX "people_blocks_form_form_idx" ON "people_blocks_form" USING btree ("form_id");
  CREATE INDEX "people_blocks_gallery_images_order_idx" ON "people_blocks_gallery_images" USING btree ("_order");
  CREATE INDEX "people_blocks_gallery_images_parent_id_idx" ON "people_blocks_gallery_images" USING btree ("_parent_id");
  CREATE INDEX "people_blocks_gallery_images_image_idx" ON "people_blocks_gallery_images" USING btree ("image_id");
  CREATE INDEX "people_blocks_gallery_images_link_link_page_idx" ON "people_blocks_gallery_images" USING btree ("link_page_id");
  CREATE INDEX "people_blocks_gallery_order_idx" ON "people_blocks_gallery" USING btree ("_order");
  CREATE INDEX "people_blocks_gallery_parent_id_idx" ON "people_blocks_gallery" USING btree ("_parent_id");
  CREATE INDEX "people_blocks_gallery_path_idx" ON "people_blocks_gallery" USING btree ("_path");
  CREATE INDEX "people_blocks_grid_items_order_idx" ON "people_blocks_grid_items" USING btree ("_order");
  CREATE INDEX "people_blocks_grid_items_parent_id_idx" ON "people_blocks_grid_items" USING btree ("_parent_id");
  CREATE INDEX "people_blocks_grid_items_image_idx" ON "people_blocks_grid_items" USING btree ("image_id");
  CREATE INDEX "people_blocks_grid_items_link_link_page_idx" ON "people_blocks_grid_items" USING btree ("link_page_id");
  CREATE INDEX "people_blocks_grid_order_idx" ON "people_blocks_grid" USING btree ("_order");
  CREATE INDEX "people_blocks_grid_parent_id_idx" ON "people_blocks_grid" USING btree ("_parent_id");
  CREATE INDEX "people_blocks_grid_path_idx" ON "people_blocks_grid" USING btree ("_path");
  CREATE INDEX "people_blocks_grid_cta_cta_page_idx" ON "people_blocks_grid" USING btree ("cta_page_id");
  CREATE INDEX "people_blocks_timeline_events_order_idx" ON "people_blocks_timeline_events" USING btree ("_order");
  CREATE INDEX "people_blocks_timeline_events_parent_id_idx" ON "people_blocks_timeline_events" USING btree ("_parent_id");
  CREATE INDEX "people_blocks_timeline_events_image_idx" ON "people_blocks_timeline_events" USING btree ("image_id");
  CREATE INDEX "people_blocks_timeline_events_link_link_page_idx" ON "people_blocks_timeline_events" USING btree ("link_page_id");
  CREATE INDEX "people_blocks_timeline_order_idx" ON "people_blocks_timeline" USING btree ("_order");
  CREATE INDEX "people_blocks_timeline_parent_id_idx" ON "people_blocks_timeline" USING btree ("_parent_id");
  CREATE INDEX "people_blocks_timeline_path_idx" ON "people_blocks_timeline" USING btree ("_path");
  CREATE INDEX "people_blocks_spacer_order_idx" ON "people_blocks_spacer" USING btree ("_order");
  CREATE INDEX "people_blocks_spacer_parent_id_idx" ON "people_blocks_spacer" USING btree ("_parent_id");
  CREATE INDEX "people_blocks_spacer_path_idx" ON "people_blocks_spacer" USING btree ("_path");
  CREATE INDEX "people_blocks_html_order_idx" ON "people_blocks_html" USING btree ("_order");
  CREATE INDEX "people_blocks_html_parent_id_idx" ON "people_blocks_html" USING btree ("_parent_id");
  CREATE INDEX "people_blocks_html_path_idx" ON "people_blocks_html" USING btree ("_path");
  CREATE INDEX "people_portrait_idx" ON "people" USING btree ("portrait_id");
  CREATE INDEX "people_birth_place_idx" ON "people" USING btree ("birth_place_id");
  CREATE INDEX "people_death_place_idx" ON "people" USING btree ("death_place_id");
  CREATE UNIQUE INDEX "people_slug_idx" ON "people" USING btree ("slug");
  CREATE INDEX "people_updated_at_idx" ON "people" USING btree ("updated_at");
  CREATE INDEX "people_created_at_idx" ON "people" USING btree ("created_at");
  CREATE INDEX "people__status_idx" ON "people" USING btree ("_status");
  CREATE INDEX "people_rels_order_idx" ON "people_rels" USING btree ("order");
  CREATE INDEX "people_rels_parent_idx" ON "people_rels" USING btree ("parent_id");
  CREATE INDEX "people_rels_path_idx" ON "people_rels" USING btree ("path");
  CREATE INDEX "people_rels_people_id_idx" ON "people_rels" USING btree ("people_id");
  CREATE INDEX "people_rels_categories_id_idx" ON "people_rels" USING btree ("categories_id");
  CREATE INDEX "people_rels_tags_id_idx" ON "people_rels" USING btree ("tags_id");
  CREATE INDEX "people_rels_posts_id_idx" ON "people_rels" USING btree ("posts_id");
  CREATE INDEX "people_rels_pages_id_idx" ON "people_rels" USING btree ("pages_id");
  CREATE INDEX "_people_v_version_role_order_idx" ON "_people_v_version_role" USING btree ("order");
  CREATE INDEX "_people_v_version_role_parent_idx" ON "_people_v_version_role" USING btree ("parent_id");
  CREATE INDEX "_people_v_version_movements_order_idx" ON "_people_v_version_movements" USING btree ("_order");
  CREATE INDEX "_people_v_version_movements_parent_id_idx" ON "_people_v_version_movements" USING btree ("_parent_id");
  CREATE INDEX "_people_v_version_social_links_order_idx" ON "_people_v_version_social_links" USING btree ("_order");
  CREATE INDEX "_people_v_version_social_links_parent_id_idx" ON "_people_v_version_social_links" USING btree ("_parent_id");
  CREATE INDEX "_people_v_blocks_hero_links_order_idx" ON "_people_v_blocks_hero_links" USING btree ("_order");
  CREATE INDEX "_people_v_blocks_hero_links_parent_id_idx" ON "_people_v_blocks_hero_links" USING btree ("_parent_id");
  CREATE INDEX "_people_v_blocks_hero_links_page_idx" ON "_people_v_blocks_hero_links" USING btree ("page_id");
  CREATE INDEX "_people_v_blocks_hero_order_idx" ON "_people_v_blocks_hero" USING btree ("_order");
  CREATE INDEX "_people_v_blocks_hero_parent_id_idx" ON "_people_v_blocks_hero" USING btree ("_parent_id");
  CREATE INDEX "_people_v_blocks_hero_path_idx" ON "_people_v_blocks_hero" USING btree ("_path");
  CREATE INDEX "_people_v_blocks_hero_image_idx" ON "_people_v_blocks_hero" USING btree ("image_id");
  CREATE INDEX "_people_v_blocks_content_columns_order_idx" ON "_people_v_blocks_content_columns" USING btree ("_order");
  CREATE INDEX "_people_v_blocks_content_columns_parent_id_idx" ON "_people_v_blocks_content_columns" USING btree ("_parent_id");
  CREATE INDEX "_people_v_blocks_content_columns_link_link_page_idx" ON "_people_v_blocks_content_columns" USING btree ("link_page_id");
  CREATE INDEX "_people_v_blocks_content_order_idx" ON "_people_v_blocks_content" USING btree ("_order");
  CREATE INDEX "_people_v_blocks_content_parent_id_idx" ON "_people_v_blocks_content" USING btree ("_parent_id");
  CREATE INDEX "_people_v_blocks_content_path_idx" ON "_people_v_blocks_content" USING btree ("_path");
  CREATE INDEX "_people_v_blocks_media_order_idx" ON "_people_v_blocks_media" USING btree ("_order");
  CREATE INDEX "_people_v_blocks_media_parent_id_idx" ON "_people_v_blocks_media" USING btree ("_parent_id");
  CREATE INDEX "_people_v_blocks_media_path_idx" ON "_people_v_blocks_media" USING btree ("_path");
  CREATE INDEX "_people_v_blocks_media_media_idx" ON "_people_v_blocks_media" USING btree ("media_id");
  CREATE INDEX "_people_v_blocks_media_link_link_page_idx" ON "_people_v_blocks_media" USING btree ("link_page_id");
  CREATE INDEX "_people_v_blocks_cta_links_order_idx" ON "_people_v_blocks_cta_links" USING btree ("_order");
  CREATE INDEX "_people_v_blocks_cta_links_parent_id_idx" ON "_people_v_blocks_cta_links" USING btree ("_parent_id");
  CREATE INDEX "_people_v_blocks_cta_links_page_idx" ON "_people_v_blocks_cta_links" USING btree ("page_id");
  CREATE INDEX "_people_v_blocks_cta_order_idx" ON "_people_v_blocks_cta" USING btree ("_order");
  CREATE INDEX "_people_v_blocks_cta_parent_id_idx" ON "_people_v_blocks_cta" USING btree ("_parent_id");
  CREATE INDEX "_people_v_blocks_cta_path_idx" ON "_people_v_blocks_cta" USING btree ("_path");
  CREATE INDEX "_people_v_blocks_cta_image_idx" ON "_people_v_blocks_cta" USING btree ("image_id");
  CREATE INDEX "_people_v_blocks_quote_order_idx" ON "_people_v_blocks_quote" USING btree ("_order");
  CREATE INDEX "_people_v_blocks_quote_parent_id_idx" ON "_people_v_blocks_quote" USING btree ("_parent_id");
  CREATE INDEX "_people_v_blocks_quote_path_idx" ON "_people_v_blocks_quote" USING btree ("_path");
  CREATE INDEX "_people_v_blocks_features_items_order_idx" ON "_people_v_blocks_features_items" USING btree ("_order");
  CREATE INDEX "_people_v_blocks_features_items_parent_id_idx" ON "_people_v_blocks_features_items" USING btree ("_parent_id");
  CREATE INDEX "_people_v_blocks_features_items_media_idx" ON "_people_v_blocks_features_items" USING btree ("media_id");
  CREATE INDEX "_people_v_blocks_features_order_idx" ON "_people_v_blocks_features" USING btree ("_order");
  CREATE INDEX "_people_v_blocks_features_parent_id_idx" ON "_people_v_blocks_features" USING btree ("_parent_id");
  CREATE INDEX "_people_v_blocks_features_path_idx" ON "_people_v_blocks_features" USING btree ("_path");
  CREATE INDEX "_people_v_blocks_stats_items_order_idx" ON "_people_v_blocks_stats_items" USING btree ("_order");
  CREATE INDEX "_people_v_blocks_stats_items_parent_id_idx" ON "_people_v_blocks_stats_items" USING btree ("_parent_id");
  CREATE INDEX "_people_v_blocks_stats_order_idx" ON "_people_v_blocks_stats" USING btree ("_order");
  CREATE INDEX "_people_v_blocks_stats_parent_id_idx" ON "_people_v_blocks_stats" USING btree ("_parent_id");
  CREATE INDEX "_people_v_blocks_stats_path_idx" ON "_people_v_blocks_stats" USING btree ("_path");
  CREATE INDEX "_people_v_blocks_logo_cloud_items_order_idx" ON "_people_v_blocks_logo_cloud_items" USING btree ("_order");
  CREATE INDEX "_people_v_blocks_logo_cloud_items_parent_id_idx" ON "_people_v_blocks_logo_cloud_items" USING btree ("_parent_id");
  CREATE INDEX "_people_v_blocks_logo_cloud_items_media_idx" ON "_people_v_blocks_logo_cloud_items" USING btree ("media_id");
  CREATE INDEX "_people_v_blocks_logo_cloud_order_idx" ON "_people_v_blocks_logo_cloud" USING btree ("_order");
  CREATE INDEX "_people_v_blocks_logo_cloud_parent_id_idx" ON "_people_v_blocks_logo_cloud" USING btree ("_parent_id");
  CREATE INDEX "_people_v_blocks_logo_cloud_path_idx" ON "_people_v_blocks_logo_cloud" USING btree ("_path");
  CREATE INDEX "_people_v_blocks_testimonials_items_order_idx" ON "_people_v_blocks_testimonials_items" USING btree ("_order");
  CREATE INDEX "_people_v_blocks_testimonials_items_parent_id_idx" ON "_people_v_blocks_testimonials_items" USING btree ("_parent_id");
  CREATE INDEX "_people_v_blocks_testimonials_items_avatar_idx" ON "_people_v_blocks_testimonials_items" USING btree ("avatar_id");
  CREATE INDEX "_people_v_blocks_testimonials_order_idx" ON "_people_v_blocks_testimonials" USING btree ("_order");
  CREATE INDEX "_people_v_blocks_testimonials_parent_id_idx" ON "_people_v_blocks_testimonials" USING btree ("_parent_id");
  CREATE INDEX "_people_v_blocks_testimonials_path_idx" ON "_people_v_blocks_testimonials" USING btree ("_path");
  CREATE INDEX "_people_v_blocks_faq_items_order_idx" ON "_people_v_blocks_faq_items" USING btree ("_order");
  CREATE INDEX "_people_v_blocks_faq_items_parent_id_idx" ON "_people_v_blocks_faq_items" USING btree ("_parent_id");
  CREATE INDEX "_people_v_blocks_faq_order_idx" ON "_people_v_blocks_faq" USING btree ("_order");
  CREATE INDEX "_people_v_blocks_faq_parent_id_idx" ON "_people_v_blocks_faq" USING btree ("_parent_id");
  CREATE INDEX "_people_v_blocks_faq_path_idx" ON "_people_v_blocks_faq" USING btree ("_path");
  CREATE INDEX "_people_v_blocks_pricing_plans_features_order_idx" ON "_people_v_blocks_pricing_plans_features" USING btree ("_order");
  CREATE INDEX "_people_v_blocks_pricing_plans_features_parent_id_idx" ON "_people_v_blocks_pricing_plans_features" USING btree ("_parent_id");
  CREATE INDEX "_people_v_blocks_pricing_plans_links_order_idx" ON "_people_v_blocks_pricing_plans_links" USING btree ("_order");
  CREATE INDEX "_people_v_blocks_pricing_plans_links_parent_id_idx" ON "_people_v_blocks_pricing_plans_links" USING btree ("_parent_id");
  CREATE INDEX "_people_v_blocks_pricing_plans_links_page_idx" ON "_people_v_blocks_pricing_plans_links" USING btree ("page_id");
  CREATE INDEX "_people_v_blocks_pricing_plans_order_idx" ON "_people_v_blocks_pricing_plans" USING btree ("_order");
  CREATE INDEX "_people_v_blocks_pricing_plans_parent_id_idx" ON "_people_v_blocks_pricing_plans" USING btree ("_parent_id");
  CREATE INDEX "_people_v_blocks_pricing_order_idx" ON "_people_v_blocks_pricing" USING btree ("_order");
  CREATE INDEX "_people_v_blocks_pricing_parent_id_idx" ON "_people_v_blocks_pricing" USING btree ("_parent_id");
  CREATE INDEX "_people_v_blocks_pricing_path_idx" ON "_people_v_blocks_pricing" USING btree ("_path");
  CREATE INDEX "_people_v_blocks_team_items_socials_order_idx" ON "_people_v_blocks_team_items_socials" USING btree ("_order");
  CREATE INDEX "_people_v_blocks_team_items_socials_parent_id_idx" ON "_people_v_blocks_team_items_socials" USING btree ("_parent_id");
  CREATE INDEX "_people_v_blocks_team_items_order_idx" ON "_people_v_blocks_team_items" USING btree ("_order");
  CREATE INDEX "_people_v_blocks_team_items_parent_id_idx" ON "_people_v_blocks_team_items" USING btree ("_parent_id");
  CREATE INDEX "_people_v_blocks_team_items_photo_idx" ON "_people_v_blocks_team_items" USING btree ("photo_id");
  CREATE INDEX "_people_v_blocks_team_order_idx" ON "_people_v_blocks_team" USING btree ("_order");
  CREATE INDEX "_people_v_blocks_team_parent_id_idx" ON "_people_v_blocks_team" USING btree ("_parent_id");
  CREATE INDEX "_people_v_blocks_team_path_idx" ON "_people_v_blocks_team" USING btree ("_path");
  CREATE INDEX "_people_v_blocks_embed_order_idx" ON "_people_v_blocks_embed" USING btree ("_order");
  CREATE INDEX "_people_v_blocks_embed_parent_id_idx" ON "_people_v_blocks_embed" USING btree ("_parent_id");
  CREATE INDEX "_people_v_blocks_embed_path_idx" ON "_people_v_blocks_embed" USING btree ("_path");
  CREATE INDEX "_people_v_blocks_archive_order_idx" ON "_people_v_blocks_archive" USING btree ("_order");
  CREATE INDEX "_people_v_blocks_archive_parent_id_idx" ON "_people_v_blocks_archive" USING btree ("_parent_id");
  CREATE INDEX "_people_v_blocks_archive_path_idx" ON "_people_v_blocks_archive" USING btree ("_path");
  CREATE INDEX "_people_v_blocks_form_order_idx" ON "_people_v_blocks_form" USING btree ("_order");
  CREATE INDEX "_people_v_blocks_form_parent_id_idx" ON "_people_v_blocks_form" USING btree ("_parent_id");
  CREATE INDEX "_people_v_blocks_form_path_idx" ON "_people_v_blocks_form" USING btree ("_path");
  CREATE INDEX "_people_v_blocks_form_form_idx" ON "_people_v_blocks_form" USING btree ("form_id");
  CREATE INDEX "_people_v_blocks_gallery_images_order_idx" ON "_people_v_blocks_gallery_images" USING btree ("_order");
  CREATE INDEX "_people_v_blocks_gallery_images_parent_id_idx" ON "_people_v_blocks_gallery_images" USING btree ("_parent_id");
  CREATE INDEX "_people_v_blocks_gallery_images_image_idx" ON "_people_v_blocks_gallery_images" USING btree ("image_id");
  CREATE INDEX "_people_v_blocks_gallery_images_link_link_page_idx" ON "_people_v_blocks_gallery_images" USING btree ("link_page_id");
  CREATE INDEX "_people_v_blocks_gallery_order_idx" ON "_people_v_blocks_gallery" USING btree ("_order");
  CREATE INDEX "_people_v_blocks_gallery_parent_id_idx" ON "_people_v_blocks_gallery" USING btree ("_parent_id");
  CREATE INDEX "_people_v_blocks_gallery_path_idx" ON "_people_v_blocks_gallery" USING btree ("_path");
  CREATE INDEX "_people_v_blocks_grid_items_order_idx" ON "_people_v_blocks_grid_items" USING btree ("_order");
  CREATE INDEX "_people_v_blocks_grid_items_parent_id_idx" ON "_people_v_blocks_grid_items" USING btree ("_parent_id");
  CREATE INDEX "_people_v_blocks_grid_items_image_idx" ON "_people_v_blocks_grid_items" USING btree ("image_id");
  CREATE INDEX "_people_v_blocks_grid_items_link_link_page_idx" ON "_people_v_blocks_grid_items" USING btree ("link_page_id");
  CREATE INDEX "_people_v_blocks_grid_order_idx" ON "_people_v_blocks_grid" USING btree ("_order");
  CREATE INDEX "_people_v_blocks_grid_parent_id_idx" ON "_people_v_blocks_grid" USING btree ("_parent_id");
  CREATE INDEX "_people_v_blocks_grid_path_idx" ON "_people_v_blocks_grid" USING btree ("_path");
  CREATE INDEX "_people_v_blocks_grid_cta_cta_page_idx" ON "_people_v_blocks_grid" USING btree ("cta_page_id");
  CREATE INDEX "_people_v_blocks_timeline_events_order_idx" ON "_people_v_blocks_timeline_events" USING btree ("_order");
  CREATE INDEX "_people_v_blocks_timeline_events_parent_id_idx" ON "_people_v_blocks_timeline_events" USING btree ("_parent_id");
  CREATE INDEX "_people_v_blocks_timeline_events_image_idx" ON "_people_v_blocks_timeline_events" USING btree ("image_id");
  CREATE INDEX "_people_v_blocks_timeline_events_link_link_page_idx" ON "_people_v_blocks_timeline_events" USING btree ("link_page_id");
  CREATE INDEX "_people_v_blocks_timeline_order_idx" ON "_people_v_blocks_timeline" USING btree ("_order");
  CREATE INDEX "_people_v_blocks_timeline_parent_id_idx" ON "_people_v_blocks_timeline" USING btree ("_parent_id");
  CREATE INDEX "_people_v_blocks_timeline_path_idx" ON "_people_v_blocks_timeline" USING btree ("_path");
  CREATE INDEX "_people_v_blocks_spacer_order_idx" ON "_people_v_blocks_spacer" USING btree ("_order");
  CREATE INDEX "_people_v_blocks_spacer_parent_id_idx" ON "_people_v_blocks_spacer" USING btree ("_parent_id");
  CREATE INDEX "_people_v_blocks_spacer_path_idx" ON "_people_v_blocks_spacer" USING btree ("_path");
  CREATE INDEX "_people_v_blocks_html_order_idx" ON "_people_v_blocks_html" USING btree ("_order");
  CREATE INDEX "_people_v_blocks_html_parent_id_idx" ON "_people_v_blocks_html" USING btree ("_parent_id");
  CREATE INDEX "_people_v_blocks_html_path_idx" ON "_people_v_blocks_html" USING btree ("_path");
  CREATE INDEX "_people_v_parent_idx" ON "_people_v" USING btree ("parent_id");
  CREATE INDEX "_people_v_version_version_portrait_idx" ON "_people_v" USING btree ("version_portrait_id");
  CREATE INDEX "_people_v_version_version_birth_place_idx" ON "_people_v" USING btree ("version_birth_place_id");
  CREATE INDEX "_people_v_version_version_death_place_idx" ON "_people_v" USING btree ("version_death_place_id");
  CREATE INDEX "_people_v_version_version_slug_idx" ON "_people_v" USING btree ("version_slug");
  CREATE INDEX "_people_v_version_version_updated_at_idx" ON "_people_v" USING btree ("version_updated_at");
  CREATE INDEX "_people_v_version_version_created_at_idx" ON "_people_v" USING btree ("version_created_at");
  CREATE INDEX "_people_v_version_version__status_idx" ON "_people_v" USING btree ("version__status");
  CREATE INDEX "_people_v_created_at_idx" ON "_people_v" USING btree ("created_at");
  CREATE INDEX "_people_v_updated_at_idx" ON "_people_v" USING btree ("updated_at");
  CREATE INDEX "_people_v_latest_idx" ON "_people_v" USING btree ("latest");
  CREATE INDEX "_people_v_autosave_idx" ON "_people_v" USING btree ("autosave");
  CREATE INDEX "_people_v_rels_order_idx" ON "_people_v_rels" USING btree ("order");
  CREATE INDEX "_people_v_rels_parent_idx" ON "_people_v_rels" USING btree ("parent_id");
  CREATE INDEX "_people_v_rels_path_idx" ON "_people_v_rels" USING btree ("path");
  CREATE INDEX "_people_v_rels_people_id_idx" ON "_people_v_rels" USING btree ("people_id");
  CREATE INDEX "_people_v_rels_categories_id_idx" ON "_people_v_rels" USING btree ("categories_id");
  CREATE INDEX "_people_v_rels_tags_id_idx" ON "_people_v_rels" USING btree ("tags_id");
  CREATE INDEX "_people_v_rels_posts_id_idx" ON "_people_v_rels" USING btree ("posts_id");
  CREATE INDEX "_people_v_rels_pages_id_idx" ON "_people_v_rels" USING btree ("pages_id");
  CREATE INDEX "places_historical_names_order_idx" ON "places_historical_names" USING btree ("_order");
  CREATE INDEX "places_historical_names_parent_id_idx" ON "places_historical_names" USING btree ("_parent_id");
  CREATE INDEX "places_hours_order_idx" ON "places_hours" USING btree ("_order");
  CREATE INDEX "places_hours_parent_id_idx" ON "places_hours" USING btree ("_parent_id");
  CREATE INDEX "places_gallery_order_idx" ON "places_gallery" USING btree ("_order");
  CREATE INDEX "places_gallery_parent_id_idx" ON "places_gallery" USING btree ("_parent_id");
  CREATE INDEX "places_gallery_image_idx" ON "places_gallery" USING btree ("image_id");
  CREATE INDEX "places_blocks_hero_links_order_idx" ON "places_blocks_hero_links" USING btree ("_order");
  CREATE INDEX "places_blocks_hero_links_parent_id_idx" ON "places_blocks_hero_links" USING btree ("_parent_id");
  CREATE INDEX "places_blocks_hero_links_page_idx" ON "places_blocks_hero_links" USING btree ("page_id");
  CREATE INDEX "places_blocks_hero_order_idx" ON "places_blocks_hero" USING btree ("_order");
  CREATE INDEX "places_blocks_hero_parent_id_idx" ON "places_blocks_hero" USING btree ("_parent_id");
  CREATE INDEX "places_blocks_hero_path_idx" ON "places_blocks_hero" USING btree ("_path");
  CREATE INDEX "places_blocks_hero_image_idx" ON "places_blocks_hero" USING btree ("image_id");
  CREATE INDEX "places_blocks_content_columns_order_idx" ON "places_blocks_content_columns" USING btree ("_order");
  CREATE INDEX "places_blocks_content_columns_parent_id_idx" ON "places_blocks_content_columns" USING btree ("_parent_id");
  CREATE INDEX "places_blocks_content_columns_link_link_page_idx" ON "places_blocks_content_columns" USING btree ("link_page_id");
  CREATE INDEX "places_blocks_content_order_idx" ON "places_blocks_content" USING btree ("_order");
  CREATE INDEX "places_blocks_content_parent_id_idx" ON "places_blocks_content" USING btree ("_parent_id");
  CREATE INDEX "places_blocks_content_path_idx" ON "places_blocks_content" USING btree ("_path");
  CREATE INDEX "places_blocks_media_order_idx" ON "places_blocks_media" USING btree ("_order");
  CREATE INDEX "places_blocks_media_parent_id_idx" ON "places_blocks_media" USING btree ("_parent_id");
  CREATE INDEX "places_blocks_media_path_idx" ON "places_blocks_media" USING btree ("_path");
  CREATE INDEX "places_blocks_media_media_idx" ON "places_blocks_media" USING btree ("media_id");
  CREATE INDEX "places_blocks_media_link_link_page_idx" ON "places_blocks_media" USING btree ("link_page_id");
  CREATE INDEX "places_blocks_cta_links_order_idx" ON "places_blocks_cta_links" USING btree ("_order");
  CREATE INDEX "places_blocks_cta_links_parent_id_idx" ON "places_blocks_cta_links" USING btree ("_parent_id");
  CREATE INDEX "places_blocks_cta_links_page_idx" ON "places_blocks_cta_links" USING btree ("page_id");
  CREATE INDEX "places_blocks_cta_order_idx" ON "places_blocks_cta" USING btree ("_order");
  CREATE INDEX "places_blocks_cta_parent_id_idx" ON "places_blocks_cta" USING btree ("_parent_id");
  CREATE INDEX "places_blocks_cta_path_idx" ON "places_blocks_cta" USING btree ("_path");
  CREATE INDEX "places_blocks_cta_image_idx" ON "places_blocks_cta" USING btree ("image_id");
  CREATE INDEX "places_blocks_quote_order_idx" ON "places_blocks_quote" USING btree ("_order");
  CREATE INDEX "places_blocks_quote_parent_id_idx" ON "places_blocks_quote" USING btree ("_parent_id");
  CREATE INDEX "places_blocks_quote_path_idx" ON "places_blocks_quote" USING btree ("_path");
  CREATE INDEX "places_blocks_features_items_order_idx" ON "places_blocks_features_items" USING btree ("_order");
  CREATE INDEX "places_blocks_features_items_parent_id_idx" ON "places_blocks_features_items" USING btree ("_parent_id");
  CREATE INDEX "places_blocks_features_items_media_idx" ON "places_blocks_features_items" USING btree ("media_id");
  CREATE INDEX "places_blocks_features_order_idx" ON "places_blocks_features" USING btree ("_order");
  CREATE INDEX "places_blocks_features_parent_id_idx" ON "places_blocks_features" USING btree ("_parent_id");
  CREATE INDEX "places_blocks_features_path_idx" ON "places_blocks_features" USING btree ("_path");
  CREATE INDEX "places_blocks_stats_items_order_idx" ON "places_blocks_stats_items" USING btree ("_order");
  CREATE INDEX "places_blocks_stats_items_parent_id_idx" ON "places_blocks_stats_items" USING btree ("_parent_id");
  CREATE INDEX "places_blocks_stats_order_idx" ON "places_blocks_stats" USING btree ("_order");
  CREATE INDEX "places_blocks_stats_parent_id_idx" ON "places_blocks_stats" USING btree ("_parent_id");
  CREATE INDEX "places_blocks_stats_path_idx" ON "places_blocks_stats" USING btree ("_path");
  CREATE INDEX "places_blocks_logo_cloud_items_order_idx" ON "places_blocks_logo_cloud_items" USING btree ("_order");
  CREATE INDEX "places_blocks_logo_cloud_items_parent_id_idx" ON "places_blocks_logo_cloud_items" USING btree ("_parent_id");
  CREATE INDEX "places_blocks_logo_cloud_items_media_idx" ON "places_blocks_logo_cloud_items" USING btree ("media_id");
  CREATE INDEX "places_blocks_logo_cloud_order_idx" ON "places_blocks_logo_cloud" USING btree ("_order");
  CREATE INDEX "places_blocks_logo_cloud_parent_id_idx" ON "places_blocks_logo_cloud" USING btree ("_parent_id");
  CREATE INDEX "places_blocks_logo_cloud_path_idx" ON "places_blocks_logo_cloud" USING btree ("_path");
  CREATE INDEX "places_blocks_testimonials_items_order_idx" ON "places_blocks_testimonials_items" USING btree ("_order");
  CREATE INDEX "places_blocks_testimonials_items_parent_id_idx" ON "places_blocks_testimonials_items" USING btree ("_parent_id");
  CREATE INDEX "places_blocks_testimonials_items_avatar_idx" ON "places_blocks_testimonials_items" USING btree ("avatar_id");
  CREATE INDEX "places_blocks_testimonials_order_idx" ON "places_blocks_testimonials" USING btree ("_order");
  CREATE INDEX "places_blocks_testimonials_parent_id_idx" ON "places_blocks_testimonials" USING btree ("_parent_id");
  CREATE INDEX "places_blocks_testimonials_path_idx" ON "places_blocks_testimonials" USING btree ("_path");
  CREATE INDEX "places_blocks_faq_items_order_idx" ON "places_blocks_faq_items" USING btree ("_order");
  CREATE INDEX "places_blocks_faq_items_parent_id_idx" ON "places_blocks_faq_items" USING btree ("_parent_id");
  CREATE INDEX "places_blocks_faq_order_idx" ON "places_blocks_faq" USING btree ("_order");
  CREATE INDEX "places_blocks_faq_parent_id_idx" ON "places_blocks_faq" USING btree ("_parent_id");
  CREATE INDEX "places_blocks_faq_path_idx" ON "places_blocks_faq" USING btree ("_path");
  CREATE INDEX "places_blocks_pricing_plans_features_order_idx" ON "places_blocks_pricing_plans_features" USING btree ("_order");
  CREATE INDEX "places_blocks_pricing_plans_features_parent_id_idx" ON "places_blocks_pricing_plans_features" USING btree ("_parent_id");
  CREATE INDEX "places_blocks_pricing_plans_links_order_idx" ON "places_blocks_pricing_plans_links" USING btree ("_order");
  CREATE INDEX "places_blocks_pricing_plans_links_parent_id_idx" ON "places_blocks_pricing_plans_links" USING btree ("_parent_id");
  CREATE INDEX "places_blocks_pricing_plans_links_page_idx" ON "places_blocks_pricing_plans_links" USING btree ("page_id");
  CREATE INDEX "places_blocks_pricing_plans_order_idx" ON "places_blocks_pricing_plans" USING btree ("_order");
  CREATE INDEX "places_blocks_pricing_plans_parent_id_idx" ON "places_blocks_pricing_plans" USING btree ("_parent_id");
  CREATE INDEX "places_blocks_pricing_order_idx" ON "places_blocks_pricing" USING btree ("_order");
  CREATE INDEX "places_blocks_pricing_parent_id_idx" ON "places_blocks_pricing" USING btree ("_parent_id");
  CREATE INDEX "places_blocks_pricing_path_idx" ON "places_blocks_pricing" USING btree ("_path");
  CREATE INDEX "places_blocks_team_items_socials_order_idx" ON "places_blocks_team_items_socials" USING btree ("_order");
  CREATE INDEX "places_blocks_team_items_socials_parent_id_idx" ON "places_blocks_team_items_socials" USING btree ("_parent_id");
  CREATE INDEX "places_blocks_team_items_order_idx" ON "places_blocks_team_items" USING btree ("_order");
  CREATE INDEX "places_blocks_team_items_parent_id_idx" ON "places_blocks_team_items" USING btree ("_parent_id");
  CREATE INDEX "places_blocks_team_items_photo_idx" ON "places_blocks_team_items" USING btree ("photo_id");
  CREATE INDEX "places_blocks_team_order_idx" ON "places_blocks_team" USING btree ("_order");
  CREATE INDEX "places_blocks_team_parent_id_idx" ON "places_blocks_team" USING btree ("_parent_id");
  CREATE INDEX "places_blocks_team_path_idx" ON "places_blocks_team" USING btree ("_path");
  CREATE INDEX "places_blocks_embed_order_idx" ON "places_blocks_embed" USING btree ("_order");
  CREATE INDEX "places_blocks_embed_parent_id_idx" ON "places_blocks_embed" USING btree ("_parent_id");
  CREATE INDEX "places_blocks_embed_path_idx" ON "places_blocks_embed" USING btree ("_path");
  CREATE INDEX "places_blocks_archive_order_idx" ON "places_blocks_archive" USING btree ("_order");
  CREATE INDEX "places_blocks_archive_parent_id_idx" ON "places_blocks_archive" USING btree ("_parent_id");
  CREATE INDEX "places_blocks_archive_path_idx" ON "places_blocks_archive" USING btree ("_path");
  CREATE INDEX "places_blocks_form_order_idx" ON "places_blocks_form" USING btree ("_order");
  CREATE INDEX "places_blocks_form_parent_id_idx" ON "places_blocks_form" USING btree ("_parent_id");
  CREATE INDEX "places_blocks_form_path_idx" ON "places_blocks_form" USING btree ("_path");
  CREATE INDEX "places_blocks_form_form_idx" ON "places_blocks_form" USING btree ("form_id");
  CREATE INDEX "places_blocks_gallery_images_order_idx" ON "places_blocks_gallery_images" USING btree ("_order");
  CREATE INDEX "places_blocks_gallery_images_parent_id_idx" ON "places_blocks_gallery_images" USING btree ("_parent_id");
  CREATE INDEX "places_blocks_gallery_images_image_idx" ON "places_blocks_gallery_images" USING btree ("image_id");
  CREATE INDEX "places_blocks_gallery_images_link_link_page_idx" ON "places_blocks_gallery_images" USING btree ("link_page_id");
  CREATE INDEX "places_blocks_gallery_order_idx" ON "places_blocks_gallery" USING btree ("_order");
  CREATE INDEX "places_blocks_gallery_parent_id_idx" ON "places_blocks_gallery" USING btree ("_parent_id");
  CREATE INDEX "places_blocks_gallery_path_idx" ON "places_blocks_gallery" USING btree ("_path");
  CREATE INDEX "places_blocks_grid_items_order_idx" ON "places_blocks_grid_items" USING btree ("_order");
  CREATE INDEX "places_blocks_grid_items_parent_id_idx" ON "places_blocks_grid_items" USING btree ("_parent_id");
  CREATE INDEX "places_blocks_grid_items_image_idx" ON "places_blocks_grid_items" USING btree ("image_id");
  CREATE INDEX "places_blocks_grid_items_link_link_page_idx" ON "places_blocks_grid_items" USING btree ("link_page_id");
  CREATE INDEX "places_blocks_grid_order_idx" ON "places_blocks_grid" USING btree ("_order");
  CREATE INDEX "places_blocks_grid_parent_id_idx" ON "places_blocks_grid" USING btree ("_parent_id");
  CREATE INDEX "places_blocks_grid_path_idx" ON "places_blocks_grid" USING btree ("_path");
  CREATE INDEX "places_blocks_grid_cta_cta_page_idx" ON "places_blocks_grid" USING btree ("cta_page_id");
  CREATE INDEX "places_blocks_timeline_events_order_idx" ON "places_blocks_timeline_events" USING btree ("_order");
  CREATE INDEX "places_blocks_timeline_events_parent_id_idx" ON "places_blocks_timeline_events" USING btree ("_parent_id");
  CREATE INDEX "places_blocks_timeline_events_image_idx" ON "places_blocks_timeline_events" USING btree ("image_id");
  CREATE INDEX "places_blocks_timeline_events_link_link_page_idx" ON "places_blocks_timeline_events" USING btree ("link_page_id");
  CREATE INDEX "places_blocks_timeline_order_idx" ON "places_blocks_timeline" USING btree ("_order");
  CREATE INDEX "places_blocks_timeline_parent_id_idx" ON "places_blocks_timeline" USING btree ("_parent_id");
  CREATE INDEX "places_blocks_timeline_path_idx" ON "places_blocks_timeline" USING btree ("_path");
  CREATE INDEX "places_blocks_spacer_order_idx" ON "places_blocks_spacer" USING btree ("_order");
  CREATE INDEX "places_blocks_spacer_parent_id_idx" ON "places_blocks_spacer" USING btree ("_parent_id");
  CREATE INDEX "places_blocks_spacer_path_idx" ON "places_blocks_spacer" USING btree ("_path");
  CREATE INDEX "places_blocks_html_order_idx" ON "places_blocks_html" USING btree ("_order");
  CREATE INDEX "places_blocks_html_parent_id_idx" ON "places_blocks_html" USING btree ("_parent_id");
  CREATE INDEX "places_blocks_html_path_idx" ON "places_blocks_html" USING btree ("_path");
  CREATE INDEX "places_featured_image_idx" ON "places" USING btree ("featured_image_id");
  CREATE UNIQUE INDEX "places_slug_idx" ON "places" USING btree ("slug");
  CREATE INDEX "places_updated_at_idx" ON "places" USING btree ("updated_at");
  CREATE INDEX "places_created_at_idx" ON "places" USING btree ("created_at");
  CREATE INDEX "places__status_idx" ON "places" USING btree ("_status");
  CREATE INDEX "places_rels_order_idx" ON "places_rels" USING btree ("order");
  CREATE INDEX "places_rels_parent_idx" ON "places_rels" USING btree ("parent_id");
  CREATE INDEX "places_rels_path_idx" ON "places_rels" USING btree ("path");
  CREATE INDEX "places_rels_places_id_idx" ON "places_rels" USING btree ("places_id");
  CREATE INDEX "places_rels_categories_id_idx" ON "places_rels" USING btree ("categories_id");
  CREATE INDEX "places_rels_tags_id_idx" ON "places_rels" USING btree ("tags_id");
  CREATE INDEX "places_rels_posts_id_idx" ON "places_rels" USING btree ("posts_id");
  CREATE INDEX "places_rels_pages_id_idx" ON "places_rels" USING btree ("pages_id");
  CREATE INDEX "_places_v_version_historical_names_order_idx" ON "_places_v_version_historical_names" USING btree ("_order");
  CREATE INDEX "_places_v_version_historical_names_parent_id_idx" ON "_places_v_version_historical_names" USING btree ("_parent_id");
  CREATE INDEX "_places_v_version_hours_order_idx" ON "_places_v_version_hours" USING btree ("_order");
  CREATE INDEX "_places_v_version_hours_parent_id_idx" ON "_places_v_version_hours" USING btree ("_parent_id");
  CREATE INDEX "_places_v_version_gallery_order_idx" ON "_places_v_version_gallery" USING btree ("_order");
  CREATE INDEX "_places_v_version_gallery_parent_id_idx" ON "_places_v_version_gallery" USING btree ("_parent_id");
  CREATE INDEX "_places_v_version_gallery_image_idx" ON "_places_v_version_gallery" USING btree ("image_id");
  CREATE INDEX "_places_v_blocks_hero_links_order_idx" ON "_places_v_blocks_hero_links" USING btree ("_order");
  CREATE INDEX "_places_v_blocks_hero_links_parent_id_idx" ON "_places_v_blocks_hero_links" USING btree ("_parent_id");
  CREATE INDEX "_places_v_blocks_hero_links_page_idx" ON "_places_v_blocks_hero_links" USING btree ("page_id");
  CREATE INDEX "_places_v_blocks_hero_order_idx" ON "_places_v_blocks_hero" USING btree ("_order");
  CREATE INDEX "_places_v_blocks_hero_parent_id_idx" ON "_places_v_blocks_hero" USING btree ("_parent_id");
  CREATE INDEX "_places_v_blocks_hero_path_idx" ON "_places_v_blocks_hero" USING btree ("_path");
  CREATE INDEX "_places_v_blocks_hero_image_idx" ON "_places_v_blocks_hero" USING btree ("image_id");
  CREATE INDEX "_places_v_blocks_content_columns_order_idx" ON "_places_v_blocks_content_columns" USING btree ("_order");
  CREATE INDEX "_places_v_blocks_content_columns_parent_id_idx" ON "_places_v_blocks_content_columns" USING btree ("_parent_id");
  CREATE INDEX "_places_v_blocks_content_columns_link_link_page_idx" ON "_places_v_blocks_content_columns" USING btree ("link_page_id");
  CREATE INDEX "_places_v_blocks_content_order_idx" ON "_places_v_blocks_content" USING btree ("_order");
  CREATE INDEX "_places_v_blocks_content_parent_id_idx" ON "_places_v_blocks_content" USING btree ("_parent_id");
  CREATE INDEX "_places_v_blocks_content_path_idx" ON "_places_v_blocks_content" USING btree ("_path");
  CREATE INDEX "_places_v_blocks_media_order_idx" ON "_places_v_blocks_media" USING btree ("_order");
  CREATE INDEX "_places_v_blocks_media_parent_id_idx" ON "_places_v_blocks_media" USING btree ("_parent_id");
  CREATE INDEX "_places_v_blocks_media_path_idx" ON "_places_v_blocks_media" USING btree ("_path");
  CREATE INDEX "_places_v_blocks_media_media_idx" ON "_places_v_blocks_media" USING btree ("media_id");
  CREATE INDEX "_places_v_blocks_media_link_link_page_idx" ON "_places_v_blocks_media" USING btree ("link_page_id");
  CREATE INDEX "_places_v_blocks_cta_links_order_idx" ON "_places_v_blocks_cta_links" USING btree ("_order");
  CREATE INDEX "_places_v_blocks_cta_links_parent_id_idx" ON "_places_v_blocks_cta_links" USING btree ("_parent_id");
  CREATE INDEX "_places_v_blocks_cta_links_page_idx" ON "_places_v_blocks_cta_links" USING btree ("page_id");
  CREATE INDEX "_places_v_blocks_cta_order_idx" ON "_places_v_blocks_cta" USING btree ("_order");
  CREATE INDEX "_places_v_blocks_cta_parent_id_idx" ON "_places_v_blocks_cta" USING btree ("_parent_id");
  CREATE INDEX "_places_v_blocks_cta_path_idx" ON "_places_v_blocks_cta" USING btree ("_path");
  CREATE INDEX "_places_v_blocks_cta_image_idx" ON "_places_v_blocks_cta" USING btree ("image_id");
  CREATE INDEX "_places_v_blocks_quote_order_idx" ON "_places_v_blocks_quote" USING btree ("_order");
  CREATE INDEX "_places_v_blocks_quote_parent_id_idx" ON "_places_v_blocks_quote" USING btree ("_parent_id");
  CREATE INDEX "_places_v_blocks_quote_path_idx" ON "_places_v_blocks_quote" USING btree ("_path");
  CREATE INDEX "_places_v_blocks_features_items_order_idx" ON "_places_v_blocks_features_items" USING btree ("_order");
  CREATE INDEX "_places_v_blocks_features_items_parent_id_idx" ON "_places_v_blocks_features_items" USING btree ("_parent_id");
  CREATE INDEX "_places_v_blocks_features_items_media_idx" ON "_places_v_blocks_features_items" USING btree ("media_id");
  CREATE INDEX "_places_v_blocks_features_order_idx" ON "_places_v_blocks_features" USING btree ("_order");
  CREATE INDEX "_places_v_blocks_features_parent_id_idx" ON "_places_v_blocks_features" USING btree ("_parent_id");
  CREATE INDEX "_places_v_blocks_features_path_idx" ON "_places_v_blocks_features" USING btree ("_path");
  CREATE INDEX "_places_v_blocks_stats_items_order_idx" ON "_places_v_blocks_stats_items" USING btree ("_order");
  CREATE INDEX "_places_v_blocks_stats_items_parent_id_idx" ON "_places_v_blocks_stats_items" USING btree ("_parent_id");
  CREATE INDEX "_places_v_blocks_stats_order_idx" ON "_places_v_blocks_stats" USING btree ("_order");
  CREATE INDEX "_places_v_blocks_stats_parent_id_idx" ON "_places_v_blocks_stats" USING btree ("_parent_id");
  CREATE INDEX "_places_v_blocks_stats_path_idx" ON "_places_v_blocks_stats" USING btree ("_path");
  CREATE INDEX "_places_v_blocks_logo_cloud_items_order_idx" ON "_places_v_blocks_logo_cloud_items" USING btree ("_order");
  CREATE INDEX "_places_v_blocks_logo_cloud_items_parent_id_idx" ON "_places_v_blocks_logo_cloud_items" USING btree ("_parent_id");
  CREATE INDEX "_places_v_blocks_logo_cloud_items_media_idx" ON "_places_v_blocks_logo_cloud_items" USING btree ("media_id");
  CREATE INDEX "_places_v_blocks_logo_cloud_order_idx" ON "_places_v_blocks_logo_cloud" USING btree ("_order");
  CREATE INDEX "_places_v_blocks_logo_cloud_parent_id_idx" ON "_places_v_blocks_logo_cloud" USING btree ("_parent_id");
  CREATE INDEX "_places_v_blocks_logo_cloud_path_idx" ON "_places_v_blocks_logo_cloud" USING btree ("_path");
  CREATE INDEX "_places_v_blocks_testimonials_items_order_idx" ON "_places_v_blocks_testimonials_items" USING btree ("_order");
  CREATE INDEX "_places_v_blocks_testimonials_items_parent_id_idx" ON "_places_v_blocks_testimonials_items" USING btree ("_parent_id");
  CREATE INDEX "_places_v_blocks_testimonials_items_avatar_idx" ON "_places_v_blocks_testimonials_items" USING btree ("avatar_id");
  CREATE INDEX "_places_v_blocks_testimonials_order_idx" ON "_places_v_blocks_testimonials" USING btree ("_order");
  CREATE INDEX "_places_v_blocks_testimonials_parent_id_idx" ON "_places_v_blocks_testimonials" USING btree ("_parent_id");
  CREATE INDEX "_places_v_blocks_testimonials_path_idx" ON "_places_v_blocks_testimonials" USING btree ("_path");
  CREATE INDEX "_places_v_blocks_faq_items_order_idx" ON "_places_v_blocks_faq_items" USING btree ("_order");
  CREATE INDEX "_places_v_blocks_faq_items_parent_id_idx" ON "_places_v_blocks_faq_items" USING btree ("_parent_id");
  CREATE INDEX "_places_v_blocks_faq_order_idx" ON "_places_v_blocks_faq" USING btree ("_order");
  CREATE INDEX "_places_v_blocks_faq_parent_id_idx" ON "_places_v_blocks_faq" USING btree ("_parent_id");
  CREATE INDEX "_places_v_blocks_faq_path_idx" ON "_places_v_blocks_faq" USING btree ("_path");
  CREATE INDEX "_places_v_blocks_pricing_plans_features_order_idx" ON "_places_v_blocks_pricing_plans_features" USING btree ("_order");
  CREATE INDEX "_places_v_blocks_pricing_plans_features_parent_id_idx" ON "_places_v_blocks_pricing_plans_features" USING btree ("_parent_id");
  CREATE INDEX "_places_v_blocks_pricing_plans_links_order_idx" ON "_places_v_blocks_pricing_plans_links" USING btree ("_order");
  CREATE INDEX "_places_v_blocks_pricing_plans_links_parent_id_idx" ON "_places_v_blocks_pricing_plans_links" USING btree ("_parent_id");
  CREATE INDEX "_places_v_blocks_pricing_plans_links_page_idx" ON "_places_v_blocks_pricing_plans_links" USING btree ("page_id");
  CREATE INDEX "_places_v_blocks_pricing_plans_order_idx" ON "_places_v_blocks_pricing_plans" USING btree ("_order");
  CREATE INDEX "_places_v_blocks_pricing_plans_parent_id_idx" ON "_places_v_blocks_pricing_plans" USING btree ("_parent_id");
  CREATE INDEX "_places_v_blocks_pricing_order_idx" ON "_places_v_blocks_pricing" USING btree ("_order");
  CREATE INDEX "_places_v_blocks_pricing_parent_id_idx" ON "_places_v_blocks_pricing" USING btree ("_parent_id");
  CREATE INDEX "_places_v_blocks_pricing_path_idx" ON "_places_v_blocks_pricing" USING btree ("_path");
  CREATE INDEX "_places_v_blocks_team_items_socials_order_idx" ON "_places_v_blocks_team_items_socials" USING btree ("_order");
  CREATE INDEX "_places_v_blocks_team_items_socials_parent_id_idx" ON "_places_v_blocks_team_items_socials" USING btree ("_parent_id");
  CREATE INDEX "_places_v_blocks_team_items_order_idx" ON "_places_v_blocks_team_items" USING btree ("_order");
  CREATE INDEX "_places_v_blocks_team_items_parent_id_idx" ON "_places_v_blocks_team_items" USING btree ("_parent_id");
  CREATE INDEX "_places_v_blocks_team_items_photo_idx" ON "_places_v_blocks_team_items" USING btree ("photo_id");
  CREATE INDEX "_places_v_blocks_team_order_idx" ON "_places_v_blocks_team" USING btree ("_order");
  CREATE INDEX "_places_v_blocks_team_parent_id_idx" ON "_places_v_blocks_team" USING btree ("_parent_id");
  CREATE INDEX "_places_v_blocks_team_path_idx" ON "_places_v_blocks_team" USING btree ("_path");
  CREATE INDEX "_places_v_blocks_embed_order_idx" ON "_places_v_blocks_embed" USING btree ("_order");
  CREATE INDEX "_places_v_blocks_embed_parent_id_idx" ON "_places_v_blocks_embed" USING btree ("_parent_id");
  CREATE INDEX "_places_v_blocks_embed_path_idx" ON "_places_v_blocks_embed" USING btree ("_path");
  CREATE INDEX "_places_v_blocks_archive_order_idx" ON "_places_v_blocks_archive" USING btree ("_order");
  CREATE INDEX "_places_v_blocks_archive_parent_id_idx" ON "_places_v_blocks_archive" USING btree ("_parent_id");
  CREATE INDEX "_places_v_blocks_archive_path_idx" ON "_places_v_blocks_archive" USING btree ("_path");
  CREATE INDEX "_places_v_blocks_form_order_idx" ON "_places_v_blocks_form" USING btree ("_order");
  CREATE INDEX "_places_v_blocks_form_parent_id_idx" ON "_places_v_blocks_form" USING btree ("_parent_id");
  CREATE INDEX "_places_v_blocks_form_path_idx" ON "_places_v_blocks_form" USING btree ("_path");
  CREATE INDEX "_places_v_blocks_form_form_idx" ON "_places_v_blocks_form" USING btree ("form_id");
  CREATE INDEX "_places_v_blocks_gallery_images_order_idx" ON "_places_v_blocks_gallery_images" USING btree ("_order");
  CREATE INDEX "_places_v_blocks_gallery_images_parent_id_idx" ON "_places_v_blocks_gallery_images" USING btree ("_parent_id");
  CREATE INDEX "_places_v_blocks_gallery_images_image_idx" ON "_places_v_blocks_gallery_images" USING btree ("image_id");
  CREATE INDEX "_places_v_blocks_gallery_images_link_link_page_idx" ON "_places_v_blocks_gallery_images" USING btree ("link_page_id");
  CREATE INDEX "_places_v_blocks_gallery_order_idx" ON "_places_v_blocks_gallery" USING btree ("_order");
  CREATE INDEX "_places_v_blocks_gallery_parent_id_idx" ON "_places_v_blocks_gallery" USING btree ("_parent_id");
  CREATE INDEX "_places_v_blocks_gallery_path_idx" ON "_places_v_blocks_gallery" USING btree ("_path");
  CREATE INDEX "_places_v_blocks_grid_items_order_idx" ON "_places_v_blocks_grid_items" USING btree ("_order");
  CREATE INDEX "_places_v_blocks_grid_items_parent_id_idx" ON "_places_v_blocks_grid_items" USING btree ("_parent_id");
  CREATE INDEX "_places_v_blocks_grid_items_image_idx" ON "_places_v_blocks_grid_items" USING btree ("image_id");
  CREATE INDEX "_places_v_blocks_grid_items_link_link_page_idx" ON "_places_v_blocks_grid_items" USING btree ("link_page_id");
  CREATE INDEX "_places_v_blocks_grid_order_idx" ON "_places_v_blocks_grid" USING btree ("_order");
  CREATE INDEX "_places_v_blocks_grid_parent_id_idx" ON "_places_v_blocks_grid" USING btree ("_parent_id");
  CREATE INDEX "_places_v_blocks_grid_path_idx" ON "_places_v_blocks_grid" USING btree ("_path");
  CREATE INDEX "_places_v_blocks_grid_cta_cta_page_idx" ON "_places_v_blocks_grid" USING btree ("cta_page_id");
  CREATE INDEX "_places_v_blocks_timeline_events_order_idx" ON "_places_v_blocks_timeline_events" USING btree ("_order");
  CREATE INDEX "_places_v_blocks_timeline_events_parent_id_idx" ON "_places_v_blocks_timeline_events" USING btree ("_parent_id");
  CREATE INDEX "_places_v_blocks_timeline_events_image_idx" ON "_places_v_blocks_timeline_events" USING btree ("image_id");
  CREATE INDEX "_places_v_blocks_timeline_events_link_link_page_idx" ON "_places_v_blocks_timeline_events" USING btree ("link_page_id");
  CREATE INDEX "_places_v_blocks_timeline_order_idx" ON "_places_v_blocks_timeline" USING btree ("_order");
  CREATE INDEX "_places_v_blocks_timeline_parent_id_idx" ON "_places_v_blocks_timeline" USING btree ("_parent_id");
  CREATE INDEX "_places_v_blocks_timeline_path_idx" ON "_places_v_blocks_timeline" USING btree ("_path");
  CREATE INDEX "_places_v_blocks_spacer_order_idx" ON "_places_v_blocks_spacer" USING btree ("_order");
  CREATE INDEX "_places_v_blocks_spacer_parent_id_idx" ON "_places_v_blocks_spacer" USING btree ("_parent_id");
  CREATE INDEX "_places_v_blocks_spacer_path_idx" ON "_places_v_blocks_spacer" USING btree ("_path");
  CREATE INDEX "_places_v_blocks_html_order_idx" ON "_places_v_blocks_html" USING btree ("_order");
  CREATE INDEX "_places_v_blocks_html_parent_id_idx" ON "_places_v_blocks_html" USING btree ("_parent_id");
  CREATE INDEX "_places_v_blocks_html_path_idx" ON "_places_v_blocks_html" USING btree ("_path");
  CREATE INDEX "_places_v_parent_idx" ON "_places_v" USING btree ("parent_id");
  CREATE INDEX "_places_v_version_version_featured_image_idx" ON "_places_v" USING btree ("version_featured_image_id");
  CREATE INDEX "_places_v_version_version_slug_idx" ON "_places_v" USING btree ("version_slug");
  CREATE INDEX "_places_v_version_version_updated_at_idx" ON "_places_v" USING btree ("version_updated_at");
  CREATE INDEX "_places_v_version_version_created_at_idx" ON "_places_v" USING btree ("version_created_at");
  CREATE INDEX "_places_v_version_version__status_idx" ON "_places_v" USING btree ("version__status");
  CREATE INDEX "_places_v_created_at_idx" ON "_places_v" USING btree ("created_at");
  CREATE INDEX "_places_v_updated_at_idx" ON "_places_v" USING btree ("updated_at");
  CREATE INDEX "_places_v_latest_idx" ON "_places_v" USING btree ("latest");
  CREATE INDEX "_places_v_autosave_idx" ON "_places_v" USING btree ("autosave");
  CREATE INDEX "_places_v_rels_order_idx" ON "_places_v_rels" USING btree ("order");
  CREATE INDEX "_places_v_rels_parent_idx" ON "_places_v_rels" USING btree ("parent_id");
  CREATE INDEX "_places_v_rels_path_idx" ON "_places_v_rels" USING btree ("path");
  CREATE INDEX "_places_v_rels_places_id_idx" ON "_places_v_rels" USING btree ("places_id");
  CREATE INDEX "_places_v_rels_categories_id_idx" ON "_places_v_rels" USING btree ("categories_id");
  CREATE INDEX "_places_v_rels_tags_id_idx" ON "_places_v_rels" USING btree ("tags_id");
  CREATE INDEX "_places_v_rels_posts_id_idx" ON "_places_v_rels" USING btree ("posts_id");
  CREATE INDEX "_places_v_rels_pages_id_idx" ON "_places_v_rels" USING btree ("pages_id");
  CREATE INDEX "events_blocks_hero_links_order_idx" ON "events_blocks_hero_links" USING btree ("_order");
  CREATE INDEX "events_blocks_hero_links_parent_id_idx" ON "events_blocks_hero_links" USING btree ("_parent_id");
  CREATE INDEX "events_blocks_hero_links_page_idx" ON "events_blocks_hero_links" USING btree ("page_id");
  CREATE INDEX "events_blocks_hero_order_idx" ON "events_blocks_hero" USING btree ("_order");
  CREATE INDEX "events_blocks_hero_parent_id_idx" ON "events_blocks_hero" USING btree ("_parent_id");
  CREATE INDEX "events_blocks_hero_path_idx" ON "events_blocks_hero" USING btree ("_path");
  CREATE INDEX "events_blocks_hero_image_idx" ON "events_blocks_hero" USING btree ("image_id");
  CREATE INDEX "events_blocks_content_columns_order_idx" ON "events_blocks_content_columns" USING btree ("_order");
  CREATE INDEX "events_blocks_content_columns_parent_id_idx" ON "events_blocks_content_columns" USING btree ("_parent_id");
  CREATE INDEX "events_blocks_content_columns_link_link_page_idx" ON "events_blocks_content_columns" USING btree ("link_page_id");
  CREATE INDEX "events_blocks_content_order_idx" ON "events_blocks_content" USING btree ("_order");
  CREATE INDEX "events_blocks_content_parent_id_idx" ON "events_blocks_content" USING btree ("_parent_id");
  CREATE INDEX "events_blocks_content_path_idx" ON "events_blocks_content" USING btree ("_path");
  CREATE INDEX "events_blocks_media_order_idx" ON "events_blocks_media" USING btree ("_order");
  CREATE INDEX "events_blocks_media_parent_id_idx" ON "events_blocks_media" USING btree ("_parent_id");
  CREATE INDEX "events_blocks_media_path_idx" ON "events_blocks_media" USING btree ("_path");
  CREATE INDEX "events_blocks_media_media_idx" ON "events_blocks_media" USING btree ("media_id");
  CREATE INDEX "events_blocks_media_link_link_page_idx" ON "events_blocks_media" USING btree ("link_page_id");
  CREATE INDEX "events_blocks_cta_links_order_idx" ON "events_blocks_cta_links" USING btree ("_order");
  CREATE INDEX "events_blocks_cta_links_parent_id_idx" ON "events_blocks_cta_links" USING btree ("_parent_id");
  CREATE INDEX "events_blocks_cta_links_page_idx" ON "events_blocks_cta_links" USING btree ("page_id");
  CREATE INDEX "events_blocks_cta_order_idx" ON "events_blocks_cta" USING btree ("_order");
  CREATE INDEX "events_blocks_cta_parent_id_idx" ON "events_blocks_cta" USING btree ("_parent_id");
  CREATE INDEX "events_blocks_cta_path_idx" ON "events_blocks_cta" USING btree ("_path");
  CREATE INDEX "events_blocks_cta_image_idx" ON "events_blocks_cta" USING btree ("image_id");
  CREATE INDEX "events_blocks_archive_order_idx" ON "events_blocks_archive" USING btree ("_order");
  CREATE INDEX "events_blocks_archive_parent_id_idx" ON "events_blocks_archive" USING btree ("_parent_id");
  CREATE INDEX "events_blocks_archive_path_idx" ON "events_blocks_archive" USING btree ("_path");
  CREATE INDEX "events_blocks_form_order_idx" ON "events_blocks_form" USING btree ("_order");
  CREATE INDEX "events_blocks_form_parent_id_idx" ON "events_blocks_form" USING btree ("_parent_id");
  CREATE INDEX "events_blocks_form_path_idx" ON "events_blocks_form" USING btree ("_path");
  CREATE INDEX "events_blocks_form_form_idx" ON "events_blocks_form" USING btree ("form_id");
  CREATE INDEX "events_blocks_gallery_images_order_idx" ON "events_blocks_gallery_images" USING btree ("_order");
  CREATE INDEX "events_blocks_gallery_images_parent_id_idx" ON "events_blocks_gallery_images" USING btree ("_parent_id");
  CREATE INDEX "events_blocks_gallery_images_image_idx" ON "events_blocks_gallery_images" USING btree ("image_id");
  CREATE INDEX "events_blocks_gallery_images_link_link_page_idx" ON "events_blocks_gallery_images" USING btree ("link_page_id");
  CREATE INDEX "events_blocks_gallery_order_idx" ON "events_blocks_gallery" USING btree ("_order");
  CREATE INDEX "events_blocks_gallery_parent_id_idx" ON "events_blocks_gallery" USING btree ("_parent_id");
  CREATE INDEX "events_blocks_gallery_path_idx" ON "events_blocks_gallery" USING btree ("_path");
  CREATE INDEX "events_blocks_grid_items_order_idx" ON "events_blocks_grid_items" USING btree ("_order");
  CREATE INDEX "events_blocks_grid_items_parent_id_idx" ON "events_blocks_grid_items" USING btree ("_parent_id");
  CREATE INDEX "events_blocks_grid_items_image_idx" ON "events_blocks_grid_items" USING btree ("image_id");
  CREATE INDEX "events_blocks_grid_items_link_link_page_idx" ON "events_blocks_grid_items" USING btree ("link_page_id");
  CREATE INDEX "events_blocks_grid_order_idx" ON "events_blocks_grid" USING btree ("_order");
  CREATE INDEX "events_blocks_grid_parent_id_idx" ON "events_blocks_grid" USING btree ("_parent_id");
  CREATE INDEX "events_blocks_grid_path_idx" ON "events_blocks_grid" USING btree ("_path");
  CREATE INDEX "events_blocks_grid_cta_cta_page_idx" ON "events_blocks_grid" USING btree ("cta_page_id");
  CREATE INDEX "events_blocks_timeline_events_order_idx" ON "events_blocks_timeline_events" USING btree ("_order");
  CREATE INDEX "events_blocks_timeline_events_parent_id_idx" ON "events_blocks_timeline_events" USING btree ("_parent_id");
  CREATE INDEX "events_blocks_timeline_events_image_idx" ON "events_blocks_timeline_events" USING btree ("image_id");
  CREATE INDEX "events_blocks_timeline_events_link_link_page_idx" ON "events_blocks_timeline_events" USING btree ("link_page_id");
  CREATE INDEX "events_blocks_timeline_order_idx" ON "events_blocks_timeline" USING btree ("_order");
  CREATE INDEX "events_blocks_timeline_parent_id_idx" ON "events_blocks_timeline" USING btree ("_parent_id");
  CREATE INDEX "events_blocks_timeline_path_idx" ON "events_blocks_timeline" USING btree ("_path");
  CREATE INDEX "events_featured_image_idx" ON "events" USING btree ("featured_image_id");
  CREATE INDEX "events_venue_idx" ON "events" USING btree ("venue_id");
  CREATE UNIQUE INDEX "events_slug_idx" ON "events" USING btree ("slug");
  CREATE INDEX "events_updated_at_idx" ON "events" USING btree ("updated_at");
  CREATE INDEX "events_created_at_idx" ON "events" USING btree ("created_at");
  CREATE INDEX "events__status_idx" ON "events" USING btree ("_status");
  CREATE INDEX "events_rels_order_idx" ON "events_rels" USING btree ("order");
  CREATE INDEX "events_rels_parent_idx" ON "events_rels" USING btree ("parent_id");
  CREATE INDEX "events_rels_path_idx" ON "events_rels" USING btree ("path");
  CREATE INDEX "events_rels_categories_id_idx" ON "events_rels" USING btree ("categories_id");
  CREATE INDEX "events_rels_tags_id_idx" ON "events_rels" USING btree ("tags_id");
  CREATE INDEX "events_rels_people_id_idx" ON "events_rels" USING btree ("people_id");
  CREATE INDEX "events_rels_events_id_idx" ON "events_rels" USING btree ("events_id");
  CREATE INDEX "events_rels_posts_id_idx" ON "events_rels" USING btree ("posts_id");
  CREATE INDEX "events_rels_pages_id_idx" ON "events_rels" USING btree ("pages_id");
  CREATE INDEX "_events_v_blocks_hero_links_order_idx" ON "_events_v_blocks_hero_links" USING btree ("_order");
  CREATE INDEX "_events_v_blocks_hero_links_parent_id_idx" ON "_events_v_blocks_hero_links" USING btree ("_parent_id");
  CREATE INDEX "_events_v_blocks_hero_links_page_idx" ON "_events_v_blocks_hero_links" USING btree ("page_id");
  CREATE INDEX "_events_v_blocks_hero_order_idx" ON "_events_v_blocks_hero" USING btree ("_order");
  CREATE INDEX "_events_v_blocks_hero_parent_id_idx" ON "_events_v_blocks_hero" USING btree ("_parent_id");
  CREATE INDEX "_events_v_blocks_hero_path_idx" ON "_events_v_blocks_hero" USING btree ("_path");
  CREATE INDEX "_events_v_blocks_hero_image_idx" ON "_events_v_blocks_hero" USING btree ("image_id");
  CREATE INDEX "_events_v_blocks_content_columns_order_idx" ON "_events_v_blocks_content_columns" USING btree ("_order");
  CREATE INDEX "_events_v_blocks_content_columns_parent_id_idx" ON "_events_v_blocks_content_columns" USING btree ("_parent_id");
  CREATE INDEX "_events_v_blocks_content_columns_link_link_page_idx" ON "_events_v_blocks_content_columns" USING btree ("link_page_id");
  CREATE INDEX "_events_v_blocks_content_order_idx" ON "_events_v_blocks_content" USING btree ("_order");
  CREATE INDEX "_events_v_blocks_content_parent_id_idx" ON "_events_v_blocks_content" USING btree ("_parent_id");
  CREATE INDEX "_events_v_blocks_content_path_idx" ON "_events_v_blocks_content" USING btree ("_path");
  CREATE INDEX "_events_v_blocks_media_order_idx" ON "_events_v_blocks_media" USING btree ("_order");
  CREATE INDEX "_events_v_blocks_media_parent_id_idx" ON "_events_v_blocks_media" USING btree ("_parent_id");
  CREATE INDEX "_events_v_blocks_media_path_idx" ON "_events_v_blocks_media" USING btree ("_path");
  CREATE INDEX "_events_v_blocks_media_media_idx" ON "_events_v_blocks_media" USING btree ("media_id");
  CREATE INDEX "_events_v_blocks_media_link_link_page_idx" ON "_events_v_blocks_media" USING btree ("link_page_id");
  CREATE INDEX "_events_v_blocks_cta_links_order_idx" ON "_events_v_blocks_cta_links" USING btree ("_order");
  CREATE INDEX "_events_v_blocks_cta_links_parent_id_idx" ON "_events_v_blocks_cta_links" USING btree ("_parent_id");
  CREATE INDEX "_events_v_blocks_cta_links_page_idx" ON "_events_v_blocks_cta_links" USING btree ("page_id");
  CREATE INDEX "_events_v_blocks_cta_order_idx" ON "_events_v_blocks_cta" USING btree ("_order");
  CREATE INDEX "_events_v_blocks_cta_parent_id_idx" ON "_events_v_blocks_cta" USING btree ("_parent_id");
  CREATE INDEX "_events_v_blocks_cta_path_idx" ON "_events_v_blocks_cta" USING btree ("_path");
  CREATE INDEX "_events_v_blocks_cta_image_idx" ON "_events_v_blocks_cta" USING btree ("image_id");
  CREATE INDEX "_events_v_blocks_archive_order_idx" ON "_events_v_blocks_archive" USING btree ("_order");
  CREATE INDEX "_events_v_blocks_archive_parent_id_idx" ON "_events_v_blocks_archive" USING btree ("_parent_id");
  CREATE INDEX "_events_v_blocks_archive_path_idx" ON "_events_v_blocks_archive" USING btree ("_path");
  CREATE INDEX "_events_v_blocks_form_order_idx" ON "_events_v_blocks_form" USING btree ("_order");
  CREATE INDEX "_events_v_blocks_form_parent_id_idx" ON "_events_v_blocks_form" USING btree ("_parent_id");
  CREATE INDEX "_events_v_blocks_form_path_idx" ON "_events_v_blocks_form" USING btree ("_path");
  CREATE INDEX "_events_v_blocks_form_form_idx" ON "_events_v_blocks_form" USING btree ("form_id");
  CREATE INDEX "_events_v_blocks_gallery_images_order_idx" ON "_events_v_blocks_gallery_images" USING btree ("_order");
  CREATE INDEX "_events_v_blocks_gallery_images_parent_id_idx" ON "_events_v_blocks_gallery_images" USING btree ("_parent_id");
  CREATE INDEX "_events_v_blocks_gallery_images_image_idx" ON "_events_v_blocks_gallery_images" USING btree ("image_id");
  CREATE INDEX "_events_v_blocks_gallery_images_link_link_page_idx" ON "_events_v_blocks_gallery_images" USING btree ("link_page_id");
  CREATE INDEX "_events_v_blocks_gallery_order_idx" ON "_events_v_blocks_gallery" USING btree ("_order");
  CREATE INDEX "_events_v_blocks_gallery_parent_id_idx" ON "_events_v_blocks_gallery" USING btree ("_parent_id");
  CREATE INDEX "_events_v_blocks_gallery_path_idx" ON "_events_v_blocks_gallery" USING btree ("_path");
  CREATE INDEX "_events_v_blocks_grid_items_order_idx" ON "_events_v_blocks_grid_items" USING btree ("_order");
  CREATE INDEX "_events_v_blocks_grid_items_parent_id_idx" ON "_events_v_blocks_grid_items" USING btree ("_parent_id");
  CREATE INDEX "_events_v_blocks_grid_items_image_idx" ON "_events_v_blocks_grid_items" USING btree ("image_id");
  CREATE INDEX "_events_v_blocks_grid_items_link_link_page_idx" ON "_events_v_blocks_grid_items" USING btree ("link_page_id");
  CREATE INDEX "_events_v_blocks_grid_order_idx" ON "_events_v_blocks_grid" USING btree ("_order");
  CREATE INDEX "_events_v_blocks_grid_parent_id_idx" ON "_events_v_blocks_grid" USING btree ("_parent_id");
  CREATE INDEX "_events_v_blocks_grid_path_idx" ON "_events_v_blocks_grid" USING btree ("_path");
  CREATE INDEX "_events_v_blocks_grid_cta_cta_page_idx" ON "_events_v_blocks_grid" USING btree ("cta_page_id");
  CREATE INDEX "_events_v_blocks_timeline_events_order_idx" ON "_events_v_blocks_timeline_events" USING btree ("_order");
  CREATE INDEX "_events_v_blocks_timeline_events_parent_id_idx" ON "_events_v_blocks_timeline_events" USING btree ("_parent_id");
  CREATE INDEX "_events_v_blocks_timeline_events_image_idx" ON "_events_v_blocks_timeline_events" USING btree ("image_id");
  CREATE INDEX "_events_v_blocks_timeline_events_link_link_page_idx" ON "_events_v_blocks_timeline_events" USING btree ("link_page_id");
  CREATE INDEX "_events_v_blocks_timeline_order_idx" ON "_events_v_blocks_timeline" USING btree ("_order");
  CREATE INDEX "_events_v_blocks_timeline_parent_id_idx" ON "_events_v_blocks_timeline" USING btree ("_parent_id");
  CREATE INDEX "_events_v_blocks_timeline_path_idx" ON "_events_v_blocks_timeline" USING btree ("_path");
  CREATE INDEX "_events_v_parent_idx" ON "_events_v" USING btree ("parent_id");
  CREATE INDEX "_events_v_version_version_featured_image_idx" ON "_events_v" USING btree ("version_featured_image_id");
  CREATE INDEX "_events_v_version_version_venue_idx" ON "_events_v" USING btree ("version_venue_id");
  CREATE INDEX "_events_v_version_version_slug_idx" ON "_events_v" USING btree ("version_slug");
  CREATE INDEX "_events_v_version_version_updated_at_idx" ON "_events_v" USING btree ("version_updated_at");
  CREATE INDEX "_events_v_version_version_created_at_idx" ON "_events_v" USING btree ("version_created_at");
  CREATE INDEX "_events_v_version_version__status_idx" ON "_events_v" USING btree ("version__status");
  CREATE INDEX "_events_v_created_at_idx" ON "_events_v" USING btree ("created_at");
  CREATE INDEX "_events_v_updated_at_idx" ON "_events_v" USING btree ("updated_at");
  CREATE INDEX "_events_v_latest_idx" ON "_events_v" USING btree ("latest");
  CREATE INDEX "_events_v_autosave_idx" ON "_events_v" USING btree ("autosave");
  CREATE INDEX "_events_v_rels_order_idx" ON "_events_v_rels" USING btree ("order");
  CREATE INDEX "_events_v_rels_parent_idx" ON "_events_v_rels" USING btree ("parent_id");
  CREATE INDEX "_events_v_rels_path_idx" ON "_events_v_rels" USING btree ("path");
  CREATE INDEX "_events_v_rels_categories_id_idx" ON "_events_v_rels" USING btree ("categories_id");
  CREATE INDEX "_events_v_rels_tags_id_idx" ON "_events_v_rels" USING btree ("tags_id");
  CREATE INDEX "_events_v_rels_people_id_idx" ON "_events_v_rels" USING btree ("people_id");
  CREATE INDEX "_events_v_rels_events_id_idx" ON "_events_v_rels" USING btree ("events_id");
  CREATE INDEX "_events_v_rels_posts_id_idx" ON "_events_v_rels" USING btree ("posts_id");
  CREATE INDEX "_events_v_rels_pages_id_idx" ON "_events_v_rels" USING btree ("pages_id");
  CREATE INDEX "header_top_bar_links_order_idx" ON "header_top_bar_links" USING btree ("_order");
  CREATE INDEX "header_top_bar_links_parent_id_idx" ON "header_top_bar_links" USING btree ("_parent_id");
  CREATE INDEX "header_top_bar_links_page_idx" ON "header_top_bar_links" USING btree ("page_id");
  CREATE INDEX "page_templates_blocks_logo_cloud_items_order_idx" ON "page_templates_blocks_logo_cloud_items" USING btree ("_order");
  CREATE INDEX "page_templates_blocks_logo_cloud_items_parent_id_idx" ON "page_templates_blocks_logo_cloud_items" USING btree ("_parent_id");
  CREATE INDEX "page_templates_blocks_logo_cloud_items_media_idx" ON "page_templates_blocks_logo_cloud_items" USING btree ("media_id");
  CREATE INDEX "page_templates_blocks_logo_cloud_order_idx" ON "page_templates_blocks_logo_cloud" USING btree ("_order");
  CREATE INDEX "page_templates_blocks_logo_cloud_parent_id_idx" ON "page_templates_blocks_logo_cloud" USING btree ("_parent_id");
  CREATE INDEX "page_templates_blocks_logo_cloud_path_idx" ON "page_templates_blocks_logo_cloud" USING btree ("_path");
  CREATE INDEX "page_templates_blocks_video_feature_order_idx" ON "page_templates_blocks_video_feature" USING btree ("_order");
  CREATE INDEX "page_templates_blocks_video_feature_parent_id_idx" ON "page_templates_blocks_video_feature" USING btree ("_parent_id");
  CREATE INDEX "page_templates_blocks_video_feature_path_idx" ON "page_templates_blocks_video_feature" USING btree ("_path");
  CREATE INDEX "page_templates_blocks_testimonials_items_order_idx" ON "page_templates_blocks_testimonials_items" USING btree ("_order");
  CREATE INDEX "page_templates_blocks_testimonials_items_parent_id_idx" ON "page_templates_blocks_testimonials_items" USING btree ("_parent_id");
  CREATE INDEX "page_templates_blocks_testimonials_items_avatar_idx" ON "page_templates_blocks_testimonials_items" USING btree ("avatar_id");
  CREATE INDEX "page_templates_blocks_testimonials_order_idx" ON "page_templates_blocks_testimonials" USING btree ("_order");
  CREATE INDEX "page_templates_blocks_testimonials_parent_id_idx" ON "page_templates_blocks_testimonials" USING btree ("_parent_id");
  CREATE INDEX "page_templates_blocks_testimonials_path_idx" ON "page_templates_blocks_testimonials" USING btree ("_path");
  CREATE INDEX "page_templates_blocks_content_columns_order_idx" ON "page_templates_blocks_content_columns" USING btree ("_order");
  CREATE INDEX "page_templates_blocks_content_columns_parent_id_idx" ON "page_templates_blocks_content_columns" USING btree ("_parent_id");
  CREATE INDEX "page_templates_blocks_content_columns_link_link_page_idx" ON "page_templates_blocks_content_columns" USING btree ("link_page_id");
  CREATE INDEX "page_templates_blocks_content_order_idx" ON "page_templates_blocks_content" USING btree ("_order");
  CREATE INDEX "page_templates_blocks_content_parent_id_idx" ON "page_templates_blocks_content" USING btree ("_parent_id");
  CREATE INDEX "page_templates_blocks_content_path_idx" ON "page_templates_blocks_content" USING btree ("_path");
  CREATE INDEX "page_templates_blocks_faq_items_order_idx" ON "page_templates_blocks_faq_items" USING btree ("_order");
  CREATE INDEX "page_templates_blocks_faq_items_parent_id_idx" ON "page_templates_blocks_faq_items" USING btree ("_parent_id");
  CREATE INDEX "page_templates_blocks_faq_order_idx" ON "page_templates_blocks_faq" USING btree ("_order");
  CREATE INDEX "page_templates_blocks_faq_parent_id_idx" ON "page_templates_blocks_faq" USING btree ("_parent_id");
  CREATE INDEX "page_templates_blocks_faq_path_idx" ON "page_templates_blocks_faq" USING btree ("_path");
  CREATE INDEX "page_templates_blocks_cta_links_order_idx" ON "page_templates_blocks_cta_links" USING btree ("_order");
  CREATE INDEX "page_templates_blocks_cta_links_parent_id_idx" ON "page_templates_blocks_cta_links" USING btree ("_parent_id");
  CREATE INDEX "page_templates_blocks_cta_links_page_idx" ON "page_templates_blocks_cta_links" USING btree ("page_id");
  CREATE INDEX "page_templates_blocks_cta_order_idx" ON "page_templates_blocks_cta" USING btree ("_order");
  CREATE INDEX "page_templates_blocks_cta_parent_id_idx" ON "page_templates_blocks_cta" USING btree ("_parent_id");
  CREATE INDEX "page_templates_blocks_cta_path_idx" ON "page_templates_blocks_cta" USING btree ("_path");
  CREATE INDEX "page_templates_blocks_cta_image_idx" ON "page_templates_blocks_cta" USING btree ("image_id");
  ALTER TABLE "payload_locked_documents_rels" ADD CONSTRAINT "payload_locked_documents_rels_faqs_fk" FOREIGN KEY ("faqs_id") REFERENCES "public"."faqs"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "payload_locked_documents_rels" ADD CONSTRAINT "payload_locked_documents_rels_testimonials_fk" FOREIGN KEY ("testimonials_id") REFERENCES "public"."testimonials"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "payload_locked_documents_rels" ADD CONSTRAINT "payload_locked_documents_rels_locations_fk" FOREIGN KEY ("locations_id") REFERENCES "public"."locations"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "payload_locked_documents_rels" ADD CONSTRAINT "payload_locked_documents_rels_logo_clouds_fk" FOREIGN KEY ("logo_clouds_id") REFERENCES "public"."logo_clouds"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "payload_locked_documents_rels" ADD CONSTRAINT "payload_locked_documents_rels_global_blocks_fk" FOREIGN KEY ("global_blocks_id") REFERENCES "public"."global_blocks"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "payload_locked_documents_rels" ADD CONSTRAINT "payload_locked_documents_rels_block_library_fk" FOREIGN KEY ("block_library_id") REFERENCES "public"."block_library"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "payload_locked_documents_rels" ADD CONSTRAINT "payload_locked_documents_rels_block_template_builder_fk" FOREIGN KEY ("block_template_builder_id") REFERENCES "public"."block_template_builder"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "payload_locked_documents_rels" ADD CONSTRAINT "payload_locked_documents_rels_content_types_fk" FOREIGN KEY ("content_types_id") REFERENCES "public"."content_types"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "payload_locked_documents_rels" ADD CONSTRAINT "payload_locked_documents_rels_custom_items_fk" FOREIGN KEY ("custom_items_id") REFERENCES "public"."custom_items"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "payload_locked_documents_rels" ADD CONSTRAINT "payload_locked_documents_rels_archive_items_fk" FOREIGN KEY ("archive_items_id") REFERENCES "public"."archive_items"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "payload_locked_documents_rels" ADD CONSTRAINT "payload_locked_documents_rels_people_fk" FOREIGN KEY ("people_id") REFERENCES "public"."people"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "payload_locked_documents_rels" ADD CONSTRAINT "payload_locked_documents_rels_places_fk" FOREIGN KEY ("places_id") REFERENCES "public"."places"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "payload_locked_documents_rels" ADD CONSTRAINT "payload_locked_documents_rels_events_fk" FOREIGN KEY ("events_id") REFERENCES "public"."events"("id") ON DELETE cascade ON UPDATE no action;
  CREATE INDEX "payload_locked_documents_rels_faqs_id_idx" ON "payload_locked_documents_rels" USING btree ("faqs_id");
  CREATE INDEX "payload_locked_documents_rels_testimonials_id_idx" ON "payload_locked_documents_rels" USING btree ("testimonials_id");
  CREATE INDEX "payload_locked_documents_rels_locations_id_idx" ON "payload_locked_documents_rels" USING btree ("locations_id");
  CREATE INDEX "payload_locked_documents_rels_logo_clouds_id_idx" ON "payload_locked_documents_rels" USING btree ("logo_clouds_id");
  CREATE INDEX "payload_locked_documents_rels_global_blocks_id_idx" ON "payload_locked_documents_rels" USING btree ("global_blocks_id");
  CREATE INDEX "payload_locked_documents_rels_block_library_id_idx" ON "payload_locked_documents_rels" USING btree ("block_library_id");
  CREATE INDEX "payload_locked_documents_rels_block_template_builder_id_idx" ON "payload_locked_documents_rels" USING btree ("block_template_builder_id");
  CREATE INDEX "payload_locked_documents_rels_content_types_id_idx" ON "payload_locked_documents_rels" USING btree ("content_types_id");
  CREATE INDEX "payload_locked_documents_rels_custom_items_id_idx" ON "payload_locked_documents_rels" USING btree ("custom_items_id");
  CREATE INDEX "payload_locked_documents_rels_archive_items_id_idx" ON "payload_locked_documents_rels" USING btree ("archive_items_id");
  CREATE INDEX "payload_locked_documents_rels_people_id_idx" ON "payload_locked_documents_rels" USING btree ("people_id");
  CREATE INDEX "payload_locked_documents_rels_places_id_idx" ON "payload_locked_documents_rels" USING btree ("places_id");
  CREATE INDEX "payload_locked_documents_rels_events_id_idx" ON "payload_locked_documents_rels" USING btree ("events_id");`)
}

export async function down({ db, payload, req }: MigrateDownArgs): Promise<void> {
  await db.execute(sql`
   ALTER TABLE "pages_blocks_contact_form" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "pages_blocks_social_links_custom_links" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "pages_blocks_social_links" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "pages_blocks_video_feature" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "pages_blocks_reusable_block" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "_pages_v_blocks_contact_form" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "_pages_v_blocks_social_links_custom_links" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "_pages_v_blocks_social_links" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "_pages_v_blocks_video_feature" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "_pages_v_blocks_reusable_block" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "faqs" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "testimonials" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "locations_faqs" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "locations_nearby_locations" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "locations" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "logo_clouds" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "global_blocks_blocks_hero_links" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "global_blocks_blocks_hero" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "global_blocks_blocks_content_columns" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "global_blocks_blocks_content" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "global_blocks_blocks_media" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "global_blocks_blocks_cta_links" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "global_blocks_blocks_cta" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "global_blocks_blocks_archive" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "global_blocks_blocks_form" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "global_blocks_blocks_quote" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "global_blocks_blocks_features_items" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "global_blocks_blocks_features" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "global_blocks_blocks_stats_items" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "global_blocks_blocks_stats" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "global_blocks_blocks_logo_cloud_items" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "global_blocks_blocks_logo_cloud" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "global_blocks_blocks_testimonials_items" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "global_blocks_blocks_testimonials" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "global_blocks_blocks_faq_items" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "global_blocks_blocks_faq" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "global_blocks_blocks_pricing_plans_features" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "global_blocks_blocks_pricing_plans_links" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "global_blocks_blocks_pricing_plans" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "global_blocks_blocks_pricing" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "global_blocks_blocks_team_items_socials" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "global_blocks_blocks_team_items" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "global_blocks_blocks_team" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "global_blocks_blocks_embed" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "global_blocks_blocks_spacer" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "global_blocks_blocks_html" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "global_blocks_blocks_gallery_images" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "global_blocks_blocks_gallery" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "global_blocks_blocks_grid_items" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "global_blocks_blocks_grid" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "global_blocks_blocks_timeline_events" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "global_blocks_blocks_timeline" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "global_blocks" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "global_blocks_rels" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "block_library" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "block_template_builder_blocks_hero_links" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "block_template_builder_blocks_hero" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "block_template_builder_blocks_content_columns" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "block_template_builder_blocks_content" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "block_template_builder_blocks_media" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "block_template_builder_blocks_cta_links" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "block_template_builder_blocks_cta" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "block_template_builder_blocks_archive" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "block_template_builder_blocks_form" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "block_template_builder_blocks_quote" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "block_template_builder_blocks_features_items" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "block_template_builder_blocks_features" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "block_template_builder_blocks_stats_items" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "block_template_builder_blocks_stats" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "block_template_builder_blocks_logo_cloud_items" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "block_template_builder_blocks_logo_cloud" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "block_template_builder_blocks_testimonials_items" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "block_template_builder_blocks_testimonials" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "block_template_builder_blocks_faq_items" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "block_template_builder_blocks_faq" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "block_template_builder_blocks_pricing_plans_features" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "block_template_builder_blocks_pricing_plans_links" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "block_template_builder_blocks_pricing_plans" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "block_template_builder_blocks_pricing" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "block_template_builder_blocks_team_items_socials" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "block_template_builder_blocks_team_items" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "block_template_builder_blocks_team" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "block_template_builder_blocks_embed" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "block_template_builder_blocks_spacer" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "block_template_builder_blocks_html" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "block_template_builder_blocks_gallery_images" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "block_template_builder_blocks_gallery" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "block_template_builder_blocks_grid_items" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "block_template_builder_blocks_grid" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "block_template_builder_blocks_timeline_events" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "block_template_builder_blocks_timeline" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "block_template_builder" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "block_template_builder_rels" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "content_types_custom_fields" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "content_types" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "custom_items_blocks_hero_links" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "custom_items_blocks_hero" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "custom_items_blocks_content_columns" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "custom_items_blocks_content" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "custom_items_blocks_media" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "custom_items_blocks_cta_links" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "custom_items_blocks_cta" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "custom_items_blocks_quote" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "custom_items_blocks_features_items" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "custom_items_blocks_features" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "custom_items_blocks_stats_items" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "custom_items_blocks_stats" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "custom_items_blocks_logo_cloud_items" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "custom_items_blocks_logo_cloud" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "custom_items_blocks_testimonials_items" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "custom_items_blocks_testimonials" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "custom_items_blocks_faq_items" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "custom_items_blocks_faq" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "custom_items_blocks_pricing_plans_features" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "custom_items_blocks_pricing_plans_links" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "custom_items_blocks_pricing_plans" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "custom_items_blocks_pricing" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "custom_items_blocks_team_items_socials" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "custom_items_blocks_team_items" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "custom_items_blocks_team" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "custom_items_blocks_embed" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "custom_items_blocks_gallery_images" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "custom_items_blocks_gallery" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "custom_items_blocks_grid_items" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "custom_items_blocks_grid" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "custom_items_blocks_timeline_events" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "custom_items_blocks_timeline" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "custom_items_blocks_archive" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "custom_items_blocks_form" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "custom_items_blocks_spacer" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "custom_items_blocks_html" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "custom_items_gallery" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "custom_items" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "custom_items_rels" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "_custom_items_v_blocks_hero_links" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "_custom_items_v_blocks_hero" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "_custom_items_v_blocks_content_columns" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "_custom_items_v_blocks_content" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "_custom_items_v_blocks_media" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "_custom_items_v_blocks_cta_links" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "_custom_items_v_blocks_cta" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "_custom_items_v_blocks_quote" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "_custom_items_v_blocks_features_items" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "_custom_items_v_blocks_features" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "_custom_items_v_blocks_stats_items" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "_custom_items_v_blocks_stats" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "_custom_items_v_blocks_logo_cloud_items" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "_custom_items_v_blocks_logo_cloud" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "_custom_items_v_blocks_testimonials_items" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "_custom_items_v_blocks_testimonials" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "_custom_items_v_blocks_faq_items" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "_custom_items_v_blocks_faq" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "_custom_items_v_blocks_pricing_plans_features" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "_custom_items_v_blocks_pricing_plans_links" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "_custom_items_v_blocks_pricing_plans" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "_custom_items_v_blocks_pricing" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "_custom_items_v_blocks_team_items_socials" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "_custom_items_v_blocks_team_items" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "_custom_items_v_blocks_team" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "_custom_items_v_blocks_embed" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "_custom_items_v_blocks_gallery_images" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "_custom_items_v_blocks_gallery" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "_custom_items_v_blocks_grid_items" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "_custom_items_v_blocks_grid" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "_custom_items_v_blocks_timeline_events" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "_custom_items_v_blocks_timeline" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "_custom_items_v_blocks_archive" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "_custom_items_v_blocks_form" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "_custom_items_v_blocks_spacer" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "_custom_items_v_blocks_html" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "_custom_items_v_version_gallery" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "_custom_items_v" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "_custom_items_v_rels" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "archive_items_gallery" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "archive_items_blocks_hero_links" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "archive_items_blocks_hero" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "archive_items_blocks_content_columns" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "archive_items_blocks_content" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "archive_items_blocks_media" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "archive_items_blocks_cta_links" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "archive_items_blocks_cta" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "archive_items_blocks_archive" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "archive_items_blocks_form" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "archive_items_blocks_gallery_images" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "archive_items_blocks_gallery" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "archive_items_blocks_grid_items" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "archive_items_blocks_grid" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "archive_items_blocks_timeline_events" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "archive_items_blocks_timeline" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "archive_items" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "archive_items_rels" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "_archive_items_v_version_gallery" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "_archive_items_v_blocks_hero_links" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "_archive_items_v_blocks_hero" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "_archive_items_v_blocks_content_columns" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "_archive_items_v_blocks_content" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "_archive_items_v_blocks_media" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "_archive_items_v_blocks_cta_links" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "_archive_items_v_blocks_cta" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "_archive_items_v_blocks_archive" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "_archive_items_v_blocks_form" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "_archive_items_v_blocks_gallery_images" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "_archive_items_v_blocks_gallery" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "_archive_items_v_blocks_grid_items" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "_archive_items_v_blocks_grid" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "_archive_items_v_blocks_timeline_events" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "_archive_items_v_blocks_timeline" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "_archive_items_v" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "_archive_items_v_rels" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "people_role" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "people_movements" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "people_social_links" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "people_blocks_hero_links" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "people_blocks_hero" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "people_blocks_content_columns" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "people_blocks_content" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "people_blocks_media" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "people_blocks_cta_links" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "people_blocks_cta" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "people_blocks_quote" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "people_blocks_features_items" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "people_blocks_features" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "people_blocks_stats_items" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "people_blocks_stats" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "people_blocks_logo_cloud_items" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "people_blocks_logo_cloud" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "people_blocks_testimonials_items" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "people_blocks_testimonials" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "people_blocks_faq_items" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "people_blocks_faq" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "people_blocks_pricing_plans_features" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "people_blocks_pricing_plans_links" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "people_blocks_pricing_plans" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "people_blocks_pricing" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "people_blocks_team_items_socials" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "people_blocks_team_items" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "people_blocks_team" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "people_blocks_embed" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "people_blocks_archive" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "people_blocks_form" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "people_blocks_gallery_images" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "people_blocks_gallery" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "people_blocks_grid_items" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "people_blocks_grid" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "people_blocks_timeline_events" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "people_blocks_timeline" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "people_blocks_spacer" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "people_blocks_html" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "people" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "people_rels" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "_people_v_version_role" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "_people_v_version_movements" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "_people_v_version_social_links" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "_people_v_blocks_hero_links" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "_people_v_blocks_hero" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "_people_v_blocks_content_columns" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "_people_v_blocks_content" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "_people_v_blocks_media" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "_people_v_blocks_cta_links" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "_people_v_blocks_cta" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "_people_v_blocks_quote" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "_people_v_blocks_features_items" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "_people_v_blocks_features" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "_people_v_blocks_stats_items" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "_people_v_blocks_stats" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "_people_v_blocks_logo_cloud_items" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "_people_v_blocks_logo_cloud" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "_people_v_blocks_testimonials_items" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "_people_v_blocks_testimonials" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "_people_v_blocks_faq_items" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "_people_v_blocks_faq" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "_people_v_blocks_pricing_plans_features" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "_people_v_blocks_pricing_plans_links" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "_people_v_blocks_pricing_plans" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "_people_v_blocks_pricing" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "_people_v_blocks_team_items_socials" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "_people_v_blocks_team_items" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "_people_v_blocks_team" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "_people_v_blocks_embed" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "_people_v_blocks_archive" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "_people_v_blocks_form" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "_people_v_blocks_gallery_images" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "_people_v_blocks_gallery" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "_people_v_blocks_grid_items" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "_people_v_blocks_grid" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "_people_v_blocks_timeline_events" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "_people_v_blocks_timeline" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "_people_v_blocks_spacer" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "_people_v_blocks_html" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "_people_v" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "_people_v_rels" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "places_historical_names" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "places_hours" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "places_gallery" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "places_blocks_hero_links" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "places_blocks_hero" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "places_blocks_content_columns" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "places_blocks_content" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "places_blocks_media" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "places_blocks_cta_links" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "places_blocks_cta" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "places_blocks_quote" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "places_blocks_features_items" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "places_blocks_features" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "places_blocks_stats_items" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "places_blocks_stats" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "places_blocks_logo_cloud_items" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "places_blocks_logo_cloud" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "places_blocks_testimonials_items" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "places_blocks_testimonials" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "places_blocks_faq_items" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "places_blocks_faq" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "places_blocks_pricing_plans_features" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "places_blocks_pricing_plans_links" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "places_blocks_pricing_plans" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "places_blocks_pricing" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "places_blocks_team_items_socials" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "places_blocks_team_items" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "places_blocks_team" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "places_blocks_embed" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "places_blocks_archive" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "places_blocks_form" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "places_blocks_gallery_images" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "places_blocks_gallery" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "places_blocks_grid_items" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "places_blocks_grid" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "places_blocks_timeline_events" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "places_blocks_timeline" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "places_blocks_spacer" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "places_blocks_html" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "places" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "places_rels" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "_places_v_version_historical_names" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "_places_v_version_hours" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "_places_v_version_gallery" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "_places_v_blocks_hero_links" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "_places_v_blocks_hero" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "_places_v_blocks_content_columns" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "_places_v_blocks_content" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "_places_v_blocks_media" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "_places_v_blocks_cta_links" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "_places_v_blocks_cta" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "_places_v_blocks_quote" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "_places_v_blocks_features_items" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "_places_v_blocks_features" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "_places_v_blocks_stats_items" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "_places_v_blocks_stats" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "_places_v_blocks_logo_cloud_items" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "_places_v_blocks_logo_cloud" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "_places_v_blocks_testimonials_items" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "_places_v_blocks_testimonials" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "_places_v_blocks_faq_items" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "_places_v_blocks_faq" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "_places_v_blocks_pricing_plans_features" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "_places_v_blocks_pricing_plans_links" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "_places_v_blocks_pricing_plans" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "_places_v_blocks_pricing" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "_places_v_blocks_team_items_socials" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "_places_v_blocks_team_items" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "_places_v_blocks_team" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "_places_v_blocks_embed" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "_places_v_blocks_archive" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "_places_v_blocks_form" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "_places_v_blocks_gallery_images" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "_places_v_blocks_gallery" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "_places_v_blocks_grid_items" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "_places_v_blocks_grid" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "_places_v_blocks_timeline_events" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "_places_v_blocks_timeline" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "_places_v_blocks_spacer" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "_places_v_blocks_html" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "_places_v" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "_places_v_rels" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "events_blocks_hero_links" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "events_blocks_hero" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "events_blocks_content_columns" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "events_blocks_content" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "events_blocks_media" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "events_blocks_cta_links" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "events_blocks_cta" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "events_blocks_archive" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "events_blocks_form" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "events_blocks_gallery_images" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "events_blocks_gallery" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "events_blocks_grid_items" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "events_blocks_grid" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "events_blocks_timeline_events" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "events_blocks_timeline" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "events" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "events_rels" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "_events_v_blocks_hero_links" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "_events_v_blocks_hero" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "_events_v_blocks_content_columns" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "_events_v_blocks_content" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "_events_v_blocks_media" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "_events_v_blocks_cta_links" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "_events_v_blocks_cta" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "_events_v_blocks_archive" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "_events_v_blocks_form" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "_events_v_blocks_gallery_images" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "_events_v_blocks_gallery" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "_events_v_blocks_grid_items" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "_events_v_blocks_grid" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "_events_v_blocks_timeline_events" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "_events_v_blocks_timeline" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "_events_v" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "_events_v_rels" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "header_top_bar_links" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "page_templates_blocks_logo_cloud_items" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "page_templates_blocks_logo_cloud" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "page_templates_blocks_video_feature" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "page_templates_blocks_testimonials_items" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "page_templates_blocks_testimonials" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "page_templates_blocks_content_columns" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "page_templates_blocks_content" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "page_templates_blocks_faq_items" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "page_templates_blocks_faq" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "page_templates_blocks_cta_links" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "page_templates_blocks_cta" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "page_templates" DISABLE ROW LEVEL SECURITY;
  DROP TABLE "pages_blocks_contact_form" CASCADE;
  DROP TABLE "pages_blocks_social_links_custom_links" CASCADE;
  DROP TABLE "pages_blocks_social_links" CASCADE;
  DROP TABLE "pages_blocks_video_feature" CASCADE;
  DROP TABLE "pages_blocks_reusable_block" CASCADE;
  DROP TABLE "_pages_v_blocks_contact_form" CASCADE;
  DROP TABLE "_pages_v_blocks_social_links_custom_links" CASCADE;
  DROP TABLE "_pages_v_blocks_social_links" CASCADE;
  DROP TABLE "_pages_v_blocks_video_feature" CASCADE;
  DROP TABLE "_pages_v_blocks_reusable_block" CASCADE;
  DROP TABLE "faqs" CASCADE;
  DROP TABLE "testimonials" CASCADE;
  DROP TABLE "locations_faqs" CASCADE;
  DROP TABLE "locations_nearby_locations" CASCADE;
  DROP TABLE "locations" CASCADE;
  DROP TABLE "logo_clouds" CASCADE;
  DROP TABLE "global_blocks_blocks_hero_links" CASCADE;
  DROP TABLE "global_blocks_blocks_hero" CASCADE;
  DROP TABLE "global_blocks_blocks_content_columns" CASCADE;
  DROP TABLE "global_blocks_blocks_content" CASCADE;
  DROP TABLE "global_blocks_blocks_media" CASCADE;
  DROP TABLE "global_blocks_blocks_cta_links" CASCADE;
  DROP TABLE "global_blocks_blocks_cta" CASCADE;
  DROP TABLE "global_blocks_blocks_archive" CASCADE;
  DROP TABLE "global_blocks_blocks_form" CASCADE;
  DROP TABLE "global_blocks_blocks_quote" CASCADE;
  DROP TABLE "global_blocks_blocks_features_items" CASCADE;
  DROP TABLE "global_blocks_blocks_features" CASCADE;
  DROP TABLE "global_blocks_blocks_stats_items" CASCADE;
  DROP TABLE "global_blocks_blocks_stats" CASCADE;
  DROP TABLE "global_blocks_blocks_logo_cloud_items" CASCADE;
  DROP TABLE "global_blocks_blocks_logo_cloud" CASCADE;
  DROP TABLE "global_blocks_blocks_testimonials_items" CASCADE;
  DROP TABLE "global_blocks_blocks_testimonials" CASCADE;
  DROP TABLE "global_blocks_blocks_faq_items" CASCADE;
  DROP TABLE "global_blocks_blocks_faq" CASCADE;
  DROP TABLE "global_blocks_blocks_pricing_plans_features" CASCADE;
  DROP TABLE "global_blocks_blocks_pricing_plans_links" CASCADE;
  DROP TABLE "global_blocks_blocks_pricing_plans" CASCADE;
  DROP TABLE "global_blocks_blocks_pricing" CASCADE;
  DROP TABLE "global_blocks_blocks_team_items_socials" CASCADE;
  DROP TABLE "global_blocks_blocks_team_items" CASCADE;
  DROP TABLE "global_blocks_blocks_team" CASCADE;
  DROP TABLE "global_blocks_blocks_embed" CASCADE;
  DROP TABLE "global_blocks_blocks_spacer" CASCADE;
  DROP TABLE "global_blocks_blocks_html" CASCADE;
  DROP TABLE "global_blocks_blocks_gallery_images" CASCADE;
  DROP TABLE "global_blocks_blocks_gallery" CASCADE;
  DROP TABLE "global_blocks_blocks_grid_items" CASCADE;
  DROP TABLE "global_blocks_blocks_grid" CASCADE;
  DROP TABLE "global_blocks_blocks_timeline_events" CASCADE;
  DROP TABLE "global_blocks_blocks_timeline" CASCADE;
  DROP TABLE "global_blocks" CASCADE;
  DROP TABLE "global_blocks_rels" CASCADE;
  DROP TABLE "block_library" CASCADE;
  DROP TABLE "block_template_builder_blocks_hero_links" CASCADE;
  DROP TABLE "block_template_builder_blocks_hero" CASCADE;
  DROP TABLE "block_template_builder_blocks_content_columns" CASCADE;
  DROP TABLE "block_template_builder_blocks_content" CASCADE;
  DROP TABLE "block_template_builder_blocks_media" CASCADE;
  DROP TABLE "block_template_builder_blocks_cta_links" CASCADE;
  DROP TABLE "block_template_builder_blocks_cta" CASCADE;
  DROP TABLE "block_template_builder_blocks_archive" CASCADE;
  DROP TABLE "block_template_builder_blocks_form" CASCADE;
  DROP TABLE "block_template_builder_blocks_quote" CASCADE;
  DROP TABLE "block_template_builder_blocks_features_items" CASCADE;
  DROP TABLE "block_template_builder_blocks_features" CASCADE;
  DROP TABLE "block_template_builder_blocks_stats_items" CASCADE;
  DROP TABLE "block_template_builder_blocks_stats" CASCADE;
  DROP TABLE "block_template_builder_blocks_logo_cloud_items" CASCADE;
  DROP TABLE "block_template_builder_blocks_logo_cloud" CASCADE;
  DROP TABLE "block_template_builder_blocks_testimonials_items" CASCADE;
  DROP TABLE "block_template_builder_blocks_testimonials" CASCADE;
  DROP TABLE "block_template_builder_blocks_faq_items" CASCADE;
  DROP TABLE "block_template_builder_blocks_faq" CASCADE;
  DROP TABLE "block_template_builder_blocks_pricing_plans_features" CASCADE;
  DROP TABLE "block_template_builder_blocks_pricing_plans_links" CASCADE;
  DROP TABLE "block_template_builder_blocks_pricing_plans" CASCADE;
  DROP TABLE "block_template_builder_blocks_pricing" CASCADE;
  DROP TABLE "block_template_builder_blocks_team_items_socials" CASCADE;
  DROP TABLE "block_template_builder_blocks_team_items" CASCADE;
  DROP TABLE "block_template_builder_blocks_team" CASCADE;
  DROP TABLE "block_template_builder_blocks_embed" CASCADE;
  DROP TABLE "block_template_builder_blocks_spacer" CASCADE;
  DROP TABLE "block_template_builder_blocks_html" CASCADE;
  DROP TABLE "block_template_builder_blocks_gallery_images" CASCADE;
  DROP TABLE "block_template_builder_blocks_gallery" CASCADE;
  DROP TABLE "block_template_builder_blocks_grid_items" CASCADE;
  DROP TABLE "block_template_builder_blocks_grid" CASCADE;
  DROP TABLE "block_template_builder_blocks_timeline_events" CASCADE;
  DROP TABLE "block_template_builder_blocks_timeline" CASCADE;
  DROP TABLE "block_template_builder" CASCADE;
  DROP TABLE "block_template_builder_rels" CASCADE;
  DROP TABLE "content_types_custom_fields" CASCADE;
  DROP TABLE "content_types" CASCADE;
  DROP TABLE "custom_items_blocks_hero_links" CASCADE;
  DROP TABLE "custom_items_blocks_hero" CASCADE;
  DROP TABLE "custom_items_blocks_content_columns" CASCADE;
  DROP TABLE "custom_items_blocks_content" CASCADE;
  DROP TABLE "custom_items_blocks_media" CASCADE;
  DROP TABLE "custom_items_blocks_cta_links" CASCADE;
  DROP TABLE "custom_items_blocks_cta" CASCADE;
  DROP TABLE "custom_items_blocks_quote" CASCADE;
  DROP TABLE "custom_items_blocks_features_items" CASCADE;
  DROP TABLE "custom_items_blocks_features" CASCADE;
  DROP TABLE "custom_items_blocks_stats_items" CASCADE;
  DROP TABLE "custom_items_blocks_stats" CASCADE;
  DROP TABLE "custom_items_blocks_logo_cloud_items" CASCADE;
  DROP TABLE "custom_items_blocks_logo_cloud" CASCADE;
  DROP TABLE "custom_items_blocks_testimonials_items" CASCADE;
  DROP TABLE "custom_items_blocks_testimonials" CASCADE;
  DROP TABLE "custom_items_blocks_faq_items" CASCADE;
  DROP TABLE "custom_items_blocks_faq" CASCADE;
  DROP TABLE "custom_items_blocks_pricing_plans_features" CASCADE;
  DROP TABLE "custom_items_blocks_pricing_plans_links" CASCADE;
  DROP TABLE "custom_items_blocks_pricing_plans" CASCADE;
  DROP TABLE "custom_items_blocks_pricing" CASCADE;
  DROP TABLE "custom_items_blocks_team_items_socials" CASCADE;
  DROP TABLE "custom_items_blocks_team_items" CASCADE;
  DROP TABLE "custom_items_blocks_team" CASCADE;
  DROP TABLE "custom_items_blocks_embed" CASCADE;
  DROP TABLE "custom_items_blocks_gallery_images" CASCADE;
  DROP TABLE "custom_items_blocks_gallery" CASCADE;
  DROP TABLE "custom_items_blocks_grid_items" CASCADE;
  DROP TABLE "custom_items_blocks_grid" CASCADE;
  DROP TABLE "custom_items_blocks_timeline_events" CASCADE;
  DROP TABLE "custom_items_blocks_timeline" CASCADE;
  DROP TABLE "custom_items_blocks_archive" CASCADE;
  DROP TABLE "custom_items_blocks_form" CASCADE;
  DROP TABLE "custom_items_blocks_spacer" CASCADE;
  DROP TABLE "custom_items_blocks_html" CASCADE;
  DROP TABLE "custom_items_gallery" CASCADE;
  DROP TABLE "custom_items" CASCADE;
  DROP TABLE "custom_items_rels" CASCADE;
  DROP TABLE "_custom_items_v_blocks_hero_links" CASCADE;
  DROP TABLE "_custom_items_v_blocks_hero" CASCADE;
  DROP TABLE "_custom_items_v_blocks_content_columns" CASCADE;
  DROP TABLE "_custom_items_v_blocks_content" CASCADE;
  DROP TABLE "_custom_items_v_blocks_media" CASCADE;
  DROP TABLE "_custom_items_v_blocks_cta_links" CASCADE;
  DROP TABLE "_custom_items_v_blocks_cta" CASCADE;
  DROP TABLE "_custom_items_v_blocks_quote" CASCADE;
  DROP TABLE "_custom_items_v_blocks_features_items" CASCADE;
  DROP TABLE "_custom_items_v_blocks_features" CASCADE;
  DROP TABLE "_custom_items_v_blocks_stats_items" CASCADE;
  DROP TABLE "_custom_items_v_blocks_stats" CASCADE;
  DROP TABLE "_custom_items_v_blocks_logo_cloud_items" CASCADE;
  DROP TABLE "_custom_items_v_blocks_logo_cloud" CASCADE;
  DROP TABLE "_custom_items_v_blocks_testimonials_items" CASCADE;
  DROP TABLE "_custom_items_v_blocks_testimonials" CASCADE;
  DROP TABLE "_custom_items_v_blocks_faq_items" CASCADE;
  DROP TABLE "_custom_items_v_blocks_faq" CASCADE;
  DROP TABLE "_custom_items_v_blocks_pricing_plans_features" CASCADE;
  DROP TABLE "_custom_items_v_blocks_pricing_plans_links" CASCADE;
  DROP TABLE "_custom_items_v_blocks_pricing_plans" CASCADE;
  DROP TABLE "_custom_items_v_blocks_pricing" CASCADE;
  DROP TABLE "_custom_items_v_blocks_team_items_socials" CASCADE;
  DROP TABLE "_custom_items_v_blocks_team_items" CASCADE;
  DROP TABLE "_custom_items_v_blocks_team" CASCADE;
  DROP TABLE "_custom_items_v_blocks_embed" CASCADE;
  DROP TABLE "_custom_items_v_blocks_gallery_images" CASCADE;
  DROP TABLE "_custom_items_v_blocks_gallery" CASCADE;
  DROP TABLE "_custom_items_v_blocks_grid_items" CASCADE;
  DROP TABLE "_custom_items_v_blocks_grid" CASCADE;
  DROP TABLE "_custom_items_v_blocks_timeline_events" CASCADE;
  DROP TABLE "_custom_items_v_blocks_timeline" CASCADE;
  DROP TABLE "_custom_items_v_blocks_archive" CASCADE;
  DROP TABLE "_custom_items_v_blocks_form" CASCADE;
  DROP TABLE "_custom_items_v_blocks_spacer" CASCADE;
  DROP TABLE "_custom_items_v_blocks_html" CASCADE;
  DROP TABLE "_custom_items_v_version_gallery" CASCADE;
  DROP TABLE "_custom_items_v" CASCADE;
  DROP TABLE "_custom_items_v_rels" CASCADE;
  DROP TABLE "archive_items_gallery" CASCADE;
  DROP TABLE "archive_items_blocks_hero_links" CASCADE;
  DROP TABLE "archive_items_blocks_hero" CASCADE;
  DROP TABLE "archive_items_blocks_content_columns" CASCADE;
  DROP TABLE "archive_items_blocks_content" CASCADE;
  DROP TABLE "archive_items_blocks_media" CASCADE;
  DROP TABLE "archive_items_blocks_cta_links" CASCADE;
  DROP TABLE "archive_items_blocks_cta" CASCADE;
  DROP TABLE "archive_items_blocks_archive" CASCADE;
  DROP TABLE "archive_items_blocks_form" CASCADE;
  DROP TABLE "archive_items_blocks_gallery_images" CASCADE;
  DROP TABLE "archive_items_blocks_gallery" CASCADE;
  DROP TABLE "archive_items_blocks_grid_items" CASCADE;
  DROP TABLE "archive_items_blocks_grid" CASCADE;
  DROP TABLE "archive_items_blocks_timeline_events" CASCADE;
  DROP TABLE "archive_items_blocks_timeline" CASCADE;
  DROP TABLE "archive_items" CASCADE;
  DROP TABLE "archive_items_rels" CASCADE;
  DROP TABLE "_archive_items_v_version_gallery" CASCADE;
  DROP TABLE "_archive_items_v_blocks_hero_links" CASCADE;
  DROP TABLE "_archive_items_v_blocks_hero" CASCADE;
  DROP TABLE "_archive_items_v_blocks_content_columns" CASCADE;
  DROP TABLE "_archive_items_v_blocks_content" CASCADE;
  DROP TABLE "_archive_items_v_blocks_media" CASCADE;
  DROP TABLE "_archive_items_v_blocks_cta_links" CASCADE;
  DROP TABLE "_archive_items_v_blocks_cta" CASCADE;
  DROP TABLE "_archive_items_v_blocks_archive" CASCADE;
  DROP TABLE "_archive_items_v_blocks_form" CASCADE;
  DROP TABLE "_archive_items_v_blocks_gallery_images" CASCADE;
  DROP TABLE "_archive_items_v_blocks_gallery" CASCADE;
  DROP TABLE "_archive_items_v_blocks_grid_items" CASCADE;
  DROP TABLE "_archive_items_v_blocks_grid" CASCADE;
  DROP TABLE "_archive_items_v_blocks_timeline_events" CASCADE;
  DROP TABLE "_archive_items_v_blocks_timeline" CASCADE;
  DROP TABLE "_archive_items_v" CASCADE;
  DROP TABLE "_archive_items_v_rels" CASCADE;
  DROP TABLE "people_role" CASCADE;
  DROP TABLE "people_movements" CASCADE;
  DROP TABLE "people_social_links" CASCADE;
  DROP TABLE "people_blocks_hero_links" CASCADE;
  DROP TABLE "people_blocks_hero" CASCADE;
  DROP TABLE "people_blocks_content_columns" CASCADE;
  DROP TABLE "people_blocks_content" CASCADE;
  DROP TABLE "people_blocks_media" CASCADE;
  DROP TABLE "people_blocks_cta_links" CASCADE;
  DROP TABLE "people_blocks_cta" CASCADE;
  DROP TABLE "people_blocks_quote" CASCADE;
  DROP TABLE "people_blocks_features_items" CASCADE;
  DROP TABLE "people_blocks_features" CASCADE;
  DROP TABLE "people_blocks_stats_items" CASCADE;
  DROP TABLE "people_blocks_stats" CASCADE;
  DROP TABLE "people_blocks_logo_cloud_items" CASCADE;
  DROP TABLE "people_blocks_logo_cloud" CASCADE;
  DROP TABLE "people_blocks_testimonials_items" CASCADE;
  DROP TABLE "people_blocks_testimonials" CASCADE;
  DROP TABLE "people_blocks_faq_items" CASCADE;
  DROP TABLE "people_blocks_faq" CASCADE;
  DROP TABLE "people_blocks_pricing_plans_features" CASCADE;
  DROP TABLE "people_blocks_pricing_plans_links" CASCADE;
  DROP TABLE "people_blocks_pricing_plans" CASCADE;
  DROP TABLE "people_blocks_pricing" CASCADE;
  DROP TABLE "people_blocks_team_items_socials" CASCADE;
  DROP TABLE "people_blocks_team_items" CASCADE;
  DROP TABLE "people_blocks_team" CASCADE;
  DROP TABLE "people_blocks_embed" CASCADE;
  DROP TABLE "people_blocks_archive" CASCADE;
  DROP TABLE "people_blocks_form" CASCADE;
  DROP TABLE "people_blocks_gallery_images" CASCADE;
  DROP TABLE "people_blocks_gallery" CASCADE;
  DROP TABLE "people_blocks_grid_items" CASCADE;
  DROP TABLE "people_blocks_grid" CASCADE;
  DROP TABLE "people_blocks_timeline_events" CASCADE;
  DROP TABLE "people_blocks_timeline" CASCADE;
  DROP TABLE "people_blocks_spacer" CASCADE;
  DROP TABLE "people_blocks_html" CASCADE;
  DROP TABLE "people" CASCADE;
  DROP TABLE "people_rels" CASCADE;
  DROP TABLE "_people_v_version_role" CASCADE;
  DROP TABLE "_people_v_version_movements" CASCADE;
  DROP TABLE "_people_v_version_social_links" CASCADE;
  DROP TABLE "_people_v_blocks_hero_links" CASCADE;
  DROP TABLE "_people_v_blocks_hero" CASCADE;
  DROP TABLE "_people_v_blocks_content_columns" CASCADE;
  DROP TABLE "_people_v_blocks_content" CASCADE;
  DROP TABLE "_people_v_blocks_media" CASCADE;
  DROP TABLE "_people_v_blocks_cta_links" CASCADE;
  DROP TABLE "_people_v_blocks_cta" CASCADE;
  DROP TABLE "_people_v_blocks_quote" CASCADE;
  DROP TABLE "_people_v_blocks_features_items" CASCADE;
  DROP TABLE "_people_v_blocks_features" CASCADE;
  DROP TABLE "_people_v_blocks_stats_items" CASCADE;
  DROP TABLE "_people_v_blocks_stats" CASCADE;
  DROP TABLE "_people_v_blocks_logo_cloud_items" CASCADE;
  DROP TABLE "_people_v_blocks_logo_cloud" CASCADE;
  DROP TABLE "_people_v_blocks_testimonials_items" CASCADE;
  DROP TABLE "_people_v_blocks_testimonials" CASCADE;
  DROP TABLE "_people_v_blocks_faq_items" CASCADE;
  DROP TABLE "_people_v_blocks_faq" CASCADE;
  DROP TABLE "_people_v_blocks_pricing_plans_features" CASCADE;
  DROP TABLE "_people_v_blocks_pricing_plans_links" CASCADE;
  DROP TABLE "_people_v_blocks_pricing_plans" CASCADE;
  DROP TABLE "_people_v_blocks_pricing" CASCADE;
  DROP TABLE "_people_v_blocks_team_items_socials" CASCADE;
  DROP TABLE "_people_v_blocks_team_items" CASCADE;
  DROP TABLE "_people_v_blocks_team" CASCADE;
  DROP TABLE "_people_v_blocks_embed" CASCADE;
  DROP TABLE "_people_v_blocks_archive" CASCADE;
  DROP TABLE "_people_v_blocks_form" CASCADE;
  DROP TABLE "_people_v_blocks_gallery_images" CASCADE;
  DROP TABLE "_people_v_blocks_gallery" CASCADE;
  DROP TABLE "_people_v_blocks_grid_items" CASCADE;
  DROP TABLE "_people_v_blocks_grid" CASCADE;
  DROP TABLE "_people_v_blocks_timeline_events" CASCADE;
  DROP TABLE "_people_v_blocks_timeline" CASCADE;
  DROP TABLE "_people_v_blocks_spacer" CASCADE;
  DROP TABLE "_people_v_blocks_html" CASCADE;
  DROP TABLE "_people_v" CASCADE;
  DROP TABLE "_people_v_rels" CASCADE;
  DROP TABLE "places_historical_names" CASCADE;
  DROP TABLE "places_hours" CASCADE;
  DROP TABLE "places_gallery" CASCADE;
  DROP TABLE "places_blocks_hero_links" CASCADE;
  DROP TABLE "places_blocks_hero" CASCADE;
  DROP TABLE "places_blocks_content_columns" CASCADE;
  DROP TABLE "places_blocks_content" CASCADE;
  DROP TABLE "places_blocks_media" CASCADE;
  DROP TABLE "places_blocks_cta_links" CASCADE;
  DROP TABLE "places_blocks_cta" CASCADE;
  DROP TABLE "places_blocks_quote" CASCADE;
  DROP TABLE "places_blocks_features_items" CASCADE;
  DROP TABLE "places_blocks_features" CASCADE;
  DROP TABLE "places_blocks_stats_items" CASCADE;
  DROP TABLE "places_blocks_stats" CASCADE;
  DROP TABLE "places_blocks_logo_cloud_items" CASCADE;
  DROP TABLE "places_blocks_logo_cloud" CASCADE;
  DROP TABLE "places_blocks_testimonials_items" CASCADE;
  DROP TABLE "places_blocks_testimonials" CASCADE;
  DROP TABLE "places_blocks_faq_items" CASCADE;
  DROP TABLE "places_blocks_faq" CASCADE;
  DROP TABLE "places_blocks_pricing_plans_features" CASCADE;
  DROP TABLE "places_blocks_pricing_plans_links" CASCADE;
  DROP TABLE "places_blocks_pricing_plans" CASCADE;
  DROP TABLE "places_blocks_pricing" CASCADE;
  DROP TABLE "places_blocks_team_items_socials" CASCADE;
  DROP TABLE "places_blocks_team_items" CASCADE;
  DROP TABLE "places_blocks_team" CASCADE;
  DROP TABLE "places_blocks_embed" CASCADE;
  DROP TABLE "places_blocks_archive" CASCADE;
  DROP TABLE "places_blocks_form" CASCADE;
  DROP TABLE "places_blocks_gallery_images" CASCADE;
  DROP TABLE "places_blocks_gallery" CASCADE;
  DROP TABLE "places_blocks_grid_items" CASCADE;
  DROP TABLE "places_blocks_grid" CASCADE;
  DROP TABLE "places_blocks_timeline_events" CASCADE;
  DROP TABLE "places_blocks_timeline" CASCADE;
  DROP TABLE "places_blocks_spacer" CASCADE;
  DROP TABLE "places_blocks_html" CASCADE;
  DROP TABLE "places" CASCADE;
  DROP TABLE "places_rels" CASCADE;
  DROP TABLE "_places_v_version_historical_names" CASCADE;
  DROP TABLE "_places_v_version_hours" CASCADE;
  DROP TABLE "_places_v_version_gallery" CASCADE;
  DROP TABLE "_places_v_blocks_hero_links" CASCADE;
  DROP TABLE "_places_v_blocks_hero" CASCADE;
  DROP TABLE "_places_v_blocks_content_columns" CASCADE;
  DROP TABLE "_places_v_blocks_content" CASCADE;
  DROP TABLE "_places_v_blocks_media" CASCADE;
  DROP TABLE "_places_v_blocks_cta_links" CASCADE;
  DROP TABLE "_places_v_blocks_cta" CASCADE;
  DROP TABLE "_places_v_blocks_quote" CASCADE;
  DROP TABLE "_places_v_blocks_features_items" CASCADE;
  DROP TABLE "_places_v_blocks_features" CASCADE;
  DROP TABLE "_places_v_blocks_stats_items" CASCADE;
  DROP TABLE "_places_v_blocks_stats" CASCADE;
  DROP TABLE "_places_v_blocks_logo_cloud_items" CASCADE;
  DROP TABLE "_places_v_blocks_logo_cloud" CASCADE;
  DROP TABLE "_places_v_blocks_testimonials_items" CASCADE;
  DROP TABLE "_places_v_blocks_testimonials" CASCADE;
  DROP TABLE "_places_v_blocks_faq_items" CASCADE;
  DROP TABLE "_places_v_blocks_faq" CASCADE;
  DROP TABLE "_places_v_blocks_pricing_plans_features" CASCADE;
  DROP TABLE "_places_v_blocks_pricing_plans_links" CASCADE;
  DROP TABLE "_places_v_blocks_pricing_plans" CASCADE;
  DROP TABLE "_places_v_blocks_pricing" CASCADE;
  DROP TABLE "_places_v_blocks_team_items_socials" CASCADE;
  DROP TABLE "_places_v_blocks_team_items" CASCADE;
  DROP TABLE "_places_v_blocks_team" CASCADE;
  DROP TABLE "_places_v_blocks_embed" CASCADE;
  DROP TABLE "_places_v_blocks_archive" CASCADE;
  DROP TABLE "_places_v_blocks_form" CASCADE;
  DROP TABLE "_places_v_blocks_gallery_images" CASCADE;
  DROP TABLE "_places_v_blocks_gallery" CASCADE;
  DROP TABLE "_places_v_blocks_grid_items" CASCADE;
  DROP TABLE "_places_v_blocks_grid" CASCADE;
  DROP TABLE "_places_v_blocks_timeline_events" CASCADE;
  DROP TABLE "_places_v_blocks_timeline" CASCADE;
  DROP TABLE "_places_v_blocks_spacer" CASCADE;
  DROP TABLE "_places_v_blocks_html" CASCADE;
  DROP TABLE "_places_v" CASCADE;
  DROP TABLE "_places_v_rels" CASCADE;
  DROP TABLE "events_blocks_hero_links" CASCADE;
  DROP TABLE "events_blocks_hero" CASCADE;
  DROP TABLE "events_blocks_content_columns" CASCADE;
  DROP TABLE "events_blocks_content" CASCADE;
  DROP TABLE "events_blocks_media" CASCADE;
  DROP TABLE "events_blocks_cta_links" CASCADE;
  DROP TABLE "events_blocks_cta" CASCADE;
  DROP TABLE "events_blocks_archive" CASCADE;
  DROP TABLE "events_blocks_form" CASCADE;
  DROP TABLE "events_blocks_gallery_images" CASCADE;
  DROP TABLE "events_blocks_gallery" CASCADE;
  DROP TABLE "events_blocks_grid_items" CASCADE;
  DROP TABLE "events_blocks_grid" CASCADE;
  DROP TABLE "events_blocks_timeline_events" CASCADE;
  DROP TABLE "events_blocks_timeline" CASCADE;
  DROP TABLE "events" CASCADE;
  DROP TABLE "events_rels" CASCADE;
  DROP TABLE "_events_v_blocks_hero_links" CASCADE;
  DROP TABLE "_events_v_blocks_hero" CASCADE;
  DROP TABLE "_events_v_blocks_content_columns" CASCADE;
  DROP TABLE "_events_v_blocks_content" CASCADE;
  DROP TABLE "_events_v_blocks_media" CASCADE;
  DROP TABLE "_events_v_blocks_cta_links" CASCADE;
  DROP TABLE "_events_v_blocks_cta" CASCADE;
  DROP TABLE "_events_v_blocks_archive" CASCADE;
  DROP TABLE "_events_v_blocks_form" CASCADE;
  DROP TABLE "_events_v_blocks_gallery_images" CASCADE;
  DROP TABLE "_events_v_blocks_gallery" CASCADE;
  DROP TABLE "_events_v_blocks_grid_items" CASCADE;
  DROP TABLE "_events_v_blocks_grid" CASCADE;
  DROP TABLE "_events_v_blocks_timeline_events" CASCADE;
  DROP TABLE "_events_v_blocks_timeline" CASCADE;
  DROP TABLE "_events_v" CASCADE;
  DROP TABLE "_events_v_rels" CASCADE;
  DROP TABLE "header_top_bar_links" CASCADE;
  DROP TABLE "page_templates_blocks_logo_cloud_items" CASCADE;
  DROP TABLE "page_templates_blocks_logo_cloud" CASCADE;
  DROP TABLE "page_templates_blocks_video_feature" CASCADE;
  DROP TABLE "page_templates_blocks_testimonials_items" CASCADE;
  DROP TABLE "page_templates_blocks_testimonials" CASCADE;
  DROP TABLE "page_templates_blocks_content_columns" CASCADE;
  DROP TABLE "page_templates_blocks_content" CASCADE;
  DROP TABLE "page_templates_blocks_faq_items" CASCADE;
  DROP TABLE "page_templates_blocks_faq" CASCADE;
  DROP TABLE "page_templates_blocks_cta_links" CASCADE;
  DROP TABLE "page_templates_blocks_cta" CASCADE;
  DROP TABLE "page_templates" CASCADE;
  ALTER TABLE "payload_locked_documents_rels" DROP CONSTRAINT "payload_locked_documents_rels_faqs_fk";
  
  ALTER TABLE "payload_locked_documents_rels" DROP CONSTRAINT "payload_locked_documents_rels_testimonials_fk";
  
  ALTER TABLE "payload_locked_documents_rels" DROP CONSTRAINT "payload_locked_documents_rels_locations_fk";
  
  ALTER TABLE "payload_locked_documents_rels" DROP CONSTRAINT "payload_locked_documents_rels_logo_clouds_fk";
  
  ALTER TABLE "payload_locked_documents_rels" DROP CONSTRAINT "payload_locked_documents_rels_global_blocks_fk";
  
  ALTER TABLE "payload_locked_documents_rels" DROP CONSTRAINT "payload_locked_documents_rels_block_library_fk";
  
  ALTER TABLE "payload_locked_documents_rels" DROP CONSTRAINT "payload_locked_documents_rels_block_template_builder_fk";
  
  ALTER TABLE "payload_locked_documents_rels" DROP CONSTRAINT "payload_locked_documents_rels_content_types_fk";
  
  ALTER TABLE "payload_locked_documents_rels" DROP CONSTRAINT "payload_locked_documents_rels_custom_items_fk";
  
  ALTER TABLE "payload_locked_documents_rels" DROP CONSTRAINT "payload_locked_documents_rels_archive_items_fk";
  
  ALTER TABLE "payload_locked_documents_rels" DROP CONSTRAINT "payload_locked_documents_rels_people_fk";
  
  ALTER TABLE "payload_locked_documents_rels" DROP CONSTRAINT "payload_locked_documents_rels_places_fk";
  
  ALTER TABLE "payload_locked_documents_rels" DROP CONSTRAINT "payload_locked_documents_rels_events_fk";
  
  DROP INDEX "payload_locked_documents_rels_faqs_id_idx";
  DROP INDEX "payload_locked_documents_rels_testimonials_id_idx";
  DROP INDEX "payload_locked_documents_rels_locations_id_idx";
  DROP INDEX "payload_locked_documents_rels_logo_clouds_id_idx";
  DROP INDEX "payload_locked_documents_rels_global_blocks_id_idx";
  DROP INDEX "payload_locked_documents_rels_block_library_id_idx";
  DROP INDEX "payload_locked_documents_rels_block_template_builder_id_idx";
  DROP INDEX "payload_locked_documents_rels_content_types_id_idx";
  DROP INDEX "payload_locked_documents_rels_custom_items_id_idx";
  DROP INDEX "payload_locked_documents_rels_archive_items_id_idx";
  DROP INDEX "payload_locked_documents_rels_people_id_idx";
  DROP INDEX "payload_locked_documents_rels_places_id_idx";
  DROP INDEX "payload_locked_documents_rels_events_id_idx";
  ALTER TABLE "payload_locked_documents_rels" DROP COLUMN "faqs_id";
  ALTER TABLE "payload_locked_documents_rels" DROP COLUMN "testimonials_id";
  ALTER TABLE "payload_locked_documents_rels" DROP COLUMN "locations_id";
  ALTER TABLE "payload_locked_documents_rels" DROP COLUMN "logo_clouds_id";
  ALTER TABLE "payload_locked_documents_rels" DROP COLUMN "global_blocks_id";
  ALTER TABLE "payload_locked_documents_rels" DROP COLUMN "block_library_id";
  ALTER TABLE "payload_locked_documents_rels" DROP COLUMN "block_template_builder_id";
  ALTER TABLE "payload_locked_documents_rels" DROP COLUMN "content_types_id";
  ALTER TABLE "payload_locked_documents_rels" DROP COLUMN "custom_items_id";
  ALTER TABLE "payload_locked_documents_rels" DROP COLUMN "archive_items_id";
  ALTER TABLE "payload_locked_documents_rels" DROP COLUMN "people_id";
  ALTER TABLE "payload_locked_documents_rels" DROP COLUMN "places_id";
  ALTER TABLE "payload_locked_documents_rels" DROP COLUMN "events_id";
  ALTER TABLE "footer" DROP COLUMN "email";
  DROP TYPE "public"."enum_pages_blocks_contact_form_variant";
  DROP TYPE "public"."enum_pages_blocks_social_links_custom_links_platform";
  DROP TYPE "public"."enum_pages_blocks_social_links_variant";
  DROP TYPE "public"."enum__pages_v_blocks_contact_form_variant";
  DROP TYPE "public"."enum__pages_v_blocks_social_links_custom_links_platform";
  DROP TYPE "public"."enum__pages_v_blocks_social_links_variant";
  DROP TYPE "public"."enum_global_blocks_blocks_hero_links_variant";
  DROP TYPE "public"."enum_global_blocks_blocks_hero_variant";
  DROP TYPE "public"."enum_global_blocks_blocks_hero_overlay";
  DROP TYPE "public"."enum_global_blocks_blocks_hero_text_align";
  DROP TYPE "public"."enum_global_blocks_blocks_content_columns_size";
  DROP TYPE "public"."enum_global_blocks_blocks_content_background_color";
  DROP TYPE "public"."enum_global_blocks_blocks_content_padding_top";
  DROP TYPE "public"."enum_global_blocks_blocks_content_padding_bottom";
  DROP TYPE "public"."enum_global_blocks_blocks_media_size";
  DROP TYPE "public"."enum_global_blocks_blocks_media_position";
  DROP TYPE "public"."enum_global_blocks_blocks_cta_links_variant";
  DROP TYPE "public"."enum_global_blocks_blocks_cta_variant";
  DROP TYPE "public"."enum_global_blocks_blocks_cta_background_color";
  DROP TYPE "public"."enum_global_blocks_blocks_archive_populate_by";
  DROP TYPE "public"."enum_global_blocks_blocks_archive_relation_to";
  DROP TYPE "public"."enum_global_blocks_blocks_archive_variant";
  DROP TYPE "public"."enum_global_blocks_blocks_archive_columns";
  DROP TYPE "public"."enum_global_blocks_blocks_form_variant";
  DROP TYPE "public"."enum_global_blocks_blocks_form_background_color";
  DROP TYPE "public"."enum_global_blocks_blocks_quote_align";
  DROP TYPE "public"."enum_global_blocks_blocks_quote_variant";
  DROP TYPE "public"."enum_global_blocks_blocks_features_variant";
  DROP TYPE "public"."enum_global_blocks_blocks_stats_variant";
  DROP TYPE "public"."enum_global_blocks_blocks_logo_cloud_variant";
  DROP TYPE "public"."enum_global_blocks_blocks_testimonials_variant";
  DROP TYPE "public"."enum_global_blocks_blocks_faq_variant";
  DROP TYPE "public"."enum_global_blocks_blocks_pricing_plans_links_variant";
  DROP TYPE "public"."enum_global_blocks_blocks_pricing_variant";
  DROP TYPE "public"."enum_global_blocks_blocks_team_variant";
  DROP TYPE "public"."enum_global_blocks_blocks_embed_aspect_ratio";
  DROP TYPE "public"."enum_global_blocks_blocks_spacer_style";
  DROP TYPE "public"."enum_global_blocks_blocks_spacer_size";
  DROP TYPE "public"."enum_global_blocks_blocks_spacer_line_style";
  DROP TYPE "public"."enum_global_blocks_blocks_gallery_variant";
  DROP TYPE "public"."enum_global_blocks_blocks_gallery_columns";
  DROP TYPE "public"."enum_global_blocks_blocks_gallery_gap";
  DROP TYPE "public"."enum_global_blocks_blocks_gallery_aspect_ratio";
  DROP TYPE "public"."enum_global_blocks_blocks_grid_variant";
  DROP TYPE "public"."enum_global_blocks_blocks_grid_columns";
  DROP TYPE "public"."enum_global_blocks_blocks_grid_gap";
  DROP TYPE "public"."enum_global_blocks_blocks_grid_alignment";
  DROP TYPE "public"."enum_global_blocks_blocks_grid_hover_effect";
  DROP TYPE "public"."enum_global_blocks_blocks_timeline_variant";
  DROP TYPE "public"."enum_global_blocks_blocks_timeline_line_style";
  DROP TYPE "public"."enum_global_blocks_blocks_timeline_marker_style";
  DROP TYPE "public"."enum_global_blocks_blocks_timeline_sort_order";
  DROP TYPE "public"."enum_global_blocks_blocks_timeline_background_color";
  DROP TYPE "public"."enum_block_library_block_type";
  DROP TYPE "public"."enum_block_template_builder_blocks_hero_links_variant";
  DROP TYPE "public"."enum_block_template_builder_blocks_hero_variant";
  DROP TYPE "public"."enum_block_template_builder_blocks_hero_overlay";
  DROP TYPE "public"."enum_block_template_builder_blocks_hero_text_align";
  DROP TYPE "public"."enum_block_template_builder_blocks_content_columns_size";
  DROP TYPE "public"."enum_block_template_builder_blocks_content_background_color";
  DROP TYPE "public"."enum_block_template_builder_blocks_content_padding_top";
  DROP TYPE "public"."enum_block_template_builder_blocks_content_padding_bottom";
  DROP TYPE "public"."enum_block_template_builder_blocks_media_size";
  DROP TYPE "public"."enum_block_template_builder_blocks_media_position";
  DROP TYPE "public"."enum_block_template_builder_blocks_cta_links_variant";
  DROP TYPE "public"."enum_block_template_builder_blocks_cta_variant";
  DROP TYPE "public"."enum_block_template_builder_blocks_cta_background_color";
  DROP TYPE "public"."enum_block_template_builder_blocks_archive_populate_by";
  DROP TYPE "public"."enum_block_template_builder_blocks_archive_relation_to";
  DROP TYPE "public"."enum_block_template_builder_blocks_archive_variant";
  DROP TYPE "public"."enum_block_template_builder_blocks_archive_columns";
  DROP TYPE "public"."enum_block_template_builder_blocks_form_variant";
  DROP TYPE "public"."enum_block_template_builder_blocks_form_background_color";
  DROP TYPE "public"."enum_block_template_builder_blocks_quote_align";
  DROP TYPE "public"."enum_block_template_builder_blocks_quote_variant";
  DROP TYPE "public"."enum_block_template_builder_blocks_features_variant";
  DROP TYPE "public"."enum_block_template_builder_blocks_stats_variant";
  DROP TYPE "public"."enum_block_template_builder_blocks_logo_cloud_variant";
  DROP TYPE "public"."enum_block_template_builder_blocks_testimonials_variant";
  DROP TYPE "public"."enum_block_template_builder_blocks_faq_variant";
  DROP TYPE "public"."enum_block_template_builder_blocks_pricing_plans_links_variant";
  DROP TYPE "public"."enum_block_template_builder_blocks_pricing_variant";
  DROP TYPE "public"."enum_block_template_builder_blocks_team_variant";
  DROP TYPE "public"."enum_block_template_builder_blocks_embed_aspect_ratio";
  DROP TYPE "public"."enum_block_template_builder_blocks_spacer_style";
  DROP TYPE "public"."enum_block_template_builder_blocks_spacer_size";
  DROP TYPE "public"."enum_block_template_builder_blocks_spacer_line_style";
  DROP TYPE "public"."enum_block_template_builder_blocks_gallery_variant";
  DROP TYPE "public"."enum_block_template_builder_blocks_gallery_columns";
  DROP TYPE "public"."enum_block_template_builder_blocks_gallery_gap";
  DROP TYPE "public"."enum_block_template_builder_blocks_gallery_aspect_ratio";
  DROP TYPE "public"."enum_block_template_builder_blocks_grid_variant";
  DROP TYPE "public"."enum_block_template_builder_blocks_grid_columns";
  DROP TYPE "public"."enum_block_template_builder_blocks_grid_gap";
  DROP TYPE "public"."enum_block_template_builder_blocks_grid_alignment";
  DROP TYPE "public"."enum_block_template_builder_blocks_grid_hover_effect";
  DROP TYPE "public"."enum_block_template_builder_blocks_timeline_variant";
  DROP TYPE "public"."enum_block_template_builder_blocks_timeline_line_style";
  DROP TYPE "public"."enum_block_template_builder_blocks_timeline_marker_style";
  DROP TYPE "public"."enum_block_template_builder_blocks_timeline_sort_order";
  DROP TYPE "public"."enum_block_template_builder_blocks_timeline_background_color";
  DROP TYPE "public"."enum_content_types_custom_fields_type";
  DROP TYPE "public"."enum_content_types_icon";
  DROP TYPE "public"."enum_content_types_template";
  DROP TYPE "public"."enum_custom_items_blocks_hero_links_variant";
  DROP TYPE "public"."enum_custom_items_blocks_hero_variant";
  DROP TYPE "public"."enum_custom_items_blocks_hero_overlay";
  DROP TYPE "public"."enum_custom_items_blocks_hero_text_align";
  DROP TYPE "public"."enum_custom_items_blocks_content_columns_size";
  DROP TYPE "public"."enum_custom_items_blocks_content_background_color";
  DROP TYPE "public"."enum_custom_items_blocks_content_padding_top";
  DROP TYPE "public"."enum_custom_items_blocks_content_padding_bottom";
  DROP TYPE "public"."enum_custom_items_blocks_media_size";
  DROP TYPE "public"."enum_custom_items_blocks_media_position";
  DROP TYPE "public"."enum_custom_items_blocks_cta_links_variant";
  DROP TYPE "public"."enum_custom_items_blocks_cta_variant";
  DROP TYPE "public"."enum_custom_items_blocks_cta_background_color";
  DROP TYPE "public"."enum_custom_items_blocks_quote_align";
  DROP TYPE "public"."enum_custom_items_blocks_quote_variant";
  DROP TYPE "public"."enum_custom_items_blocks_features_variant";
  DROP TYPE "public"."enum_custom_items_blocks_stats_variant";
  DROP TYPE "public"."enum_custom_items_blocks_logo_cloud_variant";
  DROP TYPE "public"."enum_custom_items_blocks_testimonials_variant";
  DROP TYPE "public"."enum_custom_items_blocks_faq_variant";
  DROP TYPE "public"."enum_custom_items_blocks_pricing_plans_links_variant";
  DROP TYPE "public"."enum_custom_items_blocks_pricing_variant";
  DROP TYPE "public"."enum_custom_items_blocks_team_variant";
  DROP TYPE "public"."enum_custom_items_blocks_embed_aspect_ratio";
  DROP TYPE "public"."enum_custom_items_blocks_gallery_variant";
  DROP TYPE "public"."enum_custom_items_blocks_gallery_columns";
  DROP TYPE "public"."enum_custom_items_blocks_gallery_gap";
  DROP TYPE "public"."enum_custom_items_blocks_gallery_aspect_ratio";
  DROP TYPE "public"."enum_custom_items_blocks_grid_variant";
  DROP TYPE "public"."enum_custom_items_blocks_grid_columns";
  DROP TYPE "public"."enum_custom_items_blocks_grid_gap";
  DROP TYPE "public"."enum_custom_items_blocks_grid_alignment";
  DROP TYPE "public"."enum_custom_items_blocks_grid_hover_effect";
  DROP TYPE "public"."enum_custom_items_blocks_timeline_variant";
  DROP TYPE "public"."enum_custom_items_blocks_timeline_line_style";
  DROP TYPE "public"."enum_custom_items_blocks_timeline_marker_style";
  DROP TYPE "public"."enum_custom_items_blocks_timeline_sort_order";
  DROP TYPE "public"."enum_custom_items_blocks_timeline_background_color";
  DROP TYPE "public"."enum_custom_items_blocks_archive_populate_by";
  DROP TYPE "public"."enum_custom_items_blocks_archive_relation_to";
  DROP TYPE "public"."enum_custom_items_blocks_archive_variant";
  DROP TYPE "public"."enum_custom_items_blocks_archive_columns";
  DROP TYPE "public"."enum_custom_items_blocks_form_variant";
  DROP TYPE "public"."enum_custom_items_blocks_form_background_color";
  DROP TYPE "public"."enum_custom_items_blocks_spacer_style";
  DROP TYPE "public"."enum_custom_items_blocks_spacer_size";
  DROP TYPE "public"."enum_custom_items_blocks_spacer_line_style";
  DROP TYPE "public"."enum_custom_items_status";
  DROP TYPE "public"."enum__custom_items_v_blocks_hero_links_variant";
  DROP TYPE "public"."enum__custom_items_v_blocks_hero_variant";
  DROP TYPE "public"."enum__custom_items_v_blocks_hero_overlay";
  DROP TYPE "public"."enum__custom_items_v_blocks_hero_text_align";
  DROP TYPE "public"."enum__custom_items_v_blocks_content_columns_size";
  DROP TYPE "public"."enum__custom_items_v_blocks_content_background_color";
  DROP TYPE "public"."enum__custom_items_v_blocks_content_padding_top";
  DROP TYPE "public"."enum__custom_items_v_blocks_content_padding_bottom";
  DROP TYPE "public"."enum__custom_items_v_blocks_media_size";
  DROP TYPE "public"."enum__custom_items_v_blocks_media_position";
  DROP TYPE "public"."enum__custom_items_v_blocks_cta_links_variant";
  DROP TYPE "public"."enum__custom_items_v_blocks_cta_variant";
  DROP TYPE "public"."enum__custom_items_v_blocks_cta_background_color";
  DROP TYPE "public"."enum__custom_items_v_blocks_quote_align";
  DROP TYPE "public"."enum__custom_items_v_blocks_quote_variant";
  DROP TYPE "public"."enum__custom_items_v_blocks_features_variant";
  DROP TYPE "public"."enum__custom_items_v_blocks_stats_variant";
  DROP TYPE "public"."enum__custom_items_v_blocks_logo_cloud_variant";
  DROP TYPE "public"."enum__custom_items_v_blocks_testimonials_variant";
  DROP TYPE "public"."enum__custom_items_v_blocks_faq_variant";
  DROP TYPE "public"."enum__custom_items_v_blocks_pricing_plans_links_variant";
  DROP TYPE "public"."enum__custom_items_v_blocks_pricing_variant";
  DROP TYPE "public"."enum__custom_items_v_blocks_team_variant";
  DROP TYPE "public"."enum__custom_items_v_blocks_embed_aspect_ratio";
  DROP TYPE "public"."enum__custom_items_v_blocks_gallery_variant";
  DROP TYPE "public"."enum__custom_items_v_blocks_gallery_columns";
  DROP TYPE "public"."enum__custom_items_v_blocks_gallery_gap";
  DROP TYPE "public"."enum__custom_items_v_blocks_gallery_aspect_ratio";
  DROP TYPE "public"."enum__custom_items_v_blocks_grid_variant";
  DROP TYPE "public"."enum__custom_items_v_blocks_grid_columns";
  DROP TYPE "public"."enum__custom_items_v_blocks_grid_gap";
  DROP TYPE "public"."enum__custom_items_v_blocks_grid_alignment";
  DROP TYPE "public"."enum__custom_items_v_blocks_grid_hover_effect";
  DROP TYPE "public"."enum__custom_items_v_blocks_timeline_variant";
  DROP TYPE "public"."enum__custom_items_v_blocks_timeline_line_style";
  DROP TYPE "public"."enum__custom_items_v_blocks_timeline_marker_style";
  DROP TYPE "public"."enum__custom_items_v_blocks_timeline_sort_order";
  DROP TYPE "public"."enum__custom_items_v_blocks_timeline_background_color";
  DROP TYPE "public"."enum__custom_items_v_blocks_archive_populate_by";
  DROP TYPE "public"."enum__custom_items_v_blocks_archive_relation_to";
  DROP TYPE "public"."enum__custom_items_v_blocks_archive_variant";
  DROP TYPE "public"."enum__custom_items_v_blocks_archive_columns";
  DROP TYPE "public"."enum__custom_items_v_blocks_form_variant";
  DROP TYPE "public"."enum__custom_items_v_blocks_form_background_color";
  DROP TYPE "public"."enum__custom_items_v_blocks_spacer_style";
  DROP TYPE "public"."enum__custom_items_v_blocks_spacer_size";
  DROP TYPE "public"."enum__custom_items_v_blocks_spacer_line_style";
  DROP TYPE "public"."enum__custom_items_v_version_status";
  DROP TYPE "public"."enum_archive_items_blocks_hero_links_variant";
  DROP TYPE "public"."enum_archive_items_blocks_hero_variant";
  DROP TYPE "public"."enum_archive_items_blocks_hero_overlay";
  DROP TYPE "public"."enum_archive_items_blocks_hero_text_align";
  DROP TYPE "public"."enum_archive_items_blocks_content_columns_size";
  DROP TYPE "public"."enum_archive_items_blocks_content_background_color";
  DROP TYPE "public"."enum_archive_items_blocks_content_padding_top";
  DROP TYPE "public"."enum_archive_items_blocks_content_padding_bottom";
  DROP TYPE "public"."enum_archive_items_blocks_media_size";
  DROP TYPE "public"."enum_archive_items_blocks_media_position";
  DROP TYPE "public"."enum_archive_items_blocks_cta_links_variant";
  DROP TYPE "public"."enum_archive_items_blocks_cta_variant";
  DROP TYPE "public"."enum_archive_items_blocks_cta_background_color";
  DROP TYPE "public"."enum_archive_items_blocks_archive_populate_by";
  DROP TYPE "public"."enum_archive_items_blocks_archive_relation_to";
  DROP TYPE "public"."enum_archive_items_blocks_archive_variant";
  DROP TYPE "public"."enum_archive_items_blocks_archive_columns";
  DROP TYPE "public"."enum_archive_items_blocks_form_variant";
  DROP TYPE "public"."enum_archive_items_blocks_form_background_color";
  DROP TYPE "public"."enum_archive_items_blocks_gallery_variant";
  DROP TYPE "public"."enum_archive_items_blocks_gallery_columns";
  DROP TYPE "public"."enum_archive_items_blocks_gallery_gap";
  DROP TYPE "public"."enum_archive_items_blocks_gallery_aspect_ratio";
  DROP TYPE "public"."enum_archive_items_blocks_grid_variant";
  DROP TYPE "public"."enum_archive_items_blocks_grid_columns";
  DROP TYPE "public"."enum_archive_items_blocks_grid_gap";
  DROP TYPE "public"."enum_archive_items_blocks_grid_alignment";
  DROP TYPE "public"."enum_archive_items_blocks_grid_hover_effect";
  DROP TYPE "public"."enum_archive_items_blocks_timeline_variant";
  DROP TYPE "public"."enum_archive_items_blocks_timeline_line_style";
  DROP TYPE "public"."enum_archive_items_blocks_timeline_marker_style";
  DROP TYPE "public"."enum_archive_items_blocks_timeline_sort_order";
  DROP TYPE "public"."enum_archive_items_blocks_timeline_background_color";
  DROP TYPE "public"."enum_archive_items_template";
  DROP TYPE "public"."enum_archive_items_status";
  DROP TYPE "public"."enum__archive_items_v_blocks_hero_links_variant";
  DROP TYPE "public"."enum__archive_items_v_blocks_hero_variant";
  DROP TYPE "public"."enum__archive_items_v_blocks_hero_overlay";
  DROP TYPE "public"."enum__archive_items_v_blocks_hero_text_align";
  DROP TYPE "public"."enum__archive_items_v_blocks_content_columns_size";
  DROP TYPE "public"."enum__archive_items_v_blocks_content_background_color";
  DROP TYPE "public"."enum__archive_items_v_blocks_content_padding_top";
  DROP TYPE "public"."enum__archive_items_v_blocks_content_padding_bottom";
  DROP TYPE "public"."enum__archive_items_v_blocks_media_size";
  DROP TYPE "public"."enum__archive_items_v_blocks_media_position";
  DROP TYPE "public"."enum__archive_items_v_blocks_cta_links_variant";
  DROP TYPE "public"."enum__archive_items_v_blocks_cta_variant";
  DROP TYPE "public"."enum__archive_items_v_blocks_cta_background_color";
  DROP TYPE "public"."enum__archive_items_v_blocks_archive_populate_by";
  DROP TYPE "public"."enum__archive_items_v_blocks_archive_relation_to";
  DROP TYPE "public"."enum__archive_items_v_blocks_archive_variant";
  DROP TYPE "public"."enum__archive_items_v_blocks_archive_columns";
  DROP TYPE "public"."enum__archive_items_v_blocks_form_variant";
  DROP TYPE "public"."enum__archive_items_v_blocks_form_background_color";
  DROP TYPE "public"."enum__archive_items_v_blocks_gallery_variant";
  DROP TYPE "public"."enum__archive_items_v_blocks_gallery_columns";
  DROP TYPE "public"."enum__archive_items_v_blocks_gallery_gap";
  DROP TYPE "public"."enum__archive_items_v_blocks_gallery_aspect_ratio";
  DROP TYPE "public"."enum__archive_items_v_blocks_grid_variant";
  DROP TYPE "public"."enum__archive_items_v_blocks_grid_columns";
  DROP TYPE "public"."enum__archive_items_v_blocks_grid_gap";
  DROP TYPE "public"."enum__archive_items_v_blocks_grid_alignment";
  DROP TYPE "public"."enum__archive_items_v_blocks_grid_hover_effect";
  DROP TYPE "public"."enum__archive_items_v_blocks_timeline_variant";
  DROP TYPE "public"."enum__archive_items_v_blocks_timeline_line_style";
  DROP TYPE "public"."enum__archive_items_v_blocks_timeline_marker_style";
  DROP TYPE "public"."enum__archive_items_v_blocks_timeline_sort_order";
  DROP TYPE "public"."enum__archive_items_v_blocks_timeline_background_color";
  DROP TYPE "public"."enum__archive_items_v_version_template";
  DROP TYPE "public"."enum__archive_items_v_version_status";
  DROP TYPE "public"."enum_people_role";
  DROP TYPE "public"."enum_people_social_links_platform";
  DROP TYPE "public"."enum_people_blocks_hero_links_variant";
  DROP TYPE "public"."enum_people_blocks_hero_variant";
  DROP TYPE "public"."enum_people_blocks_hero_overlay";
  DROP TYPE "public"."enum_people_blocks_hero_text_align";
  DROP TYPE "public"."enum_people_blocks_content_columns_size";
  DROP TYPE "public"."enum_people_blocks_content_background_color";
  DROP TYPE "public"."enum_people_blocks_content_padding_top";
  DROP TYPE "public"."enum_people_blocks_content_padding_bottom";
  DROP TYPE "public"."enum_people_blocks_media_size";
  DROP TYPE "public"."enum_people_blocks_media_position";
  DROP TYPE "public"."enum_people_blocks_cta_links_variant";
  DROP TYPE "public"."enum_people_blocks_cta_variant";
  DROP TYPE "public"."enum_people_blocks_cta_background_color";
  DROP TYPE "public"."enum_people_blocks_quote_align";
  DROP TYPE "public"."enum_people_blocks_quote_variant";
  DROP TYPE "public"."enum_people_blocks_features_variant";
  DROP TYPE "public"."enum_people_blocks_stats_variant";
  DROP TYPE "public"."enum_people_blocks_logo_cloud_variant";
  DROP TYPE "public"."enum_people_blocks_testimonials_variant";
  DROP TYPE "public"."enum_people_blocks_faq_variant";
  DROP TYPE "public"."enum_people_blocks_pricing_plans_links_variant";
  DROP TYPE "public"."enum_people_blocks_pricing_variant";
  DROP TYPE "public"."enum_people_blocks_team_variant";
  DROP TYPE "public"."enum_people_blocks_embed_aspect_ratio";
  DROP TYPE "public"."enum_people_blocks_archive_populate_by";
  DROP TYPE "public"."enum_people_blocks_archive_relation_to";
  DROP TYPE "public"."enum_people_blocks_archive_variant";
  DROP TYPE "public"."enum_people_blocks_archive_columns";
  DROP TYPE "public"."enum_people_blocks_form_variant";
  DROP TYPE "public"."enum_people_blocks_form_background_color";
  DROP TYPE "public"."enum_people_blocks_gallery_variant";
  DROP TYPE "public"."enum_people_blocks_gallery_columns";
  DROP TYPE "public"."enum_people_blocks_gallery_gap";
  DROP TYPE "public"."enum_people_blocks_gallery_aspect_ratio";
  DROP TYPE "public"."enum_people_blocks_grid_variant";
  DROP TYPE "public"."enum_people_blocks_grid_columns";
  DROP TYPE "public"."enum_people_blocks_grid_gap";
  DROP TYPE "public"."enum_people_blocks_grid_alignment";
  DROP TYPE "public"."enum_people_blocks_grid_hover_effect";
  DROP TYPE "public"."enum_people_blocks_timeline_variant";
  DROP TYPE "public"."enum_people_blocks_timeline_line_style";
  DROP TYPE "public"."enum_people_blocks_timeline_marker_style";
  DROP TYPE "public"."enum_people_blocks_timeline_sort_order";
  DROP TYPE "public"."enum_people_blocks_timeline_background_color";
  DROP TYPE "public"."enum_people_blocks_spacer_style";
  DROP TYPE "public"."enum_people_blocks_spacer_size";
  DROP TYPE "public"."enum_people_blocks_spacer_line_style";
  DROP TYPE "public"."enum_people_template";
  DROP TYPE "public"."enum_people_status";
  DROP TYPE "public"."enum__people_v_version_role";
  DROP TYPE "public"."enum__people_v_version_social_links_platform";
  DROP TYPE "public"."enum__people_v_blocks_hero_links_variant";
  DROP TYPE "public"."enum__people_v_blocks_hero_variant";
  DROP TYPE "public"."enum__people_v_blocks_hero_overlay";
  DROP TYPE "public"."enum__people_v_blocks_hero_text_align";
  DROP TYPE "public"."enum__people_v_blocks_content_columns_size";
  DROP TYPE "public"."enum__people_v_blocks_content_background_color";
  DROP TYPE "public"."enum__people_v_blocks_content_padding_top";
  DROP TYPE "public"."enum__people_v_blocks_content_padding_bottom";
  DROP TYPE "public"."enum__people_v_blocks_media_size";
  DROP TYPE "public"."enum__people_v_blocks_media_position";
  DROP TYPE "public"."enum__people_v_blocks_cta_links_variant";
  DROP TYPE "public"."enum__people_v_blocks_cta_variant";
  DROP TYPE "public"."enum__people_v_blocks_cta_background_color";
  DROP TYPE "public"."enum__people_v_blocks_quote_align";
  DROP TYPE "public"."enum__people_v_blocks_quote_variant";
  DROP TYPE "public"."enum__people_v_blocks_features_variant";
  DROP TYPE "public"."enum__people_v_blocks_stats_variant";
  DROP TYPE "public"."enum__people_v_blocks_logo_cloud_variant";
  DROP TYPE "public"."enum__people_v_blocks_testimonials_variant";
  DROP TYPE "public"."enum__people_v_blocks_faq_variant";
  DROP TYPE "public"."enum__people_v_blocks_pricing_plans_links_variant";
  DROP TYPE "public"."enum__people_v_blocks_pricing_variant";
  DROP TYPE "public"."enum__people_v_blocks_team_variant";
  DROP TYPE "public"."enum__people_v_blocks_embed_aspect_ratio";
  DROP TYPE "public"."enum__people_v_blocks_archive_populate_by";
  DROP TYPE "public"."enum__people_v_blocks_archive_relation_to";
  DROP TYPE "public"."enum__people_v_blocks_archive_variant";
  DROP TYPE "public"."enum__people_v_blocks_archive_columns";
  DROP TYPE "public"."enum__people_v_blocks_form_variant";
  DROP TYPE "public"."enum__people_v_blocks_form_background_color";
  DROP TYPE "public"."enum__people_v_blocks_gallery_variant";
  DROP TYPE "public"."enum__people_v_blocks_gallery_columns";
  DROP TYPE "public"."enum__people_v_blocks_gallery_gap";
  DROP TYPE "public"."enum__people_v_blocks_gallery_aspect_ratio";
  DROP TYPE "public"."enum__people_v_blocks_grid_variant";
  DROP TYPE "public"."enum__people_v_blocks_grid_columns";
  DROP TYPE "public"."enum__people_v_blocks_grid_gap";
  DROP TYPE "public"."enum__people_v_blocks_grid_alignment";
  DROP TYPE "public"."enum__people_v_blocks_grid_hover_effect";
  DROP TYPE "public"."enum__people_v_blocks_timeline_variant";
  DROP TYPE "public"."enum__people_v_blocks_timeline_line_style";
  DROP TYPE "public"."enum__people_v_blocks_timeline_marker_style";
  DROP TYPE "public"."enum__people_v_blocks_timeline_sort_order";
  DROP TYPE "public"."enum__people_v_blocks_timeline_background_color";
  DROP TYPE "public"."enum__people_v_blocks_spacer_style";
  DROP TYPE "public"."enum__people_v_blocks_spacer_size";
  DROP TYPE "public"."enum__people_v_blocks_spacer_line_style";
  DROP TYPE "public"."enum__people_v_version_template";
  DROP TYPE "public"."enum__people_v_version_status";
  DROP TYPE "public"."enum_places_hours_day";
  DROP TYPE "public"."enum_places_blocks_hero_links_variant";
  DROP TYPE "public"."enum_places_blocks_hero_variant";
  DROP TYPE "public"."enum_places_blocks_hero_overlay";
  DROP TYPE "public"."enum_places_blocks_hero_text_align";
  DROP TYPE "public"."enum_places_blocks_content_columns_size";
  DROP TYPE "public"."enum_places_blocks_content_background_color";
  DROP TYPE "public"."enum_places_blocks_content_padding_top";
  DROP TYPE "public"."enum_places_blocks_content_padding_bottom";
  DROP TYPE "public"."enum_places_blocks_media_size";
  DROP TYPE "public"."enum_places_blocks_media_position";
  DROP TYPE "public"."enum_places_blocks_cta_links_variant";
  DROP TYPE "public"."enum_places_blocks_cta_variant";
  DROP TYPE "public"."enum_places_blocks_cta_background_color";
  DROP TYPE "public"."enum_places_blocks_quote_align";
  DROP TYPE "public"."enum_places_blocks_quote_variant";
  DROP TYPE "public"."enum_places_blocks_features_variant";
  DROP TYPE "public"."enum_places_blocks_stats_variant";
  DROP TYPE "public"."enum_places_blocks_logo_cloud_variant";
  DROP TYPE "public"."enum_places_blocks_testimonials_variant";
  DROP TYPE "public"."enum_places_blocks_faq_variant";
  DROP TYPE "public"."enum_places_blocks_pricing_plans_links_variant";
  DROP TYPE "public"."enum_places_blocks_pricing_variant";
  DROP TYPE "public"."enum_places_blocks_team_variant";
  DROP TYPE "public"."enum_places_blocks_embed_aspect_ratio";
  DROP TYPE "public"."enum_places_blocks_archive_populate_by";
  DROP TYPE "public"."enum_places_blocks_archive_relation_to";
  DROP TYPE "public"."enum_places_blocks_archive_variant";
  DROP TYPE "public"."enum_places_blocks_archive_columns";
  DROP TYPE "public"."enum_places_blocks_form_variant";
  DROP TYPE "public"."enum_places_blocks_form_background_color";
  DROP TYPE "public"."enum_places_blocks_gallery_variant";
  DROP TYPE "public"."enum_places_blocks_gallery_columns";
  DROP TYPE "public"."enum_places_blocks_gallery_gap";
  DROP TYPE "public"."enum_places_blocks_gallery_aspect_ratio";
  DROP TYPE "public"."enum_places_blocks_grid_variant";
  DROP TYPE "public"."enum_places_blocks_grid_columns";
  DROP TYPE "public"."enum_places_blocks_grid_gap";
  DROP TYPE "public"."enum_places_blocks_grid_alignment";
  DROP TYPE "public"."enum_places_blocks_grid_hover_effect";
  DROP TYPE "public"."enum_places_blocks_timeline_variant";
  DROP TYPE "public"."enum_places_blocks_timeline_line_style";
  DROP TYPE "public"."enum_places_blocks_timeline_marker_style";
  DROP TYPE "public"."enum_places_blocks_timeline_sort_order";
  DROP TYPE "public"."enum_places_blocks_timeline_background_color";
  DROP TYPE "public"."enum_places_blocks_spacer_style";
  DROP TYPE "public"."enum_places_blocks_spacer_size";
  DROP TYPE "public"."enum_places_blocks_spacer_line_style";
  DROP TYPE "public"."enum_places_template";
  DROP TYPE "public"."enum_places_place_type";
  DROP TYPE "public"."enum_places_status";
  DROP TYPE "public"."enum__places_v_version_hours_day";
  DROP TYPE "public"."enum__places_v_blocks_hero_links_variant";
  DROP TYPE "public"."enum__places_v_blocks_hero_variant";
  DROP TYPE "public"."enum__places_v_blocks_hero_overlay";
  DROP TYPE "public"."enum__places_v_blocks_hero_text_align";
  DROP TYPE "public"."enum__places_v_blocks_content_columns_size";
  DROP TYPE "public"."enum__places_v_blocks_content_background_color";
  DROP TYPE "public"."enum__places_v_blocks_content_padding_top";
  DROP TYPE "public"."enum__places_v_blocks_content_padding_bottom";
  DROP TYPE "public"."enum__places_v_blocks_media_size";
  DROP TYPE "public"."enum__places_v_blocks_media_position";
  DROP TYPE "public"."enum__places_v_blocks_cta_links_variant";
  DROP TYPE "public"."enum__places_v_blocks_cta_variant";
  DROP TYPE "public"."enum__places_v_blocks_cta_background_color";
  DROP TYPE "public"."enum__places_v_blocks_quote_align";
  DROP TYPE "public"."enum__places_v_blocks_quote_variant";
  DROP TYPE "public"."enum__places_v_blocks_features_variant";
  DROP TYPE "public"."enum__places_v_blocks_stats_variant";
  DROP TYPE "public"."enum__places_v_blocks_logo_cloud_variant";
  DROP TYPE "public"."enum__places_v_blocks_testimonials_variant";
  DROP TYPE "public"."enum__places_v_blocks_faq_variant";
  DROP TYPE "public"."enum__places_v_blocks_pricing_plans_links_variant";
  DROP TYPE "public"."enum__places_v_blocks_pricing_variant";
  DROP TYPE "public"."enum__places_v_blocks_team_variant";
  DROP TYPE "public"."enum__places_v_blocks_embed_aspect_ratio";
  DROP TYPE "public"."enum__places_v_blocks_archive_populate_by";
  DROP TYPE "public"."enum__places_v_blocks_archive_relation_to";
  DROP TYPE "public"."enum__places_v_blocks_archive_variant";
  DROP TYPE "public"."enum__places_v_blocks_archive_columns";
  DROP TYPE "public"."enum__places_v_blocks_form_variant";
  DROP TYPE "public"."enum__places_v_blocks_form_background_color";
  DROP TYPE "public"."enum__places_v_blocks_gallery_variant";
  DROP TYPE "public"."enum__places_v_blocks_gallery_columns";
  DROP TYPE "public"."enum__places_v_blocks_gallery_gap";
  DROP TYPE "public"."enum__places_v_blocks_gallery_aspect_ratio";
  DROP TYPE "public"."enum__places_v_blocks_grid_variant";
  DROP TYPE "public"."enum__places_v_blocks_grid_columns";
  DROP TYPE "public"."enum__places_v_blocks_grid_gap";
  DROP TYPE "public"."enum__places_v_blocks_grid_alignment";
  DROP TYPE "public"."enum__places_v_blocks_grid_hover_effect";
  DROP TYPE "public"."enum__places_v_blocks_timeline_variant";
  DROP TYPE "public"."enum__places_v_blocks_timeline_line_style";
  DROP TYPE "public"."enum__places_v_blocks_timeline_marker_style";
  DROP TYPE "public"."enum__places_v_blocks_timeline_sort_order";
  DROP TYPE "public"."enum__places_v_blocks_timeline_background_color";
  DROP TYPE "public"."enum__places_v_blocks_spacer_style";
  DROP TYPE "public"."enum__places_v_blocks_spacer_size";
  DROP TYPE "public"."enum__places_v_blocks_spacer_line_style";
  DROP TYPE "public"."enum__places_v_version_template";
  DROP TYPE "public"."enum__places_v_version_place_type";
  DROP TYPE "public"."enum__places_v_version_status";
  DROP TYPE "public"."enum_events_blocks_hero_links_variant";
  DROP TYPE "public"."enum_events_blocks_hero_variant";
  DROP TYPE "public"."enum_events_blocks_hero_overlay";
  DROP TYPE "public"."enum_events_blocks_hero_text_align";
  DROP TYPE "public"."enum_events_blocks_content_columns_size";
  DROP TYPE "public"."enum_events_blocks_content_background_color";
  DROP TYPE "public"."enum_events_blocks_content_padding_top";
  DROP TYPE "public"."enum_events_blocks_content_padding_bottom";
  DROP TYPE "public"."enum_events_blocks_media_size";
  DROP TYPE "public"."enum_events_blocks_media_position";
  DROP TYPE "public"."enum_events_blocks_cta_links_variant";
  DROP TYPE "public"."enum_events_blocks_cta_variant";
  DROP TYPE "public"."enum_events_blocks_cta_background_color";
  DROP TYPE "public"."enum_events_blocks_archive_populate_by";
  DROP TYPE "public"."enum_events_blocks_archive_relation_to";
  DROP TYPE "public"."enum_events_blocks_archive_variant";
  DROP TYPE "public"."enum_events_blocks_archive_columns";
  DROP TYPE "public"."enum_events_blocks_form_variant";
  DROP TYPE "public"."enum_events_blocks_form_background_color";
  DROP TYPE "public"."enum_events_blocks_gallery_variant";
  DROP TYPE "public"."enum_events_blocks_gallery_columns";
  DROP TYPE "public"."enum_events_blocks_gallery_gap";
  DROP TYPE "public"."enum_events_blocks_gallery_aspect_ratio";
  DROP TYPE "public"."enum_events_blocks_grid_variant";
  DROP TYPE "public"."enum_events_blocks_grid_columns";
  DROP TYPE "public"."enum_events_blocks_grid_gap";
  DROP TYPE "public"."enum_events_blocks_grid_alignment";
  DROP TYPE "public"."enum_events_blocks_grid_hover_effect";
  DROP TYPE "public"."enum_events_blocks_timeline_variant";
  DROP TYPE "public"."enum_events_blocks_timeline_line_style";
  DROP TYPE "public"."enum_events_blocks_timeline_marker_style";
  DROP TYPE "public"."enum_events_blocks_timeline_sort_order";
  DROP TYPE "public"."enum_events_blocks_timeline_background_color";
  DROP TYPE "public"."enum_events_event_type";
  DROP TYPE "public"."enum_events_recurring_frequency";
  DROP TYPE "public"."enum_events_price_currency";
  DROP TYPE "public"."enum_events_event_status";
  DROP TYPE "public"."enum_events_template";
  DROP TYPE "public"."enum_events_status";
  DROP TYPE "public"."enum__events_v_blocks_hero_links_variant";
  DROP TYPE "public"."enum__events_v_blocks_hero_variant";
  DROP TYPE "public"."enum__events_v_blocks_hero_overlay";
  DROP TYPE "public"."enum__events_v_blocks_hero_text_align";
  DROP TYPE "public"."enum__events_v_blocks_content_columns_size";
  DROP TYPE "public"."enum__events_v_blocks_content_background_color";
  DROP TYPE "public"."enum__events_v_blocks_content_padding_top";
  DROP TYPE "public"."enum__events_v_blocks_content_padding_bottom";
  DROP TYPE "public"."enum__events_v_blocks_media_size";
  DROP TYPE "public"."enum__events_v_blocks_media_position";
  DROP TYPE "public"."enum__events_v_blocks_cta_links_variant";
  DROP TYPE "public"."enum__events_v_blocks_cta_variant";
  DROP TYPE "public"."enum__events_v_blocks_cta_background_color";
  DROP TYPE "public"."enum__events_v_blocks_archive_populate_by";
  DROP TYPE "public"."enum__events_v_blocks_archive_relation_to";
  DROP TYPE "public"."enum__events_v_blocks_archive_variant";
  DROP TYPE "public"."enum__events_v_blocks_archive_columns";
  DROP TYPE "public"."enum__events_v_blocks_form_variant";
  DROP TYPE "public"."enum__events_v_blocks_form_background_color";
  DROP TYPE "public"."enum__events_v_blocks_gallery_variant";
  DROP TYPE "public"."enum__events_v_blocks_gallery_columns";
  DROP TYPE "public"."enum__events_v_blocks_gallery_gap";
  DROP TYPE "public"."enum__events_v_blocks_gallery_aspect_ratio";
  DROP TYPE "public"."enum__events_v_blocks_grid_variant";
  DROP TYPE "public"."enum__events_v_blocks_grid_columns";
  DROP TYPE "public"."enum__events_v_blocks_grid_gap";
  DROP TYPE "public"."enum__events_v_blocks_grid_alignment";
  DROP TYPE "public"."enum__events_v_blocks_grid_hover_effect";
  DROP TYPE "public"."enum__events_v_blocks_timeline_variant";
  DROP TYPE "public"."enum__events_v_blocks_timeline_line_style";
  DROP TYPE "public"."enum__events_v_blocks_timeline_marker_style";
  DROP TYPE "public"."enum__events_v_blocks_timeline_sort_order";
  DROP TYPE "public"."enum__events_v_blocks_timeline_background_color";
  DROP TYPE "public"."enum__events_v_version_event_type";
  DROP TYPE "public"."enum__events_v_version_recurring_frequency";
  DROP TYPE "public"."enum__events_v_version_price_currency";
  DROP TYPE "public"."enum__events_v_version_event_status";
  DROP TYPE "public"."enum__events_v_version_template";
  DROP TYPE "public"."enum__events_v_version_status";
  DROP TYPE "public"."enum_page_templates_blocks_logo_cloud_variant";
  DROP TYPE "public"."enum_page_templates_blocks_testimonials_variant";
  DROP TYPE "public"."enum_page_templates_blocks_content_columns_size";
  DROP TYPE "public"."enum_page_templates_blocks_content_background_color";
  DROP TYPE "public"."enum_page_templates_blocks_content_padding_top";
  DROP TYPE "public"."enum_page_templates_blocks_content_padding_bottom";
  DROP TYPE "public"."enum_page_templates_blocks_faq_variant";
  DROP TYPE "public"."enum_page_templates_blocks_cta_links_variant";
  DROP TYPE "public"."enum_page_templates_blocks_cta_variant";
  DROP TYPE "public"."enum_page_templates_blocks_cta_background_color";`)
}
