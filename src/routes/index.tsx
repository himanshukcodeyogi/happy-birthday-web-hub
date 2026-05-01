import { createFileRoute } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { useReveal } from "@/hooks/useReveal";
import { Sparkles, MapPin, PlayCircle, Quote } from "lucide-react";

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
  caption: string | null;
  image_url: string;
  created_at: string;
};

function HomePage() {
  const [videos, setVideos] = useState<Video[]>([]);
  const [notes, setNotes] = useState<Note[]>([]);
  const [loading, setLoading] = useState(true);

  useReveal();

  useEffect(() => {
    let active = true;
    (async () => {
      const [v, n] = await Promise.all([
        supabase.from("tribute_videos").select("*").order("created_at", { ascending: false }),
        supabase.from("tribute_notes").select("*").order("created_at", { ascending: false }),
      ]);
      if (!active) return;
      setVideos((v.data as Video[]) ?? []);
      setNotes((n.data as Note[]) ?? []);
      setLoading(false);
    })();

    const ch = supabase
      .channel("tribute-live")
      .on("postgres_changes", { event: "*", schema: "public", table: "tribute_videos" }, () => {
        supabase
          .from("tribute_videos")
          .select("*")
          .order("created_at", { ascending: false })
          .then(({ data }) => setVideos((data as Video[]) ?? []));
      })
      .on("postgres_changes", { event: "*", schema: "public", table: "tribute_notes" }, () => {
        supabase
          .from("tribute_notes")
          .select("*")
          .order("created_at", { ascending: false })
          .then(({ data }) => setNotes((data as Note[]) ?? []));
      })
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
          A celebration from the CodeYogi family
        </div>

        <h1 className="animate-fade-up [animation-delay:120ms] mt-6 text-5xl sm:text-7xl md:text-8xl font-extrabold tracking-tight text-white leading-[1.05]">
          Happy Birthday <span className="text-gradient">Sir</span> 🎉
        </h1>

        <p className="animate-fade-up [animation-delay:240ms] mt-6 text-lg sm:text-xl text-white/85 max-w-2xl mx-auto">
          From CodeYogi Students with Love <span className="text-pink-300">❤️</span>
          <br className="hidden sm:block" />
          A heartfelt tribute to <strong className="text-white">SK Chaudhary Sir</strong>, Co-Founder of Safex Group.
        </p>

        <div className="animate-fade-up [animation-delay:360ms] mt-12 flex justify-center">
          <div className="relative">
            <div className="absolute -inset-3 rounded-full bg-gradient-hero opacity-60 blur-2xl" />
            <div className="relative w-44 h-44 sm:w-56 sm:h-56 rounded-full glass-strong p-1.5 glow">
              <div className="w-full h-full rounded-full bg-gradient-hero grid place-items-center text-white text-5xl font-bold tracking-tight overflow-hidden">
                <span className="opacity-90">SK</span>
              </div>
            </div>
          </div>
        </div>
        <p className="animate-fade-up [animation-delay:420ms] mt-4 text-xs uppercase tracking-[0.2em] text-white/60">
          Sir's photo — coming soon
        </p>
      </section>

      {/* VIDEOS */}
      <section className="mx-auto max-w-6xl py-16">
        <SectionHeader
          eyebrow="Thank You Videos"
          title="Messages from our students"
          subtitle="Heartfelt video wishes from CodeYogi students around the country."
        />

        {loading ? (
          <SkeletonGrid />
        ) : videos.length === 0 ? (
          <EmptyState icon={<PlayCircle className="w-8 h-8" />} text="No videos yet — the first tributes will appear here soon." />
        ) : (
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {videos.map((v, i) => (
              <article
                key={v.id}
                className="reveal hover-lift glass rounded-3xl overflow-hidden"
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
          eyebrow="Handwritten Notes"
          title="Words straight from the heart"
          subtitle="A gallery of personal notes written for Sir by our students."
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
                className="reveal hover-lift glass rounded-3xl overflow-hidden mb-6 break-inside-avoid"
                style={{ transitionDelay: `${(i % 6) * 60}ms` }}
              >
                <img src={n.image_url} alt={n.caption ?? "Handwritten note"} className="w-full h-auto block" />
                {n.caption && (
                  <figcaption className="p-4 text-sm text-white/80">{n.caption}</figcaption>
                )}
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
