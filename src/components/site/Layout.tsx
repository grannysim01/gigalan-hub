import { Link } from "@tanstack/react-router";
import type { ReactNode } from "react";
import { useContent, useContentRealtime } from "@/lib/store";

const NAV = [
  { to: "/", label: "Home" },
  { to: "/lan", label: "The LAN" },
  { to: "/gallery", label: "Gallery" },
  { to: "/seating", label: "Seating" },
  { to: "/contact", label: "Contact" },
] as const;

export function SiteLayout({ children }: { children: ReactNode }) {
  const { content } = useContent();
  useContentRealtime();
  return (
    <div className="flex min-h-screen flex-col bg-background text-foreground">
      <header className="sticky top-0 z-40 border-b border-border bg-background/85 backdrop-blur">
        <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4">
          <Link to="/" className="flex items-center gap-3">
            <span className="grid h-9 w-9 place-items-center bg-primary font-display text-2xl text-primary-foreground clip-corner">G</span>
            <span className="font-display text-2xl tracking-widest">{content.eventName}</span>
          </Link>
          <nav className="hidden items-center gap-1 md:flex">
            {NAV.map((n) => (
              <Link
                key={n.to}
                to={n.to}
                className="px-3 py-2 font-display text-sm tracking-widest text-muted-foreground transition-colors hover:text-primary"
                activeProps={{ className: "px-3 py-2 font-display text-sm tracking-widest text-primary border-b-2 border-primary" }}
                activeOptions={{ exact: n.to === "/" }}
              >
                {n.label}
              </Link>
            ))}
            <Link to="/seating" className="ml-2 bg-primary px-4 py-2 font-display text-sm tracking-widest text-primary-foreground clip-corner hover:opacity-90">
              Reserve Seat
            </Link>
          </nav>
        </div>
        {/* mobile nav */}
        <nav className="flex overflow-x-auto border-t border-border md:hidden">
          {NAV.map((n) => (
            <Link key={n.to} to={n.to}
              className="flex-1 whitespace-nowrap px-3 py-2 text-center font-display text-xs tracking-widest text-muted-foreground"
              activeProps={{ className: "flex-1 whitespace-nowrap px-3 py-2 text-center font-display text-xs tracking-widest text-primary border-b-2 border-primary" }}
              activeOptions={{ exact: n.to === "/" }}
            >{n.label}</Link>
          ))}
        </nav>
      </header>

      <main className="flex-1">{children}</main>

      <SiteFooter />
    </div>
  );
}

function SiteFooter() {
  const { content } = useContent();
  return (
    <footer className="mt-16 border-t border-border bg-surface/40">
      <div className="mx-auto grid max-w-7xl gap-8 px-4 py-12 md:grid-cols-3">
        <div>
          <div className="flex items-center gap-3">
            <span className="grid h-9 w-9 place-items-center bg-primary font-display text-2xl text-primary-foreground clip-corner">G</span>
            <span className="font-display text-2xl tracking-widest">{content.eventName}</span>
          </div>
          <p className="mt-3 text-sm text-muted-foreground">{content.tagline}</p>
        </div>
        <div>
          <h4 className="text-sm text-primary">Quick links</h4>
          <ul className="mt-3 space-y-1 text-sm">
            {NAV.map((n) => (
              <li key={n.to}><Link to={n.to} className="text-muted-foreground hover:text-primary">{n.label}</Link></li>
            ))}
          </ul>
        </div>
        <div>
          <h4 className="text-sm text-primary">Connect</h4>
          <ul className="mt-3 flex flex-wrap gap-2">
            {content.socials.map((s) => (
              <li key={s.label}>
                <a href={s.url} target="_blank" rel="noopener noreferrer"
                  className="inline-block border border-border bg-background px-3 py-1.5 text-xs uppercase tracking-widest text-muted-foreground hover:border-primary hover:text-primary">
                  {s.label}
                </a>
              </li>
            ))}
          </ul>
        </div>
      </div>
      <div className="border-t border-border px-4 py-4 text-center text-xs text-muted-foreground">
        © {new Date().getFullYear()} {content.eventName}. Built by the community, for the community.
      </div>
    </footer>
  );
}
