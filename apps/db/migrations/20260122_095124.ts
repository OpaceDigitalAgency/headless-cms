import { MigrateUpArgs, MigrateDownArgs, sql } from '@payloadcms/db-postgres'

export async function up({ db, payload, req }: MigrateUpArgs): Promise<void> {
  await db.execute(sql`
   CREATE TYPE "public"."enum_users_social_links_platform" AS ENUM('twitter', 'linkedin', 'github', 'website');
  CREATE TYPE "public"."enum_users_role" AS ENUM('admin', 'editor', 'user');
  CREATE TYPE "public"."enum_pages_hero_links_variant" AS ENUM('primary', 'secondary');
  CREATE TYPE "public"."enum_pages_blocks_hero_links_variant" AS ENUM('primary', 'secondary', 'outline');
  CREATE TYPE "public"."enum_pages_blocks_hero_variant" AS ENUM('standard', 'agency');
  CREATE TYPE "public"."enum_pages_blocks_hero_type" AS ENUM('standard', 'minimal', 'fullscreen', 'split', 'video');
  CREATE TYPE "public"."enum_pages_blocks_hero_overlay" AS ENUM('none', 'light', 'dark', 'gradient');
  CREATE TYPE "public"."enum_pages_blocks_hero_text_align" AS ENUM('left', 'center', 'right');
  CREATE TYPE "public"."enum_pages_blocks_content_columns_size" AS ENUM('oneThird', 'half', 'twoThirds', 'full');
  CREATE TYPE "public"."enum_pages_blocks_content_background_color" AS ENUM('none', 'light', 'dark', 'primary', 'secondary');
  CREATE TYPE "public"."enum_pages_blocks_content_padding_top" AS ENUM('none', 'small', 'medium', 'large');
  CREATE TYPE "public"."enum_pages_blocks_content_padding_bottom" AS ENUM('none', 'small', 'medium', 'large');
  CREATE TYPE "public"."enum_pages_blocks_media_size" AS ENUM('small', 'default', 'large', 'fullWidth');
  CREATE TYPE "public"."enum_pages_blocks_media_position" AS ENUM('left', 'center', 'right');
  CREATE TYPE "public"."enum_pages_blocks_cta_links_variant" AS ENUM('primary', 'secondary', 'outline');
  CREATE TYPE "public"."enum_pages_blocks_cta_style" AS ENUM('standard', 'banner', 'card', 'inline', 'agency');
  CREATE TYPE "public"."enum_pages_blocks_cta_background_color" AS ENUM('none', 'light', 'dark', 'primary', 'secondary');
  CREATE TYPE "public"."enum_pages_blocks_quote_align" AS ENUM('left', 'center', 'right');
  CREATE TYPE "public"."enum_pages_blocks_features_layout" AS ENUM('grid', 'list');
  CREATE TYPE "public"."enum_pages_blocks_testimonials_style" AS ENUM('standard', 'agency');
  CREATE TYPE "public"."enum_pages_blocks_embed_aspect_ratio" AS ENUM('16:9', '4:3', '1:1', '21:9');
  CREATE TYPE "public"."enum_pages_blocks_archive_populate_by" AS ENUM('collection', 'selection');
  CREATE TYPE "public"."enum_pages_blocks_archive_relation_to" AS ENUM('posts', 'pages', 'archive-items', 'people', 'places', 'custom-items');
  CREATE TYPE "public"."enum_pages_blocks_archive_layout" AS ENUM('grid', 'list', 'cards', 'carousel');
  CREATE TYPE "public"."enum_pages_blocks_archive_columns" AS ENUM('2', '3', '4');
  CREATE TYPE "public"."enum_pages_blocks_form_style" AS ENUM('default', 'card', 'inline', 'fullWidth');
  CREATE TYPE "public"."enum_pages_blocks_form_background_color" AS ENUM('none', 'light', 'dark');
  CREATE TYPE "public"."enum_pages_blocks_gallery_layout" AS ENUM('grid', 'masonry', 'carousel', 'lightbox', 'slider');
  CREATE TYPE "public"."enum_pages_blocks_gallery_columns" AS ENUM('2', '3', '4', '5', '6');
  CREATE TYPE "public"."enum_pages_blocks_gallery_gap" AS ENUM('none', 'small', 'medium', 'large');
  CREATE TYPE "public"."enum_pages_blocks_gallery_aspect_ratio" AS ENUM('auto', 'square', 'landscape', 'portrait', 'wide');
  CREATE TYPE "public"."enum_pages_blocks_grid_style" AS ENUM('cards', 'features', 'icons', 'stats', 'team', 'testimonials', 'logos', 'agency-cards', 'agency-list');
  CREATE TYPE "public"."enum_pages_blocks_grid_columns" AS ENUM('1', '2', '3', '4', '5', '6');
  CREATE TYPE "public"."enum_pages_blocks_grid_gap" AS ENUM('none', 'small', 'medium', 'large');
  CREATE TYPE "public"."enum_pages_blocks_grid_alignment" AS ENUM('left', 'center', 'right');
  CREATE TYPE "public"."enum_pages_blocks_grid_hover_effect" AS ENUM('none', 'lift', 'scale', 'glow');
  CREATE TYPE "public"."enum_pages_blocks_timeline_layout" AS ENUM('vertical', 'alternating', 'horizontal', 'compact');
  CREATE TYPE "public"."enum_pages_blocks_timeline_line_style" AS ENUM('solid', 'dashed', 'dotted', 'gradient');
  CREATE TYPE "public"."enum_pages_blocks_timeline_marker_style" AS ENUM('circle', 'diamond', 'square', 'icon', 'number', 'image');
  CREATE TYPE "public"."enum_pages_blocks_timeline_sort_order" AS ENUM('chronological', 'reverse', 'manual');
  CREATE TYPE "public"."enum_pages_blocks_timeline_background_color" AS ENUM('transparent', 'light', 'dark', 'primary');
  CREATE TYPE "public"."enum_pages_blocks_spacer_style" AS ENUM('space', 'divider');
  CREATE TYPE "public"."enum_pages_blocks_spacer_size" AS ENUM('xs', 'sm', 'md', 'lg', 'xl');
  CREATE TYPE "public"."enum_pages_blocks_spacer_line_style" AS ENUM('solid', 'dashed', 'dotted');
  CREATE TYPE "public"."enum_pages_hero_type" AS ENUM('standard', 'minimal', 'fullscreen', 'none');
  CREATE TYPE "public"."enum_pages_template" AS ENUM('landing', 'home', 'detail', 'article', 'archive', 'showcase');
  CREATE TYPE "public"."enum_pages_status" AS ENUM('draft', 'published');
  CREATE TYPE "public"."enum__pages_v_version_hero_links_variant" AS ENUM('primary', 'secondary');
  CREATE TYPE "public"."enum__pages_v_blocks_hero_links_variant" AS ENUM('primary', 'secondary', 'outline');
  CREATE TYPE "public"."enum__pages_v_blocks_hero_variant" AS ENUM('standard', 'agency');
  CREATE TYPE "public"."enum__pages_v_blocks_hero_type" AS ENUM('standard', 'minimal', 'fullscreen', 'split', 'video');
  CREATE TYPE "public"."enum__pages_v_blocks_hero_overlay" AS ENUM('none', 'light', 'dark', 'gradient');
  CREATE TYPE "public"."enum__pages_v_blocks_hero_text_align" AS ENUM('left', 'center', 'right');
  CREATE TYPE "public"."enum__pages_v_blocks_content_columns_size" AS ENUM('oneThird', 'half', 'twoThirds', 'full');
  CREATE TYPE "public"."enum__pages_v_blocks_content_background_color" AS ENUM('none', 'light', 'dark', 'primary', 'secondary');
  CREATE TYPE "public"."enum__pages_v_blocks_content_padding_top" AS ENUM('none', 'small', 'medium', 'large');
  CREATE TYPE "public"."enum__pages_v_blocks_content_padding_bottom" AS ENUM('none', 'small', 'medium', 'large');
  CREATE TYPE "public"."enum__pages_v_blocks_media_size" AS ENUM('small', 'default', 'large', 'fullWidth');
  CREATE TYPE "public"."enum__pages_v_blocks_media_position" AS ENUM('left', 'center', 'right');
  CREATE TYPE "public"."enum__pages_v_blocks_cta_links_variant" AS ENUM('primary', 'secondary', 'outline');
  CREATE TYPE "public"."enum__pages_v_blocks_cta_style" AS ENUM('standard', 'banner', 'card', 'inline', 'agency');
  CREATE TYPE "public"."enum__pages_v_blocks_cta_background_color" AS ENUM('none', 'light', 'dark', 'primary', 'secondary');
  CREATE TYPE "public"."enum__pages_v_blocks_quote_align" AS ENUM('left', 'center', 'right');
  CREATE TYPE "public"."enum__pages_v_blocks_features_layout" AS ENUM('grid', 'list');
  CREATE TYPE "public"."enum__pages_v_blocks_testimonials_style" AS ENUM('standard', 'agency');
  CREATE TYPE "public"."enum__pages_v_blocks_embed_aspect_ratio" AS ENUM('16:9', '4:3', '1:1', '21:9');
  CREATE TYPE "public"."enum__pages_v_blocks_archive_populate_by" AS ENUM('collection', 'selection');
  CREATE TYPE "public"."enum__pages_v_blocks_archive_relation_to" AS ENUM('posts', 'pages', 'archive-items', 'people', 'places', 'custom-items');
  CREATE TYPE "public"."enum__pages_v_blocks_archive_layout" AS ENUM('grid', 'list', 'cards', 'carousel');
  CREATE TYPE "public"."enum__pages_v_blocks_archive_columns" AS ENUM('2', '3', '4');
  CREATE TYPE "public"."enum__pages_v_blocks_form_style" AS ENUM('default', 'card', 'inline', 'fullWidth');
  CREATE TYPE "public"."enum__pages_v_blocks_form_background_color" AS ENUM('none', 'light', 'dark');
  CREATE TYPE "public"."enum__pages_v_blocks_gallery_layout" AS ENUM('grid', 'masonry', 'carousel', 'lightbox', 'slider');
  CREATE TYPE "public"."enum__pages_v_blocks_gallery_columns" AS ENUM('2', '3', '4', '5', '6');
  CREATE TYPE "public"."enum__pages_v_blocks_gallery_gap" AS ENUM('none', 'small', 'medium', 'large');
  CREATE TYPE "public"."enum__pages_v_blocks_gallery_aspect_ratio" AS ENUM('auto', 'square', 'landscape', 'portrait', 'wide');
  CREATE TYPE "public"."enum__pages_v_blocks_grid_style" AS ENUM('cards', 'features', 'icons', 'stats', 'team', 'testimonials', 'logos', 'agency-cards', 'agency-list');
  CREATE TYPE "public"."enum__pages_v_blocks_grid_columns" AS ENUM('1', '2', '3', '4', '5', '6');
  CREATE TYPE "public"."enum__pages_v_blocks_grid_gap" AS ENUM('none', 'small', 'medium', 'large');
  CREATE TYPE "public"."enum__pages_v_blocks_grid_alignment" AS ENUM('left', 'center', 'right');
  CREATE TYPE "public"."enum__pages_v_blocks_grid_hover_effect" AS ENUM('none', 'lift', 'scale', 'glow');
  CREATE TYPE "public"."enum__pages_v_blocks_timeline_layout" AS ENUM('vertical', 'alternating', 'horizontal', 'compact');
  CREATE TYPE "public"."enum__pages_v_blocks_timeline_line_style" AS ENUM('solid', 'dashed', 'dotted', 'gradient');
  CREATE TYPE "public"."enum__pages_v_blocks_timeline_marker_style" AS ENUM('circle', 'diamond', 'square', 'icon', 'number', 'image');
  CREATE TYPE "public"."enum__pages_v_blocks_timeline_sort_order" AS ENUM('chronological', 'reverse', 'manual');
  CREATE TYPE "public"."enum__pages_v_blocks_timeline_background_color" AS ENUM('transparent', 'light', 'dark', 'primary');
  CREATE TYPE "public"."enum__pages_v_blocks_spacer_style" AS ENUM('space', 'divider');
  CREATE TYPE "public"."enum__pages_v_blocks_spacer_size" AS ENUM('xs', 'sm', 'md', 'lg', 'xl');
  CREATE TYPE "public"."enum__pages_v_blocks_spacer_line_style" AS ENUM('solid', 'dashed', 'dotted');
  CREATE TYPE "public"."enum__pages_v_version_hero_type" AS ENUM('standard', 'minimal', 'fullscreen', 'none');
  CREATE TYPE "public"."enum__pages_v_version_template" AS ENUM('landing', 'home', 'detail', 'article', 'archive', 'showcase');
  CREATE TYPE "public"."enum__pages_v_version_status" AS ENUM('draft', 'published');
  CREATE TYPE "public"."enum_posts_blocks_hero_links_variant" AS ENUM('primary', 'secondary', 'outline');
  CREATE TYPE "public"."enum_posts_blocks_hero_variant" AS ENUM('standard', 'agency');
  CREATE TYPE "public"."enum_posts_blocks_hero_type" AS ENUM('standard', 'minimal', 'fullscreen', 'split', 'video');
  CREATE TYPE "public"."enum_posts_blocks_hero_overlay" AS ENUM('none', 'light', 'dark', 'gradient');
  CREATE TYPE "public"."enum_posts_blocks_hero_text_align" AS ENUM('left', 'center', 'right');
  CREATE TYPE "public"."enum_posts_blocks_content_columns_size" AS ENUM('oneThird', 'half', 'twoThirds', 'full');
  CREATE TYPE "public"."enum_posts_blocks_content_background_color" AS ENUM('none', 'light', 'dark', 'primary', 'secondary');
  CREATE TYPE "public"."enum_posts_blocks_content_padding_top" AS ENUM('none', 'small', 'medium', 'large');
  CREATE TYPE "public"."enum_posts_blocks_content_padding_bottom" AS ENUM('none', 'small', 'medium', 'large');
  CREATE TYPE "public"."enum_posts_blocks_media_size" AS ENUM('small', 'default', 'large', 'fullWidth');
  CREATE TYPE "public"."enum_posts_blocks_media_position" AS ENUM('left', 'center', 'right');
  CREATE TYPE "public"."enum_posts_blocks_cta_links_variant" AS ENUM('primary', 'secondary', 'outline');
  CREATE TYPE "public"."enum_posts_blocks_cta_style" AS ENUM('standard', 'banner', 'card', 'inline', 'agency');
  CREATE TYPE "public"."enum_posts_blocks_cta_background_color" AS ENUM('none', 'light', 'dark', 'primary', 'secondary');
  CREATE TYPE "public"."enum_posts_blocks_quote_align" AS ENUM('left', 'center', 'right');
  CREATE TYPE "public"."enum_posts_blocks_features_layout" AS ENUM('grid', 'list');
  CREATE TYPE "public"."enum_posts_blocks_testimonials_style" AS ENUM('standard', 'agency');
  CREATE TYPE "public"."enum_posts_blocks_embed_aspect_ratio" AS ENUM('16:9', '4:3', '1:1', '21:9');
  CREATE TYPE "public"."enum_posts_blocks_archive_populate_by" AS ENUM('collection', 'selection');
  CREATE TYPE "public"."enum_posts_blocks_archive_relation_to" AS ENUM('posts', 'pages', 'archive-items', 'people', 'places', 'custom-items');
  CREATE TYPE "public"."enum_posts_blocks_archive_layout" AS ENUM('grid', 'list', 'cards', 'carousel');
  CREATE TYPE "public"."enum_posts_blocks_archive_columns" AS ENUM('2', '3', '4');
  CREATE TYPE "public"."enum_posts_blocks_form_style" AS ENUM('default', 'card', 'inline', 'fullWidth');
  CREATE TYPE "public"."enum_posts_blocks_form_background_color" AS ENUM('none', 'light', 'dark');
  CREATE TYPE "public"."enum_posts_blocks_gallery_layout" AS ENUM('grid', 'masonry', 'carousel', 'lightbox', 'slider');
  CREATE TYPE "public"."enum_posts_blocks_gallery_columns" AS ENUM('2', '3', '4', '5', '6');
  CREATE TYPE "public"."enum_posts_blocks_gallery_gap" AS ENUM('none', 'small', 'medium', 'large');
  CREATE TYPE "public"."enum_posts_blocks_gallery_aspect_ratio" AS ENUM('auto', 'square', 'landscape', 'portrait', 'wide');
  CREATE TYPE "public"."enum_posts_blocks_grid_style" AS ENUM('cards', 'features', 'icons', 'stats', 'team', 'testimonials', 'logos', 'agency-cards', 'agency-list');
  CREATE TYPE "public"."enum_posts_blocks_grid_columns" AS ENUM('1', '2', '3', '4', '5', '6');
  CREATE TYPE "public"."enum_posts_blocks_grid_gap" AS ENUM('none', 'small', 'medium', 'large');
  CREATE TYPE "public"."enum_posts_blocks_grid_alignment" AS ENUM('left', 'center', 'right');
  CREATE TYPE "public"."enum_posts_blocks_grid_hover_effect" AS ENUM('none', 'lift', 'scale', 'glow');
  CREATE TYPE "public"."enum_posts_blocks_timeline_layout" AS ENUM('vertical', 'alternating', 'horizontal', 'compact');
  CREATE TYPE "public"."enum_posts_blocks_timeline_line_style" AS ENUM('solid', 'dashed', 'dotted', 'gradient');
  CREATE TYPE "public"."enum_posts_blocks_timeline_marker_style" AS ENUM('circle', 'diamond', 'square', 'icon', 'number', 'image');
  CREATE TYPE "public"."enum_posts_blocks_timeline_sort_order" AS ENUM('chronological', 'reverse', 'manual');
  CREATE TYPE "public"."enum_posts_blocks_timeline_background_color" AS ENUM('transparent', 'light', 'dark', 'primary');
  CREATE TYPE "public"."enum_posts_blocks_spacer_style" AS ENUM('space', 'divider');
  CREATE TYPE "public"."enum_posts_blocks_spacer_size" AS ENUM('xs', 'sm', 'md', 'lg', 'xl');
  CREATE TYPE "public"."enum_posts_blocks_spacer_line_style" AS ENUM('solid', 'dashed', 'dotted');
  CREATE TYPE "public"."enum_posts_template" AS ENUM('article', 'feature', 'brief', 'longform');
  CREATE TYPE "public"."enum_posts_status" AS ENUM('draft', 'published');
  CREATE TYPE "public"."enum__posts_v_blocks_hero_links_variant" AS ENUM('primary', 'secondary', 'outline');
  CREATE TYPE "public"."enum__posts_v_blocks_hero_variant" AS ENUM('standard', 'agency');
  CREATE TYPE "public"."enum__posts_v_blocks_hero_type" AS ENUM('standard', 'minimal', 'fullscreen', 'split', 'video');
  CREATE TYPE "public"."enum__posts_v_blocks_hero_overlay" AS ENUM('none', 'light', 'dark', 'gradient');
  CREATE TYPE "public"."enum__posts_v_blocks_hero_text_align" AS ENUM('left', 'center', 'right');
  CREATE TYPE "public"."enum__posts_v_blocks_content_columns_size" AS ENUM('oneThird', 'half', 'twoThirds', 'full');
  CREATE TYPE "public"."enum__posts_v_blocks_content_background_color" AS ENUM('none', 'light', 'dark', 'primary', 'secondary');
  CREATE TYPE "public"."enum__posts_v_blocks_content_padding_top" AS ENUM('none', 'small', 'medium', 'large');
  CREATE TYPE "public"."enum__posts_v_blocks_content_padding_bottom" AS ENUM('none', 'small', 'medium', 'large');
  CREATE TYPE "public"."enum__posts_v_blocks_media_size" AS ENUM('small', 'default', 'large', 'fullWidth');
  CREATE TYPE "public"."enum__posts_v_blocks_media_position" AS ENUM('left', 'center', 'right');
  CREATE TYPE "public"."enum__posts_v_blocks_cta_links_variant" AS ENUM('primary', 'secondary', 'outline');
  CREATE TYPE "public"."enum__posts_v_blocks_cta_style" AS ENUM('standard', 'banner', 'card', 'inline', 'agency');
  CREATE TYPE "public"."enum__posts_v_blocks_cta_background_color" AS ENUM('none', 'light', 'dark', 'primary', 'secondary');
  CREATE TYPE "public"."enum__posts_v_blocks_quote_align" AS ENUM('left', 'center', 'right');
  CREATE TYPE "public"."enum__posts_v_blocks_features_layout" AS ENUM('grid', 'list');
  CREATE TYPE "public"."enum__posts_v_blocks_testimonials_style" AS ENUM('standard', 'agency');
  CREATE TYPE "public"."enum__posts_v_blocks_embed_aspect_ratio" AS ENUM('16:9', '4:3', '1:1', '21:9');
  CREATE TYPE "public"."enum__posts_v_blocks_archive_populate_by" AS ENUM('collection', 'selection');
  CREATE TYPE "public"."enum__posts_v_blocks_archive_relation_to" AS ENUM('posts', 'pages', 'archive-items', 'people', 'places', 'custom-items');
  CREATE TYPE "public"."enum__posts_v_blocks_archive_layout" AS ENUM('grid', 'list', 'cards', 'carousel');
  CREATE TYPE "public"."enum__posts_v_blocks_archive_columns" AS ENUM('2', '3', '4');
  CREATE TYPE "public"."enum__posts_v_blocks_form_style" AS ENUM('default', 'card', 'inline', 'fullWidth');
  CREATE TYPE "public"."enum__posts_v_blocks_form_background_color" AS ENUM('none', 'light', 'dark');
  CREATE TYPE "public"."enum__posts_v_blocks_gallery_layout" AS ENUM('grid', 'masonry', 'carousel', 'lightbox', 'slider');
  CREATE TYPE "public"."enum__posts_v_blocks_gallery_columns" AS ENUM('2', '3', '4', '5', '6');
  CREATE TYPE "public"."enum__posts_v_blocks_gallery_gap" AS ENUM('none', 'small', 'medium', 'large');
  CREATE TYPE "public"."enum__posts_v_blocks_gallery_aspect_ratio" AS ENUM('auto', 'square', 'landscape', 'portrait', 'wide');
  CREATE TYPE "public"."enum__posts_v_blocks_grid_style" AS ENUM('cards', 'features', 'icons', 'stats', 'team', 'testimonials', 'logos', 'agency-cards', 'agency-list');
  CREATE TYPE "public"."enum__posts_v_blocks_grid_columns" AS ENUM('1', '2', '3', '4', '5', '6');
  CREATE TYPE "public"."enum__posts_v_blocks_grid_gap" AS ENUM('none', 'small', 'medium', 'large');
  CREATE TYPE "public"."enum__posts_v_blocks_grid_alignment" AS ENUM('left', 'center', 'right');
  CREATE TYPE "public"."enum__posts_v_blocks_grid_hover_effect" AS ENUM('none', 'lift', 'scale', 'glow');
  CREATE TYPE "public"."enum__posts_v_blocks_timeline_layout" AS ENUM('vertical', 'alternating', 'horizontal', 'compact');
  CREATE TYPE "public"."enum__posts_v_blocks_timeline_line_style" AS ENUM('solid', 'dashed', 'dotted', 'gradient');
  CREATE TYPE "public"."enum__posts_v_blocks_timeline_marker_style" AS ENUM('circle', 'diamond', 'square', 'icon', 'number', 'image');
  CREATE TYPE "public"."enum__posts_v_blocks_timeline_sort_order" AS ENUM('chronological', 'reverse', 'manual');
  CREATE TYPE "public"."enum__posts_v_blocks_timeline_background_color" AS ENUM('transparent', 'light', 'dark', 'primary');
  CREATE TYPE "public"."enum__posts_v_blocks_spacer_style" AS ENUM('space', 'divider');
  CREATE TYPE "public"."enum__posts_v_blocks_spacer_size" AS ENUM('xs', 'sm', 'md', 'lg', 'xl');
  CREATE TYPE "public"."enum__posts_v_blocks_spacer_line_style" AS ENUM('solid', 'dashed', 'dotted');
  CREATE TYPE "public"."enum__posts_v_version_template" AS ENUM('article', 'feature', 'brief', 'longform');
  CREATE TYPE "public"."enum__posts_v_version_status" AS ENUM('draft', 'published');
  CREATE TYPE "public"."enum_archive_items_blocks_hero_links_variant" AS ENUM('primary', 'secondary', 'outline');
  CREATE TYPE "public"."enum_archive_items_blocks_hero_variant" AS ENUM('standard', 'agency');
  CREATE TYPE "public"."enum_archive_items_blocks_hero_type" AS ENUM('standard', 'minimal', 'fullscreen', 'split', 'video');
  CREATE TYPE "public"."enum_archive_items_blocks_hero_overlay" AS ENUM('none', 'light', 'dark', 'gradient');
  CREATE TYPE "public"."enum_archive_items_blocks_hero_text_align" AS ENUM('left', 'center', 'right');
  CREATE TYPE "public"."enum_archive_items_blocks_content_columns_size" AS ENUM('oneThird', 'half', 'twoThirds', 'full');
  CREATE TYPE "public"."enum_archive_items_blocks_content_background_color" AS ENUM('none', 'light', 'dark', 'primary', 'secondary');
  CREATE TYPE "public"."enum_archive_items_blocks_content_padding_top" AS ENUM('none', 'small', 'medium', 'large');
  CREATE TYPE "public"."enum_archive_items_blocks_content_padding_bottom" AS ENUM('none', 'small', 'medium', 'large');
  CREATE TYPE "public"."enum_archive_items_blocks_media_size" AS ENUM('small', 'default', 'large', 'fullWidth');
  CREATE TYPE "public"."enum_archive_items_blocks_media_position" AS ENUM('left', 'center', 'right');
  CREATE TYPE "public"."enum_archive_items_blocks_cta_links_variant" AS ENUM('primary', 'secondary', 'outline');
  CREATE TYPE "public"."enum_archive_items_blocks_cta_style" AS ENUM('standard', 'banner', 'card', 'inline', 'agency');
  CREATE TYPE "public"."enum_archive_items_blocks_cta_background_color" AS ENUM('none', 'light', 'dark', 'primary', 'secondary');
  CREATE TYPE "public"."enum_archive_items_blocks_archive_populate_by" AS ENUM('collection', 'selection');
  CREATE TYPE "public"."enum_archive_items_blocks_archive_relation_to" AS ENUM('posts', 'pages', 'archive-items', 'people', 'places', 'custom-items');
  CREATE TYPE "public"."enum_archive_items_blocks_archive_layout" AS ENUM('grid', 'list', 'cards', 'carousel');
  CREATE TYPE "public"."enum_archive_items_blocks_archive_columns" AS ENUM('2', '3', '4');
  CREATE TYPE "public"."enum_archive_items_blocks_form_style" AS ENUM('default', 'card', 'inline', 'fullWidth');
  CREATE TYPE "public"."enum_archive_items_blocks_form_background_color" AS ENUM('none', 'light', 'dark');
  CREATE TYPE "public"."enum_archive_items_blocks_gallery_layout" AS ENUM('grid', 'masonry', 'carousel', 'lightbox', 'slider');
  CREATE TYPE "public"."enum_archive_items_blocks_gallery_columns" AS ENUM('2', '3', '4', '5', '6');
  CREATE TYPE "public"."enum_archive_items_blocks_gallery_gap" AS ENUM('none', 'small', 'medium', 'large');
  CREATE TYPE "public"."enum_archive_items_blocks_gallery_aspect_ratio" AS ENUM('auto', 'square', 'landscape', 'portrait', 'wide');
  CREATE TYPE "public"."enum_archive_items_blocks_grid_style" AS ENUM('cards', 'features', 'icons', 'stats', 'team', 'testimonials', 'logos', 'agency-cards', 'agency-list');
  CREATE TYPE "public"."enum_archive_items_blocks_grid_columns" AS ENUM('1', '2', '3', '4', '5', '6');
  CREATE TYPE "public"."enum_archive_items_blocks_grid_gap" AS ENUM('none', 'small', 'medium', 'large');
  CREATE TYPE "public"."enum_archive_items_blocks_grid_alignment" AS ENUM('left', 'center', 'right');
  CREATE TYPE "public"."enum_archive_items_blocks_grid_hover_effect" AS ENUM('none', 'lift', 'scale', 'glow');
  CREATE TYPE "public"."enum_archive_items_blocks_timeline_layout" AS ENUM('vertical', 'alternating', 'horizontal', 'compact');
  CREATE TYPE "public"."enum_archive_items_blocks_timeline_line_style" AS ENUM('solid', 'dashed', 'dotted', 'gradient');
  CREATE TYPE "public"."enum_archive_items_blocks_timeline_marker_style" AS ENUM('circle', 'diamond', 'square', 'icon', 'number', 'image');
  CREATE TYPE "public"."enum_archive_items_blocks_timeline_sort_order" AS ENUM('chronological', 'reverse', 'manual');
  CREATE TYPE "public"."enum_archive_items_blocks_timeline_background_color" AS ENUM('transparent', 'light', 'dark', 'primary');
  CREATE TYPE "public"."enum_archive_items_template" AS ENUM('detail', 'gallery', 'timeline');
  CREATE TYPE "public"."enum_archive_items_status" AS ENUM('draft', 'published');
  CREATE TYPE "public"."enum__archive_items_v_blocks_hero_links_variant" AS ENUM('primary', 'secondary', 'outline');
  CREATE TYPE "public"."enum__archive_items_v_blocks_hero_variant" AS ENUM('standard', 'agency');
  CREATE TYPE "public"."enum__archive_items_v_blocks_hero_type" AS ENUM('standard', 'minimal', 'fullscreen', 'split', 'video');
  CREATE TYPE "public"."enum__archive_items_v_blocks_hero_overlay" AS ENUM('none', 'light', 'dark', 'gradient');
  CREATE TYPE "public"."enum__archive_items_v_blocks_hero_text_align" AS ENUM('left', 'center', 'right');
  CREATE TYPE "public"."enum__archive_items_v_blocks_content_columns_size" AS ENUM('oneThird', 'half', 'twoThirds', 'full');
  CREATE TYPE "public"."enum__archive_items_v_blocks_content_background_color" AS ENUM('none', 'light', 'dark', 'primary', 'secondary');
  CREATE TYPE "public"."enum__archive_items_v_blocks_content_padding_top" AS ENUM('none', 'small', 'medium', 'large');
  CREATE TYPE "public"."enum__archive_items_v_blocks_content_padding_bottom" AS ENUM('none', 'small', 'medium', 'large');
  CREATE TYPE "public"."enum__archive_items_v_blocks_media_size" AS ENUM('small', 'default', 'large', 'fullWidth');
  CREATE TYPE "public"."enum__archive_items_v_blocks_media_position" AS ENUM('left', 'center', 'right');
  CREATE TYPE "public"."enum__archive_items_v_blocks_cta_links_variant" AS ENUM('primary', 'secondary', 'outline');
  CREATE TYPE "public"."enum__archive_items_v_blocks_cta_style" AS ENUM('standard', 'banner', 'card', 'inline', 'agency');
  CREATE TYPE "public"."enum__archive_items_v_blocks_cta_background_color" AS ENUM('none', 'light', 'dark', 'primary', 'secondary');
  CREATE TYPE "public"."enum__archive_items_v_blocks_archive_populate_by" AS ENUM('collection', 'selection');
  CREATE TYPE "public"."enum__archive_items_v_blocks_archive_relation_to" AS ENUM('posts', 'pages', 'archive-items', 'people', 'places', 'custom-items');
  CREATE TYPE "public"."enum__archive_items_v_blocks_archive_layout" AS ENUM('grid', 'list', 'cards', 'carousel');
  CREATE TYPE "public"."enum__archive_items_v_blocks_archive_columns" AS ENUM('2', '3', '4');
  CREATE TYPE "public"."enum__archive_items_v_blocks_form_style" AS ENUM('default', 'card', 'inline', 'fullWidth');
  CREATE TYPE "public"."enum__archive_items_v_blocks_form_background_color" AS ENUM('none', 'light', 'dark');
  CREATE TYPE "public"."enum__archive_items_v_blocks_gallery_layout" AS ENUM('grid', 'masonry', 'carousel', 'lightbox', 'slider');
  CREATE TYPE "public"."enum__archive_items_v_blocks_gallery_columns" AS ENUM('2', '3', '4', '5', '6');
  CREATE TYPE "public"."enum__archive_items_v_blocks_gallery_gap" AS ENUM('none', 'small', 'medium', 'large');
  CREATE TYPE "public"."enum__archive_items_v_blocks_gallery_aspect_ratio" AS ENUM('auto', 'square', 'landscape', 'portrait', 'wide');
  CREATE TYPE "public"."enum__archive_items_v_blocks_grid_style" AS ENUM('cards', 'features', 'icons', 'stats', 'team', 'testimonials', 'logos', 'agency-cards', 'agency-list');
  CREATE TYPE "public"."enum__archive_items_v_blocks_grid_columns" AS ENUM('1', '2', '3', '4', '5', '6');
  CREATE TYPE "public"."enum__archive_items_v_blocks_grid_gap" AS ENUM('none', 'small', 'medium', 'large');
  CREATE TYPE "public"."enum__archive_items_v_blocks_grid_alignment" AS ENUM('left', 'center', 'right');
  CREATE TYPE "public"."enum__archive_items_v_blocks_grid_hover_effect" AS ENUM('none', 'lift', 'scale', 'glow');
  CREATE TYPE "public"."enum__archive_items_v_blocks_timeline_layout" AS ENUM('vertical', 'alternating', 'horizontal', 'compact');
  CREATE TYPE "public"."enum__archive_items_v_blocks_timeline_line_style" AS ENUM('solid', 'dashed', 'dotted', 'gradient');
  CREATE TYPE "public"."enum__archive_items_v_blocks_timeline_marker_style" AS ENUM('circle', 'diamond', 'square', 'icon', 'number', 'image');
  CREATE TYPE "public"."enum__archive_items_v_blocks_timeline_sort_order" AS ENUM('chronological', 'reverse', 'manual');
  CREATE TYPE "public"."enum__archive_items_v_blocks_timeline_background_color" AS ENUM('transparent', 'light', 'dark', 'primary');
  CREATE TYPE "public"."enum__archive_items_v_version_template" AS ENUM('detail', 'gallery', 'timeline');
  CREATE TYPE "public"."enum__archive_items_v_version_status" AS ENUM('draft', 'published');
  CREATE TYPE "public"."enum_people_role" AS ENUM('artist', 'sculptor', 'architect', 'craftsman', 'patron', 'collector', 'ruler', 'scholar', 'team', 'contributor', 'other');
  CREATE TYPE "public"."enum_people_social_links_platform" AS ENUM('linkedin', 'twitter', 'instagram', 'facebook', 'youtube', 'github', 'other');
  CREATE TYPE "public"."enum_people_blocks_hero_links_variant" AS ENUM('primary', 'secondary', 'outline');
  CREATE TYPE "public"."enum_people_blocks_hero_variant" AS ENUM('standard', 'agency');
  CREATE TYPE "public"."enum_people_blocks_hero_type" AS ENUM('standard', 'minimal', 'fullscreen', 'split', 'video');
  CREATE TYPE "public"."enum_people_blocks_hero_overlay" AS ENUM('none', 'light', 'dark', 'gradient');
  CREATE TYPE "public"."enum_people_blocks_hero_text_align" AS ENUM('left', 'center', 'right');
  CREATE TYPE "public"."enum_people_blocks_content_columns_size" AS ENUM('oneThird', 'half', 'twoThirds', 'full');
  CREATE TYPE "public"."enum_people_blocks_content_background_color" AS ENUM('none', 'light', 'dark', 'primary', 'secondary');
  CREATE TYPE "public"."enum_people_blocks_content_padding_top" AS ENUM('none', 'small', 'medium', 'large');
  CREATE TYPE "public"."enum_people_blocks_content_padding_bottom" AS ENUM('none', 'small', 'medium', 'large');
  CREATE TYPE "public"."enum_people_blocks_media_size" AS ENUM('small', 'default', 'large', 'fullWidth');
  CREATE TYPE "public"."enum_people_blocks_media_position" AS ENUM('left', 'center', 'right');
  CREATE TYPE "public"."enum_people_blocks_cta_links_variant" AS ENUM('primary', 'secondary', 'outline');
  CREATE TYPE "public"."enum_people_blocks_cta_style" AS ENUM('standard', 'banner', 'card', 'inline', 'agency');
  CREATE TYPE "public"."enum_people_blocks_cta_background_color" AS ENUM('none', 'light', 'dark', 'primary', 'secondary');
  CREATE TYPE "public"."enum_people_blocks_quote_align" AS ENUM('left', 'center', 'right');
  CREATE TYPE "public"."enum_people_blocks_features_layout" AS ENUM('grid', 'list');
  CREATE TYPE "public"."enum_people_blocks_testimonials_style" AS ENUM('standard', 'agency');
  CREATE TYPE "public"."enum_people_blocks_embed_aspect_ratio" AS ENUM('16:9', '4:3', '1:1', '21:9');
  CREATE TYPE "public"."enum_people_blocks_archive_populate_by" AS ENUM('collection', 'selection');
  CREATE TYPE "public"."enum_people_blocks_archive_relation_to" AS ENUM('posts', 'pages', 'archive-items', 'people', 'places', 'custom-items');
  CREATE TYPE "public"."enum_people_blocks_archive_layout" AS ENUM('grid', 'list', 'cards', 'carousel');
  CREATE TYPE "public"."enum_people_blocks_archive_columns" AS ENUM('2', '3', '4');
  CREATE TYPE "public"."enum_people_blocks_form_style" AS ENUM('default', 'card', 'inline', 'fullWidth');
  CREATE TYPE "public"."enum_people_blocks_form_background_color" AS ENUM('none', 'light', 'dark');
  CREATE TYPE "public"."enum_people_blocks_gallery_layout" AS ENUM('grid', 'masonry', 'carousel', 'lightbox', 'slider');
  CREATE TYPE "public"."enum_people_blocks_gallery_columns" AS ENUM('2', '3', '4', '5', '6');
  CREATE TYPE "public"."enum_people_blocks_gallery_gap" AS ENUM('none', 'small', 'medium', 'large');
  CREATE TYPE "public"."enum_people_blocks_gallery_aspect_ratio" AS ENUM('auto', 'square', 'landscape', 'portrait', 'wide');
  CREATE TYPE "public"."enum_people_blocks_grid_style" AS ENUM('cards', 'features', 'icons', 'stats', 'team', 'testimonials', 'logos', 'agency-cards', 'agency-list');
  CREATE TYPE "public"."enum_people_blocks_grid_columns" AS ENUM('1', '2', '3', '4', '5', '6');
  CREATE TYPE "public"."enum_people_blocks_grid_gap" AS ENUM('none', 'small', 'medium', 'large');
  CREATE TYPE "public"."enum_people_blocks_grid_alignment" AS ENUM('left', 'center', 'right');
  CREATE TYPE "public"."enum_people_blocks_grid_hover_effect" AS ENUM('none', 'lift', 'scale', 'glow');
  CREATE TYPE "public"."enum_people_blocks_timeline_layout" AS ENUM('vertical', 'alternating', 'horizontal', 'compact');
  CREATE TYPE "public"."enum_people_blocks_timeline_line_style" AS ENUM('solid', 'dashed', 'dotted', 'gradient');
  CREATE TYPE "public"."enum_people_blocks_timeline_marker_style" AS ENUM('circle', 'diamond', 'square', 'icon', 'number', 'image');
  CREATE TYPE "public"."enum_people_blocks_timeline_sort_order" AS ENUM('chronological', 'reverse', 'manual');
  CREATE TYPE "public"."enum_people_blocks_timeline_background_color" AS ENUM('transparent', 'light', 'dark', 'primary');
  CREATE TYPE "public"."enum_people_blocks_spacer_style" AS ENUM('space', 'divider');
  CREATE TYPE "public"."enum_people_blocks_spacer_size" AS ENUM('xs', 'sm', 'md', 'lg', 'xl');
  CREATE TYPE "public"."enum_people_blocks_spacer_line_style" AS ENUM('solid', 'dashed', 'dotted');
  CREATE TYPE "public"."enum_people_template" AS ENUM('profile', 'card', 'biography');
  CREATE TYPE "public"."enum_people_status" AS ENUM('draft', 'published');
  CREATE TYPE "public"."enum__people_v_version_role" AS ENUM('artist', 'sculptor', 'architect', 'craftsman', 'patron', 'collector', 'ruler', 'scholar', 'team', 'contributor', 'other');
  CREATE TYPE "public"."enum__people_v_version_social_links_platform" AS ENUM('linkedin', 'twitter', 'instagram', 'facebook', 'youtube', 'github', 'other');
  CREATE TYPE "public"."enum__people_v_blocks_hero_links_variant" AS ENUM('primary', 'secondary', 'outline');
  CREATE TYPE "public"."enum__people_v_blocks_hero_variant" AS ENUM('standard', 'agency');
  CREATE TYPE "public"."enum__people_v_blocks_hero_type" AS ENUM('standard', 'minimal', 'fullscreen', 'split', 'video');
  CREATE TYPE "public"."enum__people_v_blocks_hero_overlay" AS ENUM('none', 'light', 'dark', 'gradient');
  CREATE TYPE "public"."enum__people_v_blocks_hero_text_align" AS ENUM('left', 'center', 'right');
  CREATE TYPE "public"."enum__people_v_blocks_content_columns_size" AS ENUM('oneThird', 'half', 'twoThirds', 'full');
  CREATE TYPE "public"."enum__people_v_blocks_content_background_color" AS ENUM('none', 'light', 'dark', 'primary', 'secondary');
  CREATE TYPE "public"."enum__people_v_blocks_content_padding_top" AS ENUM('none', 'small', 'medium', 'large');
  CREATE TYPE "public"."enum__people_v_blocks_content_padding_bottom" AS ENUM('none', 'small', 'medium', 'large');
  CREATE TYPE "public"."enum__people_v_blocks_media_size" AS ENUM('small', 'default', 'large', 'fullWidth');
  CREATE TYPE "public"."enum__people_v_blocks_media_position" AS ENUM('left', 'center', 'right');
  CREATE TYPE "public"."enum__people_v_blocks_cta_links_variant" AS ENUM('primary', 'secondary', 'outline');
  CREATE TYPE "public"."enum__people_v_blocks_cta_style" AS ENUM('standard', 'banner', 'card', 'inline', 'agency');
  CREATE TYPE "public"."enum__people_v_blocks_cta_background_color" AS ENUM('none', 'light', 'dark', 'primary', 'secondary');
  CREATE TYPE "public"."enum__people_v_blocks_quote_align" AS ENUM('left', 'center', 'right');
  CREATE TYPE "public"."enum__people_v_blocks_features_layout" AS ENUM('grid', 'list');
  CREATE TYPE "public"."enum__people_v_blocks_testimonials_style" AS ENUM('standard', 'agency');
  CREATE TYPE "public"."enum__people_v_blocks_embed_aspect_ratio" AS ENUM('16:9', '4:3', '1:1', '21:9');
  CREATE TYPE "public"."enum__people_v_blocks_archive_populate_by" AS ENUM('collection', 'selection');
  CREATE TYPE "public"."enum__people_v_blocks_archive_relation_to" AS ENUM('posts', 'pages', 'archive-items', 'people', 'places', 'custom-items');
  CREATE TYPE "public"."enum__people_v_blocks_archive_layout" AS ENUM('grid', 'list', 'cards', 'carousel');
  CREATE TYPE "public"."enum__people_v_blocks_archive_columns" AS ENUM('2', '3', '4');
  CREATE TYPE "public"."enum__people_v_blocks_form_style" AS ENUM('default', 'card', 'inline', 'fullWidth');
  CREATE TYPE "public"."enum__people_v_blocks_form_background_color" AS ENUM('none', 'light', 'dark');
  CREATE TYPE "public"."enum__people_v_blocks_gallery_layout" AS ENUM('grid', 'masonry', 'carousel', 'lightbox', 'slider');
  CREATE TYPE "public"."enum__people_v_blocks_gallery_columns" AS ENUM('2', '3', '4', '5', '6');
  CREATE TYPE "public"."enum__people_v_blocks_gallery_gap" AS ENUM('none', 'small', 'medium', 'large');
  CREATE TYPE "public"."enum__people_v_blocks_gallery_aspect_ratio" AS ENUM('auto', 'square', 'landscape', 'portrait', 'wide');
  CREATE TYPE "public"."enum__people_v_blocks_grid_style" AS ENUM('cards', 'features', 'icons', 'stats', 'team', 'testimonials', 'logos', 'agency-cards', 'agency-list');
  CREATE TYPE "public"."enum__people_v_blocks_grid_columns" AS ENUM('1', '2', '3', '4', '5', '6');
  CREATE TYPE "public"."enum__people_v_blocks_grid_gap" AS ENUM('none', 'small', 'medium', 'large');
  CREATE TYPE "public"."enum__people_v_blocks_grid_alignment" AS ENUM('left', 'center', 'right');
  CREATE TYPE "public"."enum__people_v_blocks_grid_hover_effect" AS ENUM('none', 'lift', 'scale', 'glow');
  CREATE TYPE "public"."enum__people_v_blocks_timeline_layout" AS ENUM('vertical', 'alternating', 'horizontal', 'compact');
  CREATE TYPE "public"."enum__people_v_blocks_timeline_line_style" AS ENUM('solid', 'dashed', 'dotted', 'gradient');
  CREATE TYPE "public"."enum__people_v_blocks_timeline_marker_style" AS ENUM('circle', 'diamond', 'square', 'icon', 'number', 'image');
  CREATE TYPE "public"."enum__people_v_blocks_timeline_sort_order" AS ENUM('chronological', 'reverse', 'manual');
  CREATE TYPE "public"."enum__people_v_blocks_timeline_background_color" AS ENUM('transparent', 'light', 'dark', 'primary');
  CREATE TYPE "public"."enum__people_v_blocks_spacer_style" AS ENUM('space', 'divider');
  CREATE TYPE "public"."enum__people_v_blocks_spacer_size" AS ENUM('xs', 'sm', 'md', 'lg', 'xl');
  CREATE TYPE "public"."enum__people_v_blocks_spacer_line_style" AS ENUM('solid', 'dashed', 'dotted');
  CREATE TYPE "public"."enum__people_v_version_template" AS ENUM('profile', 'card', 'biography');
  CREATE TYPE "public"."enum__people_v_version_status" AS ENUM('draft', 'published');
  CREATE TYPE "public"."enum_places_hours_day" AS ENUM('monday', 'tuesday', 'wednesday', 'thursday', 'friday', 'saturday', 'sunday');
  CREATE TYPE "public"."enum_places_blocks_hero_links_variant" AS ENUM('primary', 'secondary', 'outline');
  CREATE TYPE "public"."enum_places_blocks_hero_variant" AS ENUM('standard', 'agency');
  CREATE TYPE "public"."enum_places_blocks_hero_type" AS ENUM('standard', 'minimal', 'fullscreen', 'split', 'video');
  CREATE TYPE "public"."enum_places_blocks_hero_overlay" AS ENUM('none', 'light', 'dark', 'gradient');
  CREATE TYPE "public"."enum_places_blocks_hero_text_align" AS ENUM('left', 'center', 'right');
  CREATE TYPE "public"."enum_places_blocks_content_columns_size" AS ENUM('oneThird', 'half', 'twoThirds', 'full');
  CREATE TYPE "public"."enum_places_blocks_content_background_color" AS ENUM('none', 'light', 'dark', 'primary', 'secondary');
  CREATE TYPE "public"."enum_places_blocks_content_padding_top" AS ENUM('none', 'small', 'medium', 'large');
  CREATE TYPE "public"."enum_places_blocks_content_padding_bottom" AS ENUM('none', 'small', 'medium', 'large');
  CREATE TYPE "public"."enum_places_blocks_media_size" AS ENUM('small', 'default', 'large', 'fullWidth');
  CREATE TYPE "public"."enum_places_blocks_media_position" AS ENUM('left', 'center', 'right');
  CREATE TYPE "public"."enum_places_blocks_cta_links_variant" AS ENUM('primary', 'secondary', 'outline');
  CREATE TYPE "public"."enum_places_blocks_cta_style" AS ENUM('standard', 'banner', 'card', 'inline', 'agency');
  CREATE TYPE "public"."enum_places_blocks_cta_background_color" AS ENUM('none', 'light', 'dark', 'primary', 'secondary');
  CREATE TYPE "public"."enum_places_blocks_quote_align" AS ENUM('left', 'center', 'right');
  CREATE TYPE "public"."enum_places_blocks_features_layout" AS ENUM('grid', 'list');
  CREATE TYPE "public"."enum_places_blocks_testimonials_style" AS ENUM('standard', 'agency');
  CREATE TYPE "public"."enum_places_blocks_embed_aspect_ratio" AS ENUM('16:9', '4:3', '1:1', '21:9');
  CREATE TYPE "public"."enum_places_blocks_archive_populate_by" AS ENUM('collection', 'selection');
  CREATE TYPE "public"."enum_places_blocks_archive_relation_to" AS ENUM('posts', 'pages', 'archive-items', 'people', 'places', 'custom-items');
  CREATE TYPE "public"."enum_places_blocks_archive_layout" AS ENUM('grid', 'list', 'cards', 'carousel');
  CREATE TYPE "public"."enum_places_blocks_archive_columns" AS ENUM('2', '3', '4');
  CREATE TYPE "public"."enum_places_blocks_form_style" AS ENUM('default', 'card', 'inline', 'fullWidth');
  CREATE TYPE "public"."enum_places_blocks_form_background_color" AS ENUM('none', 'light', 'dark');
  CREATE TYPE "public"."enum_places_blocks_gallery_layout" AS ENUM('grid', 'masonry', 'carousel', 'lightbox', 'slider');
  CREATE TYPE "public"."enum_places_blocks_gallery_columns" AS ENUM('2', '3', '4', '5', '6');
  CREATE TYPE "public"."enum_places_blocks_gallery_gap" AS ENUM('none', 'small', 'medium', 'large');
  CREATE TYPE "public"."enum_places_blocks_gallery_aspect_ratio" AS ENUM('auto', 'square', 'landscape', 'portrait', 'wide');
  CREATE TYPE "public"."enum_places_blocks_grid_style" AS ENUM('cards', 'features', 'icons', 'stats', 'team', 'testimonials', 'logos', 'agency-cards', 'agency-list');
  CREATE TYPE "public"."enum_places_blocks_grid_columns" AS ENUM('1', '2', '3', '4', '5', '6');
  CREATE TYPE "public"."enum_places_blocks_grid_gap" AS ENUM('none', 'small', 'medium', 'large');
  CREATE TYPE "public"."enum_places_blocks_grid_alignment" AS ENUM('left', 'center', 'right');
  CREATE TYPE "public"."enum_places_blocks_grid_hover_effect" AS ENUM('none', 'lift', 'scale', 'glow');
  CREATE TYPE "public"."enum_places_blocks_timeline_layout" AS ENUM('vertical', 'alternating', 'horizontal', 'compact');
  CREATE TYPE "public"."enum_places_blocks_timeline_line_style" AS ENUM('solid', 'dashed', 'dotted', 'gradient');
  CREATE TYPE "public"."enum_places_blocks_timeline_marker_style" AS ENUM('circle', 'diamond', 'square', 'icon', 'number', 'image');
  CREATE TYPE "public"."enum_places_blocks_timeline_sort_order" AS ENUM('chronological', 'reverse', 'manual');
  CREATE TYPE "public"."enum_places_blocks_timeline_background_color" AS ENUM('transparent', 'light', 'dark', 'primary');
  CREATE TYPE "public"."enum_places_blocks_spacer_style" AS ENUM('space', 'divider');
  CREATE TYPE "public"."enum_places_blocks_spacer_size" AS ENUM('xs', 'sm', 'md', 'lg', 'xl');
  CREATE TYPE "public"."enum_places_blocks_spacer_line_style" AS ENUM('solid', 'dashed', 'dotted');
  CREATE TYPE "public"."enum_places_template" AS ENUM('location', 'map', 'card');
  CREATE TYPE "public"."enum_places_place_type" AS ENUM('city', 'region', 'country', 'venue', 'store', 'museum', 'archaeological', 'historical', 'other');
  CREATE TYPE "public"."enum_places_status" AS ENUM('draft', 'published');
  CREATE TYPE "public"."enum__places_v_version_hours_day" AS ENUM('monday', 'tuesday', 'wednesday', 'thursday', 'friday', 'saturday', 'sunday');
  CREATE TYPE "public"."enum__places_v_blocks_hero_links_variant" AS ENUM('primary', 'secondary', 'outline');
  CREATE TYPE "public"."enum__places_v_blocks_hero_variant" AS ENUM('standard', 'agency');
  CREATE TYPE "public"."enum__places_v_blocks_hero_type" AS ENUM('standard', 'minimal', 'fullscreen', 'split', 'video');
  CREATE TYPE "public"."enum__places_v_blocks_hero_overlay" AS ENUM('none', 'light', 'dark', 'gradient');
  CREATE TYPE "public"."enum__places_v_blocks_hero_text_align" AS ENUM('left', 'center', 'right');
  CREATE TYPE "public"."enum__places_v_blocks_content_columns_size" AS ENUM('oneThird', 'half', 'twoThirds', 'full');
  CREATE TYPE "public"."enum__places_v_blocks_content_background_color" AS ENUM('none', 'light', 'dark', 'primary', 'secondary');
  CREATE TYPE "public"."enum__places_v_blocks_content_padding_top" AS ENUM('none', 'small', 'medium', 'large');
  CREATE TYPE "public"."enum__places_v_blocks_content_padding_bottom" AS ENUM('none', 'small', 'medium', 'large');
  CREATE TYPE "public"."enum__places_v_blocks_media_size" AS ENUM('small', 'default', 'large', 'fullWidth');
  CREATE TYPE "public"."enum__places_v_blocks_media_position" AS ENUM('left', 'center', 'right');
  CREATE TYPE "public"."enum__places_v_blocks_cta_links_variant" AS ENUM('primary', 'secondary', 'outline');
  CREATE TYPE "public"."enum__places_v_blocks_cta_style" AS ENUM('standard', 'banner', 'card', 'inline', 'agency');
  CREATE TYPE "public"."enum__places_v_blocks_cta_background_color" AS ENUM('none', 'light', 'dark', 'primary', 'secondary');
  CREATE TYPE "public"."enum__places_v_blocks_quote_align" AS ENUM('left', 'center', 'right');
  CREATE TYPE "public"."enum__places_v_blocks_features_layout" AS ENUM('grid', 'list');
  CREATE TYPE "public"."enum__places_v_blocks_testimonials_style" AS ENUM('standard', 'agency');
  CREATE TYPE "public"."enum__places_v_blocks_embed_aspect_ratio" AS ENUM('16:9', '4:3', '1:1', '21:9');
  CREATE TYPE "public"."enum__places_v_blocks_archive_populate_by" AS ENUM('collection', 'selection');
  CREATE TYPE "public"."enum__places_v_blocks_archive_relation_to" AS ENUM('posts', 'pages', 'archive-items', 'people', 'places', 'custom-items');
  CREATE TYPE "public"."enum__places_v_blocks_archive_layout" AS ENUM('grid', 'list', 'cards', 'carousel');
  CREATE TYPE "public"."enum__places_v_blocks_archive_columns" AS ENUM('2', '3', '4');
  CREATE TYPE "public"."enum__places_v_blocks_form_style" AS ENUM('default', 'card', 'inline', 'fullWidth');
  CREATE TYPE "public"."enum__places_v_blocks_form_background_color" AS ENUM('none', 'light', 'dark');
  CREATE TYPE "public"."enum__places_v_blocks_gallery_layout" AS ENUM('grid', 'masonry', 'carousel', 'lightbox', 'slider');
  CREATE TYPE "public"."enum__places_v_blocks_gallery_columns" AS ENUM('2', '3', '4', '5', '6');
  CREATE TYPE "public"."enum__places_v_blocks_gallery_gap" AS ENUM('none', 'small', 'medium', 'large');
  CREATE TYPE "public"."enum__places_v_blocks_gallery_aspect_ratio" AS ENUM('auto', 'square', 'landscape', 'portrait', 'wide');
  CREATE TYPE "public"."enum__places_v_blocks_grid_style" AS ENUM('cards', 'features', 'icons', 'stats', 'team', 'testimonials', 'logos', 'agency-cards', 'agency-list');
  CREATE TYPE "public"."enum__places_v_blocks_grid_columns" AS ENUM('1', '2', '3', '4', '5', '6');
  CREATE TYPE "public"."enum__places_v_blocks_grid_gap" AS ENUM('none', 'small', 'medium', 'large');
  CREATE TYPE "public"."enum__places_v_blocks_grid_alignment" AS ENUM('left', 'center', 'right');
  CREATE TYPE "public"."enum__places_v_blocks_grid_hover_effect" AS ENUM('none', 'lift', 'scale', 'glow');
  CREATE TYPE "public"."enum__places_v_blocks_timeline_layout" AS ENUM('vertical', 'alternating', 'horizontal', 'compact');
  CREATE TYPE "public"."enum__places_v_blocks_timeline_line_style" AS ENUM('solid', 'dashed', 'dotted', 'gradient');
  CREATE TYPE "public"."enum__places_v_blocks_timeline_marker_style" AS ENUM('circle', 'diamond', 'square', 'icon', 'number', 'image');
  CREATE TYPE "public"."enum__places_v_blocks_timeline_sort_order" AS ENUM('chronological', 'reverse', 'manual');
  CREATE TYPE "public"."enum__places_v_blocks_timeline_background_color" AS ENUM('transparent', 'light', 'dark', 'primary');
  CREATE TYPE "public"."enum__places_v_blocks_spacer_style" AS ENUM('space', 'divider');
  CREATE TYPE "public"."enum__places_v_blocks_spacer_size" AS ENUM('xs', 'sm', 'md', 'lg', 'xl');
  CREATE TYPE "public"."enum__places_v_blocks_spacer_line_style" AS ENUM('solid', 'dashed', 'dotted');
  CREATE TYPE "public"."enum__places_v_version_template" AS ENUM('location', 'map', 'card');
  CREATE TYPE "public"."enum__places_v_version_place_type" AS ENUM('city', 'region', 'country', 'venue', 'store', 'museum', 'archaeological', 'historical', 'other');
  CREATE TYPE "public"."enum__places_v_version_status" AS ENUM('draft', 'published');
  CREATE TYPE "public"."enum_events_blocks_hero_links_variant" AS ENUM('primary', 'secondary', 'outline');
  CREATE TYPE "public"."enum_events_blocks_hero_variant" AS ENUM('standard', 'agency');
  CREATE TYPE "public"."enum_events_blocks_hero_type" AS ENUM('standard', 'minimal', 'fullscreen', 'split', 'video');
  CREATE TYPE "public"."enum_events_blocks_hero_overlay" AS ENUM('none', 'light', 'dark', 'gradient');
  CREATE TYPE "public"."enum_events_blocks_hero_text_align" AS ENUM('left', 'center', 'right');
  CREATE TYPE "public"."enum_events_blocks_content_columns_size" AS ENUM('oneThird', 'half', 'twoThirds', 'full');
  CREATE TYPE "public"."enum_events_blocks_content_background_color" AS ENUM('none', 'light', 'dark', 'primary', 'secondary');
  CREATE TYPE "public"."enum_events_blocks_content_padding_top" AS ENUM('none', 'small', 'medium', 'large');
  CREATE TYPE "public"."enum_events_blocks_content_padding_bottom" AS ENUM('none', 'small', 'medium', 'large');
  CREATE TYPE "public"."enum_events_blocks_media_size" AS ENUM('small', 'default', 'large', 'fullWidth');
  CREATE TYPE "public"."enum_events_blocks_media_position" AS ENUM('left', 'center', 'right');
  CREATE TYPE "public"."enum_events_blocks_cta_links_variant" AS ENUM('primary', 'secondary', 'outline');
  CREATE TYPE "public"."enum_events_blocks_cta_style" AS ENUM('standard', 'banner', 'card', 'inline', 'agency');
  CREATE TYPE "public"."enum_events_blocks_cta_background_color" AS ENUM('none', 'light', 'dark', 'primary', 'secondary');
  CREATE TYPE "public"."enum_events_blocks_archive_populate_by" AS ENUM('collection', 'selection');
  CREATE TYPE "public"."enum_events_blocks_archive_relation_to" AS ENUM('posts', 'pages', 'archive-items', 'people', 'places', 'custom-items');
  CREATE TYPE "public"."enum_events_blocks_archive_layout" AS ENUM('grid', 'list', 'cards', 'carousel');
  CREATE TYPE "public"."enum_events_blocks_archive_columns" AS ENUM('2', '3', '4');
  CREATE TYPE "public"."enum_events_blocks_form_style" AS ENUM('default', 'card', 'inline', 'fullWidth');
  CREATE TYPE "public"."enum_events_blocks_form_background_color" AS ENUM('none', 'light', 'dark');
  CREATE TYPE "public"."enum_events_blocks_gallery_layout" AS ENUM('grid', 'masonry', 'carousel', 'lightbox', 'slider');
  CREATE TYPE "public"."enum_events_blocks_gallery_columns" AS ENUM('2', '3', '4', '5', '6');
  CREATE TYPE "public"."enum_events_blocks_gallery_gap" AS ENUM('none', 'small', 'medium', 'large');
  CREATE TYPE "public"."enum_events_blocks_gallery_aspect_ratio" AS ENUM('auto', 'square', 'landscape', 'portrait', 'wide');
  CREATE TYPE "public"."enum_events_blocks_grid_style" AS ENUM('cards', 'features', 'icons', 'stats', 'team', 'testimonials', 'logos', 'agency-cards', 'agency-list');
  CREATE TYPE "public"."enum_events_blocks_grid_columns" AS ENUM('1', '2', '3', '4', '5', '6');
  CREATE TYPE "public"."enum_events_blocks_grid_gap" AS ENUM('none', 'small', 'medium', 'large');
  CREATE TYPE "public"."enum_events_blocks_grid_alignment" AS ENUM('left', 'center', 'right');
  CREATE TYPE "public"."enum_events_blocks_grid_hover_effect" AS ENUM('none', 'lift', 'scale', 'glow');
  CREATE TYPE "public"."enum_events_blocks_timeline_layout" AS ENUM('vertical', 'alternating', 'horizontal', 'compact');
  CREATE TYPE "public"."enum_events_blocks_timeline_line_style" AS ENUM('solid', 'dashed', 'dotted', 'gradient');
  CREATE TYPE "public"."enum_events_blocks_timeline_marker_style" AS ENUM('circle', 'diamond', 'square', 'icon', 'number', 'image');
  CREATE TYPE "public"."enum_events_blocks_timeline_sort_order" AS ENUM('chronological', 'reverse', 'manual');
  CREATE TYPE "public"."enum_events_blocks_timeline_background_color" AS ENUM('transparent', 'light', 'dark', 'primary');
  CREATE TYPE "public"."enum_events_event_type" AS ENUM('exhibition', 'workshop', 'conference', 'performance', 'lecture', 'tour', 'opening', 'other');
  CREATE TYPE "public"."enum_events_recurring_frequency" AS ENUM('daily', 'weekly', 'monthly', 'yearly');
  CREATE TYPE "public"."enum_events_price_currency" AS ENUM('GBP', 'USD', 'EUR');
  CREATE TYPE "public"."enum_events_event_status" AS ENUM('upcoming', 'ongoing', 'completed', 'cancelled', 'postponed');
  CREATE TYPE "public"."enum_events_template" AS ENUM('event', 'calendar', 'card');
  CREATE TYPE "public"."enum_events_status" AS ENUM('draft', 'published');
  CREATE TYPE "public"."enum__events_v_blocks_hero_links_variant" AS ENUM('primary', 'secondary', 'outline');
  CREATE TYPE "public"."enum__events_v_blocks_hero_variant" AS ENUM('standard', 'agency');
  CREATE TYPE "public"."enum__events_v_blocks_hero_type" AS ENUM('standard', 'minimal', 'fullscreen', 'split', 'video');
  CREATE TYPE "public"."enum__events_v_blocks_hero_overlay" AS ENUM('none', 'light', 'dark', 'gradient');
  CREATE TYPE "public"."enum__events_v_blocks_hero_text_align" AS ENUM('left', 'center', 'right');
  CREATE TYPE "public"."enum__events_v_blocks_content_columns_size" AS ENUM('oneThird', 'half', 'twoThirds', 'full');
  CREATE TYPE "public"."enum__events_v_blocks_content_background_color" AS ENUM('none', 'light', 'dark', 'primary', 'secondary');
  CREATE TYPE "public"."enum__events_v_blocks_content_padding_top" AS ENUM('none', 'small', 'medium', 'large');
  CREATE TYPE "public"."enum__events_v_blocks_content_padding_bottom" AS ENUM('none', 'small', 'medium', 'large');
  CREATE TYPE "public"."enum__events_v_blocks_media_size" AS ENUM('small', 'default', 'large', 'fullWidth');
  CREATE TYPE "public"."enum__events_v_blocks_media_position" AS ENUM('left', 'center', 'right');
  CREATE TYPE "public"."enum__events_v_blocks_cta_links_variant" AS ENUM('primary', 'secondary', 'outline');
  CREATE TYPE "public"."enum__events_v_blocks_cta_style" AS ENUM('standard', 'banner', 'card', 'inline', 'agency');
  CREATE TYPE "public"."enum__events_v_blocks_cta_background_color" AS ENUM('none', 'light', 'dark', 'primary', 'secondary');
  CREATE TYPE "public"."enum__events_v_blocks_archive_populate_by" AS ENUM('collection', 'selection');
  CREATE TYPE "public"."enum__events_v_blocks_archive_relation_to" AS ENUM('posts', 'pages', 'archive-items', 'people', 'places', 'custom-items');
  CREATE TYPE "public"."enum__events_v_blocks_archive_layout" AS ENUM('grid', 'list', 'cards', 'carousel');
  CREATE TYPE "public"."enum__events_v_blocks_archive_columns" AS ENUM('2', '3', '4');
  CREATE TYPE "public"."enum__events_v_blocks_form_style" AS ENUM('default', 'card', 'inline', 'fullWidth');
  CREATE TYPE "public"."enum__events_v_blocks_form_background_color" AS ENUM('none', 'light', 'dark');
  CREATE TYPE "public"."enum__events_v_blocks_gallery_layout" AS ENUM('grid', 'masonry', 'carousel', 'lightbox', 'slider');
  CREATE TYPE "public"."enum__events_v_blocks_gallery_columns" AS ENUM('2', '3', '4', '5', '6');
  CREATE TYPE "public"."enum__events_v_blocks_gallery_gap" AS ENUM('none', 'small', 'medium', 'large');
  CREATE TYPE "public"."enum__events_v_blocks_gallery_aspect_ratio" AS ENUM('auto', 'square', 'landscape', 'portrait', 'wide');
  CREATE TYPE "public"."enum__events_v_blocks_grid_style" AS ENUM('cards', 'features', 'icons', 'stats', 'team', 'testimonials', 'logos', 'agency-cards', 'agency-list');
  CREATE TYPE "public"."enum__events_v_blocks_grid_columns" AS ENUM('1', '2', '3', '4', '5', '6');
  CREATE TYPE "public"."enum__events_v_blocks_grid_gap" AS ENUM('none', 'small', 'medium', 'large');
  CREATE TYPE "public"."enum__events_v_blocks_grid_alignment" AS ENUM('left', 'center', 'right');
  CREATE TYPE "public"."enum__events_v_blocks_grid_hover_effect" AS ENUM('none', 'lift', 'scale', 'glow');
  CREATE TYPE "public"."enum__events_v_blocks_timeline_layout" AS ENUM('vertical', 'alternating', 'horizontal', 'compact');
  CREATE TYPE "public"."enum__events_v_blocks_timeline_line_style" AS ENUM('solid', 'dashed', 'dotted', 'gradient');
  CREATE TYPE "public"."enum__events_v_blocks_timeline_marker_style" AS ENUM('circle', 'diamond', 'square', 'icon', 'number', 'image');
  CREATE TYPE "public"."enum__events_v_blocks_timeline_sort_order" AS ENUM('chronological', 'reverse', 'manual');
  CREATE TYPE "public"."enum__events_v_blocks_timeline_background_color" AS ENUM('transparent', 'light', 'dark', 'primary');
  CREATE TYPE "public"."enum__events_v_version_event_type" AS ENUM('exhibition', 'workshop', 'conference', 'performance', 'lecture', 'tour', 'opening', 'other');
  CREATE TYPE "public"."enum__events_v_version_recurring_frequency" AS ENUM('daily', 'weekly', 'monthly', 'yearly');
  CREATE TYPE "public"."enum__events_v_version_price_currency" AS ENUM('GBP', 'USD', 'EUR');
  CREATE TYPE "public"."enum__events_v_version_event_status" AS ENUM('upcoming', 'ongoing', 'completed', 'cancelled', 'postponed');
  CREATE TYPE "public"."enum__events_v_version_template" AS ENUM('event', 'calendar', 'card');
  CREATE TYPE "public"."enum__events_v_version_status" AS ENUM('draft', 'published');
  CREATE TYPE "public"."enum_products_blocks_hero_links_variant" AS ENUM('primary', 'secondary', 'outline');
  CREATE TYPE "public"."enum_products_blocks_hero_variant" AS ENUM('standard', 'agency');
  CREATE TYPE "public"."enum_products_blocks_hero_type" AS ENUM('standard', 'minimal', 'fullscreen', 'split', 'video');
  CREATE TYPE "public"."enum_products_blocks_hero_overlay" AS ENUM('none', 'light', 'dark', 'gradient');
  CREATE TYPE "public"."enum_products_blocks_hero_text_align" AS ENUM('left', 'center', 'right');
  CREATE TYPE "public"."enum_products_blocks_content_columns_size" AS ENUM('oneThird', 'half', 'twoThirds', 'full');
  CREATE TYPE "public"."enum_products_blocks_content_background_color" AS ENUM('none', 'light', 'dark', 'primary', 'secondary');
  CREATE TYPE "public"."enum_products_blocks_content_padding_top" AS ENUM('none', 'small', 'medium', 'large');
  CREATE TYPE "public"."enum_products_blocks_content_padding_bottom" AS ENUM('none', 'small', 'medium', 'large');
  CREATE TYPE "public"."enum_products_blocks_media_size" AS ENUM('small', 'default', 'large', 'fullWidth');
  CREATE TYPE "public"."enum_products_blocks_media_position" AS ENUM('left', 'center', 'right');
  CREATE TYPE "public"."enum_products_blocks_cta_links_variant" AS ENUM('primary', 'secondary', 'outline');
  CREATE TYPE "public"."enum_products_blocks_cta_style" AS ENUM('standard', 'banner', 'card', 'inline', 'agency');
  CREATE TYPE "public"."enum_products_blocks_cta_background_color" AS ENUM('none', 'light', 'dark', 'primary', 'secondary');
  CREATE TYPE "public"."enum_products_blocks_archive_populate_by" AS ENUM('collection', 'selection');
  CREATE TYPE "public"."enum_products_blocks_archive_relation_to" AS ENUM('posts', 'pages', 'archive-items', 'people', 'places', 'custom-items');
  CREATE TYPE "public"."enum_products_blocks_archive_layout" AS ENUM('grid', 'list', 'cards', 'carousel');
  CREATE TYPE "public"."enum_products_blocks_archive_columns" AS ENUM('2', '3', '4');
  CREATE TYPE "public"."enum_products_blocks_form_style" AS ENUM('default', 'card', 'inline', 'fullWidth');
  CREATE TYPE "public"."enum_products_blocks_form_background_color" AS ENUM('none', 'light', 'dark');
  CREATE TYPE "public"."enum_products_blocks_gallery_layout" AS ENUM('grid', 'masonry', 'carousel', 'lightbox', 'slider');
  CREATE TYPE "public"."enum_products_blocks_gallery_columns" AS ENUM('2', '3', '4', '5', '6');
  CREATE TYPE "public"."enum_products_blocks_gallery_gap" AS ENUM('none', 'small', 'medium', 'large');
  CREATE TYPE "public"."enum_products_blocks_gallery_aspect_ratio" AS ENUM('auto', 'square', 'landscape', 'portrait', 'wide');
  CREATE TYPE "public"."enum_products_blocks_grid_style" AS ENUM('cards', 'features', 'icons', 'stats', 'team', 'testimonials', 'logos', 'agency-cards', 'agency-list');
  CREATE TYPE "public"."enum_products_blocks_grid_columns" AS ENUM('1', '2', '3', '4', '5', '6');
  CREATE TYPE "public"."enum_products_blocks_grid_gap" AS ENUM('none', 'small', 'medium', 'large');
  CREATE TYPE "public"."enum_products_blocks_grid_alignment" AS ENUM('left', 'center', 'right');
  CREATE TYPE "public"."enum_products_blocks_grid_hover_effect" AS ENUM('none', 'lift', 'scale', 'glow');
  CREATE TYPE "public"."enum_products_blocks_timeline_layout" AS ENUM('vertical', 'alternating', 'horizontal', 'compact');
  CREATE TYPE "public"."enum_products_blocks_timeline_line_style" AS ENUM('solid', 'dashed', 'dotted', 'gradient');
  CREATE TYPE "public"."enum_products_blocks_timeline_marker_style" AS ENUM('circle', 'diamond', 'square', 'icon', 'number', 'image');
  CREATE TYPE "public"."enum_products_blocks_timeline_sort_order" AS ENUM('chronological', 'reverse', 'manual');
  CREATE TYPE "public"."enum_products_blocks_timeline_background_color" AS ENUM('transparent', 'light', 'dark', 'primary');
  CREATE TYPE "public"."enum_products_currency" AS ENUM('GBP', 'USD', 'EUR');
  CREATE TYPE "public"."enum_products_shipping_class" AS ENUM('standard', 'express', 'freight', 'digital');
  CREATE TYPE "public"."enum_products_availability" AS ENUM('active', 'archived', 'out-of-stock');
  CREATE TYPE "public"."enum_products_template" AS ENUM('standard', 'featured', 'quick');
  CREATE TYPE "public"."enum_products_status" AS ENUM('draft', 'published');
  CREATE TYPE "public"."enum__products_v_blocks_hero_links_variant" AS ENUM('primary', 'secondary', 'outline');
  CREATE TYPE "public"."enum__products_v_blocks_hero_variant" AS ENUM('standard', 'agency');
  CREATE TYPE "public"."enum__products_v_blocks_hero_type" AS ENUM('standard', 'minimal', 'fullscreen', 'split', 'video');
  CREATE TYPE "public"."enum__products_v_blocks_hero_overlay" AS ENUM('none', 'light', 'dark', 'gradient');
  CREATE TYPE "public"."enum__products_v_blocks_hero_text_align" AS ENUM('left', 'center', 'right');
  CREATE TYPE "public"."enum__products_v_blocks_content_columns_size" AS ENUM('oneThird', 'half', 'twoThirds', 'full');
  CREATE TYPE "public"."enum__products_v_blocks_content_background_color" AS ENUM('none', 'light', 'dark', 'primary', 'secondary');
  CREATE TYPE "public"."enum__products_v_blocks_content_padding_top" AS ENUM('none', 'small', 'medium', 'large');
  CREATE TYPE "public"."enum__products_v_blocks_content_padding_bottom" AS ENUM('none', 'small', 'medium', 'large');
  CREATE TYPE "public"."enum__products_v_blocks_media_size" AS ENUM('small', 'default', 'large', 'fullWidth');
  CREATE TYPE "public"."enum__products_v_blocks_media_position" AS ENUM('left', 'center', 'right');
  CREATE TYPE "public"."enum__products_v_blocks_cta_links_variant" AS ENUM('primary', 'secondary', 'outline');
  CREATE TYPE "public"."enum__products_v_blocks_cta_style" AS ENUM('standard', 'banner', 'card', 'inline', 'agency');
  CREATE TYPE "public"."enum__products_v_blocks_cta_background_color" AS ENUM('none', 'light', 'dark', 'primary', 'secondary');
  CREATE TYPE "public"."enum__products_v_blocks_archive_populate_by" AS ENUM('collection', 'selection');
  CREATE TYPE "public"."enum__products_v_blocks_archive_relation_to" AS ENUM('posts', 'pages', 'archive-items', 'people', 'places', 'custom-items');
  CREATE TYPE "public"."enum__products_v_blocks_archive_layout" AS ENUM('grid', 'list', 'cards', 'carousel');
  CREATE TYPE "public"."enum__products_v_blocks_archive_columns" AS ENUM('2', '3', '4');
  CREATE TYPE "public"."enum__products_v_blocks_form_style" AS ENUM('default', 'card', 'inline', 'fullWidth');
  CREATE TYPE "public"."enum__products_v_blocks_form_background_color" AS ENUM('none', 'light', 'dark');
  CREATE TYPE "public"."enum__products_v_blocks_gallery_layout" AS ENUM('grid', 'masonry', 'carousel', 'lightbox', 'slider');
  CREATE TYPE "public"."enum__products_v_blocks_gallery_columns" AS ENUM('2', '3', '4', '5', '6');
  CREATE TYPE "public"."enum__products_v_blocks_gallery_gap" AS ENUM('none', 'small', 'medium', 'large');
  CREATE TYPE "public"."enum__products_v_blocks_gallery_aspect_ratio" AS ENUM('auto', 'square', 'landscape', 'portrait', 'wide');
  CREATE TYPE "public"."enum__products_v_blocks_grid_style" AS ENUM('cards', 'features', 'icons', 'stats', 'team', 'testimonials', 'logos', 'agency-cards', 'agency-list');
  CREATE TYPE "public"."enum__products_v_blocks_grid_columns" AS ENUM('1', '2', '3', '4', '5', '6');
  CREATE TYPE "public"."enum__products_v_blocks_grid_gap" AS ENUM('none', 'small', 'medium', 'large');
  CREATE TYPE "public"."enum__products_v_blocks_grid_alignment" AS ENUM('left', 'center', 'right');
  CREATE TYPE "public"."enum__products_v_blocks_grid_hover_effect" AS ENUM('none', 'lift', 'scale', 'glow');
  CREATE TYPE "public"."enum__products_v_blocks_timeline_layout" AS ENUM('vertical', 'alternating', 'horizontal', 'compact');
  CREATE TYPE "public"."enum__products_v_blocks_timeline_line_style" AS ENUM('solid', 'dashed', 'dotted', 'gradient');
  CREATE TYPE "public"."enum__products_v_blocks_timeline_marker_style" AS ENUM('circle', 'diamond', 'square', 'icon', 'number', 'image');
  CREATE TYPE "public"."enum__products_v_blocks_timeline_sort_order" AS ENUM('chronological', 'reverse', 'manual');
  CREATE TYPE "public"."enum__products_v_blocks_timeline_background_color" AS ENUM('transparent', 'light', 'dark', 'primary');
  CREATE TYPE "public"."enum__products_v_version_currency" AS ENUM('GBP', 'USD', 'EUR');
  CREATE TYPE "public"."enum__products_v_version_shipping_class" AS ENUM('standard', 'express', 'freight', 'digital');
  CREATE TYPE "public"."enum__products_v_version_availability" AS ENUM('active', 'archived', 'out-of-stock');
  CREATE TYPE "public"."enum__products_v_version_template" AS ENUM('standard', 'featured', 'quick');
  CREATE TYPE "public"."enum__products_v_version_status" AS ENUM('draft', 'published');
  CREATE TYPE "public"."enum_product_collections_template" AS ENUM('list', 'grid', 'gallery');
  CREATE TYPE "public"."enum_product_collections_status" AS ENUM('draft', 'published');
  CREATE TYPE "public"."enum__product_collections_v_version_template" AS ENUM('list', 'grid', 'gallery');
  CREATE TYPE "public"."enum__product_collections_v_version_status" AS ENUM('draft', 'published');
  CREATE TYPE "public"."enum_content_types_custom_fields_type" AS ENUM('text', 'textarea', 'number', 'date', 'checkbox', 'select', 'url', 'email');
  CREATE TYPE "public"."enum_content_types_icon" AS ENUM('box', 'product', 'archive', 'shopping-bag', 'person', 'location', 'event', 'document', 'archive-item', 'image', 'settings', 'users');
  CREATE TYPE "public"."enum_content_types_template" AS ENUM('archive-item', 'product', 'person', 'place', 'event', 'article');
  CREATE TYPE "public"."enum_custom_items_blocks_hero_links_variant" AS ENUM('primary', 'secondary', 'outline');
  CREATE TYPE "public"."enum_custom_items_blocks_hero_variant" AS ENUM('standard', 'agency');
  CREATE TYPE "public"."enum_custom_items_blocks_hero_type" AS ENUM('standard', 'minimal', 'fullscreen', 'split', 'video');
  CREATE TYPE "public"."enum_custom_items_blocks_hero_overlay" AS ENUM('none', 'light', 'dark', 'gradient');
  CREATE TYPE "public"."enum_custom_items_blocks_hero_text_align" AS ENUM('left', 'center', 'right');
  CREATE TYPE "public"."enum_custom_items_blocks_content_columns_size" AS ENUM('oneThird', 'half', 'twoThirds', 'full');
  CREATE TYPE "public"."enum_custom_items_blocks_content_background_color" AS ENUM('none', 'light', 'dark', 'primary', 'secondary');
  CREATE TYPE "public"."enum_custom_items_blocks_content_padding_top" AS ENUM('none', 'small', 'medium', 'large');
  CREATE TYPE "public"."enum_custom_items_blocks_content_padding_bottom" AS ENUM('none', 'small', 'medium', 'large');
  CREATE TYPE "public"."enum_custom_items_blocks_media_size" AS ENUM('small', 'default', 'large', 'fullWidth');
  CREATE TYPE "public"."enum_custom_items_blocks_media_position" AS ENUM('left', 'center', 'right');
  CREATE TYPE "public"."enum_custom_items_blocks_cta_links_variant" AS ENUM('primary', 'secondary', 'outline');
  CREATE TYPE "public"."enum_custom_items_blocks_cta_style" AS ENUM('standard', 'banner', 'card', 'inline', 'agency');
  CREATE TYPE "public"."enum_custom_items_blocks_cta_background_color" AS ENUM('none', 'light', 'dark', 'primary', 'secondary');
  CREATE TYPE "public"."enum_custom_items_blocks_quote_align" AS ENUM('left', 'center', 'right');
  CREATE TYPE "public"."enum_custom_items_blocks_features_layout" AS ENUM('grid', 'list');
  CREATE TYPE "public"."enum_custom_items_blocks_testimonials_style" AS ENUM('standard', 'agency');
  CREATE TYPE "public"."enum_custom_items_blocks_embed_aspect_ratio" AS ENUM('16:9', '4:3', '1:1', '21:9');
  CREATE TYPE "public"."enum_custom_items_blocks_gallery_layout" AS ENUM('grid', 'masonry', 'carousel', 'lightbox', 'slider');
  CREATE TYPE "public"."enum_custom_items_blocks_gallery_columns" AS ENUM('2', '3', '4', '5', '6');
  CREATE TYPE "public"."enum_custom_items_blocks_gallery_gap" AS ENUM('none', 'small', 'medium', 'large');
  CREATE TYPE "public"."enum_custom_items_blocks_gallery_aspect_ratio" AS ENUM('auto', 'square', 'landscape', 'portrait', 'wide');
  CREATE TYPE "public"."enum_custom_items_blocks_grid_style" AS ENUM('cards', 'features', 'icons', 'stats', 'team', 'testimonials', 'logos', 'agency-cards', 'agency-list');
  CREATE TYPE "public"."enum_custom_items_blocks_grid_columns" AS ENUM('1', '2', '3', '4', '5', '6');
  CREATE TYPE "public"."enum_custom_items_blocks_grid_gap" AS ENUM('none', 'small', 'medium', 'large');
  CREATE TYPE "public"."enum_custom_items_blocks_grid_alignment" AS ENUM('left', 'center', 'right');
  CREATE TYPE "public"."enum_custom_items_blocks_grid_hover_effect" AS ENUM('none', 'lift', 'scale', 'glow');
  CREATE TYPE "public"."enum_custom_items_blocks_timeline_layout" AS ENUM('vertical', 'alternating', 'horizontal', 'compact');
  CREATE TYPE "public"."enum_custom_items_blocks_timeline_line_style" AS ENUM('solid', 'dashed', 'dotted', 'gradient');
  CREATE TYPE "public"."enum_custom_items_blocks_timeline_marker_style" AS ENUM('circle', 'diamond', 'square', 'icon', 'number', 'image');
  CREATE TYPE "public"."enum_custom_items_blocks_timeline_sort_order" AS ENUM('chronological', 'reverse', 'manual');
  CREATE TYPE "public"."enum_custom_items_blocks_timeline_background_color" AS ENUM('transparent', 'light', 'dark', 'primary');
  CREATE TYPE "public"."enum_custom_items_blocks_archive_populate_by" AS ENUM('collection', 'selection');
  CREATE TYPE "public"."enum_custom_items_blocks_archive_relation_to" AS ENUM('posts', 'pages', 'archive-items', 'people', 'places', 'custom-items');
  CREATE TYPE "public"."enum_custom_items_blocks_archive_layout" AS ENUM('grid', 'list', 'cards', 'carousel');
  CREATE TYPE "public"."enum_custom_items_blocks_archive_columns" AS ENUM('2', '3', '4');
  CREATE TYPE "public"."enum_custom_items_blocks_form_style" AS ENUM('default', 'card', 'inline', 'fullWidth');
  CREATE TYPE "public"."enum_custom_items_blocks_form_background_color" AS ENUM('none', 'light', 'dark');
  CREATE TYPE "public"."enum_custom_items_blocks_spacer_style" AS ENUM('space', 'divider');
  CREATE TYPE "public"."enum_custom_items_blocks_spacer_size" AS ENUM('xs', 'sm', 'md', 'lg', 'xl');
  CREATE TYPE "public"."enum_custom_items_blocks_spacer_line_style" AS ENUM('solid', 'dashed', 'dotted');
  CREATE TYPE "public"."enum_custom_items_status" AS ENUM('draft', 'published');
  CREATE TYPE "public"."enum__custom_items_v_blocks_hero_links_variant" AS ENUM('primary', 'secondary', 'outline');
  CREATE TYPE "public"."enum__custom_items_v_blocks_hero_variant" AS ENUM('standard', 'agency');
  CREATE TYPE "public"."enum__custom_items_v_blocks_hero_type" AS ENUM('standard', 'minimal', 'fullscreen', 'split', 'video');
  CREATE TYPE "public"."enum__custom_items_v_blocks_hero_overlay" AS ENUM('none', 'light', 'dark', 'gradient');
  CREATE TYPE "public"."enum__custom_items_v_blocks_hero_text_align" AS ENUM('left', 'center', 'right');
  CREATE TYPE "public"."enum__custom_items_v_blocks_content_columns_size" AS ENUM('oneThird', 'half', 'twoThirds', 'full');
  CREATE TYPE "public"."enum__custom_items_v_blocks_content_background_color" AS ENUM('none', 'light', 'dark', 'primary', 'secondary');
  CREATE TYPE "public"."enum__custom_items_v_blocks_content_padding_top" AS ENUM('none', 'small', 'medium', 'large');
  CREATE TYPE "public"."enum__custom_items_v_blocks_content_padding_bottom" AS ENUM('none', 'small', 'medium', 'large');
  CREATE TYPE "public"."enum__custom_items_v_blocks_media_size" AS ENUM('small', 'default', 'large', 'fullWidth');
  CREATE TYPE "public"."enum__custom_items_v_blocks_media_position" AS ENUM('left', 'center', 'right');
  CREATE TYPE "public"."enum__custom_items_v_blocks_cta_links_variant" AS ENUM('primary', 'secondary', 'outline');
  CREATE TYPE "public"."enum__custom_items_v_blocks_cta_style" AS ENUM('standard', 'banner', 'card', 'inline', 'agency');
  CREATE TYPE "public"."enum__custom_items_v_blocks_cta_background_color" AS ENUM('none', 'light', 'dark', 'primary', 'secondary');
  CREATE TYPE "public"."enum__custom_items_v_blocks_quote_align" AS ENUM('left', 'center', 'right');
  CREATE TYPE "public"."enum__custom_items_v_blocks_features_layout" AS ENUM('grid', 'list');
  CREATE TYPE "public"."enum__custom_items_v_blocks_testimonials_style" AS ENUM('standard', 'agency');
  CREATE TYPE "public"."enum__custom_items_v_blocks_embed_aspect_ratio" AS ENUM('16:9', '4:3', '1:1', '21:9');
  CREATE TYPE "public"."enum__custom_items_v_blocks_gallery_layout" AS ENUM('grid', 'masonry', 'carousel', 'lightbox', 'slider');
  CREATE TYPE "public"."enum__custom_items_v_blocks_gallery_columns" AS ENUM('2', '3', '4', '5', '6');
  CREATE TYPE "public"."enum__custom_items_v_blocks_gallery_gap" AS ENUM('none', 'small', 'medium', 'large');
  CREATE TYPE "public"."enum__custom_items_v_blocks_gallery_aspect_ratio" AS ENUM('auto', 'square', 'landscape', 'portrait', 'wide');
  CREATE TYPE "public"."enum__custom_items_v_blocks_grid_style" AS ENUM('cards', 'features', 'icons', 'stats', 'team', 'testimonials', 'logos', 'agency-cards', 'agency-list');
  CREATE TYPE "public"."enum__custom_items_v_blocks_grid_columns" AS ENUM('1', '2', '3', '4', '5', '6');
  CREATE TYPE "public"."enum__custom_items_v_blocks_grid_gap" AS ENUM('none', 'small', 'medium', 'large');
  CREATE TYPE "public"."enum__custom_items_v_blocks_grid_alignment" AS ENUM('left', 'center', 'right');
  CREATE TYPE "public"."enum__custom_items_v_blocks_grid_hover_effect" AS ENUM('none', 'lift', 'scale', 'glow');
  CREATE TYPE "public"."enum__custom_items_v_blocks_timeline_layout" AS ENUM('vertical', 'alternating', 'horizontal', 'compact');
  CREATE TYPE "public"."enum__custom_items_v_blocks_timeline_line_style" AS ENUM('solid', 'dashed', 'dotted', 'gradient');
  CREATE TYPE "public"."enum__custom_items_v_blocks_timeline_marker_style" AS ENUM('circle', 'diamond', 'square', 'icon', 'number', 'image');
  CREATE TYPE "public"."enum__custom_items_v_blocks_timeline_sort_order" AS ENUM('chronological', 'reverse', 'manual');
  CREATE TYPE "public"."enum__custom_items_v_blocks_timeline_background_color" AS ENUM('transparent', 'light', 'dark', 'primary');
  CREATE TYPE "public"."enum__custom_items_v_blocks_archive_populate_by" AS ENUM('collection', 'selection');
  CREATE TYPE "public"."enum__custom_items_v_blocks_archive_relation_to" AS ENUM('posts', 'pages', 'archive-items', 'people', 'places', 'custom-items');
  CREATE TYPE "public"."enum__custom_items_v_blocks_archive_layout" AS ENUM('grid', 'list', 'cards', 'carousel');
  CREATE TYPE "public"."enum__custom_items_v_blocks_archive_columns" AS ENUM('2', '3', '4');
  CREATE TYPE "public"."enum__custom_items_v_blocks_form_style" AS ENUM('default', 'card', 'inline', 'fullWidth');
  CREATE TYPE "public"."enum__custom_items_v_blocks_form_background_color" AS ENUM('none', 'light', 'dark');
  CREATE TYPE "public"."enum__custom_items_v_blocks_spacer_style" AS ENUM('space', 'divider');
  CREATE TYPE "public"."enum__custom_items_v_blocks_spacer_size" AS ENUM('xs', 'sm', 'md', 'lg', 'xl');
  CREATE TYPE "public"."enum__custom_items_v_blocks_spacer_line_style" AS ENUM('solid', 'dashed', 'dotted');
  CREATE TYPE "public"."enum__custom_items_v_version_status" AS ENUM('draft', 'published');
  CREATE TYPE "public"."enum_forms_confirmation_type" AS ENUM('message', 'redirect');
  CREATE TYPE "public"."enum_redirects_to_type" AS ENUM('reference', 'custom');
  CREATE TYPE "public"."enum_payload_jobs_log_task_slug" AS ENUM('inline', 'schedulePublish');
  CREATE TYPE "public"."enum_payload_jobs_log_state" AS ENUM('failed', 'succeeded');
  CREATE TYPE "public"."enum_payload_jobs_task_slug" AS ENUM('inline', 'schedulePublish');
  CREATE TYPE "public"."enum_header_nav_items_type" AS ENUM('link', 'dropdown');
  CREATE TYPE "public"."enum_footer_social_links_platform" AS ENUM('facebook', 'twitter', 'instagram', 'linkedin', 'youtube', 'tiktok', 'github', 'discord');
  CREATE TYPE "public"."enum_settings_social_profiles_platform" AS ENUM('facebook', 'twitter', 'instagram', 'linkedin', 'youtube', 'tiktok', 'github');
  CREATE TYPE "public"."enum_settings_active_preset" AS ENUM('blog', 'brochure', 'archive', 'ecommerce');
  CREATE TYPE "public"."enum_settings_default_skin" AS ENUM('minimal', 'editorial', 'saas', 'soft', 'bold', 'monochrome', 'glass', 'high-contrast', 'neon-grid', 'agency');
  CREATE TYPE "public"."enum_settings_default_mode" AS ENUM('light', 'dark', 'system');
  CREATE TYPE "public"."enum_settings_frontend_framework" AS ENUM('next', 'astro');
  CREATE TYPE "public"."enum_settings_frontend_site_type" AS ENUM('brochure', 'blog', 'museum', 'ecommerce', 'portfolio', 'custom');
  CREATE TYPE "public"."enum_navigation_settings_custom_links_insert_position" AS ENUM('before-dashboard', 'after-dashboard', 'after-content', 'after-taxonomy', 'after-collections', 'after-shop', 'after-media', 'after-forms', 'after-tools', 'after-settings', 'after-admin');
  CREATE TABLE "users_social_links" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"platform" "enum_users_social_links_platform",
  	"url" varchar NOT NULL
  );
  
  CREATE TABLE "users_sessions" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"created_at" timestamp(3) with time zone,
  	"expires_at" timestamp(3) with time zone NOT NULL
  );
  
  CREATE TABLE "users" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"name" varchar,
  	"role" "enum_users_role" DEFAULT 'user' NOT NULL,
  	"avatar_id" integer,
  	"bio" varchar,
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"enable_a_p_i_key" boolean,
  	"api_key" varchar,
  	"api_key_index" varchar,
  	"email" varchar NOT NULL,
  	"reset_password_token" varchar,
  	"reset_password_expiration" timestamp(3) with time zone,
  	"salt" varchar,
  	"hash" varchar,
  	"login_attempts" numeric DEFAULT 0,
  	"lock_until" timestamp(3) with time zone
  );
  
  CREATE TABLE "media_tags" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"tag" varchar
  );
  
  CREATE TABLE "media" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"alt" varchar,
  	"caption" varchar,
  	"credit" varchar,
  	"blur_data_u_r_l" varchar,
  	"dominant_color" varchar,
  	"generated_sizes" varchar,
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"url" varchar,
  	"thumbnail_u_r_l" varchar,
  	"filename" varchar,
  	"mime_type" varchar,
  	"filesize" numeric,
  	"width" numeric,
  	"height" numeric,
  	"focal_x" numeric,
  	"focal_y" numeric,
  	"sizes_blur_url" varchar,
  	"sizes_blur_width" numeric,
  	"sizes_blur_height" numeric,
  	"sizes_blur_mime_type" varchar,
  	"sizes_blur_filesize" numeric,
  	"sizes_blur_filename" varchar,
  	"sizes_thumbnail_url" varchar,
  	"sizes_thumbnail_width" numeric,
  	"sizes_thumbnail_height" numeric,
  	"sizes_thumbnail_mime_type" varchar,
  	"sizes_thumbnail_filesize" numeric,
  	"sizes_thumbnail_filename" varchar,
  	"sizes_small_url" varchar,
  	"sizes_small_width" numeric,
  	"sizes_small_height" numeric,
  	"sizes_small_mime_type" varchar,
  	"sizes_small_filesize" numeric,
  	"sizes_small_filename" varchar,
  	"sizes_card_url" varchar,
  	"sizes_card_width" numeric,
  	"sizes_card_height" numeric,
  	"sizes_card_mime_type" varchar,
  	"sizes_card_filesize" numeric,
  	"sizes_card_filename" varchar,
  	"sizes_medium_url" varchar,
  	"sizes_medium_width" numeric,
  	"sizes_medium_height" numeric,
  	"sizes_medium_mime_type" varchar,
  	"sizes_medium_filesize" numeric,
  	"sizes_medium_filename" varchar,
  	"sizes_tablet_url" varchar,
  	"sizes_tablet_width" numeric,
  	"sizes_tablet_height" numeric,
  	"sizes_tablet_mime_type" varchar,
  	"sizes_tablet_filesize" numeric,
  	"sizes_tablet_filename" varchar,
  	"sizes_large_url" varchar,
  	"sizes_large_width" numeric,
  	"sizes_large_height" numeric,
  	"sizes_large_mime_type" varchar,
  	"sizes_large_filesize" numeric,
  	"sizes_large_filename" varchar,
  	"sizes_desktop_url" varchar,
  	"sizes_desktop_width" numeric,
  	"sizes_desktop_height" numeric,
  	"sizes_desktop_mime_type" varchar,
  	"sizes_desktop_filesize" numeric,
  	"sizes_desktop_filename" varchar,
  	"sizes_xlarge_url" varchar,
  	"sizes_xlarge_width" numeric,
  	"sizes_xlarge_height" numeric,
  	"sizes_xlarge_mime_type" varchar,
  	"sizes_xlarge_filesize" numeric,
  	"sizes_xlarge_filename" varchar,
  	"sizes_og_url" varchar,
  	"sizes_og_width" numeric,
  	"sizes_og_height" numeric,
  	"sizes_og_mime_type" varchar,
  	"sizes_og_filesize" numeric,
  	"sizes_og_filename" varchar,
  	"sizes_avif_small_url" varchar,
  	"sizes_avif_small_width" numeric,
  	"sizes_avif_small_height" numeric,
  	"sizes_avif_small_mime_type" varchar,
  	"sizes_avif_small_filesize" numeric,
  	"sizes_avif_small_filename" varchar,
  	"sizes_avif_medium_url" varchar,
  	"sizes_avif_medium_width" numeric,
  	"sizes_avif_medium_height" numeric,
  	"sizes_avif_medium_mime_type" varchar,
  	"sizes_avif_medium_filesize" numeric,
  	"sizes_avif_medium_filename" varchar,
  	"sizes_avif_large_url" varchar,
  	"sizes_avif_large_width" numeric,
  	"sizes_avif_large_height" numeric,
  	"sizes_avif_large_mime_type" varchar,
  	"sizes_avif_large_filesize" numeric,
  	"sizes_avif_large_filename" varchar,
  	"sizes_avif_desktop_url" varchar,
  	"sizes_avif_desktop_width" numeric,
  	"sizes_avif_desktop_height" numeric,
  	"sizes_avif_desktop_mime_type" varchar,
  	"sizes_avif_desktop_filesize" numeric,
  	"sizes_avif_desktop_filename" varchar
  );
  
  CREATE TABLE "pages_hero_links" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"label" varchar,
  	"url" varchar,
  	"page_id" integer,
  	"variant" "enum_pages_hero_links_variant" DEFAULT 'primary',
  	"new_tab" boolean
  );
  
  CREATE TABLE "pages_blocks_hero_links" (
  	"_order" integer NOT NULL,
  	"_parent_id" varchar NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"label" varchar,
  	"url" varchar,
  	"page_id" integer,
  	"variant" "enum_pages_blocks_hero_links_variant" DEFAULT 'primary',
  	"new_tab" boolean
  );
  
  CREATE TABLE "pages_blocks_hero" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"variant" "enum_pages_blocks_hero_variant" DEFAULT 'standard',
  	"type" "enum_pages_blocks_hero_type" DEFAULT 'standard',
  	"eyebrow" varchar,
  	"heading" varchar,
  	"subheading" varchar,
  	"image_id" integer,
  	"video_url" varchar,
  	"overlay" "enum_pages_blocks_hero_overlay" DEFAULT 'dark',
  	"text_align" "enum_pages_blocks_hero_text_align" DEFAULT 'center',
  	"block_name" varchar
  );
  
  CREATE TABLE "pages_blocks_content_columns" (
  	"_order" integer NOT NULL,
  	"_parent_id" varchar NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"size" "enum_pages_blocks_content_columns_size" DEFAULT 'full',
  	"rich_text" jsonb,
  	"enable_link" boolean,
  	"link_label" varchar,
  	"link_url" varchar,
  	"link_page_id" integer,
  	"link_new_tab" boolean
  );
  
  CREATE TABLE "pages_blocks_content" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"background_color" "enum_pages_blocks_content_background_color" DEFAULT 'none',
  	"padding_top" "enum_pages_blocks_content_padding_top" DEFAULT 'medium',
  	"padding_bottom" "enum_pages_blocks_content_padding_bottom" DEFAULT 'medium',
  	"block_name" varchar
  );
  
  CREATE TABLE "pages_blocks_media" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"media_id" integer,
  	"caption" varchar,
  	"size" "enum_pages_blocks_media_size" DEFAULT 'default',
  	"position" "enum_pages_blocks_media_position" DEFAULT 'center',
  	"enable_link" boolean,
  	"link_url" varchar,
  	"link_page_id" integer,
  	"link_new_tab" boolean,
  	"block_name" varchar
  );
  
  CREATE TABLE "pages_blocks_cta_links" (
  	"_order" integer NOT NULL,
  	"_parent_id" varchar NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"label" varchar,
  	"url" varchar,
  	"page_id" integer,
  	"variant" "enum_pages_blocks_cta_links_variant" DEFAULT 'primary',
  	"new_tab" boolean
  );
  
  CREATE TABLE "pages_blocks_cta" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"style" "enum_pages_blocks_cta_style" DEFAULT 'standard',
  	"heading" varchar,
  	"description" varchar,
  	"image_id" integer,
  	"background_color" "enum_pages_blocks_cta_background_color" DEFAULT 'primary',
  	"block_name" varchar
  );
  
  CREATE TABLE "pages_blocks_quote" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"quote" varchar,
  	"author" varchar,
  	"role" varchar,
  	"align" "enum_pages_blocks_quote_align" DEFAULT 'left',
  	"block_name" varchar
  );
  
  CREATE TABLE "pages_blocks_features_items" (
  	"_order" integer NOT NULL,
  	"_parent_id" varchar NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"title" varchar,
  	"description" varchar,
  	"icon" varchar,
  	"media_id" integer
  );
  
  CREATE TABLE "pages_blocks_features" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"heading" varchar,
  	"subheading" varchar,
  	"layout" "enum_pages_blocks_features_layout" DEFAULT 'grid',
  	"block_name" varchar
  );
  
  CREATE TABLE "pages_blocks_stats_stats" (
  	"_order" integer NOT NULL,
  	"_parent_id" varchar NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"value" varchar,
  	"label" varchar,
  	"description" varchar
  );
  
  CREATE TABLE "pages_blocks_stats" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"heading" varchar,
  	"subheading" varchar,
  	"block_name" varchar
  );
  
  CREATE TABLE "pages_blocks_logo_cloud_logos" (
  	"_order" integer NOT NULL,
  	"_parent_id" varchar NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"logo_id" integer,
  	"label" varchar,
  	"url" varchar
  );
  
  CREATE TABLE "pages_blocks_logo_cloud" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"heading" varchar,
  	"block_name" varchar
  );
  
  CREATE TABLE "pages_blocks_testimonials_items" (
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
  
  CREATE TABLE "pages_blocks_testimonials" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"heading" varchar,
  	"style" "enum_pages_blocks_testimonials_style" DEFAULT 'standard',
  	"block_name" varchar
  );
  
  CREATE TABLE "pages_blocks_faq_items" (
  	"_order" integer NOT NULL,
  	"_parent_id" varchar NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"question" varchar,
  	"answer" jsonb
  );
  
  CREATE TABLE "pages_blocks_faq" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"heading" varchar,
  	"block_name" varchar
  );
  
  CREATE TABLE "pages_blocks_pricing_plans_features" (
  	"_order" integer NOT NULL,
  	"_parent_id" varchar NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"feature" varchar
  );
  
  CREATE TABLE "pages_blocks_pricing_plans" (
  	"_order" integer NOT NULL,
  	"_parent_id" varchar NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"name" varchar,
  	"price" varchar,
  	"period" varchar DEFAULT 'per month',
  	"description" varchar,
  	"cta_label" varchar,
  	"cta_url" varchar,
  	"featured" boolean
  );
  
  CREATE TABLE "pages_blocks_pricing" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"heading" varchar,
  	"subheading" varchar,
  	"block_name" varchar
  );
  
  CREATE TABLE "pages_blocks_team_members_socials" (
  	"_order" integer NOT NULL,
  	"_parent_id" varchar NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"label" varchar,
  	"url" varchar
  );
  
  CREATE TABLE "pages_blocks_team_members" (
  	"_order" integer NOT NULL,
  	"_parent_id" varchar NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"name" varchar,
  	"role" varchar,
  	"bio" varchar,
  	"photo_id" integer
  );
  
  CREATE TABLE "pages_blocks_team" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"heading" varchar,
  	"block_name" varchar
  );
  
  CREATE TABLE "pages_blocks_embed" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"heading" varchar,
  	"url" varchar,
  	"caption" varchar,
  	"aspect_ratio" "enum_pages_blocks_embed_aspect_ratio" DEFAULT '16:9',
  	"block_name" varchar
  );
  
  CREATE TABLE "pages_blocks_archive" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"heading" varchar,
  	"description" varchar,
  	"populate_by" "enum_pages_blocks_archive_populate_by" DEFAULT 'collection',
  	"relation_to" "enum_pages_blocks_archive_relation_to" DEFAULT 'posts',
  	"content_type_id" integer,
  	"limit" numeric DEFAULT 6,
  	"layout" "enum_pages_blocks_archive_layout" DEFAULT 'grid',
  	"columns" "enum_pages_blocks_archive_columns" DEFAULT '3',
  	"show_image" boolean DEFAULT true,
  	"show_excerpt" boolean DEFAULT true,
  	"show_date" boolean DEFAULT true,
  	"show_author" boolean DEFAULT false,
  	"link_show" boolean,
  	"link_label" varchar DEFAULT 'View All',
  	"link_url" varchar,
  	"block_name" varchar
  );
  
  CREATE TABLE "pages_blocks_form" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"form_id" integer,
  	"enable_intro" boolean,
  	"intro_content" jsonb,
  	"style" "enum_pages_blocks_form_style" DEFAULT 'default',
  	"background_color" "enum_pages_blocks_form_background_color" DEFAULT 'none',
  	"block_name" varchar
  );
  
  CREATE TABLE "pages_blocks_gallery_images" (
  	"_order" integer NOT NULL,
  	"_parent_id" varchar NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"image_id" integer,
  	"caption" varchar,
  	"link_url" varchar,
  	"link_page_id" integer,
  	"link_new_tab" boolean
  );
  
  CREATE TABLE "pages_blocks_gallery" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"heading" varchar,
  	"description" varchar,
  	"layout" "enum_pages_blocks_gallery_layout" DEFAULT 'grid',
  	"columns" "enum_pages_blocks_gallery_columns" DEFAULT '3',
  	"gap" "enum_pages_blocks_gallery_gap" DEFAULT 'medium',
  	"aspect_ratio" "enum_pages_blocks_gallery_aspect_ratio" DEFAULT 'auto',
  	"show_captions" boolean DEFAULT true,
  	"enable_lightbox" boolean DEFAULT true,
  	"autoplay" boolean DEFAULT false,
  	"autoplay_speed" numeric DEFAULT 5000,
  	"block_name" varchar
  );
  
  CREATE TABLE "pages_blocks_grid_items" (
  	"_order" integer NOT NULL,
  	"_parent_id" varchar NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"image_id" integer,
  	"icon" varchar,
  	"title" varchar,
  	"subtitle" varchar,
  	"description" varchar,
  	"stat" varchar,
  	"link_url" varchar,
  	"link_page_id" integer,
  	"link_label" varchar,
  	"link_new_tab" boolean
  );
  
  CREATE TABLE "pages_blocks_grid" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"heading" varchar,
  	"description" varchar,
  	"style" "enum_pages_blocks_grid_style" DEFAULT 'cards',
  	"columns" "enum_pages_blocks_grid_columns" DEFAULT '3',
  	"gap" "enum_pages_blocks_grid_gap" DEFAULT 'medium',
  	"alignment" "enum_pages_blocks_grid_alignment" DEFAULT 'left',
  	"show_border" boolean DEFAULT true,
  	"show_shadow" boolean DEFAULT true,
  	"hover_effect" "enum_pages_blocks_grid_hover_effect" DEFAULT 'none',
  	"cta_show" boolean,
  	"cta_label" varchar,
  	"cta_url" varchar,
  	"cta_page_id" integer,
  	"block_name" varchar
  );
  
  CREATE TABLE "pages_blocks_timeline_events" (
  	"_order" integer NOT NULL,
  	"_parent_id" varchar NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"date" varchar,
  	"title" varchar,
  	"description" jsonb,
  	"image_id" integer,
  	"icon" varchar,
  	"color" varchar,
  	"link_url" varchar,
  	"link_page_id" integer,
  	"link_archive_item_id" integer,
  	"link_person_id" integer,
  	"link_label" varchar DEFAULT 'Learn More',
  	"link_new_tab" boolean,
  	"featured" boolean
  );
  
  CREATE TABLE "pages_blocks_timeline" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"heading" varchar,
  	"description" varchar,
  	"layout" "enum_pages_blocks_timeline_layout" DEFAULT 'vertical',
  	"line_style" "enum_pages_blocks_timeline_line_style" DEFAULT 'solid',
  	"marker_style" "enum_pages_blocks_timeline_marker_style" DEFAULT 'circle',
  	"show_connectors" boolean DEFAULT true,
  	"show_dates" boolean DEFAULT true,
  	"animate_on_scroll" boolean DEFAULT true,
  	"sort_order" "enum_pages_blocks_timeline_sort_order" DEFAULT 'chronological',
  	"background_color" "enum_pages_blocks_timeline_background_color" DEFAULT 'transparent',
  	"block_name" varchar
  );
  
  CREATE TABLE "pages_blocks_spacer" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"style" "enum_pages_blocks_spacer_style" DEFAULT 'space',
  	"size" "enum_pages_blocks_spacer_size" DEFAULT 'md',
  	"line_style" "enum_pages_blocks_spacer_line_style" DEFAULT 'solid',
  	"block_name" varchar
  );
  
  CREATE TABLE "pages_blocks_html" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"html" varchar,
  	"block_name" varchar
  );
  
  CREATE TABLE "pages" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"title" varchar,
  	"hero_type" "enum_pages_hero_type" DEFAULT 'standard',
  	"hero_heading" varchar,
  	"hero_subheading" varchar,
  	"hero_image_id" integer,
  	"meta_title" varchar,
  	"meta_description" varchar,
  	"meta_image_id" integer,
  	"slug" varchar,
  	"template" "enum_pages_template" DEFAULT 'landing',
  	"published_at" timestamp(3) with time zone,
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"_status" "enum_pages_status" DEFAULT 'draft'
  );
  
  CREATE TABLE "pages_rels" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"order" integer,
  	"parent_id" integer NOT NULL,
  	"path" varchar NOT NULL,
  	"categories_id" integer,
  	"tags_id" integer,
  	"posts_id" integer,
  	"pages_id" integer,
  	"archive_items_id" integer,
  	"people_id" integer,
  	"places_id" integer,
  	"custom_items_id" integer
  );
  
  CREATE TABLE "_pages_v_version_hero_links" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"label" varchar,
  	"url" varchar,
  	"page_id" integer,
  	"variant" "enum__pages_v_version_hero_links_variant" DEFAULT 'primary',
  	"new_tab" boolean,
  	"_uuid" varchar
  );
  
  CREATE TABLE "_pages_v_blocks_hero_links" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"label" varchar,
  	"url" varchar,
  	"page_id" integer,
  	"variant" "enum__pages_v_blocks_hero_links_variant" DEFAULT 'primary',
  	"new_tab" boolean,
  	"_uuid" varchar
  );
  
  CREATE TABLE "_pages_v_blocks_hero" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"variant" "enum__pages_v_blocks_hero_variant" DEFAULT 'standard',
  	"type" "enum__pages_v_blocks_hero_type" DEFAULT 'standard',
  	"eyebrow" varchar,
  	"heading" varchar,
  	"subheading" varchar,
  	"image_id" integer,
  	"video_url" varchar,
  	"overlay" "enum__pages_v_blocks_hero_overlay" DEFAULT 'dark',
  	"text_align" "enum__pages_v_blocks_hero_text_align" DEFAULT 'center',
  	"_uuid" varchar,
  	"block_name" varchar
  );
  
  CREATE TABLE "_pages_v_blocks_content_columns" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"size" "enum__pages_v_blocks_content_columns_size" DEFAULT 'full',
  	"rich_text" jsonb,
  	"enable_link" boolean,
  	"link_label" varchar,
  	"link_url" varchar,
  	"link_page_id" integer,
  	"link_new_tab" boolean,
  	"_uuid" varchar
  );
  
  CREATE TABLE "_pages_v_blocks_content" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"background_color" "enum__pages_v_blocks_content_background_color" DEFAULT 'none',
  	"padding_top" "enum__pages_v_blocks_content_padding_top" DEFAULT 'medium',
  	"padding_bottom" "enum__pages_v_blocks_content_padding_bottom" DEFAULT 'medium',
  	"_uuid" varchar,
  	"block_name" varchar
  );
  
  CREATE TABLE "_pages_v_blocks_media" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"media_id" integer,
  	"caption" varchar,
  	"size" "enum__pages_v_blocks_media_size" DEFAULT 'default',
  	"position" "enum__pages_v_blocks_media_position" DEFAULT 'center',
  	"enable_link" boolean,
  	"link_url" varchar,
  	"link_page_id" integer,
  	"link_new_tab" boolean,
  	"_uuid" varchar,
  	"block_name" varchar
  );
  
  CREATE TABLE "_pages_v_blocks_cta_links" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"label" varchar,
  	"url" varchar,
  	"page_id" integer,
  	"variant" "enum__pages_v_blocks_cta_links_variant" DEFAULT 'primary',
  	"new_tab" boolean,
  	"_uuid" varchar
  );
  
  CREATE TABLE "_pages_v_blocks_cta" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"style" "enum__pages_v_blocks_cta_style" DEFAULT 'standard',
  	"heading" varchar,
  	"description" varchar,
  	"image_id" integer,
  	"background_color" "enum__pages_v_blocks_cta_background_color" DEFAULT 'primary',
  	"_uuid" varchar,
  	"block_name" varchar
  );
  
  CREATE TABLE "_pages_v_blocks_quote" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"quote" varchar,
  	"author" varchar,
  	"role" varchar,
  	"align" "enum__pages_v_blocks_quote_align" DEFAULT 'left',
  	"_uuid" varchar,
  	"block_name" varchar
  );
  
  CREATE TABLE "_pages_v_blocks_features_items" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"title" varchar,
  	"description" varchar,
  	"icon" varchar,
  	"media_id" integer,
  	"_uuid" varchar
  );
  
  CREATE TABLE "_pages_v_blocks_features" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"heading" varchar,
  	"subheading" varchar,
  	"layout" "enum__pages_v_blocks_features_layout" DEFAULT 'grid',
  	"_uuid" varchar,
  	"block_name" varchar
  );
  
  CREATE TABLE "_pages_v_blocks_stats_stats" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"value" varchar,
  	"label" varchar,
  	"description" varchar,
  	"_uuid" varchar
  );
  
  CREATE TABLE "_pages_v_blocks_stats" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"heading" varchar,
  	"subheading" varchar,
  	"_uuid" varchar,
  	"block_name" varchar
  );
  
  CREATE TABLE "_pages_v_blocks_logo_cloud_logos" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"logo_id" integer,
  	"label" varchar,
  	"url" varchar,
  	"_uuid" varchar
  );
  
  CREATE TABLE "_pages_v_blocks_logo_cloud" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"heading" varchar,
  	"_uuid" varchar,
  	"block_name" varchar
  );
  
  CREATE TABLE "_pages_v_blocks_testimonials_items" (
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
  
  CREATE TABLE "_pages_v_blocks_testimonials" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"heading" varchar,
  	"style" "enum__pages_v_blocks_testimonials_style" DEFAULT 'standard',
  	"_uuid" varchar,
  	"block_name" varchar
  );
  
  CREATE TABLE "_pages_v_blocks_faq_items" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"question" varchar,
  	"answer" jsonb,
  	"_uuid" varchar
  );
  
  CREATE TABLE "_pages_v_blocks_faq" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"heading" varchar,
  	"_uuid" varchar,
  	"block_name" varchar
  );
  
  CREATE TABLE "_pages_v_blocks_pricing_plans_features" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"feature" varchar,
  	"_uuid" varchar
  );
  
  CREATE TABLE "_pages_v_blocks_pricing_plans" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"name" varchar,
  	"price" varchar,
  	"period" varchar DEFAULT 'per month',
  	"description" varchar,
  	"cta_label" varchar,
  	"cta_url" varchar,
  	"featured" boolean,
  	"_uuid" varchar
  );
  
  CREATE TABLE "_pages_v_blocks_pricing" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"heading" varchar,
  	"subheading" varchar,
  	"_uuid" varchar,
  	"block_name" varchar
  );
  
  CREATE TABLE "_pages_v_blocks_team_members_socials" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"label" varchar,
  	"url" varchar,
  	"_uuid" varchar
  );
  
  CREATE TABLE "_pages_v_blocks_team_members" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"name" varchar,
  	"role" varchar,
  	"bio" varchar,
  	"photo_id" integer,
  	"_uuid" varchar
  );
  
  CREATE TABLE "_pages_v_blocks_team" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"heading" varchar,
  	"_uuid" varchar,
  	"block_name" varchar
  );
  
  CREATE TABLE "_pages_v_blocks_embed" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"heading" varchar,
  	"url" varchar,
  	"caption" varchar,
  	"aspect_ratio" "enum__pages_v_blocks_embed_aspect_ratio" DEFAULT '16:9',
  	"_uuid" varchar,
  	"block_name" varchar
  );
  
  CREATE TABLE "_pages_v_blocks_archive" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"heading" varchar,
  	"description" varchar,
  	"populate_by" "enum__pages_v_blocks_archive_populate_by" DEFAULT 'collection',
  	"relation_to" "enum__pages_v_blocks_archive_relation_to" DEFAULT 'posts',
  	"content_type_id" integer,
  	"limit" numeric DEFAULT 6,
  	"layout" "enum__pages_v_blocks_archive_layout" DEFAULT 'grid',
  	"columns" "enum__pages_v_blocks_archive_columns" DEFAULT '3',
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
  
  CREATE TABLE "_pages_v_blocks_form" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"form_id" integer,
  	"enable_intro" boolean,
  	"intro_content" jsonb,
  	"style" "enum__pages_v_blocks_form_style" DEFAULT 'default',
  	"background_color" "enum__pages_v_blocks_form_background_color" DEFAULT 'none',
  	"_uuid" varchar,
  	"block_name" varchar
  );
  
  CREATE TABLE "_pages_v_blocks_gallery_images" (
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
  
  CREATE TABLE "_pages_v_blocks_gallery" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"heading" varchar,
  	"description" varchar,
  	"layout" "enum__pages_v_blocks_gallery_layout" DEFAULT 'grid',
  	"columns" "enum__pages_v_blocks_gallery_columns" DEFAULT '3',
  	"gap" "enum__pages_v_blocks_gallery_gap" DEFAULT 'medium',
  	"aspect_ratio" "enum__pages_v_blocks_gallery_aspect_ratio" DEFAULT 'auto',
  	"show_captions" boolean DEFAULT true,
  	"enable_lightbox" boolean DEFAULT true,
  	"autoplay" boolean DEFAULT false,
  	"autoplay_speed" numeric DEFAULT 5000,
  	"_uuid" varchar,
  	"block_name" varchar
  );
  
  CREATE TABLE "_pages_v_blocks_grid_items" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"image_id" integer,
  	"icon" varchar,
  	"title" varchar,
  	"subtitle" varchar,
  	"description" varchar,
  	"stat" varchar,
  	"link_url" varchar,
  	"link_page_id" integer,
  	"link_label" varchar,
  	"link_new_tab" boolean,
  	"_uuid" varchar
  );
  
  CREATE TABLE "_pages_v_blocks_grid" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"heading" varchar,
  	"description" varchar,
  	"style" "enum__pages_v_blocks_grid_style" DEFAULT 'cards',
  	"columns" "enum__pages_v_blocks_grid_columns" DEFAULT '3',
  	"gap" "enum__pages_v_blocks_grid_gap" DEFAULT 'medium',
  	"alignment" "enum__pages_v_blocks_grid_alignment" DEFAULT 'left',
  	"show_border" boolean DEFAULT true,
  	"show_shadow" boolean DEFAULT true,
  	"hover_effect" "enum__pages_v_blocks_grid_hover_effect" DEFAULT 'none',
  	"cta_show" boolean,
  	"cta_label" varchar,
  	"cta_url" varchar,
  	"cta_page_id" integer,
  	"_uuid" varchar,
  	"block_name" varchar
  );
  
  CREATE TABLE "_pages_v_blocks_timeline_events" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"date" varchar,
  	"title" varchar,
  	"description" jsonb,
  	"image_id" integer,
  	"icon" varchar,
  	"color" varchar,
  	"link_url" varchar,
  	"link_page_id" integer,
  	"link_archive_item_id" integer,
  	"link_person_id" integer,
  	"link_label" varchar DEFAULT 'Learn More',
  	"link_new_tab" boolean,
  	"featured" boolean,
  	"_uuid" varchar
  );
  
  CREATE TABLE "_pages_v_blocks_timeline" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"heading" varchar,
  	"description" varchar,
  	"layout" "enum__pages_v_blocks_timeline_layout" DEFAULT 'vertical',
  	"line_style" "enum__pages_v_blocks_timeline_line_style" DEFAULT 'solid',
  	"marker_style" "enum__pages_v_blocks_timeline_marker_style" DEFAULT 'circle',
  	"show_connectors" boolean DEFAULT true,
  	"show_dates" boolean DEFAULT true,
  	"animate_on_scroll" boolean DEFAULT true,
  	"sort_order" "enum__pages_v_blocks_timeline_sort_order" DEFAULT 'chronological',
  	"background_color" "enum__pages_v_blocks_timeline_background_color" DEFAULT 'transparent',
  	"_uuid" varchar,
  	"block_name" varchar
  );
  
  CREATE TABLE "_pages_v_blocks_spacer" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"style" "enum__pages_v_blocks_spacer_style" DEFAULT 'space',
  	"size" "enum__pages_v_blocks_spacer_size" DEFAULT 'md',
  	"line_style" "enum__pages_v_blocks_spacer_line_style" DEFAULT 'solid',
  	"_uuid" varchar,
  	"block_name" varchar
  );
  
  CREATE TABLE "_pages_v_blocks_html" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"html" varchar,
  	"_uuid" varchar,
  	"block_name" varchar
  );
  
  CREATE TABLE "_pages_v" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"parent_id" integer,
  	"version_title" varchar,
  	"version_hero_type" "enum__pages_v_version_hero_type" DEFAULT 'standard',
  	"version_hero_heading" varchar,
  	"version_hero_subheading" varchar,
  	"version_hero_image_id" integer,
  	"version_meta_title" varchar,
  	"version_meta_description" varchar,
  	"version_meta_image_id" integer,
  	"version_slug" varchar,
  	"version_template" "enum__pages_v_version_template" DEFAULT 'landing',
  	"version_published_at" timestamp(3) with time zone,
  	"version_updated_at" timestamp(3) with time zone,
  	"version_created_at" timestamp(3) with time zone,
  	"version__status" "enum__pages_v_version_status" DEFAULT 'draft',
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"latest" boolean,
  	"autosave" boolean
  );
  
  CREATE TABLE "_pages_v_rels" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"order" integer,
  	"parent_id" integer NOT NULL,
  	"path" varchar NOT NULL,
  	"categories_id" integer,
  	"tags_id" integer,
  	"posts_id" integer,
  	"pages_id" integer,
  	"archive_items_id" integer,
  	"people_id" integer,
  	"places_id" integer,
  	"custom_items_id" integer
  );
  
  CREATE TABLE "posts_blocks_hero_links" (
  	"_order" integer NOT NULL,
  	"_parent_id" varchar NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"label" varchar,
  	"url" varchar,
  	"page_id" integer,
  	"variant" "enum_posts_blocks_hero_links_variant" DEFAULT 'primary',
  	"new_tab" boolean
  );
  
  CREATE TABLE "posts_blocks_hero" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"variant" "enum_posts_blocks_hero_variant" DEFAULT 'standard',
  	"type" "enum_posts_blocks_hero_type" DEFAULT 'standard',
  	"eyebrow" varchar,
  	"heading" varchar,
  	"subheading" varchar,
  	"image_id" integer,
  	"video_url" varchar,
  	"overlay" "enum_posts_blocks_hero_overlay" DEFAULT 'dark',
  	"text_align" "enum_posts_blocks_hero_text_align" DEFAULT 'center',
  	"block_name" varchar
  );
  
  CREATE TABLE "posts_blocks_content_columns" (
  	"_order" integer NOT NULL,
  	"_parent_id" varchar NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"size" "enum_posts_blocks_content_columns_size" DEFAULT 'full',
  	"rich_text" jsonb,
  	"enable_link" boolean,
  	"link_label" varchar,
  	"link_url" varchar,
  	"link_page_id" integer,
  	"link_new_tab" boolean
  );
  
  CREATE TABLE "posts_blocks_content" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"background_color" "enum_posts_blocks_content_background_color" DEFAULT 'none',
  	"padding_top" "enum_posts_blocks_content_padding_top" DEFAULT 'medium',
  	"padding_bottom" "enum_posts_blocks_content_padding_bottom" DEFAULT 'medium',
  	"block_name" varchar
  );
  
  CREATE TABLE "posts_blocks_media" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"media_id" integer,
  	"caption" varchar,
  	"size" "enum_posts_blocks_media_size" DEFAULT 'default',
  	"position" "enum_posts_blocks_media_position" DEFAULT 'center',
  	"enable_link" boolean,
  	"link_url" varchar,
  	"link_page_id" integer,
  	"link_new_tab" boolean,
  	"block_name" varchar
  );
  
  CREATE TABLE "posts_blocks_cta_links" (
  	"_order" integer NOT NULL,
  	"_parent_id" varchar NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"label" varchar,
  	"url" varchar,
  	"page_id" integer,
  	"variant" "enum_posts_blocks_cta_links_variant" DEFAULT 'primary',
  	"new_tab" boolean
  );
  
  CREATE TABLE "posts_blocks_cta" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"style" "enum_posts_blocks_cta_style" DEFAULT 'standard',
  	"heading" varchar,
  	"description" varchar,
  	"image_id" integer,
  	"background_color" "enum_posts_blocks_cta_background_color" DEFAULT 'primary',
  	"block_name" varchar
  );
  
  CREATE TABLE "posts_blocks_quote" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"quote" varchar,
  	"author" varchar,
  	"role" varchar,
  	"align" "enum_posts_blocks_quote_align" DEFAULT 'left',
  	"block_name" varchar
  );
  
  CREATE TABLE "posts_blocks_features_items" (
  	"_order" integer NOT NULL,
  	"_parent_id" varchar NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"title" varchar,
  	"description" varchar,
  	"icon" varchar,
  	"media_id" integer
  );
  
  CREATE TABLE "posts_blocks_features" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"heading" varchar,
  	"subheading" varchar,
  	"layout" "enum_posts_blocks_features_layout" DEFAULT 'grid',
  	"block_name" varchar
  );
  
  CREATE TABLE "posts_blocks_stats_stats" (
  	"_order" integer NOT NULL,
  	"_parent_id" varchar NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"value" varchar,
  	"label" varchar,
  	"description" varchar
  );
  
  CREATE TABLE "posts_blocks_stats" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"heading" varchar,
  	"subheading" varchar,
  	"block_name" varchar
  );
  
  CREATE TABLE "posts_blocks_logo_cloud_logos" (
  	"_order" integer NOT NULL,
  	"_parent_id" varchar NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"logo_id" integer,
  	"label" varchar,
  	"url" varchar
  );
  
  CREATE TABLE "posts_blocks_logo_cloud" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"heading" varchar,
  	"block_name" varchar
  );
  
  CREATE TABLE "posts_blocks_testimonials_items" (
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
  
  CREATE TABLE "posts_blocks_testimonials" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"heading" varchar,
  	"style" "enum_posts_blocks_testimonials_style" DEFAULT 'standard',
  	"block_name" varchar
  );
  
  CREATE TABLE "posts_blocks_faq_items" (
  	"_order" integer NOT NULL,
  	"_parent_id" varchar NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"question" varchar,
  	"answer" jsonb
  );
  
  CREATE TABLE "posts_blocks_faq" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"heading" varchar,
  	"block_name" varchar
  );
  
  CREATE TABLE "posts_blocks_pricing_plans_features" (
  	"_order" integer NOT NULL,
  	"_parent_id" varchar NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"feature" varchar
  );
  
  CREATE TABLE "posts_blocks_pricing_plans" (
  	"_order" integer NOT NULL,
  	"_parent_id" varchar NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"name" varchar,
  	"price" varchar,
  	"period" varchar DEFAULT 'per month',
  	"description" varchar,
  	"cta_label" varchar,
  	"cta_url" varchar,
  	"featured" boolean
  );
  
  CREATE TABLE "posts_blocks_pricing" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"heading" varchar,
  	"subheading" varchar,
  	"block_name" varchar
  );
  
  CREATE TABLE "posts_blocks_team_members_socials" (
  	"_order" integer NOT NULL,
  	"_parent_id" varchar NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"label" varchar,
  	"url" varchar
  );
  
  CREATE TABLE "posts_blocks_team_members" (
  	"_order" integer NOT NULL,
  	"_parent_id" varchar NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"name" varchar,
  	"role" varchar,
  	"bio" varchar,
  	"photo_id" integer
  );
  
  CREATE TABLE "posts_blocks_team" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"heading" varchar,
  	"block_name" varchar
  );
  
  CREATE TABLE "posts_blocks_embed" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"heading" varchar,
  	"url" varchar,
  	"caption" varchar,
  	"aspect_ratio" "enum_posts_blocks_embed_aspect_ratio" DEFAULT '16:9',
  	"block_name" varchar
  );
  
  CREATE TABLE "posts_blocks_archive" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"heading" varchar,
  	"description" varchar,
  	"populate_by" "enum_posts_blocks_archive_populate_by" DEFAULT 'collection',
  	"relation_to" "enum_posts_blocks_archive_relation_to" DEFAULT 'posts',
  	"content_type_id" integer,
  	"limit" numeric DEFAULT 6,
  	"layout" "enum_posts_blocks_archive_layout" DEFAULT 'grid',
  	"columns" "enum_posts_blocks_archive_columns" DEFAULT '3',
  	"show_image" boolean DEFAULT true,
  	"show_excerpt" boolean DEFAULT true,
  	"show_date" boolean DEFAULT true,
  	"show_author" boolean DEFAULT false,
  	"link_show" boolean,
  	"link_label" varchar DEFAULT 'View All',
  	"link_url" varchar,
  	"block_name" varchar
  );
  
  CREATE TABLE "posts_blocks_form" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"form_id" integer,
  	"enable_intro" boolean,
  	"intro_content" jsonb,
  	"style" "enum_posts_blocks_form_style" DEFAULT 'default',
  	"background_color" "enum_posts_blocks_form_background_color" DEFAULT 'none',
  	"block_name" varchar
  );
  
  CREATE TABLE "posts_blocks_gallery_images" (
  	"_order" integer NOT NULL,
  	"_parent_id" varchar NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"image_id" integer,
  	"caption" varchar,
  	"link_url" varchar,
  	"link_page_id" integer,
  	"link_new_tab" boolean
  );
  
  CREATE TABLE "posts_blocks_gallery" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"heading" varchar,
  	"description" varchar,
  	"layout" "enum_posts_blocks_gallery_layout" DEFAULT 'grid',
  	"columns" "enum_posts_blocks_gallery_columns" DEFAULT '3',
  	"gap" "enum_posts_blocks_gallery_gap" DEFAULT 'medium',
  	"aspect_ratio" "enum_posts_blocks_gallery_aspect_ratio" DEFAULT 'auto',
  	"show_captions" boolean DEFAULT true,
  	"enable_lightbox" boolean DEFAULT true,
  	"autoplay" boolean DEFAULT false,
  	"autoplay_speed" numeric DEFAULT 5000,
  	"block_name" varchar
  );
  
  CREATE TABLE "posts_blocks_grid_items" (
  	"_order" integer NOT NULL,
  	"_parent_id" varchar NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"image_id" integer,
  	"icon" varchar,
  	"title" varchar,
  	"subtitle" varchar,
  	"description" varchar,
  	"stat" varchar,
  	"link_url" varchar,
  	"link_page_id" integer,
  	"link_label" varchar,
  	"link_new_tab" boolean
  );
  
  CREATE TABLE "posts_blocks_grid" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"heading" varchar,
  	"description" varchar,
  	"style" "enum_posts_blocks_grid_style" DEFAULT 'cards',
  	"columns" "enum_posts_blocks_grid_columns" DEFAULT '3',
  	"gap" "enum_posts_blocks_grid_gap" DEFAULT 'medium',
  	"alignment" "enum_posts_blocks_grid_alignment" DEFAULT 'left',
  	"show_border" boolean DEFAULT true,
  	"show_shadow" boolean DEFAULT true,
  	"hover_effect" "enum_posts_blocks_grid_hover_effect" DEFAULT 'none',
  	"cta_show" boolean,
  	"cta_label" varchar,
  	"cta_url" varchar,
  	"cta_page_id" integer,
  	"block_name" varchar
  );
  
  CREATE TABLE "posts_blocks_timeline_events" (
  	"_order" integer NOT NULL,
  	"_parent_id" varchar NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"date" varchar,
  	"title" varchar,
  	"description" jsonb,
  	"image_id" integer,
  	"icon" varchar,
  	"color" varchar,
  	"link_url" varchar,
  	"link_page_id" integer,
  	"link_archive_item_id" integer,
  	"link_person_id" integer,
  	"link_label" varchar DEFAULT 'Learn More',
  	"link_new_tab" boolean,
  	"featured" boolean
  );
  
  CREATE TABLE "posts_blocks_timeline" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"heading" varchar,
  	"description" varchar,
  	"layout" "enum_posts_blocks_timeline_layout" DEFAULT 'vertical',
  	"line_style" "enum_posts_blocks_timeline_line_style" DEFAULT 'solid',
  	"marker_style" "enum_posts_blocks_timeline_marker_style" DEFAULT 'circle',
  	"show_connectors" boolean DEFAULT true,
  	"show_dates" boolean DEFAULT true,
  	"animate_on_scroll" boolean DEFAULT true,
  	"sort_order" "enum_posts_blocks_timeline_sort_order" DEFAULT 'chronological',
  	"background_color" "enum_posts_blocks_timeline_background_color" DEFAULT 'transparent',
  	"block_name" varchar
  );
  
  CREATE TABLE "posts_blocks_spacer" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"style" "enum_posts_blocks_spacer_style" DEFAULT 'space',
  	"size" "enum_posts_blocks_spacer_size" DEFAULT 'md',
  	"line_style" "enum_posts_blocks_spacer_line_style" DEFAULT 'solid',
  	"block_name" varchar
  );
  
  CREATE TABLE "posts_blocks_html" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"html" varchar,
  	"block_name" varchar
  );
  
  CREATE TABLE "posts" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"title" varchar,
  	"featured_image_id" integer,
  	"excerpt" varchar,
  	"content" jsonb,
  	"meta_title" varchar,
  	"meta_description" varchar,
  	"meta_image_id" integer,
  	"slug" varchar,
  	"template" "enum_posts_template" DEFAULT 'article',
  	"author_id" integer,
  	"published_at" timestamp(3) with time zone,
  	"featured" boolean,
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"_status" "enum_posts_status" DEFAULT 'draft'
  );
  
  CREATE TABLE "posts_rels" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"order" integer,
  	"parent_id" integer NOT NULL,
  	"path" varchar NOT NULL,
  	"categories_id" integer,
  	"tags_id" integer,
  	"posts_id" integer,
  	"pages_id" integer,
  	"archive_items_id" integer,
  	"people_id" integer,
  	"places_id" integer,
  	"custom_items_id" integer
  );
  
  CREATE TABLE "_posts_v_blocks_hero_links" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"label" varchar,
  	"url" varchar,
  	"page_id" integer,
  	"variant" "enum__posts_v_blocks_hero_links_variant" DEFAULT 'primary',
  	"new_tab" boolean,
  	"_uuid" varchar
  );
  
  CREATE TABLE "_posts_v_blocks_hero" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"variant" "enum__posts_v_blocks_hero_variant" DEFAULT 'standard',
  	"type" "enum__posts_v_blocks_hero_type" DEFAULT 'standard',
  	"eyebrow" varchar,
  	"heading" varchar,
  	"subheading" varchar,
  	"image_id" integer,
  	"video_url" varchar,
  	"overlay" "enum__posts_v_blocks_hero_overlay" DEFAULT 'dark',
  	"text_align" "enum__posts_v_blocks_hero_text_align" DEFAULT 'center',
  	"_uuid" varchar,
  	"block_name" varchar
  );
  
  CREATE TABLE "_posts_v_blocks_content_columns" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"size" "enum__posts_v_blocks_content_columns_size" DEFAULT 'full',
  	"rich_text" jsonb,
  	"enable_link" boolean,
  	"link_label" varchar,
  	"link_url" varchar,
  	"link_page_id" integer,
  	"link_new_tab" boolean,
  	"_uuid" varchar
  );
  
  CREATE TABLE "_posts_v_blocks_content" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"background_color" "enum__posts_v_blocks_content_background_color" DEFAULT 'none',
  	"padding_top" "enum__posts_v_blocks_content_padding_top" DEFAULT 'medium',
  	"padding_bottom" "enum__posts_v_blocks_content_padding_bottom" DEFAULT 'medium',
  	"_uuid" varchar,
  	"block_name" varchar
  );
  
  CREATE TABLE "_posts_v_blocks_media" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"media_id" integer,
  	"caption" varchar,
  	"size" "enum__posts_v_blocks_media_size" DEFAULT 'default',
  	"position" "enum__posts_v_blocks_media_position" DEFAULT 'center',
  	"enable_link" boolean,
  	"link_url" varchar,
  	"link_page_id" integer,
  	"link_new_tab" boolean,
  	"_uuid" varchar,
  	"block_name" varchar
  );
  
  CREATE TABLE "_posts_v_blocks_cta_links" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"label" varchar,
  	"url" varchar,
  	"page_id" integer,
  	"variant" "enum__posts_v_blocks_cta_links_variant" DEFAULT 'primary',
  	"new_tab" boolean,
  	"_uuid" varchar
  );
  
  CREATE TABLE "_posts_v_blocks_cta" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"style" "enum__posts_v_blocks_cta_style" DEFAULT 'standard',
  	"heading" varchar,
  	"description" varchar,
  	"image_id" integer,
  	"background_color" "enum__posts_v_blocks_cta_background_color" DEFAULT 'primary',
  	"_uuid" varchar,
  	"block_name" varchar
  );
  
  CREATE TABLE "_posts_v_blocks_quote" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"quote" varchar,
  	"author" varchar,
  	"role" varchar,
  	"align" "enum__posts_v_blocks_quote_align" DEFAULT 'left',
  	"_uuid" varchar,
  	"block_name" varchar
  );
  
  CREATE TABLE "_posts_v_blocks_features_items" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"title" varchar,
  	"description" varchar,
  	"icon" varchar,
  	"media_id" integer,
  	"_uuid" varchar
  );
  
  CREATE TABLE "_posts_v_blocks_features" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"heading" varchar,
  	"subheading" varchar,
  	"layout" "enum__posts_v_blocks_features_layout" DEFAULT 'grid',
  	"_uuid" varchar,
  	"block_name" varchar
  );
  
  CREATE TABLE "_posts_v_blocks_stats_stats" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"value" varchar,
  	"label" varchar,
  	"description" varchar,
  	"_uuid" varchar
  );
  
  CREATE TABLE "_posts_v_blocks_stats" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"heading" varchar,
  	"subheading" varchar,
  	"_uuid" varchar,
  	"block_name" varchar
  );
  
  CREATE TABLE "_posts_v_blocks_logo_cloud_logos" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"logo_id" integer,
  	"label" varchar,
  	"url" varchar,
  	"_uuid" varchar
  );
  
  CREATE TABLE "_posts_v_blocks_logo_cloud" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"heading" varchar,
  	"_uuid" varchar,
  	"block_name" varchar
  );
  
  CREATE TABLE "_posts_v_blocks_testimonials_items" (
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
  
  CREATE TABLE "_posts_v_blocks_testimonials" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"heading" varchar,
  	"style" "enum__posts_v_blocks_testimonials_style" DEFAULT 'standard',
  	"_uuid" varchar,
  	"block_name" varchar
  );
  
  CREATE TABLE "_posts_v_blocks_faq_items" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"question" varchar,
  	"answer" jsonb,
  	"_uuid" varchar
  );
  
  CREATE TABLE "_posts_v_blocks_faq" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"heading" varchar,
  	"_uuid" varchar,
  	"block_name" varchar
  );
  
  CREATE TABLE "_posts_v_blocks_pricing_plans_features" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"feature" varchar,
  	"_uuid" varchar
  );
  
  CREATE TABLE "_posts_v_blocks_pricing_plans" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"name" varchar,
  	"price" varchar,
  	"period" varchar DEFAULT 'per month',
  	"description" varchar,
  	"cta_label" varchar,
  	"cta_url" varchar,
  	"featured" boolean,
  	"_uuid" varchar
  );
  
  CREATE TABLE "_posts_v_blocks_pricing" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"heading" varchar,
  	"subheading" varchar,
  	"_uuid" varchar,
  	"block_name" varchar
  );
  
  CREATE TABLE "_posts_v_blocks_team_members_socials" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"label" varchar,
  	"url" varchar,
  	"_uuid" varchar
  );
  
  CREATE TABLE "_posts_v_blocks_team_members" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"name" varchar,
  	"role" varchar,
  	"bio" varchar,
  	"photo_id" integer,
  	"_uuid" varchar
  );
  
  CREATE TABLE "_posts_v_blocks_team" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"heading" varchar,
  	"_uuid" varchar,
  	"block_name" varchar
  );
  
  CREATE TABLE "_posts_v_blocks_embed" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"heading" varchar,
  	"url" varchar,
  	"caption" varchar,
  	"aspect_ratio" "enum__posts_v_blocks_embed_aspect_ratio" DEFAULT '16:9',
  	"_uuid" varchar,
  	"block_name" varchar
  );
  
  CREATE TABLE "_posts_v_blocks_archive" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"heading" varchar,
  	"description" varchar,
  	"populate_by" "enum__posts_v_blocks_archive_populate_by" DEFAULT 'collection',
  	"relation_to" "enum__posts_v_blocks_archive_relation_to" DEFAULT 'posts',
  	"content_type_id" integer,
  	"limit" numeric DEFAULT 6,
  	"layout" "enum__posts_v_blocks_archive_layout" DEFAULT 'grid',
  	"columns" "enum__posts_v_blocks_archive_columns" DEFAULT '3',
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
  
  CREATE TABLE "_posts_v_blocks_form" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"form_id" integer,
  	"enable_intro" boolean,
  	"intro_content" jsonb,
  	"style" "enum__posts_v_blocks_form_style" DEFAULT 'default',
  	"background_color" "enum__posts_v_blocks_form_background_color" DEFAULT 'none',
  	"_uuid" varchar,
  	"block_name" varchar
  );
  
  CREATE TABLE "_posts_v_blocks_gallery_images" (
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
  
  CREATE TABLE "_posts_v_blocks_gallery" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"heading" varchar,
  	"description" varchar,
  	"layout" "enum__posts_v_blocks_gallery_layout" DEFAULT 'grid',
  	"columns" "enum__posts_v_blocks_gallery_columns" DEFAULT '3',
  	"gap" "enum__posts_v_blocks_gallery_gap" DEFAULT 'medium',
  	"aspect_ratio" "enum__posts_v_blocks_gallery_aspect_ratio" DEFAULT 'auto',
  	"show_captions" boolean DEFAULT true,
  	"enable_lightbox" boolean DEFAULT true,
  	"autoplay" boolean DEFAULT false,
  	"autoplay_speed" numeric DEFAULT 5000,
  	"_uuid" varchar,
  	"block_name" varchar
  );
  
  CREATE TABLE "_posts_v_blocks_grid_items" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"image_id" integer,
  	"icon" varchar,
  	"title" varchar,
  	"subtitle" varchar,
  	"description" varchar,
  	"stat" varchar,
  	"link_url" varchar,
  	"link_page_id" integer,
  	"link_label" varchar,
  	"link_new_tab" boolean,
  	"_uuid" varchar
  );
  
  CREATE TABLE "_posts_v_blocks_grid" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"heading" varchar,
  	"description" varchar,
  	"style" "enum__posts_v_blocks_grid_style" DEFAULT 'cards',
  	"columns" "enum__posts_v_blocks_grid_columns" DEFAULT '3',
  	"gap" "enum__posts_v_blocks_grid_gap" DEFAULT 'medium',
  	"alignment" "enum__posts_v_blocks_grid_alignment" DEFAULT 'left',
  	"show_border" boolean DEFAULT true,
  	"show_shadow" boolean DEFAULT true,
  	"hover_effect" "enum__posts_v_blocks_grid_hover_effect" DEFAULT 'none',
  	"cta_show" boolean,
  	"cta_label" varchar,
  	"cta_url" varchar,
  	"cta_page_id" integer,
  	"_uuid" varchar,
  	"block_name" varchar
  );
  
  CREATE TABLE "_posts_v_blocks_timeline_events" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"date" varchar,
  	"title" varchar,
  	"description" jsonb,
  	"image_id" integer,
  	"icon" varchar,
  	"color" varchar,
  	"link_url" varchar,
  	"link_page_id" integer,
  	"link_archive_item_id" integer,
  	"link_person_id" integer,
  	"link_label" varchar DEFAULT 'Learn More',
  	"link_new_tab" boolean,
  	"featured" boolean,
  	"_uuid" varchar
  );
  
  CREATE TABLE "_posts_v_blocks_timeline" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"heading" varchar,
  	"description" varchar,
  	"layout" "enum__posts_v_blocks_timeline_layout" DEFAULT 'vertical',
  	"line_style" "enum__posts_v_blocks_timeline_line_style" DEFAULT 'solid',
  	"marker_style" "enum__posts_v_blocks_timeline_marker_style" DEFAULT 'circle',
  	"show_connectors" boolean DEFAULT true,
  	"show_dates" boolean DEFAULT true,
  	"animate_on_scroll" boolean DEFAULT true,
  	"sort_order" "enum__posts_v_blocks_timeline_sort_order" DEFAULT 'chronological',
  	"background_color" "enum__posts_v_blocks_timeline_background_color" DEFAULT 'transparent',
  	"_uuid" varchar,
  	"block_name" varchar
  );
  
  CREATE TABLE "_posts_v_blocks_spacer" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"style" "enum__posts_v_blocks_spacer_style" DEFAULT 'space',
  	"size" "enum__posts_v_blocks_spacer_size" DEFAULT 'md',
  	"line_style" "enum__posts_v_blocks_spacer_line_style" DEFAULT 'solid',
  	"_uuid" varchar,
  	"block_name" varchar
  );
  
  CREATE TABLE "_posts_v_blocks_html" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"html" varchar,
  	"_uuid" varchar,
  	"block_name" varchar
  );
  
  CREATE TABLE "_posts_v" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"parent_id" integer,
  	"version_title" varchar,
  	"version_featured_image_id" integer,
  	"version_excerpt" varchar,
  	"version_content" jsonb,
  	"version_meta_title" varchar,
  	"version_meta_description" varchar,
  	"version_meta_image_id" integer,
  	"version_slug" varchar,
  	"version_template" "enum__posts_v_version_template" DEFAULT 'article',
  	"version_author_id" integer,
  	"version_published_at" timestamp(3) with time zone,
  	"version_featured" boolean,
  	"version_updated_at" timestamp(3) with time zone,
  	"version_created_at" timestamp(3) with time zone,
  	"version__status" "enum__posts_v_version_status" DEFAULT 'draft',
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"latest" boolean,
  	"autosave" boolean
  );
  
  CREATE TABLE "_posts_v_rels" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"order" integer,
  	"parent_id" integer NOT NULL,
  	"path" varchar NOT NULL,
  	"categories_id" integer,
  	"tags_id" integer,
  	"posts_id" integer,
  	"pages_id" integer,
  	"archive_items_id" integer,
  	"people_id" integer,
  	"places_id" integer,
  	"custom_items_id" integer
  );
  
  CREATE TABLE "categories_breadcrumbs" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"doc_id" integer,
  	"url" varchar,
  	"label" varchar
  );
  
  CREATE TABLE "categories" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"title" varchar NOT NULL,
  	"slug" varchar NOT NULL,
  	"parent_id" integer,
  	"description" varchar,
  	"featured_image_id" integer,
  	"total_count" numeric,
  	"posts_count" numeric,
  	"archive_items_count" numeric,
  	"events_count" numeric,
  	"people_count" numeric,
  	"custom_items_count" numeric,
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL
  );
  
  CREATE TABLE "_categories_v_version_breadcrumbs" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"doc_id" integer,
  	"url" varchar,
  	"label" varchar,
  	"_uuid" varchar
  );
  
  CREATE TABLE "_categories_v" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"parent_id" integer,
  	"version_title" varchar NOT NULL,
  	"version_slug" varchar NOT NULL,
  	"version_parent_id" integer,
  	"version_description" varchar,
  	"version_featured_image_id" integer,
  	"version_total_count" numeric,
  	"version_posts_count" numeric,
  	"version_archive_items_count" numeric,
  	"version_events_count" numeric,
  	"version_people_count" numeric,
  	"version_custom_items_count" numeric,
  	"version_updated_at" timestamp(3) with time zone,
  	"version_created_at" timestamp(3) with time zone,
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL
  );
  
  CREATE TABLE "tags" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"title" varchar NOT NULL,
  	"slug" varchar NOT NULL,
  	"description" varchar,
  	"total_count" numeric,
  	"posts_count" numeric,
  	"archive_items_count" numeric,
  	"events_count" numeric,
  	"people_count" numeric,
  	"custom_items_count" numeric,
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL
  );
  
  CREATE TABLE "_tags_v" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"parent_id" integer,
  	"version_title" varchar NOT NULL,
  	"version_slug" varchar NOT NULL,
  	"version_description" varchar,
  	"version_total_count" numeric,
  	"version_posts_count" numeric,
  	"version_archive_items_count" numeric,
  	"version_events_count" numeric,
  	"version_people_count" numeric,
  	"version_custom_items_count" numeric,
  	"version_updated_at" timestamp(3) with time zone,
  	"version_created_at" timestamp(3) with time zone,
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL
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
  	"type" "enum_archive_items_blocks_hero_type" DEFAULT 'standard',
  	"eyebrow" varchar,
  	"heading" varchar,
  	"subheading" varchar,
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
  	"style" "enum_archive_items_blocks_cta_style" DEFAULT 'standard',
  	"heading" varchar,
  	"description" varchar,
  	"image_id" integer,
  	"background_color" "enum_archive_items_blocks_cta_background_color" DEFAULT 'primary',
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
  	"content_type_id" integer,
  	"limit" numeric DEFAULT 6,
  	"layout" "enum_archive_items_blocks_archive_layout" DEFAULT 'grid',
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
  	"style" "enum_archive_items_blocks_form_style" DEFAULT 'default',
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
  	"layout" "enum_archive_items_blocks_gallery_layout" DEFAULT 'grid',
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
  	"title" varchar,
  	"subtitle" varchar,
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
  	"style" "enum_archive_items_blocks_grid_style" DEFAULT 'cards',
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
  	"title" varchar,
  	"description" jsonb,
  	"image_id" integer,
  	"icon" varchar,
  	"color" varchar,
  	"link_url" varchar,
  	"link_page_id" integer,
  	"link_archive_item_id" integer,
  	"link_person_id" integer,
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
  	"layout" "enum_archive_items_blocks_timeline_layout" DEFAULT 'vertical',
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
  	"meta_title" varchar,
  	"meta_description" varchar,
  	"meta_image_id" integer,
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
  	"pages_id" integer,
  	"custom_items_id" integer
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
  	"type" "enum__archive_items_v_blocks_hero_type" DEFAULT 'standard',
  	"eyebrow" varchar,
  	"heading" varchar,
  	"subheading" varchar,
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
  	"style" "enum__archive_items_v_blocks_cta_style" DEFAULT 'standard',
  	"heading" varchar,
  	"description" varchar,
  	"image_id" integer,
  	"background_color" "enum__archive_items_v_blocks_cta_background_color" DEFAULT 'primary',
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
  	"content_type_id" integer,
  	"limit" numeric DEFAULT 6,
  	"layout" "enum__archive_items_v_blocks_archive_layout" DEFAULT 'grid',
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
  	"style" "enum__archive_items_v_blocks_form_style" DEFAULT 'default',
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
  	"layout" "enum__archive_items_v_blocks_gallery_layout" DEFAULT 'grid',
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
  	"title" varchar,
  	"subtitle" varchar,
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
  	"style" "enum__archive_items_v_blocks_grid_style" DEFAULT 'cards',
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
  	"title" varchar,
  	"description" jsonb,
  	"image_id" integer,
  	"icon" varchar,
  	"color" varchar,
  	"link_url" varchar,
  	"link_page_id" integer,
  	"link_archive_item_id" integer,
  	"link_person_id" integer,
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
  	"layout" "enum__archive_items_v_blocks_timeline_layout" DEFAULT 'vertical',
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
  	"version_meta_title" varchar,
  	"version_meta_description" varchar,
  	"version_meta_image_id" integer,
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
  	"pages_id" integer,
  	"custom_items_id" integer
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
  	"type" "enum_people_blocks_hero_type" DEFAULT 'standard',
  	"eyebrow" varchar,
  	"heading" varchar,
  	"subheading" varchar,
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
  	"style" "enum_people_blocks_cta_style" DEFAULT 'standard',
  	"heading" varchar,
  	"description" varchar,
  	"image_id" integer,
  	"background_color" "enum_people_blocks_cta_background_color" DEFAULT 'primary',
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
  	"block_name" varchar
  );
  
  CREATE TABLE "people_blocks_features_items" (
  	"_order" integer NOT NULL,
  	"_parent_id" varchar NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"title" varchar,
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
  	"subheading" varchar,
  	"layout" "enum_people_blocks_features_layout" DEFAULT 'grid',
  	"block_name" varchar
  );
  
  CREATE TABLE "people_blocks_stats_stats" (
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
  	"subheading" varchar,
  	"block_name" varchar
  );
  
  CREATE TABLE "people_blocks_logo_cloud_logos" (
  	"_order" integer NOT NULL,
  	"_parent_id" varchar NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"logo_id" integer,
  	"label" varchar,
  	"url" varchar
  );
  
  CREATE TABLE "people_blocks_logo_cloud" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"heading" varchar,
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
  	"style" "enum_people_blocks_testimonials_style" DEFAULT 'standard',
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
  	"block_name" varchar
  );
  
  CREATE TABLE "people_blocks_pricing_plans_features" (
  	"_order" integer NOT NULL,
  	"_parent_id" varchar NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"feature" varchar
  );
  
  CREATE TABLE "people_blocks_pricing_plans" (
  	"_order" integer NOT NULL,
  	"_parent_id" varchar NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"name" varchar,
  	"price" varchar,
  	"period" varchar DEFAULT 'per month',
  	"description" varchar,
  	"cta_label" varchar,
  	"cta_url" varchar,
  	"featured" boolean
  );
  
  CREATE TABLE "people_blocks_pricing" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"heading" varchar,
  	"subheading" varchar,
  	"block_name" varchar
  );
  
  CREATE TABLE "people_blocks_team_members_socials" (
  	"_order" integer NOT NULL,
  	"_parent_id" varchar NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"label" varchar,
  	"url" varchar
  );
  
  CREATE TABLE "people_blocks_team_members" (
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
  	"content_type_id" integer,
  	"limit" numeric DEFAULT 6,
  	"layout" "enum_people_blocks_archive_layout" DEFAULT 'grid',
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
  	"style" "enum_people_blocks_form_style" DEFAULT 'default',
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
  	"layout" "enum_people_blocks_gallery_layout" DEFAULT 'grid',
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
  	"title" varchar,
  	"subtitle" varchar,
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
  	"style" "enum_people_blocks_grid_style" DEFAULT 'cards',
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
  	"title" varchar,
  	"description" jsonb,
  	"image_id" integer,
  	"icon" varchar,
  	"color" varchar,
  	"link_url" varchar,
  	"link_page_id" integer,
  	"link_archive_item_id" integer,
  	"link_person_id" integer,
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
  	"layout" "enum_people_blocks_timeline_layout" DEFAULT 'vertical',
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
  	"meta_title" varchar,
  	"meta_description" varchar,
  	"meta_image_id" integer,
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
  	"pages_id" integer,
  	"archive_items_id" integer,
  	"places_id" integer,
  	"custom_items_id" integer
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
  	"type" "enum__people_v_blocks_hero_type" DEFAULT 'standard',
  	"eyebrow" varchar,
  	"heading" varchar,
  	"subheading" varchar,
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
  	"style" "enum__people_v_blocks_cta_style" DEFAULT 'standard',
  	"heading" varchar,
  	"description" varchar,
  	"image_id" integer,
  	"background_color" "enum__people_v_blocks_cta_background_color" DEFAULT 'primary',
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
  	"_uuid" varchar,
  	"block_name" varchar
  );
  
  CREATE TABLE "_people_v_blocks_features_items" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"title" varchar,
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
  	"subheading" varchar,
  	"layout" "enum__people_v_blocks_features_layout" DEFAULT 'grid',
  	"_uuid" varchar,
  	"block_name" varchar
  );
  
  CREATE TABLE "_people_v_blocks_stats_stats" (
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
  	"subheading" varchar,
  	"_uuid" varchar,
  	"block_name" varchar
  );
  
  CREATE TABLE "_people_v_blocks_logo_cloud_logos" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"logo_id" integer,
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
  	"style" "enum__people_v_blocks_testimonials_style" DEFAULT 'standard',
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
  
  CREATE TABLE "_people_v_blocks_pricing_plans" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"name" varchar,
  	"price" varchar,
  	"period" varchar DEFAULT 'per month',
  	"description" varchar,
  	"cta_label" varchar,
  	"cta_url" varchar,
  	"featured" boolean,
  	"_uuid" varchar
  );
  
  CREATE TABLE "_people_v_blocks_pricing" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"heading" varchar,
  	"subheading" varchar,
  	"_uuid" varchar,
  	"block_name" varchar
  );
  
  CREATE TABLE "_people_v_blocks_team_members_socials" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"label" varchar,
  	"url" varchar,
  	"_uuid" varchar
  );
  
  CREATE TABLE "_people_v_blocks_team_members" (
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
  	"content_type_id" integer,
  	"limit" numeric DEFAULT 6,
  	"layout" "enum__people_v_blocks_archive_layout" DEFAULT 'grid',
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
  	"style" "enum__people_v_blocks_form_style" DEFAULT 'default',
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
  	"layout" "enum__people_v_blocks_gallery_layout" DEFAULT 'grid',
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
  	"title" varchar,
  	"subtitle" varchar,
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
  	"style" "enum__people_v_blocks_grid_style" DEFAULT 'cards',
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
  	"title" varchar,
  	"description" jsonb,
  	"image_id" integer,
  	"icon" varchar,
  	"color" varchar,
  	"link_url" varchar,
  	"link_page_id" integer,
  	"link_archive_item_id" integer,
  	"link_person_id" integer,
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
  	"layout" "enum__people_v_blocks_timeline_layout" DEFAULT 'vertical',
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
  	"version_meta_title" varchar,
  	"version_meta_description" varchar,
  	"version_meta_image_id" integer,
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
  	"pages_id" integer,
  	"archive_items_id" integer,
  	"places_id" integer,
  	"custom_items_id" integer
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
  	"type" "enum_places_blocks_hero_type" DEFAULT 'standard',
  	"eyebrow" varchar,
  	"heading" varchar,
  	"subheading" varchar,
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
  	"style" "enum_places_blocks_cta_style" DEFAULT 'standard',
  	"heading" varchar,
  	"description" varchar,
  	"image_id" integer,
  	"background_color" "enum_places_blocks_cta_background_color" DEFAULT 'primary',
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
  	"block_name" varchar
  );
  
  CREATE TABLE "places_blocks_features_items" (
  	"_order" integer NOT NULL,
  	"_parent_id" varchar NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"title" varchar,
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
  	"subheading" varchar,
  	"layout" "enum_places_blocks_features_layout" DEFAULT 'grid',
  	"block_name" varchar
  );
  
  CREATE TABLE "places_blocks_stats_stats" (
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
  	"subheading" varchar,
  	"block_name" varchar
  );
  
  CREATE TABLE "places_blocks_logo_cloud_logos" (
  	"_order" integer NOT NULL,
  	"_parent_id" varchar NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"logo_id" integer,
  	"label" varchar,
  	"url" varchar
  );
  
  CREATE TABLE "places_blocks_logo_cloud" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"heading" varchar,
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
  	"style" "enum_places_blocks_testimonials_style" DEFAULT 'standard',
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
  	"block_name" varchar
  );
  
  CREATE TABLE "places_blocks_pricing_plans_features" (
  	"_order" integer NOT NULL,
  	"_parent_id" varchar NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"feature" varchar
  );
  
  CREATE TABLE "places_blocks_pricing_plans" (
  	"_order" integer NOT NULL,
  	"_parent_id" varchar NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"name" varchar,
  	"price" varchar,
  	"period" varchar DEFAULT 'per month',
  	"description" varchar,
  	"cta_label" varchar,
  	"cta_url" varchar,
  	"featured" boolean
  );
  
  CREATE TABLE "places_blocks_pricing" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"heading" varchar,
  	"subheading" varchar,
  	"block_name" varchar
  );
  
  CREATE TABLE "places_blocks_team_members_socials" (
  	"_order" integer NOT NULL,
  	"_parent_id" varchar NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"label" varchar,
  	"url" varchar
  );
  
  CREATE TABLE "places_blocks_team_members" (
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
  	"content_type_id" integer,
  	"limit" numeric DEFAULT 6,
  	"layout" "enum_places_blocks_archive_layout" DEFAULT 'grid',
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
  	"style" "enum_places_blocks_form_style" DEFAULT 'default',
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
  	"layout" "enum_places_blocks_gallery_layout" DEFAULT 'grid',
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
  	"title" varchar,
  	"subtitle" varchar,
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
  	"style" "enum_places_blocks_grid_style" DEFAULT 'cards',
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
  	"title" varchar,
  	"description" jsonb,
  	"image_id" integer,
  	"icon" varchar,
  	"color" varchar,
  	"link_url" varchar,
  	"link_page_id" integer,
  	"link_archive_item_id" integer,
  	"link_person_id" integer,
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
  	"layout" "enum_places_blocks_timeline_layout" DEFAULT 'vertical',
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
  	"location" geometry(Point),
  	"address_street" varchar,
  	"address_street2" varchar,
  	"address_city" varchar,
  	"address_region" varchar,
  	"address_postal_code" varchar,
  	"address_country" varchar,
  	"phone" varchar,
  	"email" varchar,
  	"website" varchar,
  	"meta_title" varchar,
  	"meta_description" varchar,
  	"meta_image_id" integer,
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
  	"pages_id" integer,
  	"archive_items_id" integer,
  	"people_id" integer,
  	"custom_items_id" integer
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
  	"type" "enum__places_v_blocks_hero_type" DEFAULT 'standard',
  	"eyebrow" varchar,
  	"heading" varchar,
  	"subheading" varchar,
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
  	"style" "enum__places_v_blocks_cta_style" DEFAULT 'standard',
  	"heading" varchar,
  	"description" varchar,
  	"image_id" integer,
  	"background_color" "enum__places_v_blocks_cta_background_color" DEFAULT 'primary',
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
  	"_uuid" varchar,
  	"block_name" varchar
  );
  
  CREATE TABLE "_places_v_blocks_features_items" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"title" varchar,
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
  	"subheading" varchar,
  	"layout" "enum__places_v_blocks_features_layout" DEFAULT 'grid',
  	"_uuid" varchar,
  	"block_name" varchar
  );
  
  CREATE TABLE "_places_v_blocks_stats_stats" (
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
  	"subheading" varchar,
  	"_uuid" varchar,
  	"block_name" varchar
  );
  
  CREATE TABLE "_places_v_blocks_logo_cloud_logos" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"logo_id" integer,
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
  	"style" "enum__places_v_blocks_testimonials_style" DEFAULT 'standard',
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
  
  CREATE TABLE "_places_v_blocks_pricing_plans" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"name" varchar,
  	"price" varchar,
  	"period" varchar DEFAULT 'per month',
  	"description" varchar,
  	"cta_label" varchar,
  	"cta_url" varchar,
  	"featured" boolean,
  	"_uuid" varchar
  );
  
  CREATE TABLE "_places_v_blocks_pricing" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"heading" varchar,
  	"subheading" varchar,
  	"_uuid" varchar,
  	"block_name" varchar
  );
  
  CREATE TABLE "_places_v_blocks_team_members_socials" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"label" varchar,
  	"url" varchar,
  	"_uuid" varchar
  );
  
  CREATE TABLE "_places_v_blocks_team_members" (
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
  	"content_type_id" integer,
  	"limit" numeric DEFAULT 6,
  	"layout" "enum__places_v_blocks_archive_layout" DEFAULT 'grid',
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
  	"style" "enum__places_v_blocks_form_style" DEFAULT 'default',
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
  	"layout" "enum__places_v_blocks_gallery_layout" DEFAULT 'grid',
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
  	"title" varchar,
  	"subtitle" varchar,
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
  	"style" "enum__places_v_blocks_grid_style" DEFAULT 'cards',
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
  	"title" varchar,
  	"description" jsonb,
  	"image_id" integer,
  	"icon" varchar,
  	"color" varchar,
  	"link_url" varchar,
  	"link_page_id" integer,
  	"link_archive_item_id" integer,
  	"link_person_id" integer,
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
  	"layout" "enum__places_v_blocks_timeline_layout" DEFAULT 'vertical',
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
  	"version_location" geometry(Point),
  	"version_address_street" varchar,
  	"version_address_street2" varchar,
  	"version_address_city" varchar,
  	"version_address_region" varchar,
  	"version_address_postal_code" varchar,
  	"version_address_country" varchar,
  	"version_phone" varchar,
  	"version_email" varchar,
  	"version_website" varchar,
  	"version_meta_title" varchar,
  	"version_meta_description" varchar,
  	"version_meta_image_id" integer,
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
  	"pages_id" integer,
  	"archive_items_id" integer,
  	"people_id" integer,
  	"custom_items_id" integer
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
  	"type" "enum_events_blocks_hero_type" DEFAULT 'standard',
  	"eyebrow" varchar,
  	"heading" varchar,
  	"subheading" varchar,
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
  	"style" "enum_events_blocks_cta_style" DEFAULT 'standard',
  	"heading" varchar,
  	"description" varchar,
  	"image_id" integer,
  	"background_color" "enum_events_blocks_cta_background_color" DEFAULT 'primary',
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
  	"content_type_id" integer,
  	"limit" numeric DEFAULT 6,
  	"layout" "enum_events_blocks_archive_layout" DEFAULT 'grid',
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
  	"style" "enum_events_blocks_form_style" DEFAULT 'default',
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
  	"layout" "enum_events_blocks_gallery_layout" DEFAULT 'grid',
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
  	"title" varchar,
  	"subtitle" varchar,
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
  	"style" "enum_events_blocks_grid_style" DEFAULT 'cards',
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
  	"title" varchar,
  	"description" jsonb,
  	"image_id" integer,
  	"icon" varchar,
  	"color" varchar,
  	"link_url" varchar,
  	"link_page_id" integer,
  	"link_archive_item_id" integer,
  	"link_person_id" integer,
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
  	"layout" "enum_events_blocks_timeline_layout" DEFAULT 'vertical',
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
  	"meta_title" varchar,
  	"meta_description" varchar,
  	"meta_image_id" integer,
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
  	"pages_id" integer,
  	"archive_items_id" integer,
  	"places_id" integer,
  	"custom_items_id" integer
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
  	"type" "enum__events_v_blocks_hero_type" DEFAULT 'standard',
  	"eyebrow" varchar,
  	"heading" varchar,
  	"subheading" varchar,
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
  	"style" "enum__events_v_blocks_cta_style" DEFAULT 'standard',
  	"heading" varchar,
  	"description" varchar,
  	"image_id" integer,
  	"background_color" "enum__events_v_blocks_cta_background_color" DEFAULT 'primary',
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
  	"content_type_id" integer,
  	"limit" numeric DEFAULT 6,
  	"layout" "enum__events_v_blocks_archive_layout" DEFAULT 'grid',
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
  	"style" "enum__events_v_blocks_form_style" DEFAULT 'default',
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
  	"layout" "enum__events_v_blocks_gallery_layout" DEFAULT 'grid',
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
  	"title" varchar,
  	"subtitle" varchar,
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
  	"style" "enum__events_v_blocks_grid_style" DEFAULT 'cards',
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
  	"title" varchar,
  	"description" jsonb,
  	"image_id" integer,
  	"icon" varchar,
  	"color" varchar,
  	"link_url" varchar,
  	"link_page_id" integer,
  	"link_archive_item_id" integer,
  	"link_person_id" integer,
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
  	"layout" "enum__events_v_blocks_timeline_layout" DEFAULT 'vertical',
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
  	"version_meta_title" varchar,
  	"version_meta_description" varchar,
  	"version_meta_image_id" integer,
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
  	"pages_id" integer,
  	"archive_items_id" integer,
  	"places_id" integer,
  	"custom_items_id" integer
  );
  
  CREATE TABLE "products_gallery" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"image_id" integer,
  	"caption" varchar
  );
  
  CREATE TABLE "products_variants" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"name" varchar,
  	"sku" varchar,
  	"price" numeric,
  	"stock_quantity" numeric,
  	"image_id" integer
  );
  
  CREATE TABLE "products_blocks_hero_links" (
  	"_order" integer NOT NULL,
  	"_parent_id" varchar NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"label" varchar,
  	"url" varchar,
  	"page_id" integer,
  	"variant" "enum_products_blocks_hero_links_variant" DEFAULT 'primary',
  	"new_tab" boolean
  );
  
  CREATE TABLE "products_blocks_hero" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"variant" "enum_products_blocks_hero_variant" DEFAULT 'standard',
  	"type" "enum_products_blocks_hero_type" DEFAULT 'standard',
  	"eyebrow" varchar,
  	"heading" varchar,
  	"subheading" varchar,
  	"image_id" integer,
  	"video_url" varchar,
  	"overlay" "enum_products_blocks_hero_overlay" DEFAULT 'dark',
  	"text_align" "enum_products_blocks_hero_text_align" DEFAULT 'center',
  	"block_name" varchar
  );
  
  CREATE TABLE "products_blocks_content_columns" (
  	"_order" integer NOT NULL,
  	"_parent_id" varchar NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"size" "enum_products_blocks_content_columns_size" DEFAULT 'full',
  	"rich_text" jsonb,
  	"enable_link" boolean,
  	"link_label" varchar,
  	"link_url" varchar,
  	"link_page_id" integer,
  	"link_new_tab" boolean
  );
  
  CREATE TABLE "products_blocks_content" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"background_color" "enum_products_blocks_content_background_color" DEFAULT 'none',
  	"padding_top" "enum_products_blocks_content_padding_top" DEFAULT 'medium',
  	"padding_bottom" "enum_products_blocks_content_padding_bottom" DEFAULT 'medium',
  	"block_name" varchar
  );
  
  CREATE TABLE "products_blocks_media" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"media_id" integer,
  	"caption" varchar,
  	"size" "enum_products_blocks_media_size" DEFAULT 'default',
  	"position" "enum_products_blocks_media_position" DEFAULT 'center',
  	"enable_link" boolean,
  	"link_url" varchar,
  	"link_page_id" integer,
  	"link_new_tab" boolean,
  	"block_name" varchar
  );
  
  CREATE TABLE "products_blocks_cta_links" (
  	"_order" integer NOT NULL,
  	"_parent_id" varchar NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"label" varchar,
  	"url" varchar,
  	"page_id" integer,
  	"variant" "enum_products_blocks_cta_links_variant" DEFAULT 'primary',
  	"new_tab" boolean
  );
  
  CREATE TABLE "products_blocks_cta" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"style" "enum_products_blocks_cta_style" DEFAULT 'standard',
  	"heading" varchar,
  	"description" varchar,
  	"image_id" integer,
  	"background_color" "enum_products_blocks_cta_background_color" DEFAULT 'primary',
  	"block_name" varchar
  );
  
  CREATE TABLE "products_blocks_archive" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"heading" varchar,
  	"description" varchar,
  	"populate_by" "enum_products_blocks_archive_populate_by" DEFAULT 'collection',
  	"relation_to" "enum_products_blocks_archive_relation_to" DEFAULT 'posts',
  	"content_type_id" integer,
  	"limit" numeric DEFAULT 6,
  	"layout" "enum_products_blocks_archive_layout" DEFAULT 'grid',
  	"columns" "enum_products_blocks_archive_columns" DEFAULT '3',
  	"show_image" boolean DEFAULT true,
  	"show_excerpt" boolean DEFAULT true,
  	"show_date" boolean DEFAULT true,
  	"show_author" boolean DEFAULT false,
  	"link_show" boolean,
  	"link_label" varchar DEFAULT 'View All',
  	"link_url" varchar,
  	"block_name" varchar
  );
  
  CREATE TABLE "products_blocks_form" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"form_id" integer,
  	"enable_intro" boolean,
  	"intro_content" jsonb,
  	"style" "enum_products_blocks_form_style" DEFAULT 'default',
  	"background_color" "enum_products_blocks_form_background_color" DEFAULT 'none',
  	"block_name" varchar
  );
  
  CREATE TABLE "products_blocks_gallery_images" (
  	"_order" integer NOT NULL,
  	"_parent_id" varchar NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"image_id" integer,
  	"caption" varchar,
  	"link_url" varchar,
  	"link_page_id" integer,
  	"link_new_tab" boolean
  );
  
  CREATE TABLE "products_blocks_gallery" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"heading" varchar,
  	"description" varchar,
  	"layout" "enum_products_blocks_gallery_layout" DEFAULT 'grid',
  	"columns" "enum_products_blocks_gallery_columns" DEFAULT '3',
  	"gap" "enum_products_blocks_gallery_gap" DEFAULT 'medium',
  	"aspect_ratio" "enum_products_blocks_gallery_aspect_ratio" DEFAULT 'auto',
  	"show_captions" boolean DEFAULT true,
  	"enable_lightbox" boolean DEFAULT true,
  	"autoplay" boolean DEFAULT false,
  	"autoplay_speed" numeric DEFAULT 5000,
  	"block_name" varchar
  );
  
  CREATE TABLE "products_blocks_grid_items" (
  	"_order" integer NOT NULL,
  	"_parent_id" varchar NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"image_id" integer,
  	"icon" varchar,
  	"title" varchar,
  	"subtitle" varchar,
  	"description" varchar,
  	"stat" varchar,
  	"link_url" varchar,
  	"link_page_id" integer,
  	"link_label" varchar,
  	"link_new_tab" boolean
  );
  
  CREATE TABLE "products_blocks_grid" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"heading" varchar,
  	"description" varchar,
  	"style" "enum_products_blocks_grid_style" DEFAULT 'cards',
  	"columns" "enum_products_blocks_grid_columns" DEFAULT '3',
  	"gap" "enum_products_blocks_grid_gap" DEFAULT 'medium',
  	"alignment" "enum_products_blocks_grid_alignment" DEFAULT 'left',
  	"show_border" boolean DEFAULT true,
  	"show_shadow" boolean DEFAULT true,
  	"hover_effect" "enum_products_blocks_grid_hover_effect" DEFAULT 'none',
  	"cta_show" boolean,
  	"cta_label" varchar,
  	"cta_url" varchar,
  	"cta_page_id" integer,
  	"block_name" varchar
  );
  
  CREATE TABLE "products_blocks_timeline_events" (
  	"_order" integer NOT NULL,
  	"_parent_id" varchar NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"date" varchar,
  	"title" varchar,
  	"description" jsonb,
  	"image_id" integer,
  	"icon" varchar,
  	"color" varchar,
  	"link_url" varchar,
  	"link_page_id" integer,
  	"link_archive_item_id" integer,
  	"link_person_id" integer,
  	"link_label" varchar DEFAULT 'Learn More',
  	"link_new_tab" boolean,
  	"featured" boolean
  );
  
  CREATE TABLE "products_blocks_timeline" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"heading" varchar,
  	"description" varchar,
  	"layout" "enum_products_blocks_timeline_layout" DEFAULT 'vertical',
  	"line_style" "enum_products_blocks_timeline_line_style" DEFAULT 'solid',
  	"marker_style" "enum_products_blocks_timeline_marker_style" DEFAULT 'circle',
  	"show_connectors" boolean DEFAULT true,
  	"show_dates" boolean DEFAULT true,
  	"animate_on_scroll" boolean DEFAULT true,
  	"sort_order" "enum_products_blocks_timeline_sort_order" DEFAULT 'chronological',
  	"background_color" "enum_products_blocks_timeline_background_color" DEFAULT 'transparent',
  	"block_name" varchar
  );
  
  CREATE TABLE "products" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"title" varchar,
  	"featured_image_id" integer,
  	"excerpt" varchar,
  	"rich_content" jsonb,
  	"price" numeric,
  	"sale_price" numeric,
  	"currency" "enum_products_currency" DEFAULT 'GBP',
  	"taxable" boolean DEFAULT true,
  	"sku" varchar,
  	"barcode" varchar,
  	"stock_quantity" numeric DEFAULT 0,
  	"low_stock_threshold" numeric DEFAULT 5,
  	"track_inventory" boolean DEFAULT true,
  	"allow_backorder" boolean DEFAULT false,
  	"weight" numeric,
  	"length" numeric,
  	"width" numeric,
  	"height" numeric,
  	"shipping_class" "enum_products_shipping_class",
  	"meta_title" varchar,
  	"meta_description" varchar,
  	"meta_image_id" integer,
  	"slug" varchar,
  	"featured" boolean,
  	"availability" "enum_products_availability" DEFAULT 'active',
  	"template" "enum_products_template" DEFAULT 'standard',
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"_status" "enum_products_status" DEFAULT 'draft'
  );
  
  CREATE TABLE "products_rels" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"order" integer,
  	"parent_id" integer NOT NULL,
  	"path" varchar NOT NULL,
  	"categories_id" integer,
  	"product_collections_id" integer,
  	"tags_id" integer,
  	"products_id" integer,
  	"posts_id" integer,
  	"pages_id" integer,
  	"archive_items_id" integer,
  	"people_id" integer,
  	"places_id" integer,
  	"custom_items_id" integer
  );
  
  CREATE TABLE "_products_v_version_gallery" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"image_id" integer,
  	"caption" varchar,
  	"_uuid" varchar
  );
  
  CREATE TABLE "_products_v_version_variants" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"name" varchar,
  	"sku" varchar,
  	"price" numeric,
  	"stock_quantity" numeric,
  	"image_id" integer,
  	"_uuid" varchar
  );
  
  CREATE TABLE "_products_v_blocks_hero_links" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"label" varchar,
  	"url" varchar,
  	"page_id" integer,
  	"variant" "enum__products_v_blocks_hero_links_variant" DEFAULT 'primary',
  	"new_tab" boolean,
  	"_uuid" varchar
  );
  
  CREATE TABLE "_products_v_blocks_hero" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"variant" "enum__products_v_blocks_hero_variant" DEFAULT 'standard',
  	"type" "enum__products_v_blocks_hero_type" DEFAULT 'standard',
  	"eyebrow" varchar,
  	"heading" varchar,
  	"subheading" varchar,
  	"image_id" integer,
  	"video_url" varchar,
  	"overlay" "enum__products_v_blocks_hero_overlay" DEFAULT 'dark',
  	"text_align" "enum__products_v_blocks_hero_text_align" DEFAULT 'center',
  	"_uuid" varchar,
  	"block_name" varchar
  );
  
  CREATE TABLE "_products_v_blocks_content_columns" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"size" "enum__products_v_blocks_content_columns_size" DEFAULT 'full',
  	"rich_text" jsonb,
  	"enable_link" boolean,
  	"link_label" varchar,
  	"link_url" varchar,
  	"link_page_id" integer,
  	"link_new_tab" boolean,
  	"_uuid" varchar
  );
  
  CREATE TABLE "_products_v_blocks_content" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"background_color" "enum__products_v_blocks_content_background_color" DEFAULT 'none',
  	"padding_top" "enum__products_v_blocks_content_padding_top" DEFAULT 'medium',
  	"padding_bottom" "enum__products_v_blocks_content_padding_bottom" DEFAULT 'medium',
  	"_uuid" varchar,
  	"block_name" varchar
  );
  
  CREATE TABLE "_products_v_blocks_media" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"media_id" integer,
  	"caption" varchar,
  	"size" "enum__products_v_blocks_media_size" DEFAULT 'default',
  	"position" "enum__products_v_blocks_media_position" DEFAULT 'center',
  	"enable_link" boolean,
  	"link_url" varchar,
  	"link_page_id" integer,
  	"link_new_tab" boolean,
  	"_uuid" varchar,
  	"block_name" varchar
  );
  
  CREATE TABLE "_products_v_blocks_cta_links" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"label" varchar,
  	"url" varchar,
  	"page_id" integer,
  	"variant" "enum__products_v_blocks_cta_links_variant" DEFAULT 'primary',
  	"new_tab" boolean,
  	"_uuid" varchar
  );
  
  CREATE TABLE "_products_v_blocks_cta" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"style" "enum__products_v_blocks_cta_style" DEFAULT 'standard',
  	"heading" varchar,
  	"description" varchar,
  	"image_id" integer,
  	"background_color" "enum__products_v_blocks_cta_background_color" DEFAULT 'primary',
  	"_uuid" varchar,
  	"block_name" varchar
  );
  
  CREATE TABLE "_products_v_blocks_archive" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"heading" varchar,
  	"description" varchar,
  	"populate_by" "enum__products_v_blocks_archive_populate_by" DEFAULT 'collection',
  	"relation_to" "enum__products_v_blocks_archive_relation_to" DEFAULT 'posts',
  	"content_type_id" integer,
  	"limit" numeric DEFAULT 6,
  	"layout" "enum__products_v_blocks_archive_layout" DEFAULT 'grid',
  	"columns" "enum__products_v_blocks_archive_columns" DEFAULT '3',
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
  
  CREATE TABLE "_products_v_blocks_form" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"form_id" integer,
  	"enable_intro" boolean,
  	"intro_content" jsonb,
  	"style" "enum__products_v_blocks_form_style" DEFAULT 'default',
  	"background_color" "enum__products_v_blocks_form_background_color" DEFAULT 'none',
  	"_uuid" varchar,
  	"block_name" varchar
  );
  
  CREATE TABLE "_products_v_blocks_gallery_images" (
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
  
  CREATE TABLE "_products_v_blocks_gallery" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"heading" varchar,
  	"description" varchar,
  	"layout" "enum__products_v_blocks_gallery_layout" DEFAULT 'grid',
  	"columns" "enum__products_v_blocks_gallery_columns" DEFAULT '3',
  	"gap" "enum__products_v_blocks_gallery_gap" DEFAULT 'medium',
  	"aspect_ratio" "enum__products_v_blocks_gallery_aspect_ratio" DEFAULT 'auto',
  	"show_captions" boolean DEFAULT true,
  	"enable_lightbox" boolean DEFAULT true,
  	"autoplay" boolean DEFAULT false,
  	"autoplay_speed" numeric DEFAULT 5000,
  	"_uuid" varchar,
  	"block_name" varchar
  );
  
  CREATE TABLE "_products_v_blocks_grid_items" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"image_id" integer,
  	"icon" varchar,
  	"title" varchar,
  	"subtitle" varchar,
  	"description" varchar,
  	"stat" varchar,
  	"link_url" varchar,
  	"link_page_id" integer,
  	"link_label" varchar,
  	"link_new_tab" boolean,
  	"_uuid" varchar
  );
  
  CREATE TABLE "_products_v_blocks_grid" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"heading" varchar,
  	"description" varchar,
  	"style" "enum__products_v_blocks_grid_style" DEFAULT 'cards',
  	"columns" "enum__products_v_blocks_grid_columns" DEFAULT '3',
  	"gap" "enum__products_v_blocks_grid_gap" DEFAULT 'medium',
  	"alignment" "enum__products_v_blocks_grid_alignment" DEFAULT 'left',
  	"show_border" boolean DEFAULT true,
  	"show_shadow" boolean DEFAULT true,
  	"hover_effect" "enum__products_v_blocks_grid_hover_effect" DEFAULT 'none',
  	"cta_show" boolean,
  	"cta_label" varchar,
  	"cta_url" varchar,
  	"cta_page_id" integer,
  	"_uuid" varchar,
  	"block_name" varchar
  );
  
  CREATE TABLE "_products_v_blocks_timeline_events" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"date" varchar,
  	"title" varchar,
  	"description" jsonb,
  	"image_id" integer,
  	"icon" varchar,
  	"color" varchar,
  	"link_url" varchar,
  	"link_page_id" integer,
  	"link_archive_item_id" integer,
  	"link_person_id" integer,
  	"link_label" varchar DEFAULT 'Learn More',
  	"link_new_tab" boolean,
  	"featured" boolean,
  	"_uuid" varchar
  );
  
  CREATE TABLE "_products_v_blocks_timeline" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"heading" varchar,
  	"description" varchar,
  	"layout" "enum__products_v_blocks_timeline_layout" DEFAULT 'vertical',
  	"line_style" "enum__products_v_blocks_timeline_line_style" DEFAULT 'solid',
  	"marker_style" "enum__products_v_blocks_timeline_marker_style" DEFAULT 'circle',
  	"show_connectors" boolean DEFAULT true,
  	"show_dates" boolean DEFAULT true,
  	"animate_on_scroll" boolean DEFAULT true,
  	"sort_order" "enum__products_v_blocks_timeline_sort_order" DEFAULT 'chronological',
  	"background_color" "enum__products_v_blocks_timeline_background_color" DEFAULT 'transparent',
  	"_uuid" varchar,
  	"block_name" varchar
  );
  
  CREATE TABLE "_products_v" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"parent_id" integer,
  	"version_title" varchar,
  	"version_featured_image_id" integer,
  	"version_excerpt" varchar,
  	"version_rich_content" jsonb,
  	"version_price" numeric,
  	"version_sale_price" numeric,
  	"version_currency" "enum__products_v_version_currency" DEFAULT 'GBP',
  	"version_taxable" boolean DEFAULT true,
  	"version_sku" varchar,
  	"version_barcode" varchar,
  	"version_stock_quantity" numeric DEFAULT 0,
  	"version_low_stock_threshold" numeric DEFAULT 5,
  	"version_track_inventory" boolean DEFAULT true,
  	"version_allow_backorder" boolean DEFAULT false,
  	"version_weight" numeric,
  	"version_length" numeric,
  	"version_width" numeric,
  	"version_height" numeric,
  	"version_shipping_class" "enum__products_v_version_shipping_class",
  	"version_meta_title" varchar,
  	"version_meta_description" varchar,
  	"version_meta_image_id" integer,
  	"version_slug" varchar,
  	"version_featured" boolean,
  	"version_availability" "enum__products_v_version_availability" DEFAULT 'active',
  	"version_template" "enum__products_v_version_template" DEFAULT 'standard',
  	"version_updated_at" timestamp(3) with time zone,
  	"version_created_at" timestamp(3) with time zone,
  	"version__status" "enum__products_v_version_status" DEFAULT 'draft',
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"latest" boolean,
  	"autosave" boolean
  );
  
  CREATE TABLE "_products_v_rels" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"order" integer,
  	"parent_id" integer NOT NULL,
  	"path" varchar NOT NULL,
  	"categories_id" integer,
  	"product_collections_id" integer,
  	"tags_id" integer,
  	"products_id" integer,
  	"posts_id" integer,
  	"pages_id" integer,
  	"archive_items_id" integer,
  	"people_id" integer,
  	"places_id" integer,
  	"custom_items_id" integer
  );
  
  CREATE TABLE "product_categories_breadcrumbs" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"doc_id" integer,
  	"url" varchar,
  	"label" varchar
  );
  
  CREATE TABLE "product_categories" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"name" varchar NOT NULL,
  	"slug" varchar NOT NULL,
  	"description" varchar,
  	"featured_image_id" integer,
  	"parent_id" integer,
  	"display_order" numeric,
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL
  );
  
  CREATE TABLE "_product_categories_v_version_breadcrumbs" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"doc_id" integer,
  	"url" varchar,
  	"label" varchar,
  	"_uuid" varchar
  );
  
  CREATE TABLE "_product_categories_v" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"parent_id" integer,
  	"version_name" varchar NOT NULL,
  	"version_slug" varchar NOT NULL,
  	"version_description" varchar,
  	"version_featured_image_id" integer,
  	"version_parent_id" integer,
  	"version_display_order" numeric,
  	"version_updated_at" timestamp(3) with time zone,
  	"version_created_at" timestamp(3) with time zone,
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL
  );
  
  CREATE TABLE "product_collections" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"name" varchar,
  	"description" jsonb,
  	"short_description" varchar,
  	"featured_image_id" integer,
  	"banner_image_id" integer,
  	"template" "enum_product_collections_template" DEFAULT 'list',
  	"display_order" numeric,
  	"color" varchar,
  	"start_date" timestamp(3) with time zone,
  	"end_date" timestamp(3) with time zone,
  	"discount_percentage" numeric,
  	"slug" varchar,
  	"featured" boolean,
  	"show_in_navigation" boolean,
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"_status" "enum_product_collections_status" DEFAULT 'draft'
  );
  
  CREATE TABLE "product_collections_rels" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"order" integer,
  	"parent_id" integer NOT NULL,
  	"path" varchar NOT NULL,
  	"products_id" integer
  );
  
  CREATE TABLE "_product_collections_v" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"parent_id" integer,
  	"version_name" varchar,
  	"version_description" jsonb,
  	"version_short_description" varchar,
  	"version_featured_image_id" integer,
  	"version_banner_image_id" integer,
  	"version_template" "enum__product_collections_v_version_template" DEFAULT 'list',
  	"version_display_order" numeric,
  	"version_color" varchar,
  	"version_start_date" timestamp(3) with time zone,
  	"version_end_date" timestamp(3) with time zone,
  	"version_discount_percentage" numeric,
  	"version_slug" varchar,
  	"version_featured" boolean,
  	"version_show_in_navigation" boolean,
  	"version_updated_at" timestamp(3) with time zone,
  	"version_created_at" timestamp(3) with time zone,
  	"version__status" "enum__product_collections_v_version_status" DEFAULT 'draft',
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"latest" boolean,
  	"autosave" boolean
  );
  
  CREATE TABLE "_product_collections_v_rels" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"order" integer,
  	"parent_id" integer NOT NULL,
  	"path" varchar NOT NULL,
  	"products_id" integer
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
  	"meta_title" varchar,
  	"meta_description" varchar,
  	"meta_image_id" integer,
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
  	"type" "enum_custom_items_blocks_hero_type" DEFAULT 'standard',
  	"eyebrow" varchar,
  	"heading" varchar,
  	"subheading" varchar,
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
  	"style" "enum_custom_items_blocks_cta_style" DEFAULT 'standard',
  	"heading" varchar,
  	"description" varchar,
  	"image_id" integer,
  	"background_color" "enum_custom_items_blocks_cta_background_color" DEFAULT 'primary',
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
  	"block_name" varchar
  );
  
  CREATE TABLE "custom_items_blocks_features_items" (
  	"_order" integer NOT NULL,
  	"_parent_id" varchar NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"title" varchar,
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
  	"subheading" varchar,
  	"layout" "enum_custom_items_blocks_features_layout" DEFAULT 'grid',
  	"block_name" varchar
  );
  
  CREATE TABLE "custom_items_blocks_stats_stats" (
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
  	"subheading" varchar,
  	"block_name" varchar
  );
  
  CREATE TABLE "custom_items_blocks_logo_cloud_logos" (
  	"_order" integer NOT NULL,
  	"_parent_id" varchar NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"logo_id" integer,
  	"label" varchar,
  	"url" varchar
  );
  
  CREATE TABLE "custom_items_blocks_logo_cloud" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"heading" varchar,
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
  	"style" "enum_custom_items_blocks_testimonials_style" DEFAULT 'standard',
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
  	"block_name" varchar
  );
  
  CREATE TABLE "custom_items_blocks_pricing_plans_features" (
  	"_order" integer NOT NULL,
  	"_parent_id" varchar NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"feature" varchar
  );
  
  CREATE TABLE "custom_items_blocks_pricing_plans" (
  	"_order" integer NOT NULL,
  	"_parent_id" varchar NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"name" varchar,
  	"price" varchar,
  	"period" varchar DEFAULT 'per month',
  	"description" varchar,
  	"cta_label" varchar,
  	"cta_url" varchar,
  	"featured" boolean
  );
  
  CREATE TABLE "custom_items_blocks_pricing" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"heading" varchar,
  	"subheading" varchar,
  	"block_name" varchar
  );
  
  CREATE TABLE "custom_items_blocks_team_members_socials" (
  	"_order" integer NOT NULL,
  	"_parent_id" varchar NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"label" varchar,
  	"url" varchar
  );
  
  CREATE TABLE "custom_items_blocks_team_members" (
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
  	"layout" "enum_custom_items_blocks_gallery_layout" DEFAULT 'grid',
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
  	"title" varchar,
  	"subtitle" varchar,
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
  	"style" "enum_custom_items_blocks_grid_style" DEFAULT 'cards',
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
  	"title" varchar,
  	"description" jsonb,
  	"image_id" integer,
  	"icon" varchar,
  	"color" varchar,
  	"link_url" varchar,
  	"link_page_id" integer,
  	"link_archive_item_id" integer,
  	"link_person_id" integer,
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
  	"layout" "enum_custom_items_blocks_timeline_layout" DEFAULT 'vertical',
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
  	"content_type_id" integer,
  	"limit" numeric DEFAULT 6,
  	"layout" "enum_custom_items_blocks_archive_layout" DEFAULT 'grid',
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
  	"style" "enum_custom_items_blocks_form_style" DEFAULT 'default',
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
  	"meta_title" varchar,
  	"meta_description" varchar,
  	"meta_image_id" integer,
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
  	"pages_id" integer,
  	"archive_items_id" integer,
  	"people_id" integer,
  	"places_id" integer,
  	"custom_items_id" integer
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
  	"type" "enum__custom_items_v_blocks_hero_type" DEFAULT 'standard',
  	"eyebrow" varchar,
  	"heading" varchar,
  	"subheading" varchar,
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
  	"style" "enum__custom_items_v_blocks_cta_style" DEFAULT 'standard',
  	"heading" varchar,
  	"description" varchar,
  	"image_id" integer,
  	"background_color" "enum__custom_items_v_blocks_cta_background_color" DEFAULT 'primary',
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
  	"_uuid" varchar,
  	"block_name" varchar
  );
  
  CREATE TABLE "_custom_items_v_blocks_features_items" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"title" varchar,
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
  	"subheading" varchar,
  	"layout" "enum__custom_items_v_blocks_features_layout" DEFAULT 'grid',
  	"_uuid" varchar,
  	"block_name" varchar
  );
  
  CREATE TABLE "_custom_items_v_blocks_stats_stats" (
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
  	"subheading" varchar,
  	"_uuid" varchar,
  	"block_name" varchar
  );
  
  CREATE TABLE "_custom_items_v_blocks_logo_cloud_logos" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"logo_id" integer,
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
  	"style" "enum__custom_items_v_blocks_testimonials_style" DEFAULT 'standard',
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
  
  CREATE TABLE "_custom_items_v_blocks_pricing_plans" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"name" varchar,
  	"price" varchar,
  	"period" varchar DEFAULT 'per month',
  	"description" varchar,
  	"cta_label" varchar,
  	"cta_url" varchar,
  	"featured" boolean,
  	"_uuid" varchar
  );
  
  CREATE TABLE "_custom_items_v_blocks_pricing" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"heading" varchar,
  	"subheading" varchar,
  	"_uuid" varchar,
  	"block_name" varchar
  );
  
  CREATE TABLE "_custom_items_v_blocks_team_members_socials" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"label" varchar,
  	"url" varchar,
  	"_uuid" varchar
  );
  
  CREATE TABLE "_custom_items_v_blocks_team_members" (
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
  	"layout" "enum__custom_items_v_blocks_gallery_layout" DEFAULT 'grid',
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
  	"title" varchar,
  	"subtitle" varchar,
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
  	"style" "enum__custom_items_v_blocks_grid_style" DEFAULT 'cards',
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
  	"title" varchar,
  	"description" jsonb,
  	"image_id" integer,
  	"icon" varchar,
  	"color" varchar,
  	"link_url" varchar,
  	"link_page_id" integer,
  	"link_archive_item_id" integer,
  	"link_person_id" integer,
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
  	"layout" "enum__custom_items_v_blocks_timeline_layout" DEFAULT 'vertical',
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
  	"content_type_id" integer,
  	"limit" numeric DEFAULT 6,
  	"layout" "enum__custom_items_v_blocks_archive_layout" DEFAULT 'grid',
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
  	"style" "enum__custom_items_v_blocks_form_style" DEFAULT 'default',
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
  	"version_meta_title" varchar,
  	"version_meta_description" varchar,
  	"version_meta_image_id" integer,
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
  	"pages_id" integer,
  	"archive_items_id" integer,
  	"people_id" integer,
  	"places_id" integer,
  	"custom_items_id" integer
  );
  
  CREATE TABLE "forms_blocks_checkbox" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"name" varchar NOT NULL,
  	"label" varchar,
  	"width" numeric,
  	"required" boolean,
  	"default_value" boolean,
  	"block_name" varchar
  );
  
  CREATE TABLE "forms_blocks_country" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"name" varchar NOT NULL,
  	"label" varchar,
  	"width" numeric,
  	"required" boolean,
  	"block_name" varchar
  );
  
  CREATE TABLE "forms_blocks_email" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"name" varchar NOT NULL,
  	"label" varchar,
  	"width" numeric,
  	"required" boolean,
  	"block_name" varchar
  );
  
  CREATE TABLE "forms_blocks_message" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"message" jsonb,
  	"block_name" varchar
  );
  
  CREATE TABLE "forms_blocks_number" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"name" varchar NOT NULL,
  	"label" varchar,
  	"width" numeric,
  	"default_value" numeric,
  	"required" boolean,
  	"block_name" varchar
  );
  
  CREATE TABLE "forms_blocks_select_options" (
  	"_order" integer NOT NULL,
  	"_parent_id" varchar NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"label" varchar NOT NULL,
  	"value" varchar NOT NULL
  );
  
  CREATE TABLE "forms_blocks_select" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"name" varchar NOT NULL,
  	"label" varchar,
  	"width" numeric,
  	"default_value" varchar,
  	"placeholder" varchar,
  	"required" boolean,
  	"block_name" varchar
  );
  
  CREATE TABLE "forms_blocks_state" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"name" varchar NOT NULL,
  	"label" varchar,
  	"width" numeric,
  	"required" boolean,
  	"block_name" varchar
  );
  
  CREATE TABLE "forms_blocks_text" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"name" varchar NOT NULL,
  	"label" varchar,
  	"width" numeric,
  	"default_value" varchar,
  	"required" boolean,
  	"block_name" varchar
  );
  
  CREATE TABLE "forms_blocks_textarea" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"name" varchar NOT NULL,
  	"label" varchar,
  	"width" numeric,
  	"default_value" varchar,
  	"required" boolean,
  	"block_name" varchar
  );
  
  CREATE TABLE "forms_emails" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"email_to" varchar,
  	"cc" varchar,
  	"bcc" varchar,
  	"reply_to" varchar,
  	"email_from" varchar,
  	"subject" varchar DEFAULT 'You''ve received a new message.' NOT NULL,
  	"message" jsonb
  );
  
  CREATE TABLE "forms" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"title" varchar NOT NULL,
  	"submit_button_label" varchar,
  	"confirmation_type" "enum_forms_confirmation_type" DEFAULT 'message',
  	"confirmation_message" jsonb,
  	"redirect_url" varchar,
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL
  );
  
  CREATE TABLE "form_submissions_submission_data" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"field" varchar NOT NULL,
  	"value" varchar NOT NULL
  );
  
  CREATE TABLE "form_submissions" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"form_id" integer NOT NULL,
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL
  );
  
  CREATE TABLE "redirects" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"from" varchar NOT NULL,
  	"to_type" "enum_redirects_to_type" DEFAULT 'reference',
  	"to_url" varchar,
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL
  );
  
  CREATE TABLE "redirects_rels" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"order" integer,
  	"parent_id" integer NOT NULL,
  	"path" varchar NOT NULL,
  	"pages_id" integer,
  	"posts_id" integer,
  	"archive_items_id" integer
  );
  
  CREATE TABLE "search" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"title" varchar,
  	"priority" numeric,
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL
  );
  
  CREATE TABLE "search_rels" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"order" integer,
  	"parent_id" integer NOT NULL,
  	"path" varchar NOT NULL,
  	"pages_id" integer,
  	"posts_id" integer,
  	"archive_items_id" integer,
  	"people_id" integer,
  	"places_id" integer,
  	"events_id" integer,
  	"products_id" integer,
  	"custom_items_id" integer,
  	"content_types_id" integer
  );
  
  CREATE TABLE "payload_kv" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"key" varchar NOT NULL,
  	"data" jsonb NOT NULL
  );
  
  CREATE TABLE "payload_jobs_log" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"executed_at" timestamp(3) with time zone NOT NULL,
  	"completed_at" timestamp(3) with time zone NOT NULL,
  	"task_slug" "enum_payload_jobs_log_task_slug" NOT NULL,
  	"task_i_d" varchar NOT NULL,
  	"input" jsonb,
  	"output" jsonb,
  	"state" "enum_payload_jobs_log_state" NOT NULL,
  	"error" jsonb
  );
  
  CREATE TABLE "payload_jobs" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"input" jsonb,
  	"completed_at" timestamp(3) with time zone,
  	"total_tried" numeric DEFAULT 0,
  	"has_error" boolean DEFAULT false,
  	"error" jsonb,
  	"task_slug" "enum_payload_jobs_task_slug",
  	"queue" varchar DEFAULT 'default',
  	"wait_until" timestamp(3) with time zone,
  	"processing" boolean DEFAULT false,
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL
  );
  
  CREATE TABLE "payload_locked_documents" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"global_slug" varchar,
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL
  );
  
  CREATE TABLE "payload_locked_documents_rels" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"order" integer,
  	"parent_id" integer NOT NULL,
  	"path" varchar NOT NULL,
  	"users_id" integer,
  	"media_id" integer,
  	"pages_id" integer,
  	"posts_id" integer,
  	"categories_id" integer,
  	"tags_id" integer,
  	"archive_items_id" integer,
  	"people_id" integer,
  	"places_id" integer,
  	"events_id" integer,
  	"products_id" integer,
  	"product_categories_id" integer,
  	"product_collections_id" integer,
  	"content_types_id" integer,
  	"custom_items_id" integer,
  	"forms_id" integer,
  	"form_submissions_id" integer,
  	"redirects_id" integer,
  	"search_id" integer
  );
  
  CREATE TABLE "payload_preferences" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"key" varchar,
  	"value" jsonb,
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL
  );
  
  CREATE TABLE "payload_preferences_rels" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"order" integer,
  	"parent_id" integer NOT NULL,
  	"path" varchar NOT NULL,
  	"users_id" integer
  );
  
  CREATE TABLE "payload_migrations" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"name" varchar,
  	"batch" numeric,
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL
  );
  
  CREATE TABLE "header_nav_items_children" (
  	"_order" integer NOT NULL,
  	"_parent_id" varchar NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"label" varchar,
  	"url" varchar,
  	"page_id" integer,
  	"description" varchar,
  	"new_tab" boolean
  );
  
  CREATE TABLE "header_nav_items" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"label" varchar NOT NULL,
  	"type" "enum_header_nav_items_type" DEFAULT 'link',
  	"url" varchar,
  	"page_id" integer,
  	"new_tab" boolean
  );
  
  CREATE TABLE "header" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"logo_id" integer,
  	"logo_text" varchar,
  	"cta_button_show" boolean,
  	"cta_button_label" varchar,
  	"cta_button_url" varchar,
  	"cta_button_page_id" integer,
  	"cta_button_new_tab" boolean,
  	"updated_at" timestamp(3) with time zone,
  	"created_at" timestamp(3) with time zone
  );
  
  CREATE TABLE "footer_columns_links" (
  	"_order" integer NOT NULL,
  	"_parent_id" varchar NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"label" varchar NOT NULL,
  	"url" varchar,
  	"page_id" integer,
  	"new_tab" boolean
  );
  
  CREATE TABLE "footer_columns" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"heading" varchar
  );
  
  CREATE TABLE "footer_social_links" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"platform" "enum_footer_social_links_platform" NOT NULL,
  	"url" varchar NOT NULL
  );
  
  CREATE TABLE "footer_legal_links" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"label" varchar NOT NULL,
  	"url" varchar,
  	"page_id" integer
  );
  
  CREATE TABLE "footer" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"logo_id" integer,
  	"description" varchar,
  	"copyright" varchar DEFAULT '© {year} All rights reserved.',
  	"updated_at" timestamp(3) with time zone,
  	"created_at" timestamp(3) with time zone
  );
  
  CREATE TABLE "settings_social_profiles" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"platform" "enum_settings_social_profiles_platform" NOT NULL,
  	"url" varchar NOT NULL,
  	"handle" varchar
  );
  
  CREATE TABLE "settings" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"active_preset" "enum_settings_active_preset" DEFAULT 'blog' NOT NULL,
  	"site_name" varchar NOT NULL,
  	"site_description" varchar,
  	"site_url" varchar,
  	"favicon_id" integer,
  	"logo_id" integer,
  	"default_skin" "enum_settings_default_skin" DEFAULT 'minimal',
  	"default_mode" "enum_settings_default_mode" DEFAULT 'light',
  	"frontend_framework" "enum_settings_frontend_framework" DEFAULT 'next',
  	"frontend_site_type" "enum_settings_frontend_site_type" DEFAULT 'brochure',
  	"frontend_frontend_url" varchar,
  	"frontend_revalidation_secret" varchar,
  	"features_blog" boolean DEFAULT true,
  	"features_search" boolean DEFAULT true,
  	"features_forms" boolean DEFAULT true,
  	"features_comments" boolean DEFAULT false,
  	"features_newsletter" boolean DEFAULT false,
  	"features_multi_language" boolean DEFAULT false,
  	"default_meta_title" varchar,
  	"default_meta_description" varchar,
  	"default_meta_image_id" integer,
  	"google_analytics_id" varchar,
  	"google_tag_manager_id" varchar,
  	"robots_txt" varchar,
  	"twitter_handle" varchar,
  	"contact_email" varchar,
  	"contact_phone" varchar,
  	"address_street" varchar,
  	"address_city" varchar,
  	"address_state" varchar,
  	"address_postal_code" varchar,
  	"address_country" varchar,
  	"custom_css" varchar,
  	"head_scripts" varchar,
  	"body_scripts" varchar,
  	"maintenance_mode" boolean,
  	"maintenance_message" varchar,
  	"updated_at" timestamp(3) with time zone,
  	"created_at" timestamp(3) with time zone
  );
  
  CREATE TABLE "navigation_settings_custom_links" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"label" varchar NOT NULL,
  	"url" varchar NOT NULL,
  	"insert_position" "enum_navigation_settings_custom_links_insert_position" DEFAULT 'after-admin' NOT NULL
  );
  
  CREATE TABLE "navigation_settings" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"collections" jsonb,
  	"globals" jsonb,
  	"updated_at" timestamp(3) with time zone,
  	"created_at" timestamp(3) with time zone
  );
  
  ALTER TABLE "users_social_links" ADD CONSTRAINT "users_social_links_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."users"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "users_sessions" ADD CONSTRAINT "users_sessions_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."users"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "users" ADD CONSTRAINT "users_avatar_id_media_id_fk" FOREIGN KEY ("avatar_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "media_tags" ADD CONSTRAINT "media_tags_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."media"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pages_hero_links" ADD CONSTRAINT "pages_hero_links_page_id_pages_id_fk" FOREIGN KEY ("page_id") REFERENCES "public"."pages"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "pages_hero_links" ADD CONSTRAINT "pages_hero_links_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pages_blocks_hero_links" ADD CONSTRAINT "pages_blocks_hero_links_page_id_pages_id_fk" FOREIGN KEY ("page_id") REFERENCES "public"."pages"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "pages_blocks_hero_links" ADD CONSTRAINT "pages_blocks_hero_links_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages_blocks_hero"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pages_blocks_hero" ADD CONSTRAINT "pages_blocks_hero_image_id_media_id_fk" FOREIGN KEY ("image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "pages_blocks_hero" ADD CONSTRAINT "pages_blocks_hero_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pages_blocks_content_columns" ADD CONSTRAINT "pages_blocks_content_columns_link_page_id_pages_id_fk" FOREIGN KEY ("link_page_id") REFERENCES "public"."pages"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "pages_blocks_content_columns" ADD CONSTRAINT "pages_blocks_content_columns_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages_blocks_content"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pages_blocks_content" ADD CONSTRAINT "pages_blocks_content_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pages_blocks_media" ADD CONSTRAINT "pages_blocks_media_media_id_media_id_fk" FOREIGN KEY ("media_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "pages_blocks_media" ADD CONSTRAINT "pages_blocks_media_link_page_id_pages_id_fk" FOREIGN KEY ("link_page_id") REFERENCES "public"."pages"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "pages_blocks_media" ADD CONSTRAINT "pages_blocks_media_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pages_blocks_cta_links" ADD CONSTRAINT "pages_blocks_cta_links_page_id_pages_id_fk" FOREIGN KEY ("page_id") REFERENCES "public"."pages"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "pages_blocks_cta_links" ADD CONSTRAINT "pages_blocks_cta_links_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages_blocks_cta"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pages_blocks_cta" ADD CONSTRAINT "pages_blocks_cta_image_id_media_id_fk" FOREIGN KEY ("image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "pages_blocks_cta" ADD CONSTRAINT "pages_blocks_cta_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pages_blocks_quote" ADD CONSTRAINT "pages_blocks_quote_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pages_blocks_features_items" ADD CONSTRAINT "pages_blocks_features_items_media_id_media_id_fk" FOREIGN KEY ("media_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "pages_blocks_features_items" ADD CONSTRAINT "pages_blocks_features_items_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages_blocks_features"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pages_blocks_features" ADD CONSTRAINT "pages_blocks_features_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pages_blocks_stats_stats" ADD CONSTRAINT "pages_blocks_stats_stats_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages_blocks_stats"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pages_blocks_stats" ADD CONSTRAINT "pages_blocks_stats_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pages_blocks_logo_cloud_logos" ADD CONSTRAINT "pages_blocks_logo_cloud_logos_logo_id_media_id_fk" FOREIGN KEY ("logo_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "pages_blocks_logo_cloud_logos" ADD CONSTRAINT "pages_blocks_logo_cloud_logos_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages_blocks_logo_cloud"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pages_blocks_logo_cloud" ADD CONSTRAINT "pages_blocks_logo_cloud_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pages_blocks_testimonials_items" ADD CONSTRAINT "pages_blocks_testimonials_items_avatar_id_media_id_fk" FOREIGN KEY ("avatar_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "pages_blocks_testimonials_items" ADD CONSTRAINT "pages_blocks_testimonials_items_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages_blocks_testimonials"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pages_blocks_testimonials" ADD CONSTRAINT "pages_blocks_testimonials_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pages_blocks_faq_items" ADD CONSTRAINT "pages_blocks_faq_items_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages_blocks_faq"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pages_blocks_faq" ADD CONSTRAINT "pages_blocks_faq_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pages_blocks_pricing_plans_features" ADD CONSTRAINT "pages_blocks_pricing_plans_features_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages_blocks_pricing_plans"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pages_blocks_pricing_plans" ADD CONSTRAINT "pages_blocks_pricing_plans_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages_blocks_pricing"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pages_blocks_pricing" ADD CONSTRAINT "pages_blocks_pricing_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pages_blocks_team_members_socials" ADD CONSTRAINT "pages_blocks_team_members_socials_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages_blocks_team_members"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pages_blocks_team_members" ADD CONSTRAINT "pages_blocks_team_members_photo_id_media_id_fk" FOREIGN KEY ("photo_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "pages_blocks_team_members" ADD CONSTRAINT "pages_blocks_team_members_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages_blocks_team"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pages_blocks_team" ADD CONSTRAINT "pages_blocks_team_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pages_blocks_embed" ADD CONSTRAINT "pages_blocks_embed_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pages_blocks_archive" ADD CONSTRAINT "pages_blocks_archive_content_type_id_content_types_id_fk" FOREIGN KEY ("content_type_id") REFERENCES "public"."content_types"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "pages_blocks_archive" ADD CONSTRAINT "pages_blocks_archive_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pages_blocks_form" ADD CONSTRAINT "pages_blocks_form_form_id_forms_id_fk" FOREIGN KEY ("form_id") REFERENCES "public"."forms"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "pages_blocks_form" ADD CONSTRAINT "pages_blocks_form_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pages_blocks_gallery_images" ADD CONSTRAINT "pages_blocks_gallery_images_image_id_media_id_fk" FOREIGN KEY ("image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "pages_blocks_gallery_images" ADD CONSTRAINT "pages_blocks_gallery_images_link_page_id_pages_id_fk" FOREIGN KEY ("link_page_id") REFERENCES "public"."pages"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "pages_blocks_gallery_images" ADD CONSTRAINT "pages_blocks_gallery_images_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages_blocks_gallery"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pages_blocks_gallery" ADD CONSTRAINT "pages_blocks_gallery_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pages_blocks_grid_items" ADD CONSTRAINT "pages_blocks_grid_items_image_id_media_id_fk" FOREIGN KEY ("image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "pages_blocks_grid_items" ADD CONSTRAINT "pages_blocks_grid_items_link_page_id_pages_id_fk" FOREIGN KEY ("link_page_id") REFERENCES "public"."pages"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "pages_blocks_grid_items" ADD CONSTRAINT "pages_blocks_grid_items_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages_blocks_grid"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pages_blocks_grid" ADD CONSTRAINT "pages_blocks_grid_cta_page_id_pages_id_fk" FOREIGN KEY ("cta_page_id") REFERENCES "public"."pages"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "pages_blocks_grid" ADD CONSTRAINT "pages_blocks_grid_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pages_blocks_timeline_events" ADD CONSTRAINT "pages_blocks_timeline_events_image_id_media_id_fk" FOREIGN KEY ("image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "pages_blocks_timeline_events" ADD CONSTRAINT "pages_blocks_timeline_events_link_page_id_pages_id_fk" FOREIGN KEY ("link_page_id") REFERENCES "public"."pages"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "pages_blocks_timeline_events" ADD CONSTRAINT "pages_blocks_timeline_events_link_archive_item_id_archive_items_id_fk" FOREIGN KEY ("link_archive_item_id") REFERENCES "public"."archive_items"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "pages_blocks_timeline_events" ADD CONSTRAINT "pages_blocks_timeline_events_link_person_id_people_id_fk" FOREIGN KEY ("link_person_id") REFERENCES "public"."people"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "pages_blocks_timeline_events" ADD CONSTRAINT "pages_blocks_timeline_events_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages_blocks_timeline"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pages_blocks_timeline" ADD CONSTRAINT "pages_blocks_timeline_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pages_blocks_spacer" ADD CONSTRAINT "pages_blocks_spacer_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pages_blocks_html" ADD CONSTRAINT "pages_blocks_html_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pages" ADD CONSTRAINT "pages_hero_image_id_media_id_fk" FOREIGN KEY ("hero_image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "pages" ADD CONSTRAINT "pages_meta_image_id_media_id_fk" FOREIGN KEY ("meta_image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "pages_rels" ADD CONSTRAINT "pages_rels_parent_fk" FOREIGN KEY ("parent_id") REFERENCES "public"."pages"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pages_rels" ADD CONSTRAINT "pages_rels_categories_fk" FOREIGN KEY ("categories_id") REFERENCES "public"."categories"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pages_rels" ADD CONSTRAINT "pages_rels_tags_fk" FOREIGN KEY ("tags_id") REFERENCES "public"."tags"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pages_rels" ADD CONSTRAINT "pages_rels_posts_fk" FOREIGN KEY ("posts_id") REFERENCES "public"."posts"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pages_rels" ADD CONSTRAINT "pages_rels_pages_fk" FOREIGN KEY ("pages_id") REFERENCES "public"."pages"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pages_rels" ADD CONSTRAINT "pages_rels_archive_items_fk" FOREIGN KEY ("archive_items_id") REFERENCES "public"."archive_items"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pages_rels" ADD CONSTRAINT "pages_rels_people_fk" FOREIGN KEY ("people_id") REFERENCES "public"."people"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pages_rels" ADD CONSTRAINT "pages_rels_places_fk" FOREIGN KEY ("places_id") REFERENCES "public"."places"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pages_rels" ADD CONSTRAINT "pages_rels_custom_items_fk" FOREIGN KEY ("custom_items_id") REFERENCES "public"."custom_items"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_pages_v_version_hero_links" ADD CONSTRAINT "_pages_v_version_hero_links_page_id_pages_id_fk" FOREIGN KEY ("page_id") REFERENCES "public"."pages"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "_pages_v_version_hero_links" ADD CONSTRAINT "_pages_v_version_hero_links_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_pages_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_pages_v_blocks_hero_links" ADD CONSTRAINT "_pages_v_blocks_hero_links_page_id_pages_id_fk" FOREIGN KEY ("page_id") REFERENCES "public"."pages"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "_pages_v_blocks_hero_links" ADD CONSTRAINT "_pages_v_blocks_hero_links_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_pages_v_blocks_hero"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_pages_v_blocks_hero" ADD CONSTRAINT "_pages_v_blocks_hero_image_id_media_id_fk" FOREIGN KEY ("image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "_pages_v_blocks_hero" ADD CONSTRAINT "_pages_v_blocks_hero_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_pages_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_pages_v_blocks_content_columns" ADD CONSTRAINT "_pages_v_blocks_content_columns_link_page_id_pages_id_fk" FOREIGN KEY ("link_page_id") REFERENCES "public"."pages"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "_pages_v_blocks_content_columns" ADD CONSTRAINT "_pages_v_blocks_content_columns_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_pages_v_blocks_content"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_pages_v_blocks_content" ADD CONSTRAINT "_pages_v_blocks_content_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_pages_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_pages_v_blocks_media" ADD CONSTRAINT "_pages_v_blocks_media_media_id_media_id_fk" FOREIGN KEY ("media_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "_pages_v_blocks_media" ADD CONSTRAINT "_pages_v_blocks_media_link_page_id_pages_id_fk" FOREIGN KEY ("link_page_id") REFERENCES "public"."pages"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "_pages_v_blocks_media" ADD CONSTRAINT "_pages_v_blocks_media_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_pages_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_pages_v_blocks_cta_links" ADD CONSTRAINT "_pages_v_blocks_cta_links_page_id_pages_id_fk" FOREIGN KEY ("page_id") REFERENCES "public"."pages"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "_pages_v_blocks_cta_links" ADD CONSTRAINT "_pages_v_blocks_cta_links_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_pages_v_blocks_cta"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_pages_v_blocks_cta" ADD CONSTRAINT "_pages_v_blocks_cta_image_id_media_id_fk" FOREIGN KEY ("image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "_pages_v_blocks_cta" ADD CONSTRAINT "_pages_v_blocks_cta_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_pages_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_pages_v_blocks_quote" ADD CONSTRAINT "_pages_v_blocks_quote_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_pages_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_pages_v_blocks_features_items" ADD CONSTRAINT "_pages_v_blocks_features_items_media_id_media_id_fk" FOREIGN KEY ("media_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "_pages_v_blocks_features_items" ADD CONSTRAINT "_pages_v_blocks_features_items_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_pages_v_blocks_features"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_pages_v_blocks_features" ADD CONSTRAINT "_pages_v_blocks_features_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_pages_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_pages_v_blocks_stats_stats" ADD CONSTRAINT "_pages_v_blocks_stats_stats_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_pages_v_blocks_stats"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_pages_v_blocks_stats" ADD CONSTRAINT "_pages_v_blocks_stats_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_pages_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_pages_v_blocks_logo_cloud_logos" ADD CONSTRAINT "_pages_v_blocks_logo_cloud_logos_logo_id_media_id_fk" FOREIGN KEY ("logo_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "_pages_v_blocks_logo_cloud_logos" ADD CONSTRAINT "_pages_v_blocks_logo_cloud_logos_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_pages_v_blocks_logo_cloud"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_pages_v_blocks_logo_cloud" ADD CONSTRAINT "_pages_v_blocks_logo_cloud_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_pages_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_pages_v_blocks_testimonials_items" ADD CONSTRAINT "_pages_v_blocks_testimonials_items_avatar_id_media_id_fk" FOREIGN KEY ("avatar_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "_pages_v_blocks_testimonials_items" ADD CONSTRAINT "_pages_v_blocks_testimonials_items_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_pages_v_blocks_testimonials"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_pages_v_blocks_testimonials" ADD CONSTRAINT "_pages_v_blocks_testimonials_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_pages_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_pages_v_blocks_faq_items" ADD CONSTRAINT "_pages_v_blocks_faq_items_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_pages_v_blocks_faq"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_pages_v_blocks_faq" ADD CONSTRAINT "_pages_v_blocks_faq_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_pages_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_pages_v_blocks_pricing_plans_features" ADD CONSTRAINT "_pages_v_blocks_pricing_plans_features_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_pages_v_blocks_pricing_plans"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_pages_v_blocks_pricing_plans" ADD CONSTRAINT "_pages_v_blocks_pricing_plans_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_pages_v_blocks_pricing"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_pages_v_blocks_pricing" ADD CONSTRAINT "_pages_v_blocks_pricing_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_pages_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_pages_v_blocks_team_members_socials" ADD CONSTRAINT "_pages_v_blocks_team_members_socials_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_pages_v_blocks_team_members"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_pages_v_blocks_team_members" ADD CONSTRAINT "_pages_v_blocks_team_members_photo_id_media_id_fk" FOREIGN KEY ("photo_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "_pages_v_blocks_team_members" ADD CONSTRAINT "_pages_v_blocks_team_members_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_pages_v_blocks_team"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_pages_v_blocks_team" ADD CONSTRAINT "_pages_v_blocks_team_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_pages_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_pages_v_blocks_embed" ADD CONSTRAINT "_pages_v_blocks_embed_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_pages_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_pages_v_blocks_archive" ADD CONSTRAINT "_pages_v_blocks_archive_content_type_id_content_types_id_fk" FOREIGN KEY ("content_type_id") REFERENCES "public"."content_types"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "_pages_v_blocks_archive" ADD CONSTRAINT "_pages_v_blocks_archive_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_pages_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_pages_v_blocks_form" ADD CONSTRAINT "_pages_v_blocks_form_form_id_forms_id_fk" FOREIGN KEY ("form_id") REFERENCES "public"."forms"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "_pages_v_blocks_form" ADD CONSTRAINT "_pages_v_blocks_form_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_pages_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_pages_v_blocks_gallery_images" ADD CONSTRAINT "_pages_v_blocks_gallery_images_image_id_media_id_fk" FOREIGN KEY ("image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "_pages_v_blocks_gallery_images" ADD CONSTRAINT "_pages_v_blocks_gallery_images_link_page_id_pages_id_fk" FOREIGN KEY ("link_page_id") REFERENCES "public"."pages"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "_pages_v_blocks_gallery_images" ADD CONSTRAINT "_pages_v_blocks_gallery_images_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_pages_v_blocks_gallery"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_pages_v_blocks_gallery" ADD CONSTRAINT "_pages_v_blocks_gallery_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_pages_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_pages_v_blocks_grid_items" ADD CONSTRAINT "_pages_v_blocks_grid_items_image_id_media_id_fk" FOREIGN KEY ("image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "_pages_v_blocks_grid_items" ADD CONSTRAINT "_pages_v_blocks_grid_items_link_page_id_pages_id_fk" FOREIGN KEY ("link_page_id") REFERENCES "public"."pages"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "_pages_v_blocks_grid_items" ADD CONSTRAINT "_pages_v_blocks_grid_items_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_pages_v_blocks_grid"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_pages_v_blocks_grid" ADD CONSTRAINT "_pages_v_blocks_grid_cta_page_id_pages_id_fk" FOREIGN KEY ("cta_page_id") REFERENCES "public"."pages"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "_pages_v_blocks_grid" ADD CONSTRAINT "_pages_v_blocks_grid_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_pages_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_pages_v_blocks_timeline_events" ADD CONSTRAINT "_pages_v_blocks_timeline_events_image_id_media_id_fk" FOREIGN KEY ("image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "_pages_v_blocks_timeline_events" ADD CONSTRAINT "_pages_v_blocks_timeline_events_link_page_id_pages_id_fk" FOREIGN KEY ("link_page_id") REFERENCES "public"."pages"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "_pages_v_blocks_timeline_events" ADD CONSTRAINT "_pages_v_blocks_timeline_events_link_archive_item_id_archive_items_id_fk" FOREIGN KEY ("link_archive_item_id") REFERENCES "public"."archive_items"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "_pages_v_blocks_timeline_events" ADD CONSTRAINT "_pages_v_blocks_timeline_events_link_person_id_people_id_fk" FOREIGN KEY ("link_person_id") REFERENCES "public"."people"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "_pages_v_blocks_timeline_events" ADD CONSTRAINT "_pages_v_blocks_timeline_events_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_pages_v_blocks_timeline"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_pages_v_blocks_timeline" ADD CONSTRAINT "_pages_v_blocks_timeline_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_pages_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_pages_v_blocks_spacer" ADD CONSTRAINT "_pages_v_blocks_spacer_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_pages_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_pages_v_blocks_html" ADD CONSTRAINT "_pages_v_blocks_html_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_pages_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_pages_v" ADD CONSTRAINT "_pages_v_parent_id_pages_id_fk" FOREIGN KEY ("parent_id") REFERENCES "public"."pages"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "_pages_v" ADD CONSTRAINT "_pages_v_version_hero_image_id_media_id_fk" FOREIGN KEY ("version_hero_image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "_pages_v" ADD CONSTRAINT "_pages_v_version_meta_image_id_media_id_fk" FOREIGN KEY ("version_meta_image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "_pages_v_rels" ADD CONSTRAINT "_pages_v_rels_parent_fk" FOREIGN KEY ("parent_id") REFERENCES "public"."_pages_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_pages_v_rels" ADD CONSTRAINT "_pages_v_rels_categories_fk" FOREIGN KEY ("categories_id") REFERENCES "public"."categories"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_pages_v_rels" ADD CONSTRAINT "_pages_v_rels_tags_fk" FOREIGN KEY ("tags_id") REFERENCES "public"."tags"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_pages_v_rels" ADD CONSTRAINT "_pages_v_rels_posts_fk" FOREIGN KEY ("posts_id") REFERENCES "public"."posts"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_pages_v_rels" ADD CONSTRAINT "_pages_v_rels_pages_fk" FOREIGN KEY ("pages_id") REFERENCES "public"."pages"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_pages_v_rels" ADD CONSTRAINT "_pages_v_rels_archive_items_fk" FOREIGN KEY ("archive_items_id") REFERENCES "public"."archive_items"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_pages_v_rels" ADD CONSTRAINT "_pages_v_rels_people_fk" FOREIGN KEY ("people_id") REFERENCES "public"."people"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_pages_v_rels" ADD CONSTRAINT "_pages_v_rels_places_fk" FOREIGN KEY ("places_id") REFERENCES "public"."places"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_pages_v_rels" ADD CONSTRAINT "_pages_v_rels_custom_items_fk" FOREIGN KEY ("custom_items_id") REFERENCES "public"."custom_items"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "posts_blocks_hero_links" ADD CONSTRAINT "posts_blocks_hero_links_page_id_pages_id_fk" FOREIGN KEY ("page_id") REFERENCES "public"."pages"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "posts_blocks_hero_links" ADD CONSTRAINT "posts_blocks_hero_links_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."posts_blocks_hero"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "posts_blocks_hero" ADD CONSTRAINT "posts_blocks_hero_image_id_media_id_fk" FOREIGN KEY ("image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "posts_blocks_hero" ADD CONSTRAINT "posts_blocks_hero_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."posts"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "posts_blocks_content_columns" ADD CONSTRAINT "posts_blocks_content_columns_link_page_id_pages_id_fk" FOREIGN KEY ("link_page_id") REFERENCES "public"."pages"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "posts_blocks_content_columns" ADD CONSTRAINT "posts_blocks_content_columns_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."posts_blocks_content"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "posts_blocks_content" ADD CONSTRAINT "posts_blocks_content_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."posts"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "posts_blocks_media" ADD CONSTRAINT "posts_blocks_media_media_id_media_id_fk" FOREIGN KEY ("media_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "posts_blocks_media" ADD CONSTRAINT "posts_blocks_media_link_page_id_pages_id_fk" FOREIGN KEY ("link_page_id") REFERENCES "public"."pages"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "posts_blocks_media" ADD CONSTRAINT "posts_blocks_media_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."posts"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "posts_blocks_cta_links" ADD CONSTRAINT "posts_blocks_cta_links_page_id_pages_id_fk" FOREIGN KEY ("page_id") REFERENCES "public"."pages"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "posts_blocks_cta_links" ADD CONSTRAINT "posts_blocks_cta_links_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."posts_blocks_cta"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "posts_blocks_cta" ADD CONSTRAINT "posts_blocks_cta_image_id_media_id_fk" FOREIGN KEY ("image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "posts_blocks_cta" ADD CONSTRAINT "posts_blocks_cta_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."posts"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "posts_blocks_quote" ADD CONSTRAINT "posts_blocks_quote_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."posts"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "posts_blocks_features_items" ADD CONSTRAINT "posts_blocks_features_items_media_id_media_id_fk" FOREIGN KEY ("media_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "posts_blocks_features_items" ADD CONSTRAINT "posts_blocks_features_items_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."posts_blocks_features"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "posts_blocks_features" ADD CONSTRAINT "posts_blocks_features_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."posts"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "posts_blocks_stats_stats" ADD CONSTRAINT "posts_blocks_stats_stats_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."posts_blocks_stats"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "posts_blocks_stats" ADD CONSTRAINT "posts_blocks_stats_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."posts"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "posts_blocks_logo_cloud_logos" ADD CONSTRAINT "posts_blocks_logo_cloud_logos_logo_id_media_id_fk" FOREIGN KEY ("logo_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "posts_blocks_logo_cloud_logos" ADD CONSTRAINT "posts_blocks_logo_cloud_logos_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."posts_blocks_logo_cloud"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "posts_blocks_logo_cloud" ADD CONSTRAINT "posts_blocks_logo_cloud_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."posts"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "posts_blocks_testimonials_items" ADD CONSTRAINT "posts_blocks_testimonials_items_avatar_id_media_id_fk" FOREIGN KEY ("avatar_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "posts_blocks_testimonials_items" ADD CONSTRAINT "posts_blocks_testimonials_items_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."posts_blocks_testimonials"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "posts_blocks_testimonials" ADD CONSTRAINT "posts_blocks_testimonials_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."posts"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "posts_blocks_faq_items" ADD CONSTRAINT "posts_blocks_faq_items_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."posts_blocks_faq"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "posts_blocks_faq" ADD CONSTRAINT "posts_blocks_faq_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."posts"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "posts_blocks_pricing_plans_features" ADD CONSTRAINT "posts_blocks_pricing_plans_features_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."posts_blocks_pricing_plans"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "posts_blocks_pricing_plans" ADD CONSTRAINT "posts_blocks_pricing_plans_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."posts_blocks_pricing"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "posts_blocks_pricing" ADD CONSTRAINT "posts_blocks_pricing_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."posts"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "posts_blocks_team_members_socials" ADD CONSTRAINT "posts_blocks_team_members_socials_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."posts_blocks_team_members"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "posts_blocks_team_members" ADD CONSTRAINT "posts_blocks_team_members_photo_id_media_id_fk" FOREIGN KEY ("photo_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "posts_blocks_team_members" ADD CONSTRAINT "posts_blocks_team_members_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."posts_blocks_team"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "posts_blocks_team" ADD CONSTRAINT "posts_blocks_team_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."posts"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "posts_blocks_embed" ADD CONSTRAINT "posts_blocks_embed_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."posts"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "posts_blocks_archive" ADD CONSTRAINT "posts_blocks_archive_content_type_id_content_types_id_fk" FOREIGN KEY ("content_type_id") REFERENCES "public"."content_types"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "posts_blocks_archive" ADD CONSTRAINT "posts_blocks_archive_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."posts"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "posts_blocks_form" ADD CONSTRAINT "posts_blocks_form_form_id_forms_id_fk" FOREIGN KEY ("form_id") REFERENCES "public"."forms"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "posts_blocks_form" ADD CONSTRAINT "posts_blocks_form_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."posts"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "posts_blocks_gallery_images" ADD CONSTRAINT "posts_blocks_gallery_images_image_id_media_id_fk" FOREIGN KEY ("image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "posts_blocks_gallery_images" ADD CONSTRAINT "posts_blocks_gallery_images_link_page_id_pages_id_fk" FOREIGN KEY ("link_page_id") REFERENCES "public"."pages"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "posts_blocks_gallery_images" ADD CONSTRAINT "posts_blocks_gallery_images_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."posts_blocks_gallery"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "posts_blocks_gallery" ADD CONSTRAINT "posts_blocks_gallery_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."posts"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "posts_blocks_grid_items" ADD CONSTRAINT "posts_blocks_grid_items_image_id_media_id_fk" FOREIGN KEY ("image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "posts_blocks_grid_items" ADD CONSTRAINT "posts_blocks_grid_items_link_page_id_pages_id_fk" FOREIGN KEY ("link_page_id") REFERENCES "public"."pages"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "posts_blocks_grid_items" ADD CONSTRAINT "posts_blocks_grid_items_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."posts_blocks_grid"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "posts_blocks_grid" ADD CONSTRAINT "posts_blocks_grid_cta_page_id_pages_id_fk" FOREIGN KEY ("cta_page_id") REFERENCES "public"."pages"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "posts_blocks_grid" ADD CONSTRAINT "posts_blocks_grid_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."posts"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "posts_blocks_timeline_events" ADD CONSTRAINT "posts_blocks_timeline_events_image_id_media_id_fk" FOREIGN KEY ("image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "posts_blocks_timeline_events" ADD CONSTRAINT "posts_blocks_timeline_events_link_page_id_pages_id_fk" FOREIGN KEY ("link_page_id") REFERENCES "public"."pages"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "posts_blocks_timeline_events" ADD CONSTRAINT "posts_blocks_timeline_events_link_archive_item_id_archive_items_id_fk" FOREIGN KEY ("link_archive_item_id") REFERENCES "public"."archive_items"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "posts_blocks_timeline_events" ADD CONSTRAINT "posts_blocks_timeline_events_link_person_id_people_id_fk" FOREIGN KEY ("link_person_id") REFERENCES "public"."people"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "posts_blocks_timeline_events" ADD CONSTRAINT "posts_blocks_timeline_events_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."posts_blocks_timeline"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "posts_blocks_timeline" ADD CONSTRAINT "posts_blocks_timeline_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."posts"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "posts_blocks_spacer" ADD CONSTRAINT "posts_blocks_spacer_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."posts"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "posts_blocks_html" ADD CONSTRAINT "posts_blocks_html_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."posts"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "posts" ADD CONSTRAINT "posts_featured_image_id_media_id_fk" FOREIGN KEY ("featured_image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "posts" ADD CONSTRAINT "posts_meta_image_id_media_id_fk" FOREIGN KEY ("meta_image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "posts" ADD CONSTRAINT "posts_author_id_users_id_fk" FOREIGN KEY ("author_id") REFERENCES "public"."users"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "posts_rels" ADD CONSTRAINT "posts_rels_parent_fk" FOREIGN KEY ("parent_id") REFERENCES "public"."posts"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "posts_rels" ADD CONSTRAINT "posts_rels_categories_fk" FOREIGN KEY ("categories_id") REFERENCES "public"."categories"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "posts_rels" ADD CONSTRAINT "posts_rels_tags_fk" FOREIGN KEY ("tags_id") REFERENCES "public"."tags"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "posts_rels" ADD CONSTRAINT "posts_rels_posts_fk" FOREIGN KEY ("posts_id") REFERENCES "public"."posts"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "posts_rels" ADD CONSTRAINT "posts_rels_pages_fk" FOREIGN KEY ("pages_id") REFERENCES "public"."pages"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "posts_rels" ADD CONSTRAINT "posts_rels_archive_items_fk" FOREIGN KEY ("archive_items_id") REFERENCES "public"."archive_items"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "posts_rels" ADD CONSTRAINT "posts_rels_people_fk" FOREIGN KEY ("people_id") REFERENCES "public"."people"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "posts_rels" ADD CONSTRAINT "posts_rels_places_fk" FOREIGN KEY ("places_id") REFERENCES "public"."places"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "posts_rels" ADD CONSTRAINT "posts_rels_custom_items_fk" FOREIGN KEY ("custom_items_id") REFERENCES "public"."custom_items"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_posts_v_blocks_hero_links" ADD CONSTRAINT "_posts_v_blocks_hero_links_page_id_pages_id_fk" FOREIGN KEY ("page_id") REFERENCES "public"."pages"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "_posts_v_blocks_hero_links" ADD CONSTRAINT "_posts_v_blocks_hero_links_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_posts_v_blocks_hero"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_posts_v_blocks_hero" ADD CONSTRAINT "_posts_v_blocks_hero_image_id_media_id_fk" FOREIGN KEY ("image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "_posts_v_blocks_hero" ADD CONSTRAINT "_posts_v_blocks_hero_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_posts_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_posts_v_blocks_content_columns" ADD CONSTRAINT "_posts_v_blocks_content_columns_link_page_id_pages_id_fk" FOREIGN KEY ("link_page_id") REFERENCES "public"."pages"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "_posts_v_blocks_content_columns" ADD CONSTRAINT "_posts_v_blocks_content_columns_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_posts_v_blocks_content"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_posts_v_blocks_content" ADD CONSTRAINT "_posts_v_blocks_content_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_posts_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_posts_v_blocks_media" ADD CONSTRAINT "_posts_v_blocks_media_media_id_media_id_fk" FOREIGN KEY ("media_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "_posts_v_blocks_media" ADD CONSTRAINT "_posts_v_blocks_media_link_page_id_pages_id_fk" FOREIGN KEY ("link_page_id") REFERENCES "public"."pages"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "_posts_v_blocks_media" ADD CONSTRAINT "_posts_v_blocks_media_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_posts_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_posts_v_blocks_cta_links" ADD CONSTRAINT "_posts_v_blocks_cta_links_page_id_pages_id_fk" FOREIGN KEY ("page_id") REFERENCES "public"."pages"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "_posts_v_blocks_cta_links" ADD CONSTRAINT "_posts_v_blocks_cta_links_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_posts_v_blocks_cta"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_posts_v_blocks_cta" ADD CONSTRAINT "_posts_v_blocks_cta_image_id_media_id_fk" FOREIGN KEY ("image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "_posts_v_blocks_cta" ADD CONSTRAINT "_posts_v_blocks_cta_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_posts_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_posts_v_blocks_quote" ADD CONSTRAINT "_posts_v_blocks_quote_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_posts_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_posts_v_blocks_features_items" ADD CONSTRAINT "_posts_v_blocks_features_items_media_id_media_id_fk" FOREIGN KEY ("media_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "_posts_v_blocks_features_items" ADD CONSTRAINT "_posts_v_blocks_features_items_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_posts_v_blocks_features"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_posts_v_blocks_features" ADD CONSTRAINT "_posts_v_blocks_features_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_posts_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_posts_v_blocks_stats_stats" ADD CONSTRAINT "_posts_v_blocks_stats_stats_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_posts_v_blocks_stats"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_posts_v_blocks_stats" ADD CONSTRAINT "_posts_v_blocks_stats_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_posts_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_posts_v_blocks_logo_cloud_logos" ADD CONSTRAINT "_posts_v_blocks_logo_cloud_logos_logo_id_media_id_fk" FOREIGN KEY ("logo_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "_posts_v_blocks_logo_cloud_logos" ADD CONSTRAINT "_posts_v_blocks_logo_cloud_logos_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_posts_v_blocks_logo_cloud"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_posts_v_blocks_logo_cloud" ADD CONSTRAINT "_posts_v_blocks_logo_cloud_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_posts_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_posts_v_blocks_testimonials_items" ADD CONSTRAINT "_posts_v_blocks_testimonials_items_avatar_id_media_id_fk" FOREIGN KEY ("avatar_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "_posts_v_blocks_testimonials_items" ADD CONSTRAINT "_posts_v_blocks_testimonials_items_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_posts_v_blocks_testimonials"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_posts_v_blocks_testimonials" ADD CONSTRAINT "_posts_v_blocks_testimonials_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_posts_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_posts_v_blocks_faq_items" ADD CONSTRAINT "_posts_v_blocks_faq_items_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_posts_v_blocks_faq"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_posts_v_blocks_faq" ADD CONSTRAINT "_posts_v_blocks_faq_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_posts_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_posts_v_blocks_pricing_plans_features" ADD CONSTRAINT "_posts_v_blocks_pricing_plans_features_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_posts_v_blocks_pricing_plans"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_posts_v_blocks_pricing_plans" ADD CONSTRAINT "_posts_v_blocks_pricing_plans_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_posts_v_blocks_pricing"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_posts_v_blocks_pricing" ADD CONSTRAINT "_posts_v_blocks_pricing_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_posts_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_posts_v_blocks_team_members_socials" ADD CONSTRAINT "_posts_v_blocks_team_members_socials_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_posts_v_blocks_team_members"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_posts_v_blocks_team_members" ADD CONSTRAINT "_posts_v_blocks_team_members_photo_id_media_id_fk" FOREIGN KEY ("photo_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "_posts_v_blocks_team_members" ADD CONSTRAINT "_posts_v_blocks_team_members_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_posts_v_blocks_team"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_posts_v_blocks_team" ADD CONSTRAINT "_posts_v_blocks_team_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_posts_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_posts_v_blocks_embed" ADD CONSTRAINT "_posts_v_blocks_embed_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_posts_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_posts_v_blocks_archive" ADD CONSTRAINT "_posts_v_blocks_archive_content_type_id_content_types_id_fk" FOREIGN KEY ("content_type_id") REFERENCES "public"."content_types"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "_posts_v_blocks_archive" ADD CONSTRAINT "_posts_v_blocks_archive_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_posts_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_posts_v_blocks_form" ADD CONSTRAINT "_posts_v_blocks_form_form_id_forms_id_fk" FOREIGN KEY ("form_id") REFERENCES "public"."forms"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "_posts_v_blocks_form" ADD CONSTRAINT "_posts_v_blocks_form_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_posts_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_posts_v_blocks_gallery_images" ADD CONSTRAINT "_posts_v_blocks_gallery_images_image_id_media_id_fk" FOREIGN KEY ("image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "_posts_v_blocks_gallery_images" ADD CONSTRAINT "_posts_v_blocks_gallery_images_link_page_id_pages_id_fk" FOREIGN KEY ("link_page_id") REFERENCES "public"."pages"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "_posts_v_blocks_gallery_images" ADD CONSTRAINT "_posts_v_blocks_gallery_images_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_posts_v_blocks_gallery"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_posts_v_blocks_gallery" ADD CONSTRAINT "_posts_v_blocks_gallery_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_posts_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_posts_v_blocks_grid_items" ADD CONSTRAINT "_posts_v_blocks_grid_items_image_id_media_id_fk" FOREIGN KEY ("image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "_posts_v_blocks_grid_items" ADD CONSTRAINT "_posts_v_blocks_grid_items_link_page_id_pages_id_fk" FOREIGN KEY ("link_page_id") REFERENCES "public"."pages"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "_posts_v_blocks_grid_items" ADD CONSTRAINT "_posts_v_blocks_grid_items_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_posts_v_blocks_grid"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_posts_v_blocks_grid" ADD CONSTRAINT "_posts_v_blocks_grid_cta_page_id_pages_id_fk" FOREIGN KEY ("cta_page_id") REFERENCES "public"."pages"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "_posts_v_blocks_grid" ADD CONSTRAINT "_posts_v_blocks_grid_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_posts_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_posts_v_blocks_timeline_events" ADD CONSTRAINT "_posts_v_blocks_timeline_events_image_id_media_id_fk" FOREIGN KEY ("image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "_posts_v_blocks_timeline_events" ADD CONSTRAINT "_posts_v_blocks_timeline_events_link_page_id_pages_id_fk" FOREIGN KEY ("link_page_id") REFERENCES "public"."pages"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "_posts_v_blocks_timeline_events" ADD CONSTRAINT "_posts_v_blocks_timeline_events_link_archive_item_id_archive_items_id_fk" FOREIGN KEY ("link_archive_item_id") REFERENCES "public"."archive_items"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "_posts_v_blocks_timeline_events" ADD CONSTRAINT "_posts_v_blocks_timeline_events_link_person_id_people_id_fk" FOREIGN KEY ("link_person_id") REFERENCES "public"."people"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "_posts_v_blocks_timeline_events" ADD CONSTRAINT "_posts_v_blocks_timeline_events_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_posts_v_blocks_timeline"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_posts_v_blocks_timeline" ADD CONSTRAINT "_posts_v_blocks_timeline_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_posts_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_posts_v_blocks_spacer" ADD CONSTRAINT "_posts_v_blocks_spacer_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_posts_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_posts_v_blocks_html" ADD CONSTRAINT "_posts_v_blocks_html_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_posts_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_posts_v" ADD CONSTRAINT "_posts_v_parent_id_posts_id_fk" FOREIGN KEY ("parent_id") REFERENCES "public"."posts"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "_posts_v" ADD CONSTRAINT "_posts_v_version_featured_image_id_media_id_fk" FOREIGN KEY ("version_featured_image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "_posts_v" ADD CONSTRAINT "_posts_v_version_meta_image_id_media_id_fk" FOREIGN KEY ("version_meta_image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "_posts_v" ADD CONSTRAINT "_posts_v_version_author_id_users_id_fk" FOREIGN KEY ("version_author_id") REFERENCES "public"."users"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "_posts_v_rels" ADD CONSTRAINT "_posts_v_rels_parent_fk" FOREIGN KEY ("parent_id") REFERENCES "public"."_posts_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_posts_v_rels" ADD CONSTRAINT "_posts_v_rels_categories_fk" FOREIGN KEY ("categories_id") REFERENCES "public"."categories"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_posts_v_rels" ADD CONSTRAINT "_posts_v_rels_tags_fk" FOREIGN KEY ("tags_id") REFERENCES "public"."tags"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_posts_v_rels" ADD CONSTRAINT "_posts_v_rels_posts_fk" FOREIGN KEY ("posts_id") REFERENCES "public"."posts"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_posts_v_rels" ADD CONSTRAINT "_posts_v_rels_pages_fk" FOREIGN KEY ("pages_id") REFERENCES "public"."pages"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_posts_v_rels" ADD CONSTRAINT "_posts_v_rels_archive_items_fk" FOREIGN KEY ("archive_items_id") REFERENCES "public"."archive_items"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_posts_v_rels" ADD CONSTRAINT "_posts_v_rels_people_fk" FOREIGN KEY ("people_id") REFERENCES "public"."people"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_posts_v_rels" ADD CONSTRAINT "_posts_v_rels_places_fk" FOREIGN KEY ("places_id") REFERENCES "public"."places"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_posts_v_rels" ADD CONSTRAINT "_posts_v_rels_custom_items_fk" FOREIGN KEY ("custom_items_id") REFERENCES "public"."custom_items"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "categories_breadcrumbs" ADD CONSTRAINT "categories_breadcrumbs_doc_id_categories_id_fk" FOREIGN KEY ("doc_id") REFERENCES "public"."categories"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "categories_breadcrumbs" ADD CONSTRAINT "categories_breadcrumbs_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."categories"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "categories" ADD CONSTRAINT "categories_parent_id_categories_id_fk" FOREIGN KEY ("parent_id") REFERENCES "public"."categories"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "categories" ADD CONSTRAINT "categories_featured_image_id_media_id_fk" FOREIGN KEY ("featured_image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "_categories_v_version_breadcrumbs" ADD CONSTRAINT "_categories_v_version_breadcrumbs_doc_id_categories_id_fk" FOREIGN KEY ("doc_id") REFERENCES "public"."categories"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "_categories_v_version_breadcrumbs" ADD CONSTRAINT "_categories_v_version_breadcrumbs_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_categories_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_categories_v" ADD CONSTRAINT "_categories_v_parent_id_categories_id_fk" FOREIGN KEY ("parent_id") REFERENCES "public"."categories"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "_categories_v" ADD CONSTRAINT "_categories_v_version_parent_id_categories_id_fk" FOREIGN KEY ("version_parent_id") REFERENCES "public"."categories"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "_categories_v" ADD CONSTRAINT "_categories_v_version_featured_image_id_media_id_fk" FOREIGN KEY ("version_featured_image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "_tags_v" ADD CONSTRAINT "_tags_v_parent_id_tags_id_fk" FOREIGN KEY ("parent_id") REFERENCES "public"."tags"("id") ON DELETE set null ON UPDATE no action;
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
  ALTER TABLE "archive_items_blocks_archive" ADD CONSTRAINT "archive_items_blocks_archive_content_type_id_content_types_id_fk" FOREIGN KEY ("content_type_id") REFERENCES "public"."content_types"("id") ON DELETE set null ON UPDATE no action;
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
  ALTER TABLE "archive_items_blocks_timeline_events" ADD CONSTRAINT "archive_items_blocks_timeline_events_link_archive_item_id_archive_items_id_fk" FOREIGN KEY ("link_archive_item_id") REFERENCES "public"."archive_items"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "archive_items_blocks_timeline_events" ADD CONSTRAINT "archive_items_blocks_timeline_events_link_person_id_people_id_fk" FOREIGN KEY ("link_person_id") REFERENCES "public"."people"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "archive_items_blocks_timeline_events" ADD CONSTRAINT "archive_items_blocks_timeline_events_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."archive_items_blocks_timeline"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "archive_items_blocks_timeline" ADD CONSTRAINT "archive_items_blocks_timeline_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."archive_items"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "archive_items" ADD CONSTRAINT "archive_items_featured_image_id_media_id_fk" FOREIGN KEY ("featured_image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "archive_items" ADD CONSTRAINT "archive_items_meta_image_id_media_id_fk" FOREIGN KEY ("meta_image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "archive_items_rels" ADD CONSTRAINT "archive_items_rels_parent_fk" FOREIGN KEY ("parent_id") REFERENCES "public"."archive_items"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "archive_items_rels" ADD CONSTRAINT "archive_items_rels_people_fk" FOREIGN KEY ("people_id") REFERENCES "public"."people"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "archive_items_rels" ADD CONSTRAINT "archive_items_rels_places_fk" FOREIGN KEY ("places_id") REFERENCES "public"."places"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "archive_items_rels" ADD CONSTRAINT "archive_items_rels_archive_items_fk" FOREIGN KEY ("archive_items_id") REFERENCES "public"."archive_items"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "archive_items_rels" ADD CONSTRAINT "archive_items_rels_categories_fk" FOREIGN KEY ("categories_id") REFERENCES "public"."categories"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "archive_items_rels" ADD CONSTRAINT "archive_items_rels_tags_fk" FOREIGN KEY ("tags_id") REFERENCES "public"."tags"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "archive_items_rels" ADD CONSTRAINT "archive_items_rels_posts_fk" FOREIGN KEY ("posts_id") REFERENCES "public"."posts"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "archive_items_rels" ADD CONSTRAINT "archive_items_rels_pages_fk" FOREIGN KEY ("pages_id") REFERENCES "public"."pages"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "archive_items_rels" ADD CONSTRAINT "archive_items_rels_custom_items_fk" FOREIGN KEY ("custom_items_id") REFERENCES "public"."custom_items"("id") ON DELETE cascade ON UPDATE no action;
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
  ALTER TABLE "_archive_items_v_blocks_archive" ADD CONSTRAINT "_archive_items_v_blocks_archive_content_type_id_content_types_id_fk" FOREIGN KEY ("content_type_id") REFERENCES "public"."content_types"("id") ON DELETE set null ON UPDATE no action;
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
  ALTER TABLE "_archive_items_v_blocks_timeline_events" ADD CONSTRAINT "_archive_items_v_blocks_timeline_events_link_archive_item_id_archive_items_id_fk" FOREIGN KEY ("link_archive_item_id") REFERENCES "public"."archive_items"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "_archive_items_v_blocks_timeline_events" ADD CONSTRAINT "_archive_items_v_blocks_timeline_events_link_person_id_people_id_fk" FOREIGN KEY ("link_person_id") REFERENCES "public"."people"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "_archive_items_v_blocks_timeline_events" ADD CONSTRAINT "_archive_items_v_blocks_timeline_events_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_archive_items_v_blocks_timeline"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_archive_items_v_blocks_timeline" ADD CONSTRAINT "_archive_items_v_blocks_timeline_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_archive_items_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_archive_items_v" ADD CONSTRAINT "_archive_items_v_parent_id_archive_items_id_fk" FOREIGN KEY ("parent_id") REFERENCES "public"."archive_items"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "_archive_items_v" ADD CONSTRAINT "_archive_items_v_version_featured_image_id_media_id_fk" FOREIGN KEY ("version_featured_image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "_archive_items_v" ADD CONSTRAINT "_archive_items_v_version_meta_image_id_media_id_fk" FOREIGN KEY ("version_meta_image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "_archive_items_v_rels" ADD CONSTRAINT "_archive_items_v_rels_parent_fk" FOREIGN KEY ("parent_id") REFERENCES "public"."_archive_items_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_archive_items_v_rels" ADD CONSTRAINT "_archive_items_v_rels_people_fk" FOREIGN KEY ("people_id") REFERENCES "public"."people"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_archive_items_v_rels" ADD CONSTRAINT "_archive_items_v_rels_places_fk" FOREIGN KEY ("places_id") REFERENCES "public"."places"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_archive_items_v_rels" ADD CONSTRAINT "_archive_items_v_rels_archive_items_fk" FOREIGN KEY ("archive_items_id") REFERENCES "public"."archive_items"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_archive_items_v_rels" ADD CONSTRAINT "_archive_items_v_rels_categories_fk" FOREIGN KEY ("categories_id") REFERENCES "public"."categories"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_archive_items_v_rels" ADD CONSTRAINT "_archive_items_v_rels_tags_fk" FOREIGN KEY ("tags_id") REFERENCES "public"."tags"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_archive_items_v_rels" ADD CONSTRAINT "_archive_items_v_rels_posts_fk" FOREIGN KEY ("posts_id") REFERENCES "public"."posts"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_archive_items_v_rels" ADD CONSTRAINT "_archive_items_v_rels_pages_fk" FOREIGN KEY ("pages_id") REFERENCES "public"."pages"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_archive_items_v_rels" ADD CONSTRAINT "_archive_items_v_rels_custom_items_fk" FOREIGN KEY ("custom_items_id") REFERENCES "public"."custom_items"("id") ON DELETE cascade ON UPDATE no action;
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
  ALTER TABLE "people_blocks_stats_stats" ADD CONSTRAINT "people_blocks_stats_stats_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."people_blocks_stats"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "people_blocks_stats" ADD CONSTRAINT "people_blocks_stats_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."people"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "people_blocks_logo_cloud_logos" ADD CONSTRAINT "people_blocks_logo_cloud_logos_logo_id_media_id_fk" FOREIGN KEY ("logo_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "people_blocks_logo_cloud_logos" ADD CONSTRAINT "people_blocks_logo_cloud_logos_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."people_blocks_logo_cloud"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "people_blocks_logo_cloud" ADD CONSTRAINT "people_blocks_logo_cloud_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."people"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "people_blocks_testimonials_items" ADD CONSTRAINT "people_blocks_testimonials_items_avatar_id_media_id_fk" FOREIGN KEY ("avatar_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "people_blocks_testimonials_items" ADD CONSTRAINT "people_blocks_testimonials_items_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."people_blocks_testimonials"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "people_blocks_testimonials" ADD CONSTRAINT "people_blocks_testimonials_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."people"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "people_blocks_faq_items" ADD CONSTRAINT "people_blocks_faq_items_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."people_blocks_faq"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "people_blocks_faq" ADD CONSTRAINT "people_blocks_faq_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."people"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "people_blocks_pricing_plans_features" ADD CONSTRAINT "people_blocks_pricing_plans_features_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."people_blocks_pricing_plans"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "people_blocks_pricing_plans" ADD CONSTRAINT "people_blocks_pricing_plans_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."people_blocks_pricing"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "people_blocks_pricing" ADD CONSTRAINT "people_blocks_pricing_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."people"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "people_blocks_team_members_socials" ADD CONSTRAINT "people_blocks_team_members_socials_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."people_blocks_team_members"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "people_blocks_team_members" ADD CONSTRAINT "people_blocks_team_members_photo_id_media_id_fk" FOREIGN KEY ("photo_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "people_blocks_team_members" ADD CONSTRAINT "people_blocks_team_members_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."people_blocks_team"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "people_blocks_team" ADD CONSTRAINT "people_blocks_team_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."people"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "people_blocks_embed" ADD CONSTRAINT "people_blocks_embed_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."people"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "people_blocks_archive" ADD CONSTRAINT "people_blocks_archive_content_type_id_content_types_id_fk" FOREIGN KEY ("content_type_id") REFERENCES "public"."content_types"("id") ON DELETE set null ON UPDATE no action;
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
  ALTER TABLE "people_blocks_timeline_events" ADD CONSTRAINT "people_blocks_timeline_events_link_archive_item_id_archive_items_id_fk" FOREIGN KEY ("link_archive_item_id") REFERENCES "public"."archive_items"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "people_blocks_timeline_events" ADD CONSTRAINT "people_blocks_timeline_events_link_person_id_people_id_fk" FOREIGN KEY ("link_person_id") REFERENCES "public"."people"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "people_blocks_timeline_events" ADD CONSTRAINT "people_blocks_timeline_events_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."people_blocks_timeline"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "people_blocks_timeline" ADD CONSTRAINT "people_blocks_timeline_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."people"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "people_blocks_spacer" ADD CONSTRAINT "people_blocks_spacer_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."people"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "people_blocks_html" ADD CONSTRAINT "people_blocks_html_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."people"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "people" ADD CONSTRAINT "people_portrait_id_media_id_fk" FOREIGN KEY ("portrait_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "people" ADD CONSTRAINT "people_birth_place_id_places_id_fk" FOREIGN KEY ("birth_place_id") REFERENCES "public"."places"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "people" ADD CONSTRAINT "people_death_place_id_places_id_fk" FOREIGN KEY ("death_place_id") REFERENCES "public"."places"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "people" ADD CONSTRAINT "people_meta_image_id_media_id_fk" FOREIGN KEY ("meta_image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "people_rels" ADD CONSTRAINT "people_rels_parent_fk" FOREIGN KEY ("parent_id") REFERENCES "public"."people"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "people_rels" ADD CONSTRAINT "people_rels_people_fk" FOREIGN KEY ("people_id") REFERENCES "public"."people"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "people_rels" ADD CONSTRAINT "people_rels_categories_fk" FOREIGN KEY ("categories_id") REFERENCES "public"."categories"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "people_rels" ADD CONSTRAINT "people_rels_tags_fk" FOREIGN KEY ("tags_id") REFERENCES "public"."tags"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "people_rels" ADD CONSTRAINT "people_rels_posts_fk" FOREIGN KEY ("posts_id") REFERENCES "public"."posts"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "people_rels" ADD CONSTRAINT "people_rels_pages_fk" FOREIGN KEY ("pages_id") REFERENCES "public"."pages"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "people_rels" ADD CONSTRAINT "people_rels_archive_items_fk" FOREIGN KEY ("archive_items_id") REFERENCES "public"."archive_items"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "people_rels" ADD CONSTRAINT "people_rels_places_fk" FOREIGN KEY ("places_id") REFERENCES "public"."places"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "people_rels" ADD CONSTRAINT "people_rels_custom_items_fk" FOREIGN KEY ("custom_items_id") REFERENCES "public"."custom_items"("id") ON DELETE cascade ON UPDATE no action;
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
  ALTER TABLE "_people_v_blocks_stats_stats" ADD CONSTRAINT "_people_v_blocks_stats_stats_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_people_v_blocks_stats"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_people_v_blocks_stats" ADD CONSTRAINT "_people_v_blocks_stats_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_people_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_people_v_blocks_logo_cloud_logos" ADD CONSTRAINT "_people_v_blocks_logo_cloud_logos_logo_id_media_id_fk" FOREIGN KEY ("logo_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "_people_v_blocks_logo_cloud_logos" ADD CONSTRAINT "_people_v_blocks_logo_cloud_logos_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_people_v_blocks_logo_cloud"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_people_v_blocks_logo_cloud" ADD CONSTRAINT "_people_v_blocks_logo_cloud_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_people_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_people_v_blocks_testimonials_items" ADD CONSTRAINT "_people_v_blocks_testimonials_items_avatar_id_media_id_fk" FOREIGN KEY ("avatar_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "_people_v_blocks_testimonials_items" ADD CONSTRAINT "_people_v_blocks_testimonials_items_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_people_v_blocks_testimonials"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_people_v_blocks_testimonials" ADD CONSTRAINT "_people_v_blocks_testimonials_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_people_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_people_v_blocks_faq_items" ADD CONSTRAINT "_people_v_blocks_faq_items_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_people_v_blocks_faq"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_people_v_blocks_faq" ADD CONSTRAINT "_people_v_blocks_faq_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_people_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_people_v_blocks_pricing_plans_features" ADD CONSTRAINT "_people_v_blocks_pricing_plans_features_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_people_v_blocks_pricing_plans"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_people_v_blocks_pricing_plans" ADD CONSTRAINT "_people_v_blocks_pricing_plans_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_people_v_blocks_pricing"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_people_v_blocks_pricing" ADD CONSTRAINT "_people_v_blocks_pricing_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_people_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_people_v_blocks_team_members_socials" ADD CONSTRAINT "_people_v_blocks_team_members_socials_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_people_v_blocks_team_members"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_people_v_blocks_team_members" ADD CONSTRAINT "_people_v_blocks_team_members_photo_id_media_id_fk" FOREIGN KEY ("photo_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "_people_v_blocks_team_members" ADD CONSTRAINT "_people_v_blocks_team_members_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_people_v_blocks_team"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_people_v_blocks_team" ADD CONSTRAINT "_people_v_blocks_team_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_people_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_people_v_blocks_embed" ADD CONSTRAINT "_people_v_blocks_embed_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_people_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_people_v_blocks_archive" ADD CONSTRAINT "_people_v_blocks_archive_content_type_id_content_types_id_fk" FOREIGN KEY ("content_type_id") REFERENCES "public"."content_types"("id") ON DELETE set null ON UPDATE no action;
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
  ALTER TABLE "_people_v_blocks_timeline_events" ADD CONSTRAINT "_people_v_blocks_timeline_events_link_archive_item_id_archive_items_id_fk" FOREIGN KEY ("link_archive_item_id") REFERENCES "public"."archive_items"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "_people_v_blocks_timeline_events" ADD CONSTRAINT "_people_v_blocks_timeline_events_link_person_id_people_id_fk" FOREIGN KEY ("link_person_id") REFERENCES "public"."people"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "_people_v_blocks_timeline_events" ADD CONSTRAINT "_people_v_blocks_timeline_events_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_people_v_blocks_timeline"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_people_v_blocks_timeline" ADD CONSTRAINT "_people_v_blocks_timeline_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_people_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_people_v_blocks_spacer" ADD CONSTRAINT "_people_v_blocks_spacer_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_people_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_people_v_blocks_html" ADD CONSTRAINT "_people_v_blocks_html_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_people_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_people_v" ADD CONSTRAINT "_people_v_parent_id_people_id_fk" FOREIGN KEY ("parent_id") REFERENCES "public"."people"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "_people_v" ADD CONSTRAINT "_people_v_version_portrait_id_media_id_fk" FOREIGN KEY ("version_portrait_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "_people_v" ADD CONSTRAINT "_people_v_version_birth_place_id_places_id_fk" FOREIGN KEY ("version_birth_place_id") REFERENCES "public"."places"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "_people_v" ADD CONSTRAINT "_people_v_version_death_place_id_places_id_fk" FOREIGN KEY ("version_death_place_id") REFERENCES "public"."places"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "_people_v" ADD CONSTRAINT "_people_v_version_meta_image_id_media_id_fk" FOREIGN KEY ("version_meta_image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "_people_v_rels" ADD CONSTRAINT "_people_v_rels_parent_fk" FOREIGN KEY ("parent_id") REFERENCES "public"."_people_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_people_v_rels" ADD CONSTRAINT "_people_v_rels_people_fk" FOREIGN KEY ("people_id") REFERENCES "public"."people"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_people_v_rels" ADD CONSTRAINT "_people_v_rels_categories_fk" FOREIGN KEY ("categories_id") REFERENCES "public"."categories"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_people_v_rels" ADD CONSTRAINT "_people_v_rels_tags_fk" FOREIGN KEY ("tags_id") REFERENCES "public"."tags"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_people_v_rels" ADD CONSTRAINT "_people_v_rels_posts_fk" FOREIGN KEY ("posts_id") REFERENCES "public"."posts"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_people_v_rels" ADD CONSTRAINT "_people_v_rels_pages_fk" FOREIGN KEY ("pages_id") REFERENCES "public"."pages"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_people_v_rels" ADD CONSTRAINT "_people_v_rels_archive_items_fk" FOREIGN KEY ("archive_items_id") REFERENCES "public"."archive_items"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_people_v_rels" ADD CONSTRAINT "_people_v_rels_places_fk" FOREIGN KEY ("places_id") REFERENCES "public"."places"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_people_v_rels" ADD CONSTRAINT "_people_v_rels_custom_items_fk" FOREIGN KEY ("custom_items_id") REFERENCES "public"."custom_items"("id") ON DELETE cascade ON UPDATE no action;
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
  ALTER TABLE "places_blocks_stats_stats" ADD CONSTRAINT "places_blocks_stats_stats_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."places_blocks_stats"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "places_blocks_stats" ADD CONSTRAINT "places_blocks_stats_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."places"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "places_blocks_logo_cloud_logos" ADD CONSTRAINT "places_blocks_logo_cloud_logos_logo_id_media_id_fk" FOREIGN KEY ("logo_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "places_blocks_logo_cloud_logos" ADD CONSTRAINT "places_blocks_logo_cloud_logos_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."places_blocks_logo_cloud"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "places_blocks_logo_cloud" ADD CONSTRAINT "places_blocks_logo_cloud_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."places"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "places_blocks_testimonials_items" ADD CONSTRAINT "places_blocks_testimonials_items_avatar_id_media_id_fk" FOREIGN KEY ("avatar_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "places_blocks_testimonials_items" ADD CONSTRAINT "places_blocks_testimonials_items_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."places_blocks_testimonials"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "places_blocks_testimonials" ADD CONSTRAINT "places_blocks_testimonials_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."places"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "places_blocks_faq_items" ADD CONSTRAINT "places_blocks_faq_items_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."places_blocks_faq"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "places_blocks_faq" ADD CONSTRAINT "places_blocks_faq_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."places"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "places_blocks_pricing_plans_features" ADD CONSTRAINT "places_blocks_pricing_plans_features_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."places_blocks_pricing_plans"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "places_blocks_pricing_plans" ADD CONSTRAINT "places_blocks_pricing_plans_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."places_blocks_pricing"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "places_blocks_pricing" ADD CONSTRAINT "places_blocks_pricing_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."places"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "places_blocks_team_members_socials" ADD CONSTRAINT "places_blocks_team_members_socials_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."places_blocks_team_members"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "places_blocks_team_members" ADD CONSTRAINT "places_blocks_team_members_photo_id_media_id_fk" FOREIGN KEY ("photo_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "places_blocks_team_members" ADD CONSTRAINT "places_blocks_team_members_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."places_blocks_team"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "places_blocks_team" ADD CONSTRAINT "places_blocks_team_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."places"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "places_blocks_embed" ADD CONSTRAINT "places_blocks_embed_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."places"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "places_blocks_archive" ADD CONSTRAINT "places_blocks_archive_content_type_id_content_types_id_fk" FOREIGN KEY ("content_type_id") REFERENCES "public"."content_types"("id") ON DELETE set null ON UPDATE no action;
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
  ALTER TABLE "places_blocks_timeline_events" ADD CONSTRAINT "places_blocks_timeline_events_link_archive_item_id_archive_items_id_fk" FOREIGN KEY ("link_archive_item_id") REFERENCES "public"."archive_items"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "places_blocks_timeline_events" ADD CONSTRAINT "places_blocks_timeline_events_link_person_id_people_id_fk" FOREIGN KEY ("link_person_id") REFERENCES "public"."people"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "places_blocks_timeline_events" ADD CONSTRAINT "places_blocks_timeline_events_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."places_blocks_timeline"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "places_blocks_timeline" ADD CONSTRAINT "places_blocks_timeline_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."places"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "places_blocks_spacer" ADD CONSTRAINT "places_blocks_spacer_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."places"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "places_blocks_html" ADD CONSTRAINT "places_blocks_html_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."places"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "places" ADD CONSTRAINT "places_featured_image_id_media_id_fk" FOREIGN KEY ("featured_image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "places" ADD CONSTRAINT "places_meta_image_id_media_id_fk" FOREIGN KEY ("meta_image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "places_rels" ADD CONSTRAINT "places_rels_parent_fk" FOREIGN KEY ("parent_id") REFERENCES "public"."places"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "places_rels" ADD CONSTRAINT "places_rels_places_fk" FOREIGN KEY ("places_id") REFERENCES "public"."places"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "places_rels" ADD CONSTRAINT "places_rels_categories_fk" FOREIGN KEY ("categories_id") REFERENCES "public"."categories"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "places_rels" ADD CONSTRAINT "places_rels_tags_fk" FOREIGN KEY ("tags_id") REFERENCES "public"."tags"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "places_rels" ADD CONSTRAINT "places_rels_posts_fk" FOREIGN KEY ("posts_id") REFERENCES "public"."posts"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "places_rels" ADD CONSTRAINT "places_rels_pages_fk" FOREIGN KEY ("pages_id") REFERENCES "public"."pages"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "places_rels" ADD CONSTRAINT "places_rels_archive_items_fk" FOREIGN KEY ("archive_items_id") REFERENCES "public"."archive_items"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "places_rels" ADD CONSTRAINT "places_rels_people_fk" FOREIGN KEY ("people_id") REFERENCES "public"."people"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "places_rels" ADD CONSTRAINT "places_rels_custom_items_fk" FOREIGN KEY ("custom_items_id") REFERENCES "public"."custom_items"("id") ON DELETE cascade ON UPDATE no action;
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
  ALTER TABLE "_places_v_blocks_stats_stats" ADD CONSTRAINT "_places_v_blocks_stats_stats_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_places_v_blocks_stats"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_places_v_blocks_stats" ADD CONSTRAINT "_places_v_blocks_stats_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_places_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_places_v_blocks_logo_cloud_logos" ADD CONSTRAINT "_places_v_blocks_logo_cloud_logos_logo_id_media_id_fk" FOREIGN KEY ("logo_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "_places_v_blocks_logo_cloud_logos" ADD CONSTRAINT "_places_v_blocks_logo_cloud_logos_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_places_v_blocks_logo_cloud"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_places_v_blocks_logo_cloud" ADD CONSTRAINT "_places_v_blocks_logo_cloud_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_places_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_places_v_blocks_testimonials_items" ADD CONSTRAINT "_places_v_blocks_testimonials_items_avatar_id_media_id_fk" FOREIGN KEY ("avatar_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "_places_v_blocks_testimonials_items" ADD CONSTRAINT "_places_v_blocks_testimonials_items_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_places_v_blocks_testimonials"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_places_v_blocks_testimonials" ADD CONSTRAINT "_places_v_blocks_testimonials_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_places_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_places_v_blocks_faq_items" ADD CONSTRAINT "_places_v_blocks_faq_items_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_places_v_blocks_faq"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_places_v_blocks_faq" ADD CONSTRAINT "_places_v_blocks_faq_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_places_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_places_v_blocks_pricing_plans_features" ADD CONSTRAINT "_places_v_blocks_pricing_plans_features_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_places_v_blocks_pricing_plans"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_places_v_blocks_pricing_plans" ADD CONSTRAINT "_places_v_blocks_pricing_plans_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_places_v_blocks_pricing"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_places_v_blocks_pricing" ADD CONSTRAINT "_places_v_blocks_pricing_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_places_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_places_v_blocks_team_members_socials" ADD CONSTRAINT "_places_v_blocks_team_members_socials_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_places_v_blocks_team_members"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_places_v_blocks_team_members" ADD CONSTRAINT "_places_v_blocks_team_members_photo_id_media_id_fk" FOREIGN KEY ("photo_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "_places_v_blocks_team_members" ADD CONSTRAINT "_places_v_blocks_team_members_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_places_v_blocks_team"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_places_v_blocks_team" ADD CONSTRAINT "_places_v_blocks_team_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_places_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_places_v_blocks_embed" ADD CONSTRAINT "_places_v_blocks_embed_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_places_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_places_v_blocks_archive" ADD CONSTRAINT "_places_v_blocks_archive_content_type_id_content_types_id_fk" FOREIGN KEY ("content_type_id") REFERENCES "public"."content_types"("id") ON DELETE set null ON UPDATE no action;
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
  ALTER TABLE "_places_v_blocks_timeline_events" ADD CONSTRAINT "_places_v_blocks_timeline_events_link_archive_item_id_archive_items_id_fk" FOREIGN KEY ("link_archive_item_id") REFERENCES "public"."archive_items"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "_places_v_blocks_timeline_events" ADD CONSTRAINT "_places_v_blocks_timeline_events_link_person_id_people_id_fk" FOREIGN KEY ("link_person_id") REFERENCES "public"."people"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "_places_v_blocks_timeline_events" ADD CONSTRAINT "_places_v_blocks_timeline_events_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_places_v_blocks_timeline"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_places_v_blocks_timeline" ADD CONSTRAINT "_places_v_blocks_timeline_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_places_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_places_v_blocks_spacer" ADD CONSTRAINT "_places_v_blocks_spacer_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_places_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_places_v_blocks_html" ADD CONSTRAINT "_places_v_blocks_html_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_places_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_places_v" ADD CONSTRAINT "_places_v_parent_id_places_id_fk" FOREIGN KEY ("parent_id") REFERENCES "public"."places"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "_places_v" ADD CONSTRAINT "_places_v_version_featured_image_id_media_id_fk" FOREIGN KEY ("version_featured_image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "_places_v" ADD CONSTRAINT "_places_v_version_meta_image_id_media_id_fk" FOREIGN KEY ("version_meta_image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "_places_v_rels" ADD CONSTRAINT "_places_v_rels_parent_fk" FOREIGN KEY ("parent_id") REFERENCES "public"."_places_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_places_v_rels" ADD CONSTRAINT "_places_v_rels_places_fk" FOREIGN KEY ("places_id") REFERENCES "public"."places"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_places_v_rels" ADD CONSTRAINT "_places_v_rels_categories_fk" FOREIGN KEY ("categories_id") REFERENCES "public"."categories"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_places_v_rels" ADD CONSTRAINT "_places_v_rels_tags_fk" FOREIGN KEY ("tags_id") REFERENCES "public"."tags"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_places_v_rels" ADD CONSTRAINT "_places_v_rels_posts_fk" FOREIGN KEY ("posts_id") REFERENCES "public"."posts"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_places_v_rels" ADD CONSTRAINT "_places_v_rels_pages_fk" FOREIGN KEY ("pages_id") REFERENCES "public"."pages"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_places_v_rels" ADD CONSTRAINT "_places_v_rels_archive_items_fk" FOREIGN KEY ("archive_items_id") REFERENCES "public"."archive_items"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_places_v_rels" ADD CONSTRAINT "_places_v_rels_people_fk" FOREIGN KEY ("people_id") REFERENCES "public"."people"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_places_v_rels" ADD CONSTRAINT "_places_v_rels_custom_items_fk" FOREIGN KEY ("custom_items_id") REFERENCES "public"."custom_items"("id") ON DELETE cascade ON UPDATE no action;
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
  ALTER TABLE "events_blocks_archive" ADD CONSTRAINT "events_blocks_archive_content_type_id_content_types_id_fk" FOREIGN KEY ("content_type_id") REFERENCES "public"."content_types"("id") ON DELETE set null ON UPDATE no action;
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
  ALTER TABLE "events_blocks_timeline_events" ADD CONSTRAINT "events_blocks_timeline_events_link_archive_item_id_archive_items_id_fk" FOREIGN KEY ("link_archive_item_id") REFERENCES "public"."archive_items"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "events_blocks_timeline_events" ADD CONSTRAINT "events_blocks_timeline_events_link_person_id_people_id_fk" FOREIGN KEY ("link_person_id") REFERENCES "public"."people"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "events_blocks_timeline_events" ADD CONSTRAINT "events_blocks_timeline_events_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."events_blocks_timeline"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "events_blocks_timeline" ADD CONSTRAINT "events_blocks_timeline_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."events"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "events" ADD CONSTRAINT "events_featured_image_id_media_id_fk" FOREIGN KEY ("featured_image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "events" ADD CONSTRAINT "events_venue_id_places_id_fk" FOREIGN KEY ("venue_id") REFERENCES "public"."places"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "events" ADD CONSTRAINT "events_meta_image_id_media_id_fk" FOREIGN KEY ("meta_image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "events_rels" ADD CONSTRAINT "events_rels_parent_fk" FOREIGN KEY ("parent_id") REFERENCES "public"."events"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "events_rels" ADD CONSTRAINT "events_rels_categories_fk" FOREIGN KEY ("categories_id") REFERENCES "public"."categories"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "events_rels" ADD CONSTRAINT "events_rels_tags_fk" FOREIGN KEY ("tags_id") REFERENCES "public"."tags"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "events_rels" ADD CONSTRAINT "events_rels_people_fk" FOREIGN KEY ("people_id") REFERENCES "public"."people"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "events_rels" ADD CONSTRAINT "events_rels_events_fk" FOREIGN KEY ("events_id") REFERENCES "public"."events"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "events_rels" ADD CONSTRAINT "events_rels_posts_fk" FOREIGN KEY ("posts_id") REFERENCES "public"."posts"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "events_rels" ADD CONSTRAINT "events_rels_pages_fk" FOREIGN KEY ("pages_id") REFERENCES "public"."pages"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "events_rels" ADD CONSTRAINT "events_rels_archive_items_fk" FOREIGN KEY ("archive_items_id") REFERENCES "public"."archive_items"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "events_rels" ADD CONSTRAINT "events_rels_places_fk" FOREIGN KEY ("places_id") REFERENCES "public"."places"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "events_rels" ADD CONSTRAINT "events_rels_custom_items_fk" FOREIGN KEY ("custom_items_id") REFERENCES "public"."custom_items"("id") ON DELETE cascade ON UPDATE no action;
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
  ALTER TABLE "_events_v_blocks_archive" ADD CONSTRAINT "_events_v_blocks_archive_content_type_id_content_types_id_fk" FOREIGN KEY ("content_type_id") REFERENCES "public"."content_types"("id") ON DELETE set null ON UPDATE no action;
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
  ALTER TABLE "_events_v_blocks_timeline_events" ADD CONSTRAINT "_events_v_blocks_timeline_events_link_archive_item_id_archive_items_id_fk" FOREIGN KEY ("link_archive_item_id") REFERENCES "public"."archive_items"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "_events_v_blocks_timeline_events" ADD CONSTRAINT "_events_v_blocks_timeline_events_link_person_id_people_id_fk" FOREIGN KEY ("link_person_id") REFERENCES "public"."people"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "_events_v_blocks_timeline_events" ADD CONSTRAINT "_events_v_blocks_timeline_events_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_events_v_blocks_timeline"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_events_v_blocks_timeline" ADD CONSTRAINT "_events_v_blocks_timeline_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_events_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_events_v" ADD CONSTRAINT "_events_v_parent_id_events_id_fk" FOREIGN KEY ("parent_id") REFERENCES "public"."events"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "_events_v" ADD CONSTRAINT "_events_v_version_featured_image_id_media_id_fk" FOREIGN KEY ("version_featured_image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "_events_v" ADD CONSTRAINT "_events_v_version_venue_id_places_id_fk" FOREIGN KEY ("version_venue_id") REFERENCES "public"."places"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "_events_v" ADD CONSTRAINT "_events_v_version_meta_image_id_media_id_fk" FOREIGN KEY ("version_meta_image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "_events_v_rels" ADD CONSTRAINT "_events_v_rels_parent_fk" FOREIGN KEY ("parent_id") REFERENCES "public"."_events_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_events_v_rels" ADD CONSTRAINT "_events_v_rels_categories_fk" FOREIGN KEY ("categories_id") REFERENCES "public"."categories"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_events_v_rels" ADD CONSTRAINT "_events_v_rels_tags_fk" FOREIGN KEY ("tags_id") REFERENCES "public"."tags"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_events_v_rels" ADD CONSTRAINT "_events_v_rels_people_fk" FOREIGN KEY ("people_id") REFERENCES "public"."people"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_events_v_rels" ADD CONSTRAINT "_events_v_rels_events_fk" FOREIGN KEY ("events_id") REFERENCES "public"."events"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_events_v_rels" ADD CONSTRAINT "_events_v_rels_posts_fk" FOREIGN KEY ("posts_id") REFERENCES "public"."posts"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_events_v_rels" ADD CONSTRAINT "_events_v_rels_pages_fk" FOREIGN KEY ("pages_id") REFERENCES "public"."pages"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_events_v_rels" ADD CONSTRAINT "_events_v_rels_archive_items_fk" FOREIGN KEY ("archive_items_id") REFERENCES "public"."archive_items"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_events_v_rels" ADD CONSTRAINT "_events_v_rels_places_fk" FOREIGN KEY ("places_id") REFERENCES "public"."places"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_events_v_rels" ADD CONSTRAINT "_events_v_rels_custom_items_fk" FOREIGN KEY ("custom_items_id") REFERENCES "public"."custom_items"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "products_gallery" ADD CONSTRAINT "products_gallery_image_id_media_id_fk" FOREIGN KEY ("image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "products_gallery" ADD CONSTRAINT "products_gallery_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."products"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "products_variants" ADD CONSTRAINT "products_variants_image_id_media_id_fk" FOREIGN KEY ("image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "products_variants" ADD CONSTRAINT "products_variants_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."products"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "products_blocks_hero_links" ADD CONSTRAINT "products_blocks_hero_links_page_id_pages_id_fk" FOREIGN KEY ("page_id") REFERENCES "public"."pages"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "products_blocks_hero_links" ADD CONSTRAINT "products_blocks_hero_links_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."products_blocks_hero"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "products_blocks_hero" ADD CONSTRAINT "products_blocks_hero_image_id_media_id_fk" FOREIGN KEY ("image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "products_blocks_hero" ADD CONSTRAINT "products_blocks_hero_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."products"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "products_blocks_content_columns" ADD CONSTRAINT "products_blocks_content_columns_link_page_id_pages_id_fk" FOREIGN KEY ("link_page_id") REFERENCES "public"."pages"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "products_blocks_content_columns" ADD CONSTRAINT "products_blocks_content_columns_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."products_blocks_content"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "products_blocks_content" ADD CONSTRAINT "products_blocks_content_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."products"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "products_blocks_media" ADD CONSTRAINT "products_blocks_media_media_id_media_id_fk" FOREIGN KEY ("media_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "products_blocks_media" ADD CONSTRAINT "products_blocks_media_link_page_id_pages_id_fk" FOREIGN KEY ("link_page_id") REFERENCES "public"."pages"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "products_blocks_media" ADD CONSTRAINT "products_blocks_media_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."products"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "products_blocks_cta_links" ADD CONSTRAINT "products_blocks_cta_links_page_id_pages_id_fk" FOREIGN KEY ("page_id") REFERENCES "public"."pages"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "products_blocks_cta_links" ADD CONSTRAINT "products_blocks_cta_links_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."products_blocks_cta"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "products_blocks_cta" ADD CONSTRAINT "products_blocks_cta_image_id_media_id_fk" FOREIGN KEY ("image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "products_blocks_cta" ADD CONSTRAINT "products_blocks_cta_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."products"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "products_blocks_archive" ADD CONSTRAINT "products_blocks_archive_content_type_id_content_types_id_fk" FOREIGN KEY ("content_type_id") REFERENCES "public"."content_types"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "products_blocks_archive" ADD CONSTRAINT "products_blocks_archive_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."products"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "products_blocks_form" ADD CONSTRAINT "products_blocks_form_form_id_forms_id_fk" FOREIGN KEY ("form_id") REFERENCES "public"."forms"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "products_blocks_form" ADD CONSTRAINT "products_blocks_form_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."products"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "products_blocks_gallery_images" ADD CONSTRAINT "products_blocks_gallery_images_image_id_media_id_fk" FOREIGN KEY ("image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "products_blocks_gallery_images" ADD CONSTRAINT "products_blocks_gallery_images_link_page_id_pages_id_fk" FOREIGN KEY ("link_page_id") REFERENCES "public"."pages"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "products_blocks_gallery_images" ADD CONSTRAINT "products_blocks_gallery_images_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."products_blocks_gallery"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "products_blocks_gallery" ADD CONSTRAINT "products_blocks_gallery_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."products"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "products_blocks_grid_items" ADD CONSTRAINT "products_blocks_grid_items_image_id_media_id_fk" FOREIGN KEY ("image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "products_blocks_grid_items" ADD CONSTRAINT "products_blocks_grid_items_link_page_id_pages_id_fk" FOREIGN KEY ("link_page_id") REFERENCES "public"."pages"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "products_blocks_grid_items" ADD CONSTRAINT "products_blocks_grid_items_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."products_blocks_grid"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "products_blocks_grid" ADD CONSTRAINT "products_blocks_grid_cta_page_id_pages_id_fk" FOREIGN KEY ("cta_page_id") REFERENCES "public"."pages"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "products_blocks_grid" ADD CONSTRAINT "products_blocks_grid_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."products"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "products_blocks_timeline_events" ADD CONSTRAINT "products_blocks_timeline_events_image_id_media_id_fk" FOREIGN KEY ("image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "products_blocks_timeline_events" ADD CONSTRAINT "products_blocks_timeline_events_link_page_id_pages_id_fk" FOREIGN KEY ("link_page_id") REFERENCES "public"."pages"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "products_blocks_timeline_events" ADD CONSTRAINT "products_blocks_timeline_events_link_archive_item_id_archive_items_id_fk" FOREIGN KEY ("link_archive_item_id") REFERENCES "public"."archive_items"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "products_blocks_timeline_events" ADD CONSTRAINT "products_blocks_timeline_events_link_person_id_people_id_fk" FOREIGN KEY ("link_person_id") REFERENCES "public"."people"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "products_blocks_timeline_events" ADD CONSTRAINT "products_blocks_timeline_events_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."products_blocks_timeline"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "products_blocks_timeline" ADD CONSTRAINT "products_blocks_timeline_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."products"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "products" ADD CONSTRAINT "products_featured_image_id_media_id_fk" FOREIGN KEY ("featured_image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "products" ADD CONSTRAINT "products_meta_image_id_media_id_fk" FOREIGN KEY ("meta_image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "products_rels" ADD CONSTRAINT "products_rels_parent_fk" FOREIGN KEY ("parent_id") REFERENCES "public"."products"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "products_rels" ADD CONSTRAINT "products_rels_categories_fk" FOREIGN KEY ("categories_id") REFERENCES "public"."categories"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "products_rels" ADD CONSTRAINT "products_rels_product_collections_fk" FOREIGN KEY ("product_collections_id") REFERENCES "public"."product_collections"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "products_rels" ADD CONSTRAINT "products_rels_tags_fk" FOREIGN KEY ("tags_id") REFERENCES "public"."tags"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "products_rels" ADD CONSTRAINT "products_rels_products_fk" FOREIGN KEY ("products_id") REFERENCES "public"."products"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "products_rels" ADD CONSTRAINT "products_rels_posts_fk" FOREIGN KEY ("posts_id") REFERENCES "public"."posts"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "products_rels" ADD CONSTRAINT "products_rels_pages_fk" FOREIGN KEY ("pages_id") REFERENCES "public"."pages"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "products_rels" ADD CONSTRAINT "products_rels_archive_items_fk" FOREIGN KEY ("archive_items_id") REFERENCES "public"."archive_items"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "products_rels" ADD CONSTRAINT "products_rels_people_fk" FOREIGN KEY ("people_id") REFERENCES "public"."people"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "products_rels" ADD CONSTRAINT "products_rels_places_fk" FOREIGN KEY ("places_id") REFERENCES "public"."places"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "products_rels" ADD CONSTRAINT "products_rels_custom_items_fk" FOREIGN KEY ("custom_items_id") REFERENCES "public"."custom_items"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_products_v_version_gallery" ADD CONSTRAINT "_products_v_version_gallery_image_id_media_id_fk" FOREIGN KEY ("image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "_products_v_version_gallery" ADD CONSTRAINT "_products_v_version_gallery_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_products_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_products_v_version_variants" ADD CONSTRAINT "_products_v_version_variants_image_id_media_id_fk" FOREIGN KEY ("image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "_products_v_version_variants" ADD CONSTRAINT "_products_v_version_variants_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_products_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_products_v_blocks_hero_links" ADD CONSTRAINT "_products_v_blocks_hero_links_page_id_pages_id_fk" FOREIGN KEY ("page_id") REFERENCES "public"."pages"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "_products_v_blocks_hero_links" ADD CONSTRAINT "_products_v_blocks_hero_links_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_products_v_blocks_hero"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_products_v_blocks_hero" ADD CONSTRAINT "_products_v_blocks_hero_image_id_media_id_fk" FOREIGN KEY ("image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "_products_v_blocks_hero" ADD CONSTRAINT "_products_v_blocks_hero_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_products_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_products_v_blocks_content_columns" ADD CONSTRAINT "_products_v_blocks_content_columns_link_page_id_pages_id_fk" FOREIGN KEY ("link_page_id") REFERENCES "public"."pages"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "_products_v_blocks_content_columns" ADD CONSTRAINT "_products_v_blocks_content_columns_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_products_v_blocks_content"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_products_v_blocks_content" ADD CONSTRAINT "_products_v_blocks_content_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_products_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_products_v_blocks_media" ADD CONSTRAINT "_products_v_blocks_media_media_id_media_id_fk" FOREIGN KEY ("media_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "_products_v_blocks_media" ADD CONSTRAINT "_products_v_blocks_media_link_page_id_pages_id_fk" FOREIGN KEY ("link_page_id") REFERENCES "public"."pages"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "_products_v_blocks_media" ADD CONSTRAINT "_products_v_blocks_media_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_products_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_products_v_blocks_cta_links" ADD CONSTRAINT "_products_v_blocks_cta_links_page_id_pages_id_fk" FOREIGN KEY ("page_id") REFERENCES "public"."pages"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "_products_v_blocks_cta_links" ADD CONSTRAINT "_products_v_blocks_cta_links_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_products_v_blocks_cta"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_products_v_blocks_cta" ADD CONSTRAINT "_products_v_blocks_cta_image_id_media_id_fk" FOREIGN KEY ("image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "_products_v_blocks_cta" ADD CONSTRAINT "_products_v_blocks_cta_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_products_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_products_v_blocks_archive" ADD CONSTRAINT "_products_v_blocks_archive_content_type_id_content_types_id_fk" FOREIGN KEY ("content_type_id") REFERENCES "public"."content_types"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "_products_v_blocks_archive" ADD CONSTRAINT "_products_v_blocks_archive_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_products_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_products_v_blocks_form" ADD CONSTRAINT "_products_v_blocks_form_form_id_forms_id_fk" FOREIGN KEY ("form_id") REFERENCES "public"."forms"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "_products_v_blocks_form" ADD CONSTRAINT "_products_v_blocks_form_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_products_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_products_v_blocks_gallery_images" ADD CONSTRAINT "_products_v_blocks_gallery_images_image_id_media_id_fk" FOREIGN KEY ("image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "_products_v_blocks_gallery_images" ADD CONSTRAINT "_products_v_blocks_gallery_images_link_page_id_pages_id_fk" FOREIGN KEY ("link_page_id") REFERENCES "public"."pages"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "_products_v_blocks_gallery_images" ADD CONSTRAINT "_products_v_blocks_gallery_images_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_products_v_blocks_gallery"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_products_v_blocks_gallery" ADD CONSTRAINT "_products_v_blocks_gallery_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_products_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_products_v_blocks_grid_items" ADD CONSTRAINT "_products_v_blocks_grid_items_image_id_media_id_fk" FOREIGN KEY ("image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "_products_v_blocks_grid_items" ADD CONSTRAINT "_products_v_blocks_grid_items_link_page_id_pages_id_fk" FOREIGN KEY ("link_page_id") REFERENCES "public"."pages"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "_products_v_blocks_grid_items" ADD CONSTRAINT "_products_v_blocks_grid_items_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_products_v_blocks_grid"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_products_v_blocks_grid" ADD CONSTRAINT "_products_v_blocks_grid_cta_page_id_pages_id_fk" FOREIGN KEY ("cta_page_id") REFERENCES "public"."pages"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "_products_v_blocks_grid" ADD CONSTRAINT "_products_v_blocks_grid_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_products_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_products_v_blocks_timeline_events" ADD CONSTRAINT "_products_v_blocks_timeline_events_image_id_media_id_fk" FOREIGN KEY ("image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "_products_v_blocks_timeline_events" ADD CONSTRAINT "_products_v_blocks_timeline_events_link_page_id_pages_id_fk" FOREIGN KEY ("link_page_id") REFERENCES "public"."pages"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "_products_v_blocks_timeline_events" ADD CONSTRAINT "_products_v_blocks_timeline_events_link_archive_item_id_archive_items_id_fk" FOREIGN KEY ("link_archive_item_id") REFERENCES "public"."archive_items"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "_products_v_blocks_timeline_events" ADD CONSTRAINT "_products_v_blocks_timeline_events_link_person_id_people_id_fk" FOREIGN KEY ("link_person_id") REFERENCES "public"."people"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "_products_v_blocks_timeline_events" ADD CONSTRAINT "_products_v_blocks_timeline_events_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_products_v_blocks_timeline"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_products_v_blocks_timeline" ADD CONSTRAINT "_products_v_blocks_timeline_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_products_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_products_v" ADD CONSTRAINT "_products_v_parent_id_products_id_fk" FOREIGN KEY ("parent_id") REFERENCES "public"."products"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "_products_v" ADD CONSTRAINT "_products_v_version_featured_image_id_media_id_fk" FOREIGN KEY ("version_featured_image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "_products_v" ADD CONSTRAINT "_products_v_version_meta_image_id_media_id_fk" FOREIGN KEY ("version_meta_image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "_products_v_rels" ADD CONSTRAINT "_products_v_rels_parent_fk" FOREIGN KEY ("parent_id") REFERENCES "public"."_products_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_products_v_rels" ADD CONSTRAINT "_products_v_rels_categories_fk" FOREIGN KEY ("categories_id") REFERENCES "public"."categories"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_products_v_rels" ADD CONSTRAINT "_products_v_rels_product_collections_fk" FOREIGN KEY ("product_collections_id") REFERENCES "public"."product_collections"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_products_v_rels" ADD CONSTRAINT "_products_v_rels_tags_fk" FOREIGN KEY ("tags_id") REFERENCES "public"."tags"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_products_v_rels" ADD CONSTRAINT "_products_v_rels_products_fk" FOREIGN KEY ("products_id") REFERENCES "public"."products"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_products_v_rels" ADD CONSTRAINT "_products_v_rels_posts_fk" FOREIGN KEY ("posts_id") REFERENCES "public"."posts"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_products_v_rels" ADD CONSTRAINT "_products_v_rels_pages_fk" FOREIGN KEY ("pages_id") REFERENCES "public"."pages"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_products_v_rels" ADD CONSTRAINT "_products_v_rels_archive_items_fk" FOREIGN KEY ("archive_items_id") REFERENCES "public"."archive_items"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_products_v_rels" ADD CONSTRAINT "_products_v_rels_people_fk" FOREIGN KEY ("people_id") REFERENCES "public"."people"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_products_v_rels" ADD CONSTRAINT "_products_v_rels_places_fk" FOREIGN KEY ("places_id") REFERENCES "public"."places"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_products_v_rels" ADD CONSTRAINT "_products_v_rels_custom_items_fk" FOREIGN KEY ("custom_items_id") REFERENCES "public"."custom_items"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "product_categories_breadcrumbs" ADD CONSTRAINT "product_categories_breadcrumbs_doc_id_product_categories_id_fk" FOREIGN KEY ("doc_id") REFERENCES "public"."product_categories"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "product_categories_breadcrumbs" ADD CONSTRAINT "product_categories_breadcrumbs_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."product_categories"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "product_categories" ADD CONSTRAINT "product_categories_featured_image_id_media_id_fk" FOREIGN KEY ("featured_image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "product_categories" ADD CONSTRAINT "product_categories_parent_id_product_categories_id_fk" FOREIGN KEY ("parent_id") REFERENCES "public"."product_categories"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "_product_categories_v_version_breadcrumbs" ADD CONSTRAINT "_product_categories_v_version_breadcrumbs_doc_id_product_categories_id_fk" FOREIGN KEY ("doc_id") REFERENCES "public"."product_categories"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "_product_categories_v_version_breadcrumbs" ADD CONSTRAINT "_product_categories_v_version_breadcrumbs_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_product_categories_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_product_categories_v" ADD CONSTRAINT "_product_categories_v_parent_id_product_categories_id_fk" FOREIGN KEY ("parent_id") REFERENCES "public"."product_categories"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "_product_categories_v" ADD CONSTRAINT "_product_categories_v_version_featured_image_id_media_id_fk" FOREIGN KEY ("version_featured_image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "_product_categories_v" ADD CONSTRAINT "_product_categories_v_version_parent_id_product_categories_id_fk" FOREIGN KEY ("version_parent_id") REFERENCES "public"."product_categories"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "product_collections" ADD CONSTRAINT "product_collections_featured_image_id_media_id_fk" FOREIGN KEY ("featured_image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "product_collections" ADD CONSTRAINT "product_collections_banner_image_id_media_id_fk" FOREIGN KEY ("banner_image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "product_collections_rels" ADD CONSTRAINT "product_collections_rels_parent_fk" FOREIGN KEY ("parent_id") REFERENCES "public"."product_collections"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "product_collections_rels" ADD CONSTRAINT "product_collections_rels_products_fk" FOREIGN KEY ("products_id") REFERENCES "public"."products"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_product_collections_v" ADD CONSTRAINT "_product_collections_v_parent_id_product_collections_id_fk" FOREIGN KEY ("parent_id") REFERENCES "public"."product_collections"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "_product_collections_v" ADD CONSTRAINT "_product_collections_v_version_featured_image_id_media_id_fk" FOREIGN KEY ("version_featured_image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "_product_collections_v" ADD CONSTRAINT "_product_collections_v_version_banner_image_id_media_id_fk" FOREIGN KEY ("version_banner_image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "_product_collections_v_rels" ADD CONSTRAINT "_product_collections_v_rels_parent_fk" FOREIGN KEY ("parent_id") REFERENCES "public"."_product_collections_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_product_collections_v_rels" ADD CONSTRAINT "_product_collections_v_rels_products_fk" FOREIGN KEY ("products_id") REFERENCES "public"."products"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "content_types_custom_fields" ADD CONSTRAINT "content_types_custom_fields_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."content_types"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "content_types" ADD CONSTRAINT "content_types_meta_image_id_media_id_fk" FOREIGN KEY ("meta_image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
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
  ALTER TABLE "custom_items_blocks_stats_stats" ADD CONSTRAINT "custom_items_blocks_stats_stats_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."custom_items_blocks_stats"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "custom_items_blocks_stats" ADD CONSTRAINT "custom_items_blocks_stats_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."custom_items"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "custom_items_blocks_logo_cloud_logos" ADD CONSTRAINT "custom_items_blocks_logo_cloud_logos_logo_id_media_id_fk" FOREIGN KEY ("logo_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "custom_items_blocks_logo_cloud_logos" ADD CONSTRAINT "custom_items_blocks_logo_cloud_logos_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."custom_items_blocks_logo_cloud"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "custom_items_blocks_logo_cloud" ADD CONSTRAINT "custom_items_blocks_logo_cloud_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."custom_items"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "custom_items_blocks_testimonials_items" ADD CONSTRAINT "custom_items_blocks_testimonials_items_avatar_id_media_id_fk" FOREIGN KEY ("avatar_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "custom_items_blocks_testimonials_items" ADD CONSTRAINT "custom_items_blocks_testimonials_items_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."custom_items_blocks_testimonials"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "custom_items_blocks_testimonials" ADD CONSTRAINT "custom_items_blocks_testimonials_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."custom_items"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "custom_items_blocks_faq_items" ADD CONSTRAINT "custom_items_blocks_faq_items_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."custom_items_blocks_faq"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "custom_items_blocks_faq" ADD CONSTRAINT "custom_items_blocks_faq_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."custom_items"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "custom_items_blocks_pricing_plans_features" ADD CONSTRAINT "custom_items_blocks_pricing_plans_features_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."custom_items_blocks_pricing_plans"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "custom_items_blocks_pricing_plans" ADD CONSTRAINT "custom_items_blocks_pricing_plans_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."custom_items_blocks_pricing"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "custom_items_blocks_pricing" ADD CONSTRAINT "custom_items_blocks_pricing_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."custom_items"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "custom_items_blocks_team_members_socials" ADD CONSTRAINT "custom_items_blocks_team_members_socials_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."custom_items_blocks_team_members"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "custom_items_blocks_team_members" ADD CONSTRAINT "custom_items_blocks_team_members_photo_id_media_id_fk" FOREIGN KEY ("photo_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "custom_items_blocks_team_members" ADD CONSTRAINT "custom_items_blocks_team_members_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."custom_items_blocks_team"("id") ON DELETE cascade ON UPDATE no action;
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
  ALTER TABLE "custom_items_blocks_timeline_events" ADD CONSTRAINT "custom_items_blocks_timeline_events_link_archive_item_id_archive_items_id_fk" FOREIGN KEY ("link_archive_item_id") REFERENCES "public"."archive_items"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "custom_items_blocks_timeline_events" ADD CONSTRAINT "custom_items_blocks_timeline_events_link_person_id_people_id_fk" FOREIGN KEY ("link_person_id") REFERENCES "public"."people"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "custom_items_blocks_timeline_events" ADD CONSTRAINT "custom_items_blocks_timeline_events_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."custom_items_blocks_timeline"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "custom_items_blocks_timeline" ADD CONSTRAINT "custom_items_blocks_timeline_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."custom_items"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "custom_items_blocks_archive" ADD CONSTRAINT "custom_items_blocks_archive_content_type_id_content_types_id_fk" FOREIGN KEY ("content_type_id") REFERENCES "public"."content_types"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "custom_items_blocks_archive" ADD CONSTRAINT "custom_items_blocks_archive_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."custom_items"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "custom_items_blocks_form" ADD CONSTRAINT "custom_items_blocks_form_form_id_forms_id_fk" FOREIGN KEY ("form_id") REFERENCES "public"."forms"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "custom_items_blocks_form" ADD CONSTRAINT "custom_items_blocks_form_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."custom_items"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "custom_items_blocks_spacer" ADD CONSTRAINT "custom_items_blocks_spacer_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."custom_items"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "custom_items_blocks_html" ADD CONSTRAINT "custom_items_blocks_html_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."custom_items"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "custom_items_gallery" ADD CONSTRAINT "custom_items_gallery_image_id_media_id_fk" FOREIGN KEY ("image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "custom_items_gallery" ADD CONSTRAINT "custom_items_gallery_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."custom_items"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "custom_items" ADD CONSTRAINT "custom_items_featured_image_id_media_id_fk" FOREIGN KEY ("featured_image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "custom_items" ADD CONSTRAINT "custom_items_meta_image_id_media_id_fk" FOREIGN KEY ("meta_image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "custom_items" ADD CONSTRAINT "custom_items_content_type_id_content_types_id_fk" FOREIGN KEY ("content_type_id") REFERENCES "public"."content_types"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "custom_items" ADD CONSTRAINT "custom_items_author_id_users_id_fk" FOREIGN KEY ("author_id") REFERENCES "public"."users"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "custom_items_rels" ADD CONSTRAINT "custom_items_rels_parent_fk" FOREIGN KEY ("parent_id") REFERENCES "public"."custom_items"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "custom_items_rels" ADD CONSTRAINT "custom_items_rels_categories_fk" FOREIGN KEY ("categories_id") REFERENCES "public"."categories"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "custom_items_rels" ADD CONSTRAINT "custom_items_rels_tags_fk" FOREIGN KEY ("tags_id") REFERENCES "public"."tags"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "custom_items_rels" ADD CONSTRAINT "custom_items_rels_posts_fk" FOREIGN KEY ("posts_id") REFERENCES "public"."posts"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "custom_items_rels" ADD CONSTRAINT "custom_items_rels_pages_fk" FOREIGN KEY ("pages_id") REFERENCES "public"."pages"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "custom_items_rels" ADD CONSTRAINT "custom_items_rels_archive_items_fk" FOREIGN KEY ("archive_items_id") REFERENCES "public"."archive_items"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "custom_items_rels" ADD CONSTRAINT "custom_items_rels_people_fk" FOREIGN KEY ("people_id") REFERENCES "public"."people"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "custom_items_rels" ADD CONSTRAINT "custom_items_rels_places_fk" FOREIGN KEY ("places_id") REFERENCES "public"."places"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "custom_items_rels" ADD CONSTRAINT "custom_items_rels_custom_items_fk" FOREIGN KEY ("custom_items_id") REFERENCES "public"."custom_items"("id") ON DELETE cascade ON UPDATE no action;
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
  ALTER TABLE "_custom_items_v_blocks_stats_stats" ADD CONSTRAINT "_custom_items_v_blocks_stats_stats_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_custom_items_v_blocks_stats"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_custom_items_v_blocks_stats" ADD CONSTRAINT "_custom_items_v_blocks_stats_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_custom_items_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_custom_items_v_blocks_logo_cloud_logos" ADD CONSTRAINT "_custom_items_v_blocks_logo_cloud_logos_logo_id_media_id_fk" FOREIGN KEY ("logo_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "_custom_items_v_blocks_logo_cloud_logos" ADD CONSTRAINT "_custom_items_v_blocks_logo_cloud_logos_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_custom_items_v_blocks_logo_cloud"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_custom_items_v_blocks_logo_cloud" ADD CONSTRAINT "_custom_items_v_blocks_logo_cloud_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_custom_items_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_custom_items_v_blocks_testimonials_items" ADD CONSTRAINT "_custom_items_v_blocks_testimonials_items_avatar_id_media_id_fk" FOREIGN KEY ("avatar_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "_custom_items_v_blocks_testimonials_items" ADD CONSTRAINT "_custom_items_v_blocks_testimonials_items_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_custom_items_v_blocks_testimonials"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_custom_items_v_blocks_testimonials" ADD CONSTRAINT "_custom_items_v_blocks_testimonials_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_custom_items_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_custom_items_v_blocks_faq_items" ADD CONSTRAINT "_custom_items_v_blocks_faq_items_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_custom_items_v_blocks_faq"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_custom_items_v_blocks_faq" ADD CONSTRAINT "_custom_items_v_blocks_faq_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_custom_items_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_custom_items_v_blocks_pricing_plans_features" ADD CONSTRAINT "_custom_items_v_blocks_pricing_plans_features_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_custom_items_v_blocks_pricing_plans"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_custom_items_v_blocks_pricing_plans" ADD CONSTRAINT "_custom_items_v_blocks_pricing_plans_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_custom_items_v_blocks_pricing"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_custom_items_v_blocks_pricing" ADD CONSTRAINT "_custom_items_v_blocks_pricing_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_custom_items_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_custom_items_v_blocks_team_members_socials" ADD CONSTRAINT "_custom_items_v_blocks_team_members_socials_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_custom_items_v_blocks_team_members"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_custom_items_v_blocks_team_members" ADD CONSTRAINT "_custom_items_v_blocks_team_members_photo_id_media_id_fk" FOREIGN KEY ("photo_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "_custom_items_v_blocks_team_members" ADD CONSTRAINT "_custom_items_v_blocks_team_members_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_custom_items_v_blocks_team"("id") ON DELETE cascade ON UPDATE no action;
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
  ALTER TABLE "_custom_items_v_blocks_timeline_events" ADD CONSTRAINT "_custom_items_v_blocks_timeline_events_link_archive_item_id_archive_items_id_fk" FOREIGN KEY ("link_archive_item_id") REFERENCES "public"."archive_items"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "_custom_items_v_blocks_timeline_events" ADD CONSTRAINT "_custom_items_v_blocks_timeline_events_link_person_id_people_id_fk" FOREIGN KEY ("link_person_id") REFERENCES "public"."people"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "_custom_items_v_blocks_timeline_events" ADD CONSTRAINT "_custom_items_v_blocks_timeline_events_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_custom_items_v_blocks_timeline"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_custom_items_v_blocks_timeline" ADD CONSTRAINT "_custom_items_v_blocks_timeline_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_custom_items_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_custom_items_v_blocks_archive" ADD CONSTRAINT "_custom_items_v_blocks_archive_content_type_id_content_types_id_fk" FOREIGN KEY ("content_type_id") REFERENCES "public"."content_types"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "_custom_items_v_blocks_archive" ADD CONSTRAINT "_custom_items_v_blocks_archive_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_custom_items_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_custom_items_v_blocks_form" ADD CONSTRAINT "_custom_items_v_blocks_form_form_id_forms_id_fk" FOREIGN KEY ("form_id") REFERENCES "public"."forms"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "_custom_items_v_blocks_form" ADD CONSTRAINT "_custom_items_v_blocks_form_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_custom_items_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_custom_items_v_blocks_spacer" ADD CONSTRAINT "_custom_items_v_blocks_spacer_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_custom_items_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_custom_items_v_blocks_html" ADD CONSTRAINT "_custom_items_v_blocks_html_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_custom_items_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_custom_items_v_version_gallery" ADD CONSTRAINT "_custom_items_v_version_gallery_image_id_media_id_fk" FOREIGN KEY ("image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "_custom_items_v_version_gallery" ADD CONSTRAINT "_custom_items_v_version_gallery_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_custom_items_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_custom_items_v" ADD CONSTRAINT "_custom_items_v_parent_id_custom_items_id_fk" FOREIGN KEY ("parent_id") REFERENCES "public"."custom_items"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "_custom_items_v" ADD CONSTRAINT "_custom_items_v_version_featured_image_id_media_id_fk" FOREIGN KEY ("version_featured_image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "_custom_items_v" ADD CONSTRAINT "_custom_items_v_version_meta_image_id_media_id_fk" FOREIGN KEY ("version_meta_image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "_custom_items_v" ADD CONSTRAINT "_custom_items_v_version_content_type_id_content_types_id_fk" FOREIGN KEY ("version_content_type_id") REFERENCES "public"."content_types"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "_custom_items_v" ADD CONSTRAINT "_custom_items_v_version_author_id_users_id_fk" FOREIGN KEY ("version_author_id") REFERENCES "public"."users"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "_custom_items_v_rels" ADD CONSTRAINT "_custom_items_v_rels_parent_fk" FOREIGN KEY ("parent_id") REFERENCES "public"."_custom_items_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_custom_items_v_rels" ADD CONSTRAINT "_custom_items_v_rels_categories_fk" FOREIGN KEY ("categories_id") REFERENCES "public"."categories"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_custom_items_v_rels" ADD CONSTRAINT "_custom_items_v_rels_tags_fk" FOREIGN KEY ("tags_id") REFERENCES "public"."tags"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_custom_items_v_rels" ADD CONSTRAINT "_custom_items_v_rels_posts_fk" FOREIGN KEY ("posts_id") REFERENCES "public"."posts"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_custom_items_v_rels" ADD CONSTRAINT "_custom_items_v_rels_pages_fk" FOREIGN KEY ("pages_id") REFERENCES "public"."pages"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_custom_items_v_rels" ADD CONSTRAINT "_custom_items_v_rels_archive_items_fk" FOREIGN KEY ("archive_items_id") REFERENCES "public"."archive_items"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_custom_items_v_rels" ADD CONSTRAINT "_custom_items_v_rels_people_fk" FOREIGN KEY ("people_id") REFERENCES "public"."people"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_custom_items_v_rels" ADD CONSTRAINT "_custom_items_v_rels_places_fk" FOREIGN KEY ("places_id") REFERENCES "public"."places"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_custom_items_v_rels" ADD CONSTRAINT "_custom_items_v_rels_custom_items_fk" FOREIGN KEY ("custom_items_id") REFERENCES "public"."custom_items"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "forms_blocks_checkbox" ADD CONSTRAINT "forms_blocks_checkbox_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."forms"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "forms_blocks_country" ADD CONSTRAINT "forms_blocks_country_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."forms"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "forms_blocks_email" ADD CONSTRAINT "forms_blocks_email_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."forms"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "forms_blocks_message" ADD CONSTRAINT "forms_blocks_message_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."forms"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "forms_blocks_number" ADD CONSTRAINT "forms_blocks_number_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."forms"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "forms_blocks_select_options" ADD CONSTRAINT "forms_blocks_select_options_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."forms_blocks_select"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "forms_blocks_select" ADD CONSTRAINT "forms_blocks_select_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."forms"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "forms_blocks_state" ADD CONSTRAINT "forms_blocks_state_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."forms"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "forms_blocks_text" ADD CONSTRAINT "forms_blocks_text_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."forms"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "forms_blocks_textarea" ADD CONSTRAINT "forms_blocks_textarea_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."forms"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "forms_emails" ADD CONSTRAINT "forms_emails_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."forms"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "form_submissions_submission_data" ADD CONSTRAINT "form_submissions_submission_data_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."form_submissions"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "form_submissions" ADD CONSTRAINT "form_submissions_form_id_forms_id_fk" FOREIGN KEY ("form_id") REFERENCES "public"."forms"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "redirects_rels" ADD CONSTRAINT "redirects_rels_parent_fk" FOREIGN KEY ("parent_id") REFERENCES "public"."redirects"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "redirects_rels" ADD CONSTRAINT "redirects_rels_pages_fk" FOREIGN KEY ("pages_id") REFERENCES "public"."pages"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "redirects_rels" ADD CONSTRAINT "redirects_rels_posts_fk" FOREIGN KEY ("posts_id") REFERENCES "public"."posts"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "redirects_rels" ADD CONSTRAINT "redirects_rels_archive_items_fk" FOREIGN KEY ("archive_items_id") REFERENCES "public"."archive_items"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "search_rels" ADD CONSTRAINT "search_rels_parent_fk" FOREIGN KEY ("parent_id") REFERENCES "public"."search"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "search_rels" ADD CONSTRAINT "search_rels_pages_fk" FOREIGN KEY ("pages_id") REFERENCES "public"."pages"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "search_rels" ADD CONSTRAINT "search_rels_posts_fk" FOREIGN KEY ("posts_id") REFERENCES "public"."posts"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "search_rels" ADD CONSTRAINT "search_rels_archive_items_fk" FOREIGN KEY ("archive_items_id") REFERENCES "public"."archive_items"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "search_rels" ADD CONSTRAINT "search_rels_people_fk" FOREIGN KEY ("people_id") REFERENCES "public"."people"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "search_rels" ADD CONSTRAINT "search_rels_places_fk" FOREIGN KEY ("places_id") REFERENCES "public"."places"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "search_rels" ADD CONSTRAINT "search_rels_events_fk" FOREIGN KEY ("events_id") REFERENCES "public"."events"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "search_rels" ADD CONSTRAINT "search_rels_products_fk" FOREIGN KEY ("products_id") REFERENCES "public"."products"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "search_rels" ADD CONSTRAINT "search_rels_custom_items_fk" FOREIGN KEY ("custom_items_id") REFERENCES "public"."custom_items"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "search_rels" ADD CONSTRAINT "search_rels_content_types_fk" FOREIGN KEY ("content_types_id") REFERENCES "public"."content_types"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "payload_jobs_log" ADD CONSTRAINT "payload_jobs_log_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."payload_jobs"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "payload_locked_documents_rels" ADD CONSTRAINT "payload_locked_documents_rels_parent_fk" FOREIGN KEY ("parent_id") REFERENCES "public"."payload_locked_documents"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "payload_locked_documents_rels" ADD CONSTRAINT "payload_locked_documents_rels_users_fk" FOREIGN KEY ("users_id") REFERENCES "public"."users"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "payload_locked_documents_rels" ADD CONSTRAINT "payload_locked_documents_rels_media_fk" FOREIGN KEY ("media_id") REFERENCES "public"."media"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "payload_locked_documents_rels" ADD CONSTRAINT "payload_locked_documents_rels_pages_fk" FOREIGN KEY ("pages_id") REFERENCES "public"."pages"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "payload_locked_documents_rels" ADD CONSTRAINT "payload_locked_documents_rels_posts_fk" FOREIGN KEY ("posts_id") REFERENCES "public"."posts"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "payload_locked_documents_rels" ADD CONSTRAINT "payload_locked_documents_rels_categories_fk" FOREIGN KEY ("categories_id") REFERENCES "public"."categories"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "payload_locked_documents_rels" ADD CONSTRAINT "payload_locked_documents_rels_tags_fk" FOREIGN KEY ("tags_id") REFERENCES "public"."tags"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "payload_locked_documents_rels" ADD CONSTRAINT "payload_locked_documents_rels_archive_items_fk" FOREIGN KEY ("archive_items_id") REFERENCES "public"."archive_items"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "payload_locked_documents_rels" ADD CONSTRAINT "payload_locked_documents_rels_people_fk" FOREIGN KEY ("people_id") REFERENCES "public"."people"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "payload_locked_documents_rels" ADD CONSTRAINT "payload_locked_documents_rels_places_fk" FOREIGN KEY ("places_id") REFERENCES "public"."places"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "payload_locked_documents_rels" ADD CONSTRAINT "payload_locked_documents_rels_events_fk" FOREIGN KEY ("events_id") REFERENCES "public"."events"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "payload_locked_documents_rels" ADD CONSTRAINT "payload_locked_documents_rels_products_fk" FOREIGN KEY ("products_id") REFERENCES "public"."products"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "payload_locked_documents_rels" ADD CONSTRAINT "payload_locked_documents_rels_product_categories_fk" FOREIGN KEY ("product_categories_id") REFERENCES "public"."product_categories"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "payload_locked_documents_rels" ADD CONSTRAINT "payload_locked_documents_rels_product_collections_fk" FOREIGN KEY ("product_collections_id") REFERENCES "public"."product_collections"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "payload_locked_documents_rels" ADD CONSTRAINT "payload_locked_documents_rels_content_types_fk" FOREIGN KEY ("content_types_id") REFERENCES "public"."content_types"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "payload_locked_documents_rels" ADD CONSTRAINT "payload_locked_documents_rels_custom_items_fk" FOREIGN KEY ("custom_items_id") REFERENCES "public"."custom_items"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "payload_locked_documents_rels" ADD CONSTRAINT "payload_locked_documents_rels_forms_fk" FOREIGN KEY ("forms_id") REFERENCES "public"."forms"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "payload_locked_documents_rels" ADD CONSTRAINT "payload_locked_documents_rels_form_submissions_fk" FOREIGN KEY ("form_submissions_id") REFERENCES "public"."form_submissions"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "payload_locked_documents_rels" ADD CONSTRAINT "payload_locked_documents_rels_redirects_fk" FOREIGN KEY ("redirects_id") REFERENCES "public"."redirects"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "payload_locked_documents_rels" ADD CONSTRAINT "payload_locked_documents_rels_search_fk" FOREIGN KEY ("search_id") REFERENCES "public"."search"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "payload_preferences_rels" ADD CONSTRAINT "payload_preferences_rels_parent_fk" FOREIGN KEY ("parent_id") REFERENCES "public"."payload_preferences"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "payload_preferences_rels" ADD CONSTRAINT "payload_preferences_rels_users_fk" FOREIGN KEY ("users_id") REFERENCES "public"."users"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "header_nav_items_children" ADD CONSTRAINT "header_nav_items_children_page_id_pages_id_fk" FOREIGN KEY ("page_id") REFERENCES "public"."pages"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "header_nav_items_children" ADD CONSTRAINT "header_nav_items_children_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."header_nav_items"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "header_nav_items" ADD CONSTRAINT "header_nav_items_page_id_pages_id_fk" FOREIGN KEY ("page_id") REFERENCES "public"."pages"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "header_nav_items" ADD CONSTRAINT "header_nav_items_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."header"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "header" ADD CONSTRAINT "header_logo_id_media_id_fk" FOREIGN KEY ("logo_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "header" ADD CONSTRAINT "header_cta_button_page_id_pages_id_fk" FOREIGN KEY ("cta_button_page_id") REFERENCES "public"."pages"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "footer_columns_links" ADD CONSTRAINT "footer_columns_links_page_id_pages_id_fk" FOREIGN KEY ("page_id") REFERENCES "public"."pages"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "footer_columns_links" ADD CONSTRAINT "footer_columns_links_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."footer_columns"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "footer_columns" ADD CONSTRAINT "footer_columns_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."footer"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "footer_social_links" ADD CONSTRAINT "footer_social_links_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."footer"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "footer_legal_links" ADD CONSTRAINT "footer_legal_links_page_id_pages_id_fk" FOREIGN KEY ("page_id") REFERENCES "public"."pages"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "footer_legal_links" ADD CONSTRAINT "footer_legal_links_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."footer"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "footer" ADD CONSTRAINT "footer_logo_id_media_id_fk" FOREIGN KEY ("logo_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "settings_social_profiles" ADD CONSTRAINT "settings_social_profiles_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."settings"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "settings" ADD CONSTRAINT "settings_favicon_id_media_id_fk" FOREIGN KEY ("favicon_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "settings" ADD CONSTRAINT "settings_logo_id_media_id_fk" FOREIGN KEY ("logo_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "settings" ADD CONSTRAINT "settings_default_meta_image_id_media_id_fk" FOREIGN KEY ("default_meta_image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "navigation_settings_custom_links" ADD CONSTRAINT "navigation_settings_custom_links_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."navigation_settings"("id") ON DELETE cascade ON UPDATE no action;
  CREATE INDEX "users_social_links_order_idx" ON "users_social_links" USING btree ("_order");
  CREATE INDEX "users_social_links_parent_id_idx" ON "users_social_links" USING btree ("_parent_id");
  CREATE INDEX "users_sessions_order_idx" ON "users_sessions" USING btree ("_order");
  CREATE INDEX "users_sessions_parent_id_idx" ON "users_sessions" USING btree ("_parent_id");
  CREATE INDEX "users_avatar_idx" ON "users" USING btree ("avatar_id");
  CREATE INDEX "users_updated_at_idx" ON "users" USING btree ("updated_at");
  CREATE INDEX "users_created_at_idx" ON "users" USING btree ("created_at");
  CREATE UNIQUE INDEX "users_email_idx" ON "users" USING btree ("email");
  CREATE INDEX "media_tags_order_idx" ON "media_tags" USING btree ("_order");
  CREATE INDEX "media_tags_parent_id_idx" ON "media_tags" USING btree ("_parent_id");
  CREATE INDEX "media_updated_at_idx" ON "media" USING btree ("updated_at");
  CREATE INDEX "media_created_at_idx" ON "media" USING btree ("created_at");
  CREATE UNIQUE INDEX "media_filename_idx" ON "media" USING btree ("filename");
  CREATE INDEX "media_sizes_blur_sizes_blur_filename_idx" ON "media" USING btree ("sizes_blur_filename");
  CREATE INDEX "media_sizes_thumbnail_sizes_thumbnail_filename_idx" ON "media" USING btree ("sizes_thumbnail_filename");
  CREATE INDEX "media_sizes_small_sizes_small_filename_idx" ON "media" USING btree ("sizes_small_filename");
  CREATE INDEX "media_sizes_card_sizes_card_filename_idx" ON "media" USING btree ("sizes_card_filename");
  CREATE INDEX "media_sizes_medium_sizes_medium_filename_idx" ON "media" USING btree ("sizes_medium_filename");
  CREATE INDEX "media_sizes_tablet_sizes_tablet_filename_idx" ON "media" USING btree ("sizes_tablet_filename");
  CREATE INDEX "media_sizes_large_sizes_large_filename_idx" ON "media" USING btree ("sizes_large_filename");
  CREATE INDEX "media_sizes_desktop_sizes_desktop_filename_idx" ON "media" USING btree ("sizes_desktop_filename");
  CREATE INDEX "media_sizes_xlarge_sizes_xlarge_filename_idx" ON "media" USING btree ("sizes_xlarge_filename");
  CREATE INDEX "media_sizes_og_sizes_og_filename_idx" ON "media" USING btree ("sizes_og_filename");
  CREATE INDEX "media_sizes_avif_small_sizes_avif_small_filename_idx" ON "media" USING btree ("sizes_avif_small_filename");
  CREATE INDEX "media_sizes_avif_medium_sizes_avif_medium_filename_idx" ON "media" USING btree ("sizes_avif_medium_filename");
  CREATE INDEX "media_sizes_avif_large_sizes_avif_large_filename_idx" ON "media" USING btree ("sizes_avif_large_filename");
  CREATE INDEX "media_sizes_avif_desktop_sizes_avif_desktop_filename_idx" ON "media" USING btree ("sizes_avif_desktop_filename");
  CREATE INDEX "pages_hero_links_order_idx" ON "pages_hero_links" USING btree ("_order");
  CREATE INDEX "pages_hero_links_parent_id_idx" ON "pages_hero_links" USING btree ("_parent_id");
  CREATE INDEX "pages_hero_links_page_idx" ON "pages_hero_links" USING btree ("page_id");
  CREATE INDEX "pages_blocks_hero_links_order_idx" ON "pages_blocks_hero_links" USING btree ("_order");
  CREATE INDEX "pages_blocks_hero_links_parent_id_idx" ON "pages_blocks_hero_links" USING btree ("_parent_id");
  CREATE INDEX "pages_blocks_hero_links_page_idx" ON "pages_blocks_hero_links" USING btree ("page_id");
  CREATE INDEX "pages_blocks_hero_order_idx" ON "pages_blocks_hero" USING btree ("_order");
  CREATE INDEX "pages_blocks_hero_parent_id_idx" ON "pages_blocks_hero" USING btree ("_parent_id");
  CREATE INDEX "pages_blocks_hero_path_idx" ON "pages_blocks_hero" USING btree ("_path");
  CREATE INDEX "pages_blocks_hero_image_idx" ON "pages_blocks_hero" USING btree ("image_id");
  CREATE INDEX "pages_blocks_content_columns_order_idx" ON "pages_blocks_content_columns" USING btree ("_order");
  CREATE INDEX "pages_blocks_content_columns_parent_id_idx" ON "pages_blocks_content_columns" USING btree ("_parent_id");
  CREATE INDEX "pages_blocks_content_columns_link_link_page_idx" ON "pages_blocks_content_columns" USING btree ("link_page_id");
  CREATE INDEX "pages_blocks_content_order_idx" ON "pages_blocks_content" USING btree ("_order");
  CREATE INDEX "pages_blocks_content_parent_id_idx" ON "pages_blocks_content" USING btree ("_parent_id");
  CREATE INDEX "pages_blocks_content_path_idx" ON "pages_blocks_content" USING btree ("_path");
  CREATE INDEX "pages_blocks_media_order_idx" ON "pages_blocks_media" USING btree ("_order");
  CREATE INDEX "pages_blocks_media_parent_id_idx" ON "pages_blocks_media" USING btree ("_parent_id");
  CREATE INDEX "pages_blocks_media_path_idx" ON "pages_blocks_media" USING btree ("_path");
  CREATE INDEX "pages_blocks_media_media_idx" ON "pages_blocks_media" USING btree ("media_id");
  CREATE INDEX "pages_blocks_media_link_link_page_idx" ON "pages_blocks_media" USING btree ("link_page_id");
  CREATE INDEX "pages_blocks_cta_links_order_idx" ON "pages_blocks_cta_links" USING btree ("_order");
  CREATE INDEX "pages_blocks_cta_links_parent_id_idx" ON "pages_blocks_cta_links" USING btree ("_parent_id");
  CREATE INDEX "pages_blocks_cta_links_page_idx" ON "pages_blocks_cta_links" USING btree ("page_id");
  CREATE INDEX "pages_blocks_cta_order_idx" ON "pages_blocks_cta" USING btree ("_order");
  CREATE INDEX "pages_blocks_cta_parent_id_idx" ON "pages_blocks_cta" USING btree ("_parent_id");
  CREATE INDEX "pages_blocks_cta_path_idx" ON "pages_blocks_cta" USING btree ("_path");
  CREATE INDEX "pages_blocks_cta_image_idx" ON "pages_blocks_cta" USING btree ("image_id");
  CREATE INDEX "pages_blocks_quote_order_idx" ON "pages_blocks_quote" USING btree ("_order");
  CREATE INDEX "pages_blocks_quote_parent_id_idx" ON "pages_blocks_quote" USING btree ("_parent_id");
  CREATE INDEX "pages_blocks_quote_path_idx" ON "pages_blocks_quote" USING btree ("_path");
  CREATE INDEX "pages_blocks_features_items_order_idx" ON "pages_blocks_features_items" USING btree ("_order");
  CREATE INDEX "pages_blocks_features_items_parent_id_idx" ON "pages_blocks_features_items" USING btree ("_parent_id");
  CREATE INDEX "pages_blocks_features_items_media_idx" ON "pages_blocks_features_items" USING btree ("media_id");
  CREATE INDEX "pages_blocks_features_order_idx" ON "pages_blocks_features" USING btree ("_order");
  CREATE INDEX "pages_blocks_features_parent_id_idx" ON "pages_blocks_features" USING btree ("_parent_id");
  CREATE INDEX "pages_blocks_features_path_idx" ON "pages_blocks_features" USING btree ("_path");
  CREATE INDEX "pages_blocks_stats_stats_order_idx" ON "pages_blocks_stats_stats" USING btree ("_order");
  CREATE INDEX "pages_blocks_stats_stats_parent_id_idx" ON "pages_blocks_stats_stats" USING btree ("_parent_id");
  CREATE INDEX "pages_blocks_stats_order_idx" ON "pages_blocks_stats" USING btree ("_order");
  CREATE INDEX "pages_blocks_stats_parent_id_idx" ON "pages_blocks_stats" USING btree ("_parent_id");
  CREATE INDEX "pages_blocks_stats_path_idx" ON "pages_blocks_stats" USING btree ("_path");
  CREATE INDEX "pages_blocks_logo_cloud_logos_order_idx" ON "pages_blocks_logo_cloud_logos" USING btree ("_order");
  CREATE INDEX "pages_blocks_logo_cloud_logos_parent_id_idx" ON "pages_blocks_logo_cloud_logos" USING btree ("_parent_id");
  CREATE INDEX "pages_blocks_logo_cloud_logos_logo_idx" ON "pages_blocks_logo_cloud_logos" USING btree ("logo_id");
  CREATE INDEX "pages_blocks_logo_cloud_order_idx" ON "pages_blocks_logo_cloud" USING btree ("_order");
  CREATE INDEX "pages_blocks_logo_cloud_parent_id_idx" ON "pages_blocks_logo_cloud" USING btree ("_parent_id");
  CREATE INDEX "pages_blocks_logo_cloud_path_idx" ON "pages_blocks_logo_cloud" USING btree ("_path");
  CREATE INDEX "pages_blocks_testimonials_items_order_idx" ON "pages_blocks_testimonials_items" USING btree ("_order");
  CREATE INDEX "pages_blocks_testimonials_items_parent_id_idx" ON "pages_blocks_testimonials_items" USING btree ("_parent_id");
  CREATE INDEX "pages_blocks_testimonials_items_avatar_idx" ON "pages_blocks_testimonials_items" USING btree ("avatar_id");
  CREATE INDEX "pages_blocks_testimonials_order_idx" ON "pages_blocks_testimonials" USING btree ("_order");
  CREATE INDEX "pages_blocks_testimonials_parent_id_idx" ON "pages_blocks_testimonials" USING btree ("_parent_id");
  CREATE INDEX "pages_blocks_testimonials_path_idx" ON "pages_blocks_testimonials" USING btree ("_path");
  CREATE INDEX "pages_blocks_faq_items_order_idx" ON "pages_blocks_faq_items" USING btree ("_order");
  CREATE INDEX "pages_blocks_faq_items_parent_id_idx" ON "pages_blocks_faq_items" USING btree ("_parent_id");
  CREATE INDEX "pages_blocks_faq_order_idx" ON "pages_blocks_faq" USING btree ("_order");
  CREATE INDEX "pages_blocks_faq_parent_id_idx" ON "pages_blocks_faq" USING btree ("_parent_id");
  CREATE INDEX "pages_blocks_faq_path_idx" ON "pages_blocks_faq" USING btree ("_path");
  CREATE INDEX "pages_blocks_pricing_plans_features_order_idx" ON "pages_blocks_pricing_plans_features" USING btree ("_order");
  CREATE INDEX "pages_blocks_pricing_plans_features_parent_id_idx" ON "pages_blocks_pricing_plans_features" USING btree ("_parent_id");
  CREATE INDEX "pages_blocks_pricing_plans_order_idx" ON "pages_blocks_pricing_plans" USING btree ("_order");
  CREATE INDEX "pages_blocks_pricing_plans_parent_id_idx" ON "pages_blocks_pricing_plans" USING btree ("_parent_id");
  CREATE INDEX "pages_blocks_pricing_order_idx" ON "pages_blocks_pricing" USING btree ("_order");
  CREATE INDEX "pages_blocks_pricing_parent_id_idx" ON "pages_blocks_pricing" USING btree ("_parent_id");
  CREATE INDEX "pages_blocks_pricing_path_idx" ON "pages_blocks_pricing" USING btree ("_path");
  CREATE INDEX "pages_blocks_team_members_socials_order_idx" ON "pages_blocks_team_members_socials" USING btree ("_order");
  CREATE INDEX "pages_blocks_team_members_socials_parent_id_idx" ON "pages_blocks_team_members_socials" USING btree ("_parent_id");
  CREATE INDEX "pages_blocks_team_members_order_idx" ON "pages_blocks_team_members" USING btree ("_order");
  CREATE INDEX "pages_blocks_team_members_parent_id_idx" ON "pages_blocks_team_members" USING btree ("_parent_id");
  CREATE INDEX "pages_blocks_team_members_photo_idx" ON "pages_blocks_team_members" USING btree ("photo_id");
  CREATE INDEX "pages_blocks_team_order_idx" ON "pages_blocks_team" USING btree ("_order");
  CREATE INDEX "pages_blocks_team_parent_id_idx" ON "pages_blocks_team" USING btree ("_parent_id");
  CREATE INDEX "pages_blocks_team_path_idx" ON "pages_blocks_team" USING btree ("_path");
  CREATE INDEX "pages_blocks_embed_order_idx" ON "pages_blocks_embed" USING btree ("_order");
  CREATE INDEX "pages_blocks_embed_parent_id_idx" ON "pages_blocks_embed" USING btree ("_parent_id");
  CREATE INDEX "pages_blocks_embed_path_idx" ON "pages_blocks_embed" USING btree ("_path");
  CREATE INDEX "pages_blocks_archive_order_idx" ON "pages_blocks_archive" USING btree ("_order");
  CREATE INDEX "pages_blocks_archive_parent_id_idx" ON "pages_blocks_archive" USING btree ("_parent_id");
  CREATE INDEX "pages_blocks_archive_path_idx" ON "pages_blocks_archive" USING btree ("_path");
  CREATE INDEX "pages_blocks_archive_content_type_idx" ON "pages_blocks_archive" USING btree ("content_type_id");
  CREATE INDEX "pages_blocks_form_order_idx" ON "pages_blocks_form" USING btree ("_order");
  CREATE INDEX "pages_blocks_form_parent_id_idx" ON "pages_blocks_form" USING btree ("_parent_id");
  CREATE INDEX "pages_blocks_form_path_idx" ON "pages_blocks_form" USING btree ("_path");
  CREATE INDEX "pages_blocks_form_form_idx" ON "pages_blocks_form" USING btree ("form_id");
  CREATE INDEX "pages_blocks_gallery_images_order_idx" ON "pages_blocks_gallery_images" USING btree ("_order");
  CREATE INDEX "pages_blocks_gallery_images_parent_id_idx" ON "pages_blocks_gallery_images" USING btree ("_parent_id");
  CREATE INDEX "pages_blocks_gallery_images_image_idx" ON "pages_blocks_gallery_images" USING btree ("image_id");
  CREATE INDEX "pages_blocks_gallery_images_link_link_page_idx" ON "pages_blocks_gallery_images" USING btree ("link_page_id");
  CREATE INDEX "pages_blocks_gallery_order_idx" ON "pages_blocks_gallery" USING btree ("_order");
  CREATE INDEX "pages_blocks_gallery_parent_id_idx" ON "pages_blocks_gallery" USING btree ("_parent_id");
  CREATE INDEX "pages_blocks_gallery_path_idx" ON "pages_blocks_gallery" USING btree ("_path");
  CREATE INDEX "pages_blocks_grid_items_order_idx" ON "pages_blocks_grid_items" USING btree ("_order");
  CREATE INDEX "pages_blocks_grid_items_parent_id_idx" ON "pages_blocks_grid_items" USING btree ("_parent_id");
  CREATE INDEX "pages_blocks_grid_items_image_idx" ON "pages_blocks_grid_items" USING btree ("image_id");
  CREATE INDEX "pages_blocks_grid_items_link_link_page_idx" ON "pages_blocks_grid_items" USING btree ("link_page_id");
  CREATE INDEX "pages_blocks_grid_order_idx" ON "pages_blocks_grid" USING btree ("_order");
  CREATE INDEX "pages_blocks_grid_parent_id_idx" ON "pages_blocks_grid" USING btree ("_parent_id");
  CREATE INDEX "pages_blocks_grid_path_idx" ON "pages_blocks_grid" USING btree ("_path");
  CREATE INDEX "pages_blocks_grid_cta_cta_page_idx" ON "pages_blocks_grid" USING btree ("cta_page_id");
  CREATE INDEX "pages_blocks_timeline_events_order_idx" ON "pages_blocks_timeline_events" USING btree ("_order");
  CREATE INDEX "pages_blocks_timeline_events_parent_id_idx" ON "pages_blocks_timeline_events" USING btree ("_parent_id");
  CREATE INDEX "pages_blocks_timeline_events_image_idx" ON "pages_blocks_timeline_events" USING btree ("image_id");
  CREATE INDEX "pages_blocks_timeline_events_link_link_page_idx" ON "pages_blocks_timeline_events" USING btree ("link_page_id");
  CREATE INDEX "pages_blocks_timeline_events_link_link_archive_item_idx" ON "pages_blocks_timeline_events" USING btree ("link_archive_item_id");
  CREATE INDEX "pages_blocks_timeline_events_link_link_person_idx" ON "pages_blocks_timeline_events" USING btree ("link_person_id");
  CREATE INDEX "pages_blocks_timeline_order_idx" ON "pages_blocks_timeline" USING btree ("_order");
  CREATE INDEX "pages_blocks_timeline_parent_id_idx" ON "pages_blocks_timeline" USING btree ("_parent_id");
  CREATE INDEX "pages_blocks_timeline_path_idx" ON "pages_blocks_timeline" USING btree ("_path");
  CREATE INDEX "pages_blocks_spacer_order_idx" ON "pages_blocks_spacer" USING btree ("_order");
  CREATE INDEX "pages_blocks_spacer_parent_id_idx" ON "pages_blocks_spacer" USING btree ("_parent_id");
  CREATE INDEX "pages_blocks_spacer_path_idx" ON "pages_blocks_spacer" USING btree ("_path");
  CREATE INDEX "pages_blocks_html_order_idx" ON "pages_blocks_html" USING btree ("_order");
  CREATE INDEX "pages_blocks_html_parent_id_idx" ON "pages_blocks_html" USING btree ("_parent_id");
  CREATE INDEX "pages_blocks_html_path_idx" ON "pages_blocks_html" USING btree ("_path");
  CREATE INDEX "pages_hero_hero_image_idx" ON "pages" USING btree ("hero_image_id");
  CREATE INDEX "pages_meta_meta_image_idx" ON "pages" USING btree ("meta_image_id");
  CREATE UNIQUE INDEX "pages_slug_idx" ON "pages" USING btree ("slug");
  CREATE INDEX "pages_updated_at_idx" ON "pages" USING btree ("updated_at");
  CREATE INDEX "pages_created_at_idx" ON "pages" USING btree ("created_at");
  CREATE INDEX "pages__status_idx" ON "pages" USING btree ("_status");
  CREATE INDEX "pages_rels_order_idx" ON "pages_rels" USING btree ("order");
  CREATE INDEX "pages_rels_parent_idx" ON "pages_rels" USING btree ("parent_id");
  CREATE INDEX "pages_rels_path_idx" ON "pages_rels" USING btree ("path");
  CREATE INDEX "pages_rels_categories_id_idx" ON "pages_rels" USING btree ("categories_id");
  CREATE INDEX "pages_rels_tags_id_idx" ON "pages_rels" USING btree ("tags_id");
  CREATE INDEX "pages_rels_posts_id_idx" ON "pages_rels" USING btree ("posts_id");
  CREATE INDEX "pages_rels_pages_id_idx" ON "pages_rels" USING btree ("pages_id");
  CREATE INDEX "pages_rels_archive_items_id_idx" ON "pages_rels" USING btree ("archive_items_id");
  CREATE INDEX "pages_rels_people_id_idx" ON "pages_rels" USING btree ("people_id");
  CREATE INDEX "pages_rels_places_id_idx" ON "pages_rels" USING btree ("places_id");
  CREATE INDEX "pages_rels_custom_items_id_idx" ON "pages_rels" USING btree ("custom_items_id");
  CREATE INDEX "_pages_v_version_hero_links_order_idx" ON "_pages_v_version_hero_links" USING btree ("_order");
  CREATE INDEX "_pages_v_version_hero_links_parent_id_idx" ON "_pages_v_version_hero_links" USING btree ("_parent_id");
  CREATE INDEX "_pages_v_version_hero_links_page_idx" ON "_pages_v_version_hero_links" USING btree ("page_id");
  CREATE INDEX "_pages_v_blocks_hero_links_order_idx" ON "_pages_v_blocks_hero_links" USING btree ("_order");
  CREATE INDEX "_pages_v_blocks_hero_links_parent_id_idx" ON "_pages_v_blocks_hero_links" USING btree ("_parent_id");
  CREATE INDEX "_pages_v_blocks_hero_links_page_idx" ON "_pages_v_blocks_hero_links" USING btree ("page_id");
  CREATE INDEX "_pages_v_blocks_hero_order_idx" ON "_pages_v_blocks_hero" USING btree ("_order");
  CREATE INDEX "_pages_v_blocks_hero_parent_id_idx" ON "_pages_v_blocks_hero" USING btree ("_parent_id");
  CREATE INDEX "_pages_v_blocks_hero_path_idx" ON "_pages_v_blocks_hero" USING btree ("_path");
  CREATE INDEX "_pages_v_blocks_hero_image_idx" ON "_pages_v_blocks_hero" USING btree ("image_id");
  CREATE INDEX "_pages_v_blocks_content_columns_order_idx" ON "_pages_v_blocks_content_columns" USING btree ("_order");
  CREATE INDEX "_pages_v_blocks_content_columns_parent_id_idx" ON "_pages_v_blocks_content_columns" USING btree ("_parent_id");
  CREATE INDEX "_pages_v_blocks_content_columns_link_link_page_idx" ON "_pages_v_blocks_content_columns" USING btree ("link_page_id");
  CREATE INDEX "_pages_v_blocks_content_order_idx" ON "_pages_v_blocks_content" USING btree ("_order");
  CREATE INDEX "_pages_v_blocks_content_parent_id_idx" ON "_pages_v_blocks_content" USING btree ("_parent_id");
  CREATE INDEX "_pages_v_blocks_content_path_idx" ON "_pages_v_blocks_content" USING btree ("_path");
  CREATE INDEX "_pages_v_blocks_media_order_idx" ON "_pages_v_blocks_media" USING btree ("_order");
  CREATE INDEX "_pages_v_blocks_media_parent_id_idx" ON "_pages_v_blocks_media" USING btree ("_parent_id");
  CREATE INDEX "_pages_v_blocks_media_path_idx" ON "_pages_v_blocks_media" USING btree ("_path");
  CREATE INDEX "_pages_v_blocks_media_media_idx" ON "_pages_v_blocks_media" USING btree ("media_id");
  CREATE INDEX "_pages_v_blocks_media_link_link_page_idx" ON "_pages_v_blocks_media" USING btree ("link_page_id");
  CREATE INDEX "_pages_v_blocks_cta_links_order_idx" ON "_pages_v_blocks_cta_links" USING btree ("_order");
  CREATE INDEX "_pages_v_blocks_cta_links_parent_id_idx" ON "_pages_v_blocks_cta_links" USING btree ("_parent_id");
  CREATE INDEX "_pages_v_blocks_cta_links_page_idx" ON "_pages_v_blocks_cta_links" USING btree ("page_id");
  CREATE INDEX "_pages_v_blocks_cta_order_idx" ON "_pages_v_blocks_cta" USING btree ("_order");
  CREATE INDEX "_pages_v_blocks_cta_parent_id_idx" ON "_pages_v_blocks_cta" USING btree ("_parent_id");
  CREATE INDEX "_pages_v_blocks_cta_path_idx" ON "_pages_v_blocks_cta" USING btree ("_path");
  CREATE INDEX "_pages_v_blocks_cta_image_idx" ON "_pages_v_blocks_cta" USING btree ("image_id");
  CREATE INDEX "_pages_v_blocks_quote_order_idx" ON "_pages_v_blocks_quote" USING btree ("_order");
  CREATE INDEX "_pages_v_blocks_quote_parent_id_idx" ON "_pages_v_blocks_quote" USING btree ("_parent_id");
  CREATE INDEX "_pages_v_blocks_quote_path_idx" ON "_pages_v_blocks_quote" USING btree ("_path");
  CREATE INDEX "_pages_v_blocks_features_items_order_idx" ON "_pages_v_blocks_features_items" USING btree ("_order");
  CREATE INDEX "_pages_v_blocks_features_items_parent_id_idx" ON "_pages_v_blocks_features_items" USING btree ("_parent_id");
  CREATE INDEX "_pages_v_blocks_features_items_media_idx" ON "_pages_v_blocks_features_items" USING btree ("media_id");
  CREATE INDEX "_pages_v_blocks_features_order_idx" ON "_pages_v_blocks_features" USING btree ("_order");
  CREATE INDEX "_pages_v_blocks_features_parent_id_idx" ON "_pages_v_blocks_features" USING btree ("_parent_id");
  CREATE INDEX "_pages_v_blocks_features_path_idx" ON "_pages_v_blocks_features" USING btree ("_path");
  CREATE INDEX "_pages_v_blocks_stats_stats_order_idx" ON "_pages_v_blocks_stats_stats" USING btree ("_order");
  CREATE INDEX "_pages_v_blocks_stats_stats_parent_id_idx" ON "_pages_v_blocks_stats_stats" USING btree ("_parent_id");
  CREATE INDEX "_pages_v_blocks_stats_order_idx" ON "_pages_v_blocks_stats" USING btree ("_order");
  CREATE INDEX "_pages_v_blocks_stats_parent_id_idx" ON "_pages_v_blocks_stats" USING btree ("_parent_id");
  CREATE INDEX "_pages_v_blocks_stats_path_idx" ON "_pages_v_blocks_stats" USING btree ("_path");
  CREATE INDEX "_pages_v_blocks_logo_cloud_logos_order_idx" ON "_pages_v_blocks_logo_cloud_logos" USING btree ("_order");
  CREATE INDEX "_pages_v_blocks_logo_cloud_logos_parent_id_idx" ON "_pages_v_blocks_logo_cloud_logos" USING btree ("_parent_id");
  CREATE INDEX "_pages_v_blocks_logo_cloud_logos_logo_idx" ON "_pages_v_blocks_logo_cloud_logos" USING btree ("logo_id");
  CREATE INDEX "_pages_v_blocks_logo_cloud_order_idx" ON "_pages_v_blocks_logo_cloud" USING btree ("_order");
  CREATE INDEX "_pages_v_blocks_logo_cloud_parent_id_idx" ON "_pages_v_blocks_logo_cloud" USING btree ("_parent_id");
  CREATE INDEX "_pages_v_blocks_logo_cloud_path_idx" ON "_pages_v_blocks_logo_cloud" USING btree ("_path");
  CREATE INDEX "_pages_v_blocks_testimonials_items_order_idx" ON "_pages_v_blocks_testimonials_items" USING btree ("_order");
  CREATE INDEX "_pages_v_blocks_testimonials_items_parent_id_idx" ON "_pages_v_blocks_testimonials_items" USING btree ("_parent_id");
  CREATE INDEX "_pages_v_blocks_testimonials_items_avatar_idx" ON "_pages_v_blocks_testimonials_items" USING btree ("avatar_id");
  CREATE INDEX "_pages_v_blocks_testimonials_order_idx" ON "_pages_v_blocks_testimonials" USING btree ("_order");
  CREATE INDEX "_pages_v_blocks_testimonials_parent_id_idx" ON "_pages_v_blocks_testimonials" USING btree ("_parent_id");
  CREATE INDEX "_pages_v_blocks_testimonials_path_idx" ON "_pages_v_blocks_testimonials" USING btree ("_path");
  CREATE INDEX "_pages_v_blocks_faq_items_order_idx" ON "_pages_v_blocks_faq_items" USING btree ("_order");
  CREATE INDEX "_pages_v_blocks_faq_items_parent_id_idx" ON "_pages_v_blocks_faq_items" USING btree ("_parent_id");
  CREATE INDEX "_pages_v_blocks_faq_order_idx" ON "_pages_v_blocks_faq" USING btree ("_order");
  CREATE INDEX "_pages_v_blocks_faq_parent_id_idx" ON "_pages_v_blocks_faq" USING btree ("_parent_id");
  CREATE INDEX "_pages_v_blocks_faq_path_idx" ON "_pages_v_blocks_faq" USING btree ("_path");
  CREATE INDEX "_pages_v_blocks_pricing_plans_features_order_idx" ON "_pages_v_blocks_pricing_plans_features" USING btree ("_order");
  CREATE INDEX "_pages_v_blocks_pricing_plans_features_parent_id_idx" ON "_pages_v_blocks_pricing_plans_features" USING btree ("_parent_id");
  CREATE INDEX "_pages_v_blocks_pricing_plans_order_idx" ON "_pages_v_blocks_pricing_plans" USING btree ("_order");
  CREATE INDEX "_pages_v_blocks_pricing_plans_parent_id_idx" ON "_pages_v_blocks_pricing_plans" USING btree ("_parent_id");
  CREATE INDEX "_pages_v_blocks_pricing_order_idx" ON "_pages_v_blocks_pricing" USING btree ("_order");
  CREATE INDEX "_pages_v_blocks_pricing_parent_id_idx" ON "_pages_v_blocks_pricing" USING btree ("_parent_id");
  CREATE INDEX "_pages_v_blocks_pricing_path_idx" ON "_pages_v_blocks_pricing" USING btree ("_path");
  CREATE INDEX "_pages_v_blocks_team_members_socials_order_idx" ON "_pages_v_blocks_team_members_socials" USING btree ("_order");
  CREATE INDEX "_pages_v_blocks_team_members_socials_parent_id_idx" ON "_pages_v_blocks_team_members_socials" USING btree ("_parent_id");
  CREATE INDEX "_pages_v_blocks_team_members_order_idx" ON "_pages_v_blocks_team_members" USING btree ("_order");
  CREATE INDEX "_pages_v_blocks_team_members_parent_id_idx" ON "_pages_v_blocks_team_members" USING btree ("_parent_id");
  CREATE INDEX "_pages_v_blocks_team_members_photo_idx" ON "_pages_v_blocks_team_members" USING btree ("photo_id");
  CREATE INDEX "_pages_v_blocks_team_order_idx" ON "_pages_v_blocks_team" USING btree ("_order");
  CREATE INDEX "_pages_v_blocks_team_parent_id_idx" ON "_pages_v_blocks_team" USING btree ("_parent_id");
  CREATE INDEX "_pages_v_blocks_team_path_idx" ON "_pages_v_blocks_team" USING btree ("_path");
  CREATE INDEX "_pages_v_blocks_embed_order_idx" ON "_pages_v_blocks_embed" USING btree ("_order");
  CREATE INDEX "_pages_v_blocks_embed_parent_id_idx" ON "_pages_v_blocks_embed" USING btree ("_parent_id");
  CREATE INDEX "_pages_v_blocks_embed_path_idx" ON "_pages_v_blocks_embed" USING btree ("_path");
  CREATE INDEX "_pages_v_blocks_archive_order_idx" ON "_pages_v_blocks_archive" USING btree ("_order");
  CREATE INDEX "_pages_v_blocks_archive_parent_id_idx" ON "_pages_v_blocks_archive" USING btree ("_parent_id");
  CREATE INDEX "_pages_v_blocks_archive_path_idx" ON "_pages_v_blocks_archive" USING btree ("_path");
  CREATE INDEX "_pages_v_blocks_archive_content_type_idx" ON "_pages_v_blocks_archive" USING btree ("content_type_id");
  CREATE INDEX "_pages_v_blocks_form_order_idx" ON "_pages_v_blocks_form" USING btree ("_order");
  CREATE INDEX "_pages_v_blocks_form_parent_id_idx" ON "_pages_v_blocks_form" USING btree ("_parent_id");
  CREATE INDEX "_pages_v_blocks_form_path_idx" ON "_pages_v_blocks_form" USING btree ("_path");
  CREATE INDEX "_pages_v_blocks_form_form_idx" ON "_pages_v_blocks_form" USING btree ("form_id");
  CREATE INDEX "_pages_v_blocks_gallery_images_order_idx" ON "_pages_v_blocks_gallery_images" USING btree ("_order");
  CREATE INDEX "_pages_v_blocks_gallery_images_parent_id_idx" ON "_pages_v_blocks_gallery_images" USING btree ("_parent_id");
  CREATE INDEX "_pages_v_blocks_gallery_images_image_idx" ON "_pages_v_blocks_gallery_images" USING btree ("image_id");
  CREATE INDEX "_pages_v_blocks_gallery_images_link_link_page_idx" ON "_pages_v_blocks_gallery_images" USING btree ("link_page_id");
  CREATE INDEX "_pages_v_blocks_gallery_order_idx" ON "_pages_v_blocks_gallery" USING btree ("_order");
  CREATE INDEX "_pages_v_blocks_gallery_parent_id_idx" ON "_pages_v_blocks_gallery" USING btree ("_parent_id");
  CREATE INDEX "_pages_v_blocks_gallery_path_idx" ON "_pages_v_blocks_gallery" USING btree ("_path");
  CREATE INDEX "_pages_v_blocks_grid_items_order_idx" ON "_pages_v_blocks_grid_items" USING btree ("_order");
  CREATE INDEX "_pages_v_blocks_grid_items_parent_id_idx" ON "_pages_v_blocks_grid_items" USING btree ("_parent_id");
  CREATE INDEX "_pages_v_blocks_grid_items_image_idx" ON "_pages_v_blocks_grid_items" USING btree ("image_id");
  CREATE INDEX "_pages_v_blocks_grid_items_link_link_page_idx" ON "_pages_v_blocks_grid_items" USING btree ("link_page_id");
  CREATE INDEX "_pages_v_blocks_grid_order_idx" ON "_pages_v_blocks_grid" USING btree ("_order");
  CREATE INDEX "_pages_v_blocks_grid_parent_id_idx" ON "_pages_v_blocks_grid" USING btree ("_parent_id");
  CREATE INDEX "_pages_v_blocks_grid_path_idx" ON "_pages_v_blocks_grid" USING btree ("_path");
  CREATE INDEX "_pages_v_blocks_grid_cta_cta_page_idx" ON "_pages_v_blocks_grid" USING btree ("cta_page_id");
  CREATE INDEX "_pages_v_blocks_timeline_events_order_idx" ON "_pages_v_blocks_timeline_events" USING btree ("_order");
  CREATE INDEX "_pages_v_blocks_timeline_events_parent_id_idx" ON "_pages_v_blocks_timeline_events" USING btree ("_parent_id");
  CREATE INDEX "_pages_v_blocks_timeline_events_image_idx" ON "_pages_v_blocks_timeline_events" USING btree ("image_id");
  CREATE INDEX "_pages_v_blocks_timeline_events_link_link_page_idx" ON "_pages_v_blocks_timeline_events" USING btree ("link_page_id");
  CREATE INDEX "_pages_v_blocks_timeline_events_link_link_archive_item_idx" ON "_pages_v_blocks_timeline_events" USING btree ("link_archive_item_id");
  CREATE INDEX "_pages_v_blocks_timeline_events_link_link_person_idx" ON "_pages_v_blocks_timeline_events" USING btree ("link_person_id");
  CREATE INDEX "_pages_v_blocks_timeline_order_idx" ON "_pages_v_blocks_timeline" USING btree ("_order");
  CREATE INDEX "_pages_v_blocks_timeline_parent_id_idx" ON "_pages_v_blocks_timeline" USING btree ("_parent_id");
  CREATE INDEX "_pages_v_blocks_timeline_path_idx" ON "_pages_v_blocks_timeline" USING btree ("_path");
  CREATE INDEX "_pages_v_blocks_spacer_order_idx" ON "_pages_v_blocks_spacer" USING btree ("_order");
  CREATE INDEX "_pages_v_blocks_spacer_parent_id_idx" ON "_pages_v_blocks_spacer" USING btree ("_parent_id");
  CREATE INDEX "_pages_v_blocks_spacer_path_idx" ON "_pages_v_blocks_spacer" USING btree ("_path");
  CREATE INDEX "_pages_v_blocks_html_order_idx" ON "_pages_v_blocks_html" USING btree ("_order");
  CREATE INDEX "_pages_v_blocks_html_parent_id_idx" ON "_pages_v_blocks_html" USING btree ("_parent_id");
  CREATE INDEX "_pages_v_blocks_html_path_idx" ON "_pages_v_blocks_html" USING btree ("_path");
  CREATE INDEX "_pages_v_parent_idx" ON "_pages_v" USING btree ("parent_id");
  CREATE INDEX "_pages_v_version_hero_version_hero_image_idx" ON "_pages_v" USING btree ("version_hero_image_id");
  CREATE INDEX "_pages_v_version_meta_version_meta_image_idx" ON "_pages_v" USING btree ("version_meta_image_id");
  CREATE INDEX "_pages_v_version_version_slug_idx" ON "_pages_v" USING btree ("version_slug");
  CREATE INDEX "_pages_v_version_version_updated_at_idx" ON "_pages_v" USING btree ("version_updated_at");
  CREATE INDEX "_pages_v_version_version_created_at_idx" ON "_pages_v" USING btree ("version_created_at");
  CREATE INDEX "_pages_v_version_version__status_idx" ON "_pages_v" USING btree ("version__status");
  CREATE INDEX "_pages_v_created_at_idx" ON "_pages_v" USING btree ("created_at");
  CREATE INDEX "_pages_v_updated_at_idx" ON "_pages_v" USING btree ("updated_at");
  CREATE INDEX "_pages_v_latest_idx" ON "_pages_v" USING btree ("latest");
  CREATE INDEX "_pages_v_autosave_idx" ON "_pages_v" USING btree ("autosave");
  CREATE INDEX "_pages_v_rels_order_idx" ON "_pages_v_rels" USING btree ("order");
  CREATE INDEX "_pages_v_rels_parent_idx" ON "_pages_v_rels" USING btree ("parent_id");
  CREATE INDEX "_pages_v_rels_path_idx" ON "_pages_v_rels" USING btree ("path");
  CREATE INDEX "_pages_v_rels_categories_id_idx" ON "_pages_v_rels" USING btree ("categories_id");
  CREATE INDEX "_pages_v_rels_tags_id_idx" ON "_pages_v_rels" USING btree ("tags_id");
  CREATE INDEX "_pages_v_rels_posts_id_idx" ON "_pages_v_rels" USING btree ("posts_id");
  CREATE INDEX "_pages_v_rels_pages_id_idx" ON "_pages_v_rels" USING btree ("pages_id");
  CREATE INDEX "_pages_v_rels_archive_items_id_idx" ON "_pages_v_rels" USING btree ("archive_items_id");
  CREATE INDEX "_pages_v_rels_people_id_idx" ON "_pages_v_rels" USING btree ("people_id");
  CREATE INDEX "_pages_v_rels_places_id_idx" ON "_pages_v_rels" USING btree ("places_id");
  CREATE INDEX "_pages_v_rels_custom_items_id_idx" ON "_pages_v_rels" USING btree ("custom_items_id");
  CREATE INDEX "posts_blocks_hero_links_order_idx" ON "posts_blocks_hero_links" USING btree ("_order");
  CREATE INDEX "posts_blocks_hero_links_parent_id_idx" ON "posts_blocks_hero_links" USING btree ("_parent_id");
  CREATE INDEX "posts_blocks_hero_links_page_idx" ON "posts_blocks_hero_links" USING btree ("page_id");
  CREATE INDEX "posts_blocks_hero_order_idx" ON "posts_blocks_hero" USING btree ("_order");
  CREATE INDEX "posts_blocks_hero_parent_id_idx" ON "posts_blocks_hero" USING btree ("_parent_id");
  CREATE INDEX "posts_blocks_hero_path_idx" ON "posts_blocks_hero" USING btree ("_path");
  CREATE INDEX "posts_blocks_hero_image_idx" ON "posts_blocks_hero" USING btree ("image_id");
  CREATE INDEX "posts_blocks_content_columns_order_idx" ON "posts_blocks_content_columns" USING btree ("_order");
  CREATE INDEX "posts_blocks_content_columns_parent_id_idx" ON "posts_blocks_content_columns" USING btree ("_parent_id");
  CREATE INDEX "posts_blocks_content_columns_link_link_page_idx" ON "posts_blocks_content_columns" USING btree ("link_page_id");
  CREATE INDEX "posts_blocks_content_order_idx" ON "posts_blocks_content" USING btree ("_order");
  CREATE INDEX "posts_blocks_content_parent_id_idx" ON "posts_blocks_content" USING btree ("_parent_id");
  CREATE INDEX "posts_blocks_content_path_idx" ON "posts_blocks_content" USING btree ("_path");
  CREATE INDEX "posts_blocks_media_order_idx" ON "posts_blocks_media" USING btree ("_order");
  CREATE INDEX "posts_blocks_media_parent_id_idx" ON "posts_blocks_media" USING btree ("_parent_id");
  CREATE INDEX "posts_blocks_media_path_idx" ON "posts_blocks_media" USING btree ("_path");
  CREATE INDEX "posts_blocks_media_media_idx" ON "posts_blocks_media" USING btree ("media_id");
  CREATE INDEX "posts_blocks_media_link_link_page_idx" ON "posts_blocks_media" USING btree ("link_page_id");
  CREATE INDEX "posts_blocks_cta_links_order_idx" ON "posts_blocks_cta_links" USING btree ("_order");
  CREATE INDEX "posts_blocks_cta_links_parent_id_idx" ON "posts_blocks_cta_links" USING btree ("_parent_id");
  CREATE INDEX "posts_blocks_cta_links_page_idx" ON "posts_blocks_cta_links" USING btree ("page_id");
  CREATE INDEX "posts_blocks_cta_order_idx" ON "posts_blocks_cta" USING btree ("_order");
  CREATE INDEX "posts_blocks_cta_parent_id_idx" ON "posts_blocks_cta" USING btree ("_parent_id");
  CREATE INDEX "posts_blocks_cta_path_idx" ON "posts_blocks_cta" USING btree ("_path");
  CREATE INDEX "posts_blocks_cta_image_idx" ON "posts_blocks_cta" USING btree ("image_id");
  CREATE INDEX "posts_blocks_quote_order_idx" ON "posts_blocks_quote" USING btree ("_order");
  CREATE INDEX "posts_blocks_quote_parent_id_idx" ON "posts_blocks_quote" USING btree ("_parent_id");
  CREATE INDEX "posts_blocks_quote_path_idx" ON "posts_blocks_quote" USING btree ("_path");
  CREATE INDEX "posts_blocks_features_items_order_idx" ON "posts_blocks_features_items" USING btree ("_order");
  CREATE INDEX "posts_blocks_features_items_parent_id_idx" ON "posts_blocks_features_items" USING btree ("_parent_id");
  CREATE INDEX "posts_blocks_features_items_media_idx" ON "posts_blocks_features_items" USING btree ("media_id");
  CREATE INDEX "posts_blocks_features_order_idx" ON "posts_blocks_features" USING btree ("_order");
  CREATE INDEX "posts_blocks_features_parent_id_idx" ON "posts_blocks_features" USING btree ("_parent_id");
  CREATE INDEX "posts_blocks_features_path_idx" ON "posts_blocks_features" USING btree ("_path");
  CREATE INDEX "posts_blocks_stats_stats_order_idx" ON "posts_blocks_stats_stats" USING btree ("_order");
  CREATE INDEX "posts_blocks_stats_stats_parent_id_idx" ON "posts_blocks_stats_stats" USING btree ("_parent_id");
  CREATE INDEX "posts_blocks_stats_order_idx" ON "posts_blocks_stats" USING btree ("_order");
  CREATE INDEX "posts_blocks_stats_parent_id_idx" ON "posts_blocks_stats" USING btree ("_parent_id");
  CREATE INDEX "posts_blocks_stats_path_idx" ON "posts_blocks_stats" USING btree ("_path");
  CREATE INDEX "posts_blocks_logo_cloud_logos_order_idx" ON "posts_blocks_logo_cloud_logos" USING btree ("_order");
  CREATE INDEX "posts_blocks_logo_cloud_logos_parent_id_idx" ON "posts_blocks_logo_cloud_logos" USING btree ("_parent_id");
  CREATE INDEX "posts_blocks_logo_cloud_logos_logo_idx" ON "posts_blocks_logo_cloud_logos" USING btree ("logo_id");
  CREATE INDEX "posts_blocks_logo_cloud_order_idx" ON "posts_blocks_logo_cloud" USING btree ("_order");
  CREATE INDEX "posts_blocks_logo_cloud_parent_id_idx" ON "posts_blocks_logo_cloud" USING btree ("_parent_id");
  CREATE INDEX "posts_blocks_logo_cloud_path_idx" ON "posts_blocks_logo_cloud" USING btree ("_path");
  CREATE INDEX "posts_blocks_testimonials_items_order_idx" ON "posts_blocks_testimonials_items" USING btree ("_order");
  CREATE INDEX "posts_blocks_testimonials_items_parent_id_idx" ON "posts_blocks_testimonials_items" USING btree ("_parent_id");
  CREATE INDEX "posts_blocks_testimonials_items_avatar_idx" ON "posts_blocks_testimonials_items" USING btree ("avatar_id");
  CREATE INDEX "posts_blocks_testimonials_order_idx" ON "posts_blocks_testimonials" USING btree ("_order");
  CREATE INDEX "posts_blocks_testimonials_parent_id_idx" ON "posts_blocks_testimonials" USING btree ("_parent_id");
  CREATE INDEX "posts_blocks_testimonials_path_idx" ON "posts_blocks_testimonials" USING btree ("_path");
  CREATE INDEX "posts_blocks_faq_items_order_idx" ON "posts_blocks_faq_items" USING btree ("_order");
  CREATE INDEX "posts_blocks_faq_items_parent_id_idx" ON "posts_blocks_faq_items" USING btree ("_parent_id");
  CREATE INDEX "posts_blocks_faq_order_idx" ON "posts_blocks_faq" USING btree ("_order");
  CREATE INDEX "posts_blocks_faq_parent_id_idx" ON "posts_blocks_faq" USING btree ("_parent_id");
  CREATE INDEX "posts_blocks_faq_path_idx" ON "posts_blocks_faq" USING btree ("_path");
  CREATE INDEX "posts_blocks_pricing_plans_features_order_idx" ON "posts_blocks_pricing_plans_features" USING btree ("_order");
  CREATE INDEX "posts_blocks_pricing_plans_features_parent_id_idx" ON "posts_blocks_pricing_plans_features" USING btree ("_parent_id");
  CREATE INDEX "posts_blocks_pricing_plans_order_idx" ON "posts_blocks_pricing_plans" USING btree ("_order");
  CREATE INDEX "posts_blocks_pricing_plans_parent_id_idx" ON "posts_blocks_pricing_plans" USING btree ("_parent_id");
  CREATE INDEX "posts_blocks_pricing_order_idx" ON "posts_blocks_pricing" USING btree ("_order");
  CREATE INDEX "posts_blocks_pricing_parent_id_idx" ON "posts_blocks_pricing" USING btree ("_parent_id");
  CREATE INDEX "posts_blocks_pricing_path_idx" ON "posts_blocks_pricing" USING btree ("_path");
  CREATE INDEX "posts_blocks_team_members_socials_order_idx" ON "posts_blocks_team_members_socials" USING btree ("_order");
  CREATE INDEX "posts_blocks_team_members_socials_parent_id_idx" ON "posts_blocks_team_members_socials" USING btree ("_parent_id");
  CREATE INDEX "posts_blocks_team_members_order_idx" ON "posts_blocks_team_members" USING btree ("_order");
  CREATE INDEX "posts_blocks_team_members_parent_id_idx" ON "posts_blocks_team_members" USING btree ("_parent_id");
  CREATE INDEX "posts_blocks_team_members_photo_idx" ON "posts_blocks_team_members" USING btree ("photo_id");
  CREATE INDEX "posts_blocks_team_order_idx" ON "posts_blocks_team" USING btree ("_order");
  CREATE INDEX "posts_blocks_team_parent_id_idx" ON "posts_blocks_team" USING btree ("_parent_id");
  CREATE INDEX "posts_blocks_team_path_idx" ON "posts_blocks_team" USING btree ("_path");
  CREATE INDEX "posts_blocks_embed_order_idx" ON "posts_blocks_embed" USING btree ("_order");
  CREATE INDEX "posts_blocks_embed_parent_id_idx" ON "posts_blocks_embed" USING btree ("_parent_id");
  CREATE INDEX "posts_blocks_embed_path_idx" ON "posts_blocks_embed" USING btree ("_path");
  CREATE INDEX "posts_blocks_archive_order_idx" ON "posts_blocks_archive" USING btree ("_order");
  CREATE INDEX "posts_blocks_archive_parent_id_idx" ON "posts_blocks_archive" USING btree ("_parent_id");
  CREATE INDEX "posts_blocks_archive_path_idx" ON "posts_blocks_archive" USING btree ("_path");
  CREATE INDEX "posts_blocks_archive_content_type_idx" ON "posts_blocks_archive" USING btree ("content_type_id");
  CREATE INDEX "posts_blocks_form_order_idx" ON "posts_blocks_form" USING btree ("_order");
  CREATE INDEX "posts_blocks_form_parent_id_idx" ON "posts_blocks_form" USING btree ("_parent_id");
  CREATE INDEX "posts_blocks_form_path_idx" ON "posts_blocks_form" USING btree ("_path");
  CREATE INDEX "posts_blocks_form_form_idx" ON "posts_blocks_form" USING btree ("form_id");
  CREATE INDEX "posts_blocks_gallery_images_order_idx" ON "posts_blocks_gallery_images" USING btree ("_order");
  CREATE INDEX "posts_blocks_gallery_images_parent_id_idx" ON "posts_blocks_gallery_images" USING btree ("_parent_id");
  CREATE INDEX "posts_blocks_gallery_images_image_idx" ON "posts_blocks_gallery_images" USING btree ("image_id");
  CREATE INDEX "posts_blocks_gallery_images_link_link_page_idx" ON "posts_blocks_gallery_images" USING btree ("link_page_id");
  CREATE INDEX "posts_blocks_gallery_order_idx" ON "posts_blocks_gallery" USING btree ("_order");
  CREATE INDEX "posts_blocks_gallery_parent_id_idx" ON "posts_blocks_gallery" USING btree ("_parent_id");
  CREATE INDEX "posts_blocks_gallery_path_idx" ON "posts_blocks_gallery" USING btree ("_path");
  CREATE INDEX "posts_blocks_grid_items_order_idx" ON "posts_blocks_grid_items" USING btree ("_order");
  CREATE INDEX "posts_blocks_grid_items_parent_id_idx" ON "posts_blocks_grid_items" USING btree ("_parent_id");
  CREATE INDEX "posts_blocks_grid_items_image_idx" ON "posts_blocks_grid_items" USING btree ("image_id");
  CREATE INDEX "posts_blocks_grid_items_link_link_page_idx" ON "posts_blocks_grid_items" USING btree ("link_page_id");
  CREATE INDEX "posts_blocks_grid_order_idx" ON "posts_blocks_grid" USING btree ("_order");
  CREATE INDEX "posts_blocks_grid_parent_id_idx" ON "posts_blocks_grid" USING btree ("_parent_id");
  CREATE INDEX "posts_blocks_grid_path_idx" ON "posts_blocks_grid" USING btree ("_path");
  CREATE INDEX "posts_blocks_grid_cta_cta_page_idx" ON "posts_blocks_grid" USING btree ("cta_page_id");
  CREATE INDEX "posts_blocks_timeline_events_order_idx" ON "posts_blocks_timeline_events" USING btree ("_order");
  CREATE INDEX "posts_blocks_timeline_events_parent_id_idx" ON "posts_blocks_timeline_events" USING btree ("_parent_id");
  CREATE INDEX "posts_blocks_timeline_events_image_idx" ON "posts_blocks_timeline_events" USING btree ("image_id");
  CREATE INDEX "posts_blocks_timeline_events_link_link_page_idx" ON "posts_blocks_timeline_events" USING btree ("link_page_id");
  CREATE INDEX "posts_blocks_timeline_events_link_link_archive_item_idx" ON "posts_blocks_timeline_events" USING btree ("link_archive_item_id");
  CREATE INDEX "posts_blocks_timeline_events_link_link_person_idx" ON "posts_blocks_timeline_events" USING btree ("link_person_id");
  CREATE INDEX "posts_blocks_timeline_order_idx" ON "posts_blocks_timeline" USING btree ("_order");
  CREATE INDEX "posts_blocks_timeline_parent_id_idx" ON "posts_blocks_timeline" USING btree ("_parent_id");
  CREATE INDEX "posts_blocks_timeline_path_idx" ON "posts_blocks_timeline" USING btree ("_path");
  CREATE INDEX "posts_blocks_spacer_order_idx" ON "posts_blocks_spacer" USING btree ("_order");
  CREATE INDEX "posts_blocks_spacer_parent_id_idx" ON "posts_blocks_spacer" USING btree ("_parent_id");
  CREATE INDEX "posts_blocks_spacer_path_idx" ON "posts_blocks_spacer" USING btree ("_path");
  CREATE INDEX "posts_blocks_html_order_idx" ON "posts_blocks_html" USING btree ("_order");
  CREATE INDEX "posts_blocks_html_parent_id_idx" ON "posts_blocks_html" USING btree ("_parent_id");
  CREATE INDEX "posts_blocks_html_path_idx" ON "posts_blocks_html" USING btree ("_path");
  CREATE INDEX "posts_featured_image_idx" ON "posts" USING btree ("featured_image_id");
  CREATE INDEX "posts_meta_meta_image_idx" ON "posts" USING btree ("meta_image_id");
  CREATE UNIQUE INDEX "posts_slug_idx" ON "posts" USING btree ("slug");
  CREATE INDEX "posts_author_idx" ON "posts" USING btree ("author_id");
  CREATE INDEX "posts_updated_at_idx" ON "posts" USING btree ("updated_at");
  CREATE INDEX "posts_created_at_idx" ON "posts" USING btree ("created_at");
  CREATE INDEX "posts__status_idx" ON "posts" USING btree ("_status");
  CREATE INDEX "posts_rels_order_idx" ON "posts_rels" USING btree ("order");
  CREATE INDEX "posts_rels_parent_idx" ON "posts_rels" USING btree ("parent_id");
  CREATE INDEX "posts_rels_path_idx" ON "posts_rels" USING btree ("path");
  CREATE INDEX "posts_rels_categories_id_idx" ON "posts_rels" USING btree ("categories_id");
  CREATE INDEX "posts_rels_tags_id_idx" ON "posts_rels" USING btree ("tags_id");
  CREATE INDEX "posts_rels_posts_id_idx" ON "posts_rels" USING btree ("posts_id");
  CREATE INDEX "posts_rels_pages_id_idx" ON "posts_rels" USING btree ("pages_id");
  CREATE INDEX "posts_rels_archive_items_id_idx" ON "posts_rels" USING btree ("archive_items_id");
  CREATE INDEX "posts_rels_people_id_idx" ON "posts_rels" USING btree ("people_id");
  CREATE INDEX "posts_rels_places_id_idx" ON "posts_rels" USING btree ("places_id");
  CREATE INDEX "posts_rels_custom_items_id_idx" ON "posts_rels" USING btree ("custom_items_id");
  CREATE INDEX "_posts_v_blocks_hero_links_order_idx" ON "_posts_v_blocks_hero_links" USING btree ("_order");
  CREATE INDEX "_posts_v_blocks_hero_links_parent_id_idx" ON "_posts_v_blocks_hero_links" USING btree ("_parent_id");
  CREATE INDEX "_posts_v_blocks_hero_links_page_idx" ON "_posts_v_blocks_hero_links" USING btree ("page_id");
  CREATE INDEX "_posts_v_blocks_hero_order_idx" ON "_posts_v_blocks_hero" USING btree ("_order");
  CREATE INDEX "_posts_v_blocks_hero_parent_id_idx" ON "_posts_v_blocks_hero" USING btree ("_parent_id");
  CREATE INDEX "_posts_v_blocks_hero_path_idx" ON "_posts_v_blocks_hero" USING btree ("_path");
  CREATE INDEX "_posts_v_blocks_hero_image_idx" ON "_posts_v_blocks_hero" USING btree ("image_id");
  CREATE INDEX "_posts_v_blocks_content_columns_order_idx" ON "_posts_v_blocks_content_columns" USING btree ("_order");
  CREATE INDEX "_posts_v_blocks_content_columns_parent_id_idx" ON "_posts_v_blocks_content_columns" USING btree ("_parent_id");
  CREATE INDEX "_posts_v_blocks_content_columns_link_link_page_idx" ON "_posts_v_blocks_content_columns" USING btree ("link_page_id");
  CREATE INDEX "_posts_v_blocks_content_order_idx" ON "_posts_v_blocks_content" USING btree ("_order");
  CREATE INDEX "_posts_v_blocks_content_parent_id_idx" ON "_posts_v_blocks_content" USING btree ("_parent_id");
  CREATE INDEX "_posts_v_blocks_content_path_idx" ON "_posts_v_blocks_content" USING btree ("_path");
  CREATE INDEX "_posts_v_blocks_media_order_idx" ON "_posts_v_blocks_media" USING btree ("_order");
  CREATE INDEX "_posts_v_blocks_media_parent_id_idx" ON "_posts_v_blocks_media" USING btree ("_parent_id");
  CREATE INDEX "_posts_v_blocks_media_path_idx" ON "_posts_v_blocks_media" USING btree ("_path");
  CREATE INDEX "_posts_v_blocks_media_media_idx" ON "_posts_v_blocks_media" USING btree ("media_id");
  CREATE INDEX "_posts_v_blocks_media_link_link_page_idx" ON "_posts_v_blocks_media" USING btree ("link_page_id");
  CREATE INDEX "_posts_v_blocks_cta_links_order_idx" ON "_posts_v_blocks_cta_links" USING btree ("_order");
  CREATE INDEX "_posts_v_blocks_cta_links_parent_id_idx" ON "_posts_v_blocks_cta_links" USING btree ("_parent_id");
  CREATE INDEX "_posts_v_blocks_cta_links_page_idx" ON "_posts_v_blocks_cta_links" USING btree ("page_id");
  CREATE INDEX "_posts_v_blocks_cta_order_idx" ON "_posts_v_blocks_cta" USING btree ("_order");
  CREATE INDEX "_posts_v_blocks_cta_parent_id_idx" ON "_posts_v_blocks_cta" USING btree ("_parent_id");
  CREATE INDEX "_posts_v_blocks_cta_path_idx" ON "_posts_v_blocks_cta" USING btree ("_path");
  CREATE INDEX "_posts_v_blocks_cta_image_idx" ON "_posts_v_blocks_cta" USING btree ("image_id");
  CREATE INDEX "_posts_v_blocks_quote_order_idx" ON "_posts_v_blocks_quote" USING btree ("_order");
  CREATE INDEX "_posts_v_blocks_quote_parent_id_idx" ON "_posts_v_blocks_quote" USING btree ("_parent_id");
  CREATE INDEX "_posts_v_blocks_quote_path_idx" ON "_posts_v_blocks_quote" USING btree ("_path");
  CREATE INDEX "_posts_v_blocks_features_items_order_idx" ON "_posts_v_blocks_features_items" USING btree ("_order");
  CREATE INDEX "_posts_v_blocks_features_items_parent_id_idx" ON "_posts_v_blocks_features_items" USING btree ("_parent_id");
  CREATE INDEX "_posts_v_blocks_features_items_media_idx" ON "_posts_v_blocks_features_items" USING btree ("media_id");
  CREATE INDEX "_posts_v_blocks_features_order_idx" ON "_posts_v_blocks_features" USING btree ("_order");
  CREATE INDEX "_posts_v_blocks_features_parent_id_idx" ON "_posts_v_blocks_features" USING btree ("_parent_id");
  CREATE INDEX "_posts_v_blocks_features_path_idx" ON "_posts_v_blocks_features" USING btree ("_path");
  CREATE INDEX "_posts_v_blocks_stats_stats_order_idx" ON "_posts_v_blocks_stats_stats" USING btree ("_order");
  CREATE INDEX "_posts_v_blocks_stats_stats_parent_id_idx" ON "_posts_v_blocks_stats_stats" USING btree ("_parent_id");
  CREATE INDEX "_posts_v_blocks_stats_order_idx" ON "_posts_v_blocks_stats" USING btree ("_order");
  CREATE INDEX "_posts_v_blocks_stats_parent_id_idx" ON "_posts_v_blocks_stats" USING btree ("_parent_id");
  CREATE INDEX "_posts_v_blocks_stats_path_idx" ON "_posts_v_blocks_stats" USING btree ("_path");
  CREATE INDEX "_posts_v_blocks_logo_cloud_logos_order_idx" ON "_posts_v_blocks_logo_cloud_logos" USING btree ("_order");
  CREATE INDEX "_posts_v_blocks_logo_cloud_logos_parent_id_idx" ON "_posts_v_blocks_logo_cloud_logos" USING btree ("_parent_id");
  CREATE INDEX "_posts_v_blocks_logo_cloud_logos_logo_idx" ON "_posts_v_blocks_logo_cloud_logos" USING btree ("logo_id");
  CREATE INDEX "_posts_v_blocks_logo_cloud_order_idx" ON "_posts_v_blocks_logo_cloud" USING btree ("_order");
  CREATE INDEX "_posts_v_blocks_logo_cloud_parent_id_idx" ON "_posts_v_blocks_logo_cloud" USING btree ("_parent_id");
  CREATE INDEX "_posts_v_blocks_logo_cloud_path_idx" ON "_posts_v_blocks_logo_cloud" USING btree ("_path");
  CREATE INDEX "_posts_v_blocks_testimonials_items_order_idx" ON "_posts_v_blocks_testimonials_items" USING btree ("_order");
  CREATE INDEX "_posts_v_blocks_testimonials_items_parent_id_idx" ON "_posts_v_blocks_testimonials_items" USING btree ("_parent_id");
  CREATE INDEX "_posts_v_blocks_testimonials_items_avatar_idx" ON "_posts_v_blocks_testimonials_items" USING btree ("avatar_id");
  CREATE INDEX "_posts_v_blocks_testimonials_order_idx" ON "_posts_v_blocks_testimonials" USING btree ("_order");
  CREATE INDEX "_posts_v_blocks_testimonials_parent_id_idx" ON "_posts_v_blocks_testimonials" USING btree ("_parent_id");
  CREATE INDEX "_posts_v_blocks_testimonials_path_idx" ON "_posts_v_blocks_testimonials" USING btree ("_path");
  CREATE INDEX "_posts_v_blocks_faq_items_order_idx" ON "_posts_v_blocks_faq_items" USING btree ("_order");
  CREATE INDEX "_posts_v_blocks_faq_items_parent_id_idx" ON "_posts_v_blocks_faq_items" USING btree ("_parent_id");
  CREATE INDEX "_posts_v_blocks_faq_order_idx" ON "_posts_v_blocks_faq" USING btree ("_order");
  CREATE INDEX "_posts_v_blocks_faq_parent_id_idx" ON "_posts_v_blocks_faq" USING btree ("_parent_id");
  CREATE INDEX "_posts_v_blocks_faq_path_idx" ON "_posts_v_blocks_faq" USING btree ("_path");
  CREATE INDEX "_posts_v_blocks_pricing_plans_features_order_idx" ON "_posts_v_blocks_pricing_plans_features" USING btree ("_order");
  CREATE INDEX "_posts_v_blocks_pricing_plans_features_parent_id_idx" ON "_posts_v_blocks_pricing_plans_features" USING btree ("_parent_id");
  CREATE INDEX "_posts_v_blocks_pricing_plans_order_idx" ON "_posts_v_blocks_pricing_plans" USING btree ("_order");
  CREATE INDEX "_posts_v_blocks_pricing_plans_parent_id_idx" ON "_posts_v_blocks_pricing_plans" USING btree ("_parent_id");
  CREATE INDEX "_posts_v_blocks_pricing_order_idx" ON "_posts_v_blocks_pricing" USING btree ("_order");
  CREATE INDEX "_posts_v_blocks_pricing_parent_id_idx" ON "_posts_v_blocks_pricing" USING btree ("_parent_id");
  CREATE INDEX "_posts_v_blocks_pricing_path_idx" ON "_posts_v_blocks_pricing" USING btree ("_path");
  CREATE INDEX "_posts_v_blocks_team_members_socials_order_idx" ON "_posts_v_blocks_team_members_socials" USING btree ("_order");
  CREATE INDEX "_posts_v_blocks_team_members_socials_parent_id_idx" ON "_posts_v_blocks_team_members_socials" USING btree ("_parent_id");
  CREATE INDEX "_posts_v_blocks_team_members_order_idx" ON "_posts_v_blocks_team_members" USING btree ("_order");
  CREATE INDEX "_posts_v_blocks_team_members_parent_id_idx" ON "_posts_v_blocks_team_members" USING btree ("_parent_id");
  CREATE INDEX "_posts_v_blocks_team_members_photo_idx" ON "_posts_v_blocks_team_members" USING btree ("photo_id");
  CREATE INDEX "_posts_v_blocks_team_order_idx" ON "_posts_v_blocks_team" USING btree ("_order");
  CREATE INDEX "_posts_v_blocks_team_parent_id_idx" ON "_posts_v_blocks_team" USING btree ("_parent_id");
  CREATE INDEX "_posts_v_blocks_team_path_idx" ON "_posts_v_blocks_team" USING btree ("_path");
  CREATE INDEX "_posts_v_blocks_embed_order_idx" ON "_posts_v_blocks_embed" USING btree ("_order");
  CREATE INDEX "_posts_v_blocks_embed_parent_id_idx" ON "_posts_v_blocks_embed" USING btree ("_parent_id");
  CREATE INDEX "_posts_v_blocks_embed_path_idx" ON "_posts_v_blocks_embed" USING btree ("_path");
  CREATE INDEX "_posts_v_blocks_archive_order_idx" ON "_posts_v_blocks_archive" USING btree ("_order");
  CREATE INDEX "_posts_v_blocks_archive_parent_id_idx" ON "_posts_v_blocks_archive" USING btree ("_parent_id");
  CREATE INDEX "_posts_v_blocks_archive_path_idx" ON "_posts_v_blocks_archive" USING btree ("_path");
  CREATE INDEX "_posts_v_blocks_archive_content_type_idx" ON "_posts_v_blocks_archive" USING btree ("content_type_id");
  CREATE INDEX "_posts_v_blocks_form_order_idx" ON "_posts_v_blocks_form" USING btree ("_order");
  CREATE INDEX "_posts_v_blocks_form_parent_id_idx" ON "_posts_v_blocks_form" USING btree ("_parent_id");
  CREATE INDEX "_posts_v_blocks_form_path_idx" ON "_posts_v_blocks_form" USING btree ("_path");
  CREATE INDEX "_posts_v_blocks_form_form_idx" ON "_posts_v_blocks_form" USING btree ("form_id");
  CREATE INDEX "_posts_v_blocks_gallery_images_order_idx" ON "_posts_v_blocks_gallery_images" USING btree ("_order");
  CREATE INDEX "_posts_v_blocks_gallery_images_parent_id_idx" ON "_posts_v_blocks_gallery_images" USING btree ("_parent_id");
  CREATE INDEX "_posts_v_blocks_gallery_images_image_idx" ON "_posts_v_blocks_gallery_images" USING btree ("image_id");
  CREATE INDEX "_posts_v_blocks_gallery_images_link_link_page_idx" ON "_posts_v_blocks_gallery_images" USING btree ("link_page_id");
  CREATE INDEX "_posts_v_blocks_gallery_order_idx" ON "_posts_v_blocks_gallery" USING btree ("_order");
  CREATE INDEX "_posts_v_blocks_gallery_parent_id_idx" ON "_posts_v_blocks_gallery" USING btree ("_parent_id");
  CREATE INDEX "_posts_v_blocks_gallery_path_idx" ON "_posts_v_blocks_gallery" USING btree ("_path");
  CREATE INDEX "_posts_v_blocks_grid_items_order_idx" ON "_posts_v_blocks_grid_items" USING btree ("_order");
  CREATE INDEX "_posts_v_blocks_grid_items_parent_id_idx" ON "_posts_v_blocks_grid_items" USING btree ("_parent_id");
  CREATE INDEX "_posts_v_blocks_grid_items_image_idx" ON "_posts_v_blocks_grid_items" USING btree ("image_id");
  CREATE INDEX "_posts_v_blocks_grid_items_link_link_page_idx" ON "_posts_v_blocks_grid_items" USING btree ("link_page_id");
  CREATE INDEX "_posts_v_blocks_grid_order_idx" ON "_posts_v_blocks_grid" USING btree ("_order");
  CREATE INDEX "_posts_v_blocks_grid_parent_id_idx" ON "_posts_v_blocks_grid" USING btree ("_parent_id");
  CREATE INDEX "_posts_v_blocks_grid_path_idx" ON "_posts_v_blocks_grid" USING btree ("_path");
  CREATE INDEX "_posts_v_blocks_grid_cta_cta_page_idx" ON "_posts_v_blocks_grid" USING btree ("cta_page_id");
  CREATE INDEX "_posts_v_blocks_timeline_events_order_idx" ON "_posts_v_blocks_timeline_events" USING btree ("_order");
  CREATE INDEX "_posts_v_blocks_timeline_events_parent_id_idx" ON "_posts_v_blocks_timeline_events" USING btree ("_parent_id");
  CREATE INDEX "_posts_v_blocks_timeline_events_image_idx" ON "_posts_v_blocks_timeline_events" USING btree ("image_id");
  CREATE INDEX "_posts_v_blocks_timeline_events_link_link_page_idx" ON "_posts_v_blocks_timeline_events" USING btree ("link_page_id");
  CREATE INDEX "_posts_v_blocks_timeline_events_link_link_archive_item_idx" ON "_posts_v_blocks_timeline_events" USING btree ("link_archive_item_id");
  CREATE INDEX "_posts_v_blocks_timeline_events_link_link_person_idx" ON "_posts_v_blocks_timeline_events" USING btree ("link_person_id");
  CREATE INDEX "_posts_v_blocks_timeline_order_idx" ON "_posts_v_blocks_timeline" USING btree ("_order");
  CREATE INDEX "_posts_v_blocks_timeline_parent_id_idx" ON "_posts_v_blocks_timeline" USING btree ("_parent_id");
  CREATE INDEX "_posts_v_blocks_timeline_path_idx" ON "_posts_v_blocks_timeline" USING btree ("_path");
  CREATE INDEX "_posts_v_blocks_spacer_order_idx" ON "_posts_v_blocks_spacer" USING btree ("_order");
  CREATE INDEX "_posts_v_blocks_spacer_parent_id_idx" ON "_posts_v_blocks_spacer" USING btree ("_parent_id");
  CREATE INDEX "_posts_v_blocks_spacer_path_idx" ON "_posts_v_blocks_spacer" USING btree ("_path");
  CREATE INDEX "_posts_v_blocks_html_order_idx" ON "_posts_v_blocks_html" USING btree ("_order");
  CREATE INDEX "_posts_v_blocks_html_parent_id_idx" ON "_posts_v_blocks_html" USING btree ("_parent_id");
  CREATE INDEX "_posts_v_blocks_html_path_idx" ON "_posts_v_blocks_html" USING btree ("_path");
  CREATE INDEX "_posts_v_parent_idx" ON "_posts_v" USING btree ("parent_id");
  CREATE INDEX "_posts_v_version_version_featured_image_idx" ON "_posts_v" USING btree ("version_featured_image_id");
  CREATE INDEX "_posts_v_version_meta_version_meta_image_idx" ON "_posts_v" USING btree ("version_meta_image_id");
  CREATE INDEX "_posts_v_version_version_slug_idx" ON "_posts_v" USING btree ("version_slug");
  CREATE INDEX "_posts_v_version_version_author_idx" ON "_posts_v" USING btree ("version_author_id");
  CREATE INDEX "_posts_v_version_version_updated_at_idx" ON "_posts_v" USING btree ("version_updated_at");
  CREATE INDEX "_posts_v_version_version_created_at_idx" ON "_posts_v" USING btree ("version_created_at");
  CREATE INDEX "_posts_v_version_version__status_idx" ON "_posts_v" USING btree ("version__status");
  CREATE INDEX "_posts_v_created_at_idx" ON "_posts_v" USING btree ("created_at");
  CREATE INDEX "_posts_v_updated_at_idx" ON "_posts_v" USING btree ("updated_at");
  CREATE INDEX "_posts_v_latest_idx" ON "_posts_v" USING btree ("latest");
  CREATE INDEX "_posts_v_autosave_idx" ON "_posts_v" USING btree ("autosave");
  CREATE INDEX "_posts_v_rels_order_idx" ON "_posts_v_rels" USING btree ("order");
  CREATE INDEX "_posts_v_rels_parent_idx" ON "_posts_v_rels" USING btree ("parent_id");
  CREATE INDEX "_posts_v_rels_path_idx" ON "_posts_v_rels" USING btree ("path");
  CREATE INDEX "_posts_v_rels_categories_id_idx" ON "_posts_v_rels" USING btree ("categories_id");
  CREATE INDEX "_posts_v_rels_tags_id_idx" ON "_posts_v_rels" USING btree ("tags_id");
  CREATE INDEX "_posts_v_rels_posts_id_idx" ON "_posts_v_rels" USING btree ("posts_id");
  CREATE INDEX "_posts_v_rels_pages_id_idx" ON "_posts_v_rels" USING btree ("pages_id");
  CREATE INDEX "_posts_v_rels_archive_items_id_idx" ON "_posts_v_rels" USING btree ("archive_items_id");
  CREATE INDEX "_posts_v_rels_people_id_idx" ON "_posts_v_rels" USING btree ("people_id");
  CREATE INDEX "_posts_v_rels_places_id_idx" ON "_posts_v_rels" USING btree ("places_id");
  CREATE INDEX "_posts_v_rels_custom_items_id_idx" ON "_posts_v_rels" USING btree ("custom_items_id");
  CREATE INDEX "categories_breadcrumbs_order_idx" ON "categories_breadcrumbs" USING btree ("_order");
  CREATE INDEX "categories_breadcrumbs_parent_id_idx" ON "categories_breadcrumbs" USING btree ("_parent_id");
  CREATE INDEX "categories_breadcrumbs_doc_idx" ON "categories_breadcrumbs" USING btree ("doc_id");
  CREATE UNIQUE INDEX "categories_slug_idx" ON "categories" USING btree ("slug");
  CREATE INDEX "categories_parent_idx" ON "categories" USING btree ("parent_id");
  CREATE INDEX "categories_featured_image_idx" ON "categories" USING btree ("featured_image_id");
  CREATE INDEX "categories_updated_at_idx" ON "categories" USING btree ("updated_at");
  CREATE INDEX "categories_created_at_idx" ON "categories" USING btree ("created_at");
  CREATE INDEX "_categories_v_version_breadcrumbs_order_idx" ON "_categories_v_version_breadcrumbs" USING btree ("_order");
  CREATE INDEX "_categories_v_version_breadcrumbs_parent_id_idx" ON "_categories_v_version_breadcrumbs" USING btree ("_parent_id");
  CREATE INDEX "_categories_v_version_breadcrumbs_doc_idx" ON "_categories_v_version_breadcrumbs" USING btree ("doc_id");
  CREATE INDEX "_categories_v_parent_idx" ON "_categories_v" USING btree ("parent_id");
  CREATE INDEX "_categories_v_version_version_slug_idx" ON "_categories_v" USING btree ("version_slug");
  CREATE INDEX "_categories_v_version_version_parent_idx" ON "_categories_v" USING btree ("version_parent_id");
  CREATE INDEX "_categories_v_version_version_featured_image_idx" ON "_categories_v" USING btree ("version_featured_image_id");
  CREATE INDEX "_categories_v_version_version_updated_at_idx" ON "_categories_v" USING btree ("version_updated_at");
  CREATE INDEX "_categories_v_version_version_created_at_idx" ON "_categories_v" USING btree ("version_created_at");
  CREATE INDEX "_categories_v_created_at_idx" ON "_categories_v" USING btree ("created_at");
  CREATE INDEX "_categories_v_updated_at_idx" ON "_categories_v" USING btree ("updated_at");
  CREATE UNIQUE INDEX "tags_slug_idx" ON "tags" USING btree ("slug");
  CREATE INDEX "tags_updated_at_idx" ON "tags" USING btree ("updated_at");
  CREATE INDEX "tags_created_at_idx" ON "tags" USING btree ("created_at");
  CREATE INDEX "_tags_v_parent_idx" ON "_tags_v" USING btree ("parent_id");
  CREATE INDEX "_tags_v_version_version_slug_idx" ON "_tags_v" USING btree ("version_slug");
  CREATE INDEX "_tags_v_version_version_updated_at_idx" ON "_tags_v" USING btree ("version_updated_at");
  CREATE INDEX "_tags_v_version_version_created_at_idx" ON "_tags_v" USING btree ("version_created_at");
  CREATE INDEX "_tags_v_created_at_idx" ON "_tags_v" USING btree ("created_at");
  CREATE INDEX "_tags_v_updated_at_idx" ON "_tags_v" USING btree ("updated_at");
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
  CREATE INDEX "archive_items_blocks_archive_content_type_idx" ON "archive_items_blocks_archive" USING btree ("content_type_id");
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
  CREATE INDEX "archive_items_blocks_timeline_events_link_link_archive_i_idx" ON "archive_items_blocks_timeline_events" USING btree ("link_archive_item_id");
  CREATE INDEX "archive_items_blocks_timeline_events_link_link_person_idx" ON "archive_items_blocks_timeline_events" USING btree ("link_person_id");
  CREATE INDEX "archive_items_blocks_timeline_order_idx" ON "archive_items_blocks_timeline" USING btree ("_order");
  CREATE INDEX "archive_items_blocks_timeline_parent_id_idx" ON "archive_items_blocks_timeline" USING btree ("_parent_id");
  CREATE INDEX "archive_items_blocks_timeline_path_idx" ON "archive_items_blocks_timeline" USING btree ("_path");
  CREATE INDEX "archive_items_featured_image_idx" ON "archive_items" USING btree ("featured_image_id");
  CREATE UNIQUE INDEX "archive_items_catalog_number_idx" ON "archive_items" USING btree ("catalog_number");
  CREATE INDEX "archive_items_meta_meta_image_idx" ON "archive_items" USING btree ("meta_image_id");
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
  CREATE INDEX "archive_items_rels_custom_items_id_idx" ON "archive_items_rels" USING btree ("custom_items_id");
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
  CREATE INDEX "_archive_items_v_blocks_archive_content_type_idx" ON "_archive_items_v_blocks_archive" USING btree ("content_type_id");
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
  CREATE INDEX "_archive_items_v_blocks_timeline_events_link_link_archiv_idx" ON "_archive_items_v_blocks_timeline_events" USING btree ("link_archive_item_id");
  CREATE INDEX "_archive_items_v_blocks_timeline_events_link_link_person_idx" ON "_archive_items_v_blocks_timeline_events" USING btree ("link_person_id");
  CREATE INDEX "_archive_items_v_blocks_timeline_order_idx" ON "_archive_items_v_blocks_timeline" USING btree ("_order");
  CREATE INDEX "_archive_items_v_blocks_timeline_parent_id_idx" ON "_archive_items_v_blocks_timeline" USING btree ("_parent_id");
  CREATE INDEX "_archive_items_v_blocks_timeline_path_idx" ON "_archive_items_v_blocks_timeline" USING btree ("_path");
  CREATE INDEX "_archive_items_v_parent_idx" ON "_archive_items_v" USING btree ("parent_id");
  CREATE INDEX "_archive_items_v_version_version_featured_image_idx" ON "_archive_items_v" USING btree ("version_featured_image_id");
  CREATE INDEX "_archive_items_v_version_version_catalog_number_idx" ON "_archive_items_v" USING btree ("version_catalog_number");
  CREATE INDEX "_archive_items_v_version_meta_version_meta_image_idx" ON "_archive_items_v" USING btree ("version_meta_image_id");
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
  CREATE INDEX "_archive_items_v_rels_custom_items_id_idx" ON "_archive_items_v_rels" USING btree ("custom_items_id");
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
  CREATE INDEX "people_blocks_stats_stats_order_idx" ON "people_blocks_stats_stats" USING btree ("_order");
  CREATE INDEX "people_blocks_stats_stats_parent_id_idx" ON "people_blocks_stats_stats" USING btree ("_parent_id");
  CREATE INDEX "people_blocks_stats_order_idx" ON "people_blocks_stats" USING btree ("_order");
  CREATE INDEX "people_blocks_stats_parent_id_idx" ON "people_blocks_stats" USING btree ("_parent_id");
  CREATE INDEX "people_blocks_stats_path_idx" ON "people_blocks_stats" USING btree ("_path");
  CREATE INDEX "people_blocks_logo_cloud_logos_order_idx" ON "people_blocks_logo_cloud_logos" USING btree ("_order");
  CREATE INDEX "people_blocks_logo_cloud_logos_parent_id_idx" ON "people_blocks_logo_cloud_logos" USING btree ("_parent_id");
  CREATE INDEX "people_blocks_logo_cloud_logos_logo_idx" ON "people_blocks_logo_cloud_logos" USING btree ("logo_id");
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
  CREATE INDEX "people_blocks_pricing_plans_order_idx" ON "people_blocks_pricing_plans" USING btree ("_order");
  CREATE INDEX "people_blocks_pricing_plans_parent_id_idx" ON "people_blocks_pricing_plans" USING btree ("_parent_id");
  CREATE INDEX "people_blocks_pricing_order_idx" ON "people_blocks_pricing" USING btree ("_order");
  CREATE INDEX "people_blocks_pricing_parent_id_idx" ON "people_blocks_pricing" USING btree ("_parent_id");
  CREATE INDEX "people_blocks_pricing_path_idx" ON "people_blocks_pricing" USING btree ("_path");
  CREATE INDEX "people_blocks_team_members_socials_order_idx" ON "people_blocks_team_members_socials" USING btree ("_order");
  CREATE INDEX "people_blocks_team_members_socials_parent_id_idx" ON "people_blocks_team_members_socials" USING btree ("_parent_id");
  CREATE INDEX "people_blocks_team_members_order_idx" ON "people_blocks_team_members" USING btree ("_order");
  CREATE INDEX "people_blocks_team_members_parent_id_idx" ON "people_blocks_team_members" USING btree ("_parent_id");
  CREATE INDEX "people_blocks_team_members_photo_idx" ON "people_blocks_team_members" USING btree ("photo_id");
  CREATE INDEX "people_blocks_team_order_idx" ON "people_blocks_team" USING btree ("_order");
  CREATE INDEX "people_blocks_team_parent_id_idx" ON "people_blocks_team" USING btree ("_parent_id");
  CREATE INDEX "people_blocks_team_path_idx" ON "people_blocks_team" USING btree ("_path");
  CREATE INDEX "people_blocks_embed_order_idx" ON "people_blocks_embed" USING btree ("_order");
  CREATE INDEX "people_blocks_embed_parent_id_idx" ON "people_blocks_embed" USING btree ("_parent_id");
  CREATE INDEX "people_blocks_embed_path_idx" ON "people_blocks_embed" USING btree ("_path");
  CREATE INDEX "people_blocks_archive_order_idx" ON "people_blocks_archive" USING btree ("_order");
  CREATE INDEX "people_blocks_archive_parent_id_idx" ON "people_blocks_archive" USING btree ("_parent_id");
  CREATE INDEX "people_blocks_archive_path_idx" ON "people_blocks_archive" USING btree ("_path");
  CREATE INDEX "people_blocks_archive_content_type_idx" ON "people_blocks_archive" USING btree ("content_type_id");
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
  CREATE INDEX "people_blocks_timeline_events_link_link_archive_item_idx" ON "people_blocks_timeline_events" USING btree ("link_archive_item_id");
  CREATE INDEX "people_blocks_timeline_events_link_link_person_idx" ON "people_blocks_timeline_events" USING btree ("link_person_id");
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
  CREATE INDEX "people_meta_meta_image_idx" ON "people" USING btree ("meta_image_id");
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
  CREATE INDEX "people_rels_archive_items_id_idx" ON "people_rels" USING btree ("archive_items_id");
  CREATE INDEX "people_rels_places_id_idx" ON "people_rels" USING btree ("places_id");
  CREATE INDEX "people_rels_custom_items_id_idx" ON "people_rels" USING btree ("custom_items_id");
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
  CREATE INDEX "_people_v_blocks_stats_stats_order_idx" ON "_people_v_blocks_stats_stats" USING btree ("_order");
  CREATE INDEX "_people_v_blocks_stats_stats_parent_id_idx" ON "_people_v_blocks_stats_stats" USING btree ("_parent_id");
  CREATE INDEX "_people_v_blocks_stats_order_idx" ON "_people_v_blocks_stats" USING btree ("_order");
  CREATE INDEX "_people_v_blocks_stats_parent_id_idx" ON "_people_v_blocks_stats" USING btree ("_parent_id");
  CREATE INDEX "_people_v_blocks_stats_path_idx" ON "_people_v_blocks_stats" USING btree ("_path");
  CREATE INDEX "_people_v_blocks_logo_cloud_logos_order_idx" ON "_people_v_blocks_logo_cloud_logos" USING btree ("_order");
  CREATE INDEX "_people_v_blocks_logo_cloud_logos_parent_id_idx" ON "_people_v_blocks_logo_cloud_logos" USING btree ("_parent_id");
  CREATE INDEX "_people_v_blocks_logo_cloud_logos_logo_idx" ON "_people_v_blocks_logo_cloud_logos" USING btree ("logo_id");
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
  CREATE INDEX "_people_v_blocks_pricing_plans_order_idx" ON "_people_v_blocks_pricing_plans" USING btree ("_order");
  CREATE INDEX "_people_v_blocks_pricing_plans_parent_id_idx" ON "_people_v_blocks_pricing_plans" USING btree ("_parent_id");
  CREATE INDEX "_people_v_blocks_pricing_order_idx" ON "_people_v_blocks_pricing" USING btree ("_order");
  CREATE INDEX "_people_v_blocks_pricing_parent_id_idx" ON "_people_v_blocks_pricing" USING btree ("_parent_id");
  CREATE INDEX "_people_v_blocks_pricing_path_idx" ON "_people_v_blocks_pricing" USING btree ("_path");
  CREATE INDEX "_people_v_blocks_team_members_socials_order_idx" ON "_people_v_blocks_team_members_socials" USING btree ("_order");
  CREATE INDEX "_people_v_blocks_team_members_socials_parent_id_idx" ON "_people_v_blocks_team_members_socials" USING btree ("_parent_id");
  CREATE INDEX "_people_v_blocks_team_members_order_idx" ON "_people_v_blocks_team_members" USING btree ("_order");
  CREATE INDEX "_people_v_blocks_team_members_parent_id_idx" ON "_people_v_blocks_team_members" USING btree ("_parent_id");
  CREATE INDEX "_people_v_blocks_team_members_photo_idx" ON "_people_v_blocks_team_members" USING btree ("photo_id");
  CREATE INDEX "_people_v_blocks_team_order_idx" ON "_people_v_blocks_team" USING btree ("_order");
  CREATE INDEX "_people_v_blocks_team_parent_id_idx" ON "_people_v_blocks_team" USING btree ("_parent_id");
  CREATE INDEX "_people_v_blocks_team_path_idx" ON "_people_v_blocks_team" USING btree ("_path");
  CREATE INDEX "_people_v_blocks_embed_order_idx" ON "_people_v_blocks_embed" USING btree ("_order");
  CREATE INDEX "_people_v_blocks_embed_parent_id_idx" ON "_people_v_blocks_embed" USING btree ("_parent_id");
  CREATE INDEX "_people_v_blocks_embed_path_idx" ON "_people_v_blocks_embed" USING btree ("_path");
  CREATE INDEX "_people_v_blocks_archive_order_idx" ON "_people_v_blocks_archive" USING btree ("_order");
  CREATE INDEX "_people_v_blocks_archive_parent_id_idx" ON "_people_v_blocks_archive" USING btree ("_parent_id");
  CREATE INDEX "_people_v_blocks_archive_path_idx" ON "_people_v_blocks_archive" USING btree ("_path");
  CREATE INDEX "_people_v_blocks_archive_content_type_idx" ON "_people_v_blocks_archive" USING btree ("content_type_id");
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
  CREATE INDEX "_people_v_blocks_timeline_events_link_link_archive_item_idx" ON "_people_v_blocks_timeline_events" USING btree ("link_archive_item_id");
  CREATE INDEX "_people_v_blocks_timeline_events_link_link_person_idx" ON "_people_v_blocks_timeline_events" USING btree ("link_person_id");
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
  CREATE INDEX "_people_v_version_meta_version_meta_image_idx" ON "_people_v" USING btree ("version_meta_image_id");
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
  CREATE INDEX "_people_v_rels_archive_items_id_idx" ON "_people_v_rels" USING btree ("archive_items_id");
  CREATE INDEX "_people_v_rels_places_id_idx" ON "_people_v_rels" USING btree ("places_id");
  CREATE INDEX "_people_v_rels_custom_items_id_idx" ON "_people_v_rels" USING btree ("custom_items_id");
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
  CREATE INDEX "places_blocks_stats_stats_order_idx" ON "places_blocks_stats_stats" USING btree ("_order");
  CREATE INDEX "places_blocks_stats_stats_parent_id_idx" ON "places_blocks_stats_stats" USING btree ("_parent_id");
  CREATE INDEX "places_blocks_stats_order_idx" ON "places_blocks_stats" USING btree ("_order");
  CREATE INDEX "places_blocks_stats_parent_id_idx" ON "places_blocks_stats" USING btree ("_parent_id");
  CREATE INDEX "places_blocks_stats_path_idx" ON "places_blocks_stats" USING btree ("_path");
  CREATE INDEX "places_blocks_logo_cloud_logos_order_idx" ON "places_blocks_logo_cloud_logos" USING btree ("_order");
  CREATE INDEX "places_blocks_logo_cloud_logos_parent_id_idx" ON "places_blocks_logo_cloud_logos" USING btree ("_parent_id");
  CREATE INDEX "places_blocks_logo_cloud_logos_logo_idx" ON "places_blocks_logo_cloud_logos" USING btree ("logo_id");
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
  CREATE INDEX "places_blocks_pricing_plans_order_idx" ON "places_blocks_pricing_plans" USING btree ("_order");
  CREATE INDEX "places_blocks_pricing_plans_parent_id_idx" ON "places_blocks_pricing_plans" USING btree ("_parent_id");
  CREATE INDEX "places_blocks_pricing_order_idx" ON "places_blocks_pricing" USING btree ("_order");
  CREATE INDEX "places_blocks_pricing_parent_id_idx" ON "places_blocks_pricing" USING btree ("_parent_id");
  CREATE INDEX "places_blocks_pricing_path_idx" ON "places_blocks_pricing" USING btree ("_path");
  CREATE INDEX "places_blocks_team_members_socials_order_idx" ON "places_blocks_team_members_socials" USING btree ("_order");
  CREATE INDEX "places_blocks_team_members_socials_parent_id_idx" ON "places_blocks_team_members_socials" USING btree ("_parent_id");
  CREATE INDEX "places_blocks_team_members_order_idx" ON "places_blocks_team_members" USING btree ("_order");
  CREATE INDEX "places_blocks_team_members_parent_id_idx" ON "places_blocks_team_members" USING btree ("_parent_id");
  CREATE INDEX "places_blocks_team_members_photo_idx" ON "places_blocks_team_members" USING btree ("photo_id");
  CREATE INDEX "places_blocks_team_order_idx" ON "places_blocks_team" USING btree ("_order");
  CREATE INDEX "places_blocks_team_parent_id_idx" ON "places_blocks_team" USING btree ("_parent_id");
  CREATE INDEX "places_blocks_team_path_idx" ON "places_blocks_team" USING btree ("_path");
  CREATE INDEX "places_blocks_embed_order_idx" ON "places_blocks_embed" USING btree ("_order");
  CREATE INDEX "places_blocks_embed_parent_id_idx" ON "places_blocks_embed" USING btree ("_parent_id");
  CREATE INDEX "places_blocks_embed_path_idx" ON "places_blocks_embed" USING btree ("_path");
  CREATE INDEX "places_blocks_archive_order_idx" ON "places_blocks_archive" USING btree ("_order");
  CREATE INDEX "places_blocks_archive_parent_id_idx" ON "places_blocks_archive" USING btree ("_parent_id");
  CREATE INDEX "places_blocks_archive_path_idx" ON "places_blocks_archive" USING btree ("_path");
  CREATE INDEX "places_blocks_archive_content_type_idx" ON "places_blocks_archive" USING btree ("content_type_id");
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
  CREATE INDEX "places_blocks_timeline_events_link_link_archive_item_idx" ON "places_blocks_timeline_events" USING btree ("link_archive_item_id");
  CREATE INDEX "places_blocks_timeline_events_link_link_person_idx" ON "places_blocks_timeline_events" USING btree ("link_person_id");
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
  CREATE INDEX "places_meta_meta_image_idx" ON "places" USING btree ("meta_image_id");
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
  CREATE INDEX "places_rels_archive_items_id_idx" ON "places_rels" USING btree ("archive_items_id");
  CREATE INDEX "places_rels_people_id_idx" ON "places_rels" USING btree ("people_id");
  CREATE INDEX "places_rels_custom_items_id_idx" ON "places_rels" USING btree ("custom_items_id");
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
  CREATE INDEX "_places_v_blocks_stats_stats_order_idx" ON "_places_v_blocks_stats_stats" USING btree ("_order");
  CREATE INDEX "_places_v_blocks_stats_stats_parent_id_idx" ON "_places_v_blocks_stats_stats" USING btree ("_parent_id");
  CREATE INDEX "_places_v_blocks_stats_order_idx" ON "_places_v_blocks_stats" USING btree ("_order");
  CREATE INDEX "_places_v_blocks_stats_parent_id_idx" ON "_places_v_blocks_stats" USING btree ("_parent_id");
  CREATE INDEX "_places_v_blocks_stats_path_idx" ON "_places_v_blocks_stats" USING btree ("_path");
  CREATE INDEX "_places_v_blocks_logo_cloud_logos_order_idx" ON "_places_v_blocks_logo_cloud_logos" USING btree ("_order");
  CREATE INDEX "_places_v_blocks_logo_cloud_logos_parent_id_idx" ON "_places_v_blocks_logo_cloud_logos" USING btree ("_parent_id");
  CREATE INDEX "_places_v_blocks_logo_cloud_logos_logo_idx" ON "_places_v_blocks_logo_cloud_logos" USING btree ("logo_id");
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
  CREATE INDEX "_places_v_blocks_pricing_plans_order_idx" ON "_places_v_blocks_pricing_plans" USING btree ("_order");
  CREATE INDEX "_places_v_blocks_pricing_plans_parent_id_idx" ON "_places_v_blocks_pricing_plans" USING btree ("_parent_id");
  CREATE INDEX "_places_v_blocks_pricing_order_idx" ON "_places_v_blocks_pricing" USING btree ("_order");
  CREATE INDEX "_places_v_blocks_pricing_parent_id_idx" ON "_places_v_blocks_pricing" USING btree ("_parent_id");
  CREATE INDEX "_places_v_blocks_pricing_path_idx" ON "_places_v_blocks_pricing" USING btree ("_path");
  CREATE INDEX "_places_v_blocks_team_members_socials_order_idx" ON "_places_v_blocks_team_members_socials" USING btree ("_order");
  CREATE INDEX "_places_v_blocks_team_members_socials_parent_id_idx" ON "_places_v_blocks_team_members_socials" USING btree ("_parent_id");
  CREATE INDEX "_places_v_blocks_team_members_order_idx" ON "_places_v_blocks_team_members" USING btree ("_order");
  CREATE INDEX "_places_v_blocks_team_members_parent_id_idx" ON "_places_v_blocks_team_members" USING btree ("_parent_id");
  CREATE INDEX "_places_v_blocks_team_members_photo_idx" ON "_places_v_blocks_team_members" USING btree ("photo_id");
  CREATE INDEX "_places_v_blocks_team_order_idx" ON "_places_v_blocks_team" USING btree ("_order");
  CREATE INDEX "_places_v_blocks_team_parent_id_idx" ON "_places_v_blocks_team" USING btree ("_parent_id");
  CREATE INDEX "_places_v_blocks_team_path_idx" ON "_places_v_blocks_team" USING btree ("_path");
  CREATE INDEX "_places_v_blocks_embed_order_idx" ON "_places_v_blocks_embed" USING btree ("_order");
  CREATE INDEX "_places_v_blocks_embed_parent_id_idx" ON "_places_v_blocks_embed" USING btree ("_parent_id");
  CREATE INDEX "_places_v_blocks_embed_path_idx" ON "_places_v_blocks_embed" USING btree ("_path");
  CREATE INDEX "_places_v_blocks_archive_order_idx" ON "_places_v_blocks_archive" USING btree ("_order");
  CREATE INDEX "_places_v_blocks_archive_parent_id_idx" ON "_places_v_blocks_archive" USING btree ("_parent_id");
  CREATE INDEX "_places_v_blocks_archive_path_idx" ON "_places_v_blocks_archive" USING btree ("_path");
  CREATE INDEX "_places_v_blocks_archive_content_type_idx" ON "_places_v_blocks_archive" USING btree ("content_type_id");
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
  CREATE INDEX "_places_v_blocks_timeline_events_link_link_archive_item_idx" ON "_places_v_blocks_timeline_events" USING btree ("link_archive_item_id");
  CREATE INDEX "_places_v_blocks_timeline_events_link_link_person_idx" ON "_places_v_blocks_timeline_events" USING btree ("link_person_id");
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
  CREATE INDEX "_places_v_version_meta_version_meta_image_idx" ON "_places_v" USING btree ("version_meta_image_id");
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
  CREATE INDEX "_places_v_rels_archive_items_id_idx" ON "_places_v_rels" USING btree ("archive_items_id");
  CREATE INDEX "_places_v_rels_people_id_idx" ON "_places_v_rels" USING btree ("people_id");
  CREATE INDEX "_places_v_rels_custom_items_id_idx" ON "_places_v_rels" USING btree ("custom_items_id");
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
  CREATE INDEX "events_blocks_archive_content_type_idx" ON "events_blocks_archive" USING btree ("content_type_id");
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
  CREATE INDEX "events_blocks_timeline_events_link_link_archive_item_idx" ON "events_blocks_timeline_events" USING btree ("link_archive_item_id");
  CREATE INDEX "events_blocks_timeline_events_link_link_person_idx" ON "events_blocks_timeline_events" USING btree ("link_person_id");
  CREATE INDEX "events_blocks_timeline_order_idx" ON "events_blocks_timeline" USING btree ("_order");
  CREATE INDEX "events_blocks_timeline_parent_id_idx" ON "events_blocks_timeline" USING btree ("_parent_id");
  CREATE INDEX "events_blocks_timeline_path_idx" ON "events_blocks_timeline" USING btree ("_path");
  CREATE INDEX "events_featured_image_idx" ON "events" USING btree ("featured_image_id");
  CREATE INDEX "events_venue_idx" ON "events" USING btree ("venue_id");
  CREATE INDEX "events_meta_meta_image_idx" ON "events" USING btree ("meta_image_id");
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
  CREATE INDEX "events_rels_archive_items_id_idx" ON "events_rels" USING btree ("archive_items_id");
  CREATE INDEX "events_rels_places_id_idx" ON "events_rels" USING btree ("places_id");
  CREATE INDEX "events_rels_custom_items_id_idx" ON "events_rels" USING btree ("custom_items_id");
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
  CREATE INDEX "_events_v_blocks_archive_content_type_idx" ON "_events_v_blocks_archive" USING btree ("content_type_id");
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
  CREATE INDEX "_events_v_blocks_timeline_events_link_link_archive_item_idx" ON "_events_v_blocks_timeline_events" USING btree ("link_archive_item_id");
  CREATE INDEX "_events_v_blocks_timeline_events_link_link_person_idx" ON "_events_v_blocks_timeline_events" USING btree ("link_person_id");
  CREATE INDEX "_events_v_blocks_timeline_order_idx" ON "_events_v_blocks_timeline" USING btree ("_order");
  CREATE INDEX "_events_v_blocks_timeline_parent_id_idx" ON "_events_v_blocks_timeline" USING btree ("_parent_id");
  CREATE INDEX "_events_v_blocks_timeline_path_idx" ON "_events_v_blocks_timeline" USING btree ("_path");
  CREATE INDEX "_events_v_parent_idx" ON "_events_v" USING btree ("parent_id");
  CREATE INDEX "_events_v_version_version_featured_image_idx" ON "_events_v" USING btree ("version_featured_image_id");
  CREATE INDEX "_events_v_version_version_venue_idx" ON "_events_v" USING btree ("version_venue_id");
  CREATE INDEX "_events_v_version_meta_version_meta_image_idx" ON "_events_v" USING btree ("version_meta_image_id");
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
  CREATE INDEX "_events_v_rels_archive_items_id_idx" ON "_events_v_rels" USING btree ("archive_items_id");
  CREATE INDEX "_events_v_rels_places_id_idx" ON "_events_v_rels" USING btree ("places_id");
  CREATE INDEX "_events_v_rels_custom_items_id_idx" ON "_events_v_rels" USING btree ("custom_items_id");
  CREATE INDEX "products_gallery_order_idx" ON "products_gallery" USING btree ("_order");
  CREATE INDEX "products_gallery_parent_id_idx" ON "products_gallery" USING btree ("_parent_id");
  CREATE INDEX "products_gallery_image_idx" ON "products_gallery" USING btree ("image_id");
  CREATE INDEX "products_variants_order_idx" ON "products_variants" USING btree ("_order");
  CREATE INDEX "products_variants_parent_id_idx" ON "products_variants" USING btree ("_parent_id");
  CREATE INDEX "products_variants_image_idx" ON "products_variants" USING btree ("image_id");
  CREATE INDEX "products_blocks_hero_links_order_idx" ON "products_blocks_hero_links" USING btree ("_order");
  CREATE INDEX "products_blocks_hero_links_parent_id_idx" ON "products_blocks_hero_links" USING btree ("_parent_id");
  CREATE INDEX "products_blocks_hero_links_page_idx" ON "products_blocks_hero_links" USING btree ("page_id");
  CREATE INDEX "products_blocks_hero_order_idx" ON "products_blocks_hero" USING btree ("_order");
  CREATE INDEX "products_blocks_hero_parent_id_idx" ON "products_blocks_hero" USING btree ("_parent_id");
  CREATE INDEX "products_blocks_hero_path_idx" ON "products_blocks_hero" USING btree ("_path");
  CREATE INDEX "products_blocks_hero_image_idx" ON "products_blocks_hero" USING btree ("image_id");
  CREATE INDEX "products_blocks_content_columns_order_idx" ON "products_blocks_content_columns" USING btree ("_order");
  CREATE INDEX "products_blocks_content_columns_parent_id_idx" ON "products_blocks_content_columns" USING btree ("_parent_id");
  CREATE INDEX "products_blocks_content_columns_link_link_page_idx" ON "products_blocks_content_columns" USING btree ("link_page_id");
  CREATE INDEX "products_blocks_content_order_idx" ON "products_blocks_content" USING btree ("_order");
  CREATE INDEX "products_blocks_content_parent_id_idx" ON "products_blocks_content" USING btree ("_parent_id");
  CREATE INDEX "products_blocks_content_path_idx" ON "products_blocks_content" USING btree ("_path");
  CREATE INDEX "products_blocks_media_order_idx" ON "products_blocks_media" USING btree ("_order");
  CREATE INDEX "products_blocks_media_parent_id_idx" ON "products_blocks_media" USING btree ("_parent_id");
  CREATE INDEX "products_blocks_media_path_idx" ON "products_blocks_media" USING btree ("_path");
  CREATE INDEX "products_blocks_media_media_idx" ON "products_blocks_media" USING btree ("media_id");
  CREATE INDEX "products_blocks_media_link_link_page_idx" ON "products_blocks_media" USING btree ("link_page_id");
  CREATE INDEX "products_blocks_cta_links_order_idx" ON "products_blocks_cta_links" USING btree ("_order");
  CREATE INDEX "products_blocks_cta_links_parent_id_idx" ON "products_blocks_cta_links" USING btree ("_parent_id");
  CREATE INDEX "products_blocks_cta_links_page_idx" ON "products_blocks_cta_links" USING btree ("page_id");
  CREATE INDEX "products_blocks_cta_order_idx" ON "products_blocks_cta" USING btree ("_order");
  CREATE INDEX "products_blocks_cta_parent_id_idx" ON "products_blocks_cta" USING btree ("_parent_id");
  CREATE INDEX "products_blocks_cta_path_idx" ON "products_blocks_cta" USING btree ("_path");
  CREATE INDEX "products_blocks_cta_image_idx" ON "products_blocks_cta" USING btree ("image_id");
  CREATE INDEX "products_blocks_archive_order_idx" ON "products_blocks_archive" USING btree ("_order");
  CREATE INDEX "products_blocks_archive_parent_id_idx" ON "products_blocks_archive" USING btree ("_parent_id");
  CREATE INDEX "products_blocks_archive_path_idx" ON "products_blocks_archive" USING btree ("_path");
  CREATE INDEX "products_blocks_archive_content_type_idx" ON "products_blocks_archive" USING btree ("content_type_id");
  CREATE INDEX "products_blocks_form_order_idx" ON "products_blocks_form" USING btree ("_order");
  CREATE INDEX "products_blocks_form_parent_id_idx" ON "products_blocks_form" USING btree ("_parent_id");
  CREATE INDEX "products_blocks_form_path_idx" ON "products_blocks_form" USING btree ("_path");
  CREATE INDEX "products_blocks_form_form_idx" ON "products_blocks_form" USING btree ("form_id");
  CREATE INDEX "products_blocks_gallery_images_order_idx" ON "products_blocks_gallery_images" USING btree ("_order");
  CREATE INDEX "products_blocks_gallery_images_parent_id_idx" ON "products_blocks_gallery_images" USING btree ("_parent_id");
  CREATE INDEX "products_blocks_gallery_images_image_idx" ON "products_blocks_gallery_images" USING btree ("image_id");
  CREATE INDEX "products_blocks_gallery_images_link_link_page_idx" ON "products_blocks_gallery_images" USING btree ("link_page_id");
  CREATE INDEX "products_blocks_gallery_order_idx" ON "products_blocks_gallery" USING btree ("_order");
  CREATE INDEX "products_blocks_gallery_parent_id_idx" ON "products_blocks_gallery" USING btree ("_parent_id");
  CREATE INDEX "products_blocks_gallery_path_idx" ON "products_blocks_gallery" USING btree ("_path");
  CREATE INDEX "products_blocks_grid_items_order_idx" ON "products_blocks_grid_items" USING btree ("_order");
  CREATE INDEX "products_blocks_grid_items_parent_id_idx" ON "products_blocks_grid_items" USING btree ("_parent_id");
  CREATE INDEX "products_blocks_grid_items_image_idx" ON "products_blocks_grid_items" USING btree ("image_id");
  CREATE INDEX "products_blocks_grid_items_link_link_page_idx" ON "products_blocks_grid_items" USING btree ("link_page_id");
  CREATE INDEX "products_blocks_grid_order_idx" ON "products_blocks_grid" USING btree ("_order");
  CREATE INDEX "products_blocks_grid_parent_id_idx" ON "products_blocks_grid" USING btree ("_parent_id");
  CREATE INDEX "products_blocks_grid_path_idx" ON "products_blocks_grid" USING btree ("_path");
  CREATE INDEX "products_blocks_grid_cta_cta_page_idx" ON "products_blocks_grid" USING btree ("cta_page_id");
  CREATE INDEX "products_blocks_timeline_events_order_idx" ON "products_blocks_timeline_events" USING btree ("_order");
  CREATE INDEX "products_blocks_timeline_events_parent_id_idx" ON "products_blocks_timeline_events" USING btree ("_parent_id");
  CREATE INDEX "products_blocks_timeline_events_image_idx" ON "products_blocks_timeline_events" USING btree ("image_id");
  CREATE INDEX "products_blocks_timeline_events_link_link_page_idx" ON "products_blocks_timeline_events" USING btree ("link_page_id");
  CREATE INDEX "products_blocks_timeline_events_link_link_archive_item_idx" ON "products_blocks_timeline_events" USING btree ("link_archive_item_id");
  CREATE INDEX "products_blocks_timeline_events_link_link_person_idx" ON "products_blocks_timeline_events" USING btree ("link_person_id");
  CREATE INDEX "products_blocks_timeline_order_idx" ON "products_blocks_timeline" USING btree ("_order");
  CREATE INDEX "products_blocks_timeline_parent_id_idx" ON "products_blocks_timeline" USING btree ("_parent_id");
  CREATE INDEX "products_blocks_timeline_path_idx" ON "products_blocks_timeline" USING btree ("_path");
  CREATE INDEX "products_featured_image_idx" ON "products" USING btree ("featured_image_id");
  CREATE UNIQUE INDEX "products_sku_idx" ON "products" USING btree ("sku");
  CREATE INDEX "products_meta_meta_image_idx" ON "products" USING btree ("meta_image_id");
  CREATE UNIQUE INDEX "products_slug_idx" ON "products" USING btree ("slug");
  CREATE INDEX "products_updated_at_idx" ON "products" USING btree ("updated_at");
  CREATE INDEX "products_created_at_idx" ON "products" USING btree ("created_at");
  CREATE INDEX "products__status_idx" ON "products" USING btree ("_status");
  CREATE INDEX "products_rels_order_idx" ON "products_rels" USING btree ("order");
  CREATE INDEX "products_rels_parent_idx" ON "products_rels" USING btree ("parent_id");
  CREATE INDEX "products_rels_path_idx" ON "products_rels" USING btree ("path");
  CREATE INDEX "products_rels_categories_id_idx" ON "products_rels" USING btree ("categories_id");
  CREATE INDEX "products_rels_product_collections_id_idx" ON "products_rels" USING btree ("product_collections_id");
  CREATE INDEX "products_rels_tags_id_idx" ON "products_rels" USING btree ("tags_id");
  CREATE INDEX "products_rels_products_id_idx" ON "products_rels" USING btree ("products_id");
  CREATE INDEX "products_rels_posts_id_idx" ON "products_rels" USING btree ("posts_id");
  CREATE INDEX "products_rels_pages_id_idx" ON "products_rels" USING btree ("pages_id");
  CREATE INDEX "products_rels_archive_items_id_idx" ON "products_rels" USING btree ("archive_items_id");
  CREATE INDEX "products_rels_people_id_idx" ON "products_rels" USING btree ("people_id");
  CREATE INDEX "products_rels_places_id_idx" ON "products_rels" USING btree ("places_id");
  CREATE INDEX "products_rels_custom_items_id_idx" ON "products_rels" USING btree ("custom_items_id");
  CREATE INDEX "_products_v_version_gallery_order_idx" ON "_products_v_version_gallery" USING btree ("_order");
  CREATE INDEX "_products_v_version_gallery_parent_id_idx" ON "_products_v_version_gallery" USING btree ("_parent_id");
  CREATE INDEX "_products_v_version_gallery_image_idx" ON "_products_v_version_gallery" USING btree ("image_id");
  CREATE INDEX "_products_v_version_variants_order_idx" ON "_products_v_version_variants" USING btree ("_order");
  CREATE INDEX "_products_v_version_variants_parent_id_idx" ON "_products_v_version_variants" USING btree ("_parent_id");
  CREATE INDEX "_products_v_version_variants_image_idx" ON "_products_v_version_variants" USING btree ("image_id");
  CREATE INDEX "_products_v_blocks_hero_links_order_idx" ON "_products_v_blocks_hero_links" USING btree ("_order");
  CREATE INDEX "_products_v_blocks_hero_links_parent_id_idx" ON "_products_v_blocks_hero_links" USING btree ("_parent_id");
  CREATE INDEX "_products_v_blocks_hero_links_page_idx" ON "_products_v_blocks_hero_links" USING btree ("page_id");
  CREATE INDEX "_products_v_blocks_hero_order_idx" ON "_products_v_blocks_hero" USING btree ("_order");
  CREATE INDEX "_products_v_blocks_hero_parent_id_idx" ON "_products_v_blocks_hero" USING btree ("_parent_id");
  CREATE INDEX "_products_v_blocks_hero_path_idx" ON "_products_v_blocks_hero" USING btree ("_path");
  CREATE INDEX "_products_v_blocks_hero_image_idx" ON "_products_v_blocks_hero" USING btree ("image_id");
  CREATE INDEX "_products_v_blocks_content_columns_order_idx" ON "_products_v_blocks_content_columns" USING btree ("_order");
  CREATE INDEX "_products_v_blocks_content_columns_parent_id_idx" ON "_products_v_blocks_content_columns" USING btree ("_parent_id");
  CREATE INDEX "_products_v_blocks_content_columns_link_link_page_idx" ON "_products_v_blocks_content_columns" USING btree ("link_page_id");
  CREATE INDEX "_products_v_blocks_content_order_idx" ON "_products_v_blocks_content" USING btree ("_order");
  CREATE INDEX "_products_v_blocks_content_parent_id_idx" ON "_products_v_blocks_content" USING btree ("_parent_id");
  CREATE INDEX "_products_v_blocks_content_path_idx" ON "_products_v_blocks_content" USING btree ("_path");
  CREATE INDEX "_products_v_blocks_media_order_idx" ON "_products_v_blocks_media" USING btree ("_order");
  CREATE INDEX "_products_v_blocks_media_parent_id_idx" ON "_products_v_blocks_media" USING btree ("_parent_id");
  CREATE INDEX "_products_v_blocks_media_path_idx" ON "_products_v_blocks_media" USING btree ("_path");
  CREATE INDEX "_products_v_blocks_media_media_idx" ON "_products_v_blocks_media" USING btree ("media_id");
  CREATE INDEX "_products_v_blocks_media_link_link_page_idx" ON "_products_v_blocks_media" USING btree ("link_page_id");
  CREATE INDEX "_products_v_blocks_cta_links_order_idx" ON "_products_v_blocks_cta_links" USING btree ("_order");
  CREATE INDEX "_products_v_blocks_cta_links_parent_id_idx" ON "_products_v_blocks_cta_links" USING btree ("_parent_id");
  CREATE INDEX "_products_v_blocks_cta_links_page_idx" ON "_products_v_blocks_cta_links" USING btree ("page_id");
  CREATE INDEX "_products_v_blocks_cta_order_idx" ON "_products_v_blocks_cta" USING btree ("_order");
  CREATE INDEX "_products_v_blocks_cta_parent_id_idx" ON "_products_v_blocks_cta" USING btree ("_parent_id");
  CREATE INDEX "_products_v_blocks_cta_path_idx" ON "_products_v_blocks_cta" USING btree ("_path");
  CREATE INDEX "_products_v_blocks_cta_image_idx" ON "_products_v_blocks_cta" USING btree ("image_id");
  CREATE INDEX "_products_v_blocks_archive_order_idx" ON "_products_v_blocks_archive" USING btree ("_order");
  CREATE INDEX "_products_v_blocks_archive_parent_id_idx" ON "_products_v_blocks_archive" USING btree ("_parent_id");
  CREATE INDEX "_products_v_blocks_archive_path_idx" ON "_products_v_blocks_archive" USING btree ("_path");
  CREATE INDEX "_products_v_blocks_archive_content_type_idx" ON "_products_v_blocks_archive" USING btree ("content_type_id");
  CREATE INDEX "_products_v_blocks_form_order_idx" ON "_products_v_blocks_form" USING btree ("_order");
  CREATE INDEX "_products_v_blocks_form_parent_id_idx" ON "_products_v_blocks_form" USING btree ("_parent_id");
  CREATE INDEX "_products_v_blocks_form_path_idx" ON "_products_v_blocks_form" USING btree ("_path");
  CREATE INDEX "_products_v_blocks_form_form_idx" ON "_products_v_blocks_form" USING btree ("form_id");
  CREATE INDEX "_products_v_blocks_gallery_images_order_idx" ON "_products_v_blocks_gallery_images" USING btree ("_order");
  CREATE INDEX "_products_v_blocks_gallery_images_parent_id_idx" ON "_products_v_blocks_gallery_images" USING btree ("_parent_id");
  CREATE INDEX "_products_v_blocks_gallery_images_image_idx" ON "_products_v_blocks_gallery_images" USING btree ("image_id");
  CREATE INDEX "_products_v_blocks_gallery_images_link_link_page_idx" ON "_products_v_blocks_gallery_images" USING btree ("link_page_id");
  CREATE INDEX "_products_v_blocks_gallery_order_idx" ON "_products_v_blocks_gallery" USING btree ("_order");
  CREATE INDEX "_products_v_blocks_gallery_parent_id_idx" ON "_products_v_blocks_gallery" USING btree ("_parent_id");
  CREATE INDEX "_products_v_blocks_gallery_path_idx" ON "_products_v_blocks_gallery" USING btree ("_path");
  CREATE INDEX "_products_v_blocks_grid_items_order_idx" ON "_products_v_blocks_grid_items" USING btree ("_order");
  CREATE INDEX "_products_v_blocks_grid_items_parent_id_idx" ON "_products_v_blocks_grid_items" USING btree ("_parent_id");
  CREATE INDEX "_products_v_blocks_grid_items_image_idx" ON "_products_v_blocks_grid_items" USING btree ("image_id");
  CREATE INDEX "_products_v_blocks_grid_items_link_link_page_idx" ON "_products_v_blocks_grid_items" USING btree ("link_page_id");
  CREATE INDEX "_products_v_blocks_grid_order_idx" ON "_products_v_blocks_grid" USING btree ("_order");
  CREATE INDEX "_products_v_blocks_grid_parent_id_idx" ON "_products_v_blocks_grid" USING btree ("_parent_id");
  CREATE INDEX "_products_v_blocks_grid_path_idx" ON "_products_v_blocks_grid" USING btree ("_path");
  CREATE INDEX "_products_v_blocks_grid_cta_cta_page_idx" ON "_products_v_blocks_grid" USING btree ("cta_page_id");
  CREATE INDEX "_products_v_blocks_timeline_events_order_idx" ON "_products_v_blocks_timeline_events" USING btree ("_order");
  CREATE INDEX "_products_v_blocks_timeline_events_parent_id_idx" ON "_products_v_blocks_timeline_events" USING btree ("_parent_id");
  CREATE INDEX "_products_v_blocks_timeline_events_image_idx" ON "_products_v_blocks_timeline_events" USING btree ("image_id");
  CREATE INDEX "_products_v_blocks_timeline_events_link_link_page_idx" ON "_products_v_blocks_timeline_events" USING btree ("link_page_id");
  CREATE INDEX "_products_v_blocks_timeline_events_link_link_archive_ite_idx" ON "_products_v_blocks_timeline_events" USING btree ("link_archive_item_id");
  CREATE INDEX "_products_v_blocks_timeline_events_link_link_person_idx" ON "_products_v_blocks_timeline_events" USING btree ("link_person_id");
  CREATE INDEX "_products_v_blocks_timeline_order_idx" ON "_products_v_blocks_timeline" USING btree ("_order");
  CREATE INDEX "_products_v_blocks_timeline_parent_id_idx" ON "_products_v_blocks_timeline" USING btree ("_parent_id");
  CREATE INDEX "_products_v_blocks_timeline_path_idx" ON "_products_v_blocks_timeline" USING btree ("_path");
  CREATE INDEX "_products_v_parent_idx" ON "_products_v" USING btree ("parent_id");
  CREATE INDEX "_products_v_version_version_featured_image_idx" ON "_products_v" USING btree ("version_featured_image_id");
  CREATE INDEX "_products_v_version_version_sku_idx" ON "_products_v" USING btree ("version_sku");
  CREATE INDEX "_products_v_version_meta_version_meta_image_idx" ON "_products_v" USING btree ("version_meta_image_id");
  CREATE INDEX "_products_v_version_version_slug_idx" ON "_products_v" USING btree ("version_slug");
  CREATE INDEX "_products_v_version_version_updated_at_idx" ON "_products_v" USING btree ("version_updated_at");
  CREATE INDEX "_products_v_version_version_created_at_idx" ON "_products_v" USING btree ("version_created_at");
  CREATE INDEX "_products_v_version_version__status_idx" ON "_products_v" USING btree ("version__status");
  CREATE INDEX "_products_v_created_at_idx" ON "_products_v" USING btree ("created_at");
  CREATE INDEX "_products_v_updated_at_idx" ON "_products_v" USING btree ("updated_at");
  CREATE INDEX "_products_v_latest_idx" ON "_products_v" USING btree ("latest");
  CREATE INDEX "_products_v_autosave_idx" ON "_products_v" USING btree ("autosave");
  CREATE INDEX "_products_v_rels_order_idx" ON "_products_v_rels" USING btree ("order");
  CREATE INDEX "_products_v_rels_parent_idx" ON "_products_v_rels" USING btree ("parent_id");
  CREATE INDEX "_products_v_rels_path_idx" ON "_products_v_rels" USING btree ("path");
  CREATE INDEX "_products_v_rels_categories_id_idx" ON "_products_v_rels" USING btree ("categories_id");
  CREATE INDEX "_products_v_rels_product_collections_id_idx" ON "_products_v_rels" USING btree ("product_collections_id");
  CREATE INDEX "_products_v_rels_tags_id_idx" ON "_products_v_rels" USING btree ("tags_id");
  CREATE INDEX "_products_v_rels_products_id_idx" ON "_products_v_rels" USING btree ("products_id");
  CREATE INDEX "_products_v_rels_posts_id_idx" ON "_products_v_rels" USING btree ("posts_id");
  CREATE INDEX "_products_v_rels_pages_id_idx" ON "_products_v_rels" USING btree ("pages_id");
  CREATE INDEX "_products_v_rels_archive_items_id_idx" ON "_products_v_rels" USING btree ("archive_items_id");
  CREATE INDEX "_products_v_rels_people_id_idx" ON "_products_v_rels" USING btree ("people_id");
  CREATE INDEX "_products_v_rels_places_id_idx" ON "_products_v_rels" USING btree ("places_id");
  CREATE INDEX "_products_v_rels_custom_items_id_idx" ON "_products_v_rels" USING btree ("custom_items_id");
  CREATE INDEX "product_categories_breadcrumbs_order_idx" ON "product_categories_breadcrumbs" USING btree ("_order");
  CREATE INDEX "product_categories_breadcrumbs_parent_id_idx" ON "product_categories_breadcrumbs" USING btree ("_parent_id");
  CREATE INDEX "product_categories_breadcrumbs_doc_idx" ON "product_categories_breadcrumbs" USING btree ("doc_id");
  CREATE UNIQUE INDEX "product_categories_slug_idx" ON "product_categories" USING btree ("slug");
  CREATE INDEX "product_categories_featured_image_idx" ON "product_categories" USING btree ("featured_image_id");
  CREATE INDEX "product_categories_parent_idx" ON "product_categories" USING btree ("parent_id");
  CREATE INDEX "product_categories_updated_at_idx" ON "product_categories" USING btree ("updated_at");
  CREATE INDEX "product_categories_created_at_idx" ON "product_categories" USING btree ("created_at");
  CREATE INDEX "_product_categories_v_version_breadcrumbs_order_idx" ON "_product_categories_v_version_breadcrumbs" USING btree ("_order");
  CREATE INDEX "_product_categories_v_version_breadcrumbs_parent_id_idx" ON "_product_categories_v_version_breadcrumbs" USING btree ("_parent_id");
  CREATE INDEX "_product_categories_v_version_breadcrumbs_doc_idx" ON "_product_categories_v_version_breadcrumbs" USING btree ("doc_id");
  CREATE INDEX "_product_categories_v_parent_idx" ON "_product_categories_v" USING btree ("parent_id");
  CREATE INDEX "_product_categories_v_version_version_slug_idx" ON "_product_categories_v" USING btree ("version_slug");
  CREATE INDEX "_product_categories_v_version_version_featured_image_idx" ON "_product_categories_v" USING btree ("version_featured_image_id");
  CREATE INDEX "_product_categories_v_version_version_parent_idx" ON "_product_categories_v" USING btree ("version_parent_id");
  CREATE INDEX "_product_categories_v_version_version_updated_at_idx" ON "_product_categories_v" USING btree ("version_updated_at");
  CREATE INDEX "_product_categories_v_version_version_created_at_idx" ON "_product_categories_v" USING btree ("version_created_at");
  CREATE INDEX "_product_categories_v_created_at_idx" ON "_product_categories_v" USING btree ("created_at");
  CREATE INDEX "_product_categories_v_updated_at_idx" ON "_product_categories_v" USING btree ("updated_at");
  CREATE INDEX "product_collections_featured_image_idx" ON "product_collections" USING btree ("featured_image_id");
  CREATE INDEX "product_collections_banner_image_idx" ON "product_collections" USING btree ("banner_image_id");
  CREATE UNIQUE INDEX "product_collections_slug_idx" ON "product_collections" USING btree ("slug");
  CREATE INDEX "product_collections_updated_at_idx" ON "product_collections" USING btree ("updated_at");
  CREATE INDEX "product_collections_created_at_idx" ON "product_collections" USING btree ("created_at");
  CREATE INDEX "product_collections__status_idx" ON "product_collections" USING btree ("_status");
  CREATE INDEX "product_collections_rels_order_idx" ON "product_collections_rels" USING btree ("order");
  CREATE INDEX "product_collections_rels_parent_idx" ON "product_collections_rels" USING btree ("parent_id");
  CREATE INDEX "product_collections_rels_path_idx" ON "product_collections_rels" USING btree ("path");
  CREATE INDEX "product_collections_rels_products_id_idx" ON "product_collections_rels" USING btree ("products_id");
  CREATE INDEX "_product_collections_v_parent_idx" ON "_product_collections_v" USING btree ("parent_id");
  CREATE INDEX "_product_collections_v_version_version_featured_image_idx" ON "_product_collections_v" USING btree ("version_featured_image_id");
  CREATE INDEX "_product_collections_v_version_version_banner_image_idx" ON "_product_collections_v" USING btree ("version_banner_image_id");
  CREATE INDEX "_product_collections_v_version_version_slug_idx" ON "_product_collections_v" USING btree ("version_slug");
  CREATE INDEX "_product_collections_v_version_version_updated_at_idx" ON "_product_collections_v" USING btree ("version_updated_at");
  CREATE INDEX "_product_collections_v_version_version_created_at_idx" ON "_product_collections_v" USING btree ("version_created_at");
  CREATE INDEX "_product_collections_v_version_version__status_idx" ON "_product_collections_v" USING btree ("version__status");
  CREATE INDEX "_product_collections_v_created_at_idx" ON "_product_collections_v" USING btree ("created_at");
  CREATE INDEX "_product_collections_v_updated_at_idx" ON "_product_collections_v" USING btree ("updated_at");
  CREATE INDEX "_product_collections_v_latest_idx" ON "_product_collections_v" USING btree ("latest");
  CREATE INDEX "_product_collections_v_autosave_idx" ON "_product_collections_v" USING btree ("autosave");
  CREATE INDEX "_product_collections_v_rels_order_idx" ON "_product_collections_v_rels" USING btree ("order");
  CREATE INDEX "_product_collections_v_rels_parent_idx" ON "_product_collections_v_rels" USING btree ("parent_id");
  CREATE INDEX "_product_collections_v_rels_path_idx" ON "_product_collections_v_rels" USING btree ("path");
  CREATE INDEX "_product_collections_v_rels_products_id_idx" ON "_product_collections_v_rels" USING btree ("products_id");
  CREATE INDEX "content_types_custom_fields_order_idx" ON "content_types_custom_fields" USING btree ("_order");
  CREATE INDEX "content_types_custom_fields_parent_id_idx" ON "content_types_custom_fields" USING btree ("_parent_id");
  CREATE UNIQUE INDEX "content_types_slug_idx" ON "content_types" USING btree ("slug");
  CREATE INDEX "content_types_meta_meta_image_idx" ON "content_types" USING btree ("meta_image_id");
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
  CREATE INDEX "custom_items_blocks_stats_stats_order_idx" ON "custom_items_blocks_stats_stats" USING btree ("_order");
  CREATE INDEX "custom_items_blocks_stats_stats_parent_id_idx" ON "custom_items_blocks_stats_stats" USING btree ("_parent_id");
  CREATE INDEX "custom_items_blocks_stats_order_idx" ON "custom_items_blocks_stats" USING btree ("_order");
  CREATE INDEX "custom_items_blocks_stats_parent_id_idx" ON "custom_items_blocks_stats" USING btree ("_parent_id");
  CREATE INDEX "custom_items_blocks_stats_path_idx" ON "custom_items_blocks_stats" USING btree ("_path");
  CREATE INDEX "custom_items_blocks_logo_cloud_logos_order_idx" ON "custom_items_blocks_logo_cloud_logos" USING btree ("_order");
  CREATE INDEX "custom_items_blocks_logo_cloud_logos_parent_id_idx" ON "custom_items_blocks_logo_cloud_logos" USING btree ("_parent_id");
  CREATE INDEX "custom_items_blocks_logo_cloud_logos_logo_idx" ON "custom_items_blocks_logo_cloud_logos" USING btree ("logo_id");
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
  CREATE INDEX "custom_items_blocks_pricing_plans_order_idx" ON "custom_items_blocks_pricing_plans" USING btree ("_order");
  CREATE INDEX "custom_items_blocks_pricing_plans_parent_id_idx" ON "custom_items_blocks_pricing_plans" USING btree ("_parent_id");
  CREATE INDEX "custom_items_blocks_pricing_order_idx" ON "custom_items_blocks_pricing" USING btree ("_order");
  CREATE INDEX "custom_items_blocks_pricing_parent_id_idx" ON "custom_items_blocks_pricing" USING btree ("_parent_id");
  CREATE INDEX "custom_items_blocks_pricing_path_idx" ON "custom_items_blocks_pricing" USING btree ("_path");
  CREATE INDEX "custom_items_blocks_team_members_socials_order_idx" ON "custom_items_blocks_team_members_socials" USING btree ("_order");
  CREATE INDEX "custom_items_blocks_team_members_socials_parent_id_idx" ON "custom_items_blocks_team_members_socials" USING btree ("_parent_id");
  CREATE INDEX "custom_items_blocks_team_members_order_idx" ON "custom_items_blocks_team_members" USING btree ("_order");
  CREATE INDEX "custom_items_blocks_team_members_parent_id_idx" ON "custom_items_blocks_team_members" USING btree ("_parent_id");
  CREATE INDEX "custom_items_blocks_team_members_photo_idx" ON "custom_items_blocks_team_members" USING btree ("photo_id");
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
  CREATE INDEX "custom_items_blocks_timeline_events_link_link_archive_it_idx" ON "custom_items_blocks_timeline_events" USING btree ("link_archive_item_id");
  CREATE INDEX "custom_items_blocks_timeline_events_link_link_person_idx" ON "custom_items_blocks_timeline_events" USING btree ("link_person_id");
  CREATE INDEX "custom_items_blocks_timeline_order_idx" ON "custom_items_blocks_timeline" USING btree ("_order");
  CREATE INDEX "custom_items_blocks_timeline_parent_id_idx" ON "custom_items_blocks_timeline" USING btree ("_parent_id");
  CREATE INDEX "custom_items_blocks_timeline_path_idx" ON "custom_items_blocks_timeline" USING btree ("_path");
  CREATE INDEX "custom_items_blocks_archive_order_idx" ON "custom_items_blocks_archive" USING btree ("_order");
  CREATE INDEX "custom_items_blocks_archive_parent_id_idx" ON "custom_items_blocks_archive" USING btree ("_parent_id");
  CREATE INDEX "custom_items_blocks_archive_path_idx" ON "custom_items_blocks_archive" USING btree ("_path");
  CREATE INDEX "custom_items_blocks_archive_content_type_idx" ON "custom_items_blocks_archive" USING btree ("content_type_id");
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
  CREATE INDEX "custom_items_meta_meta_image_idx" ON "custom_items" USING btree ("meta_image_id");
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
  CREATE INDEX "custom_items_rels_archive_items_id_idx" ON "custom_items_rels" USING btree ("archive_items_id");
  CREATE INDEX "custom_items_rels_people_id_idx" ON "custom_items_rels" USING btree ("people_id");
  CREATE INDEX "custom_items_rels_places_id_idx" ON "custom_items_rels" USING btree ("places_id");
  CREATE INDEX "custom_items_rels_custom_items_id_idx" ON "custom_items_rels" USING btree ("custom_items_id");
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
  CREATE INDEX "_custom_items_v_blocks_stats_stats_order_idx" ON "_custom_items_v_blocks_stats_stats" USING btree ("_order");
  CREATE INDEX "_custom_items_v_blocks_stats_stats_parent_id_idx" ON "_custom_items_v_blocks_stats_stats" USING btree ("_parent_id");
  CREATE INDEX "_custom_items_v_blocks_stats_order_idx" ON "_custom_items_v_blocks_stats" USING btree ("_order");
  CREATE INDEX "_custom_items_v_blocks_stats_parent_id_idx" ON "_custom_items_v_blocks_stats" USING btree ("_parent_id");
  CREATE INDEX "_custom_items_v_blocks_stats_path_idx" ON "_custom_items_v_blocks_stats" USING btree ("_path");
  CREATE INDEX "_custom_items_v_blocks_logo_cloud_logos_order_idx" ON "_custom_items_v_blocks_logo_cloud_logos" USING btree ("_order");
  CREATE INDEX "_custom_items_v_blocks_logo_cloud_logos_parent_id_idx" ON "_custom_items_v_blocks_logo_cloud_logos" USING btree ("_parent_id");
  CREATE INDEX "_custom_items_v_blocks_logo_cloud_logos_logo_idx" ON "_custom_items_v_blocks_logo_cloud_logos" USING btree ("logo_id");
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
  CREATE INDEX "_custom_items_v_blocks_pricing_plans_order_idx" ON "_custom_items_v_blocks_pricing_plans" USING btree ("_order");
  CREATE INDEX "_custom_items_v_blocks_pricing_plans_parent_id_idx" ON "_custom_items_v_blocks_pricing_plans" USING btree ("_parent_id");
  CREATE INDEX "_custom_items_v_blocks_pricing_order_idx" ON "_custom_items_v_blocks_pricing" USING btree ("_order");
  CREATE INDEX "_custom_items_v_blocks_pricing_parent_id_idx" ON "_custom_items_v_blocks_pricing" USING btree ("_parent_id");
  CREATE INDEX "_custom_items_v_blocks_pricing_path_idx" ON "_custom_items_v_blocks_pricing" USING btree ("_path");
  CREATE INDEX "_custom_items_v_blocks_team_members_socials_order_idx" ON "_custom_items_v_blocks_team_members_socials" USING btree ("_order");
  CREATE INDEX "_custom_items_v_blocks_team_members_socials_parent_id_idx" ON "_custom_items_v_blocks_team_members_socials" USING btree ("_parent_id");
  CREATE INDEX "_custom_items_v_blocks_team_members_order_idx" ON "_custom_items_v_blocks_team_members" USING btree ("_order");
  CREATE INDEX "_custom_items_v_blocks_team_members_parent_id_idx" ON "_custom_items_v_blocks_team_members" USING btree ("_parent_id");
  CREATE INDEX "_custom_items_v_blocks_team_members_photo_idx" ON "_custom_items_v_blocks_team_members" USING btree ("photo_id");
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
  CREATE INDEX "_custom_items_v_blocks_timeline_events_link_link_archive_idx" ON "_custom_items_v_blocks_timeline_events" USING btree ("link_archive_item_id");
  CREATE INDEX "_custom_items_v_blocks_timeline_events_link_link_person_idx" ON "_custom_items_v_blocks_timeline_events" USING btree ("link_person_id");
  CREATE INDEX "_custom_items_v_blocks_timeline_order_idx" ON "_custom_items_v_blocks_timeline" USING btree ("_order");
  CREATE INDEX "_custom_items_v_blocks_timeline_parent_id_idx" ON "_custom_items_v_blocks_timeline" USING btree ("_parent_id");
  CREATE INDEX "_custom_items_v_blocks_timeline_path_idx" ON "_custom_items_v_blocks_timeline" USING btree ("_path");
  CREATE INDEX "_custom_items_v_blocks_archive_order_idx" ON "_custom_items_v_blocks_archive" USING btree ("_order");
  CREATE INDEX "_custom_items_v_blocks_archive_parent_id_idx" ON "_custom_items_v_blocks_archive" USING btree ("_parent_id");
  CREATE INDEX "_custom_items_v_blocks_archive_path_idx" ON "_custom_items_v_blocks_archive" USING btree ("_path");
  CREATE INDEX "_custom_items_v_blocks_archive_content_type_idx" ON "_custom_items_v_blocks_archive" USING btree ("content_type_id");
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
  CREATE INDEX "_custom_items_v_version_meta_version_meta_image_idx" ON "_custom_items_v" USING btree ("version_meta_image_id");
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
  CREATE INDEX "_custom_items_v_rels_archive_items_id_idx" ON "_custom_items_v_rels" USING btree ("archive_items_id");
  CREATE INDEX "_custom_items_v_rels_people_id_idx" ON "_custom_items_v_rels" USING btree ("people_id");
  CREATE INDEX "_custom_items_v_rels_places_id_idx" ON "_custom_items_v_rels" USING btree ("places_id");
  CREATE INDEX "_custom_items_v_rels_custom_items_id_idx" ON "_custom_items_v_rels" USING btree ("custom_items_id");
  CREATE INDEX "forms_blocks_checkbox_order_idx" ON "forms_blocks_checkbox" USING btree ("_order");
  CREATE INDEX "forms_blocks_checkbox_parent_id_idx" ON "forms_blocks_checkbox" USING btree ("_parent_id");
  CREATE INDEX "forms_blocks_checkbox_path_idx" ON "forms_blocks_checkbox" USING btree ("_path");
  CREATE INDEX "forms_blocks_country_order_idx" ON "forms_blocks_country" USING btree ("_order");
  CREATE INDEX "forms_blocks_country_parent_id_idx" ON "forms_blocks_country" USING btree ("_parent_id");
  CREATE INDEX "forms_blocks_country_path_idx" ON "forms_blocks_country" USING btree ("_path");
  CREATE INDEX "forms_blocks_email_order_idx" ON "forms_blocks_email" USING btree ("_order");
  CREATE INDEX "forms_blocks_email_parent_id_idx" ON "forms_blocks_email" USING btree ("_parent_id");
  CREATE INDEX "forms_blocks_email_path_idx" ON "forms_blocks_email" USING btree ("_path");
  CREATE INDEX "forms_blocks_message_order_idx" ON "forms_blocks_message" USING btree ("_order");
  CREATE INDEX "forms_blocks_message_parent_id_idx" ON "forms_blocks_message" USING btree ("_parent_id");
  CREATE INDEX "forms_blocks_message_path_idx" ON "forms_blocks_message" USING btree ("_path");
  CREATE INDEX "forms_blocks_number_order_idx" ON "forms_blocks_number" USING btree ("_order");
  CREATE INDEX "forms_blocks_number_parent_id_idx" ON "forms_blocks_number" USING btree ("_parent_id");
  CREATE INDEX "forms_blocks_number_path_idx" ON "forms_blocks_number" USING btree ("_path");
  CREATE INDEX "forms_blocks_select_options_order_idx" ON "forms_blocks_select_options" USING btree ("_order");
  CREATE INDEX "forms_blocks_select_options_parent_id_idx" ON "forms_blocks_select_options" USING btree ("_parent_id");
  CREATE INDEX "forms_blocks_select_order_idx" ON "forms_blocks_select" USING btree ("_order");
  CREATE INDEX "forms_blocks_select_parent_id_idx" ON "forms_blocks_select" USING btree ("_parent_id");
  CREATE INDEX "forms_blocks_select_path_idx" ON "forms_blocks_select" USING btree ("_path");
  CREATE INDEX "forms_blocks_state_order_idx" ON "forms_blocks_state" USING btree ("_order");
  CREATE INDEX "forms_blocks_state_parent_id_idx" ON "forms_blocks_state" USING btree ("_parent_id");
  CREATE INDEX "forms_blocks_state_path_idx" ON "forms_blocks_state" USING btree ("_path");
  CREATE INDEX "forms_blocks_text_order_idx" ON "forms_blocks_text" USING btree ("_order");
  CREATE INDEX "forms_blocks_text_parent_id_idx" ON "forms_blocks_text" USING btree ("_parent_id");
  CREATE INDEX "forms_blocks_text_path_idx" ON "forms_blocks_text" USING btree ("_path");
  CREATE INDEX "forms_blocks_textarea_order_idx" ON "forms_blocks_textarea" USING btree ("_order");
  CREATE INDEX "forms_blocks_textarea_parent_id_idx" ON "forms_blocks_textarea" USING btree ("_parent_id");
  CREATE INDEX "forms_blocks_textarea_path_idx" ON "forms_blocks_textarea" USING btree ("_path");
  CREATE INDEX "forms_emails_order_idx" ON "forms_emails" USING btree ("_order");
  CREATE INDEX "forms_emails_parent_id_idx" ON "forms_emails" USING btree ("_parent_id");
  CREATE INDEX "forms_updated_at_idx" ON "forms" USING btree ("updated_at");
  CREATE INDEX "forms_created_at_idx" ON "forms" USING btree ("created_at");
  CREATE INDEX "form_submissions_submission_data_order_idx" ON "form_submissions_submission_data" USING btree ("_order");
  CREATE INDEX "form_submissions_submission_data_parent_id_idx" ON "form_submissions_submission_data" USING btree ("_parent_id");
  CREATE INDEX "form_submissions_form_idx" ON "form_submissions" USING btree ("form_id");
  CREATE INDEX "form_submissions_updated_at_idx" ON "form_submissions" USING btree ("updated_at");
  CREATE INDEX "form_submissions_created_at_idx" ON "form_submissions" USING btree ("created_at");
  CREATE UNIQUE INDEX "redirects_from_idx" ON "redirects" USING btree ("from");
  CREATE INDEX "redirects_updated_at_idx" ON "redirects" USING btree ("updated_at");
  CREATE INDEX "redirects_created_at_idx" ON "redirects" USING btree ("created_at");
  CREATE INDEX "redirects_rels_order_idx" ON "redirects_rels" USING btree ("order");
  CREATE INDEX "redirects_rels_parent_idx" ON "redirects_rels" USING btree ("parent_id");
  CREATE INDEX "redirects_rels_path_idx" ON "redirects_rels" USING btree ("path");
  CREATE INDEX "redirects_rels_pages_id_idx" ON "redirects_rels" USING btree ("pages_id");
  CREATE INDEX "redirects_rels_posts_id_idx" ON "redirects_rels" USING btree ("posts_id");
  CREATE INDEX "redirects_rels_archive_items_id_idx" ON "redirects_rels" USING btree ("archive_items_id");
  CREATE INDEX "search_updated_at_idx" ON "search" USING btree ("updated_at");
  CREATE INDEX "search_created_at_idx" ON "search" USING btree ("created_at");
  CREATE INDEX "search_rels_order_idx" ON "search_rels" USING btree ("order");
  CREATE INDEX "search_rels_parent_idx" ON "search_rels" USING btree ("parent_id");
  CREATE INDEX "search_rels_path_idx" ON "search_rels" USING btree ("path");
  CREATE INDEX "search_rels_pages_id_idx" ON "search_rels" USING btree ("pages_id");
  CREATE INDEX "search_rels_posts_id_idx" ON "search_rels" USING btree ("posts_id");
  CREATE INDEX "search_rels_archive_items_id_idx" ON "search_rels" USING btree ("archive_items_id");
  CREATE INDEX "search_rels_people_id_idx" ON "search_rels" USING btree ("people_id");
  CREATE INDEX "search_rels_places_id_idx" ON "search_rels" USING btree ("places_id");
  CREATE INDEX "search_rels_events_id_idx" ON "search_rels" USING btree ("events_id");
  CREATE INDEX "search_rels_products_id_idx" ON "search_rels" USING btree ("products_id");
  CREATE INDEX "search_rels_custom_items_id_idx" ON "search_rels" USING btree ("custom_items_id");
  CREATE INDEX "search_rels_content_types_id_idx" ON "search_rels" USING btree ("content_types_id");
  CREATE UNIQUE INDEX "payload_kv_key_idx" ON "payload_kv" USING btree ("key");
  CREATE INDEX "payload_jobs_log_order_idx" ON "payload_jobs_log" USING btree ("_order");
  CREATE INDEX "payload_jobs_log_parent_id_idx" ON "payload_jobs_log" USING btree ("_parent_id");
  CREATE INDEX "payload_jobs_completed_at_idx" ON "payload_jobs" USING btree ("completed_at");
  CREATE INDEX "payload_jobs_total_tried_idx" ON "payload_jobs" USING btree ("total_tried");
  CREATE INDEX "payload_jobs_has_error_idx" ON "payload_jobs" USING btree ("has_error");
  CREATE INDEX "payload_jobs_task_slug_idx" ON "payload_jobs" USING btree ("task_slug");
  CREATE INDEX "payload_jobs_queue_idx" ON "payload_jobs" USING btree ("queue");
  CREATE INDEX "payload_jobs_wait_until_idx" ON "payload_jobs" USING btree ("wait_until");
  CREATE INDEX "payload_jobs_processing_idx" ON "payload_jobs" USING btree ("processing");
  CREATE INDEX "payload_jobs_updated_at_idx" ON "payload_jobs" USING btree ("updated_at");
  CREATE INDEX "payload_jobs_created_at_idx" ON "payload_jobs" USING btree ("created_at");
  CREATE INDEX "payload_locked_documents_global_slug_idx" ON "payload_locked_documents" USING btree ("global_slug");
  CREATE INDEX "payload_locked_documents_updated_at_idx" ON "payload_locked_documents" USING btree ("updated_at");
  CREATE INDEX "payload_locked_documents_created_at_idx" ON "payload_locked_documents" USING btree ("created_at");
  CREATE INDEX "payload_locked_documents_rels_order_idx" ON "payload_locked_documents_rels" USING btree ("order");
  CREATE INDEX "payload_locked_documents_rels_parent_idx" ON "payload_locked_documents_rels" USING btree ("parent_id");
  CREATE INDEX "payload_locked_documents_rels_path_idx" ON "payload_locked_documents_rels" USING btree ("path");
  CREATE INDEX "payload_locked_documents_rels_users_id_idx" ON "payload_locked_documents_rels" USING btree ("users_id");
  CREATE INDEX "payload_locked_documents_rels_media_id_idx" ON "payload_locked_documents_rels" USING btree ("media_id");
  CREATE INDEX "payload_locked_documents_rels_pages_id_idx" ON "payload_locked_documents_rels" USING btree ("pages_id");
  CREATE INDEX "payload_locked_documents_rels_posts_id_idx" ON "payload_locked_documents_rels" USING btree ("posts_id");
  CREATE INDEX "payload_locked_documents_rels_categories_id_idx" ON "payload_locked_documents_rels" USING btree ("categories_id");
  CREATE INDEX "payload_locked_documents_rels_tags_id_idx" ON "payload_locked_documents_rels" USING btree ("tags_id");
  CREATE INDEX "payload_locked_documents_rels_archive_items_id_idx" ON "payload_locked_documents_rels" USING btree ("archive_items_id");
  CREATE INDEX "payload_locked_documents_rels_people_id_idx" ON "payload_locked_documents_rels" USING btree ("people_id");
  CREATE INDEX "payload_locked_documents_rels_places_id_idx" ON "payload_locked_documents_rels" USING btree ("places_id");
  CREATE INDEX "payload_locked_documents_rels_events_id_idx" ON "payload_locked_documents_rels" USING btree ("events_id");
  CREATE INDEX "payload_locked_documents_rels_products_id_idx" ON "payload_locked_documents_rels" USING btree ("products_id");
  CREATE INDEX "payload_locked_documents_rels_product_categories_id_idx" ON "payload_locked_documents_rels" USING btree ("product_categories_id");
  CREATE INDEX "payload_locked_documents_rels_product_collections_id_idx" ON "payload_locked_documents_rels" USING btree ("product_collections_id");
  CREATE INDEX "payload_locked_documents_rels_content_types_id_idx" ON "payload_locked_documents_rels" USING btree ("content_types_id");
  CREATE INDEX "payload_locked_documents_rels_custom_items_id_idx" ON "payload_locked_documents_rels" USING btree ("custom_items_id");
  CREATE INDEX "payload_locked_documents_rels_forms_id_idx" ON "payload_locked_documents_rels" USING btree ("forms_id");
  CREATE INDEX "payload_locked_documents_rels_form_submissions_id_idx" ON "payload_locked_documents_rels" USING btree ("form_submissions_id");
  CREATE INDEX "payload_locked_documents_rels_redirects_id_idx" ON "payload_locked_documents_rels" USING btree ("redirects_id");
  CREATE INDEX "payload_locked_documents_rels_search_id_idx" ON "payload_locked_documents_rels" USING btree ("search_id");
  CREATE INDEX "payload_preferences_key_idx" ON "payload_preferences" USING btree ("key");
  CREATE INDEX "payload_preferences_updated_at_idx" ON "payload_preferences" USING btree ("updated_at");
  CREATE INDEX "payload_preferences_created_at_idx" ON "payload_preferences" USING btree ("created_at");
  CREATE INDEX "payload_preferences_rels_order_idx" ON "payload_preferences_rels" USING btree ("order");
  CREATE INDEX "payload_preferences_rels_parent_idx" ON "payload_preferences_rels" USING btree ("parent_id");
  CREATE INDEX "payload_preferences_rels_path_idx" ON "payload_preferences_rels" USING btree ("path");
  CREATE INDEX "payload_preferences_rels_users_id_idx" ON "payload_preferences_rels" USING btree ("users_id");
  CREATE INDEX "payload_migrations_updated_at_idx" ON "payload_migrations" USING btree ("updated_at");
  CREATE INDEX "payload_migrations_created_at_idx" ON "payload_migrations" USING btree ("created_at");
  CREATE INDEX "header_nav_items_children_order_idx" ON "header_nav_items_children" USING btree ("_order");
  CREATE INDEX "header_nav_items_children_parent_id_idx" ON "header_nav_items_children" USING btree ("_parent_id");
  CREATE INDEX "header_nav_items_children_page_idx" ON "header_nav_items_children" USING btree ("page_id");
  CREATE INDEX "header_nav_items_order_idx" ON "header_nav_items" USING btree ("_order");
  CREATE INDEX "header_nav_items_parent_id_idx" ON "header_nav_items" USING btree ("_parent_id");
  CREATE INDEX "header_nav_items_page_idx" ON "header_nav_items" USING btree ("page_id");
  CREATE INDEX "header_logo_idx" ON "header" USING btree ("logo_id");
  CREATE INDEX "header_cta_button_cta_button_page_idx" ON "header" USING btree ("cta_button_page_id");
  CREATE INDEX "footer_columns_links_order_idx" ON "footer_columns_links" USING btree ("_order");
  CREATE INDEX "footer_columns_links_parent_id_idx" ON "footer_columns_links" USING btree ("_parent_id");
  CREATE INDEX "footer_columns_links_page_idx" ON "footer_columns_links" USING btree ("page_id");
  CREATE INDEX "footer_columns_order_idx" ON "footer_columns" USING btree ("_order");
  CREATE INDEX "footer_columns_parent_id_idx" ON "footer_columns" USING btree ("_parent_id");
  CREATE INDEX "footer_social_links_order_idx" ON "footer_social_links" USING btree ("_order");
  CREATE INDEX "footer_social_links_parent_id_idx" ON "footer_social_links" USING btree ("_parent_id");
  CREATE INDEX "footer_legal_links_order_idx" ON "footer_legal_links" USING btree ("_order");
  CREATE INDEX "footer_legal_links_parent_id_idx" ON "footer_legal_links" USING btree ("_parent_id");
  CREATE INDEX "footer_legal_links_page_idx" ON "footer_legal_links" USING btree ("page_id");
  CREATE INDEX "footer_logo_idx" ON "footer" USING btree ("logo_id");
  CREATE INDEX "settings_social_profiles_order_idx" ON "settings_social_profiles" USING btree ("_order");
  CREATE INDEX "settings_social_profiles_parent_id_idx" ON "settings_social_profiles" USING btree ("_parent_id");
  CREATE INDEX "settings_favicon_idx" ON "settings" USING btree ("favicon_id");
  CREATE INDEX "settings_logo_idx" ON "settings" USING btree ("logo_id");
  CREATE INDEX "settings_default_meta_default_meta_image_idx" ON "settings" USING btree ("default_meta_image_id");
  CREATE INDEX "navigation_settings_custom_links_order_idx" ON "navigation_settings_custom_links" USING btree ("_order");
  CREATE INDEX "navigation_settings_custom_links_parent_id_idx" ON "navigation_settings_custom_links" USING btree ("_parent_id");`)
}

export async function down({ db, payload, req }: MigrateDownArgs): Promise<void> {
  await db.execute(sql`
   DROP TABLE "users_social_links" CASCADE;
  DROP TABLE "users_sessions" CASCADE;
  DROP TABLE "users" CASCADE;
  DROP TABLE "media_tags" CASCADE;
  DROP TABLE "media" CASCADE;
  DROP TABLE "pages_hero_links" CASCADE;
  DROP TABLE "pages_blocks_hero_links" CASCADE;
  DROP TABLE "pages_blocks_hero" CASCADE;
  DROP TABLE "pages_blocks_content_columns" CASCADE;
  DROP TABLE "pages_blocks_content" CASCADE;
  DROP TABLE "pages_blocks_media" CASCADE;
  DROP TABLE "pages_blocks_cta_links" CASCADE;
  DROP TABLE "pages_blocks_cta" CASCADE;
  DROP TABLE "pages_blocks_quote" CASCADE;
  DROP TABLE "pages_blocks_features_items" CASCADE;
  DROP TABLE "pages_blocks_features" CASCADE;
  DROP TABLE "pages_blocks_stats_stats" CASCADE;
  DROP TABLE "pages_blocks_stats" CASCADE;
  DROP TABLE "pages_blocks_logo_cloud_logos" CASCADE;
  DROP TABLE "pages_blocks_logo_cloud" CASCADE;
  DROP TABLE "pages_blocks_testimonials_items" CASCADE;
  DROP TABLE "pages_blocks_testimonials" CASCADE;
  DROP TABLE "pages_blocks_faq_items" CASCADE;
  DROP TABLE "pages_blocks_faq" CASCADE;
  DROP TABLE "pages_blocks_pricing_plans_features" CASCADE;
  DROP TABLE "pages_blocks_pricing_plans" CASCADE;
  DROP TABLE "pages_blocks_pricing" CASCADE;
  DROP TABLE "pages_blocks_team_members_socials" CASCADE;
  DROP TABLE "pages_blocks_team_members" CASCADE;
  DROP TABLE "pages_blocks_team" CASCADE;
  DROP TABLE "pages_blocks_embed" CASCADE;
  DROP TABLE "pages_blocks_archive" CASCADE;
  DROP TABLE "pages_blocks_form" CASCADE;
  DROP TABLE "pages_blocks_gallery_images" CASCADE;
  DROP TABLE "pages_blocks_gallery" CASCADE;
  DROP TABLE "pages_blocks_grid_items" CASCADE;
  DROP TABLE "pages_blocks_grid" CASCADE;
  DROP TABLE "pages_blocks_timeline_events" CASCADE;
  DROP TABLE "pages_blocks_timeline" CASCADE;
  DROP TABLE "pages_blocks_spacer" CASCADE;
  DROP TABLE "pages_blocks_html" CASCADE;
  DROP TABLE "pages" CASCADE;
  DROP TABLE "pages_rels" CASCADE;
  DROP TABLE "_pages_v_version_hero_links" CASCADE;
  DROP TABLE "_pages_v_blocks_hero_links" CASCADE;
  DROP TABLE "_pages_v_blocks_hero" CASCADE;
  DROP TABLE "_pages_v_blocks_content_columns" CASCADE;
  DROP TABLE "_pages_v_blocks_content" CASCADE;
  DROP TABLE "_pages_v_blocks_media" CASCADE;
  DROP TABLE "_pages_v_blocks_cta_links" CASCADE;
  DROP TABLE "_pages_v_blocks_cta" CASCADE;
  DROP TABLE "_pages_v_blocks_quote" CASCADE;
  DROP TABLE "_pages_v_blocks_features_items" CASCADE;
  DROP TABLE "_pages_v_blocks_features" CASCADE;
  DROP TABLE "_pages_v_blocks_stats_stats" CASCADE;
  DROP TABLE "_pages_v_blocks_stats" CASCADE;
  DROP TABLE "_pages_v_blocks_logo_cloud_logos" CASCADE;
  DROP TABLE "_pages_v_blocks_logo_cloud" CASCADE;
  DROP TABLE "_pages_v_blocks_testimonials_items" CASCADE;
  DROP TABLE "_pages_v_blocks_testimonials" CASCADE;
  DROP TABLE "_pages_v_blocks_faq_items" CASCADE;
  DROP TABLE "_pages_v_blocks_faq" CASCADE;
  DROP TABLE "_pages_v_blocks_pricing_plans_features" CASCADE;
  DROP TABLE "_pages_v_blocks_pricing_plans" CASCADE;
  DROP TABLE "_pages_v_blocks_pricing" CASCADE;
  DROP TABLE "_pages_v_blocks_team_members_socials" CASCADE;
  DROP TABLE "_pages_v_blocks_team_members" CASCADE;
  DROP TABLE "_pages_v_blocks_team" CASCADE;
  DROP TABLE "_pages_v_blocks_embed" CASCADE;
  DROP TABLE "_pages_v_blocks_archive" CASCADE;
  DROP TABLE "_pages_v_blocks_form" CASCADE;
  DROP TABLE "_pages_v_blocks_gallery_images" CASCADE;
  DROP TABLE "_pages_v_blocks_gallery" CASCADE;
  DROP TABLE "_pages_v_blocks_grid_items" CASCADE;
  DROP TABLE "_pages_v_blocks_grid" CASCADE;
  DROP TABLE "_pages_v_blocks_timeline_events" CASCADE;
  DROP TABLE "_pages_v_blocks_timeline" CASCADE;
  DROP TABLE "_pages_v_blocks_spacer" CASCADE;
  DROP TABLE "_pages_v_blocks_html" CASCADE;
  DROP TABLE "_pages_v" CASCADE;
  DROP TABLE "_pages_v_rels" CASCADE;
  DROP TABLE "posts_blocks_hero_links" CASCADE;
  DROP TABLE "posts_blocks_hero" CASCADE;
  DROP TABLE "posts_blocks_content_columns" CASCADE;
  DROP TABLE "posts_blocks_content" CASCADE;
  DROP TABLE "posts_blocks_media" CASCADE;
  DROP TABLE "posts_blocks_cta_links" CASCADE;
  DROP TABLE "posts_blocks_cta" CASCADE;
  DROP TABLE "posts_blocks_quote" CASCADE;
  DROP TABLE "posts_blocks_features_items" CASCADE;
  DROP TABLE "posts_blocks_features" CASCADE;
  DROP TABLE "posts_blocks_stats_stats" CASCADE;
  DROP TABLE "posts_blocks_stats" CASCADE;
  DROP TABLE "posts_blocks_logo_cloud_logos" CASCADE;
  DROP TABLE "posts_blocks_logo_cloud" CASCADE;
  DROP TABLE "posts_blocks_testimonials_items" CASCADE;
  DROP TABLE "posts_blocks_testimonials" CASCADE;
  DROP TABLE "posts_blocks_faq_items" CASCADE;
  DROP TABLE "posts_blocks_faq" CASCADE;
  DROP TABLE "posts_blocks_pricing_plans_features" CASCADE;
  DROP TABLE "posts_blocks_pricing_plans" CASCADE;
  DROP TABLE "posts_blocks_pricing" CASCADE;
  DROP TABLE "posts_blocks_team_members_socials" CASCADE;
  DROP TABLE "posts_blocks_team_members" CASCADE;
  DROP TABLE "posts_blocks_team" CASCADE;
  DROP TABLE "posts_blocks_embed" CASCADE;
  DROP TABLE "posts_blocks_archive" CASCADE;
  DROP TABLE "posts_blocks_form" CASCADE;
  DROP TABLE "posts_blocks_gallery_images" CASCADE;
  DROP TABLE "posts_blocks_gallery" CASCADE;
  DROP TABLE "posts_blocks_grid_items" CASCADE;
  DROP TABLE "posts_blocks_grid" CASCADE;
  DROP TABLE "posts_blocks_timeline_events" CASCADE;
  DROP TABLE "posts_blocks_timeline" CASCADE;
  DROP TABLE "posts_blocks_spacer" CASCADE;
  DROP TABLE "posts_blocks_html" CASCADE;
  DROP TABLE "posts" CASCADE;
  DROP TABLE "posts_rels" CASCADE;
  DROP TABLE "_posts_v_blocks_hero_links" CASCADE;
  DROP TABLE "_posts_v_blocks_hero" CASCADE;
  DROP TABLE "_posts_v_blocks_content_columns" CASCADE;
  DROP TABLE "_posts_v_blocks_content" CASCADE;
  DROP TABLE "_posts_v_blocks_media" CASCADE;
  DROP TABLE "_posts_v_blocks_cta_links" CASCADE;
  DROP TABLE "_posts_v_blocks_cta" CASCADE;
  DROP TABLE "_posts_v_blocks_quote" CASCADE;
  DROP TABLE "_posts_v_blocks_features_items" CASCADE;
  DROP TABLE "_posts_v_blocks_features" CASCADE;
  DROP TABLE "_posts_v_blocks_stats_stats" CASCADE;
  DROP TABLE "_posts_v_blocks_stats" CASCADE;
  DROP TABLE "_posts_v_blocks_logo_cloud_logos" CASCADE;
  DROP TABLE "_posts_v_blocks_logo_cloud" CASCADE;
  DROP TABLE "_posts_v_blocks_testimonials_items" CASCADE;
  DROP TABLE "_posts_v_blocks_testimonials" CASCADE;
  DROP TABLE "_posts_v_blocks_faq_items" CASCADE;
  DROP TABLE "_posts_v_blocks_faq" CASCADE;
  DROP TABLE "_posts_v_blocks_pricing_plans_features" CASCADE;
  DROP TABLE "_posts_v_blocks_pricing_plans" CASCADE;
  DROP TABLE "_posts_v_blocks_pricing" CASCADE;
  DROP TABLE "_posts_v_blocks_team_members_socials" CASCADE;
  DROP TABLE "_posts_v_blocks_team_members" CASCADE;
  DROP TABLE "_posts_v_blocks_team" CASCADE;
  DROP TABLE "_posts_v_blocks_embed" CASCADE;
  DROP TABLE "_posts_v_blocks_archive" CASCADE;
  DROP TABLE "_posts_v_blocks_form" CASCADE;
  DROP TABLE "_posts_v_blocks_gallery_images" CASCADE;
  DROP TABLE "_posts_v_blocks_gallery" CASCADE;
  DROP TABLE "_posts_v_blocks_grid_items" CASCADE;
  DROP TABLE "_posts_v_blocks_grid" CASCADE;
  DROP TABLE "_posts_v_blocks_timeline_events" CASCADE;
  DROP TABLE "_posts_v_blocks_timeline" CASCADE;
  DROP TABLE "_posts_v_blocks_spacer" CASCADE;
  DROP TABLE "_posts_v_blocks_html" CASCADE;
  DROP TABLE "_posts_v" CASCADE;
  DROP TABLE "_posts_v_rels" CASCADE;
  DROP TABLE "categories_breadcrumbs" CASCADE;
  DROP TABLE "categories" CASCADE;
  DROP TABLE "_categories_v_version_breadcrumbs" CASCADE;
  DROP TABLE "_categories_v" CASCADE;
  DROP TABLE "tags" CASCADE;
  DROP TABLE "_tags_v" CASCADE;
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
  DROP TABLE "people_blocks_stats_stats" CASCADE;
  DROP TABLE "people_blocks_stats" CASCADE;
  DROP TABLE "people_blocks_logo_cloud_logos" CASCADE;
  DROP TABLE "people_blocks_logo_cloud" CASCADE;
  DROP TABLE "people_blocks_testimonials_items" CASCADE;
  DROP TABLE "people_blocks_testimonials" CASCADE;
  DROP TABLE "people_blocks_faq_items" CASCADE;
  DROP TABLE "people_blocks_faq" CASCADE;
  DROP TABLE "people_blocks_pricing_plans_features" CASCADE;
  DROP TABLE "people_blocks_pricing_plans" CASCADE;
  DROP TABLE "people_blocks_pricing" CASCADE;
  DROP TABLE "people_blocks_team_members_socials" CASCADE;
  DROP TABLE "people_blocks_team_members" CASCADE;
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
  DROP TABLE "_people_v_blocks_stats_stats" CASCADE;
  DROP TABLE "_people_v_blocks_stats" CASCADE;
  DROP TABLE "_people_v_blocks_logo_cloud_logos" CASCADE;
  DROP TABLE "_people_v_blocks_logo_cloud" CASCADE;
  DROP TABLE "_people_v_blocks_testimonials_items" CASCADE;
  DROP TABLE "_people_v_blocks_testimonials" CASCADE;
  DROP TABLE "_people_v_blocks_faq_items" CASCADE;
  DROP TABLE "_people_v_blocks_faq" CASCADE;
  DROP TABLE "_people_v_blocks_pricing_plans_features" CASCADE;
  DROP TABLE "_people_v_blocks_pricing_plans" CASCADE;
  DROP TABLE "_people_v_blocks_pricing" CASCADE;
  DROP TABLE "_people_v_blocks_team_members_socials" CASCADE;
  DROP TABLE "_people_v_blocks_team_members" CASCADE;
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
  DROP TABLE "places_blocks_stats_stats" CASCADE;
  DROP TABLE "places_blocks_stats" CASCADE;
  DROP TABLE "places_blocks_logo_cloud_logos" CASCADE;
  DROP TABLE "places_blocks_logo_cloud" CASCADE;
  DROP TABLE "places_blocks_testimonials_items" CASCADE;
  DROP TABLE "places_blocks_testimonials" CASCADE;
  DROP TABLE "places_blocks_faq_items" CASCADE;
  DROP TABLE "places_blocks_faq" CASCADE;
  DROP TABLE "places_blocks_pricing_plans_features" CASCADE;
  DROP TABLE "places_blocks_pricing_plans" CASCADE;
  DROP TABLE "places_blocks_pricing" CASCADE;
  DROP TABLE "places_blocks_team_members_socials" CASCADE;
  DROP TABLE "places_blocks_team_members" CASCADE;
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
  DROP TABLE "_places_v_blocks_stats_stats" CASCADE;
  DROP TABLE "_places_v_blocks_stats" CASCADE;
  DROP TABLE "_places_v_blocks_logo_cloud_logos" CASCADE;
  DROP TABLE "_places_v_blocks_logo_cloud" CASCADE;
  DROP TABLE "_places_v_blocks_testimonials_items" CASCADE;
  DROP TABLE "_places_v_blocks_testimonials" CASCADE;
  DROP TABLE "_places_v_blocks_faq_items" CASCADE;
  DROP TABLE "_places_v_blocks_faq" CASCADE;
  DROP TABLE "_places_v_blocks_pricing_plans_features" CASCADE;
  DROP TABLE "_places_v_blocks_pricing_plans" CASCADE;
  DROP TABLE "_places_v_blocks_pricing" CASCADE;
  DROP TABLE "_places_v_blocks_team_members_socials" CASCADE;
  DROP TABLE "_places_v_blocks_team_members" CASCADE;
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
  DROP TABLE "products_gallery" CASCADE;
  DROP TABLE "products_variants" CASCADE;
  DROP TABLE "products_blocks_hero_links" CASCADE;
  DROP TABLE "products_blocks_hero" CASCADE;
  DROP TABLE "products_blocks_content_columns" CASCADE;
  DROP TABLE "products_blocks_content" CASCADE;
  DROP TABLE "products_blocks_media" CASCADE;
  DROP TABLE "products_blocks_cta_links" CASCADE;
  DROP TABLE "products_blocks_cta" CASCADE;
  DROP TABLE "products_blocks_archive" CASCADE;
  DROP TABLE "products_blocks_form" CASCADE;
  DROP TABLE "products_blocks_gallery_images" CASCADE;
  DROP TABLE "products_blocks_gallery" CASCADE;
  DROP TABLE "products_blocks_grid_items" CASCADE;
  DROP TABLE "products_blocks_grid" CASCADE;
  DROP TABLE "products_blocks_timeline_events" CASCADE;
  DROP TABLE "products_blocks_timeline" CASCADE;
  DROP TABLE "products" CASCADE;
  DROP TABLE "products_rels" CASCADE;
  DROP TABLE "_products_v_version_gallery" CASCADE;
  DROP TABLE "_products_v_version_variants" CASCADE;
  DROP TABLE "_products_v_blocks_hero_links" CASCADE;
  DROP TABLE "_products_v_blocks_hero" CASCADE;
  DROP TABLE "_products_v_blocks_content_columns" CASCADE;
  DROP TABLE "_products_v_blocks_content" CASCADE;
  DROP TABLE "_products_v_blocks_media" CASCADE;
  DROP TABLE "_products_v_blocks_cta_links" CASCADE;
  DROP TABLE "_products_v_blocks_cta" CASCADE;
  DROP TABLE "_products_v_blocks_archive" CASCADE;
  DROP TABLE "_products_v_blocks_form" CASCADE;
  DROP TABLE "_products_v_blocks_gallery_images" CASCADE;
  DROP TABLE "_products_v_blocks_gallery" CASCADE;
  DROP TABLE "_products_v_blocks_grid_items" CASCADE;
  DROP TABLE "_products_v_blocks_grid" CASCADE;
  DROP TABLE "_products_v_blocks_timeline_events" CASCADE;
  DROP TABLE "_products_v_blocks_timeline" CASCADE;
  DROP TABLE "_products_v" CASCADE;
  DROP TABLE "_products_v_rels" CASCADE;
  DROP TABLE "product_categories_breadcrumbs" CASCADE;
  DROP TABLE "product_categories" CASCADE;
  DROP TABLE "_product_categories_v_version_breadcrumbs" CASCADE;
  DROP TABLE "_product_categories_v" CASCADE;
  DROP TABLE "product_collections" CASCADE;
  DROP TABLE "product_collections_rels" CASCADE;
  DROP TABLE "_product_collections_v" CASCADE;
  DROP TABLE "_product_collections_v_rels" CASCADE;
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
  DROP TABLE "custom_items_blocks_stats_stats" CASCADE;
  DROP TABLE "custom_items_blocks_stats" CASCADE;
  DROP TABLE "custom_items_blocks_logo_cloud_logos" CASCADE;
  DROP TABLE "custom_items_blocks_logo_cloud" CASCADE;
  DROP TABLE "custom_items_blocks_testimonials_items" CASCADE;
  DROP TABLE "custom_items_blocks_testimonials" CASCADE;
  DROP TABLE "custom_items_blocks_faq_items" CASCADE;
  DROP TABLE "custom_items_blocks_faq" CASCADE;
  DROP TABLE "custom_items_blocks_pricing_plans_features" CASCADE;
  DROP TABLE "custom_items_blocks_pricing_plans" CASCADE;
  DROP TABLE "custom_items_blocks_pricing" CASCADE;
  DROP TABLE "custom_items_blocks_team_members_socials" CASCADE;
  DROP TABLE "custom_items_blocks_team_members" CASCADE;
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
  DROP TABLE "_custom_items_v_blocks_stats_stats" CASCADE;
  DROP TABLE "_custom_items_v_blocks_stats" CASCADE;
  DROP TABLE "_custom_items_v_blocks_logo_cloud_logos" CASCADE;
  DROP TABLE "_custom_items_v_blocks_logo_cloud" CASCADE;
  DROP TABLE "_custom_items_v_blocks_testimonials_items" CASCADE;
  DROP TABLE "_custom_items_v_blocks_testimonials" CASCADE;
  DROP TABLE "_custom_items_v_blocks_faq_items" CASCADE;
  DROP TABLE "_custom_items_v_blocks_faq" CASCADE;
  DROP TABLE "_custom_items_v_blocks_pricing_plans_features" CASCADE;
  DROP TABLE "_custom_items_v_blocks_pricing_plans" CASCADE;
  DROP TABLE "_custom_items_v_blocks_pricing" CASCADE;
  DROP TABLE "_custom_items_v_blocks_team_members_socials" CASCADE;
  DROP TABLE "_custom_items_v_blocks_team_members" CASCADE;
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
  DROP TABLE "forms_blocks_checkbox" CASCADE;
  DROP TABLE "forms_blocks_country" CASCADE;
  DROP TABLE "forms_blocks_email" CASCADE;
  DROP TABLE "forms_blocks_message" CASCADE;
  DROP TABLE "forms_blocks_number" CASCADE;
  DROP TABLE "forms_blocks_select_options" CASCADE;
  DROP TABLE "forms_blocks_select" CASCADE;
  DROP TABLE "forms_blocks_state" CASCADE;
  DROP TABLE "forms_blocks_text" CASCADE;
  DROP TABLE "forms_blocks_textarea" CASCADE;
  DROP TABLE "forms_emails" CASCADE;
  DROP TABLE "forms" CASCADE;
  DROP TABLE "form_submissions_submission_data" CASCADE;
  DROP TABLE "form_submissions" CASCADE;
  DROP TABLE "redirects" CASCADE;
  DROP TABLE "redirects_rels" CASCADE;
  DROP TABLE "search" CASCADE;
  DROP TABLE "search_rels" CASCADE;
  DROP TABLE "payload_kv" CASCADE;
  DROP TABLE "payload_jobs_log" CASCADE;
  DROP TABLE "payload_jobs" CASCADE;
  DROP TABLE "payload_locked_documents" CASCADE;
  DROP TABLE "payload_locked_documents_rels" CASCADE;
  DROP TABLE "payload_preferences" CASCADE;
  DROP TABLE "payload_preferences_rels" CASCADE;
  DROP TABLE "payload_migrations" CASCADE;
  DROP TABLE "header_nav_items_children" CASCADE;
  DROP TABLE "header_nav_items" CASCADE;
  DROP TABLE "header" CASCADE;
  DROP TABLE "footer_columns_links" CASCADE;
  DROP TABLE "footer_columns" CASCADE;
  DROP TABLE "footer_social_links" CASCADE;
  DROP TABLE "footer_legal_links" CASCADE;
  DROP TABLE "footer" CASCADE;
  DROP TABLE "settings_social_profiles" CASCADE;
  DROP TABLE "settings" CASCADE;
  DROP TABLE "navigation_settings_custom_links" CASCADE;
  DROP TABLE "navigation_settings" CASCADE;
  DROP TYPE "public"."enum_users_social_links_platform";
  DROP TYPE "public"."enum_users_role";
  DROP TYPE "public"."enum_pages_hero_links_variant";
  DROP TYPE "public"."enum_pages_blocks_hero_links_variant";
  DROP TYPE "public"."enum_pages_blocks_hero_variant";
  DROP TYPE "public"."enum_pages_blocks_hero_type";
  DROP TYPE "public"."enum_pages_blocks_hero_overlay";
  DROP TYPE "public"."enum_pages_blocks_hero_text_align";
  DROP TYPE "public"."enum_pages_blocks_content_columns_size";
  DROP TYPE "public"."enum_pages_blocks_content_background_color";
  DROP TYPE "public"."enum_pages_blocks_content_padding_top";
  DROP TYPE "public"."enum_pages_blocks_content_padding_bottom";
  DROP TYPE "public"."enum_pages_blocks_media_size";
  DROP TYPE "public"."enum_pages_blocks_media_position";
  DROP TYPE "public"."enum_pages_blocks_cta_links_variant";
  DROP TYPE "public"."enum_pages_blocks_cta_style";
  DROP TYPE "public"."enum_pages_blocks_cta_background_color";
  DROP TYPE "public"."enum_pages_blocks_quote_align";
  DROP TYPE "public"."enum_pages_blocks_features_layout";
  DROP TYPE "public"."enum_pages_blocks_testimonials_style";
  DROP TYPE "public"."enum_pages_blocks_embed_aspect_ratio";
  DROP TYPE "public"."enum_pages_blocks_archive_populate_by";
  DROP TYPE "public"."enum_pages_blocks_archive_relation_to";
  DROP TYPE "public"."enum_pages_blocks_archive_layout";
  DROP TYPE "public"."enum_pages_blocks_archive_columns";
  DROP TYPE "public"."enum_pages_blocks_form_style";
  DROP TYPE "public"."enum_pages_blocks_form_background_color";
  DROP TYPE "public"."enum_pages_blocks_gallery_layout";
  DROP TYPE "public"."enum_pages_blocks_gallery_columns";
  DROP TYPE "public"."enum_pages_blocks_gallery_gap";
  DROP TYPE "public"."enum_pages_blocks_gallery_aspect_ratio";
  DROP TYPE "public"."enum_pages_blocks_grid_style";
  DROP TYPE "public"."enum_pages_blocks_grid_columns";
  DROP TYPE "public"."enum_pages_blocks_grid_gap";
  DROP TYPE "public"."enum_pages_blocks_grid_alignment";
  DROP TYPE "public"."enum_pages_blocks_grid_hover_effect";
  DROP TYPE "public"."enum_pages_blocks_timeline_layout";
  DROP TYPE "public"."enum_pages_blocks_timeline_line_style";
  DROP TYPE "public"."enum_pages_blocks_timeline_marker_style";
  DROP TYPE "public"."enum_pages_blocks_timeline_sort_order";
  DROP TYPE "public"."enum_pages_blocks_timeline_background_color";
  DROP TYPE "public"."enum_pages_blocks_spacer_style";
  DROP TYPE "public"."enum_pages_blocks_spacer_size";
  DROP TYPE "public"."enum_pages_blocks_spacer_line_style";
  DROP TYPE "public"."enum_pages_hero_type";
  DROP TYPE "public"."enum_pages_template";
  DROP TYPE "public"."enum_pages_status";
  DROP TYPE "public"."enum__pages_v_version_hero_links_variant";
  DROP TYPE "public"."enum__pages_v_blocks_hero_links_variant";
  DROP TYPE "public"."enum__pages_v_blocks_hero_variant";
  DROP TYPE "public"."enum__pages_v_blocks_hero_type";
  DROP TYPE "public"."enum__pages_v_blocks_hero_overlay";
  DROP TYPE "public"."enum__pages_v_blocks_hero_text_align";
  DROP TYPE "public"."enum__pages_v_blocks_content_columns_size";
  DROP TYPE "public"."enum__pages_v_blocks_content_background_color";
  DROP TYPE "public"."enum__pages_v_blocks_content_padding_top";
  DROP TYPE "public"."enum__pages_v_blocks_content_padding_bottom";
  DROP TYPE "public"."enum__pages_v_blocks_media_size";
  DROP TYPE "public"."enum__pages_v_blocks_media_position";
  DROP TYPE "public"."enum__pages_v_blocks_cta_links_variant";
  DROP TYPE "public"."enum__pages_v_blocks_cta_style";
  DROP TYPE "public"."enum__pages_v_blocks_cta_background_color";
  DROP TYPE "public"."enum__pages_v_blocks_quote_align";
  DROP TYPE "public"."enum__pages_v_blocks_features_layout";
  DROP TYPE "public"."enum__pages_v_blocks_testimonials_style";
  DROP TYPE "public"."enum__pages_v_blocks_embed_aspect_ratio";
  DROP TYPE "public"."enum__pages_v_blocks_archive_populate_by";
  DROP TYPE "public"."enum__pages_v_blocks_archive_relation_to";
  DROP TYPE "public"."enum__pages_v_blocks_archive_layout";
  DROP TYPE "public"."enum__pages_v_blocks_archive_columns";
  DROP TYPE "public"."enum__pages_v_blocks_form_style";
  DROP TYPE "public"."enum__pages_v_blocks_form_background_color";
  DROP TYPE "public"."enum__pages_v_blocks_gallery_layout";
  DROP TYPE "public"."enum__pages_v_blocks_gallery_columns";
  DROP TYPE "public"."enum__pages_v_blocks_gallery_gap";
  DROP TYPE "public"."enum__pages_v_blocks_gallery_aspect_ratio";
  DROP TYPE "public"."enum__pages_v_blocks_grid_style";
  DROP TYPE "public"."enum__pages_v_blocks_grid_columns";
  DROP TYPE "public"."enum__pages_v_blocks_grid_gap";
  DROP TYPE "public"."enum__pages_v_blocks_grid_alignment";
  DROP TYPE "public"."enum__pages_v_blocks_grid_hover_effect";
  DROP TYPE "public"."enum__pages_v_blocks_timeline_layout";
  DROP TYPE "public"."enum__pages_v_blocks_timeline_line_style";
  DROP TYPE "public"."enum__pages_v_blocks_timeline_marker_style";
  DROP TYPE "public"."enum__pages_v_blocks_timeline_sort_order";
  DROP TYPE "public"."enum__pages_v_blocks_timeline_background_color";
  DROP TYPE "public"."enum__pages_v_blocks_spacer_style";
  DROP TYPE "public"."enum__pages_v_blocks_spacer_size";
  DROP TYPE "public"."enum__pages_v_blocks_spacer_line_style";
  DROP TYPE "public"."enum__pages_v_version_hero_type";
  DROP TYPE "public"."enum__pages_v_version_template";
  DROP TYPE "public"."enum__pages_v_version_status";
  DROP TYPE "public"."enum_posts_blocks_hero_links_variant";
  DROP TYPE "public"."enum_posts_blocks_hero_variant";
  DROP TYPE "public"."enum_posts_blocks_hero_type";
  DROP TYPE "public"."enum_posts_blocks_hero_overlay";
  DROP TYPE "public"."enum_posts_blocks_hero_text_align";
  DROP TYPE "public"."enum_posts_blocks_content_columns_size";
  DROP TYPE "public"."enum_posts_blocks_content_background_color";
  DROP TYPE "public"."enum_posts_blocks_content_padding_top";
  DROP TYPE "public"."enum_posts_blocks_content_padding_bottom";
  DROP TYPE "public"."enum_posts_blocks_media_size";
  DROP TYPE "public"."enum_posts_blocks_media_position";
  DROP TYPE "public"."enum_posts_blocks_cta_links_variant";
  DROP TYPE "public"."enum_posts_blocks_cta_style";
  DROP TYPE "public"."enum_posts_blocks_cta_background_color";
  DROP TYPE "public"."enum_posts_blocks_quote_align";
  DROP TYPE "public"."enum_posts_blocks_features_layout";
  DROP TYPE "public"."enum_posts_blocks_testimonials_style";
  DROP TYPE "public"."enum_posts_blocks_embed_aspect_ratio";
  DROP TYPE "public"."enum_posts_blocks_archive_populate_by";
  DROP TYPE "public"."enum_posts_blocks_archive_relation_to";
  DROP TYPE "public"."enum_posts_blocks_archive_layout";
  DROP TYPE "public"."enum_posts_blocks_archive_columns";
  DROP TYPE "public"."enum_posts_blocks_form_style";
  DROP TYPE "public"."enum_posts_blocks_form_background_color";
  DROP TYPE "public"."enum_posts_blocks_gallery_layout";
  DROP TYPE "public"."enum_posts_blocks_gallery_columns";
  DROP TYPE "public"."enum_posts_blocks_gallery_gap";
  DROP TYPE "public"."enum_posts_blocks_gallery_aspect_ratio";
  DROP TYPE "public"."enum_posts_blocks_grid_style";
  DROP TYPE "public"."enum_posts_blocks_grid_columns";
  DROP TYPE "public"."enum_posts_blocks_grid_gap";
  DROP TYPE "public"."enum_posts_blocks_grid_alignment";
  DROP TYPE "public"."enum_posts_blocks_grid_hover_effect";
  DROP TYPE "public"."enum_posts_blocks_timeline_layout";
  DROP TYPE "public"."enum_posts_blocks_timeline_line_style";
  DROP TYPE "public"."enum_posts_blocks_timeline_marker_style";
  DROP TYPE "public"."enum_posts_blocks_timeline_sort_order";
  DROP TYPE "public"."enum_posts_blocks_timeline_background_color";
  DROP TYPE "public"."enum_posts_blocks_spacer_style";
  DROP TYPE "public"."enum_posts_blocks_spacer_size";
  DROP TYPE "public"."enum_posts_blocks_spacer_line_style";
  DROP TYPE "public"."enum_posts_template";
  DROP TYPE "public"."enum_posts_status";
  DROP TYPE "public"."enum__posts_v_blocks_hero_links_variant";
  DROP TYPE "public"."enum__posts_v_blocks_hero_variant";
  DROP TYPE "public"."enum__posts_v_blocks_hero_type";
  DROP TYPE "public"."enum__posts_v_blocks_hero_overlay";
  DROP TYPE "public"."enum__posts_v_blocks_hero_text_align";
  DROP TYPE "public"."enum__posts_v_blocks_content_columns_size";
  DROP TYPE "public"."enum__posts_v_blocks_content_background_color";
  DROP TYPE "public"."enum__posts_v_blocks_content_padding_top";
  DROP TYPE "public"."enum__posts_v_blocks_content_padding_bottom";
  DROP TYPE "public"."enum__posts_v_blocks_media_size";
  DROP TYPE "public"."enum__posts_v_blocks_media_position";
  DROP TYPE "public"."enum__posts_v_blocks_cta_links_variant";
  DROP TYPE "public"."enum__posts_v_blocks_cta_style";
  DROP TYPE "public"."enum__posts_v_blocks_cta_background_color";
  DROP TYPE "public"."enum__posts_v_blocks_quote_align";
  DROP TYPE "public"."enum__posts_v_blocks_features_layout";
  DROP TYPE "public"."enum__posts_v_blocks_testimonials_style";
  DROP TYPE "public"."enum__posts_v_blocks_embed_aspect_ratio";
  DROP TYPE "public"."enum__posts_v_blocks_archive_populate_by";
  DROP TYPE "public"."enum__posts_v_blocks_archive_relation_to";
  DROP TYPE "public"."enum__posts_v_blocks_archive_layout";
  DROP TYPE "public"."enum__posts_v_blocks_archive_columns";
  DROP TYPE "public"."enum__posts_v_blocks_form_style";
  DROP TYPE "public"."enum__posts_v_blocks_form_background_color";
  DROP TYPE "public"."enum__posts_v_blocks_gallery_layout";
  DROP TYPE "public"."enum__posts_v_blocks_gallery_columns";
  DROP TYPE "public"."enum__posts_v_blocks_gallery_gap";
  DROP TYPE "public"."enum__posts_v_blocks_gallery_aspect_ratio";
  DROP TYPE "public"."enum__posts_v_blocks_grid_style";
  DROP TYPE "public"."enum__posts_v_blocks_grid_columns";
  DROP TYPE "public"."enum__posts_v_blocks_grid_gap";
  DROP TYPE "public"."enum__posts_v_blocks_grid_alignment";
  DROP TYPE "public"."enum__posts_v_blocks_grid_hover_effect";
  DROP TYPE "public"."enum__posts_v_blocks_timeline_layout";
  DROP TYPE "public"."enum__posts_v_blocks_timeline_line_style";
  DROP TYPE "public"."enum__posts_v_blocks_timeline_marker_style";
  DROP TYPE "public"."enum__posts_v_blocks_timeline_sort_order";
  DROP TYPE "public"."enum__posts_v_blocks_timeline_background_color";
  DROP TYPE "public"."enum__posts_v_blocks_spacer_style";
  DROP TYPE "public"."enum__posts_v_blocks_spacer_size";
  DROP TYPE "public"."enum__posts_v_blocks_spacer_line_style";
  DROP TYPE "public"."enum__posts_v_version_template";
  DROP TYPE "public"."enum__posts_v_version_status";
  DROP TYPE "public"."enum_archive_items_blocks_hero_links_variant";
  DROP TYPE "public"."enum_archive_items_blocks_hero_variant";
  DROP TYPE "public"."enum_archive_items_blocks_hero_type";
  DROP TYPE "public"."enum_archive_items_blocks_hero_overlay";
  DROP TYPE "public"."enum_archive_items_blocks_hero_text_align";
  DROP TYPE "public"."enum_archive_items_blocks_content_columns_size";
  DROP TYPE "public"."enum_archive_items_blocks_content_background_color";
  DROP TYPE "public"."enum_archive_items_blocks_content_padding_top";
  DROP TYPE "public"."enum_archive_items_blocks_content_padding_bottom";
  DROP TYPE "public"."enum_archive_items_blocks_media_size";
  DROP TYPE "public"."enum_archive_items_blocks_media_position";
  DROP TYPE "public"."enum_archive_items_blocks_cta_links_variant";
  DROP TYPE "public"."enum_archive_items_blocks_cta_style";
  DROP TYPE "public"."enum_archive_items_blocks_cta_background_color";
  DROP TYPE "public"."enum_archive_items_blocks_archive_populate_by";
  DROP TYPE "public"."enum_archive_items_blocks_archive_relation_to";
  DROP TYPE "public"."enum_archive_items_blocks_archive_layout";
  DROP TYPE "public"."enum_archive_items_blocks_archive_columns";
  DROP TYPE "public"."enum_archive_items_blocks_form_style";
  DROP TYPE "public"."enum_archive_items_blocks_form_background_color";
  DROP TYPE "public"."enum_archive_items_blocks_gallery_layout";
  DROP TYPE "public"."enum_archive_items_blocks_gallery_columns";
  DROP TYPE "public"."enum_archive_items_blocks_gallery_gap";
  DROP TYPE "public"."enum_archive_items_blocks_gallery_aspect_ratio";
  DROP TYPE "public"."enum_archive_items_blocks_grid_style";
  DROP TYPE "public"."enum_archive_items_blocks_grid_columns";
  DROP TYPE "public"."enum_archive_items_blocks_grid_gap";
  DROP TYPE "public"."enum_archive_items_blocks_grid_alignment";
  DROP TYPE "public"."enum_archive_items_blocks_grid_hover_effect";
  DROP TYPE "public"."enum_archive_items_blocks_timeline_layout";
  DROP TYPE "public"."enum_archive_items_blocks_timeline_line_style";
  DROP TYPE "public"."enum_archive_items_blocks_timeline_marker_style";
  DROP TYPE "public"."enum_archive_items_blocks_timeline_sort_order";
  DROP TYPE "public"."enum_archive_items_blocks_timeline_background_color";
  DROP TYPE "public"."enum_archive_items_template";
  DROP TYPE "public"."enum_archive_items_status";
  DROP TYPE "public"."enum__archive_items_v_blocks_hero_links_variant";
  DROP TYPE "public"."enum__archive_items_v_blocks_hero_variant";
  DROP TYPE "public"."enum__archive_items_v_blocks_hero_type";
  DROP TYPE "public"."enum__archive_items_v_blocks_hero_overlay";
  DROP TYPE "public"."enum__archive_items_v_blocks_hero_text_align";
  DROP TYPE "public"."enum__archive_items_v_blocks_content_columns_size";
  DROP TYPE "public"."enum__archive_items_v_blocks_content_background_color";
  DROP TYPE "public"."enum__archive_items_v_blocks_content_padding_top";
  DROP TYPE "public"."enum__archive_items_v_blocks_content_padding_bottom";
  DROP TYPE "public"."enum__archive_items_v_blocks_media_size";
  DROP TYPE "public"."enum__archive_items_v_blocks_media_position";
  DROP TYPE "public"."enum__archive_items_v_blocks_cta_links_variant";
  DROP TYPE "public"."enum__archive_items_v_blocks_cta_style";
  DROP TYPE "public"."enum__archive_items_v_blocks_cta_background_color";
  DROP TYPE "public"."enum__archive_items_v_blocks_archive_populate_by";
  DROP TYPE "public"."enum__archive_items_v_blocks_archive_relation_to";
  DROP TYPE "public"."enum__archive_items_v_blocks_archive_layout";
  DROP TYPE "public"."enum__archive_items_v_blocks_archive_columns";
  DROP TYPE "public"."enum__archive_items_v_blocks_form_style";
  DROP TYPE "public"."enum__archive_items_v_blocks_form_background_color";
  DROP TYPE "public"."enum__archive_items_v_blocks_gallery_layout";
  DROP TYPE "public"."enum__archive_items_v_blocks_gallery_columns";
  DROP TYPE "public"."enum__archive_items_v_blocks_gallery_gap";
  DROP TYPE "public"."enum__archive_items_v_blocks_gallery_aspect_ratio";
  DROP TYPE "public"."enum__archive_items_v_blocks_grid_style";
  DROP TYPE "public"."enum__archive_items_v_blocks_grid_columns";
  DROP TYPE "public"."enum__archive_items_v_blocks_grid_gap";
  DROP TYPE "public"."enum__archive_items_v_blocks_grid_alignment";
  DROP TYPE "public"."enum__archive_items_v_blocks_grid_hover_effect";
  DROP TYPE "public"."enum__archive_items_v_blocks_timeline_layout";
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
  DROP TYPE "public"."enum_people_blocks_hero_type";
  DROP TYPE "public"."enum_people_blocks_hero_overlay";
  DROP TYPE "public"."enum_people_blocks_hero_text_align";
  DROP TYPE "public"."enum_people_blocks_content_columns_size";
  DROP TYPE "public"."enum_people_blocks_content_background_color";
  DROP TYPE "public"."enum_people_blocks_content_padding_top";
  DROP TYPE "public"."enum_people_blocks_content_padding_bottom";
  DROP TYPE "public"."enum_people_blocks_media_size";
  DROP TYPE "public"."enum_people_blocks_media_position";
  DROP TYPE "public"."enum_people_blocks_cta_links_variant";
  DROP TYPE "public"."enum_people_blocks_cta_style";
  DROP TYPE "public"."enum_people_blocks_cta_background_color";
  DROP TYPE "public"."enum_people_blocks_quote_align";
  DROP TYPE "public"."enum_people_blocks_features_layout";
  DROP TYPE "public"."enum_people_blocks_testimonials_style";
  DROP TYPE "public"."enum_people_blocks_embed_aspect_ratio";
  DROP TYPE "public"."enum_people_blocks_archive_populate_by";
  DROP TYPE "public"."enum_people_blocks_archive_relation_to";
  DROP TYPE "public"."enum_people_blocks_archive_layout";
  DROP TYPE "public"."enum_people_blocks_archive_columns";
  DROP TYPE "public"."enum_people_blocks_form_style";
  DROP TYPE "public"."enum_people_blocks_form_background_color";
  DROP TYPE "public"."enum_people_blocks_gallery_layout";
  DROP TYPE "public"."enum_people_blocks_gallery_columns";
  DROP TYPE "public"."enum_people_blocks_gallery_gap";
  DROP TYPE "public"."enum_people_blocks_gallery_aspect_ratio";
  DROP TYPE "public"."enum_people_blocks_grid_style";
  DROP TYPE "public"."enum_people_blocks_grid_columns";
  DROP TYPE "public"."enum_people_blocks_grid_gap";
  DROP TYPE "public"."enum_people_blocks_grid_alignment";
  DROP TYPE "public"."enum_people_blocks_grid_hover_effect";
  DROP TYPE "public"."enum_people_blocks_timeline_layout";
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
  DROP TYPE "public"."enum__people_v_blocks_hero_type";
  DROP TYPE "public"."enum__people_v_blocks_hero_overlay";
  DROP TYPE "public"."enum__people_v_blocks_hero_text_align";
  DROP TYPE "public"."enum__people_v_blocks_content_columns_size";
  DROP TYPE "public"."enum__people_v_blocks_content_background_color";
  DROP TYPE "public"."enum__people_v_blocks_content_padding_top";
  DROP TYPE "public"."enum__people_v_blocks_content_padding_bottom";
  DROP TYPE "public"."enum__people_v_blocks_media_size";
  DROP TYPE "public"."enum__people_v_blocks_media_position";
  DROP TYPE "public"."enum__people_v_blocks_cta_links_variant";
  DROP TYPE "public"."enum__people_v_blocks_cta_style";
  DROP TYPE "public"."enum__people_v_blocks_cta_background_color";
  DROP TYPE "public"."enum__people_v_blocks_quote_align";
  DROP TYPE "public"."enum__people_v_blocks_features_layout";
  DROP TYPE "public"."enum__people_v_blocks_testimonials_style";
  DROP TYPE "public"."enum__people_v_blocks_embed_aspect_ratio";
  DROP TYPE "public"."enum__people_v_blocks_archive_populate_by";
  DROP TYPE "public"."enum__people_v_blocks_archive_relation_to";
  DROP TYPE "public"."enum__people_v_blocks_archive_layout";
  DROP TYPE "public"."enum__people_v_blocks_archive_columns";
  DROP TYPE "public"."enum__people_v_blocks_form_style";
  DROP TYPE "public"."enum__people_v_blocks_form_background_color";
  DROP TYPE "public"."enum__people_v_blocks_gallery_layout";
  DROP TYPE "public"."enum__people_v_blocks_gallery_columns";
  DROP TYPE "public"."enum__people_v_blocks_gallery_gap";
  DROP TYPE "public"."enum__people_v_blocks_gallery_aspect_ratio";
  DROP TYPE "public"."enum__people_v_blocks_grid_style";
  DROP TYPE "public"."enum__people_v_blocks_grid_columns";
  DROP TYPE "public"."enum__people_v_blocks_grid_gap";
  DROP TYPE "public"."enum__people_v_blocks_grid_alignment";
  DROP TYPE "public"."enum__people_v_blocks_grid_hover_effect";
  DROP TYPE "public"."enum__people_v_blocks_timeline_layout";
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
  DROP TYPE "public"."enum_places_blocks_hero_type";
  DROP TYPE "public"."enum_places_blocks_hero_overlay";
  DROP TYPE "public"."enum_places_blocks_hero_text_align";
  DROP TYPE "public"."enum_places_blocks_content_columns_size";
  DROP TYPE "public"."enum_places_blocks_content_background_color";
  DROP TYPE "public"."enum_places_blocks_content_padding_top";
  DROP TYPE "public"."enum_places_blocks_content_padding_bottom";
  DROP TYPE "public"."enum_places_blocks_media_size";
  DROP TYPE "public"."enum_places_blocks_media_position";
  DROP TYPE "public"."enum_places_blocks_cta_links_variant";
  DROP TYPE "public"."enum_places_blocks_cta_style";
  DROP TYPE "public"."enum_places_blocks_cta_background_color";
  DROP TYPE "public"."enum_places_blocks_quote_align";
  DROP TYPE "public"."enum_places_blocks_features_layout";
  DROP TYPE "public"."enum_places_blocks_testimonials_style";
  DROP TYPE "public"."enum_places_blocks_embed_aspect_ratio";
  DROP TYPE "public"."enum_places_blocks_archive_populate_by";
  DROP TYPE "public"."enum_places_blocks_archive_relation_to";
  DROP TYPE "public"."enum_places_blocks_archive_layout";
  DROP TYPE "public"."enum_places_blocks_archive_columns";
  DROP TYPE "public"."enum_places_blocks_form_style";
  DROP TYPE "public"."enum_places_blocks_form_background_color";
  DROP TYPE "public"."enum_places_blocks_gallery_layout";
  DROP TYPE "public"."enum_places_blocks_gallery_columns";
  DROP TYPE "public"."enum_places_blocks_gallery_gap";
  DROP TYPE "public"."enum_places_blocks_gallery_aspect_ratio";
  DROP TYPE "public"."enum_places_blocks_grid_style";
  DROP TYPE "public"."enum_places_blocks_grid_columns";
  DROP TYPE "public"."enum_places_blocks_grid_gap";
  DROP TYPE "public"."enum_places_blocks_grid_alignment";
  DROP TYPE "public"."enum_places_blocks_grid_hover_effect";
  DROP TYPE "public"."enum_places_blocks_timeline_layout";
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
  DROP TYPE "public"."enum__places_v_blocks_hero_type";
  DROP TYPE "public"."enum__places_v_blocks_hero_overlay";
  DROP TYPE "public"."enum__places_v_blocks_hero_text_align";
  DROP TYPE "public"."enum__places_v_blocks_content_columns_size";
  DROP TYPE "public"."enum__places_v_blocks_content_background_color";
  DROP TYPE "public"."enum__places_v_blocks_content_padding_top";
  DROP TYPE "public"."enum__places_v_blocks_content_padding_bottom";
  DROP TYPE "public"."enum__places_v_blocks_media_size";
  DROP TYPE "public"."enum__places_v_blocks_media_position";
  DROP TYPE "public"."enum__places_v_blocks_cta_links_variant";
  DROP TYPE "public"."enum__places_v_blocks_cta_style";
  DROP TYPE "public"."enum__places_v_blocks_cta_background_color";
  DROP TYPE "public"."enum__places_v_blocks_quote_align";
  DROP TYPE "public"."enum__places_v_blocks_features_layout";
  DROP TYPE "public"."enum__places_v_blocks_testimonials_style";
  DROP TYPE "public"."enum__places_v_blocks_embed_aspect_ratio";
  DROP TYPE "public"."enum__places_v_blocks_archive_populate_by";
  DROP TYPE "public"."enum__places_v_blocks_archive_relation_to";
  DROP TYPE "public"."enum__places_v_blocks_archive_layout";
  DROP TYPE "public"."enum__places_v_blocks_archive_columns";
  DROP TYPE "public"."enum__places_v_blocks_form_style";
  DROP TYPE "public"."enum__places_v_blocks_form_background_color";
  DROP TYPE "public"."enum__places_v_blocks_gallery_layout";
  DROP TYPE "public"."enum__places_v_blocks_gallery_columns";
  DROP TYPE "public"."enum__places_v_blocks_gallery_gap";
  DROP TYPE "public"."enum__places_v_blocks_gallery_aspect_ratio";
  DROP TYPE "public"."enum__places_v_blocks_grid_style";
  DROP TYPE "public"."enum__places_v_blocks_grid_columns";
  DROP TYPE "public"."enum__places_v_blocks_grid_gap";
  DROP TYPE "public"."enum__places_v_blocks_grid_alignment";
  DROP TYPE "public"."enum__places_v_blocks_grid_hover_effect";
  DROP TYPE "public"."enum__places_v_blocks_timeline_layout";
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
  DROP TYPE "public"."enum_events_blocks_hero_type";
  DROP TYPE "public"."enum_events_blocks_hero_overlay";
  DROP TYPE "public"."enum_events_blocks_hero_text_align";
  DROP TYPE "public"."enum_events_blocks_content_columns_size";
  DROP TYPE "public"."enum_events_blocks_content_background_color";
  DROP TYPE "public"."enum_events_blocks_content_padding_top";
  DROP TYPE "public"."enum_events_blocks_content_padding_bottom";
  DROP TYPE "public"."enum_events_blocks_media_size";
  DROP TYPE "public"."enum_events_blocks_media_position";
  DROP TYPE "public"."enum_events_blocks_cta_links_variant";
  DROP TYPE "public"."enum_events_blocks_cta_style";
  DROP TYPE "public"."enum_events_blocks_cta_background_color";
  DROP TYPE "public"."enum_events_blocks_archive_populate_by";
  DROP TYPE "public"."enum_events_blocks_archive_relation_to";
  DROP TYPE "public"."enum_events_blocks_archive_layout";
  DROP TYPE "public"."enum_events_blocks_archive_columns";
  DROP TYPE "public"."enum_events_blocks_form_style";
  DROP TYPE "public"."enum_events_blocks_form_background_color";
  DROP TYPE "public"."enum_events_blocks_gallery_layout";
  DROP TYPE "public"."enum_events_blocks_gallery_columns";
  DROP TYPE "public"."enum_events_blocks_gallery_gap";
  DROP TYPE "public"."enum_events_blocks_gallery_aspect_ratio";
  DROP TYPE "public"."enum_events_blocks_grid_style";
  DROP TYPE "public"."enum_events_blocks_grid_columns";
  DROP TYPE "public"."enum_events_blocks_grid_gap";
  DROP TYPE "public"."enum_events_blocks_grid_alignment";
  DROP TYPE "public"."enum_events_blocks_grid_hover_effect";
  DROP TYPE "public"."enum_events_blocks_timeline_layout";
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
  DROP TYPE "public"."enum__events_v_blocks_hero_type";
  DROP TYPE "public"."enum__events_v_blocks_hero_overlay";
  DROP TYPE "public"."enum__events_v_blocks_hero_text_align";
  DROP TYPE "public"."enum__events_v_blocks_content_columns_size";
  DROP TYPE "public"."enum__events_v_blocks_content_background_color";
  DROP TYPE "public"."enum__events_v_blocks_content_padding_top";
  DROP TYPE "public"."enum__events_v_blocks_content_padding_bottom";
  DROP TYPE "public"."enum__events_v_blocks_media_size";
  DROP TYPE "public"."enum__events_v_blocks_media_position";
  DROP TYPE "public"."enum__events_v_blocks_cta_links_variant";
  DROP TYPE "public"."enum__events_v_blocks_cta_style";
  DROP TYPE "public"."enum__events_v_blocks_cta_background_color";
  DROP TYPE "public"."enum__events_v_blocks_archive_populate_by";
  DROP TYPE "public"."enum__events_v_blocks_archive_relation_to";
  DROP TYPE "public"."enum__events_v_blocks_archive_layout";
  DROP TYPE "public"."enum__events_v_blocks_archive_columns";
  DROP TYPE "public"."enum__events_v_blocks_form_style";
  DROP TYPE "public"."enum__events_v_blocks_form_background_color";
  DROP TYPE "public"."enum__events_v_blocks_gallery_layout";
  DROP TYPE "public"."enum__events_v_blocks_gallery_columns";
  DROP TYPE "public"."enum__events_v_blocks_gallery_gap";
  DROP TYPE "public"."enum__events_v_blocks_gallery_aspect_ratio";
  DROP TYPE "public"."enum__events_v_blocks_grid_style";
  DROP TYPE "public"."enum__events_v_blocks_grid_columns";
  DROP TYPE "public"."enum__events_v_blocks_grid_gap";
  DROP TYPE "public"."enum__events_v_blocks_grid_alignment";
  DROP TYPE "public"."enum__events_v_blocks_grid_hover_effect";
  DROP TYPE "public"."enum__events_v_blocks_timeline_layout";
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
  DROP TYPE "public"."enum_products_blocks_hero_links_variant";
  DROP TYPE "public"."enum_products_blocks_hero_variant";
  DROP TYPE "public"."enum_products_blocks_hero_type";
  DROP TYPE "public"."enum_products_blocks_hero_overlay";
  DROP TYPE "public"."enum_products_blocks_hero_text_align";
  DROP TYPE "public"."enum_products_blocks_content_columns_size";
  DROP TYPE "public"."enum_products_blocks_content_background_color";
  DROP TYPE "public"."enum_products_blocks_content_padding_top";
  DROP TYPE "public"."enum_products_blocks_content_padding_bottom";
  DROP TYPE "public"."enum_products_blocks_media_size";
  DROP TYPE "public"."enum_products_blocks_media_position";
  DROP TYPE "public"."enum_products_blocks_cta_links_variant";
  DROP TYPE "public"."enum_products_blocks_cta_style";
  DROP TYPE "public"."enum_products_blocks_cta_background_color";
  DROP TYPE "public"."enum_products_blocks_archive_populate_by";
  DROP TYPE "public"."enum_products_blocks_archive_relation_to";
  DROP TYPE "public"."enum_products_blocks_archive_layout";
  DROP TYPE "public"."enum_products_blocks_archive_columns";
  DROP TYPE "public"."enum_products_blocks_form_style";
  DROP TYPE "public"."enum_products_blocks_form_background_color";
  DROP TYPE "public"."enum_products_blocks_gallery_layout";
  DROP TYPE "public"."enum_products_blocks_gallery_columns";
  DROP TYPE "public"."enum_products_blocks_gallery_gap";
  DROP TYPE "public"."enum_products_blocks_gallery_aspect_ratio";
  DROP TYPE "public"."enum_products_blocks_grid_style";
  DROP TYPE "public"."enum_products_blocks_grid_columns";
  DROP TYPE "public"."enum_products_blocks_grid_gap";
  DROP TYPE "public"."enum_products_blocks_grid_alignment";
  DROP TYPE "public"."enum_products_blocks_grid_hover_effect";
  DROP TYPE "public"."enum_products_blocks_timeline_layout";
  DROP TYPE "public"."enum_products_blocks_timeline_line_style";
  DROP TYPE "public"."enum_products_blocks_timeline_marker_style";
  DROP TYPE "public"."enum_products_blocks_timeline_sort_order";
  DROP TYPE "public"."enum_products_blocks_timeline_background_color";
  DROP TYPE "public"."enum_products_currency";
  DROP TYPE "public"."enum_products_shipping_class";
  DROP TYPE "public"."enum_products_availability";
  DROP TYPE "public"."enum_products_template";
  DROP TYPE "public"."enum_products_status";
  DROP TYPE "public"."enum__products_v_blocks_hero_links_variant";
  DROP TYPE "public"."enum__products_v_blocks_hero_variant";
  DROP TYPE "public"."enum__products_v_blocks_hero_type";
  DROP TYPE "public"."enum__products_v_blocks_hero_overlay";
  DROP TYPE "public"."enum__products_v_blocks_hero_text_align";
  DROP TYPE "public"."enum__products_v_blocks_content_columns_size";
  DROP TYPE "public"."enum__products_v_blocks_content_background_color";
  DROP TYPE "public"."enum__products_v_blocks_content_padding_top";
  DROP TYPE "public"."enum__products_v_blocks_content_padding_bottom";
  DROP TYPE "public"."enum__products_v_blocks_media_size";
  DROP TYPE "public"."enum__products_v_blocks_media_position";
  DROP TYPE "public"."enum__products_v_blocks_cta_links_variant";
  DROP TYPE "public"."enum__products_v_blocks_cta_style";
  DROP TYPE "public"."enum__products_v_blocks_cta_background_color";
  DROP TYPE "public"."enum__products_v_blocks_archive_populate_by";
  DROP TYPE "public"."enum__products_v_blocks_archive_relation_to";
  DROP TYPE "public"."enum__products_v_blocks_archive_layout";
  DROP TYPE "public"."enum__products_v_blocks_archive_columns";
  DROP TYPE "public"."enum__products_v_blocks_form_style";
  DROP TYPE "public"."enum__products_v_blocks_form_background_color";
  DROP TYPE "public"."enum__products_v_blocks_gallery_layout";
  DROP TYPE "public"."enum__products_v_blocks_gallery_columns";
  DROP TYPE "public"."enum__products_v_blocks_gallery_gap";
  DROP TYPE "public"."enum__products_v_blocks_gallery_aspect_ratio";
  DROP TYPE "public"."enum__products_v_blocks_grid_style";
  DROP TYPE "public"."enum__products_v_blocks_grid_columns";
  DROP TYPE "public"."enum__products_v_blocks_grid_gap";
  DROP TYPE "public"."enum__products_v_blocks_grid_alignment";
  DROP TYPE "public"."enum__products_v_blocks_grid_hover_effect";
  DROP TYPE "public"."enum__products_v_blocks_timeline_layout";
  DROP TYPE "public"."enum__products_v_blocks_timeline_line_style";
  DROP TYPE "public"."enum__products_v_blocks_timeline_marker_style";
  DROP TYPE "public"."enum__products_v_blocks_timeline_sort_order";
  DROP TYPE "public"."enum__products_v_blocks_timeline_background_color";
  DROP TYPE "public"."enum__products_v_version_currency";
  DROP TYPE "public"."enum__products_v_version_shipping_class";
  DROP TYPE "public"."enum__products_v_version_availability";
  DROP TYPE "public"."enum__products_v_version_template";
  DROP TYPE "public"."enum__products_v_version_status";
  DROP TYPE "public"."enum_product_collections_template";
  DROP TYPE "public"."enum_product_collections_status";
  DROP TYPE "public"."enum__product_collections_v_version_template";
  DROP TYPE "public"."enum__product_collections_v_version_status";
  DROP TYPE "public"."enum_content_types_custom_fields_type";
  DROP TYPE "public"."enum_content_types_icon";
  DROP TYPE "public"."enum_content_types_template";
  DROP TYPE "public"."enum_custom_items_blocks_hero_links_variant";
  DROP TYPE "public"."enum_custom_items_blocks_hero_variant";
  DROP TYPE "public"."enum_custom_items_blocks_hero_type";
  DROP TYPE "public"."enum_custom_items_blocks_hero_overlay";
  DROP TYPE "public"."enum_custom_items_blocks_hero_text_align";
  DROP TYPE "public"."enum_custom_items_blocks_content_columns_size";
  DROP TYPE "public"."enum_custom_items_blocks_content_background_color";
  DROP TYPE "public"."enum_custom_items_blocks_content_padding_top";
  DROP TYPE "public"."enum_custom_items_blocks_content_padding_bottom";
  DROP TYPE "public"."enum_custom_items_blocks_media_size";
  DROP TYPE "public"."enum_custom_items_blocks_media_position";
  DROP TYPE "public"."enum_custom_items_blocks_cta_links_variant";
  DROP TYPE "public"."enum_custom_items_blocks_cta_style";
  DROP TYPE "public"."enum_custom_items_blocks_cta_background_color";
  DROP TYPE "public"."enum_custom_items_blocks_quote_align";
  DROP TYPE "public"."enum_custom_items_blocks_features_layout";
  DROP TYPE "public"."enum_custom_items_blocks_testimonials_style";
  DROP TYPE "public"."enum_custom_items_blocks_embed_aspect_ratio";
  DROP TYPE "public"."enum_custom_items_blocks_gallery_layout";
  DROP TYPE "public"."enum_custom_items_blocks_gallery_columns";
  DROP TYPE "public"."enum_custom_items_blocks_gallery_gap";
  DROP TYPE "public"."enum_custom_items_blocks_gallery_aspect_ratio";
  DROP TYPE "public"."enum_custom_items_blocks_grid_style";
  DROP TYPE "public"."enum_custom_items_blocks_grid_columns";
  DROP TYPE "public"."enum_custom_items_blocks_grid_gap";
  DROP TYPE "public"."enum_custom_items_blocks_grid_alignment";
  DROP TYPE "public"."enum_custom_items_blocks_grid_hover_effect";
  DROP TYPE "public"."enum_custom_items_blocks_timeline_layout";
  DROP TYPE "public"."enum_custom_items_blocks_timeline_line_style";
  DROP TYPE "public"."enum_custom_items_blocks_timeline_marker_style";
  DROP TYPE "public"."enum_custom_items_blocks_timeline_sort_order";
  DROP TYPE "public"."enum_custom_items_blocks_timeline_background_color";
  DROP TYPE "public"."enum_custom_items_blocks_archive_populate_by";
  DROP TYPE "public"."enum_custom_items_blocks_archive_relation_to";
  DROP TYPE "public"."enum_custom_items_blocks_archive_layout";
  DROP TYPE "public"."enum_custom_items_blocks_archive_columns";
  DROP TYPE "public"."enum_custom_items_blocks_form_style";
  DROP TYPE "public"."enum_custom_items_blocks_form_background_color";
  DROP TYPE "public"."enum_custom_items_blocks_spacer_style";
  DROP TYPE "public"."enum_custom_items_blocks_spacer_size";
  DROP TYPE "public"."enum_custom_items_blocks_spacer_line_style";
  DROP TYPE "public"."enum_custom_items_status";
  DROP TYPE "public"."enum__custom_items_v_blocks_hero_links_variant";
  DROP TYPE "public"."enum__custom_items_v_blocks_hero_variant";
  DROP TYPE "public"."enum__custom_items_v_blocks_hero_type";
  DROP TYPE "public"."enum__custom_items_v_blocks_hero_overlay";
  DROP TYPE "public"."enum__custom_items_v_blocks_hero_text_align";
  DROP TYPE "public"."enum__custom_items_v_blocks_content_columns_size";
  DROP TYPE "public"."enum__custom_items_v_blocks_content_background_color";
  DROP TYPE "public"."enum__custom_items_v_blocks_content_padding_top";
  DROP TYPE "public"."enum__custom_items_v_blocks_content_padding_bottom";
  DROP TYPE "public"."enum__custom_items_v_blocks_media_size";
  DROP TYPE "public"."enum__custom_items_v_blocks_media_position";
  DROP TYPE "public"."enum__custom_items_v_blocks_cta_links_variant";
  DROP TYPE "public"."enum__custom_items_v_blocks_cta_style";
  DROP TYPE "public"."enum__custom_items_v_blocks_cta_background_color";
  DROP TYPE "public"."enum__custom_items_v_blocks_quote_align";
  DROP TYPE "public"."enum__custom_items_v_blocks_features_layout";
  DROP TYPE "public"."enum__custom_items_v_blocks_testimonials_style";
  DROP TYPE "public"."enum__custom_items_v_blocks_embed_aspect_ratio";
  DROP TYPE "public"."enum__custom_items_v_blocks_gallery_layout";
  DROP TYPE "public"."enum__custom_items_v_blocks_gallery_columns";
  DROP TYPE "public"."enum__custom_items_v_blocks_gallery_gap";
  DROP TYPE "public"."enum__custom_items_v_blocks_gallery_aspect_ratio";
  DROP TYPE "public"."enum__custom_items_v_blocks_grid_style";
  DROP TYPE "public"."enum__custom_items_v_blocks_grid_columns";
  DROP TYPE "public"."enum__custom_items_v_blocks_grid_gap";
  DROP TYPE "public"."enum__custom_items_v_blocks_grid_alignment";
  DROP TYPE "public"."enum__custom_items_v_blocks_grid_hover_effect";
  DROP TYPE "public"."enum__custom_items_v_blocks_timeline_layout";
  DROP TYPE "public"."enum__custom_items_v_blocks_timeline_line_style";
  DROP TYPE "public"."enum__custom_items_v_blocks_timeline_marker_style";
  DROP TYPE "public"."enum__custom_items_v_blocks_timeline_sort_order";
  DROP TYPE "public"."enum__custom_items_v_blocks_timeline_background_color";
  DROP TYPE "public"."enum__custom_items_v_blocks_archive_populate_by";
  DROP TYPE "public"."enum__custom_items_v_blocks_archive_relation_to";
  DROP TYPE "public"."enum__custom_items_v_blocks_archive_layout";
  DROP TYPE "public"."enum__custom_items_v_blocks_archive_columns";
  DROP TYPE "public"."enum__custom_items_v_blocks_form_style";
  DROP TYPE "public"."enum__custom_items_v_blocks_form_background_color";
  DROP TYPE "public"."enum__custom_items_v_blocks_spacer_style";
  DROP TYPE "public"."enum__custom_items_v_blocks_spacer_size";
  DROP TYPE "public"."enum__custom_items_v_blocks_spacer_line_style";
  DROP TYPE "public"."enum__custom_items_v_version_status";
  DROP TYPE "public"."enum_forms_confirmation_type";
  DROP TYPE "public"."enum_redirects_to_type";
  DROP TYPE "public"."enum_payload_jobs_log_task_slug";
  DROP TYPE "public"."enum_payload_jobs_log_state";
  DROP TYPE "public"."enum_payload_jobs_task_slug";
  DROP TYPE "public"."enum_header_nav_items_type";
  DROP TYPE "public"."enum_footer_social_links_platform";
  DROP TYPE "public"."enum_settings_social_profiles_platform";
  DROP TYPE "public"."enum_settings_active_preset";
  DROP TYPE "public"."enum_settings_default_skin";
  DROP TYPE "public"."enum_settings_default_mode";
  DROP TYPE "public"."enum_settings_frontend_framework";
  DROP TYPE "public"."enum_settings_frontend_site_type";
  DROP TYPE "public"."enum_navigation_settings_custom_links_insert_position";`)
}
