import { db } from '../../utils/drizzle';
import { domains } from '../../database/schema';
import { eq } from 'drizzle-orm';
import { removeDomainFromVercel } from '../../utils/vercel';

export default defineEventHandler(async (event) => {
  const id = Number(getRouterParam(event, 'id'));

  // 1. Get domain from DB
  const [existing] = await db.select().from(domains).where(eq(domains.id, id));

  if (!existing) {
    throw createError({ statusCode: 404, statusMessage: 'Domain not found' });
  }

  // 2. Remove from Vercel
  await removeDomainFromVercel(existing.domain);

  // 3. Delete from DB
  await db.delete(domains).where(eq(domains.id, id));

  return { success: true };
});
