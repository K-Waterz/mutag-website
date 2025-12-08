# MUTAG HOUSE Style Guide

## Brand Colors

### Primary Palette
- **Royal Blue**: `#4379D9` - Primary brand color, used for CTAs and accents
- **Imperial Purple**: `#5D308E` - Reserved for primary CTAs (10% of design)
- **Dark Base**: `#0B0F1A` - Primary background (60% of design)
- **Light Base**: `#F6F7FB` - Light content sections (30% of design)

### Usage Rules
- **60/30/10 Rule**: 60% neutrals, 30% royal blue, 10% purple (CTAs only)
- Use opacity layers for subtle cards/overlays: `bg-brand-blue/10`, `border-brand-blue/20`

## Typography

### Font Families
- **Headings**: `font-heading` (Playfair Display)
- **Body**: `font-body` (Inter)

### Type Scale (REM with 1.25 ratio)
- **H1**: 3.815rem (61px)
- **H2**: 3.052rem (49px)
- **H3**: 2.441rem (39px)
- **H4**: 1.953rem (31px)
- **H5**: 1.563rem (25px)
- **H6**: 1.25rem (20px)
- **Body**: 1rem (16px)

### Line Heights
- **Body**: 1.5
- **Headings**: 1.2 (with -0.02em letter-spacing)

## Spacing System

8px rhythm:
- `8px` (0.5rem)
- `16px` (1rem)
- `24px` (1.5rem)
- `32px` (2rem)
- `40px` (2.5rem)
- `48px` (3rem)
- `56px` (3.5rem)
- `64px` (4rem)

## Layout

### Grid System
- **Desktop**: 12 columns
- **Tablet**: 8 columns
- **Mobile**: 4 columns

### Container
- Max width: `1280px`
- Padding: `1rem` mobile, `1.5rem` tablet, `2rem` desktop

## Components

### Button Variants

**Primary (Gradient)**
```jsx
<Button variant="primary">Request Private Strategy Call</Button>
```
- Uses gradient: `linear-gradient(135deg, #4379D9 0%, #5D308E 100%)`
- White text
- Hover: opacity 90%, shadow with brand-blue glow

**Secondary (Ghost)**
```jsx
<Button variant="secondary">View Our Work</Button>
```
- Transparent background
- Border: 2px solid brand-blue
- Text: brand-blue
- Hover: brand-blue/10 background

**Ghost**
```jsx
<Button variant="ghost">Learn More</Button>
```
- Transparent background
- Text: brand-light/80
- Hover: brand-blue text, brand-blue/5 background

### Card Styling
- Background: `bg-brand-dark/50` with backdrop blur
- Border: `border-brand-blue/20`
- Border radius: `rounded-xl`
- Padding: `p-6 md:p-8`
- Hover: Lift 4px with 200-300ms transition

### Section Spacing
- Vertical padding: `py-16 md:py-24 lg:py-32`
- Generous spacing for luxury feel

## Animations

### Framer Motion Guidelines
- **Reveal on scroll**: Fade + slight upward motion (30px)
- **Card hover**: Lift 4-8px, 200-300ms duration
- **Button interactions**: Scale 1.02 on hover, 0.98 on tap
- **Hero parallax**: Subtle background movement only
- Keep animations "expensive" and tasteful

### Transition Timing
- Standard: `transition-luxury` (0.3s cubic-bezier)
- Fast: 200ms
- Slow: 600ms

## Accessibility

### Focus States
- All interactive elements: `outline-2 outline-offset-2 outline-brand-blue`
- Keyboard navigation fully supported

### ARIA Labels
- Buttons without visible text: `aria-label`
- Navigation: `aria-label="Main navigation"`
- Modals: Proper `aria-expanded` and `aria-label`

## Image Optimization

### Lazy Loading
- All images: `loading="lazy"`
- Hero images: `loading="eager"`

### Responsive Images
Use `srcset` for responsive images:
```jsx
<img
  src="/image.jpg"
  srcSet="/image-400.jpg 400w, /image-800.jpg 800w, /image-1200.jpg 1200w"
  sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
  alt="Description"
/>
```

## CTA Strategy

### Primary CTA Copy
- **Standard**: "Request Private Strategy Call"
- Use consistently across all pages
- Place in: Header, Hero, Periodic sections, Footer

### CTA Placement
- One clear primary CTA per page
- Hero section always has primary CTA
- Periodic CTAs throughout long pages
- Footer includes secondary CTA

## Trust Signals

### Client Logos
- Display in footer and relevant sections
- Grayscale with hover color
- Opacity: 60% default, 100% on hover

### Testimonials
- 2-3 curated testimonials with outcomes
- Include specific metrics when available
- Format: Quote, Author, Outcome

## Code Standards

### Component Structure
```jsx
import { motion } from 'framer-motion'
import { Helmet } from 'react-helmet-async'

const Component = () => {
  return (
    <>
      <Helmet>
        <title>Page Title</title>
        <meta name="description" content="..." />
      </Helmet>
      {/* Component content */}
    </>
  )
}
```

### Naming Conventions
- Components: PascalCase
- Files: Match component name
- CSS classes: Use Tailwind utilities
- Custom classes: kebab-case

## Performance

### Code Splitting
- React Router handles route-based splitting
- Vendor chunks separated (react, framer-motion)

### Image Optimization
- Use WebP format when possible
- Provide multiple sizes with srcset
- Lazy load below-fold images

## Browser Support

- Modern browsers (Chrome, Firefox, Safari, Edge)
- Last 2 versions
- Mobile browsers (iOS Safari, Chrome Mobile)

