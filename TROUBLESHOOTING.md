# Troubleshooting Guide

## Home Page Not Opening

### Step 1: Check if Dev Server is Running

```bash
# Stop any running processes
# Then start fresh
npm run dev
```

The server should start on `http://localhost:3000`

### Step 2: Check Browser Console

Open browser DevTools (F12) and check:
- **Console tab**: Look for any red error messages
- **Network tab**: Check if files are loading (status 200)
- **Elements tab**: Check if `<div id="root">` has content

### Step 3: Common Issues

#### Issue: Blank White Screen
**Solution**: Check browser console for errors. Common causes:
- Missing dependencies: Run `npm install`
- Port conflict: Change port in `vite.config.js`
- Browser cache: Hard refresh (Ctrl+Shift+R)

#### Issue: "Cannot GET /" Error
**Solution**: This means the dev server isn't running. Start it with `npm run dev`

#### Issue: Module Not Found Errors
**Solution**: 
```bash
# Delete node_modules and reinstall
rm -rf node_modules
npm install
```

#### Issue: Routing Not Working
**Solution**: Make sure `BrowserRouter` is in `App.jsx` (not `main.jsx`)

### Step 4: Verify Files

Check these files exist:
- ✅ `src/main.jsx`
- ✅ `src/App.jsx`
- ✅ `src/pages/Home.jsx`
- ✅ `index.html`

### Step 5: Test Build

```bash
npm run build
npm run preview
```

If preview works but dev doesn't, there's a dev server issue.

### Step 6: Clear Everything and Restart

```bash
# Stop all Node processes
# Delete cache
rm -rf node_modules/.vite
rm -rf dist

# Reinstall
npm install

# Start fresh
npm run dev
```

## Still Not Working?

1. **Check the exact error message** in browser console
2. **Check terminal output** when running `npm run dev`
3. **Try a different browser** (Chrome, Firefox, Edge)
4. **Check if port 3000 is available** or change it in `vite.config.js`

## Quick Test

Create a simple test file `src/Test.jsx`:

```jsx
export default function Test() {
  return <div>Test works!</div>
}
```

Then in `App.jsx`, temporarily replace Home with Test to see if routing works.












