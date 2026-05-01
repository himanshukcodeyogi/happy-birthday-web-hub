import { Heart } from "lucide-react";

export function SiteFooter() {
  return (
    <footer className="mt-24 pb-10">
      <div className="mx-auto w-[min(1200px,calc(100%-1.5rem))] glass rounded-3xl px-6 py-8 text-center text-white/85">
        <p className="flex items-center justify-center gap-2 text-base font-medium">
          A small tribute from CodeYogi Students
          <Heart className="w-4 h-4 fill-pink-300 text-pink-300" />
        </p>
        <p className="mt-2 text-xs text-white/60">© {new Date().getFullYear()} • Made with love for SK Chaudhary Sir</p>
      </div>
    </footer>
  );
}
