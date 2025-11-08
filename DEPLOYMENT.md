# Deployment Guide - PumpX Micro-SaaS on Vercel

## Step 1: Prepare GitHub Repository

Your code is already in: https://github.com/roshandell/dod

## Step 2: Deploy to Vercel

1. Go to https://vercel.com/new
2. Click "Import Git Repository"
3. Select your GitHub account
4. Choose the `dod` repository
5. Click "Import"

## Step 3: Configure Environment Variables

In Vercel Dashboard → Settings → Environment Variables, add:

### Database
```
DATABASE_URL=your-mysql-connection-string
```

### Authentication
```
JWT_SECRET=generate-a-random-secret
VITE_APP_ID=your-manus-app-id
OAUTH_SERVER_URL=https://api.manus.im
VITE_OAUTH_PORTAL_URL=https://portal.manus.im
OWNER_OPEN_ID=your-manus-openid
OWNER_NAME=Your Name
```

### Payment Gateway
```
CRYPTOMUS_API_KEY=your-api-key
CRYPTOMUS_MERCHANT_UUID=your-merchant-uuid
```

### AI Services
```
OPENAI_API_KEY=your-openai-key
MANUS_API_KEY=your-manus-key
```

### Application
```
VITE_APP_TITLE=PumpX Micro-SaaS Platform
NODE_ENV=production
```

## Step 4: Deploy

1. Click "Deploy"
2. Wait for build to complete
3. Your app will be live at `https://your-project.vercel.app`

## Step 5: Post-Deployment

### Configure Custom Domain (Optional)

1. Go to Vercel Dashboard → Settings → Domains
2. Add your domain (e.g., pumpx.info)
3. Update DNS records as instructed

### Set Up Cryptomus Webhook

1. Log in to Cryptomus Dashboard
2. Go to Settings → Webhooks
3. Add webhook URL:
   ```
   https://your-domain.com/api/webhook/cryptomus
   ```

## Troubleshooting

**Build fails**: Check all environment variables are set correctly

**Database connection error**: Verify DATABASE_URL format and database allows Vercel IPs

**Payment webhook not working**: Verify Cryptomus API key and webhook URL

## Support

- Vercel Docs: https://vercel.com/docs
- GitHub Issues: https://github.com/roshandell/dod/issues
