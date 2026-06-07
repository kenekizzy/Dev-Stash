import { Search, Plus } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex flex-col h-screen">
      <header className="flex items-center gap-4 px-4 h-14 border-b border-border shrink-0">
        <span className="font-semibold text-foreground text-sm tracking-tight mr-2">
          DevStash
        </span>

        <div className="relative flex-1 max-w-md">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 size-4 text-muted-foreground pointer-events-none" />
          <Input
            placeholder="Search items..."
            className="pl-9 h-8 bg-muted border-transparent focus-visible:ring-0 focus-visible:border-border text-sm"
          />
        </div>

        <div className="flex items-center gap-2 ml-auto">
          <Button variant="outline" size="sm" className="h-8 text-xs">
            New Collection
          </Button>
          <Button size="sm" className="h-8 text-xs gap-1.5">
            <Plus className="size-3.5" />
            New Item
          </Button>
        </div>
      </header>

      {children}
    </div>
  );
}
