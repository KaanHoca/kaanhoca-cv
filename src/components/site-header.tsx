import Link from "next/link";
import { FileText } from "lucide-react";

export function SiteHeader() {
  return (
    <header className="sticky top-0 z-30 h-14 border-b bg-background/80 backdrop-blur">
      <div className="flex h-full items-center justify-between px-4 sm:px-6">
        <Link href="/" className="flex items-center gap-2 font-semibold">
          <div className="grid h-7 w-7 place-items-center rounded-md bg-foreground text-background">
            <FileText className="h-4 w-4" />
          </div>
          <span>cv.kaanhoca</span>
        </Link>
        <nav className="flex items-center gap-2 text-sm">
          <Link
            href="/editor"
            className="rounded-md px-3 py-1.5 hover:bg-muted"
          >
            Editör
          </Link>
        </nav>
      </div>
    </header>
  );
}
