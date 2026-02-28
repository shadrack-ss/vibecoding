// Odd Shoes AI Agent — Smart Marketing Chatbot Engine
// Pattern-matching + intent detection + contextual responses

import { BRAND, SERVICES, TECH_STACK, TEAM, DONT_DO, PORTFOLIO_PROJECTS, SCRIPTURE } from './brandKnowledge';

const greetings = ['hi', 'hello', 'hey', 'sup', 'yo', 'good morning', 'good afternoon', 'good evening', 'howdy', 'greetings', 'whats up', "what's up"];
const farewells = ['bye', 'goodbye', 'see you', 'later', 'thanks bye', 'ciao', 'peace'];

// Intent patterns
const intents = [
  { key: 'greeting', patterns: greetings },
  { key: 'farewell', patterns: farewells },
  { key: 'pricing', patterns: ['price', 'cost', 'how much', 'pricing', 'budget', 'afford', 'expensive', 'cheap', 'fee', 'rate', 'charge', 'payment', 'pay'] },
  { key: 'genesis', patterns: ['genesis', 'mvp', '5 day', '5-day', 'five day', 'quick build', 'fast build', 'rapid', 'quick start', 'pre-revenue', 'single feature'] },
  { key: 'kingdom', patterns: ['kingdom builder', 'kingdom build', 'complete', 'full product', '14 day', 'fourteen day', 'scale', 'full stack', 'fractional cto', 'cto support', 'ongoing support', 'post-revenue'] },
  { key: 'ai', patterns: ['ai', 'artificial intelligence', 'automation', 'openclaw', 'chatbot', 'agent', 'llm', 'machine learning', 'custom skill', 'workflow'] },
  { key: 'billy', patterns: ['billy', 'pods', 'intern', 'interns'] },
  { key: 'techstack', patterns: ['tech stack', 'technology', 'django', 'react', 'laravel', 'fastapi', 'postgresql', 'what do you use', 'stack', 'tools', 'framework'] },
  { key: 'team', patterns: ['team', 'who are you', 'developers', 'engineers', 'people', 'members', 'obed', 'edwin', 'daniel', 'ian', 'jonathan'] },
  { key: 'about', patterns: ['about', 'who is odd shoes', 'what is odd shoes', 'tell me about', 'company', 'story', 'history', 'background', 'mission', 'vision'] },
  { key: 'values', patterns: ['values', 'faith', 'christian', 'believe', 'principles', 'what drives', 'culture'] },
  { key: 'givehim50', patterns: ['give him 50', '50%', 'fifty percent', 'profits', 'donate', 'kingdom work', 'generosity', 'missionaries', 'church plant', 'tithe'] },
  { key: 'portfolio', patterns: ['portfolio', 'projects', 'work', 'case study', 'clients', 'examples', 'built', 'shipped', 'instantugc', 'glo sacco', 'nextgenhims', 'light beam'] },
  { key: 'contact', patterns: ['contact', 'email', 'phone', 'reach', 'call', 'book', 'schedule', 'talk', 'meeting', 'appointment'] },
  { key: 'location', patterns: ['where', 'location', 'based', 'office', 'kampala', 'uganda', 'africa'] },
  { key: 'timeline', patterns: ['how long', 'timeline', 'duration', 'delivery', 'turnaround', 'when', 'deadline', 'time frame', 'how fast'] },
  { key: 'getstarted', patterns: ['get started', 'start', 'begin', 'sign up', 'work with', 'hire', 'engage', 'ready', 'lets go', "let's go", 'interested', 'want to build', 'need an app', 'need a website', 'build my', 'create my'] },
  { key: 'dontdo', patterns: ["don't do", 'dont do', 'decline', 'reject', 'not accept', 'restrictions', 'limitations', 'gambling', 'equity'] },
  { key: 'process', patterns: ['process', 'how it works', 'how do you work', 'workflow', 'steps', 'methodology', 'approach'] },
  { key: 'mobile', patterns: ['mobile', 'app', 'ios', 'android', 'react native', 'phone'] },
  { key: 'scripture', patterns: ['bible', 'verse', 'scripture', 'colossians', 'ephesians', 'word of god'] },
  { key: 'help', patterns: ['help', 'what can you do', 'options', 'menu', 'services', 'offerings', 'what do you offer'] },
];

