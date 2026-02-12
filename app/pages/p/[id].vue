<template>
  <div class="public-page" v-if="page">
    <div class="page-content" v-html="page.bodyHtml"></div>
  </div>
  <div class="public-page error-page" v-else-if="error">
    <div class="error-box">
      <svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" opacity="0.4">
        <circle cx="12" cy="12" r="10" />
        <line x1="15" y1="9" x2="9" y2="15" />
        <line x1="9" y1="9" x2="15" y2="15" />
      </svg>
      <h1>Page Not Found</h1>
      <p>The page you're looking for doesn't exist.</p>
    </div>
  </div>
</template>

<script setup lang="ts">
const route = useRoute();
const pageId = route.params.id;

const { data: page, error } = await useFetch(`/api/pages/${pageId}`);
</script>

<style>
.public-page {
  min-height: 100vh;
  background: #0a0a0f;
  color: #e4e4ef;
  font-family: 'Inter', -apple-system, sans-serif;
}

.page-content {
  max-width: 800px;
  margin: 0 auto;
  padding: 60px 24px;
}

.page-content h1 {
  font-size: 48px;
  font-weight: 700;
  line-height: 1.15;
  margin-bottom: 24px;
  letter-spacing: -1px;
}

.page-content h2 {
  font-size: 28px;
  font-weight: 600;
  margin: 32px 0 12px;
}

.page-content p {
  font-size: 17px;
  line-height: 1.7;
  color: #a0a0b8;
  margin-bottom: 16px;
}

.page-content a {
  color: #6c63ff;
}

.error-page {
  display: flex;
  align-items: center;
  justify-content: center;
}

.error-box {
  text-align: center;
}

.error-box h1 {
  font-size: 24px;
  font-weight: 600;
  margin: 20px 0 8px;
}

.error-box p {
  color: #8888a4;
  font-size: 14px;
}
</style>
