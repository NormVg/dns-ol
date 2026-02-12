import { db } from '../../utils/drizzle';
import { pages } from '../../database/schema';

export default defineEventHandler(async () => {
  const allPages = await db.select().from(pages).orderBy(pages.createdAt);
  return allPages;
});
