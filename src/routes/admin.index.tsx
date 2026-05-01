import { createFileRoute, redirect, useNavigate, Link } from "@tanstack/react-router";
import { useEffect, useState, type FormEvent } from "react";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";
import { Upload, Video, Image as ImageIcon, LogOut, Trash2, MapPin } from "lucide-react";

export const Route = createFileRoute("/admin/")({
  head: () => ({
    meta: [{ title: "Admin Dashboard — Tribute" }],
  }),
  beforeLoad: async () => {
    const { data } = await supabase.auth.getSession();
    if (!data.session) throw redirect({ to: "/admin/login" });
  },
  component: AdminDashboard,
});

const MAX_VIDEO_MB = 80;
const MAX_IMAGE_MB = 10;

type Video = { id: string; student_name: string; location: string; video_url: string; storage_path: string | null };
type Note = { id: string; caption: string | null; image_url: string; storage_path: string | null };

function AdminDashboard() {
  const navigate = useNavigate();
  const [videos, setVideos] = useState<Video[]>([]);
  const [notes, setNotes] = useState<Note[]>([]);

  async function refresh() {
    const [v, n] = await Promise.all([
      supabase.from("tribute_videos").select("*").order("created_at", { ascending: false }),
      supabase.from("tribute_notes").select("*").order("created_at", { ascending: false }),
    ]);
    setVideos((v.data as Video[]) ?? []);
    setNotes((n.data as Note[]) ?? []);
  }

  useEffect(() => {
    refresh();
  }, []);

  async function logout() {
    await supabase.auth.signOut();
    toast.success("Signed out");
    navigate({ to: "/admin/login" });
  }

  return (
    <div className="px-4 sm:px-6">
      <section className="mx-auto max-w-6xl pt-12 pb-8 flex flex-wrap items-center justify-between gap-4">
        <div className="text-white">
          <p className="text-xs uppercase tracking-[0.25em] text-white/70">Admin</p>
          <h1 className="mt-1 text-3xl sm:text-4xl font-bold">Tribute Dashboard</h1>
        </div>
        <div className="flex items-center gap-2">
          <Link
            to="/"
            className="rounded-full glass px-4 py-2 text-white text-sm hover:bg-white/15 transition"
          >
            View site
          </Link>
          <button
            onClick={logout}
            className="inline-flex items-center gap-2 rounded-full bg-white/90 text-foreground text-sm font-medium px-4 py-2 hover:bg-white transition"
          >
            <LogOut className="w-4 h-4" /> Sign out
          </button>
        </div>
      </section>

      <section className="mx-auto max-w-6xl grid gap-6 lg:grid-cols-2 pb-12">
        <UploadVideoCard onDone={refresh} />
        <UploadNoteCard onDone={refresh} />
      </section>

      <section className="mx-auto max-w-6xl pb-24 space-y-12">
        <ManagementList
          title="Videos"
          empty="No videos uploaded yet."
          items={videos.map((v) => ({
            id: v.id,
            title: v.student_name,
            sub: v.location,
            preview: <video src={v.video_url} className="w-full h-full object-cover" muted />,
            onDelete: async () => {
              if (v.storage_path) await supabase.storage.from("tributes").remove([v.storage_path]);
              const { error } = await supabase.from("tribute_videos").delete().eq("id", v.id);
              if (error) return toast.error(error.message);
              toast.success("Video removed");
              refresh();
            },
          }))}
        />
        <ManagementList
          title="Notes"
          empty="No notes uploaded yet."
          items={notes.map((n) => ({
            id: n.id,
            title: n.caption ?? "Handwritten note",
            sub: "",
            preview: <img src={n.image_url} alt="" className="w-full h-full object-cover" />,
            onDelete: async () => {
              if (n.storage_path) await supabase.storage.from("tributes").remove([n.storage_path]);
              const { error } = await supabase.from("tribute_notes").delete().eq("id", n.id);
              if (error) return toast.error(error.message);
              toast.success("Note removed");
              refresh();
            },
          }))}
        />
      </section>
    </div>
  );
}

/* ---------- Upload cards ---------- */

