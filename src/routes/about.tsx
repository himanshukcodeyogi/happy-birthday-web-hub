import { createFileRoute } from "@tanstack/react-router";
import { Heart, Sparkles } from "lucide-react";

export const Route = createFileRoute("/about")({
  head: () => ({
    meta: [
      { title: "About — A Tribute to SK Chaudhary Sir" },
      {
        name: "description",
        content:
          "A heartfelt birthday message for SK Chaudhary Sir from the CodeYogi family. Built with gratitude by Lavish.",
      },
      { property: "og:title", content: "About — A Tribute to SK Chaudhary Sir" },
      { property: "og:description", content: "A heartfelt birthday message from the CodeYogi family." },
    ],
  }),
  component: AboutPage,
});

function AboutPage() {
  return (
    <div className="px-4 sm:px-6">
      <section className="mx-auto max-w-3xl pt-16 sm:pt-24 pb-12">
        <div className="animate-fade-up inline-flex items-center gap-2 glass rounded-full px-4 py-1.5 text-xs sm:text-sm text-white/90">
          <Sparkles className="w-3.5 h-3.5" />
          With deepest gratitude
        </div>
        <h1 className="animate-fade-up [animation-delay:120ms] mt-6 text-4xl sm:text-6xl font-extrabold tracking-tight text-white leading-[1.05]">
          A note for our <span className="text-gradient">Mentor</span>.
        </h1>
      </section>

      <section className="mx-auto max-w-3xl pb-16">
        <article className="animate-fade-up [animation-delay:240ms] glass-strong rounded-3xl p-8 sm:p-12 text-foreground/90 leading-relaxed text-lg space-y-6">
          <p>
            Dear <strong>SK Chaudhary Sir</strong>,
          </p>
          <p>
            On your special day, the entire CodeYogi family comes together to wish you the warmest,
            happiest birthday. Your vision behind <strong>Safex Group</strong> and the doors you have
            opened for so many of us is something we will carry with us for life.
          </p>
          <p>
            You taught us that consistency beats talent, that empathy is a superpower, and that the
            right mentor can change a person's entire trajectory. Every line of code we write, every
            problem we solve, and every dream we chase — somewhere your guidance is woven into it.
          </p>
          <p>
            This little corner of the internet is our tiny way of saying <em>thank you</em>. Thank you
            for believing in us before we believed in ourselves. Thank you for the long lessons, the
            tough love, and the endless encouragement.
          </p>
          <p>
            May this year bring you joy, health, and every success your heart desires. We love you,
            Sir. <Heart className="inline w-5 h-5 text-pink-500 fill-pink-500 -mt-1" />
          </p>
          <p className="text-right text-sm text-muted-foreground italic">— With love, your CodeYogi students</p>
        </article>

        <div className="reveal mt-10 text-center text-white/85">
          <p className="text-sm tracking-wide">Made with <span className="text-pink-300">♥</span> by <strong>Lavish</strong></p>
        </div>
      </section>
    </div>
  );
}
