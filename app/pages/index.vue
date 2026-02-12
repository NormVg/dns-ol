<template>
  <div class="app">
    <header class="header">
      <div class="logo">
        <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
          <circle cx="12" cy="12" r="10" />
          <path d="M2 12h20M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z" />
        </svg>
        <span>DNS-OL</span>
      </div>
      <p class="subtitle">Custom Domain Manager</p>
    </header>

    <main class="main">
      <!-- Create Page Section -->
      <section class="card">
        <h2 class="card-title">
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/><polyline points="14 2 14 8 20 8"/><line x1="12" y1="18" x2="12" y2="12"/><line x1="9" y1="15" x2="15" y2="15"/></svg>
          Create Page
        </h2>
        <form @submit.prevent="createPage" class="form">
          <div class="form-row">
            <div class="field">
              <label>Title</label>
              <input v-model="newPage.title" placeholder="My Landing Page" required />
            </div>
            <div class="field">
              <label>Slug</label>
              <input v-model="newPage.slug" placeholder="my-landing-page" required />
            </div>
          </div>
          <div class="field">
            <label>Body HTML</label>
            <textarea v-model="newPage.bodyHtml" rows="4" placeholder="<h1>Welcome!</h1><p>This is my page.</p>"></textarea>
          </div>
          <button type="submit" class="btn btn-primary" :disabled="creatingPage">
            {{ creatingPage ? 'Creating...' : 'Create Page' }}
          </button>
        </form>
      </section>

      <!-- Pages List -->
      <section class="card">
        <h2 class="card-title">
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M4 19.5A2.5 2.5 0 0 1 6.5 17H20"/><path d="M6.5 2H20v20H6.5A2.5 2.5 0 0 1 4 19.5v-15A2.5 2.5 0 0 1 6.5 2z"/></svg>
          Pages
        </h2>
        <div v-if="pagesList.length === 0" class="empty">No pages yet. Create one above.</div>
        <div v-else class="table-wrap">
          <table>
            <thead>
              <tr>
                <th>ID</th>
                <th>Title</th>
                <th>Slug</th>
                <th>Preview</th>
              </tr>
            </thead>
            <tbody>
              <tr v-for="page in pagesList" :key="page.id">
                <td class="mono">{{ page.id }}</td>
                <td>{{ page.title }}</td>
                <td class="mono">{{ page.slug }}</td>
                <td><a :href="`/p/${page.id}`" target="_blank" class="link">Open →</a></td>
              </tr>
            </tbody>
          </table>
        </div>
      </section>

      <!-- Add Domain Section -->
      <section class="card">
        <h2 class="card-title">
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="12" cy="12" r="10"/><line x1="12" y1="8" x2="12" y2="16"/><line x1="8" y1="12" x2="16" y2="12"/></svg>
          Add Custom Domain
        </h2>
        <form @submit.prevent="addDomain" class="form">
          <div class="form-row">
            <div class="field">
              <label>Domain</label>
              <input v-model="newDomain.domain" placeholder="example.com" required />
            </div>
            <div class="field">
              <label>Link to Page</label>
              <select v-model="newDomain.pageId" required>
                <option value="" disabled>Select a page…</option>
                <option v-for="page in pagesList" :key="page.id" :value="page.id">
                  {{ page.title }} ({{ page.slug }})
                </option>
              </select>
            </div>
          </div>
          <button type="submit" class="btn btn-primary" :disabled="addingDomain">
            {{ addingDomain ? 'Adding...' : 'Add Domain' }}
          </button>
        </form>

        <!-- DNS Instructions -->
        <div v-if="dnsInfo" class="dns-box">
          <h3>✅ Domain added! Configure your DNS:</h3>
          <div class="dns-records">
            <div class="dns-record">
              <span class="dns-label">A Record</span>
              <code>76.76.21.21</code>
            </div>
            <div class="dns-record">
              <span class="dns-label">CNAME (subdomains)</span>
              <code>cname.vercel-dns.com</code>
            </div>
          </div>
          <p class="dns-note">Point your domain's DNS records to the values above. SSL is auto-provisioned.</p>
        </div>
      </section>

      <!-- Domains List -->
      <section class="card">
        <h2 class="card-title">
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="12" cy="12" r="10"/><path d="M2 12h20M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z"/></svg>
          Domains
        </h2>
        <div v-if="domainsList.length === 0" class="empty">No domains yet. Add one above.</div>
        <div v-else class="table-wrap">
          <table>
            <thead>
              <tr>
                <th>Domain</th>
                <th>Linked Page</th>
                <th>Status</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              <tr v-for="d in domainsList" :key="d.id">
                <td class="mono">{{ d.domain }}</td>
                <td>{{ d.pageTitle || `Page #${d.pageId}` }}</td>
                <td>
                  <span :class="['badge', d.verified ? 'badge-ok' : 'badge-pending']">
                    {{ d.verified ? 'Verified' : 'Pending' }}
                  </span>
                </td>
                <td class="actions">
                  <button @click="checkStatus(d)" class="btn btn-sm" :disabled="d.checking">
                    {{ d.checking ? '...' : 'Check' }}
                  </button>
                  <button @click="removeDomain(d)" class="btn btn-sm btn-danger" :disabled="d.deleting">
                    {{ d.deleting ? '...' : 'Remove' }}
                  </button>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </section>

      <!-- Status Modal -->
      <div v-if="statusModal" class="modal-overlay" @click.self="statusModal = null">
        <div class="modal">
          <h3>Domain Status: {{ statusModal.domain }}</h3>
          <pre class="status-json">{{ JSON.stringify(statusModal, null, 2) }}</pre>
          <button @click="statusModal = null" class="btn">Close</button>
        </div>
      </div>
    </main>
  </div>
