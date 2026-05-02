import { useEffect, useState } from "react";
import { supabase } from "@/integrations/supabase/client";

export type ContentMap = Record<string, string>;

export function useSiteContent(defaults: ContentMap) {
  const [content, setContent] = useState<ContentMap>(defaults);

  useEffect(() => {
    let active = true;
    supabase
      .from("site_content")
      .select("key,value")
      .then(({ data }) => {
        if (!active || !data) return;
        const map = { ...defaults };
        for (const row of data as { key: string; value: string }[]) {
          map[row.key] = row.value;
        }
        setContent(map);
      });

    const ch = supabase.channel("site-content-live");
    ch.on(
      "postgres_changes",
      { event: "*", schema: "public", table: "site_content" },
      () => {
        supabase
          .from("site_content")
          .select("key,value")
          .then(({ data }) => {
            if (!data) return;
            const map = { ...defaults };
            for (const row of data as { key: string; value: string }[]) {
              map[row.key] = row.value;
            }
            setContent(map);
          });
      },
    ).subscribe();

    return () => {
      active = false;
      supabase.removeChannel(ch);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return content;
}

export const DEFAULT_CONTENT: ContentMap = {
  home_hero_eyebrow: "A celebration from the CodeYogi family",
  home_hero_title: "Happy Birthday Sir 🎉",
  home_hero_subtitle:
    "From CodeYogi Students with Love ❤️\nA heartfelt tribute to SK Chaudhary Sir, Co-Founder of Safex Group.",
  home_videos_eyebrow: "Thank You Videos",
  home_videos_title: "Messages from our students",
  home_videos_subtitle: "Heartfelt video wishes from CodeYogi students around the country.",
  home_notes_eyebrow: "Handwritten Notes",
  home_notes_title: "Words straight from the heart",
  home_notes_subtitle: "A gallery of personal notes written for Sir by our students.",
  about_eyebrow: "With deepest gratitude",
  about_title: "A note for our Mentor.",
  about_body: "",
  about_signature: "Made with ♥ by Lavish",
  footer_tagline: "A small tribute from CodeYogi Students",
};
