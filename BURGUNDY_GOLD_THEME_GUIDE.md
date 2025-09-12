# Burgundy & Gold Premium Theme Guide

## Color Palette

### Primary Colors
- **Burgundy Primary**: `#8b1538` - Main brand color for headers, primary buttons, and key elements
- **Gold Secondary**: `#c9a96e` - Accent color for secondary buttons, highlights, and premium touches
- **Cream Accent**: `#f4f1e8` - Light background color for cards and subtle sections

### Color Variations
- **Burgundy Dark**: `#6b1129` - Darker shade for gradients and hover states
- **Burgundy Light**: `#a5376b` - Lighter burgundy for subtle elements
- **Gold Dark**: `#b8965a` - Darker gold for hover states
- **Gold Light**: `#d4b882` - Lighter gold for backgrounds and borders
- **Cream Dark**: `#eae7de` - Darker cream for contrasts
- **Cream Light**: `#faf9f6` - Lightest cream for backgrounds

### Status Colors
- **Success Green**: `#27ae60` - For success states and positive actions
- **Warning Red**: `#e74c3c` - For errors, warnings, and critical actions

## CSS Classes

### Background Colors
```css
.bg-burgundy-primary    /* Main burgundy background */
.bg-burgundy-dark       /* Dark burgundy background */
.bg-burgundy-light      /* Light burgundy background */
.bg-gold-secondary      /* Gold background */
.bg-gold-dark           /* Dark gold background */
.bg-gold-light          /* Light gold background */
.bg-cream-accent        /* Cream background */
.bg-cream-dark          /* Dark cream background */
.bg-cream-light         /* Light cream background */
```

### Text Colors
```css
.text-burgundy-primary  /* Burgundy text */
.text-burgundy-dark     /* Dark burgundy text */
.text-burgundy-light    /* Light burgundy text */
.text-gold-secondary    /* Gold text */
.text-gold-dark         /* Dark gold text */
.text-gold-light        /* Light gold text */
.text-success-green     /* Success green text */
.text-warning-red       /* Warning red text */
```

### Gradient Backgrounds
```css
.bg-gradient-burgundy      /* Burgundy gradient */
.bg-gradient-gold          /* Gold gradient */
.bg-gradient-burgundy-gold /* Burgundy to gold gradient */
.bg-gradient-luxury        /* Premium multi-color gradient */
```

### Premium Components
```css
.btn-primary          /* Primary button with gold gradient */
.btn-secondary        /* Secondary button with burgundy outline */
.card-luxury          /* Premium card with cream background */
.shadow-luxury        /* Premium shadow effect */
.text-glow-gold       /* Gold text with glow effect */
.text-glow-burgundy   /* Burgundy text with glow effect */
```

## Usage Guidelines

### Primary Actions
- Use **gold gradient buttons** (`.btn-primary`) for main CTAs
- Use **burgundy outline buttons** (`.btn-secondary`) for secondary actions

### Headers and Navigation
- Use **burgundy primary** for main navigation and headers
- Use **gold** for active states and highlights
- Use **cream** for dropdown backgrounds

### Content Areas
- Use **cream accent** for card backgrounds
- Use **burgundy primary** for section headers
- Use **gold secondary** for accent elements and icons

### Hover States
- **Gold hover** for interactive elements
- **Burgundy hover** for navigation items
- **Shadow effects** for premium feel

## Before & After Color Mapping

### Old Colors → New Colors
- `bg-teal-800` → `bg-burgundy-primary`
- `bg-teal-700` → `bg-burgundy-dark`
- `bg-orange-500` → `bg-gold-secondary`
- `bg-orange-600` → `bg-gold-dark`
- `bg-orange-100` → `bg-cream-accent`
- `text-teal-700` → `text-burgundy-primary`
- `text-orange-500` → `text-gold-secondary`
- `hover:bg-orange-500` → `hover:bg-gold-secondary`

## Component Examples

### Premium Button
```jsx
<button className="btn-primary">
  Get Quote
</button>
```

### Premium Card
```jsx
<div className="card-luxury">
  <h3 className="text-burgundy-primary">Premium Service</h3>
  <p className="text-gray-700">Description...</p>
</div>
```

### Navigation Link
```jsx
<Link 
  href="/services" 
  className="text-gray-700 hover-burgundy-text"
>
  Services
</Link>
```

### Hero Section
```jsx
<section className="bg-gradient-luxury">
  <h1 className="text-white text-glow-gold">
    Premium Logistics
  </h1>
</section>
```

## Browser Support

All CSS custom properties and classes are supported in:
- Chrome 49+
- Firefox 31+
- Safari 9.1+
- Edge 16+

## Maintenance

To update colors site-wide, modify the CSS custom properties in `app/globals.css`:

```css
:root {
  --burgundy-primary: #8b1538;
  --gold-secondary: #c9a96e;
  --cream-accent: #f4f1e8;
  /* ... other colors */
}
```

The utility classes will automatically reflect any changes to these values.
