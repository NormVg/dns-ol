import { db } from '../../../utils/drizzle';
import { domains } from '../../../database/schema';
import { eq } from 'drizzle-orm';
import { checkDomainConfig, getDomainVerification } from '../../../utils/vercel';

export default defineEventHandler(async (event) => {
  const id = Number(getRouterParam(event, 'id'));

  // 1. Get domain from DB
  const [existing] = await db.select().from(domains).where(eq(domains.id, id));

  if (!existing) {
    throw createError({ statusCode: 404, statusMessage: 'Domain not found' });
  }

  // 2. Check config & verification from Vercel
  const [config, verification] = await Promise.all([
    checkDomainConfig(existing.domain),
    getDomainVerification(existing.domain),
  ]);

  // 3. Update verified status in DB if configured
  const isVerified = config.misconfigured === false;
  if (isVerified !== existing.verified) {
    await db.update(domains).set({ verified: isVerified }).where(eq(domains.id, id));
  }

  return {
    domain: existing.domain,
    verified: isVerified,
    config,
    verification,
  };
});
