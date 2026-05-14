# Quick Deployment Guide - MUTAG HOUSE

## ✅ Correct File Structure on Server

After uploading, your `public_html` should look like this:

```
public_html/
├── index.html                    ← From /dist/index.html
├── assets/                       ← From /dist/assets/ (entire folder)
│   ├── index-[hash].js
│   ├── index-[hash].css
│   ├── react-vendor-[hash].js
│   ├── framer-motion-[hash].js
│   └── favicon-32x32-[hash].png
├── Logo-no-background.png        ← Static assets (if referenced)
├── flowerclub-logo.png
├── attorneys-logo.png
└── Mutag wesbite images/         ← Static images folder
    └── (all image files)
```

## ❌ WRONG - Don't Do This

```
public_html/
└── dist/                         ← ❌ WRONG! Don't upload the dist folder
    ├── index.html
    └── assets/
```

## ✅ CORRECT - Do This

```
public_html/
├── index.html                    ← ✅ Upload directly here
└── assets/                       ← ✅ Upload directly here
```

## Step-by-Step Upload Instructions

### For cPanel File Manager:

1. **Build locally**: `npm run build`

2. **Open cPanel File Manager** → Navigate to `public_html`

3. **Upload `index.html`**:
   - Go to `/dist` folder on your computer
   - Upload `index.html` directly into `public_html/`
   - It should be at: `public_html/index.html`

4. **Upload `assets` folder**:
   - Go to `/dist/assets` folder on your computer
   - Upload the entire `assets` folder into `public_html/`
   - It should be at: `public_html/assets/`

5. **Upload static images** (if referenced in components):
   - Upload `Logo-no-background.png` to `public_html/`
   - Upload `Mutag wesbite images/` folder to `public_html/`
   - Upload any other images referenced with `/` paths

### For FTP:

1. **Build locally**: `npm run build`

2. **Connect via FTP** to your server

3. **Navigate to `public_html`** directory

4. **Upload files**:
   ```
   Upload: dist/index.html → public_html/index.html
   Upload: dist/assets/* → public_html/assets/*
   ```

5. **Verify structure**:
   - `public_html/index.html` exists
   - `public_html/assets/` folder exists with JS/CSS files

## ✅ Verification Checklist

After upload, verify:

- [ ] `public_html/index.html` exists (NOT `public_html/dist/index.html`)
- [ ] `public_html/assets/` folder exists (NOT `public_html/dist/assets/`)
- [ ] `public_html/assets/index-[hash].js` exists
- [ ] `public_html/assets/index-[hash].css` exists
- [ ] Website loads at `www.mutag.co.za` (no white screen)
- [ ] Browser console (F12) shows no 404 errors for assets

## 🚨 Common Mistakes to Avoid

1. ❌ **Uploading the `/dist` folder itself** → Creates `public_html/dist/`
2. ❌ **Uploading into a subfolder** → Files won't be at root
3. ❌ **Missing the `assets` folder** → White screen (no JS/CSS)
4. ❌ **Wrong file paths** → Check that paths in `index.html` match server structure

## Quick Test

After upload, visit: `www.mutag.co.za`

- ✅ **Should see**: React app loads, styles work, no errors
- ❌ **If white screen**: Check browser console (F12) for 404 errors on assets

---

**Remember**: Upload the **CONTENTS** of `/dist` directly into `public_html`, not the `/dist` folder itself!














