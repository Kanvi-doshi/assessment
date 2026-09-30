// B11 · ES6+: Debounce & Throttle   2 min · 2 marks
// ●	Write debounce(fn, delay) and throttle(fn, limit) (ES module exports).

export function debounce(fn, delay) {
  let timer;

  return function (...args) {
    clearTimeout(timer);

    timer = setTimeout(() => {
      fn(...args);
    }, delay);
  };
}

export function throttle(fn, limit) {
  let waiting = false;

  return function (...args) {
    if (!waiting) {
      fn(...args);

      waiting = true;

      setTimeout(() => {
        waiting = false;
      }, limit);
    }
  };
}
// ●	One line each: which would you use for a search box, and which for window scroll?
// search- debounce
// window Scroll:- throttle


// B6 · Next.js: App Router, Rendering, Middleware   3 min · 4 marks
// ●	Write the file tree for: root layout, a /rooms list page, a /rooms/[id] dynamic page, and middleware.ts.
// ●	Server Component code: await fetch("https://api.example.com/rooms", { next: { revalidate: 60 } }) — which rendering mode is this (SSG / SSR / ISR)? Write one line on how you'd force SSR instead.
// ●	middleware.ts: redirect to /login when the token cookie is missing on any path starting with /dashboard.

// B7 · Express Security & Extras (write in TypeScript types)   3 min · 6 marks
// ●	verifyJwt(req: Request, res: Response, next: NextFunction): read the Bearer token, verify with jsonwebtoken, attach req.user, else 401.
// ●	requireRole("admin") middleware factory → 403 if req.user.role doesn't match (RBAC).
// ●	Email: sendConfirmation(to, roomName) using nodemailer (createTransport + sendMail) with a "Hotel confirmation" subject and a short HTML body.
