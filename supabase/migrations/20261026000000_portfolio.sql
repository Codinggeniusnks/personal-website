create table public.portfolio_owners (
  user_id uuid primary key references auth.users(id) on delete cascade
);
alter table public.portfolio_owners enable row level security;
revoke all on public.portfolio_owners from anon, authenticated;
grant select on public.portfolio_owners to authenticated;
create policy "Owners can identify themselves"
  on public.portfolio_owners for select to authenticated
  using (user_id = (select auth.uid()));

create table public.achievements (
  id text primary key,
  year text not null,
  title text not null,
  competition text not null,
  project text not null,
  role text not null,
  recognitions jsonb not null default '[]'::jsonb,
  category text not null,
  description text not null default '',
  featured boolean not null default false,
  visible boolean not null default false,
  display_order integer not null default 0,
  certificates jsonb not null default '[]'::jsonb,
  verification_url text,
  linkedin_url text
);
alter table public.achievements enable row level security;
revoke all on public.achievements from anon, authenticated;
grant select on public.achievements to anon, authenticated;
grant insert, update, delete on public.achievements to authenticated;
create policy "Anonymous visitors read visible achievements"
  on public.achievements for select to anon using (visible);
create policy "Signed in visitors read visible or owned achievements"
  on public.achievements for select to authenticated
  using (visible or exists (select 1 from public.portfolio_owners where user_id = (select auth.uid())));
create policy "Owners insert achievements"
  on public.achievements for insert to authenticated
  with check (exists (select 1 from public.portfolio_owners where user_id = (select auth.uid())));
create policy "Owners update achievements"
  on public.achievements for update to authenticated
  using (exists (select 1 from public.portfolio_owners where user_id = (select auth.uid())))
  with check (exists (select 1 from public.portfolio_owners where user_id = (select auth.uid())));
create policy "Owners delete achievements"
  on public.achievements for delete to authenticated
  using (exists (select 1 from public.portfolio_owners where user_id = (select auth.uid())));

insert into storage.buckets (id, name, public)
values ('certificates', 'certificates', true)
on conflict (id) do update set public = excluded.public;
create policy "Owners select certificate objects"
  on storage.objects for select to authenticated
  using (bucket_id = 'certificates' and exists (select 1 from public.portfolio_owners where user_id = (select auth.uid())));
create policy "Owners insert certificate objects"
  on storage.objects for insert to authenticated
  with check (bucket_id = 'certificates' and exists (select 1 from public.portfolio_owners where user_id = (select auth.uid())));
create policy "Owners update certificate objects"
  on storage.objects for update to authenticated
  using (bucket_id = 'certificates' and exists (select 1 from public.portfolio_owners where user_id = (select auth.uid())))
  with check (bucket_id = 'certificates' and exists (select 1 from public.portfolio_owners where user_id = (select auth.uid())));
create policy "Owners delete certificate objects"
  on storage.objects for delete to authenticated
  using (bucket_id = 'certificates' and exists (select 1 from public.portfolio_owners where user_id = (select auth.uid())));

