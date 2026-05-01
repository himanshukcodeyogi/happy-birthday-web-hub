import { Outlet, Link, createRootRoute, HeadContent, Scripts } from "@tanstack/react-router";
import { Toaster } from "@/components/ui/sonner";
import { SiteHeader } from "@/components/SiteHeader";
import { SiteFooter } from "@/components/SiteFooter";
import { PageBackdrop } from "@/components/PageBackdrop";

import appCss from "../styles.css?url";

function NotFoundComponent() {
  return (
    <div className="flex min-h-screen items-center justify-center px-4">
      <div className="glass-strong max-w-md text-center rounded-3xl p-10">
        <h1 className="text-7xl font-bold text-gradient bg-gradient-hero bg-clip-text">404</h1>
        <h2 className="mt-4 text-xl font-semibold">Page not found</h2>
        <p className="mt-2 text-sm text-muted-foreground">
          The page you're looking for doesn't exist.
        </p>
        <div className="mt-6">
          <Link
            to="/"
            className="inline-flex items-center justify-center rounded-full bg-gradient-hero px-5 py-2.5 text-sm font-medium text-white shadow-lg hover:opacity-90 transition"
          >
            Go home
          </Link>
        </div>
      </div>
    </div>
  );
}

export const Route = createRootRoute({
  head: () => ({
    meta: [
      { charSet: "utf-8" },
      { name: "viewport", content: "width=device-width, initial-scale=1" },
      { title: "Happy Birthday Sir 🎉 — A Tribute from CodeYogi" },
      {
        name: "description",
        content:
          "A heartfelt birthday tribute for SK Chaudhary Sir, Co-Founder of Safex Group, from the CodeYogi community.",
      },
      { property: "og:title", content: "Happy Birthday Sir 🎉 — A Tribute from CodeYogi" },
      {
        property: "og:description",
        content: "Thank you videos and handwritten notes from CodeYogi students.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:title", content: "Happy Birthday Sir 🎉 — A Tribute from CodeYogi" },
      { name: "description", content: "A modern, premium web app for a birthday tribute, showcasing student videos and notes." },
      { property: "og:description", content: "A modern, premium web app for a birthday tribute, showcasing student videos and notes." },
      { name: "twitter:description", content: "A modern, premium web app for a birthday tribute, showcasing student videos and notes." },
      { property: "og:image", content: "https://pub-bb2e103a32db4e198524a2e9ed8f35b4.r2.dev/e0554262-0f6c-4935-8c0d-7d2f115e37c4/id-preview-61bfa353--9f0ee4df-cca9-4dea-836e-22b6a78ac638.lovable.app-1777650079471.png" },
      { name: "twitter:image", content: "https://pub-bb2e103a32db4e198524a2e9ed8f35b4.r2.dev/e0554262-0f6c-4935-8c0d-7d2f115e37c4/id-preview-61bfa353--9f0ee4df-cca9-4dea-836e-22b6a78ac638.lovable.app-1777650079471.png" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
    links: [
      { rel: "stylesheet", href: appCss },
      { rel: "preconnect", href: "https://fonts.googleapis.com" },
      { rel: "preconnect", href: "https://fonts.gstatic.com", crossOrigin: "anonymous" },
      {
        rel: "stylesheet",
        href: "https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&family=Plus+Jakarta+Sans:wght@600;700;800&display=swap",
      },
    ],
  }),
  shellComponent: RootShell,
  component: RootComponent,
  notFoundComponent: NotFoundComponent,
});

function RootShell({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <head>
        <HeadContent />
      </head>
      <body>
        {children}
        <Scripts />
      </body>
    </html>
  );
}

function RootComponent() {
  return (
    <>
      <PageBackdrop />
      <SiteHeader />
      <main className="min-h-[calc(100vh-200px)]">
        <Outlet />
      </main>
      <SiteFooter />
      <Toaster position="top-center" richColors />
    </>
  );
}
