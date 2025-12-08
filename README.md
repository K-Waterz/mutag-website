# MUTAG HOUSE - Luxury React Website

A premium, perception-first B2B website built with React, Tailwind CSS, and Framer Motion.

## 🚀 Quick Start

### Prerequisites
- Node.js 18+ and npm

### Installation

```bash
# Install dependencies
npm install

# Start development server
npm run dev

# Build for production
npm run build

# Preview production build
npm run preview
```

## 📁 Project Structure

```
├── src/
│   ├── components/     # Reusable UI components
│   │   ├── Button.jsx
│   │   ├── Card.jsx
│   │   ├── Footer.jsx
│   │   ├── Header.jsx
│   │   ├── Modal.jsx
│   │   └── Section.jsx
│   ├── pages/         # Page components
│   │   ├── About.jsx
│   │   ├── Contact.jsx
│   │   ├── Home.jsx
│   │   ├── Services.jsx
│   │   └── Work.jsx
│   ├── App.jsx        # Main app component with routing
│   ├── main.jsx       # Entry point
│   └── index.css      # Global styles & Tailwind
├── public/            # Static assets
├── index.html
├── package.json
├── tailwind.config.js
└── vite.config.js
```

## 🎨 Design System

### Colors
- **Primary Blue**: `#4379D9`
- **Accent Purple**: `#5D308E`
- **Dark Base**: `#0B0F1A`
- **Light Base**: `#F6F7FB`

### Typography
- **Headings**: Playfair Display (serif)
- **Body**: Inter (sans-serif)
- **Base Size**: 1rem (16px)
- **Scale Ratio**: 1.25

### Spacing
- 8px rhythm system (8, 16, 24, 32, 40...)

## 🧩 Components

### Button
```jsx
<Button variant="primary" size="lg">Click Me</Button>
```

Variants: `primary`, `secondary`, `ghost`
Sizes: `sm`, `md`, `lg`

### Section
```jsx
<Section title="Title" subtitle="Subtitle" background="dark">
  Content here
</Section>
```

### Card
```jsx
<Card delay={0.1} hover={true}>
  Card content
</Card>
```

## 📱 Responsive Breakpoints

- Mobile: < 768px (4 columns)
- Tablet: 768px - 1024px (8 columns)
- Desktop: > 1024px (12 columns)

## 🚢 Deployment

### Netlify

1. Build the project: `npm run build`
2. Deploy the `dist` folder to Netlify
3. Set build command: `npm run build`
4. Set publish directory: `dist`

### Vercel

1. Connect your Git repository
2. Vercel will auto-detect Vite
3. Deploy automatically on push

### Environment Variables

For form submissions, configure:
- Netlify Forms (add `data-netlify="true"` to form)
- Or set up custom API endpoint

## 📝 Form Submission

The contact form currently uses a simulated submission. To enable real submissions:

1. **Netlify Forms**: Add `data-netlify="true"` to the form element
2. **Custom API**: Update the `handleSubmit` function in `Contact.jsx` with your endpoint

## 🎯 SEO & Accessibility

- All pages include proper meta tags via React Helmet
- Semantic HTML structure
- WCAG AA compliant focus states
- Keyboard navigation support
- ARIA labels where needed

## 📄 License

© 2025 MUTAG HOUSE. All rights reserved.

