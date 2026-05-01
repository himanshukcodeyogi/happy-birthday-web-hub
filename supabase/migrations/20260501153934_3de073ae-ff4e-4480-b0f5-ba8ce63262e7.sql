-- Replace caption with student_name + location on tribute_notes
ALTER TABLE public.tribute_notes ADD COLUMN IF NOT EXISTS student_name TEXT;
ALTER TABLE public.tribute_notes ADD COLUMN IF NOT EXISTS location TEXT;

-- Backfill any existing rows so NOT NULL is safe
UPDATE public.tribute_notes SET student_name = COALESCE(student_name, 'Anonymous') WHERE student_name IS NULL;
UPDATE public.tribute_notes SET location = COALESCE(location, 'Unknown') WHERE location IS NULL;

ALTER TABLE public.tribute_notes ALTER COLUMN student_name SET NOT NULL;
ALTER TABLE public.tribute_notes ALTER COLUMN location SET NOT NULL;

-- Enable realtime so home page updates instantly
ALTER PUBLICATION supabase_realtime ADD TABLE public.tribute_videos;
ALTER PUBLICATION supabase_realtime ADD TABLE public.tribute_notes;