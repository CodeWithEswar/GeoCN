import Link from "next/link";

interface DocsLayoutProps {
  children: React.ReactNode;
}

const navSections = [
  {
    title: "Getting Started",
    links: [
      { title: "Introduction", href: "/docs" },
      { title: "Installation & Setup", href: "/docs#setup" },
    ],
  },
  {
    title: "Architecture & Design",
    links: [
      { title: "Monorepo Architecture", href: "/docs/architecture" },
      { title: "Geographic Data Pipeline", href: "/docs/pipeline" },
      { title: "Shadcn Registry Model", href: "/docs/registry" },
    ],
  },
  {
    title: "Engineering Foundation",
    links: [
      { title: "Cartographic Design Tokens", href: "/docs/architecture#tokens" },
      { title: "Data Provenance Standards", href: "/docs/pipeline#provenance" },
      { title: "Accessibility Principles", href: "/docs/architecture#a11y" },
    ],
  },
];

export default function DocsLayout({ children }: DocsLayoutProps) {
  return (
    <div className="container mx-auto max-w-7xl px-4 sm:px-6">
      <div className="flex-1 items-start md:grid md:grid-cols-[220px_minmax(0,1fr)] md:gap-8 lg:grid-cols-[240px_minmax(0,1fr)] lg:gap-10 py-8">
        {/* Sidebar */}
        <aside className="fixed top-14 z-30 -ml-2 hidden h-[calc(100vh-3.5rem)] w-full shrink-0 md:sticky md:block overflow-y-auto pr-4 border-r border-zinc-200/80 dark:border-zinc-800/80">
          <div className="flex flex-col gap-6 py-4">
            {navSections.map((section) => (
              <div key={section.title} className="flex flex-col gap-2">
                <h4 className="text-xs font-mono font-semibold uppercase tracking-wider text-zinc-900 dark:text-zinc-100">
                  {section.title}
                </h4>
                <div className="flex flex-col gap-1 text-sm">
                  {section.links.map((link) => (
                    <Link
                      key={link.href}
                      href={link.href}
                      className="rounded-md px-2 py-1.5 text-zinc-600 transition-colors hover:bg-zinc-100 hover:text-zinc-900 dark:text-zinc-400 dark:hover:bg-zinc-800 dark:hover:text-zinc-100"
                    >
                      {link.title}
                    </Link>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </aside>

        {/* Documentation Content */}
        <main className="relative py-4 lg:gap-10">{children}</main>
      </div>
    </div>
  );
}
