# SFS-SocialPowerhouse Design Guidelines

## Design Approach
**Reference-Based Approach** inspired by modern SaaS leaders: Linear's precision, Notion's clarity, and Buffer's approachability. Focus on conveying AI innovation while maintaining professional credibility.

## Typography
- **Primary Font**: Inter (Google Fonts) - clean, modern sans-serif
- **Hierarchy**:
  - Hero Headline: 4xl-6xl, font-bold (extra bold weight)
  - Section Headers: 3xl-4xl, font-bold
  - Subheadings: xl-2xl, font-semibold
  - Body Text: base-lg, font-normal
  - Small Text/Captions: sm, font-medium

## Layout System
**Spacing Primitives**: Use Tailwind units of 4, 8, 12, 16, 20, and 24 consistently
- Section Padding: py-16 md:py-24 lg:py-32
- Component Gaps: gap-8 to gap-16
- Container Max-Width: max-w-7xl with px-4 md:px-8

## Page Structure (7 Sections)

### 1. Navigation
Fixed header with glass-morphism effect (backdrop-blur), logo left, menu items center, "Start Free Trial" CTA button right with gradient background

### 2. Hero Section (80vh)
Large hero image showing dashboard preview/AI interface mockup as background with overlay. Centered content:
- Bold headline emphasizing AI-powered content creation
- Supporting subheadline (2 lines max)
- Two CTAs: Primary "Get Started Free" + Secondary "Watch Demo"
- Trust indicator below: "Trusted by 5,000+ marketers" with small company logos

### 3. Features Grid (3 columns)
Six feature cards in 2-row grid:
- AI Content Generation
- Multi-Platform Scheduling  
- Analytics Dashboard
- Team Collaboration
- Content Calendar
- Smart Suggestions

Each card: Icon (top), title, 2-line description, subtle hover lift effect

### 4. AI Showcase Section
Two-column layout alternating:
- Left: Large preview image of AI content generator interface
- Right: Feature explanation with bullet points
Include 2-3 of these alternating rows showcasing different AI capabilities

### 5. Social Proof
3-column testimonial grid with:
- Customer photo (circular)
- Quote text
- Name, role, company
- Star rating visualization

### 6. Pricing Teaser
Centered content:
- "Start Growing Your Social Presence" headline
- Simple plan comparison: Free vs Pro (side-by-side cards)
- Highlight AI features in Pro plan
- "Start Your Free Trial" CTA

### 7. Footer
Rich footer with 4 columns:
- Brand + tagline + social links
- Product links
- Resources links  
- Contact info + newsletter signup form
Bottom bar: Copyright, Terms, Privacy

## Component Library

**Buttons**:
- Primary: Rounded-lg, px-8 py-4, bold text, gradient background with backdrop-blur when on images
- Secondary: Rounded-lg, px-8 py-4, border-2, transparent bg
- No hover/active states on hero buttons over images

**Cards**:
- Rounded-2xl, border, p-8, hover:shadow-xl transition

**Form Inputs**:
- Rounded-lg, border-2, px-4 py-3, focus:ring-2

**Icons**: Use Heroicons (outline style) via CDN - 24px or 32px sizes

## Images

**Required Images**:
1. **Hero Background**: Full-width dashboard/interface preview showing AI content generation in action (subtle opacity overlay)
2. **AI Showcase Section**: 2-3 high-quality interface screenshots showing content generator, analytics, scheduling calendar
3. **Customer Photos**: 3-6 circular headshots for testimonials
4. **Company Logos**: 4-5 small grayscale logos for trust indicator
5. **Feature Icons**: Use Heroicons library (not custom images)

**Image Treatment**: All interface screenshots should have subtle shadow, rounded corners (rounded-xl), slight border

## Visual Style
- Modern, clean, spacious
- Gradient accents sparingly (CTAs, subtle section backgrounds)
- Ample whitespace - never cramped
- Subtle shadows for depth
- Consistent 16px-24px spacing rhythm

## Animations
**Minimal and purposeful**:
- Smooth scroll behavior
- Card hover lift (translateY(-4px))
- Button scale on hover (scale-105)
- Fade-in on scroll for sections (optional enhancement)

## Accessibility
- All images have descriptive alt text
- Form inputs have associated labels
- Sufficient color contrast (AA compliant)
- Focus states clearly visible on all interactive elements

This design creates a professional, trustworthy SaaS landing page that highlights AI innovation while maintaining conversion-focused clarity.