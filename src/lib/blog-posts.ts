export type BlogPost = {
  slug: string;
  title: string;
  seoTitle: string;
  metaDescription: string;
  excerpt: string;
  topics: string[];
  publishedDate: string;
  modifiedDate: string;
  readingTime: string;
  citation?: {
    quote: string;
    speaker: string;
    date: string;
    href: string;
    hrefLabel: string;
  };
  faqs?: {
    question: string;
    answer: string;
  }[];
  heroImage?: {
    src: string;
    alt: string;
    width: number;
    height: number;
    caption: string;
  };
  sections: {
    heading: string;
    paragraphs: string[];
  }[];
};

export const blogPosts: BlogPost[] = [
  {
    slug: "close-enough-to-name-the-shop",
    title: "Close enough to name the shop",
    seoTitle: "Close to the Customer in the AI Age",
    metaDescription:
      "Paul Graham said AI leverage sits with the model or the customer. We work the customer side, starting with HVAC shops in Oregon and Washington.",
    excerpt:
      "On September 23, 2026, Paul Graham told a CS undergrad the effect in the AI age sits at either extreme: making the models, or standing close to the customer and using AI to give them exactly what they want. We work the second extreme. This week that meant reading the public license rolls for HVAC shops in Oregon and Washington.",
    topics: [
      "close to the customer",
      "AI consulting Oregon Washington",
      "HVAC contractor operations",
      "small business AI implementation",
      "local AI for contractors",
    ],
    publishedDate: "2026-09-24",
    modifiedDate: "2026-09-24",
    readingTime: "7 min read",
    citation: {
      quote:
        "A CS undergrad asked me where he could have most effect in the AI age. I said probably at either extreme: either close to the technology, actually making LLMs, or close to the customer, using AI to give them exactly what they want. Or maybe both if you can stretch that far.",
      speaker: "Paul Graham",
      date: "September 23, 2026",
      href: "https://x.com/paulg/status/2102688252473782422",
      hrefLabel: "Paul Graham on X",
    },
    faqs: [
      {
        question: "What did Paul Graham say about where to work in the AI age?",
        answer:
          "On September 23, 2026, Paul Graham wrote that a CS undergrad would probably have the most effect at either extreme: close to the technology, actually making LLMs, or close to the customer, using AI to give them exactly what they want. He added that both is possible if you can stretch that far. The post is on X: https://x.com/paulg/status/2102688252473782422",
      },
      {
        question: "Which side of that split does Pacific AI Tech work?",
        answer:
          "The customer side. Pacific AI Tech installs a local AI assistant on a small business's own computer, builds it around the repeat work, and leaves approval with the owner. The practice does not train foundation models. Oregon and Washington engagements are described at https://www.pacificaitech.com/oregon-washington-ai-consulting",
      },
      {
        question:
          "How many HVAC contractors are on the public rolls in Washington and Oregon?",
        answer:
          "On September 24, 2026, Washington L&I's public contractor file showed 1,062 active HVAC-labeled licenses with a Washington mailing address: 625 construction contractors in specialty SM (heating, ventilation, air-conditioning, and refrigeration), 401 electrical contractors in specialty 6A, 14 in restricted specialty 6B, and 22 in specialty AB for commercial and industrial refrigeration. Oregon's Building Codes Division showed 404 active LHR limited-maintenance HVAC/R licenses with an Oregon address. Oregon's Construction Contractors Board file held 56,269 active licenses and does not label HVAC as its own trade.",
      },
      {
        question: "Do Oregon and Washington publish HVAC contractor emails?",
        answer:
          "Both states collect an email when a contractor registers. Neither publishes that email on the license roster. Washington's open file has 23 columns, including phone and specialty, and no email column, even though application F625-001-000 marks email as required. Oregon's CCB file publishes a phone on 56,253 of 56,269 active licenses and no email. The LHR file publishes a mailing address and neither phone nor email. Washington prevailing-wage intent and affidavit filings do include a filing-company email. Matched to those 1,062 active licenses, 228 shops had a usable address, which came to 354 unique emails. Many of those are a staff inbox on a public-works filing.",
      },
      {
        question: "What does giving a customer exactly what they want look like in practice?",
        answer:
          "It starts with the owner's repeat work. A refrigerated carrier in Oregon got load research and a bid draft that waits for approval. A property manager got routine tenant replies handled so emergencies, visits, and cash stayed human. The same shape fits a contractor: draft the estimate, the reminder, and the ordinary answer, on the shop's own machine, and wait for the owner to send it.",
      },
    ],
    sections: [
      {
        heading: "Two extremes, and a lot of fog between them",
        paragraphs: [
          "On September 23, 2026, a student asked Paul Graham where a CS undergrad could have the most effect in the AI age. He answered in public.",
          "The industry mostly occupies the space between those two clauses. Demos, wrappers, and advice that could be pasted onto any business in any city. The extremes are stricter. One is the model itself. The other is a specific owner, with a specific pile of repeat work, who can tell in an afternoon whether the tool is any good.",
          "Pacific AI Tech is built for the second extreme. A local assistant goes on the owner's own computer. The work that actually repeats gets drafted. The send button stays in the owner's hand. That is the [Oregon and Washington practice](/oregon-washington-ai-consulting): implementation in this region, for the shop in front of us.",
        ],
      },
      {
        heading: "Close enough means you can name the shop",
        paragraphs: [
          "A category is not a customer. HVAC contractors is a category. A customer is a licensed shop in Yakima or Salem with a bond on file, a phone that rings, and a Tuesday already full.",
          "This week we read the rolls those shops already file. Washington's Department of Labor & Industries publishes the contractor roster on [data.wa.gov](https://data.wa.gov/Labor/L-I-Contractor-License-Data-General/m8qx-ubtq). Oregon's Construction Contractors Board publishes active licenses on [data.oregon.gov](https://data.oregon.gov/Business/CCB-Active-Licenses/g77e-6bhs), and the Building Codes Division publishes the trade licenses [beside it](https://data.oregon.gov/Business/Building-Codes-Division-Active-Contractor-Individu/vhbr-cuaq). The columns are the fact. A brochure is a mood.",
          "Washington registers heating and cooling as a specialty. On September 24, 2026, the live file showed 625 active construction contractors with a Washington mailing address under specialty SM, heating, ventilation, air-conditioning, and refrigeration. Another 401 active electrical contractors held specialty 6A, HVAC and refrigeration. Fourteen held the restricted 6B specialty. Twenty-two held AB, commercial and industrial refrigeration. Together that is 1,062 active HVAC-labeled licenses with a Washington address. All 625 of the specialty construction shops had a phone number on the record.",
          "The registration form, [F625-001-000](https://lni.wa.gov/forms-publications/F625-001-000.pdf), marks the email address as required. L&I uses it for training notices and changes in contractor law. The public file has 23 columns. Email is not one of them. The companion files for principals, signers, bonds, and insurance leave it off too.",
          "Oregon is a different record. The CCB file that day held 56,269 active licenses, with a phone on 56,253 of them, and no HVAC trade code. A furnace company and a framing company wear the same labels: residential general, residential specialty, commercial general. The HVAC-specific credential sits at the Building Codes Division. LHR, Limited Maintenance Contractor HVAC/R, had 404 active records with an Oregon address. That file publishes a name and a mailing address. It does not publish a phone or an email.",
          "Both states collect an email at registration. The license downloads leave it off. Washington's prevailing-wage filings are the exception that proves the shape of the data. Intent and affidavit records include the filing company's email. Matched against those 1,062 active licenses, 228 shops had at least one usable address. Repeated filings collapsed to 354 unique emails. A lot of them are a staff inbox from a public-works form. The owner is a separate person, and a separate conversation.",
        ],
      },
      {
        heading: "The roll names them. The owner says what they want.",
        paragraphs: [
          "A license file can tell you the shop exists, which specialty it holds, and which phone is on the wall. It cannot tell you which hour of the day is being wasted. That second fact is the work in front of us. Sit with the owner. Watch the thing they redo. Build only after that.",
          "The same sequence is already visible in other trades. A [refrigerated carrier in Oregon](/case-studies/frostbox-logistics-ai-dispatch) wanted load research and a bid draft waiting for a yes, with the load board still in the owner's hands. A [property manager](/blog/property-management-tenant-communication-automation) was spending the day as a message forwarder. The useful system answered the routine questions and left emergencies, property visits, and cash rent with the person.",
          "HVAC shops rhyme with that day. The owner is on a roof or in a crawlspace while the phone rings. Estimates, maintenance reminders, and the same five customer questions stack up in an inbox nobody is watching. The assistant that earns a place drafts those pieces inside the shop's own files and waits. [Implementation](/services) here means that system on their machine, and the training to run it, inspect it, and stop it.",
        ],
      },
      {
        heading: "The stretch he left open",
        paragraphs: [
          "Graham left one door ajar: maybe both, if you can stretch that far. A small practice does not stretch into training the next model. The stretch that is actually available is narrower. Use the models that already exist. Spend the attention on the customer, until what they want is a sentence you heard from them, and the implementation is something they can point at on a Tuesday.",
          "If you run a shop in Oregon or Washington and the repeat work is already obvious, [book a call](/book). Bring the task. We will say whether it is a fit.",
        ],
      },
    ],
  },
  {
    slug: "property-management-tenant-communication-automation",
    title: "Your property manager is a highly paid message forwarder",
    seoTitle: "Property Management Automation: AI Tenant Operations",
    metaDescription:
      "How AI automates tenant communication in property management — Buildium, Quo, WhatsApp, Gmail, QuickBooks — so managers only handle emergencies, visits, and cash.",
    excerpt:
      "Most tenant communication is the same dozen questions and requests on repeat. Here is how an AI operations layer across Buildium, Quo, WhatsApp, Gmail, QuickBooks, and Google Drive handles the routine, so the property manager only touches emergencies, property visits, and cash rent.",
    topics: [
      "property management automation",
      "AI tenant communication",
      "Buildium automation",
      "Quo OpenPhone automation",
      "WhatsApp Business property management",
      "QuickBooks Online integration",
      "tenant operations automation",
      "maintenance request automation",
      "rent reminder automation",
      "property management AI agents",
    ],
    publishedDate: "2026-08-15",
    modifiedDate: "2026-08-15",
    readingTime: "8 min read",
    heroImage: {
      src: "/pacific-ai-tech/img/blog/property-management-tenant-communication-automation-ascii.jpg",
      alt: "ASCII-style image of a hand holding a set of property keys",
      width: 1920,
      height: 1281,
      caption:
        "The keys stay in the property manager's hand. The message traffic around them no longer has to.",
    },
    sections: [
      {
        heading: "The most expensive message forwarder in the business",
        paragraphs: [
          "Watch a property manager work for a day and a strange pattern appears. A tenant texts about a leaking sink. The manager reads it, messages the plumber, waits, then messages the tenant back. A prospect asks about an application. The manager checks the system, then replies. Most of the job is reading a message in one place and retyping it somewhere else. The property manager is a human API.",
          "Almost all tenant communication falls into a handful of buckets: rent questions, maintenance requests, document requests, application status, and move-in or move-out logistics. Almost all of it already has an answer sitting in a system of record. The interruption is the job only because nobody built the routing.",
          "A recent job posting put the spec better than most software pitches do: automate tenant communication so the property manager only handles emergencies, property visits, and cash rent collection. That is the whole game. Not replacing the manager. Removing the forwarding.",
        ],
      },
      {
        heading: "The stack is already sitting there",
        paragraphs: [
          "The tools in that posting are not exotic: Buildium for property management, QuickBooks Online for the books, Quo (formerly OpenPhone) for calls and texts, WhatsApp Business for the tenants who live there, Gmail for email, and Google Drive for documents. Most small property operations already pay for half of this list.",
          "Each tool is good at its own job. Buildium knows the lease, the balance, and the open work orders. QuickBooks knows the money. Drive holds the documents. What is missing is the layer in the middle that listens on every channel, decides what each message is, and routes it to the system that can settle it.",
        ],
      },
      {
        heading: "What the AI layer actually does all day",
        paragraphs: [
          "Start with the questions. When is rent due? How much is my balance? Did my payment go through? The agent reads the live answer from Buildium and replies on whatever channel the tenant used — SMS, WhatsApp, or email. No portal login, no phone tag, no forty-minute delay for a forty-second answer.",
          "Then the requests. A tenant reports a leak. The agent asks the triage questions a good manager would ask — where is it, how bad is it, is water actively spreading, can you send a photo — then creates the work order in Buildium, notifies the right vendor, keeps the tenant updated, and files the thread and photos in Google Drive. The manager finds out from a summary, not from six messages.",
          "Then the rhythm. Rent reminders before the due date. Receipts after payment. A polite, escalating late sequence that follows the same rules every time. Lease copies, move-in checklists, and notices pulled from Drive and sent on request. Every message and every decision logged, so the whole thing can be audited instead of remembered.",
        ],
      },
      {
        heading: "Three things stay human on purpose",
        paragraphs: [
          "Emergencies stay human. The agent does not troubleshoot a gas smell or a burst pipe at midnight. It recognizes emergency language, stops the normal flow, and gets a human on the situation immediately — with the tenant's unit, history, and photos already attached. The escalation is fast because everything before it was quiet.",
          "Property visits stay human. Inspections, walkthroughs, showings, and move-outs need a person standing in the unit. No argument there, and no automation pretends otherwise.",
          "And cash rent collection stays human. Cash is not a messaging problem; it is a trust and security problem. The agent can schedule the pickup and log the receipt afterward, but the hand that takes the envelope should belong to the manager. The design principle is not zero human contact. It is zero wasted human contact.",
        ],
      },
      {
        heading: "What a Tuesday looks like after the routing exists",
        paragraphs: [
          "9:02 a.m.: a tenant texts a photo of a dripping faucet on WhatsApp. The agent triages it, opens the work order, and books the vendor for Thursday. 11:15: a balance question gets answered from Buildium in under a minute. 2:40 p.m.: a lease copy goes out from Drive. 4:12: a caller reports no heat. The agent detects the emergency, alerts the manager, and tells the tenant a human is on it.",
          "The manager's day: one site visit, one cash pickup, one real emergency handled fast. Zero phone tag. This is the part people get wrong about automation in a business like property management. The goal was never to make the operation feel robotic. It is to make the human parts of it happen on time.",
        ],
      },
      {
        heading: "The build order matters",
        paragraphs: [
          "Systems like this fail when they start too broad. The working order looks like this: list the ten questions and requests that arrive most, connect one channel first — usually SMS or WhatsApp — run the agent read-only against Buildium until its answers are boring and correct, then turn on writes, then turn on the proactive work like reminders. Keep a human approval step on anything sensitive until the logs earn trust.",
          "Done in that order, something quiet happens. The property manager stops being the routing layer and becomes what the job was supposed to be: the person who handles exceptions, walks properties, and knows the tenants. The portfolio can grow without growing the interruptions, which is the only version of growth a small operator actually wants.",
        ],
      },
    ],
  },
];

export function getBlogPost(slug: string) {
  return blogPosts.find((post) => post.slug === slug);
}

export function formatBlogDate(isoDate: string) {
  return new Date(`${isoDate}T00:00:00`).toLocaleDateString("en-US", {
    month: "long",
    day: "numeric",
    year: "numeric",
  });
}
