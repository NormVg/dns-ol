import { db } from '../utils/drizzle';
import { domains } from '../database/schema';
import { eq } from 'drizzle-orm';

export default defineEventHandler(async (event) => {
  const hostname = event.node.req.headers.host || '';
  const path = event.node.req.url || '/';

  // Skip static assets, API routes, and already-rewritten paths
  if (
    path.startsWith('/api') ||
    path.startsWith('/_nuxt') ||
    path.startsWith('/__nuxt') ||
    path.startsWith('/p/') ||
    /\.(js|css|png|jpg|jpeg|gif|svg|ico|woff|woff2|ttf|webp|json|map)$/.test(path)
  ) {
    return;
  }

  // Only rewrite for custom domains — skip if it's the main app domain
  const isCustomDomain =
    hostname &&
    !hostname.includes('vercel.app') &&
    !hostname.includes('localhost') &&
    !hostname.includes('127.0.0.1');

  if (!isCustomDomain) return;

  // Look up which page this domain maps to
  const domainHost = (hostname.split(':')[0] || '').trim();
  if (!domainHost) return;

  const [domainRecord] = await db
    .select()
    .from(domains)
    .where(eq(domains.domain, domainHost))
    .limit(1);

  if (!domainRecord) return;

  // Internally rewrite the URL to the page route
  const newPath = `/p/${domainRecord.pageId}`;
  event.node.req.url = newPath;
});
