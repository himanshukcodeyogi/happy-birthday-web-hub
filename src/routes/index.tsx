import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { useReveal } from "@/hooks/useReveal";
import { useSiteContent, DEFAULT_CONTENT } from "@/hooks/useSiteContent";
import { Sparkles, MapPin, Quote, X, Play, PlayCircle } from "lucide-react";
import skPhoto from "@/assets/sk-chaudhary.png";
import birthdayVideo from "@/assets/birthday-video.mp4";
import snehaVideo from "@/assets/sneha-video.mp4";
import { BirthdayAnimation } from "@/components/BirthdayAnimation";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogClose,
} from "@/components/ui/dialog";
import { cn } from "@/lib/utils";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Happy Birthday Sir 🎉 — From CodeYogi Students with Love" },
      {
        name: "description",
        content:
          "A birthday tribute for SK Chaudhary Sir, Co-Founder of Safex Group — featuring handwritten notes from CodeYogi students.",
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
  student_avatar_url?: string;
  created_at: string;
};
type Note = {
  id: string;
  student_name: string;
  location: string;
  image_url: string;
  student_avatar_url?: string;
  created_at: string;
};

// Add your videos here manually
const MANUAL_VIDEOS: Video[] = [
  {
    id: "v1",
    student_name: "Priyanshi Ror",
    location: "CodeYogi Student",
    video_url: birthdayVideo,
    student_avatar_url: "https://i.ibb.co/xt7Mh6gN/20260502-154843.jpg",
    created_at: new Date().toISOString()
  },
  {
    id: "v2",
    student_name: "Sneha Saini",
    location: "CodeYogi Student",
    video_url: snehaVideo,
    student_avatar_url: "https://i.ibb.co/fdkZnypK/20260502-160630.jpg",
    created_at: new Date().toISOString()
  }
];

// Add your notes here manually
const MANUAL_NOTES: Note[] = [
  {
    id: "n1",
    student_name: "Laiba",
    location: "CodeYogi Student",
    image_url: "https://i.ibb.co/G43gw1rs/20260502-154124.jpg",
    student_avatar_url: "https://i.ibb.co/vvm9Hm97/20260502-153902.jpg",
    created_at: new Date().toISOString()
  },
  {
    id: "n2",
    student_name: "Payal",
    location: "CodeYogi Student",
    image_url: "https://i.ibb.co/fRP5LfT/20260502-154320.jpg",
    student_avatar_url: "https://i.ibb.co/XffKnWZr/20260502-154218.jpg",
    created_at: new Date(Date.now() - 3600000).toISOString()
  },
  {
    id: "n3",
    student_name: "Anshul Sain",
    location: "CodeYogi Student",
    image_url: "https://phissfquqqtvuntxuusk.supabase.co/storage/v1/object/public/tributes/notes/1777734744676-50222bd4-64ed-4c52-b180-beaae57c99b2.jpg",
    student_avatar_url: "https://i.ibb.co/ccLcYfxj/20260502-154355.jpg",
    created_at: new Date(Date.now() - 7200000).toISOString()
  },
  {
    id: "n4",
    student_name: "Ilma Malik",
    location: "CodeYogi Student",
    image_url: "https://i.ibb.co/qYsTp4TD/IMG-20260502-154632.jpg",
    student_avatar_url: "https://i.ibb.co/bjGm2mzz/20260502-154512.jpg",
    created_at: new Date(Date.now() - 10800000).toISOString()
  },
  {
    id: "n5",
    student_name: "Anjali Dhiman",
    location: "CodeYogi Student",
    image_url: "https://i.ibb.co/PGKWR2tW/20260502-154755.jpg",
    student_avatar_url: "https://i.ibb.co/tMpV9GC3/20260502-171324.jpg",
    created_at: new Date(Date.now() - 14400000).toISOString()
  },
  {
    id: "n6",
    student_name: "Priyanshi Ror",
    location: "CodeYogi Student",
    image_url: "https://i.ibb.co/wFQx3wfC/20260502-154916.jpg",
    student_avatar_url: "https://i.ibb.co/xt7Mh6gN/20260502-154843.jpg",
    created_at: new Date(Date.now() - 18000000).toISOString()
  },
  {
    id: "n7",
    student_name: "Rajat",
    location: "CodeYogi Student",
    image_url: "https://i.ibb.co/tTqph1fp/20260502-160235.jpg",
    student_avatar_url: "https://i.ibb.co/mCPBRDGR/20260502-160134.jpg",
    created_at: new Date(Date.now() - 21600000).toISOString()
  },
  {
    id: "n8",
    student_name: "Abdul Chauhan",
    location: "CodeYogi Student",
    image_url: "https://i.ibb.co/21fDxB8t/20260502-160409.jpg",
    student_avatar_url: "https://i.ibb.co/NgNGjWTF/20260502-160440.jpg",
    created_at: new Date(Date.now() - 25200000).toISOString()
  },
  {
    id: "n9",
    student_name: "Sneha Saini",
    location: "CodeYogi Student",
    image_url: "https://i.ibb.co/hFtLMr3H/20260502-160702.jpg",
    student_avatar_url: "https://i.ibb.co/fdkZnypK/20260502-160630.jpg",
    created_at: new Date(Date.now() - 28800000).toISOString()
  },
  {
    id: "n10",
    student_name: "Rishu Khalid",
    location: "CodeYogi Student",
    image_url: "https://i.ibb.co/W4gzg6GC/20260502-160834.jpg",
    student_avatar_url: "https://i.ibb.co/S70Td6Hm/20260502-160803.jpg",
    created_at: new Date(Date.now() - 32400000).toISOString()
  },
  {
    id: "n11",
    student_name: "Arjun Dhiman",
    location: "CodeYogi Student",
    image_url: "https://i.ibb.co/FkNjCgp0/20260502-161010.jpg",
    student_avatar_url: "https://i.ibb.co/TBsbPsz7/20260502-160938.jpg",
    created_at: new Date(Date.now() - 36000000).toISOString()
  },
  {
    id: "n12",
    student_name: "Mohan Sain",
    location: "CodeYogi Student",
    image_url: "https://i.ibb.co/1GG9JW8h/20260502-171919.jpg",
    student_avatar_url: "https://i.ibb.co/MkX9mMD1/20260502-171840.jpg",
    created_at: new Date().toISOString()
  }
];

