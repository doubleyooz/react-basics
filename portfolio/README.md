# Personal portfolio — Joanderson de Souza

A Next.js + Tailwind portfolio site built to help land freelance work and
full-time roles. Content lives in one file so it's easy to keep up to date.

## Run it locally

```bash
npm install
npm run dev
```

Then open http://localhost:3000. (This first build needs internet access
once, to fetch the Google Fonts used — Space Grotesk, Inter, and
JetBrains Mono.)

## Before you publish

1. **Replace the placeholder email.** Open `lib/data.ts` and change
   `hello@joanderson.dev` to a real inbox.
2. **Double-check the GitHub/LinkedIn links** in the same file.
3. **Swap in real project descriptions** if you want more detail than the
   short blurbs pulled together from your GitHub profile.
4. **Add a resume link** if you want one — an easy spot is next to "Say
   hello" in `components/Header.tsx`.
5. **Replace `app/favicon.ico`** with your own icon if you'd like.

## Project structure

```
app/
  layout.tsx      → fonts, metadata
  page.tsx        → assembles the sections
  globals.css     → design tokens (colors, fonts, animations)
components/
  Header.tsx      → sticky nav
  Hero.tsx        → headline + the "how a project moves through my hands" pipeline
  About.tsx       → bio + quick facts
  Stack.tsx       → tech stack, grouped
  Projects.tsx    → project cards (pulled from github.com/doubleyooz)
  Focus.tsx       → "what's on my desk this month"
  Contact.tsx     → contact CTA
  Footer.tsx
lib/
  data.ts         → all editable content in one place
```

## Deploying

The fastest path is [Vercel](https://vercel.com/new) (made by the Next.js
team): push this folder to a GitHub repo, import it on Vercel, and it
deploys automatically on every push. Netlify and Cloudflare Pages also
support Next.js if you'd rather use one of those.
