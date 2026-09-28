import Link from "next/link";
import type { ReactNode } from "react";

export function Container({ children, className = "" }: { children: ReactNode; className?: string }) {
  return <div className={`mx-auto max-w-7xl px-5 md:px-8 ${className}`}>{children}</div>;
}

export function Button({
  href,
  children,
  variant = "primary",
}: {
  href: string;
  children: ReactNode;
  variant?: "primary" | "ghost";
}) {
  const external = href.startsWith("http");
  const cls =
    variant === "primary"
      ? "bg-pink text-cream hover:brightness-110"
      : "border border-cream/20 text-cream hover:border-cream/60";
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
    <Container className="pt-20 pb-14 md:pt-28">
      <p className="label mb-6">
        <span className="text-pink">●</span> {eyebrow}
      </p>
      <h1 className="display max-w-5xl text-6xl md:text-8xl">{title}</h1>
      {children && <div className="mt-8 max-w-2xl text-lg text-cream/70">{children}</div>}
    </Container>
  );
}

export function PinkDot() {
  return <span className="text-pink">.</span>;
}