function detectIntent(message) {
  const lower = message.toLowerCase().trim();
  for (const intent of intents) {
    for (const pattern of intent.patterns) {
      if (lower.includes(pattern)) {
        return intent.key;
      }
    }
  }
  return 'unknown';
}

// Track conversation state
let conversationState = {
  hasGreeted: false,
  hasAskedAboutServices: false,
  emailCollected: false,
  turnCount: 0,
  lastIntent: null,
};

export function resetConversation() {
  conversationState = {
    hasGreeted: false,
    hasAskedAboutServices: false,
    emailCollected: false,
    turnCount: 0,
    lastIntent: null,
  };
}

export function getResponse(userMessage) {
  conversationState.turnCount++;
  const intent = detectIntent(userMessage);
  conversationState.lastIntent = intent;

  let response = { text: '', quickReplies: [], collectEmail: false, cta: null };

  switch (intent) {
    case 'greeting':
      conversationState.hasGreeted = true;
      response.text = `Hey there! 👋 Welcome to **Odd Shoes** — we're a startup studio in Kampala building production-grade apps for Christian founders.\n\nWe give **50% of our profits** to Kingdom work through our Give Him 50 initiative.\n\nWhat brings you here today?`;
      response.quickReplies = ['Tell me about your services', 'How much does it cost?', 'I want to build something', 'Who are you guys?'];
      break;

    case 'farewell':
      response.text = `God bless you! 🙏 If you ever need to build something amazing, we're right here.\n\n*"Whatever you do, work at it with all your heart, as working for the Lord."* — Col 3:23\n\nReach us anytime at **buildit@oddshoes.dev**`;
      response.cta = { text: 'Launch Project Planner', url: 'https://oddshoes.dev' };
      break;

    case 'pricing':
      response.text = `Great question! Our pricing is tailored to each project — we discuss budget openly in our **Project Planner** process.\n\nHere's what we offer:\n\n🔨 **Genesis Build** (5-day MVP) — Perfect for testing an idea quickly\n👑 **Kingdom Builder** (14-day + 6mo support) — Full product system with brand\n🤖 **AI & Automation** — OpenClaw deployment + custom AI skills\n\nWe're not the cheapest — but we're **world-class**, and 50% goes to Kingdom work. You're not just building an app; you're funding missionaries.\n\nWant to explore which service fits your budget?`;
      response.quickReplies = ['Tell me about Genesis Build', 'What\'s Kingdom Builder?', 'Launch Project Planner'];
      response.cta = { text: 'Start Project Planner →', url: 'https://oddshoes.dev' };
      break;

    case 'genesis':
      const g = SERVICES.genesisBuild;
      response.text = `## 🔨 ${g.name}\n*${g.subtitle}*\n\n**Timeline:** ${g.timeline}\n**Perfect for:** ${g.perfectFor}\n\n**What you get:**\n${g.includes.map(i => `• ${i}`).join('\n')}\n\n**The 5-Day Process:**\n• **Day 1** — ${g.process['Day 1']}\n• **Days 2-4** — ${g.process['Days 2-4']}\n• **Day 5** — ${g.process['Day 5']}\n\nReady to go from idea to launched product in one work week? 🚀`;
      response.quickReplies = ['I\'m interested!', 'What about Kingdom Builder?', 'What tech stack?'];
      response.cta = { text: 'Start Your Genesis Build →', url: 'https://oddshoes.dev' };
      break;

    case 'kingdom':
      const k = SERVICES.kingdomBuilder;
      response.text = `## 👑 ${k.name}\n*${k.subtitle}*\n\n**Timeline:** ${k.timeline}\n**Capacity:** ${k.capacity}\n**Perfect for:** ${k.perfectFor}\n\n**What you get:**\n${k.includes.map(i => `• ${i}`).join('\n')}\n\n**Fractional CTO Support (6 months):**\n${k.ctoSupport}\n\nThis is the full package — brand, product, AI, and ongoing support. We only take **3 projects per month**, so spots fill fast.`;
      response.quickReplies = ['I want this!', 'How much?', 'Tell me about Genesis instead'];
      response.cta = { text: 'Apply for Kingdom Builder →', url: 'https://oddshoes.dev' };
      break;

    case 'ai':
      const ai = SERVICES.aiAutomation;
      response.text = `## 🤖 ${ai.name}\n*${ai.subtitle}*\n\n**Three options:**\n\n**Option A — DIY Deployment** (Instant)\n${ai.options['Option A — DIY']}\n\n**Option B — Custom Skills** (2-5 days)\n${ai.options['Option B — Custom Skills']}\n\n**Option C — Full Integration** (Included in Kingdom Builder)\n${ai.options['Option C — Full Integration']}\n\n**Example AI skills we've built:**\n${ai.exampleSkills.map(s => `• "${s}"`).join('\n')}\n\nWe use **OpenClaw** — our open-source AI agent framework. What kind of automation are you thinking about?`;
      response.quickReplies = ['I need custom AI skills', 'What\'s OpenClaw?', 'Tell me about Kingdom Builder'];
      break;

    case 'billy':
      response.text = `## 👥 Billy Pods\n\n${SERVICES.billyPods.desc}\n\nNeed extra hands on your team? Billy Pods give you **vetted, coordinated interns** who can help your team ship faster.\n\nInterested in a Pod for your project?`;
      response.quickReplies = ['Request a Pod', 'Tell me about other services', 'Get in touch'];
      response.cta = { text: 'Request a Pod →', url: 'https://oddshoes.dev' };
      break;

    case 'techstack':
      response.text = `## ⚙️ Our Tech Stack\n*Production-grade tools, battle-tested and built to scale.*\n\n**Backend:** ${TECH_STACK.backend.join(' · ')}\n\n**Frontend:** ${TECH_STACK.frontend.join(' · ')}\n\n**CMS:** ${TECH_STACK.cms.join(' · ')}\n\n**AI & Automation:** ${TECH_STACK.ai.join(' · ')}\n\n**Dev Tools:** ${TECH_STACK.devTools.join(' · ')}\n\n**Hosting:** ${TECH_STACK.hosting.join(' · ')}\n\nWe pick the right stack for each project — no one-size-fits-all. What are you building?`;
      response.quickReplies = ['I need a web app', 'I need a mobile app', 'I need AI/automation'];
      break;

    case 'team':
      response.text = `## 🎸 Meet the Team\n*A small but mighty crew of designers, developers, and dreamers based in Kampala.*\n\n${TEAM.map(t => `**${t.name}** — ${t.role}`).join('\n\n')}\n\nAverage age: **${BRAND.avgAge}** · Team of **${BRAND.teamSize}**\n\nWe're worshippers first, engineers second. Every sprint starts with prayer. 🙏`;
      response.quickReplies = ['What\'s your story?', 'What are your values?', 'I want to work with you'];
      break;

    case 'about':
      response.text = `## About Odd Shoes\n\n${BRAND.story}\n\n**Identity:** ${BRAND.identity}\n**Location:** ${BRAND.location}\n**Founded:** ${BRAND.founded}\n**Team size:** ${BRAND.teamSize}\n\n**By the numbers:** ${BRAND.stats.mvpsShipped} MVPs shipped · ${BRAND.stats.productsLive} products live · ${BRAND.stats.launchTime} to launch\n\nA place where faith isn't a footnote — it's the **foundation**. ✝️`;
      response.quickReplies = ['What are your values?', 'What services do you offer?', 'Tell me about Give Him 50'];
      break;

    case 'values':
      response.text = `## Our Values\n\n${BRAND.values.map(v => `**${v.name}**\n${v.desc}`).join('\n\n')}\n\nThese aren't just words on a wall — they're how we make every decision. 🔥`;
      response.quickReplies = ['Tell me about Give Him 50', 'What services do you offer?', 'I love this, let\'s build!'];
      break;

    case 'givehim50':
      response.text = `## 💛 Give Him 50\n\n${BRAND.giveHim50}\n\n**What it's funded so far:**\n• 5 missionaries supported\n• 3 church plants\n• Kingdom initiatives across East Africa\n\nWhen you work with Odd Shoes, you're not just getting a great product — **half of what you pay goes directly to advancing God's Kingdom.**\n\nEvery line of code has purpose. Every invoice funds a missionary. 🙌`;
      response.quickReplies = ['That\'s amazing!', 'Tell me about your services', 'I want to build something'];
      break;

    case 'portfolio':
      response.text = `## 🏆 Our Work\n*${BRAND.stats.mvpsShipped} MVPs shipped · ${BRAND.stats.productsLive} products live*\n\nSome projects we've brought to life:\n\n${PORTFOLIO_PROJECTS.map(p => `• **${p}**`).join('\n')}\n\nFrom SaaS & AI products to web platforms and mobile apps — we've helped founders across East Africa and beyond go from napkin sketch to launched product.\n\nWant to see the full portfolio?`;
      response.quickReplies = ['Visit oddshoes.dev', 'I want something similar', 'What services do you offer?'];
      response.cta = { text: 'View All Projects →', url: 'https://oddshoes.dev' };
      break;

    case 'contact':
      response.text = `## 📬 Let's Connect!\n\n**Email:** buildit@oddshoes.dev\n**Phone:** ${BRAND.phone}\n**Location:** ${BRAND.location}\n\nYou can also:\n• **Launch our Project Planner** to share your vision\n• **Book a call** to chat with the team\n\nWe typically respond within 24 hours. What works best for you?`;
      response.quickReplies = ['Launch Project Planner', 'Book a call', 'Send an email'];
      response.cta = { text: 'Launch Project Planner →', url: 'https://oddshoes.dev' };
      if (!conversationState.emailCollected) {
        response.collectEmail = true;
      }
      break;

    case 'location':
      response.text = `We're based in **Kampala, Uganda** 🇺🇬 — proudly African, globally minded!\n\nWe work with founders across East Africa and internationally. Distance is never a barrier — we're built for remote collaboration.\n\n*"Africa Rising"* is one of our core values. The next tech revolution starts here. 🌍`;
      response.quickReplies = ['Tell me about the team', 'What services do you offer?', 'How do I get started?'];
      break;

    case 'timeline':
      response.text = `## ⏱️ Our Timelines\n\n**Genesis Build:** 5 days (Mon-Fri, idea to launched product)\n**Kingdom Builder:** 14-day sprint + 6 months CTO support\n**AI & Automation:** Instant (DIY) to 2-5 days (custom)\n**Billy Pods:** Ongoing as needed\n\nWe don't do months-long builds. We move **fast** — because your God-given idea deserves to be in the world, not in a backlog.\n\nWhich timeline works for your project?`;
      response.quickReplies = ['Genesis Build (5 days)', 'Kingdom Builder (14 days)', 'I need it ASAP'];
      break;

    case 'getstarted':
      response.text = `🚀 **Let's build something that matters!**\n\nHere's how to get started:\n\n**1. Launch our Project Planner** — Share your vision, budget, and timeline\n**2. Discovery Call** — We listen, validate, and align on God's purpose\n**3. Strategy Sprint** — Deep-dive planning\n**4. Build & Ship** — Weekly demos, fast delivery\n\nWhich service interests you?\n• 🔨 **Genesis Build** — 5-day MVP ($)\n• 👑 **Kingdom Builder** — 14-day full product ($$)\n• 🤖 **AI & Automation** — Custom AI solutions`;
      response.quickReplies = ['Genesis Build', 'Kingdom Builder', 'AI & Automation', 'Not sure yet'];
      response.cta = { text: 'Launch Project Planner →', url: 'https://oddshoes.dev' };
      if (!conversationState.emailCollected) {
        response.collectEmail = true;
      }
      break;

    case 'dontdo':
      response.text = `## What We Don't Do\n\n**Projects we decline:**\n${DONT_DO.projectsDeclined.map(p => `• ${p}`).join('\n')}\n\n**What we don't offer:**\n${DONT_DO.notOffered.map(p => `• ${p}`).join('\n')}\n\nWe're selective because we want every project to align with our mission. If your project honors God and serves people — let's talk! 🙏`;
      response.quickReplies = ['What DO you do?', 'Tell me about your services', 'Get in touch'];
      break;

    case 'process':
      response.text = `## How It Works\n*From prayer to product* 🙏→🚀\n\n**Step 1: Discovery Call**\nWe listen to your vision, validate your idea, and align on God's purpose for your startup.\n\n**Step 2: Strategy Sprint**\nDeep-dive planning — user research, competitive analysis, tech architecture, go-to-market.\n\n**Step 3: Build & Ship**\nOur team designs and develops your MVP with weekly demos so you always know where things stand.\n\n**Step 4: Launch & Grow**\nWe don't disappear after launch. We help you get your first users, refine the product, and prepare for investors.\n\nReady to start the journey?`;
      response.quickReplies = ['Let\'s do it!', 'How long does it take?', 'How much does it cost?'];
      response.cta = { text: 'Start Your Journey →', url: 'https://oddshoes.dev' };
      break;

    case 'mobile':
      response.text = `## 📱 Mobile Apps\n\nWe build mobile apps with **React Native** — one codebase for both iOS and Android.\n\nCombined with our backend expertise (Django/FastAPI/Laravel), we deliver full-stack mobile solutions.\n\nOur **Kingdom Builder** package is perfect for mobile app projects — it includes 14 days of intensive building plus 6 months of support.\n\nWhat kind of app are you thinking about?`;
      response.quickReplies = ['Tell me about Kingdom Builder', 'What\'s your tech stack?', 'I want to get started'];
      break;

    case 'scripture':
      response.text = `${SCRIPTURE.main}\n\n${SCRIPTURE.about}\n\nThese aren't just quotes to us — they're the operating system of Odd Shoes. We code as worship. We ship as service. 🙏`;
      response.quickReplies = ['Tell me about Odd Shoes', 'What\'s Give Him 50?', 'I want to build something'];
      break;

    case 'help':
      conversationState.hasAskedAboutServices = true;
      response.text = `Here's what I can help you with! 🙌\n\n**Our Services:**\n🔨 **Genesis Build** — 5-day MVP for pre-revenue founders\n👑 **Kingdom Builder** — 14-day full product + 6mo support\n🤖 **AI & Automation** — OpenClaw, custom AI agents, workflow automation\n👥 **Billy Pods** — Vetted intern teams for your project\n\n**I can also tell you about:**\n• Our team & story\n• Tech stack & process\n• Give Him 50 (our generosity model)\n• Pricing & timelines\n• Portfolio & past work\n\nWhat interests you?`;
      response.quickReplies = ['Genesis Build', 'Kingdom Builder', 'AI & Automation', 'Get started'];
      break;

    default:
      // Smart fallback based on conversation state
      if (conversationState.turnCount <= 1) {
        response.text = `Hey! 👋 I'm the Odd Shoes AI assistant. I'm here to help you learn about our services and get your project started.\n\n**Odd Shoes** is a startup studio in Kampala building production-grade apps for Christian founders — and we give 50% of profits to Kingdom work.\n\nWhat would you like to know?`;
        response.quickReplies = ['What services do you offer?', 'How much does it cost?', 'Who are you?', 'I want to build something'];
      } else {
        response.text = `That's a great question! While I might not have the exact answer, here's what I'd suggest:\n\n📧 **Email us directly** at buildit@oddshoes.dev for specific questions\n📋 **Launch our Project Planner** to share your vision and we'll get back to you fast\n📞 **Book a call** to speak with the team\n\nOr ask me about our **services**, **pricing**, **team**, or **process** — I know all about those! 😊`;
        response.quickReplies = ['Tell me about your services', 'How does pricing work?', 'Launch Project Planner'];
        response.cta = { text: 'Email buildit@oddshoes.dev', url: 'mailto:buildit@oddshoes.dev' };
      }
      break;
  }

  // Periodically suggest email collection (after 3+ turns, if not collected)
  if (conversationState.turnCount >= 3 && !conversationState.emailCollected && !response.collectEmail && conversationState.turnCount % 3 === 0) {
    response.text += `\n\n---\n💡 *Want us to follow up? Drop your email and we'll reach out personally.*`;
    response.collectEmail = true;
  }

  return response;
}

export function setEmailCollected() {
  conversationState.emailCollected = true;
}

export function getConversationState() {
  return { ...conversationState };
}
