# Setup Guide - Google OAuth Configuration

Your Supabase project is connected and the database is ready! Now you just need to configure Google OAuth.

## ✅ Already Done

- ✅ Supabase project connected (oxpntgvgnjlvbjjhwzww)
- ✅ Database schema created with sample resources
- ✅ Environment variables configured
- ✅ Edge runtime enabled for Cloudflare Pages

## 🔐 Configure Google OAuth (Required)

### Step 1: Create Google OAuth Credentials

1. Go to [Google Cloud Console](https://console.cloud.google.com)
2. Create a new project or select an existing one
3. Navigate to **APIs & Services → Credentials**
4. Click **Create Credentials → OAuth 2.0 Client ID**
5. If prompted, configure the OAuth consent screen:
   - User Type: **External**
   - App name: **vibecodeee Community**
   - User support email: Your email
   - Developer contact: Your email
   - Add scopes: `email`, `profile`, `openid`
6. Create OAuth Client ID:
   - Application type: **Web application**
   - Name: **vibecodeee Community**
   - Authorized JavaScript origins:
     - `https://oxpntgvgnjlvbjjhwzww.supabase.co`
     - `http://localhost:3000` (for development)
   - Authorized redirect URIs:
     - `https://oxpntgvgnjlvbjjhwzww.supabase.co/auth/v1/callback`
     - `http://localhost:3000/auth/callback` (for development)
7. Copy your **Client ID** and **Client Secret**

### Step 2: Configure Supabase

1. Go to your [Supabase Dashboard](https://supabase.com/dashboard/project/oxpntgvgnjlvbjjhwzww)
2. Navigate to **Authentication → Providers**
3. Find **Google** in the list and click to expand
4. Enable the Google provider
5. Enter your Google **Client ID** and **Client Secret**
6. Click **Save**

### Step 3: Add Site URL

1. In Supabase Dashboard, go to **Authentication → URL Configuration**
2. Set **Site URL** to your production URL (e.g., `https://yourdomain.com`)
3. Add **Redirect URLs**:
   - `https://yourdomain.com/auth/callback`
   - `http://localhost:3000/auth/callback`

## 🚀 Test the Application

### Local Development

```bash
npm run dev
```

Visit http://localhost:3000 and:
1. Click **Sign In**
2. Click **Continue with Google**
3. Authorize with your Google account
4. You should be redirected to `/resources` with sample content

### Deploy to Cloudflare Pages

1. Connect your repository to Cloudflare Pages
2. Build settings:
   - **Build command**: `npm run build`
   - **Build output directory**: `.next`
   - **Framework preset**: Next.js
3. Add environment variables in Cloudflare:
   - `NEXT_PUBLIC_SUPABASE_URL`
   - `NEXT_PUBLIC_SUPABASE_ANON_KEY`
   - `SUPABASE_SERVICE_ROLE_KEY` (get from Supabase Dashboard → Settings → API)

## 📝 What's Already Working

- Premium landing page with scroll animations
- Google OAuth authentication flow
- Protected member dashboard at `/resources`
- 10 sample resources in different categories
- User profile page
- Category filtering
- Edge runtime compatibility for Cloudflare Pages

## 🎨 Customization

### Add Your Own Resources

Use Supabase Table Editor:
1. Go to **Table Editor → resources**
2. Click **Insert row**
3. Fill in: title, description, category, icon (emoji), url
4. Set `is_featured` to `true` for highlighted resources

### Update Landing Page Content

Edit these components in `/components/landing/`:
- `Hero.tsx` - Main headline and CTA
- `TopicsGrid.tsx` - Category tiles
- `Benefits.tsx` - Value propositions
- `Footer.tsx` - Footer links

## 🔧 Troubleshooting

### "Invalid redirect URL" error
- Make sure you added the exact redirect URI to Google Console
- Check that the Site URL is configured in Supabase

### "Failed to fetch resources" error
- Verify you're signed in (check browser console)
- Check that the database migration was applied
- Ensure RLS policies are enabled

### Edge runtime errors
- All API routes use `export const config = { runtime: 'edge' }`
- Uses native Web APIs (Request/Response) instead of Next.js types

## 📚 Additional Resources

- [Supabase Auth Docs](https://supabase.com/docs/guides/auth)
- [Google OAuth Setup](https://support.google.com/cloud/answer/6158849)
- [Cloudflare Pages Docs](https://developers.cloudflare.com/pages/)

---

**Need help?** Check the [Supabase Dashboard](https://supabase.com/dashboard/project/oxpntgvgnjlvbjjhwzww) for logs and debugging tools.