</template>

<script setup lang="ts">
const newPage = ref({ title: '', slug: '', bodyHtml: '' });
const newDomain = ref({ domain: '', pageId: '' });
const creatingPage = ref(false);
const addingDomain = ref(false);
const dnsInfo = ref(false);
const statusModal = ref<any>(null);

const { data: pagesList, refresh: refreshPages } = await useFetch<any[]>('/api/pages');
const { data: domainsList, refresh: refreshDomains } = await useFetch<any[]>('/api/domains');

async function createPage() {
  creatingPage.value = true;
  try {
    await $fetch('/api/pages', {
      method: 'POST',
      body: newPage.value,
    });
    newPage.value = { title: '', slug: '', bodyHtml: '' };
    await refreshPages();
  } catch (e: any) {
    alert(e.data?.message || 'Failed to create page');
  } finally {
    creatingPage.value = false;
  }
}

async function addDomain() {
  addingDomain.value = true;
  dnsInfo.value = false;
  try {
    await $fetch('/api/domains', {
      method: 'POST',
      body: {
        domain: newDomain.value.domain,
        pageId: Number(newDomain.value.pageId),
      },
    });
    dnsInfo.value = true;
    newDomain.value = { domain: '', pageId: '' };
    await refreshDomains();
  } catch (e: any) {
    alert(e.data?.message || 'Failed to add domain');
  } finally {
    addingDomain.value = false;
  }
}

async function checkStatus(d: any) {
  d.checking = true;
  try {
    const status = await $fetch(`/api/domains/${d.id}/status`);
    statusModal.value = status;
    await refreshDomains();
  } catch (e: any) {
    alert(e.data?.message || 'Failed to check status');
  } finally {
    d.checking = false;
  }
}

async function removeDomain(d: any) {
  if (!confirm(`Remove domain "${d.domain}"?`)) return;
  d.deleting = true;
  try {
    await $fetch(`/api/domains/${d.id}`, { method: 'DELETE' });
    await refreshDomains();
  } catch (e: any) {
    alert(e.data?.message || 'Failed to remove domain');
  } finally {
    d.deleting = false;
  }
}
</script>

<style>
@import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&family=JetBrains+Mono:wght@400;500&display=swap');

* { margin: 0; padding: 0; box-sizing: border-box; }

:root {
  --bg: #0a0a0f;
  --surface: #12121a;
  --surface-2: #1a1a26;
  --border: #2a2a3a;
  --text: #e4e4ef;
  --text-dim: #8888a4;
  --accent: #6c63ff;
  --accent-glow: rgba(108, 99, 255, 0.15);
  --danger: #ff4d6a;
  --success: #34d399;
  --warning: #fbbf24;
  --radius: 12px;
}

body {
  background: var(--bg);
  color: var(--text);
  font-family: 'Inter', -apple-system, sans-serif;
  min-height: 100vh;
  -webkit-font-smoothing: antialiased;
}

.app {
  max-width: 860px;
  margin: 0 auto;
  padding: 40px 24px 80px;
}

.header {
  margin-bottom: 48px;
  text-align: center;
}

.logo {
  display: inline-flex;
  align-items: center;
  gap: 10px;
  font-size: 24px;
  font-weight: 700;
  color: var(--accent);
  letter-spacing: -0.5px;
}

.subtitle {
  color: var(--text-dim);
  margin-top: 8px;
  font-size: 14px;
}

.card {
  background: var(--surface);
  border: 1px solid var(--border);
  border-radius: var(--radius);
  padding: 28px;
  margin-bottom: 24px;
}

.card-title {
  display: flex;
  align-items: center;
  gap: 10px;
  font-size: 16px;
  font-weight: 600;
  margin-bottom: 20px;
  color: var(--text);
}

.form { display: flex; flex-direction: column; gap: 16px; }

.form-row {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 16px;
}

