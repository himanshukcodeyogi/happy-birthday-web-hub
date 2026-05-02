import { createFileRoute } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { useReveal } from "@/hooks/useReveal";
import { useSiteContent, DEFAULT_CONTENT } from "@/hooks/useSiteContent";
import { Sparkles, MapPin, PlayCircle, Quote } from "lucide-react";
import skPhoto from "@/assets/sk-chaudhary.png";
import { BirthdayAnimation } from "@/components/BirthdayAnimation";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Happy Birthday Sir 🎉 — From CodeYogi Students with Love" },
      {
        name: "description",
        content:
          "A birthday tribute for SK Chaudhary Sir, Co-Founder of Safex Group — featuring thank-you videos and handwritten notes from CodeYogi students.",
      },
    ],
  }),
  component: HomePage,
});

type Video = {
  id: string;
  student_name: string;
  location: string;
  video_url: string;
  created_at: string;
};
type Note = {
  id: string;
  student_name: string;
  location: string;
  image_url: string;
  created_at: string;
};

function HomePage() {
  const [videos, setVideos] = useState<Video[]>([]);
  const [notes, setNotes] = useState<Note[]>([]);
  const [loading, setLoading] = useState(true);
  const [mediaError, setMediaError] = useState("");
  const c = useSiteContent(DEFAULT_CONTENT);
  const latestMedia = [
    ...videos.map((item) => ({ ...item, type: "video" as const, url: item.video_url })),
    ...notes.map((item) => ({ ...item, type: "image" as const, url: item.image_url })),
  ]
    .sort((a, b) => new Date(b.created_at).getTime() - new Date(a.created_at).getTime())
    .slice(0, 6);

  useReveal();

  useEffect(() => {
    let active = true;
    const loadMedia = async () => {
      const [v, n] = await Promise.all([
        supabase.from("tribute_videos").select("id,student_name,location,video_url,created_at").order("created_at", { ascending: false }),
        supabase.from("tribute_notes").select("id,student_name,location,image_url,created_at").order("created_at", { ascending: false }),
      ]);
      if (!active) return;
      setVideos(((v.data ?? []) as Video[]).filter((item) => Boolean(item.video_url)));
      setNotes(((n.data ?? []) as Note[]).filter((item) => Boolean(item.image_url)));
      setMediaError(v.error || n.error ? "Uploaded media load nahi ho paaya. Page refresh karke try karo." : "");
      setLoading(false);
    };

    loadMedia();

    const refreshMedia = () => {
      loadMedia();
    };

    const ch = supabase
      .channel("tribute-live")
      .on("postgres_changes", { event: "*", schema: "public", table: "tribute_videos" }, refreshMedia)
      .on("postgres_changes", { event: "*", schema: "public", table: "tribute_notes" }, refreshMedia)
      .subscribe();

    return () => {
      active = false;
      supabase.removeChannel(ch);
    };
  }, []);

  return (
    <div className="px-4 sm:px-6">
      {/* HERO */}
      <section className="mx-auto max-w-5xl pt-16 sm:pt-24 pb-20 text-center">
        <div className="animate-fade-up inline-flex items-center gap-2 glass rounded-full px-4 py-1.5 text-xs sm:text-sm text-white/90">
          <Sparkles className="w-3.5 h-3.5" />
          {c.home_hero_eyebrow}
        </div>

        <h1 className="animate-fade-up [animation-delay:120ms] mt-6 text-5xl sm:text-7xl md:text-8xl font-extrabold tracking-tight text-white leading-[1.05]">
          {c.home_hero_title}
        </h1>

        <p className="animate-fade-up [animation-delay:240ms] mt-6 text-lg sm:text-xl text-white/85 max-w-2xl mx-auto whitespace-pre-line">
          {c.home_hero_subtitle}
        </p>

        <div className="animate-fade-up [animation-delay:360ms] mt-12 flex justify-center">
          <div className="relative">
            <div className="absolute -inset-3 rounded-full bg-gradient-hero opacity-60 blur-2xl" />
            <div className="relative w-44 h-44 sm:w-56 sm:h-56 rounded-full glass-strong p-1.5 glow">
              <img
                src={skPhoto}
                alt="SK Chaudhary Sir, Co-Founder of Safex Group"
                className="w-full h-full rounded-full object-cover"
              />
            </div>
          </div>
        </div>

        <BirthdayAnimation />

        {!loading && latestMedia.length > 0 && (
          <div className="mt-12 text-left">
            <div className="mb-5 text-center">
              <p className="text-xs uppercase tracking-[0.25em] text-white/70">Uploaded Wishes</p>
              <h2 className="mt-2 text-2xl sm:text-3xl font-bold text-white">Latest photos & videos</h2>
            </div>
            <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
              {latestMedia.map((item) => (
                <article key={`${item.type}-${item.id}`} className="glass overflow-hidden rounded-3xl text-white">
                  <div className="aspect-[4/3] bg-white/10">
                    {item.type === "video" ? (
                      <video src={item.url} controls preload="metadata" className="h-full w-full object-cover" />
                    ) : (
                      <img src={item.url} alt={`Wish from ${item.student_name}`} className="h-full w-full object-cover" />
                    )}
                  </div>
                  <div className="p-4">
                    <p className="font-semibold">{item.student_name}</p>
                    <p className="mt-1 flex items-center gap-1.5 text-sm text-white/75">
                      <MapPin className="h-3.5 w-3.5" />
                      {item.location}
                    </p>
                  </div>
                </article>
              ))}
            </div>
          </div>
        )}
      </section>

      {/* VIDEOS */}
      <section className="mx-auto max-w-6xl py-16">
        <SectionHeader
          eyebrow={c.home_videos_eyebrow}
          title={c.home_videos_title}
          subtitle={c.home_videos_subtitle}
        />

        {mediaError && <p className="mb-6 text-center text-sm text-white/85">{mediaError}</p>}

        {loading ? (
          <SkeletonGrid />
        ) : videos.length === 0 ? (
          <EmptyState icon={<PlayCircle className="w-8 h-8" />} text="No videos yet — the first tributes will appear here soon." />
        ) : (
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {videos.map((v, i) => (
              <article
                key={v.id}
                className="reveal is-visible hover-lift glass rounded-3xl overflow-hidden"
                style={{ transitionDelay: `${(i % 6) * 60}ms` }}
              >
                <div className="aspect-video bg-black/30">
                  <video
                    src={v.video_url}
                    controls
                    preload="metadata"
                    className="w-full h-full object-cover"
                  />
                </div>
                <div className="p-5 text-white">
                  <h3 className="font-semibold text-lg">{v.student_name}</h3>
                  <p className="mt-1 flex items-center gap-1.5 text-sm text-white/70">
                    <MapPin className="w-3.5 h-3.5" />
                    {v.location}
                  </p>
                </div>
              </article>
            ))}
          </div>
        )}
      </section>

      {/* NOTES */}
      <section className="mx-auto max-w-6xl py-16">
        <SectionHeader
          eyebrow={c.home_notes_eyebrow}
          title={c.home_notes_title}
          subtitle={c.home_notes_subtitle}
        />

        {loading ? (
          <SkeletonGrid />
        ) : notes.length === 0 ? (
          <EmptyState icon={<Quote className="w-8 h-8" />} text="No notes yet — the first handwritten messages will appear here soon." />
        ) : (
          <div className="columns-1 sm:columns-2 lg:columns-3 gap-6 [column-fill:_balance]">
            {notes.map((n, i) => (
              <figure
                key={n.id}
                className="reveal is-visible hover-lift glass rounded-3xl overflow-hidden mb-6 break-inside-avoid"
                style={{ transitionDelay: `${(i % 6) * 60}ms` }}
              >
                <img
                  src={n.image_url}
                  alt={`Note from ${n.student_name}`}
                  loading="lazy"
                  className="w-full min-h-56 h-auto block object-cover bg-white/10"
                />
                <figcaption className="p-4 text-white">
                  <p className="font-semibold">{n.student_name}</p>
                  <p className="mt-0.5 flex items-center gap-1.5 text-sm text-white/70">
                    <MapPin className="w-3.5 h-3.5" />
                    {n.location}
                  </p>
                </figcaption>
              </figure>
            ))}
          </div>
        )}
      </section>
    </div>
  );
}

function SectionHeader({ eyebrow, title, subtitle }: { eyebrow: string; title: string; subtitle: string }) {
  return (
    <div className="reveal mb-10 text-center">
      <p className="text-xs uppercase tracking-[0.25em] text-white/70">{eyebrow}</p>
      <h2 className="mt-2 text-3xl sm:text-4xl md:text-5xl font-bold text-white">{title}</h2>
      <p className="mt-3 text-white/75 max-w-xl mx-auto">{subtitle}</p>
    </div>
  );
}

function SkeletonGrid() {
  return (
    <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
      {Array.from({ length: 6 }).map((_, i) => (
        <div key={i} className="glass rounded-3xl h-64 animate-pulse" />
      ))}
    </div>
  );
}

function EmptyState({ icon, text }: { icon: React.ReactNode; text: string }) {
  return (
    <div className="glass rounded-3xl p-12 text-center text-white/85 max-w-xl mx-auto">
      <div className="w-14 h-14 rounded-full bg-white/15 grid place-items-center mx-auto mb-4">
        {icon}
      </div>
      <p>{text}</p>
    </div>
  );
}
