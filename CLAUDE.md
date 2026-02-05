# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

This is a Next.js application (using Pages Router) for a premium community platform with Supabase authentication. The app features a polished landing page, Google OAuth sign-in, and member-only resource access. Built with TypeScript, React 19, Tailwind CSS v4, and Supabase.

## Development Commands

```bash
# Start development server (http://localhost:3000)
npm run dev

# Production build
npm run build

# Start production server
npm start

# Run linter
npm run lint
```

## Environment Setup

Before running the app, configure your credentials in `.env.local`:

```bash
# Supabase
NEXT_PUBLIC_SUPABASE_URL=your_supabase_project_url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key
SUPABASE_SERVICE_ROLE_KEY=your_service_role_key

# HitPay Payment Gateway
HITPAY_API_KEY=your_hitpay_api_key
HITPAY_API_SALT=your_hitpay_api_salt
HITPAY_WEBHOOK_SALT=your_hitpay_webhook_salt
```

Get Supabase keys from: https://app.supabase.com -> Project Settings -> API
Get HitPay API keys from: https://dashboard.hit-pay.com/settings/api-keys
Get HitPay Webhook Salt from: https://dashboard.hit-pay.com/settings/webhooks (under Event Webhooks)

## Architecture

**Framework**: Next.js 16.1.6 with Pages Router (not App Router)

**Authentication**: Supabase with Google OAuth (via @supabase/ssr)

**Database**: PostgreSQL via Supabase with Row Level Security (RLS)

**Key Directories**:
- `/pages` - Page routes and API routes
  - `/pages/api` - API routes for auth and resources
  - `/pages/auth` - Auth callback handler
  - `/pages/resources` - Protected member dashboard
  - `/pages/events.tsx` - Upcoming events calendar page
  - `/pages/login.tsx` - Google OAuth sign-in page
  - `/pages/profile.tsx` - User profile page with subscription status
  - `/pages/payment/subscribe.tsx` - Subscription/pricing page (black card design)
  - `/pages/payment/success.tsx` - Payment success page with auto-activation fallback
  - `/pages/resources/prompt/basic.tsx` - Educational course page (basic prompting)
  - `/pages/resources/prompt/python.tsx` - Educational course page (Python automation)
  - `/pages/index.tsx` - Public landing page
- `/components` - Reusable UI and landing page components
  - `/components/ui` - Base UI components (Button, Card, Avatar, etc.)
  - `/components/landing` - Landing page sections (Hero, Navigation, Footer)
  - `/components/layout` - Layout components (Header)
- `/contexts` - React context providers (AuthContext, UserContext)
- `/lib` - Core utilities
  - `/lib/supabase` - Supabase client initialization (browser & server)
  - `/lib/auth` - Authentication HOC (withAuth)
  - `/lib/utils` - Utility functions (cn, formatters)
- `/hooks` - Custom React hooks (useScrollAnimation, useMediaQuery)
- `/types` - TypeScript type definitions
- `/supabase/migrations` - Database schema migrations
- `/styles` - Global CSS with premium design tokens

**Styling**: Tailwind CSS v4 with premium design system (Apple/Stripe-inspired). Uses utility-first approach with custom design tokens in globals.css.

**TypeScript**: Path alias `@/*` maps to project root. Strict mode enabled.

**Fonts**: Primary font is Geist Sans (used consistently across all pages).

## Authentication Flow

1. User clicks "Sign In" → redirected to `/login`
2. User clicks "Continue with Google" → Supabase OAuth flow
3. Google auth redirects to `/auth/callback`
4. Callback exchanges code for session → redirects to `/resources`
5. Protected pages use `withAuth` HOC to verify authentication
6. Auth state managed globally via `AuthContext`

## Database Schema

**Tables**:
- `profiles` - User profiles (extends auth.users)
- `resources` - Member-only content with categories
- `bookmarks` - User favorites (optional)

**RLS Policies**:
- Profiles: Public read, users can update own
- Resources: Authenticated users only
- Bookmarks: Users manage own bookmarks

**Migration Location**: `supabase/migrations/20260204000001_initial_schema.sql`

## Protected Routes

Use the `withAuth` HOC to protect pages:

```typescript
import { withAuth } from '@/lib/auth/withAuth'

function ProtectedPage() {
  // Page content
}

export default withAuth(ProtectedPage)
```

