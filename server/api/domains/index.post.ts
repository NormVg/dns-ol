import { db } from '../../utils/drizzle';
import { domains } from '../../database/schema';
import { addDomainToVercel } from '../../utils/vercel';

export default defineEventHandler(async (event) => {
  const body = await readBody(event);

  if (!body.domain || !body.pageId) {
    throw createError({ statusCode: 400, statusMessage: 'domain and pageId are required' });
  }

  // 1. Add domain to Vercel
  const vercelResponse = await addDomainToVercel(body.domain);

  if (vercelResponse.error) {
    throw createError({
      statusCode: 400,
      statusMessage: vercelResponse.error.message || 'Failed to add domain to Vercel',
    });
  }

  // 2. Save to database
  const [domain] = await db.insert(domains).values({
    domain: body.domain,
    pageId: body.pageId,
    verified: false,
  }).returning();

  return { domain, vercel: vercelResponse };
});
