CREATE TABLE public.site_content (
  key TEXT PRIMARY KEY,
  value TEXT NOT NULL,
  updated_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

ALTER TABLE public.site_content ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Anyone can view site content"
ON public.site_content FOR SELECT
USING (true);

CREATE POLICY "Authenticated can insert site content"
ON public.site_content FOR INSERT TO authenticated
WITH CHECK (true);

CREATE POLICY "Authenticated can update site content"
ON public.site_content FOR UPDATE TO authenticated
USING (true) WITH CHECK (true);

ALTER PUBLICATION supabase_realtime ADD TABLE public.site_content;
