Here’s a clear overview of the **Nuxt 4 directory structure** and what each folder/file represents in a typical Nuxt 4 project: ([Nuxt][1])

---

## 📌 Root Level

* **nuxt.config.ts** – Main configuration file for your Nuxt app (routing, modules, plugins, build settings). ([Nuxt][1])
* **.nuxt/** – Auto-generated build/dev files (ignore this in version control). ([Nuxt][2])
* **.output/** – Production build output. ([Nuxt][2])
* **package.json** – Dependencies and scripts. (Standard Node project file)

---

## 🧱 `app/` – Core Application Code

This is the main directory for your application logic; many key folders used in Nuxt go here. ([Nuxt][1])

```
app/
 ├── assets/
 ├── components/
 ├── composables/
 ├── layouts/
 ├── middleware/
 ├── pages/
 ├── plugins/
 ├── utils/
 ├── app.vue
 └── app.config.ts
```

Here’s what each part does:

* **assets/** – Unprocessed assets like SCSS, images, fonts. ([Nuxt][1])
* **components/** – Vue components auto-imported by Nuxt. ([Nuxt][3])
* **composables/** – Vue composables (`useSomething()` functions). ([Nuxt][1])
* **layouts/** – Page wrappers (e.g., default layout). ([Nuxt][1])
* **middleware/** – Logic that runs before navigation. ([Nuxt][1])
* **pages/** – File-based routes; each `.vue` becomes a route. ([Nuxt][4])
* **plugins/** – Third-party or reusable plugin setup. ([Nuxt][1])
* **utils/** – General helper functions. ([Nuxt][1])
* **app.vue** – Root Vue component for the app. ([Nuxt][5])
* **app.config.ts** – app-specific config (reactive). ([Nuxt][1])

> **Note:** This centralized `app/` directory is a key change in Nuxt 4, improving organization and IDE performance. ([Vue School][6])

---

## 📂 `public/` – Static Assets

Files here are served as-is (no processing), e.g., `favicon.ico`, `robots.txt`. ([Nuxt][1])

```
public/
 ├── favicon.ico
 └── robots.txt
```

---

## 🧠 `server/` – API & Server Logic

Use this for backend code, APIs, and server-only logic. ([Nuxt][7])

```
server/
 ├── api/         # API endpoints (Nitro handlers)
 ├── routes/      # Custom server routes
 ├── middleware/  # Runs before server routes
 ├── plugins/     # Server plugin hooks
 └── utils/       # Server-only helpers
```

---

## 🔄 `shared/` – Shared Code

Code that runs on **both client and server** (like shared utilities) goes here. ([Nuxt][8])

```
shared/
 ├── utils/
 └── types/
```

---

## 📦 Optional & Additional

* **content/** – Used with `@nuxt/content` module for a file-based CMS (Markdown, MDX). ([Nuxt][1])
* **modules/** – Local Nuxt modules/extensions. ([Nuxt][1])
* **layers/** – Layered project structure (rare, advanced). ([Nuxt][1])

---

## 🧠 Auto-generation & Build Output

* **.nuxt/** – Contains automatic generated code, routes, internal modules (don’t edit). ([Nuxt][2])
* **.output/** – Final bundle after building for production. ([Nuxt][2])

---

## 🧩 Summary of Key Concepts

| Folder           | Purpose                                       |
| ---------------- | --------------------------------------------- |
| `app/`           | Main app logic (routing, components, layouts) |
| `public/`        | Static assets                                 |
| `server/`        | Server APIs & backend logic                   |
| `shared/`        | Code usable everywhere                        |
| `.nuxt/`         | Dev build files                               |
| `.output/`       | Production build files                        |
| `nuxt.config.ts` | Configuration entry point                     |

---
