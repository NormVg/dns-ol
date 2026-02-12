import { db } from '../../utils/drizzle';
import { domains, pages } from '../../database/schema';
import { eq } from 'drizzle-orm';

export default defineEventHandler(async () => {
  const allDomains = await db
    .select({
      id: domains.id,
      domain: domains.domain,
      verified: domains.verified,
      pageId: domains.pageId,
      pageTitle: pages.title,
      pageSlug: pages.slug,
      createdAt: domains.createdAt,
    })
    .from(domains)
    .leftJoin(pages, eq(domains.pageId, pages.id))
    .orderBy(domains.createdAt);

  return allDomains;
});
