# 🔐 Clerk Authentication Setup Guide

## Overview
The intranet is prepared with Clerk authentication, restricting access to users with the `superadmin` role. Follow this guide to complete the setup.

## 📋 Pre-requisites
- Clerk account (sign up at https://clerk.com)
- Next.js application running

## 🚀 Setup Steps

### 1. Clerk Dashboard Configuration

1. **Create a new application** in the Clerk Dashboard
2. **Get your keys** from the API Keys section:
   - Publishable Key (starts with `pk_test_` or `pk_live_`)
   - Secret Key (starts with `sk_test_` or `sk_live_`)

### 2. Environment Variables

Update `.env.local` with your actual Clerk keys:

```env
# Replace with your actual keys
NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY=pk_test_your_actual_publishable_key_here
CLERK_SECRET_KEY=sk_test_your_actual_secret_key_here
```

### 3. User Role Configuration

#### Option A: Using Clerk Dashboard
1. Go to **Users** in your Clerk Dashboard
2. Select a user
3. Go to **Public metadata**
4. Add: `{"role": "superadmin"}`

#### Option B: Using Clerk API
```javascript
import { clerkClient } from "@clerk/nextjs";

await clerkClient.users.updateUserMetadata(userId, {
  publicMetadata: { role: "superadmin" }
});
```

### 4. Webhook Setup (Optional)
For automatic role assignment, set up webhooks:

1. In Clerk Dashboard, go to **Webhooks**
2. Add endpoint: `https://your-domain.com/api/webhooks/clerk`
3. Select events: `user.created`, `user.updated`

## 🔧 Current Implementation

### Protected Routes
- `/intranet/*` - Requires `superadmin` role
- `/sign-in` - Public sign-in page
- `/sign-up` - Public sign-up page (users need admin approval)
- `/unauthorized` - Shown to non-superadmin users

### Components
- `SuperAdminGuard` - Protects intranet routes
- `UserMenu` - Shows user info and sign out
- Custom sign-in/sign-up pages with Hyrk.io branding

### Custom Hook
- `useAuth()` - Provides user data and role checking

## 🎨 Styling
All Clerk components are styled to match the Hyrk.io dark theme:
- Dark zinc color scheme
- Custom fonts (Lexend/Outfit)
- Consistent with intranet design

## 🔄 Workflow

1. **User visits `/intranet`**
2. **Middleware checks authentication**
3. **If not signed in** → Redirect to `/sign-in`
4. **If signed in but not superadmin** → Redirect to `/unauthorized`
5. **If superadmin** → Access granted to intranet

## 📝 TODO for Complete Implementation

1. **Replace placeholder keys** in `.env.local`
2. **Set up first superadmin user** via Clerk Dashboard
3. **Test authentication flow**
4. **Configure webhooks** (optional)
5. **Set up user role management** process

## 🚨 Security Notes

- Never commit real API keys to version control
- Use environment-specific keys (test vs production)
- Regularly rotate secret keys
- Monitor user access in Clerk Dashboard

## 🛠️ Testing

1. **Start the application**: `npm run dev`
2. **Visit**: `http://localhost:3000/intranet`
3. **Should redirect** to sign-in page
4. **Create test user** and assign superadmin role
5. **Test complete flow**

## 📞 Support

- Clerk Documentation: https://clerk.com/docs
- Next.js Integration: https://clerk.com/docs/quickstarts/nextjs

---

The authentication system is ready to go! Just add your Clerk keys and configure the first superadmin user.