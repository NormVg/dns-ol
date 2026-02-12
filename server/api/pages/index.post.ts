import { db } from '../../utils/drizzle';
import { pages } from '../../database/schema';

export default defineEventHandler(async (event) => {
  const body = await readBody(event);

  if (!body.title || !body.slug) {
    throw createError({ statusCode: 400, statusMessage: 'title and slug are required' });
  }

  const [page] = await db.insert(pages).values({
    title: body.title,
    slug: body.slug,
    bodyHtml: body.bodyHtml || '<h1>Hello World</h1>',
  }).returning();

  return page;
});
