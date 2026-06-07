export default function DashboardPage() {
  return (
    <div className="flex flex-1 overflow-hidden">
      <aside className="w-60 border-r border-border shrink-0 p-4">
        <h2 className="text-sm font-semibold text-foreground">Sidebar</h2>
      </aside>

      <main className="flex-1 overflow-auto p-6">
        <h2 className="text-sm font-semibold text-foreground">Main</h2>
      </main>
    </div>
  );
}