This redirects unauthenticated users to `/login` with a return URL.

## API Routes

All API routes use **Edge runtime** for Cloudflare Pages compatibility:

```typescript
export const config = { runtime: 'edge' }
```

- `POST /api/auth/logout` - Sign out user
- `GET /api/resources` - Fetch resources (authenticated)
  - Optional query param: `?category=CategoryName`
- `GET /api/hello` - Demo route (can be removed in production)

**Edge Runtime Notes**:
- Uses native Web API (Request/Response) instead of Next.js types
- Compatible with Cloudflare Pages, Vercel Edge, and other Edge platforms
- All routes use client-side Supabase client for consistency

## Component Patterns

**UI Components**: Use the base components in `/components/ui` for consistency:
- `Button` - Primary, secondary, ghost variants
- `Card` - Premium card with hover effects
- `Avatar` - User avatar with fallback initials
- `LoadingSkeleton` - Shimmer loading states

**Premium Design**:
- Minimalist, spacious layouts (py-32, py-40)
- Subtle shadows and hover effects
- Smooth animations (200-300ms)
- Only animate `transform` and `opacity` (GPU-accelerated)
- Scroll-triggered animations via `useScrollAnimation` hook

**Navigation & Layout**:
- Header navigation visible to all users (Events, Community, Resources links)
- Mobile navigation via slide-in sheet (shadcn) with hamburger menu
- Avatar only shown for authenticated users (desktop only)
- Footer uses anchor tags (`<a>`) for proper URL preview on hover
- All internal links support right-click "Open in new tab"

**Profile Page** (`/profile`):
- Dynamic badges based on subscription status:
  - "Community Member" (green) - Active subscription
  - "Free Access" (gray) - No subscription
- Telegram Community card shows different states:
  - Subscribed: Direct link to Telegram group
  - Not subscribed: Pricing and subscribe CTA
- No redundant account information display (already in profile header)

**Subscription Page** (`/payment/subscribe`):
- Premium black pricing card with white text for contrast
- White CTA button stands out against dark background
- Benefit icons use black and white outline style (no colors)
- Consistent border-2 border-zinc-900 for all feature icons

**Events Page** (`/events`):
- Showcases upcoming community events, meetups, and workshops
- Card-based grid layout (responsive: 1 col mobile, 2 cols tablet, 3 cols desktop)
- Each event card displays:
  - Cover image with hover zoom effect
  - Event title, date & time, location details
  - Brief description with line clamp (3 lines max)
  - Host information
  - External link to Luma event page
- Premium design with hover animations (scale on card hover, image zoom)
- Compact spacing (p-5, mb-3) for clean, efficient layout
- Events sourced from Luma platform (lu.ma)
- Gradient background (zinc-50 to white) matching design system
- Empty state message when no events are scheduled

## Educational Content Pages

**Prompt Template Courses** (under `/resources/prompt/`):

**Basic Prompting Course** (`/resources/prompt/basic`):
- Interactive course with 5 lessons on effective prompting
- Features progress tracking with checkboxes and completion toast
- Uses Geist Sans font (matching main resources page)
- Premium design system with zinc color palette and grid backgrounds
- Includes lesson templates, tips, and self-check guidance

**Python Automation Course** (`/resources/prompt/python`):
- 5-day crash course on automating tasks with Python + AI prompts
- Interactive progress tracking with confetti celebrations
- Matches premium design system of main resources page
- Each day includes: skill overview, prompt template, and 15-min drill

## Payment Integration

**Provider**: HitPay (recurring billing for MYR 10/month)

**Webhook URL**: https://vibecodeee.com/api/hitpay-webhook

**API Routes**:
- `POST /api/payment/create-plan` - Create subscription plan (one-time setup)
- `POST /api/payment/create-subscription` - Create recurring billing for customer
  - Required params: `customer_email`, `user_id`
  - Optional params: `customer_name`, `plan_id`
  - Returns checkout URL to redirect user
- `POST /api/hitpay-webhook` - Handle payment notifications (HMAC validation)
- `POST /api/payment/manual-activate` - Manual subscription activation (fallback)
  - Required params: `reference` (user_id)
  - Used when webhook fails or is delayed

