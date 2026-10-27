# CONTENT_EDITING.md — KAI SHENG Portfolio Content Guide

This guide explains how you can edit, update, and manage your portfolio projects, achievements, certificates, social links, and deployment settings.

---

## 1. Directory & Content Architecture

All editable portfolio content is strictly externalized from presentation components:

```
src/
├── content/              # Primary content export index
│   ├── achievements.ts   # Re-exports achievements
│   ├── projects.ts       # Re-exports project definitions
│   └── profile.ts        # Re-exports profile & branding data
├── data/                 # Master typed data records
│   ├── achievements.ts   # Master achievements & certificate records
│   ├── projects.ts       # Master 3 flagship projects + 11-section case studies
│   ├── profile.ts        # Name, bio, email, social links, tagline
│   ├── education.ts      # Universiti Malaya & Kolej Matrikulasi Kedah records
│   ├── capabilities.ts   # 8 core engineering capabilities
│   └── skills.ts         # Grouped technical stack (AI/ML, NLP, IoT, Web, Data)
└── lib/
    └── supabase/        # Separate browser and server clients
```

---

## 2. Managing Achievements & Certificates

### A. Via the `/admin` Portal (Zero Code Required)
1. Open the live site and navigate to `http://localhost:3000/admin` (or `https://your-domain/admin`).
2. Sign in through `/login` with the Supabase Auth account registered as the portfolio owner.
3. You can:
   - **Reorder**: Click the `↑` or `↓` buttons to change the display sequence.
   - **Feature / Unfeature**: Click the ⭐ star icon to toggle whether an achievement appears in the 5 featured slots on the homepage.
   - **Show / Hide**: Click the 👁️ eye icon to publish or hide an achievement.
   - **Edit**: Click `Edit` to update the title, competition, project, role, recognitions, description, verification link, and certificates.
   - **Add**: Click `+ Add Achievement` to insert a new competition record.
   - **Save**: Click `Save Changes` to persist changes in Supabase. Check the displayed result before leaving the page.

### B. In Code (`src/data/achievements.ts`)
Each achievement adheres to this TypeScript schema:
```typescript
export interface Achievement {
  id: string;               // Unique kebab-case ID (e.g., 'biicc-2026')
  year: string;             // Year (e.g., '2026')
  title: string;            // Competition or award title
  competition: string;      // Full competition name
  project: string;          // Project associated (e.g., 'CardiOxy Pro Alert System')
  role: string;             // Exact role (e.g., 'Project Supervisor' or 'Participant / Project Developer')
  recognitions: string[];   // Array of distinctions (e.g., ['Best AI Technology Award', 'Gold Award'])
  category: "International Innovation" | "National STEM" | "Supervisory Honour" | "Commendation";
  description: string;      // Detailed context & supervisory attribution
  featured: boolean;        // true = shows on homepage Selected Recognition
  visible: boolean;         // true = visible on public website
  display_order: number;    // Sort order (1 = first)
  verification_url?: string;// Verification or competition link
  linkedin_url?: string;    // Post or credential link
  certificates: {
    id: string;
    title: string;
    issuer: string;
    date?: string;
    badge?: string;
    imageUrl?: string;      // Public URL of uploaded certificate
    storagePath?: string;   // Object path in the certificates bucket
  }[];
}
```

> [!IMPORTANT]
> **Supervisory Attribution Rule**:
> When adding achievements where you served as a project supervisor (e.g. BIICC 2026 or WSDG 2026), always set `role: "Project Supervisor"` and include explicit wording in `description`: e.g. `Project Supervisor — Best AI Technology Award & Gold Award`. Never misrepresent student certificates as directly presented to you.

---

## 3. Managing Flagship Projects (`src/data/projects.ts`)

To edit one of the 3 flagship systems or add a new one:
1. Open `src/data/projects.ts`.
2. Edit or append an entry in `projectsData`.
3. Every project automatically populates:
   - Homepage Featured Projects 3D node selector & readable cards
   - Dedicated Case Study route (`/work/[slug]`)
   - 11-section employer hierarchy:
     1. `OVERVIEW`
     2. `PROBLEM`
     3. `SOLUTION`
     4. `MY ROLE`
     5. `SYSTEM ARCHITECTURE` (4 layers + interactive simulation)
     6. `TECHNOLOGIES`
     7. `AI / ML APPROACH`
     8. `RESULTS` (headline metrics & validation)
     9. `CHALLENGES`
     10. `WHAT I LEARNED`
     11. `FUTURE IMPROVEMENTS`

---

## 4. Replacing Images & Certificate Assets

Upload, replace, or delete live certificate files through `/admin`. The files are stored in the Supabase `certificates` bucket and remain grouped in the achievement's `certificates` array. Save a new achievement before attaching files. Static project diagrams can still be placed in `public/projects/` and referenced by their `/projects/` path.

---
## 5. Updating Social Links & Contact Details (`src/data/profile.ts`)

Open `src/data/profile.ts` to update:
- `email`: e.g. `e2100808@siswa.um.edu.my`
- `linkedInUrl`: e.g. `https://www.linkedin.com/in/ng-kai-sheng`
- `githubUrl`: e.g. `https://github.com/kaisheng`
- `displayName`: `KAI SHENG`
- `fullName`: `Ng Kai Sheng`

---

## 6. Supabase and Replit deployment

1. In the intended Supabase project, run `supabase/migrations/20261026000000_portfolio.sql` once through the Supabase SQL Editor or migration tooling. Keep the same migration in Git. It creates the achievements table, owner lookup, RLS policies, and certificate bucket. Never apply it to another project.
2. Create Kai Sheng's Supabase Auth user using the Supabase dashboard. Copy that user's UUID from Authentication → Users. As a database administrator, run `insert into public.portfolio_owners (user_id) values ('THE-OWNER-UUID');` once. No other authenticated user should be inserted into this table.
3. The migration seeds the six existing achievements from `src/data/achievements.ts`. Confirm their roles, visibility, certificate links, and `display_order` values after applying it. A configured deployment reads the database; the in-code records are only a local fallback when Supabase is not configured.
4. In Replit Secrets, add `NEXT_PUBLIC_SUPABASE_URL` and `NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY` for this project. Use the publishable key, never a service-role or secret key. The names are in `.env.example`; values belong only in Replit Secrets or an ignored local environment file. Set these before the production build, since Next.js embeds public variables at build time.
5. Import this GitHub repository into Replit and choose an Autoscale or Reserved VM deployment (not Static). The committed `.replit` config installs with `npm ci`, builds with `npm run build`, starts Next.js on `0.0.0.0:3000`, and exposes only that port. Keep the build and run commands aligned with the Replit Publishing settings. The app requires a persistent Node.js server so `/admin` can perform server-side authentication. Enable an HTTPS domain for the published site. See [Replit port guidance](https://docs.replit.com/references/project-setup/ports).
6. Before publishing, run `npm run typecheck`, `npm run build`, and `npx playwright test`. Check an anonymous `/admin` request redirects to `/login`; check a signed-in non-owner cannot write; check the owner can create, update, delete, reorder, and manage certificate files. Check the Supabase security advisors and compare the remote schema and policies with the committed migration.
7. Visit the public homepage and `/achievements` after seeding. Confirm only visible records appear, featured records follow `display_order`, multiple certificates remain grouped, and supervisor awards identify Kai Sheng as Project Supervisor.
