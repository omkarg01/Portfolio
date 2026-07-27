import { site } from "@/lib/content";

export function Footer() {
  return (
    <footer className="border-t border-line py-8">
      <div className="mx-auto flex max-w-6xl flex-col items-start justify-between gap-3 px-6 text-sm text-muted sm:flex-row sm:items-center">
        <p className="font-[family-name:var(--font-display)] font-medium text-fg">
          {site.name}.
        </p>
        <p>© {new Date().getFullYear()}</p>
      </div>
    </footer>
  );
}
