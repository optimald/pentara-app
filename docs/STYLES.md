# Pentara Style Guide

## Brand Identity

### Logo
The Pentara logo features a sacred geometry design - a five-petaled flower (representing the five voices) within a circle (representing unity and wholeness). The golden color symbolizes wisdom, enlightenment, and the precious nature of personal guidance.

**Symbolism:**
- **Five petals**: The five voices of your personal council
- **Circle**: Unity, wholeness, the complete self
- **Sacred geometry**: Harmony, balance, and divine proportion
- **Golden color**: Wisdom, illumination, and transformation

### Color Palette

#### Primary Colors
```css
/* Golden/Amber - Primary brand color */
--gold-50: #fffbeb
--gold-100: #fef3c7
--gold-200: #fde68a
--gold-300: #fcd34d
--gold-400: #fbbf24
--gold-500: #f59e0b  /* Primary gold */
--gold-600: #d97706
--gold-700: #b45309
--gold-800: #92400e
--gold-900: #78350f

/* Dark Theme - Background colors */
--dark-50: #18181b
--dark-100: #27272a
--dark-200: #3f3f46
--dark-300: #52525b
--dark-400: #71717a
--dark-500: #a1a1aa
--dark-600: #d4d4d8
--dark-700: #e4e4e7
--dark-800: #f4f4f5
--dark-900: #fafafa
```

#### Semantic Colors
```css
/* Success */
--success-400: #4ade80
--success-500: #22c55e
--success-600: #16a34a

/* Warning */
--warning-400: #facc15
--warning-500: #eab308
--warning-600: #ca8a04

/* Error */
--error-400: #f87171
--error-500: #ef4444
--error-600: #dc2626

/* Info */
--info-400: #60a5fa
--info-500: #3b82f6
--info-600: #2563eb
```

### Typography

#### Font Stack
```css
/* Primary - Serif for headings and brand */
font-family: 'Crimson Text', 'Times New Roman', serif;

/* Secondary - Sans-serif for body text */
font-family: 'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif;

/* Monospace - For code and technical content */
font-family: 'JetBrains Mono', 'Fira Code', monospace;
```

#### Type Scale
```css
/* Headings */
--text-xs: 0.75rem     /* 12px */
--text-sm: 0.875rem    /* 14px */
--text-base: 1rem      /* 16px */
--text-lg: 1.125rem    /* 18px */
--text-xl: 1.25rem     /* 20px */
--text-2xl: 1.5rem     /* 24px */
--text-3xl: 1.875rem   /* 30px */
--text-4xl: 2.25rem    /* 36px */
--text-5xl: 3rem       /* 48px */
--text-6xl: 3.75rem    /* 60px */
--text-7xl: 4.5rem     /* 72px */

/* Line Heights */
--leading-tight: 1.25
--leading-snug: 1.375
--leading-normal: 1.5
--leading-relaxed: 1.625
--leading-loose: 2
```

### Spacing System
```css
/* Spacing scale (based on 4px grid) */
--space-1: 0.25rem   /* 4px */
--space-2: 0.5rem    /* 8px */
--space-3: 0.75rem   /* 12px */
--space-4: 1rem      /* 16px */
--space-5: 1.25rem   /* 20px */
--space-6: 1.5rem    /* 24px */
--space-8: 2rem      /* 32px */
--space-10: 2.5rem   /* 40px */
--space-12: 3rem     /* 48px */
--space-16: 4rem     /* 64px */
--space-20: 5rem     /* 80px */
--space-24: 6rem     /* 96px */
--space-32: 8rem     /* 128px */
```

### Border Radius
```css
--radius-sm: 0.125rem   /* 2px */
--radius-md: 0.375rem   /* 6px */
--radius-lg: 0.5rem     /* 8px */
--radius-xl: 0.75rem    /* 12px */
--radius-2xl: 1rem      /* 16px */
--radius-full: 9999px   /* Full circle */
```

### Shadows
```css
/* Dark theme shadows */
--shadow-sm: 0 1px 2px 0 rgba(0, 0, 0, 0.3);
--shadow-md: 0 4px 6px -1px rgba(0, 0, 0, 0.4), 0 2px 4px -1px rgba(0, 0, 0, 0.3);
--shadow-lg: 0 10px 15px -3px rgba(0, 0, 0, 0.4), 0 4px 6px -2px rgba(0, 0, 0, 0.3);
--shadow-xl: 0 20px 25px -5px rgba(0, 0, 0, 0.4), 0 10px 10px -5px rgba(0, 0, 0, 0.2);
--shadow-2xl: 0 25px 50px -12px rgba(0, 0, 0, 0.5);

/* Golden glow effects */
--glow-gold: 0 0 20px rgba(245, 158, 11, 0.3);
--glow-gold-strong: 0 0 30px rgba(245, 158, 11, 0.5);
```

## Component Styles

### Buttons
```css
/* Primary Button */
.btn-primary {
  background: linear-gradient(135deg, var(--gold-500), var(--gold-600));
  color: var(--dark-50);
  border: none;
  padding: var(--space-3) var(--space-6);
  border-radius: var(--radius-lg);
  font-weight: 600;
  font-size: var(--text-base);
  transition: all 0.2s ease;
  box-shadow: var(--shadow-md);
}

.btn-primary:hover {
  background: linear-gradient(135deg, var(--gold-400), var(--gold-500));
  transform: translateY(-1px);
  box-shadow: var(--shadow-lg), var(--glow-gold);
}

/* Secondary Button */
.btn-secondary {
  background: var(--dark-200);
  color: var(--dark-800);
  border: 1px solid var(--dark-300);
  padding: var(--space-3) var(--space-6);
  border-radius: var(--radius-lg);
  font-weight: 500;
  transition: all 0.2s ease;
}

.btn-secondary:hover {
  background: var(--dark-300);
  border-color: var(--gold-500);
}
```

