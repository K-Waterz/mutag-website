# Production Deployment Guide - MUTAG HOUSE Website

## ✅ Production Build Status

The React application has been fixed and is now production-ready. The main issue was that the root `index.html` was referencing `/src/main.jsx` (development file) instead of the compiled production assets.

## 🔧 What Was Fixed

1. **Root `index.html`**: Removed the development script tag (`<script type="module" src="/src/main.jsx"></script>`). Vite now automatically injects the correct compiled script tags during build.

2. **App.jsx**: Changed from `TestHome` to the actual `Home` component to restore full functionality.

3. **Vite Configuration**: Enhanced with production optimizations:
   - Asset hashing for cache busting
   - Code splitting (React vendor, Framer Motion)
   - Minification with Terser
   - Proper asset directory structure

## 📦 Building for Production

### Step 1: Build the Project

Run the build command to generate the production-ready `/dist` folder:

```bash
npm run build
```

This will create a `/dist` folder containing:
- `index.html` - Production HTML with correct script references
- `/assets/` - All compiled JS and CSS files with hashed names
  - `index-[hash].js` - Main React application
  - `react-vendor-[hash].js` - React libraries
  - `framer-motion-[hash].js` - Animation library
  - `index-[hash].css` - Compiled Tailwind CSS
  - `favicon-32x32-[hash].png` - Favicon

### Step 2: Verify the Build

After building, verify that:
- ✅ `/dist/index.html` exists
- ✅ `/dist/index.html` contains `<div id="root"></div>`
- ✅ `/dist/index.html` has script tags pointing to `/assets/index-[hash].js`
- ✅ `/dist/assets/` folder contains JS and CSS files
- ✅ No references to `/src/main.jsx` in `/dist/index.html`

## 🚀 Deployment Instructions

### For Static Hosting (Netlify, Vercel, GitHub Pages, cPanel, etc.)

#### Option A: Upload `/dist` Contents as Root

1. **Build the project** (if not already done):
   ```bash
   npm run build
   ```

2. **Upload all contents** from the `/dist` folder **directly into `public_html`** (NOT in a subfolder):
   - Upload `index.html` directly into `public_html/` (the web root)
   - Upload the entire `/assets` folder directly into `public_html/` (so assets are at `/assets/`)
   - ⚠️ **IMPORTANT**: Upload the CONTENTS of `/dist`, not the `/dist` folder itself

3. **Verify file structure on server**:
   ```
   /
   ├── index.html
   ├── assets/
   │   ├── index-[hash].js
   │   ├── react-vendor-[hash].js
   │   ├── framer-motion-[hash].js
   │   ├── index-[hash].css
   │   └── favicon-32x32-[hash].png
   ```

4. **Important**: Also upload static assets that are referenced in the React components:
   - `/Logo-no-background.png`
   - `/flowerclub-logo.png`
   - `/attorneys-logo.png`
   - `/lagracia-logo.png`
   - `/Mutag wesbite images/` (entire folder with all images)
   - Any other images referenced with `/` paths in the components

#### Option B: Deploy via Git (Netlify/Vercel)

1. **Connect your repository** to Netlify or Vercel
2. **Set build command**: `npm run build`
3. **Set publish directory**: `dist`
4. **Deploy** - The platform will automatically build and deploy

### For cPanel / Traditional Hosting

1. **Build locally**:
   ```bash
   npm run build
   ```

2. **Via FTP/cPanel File Manager**:
   - Navigate to your website's root directory (`public_html`)
   - **Backup** the current `index.html` (rename to `index.html.backup`)
   - Upload the new `index.html` from `/dist` folder **directly into `public_html`** (NOT in a subfolder)
   - Upload the `/dist/assets` folder **directly into `public_html`** (so it becomes `public_html/assets/`)
   - ⚠️ **CRITICAL**: Upload the CONTENTS of `/dist` directly into `public_html`, not the `/dist` folder itself
   - Upload all static images and folders referenced in components

3. **Verify**:
   - Visit `www.mutag.co.za` - should show React app
   - Check browser console (F12) - no errors
   - Verify `div id="root"` exists in page source

## ✅ Post-Deployment Checklist

After deployment, verify:

- [ ] Website loads without white screen
- [ ] React components render correctly
- [ ] All Tailwind styles are applied
- [ ] Images load correctly
- [ ] Navigation works (React Router)
- [ ] Buttons and CTAs are clickable
- [ ] No console errors in browser DevTools
- [ ] Google Analytics is tracking
- [ ] Mobile responsive design works
- [ ] All pages accessible (/, /about, /services, /work, /contact)

## 🔍 Troubleshooting

### White Screen Still Appears

1. **Check browser console** (F12) for errors
2. **Verify file paths**: Ensure `/assets/` folder is in root and JS files are accessible
3. **Check `index.html`**: Must have `<div id="root"></div>` and script tags
4. **Verify base path**: If site is in subdirectory, update Vite `base` config

### 404 Errors for Assets

- Ensure `/assets/` folder is uploaded to root directory
- Check file permissions (should be readable)
- Verify asset filenames match those in `index.html`

### Images Not Loading

- Ensure all images referenced with `/` paths are in the root directory
- Check image file permissions
- Verify image paths in React components match server structure

### React Router 404 on Refresh

For static hosting, configure redirects:
- **Netlify**: Create `_redirects` file with `/* /index.html 200`
- **Apache**: Add `.htaccess` with rewrite rules
- **Nginx**: Configure try_files directive

## 📝 Important Notes

1. **Never upload the root `index.html`** - Always use the one from `/dist` folder
2. **Always rebuild** after making changes: `npm run build`
3. **Keep source files** (`/src`) separate - only deploy `/dist` contents
4. **Static assets** (images, videos) must be uploaded separately if referenced with `/` paths
5. **Hash changes** - Asset filenames change on each build (for cache busting)

## 🎯 Quick Reference

**Build Command**: `npm run build`  
**Output Directory**: `/dist`  
**Entry Point**: `/dist/index.html`  
**Assets**: `/dist/assets/`  
**Root Element**: `<div id="root"></div>`

---

## Support

If you encounter issues:
1. Check browser console for errors
2. Verify all files are uploaded correctly
3. Ensure file permissions are correct
4. Check that asset paths match the server structure






