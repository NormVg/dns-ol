I'll help you set up custom domains for user-generated pages on Vercel. Here's how to implement this:

## Overview

You'll need to use Vercel's **Domains API** to programmatically add custom domains to your project. This allows users to point their own domains to pages in your app.

## Implementation Steps

### 1. **Get a Vercel API Token**
- Go to Vercel Dashboard → Settings → Tokens
- Create a new token with appropriate permissions
- Store it securely in your environment variables

### 2. **Add Domain via API**

```javascript
// Add a custom domain to your Vercel project
async function addCustomDomain(domain, userId) {
  const response = await fetch(
    `https://api.vercel.com/v10/projects/${process.env.VERCEL_PROJECT_ID}/domains`,
    {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${process.env.VERCEL_TOKEN}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        name: domain, // e.g., "example.com" or "subdomain.example.com"
      }),
    }
  );

  const data = await response.json();
  return data;
}
```

### 3. **Handle Domain Verification**

When a domain is added, Vercel will provide DNS records that users need to configure:

```javascript
// Check domain configuration status
async function checkDomainStatus(domain) {
  const response = await fetch(
    `https://api.vercel.com/v9/projects/${process.env.VERCEL_PROJECT_ID}/domains/${domain}/config`,
    {
      headers: {
        'Authorization': `Bearer ${process.env.VERCEL_TOKEN}`,
      },
    }
  );

  return await response.json();
}
```

### 4. **Route Requests to Correct Pages**

In your app, detect the custom domain and serve the right content:

```javascript
// In your Next.js middleware or API route
export function middleware(request) {
  const hostname = request.headers.get('host');

  // Check if hostname is a custom domain
  // Query your database to find which user/page it belongs to
  const pageData = await getPageByDomain(hostname);

  if (pageData) {
    // Rewrite to the correct page
    return NextResponse.rewrite(new URL(`/page/${pageData.id}`, request.url));
  }
}
```

### 5. **DNS Configuration (What Users Need to Do)**

Users need to add DNS records:
- **A Record**: Point to Vercel's IP: `76.76.21.21`
- **CNAME Record** (for subdomains): Point to `cname.vercel-dns.com`

## Key Considerations

- **Domain Verification**: Domains must be verified before they work
- **SSL Certificates**: Vercel automatically provisions SSL (Let's Encrypt)
- **Limits**: Check Vercel's plan limits for custom domains
- **Database**: Store domain-to-page mappings in your database
- **Wildcards**: Consider if you want to support `*.yourdomain.com` for subdomains

