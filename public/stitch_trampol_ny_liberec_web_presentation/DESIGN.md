---
name: AeroBrutalist Sports
colors:
  surface: '#f9f9f9'
  surface-dim: '#dadada'
  surface-bright: '#f9f9f9'
  surface-container-lowest: '#ffffff'
  surface-container-low: '#f3f3f3'
  surface-container: '#eeeeee'
  surface-container-high: '#e8e8e8'
  surface-container-highest: '#e2e2e2'
  on-surface: '#1a1c1c'
  on-surface-variant: '#43474f'
  inverse-surface: '#2f3131'
  inverse-on-surface: '#f0f1f1'
  outline: '#747780'
  outline-variant: '#c4c6d0'
  surface-tint: '#405f91'
  primary: '#001736'
  on-primary: '#ffffff'
  primary-container: '#002b5b'
  on-primary-container: '#7594ca'
  inverse-primary: '#a9c7ff'
  secondary: '#ac3400'
  on-secondary: '#ffffff'
  secondary-container: '#fe642c'
  on-secondary-container: '#5a1700'
  tertiary: '#0d1b00'
  on-tertiary: '#ffffff'
  tertiary-container: '#1c3100'
  on-tertiary-container: '#6ca21b'
  error: '#ba1a1a'
  on-error: '#ffffff'
  error-container: '#ffdad6'
  on-error-container: '#93000a'
  primary-fixed: '#d6e3ff'
  primary-fixed-dim: '#a9c7ff'
  on-primary-fixed: '#001b3d'
  on-primary-fixed-variant: '#264778'
  secondary-fixed: '#ffdbd0'
  secondary-fixed-dim: '#ffb59d'
  on-secondary-fixed: '#390b00'
  on-secondary-fixed-variant: '#832600'
  tertiary-fixed: '#b8f568'
  tertiary-fixed-dim: '#9dd84f'
  on-tertiary-fixed: '#112000'
  on-tertiary-fixed-variant: '#304f00'
  background: '#f9f9f9'
  on-background: '#1a1c1c'
  surface-variant: '#e2e2e2'
  brand-navy-deep: '#001736'
  brand-text: '#191c1d'
  border-dark: '#002b5b'
typography:
  headline-xl:
    fontFamily: Montserrat
    fontSize: 160px
    fontWeight: '900'
    lineHeight: '0.8'
    letterSpacing: -0.05em
  headline-lg:
    fontFamily: Montserrat
    fontSize: 90px
    fontWeight: '800'
    lineHeight: '1.0'
    letterSpacing: -0.02em
  headline-md:
    fontFamily: Montserrat
    fontSize: 48px
    fontWeight: '800'
    lineHeight: 52px
  headline-sm:
    fontFamily: Montserrat
    fontSize: 24px
    fontWeight: '700'
    lineHeight: 28px
  body-lg:
    fontFamily: Work Sans
    fontSize: 24px
    fontWeight: '500'
    lineHeight: '1.6'
  body-md:
    fontFamily: Work Sans
    fontSize: 16px
    fontWeight: '400'
    lineHeight: '1.5'
  label-bold:
    fontFamily: Montserrat
    fontSize: 13px
    fontWeight: '900'
    letterSpacing: 0.15em
  headline-xl-mobile:
    fontFamily: Montserrat
    fontSize: 80px
    fontWeight: '900'
    lineHeight: '0.9'
  headline-lg-mobile:
    fontFamily: Montserrat
    fontSize: 50px
    fontWeight: '800'
    lineHeight: '1.0'
rounded:
  sm: 0.125rem
  DEFAULT: 0.25rem
  md: 0.375rem
  lg: 0.5rem
  xl: 0.75rem
  full: 9999px
spacing:
  section-padding-desktop: 120px
  section-padding-mobile: 64px
  gutter: 24px
  container-max: 1440px
  unit: 8px
---

## Brand & Style
The brand identity is high-energy, athletic, and unapologetically bold. It targets a diverse audience ranging from professional athletes to families, balancing professional sports standards with community fun. 

