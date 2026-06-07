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
  Package,
  Layers,
  Heart,
  Star,
  Pin,
  ChevronRight,
} from "lucide-react";
import { Badge } from "@/components/ui/badge";
import {
  mockItems,
  mockCollections,
  mockItemTypes,
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

function getType(typeId: string) {
  return mockItemTypes.find((t) => t.id === typeId);
}

function formatDate(iso: string) {
  return new Date(iso).toLocaleDateString("en-US", {
    month: "short",
    day: "numeric",
  });
}

// ── Stats ────────────────────────────────────────────────────────────────────

const totalItems = Object.values(mockItemTypeCounts).reduce((a, b) => a + b, 0);
const totalCollections = mockCollections.length;
const favoriteItems = mockItems.filter((i) => i.isFavorite).length;
const favoriteCollections = mockCollections.filter((c) => c.isFavorite).length;

const STATS = [
  { label: "Total Items", value: totalItems, icon: Package },
  { label: "Collections", value: totalCollections, icon: Layers },
  { label: "Favorite Items", value: favoriteItems, icon: Heart },
  { label: "Favorite Collections", value: favoriteCollections, icon: Star },
];

function StatsRow() {
  return (
    <div className="grid grid-cols-2 lg:grid-cols-4 gap-3">
      {STATS.map(({ label, value, icon: Icon }) => (
        <div
          key={label}
          className="rounded-lg border border-border bg-card p-4 flex items-center gap-3"
        >
          <div className="size-9 rounded-md bg-muted flex items-center justify-center shrink-0">
            <Icon className="size-4 text-muted-foreground" />
          </div>
          <div>
            <p className="text-2xl font-semibold text-foreground leading-none">
              {value}
            </p>
            <p className="text-xs text-muted-foreground mt-1">{label}</p>
          </div>
        </div>
      ))}
    </div>
  );
}

// ── Collection card ───────────────────────────────────────────────────────────

function CollectionCard({
  collection,
}: {
  collection: (typeof mockCollections)[number];
}) {
  const defaultType = getType(collection.defaultTypeId);
  const Icon = defaultType ? ICON_MAP[defaultType.icon] : null;

  return (
    <Link
      href={`/collections/${collection.id}`}
      className="group block rounded-lg border border-border bg-card p-4 hover:border-border/80 hover:bg-muted/30 transition-colors"
    >
      <div className="flex items-start justify-between gap-2 mb-1.5">
        <div className="flex items-center gap-2 min-w-0">
          <span className="text-sm font-semibold text-foreground truncate">
            {collection.name}
          </span>
          <span className="text-xs text-muted-foreground shrink-0">
            {collection.itemCount} items
          </span>
        </div>
        {collection.isFavorite && (
          <Star className="size-3.5 shrink-0 fill-yellow-400 text-yellow-400 mt-0.5" />
        )}
      </div>

      <p className="text-xs text-muted-foreground line-clamp-2 mb-3">
        {collection.description}
      </p>

      {Icon && defaultType && (
        <div className="flex items-center gap-1.5">
          <Icon
            className="size-3.5"
            style={{ color: defaultType.color }}
          />
          <span
            className="text-[11px] capitalize"
            style={{ color: defaultType.color }}
          >
            {defaultType.name}
          </span>
        </div>
      )}
    </Link>
  );
}

// ── Item card ─────────────────────────────────────────────────────────────────

function ItemCard({ item }: { item: (typeof mockItems)[number] }) {
  const type = getType(item.itemTypeId);
  const Icon = type ? ICON_MAP[type.icon] : null;

  return (
    <div className="flex items-start gap-3 rounded-lg border border-border bg-card px-4 py-3 hover:bg-muted/30 transition-colors">
      {Icon && type && (
        <div
          className="size-8 rounded-md flex items-center justify-center shrink-0 mt-0.5"
          style={{ backgroundColor: `${type.color}20` }}
        >
          <Icon className="size-4" style={{ color: type.color }} />
        </div>
      )}

      <div className="flex-1 min-w-0">
        <div className="flex items-center gap-2">
          <span className="text-sm font-medium text-foreground truncate">
            {item.title}
          </span>
          {item.isPinned && (
            <Pin className="size-3 shrink-0 text-muted-foreground fill-current" />
          )}
          {item.isFavorite && (
            <Star className="size-3 shrink-0 fill-yellow-400 text-yellow-400" />
          )}
        </div>

        {item.description && (
          <p className="text-xs text-muted-foreground truncate mt-0.5">
            {item.description}
          </p>
        )}

        {item.tags.length > 0 && (
          <div className="flex items-center gap-1 mt-1.5 flex-wrap">
            {item.tags.map((tag) => (
              <Badge
                key={tag}
                variant="secondary"
                className="text-[10px] px-1.5 py-0 h-4 rounded-sm"
              >
                {tag}
              </Badge>
            ))}
          </div>
        )}
      </div>

      <span className="text-[11px] text-muted-foreground shrink-0 mt-0.5">
        {formatDate(item.createdAt)}
      </span>
    </div>
  );
}

// ── Main export ───────────────────────────────────────────────────────────────

export function MainContent() {
  const pinnedItems = mockItems.filter((i) => i.isPinned);
  const recentItems = [...mockItems]
    .sort(
      (a, b) =>
        new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
    )
    .slice(0, 10);

  return (
    <div className="flex-1 overflow-auto">
      <div className="max-w-5xl mx-auto px-6 py-6 space-y-8">
        {/* Header */}
        <div>
          <h1 className="text-2xl font-semibold text-foreground">Dashboard</h1>
          <p className="text-sm text-muted-foreground mt-1">
            Your developer knowledge hub
          </p>
        </div>

        {/* Stats */}
        <StatsRow />

        {/* Collections */}
        <section>
          <div className="flex items-center justify-between mb-3">
            <h2 className="text-sm font-semibold text-foreground">
              Collections
            </h2>
            <Link
              href="/collections"
              className="flex items-center gap-0.5 text-xs text-muted-foreground hover:text-foreground transition-colors"
            >
              View all
              <ChevronRight className="size-3" />
            </Link>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
            {mockCollections.map((col) => (
              <CollectionCard key={col.id} collection={col} />
            ))}
          </div>
        </section>

        {/* Pinned items */}
        {pinnedItems.length > 0 && (
          <section>
            <div className="flex items-center gap-2 mb-3">
              <Pin className="size-3.5 text-muted-foreground fill-current" />
              <h2 className="text-sm font-semibold text-foreground">Pinned</h2>
            </div>
            <div className="space-y-2">
              {pinnedItems.map((item) => (
                <ItemCard key={item.id} item={item} />
              ))}
            </div>
          </section>
        )}

        {/* Recent items */}
        <section>
          <div className="flex items-center justify-between mb-3">
            <h2 className="text-sm font-semibold text-foreground">
              Recent Items
            </h2>
            <Link
              href="/items"
              className="flex items-center gap-0.5 text-xs text-muted-foreground hover:text-foreground transition-colors"
            >
              View all
              <ChevronRight className="size-3" />
            </Link>
          </div>
          <div className="space-y-2">
            {recentItems.map((item) => (
              <ItemCard key={item.id} item={item} />
            ))}
          </div>
        </section>
      </div>
    </div>
  );
}