function UploadVideoCard({ onDone }: { onDone: () => void }) {
  const [name, setName] = useState("");
  const [location, setLocation] = useState("");
  const [file, setFile] = useState<File | null>(null);
  const [uploading, setUploading] = useState(false);

  async function submit(e: FormEvent) {
    e.preventDefault();
    if (!file) return toast.error("Please choose a video file");
    if (!file.type.startsWith("video/")) return toast.error("Only video files allowed");
    if (file.size > MAX_VIDEO_MB * 1024 * 1024) return toast.error(`Max ${MAX_VIDEO_MB} MB`);

    setUploading(true);
    try {
      const ext = file.name.split(".").pop() ?? "mp4";
      const path = `videos/${Date.now()}-${crypto.randomUUID()}.${ext}`;
      const up = await supabase.storage.from("tributes").upload(path, file, { contentType: file.type });
      if (up.error) throw up.error;
      const { data: pub } = supabase.storage.from("tributes").getPublicUrl(path);
      const ins = await supabase.from("tribute_videos").insert({
        student_name: name.trim(),
        location: location.trim(),
        video_url: pub.publicUrl,
        storage_path: path,
      });
      if (ins.error) throw ins.error;
      toast.success("Video uploaded 🎉");
      setName("");
      setLocation("");
      setFile(null);
      onDone();
    } catch (err) {
      toast.error(err instanceof Error ? err.message : "Upload failed");
    } finally {
      setUploading(false);
    }
  }

  return (
    <form onSubmit={submit} className="glass-strong rounded-3xl p-6 sm:p-7 space-y-4">
      <div className="flex items-center gap-3">
        <span className="grid place-items-center w-10 h-10 rounded-xl bg-gradient-hero text-white">
          <Video className="w-5 h-5" />
        </span>
        <h2 className="text-xl font-semibold">Upload thank-you video</h2>
      </div>

      <Input label="Student name" value={name} onChange={setName} required placeholder="Lavish" />
      <Input label="Location" value={location} onChange={setLocation} required placeholder="Saharanpur" />

      <FilePicker
        label={`Video file (max ${MAX_VIDEO_MB} MB)`}
        accept="video/*"
        file={file}
        onChange={setFile}
      />

      <button
        disabled={uploading}
        className="w-full inline-flex items-center justify-center gap-2 rounded-full bg-gradient-hero text-white font-medium px-5 py-3 shadow-lg hover:opacity-95 disabled:opacity-60 transition"
      >
        <Upload className="w-4 h-4" />
        {uploading ? "Uploading…" : "Upload video"}
      </button>
    </form>
  );
}

function UploadNoteCard({ onDone }: { onDone: () => void }) {
  const [caption, setCaption] = useState("");
  const [file, setFile] = useState<File | null>(null);
  const [uploading, setUploading] = useState(false);

  async function submit(e: FormEvent) {
    e.preventDefault();
    if (!file) return toast.error("Please choose an image");
    if (!file.type.startsWith("image/")) return toast.error("Only image files allowed");
    if (file.size > MAX_IMAGE_MB * 1024 * 1024) return toast.error(`Max ${MAX_IMAGE_MB} MB`);

    setUploading(true);
    try {
      const ext = file.name.split(".").pop() ?? "jpg";
      const path = `notes/${Date.now()}-${crypto.randomUUID()}.${ext}`;
      const up = await supabase.storage.from("tributes").upload(path, file, { contentType: file.type });
      if (up.error) throw up.error;
      const { data: pub } = supabase.storage.from("tributes").getPublicUrl(path);
      const ins = await supabase.from("tribute_notes").insert({
        caption: caption.trim() || null,
        image_url: pub.publicUrl,
        storage_path: path,
      });
      if (ins.error) throw ins.error;
      toast.success("Note uploaded ✨");
      setCaption("");
      setFile(null);
      onDone();
    } catch (err) {
      toast.error(err instanceof Error ? err.message : "Upload failed");
    } finally {
      setUploading(false);
    }
  }

  return (
    <form onSubmit={submit} className="glass-strong rounded-3xl p-6 sm:p-7 space-y-4">
      <div className="flex items-center gap-3">
        <span className="grid place-items-center w-10 h-10 rounded-xl bg-gradient-hero text-white">
          <ImageIcon className="w-5 h-5" />
        </span>
        <h2 className="text-xl font-semibold">Upload handwritten note</h2>
      </div>

      <Input label="Caption (optional)" value={caption} onChange={setCaption} placeholder="A note from Aarav" />

      <FilePicker
        label={`Image file (max ${MAX_IMAGE_MB} MB)`}
        accept="image/*"
        file={file}
        onChange={setFile}
      />

      <button
        disabled={uploading}
        className="w-full inline-flex items-center justify-center gap-2 rounded-full bg-gradient-hero text-white font-medium px-5 py-3 shadow-lg hover:opacity-95 disabled:opacity-60 transition"
      >
        <Upload className="w-4 h-4" />
        {uploading ? "Uploading…" : "Upload note"}
      </button>
    </form>
  );
}

