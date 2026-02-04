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
```

Get Supabase keys from: https://app.supabase.com -> Project Settings -> API
Get HitPay keys from: https://dashboard.hit-pay.com/settings/api-keys

## Architecture

**Framework**: Next.js 16.1.6 with Pages Router (not App Router)

**Authentication**: Supabase with Google OAuth (via @supabase/ssr)

**Database**: PostgreSQL via Supabase with Row Level Security (RLS)

**Key Directories**:
- `/pages` - Page routes and API routes
  - `/pages/api` - API routes for auth and resources
  - `/pages/auth` - Auth callback handler
  - `/pages/resources` - Protected member dashboard
  - `/pages/login.tsx` - Google OAuth sign-in page
  - `/pages/profile.tsx` - User profile page
  - `/pages/basicprompt.tsx` - Educational course page (basic prompting)
  - `/pages/index.tsx` - Public landing page
- `/components` - Reusable UI and landing page components
  - `/components/ui` - Base UI components (Button, Card, Avatar, etc.)
  - `/components/landing` - Landing page sections (Hero, Navigation, etc.)
- `/contexts` - React context providers (AuthContext)
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

**Fonts**: Primary font is Geist Sans. Some pages use custom fonts (e.g., basicprompt.tsx uses DM Serif Display + Sora).

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

## Educational Content Pages

**Basic Prompting Course** (`/basicprompt`):
- Interactive course with 5 lessons on effective prompting
- Features progress tracking with checkboxes and completion toast
- Custom design with DM Serif Display (headings) and Sora (body)
- Standalone page with unique styling (not using main premium design system)
- Includes lesson templates, tips, and self-check guidance

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

**Payment Flow**:
1. User clicks subscription button
2. Frontend calls `/api/payment/create-subscription` with user details
3. Backend creates recurring billing and returns HitPay checkout URL
4. User is redirected to HitPay to enter payment details
5. After payment, user is redirected to `/payment/success`
6. HitPay sends webhook POST to `/api/hitpay-webhook`
7. Webhook validates HMAC signature and grants access

**Webhook Validation**:
- All webhook requests include HMAC signature for security
- Signature validated using `HITPAY_API_SALT`
- Returns HTTP 200 to acknowledge receipt
- Payment reference contains `user_id` for tracking

**Important**:
- Use live API keys in production
- Webhook URL must be HTTPS
- Always validate HMAC before processing payments

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
