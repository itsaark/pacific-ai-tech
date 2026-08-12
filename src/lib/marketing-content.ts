import {
  bookingUrl,
  businessPhoneDisplay,
  businessPhoneHref,
  contactEmail,
} from "@/lib/site";

export const clients = [
  {
    id: "/ 01",
    title: "Real estate agents",
    text: "Listing descriptions, comp pulls, MLS-to-flyer pipelines, follow-up sequences, weekend showings rolled into a Sunday briefing.",
  },
  {
    id: "/ 02",
    title: "Restaurant owners",
    text: "Inventory reorder, menu translation, OpenTable digest, food-cost flags, reply-to-every-review-by-Tuesday automations.",
  },
  {
    id: "/ 03",
    title: "Founders & lean teams",
    text: "Inbox triage, lead-research before calls, weekly investor updates, a meeting-notes agent that actually files things.",
  },
  {
    id: "/ 04",
    title: "Trades & small shops",
    text: "Estimate drafting from job photos, invoice chasing, supplier price-watch, scheduling, voicemail-to-CRM, end-of-day rollups.",
  },
];

export const offerings = [
  {
    id: "consulting",
    title: "Consulting and workflow audit",
    text: "Map the repeat work inside the business. Decide what AI should take, what should stay human, and what is not worth automating.",
  },
  {
    id: "deployment",
    title: "Architecture and deployment",
    text: "Design the stack, install it on the machines you already own, and wire it to the files, inboxes, and tools you already use.",
  },
  {
    id: "training",
    title: "Training and handoff",
    text: "Sit with the owner or team until they can prompt, approve, inspect, adjust, and stop the system without waiting on us.",
  },
];

export const flow = [
  {
    title: "Tell it what you want. Walk away. Come back to it done.",
    text: "Describe the result: a tidy folder, a report, a draft reply to every review, and AI figures out how to get there.",
  },
  {
    title: "Do the same thing every morning, without being asked.",
    text: "“Pull yesterday's sales, summarize my inbox, and put it on my desk by 7am.” Tell it once. It just keeps doing it.",
  },
  {
    title: "Turn a pile of stuff into a finished thing.",
    text: "A folder of receipts becomes a spreadsheet. A stack of meeting notes becomes a one-page update. A messy Downloads folder gets sorted.",
  },
  {
    title: "Take orders from your phone.",
    text: "Text it from the car. It works on your laptop while you drive. You read the finished version when you sit down.",
  },
];

export const automations = [
  {
    id: "auto-01",
    cadence: "~5 min / day",
    title: "Morning briefing",
    text: "Calendar + inbox + open tasks summarized to one screen with coffee. Knows what's urgent, what can wait.",
  },
  {
    id: "auto-02",
    cadence: "~30 min / day",
    title: "Inbox triage",
    text: "Drafts replies in your voice for low-stakes mail. Flags the ones only you should answer. Never sends without you.",
  },
  {
    id: "auto-03",
    cadence: "~2 hrs / listing",
    title: "Listing -> marketing pack",
    text: "MLS data and photos in. Flyer, social caption, Zillow blurb, email blast, and an open-house sign-in sheet out.",
  },
  {
    id: "auto-04",
    cadence: "weekly",
    title: "Review-reply agent",
    text: "Drafts a personal response to every Google, Yelp, or OpenTable review by Tuesday. You approve and post.",
  },
  {
    id: "auto-05",
    cadence: "monthly",
    title: "Invoice chaser",
    text: "Watches AR aging, drafts polite-then-firm follow-ups, attaches the original PDF. You hit send.",
  },
  {
    id: "auto-06",
    cadence: "weekly",
    title: "Lead-research dossier",
    text: "Before a sales call: one page on the person, their company, recent news, and three good opening questions.",
  },
  {
    id: "auto-07",
    cadence: "real-time",
    title: "Voicemail -> CRM",
    text: "Transcribes voicemails, files into your CRM, drafts a callback message, sets a follow-up date.",
  },
  {
    id: "auto-08",
    cadence: "daily",
    title: "Inventory & reorder",
    text: "Reads your POS or a Google sheet. Flags low stock, drafts the reorder email to the right supplier.",
  },
  {
    id: "auto-09",
    cadence: "weekly",
    title: "End-of-week digest",
    text: "Income, top customer, hours worked, what shifted. Sends to your phone Friday at 5pm so you can close the laptop.",
  },
];

export const contactOptions = [
  {
    featured: true,
    title: "/ book a meeting",
    headline: "Book a call",
    meta: "Intro call · video or phone",
    desc: "Bring one workflow that keeps stealing the week. We will tell you honestly whether AI can take it, what deployment would look like, and what we would build first.",
    cta: "Book a meeting",
    href: bookingUrl,
  },
  {
    featured: false,
    title: "/ contact us",
    headline: "Email us",
    meta: contactEmail,
    desc: "Prefer writing first? Tell us what your team does every day and where the information lives. We reply within one business day.",
    cta: "Send an email",
    href: `mailto:${contactEmail}`,
  },
  {
    featured: false,
    title: "/ call us",
    headline: "Call us",
    meta: businessPhoneDisplay,
    desc: "Have a business workflow in mind? Call Pacific AI Tech to discuss the fit. If we miss you, leave your name, business, and the best time to call back.",
    cta: `Call ${businessPhoneDisplay}`,
    href: businessPhoneHref,
  },
];

export const ticker = [
  "AI consulting",
  "Solutions architecture + deployment",
  "Local-first setup + coaching",
  "Realtors · Restaurants · Founders · Trades",
  "Portland · Salem · Vancouver · Olympia",
  "Custom engagements / scoped per business",
];