The design style is **Neo-Brutalist**: characterized by heavy black borders, massive overlapping typography, and high-contrast "sticker" elements. It uses raw structural elements like dot grids and net patterns to evoke the physical environment of a trampoline park. The emotional response is one of momentum, impact, and "bouncy" energy, achieved through tilted containers and aggressive scaling.

## Colors
The palette is built on high-contrast functionality. 
- **Primary (Deep Navy):** Used for structural integrity, heavy borders, and deep backgrounds to provide a sense of professional stability.
- **Secondary (Action Orange):** The "energy" color. Used for primary CTAs, highlighting key athletic achievements, and urgent messaging.
- **Tertiary (Spring Green):** Represents the "services" and "fun" side of the brand, creating a visual distinction between the competitive club and public offerings.
- **Neutral (Off-White):** A crisp, clean base that allows the loud accent colors to pop without causing visual fatigue.

Shadows and decorative patterns (like the dot grid) should use low-opacity versions of the Primary Navy to maintain tonal consistency.

## Typography
The typographic system is the core of the brand's voice. Headlines use **Montserrat** in its heaviest weights (800-900) to create a "wall of text" effect. Note the `headline-xl` uses a compressed line height (0.8) for intentional overlapping and maximum impact.

**Work Sans** handles all long-form reading, providing a neutral, highly legible contrast to the aggressive headlines. All labels, navigation, and small UI metadata must be in uppercase Montserrat with generous letter spacing to maintain the athletic, "sticker" aesthetic.

## Layout & Spacing
The layout follows a **Fixed Grid** system with a maximum container width of 1440px. 
- **Rhythm:** An 8px base unit is used for all internal component spacing.
- **Sectioning:** Large vertical breathing room (120px) is required between major sections to prevent the bold elements from feeling cluttered.
- **Asymmetry:** Utilize intentional offsets, such as cards in a grid having different top margins (e.g., alternating items shifted by 48px) to mimic the movement of jumping.
- **Borders:** A consistent 1px or 2px solid border in Primary Navy should be applied to structural containers.

## Elevation & Depth
Depth is achieved through **Hard Shadows** and **Sticker Effects** rather than realistic lighting.
- **Hard Elevation:** Elements use a solid, offset shadow (e.g., `4px 4px 0px #002b5b`) instead of a blur. This reinforces the Brutalist aesthetic.
- **Soft Elevation:** For cards and background containers, use high-spread, low-opacity navy shadows to create a "lifting" effect from the background pattern.
- **Patterned Depth:** Use the `net-pattern` or `dot-grid` on background layers to create a sense of physical space and texture.
- **Interactive Depth:** On hover, elements should "spring" — either by removing the rotation or slightly increasing the scale, mimicking the tension and release of a trampoline bed.

## Shapes
The shape language is primarily rectangular but softened with a subtle `0.25rem` (4px) corner radius to avoid feeling sharp or hostile. 
- **Exceptions:** Badge "stickers" use a slightly more rounded `0.5rem` to feel like vinyl decals. 
- **Organic Shapes:** Use "blobs" with irregular border-radii (e.g., `40% 60% 70% 30%`) as background decorative elements to contrast the rigid grid.
- **Rotation:** Apply subtle rotations (-1 to -3 degrees) to labels and stickers to give them a "hand-placed" energy.

## Components
- **Buttons:** Rectangular, sharp corners, heavy font weight. Use the secondary color with a hard shadow. Hover state should swap colors or flatten the shadow.
- **Stickers/Badges:** High-contrast containers with thick borders, often rotated. These serve as category markers or "feature" callouts.
- **Brutalist Cards:** Large image containers with a gradient overlay (Navy-to-Transparent) for text legibility. They must include a "category badge" in the top corner.
- **Navigation:** Minimalist text links with a thick underline effect on hover. Underline should be the secondary orange.
- **Input Fields:** Thick borders, uppercase placeholder text in Montserrat, and no rounded corners.
- **Markers:** Custom map markers should be circular with thick borders and a label that appears on hover, following the sticker aesthetic.