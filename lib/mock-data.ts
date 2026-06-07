export const mockUser = {
  id: "user_1",
  name: "John Doe",
  email: "john@example.com",
  image: null,
  isPro: true,
};

export const mockItemTypes = [
  { id: "type_snippet", name: "snippet", icon: "Code", color: "#3b82f6", isSystem: true },
  { id: "type_prompt", name: "prompt", icon: "Sparkles", color: "#8b5cf6", isSystem: true },
  { id: "type_command", name: "command", icon: "Terminal", color: "#f97316", isSystem: true },
  { id: "type_note", name: "note", icon: "StickyNote", color: "#fde047", isSystem: true },
  { id: "type_file", name: "file", icon: "File", color: "#6b7280", isSystem: true },
  { id: "type_image", name: "image", icon: "Image", color: "#ec4899", isSystem: true },
  { id: "type_link", name: "link", icon: "Link", color: "#10b981", isSystem: true },
];

export const mockCollections = [
  {
    id: "col_1",
    name: "React Patterns",
    description: "Common React patterns and hooks",
    isFavorite: true,
    itemCount: 12,
    defaultTypeId: "type_snippet",
  },
  {
    id: "col_2",
    name: "Python Snippets",
    description: "Useful Python code snippets",
    isFavorite: false,
    itemCount: 8,
    defaultTypeId: "type_snippet",
  },
  {
    id: "col_3",
    name: "Context Files",
    description: "AI context files for projects",
    isFavorite: true,
    itemCount: 5,
    defaultTypeId: "type_file",
  },
  {
    id: "col_4",
    name: "Interview Prep",
    description: "Technical interview preparation",
    isFavorite: false,
    itemCount: 24,
    defaultTypeId: "type_snippet",
  },
  {
    id: "col_5",
    name: "Git Commands",
    description: "Frequently used git commands",
    isFavorite: true,
    itemCount: 15,
    defaultTypeId: "type_command",
  },
  {
    id: "col_6",
    name: "AI Prompts",
    description: "Curated AI prompts for coding",
    isFavorite: false,
    itemCount: 18,
    defaultTypeId: "type_prompt",
  },
];

export const mockItems = [
  {
    id: "item_1",
    title: "useAuth Hook",
    contentType: "TEXT" as const,
    content: `import { useSession } from "next-auth/react";

export function useAuth() {
  const { data: session, status } = useSession();
  return {
    user: session?.user,
    isAuthenticated: status === "authenticated",
    isLoading: status === "loading",
  };
}`,
    description: "Custom authentication hook for React applications",
    isFavorite: false,
    isPinned: true,
    language: "typescript",
    tags: ["react", "auth", "hooks"],
    createdAt: "2025-01-15T00:00:00.000Z",
    itemTypeId: "type_snippet",
    collections: ["col_1"],
  },
  {
    id: "item_2",
    title: "API Error Handling Pattern",
    contentType: "TEXT" as const,
    content: `async function fetchWithRetry(url: string, retries = 3): Promise<Response> {
  for (let i = 0; i < retries; i++) {
    try {
      const res = await fetch(url);
      if (!res.ok) throw new Error(res.statusText);
      return res;
    } catch (e) {
      if (i === retries - 1) throw e;
      await new Promise((r) => setTimeout(r, 2 ** i * 1000));
    }
  }
  throw new Error("Unreachable");
}`,
    description: "Fetch wrapper with exponential backoff retry logic",
    isFavorite: false,
    isPinned: true,
    language: "typescript",
    tags: ["api", "error-handling", "fetch"],
    createdAt: "2025-01-12T00:00:00.000Z",
    itemTypeId: "type_snippet",
    collections: ["col_1"],
  },
  {
    id: "item_3",
    title: "Git Reset Last Commit",
    contentType: "TEXT" as const,
    content: "git reset --hard HEAD~1",
    description: "Undo the last commit and discard all changes",
    isFavorite: false,
    isPinned: false,
    language: null,
    tags: ["git", "reset"],
    createdAt: "2025-01-10T00:00:00.000Z",
    itemTypeId: "type_command",
    collections: ["col_5"],
  },
  {
    id: "item_4",
    title: "Code Review Prompt",
    contentType: "TEXT" as const,
    content:
      "Review the following code for correctness, performance, and readability. Point out any bugs, suggest improvements, and explain your reasoning.",
    description: "General-purpose code review prompt for AI assistants",
    isFavorite: true,
    isPinned: false,
    language: null,
    tags: ["code-review", "ai", "prompt"],
    createdAt: "2025-01-08T00:00:00.000Z",
    itemTypeId: "type_prompt",
    collections: ["col_6"],
  },
  {
    id: "item_5",
    title: "Python List Comprehension",
    contentType: "TEXT" as const,
    content: "squares = [x**2 for x in range(10) if x % 2 == 0]",
    description: "Filter and transform a list in one line",
    isFavorite: false,
    isPinned: false,
    language: "python",
    tags: ["python", "list", "comprehension"],
    createdAt: "2025-01-05T00:00:00.000Z",
    itemTypeId: "type_snippet",
    collections: ["col_2"],
  },
];

export const mockItemTypeCounts: Record<string, number> = {
  type_snippet: 24,
  type_prompt: 18,
  type_command: 15,
  type_note: 12,
  type_file: 5,
  type_image: 3,
  type_link: 8,
};
