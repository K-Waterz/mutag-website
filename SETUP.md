# Setup Guide

## Initial Setup

### 1. Install Dependencies

```bash
npm install
```

### 2. Move Assets to Public Folder

Move the following files/folders from the root to the `public` folder:

**Images:**
- `Logo-no-background.png`
- `flowerclub-logo.png`
- `attorneys-logo.png`
- `lagracia-logo.png`
- `Rapatla-rue-logo.jpg`
- `business-card-mockup.png`
- `Social-media-phone.png`
- `flowerclub-social-media.gif`

**Folders:**
- `Mutag wesbite images/` → `public/Mutag wesbite images/`

**Other Assets:**
- `favicon-32x32.png`
- `favicon-16x16.png`
- `apple-touch-icon.png`
- `site.webmanifest`
- `la-gracia-video.mp4` (if using)

### 3. Create Public Folder Structure

```
public/
├── Logo-no-background.png
├── flowerclub-logo.png
├── attorneys-logo.png
├── lagracia-logo.png
├── Rapatla-rue-logo.jpg
├── business-card-mockup.png
├── Social-media-phone.png
├── flowerclub-social-media.gif
├── favicon-32x32.png
├── favicon-16x16.png
├── apple-touch-icon.png
├── site.webmanifest
└── Mutag wesbite images/
    ├── Team working on project on separate screens.png
    ├── Team showing each other code on a screen.png
    └── (other images)
```

### 4. Start Development Server

```bash
npm run dev
```

The site will be available at `http://localhost:3000`

## Image Optimization Notes

### Current Image References

All images should be referenced from the `public` folder:
- `/Logo-no-background.png` (starts with `/`)
- `/Mutag wesbite images/Team working on project on separate screens.png`

### Recommended Optimizations

1. **Convert to WebP format** for better compression
2. **Create multiple sizes** for responsive images:
   - Thumbnail: 400px width
   - Medium: 800px width
   - Large: 1200px width
   - Full: Original size

3. **Use srcset** for responsive images:
```jsx
<img
  src="/image.jpg"
  srcSet="/image-400.jpg 400w, /image-800.jpg 800w, /image-1200.jpg 1200w"
  sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
  alt="Description"
  loading="lazy"
/>
```

## Form Submission Setup

### Option 1: Netlify Forms

1. Add to form element in `Contact.jsx`:
```jsx
<form onSubmit={handleSubmit} data-netlify="true" name="contact">
  <input type="hidden" name="form-name" value="contact" />
  {/* form fields */}
</form>
```

2. Netlify will automatically process form submissions

### Option 2: Custom API

Update the `handleSubmit` function in `Contact.jsx`:

```jsx
const response = await fetch('https://your-api.com/contact', {
  method: 'POST',
  headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify(formData)
})
```

## Environment Variables

Create `.env` file for local development:

```env
VITE_API_URL=http://localhost:3001
```

Access in code: `import.meta.env.VITE_API_URL`

## Build for Production

```bash
npm run build
```

Output will be in the `dist` folder.

## Troubleshooting

### Images Not Loading
- Ensure images are in `public` folder
- Check paths start with `/`
- Verify file names match exactly (case-sensitive)

### Routing Issues
- Ensure all routes are in `App.jsx`
- Check `BrowserRouter` is wrapping the app
- Verify `base` in `vite.config.js` if using subdirectory

### Styles Not Applying
- Check Tailwind config is correct
- Verify `@tailwind` directives in `index.css`
- Clear browser cache

### Form Not Submitting
- Check form validation
- Verify API endpoint (if custom)
- Check browser console for errors

