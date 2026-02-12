const VERCEL_API = 'https://api.vercel.com';

function getHeaders() {
  return {
    Authorization: `Bearer ${process.env.VERCEL_TOKEN}`,
    'Content-Type': 'application/json',
  };
}

function getProjectId() {
  return process.env.VERCEL_PROJECT_ID!;
}

// Add a custom domain to the Vercel project
export async function addDomainToVercel(domain: string) {
  const res = await fetch(
    `${VERCEL_API}/v10/projects/${getProjectId()}/domains`,
    {
      method: 'POST',
      headers: getHeaders(),
      body: JSON.stringify({ name: domain }),
    }
  );
  return await res.json();
}

// Remove a custom domain from the Vercel project
export async function removeDomainFromVercel(domain: string) {
  const res = await fetch(
    `${VERCEL_API}/v9/projects/${getProjectId()}/domains/${domain}`,
    {
      method: 'DELETE',
      headers: getHeaders(),
    }
  );
  if (res.status === 204) return { success: true };
  return await res.json();
}

// Check domain configuration (DNS records, etc.)
export async function checkDomainConfig(domain: string) {
  const res = await fetch(
    `${VERCEL_API}/v6/domains/${domain}/config`,
    {
      headers: getHeaders(),
    }
  );
  return await res.json();
}

// Get domain verification info
export async function getDomainVerification(domain: string) {
  const res = await fetch(
    `${VERCEL_API}/v9/projects/${getProjectId()}/domains/${domain}`,
    {
      headers: getHeaders(),
    }
  );
  return await res.json();
}
