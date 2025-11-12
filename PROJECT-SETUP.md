# SFS-SocialPowerhouse - Project Setup

**Date:** 2025-11-11
**Location:** `/home/garet/SFS/SFS-SocialPowerhouse`

---

## ✅ Repository Status

### Git Configuration
- **Repository:** `boweazy/SFS-SocialPowerhouse`
- **Authentication:** ✅ Configured with SFS_PAT
- **Branch:** `main`
- **Remote URL:** `https://***TOKEN***@github.com/boweazy/SFS-SocialPowerhouse.git`

### Clone Command Used
```bash
cd /home/garet/SFS
git clone "https://${SFS_PAT}@github.com/boweazy/SFS-SocialPowerhouse.git"
cd SFS-SocialPowerhouse
```

---

## 📦 Project Overview

**SFS-SocialPowerhouse** is an AI-powered social media management SaaS platform.

### Technology Stack

**Frontend:**
- React 18.3.1
- TypeScript 5.6.3
- Vite 5.4.20
- Tailwind CSS 3.4.17
- Shadcn UI (Radix UI components)
- Wouter (routing)
- TanStack Query
- Framer Motion (animations)

**Backend:**
- Node.js + Express 4.21.2
- TypeScript
- Drizzle ORM 0.39.1
- PostgreSQL (Neon serverless)
- Passport.js (authentication)
- Express Session

**Development:**
- TSX (TypeScript execution)
- ESBuild (bundling)
- Drizzle Kit (migrations)

---

## 🏗️ Project Structure

```
SFS-SocialPowerhouse/
├── client/               # React frontend
│   ├── src/             # Source files
│   ├── public/          # Static assets
│   └── index.html       # Entry point
├── server/              # Express backend
│   ├── index.ts         # Server entry
│   ├── routes.ts        # API routes
│   ├── storage.ts       # Database layer
│   └── vite.ts          # Vite integration
├── shared/              # Shared types/utilities
├── attached_assets/     # Project assets
├── package.json         # Dependencies
├── tsconfig.json        # TypeScript config
├── vite.config.ts       # Vite config
├── drizzle.config.ts    # Database config
├── tailwind.config.ts   # Tailwind config
└── .replit              # Replit configuration
```

---

## 🚀 Quick Start

### 1. Install Dependencies
```bash
cd /home/garet/SFS/SFS-SocialPowerhouse
npm install
```

### 2. Setup Environment Variables
Create a `.env` file:
```env
DATABASE_URL=postgresql://...
SESSION_SECRET=your-secret-key
PORT=5000
NODE_ENV=development
```

### 3. Run Database Migrations
```bash
npm run db:push
```

### 4. Start Development Server
```bash
npm run dev
```

The app will be available at `http://localhost:5000`

---

## 📜 Available Scripts

```bash
npm run dev          # Start development server (TSX + Vite)
npm run build        # Build for production (Vite + ESBuild)
npm start            # Start production server
npm run check        # TypeScript type checking
npm run db:push      # Push database schema changes
```

---

## 🎨 Design Guidelines

The project follows a modern SaaS design approach inspired by:
- **Linear** - Precision and polish
- **Notion** - Clarity and usability
- **Buffer** - Approachability

### Key Design Principles

**Typography:**
- Primary Font: Inter (Google Fonts)
- Hero Headlines: 4xl-6xl, bold
- Section Headers: 3xl-4xl, bold
- Body Text: base-lg, normal

**Layout:**
- Spacing: Consistent 4-24px units
- Container: max-w-7xl
- Section Padding: py-16 md:py-24 lg:py-32

**Components:**
- Buttons: rounded-lg, gradient backgrounds
- Cards: rounded-2xl with hover effects
- Form Inputs: rounded-lg with focus states

See `design_guidelines.md` for complete details.

---

## 📄 Landing Page Structure

The platform features a 7-section landing page:

1. **Navigation** - Fixed header with glass-morphism
2. **Hero Section** - Large dashboard preview with CTAs
3. **Features Grid** - 6 feature cards (2x3 grid)
4. **AI Showcase** - Alternating image/text sections
5. **Social Proof** - Customer testimonials
6. **Pricing Teaser** - Free vs Pro comparison
7. **Footer** - Rich footer with links and newsletter

---

## 🔧 Replit Configuration

**Modules:** nodejs-20, web, postgresql-16

**Development:**
```bash
npm run dev
# Runs on port 5000
```

**Deployment:**
```toml
deploymentTarget = "autoscale"
build = ["npm", "run", "build"]
run = ["npm", "run", "start"]
```

---

## 🔐 Authentication

The project uses Passport.js with:
- Local strategy (username/password)
- Express sessions (memorystore)
- PostgreSQL session store option (connect-pg-simple)

---

## 🗄️ Database

**ORM:** Drizzle ORM
**Database:** PostgreSQL (Neon serverless)

**Schema Management:**
```bash
npm run db:push  # Push schema changes
```

Configuration in `drizzle.config.ts`

---

## ⚠️ Next Steps

### Required Setup
1. ⚠️ **Install dependencies:** `npm install`
2. ⚠️ **Configure environment variables** (DATABASE_URL, SESSION_SECRET)
3. ⚠️ **Setup PostgreSQL database** (Neon or local)
4. ⚠️ **Run database migrations:** `npm run db:push`

### Development
5. Start dev server: `npm run dev`
6. Access at `http://localhost:5000`

### Deployment
7. Configure Replit secrets (DATABASE_URL, SESSION_SECRET)
8. Click "Deploy" in Replit

---

## 📚 Documentation

- Design Guidelines: `design_guidelines.md`
- TypeScript Config: `tsconfig.json`
- Vite Config: `vite.config.ts`
- Drizzle Config: `drizzle.config.ts`

---

## 🔗 Related Projects

This is part of the **SmartFlow Systems** ecosystem:

- SmartFlowSite - Main marketing site
- SFSDataQueryEngine - Data analytics
- SocialScaleBoosterAIbot - AI social bot
- SFSAPDemoCRM - Demo CRM system
- sfs-marketing-and-growth - Marketing tools

All configured with SFS_PAT authentication via `/tmp/configure-git-auth.sh`

---

**Status:** ✅ Cloned and configured
**Next Action:** Run `npm install` to set up dependencies
