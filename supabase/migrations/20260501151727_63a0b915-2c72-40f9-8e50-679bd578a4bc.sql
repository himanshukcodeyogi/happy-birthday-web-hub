
-- Tribute videos
CREATE TABLE public.tribute_videos (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  student_name TEXT NOT NULL,
  location TEXT NOT NULL,
  video_url TEXT NOT NULL,
  storage_path TEXT,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

-- Tribute notes (handwritten images)
CREATE TABLE public.tribute_notes (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  caption TEXT,
  image_url TEXT NOT NULL,
  storage_path TEXT,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

ALTER TABLE public.tribute_videos ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.tribute_notes ENABLE ROW LEVEL SECURITY;

-- Public can view all tributes (this is a public tribute site)
CREATE POLICY "Anyone can view videos" ON public.tribute_videos FOR SELECT USING (true);
CREATE POLICY "Anyone can view notes" ON public.tribute_notes FOR SELECT USING (true);

-- Only authenticated users (admin) can insert/delete
CREATE POLICY "Authenticated can insert videos" ON public.tribute_videos FOR INSERT TO authenticated WITH CHECK (true);
CREATE POLICY "Authenticated can delete videos" ON public.tribute_videos FOR DELETE TO authenticated USING (true);
CREATE POLICY "Authenticated can insert notes" ON public.tribute_notes FOR INSERT TO authenticated WITH CHECK (true);
CREATE POLICY "Authenticated can delete notes" ON public.tribute_notes FOR DELETE TO authenticated USING (true);

-- Public storage bucket for tribute media
INSERT INTO storage.buckets (id, name, public) VALUES ('tributes', 'tributes', true)
ON CONFLICT (id) DO NOTHING;

-- Storage policies
CREATE POLICY "Public can view tribute files" ON storage.objects FOR SELECT USING (bucket_id = 'tributes');
CREATE POLICY "Authenticated can upload tribute files" ON storage.objects FOR INSERT TO authenticated WITH CHECK (bucket_id = 'tributes');
CREATE POLICY "Authenticated can delete tribute files" ON storage.objects FOR DELETE TO authenticated USING (bucket_id = 'tributes');
