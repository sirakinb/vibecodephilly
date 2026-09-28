import Link from "next/link";
import type { ReactNode } from "react";

export function Container({ children, className = "" }: { children: ReactNode; className?: string }) {
  return <div className={`mx-auto max-w-6xl px-5 md:px-8 ${className}`}>{children}</div>;
}

export function Button({
  href,
  children,
  variant = "primary",
}: {
  href: string;
  children: ReactNode;
  variant?: "primary" | "ghost" | "inverse";
}) {
  const external = href.startsWith("http");
  const cls = {
    primary: "bg-pink text-white hover:brightness-110",
    ghost: "border border-fg/20 text-fg hover:border-fg/60",
    inverse: "border border-white/25 text-white hover:border-white/70",
  }[variant];
  const className = `inline-flex items-center gap-2 rounded-full px-6 py-3 text-sm font-medium transition ${cls}`;
  return external ? (
    <a href={href} target="_blank" rel="noreferrer" className={className}>
      {children}
    </a>
  ) : (
    <Link href={href} className={className}>
      {children}
    </Link>
  );
}

export function PageHeader({ eyebrow, title, children }: { eyebrow: string; title: ReactNode; children?: ReactNode }) {
  return (
    <Container className="pt-14 pb-12 md:pt-20">
      <p className="label mb-4">{eyebrow}</p>
      <h1 className="display max-w-3xl text-4xl md:text-6xl">{title}</h1>
      {children && <div className="mt-8 max-w-2xl text-lg text-fg/70">{children}</div>}
    </Container>
  );
}
