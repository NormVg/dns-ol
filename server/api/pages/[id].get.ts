import { db } from '../../utils/drizzle';
import { pages } from '../../database/schema';
import { eq } from 'drizzle-orm';

export default defineEventHandler(async (event) => {
  const id = Number(getRouterParam(event, 'id'));

  const [page] = await db.select().from(pages).where(eq(pages.id, id));

  if (!page) {
    throw createError({ statusCode: 404, statusMessage: 'Page not found' });
  }

  return page;
});
