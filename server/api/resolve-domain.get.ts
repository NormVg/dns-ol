import { db } from '../utils/drizzle';
import { domains, pages } from '../database/schema';
import { eq } from 'drizzle-orm';

// Returns the linked page data if the request is from a custom domain.
// Returns null if it's the main app domain.
export default defineEventHandler(async (event) => {
  const host = getRequestHost(event, { xForwardedHost: true });
  const hostname = host?.split(':')[0] ?? '';

  // Known app hostnames — not custom domains
  const appHosts = ['localhost', '127.0.0.1'];
  if (appHosts.includes(hostname)) return null;

  // Look up domain in DB
  const [domainRecord] = await db
    .select()
    .from(domains)
    .where(eq(domains.domain, hostname))
    .limit(1);

  if (!domainRecord) return null;

  // Fetch linked page
  const [page] = await db
    .select()
    .from(pages)
    .where(eq(pages.id, domainRecord.pageId))
    .limit(1);

  return page || null;
});
