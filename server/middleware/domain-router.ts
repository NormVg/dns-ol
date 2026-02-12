import { db } from '../utils/drizzle';
import { domains } from '../database/schema';
import { eq } from 'drizzle-orm';

// Known app hostnames that should NOT be treated as custom domains
const APP_HOSTNAMES = new Set([
  'localhost',
  'localhost:3000',
  '127.0.0.1',
  '127.0.0.1:3000',
]);

export default defineEventHandler(async (event) => {
  const host = getRequestHost(event, { xForwardedHost: true });

  // Strip port for matching
  const hostname = host?.split(':')[0] ?? '';

  // Skip if this is our own app hostname or an API/asset request
  if (!host || APP_HOSTNAMES.has(host) || APP_HOSTNAMES.has(hostname)) return;

  const path = getRequestURL(event).pathname;
  if (path.startsWith('/api/') || path.startsWith('/_nuxt/') || path.startsWith('/__nuxt')) return;

  // If we're already on a /p/ route, don't rewrite again (prevents loops)
  if (path.startsWith('/p/')) return;

  // Look up the custom domain in DB
  const domainName = hostname || host;
  const [domainRecord] = await db
    .select({
      domainId: domains.id,
      domain: domains.domain,
      pageId: domains.pageId,
      verified: domains.verified,
    })
    .from(domains)
    .where(eq(domains.domain, domainName))
    .limit(1);

  if (!domainRecord) return;

  // Internally rewrite the path — no redirect, URL stays as-is
  const rewritePath = `/p/${domainRecord.pageId}`;
  event.node.req.url = rewritePath;
  event._path = rewritePath;
});
