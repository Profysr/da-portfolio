---
name: Ethereal Professional
colors:
  surface: '#131313'
  surface-dim: '#131313'
  surface-bright: '#3a3939'
  surface-container-lowest: '#0e0e0e'
  surface-container-low: '#1c1b1b'
  surface-container: '#201f1f'
  surface-container-high: '#2a2a2a'
  surface-container-highest: '#353534'
  on-surface: '#e5e2e1'
  on-surface-variant: '#cbc3d7'
  inverse-surface: '#e5e2e1'
  inverse-on-surface: '#313030'
  outline: '#958ea0'
  outline-variant: '#494454'
  surface-tint: '#d0bcff'
  primary: '#d0bcff'
  on-primary: '#3c0091'
  primary-container: '#a078ff'
  on-primary-container: '#340080'
  inverse-primary: '#6d3bd7'
  secondary: '#b9c7df'
  on-secondary: '#233144'
  secondary-container: '#3c4a5e'
  on-secondary-container: '#abb9d1'
  tertiary: '#bec6e0'
  on-tertiary: '#283044'
  tertiary-container: '#8990a8'
  on-tertiary-container: '#22293d'
  error: '#ffb4ab'
  on-error: '#690005'
  error-container: '#93000a'
  on-error-container: '#ffdad6'
  primary-fixed: '#e9ddff'
  primary-fixed-dim: '#d0bcff'
  on-primary-fixed: '#23005c'
  on-primary-fixed-variant: '#5516be'
  secondary-fixed: '#d5e3fc'
  secondary-fixed-dim: '#b9c7df'
  on-secondary-fixed: '#0d1c2e'
  on-secondary-fixed-variant: '#3a485b'
  tertiary-fixed: '#dae2fd'
  tertiary-fixed-dim: '#bec6e0'
  on-tertiary-fixed: '#131b2e'
  on-tertiary-fixed-variant: '#3f465c'
  background: '#131313'
  on-background: '#e5e2e1'
  surface-variant: '#353534'
typography:
  display:
    fontFamily: Geist
    fontSize: 72px
    fontWeight: '700'
    lineHeight: '1.1'
    letterSpacing: -0.04em
  headline-lg:
    fontFamily: Geist
    fontSize: 48px
    fontWeight: '600'
    lineHeight: '1.2'
    letterSpacing: -0.02em
  headline-lg-mobile:
    fontFamily: Geist
    fontSize: 32px
    fontWeight: '600'
    lineHeight: '1.2'
    letterSpacing: -0.02em
  headline-md:
    fontFamily: Geist
    fontSize: 30px
    fontWeight: '600'
    lineHeight: '1.3'
  body-lg:
    fontFamily: Geist
    fontSize: 18px
    fontWeight: '400'
    lineHeight: '1.6'
  body-md:
    fontFamily: Geist
    fontSize: 16px
    fontWeight: '400'
    lineHeight: '1.6'
  label-sm:
    fontFamily: JetBrains Mono
    fontSize: 12px
    fontWeight: '500'
    lineHeight: '1.4'
    letterSpacing: 0.05em
  caption:
    fontFamily: Geist
    fontSize: 14px
    fontWeight: '400'
    lineHeight: '1.4'
rounded:
  sm: 0.25rem
  DEFAULT: 0.5rem
  md: 0.75rem
  lg: 1rem
  xl: 1.5rem
  full: 9999px
spacing:
  container-max: 1200px
  gutter: 24px
  margin-mobile: 16px
  section-gap: 120px
  element-gap: 24px
---

## Brand & Style
The design system embodies an ultra-modern, high-end digital presence tailored for a world-class professional portfolio. It balances technical precision with premium aesthetics, utilizing a "Dark Cinematic" style. 

The visual language draws heavily from **Minimalism** and **Glassmorphism**, favoring deep spatial depth and negative space over cluttered decorative elements. The emotional response is one of trust, innovation, and "quiet luxury"—where the quality of the work is amplified by the restraint of the interface. 

