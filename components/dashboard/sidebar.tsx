"use client";

import Link from "next/link";
import {
  Code,
  Sparkles,
  Terminal,
  StickyNote,
  File,
  Image as ImageIcon,
  Link as LinkIcon,
  PanelLeft,
  Star,
  Settings,
  Menu,
} from "lucide-react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import {
  mockUser,
  mockItemTypes,
  mockCollections,
  mockItemTypeCounts,
} from "@/lib/mock-data";

const ICON_MAP: Record<string, React.ElementType> = {
  Code,
  Sparkles,
  Terminal,
  StickyNote,
  File,
  Image: ImageIcon,
  Link: LinkIcon,
};

function UserAvatar({ name }: { name: string }) {
  const initials = name
    .split(" ")
    .map((n) => n[0])
    .join("")
    .toUpperCase()
    .slice(0, 2);
  return (
    <div className="size-7 rounded-full bg-primary text-primary-foreground flex items-center justify-center text-xs font-semibold shrink-0">
      {initials}
    </div>
  );
}

function SidebarContent({ collapsed = false }: { collapsed?: boolean }) {
  const favorites = mockCollections.filter((c) => c.isFavorite);
  const allCollections = mockCollections.filter((c) => !c.isFavorite);

  return (
    <div className="flex flex-col h-full overflow-hidden">
      {/* Types */}
      <div className="flex-1 overflow-y-auto py-2">
        <nav className="px-2 space-y-0.5">
          {!collapsed && (
            <p className="px-2 py-1.5 text-[11px] font-medium uppercase tracking-widest text-muted-foreground">
              Types
            </p>
          )}
          {mockItemTypes.map((type) => {
            const Icon = ICON_MAP[type.icon];
            const count = mockItemTypeCounts[type.id] ?? 0;
            return (
              <Link
                key={type.id}
                href={`/items/${type.name}s`}
                className={cn(
                  "flex items-center gap-2.5 rounded-md px-2 py-1.5 text-sm text-muted-foreground hover:bg-muted hover:text-foreground transition-colors",
                  collapsed && "justify-center px-0"
                )}
              >
                {Icon && (
                  <Icon
                    className="size-4 shrink-0"
                    style={{ color: type.color }}
                  />
                )}
                {!collapsed && (
                  <>
                    <span className="capitalize flex-1">{type.name}s</span>
                    <span className="text-xs tabular-nums">{count}</span>
                  </>
                )}
              </Link>
            );
          })}
        </nav>

        {!collapsed && (
          <div className="mt-4 px-2 space-y-0.5">
            <p className="px-2 py-1.5 text-[11px] font-medium uppercase tracking-widest text-muted-foreground">
              Collections
            </p>

            {favorites.length > 0 && (
              <>
                <p className="px-2 pt-1 pb-0.5 text-[10px] font-medium uppercase tracking-wider text-muted-foreground/60">
                  Favorites
                </p>
                {favorites.map((col) => (
                  <Link
                    key={col.id}
                    href={`/collections/${col.id}`}
                    className="flex items-center gap-2 rounded-md px-2 py-1.5 text-sm text-muted-foreground hover:bg-muted hover:text-foreground transition-colors"
                  >
                    <Star className="size-3.5 shrink-0 fill-current text-yellow-400" />
                    <span className="flex-1 truncate">{col.name}</span>
                  </Link>
                ))}
              </>
            )}

            {allCollections.length > 0 && (
              <>
                <p className="px-2 pt-2 pb-0.5 text-[10px] font-medium uppercase tracking-wider text-muted-foreground/60">
                  All Collections
                </p>
                {allCollections.map((col) => (
                  <Link
                    key={col.id}
                    href={`/collections/${col.id}`}
                    className="flex items-center gap-2 rounded-md px-2 py-1.5 text-sm text-muted-foreground hover:bg-muted hover:text-foreground transition-colors"
                  >
                    <span className="flex-1 truncate">{col.name}</span>
                    <span className="text-xs tabular-nums">{col.itemCount}</span>
                  </Link>
                ))}
              </>
            )}
          </div>
        )}
      </div>

      {/* User area */}
      <div
        className={cn(
          "border-t border-border p-3 flex items-center gap-2.5 shrink-0",
          collapsed && "justify-center"
        )}
      >
        <UserAvatar name={mockUser.name} />
        {!collapsed && (
          <>
            <div className="flex-1 min-w-0">
              <p className="text-xs font-medium text-foreground truncate">
                {mockUser.name}
              </p>
              <p className="text-[11px] text-muted-foreground truncate">
                {mockUser.email}
              </p>
            </div>
            <Button
              variant="ghost"
              size="icon"
              className="size-6 shrink-0 text-muted-foreground hover:text-foreground"
            >
              <Settings className="size-3.5" />
            </Button>
          </>
        )}
      </div>
    </div>
  );
}

export function DashboardSidebar({
  collapsed,
  onToggle,
}: {
  collapsed: boolean;
  onToggle: () => void;
}) {
  return (
    <>
      {/* Desktop sidebar */}
      <aside
        className={cn(
          "hidden md:flex flex-col border-r border-border shrink-0 transition-all duration-200",
          collapsed ? "w-14" : "w-60"
        )}
      >
        <div
          className={cn(
            "flex items-center border-b border-border h-10 shrink-0 px-2",
            collapsed ? "justify-center" : "justify-end"
          )}
        >
          <Button
            variant="ghost"
            size="icon"
            onClick={onToggle}
            className="size-7 text-muted-foreground hover:text-foreground"
          >
            <PanelLeft className="size-4" />
          </Button>
        </div>
        <SidebarContent collapsed={collapsed} />
      </aside>

      {/* Mobile drawer */}
      <Sheet>
        <SheetTrigger className="md:hidden size-8 text-muted-foreground hover:text-foreground absolute top-3 left-3 z-10 inline-flex items-center justify-center rounded-md hover:bg-muted transition-colors">
          <Menu className="size-4" />
        </SheetTrigger>
        <SheetContent side="left" className="w-60 p-0 flex flex-col">
          <SheetHeader className="px-4 py-3 border-b border-border">
            <SheetTitle className="text-sm font-semibold">DevStash</SheetTitle>
          </SheetHeader>
          <div className="flex-1 overflow-hidden">
            <SidebarContent collapsed={false} />
          </div>
        </SheetContent>
      </Sheet>
    </>
  );
}