function HomePage() {
  const [videos] = useState<Video[]>(MANUAL_VIDEOS);
  const [notes] = useState<Note[]>(MANUAL_NOTES);
  const [loading] = useState(false);
  const [selectedMedia, setSelectedMedia] = useState<{
    type: "video" | "note";
    url: string;
    name: string;
  } | null>(null);
  const c = useSiteContent(DEFAULT_CONTENT);


  useReveal();

  return (
    <div className="px-4 sm:px-6">
      {/* HERO */}
      <section className="mx-auto max-w-5xl pt-12 sm:pt-24 pb-16 sm:pb-20 text-center px-4">
        <div className="animate-fade-up inline-flex items-center gap-2 glass rounded-full px-4 py-1.5 text-xs sm:text-sm text-white/90">
          <Sparkles className="w-3.5 h-3.5" />
          {c.home_hero_eyebrow}
        </div>

        <h1 className="animate-fade-up [animation-delay:120ms] mt-6 text-4xl sm:text-7xl md:text-8xl font-extrabold tracking-tight text-white leading-[1.1] sm:leading-[1.05]">
          {c.home_hero_title}
        </h1>

        <p className="animate-fade-up [animation-delay:240ms] mt-6 text-base sm:text-xl text-white/85 max-w-2xl mx-auto whitespace-pre-line px-2">
          {c.home_hero_subtitle}
        </p>

        <div className="animate-fade-up [animation-delay:360ms] mt-10 sm:mt-12 flex justify-center">
          <div className="relative">
            <div className="absolute -inset-3 rounded-full bg-gradient-hero opacity-60 blur-2xl" />
            <div className="relative w-36 h-36 sm:w-56 sm:h-56 rounded-full glass-strong p-1 glow">
              <img
                src={skPhoto}
                alt="SK Chaudhary Sir, Co-Founder of Safex Group"
                className="w-full h-full rounded-full object-cover"
              />
            </div>
          </div>
        </div>

        <BirthdayAnimation />
      </section>

      {/* VIDEOS */}
      {videos.length > 0 && (
        <section className="mx-auto max-w-6xl py-12 sm:py-16 px-4">
          <SectionHeader
            eyebrow={c.home_videos_eyebrow}
            title={c.home_videos_title}
            subtitle={c.home_videos_subtitle}
          />

          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3 justify-center">
            {videos.map((v, i) => (
              <article
                key={v.id}
                className="reveal is-visible hover-lift glass-strong rounded-[2rem] overflow-hidden cursor-pointer group border border-white/10 flex flex-col shadow-xl"
                style={{ transitionDelay: `${(i % 6) * 60}ms` }}
                onClick={() => setSelectedMedia({ type: "video", url: v.video_url, name: v.student_name })}
              >
                <div className="aspect-video bg-black/30 relative">
                  <video
                    src={v.video_url}
                    preload="metadata"
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute inset-0 bg-black/20 group-hover:bg-black/40 transition-colors flex items-center justify-center">
                    <div className="w-14 h-14 rounded-full bg-white/20 backdrop-blur-md flex items-center justify-center group-hover:scale-110 transition-transform">
                      <Play className="w-7 h-7 text-white fill-white" />
                    </div>
                  </div>
                </div>
                <div className="p-5 sm:p-6 bg-black/40 backdrop-blur-md border-t border-white/10 flex items-center gap-4">
                  {v.student_avatar_url && (
                    <img src={v.student_avatar_url} alt={v.student_name} className="w-12 h-12 sm:w-14 sm:h-14 rounded-full object-cover ring-2 ring-white/20 bg-white/10 shrink-0 shadow-lg" />
                  )}
                  <div className="min-w-0">
                    <h3 className="font-bold text-white text-lg sm:text-xl leading-tight truncate">{v.student_name}</h3>
                    <p className="mt-1 flex items-center gap-1.5 text-xs sm:text-sm font-medium text-white/70 uppercase tracking-widest">
                      <MapPin className="w-3.5 h-3.5 text-secondary" />
                      {v.location}
                    </p>
                  </div>
                </div>
              </article>
            ))}
          </div>
        </section>
      )}

      {/* NOTES */}
      <section className="mx-auto max-w-6xl py-12 sm:py-16 px-4">
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
          <div className="grid gap-4 sm:gap-6 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 items-start">
            {notes.map((n, i) => (
              <figure
                key={n.id}
                className="reveal is-visible hover-lift glass-strong rounded-[2rem] overflow-hidden cursor-pointer group border border-white/10 flex flex-col h-full shadow-xl"
                style={{ transitionDelay: `${(i % 6) * 60}ms` }}
                onClick={() => setSelectedMedia({ type: "note", url: n.image_url, name: n.student_name })}
              >
                <div className="relative flex-1 bg-white/5 overflow-hidden aspect-[4/5] sm:aspect-auto">
                  <img
                    src={n.image_url}
                    alt={`Note from ${n.student_name}`}
                    loading="lazy"
                    className="w-full h-full object-contain sm:object-cover group-hover:scale-105 transition-transform duration-500 min-h-[250px] sm:min-h-[300px]"
                  />
                  <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-colors" />
                </div>
                <figcaption className="p-5 sm:p-6 bg-black/40 backdrop-blur-md border-t border-white/10 flex items-center gap-4">
                  {n.student_avatar_url && (
                    <img src={n.student_avatar_url} alt={n.student_name} className="w-12 h-12 sm:w-14 sm:h-14 rounded-full object-cover ring-2 ring-white/20 bg-white/10 shrink-0 shadow-lg" />
                  )}
                  <div className="min-w-0">
                    <p className="font-bold text-white text-lg sm:text-xl leading-tight truncate">{n.student_name}</p>
                    <p className="mt-1 flex items-center gap-1.5 text-xs sm:text-sm font-medium text-white/70 uppercase tracking-widest">
                      <MapPin className="w-3.5 h-3.5 text-secondary" />
                      {n.location}
                    </p>
                  </div>
                </figcaption>
              </figure>
            ))}
          </div>
        )}
      </section>

      {/* MEDIA MODAL */}
       <Dialog open={!!selectedMedia} onOpenChange={(open) => !open && setSelectedMedia(null)}>
         <DialogContent className="max-w-[98vw] sm:max-w-[90vw] md:max-w-[85vw] lg:max-w-[75vw] p-0 border-none bg-transparent shadow-none gap-0 outline-none [&>button]:hidden">
           <DialogHeader className="sr-only">
             <DialogTitle>{selectedMedia?.name}'s {selectedMedia?.type}</DialogTitle>
           </DialogHeader>
          
          <div className="relative w-full h-full flex flex-col items-center justify-center p-2 sm:p-4">
            <div className="w-full flex justify-end mb-2">
              <DialogClose className="text-white/90 hover:text-white transition-colors focus:outline-none bg-black/40 backdrop-blur-md rounded-full p-1.5">
                <X className="w-6 h-6 sm:w-8 sm:h-8" />
                <span className="sr-only">Close</span>
              </DialogClose>
            </div>

            <div className="glass-strong rounded-2xl sm:rounded-3xl overflow-hidden w-full max-h-[80vh] flex items-center justify-center p-1 sm:p-2">
                {selectedMedia?.type === "video" ? (
                  <video
                    src={selectedMedia.url}
                    controls
                    autoPlay
                    className="max-w-full max-h-[78vh] w-auto h-auto rounded-xl sm:rounded-2xl shadow-2xl"
                  />
                ) : (
                  <img
                    src={selectedMedia?.url}
                    alt={selectedMedia?.name}
                    className="max-w-full max-h-[78vh] w-auto h-auto object-contain rounded-xl sm:rounded-2xl shadow-2xl"
                  />
                )}
            </div>
          </div>
        </DialogContent>
      </Dialog>
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
