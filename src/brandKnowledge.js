// Odd Shoes — Complete Brand Knowledge Base for the AI Agent

export const BRAND = {
  name: "Odd Shoes",
  tagline: "The Tech Partner for Christian Founders",
  mission: "Build production-grade apps for Christian founders without technical teams. 50% of profits go to Kingdom work.",
  location: "Kampala, Uganda",
  email: "buildit@oddshoes.dev",
  phone: "+31 97 010 209 759",
  website: "oddshoes.dev",
  founded: 2021,
  teamSize: 8,
  avgAge: 27,
  identity: "Worshippers, musicians, and pastors blessed by God to be engineers",

  story: `Odd Shoes started in a small office in Kampala with a simple conviction: the best startups are built by people who are driven by something bigger than profit. We kept meeting brilliant Christian founders with incredible ideas — but they were stuck. They couldn't find developers who understood their vision. They couldn't afford the big agencies. They couldn't bridge the gap between their calling and a working product. So we built a studio specifically for them.`,

  values: [
    { name: "Faith First", desc: "Every decision, every product, every partnership starts with prayer. We build for an audience of One." },
    { name: "Radical Generosity", desc: "We give 50% of our profits to Kingdom work. Not because we have to — because we get to." },
    { name: "Ship It", desc: "Ideas are cheap. Execution is everything. We move fast, build lean, and get products into users' hands." },
    { name: "Excellence", desc: "If it has our name on it, it's going to be world-class. We don't do 'good enough for a startup.'" },
    { name: "Africa Rising", desc: "We're proudly Ugandan, fiercely Pan-African, and globally minded." },
    { name: "Odd is Good", desc: "We don't fit the mould and we don't want to. The best ideas come from people who see the world differently." },
  ],

  stats: {
    linesOfCode: "247,832",
    cupsOfCoffee: "1,847",
    laptopsSurvived: 12,
    worshipSongs: "∞",
    mvpsShipped: "100+",
    productsLive: "15+",
    launchTime: "5-14 days",
  },

  giveHim50: "50% of all profits go directly to Kingdom work — funding missionaries, church plants, and Kingdom initiatives across East Africa.",
};

export const SERVICES = {
  genesisBuild: {
    name: "Genesis Build",
    subtitle: "The Fast-Track MVP for Kingdom Builders",
    perfectFor: "Pre-revenue founders who need to test a God-given idea quickly",
    price: "Discussed in project planner",
    timeline: "5 days from kickoff to launch",
    includes: [
      "Single-feature MVP",
      "5-day delivery",
      "User authentication + database",
      "Clean React interface",
      "Deployed to production",
      "Simple landing page",
      "30-day bug fixes included",
    ],
    process: {
      "Day 1": "Vision Lock — 2-hour strategy call, core feature definition, tech stack decision",
      "Days 2-4": "Build — Single-feature MVP with auth, database, and React UI",
      "Day 5": "Launch — Deployed, landing page, team walkthrough",
    },
    idealClient: "Christian founders without technical co-founders, pre-revenue or under $10k/year",
    notFor: ["Multi-sided marketplaces", "Complex payment flows", "People still 'figuring it out'"],
  },

  kingdomBuilder: {
    name: "Kingdom Builder",
    subtitle: "The Complete Dev Team for Kingdom Builders",
    perfectFor: "Post-revenue founders ready to scale God's vision",
    price: "Discussed in project planner",
    timeline: "14 days build + 6 months support",
    includes: [
      "Complete product system (multiple features)",
      "14-day intensive build sprint",
      "6 months fractional CTO support",
      "Complete visual identity (logo, colors, typography)",
      "Stripe/M-Pesa integration",
      "Email/SMS automation",
      "OpenClaw deployment + 2-3 custom AI skills",
      "Admin dashboard",
    ],
    capacity: "3 projects per month",
    ctoSupport: "2 strategy calls/month, priority bug fixes (48hr), 10 design hours/month",
    idealClient: "Generating revenue, need 3-5 features, want complete brand + ongoing support",
    notFor: ["Idea-stage founders", "Teams with full-time CTO", "Unlimited revisions expected"],
  },

  aiAutomation: {
    name: "AI & Automation",
    subtitle: "Flexible AI Solutions for Kingdom Builders",
    options: {
      "Option A — DIY": "One-click OpenClaw deployment, pre-configured security, messaging integration",
      "Option B — Custom Skills": "Everything in DIY + 1-3 custom skills, 30-day support, team training (2-5 days)",
      "Option C — Full Integration": "Included in Kingdom Builder, 2-3 custom skills, security hardening, 6 months support",
    },
    exampleSkills: [
      "Send daily revenue reports from Stripe to Slack",
      "Draft responses to customer support emails",
      "Generate weekly blog posts from meeting notes",
      "Parse invoices and update accounting software",
    ],
  },

  billyPods: {
    name: "Billy Pods",
    desc: "Vetted intern Pods: 1–3 interns + coordinator to help your team ship.",
  },
};

export const TECH_STACK = {
  backend: ["Django + PostgreSQL", "Laravel + MySQL", "FastAPI + PostgreSQL"],
  frontend: ["React (web)", "React Native (mobile)", "Framer (marketing)", "Webflow (content)"],
  cms: ["Directus (API-first)", "Strapi (content-rich)"],
  ai: ["Custom AI agents", "OpenClaw deployment", "LLM integration (OpenAI, Anthropic, local models)", "Workflow automation"],
  devTools: ["Cursor", "Claude Code", "GitHub Copilot"],
  hosting: ["Railway", "Render", "Vercel", "AWS"],
};

export const TEAM = [
  { name: "Obed Edom Mugisha", role: "Team Lead, Asst. Pastor, Lead Guitarist" },
  { name: "Edwin Nahabwe", role: "Lead Guitarist, Youth Pastor, Full Stack Dev" },
  { name: "Daniel Lunyelele", role: "Artist, Back-end & Systems Engineer" },
  { name: "Ian Abenaitwe", role: "Saxophone Student, AI & Agentic AI, Basketball Enthusiast" },
  { name: "Opakrwoth Jonathan", role: "Motion Graphics, Moving Ads, AI Content Creator" },
];

export const DONT_DO = {
  projectsDeclined: ["Gambling/betting", "Adult content", "MLM schemes", "Crypto scams", "Anything illegal or ethically sketchy"],
  notOffered: ["Equity-for-work", "Payment plans longer than 30 days", "Free demo or spec work", "Unlimited revisions"],
};

export const PORTFOLIO_PROJECTS = [
  "InstantUGC", "OpenClaw", "NextGenHIMS", "Da Vinci Analytics",
  "Light Beam Media", "Glo SACCO", "School Manager",
];

export const SCRIPTURE = {
  main: '"Whatever you do, work at it with all your heart, as working for the Lord, not for human masters." — Colossians 3:23-24',
  about: '"For we are God\'s handiwork, created in Christ Jesus to do good works, which God prepared in advance for us to do." — Ephesians 2:10',
};
