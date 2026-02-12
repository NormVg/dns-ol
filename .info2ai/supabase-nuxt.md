Here are the key **official docs and resources** for integrating **Nuxt (Nuxt 3/4) with Supabase**, covering setup, authentication, database access, and best practices:

---

## 📘 1. **Supabase Nuxt Module** (Official Module Docs)

The main integration point is the **@nuxtjs/supabase** module, which makes it easy to use Supabase features inside Nuxt apps (Nuxt 3 & Nuxt 4). It supports composables, auth, DB access, SSR, and TypeScript. ([Nuxt Supabase][1])

🔹 **Documentation:** [https://supabase.nuxtjs.org](https://supabase.nuxtjs.org) — covers installation, usage, and API reference. ([Nuxt Supabase][1])
👉 Features include:

* Vue 3 composables like `useSupabaseClient()`
* Auth support (sign-in, sign-up, session handling)
* Using Supabase in Nuxt server API routes
* TypeScript type support ([Nuxt][2])

---

## 📗 2. **Supabase Official Guide: Nuxt Quickstart**

Supabase’s own docs include a **Nuxt quickstart** that walks through creating a Supabase project, setting up environment variables, and querying data from a Nuxt application. ([Supabase][3])

🔹 **Core topics in this guide:**

* Creating a Supabase project
* Defining database tables and policies
* Installing Supabase client libraries
* Configuring keys and env variables (`SUPABASE_URL`, `SUPABASE_KEY`)
* Querying database from Nuxt app components ([Supabase][3])

---

## 🎯 3. **Supabase Authentication Guides**

For implementing login/onboarding flows with email/password, magic links, OAuth, etc., Supabase has dedicated **Auth docs** (not Nuxt-specific but applicable). ([Supabase][4])

🔹 Topics covered:

* Password-based and social auth
* JWT usage
* Token handling and security
  These help when building auth flows in Nuxt. ([Supabase][4])

---

## 📌 4. **SSR & Auth with Supabase**

Supabase officially supports Server-Side Rendering (SSR) flows. While not Nuxt-specific, this guide explains how to store sessions and tokens for SSR apps (important when using Nuxt SSR). ([Supabase][5])

🔹 Key points:

* Store user session in cookies (instead of local storage)
* Use `@supabase/ssr` helpers to simplify SSR integration
  This is relevant for Nuxt apps rendering on the server. ([Supabase][5])

---

## 📚 Community Tutorials (Useful for Practical Examples)

These aren’t official, but they help with real code examples:

* Full blog on integrating Nuxt and Supabase with auth, CRUD, and real-time capabilities (step-by-step) — covers setup and project structure. ([chat2db.ai][6])
* Medium/Dev.to guides showing how to install the Supabase module, configure `.env`, and implement sign-in/sign-up inside Nuxt. ([Medium][7])
* Tutorials demonstrating OAuth setup in Nuxt with Supabase (e.g., Google OAuth). ([Medium][8])

---

## 🛠️ Quick Setup Summary

1. **Install the Supabase Nuxt module**

   ```bash
   npm install @nuxtjs/supabase
   ```

   Add it to `nuxt.config.ts` under `modules`. ([Nuxt][2])

2. **Add environment variables**

   ```env
   SUPABASE_URL=your-supabase-url
   SUPABASE_KEY=your-anon-key
   ```

   Get them from the Supabase dashboard. ([Supabase][3])

3. **Use Supabase composables**

   ```js
   const supabase = useSupabaseClient()
   await supabase.from('table').select('*')
   ```

   For auth:

   ```js
   const { data, error } = await supabase.auth.signInWithOtp({ email })
   ```

   These composables work in Nuxt pages/plugins. ([Nuxt Supabase][1])

4. **Optional: SSR & API routes**
   You can use Supabase in Nuxt server routes (e.g., `/server/api/*.ts`) for server-side logic. ([Nuxt Supabase][1])

---

## 📌 Official References (Links)

* **Supabase Nuxt Module Docs:** [https://supabase.nuxtjs.org](https://supabase.nuxtjs.org) ([Nuxt Supabase][1])
* **Supabase Official Quickstart — Nuxt:** [https://supabase.com/docs/guides/getting-started/quickstarts/nuxtjs](https://supabase.com/docs/guides/getting-started/quickstarts/nuxtjs) ([Supabase][3])
* **General Supabase Docs:** [https://supabase.com/docs](https://supabase.com/docs) ([Supabase][9])

