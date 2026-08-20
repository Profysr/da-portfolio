# Vercel Serverless Function & GitHub API Integration Guide

This document explains how dynamic GitHub API data is fetched securely and efficiently in this portfolio using a **Vercel Serverless Function** (`/api/github`), avoiding security risks and rate limiting issues.

---

## 🏗 Architecture Overview

```
 ┌────────────────────────┐         ┌────────────────────────┐         ┌────────────────────────┐
 │                        │  fetch  │ Vercel Serverless      │  fetch  │                        │
 │ Browser (Vite / React) │ ──────> │ Function (/api/github) │ ──────> │ GitHub API             │
 │                        │ <────── │                        │ <────── │ (GraphQL & REST v3)    │
 └────────────────────────┘         └────────────────────────┘         └────────────────────────┘
                                                │
                                                ▼
                                    Cached on Vercel CDN Edge
                                      (s-maxage = 1 hour)
```

---

## 🔒 Why This Approach? (Security & Safety)

### 1. Token Protection
- **Problem**: In Vite apps, environment variables starting with `VITE_` are bundled directly into frontend JavaScript assets. If you put a GitHub Personal Access Token in `VITE_GITHUB_TOKEN`, any user visiting your website can inspect Chrome DevTools and steal your token.
- **Solution**: The secret token is named `GITHUB_TOKEN` and stored **only** in Vercel's environment settings. The browser **never** sees or receives the token.

### 2. Rate Limits & CDN Edge Caching
- **Unauthenticated REST**: GitHub allows only 60 requests/hour per IP.
- **Authenticated (Serverless)**: GitHub allows 5,000 requests/hour.
- **Vercel Edge Caching**: Our serverless function sets the `Cache-Control` header:
  ```http
  Cache-Control: public, s-maxage=3600, stale-while-revalidate=86400
  ```
  Vercel's global CDN caches the API response for **1 hour (3600 seconds)**. Even if 100,000 visitors load your portfolio, Vercel only calls GitHub **once per hour**, ensuring lightning-fast load times and zero rate-limit issues.

---

## 📁 Key Files Created / Modified

| File Path | Description |
| :--- | :--- |
| [`/api/github.js`](file:///c:/Users/mprof/OneDrive/Desktop/da-portfolio/api/github.js) | Vercel Serverless Function that fetches GitHub profile data, repositories count, total stars/forks, and GraphQL contribution calendar. |
| [`/src/hooks/useGitHubStats.js`](file:///c:/Users/mprof/OneDrive/Desktop/da-portfolio/src/hooks/useGitHubStats.js) | Custom React hook that fetches `/api/github` data and includes an automatic fallback to GitHub REST API during local Vite dev. |
| [`/src/components/Heatmap.jsx`](file:///c:/Users/mprof/OneDrive/Desktop/da-portfolio/src/components/Heatmap.jsx) | Heatmap component updated to render live GitHub contribution calendar data or fallback smoothly. |
| [`/src/sections/HomePage/About.jsx`](file:///c:/Users/mprof/OneDrive/Desktop/da-portfolio/src/sections/HomePage/About.jsx) | Integrated dynamic GitHub stats into the Bento grid (Live Repos count, total stars, and contribution velocity). |

---

## 🚀 How to Set Up & Deploy

### Step 1: Generate a GitHub Personal Access Token (Optional but Recommended)
1. Go to **GitHub -> Settings -> Developer Settings -> Personal Access Tokens (Fine-grained tokens or Tokens classic)**.
2. Generate a read-only token (Scope: `public_repo` or `read:user`).

### Step 2: Add Environment Variables in Vercel
1. Open your project on the [Vercel Dashboard](https://vercel.com).
2. Go to **Settings -> Environment Variables**.
3. Add the following variables:
   - `GITHUB_USERNAME` = `Profysr` (or your GitHub username)
   - `GITHUB_TOKEN` = `ghp_your_secret_token_here`

### Step 3: Local Testing
- **Option A (Vercel CLI - Recommended)**:
  Run `npx vercel dev` to test both Vite frontend and Vercel Serverless Functions locally.
- **Option B (Standard Vite Server)**:
  Run `npm run dev`. The custom hook `useGitHubStats` will detect that `/api/github` is unavailable locally and gracefully fallback to fetching public REST stats.

---

## 📊 API Response Payload (`GET /api/github`)

```json
{
  "username": "Profysr",
  "name": "Profysr",
  "avatarUrl": "https://avatars.githubusercontent.com/u/...",
  "bio": "Full Stack Developer",
  "location": "Pakistan",
  "publicRepos": 24,
  "followers": 15,
  "following": 8,
  "totalStars": 42,
  "totalForks": 10,
  "totalContributions": 482,
  "contributionCalendar": { ... },
  "updatedAt": "2026-08-20T23:56:00.000Z",
  "isAuthenticated": true
}
```
