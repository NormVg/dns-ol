import { pgTable, serial, text, timestamp, integer, boolean } from 'drizzle-orm/pg-core';

// Pages — the content that gets served on custom domains
export const pages = pgTable('pages', {
  id: serial('id').primaryKey(),
  title: text('title').notNull(),
  slug: text('slug').notNull().unique(),
  bodyHtml: text('body_html').notNull().default('<h1>Hello World</h1>'),
  createdAt: timestamp('created_at').defaultNow().notNull(),
  updatedAt: timestamp('updated_at').defaultNow().notNull(),
});

// Domains — maps custom domains to pages
export const domains = pgTable('domains', {
  id: serial('id').primaryKey(),
  domain: text('domain').notNull().unique(),
  pageId: integer('page_id').references(() => pages.id, { onDelete: 'cascade' }).notNull(),
  verified: boolean('verified').default(false).notNull(),
  createdAt: timestamp('created_at').defaultNow().notNull(),
});