### Cards
```css
.card {
  background: var(--dark-100);
  border: 1px solid var(--dark-200);
  border-radius: var(--radius-xl);
  padding: var(--space-6);
  box-shadow: var(--shadow-md);
  transition: all 0.3s ease;
}

.card:hover {
  border-color: var(--gold-500);
  box-shadow: var(--shadow-lg), var(--glow-gold);
  transform: translateY(-2px);
}

.card-voice {
  background: linear-gradient(135deg, var(--dark-100), var(--dark-200));
  border: 2px solid var(--dark-300);
  position: relative;
  overflow: hidden;
}

.card-voice::before {
  content: '';
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  height: 3px;
  background: linear-gradient(90deg, var(--gold-400), var(--gold-600));
}
```

### Forms
```css
.form-input {
  background: var(--dark-200);
  border: 1px solid var(--dark-300);
  color: var(--dark-800);
  padding: var(--space-3) var(--space-4);
  border-radius: var(--radius-lg);
  font-size: var(--text-base);
  transition: all 0.2s ease;
}

.form-input:focus {
  outline: none;
  border-color: var(--gold-500);
  box-shadow: 0 0 0 3px rgba(245, 158, 11, 0.1);
}

.form-label {
  color: var(--dark-700);
  font-weight: 500;
  font-size: var(--text-sm);
  margin-bottom: var(--space-2);
}
```

## Layout Guidelines

### Grid System
- Use CSS Grid for complex layouts
- 12-column grid for desktop
- 4-column grid for mobile
- Maximum content width: 1200px
- Container padding: 24px mobile, 48px desktop

### Responsive Breakpoints
```css
/* Mobile first approach */
@media (min-width: 640px) { /* sm */ }
@media (min-width: 768px) { /* md */ }
@media (min-width: 1024px) { /* lg */ }
@media (min-width: 1280px) { /* xl */ }
@media (min-width: 1536px) { /* 2xl */ }
```

### Voice Card Layout
Each voice should be represented as a card with:
- Golden accent border/glow
- Voice name and archetype
- Subtle animation on hover
- Consistent spacing and typography

## Animation Guidelines

### Micro-interactions
```css
/* Smooth transitions */
.transition-smooth {
  transition: all 0.2s cubic-bezier(0.4, 0, 0.2, 1);
}

/* Hover lift effect */
.hover-lift:hover {
  transform: translateY(-2px);
}

/* Golden glow on focus */
.focus-glow:focus {
  box-shadow: 0 0 0 3px rgba(245, 158, 11, 0.2);
}
```

### Loading States
- Use golden shimmer effects
- Skeleton screens with dark theme colors
- Smooth fade-in animations

## Accessibility

### Color Contrast
- All text meets WCAG AA standards (4.5:1 ratio minimum)
- Interactive elements have clear focus states
- Golden accents provide sufficient contrast against dark backgrounds

### Focus Management
- Visible focus indicators using golden glow
- Logical tab order
- Skip links for keyboard navigation

## Dark Theme Implementation

### Background Hierarchy
1. **Primary background**: `--dark-50` (darkest)
2. **Secondary background**: `--dark-100` (cards, modals)
3. **Tertiary background**: `--dark-200` (inputs, buttons)
4. **Border colors**: `--dark-300` to `--dark-400`
5. **Text colors**: `--dark-700` to `--dark-900` (lightest)

### Golden Accents
- Use golden colors sparingly for:
  - Primary actions
  - Active states
  - Brand elements
  - Success indicators
  - Voice-related elements

## Logo Usage

### Logo Variations
1. **Full logo**: Golden symbol with text
2. **Symbol only**: For favicons and small spaces
3. **Monochrome**: For single-color applications
4. **Inverted**: Light version for very dark backgrounds

### Logo Spacing
- Minimum clear space: 1/2 the height of the logo
- Never place on busy backgrounds
- Maintain aspect ratio always
- Minimum size: 24px for symbol, 120px for full logo

### Logo Don'ts
- Don't change colors (except approved variations)
- Don't distort or stretch
- Don't add effects or shadows
- Don't place on insufficient contrast backgrounds

## Voice Personality Visual Language

Each voice archetype should have subtle visual cues:

### The Strategist
- Sharp, angular elements
- Cool golden tones
- Geometric patterns

### The Mentor
- Soft, rounded corners
- Warm golden glow
- Embracing layouts

### The Warrior
- Bold, strong lines
- Intense golden highlights
- Structured grids

### The Creator
- Organic, flowing shapes
- Vibrant golden accents
- Asymmetrical layouts

### The Philosopher
- Balanced proportions
- Subtle golden details
- Contemplative spacing

## Implementation Notes

### CSS Custom Properties
All colors, spacing, and design tokens should be defined as CSS custom properties for easy theming and maintenance.

### Component Library
Build reusable components following this style guide to ensure consistency across the application.

### Performance
- Optimize images and icons for fast loading
- Use system fonts as fallbacks
- Implement proper caching strategies
- Minimize CSS bundle size

This style guide ensures Pentara maintains a cohesive, premium, and accessible dark theme that reflects the wisdom and transformation the app provides.
