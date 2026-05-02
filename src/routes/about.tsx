import { createFileRoute } from "@tanstack/react-router";
import { Sparkles } from "lucide-react";
import { useSiteContent, DEFAULT_CONTENT } from "@/hooks/useSiteContent";

export const Route = createFileRoute("/about")({
  head: () => ({
    meta: [
      { title: "About — A Tribute to SK Chaudhary Sir" },
      {
        name: "description",
        content:
          "A heartfelt birthday message for SK Chaudhary Sir from the CodeYogi family. Made by Lavish and Himanshu.",
      },
      { property: "og:title", content: "About — A Tribute to SK Chaudhary Sir" },
      { property: "og:description", content: "A heartfelt birthday message from the CodeYogi family." },
    ],
  }),
  component: AboutPage,
});

function AboutPage() {
  const c = useSiteContent(DEFAULT_CONTENT);

  return (
    <div className="px-4 sm:px-6">
      <section className="mx-auto max-w-3xl pt-16 sm:pt-24 pb-12">
        <div className="animate-fade-up inline-flex items-center gap-2 glass rounded-full px-4 py-1.5 text-xs sm:text-sm text-white/90">
          <Sparkles className="w-3.5 h-3.5" />
          {c.about_eyebrow}
        </div>
        <h1 className="animate-fade-up [animation-delay:120ms] mt-6 text-4xl sm:text-6xl font-extrabold tracking-tight text-white leading-[1.05]">
          {c.about_title}
        </h1>
      </section>

      <section className="mx-auto max-w-3xl pb-16">
        <article className="animate-fade-up [animation-delay:240ms] glass-strong rounded-3xl p-8 sm:p-12 text-foreground/90 leading-relaxed text-lg whitespace-pre-line">
          {c.about_body}
        </article>

        <div className="reveal mt-10 text-center text-white/85">
          <p className="text-sm tracking-wide whitespace-pre-line">{c.about_signature}</p>
        </div>
      </section>
    </div>
  );
}