/* ---------- Reusable ---------- */

function Input({
  label,
  value,
  onChange,
  required,
  placeholder,
}: {
  label: string;
  value: string;
  onChange: (v: string) => void;
  required?: boolean;
  placeholder?: string;
}) {
  return (
    <label className="block">
      <span className="text-xs font-medium uppercase tracking-wider text-muted-foreground">{label}</span>
      <input
        value={value}
        onChange={(e) => onChange(e.target.value)}
        required={required}
        placeholder={placeholder}
        className="mt-1.5 w-full rounded-2xl border border-border bg-white/70 px-4 py-3 outline-none focus:ring-2 focus:ring-ring transition"
      />
    </label>
  );
}

function FilePicker({
  label,
  accept,
  file,
  onChange,
}: {
  label: string;
  accept: string;
  file: File | null;
  onChange: (f: File | null) => void;
}) {
  return (
    <label className="block">
      <span className="text-xs font-medium uppercase tracking-wider text-muted-foreground">{label}</span>
      <div className="mt-1.5 rounded-2xl border-2 border-dashed border-border bg-white/50 p-4 text-sm hover:bg-white/70 transition cursor-pointer">
        <input
          type="file"
          accept={accept}
          onChange={(e) => onChange(e.target.files?.[0] ?? null)}
          className="block w-full file:mr-3 file:rounded-full file:border-0 file:bg-foreground/90 file:text-background file:px-4 file:py-2 file:text-sm file:font-medium hover:file:bg-foreground"
        />
        {file && (
          <p className="mt-2 text-xs text-muted-foreground truncate">
            {file.name} • {(file.size / 1024 / 1024).toFixed(2)} MB
          </p>
        )}
      </div>
    </label>
  );
}

function ManagementList({
  title,
  empty,
  items,
}: {
  title: string;
  empty: string;
  items: Array<{
    id: string;
    title: string;
    sub: string;
    preview: React.ReactNode;
    onDelete: () => Promise<unknown> | unknown;
  }>;
}) {
  return (
    <div>
      <h2 className="text-white text-xl font-semibold mb-4">{title}</h2>
      {items.length === 0 ? (
        <div className="glass rounded-2xl p-8 text-white/80 text-center">{empty}</div>
      ) : (
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {items.map((it) => (
            <div key={it.id} className="glass rounded-2xl overflow-hidden text-white">
              <div className="aspect-video bg-black/30">{it.preview}</div>
              <div className="p-4 flex items-start justify-between gap-3">
                <div className="min-w-0">
                  <p className="font-medium truncate">{it.title}</p>
                  {it.sub && (
                    <p className="text-sm text-white/70 flex items-center gap-1 truncate">
                      <MapPin className="w-3.5 h-3.5" />
                      {it.sub}
                    </p>
                  )}
                </div>
                <button
                  onClick={() => it.onDelete()}
                  aria-label="Delete"
                  className="shrink-0 grid place-items-center w-9 h-9 rounded-full bg-destructive/90 hover:bg-destructive text-destructive-foreground transition"
                >
                  <Trash2 className="w-4 h-4" />
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
