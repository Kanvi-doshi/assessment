// Next.js: App Router, Rendering, Middleware   3 min · 4 marks
// ●	Write the file tree for: root layout, a /rooms list page, a /rooms/[id] dynamic page, and middleware.ts.
// ●	Server Component code: await fetch("https://api.example.com/rooms", { next: { revalidate: 60 } }) — which rendering mode is this (SSG / SSR / ISR)? Write one line on how you'd force SSR instead.
// ●	middleware.ts: redirect to /login when the token cookie is missing on any path starting with /dashboard

// Server Component
const response = await fetch(
  "https://api.example.com/rooms",
  {
    next: { revalidate: 60 },
  }
);

const rooms = await response.json();

// ISR
// Force SSR: use { cache: "no-store" }

// middleware

export function middleware(req: NextRequest) {
  const token = req.cookies.get("token");

  if (
    req.nextUrl.pathname.startsWith("/dashboard") &&
    !token
  ) {
    return NextResponse.redirect(
      new URL("/login", req.url)
    );
  }
  return NextResponse.next();
}