Key visual drivers include:
- **Kinetic Typography:** Subtle text reveals and entrance animations.
- **Luminous Accents:** Use of electric violet to guide the eye through a dark environment.
- **Technical Sophistication:** Clean lines and precise geometry inspired by developer-centric tools (Geist/Shadcn).

## Colors
The palette is rooted in a "True Dark" foundation to ensure maximum contrast and professional gravitas.

- **Primary (Electric Violet):** Used sparingly for high-impact call-to-actions, active states, and glowing accents.
- **Secondary (Slate):** Employed for borders, dividers, and secondary iconography to provide structure without harshness.
- **Neutral (Deep Charcoal):** The primary background color (#0A0A0A), providing a bottomless depth for glassmorphic elements to sit upon.
- **Functional Gradients:** Subtle radial gradients (from #1E1B4B to #0A0A0A) should be used behind hero sections to create a sense of atmospheric light.

## Typography
The typography system utilizes **Geist** for its exceptional balance of technical precision and readability. The scale is intentionally dramatic, with large display headings contrasted against highly legible body text.

- **Display Text:** Should utilize "text-reveal" animations on page load.
- **Labels:** Monospaced (JetBrains Mono) fonts are used for technical metadata, tags, and small labels to reinforce the "professional engineer/designer" persona.
- **Line Heights:** Generous line heights are maintained in the body text to enhance the minimalist, airy feel of the portfolio.

## Layout & Spacing
The layout follows a **Fixed Grid** approach for desktop to maintain a curated, editorial look, transitioning to a fluid model for mobile devices.

- **Desktop:** 12-column grid with a 1200px max-width. Large vertical gaps (120px+) between sections create a "breathable" narrative flow.
- **Tablet:** 8-column grid with 40px side margins.
- **Mobile:** 4-column grid with 16px side margins.
- **Rhythm:** Spacing follows a base-8 scale (8, 16, 24, 32, 48, 64) to ensure mathematical harmony across all components.

## Elevation & Depth
Depth is achieved through **Glassmorphism** and **Luminous Layers** rather than traditional drop shadows.

- **Surface Layers:** Surfaces use a semi-transparent fill (`rgba(255, 255, 255, 0.03)`) with a high-saturation backdrop blur (12px-20px).
- **Outlines:** All elevated elements (cards, navbars) must have a 1px border with a subtle gradient (e.g., `linear-gradient(to bottom right, rgba(255,255,255,0.1), rgba(255,255,255,0.02))`).
- **Glow Effects:** Primary buttons and featured cards utilize a "Soft Outer Glow" using the Primary Electric Violet color with a 20% opacity and 40px blur radius to simulate a light source behind the element.

## Shapes
Following the Shadcn UI influence, this design system uses a consistent **0.5rem (8px)** corner radius for standard components. This provides a modern, approachable feel that isn't as aggressive as sharp corners nor as casual as full rounds.

- **Cards & Modals:** `rounded-xl` (24px) for large containers.
- **Buttons & Inputs:** `rounded-md` (8px).
- **Badges:** `rounded-full` for a distinct "pill" shape to separate them from structural elements.

## Components

### Buttons
- **Primary:** Solid background (Violet), white text. On hover: subtle scale-up (1.02x) and increased glow intensity.
- **Secondary:** Ghost style with 1px slate border. On hover: background becomes `rgba(255,255,255,0.05)`.

### Cards (Project/Work)
- **Visuals:** Use a "Border Beam" animation effect (a light traveling around the border).
- **Content:** Large imagery with text overlays that appear on hover using a smooth vertical slide.

### Input Fields
- **Styling:** Minimalist bottom-border only or very subtle filled state (`#171717`). 
- **Focus:** The border color transitions to Electric Violet with a very faint inner glow.

### Navigation
- **Floating Dock:** A glassmorphic bottom-fixed or top-fixed dock with blurred background and icon-centric navigation.

### Chips & Tags
- **Appearance:** Small, monospaced text with a low-contrast slate background and 1px border. Used for skills (e.g., "React", "TypeScript").

### Interactive Effects
- **Magnetic Mouse:** Elements like the "Contact" button should have a magnetic pull effect towards the cursor.
- **Text Reveal:** Headlines should stagger-fade into view using a 0.8s ease-out transition.