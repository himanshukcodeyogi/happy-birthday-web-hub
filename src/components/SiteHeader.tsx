import { Link } from "@tanstack/react-router";
import { Cake } from "lucide-react";

export function SiteHeader() {
  return (
    <header className="sticky top-0 z-50 w-full">
      <div className="mx-auto mt-4 w-[min(1200px,calc(100%-1.5rem))] glass rounded-full px-5 py-3 flex items-center justify-between">
        <Link to="/" className="flex items-center gap-2 text-white font-semibold">
          <span className="grid place-items-center w-9 h-9 rounded-full bg-white/15 backdrop-blur">
            <Cake className="w-5 h-5" />
          </span>
          <span className="hidden sm:inline tracking-tight">SK Chaudhary Sir</span>
        </Link>
        <nav className="flex items-center gap-1 text-sm">
          <NavLink to="/">Home</NavLink>
          <NavLink to="/about">About</NavLink>
          <NavLink to="/admin">Admin</NavLink>
        </nav>
      </div>
    </header>
  );
}

function NavLink({ to, children }: { to: "/" | "/about" | "/admin"; children: React.ReactNode }) {
  return (
    <Link
      to={to}
      className="px-4 py-2 rounded-full text-white/80 hover:text-white hover:bg-white/10 transition-colors"
      activeProps={{ className: "px-4 py-2 rounded-full text-white bg-white/15" }}
      activeOptions={{ exact: true }}
    >
      {children}
    </Link>
  );
}