.field { display: flex; flex-direction: column; gap: 6px; }

.field label {
  font-size: 12px;
  font-weight: 500;
  color: var(--text-dim);
  text-transform: uppercase;
  letter-spacing: 0.5px;
}

.field input,
.field textarea,
.field select {
  background: var(--surface-2);
  border: 1px solid var(--border);
  border-radius: 8px;
  padding: 10px 14px;
  color: var(--text);
  font-family: inherit;
  font-size: 14px;
  transition: border-color 0.2s, box-shadow 0.2s;
  outline: none;
}

.field input:focus,
.field textarea:focus,
.field select:focus {
  border-color: var(--accent);
  box-shadow: 0 0 0 3px var(--accent-glow);
}

.field textarea { resize: vertical; }
.field select { cursor: pointer; }

.btn {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  gap: 6px;
  padding: 10px 20px;
  border: 1px solid var(--border);
  border-radius: 8px;
  background: var(--surface-2);
  color: var(--text);
  font-family: inherit;
  font-size: 13px;
  font-weight: 500;
  cursor: pointer;
  transition: all 0.15s;
}

.btn:hover { background: var(--border); }
.btn:disabled { opacity: 0.5; cursor: not-allowed; }

.btn-primary {
  background: var(--accent);
  border-color: var(--accent);
  color: #fff;
  align-self: flex-start;
}

.btn-primary:hover { background: #5a52e0; }

.btn-sm { padding: 6px 12px; font-size: 12px; }

.btn-danger { color: var(--danger); border-color: var(--danger); background: transparent; }
.btn-danger:hover { background: rgba(255, 77, 106, 0.1); }

.table-wrap { overflow-x: auto; }

table {
  width: 100%;
  border-collapse: collapse;
}

th {
  text-align: left;
  padding: 10px 14px;
  font-size: 11px;
  font-weight: 600;
  color: var(--text-dim);
  text-transform: uppercase;
  letter-spacing: 0.5px;
  border-bottom: 1px solid var(--border);
}

td {
  padding: 12px 14px;
  font-size: 14px;
  border-bottom: 1px solid rgba(42, 42, 58, 0.5);
}

.mono { font-family: 'JetBrains Mono', monospace; font-size: 13px; }

.link {
  color: var(--accent);
  text-decoration: none;
  font-size: 13px;
}
.link:hover { text-decoration: underline; }

.badge {
  display: inline-block;
  padding: 3px 10px;
  border-radius: 99px;
  font-size: 11px;
  font-weight: 600;
  text-transform: uppercase;
  letter-spacing: 0.3px;
}

.badge-ok { background: rgba(52, 211, 153, 0.15); color: var(--success); }
.badge-pending { background: rgba(251, 191, 36, 0.15); color: var(--warning); }

.actions { display: flex; gap: 8px; }

.empty {
  color: var(--text-dim);
  font-size: 14px;
  text-align: center;
  padding: 24px;
}

.dns-box {
  margin-top: 20px;
  padding: 20px;
  background: var(--accent-glow);
  border: 1px solid rgba(108, 99, 255, 0.3);
  border-radius: 8px;
}

.dns-box h3 {
  font-size: 14px;
  font-weight: 600;
  margin-bottom: 14px;
}

.dns-records { display: flex; flex-direction: column; gap: 10px; }

.dns-record {
  display: flex;
  align-items: center;
  gap: 12px;
}

.dns-label {
  font-size: 12px;
  font-weight: 600;
  color: var(--text-dim);
  min-width: 140px;
}

.dns-record code {
  background: var(--surface-2);
  padding: 6px 12px;
  border-radius: 6px;
  font-family: 'JetBrains Mono', monospace;
  font-size: 13px;
  color: var(--accent);
}

.dns-note {
  margin-top: 12px;
  font-size: 12px;
  color: var(--text-dim);
}

.modal-overlay {
  position: fixed;
  inset: 0;
  background: rgba(0, 0, 0, 0.7);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 100;
  backdrop-filter: blur(4px);
}

.modal {
  background: var(--surface);
  border: 1px solid var(--border);
  border-radius: var(--radius);
  padding: 28px;
  max-width: 600px;
  width: 90%;
  max-height: 80vh;
  overflow-y: auto;
}

.modal h3 {
  font-size: 16px;
  margin-bottom: 16px;
}

.status-json {
  background: var(--surface-2);
  border: 1px solid var(--border);
  border-radius: 8px;
  padding: 16px;
  font-family: 'JetBrains Mono', monospace;
  font-size: 12px;
  color: var(--text-dim);
  overflow-x: auto;
  margin-bottom: 16px;
  white-space: pre-wrap;
  word-break: break-all;
}

@media (max-width: 640px) {
  .form-row { grid-template-columns: 1fr; }
  .app { padding: 24px 16px 60px; }
}
</style>
