---
description: How to deploy the Horror Experiences website to Vercel
---

# Deploy to Vercel

## Prerequisites
- GitHub account
- Vercel account (free)
- Git installed locally

## Step 1: Push to GitHub
1. Create a new repository on GitHub
2. Initialize git (if not already done):
   ```bash
   git init
   git add .
   git commit -m "Initial commit - Horror Experiences website"
   ```
3. Connect to GitHub:
   ```bash
   git remote add origin https://github.com/YOUR_USERNAME/horror-experiences.git
   git branch -M main
   git push -u origin main
   ```

## Step 2: Deploy on Vercel
1. Go to [vercel.com](https://vercel.com) and sign in with GitHub
2. Click "Add New Project"
3. Import your `horror-experiences` repository
4. Vercel will auto-detect React - keep default settings
5. Click "Deploy"

## Step 3: Configure Custom Domain (Optional)
1. In Vercel dashboard, go to Project Settings > Domains
2. Add your custom domain
3. Follow DNS configuration instructions

## Step 4: Environment Variables (if needed)
1. Project Settings > Environment Variables
2. Add any API keys or secrets here (not needed for this static site)

## Features Automatically Enabled
- ✅ HTTPS/SSL certificate
- ✅ Automatic deployments on git push
- ✅ CDN for fast global loading
- ✅ Preview deployments for pull requests
- ✅ Analytics (optional)

## Post-Deployment Checklist
- [ ] Test all pages load correctly
- [ ] Verify share button works
- [ ] Check voting system functions
- [ ] Test keyboard navigation
- [ ] Confirm 404 page displays
- [ ] Verify SEO meta tags (use [metatags.io](https://metatags.io))