**Payment Flow**:
1. User clicks subscription button
2. Frontend calls `/api/payment/create-subscription` with user details
3. Backend creates recurring billing and returns HitPay checkout URL
4. User is redirected to HitPay to enter payment details
5. After payment, user is redirected to `/payment/success?reference={user_id}`
6. Success page waits 5 seconds for webhook to activate subscription
7. If webhook hasn't activated by then, calls `/api/payment/manual-activate`
8. User gets immediate access even if webhook is delayed/failed

**Webhook Flow (Parallel to Step 6-7)**:
- HitPay sends webhook POST to `/api/hitpay-webhook`
- Webhook validates HMAC signature using `HITPAY_WEBHOOK_SALT`
- On success, updates Supabase to activate subscription
- Returns HTTP 200 to acknowledge receipt

**Webhook Validation**:
- All webhook requests include HMAC signature for security
- Signature validated using `HITPAY_WEBHOOK_SALT` (separate from API salt)
- **IMPORTANT**: HitPay uses different salts for API calls vs webhooks
  - API calls: Use `HITPAY_API_SALT` (from API Keys tab)
  - Webhooks: Use `HITPAY_WEBHOOK_SALT` (from Event Webhooks tab)
- Returns HTTP 200 to acknowledge receipt
- Payment reference contains `user_id` for tracking
- On successful payment, updates Supabase `profiles` table:
  - Sets `has_active_subscription: true`
  - Sets `subscription_started_at` timestamp

**Subscription Status**:
- User subscription status managed via `UserContext`
- `hasActiveSubscription` boolean used throughout the app
- Profile badges and Telegram access controlled by this status
- Header shows Telegram link to all users (subscribed or not)

**Activation Fallback System**:
- Success page automatically activates subscription after 5 seconds if webhook hasn't fired
- Ensures users get immediate access even during webhook delays or failures
- Uses `UserContext.refetch()` to update UI in real-time
- Shows activation status: loading spinner or error message if activation fails

**Environment Variables Required**:
- `HITPAY_API_KEY` - For creating subscriptions
- `HITPAY_API_SALT` - For API request signing
- `HITPAY_WEBHOOK_SALT` - For webhook HMAC validation (different from API salt!)
- `NEXT_PUBLIC_SUPABASE_URL` - Supabase project URL
- `NEXT_PUBLIC_SUPABASE_ANON_KEY` - Public anon key
- `SUPABASE_SERVICE_ROLE_KEY` - Service role key for webhook/manual activation
- `NEXT_PUBLIC_SITE_URL` - Site URL for redirects (e.g., https://vibecodeee.com)

**Important**:
- Use live API keys in production
- Webhook URL must be HTTPS and configured in HitPay dashboard
- Always validate HMAC before processing payments
- Webhook uses Supabase service role key to bypass RLS policies
- **Critical**: Use `HITPAY_WEBHOOK_SALT` for webhooks, not `HITPAY_API_SALT`
- Manual activation fallback ensures zero failed payments due to webhook issues

**Troubleshooting Payment Issues**:

*Issue: Subscription not activated after payment*
- Check if `HITPAY_WEBHOOK_SALT` is set in environment variables
- Verify webhook URL is configured in HitPay dashboard: Settings → Webhooks
- Check Cloudflare/hosting logs for webhook 401/500 errors
- Manual activation fallback should activate after 5 seconds on success page

*Issue: Webhook returning 401 Unauthorized*
- Ensure using `HITPAY_WEBHOOK_SALT` (not API salt) for validation
- Webhook salt is found in HitPay: Settings → Webhooks → Event Webhooks

*Issue: User shows "Free Access" instead of "Community Member"*
- Check Supabase `profiles` table: `has_active_subscription` should be `true`
- Refresh page or call `UserContext.refetch()` to update UI
- Visit `/payment/success?reference={user_id}` to trigger manual activation

## Pages Router Conventions

- Files in `/pages` automatically become routes
- Files in `/pages/api` are API endpoints, not React pages
- `_app.tsx` wraps all pages and provides `AuthProvider`
- `_document.tsx` customizes HTML document structure
- Pages auto-update on file save during development

## Important Notes

- **Never commit `.env.local`** - Contains sensitive keys (Supabase & HitPay)
- **RLS policies are critical** - All database queries respect user permissions
- **Google OAuth setup** - Configure redirect URIs in Google Console and Supabase dashboard
- **Session management** - Handled automatically by @supabase/ssr with cookies
- **HitPay webhook** - Must return HTTP 200 and validate HMAC signature
