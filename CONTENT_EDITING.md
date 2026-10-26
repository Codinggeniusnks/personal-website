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
    └── supabase.ts       # Live Supabase connection & fallback synchronization
```

---

## 2. Managing Achievements & Certificates

### A. Via the `/admin` Portal (Zero Code Required)
1. Open the live site and navigate to `http://localhost:3000/admin` (or `https://your-domain/admin`).
2. Enter your Passcode / PIN (default: `1234` or set via `NEXT_PUBLIC_ADMIN_PIN` in `.env.local`).
3. You can:
   - **Reorder**: Click the `↑` or `↓` buttons to change the display sequence.
   - **Feature / Unfeature**: Click the ⭐ star icon to toggle whether an achievement appears in the 5 featured slots on the homepage.
   - **Show / Hide**: Click the 👁️ eye icon to publish or hide an achievement.
   - **Edit**: Click `Edit` to update the title, competition, project, role, recognitions, description, verification link, and certificates.
   - **Add**: Click `+ Add Achievement` to insert a new competition record.
   - **Save**: Click `Save Changes`. If Supabase credentials are configured in environment variables, it saves directly to your live database; otherwise, it persists safely in your browser's local cache.

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
    imageUrl?: string;      // URL or path inside /public/certificates/
  }[];
}
```

> [!IMPORTANT]
> **Supervisory Attribution Rule**:
> When adding achievements where you served as a project supervisor (e.g. BIICC 2026 or WSDG 2026), always set `role: "Project Supervisor"` and include explicit wording in `description`: e.g. `Project Supervisor — Best AI Technology Award & Gold Award`. Never misrepresent student certificates as directly presented to you.

---

## 3. Managing Flagship Projects (`src/data/projects.ts`)

To edit one of the 3 flagship systems or add a new one:
1. Open [`src/data/projects.ts`](file:///C:/Users/LENOVO/.gemini/antigravity/scratch/kai-sheng-portfolio/src/data/projects.ts).
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

1. Place image or PDF files inside `public/`:
   - Certificates: `public/certificates/<filename>.webp`
   - Project diagrams: `public/projects/<filename>.png`
2. Reference the path starting with `/`:
   ```typescript
   imageUrl: "/certificates/wsdg-2024-diamond.webp"
   ```

---

## 5. Updating Social Links & Contact Details (`src/data/profile.ts`)

Open [`src/data/profile.ts`](file:///C:/Users/LENOVO/.gemini/antigravity/scratch/kai-sheng-portfolio/src/data/profile.ts) to update:
- `email`: e.g. `e2100808@siswa.um.edu.my`
- `linkedInUrl`: e.g. `https://www.linkedin.com/in/ng-kai-sheng`
- `githubUrl`: e.g. `https://github.com/kaisheng`
- `displayName`: `KAI SHENG`
- `fullName`: `Ng Kai Sheng`

---

## 6. Live Supabase Setup (Replit / Production)

To enable live remote database editing via `/admin` without redeploying code:
1. Create a Supabase project at [supabase.com](https://supabase.com).
2. Run this SQL in your Supabase SQL Editor:
   ```sql
   create table achievements (
     id text primary key,
     year text not null,
     title text not null,
     competition text not null,
     project text not null,
     role text not null,
     recognitions jsonb not null default '[]'::jsonb,
     category text not null,
     description text,
     featured boolean default true,
     visible boolean default true,
     display_order int default 1,
     certificates jsonb default '[]'::jsonb,
     verification_url text,
     linkedin_url text,
     created_at timestamp with time zone default timezone('utc'::text, now())
   );

   -- Allow public read access
   alter table achievements enable row level security;
   create policy "Public achievements are viewable by everyone"
     on achievements for select using (visible = true);

   -- Allow admin service / authenticated updates
   create policy "Admin can insert and update achievements"
     on achievements for all using (true);
   ```
3. Add these variables to your Replit Secrets or `.env.local`:
   ```env
   NEXT_PUBLIC_SUPABASE_URL=https://your-project.supabase.co
   NEXT_PUBLIC_SUPABASE_ANON_KEY=your-anon-key
   NEXT_PUBLIC_ADMIN_PIN=your-secret-pin
   ```
4. When configured, edits made in `/admin` will automatically update Supabase and reflect on the public website within 60 seconds (via Next.js ISR).
