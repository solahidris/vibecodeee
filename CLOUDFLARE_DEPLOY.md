# Cloudflare Pages Deployment Guide

Your app is now fully Edge-compatible and ready for Cloudflare Pages! ✅

## ✅ What's Fixed

1. **Edge Runtime**: All API routes now use `export const config = { runtime: 'edge' }`
2. **Native Web APIs**: Uses Request/Response instead of Next.js-specific types
3. **Supabase Connection**: Connected to your live project (oxpntgvgnjlvbjjhwzww)
4. **Database Schema**: Applied with 10 sample resources
5. **Build Verified**: Successfully compiles with no errors

## 🚀 Deploy to Cloudflare Pages

### Step 1: Push to GitHub

```bash
git add .
git commit -m "Add Supabase auth and Edge runtime support"
git push origin main
```

### Step 2: Connect to Cloudflare Pages

1. Go to [Cloudflare Dashboard](https://dash.cloudflare.com)
2. Navigate to **Workers & Pages → Create application → Pages**
3. Connect your GitHub repository
4. Select **vibecodeee** repository

### Step 3: Configure Build Settings

- **Production branch**: `main`
- **Build command**: `npm run build`
- **Build output directory**: `.next`
- **Framework preset**: `Next.js`

### Step 4: Add Environment Variables

In Cloudflare Pages → Settings → Environment variables, add:

```
NEXT_PUBLIC_SUPABASE_URL = https://oxpntgvgnjlvbjjhwzww.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY = eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im94cG50Z3ZnbmpsdmJqamh3end3Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzAxNzQ1ODIsImV4cCI6MjA4NTc1MDU4Mn0.gWpBJ0ep_d_wAyuDl1rTUTTLkM17LelT3efJkhwdLiE
```

⚠️ **Important**: Get the `SUPABASE_SERVICE_ROLE_KEY` from Supabase Dashboard → Settings → API and add it as well (keep it secret!)

### Step 5: Deploy

Click **Save and Deploy**. Your site will be live at `https://vibecodeee.pages.dev`

## 🔐 Configure Google OAuth for Production

After deployment, update your Google OAuth settings:

1. **Google Console** → Credentials → Your OAuth Client
2. Add authorized redirect URI:
   - `https://vibecodeee.pages.dev/auth/callback`
   - `https://your-custom-domain.com/auth/callback` (if using custom domain)

3. **Supabase Dashboard** → Authentication → URL Configuration
4. Add redirect URL:
   - `https://vibecodeee.pages.dev/auth/callback`
   - Update Site URL to your production domain

## 📊 Edge Runtime Routes

These routes run on Cloudflare's Edge network (marked with ƒ):

- `/api/auth/logout` - Sign out endpoint
- `/api/resources` - Fetch resources (authenticated)
- `/api/hello` - Example API route

All using native Web APIs for maximum compatibility!

## 🎯 Next Steps

1. Complete Google OAuth setup (see SETUP.md)
2. Test authentication locally: `npm run dev`
3. Push to GitHub and deploy to Cloudflare
4. Add your custom domain in Cloudflare Pages
5. Customize resources and landing page content

## 🔍 Verify Deployment

After deploying, test these URLs:

- `https://vibecodeee.pages.dev` - Landing page
- `https://vibecodeee.pages.dev/login` - Sign in page
- `https://vibecodeee.pages.dev/resources` - Protected resources (after login)

## 💡 Pro Tips

- **Custom Domain**: Add in Cloudflare Pages → Custom domains
- **Analytics**: Enable in Cloudflare Pages → Analytics
- **Preview Deployments**: Every PR gets a preview URL
- **Instant Rollbacks**: One-click rollback to previous deployments

---

**All set!** Your premium community platform is ready for production. 🎉
