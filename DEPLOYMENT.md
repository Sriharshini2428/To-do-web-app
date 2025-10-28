# Deployment Guide

This guide covers deploying the To-Do App to various platforms.

## Vercel (Recommended)

Vercel is the easiest way to deploy Next.js applications.

### Steps

1. **Prepare your code**
   \`\`\`bash
   git add .
   git commit -m "Ready for deployment"
   git push origin main
   \`\`\`

2. **Connect to Vercel**
   - Go to [vercel.com](https://vercel.com)
   - Click "New Project"
   - Select your GitHub repository
   - Vercel will auto-detect Next.js settings

3. **Configure**
   - Framework: Next.js (auto-detected)
   - Build Command: `npm run build` (default)
   - Output Directory: `.next` (default)
   - Install Command: `npm install` (default)

4. **Deploy**
   - Click "Deploy"
   - Wait for build to complete
   - Your app is live!

### Custom Domain

1. Go to Project Settings → Domains
2. Add your custom domain
3. Follow DNS configuration instructions
4. Wait for DNS propagation (up to 48 hours)

## Docker Deployment

### Build Docker Image

\`\`\`dockerfile
# Dockerfile
FROM node:18-alpine

WORKDIR /app

COPY package*.json ./
RUN npm ci

COPY . .
RUN npm run build

EXPOSE 3000

CMD ["npm", "start"]
\`\`\`

### Build and Run

\`\`\`bash
docker build -t todo-app .
docker run -p 3000:3000 todo-app
\`\`\`

## Self-Hosted (Linux/Ubuntu)

### Prerequisites

- Node.js 18+
- npm or yarn
- PM2 (for process management)

### Setup

1. **Clone repository**
   \`\`\`bash
   git clone <repository-url>
   cd todo-app
   \`\`\`

2. **Install dependencies**
   \`\`\`bash
   npm install
   \`\`\`

3. **Build application**
   \`\`\`bash
   npm run build
   \`\`\`

4. **Install PM2**
   \`\`\`bash
   npm install -g pm2
   \`\`\`

5. **Start application**
   \`\`\`bash
   pm2 start npm --name "todo-app" -- start
   pm2 save
   pm2 startup
   \`\`\`

6. **Configure Nginx (optional)**
   \`\`\`nginx
   server {
       listen 80;
       server_name your-domain.com;

       location / {
           proxy_pass http://localhost:3000;
           proxy_http_version 1.1;
           proxy_set_header Upgrade $http_upgrade;
           proxy_set_header Connection 'upgrade';
           proxy_set_header Host $host;
           proxy_cache_bypass $http_upgrade;
       }
   }
   \`\`\`

## Environment Variables

No environment variables are required for this application. All data is stored in browser localStorage.

## Monitoring

### Vercel Analytics

1. Go to Project Settings → Analytics
2. Enable Web Analytics
3. View performance metrics in dashboard

### Error Tracking

For production, consider adding error tracking:
- Sentry
- LogRocket
- Rollbar

## Performance Optimization

### Build Optimization

\`\`\`bash
npm run build
# Check build size
npm run build -- --analyze
\`\`\`

### Caching Headers

Configure in `next.config.mjs`:
\`\`\`javascript
export default {
  headers: async () => {
    return [
      {
        source: '/:path*',
        headers: [
          {
            key: 'Cache-Control',
            value: 'public, max-age=3600, s-maxage=3600',
          },
        ],
      },
    ]
  },
}
\`\`\`

## Troubleshooting

### Build Fails

1. Check Node.js version: `node --version` (should be 18+)
2. Clear cache: `rm -rf .next node_modules`
3. Reinstall: `npm install`
4. Rebuild: `npm run build`

### App Won't Start

1. Check logs: `pm2 logs todo-app`
2. Verify port 3000 is available: `lsof -i :3000`
3. Check environment: `npm run dev`

### Performance Issues

1. Check build size: `npm run build`
2. Analyze bundle: `npm run build -- --analyze`
3. Monitor API response times
4. Check browser DevTools Network tab

## Rollback

### Vercel

1. Go to Deployments
2. Find previous deployment
3. Click "Redeploy"

### Self-Hosted

\`\`\`bash
git revert <commit-hash>
npm run build
pm2 restart todo-app
\`\`\`

## Security Checklist

- [ ] Enable HTTPS
- [ ] Set secure headers
- [ ] Keep dependencies updated
- [ ] Use environment variables for secrets
- [ ] Enable CORS if needed
- [ ] Implement rate limiting
- [ ] Regular security audits

## Support

For deployment issues:
1. Check Vercel documentation: https://vercel.com/docs
2. Check Next.js documentation: https://nextjs.org/docs
3. Open an issue on GitHub
