export const profile = {
  name: "Joanderson de Souza",
  handle: "doubleyooz",
  role: "Full-Stack Web Developer",
  location: "Brazil",
  github: "https://github.com/doubleyooz",
  linkedin: "https://www.linkedin.com/in/joanderson-de-souza-774371212/",
  // TODO: replace with a real inbox before publishing.
  email: "hello@joanderson.dev",
};

export const stack = [
  {
    label: "Frontend",
    tools: ["React", "Next.js", "Vue", "Nuxt", "Tailwind CSS", "SolidJS"],
  },
  {
    label: "Backend",
    tools: ["Node.js", "Fastify", "Hono", "NestJS", "Express", "GraphQL"],
  },
  {
    label: "Data & infra",
    tools: ["PostgreSQL", "MongoDB", "Redis", "Prisma", "Supabase", "AWS", "Docker"],
  },
  {
    label: "Exploring",
    tools: ["Rust", "Haskell", "Elm", "Solidity"],
  },
];

export const projects = [
  {
    name: "react-beeteller",
    description:
      "A currency-tracking dashboard with authentication — watch a basket of currencies move in real time from a single login.",
    tags: ["React", "TypeScript"],
    href: "https://github.com/doubleyooz/react-beeteller",
  },
  {
    name: "episode-tracker",
    description:
      "A monorepo tying one product together across three surfaces: a NestJS API, a Next.js web app, and a React Native mobile client.",
    tags: ["NestJS", "Next.js", "React Native"],
    href: "https://github.com/doubleyooz/episode-tracker",
  },
  {
    name: "fastify-gighub",
    description:
      "A GitHub-flavored API service built on Fastify, focused on lean request handling and typed responses.",
    tags: ["Fastify", "TypeScript"],
    href: "https://github.com/doubleyooz/fastify-gighub",
  },
  {
    name: "nuxt-gighub",
    description:
      "The same API concept from the Vue side of the fence — a Nuxt client built to compare ecosystems firsthand.",
    tags: ["Vue", "Nuxt"],
    href: "https://github.com/doubleyooz/nuxt-gighub",
  },
  {
    name: "express-manga-api",
    description: "A manga reader API — clean pagination and search over a large, messy catalog.",
    tags: ["Express", "JavaScript"],
    href: "https://github.com/doubleyooz/express-manga-api",
  },
  {
    name: "elm-tic-tac-toe",
    description:
      "Tic-tac-toe rebuilt in Elm to feel what UI looks like with no null, no exceptions, and no runtime surprises.",
    tags: ["Elm"],
    href: "https://github.com/doubleyooz/elm-tic-tac-toe",
  },
];

export const focus = [
  {
    title: "Landing page for a financial advisory firm",
    description: "Turning a services pitch into a page that actually converts visits into calls.",
  },
  {
    title: "Store management system",
    description: "Inventory, orders and reporting in one internal tool built for a real shop.",
  },
  {
    title: "Developer YouTube channel",
    description: "Recording the process of building software, not just the finished result.",
  },
];

export const pipeline = [
  { label: "understand", note: "the problem, not just the ticket" },
  { label: "type", note: "the shape of the data first" },
  { label: "compose", note: "small, pure, testable pieces" },
  { label: "ship", note: "and keep it easy to change" },
];

export const facts = [
  { label: "Based in", value: profile.location },
  { label: "Focus", value: "Full-stack web apps" },
  { label: "Approach", value: "Functional, typed, tested" },
  { label: "Open to", value: "Freelance & full-time" },
];
