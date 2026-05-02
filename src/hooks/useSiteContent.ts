import { useState } from "react";

export type ContentMap = Record<string, string>;

export function useSiteContent(defaults: ContentMap) {
  const [content] = useState<ContentMap>(defaults);
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
  about_body: "Wishing you a very Happy Birthday Sir 🎉\n\nYour support has played a crucial role in helping CodeYogi grow, and because of that, students like us have received the opportunity to learn and work towards our dreams.\n\nThrough CodeYogi, I have been able to learn important skills like HTML, CSS, and JavaScript, which have given a new direction to my future and boosted my confidence.\n\nYour contribution is truly inspiring. You have not just supported a program, but have helped bring a positive change in the lives of thousands of students.\n\nI pray that you always stay healthy, happy, and continue to inspire many more students in the future.\n\nThank you so much for everything Sir 🙏\n\nHappy Birthday once again, Sir! ❤️\n\n— With all our love,\nYour CodeYogi Family",
  about_signature: "Made with ♥ by CodeYogi Students",
  footer_tagline: "A small tribute from CodeYogi Students",
};