-- Initial public portfolio content.
insert into public.achievements (id, year, title, competition, project, role, recognitions, category, description, featured, visible, display_order, certificates, verification_url, linkedin_url) values
  ('wsdg-2024', '2024', 'World Sustainable Development Goal Challenge 2024', 'World Sustainable Development Goal Challenge 2024 (WSDG 2024)', 'OxyPulse Alert System', 'Participant / Project Developer', '["Diamond Award","Gold Award","Top 5 Award","Special Award"]'::jsonb, 'International Innovation', 'Quadruple distinction for the OxyPulse Alert System at WSDG 2024, demonstrating vital physiological monitoring, early anomaly detection, and community healthcare resilience.', true, true, 1, '[{"id":"wsdg-24-diamond","title":"Diamond Award Certificate","issuer":"WSDG 2024 International Secretariat","date":"2024","badge":"DIAMOND"},{"id":"wsdg-24-gold","title":"Gold Award Certificate","issuer":"WSDG 2024 International Committee","date":"2024","badge":"GOLD"},{"id":"wsdg-24-top5","title":"Top 5 Finalist Award","issuer":"WSDG 2024 Jury","date":"2024","badge":"TOP 5"},{"id":"wsdg-24-special","title":"Special Innovation Award","issuer":"WSDG 2024 Organizing Body","date":"2024","badge":"SPECIAL"}]'::jsonb, 'https://wsdgchallenge.org/verify/2024/oxypulse', 'https://www.linkedin.com/in/ng-kai-sheng'),
  ('biicc-2025', '2025', 'Borneo International Innovation & Creativity Competition 2025', 'Borneo International Innovation & Creativity Competition 2025 (BIICC 2025)', 'MediTech OxyPulse Alert System', 'Participant / Project Developer', '["Best Innovation Entrepreneurs Award","Gold Award","3rd Place — Innovation Poster Presentation"]'::jsonb, 'International Innovation', 'Recognized for technological innovation and entrepreneurial translation in remote patient telemetry, sensor integration, and reliable alert escalation.', true, true, 2, '[{"id":"biicc-25-entrepreneur","title":"Best Innovation Entrepreneurs Award","issuer":"BIICC 2025 Steering Committee","date":"2025","badge":"ENTREPRENEUR"},{"id":"biicc-25-gold","title":"Gold Award Certificate","issuer":"BIICC 2025 International Jury","date":"2025","badge":"GOLD"},{"id":"biicc-25-poster","title":"3rd Place Innovation Poster Presentation","issuer":"BIICC 2025 Academic Committee","date":"2025","badge":"3RD PLACE"}]'::jsonb, 'https://biicc.org/archives/2025/meditech', 'https://www.linkedin.com/in/ng-kai-sheng'),
  ('innostem-2025', '2025', 'National-Level InnoSTEM Competition', 'InnoSTEM Matrikulasi 2025 (National Level)', 'STEM Innovation & Embedded Telemetry', 'Competitor & Lead Developer', '["Gold Medal"]'::jsonb, 'National STEM', 'Awarded Gold Medal at the National Matriculation STEM Innovation Competition for engineering rigor, embedded circuit design, and algorithmic problem solving.', true, true, 3, '[{"id":"innostem-25-gold","title":"Gold Medal Distinction Certificate","issuer":"Ministry of Education Malaysia / InnoSTEM Board","date":"2025","badge":"GOLD MEDAL"}]'::jsonb, 'https://innostem.edu.my/verify/2025/kmk-gold', 'https://www.linkedin.com/in/ng-kai-sheng'),
  ('biicc-2026', '2026', 'Borneo International Innovation & Creativity Competition 2026', 'Borneo International Innovation & Creativity Competition 2026 (BIICC 2026)', 'CardiOxy Pro Alert System', 'Project Supervisor', '["Best AI Technology Award","Gold Award"]'::jsonb, 'Supervisory Honour', 'Project Supervisor — Best AI Technology Award & Gold Award. Supervised the student participant team in architecting the predictive AI trajectory engine and ESP-NOW fault-tolerant telemetry.', true, true, 4, '[{"id":"biicc-26-best-ai","title":"Best AI Technology Award Certificate (Supervisory Attribution)","issuer":"BIICC 2026 International Committee","date":"2026","badge":"BEST AI TECH"},{"id":"biicc-26-gold","title":"Gold Award Certificate (Supervisory Attribution)","issuer":"BIICC 2026 International Committee","date":"2026","badge":"GOLD AWARD"}]'::jsonb, 'https://biicc.org/verify/2026/cardioxy-pro', 'https://www.linkedin.com/in/ng-kai-sheng'),
  ('wsdg-2026', '2026', 'World Sustainable Development Goals Challenge 2026', 'World Sustainable Development Goals Challenge 2026 (WSDG 2026)', 'CardiOxy Pro Alert System', 'Project Supervisor', '["Platinum Award","Gold Award","Top 5 Innovators Award"]'::jsonb, 'Supervisory Honour', 'Project Supervisor — Platinum Award, Gold Award & Top 5 Innovators Award. Guided architecture design, medical-safety thresholding, multi-controller synchronization, and continuous offline packet logging.', true, true, 5, '[{"id":"wsdg-26-plat","title":"Platinum Award Certificate (Supervisory Attribution)","issuer":"WSDG 2026 International Secretariat","date":"2026","badge":"PLATINUM"},{"id":"wsdg-26-gold","title":"Gold Award Certificate (Supervisory Attribution)","issuer":"WSDG 2026 International Committee","date":"2026","badge":"GOLD"},{"id":"wsdg-26-top5","title":"Top 5 Innovators Certificate (Supervisory Attribution)","issuer":"WSDG 2026 Jury","date":"2026","badge":"TOP 5"}]'::jsonb, 'https://wsdgchallenge.org/verify/2026/cardioxy-supervisor', 'https://www.linkedin.com/in/ng-kai-sheng'),
  ('wsdg-2024-appreciation', '2024', 'Certificate of Appreciation — WSDG 2024', 'World Sustainable Development Goal Challenge 2024 (WSDG 2024)', 'Global Sustainability & Innovation Initiative', 'Contributing Developer', '["Certificate of Appreciation"]'::jsonb, 'Commendation', 'Presented in appreciation of technical contribution, innovative engineering, and dedication towards advancing United Nations Sustainable Development Goals.', false, true, 6, '[{"id":"wsdg-24-appr","title":"Certificate of Appreciation","issuer":"WSDG 2024 Executive Board","date":"2024","badge":"COMMENDATION"}]'::jsonb, 'https://wsdgchallenge.org/verify/2024/appreciation-kaisheng', 'https://www.linkedin.com/in/ng-kai-sheng')
on conflict (id) do nothing;
