# Deployment Instructions

## Netlify Deployment

### Option 1: Git Integration (Recommended)

1. **Push to Git Repository**
   ```bash
   git init
   git add .
   git commit -m "Initial commit"
   git remote add origin <your-repo-url>
   git push -u origin main
   ```

2. **Connect to Netlify**
   - Go to [Netlify](https://app.netlify.com)
   - Click "Add new site" → "Import an existing project"
   - Connect your Git repository
   - Netlify will auto-detect Vite settings

3. **Build Settings** (Auto-detected)
   - Build command: `npm run build`
   - Publish directory: `dist`
   - Node version: 18.x (set in Netlify UI if needed)

4. **Environment Variables** (if needed)
   - Go to Site settings → Environment variables
   - Add any required variables

5. **Form Handling**
   - The contact form can use Netlify Forms
   - Add `data-netlify="true"` to form element
   - Add hidden input: `<input type="hidden" name="form-name" value="contact" />`

### Option 2: Manual Deploy

1. **Build the project**
   ```bash
   npm run build
   ```

2. **Deploy to Netlify**
   - Go to Netlify dashboard
   - Drag and drop the `dist` folder
   - Or use Netlify CLI:
     ```bash
     npm install -g netlify-cli
     netlify deploy --prod --dir=dist
     ```

## Vercel Deployment

### Option 1: Git Integration (Recommended)

1. **Push to Git Repository**
   ```bash
   git init
   git add .
   git commit -m "Initial commit"
   git remote add origin <your-repo-url>
   git push -u origin main
   ```

2. **Connect to Vercel**
   - Go to [Vercel](https://vercel.com)
   - Click "Add New Project"
   - Import your Git repository
   - Vercel will auto-detect Vite

3. **Build Settings** (Auto-detected)
   - Framework Preset: Vite
   - Build Command: `npm run build`
   - Output Directory: `dist`
   - Install Command: `npm install`

4. **Environment Variables** (if needed)
   - Go to Project Settings → Environment Variables
   - Add any required variables

### Option 2: Vercel CLI

```bash
npm install -g vercel
vercel
```

Follow the prompts. For production:
```bash
vercel --prod
```

## Post-Deployment Checklist

### SEO
- [ ] Verify all meta tags are present
- [ ] Test Open Graph tags with [Facebook Debugger](https://developers.facebook.com/tools/debug/)
- [ ] Submit sitemap to Google Search Console
- [ ] Verify structured data with [Google Rich Results Test](https://search.google.com/test/rich-results)

### Performance
- [ ] Run Lighthouse audit (target: 90+)
- [ ] Test on mobile devices
- [ ] Verify images are optimized
- [ ] Check Core Web Vitals

### Functionality
- [ ] Test all navigation links
- [ ] Verify contact form submission
- [ ] Test on multiple browsers
- [ ] Check responsive design on various screen sizes

### Analytics
- [ ] Verify Google Analytics is tracking
- [ ] Set up conversion goals
- [ ] Configure event tracking (if needed)

## Custom Domain Setup

### Netlify
1. Go to Site settings → Domain management
2. Add custom domain
3. Update DNS records as instructed
4. Enable HTTPS (automatic)

### Vercel
1. Go to Project Settings → Domains
2. Add your domain
3. Update DNS records as instructed
4. HTTPS is automatic

## Form Submission Setup

### Netlify Forms
1. Add `data-netlify="true"` to form
2. Add hidden input: `<input type="hidden" name="form-name" value="contact" />`
3. Forms are automatically processed
4. View submissions in Netlify dashboard

### Custom API Endpoint
1. Update `handleSubmit` in `src/pages/Contact.jsx`
2. Replace fetch URL with your endpoint
3. Handle CORS if needed
4. Set up environment variable for API URL

## Environment Variables

Create `.env.production` for production-specific variables:

```env
VITE_API_URL=https://api.example.com
VITE_GA_ID=G-69Y20X3B4W
```

Access in code: `import.meta.env.VITE_API_URL`

## Build Optimization

### Image Optimization
- Use WebP format
- Provide multiple sizes with srcset
- Compress images before adding to public folder

### Code Splitting
- Already configured in `vite.config.js`
- React Router handles route-based splitting
- Vendor chunks separated automatically

## Troubleshooting

### Build Fails
- Check Node version (18+)
- Clear `node_modules` and reinstall
- Check for TypeScript errors (if using TS)

### Forms Not Working
- Verify `data-netlify="true"` is present
- Check form name matches hidden input
- Ensure form action is correct

### Images Not Loading
- Check paths (should start with `/`)
- Verify images are in `public` folder
- Check file names match exactly

### Routing Issues
- Ensure all routes are defined in `App.jsx`
- Check `BrowserRouter` is wrapping app
- Verify `base` in `vite.config.js` if using subdirectory

## Support

For issues or questions:
- Email: info@mutag.co.za
- Phone: +27 72 957 2238

