export type CaseStudy = {
  slug: string;
  eyebrow: string;
  title: string;
  seoTitle: string;
  metaDescription: string;
  clientLabel: string;
  clientUrl?: string;
  industry: string;
  location: string;
  status: string;
  summary: string;
  publishedDate?: string;
  modifiedDate?: string;
  heroImage?: {
    src: string;
    alt: string;
    width: number;
    height: number;
    caption: string;
  };
  metrics: {
    value: string;
    label: string;
    detail: string;
  }[];
  challenge: string;
  approach: string[];
  outcomes: string[];
  narrative: {
    heading: string;
    paragraphs: string[];
  }[];
  pullQuote: string;
};

export const caseStudies: CaseStudy[] = [
  {
    slug: "frostbox-logistics-ai-dispatch",
    eyebrow: "Case study / Frostbox Logistics",
    title: "The dispatcher who stopped living inside the load boards",
    seoTitle: "AI Dispatch Automation for Frostbox Logistics",
    metaDescription:
      "How Pacific AI Tech helped Frostbox Logistics use a local Hermes AI agent with Truckstop, DAT, and Motive to monitor freight, draft bids, and keep the owner in control.",
    clientLabel: "Frostbox Logistics",
    clientUrl: "https://www.frostboxlogistics.com/",
    industry: "Refrigerated trucking",
    location: "Coburg, Oregon · Pacific Northwest",
    status: "Published",
    publishedDate: "2026-06-15",
    modifiedDate: "2026-06-16",
    heroImage: {
      src: "/pacific-ai-tech/img/case-studies/frostbox-logistics-ascii.jpg",
      alt: "ASCII-style image of a refrigerated truck under a Pacific Northwest sky",
      width: 1800,
      height: 1040,
      caption:
        "Frostbox Logistics moves temperature-sensitive freight across Oregon, Washington, and the Pacific Northwest.",
    },
    summary:
      "Frostbox Logistics is a solo-founder refrigerated trucking business in Oregon. Pacific AI Tech set up a local Hermes agent on a Mac mini to watch load-board opportunities, draft bids, negotiate in the founder's voice, and ask for approval before driver dispatch.",
    metrics: [
      {
        value: "5-6 hrs",
        label: "daily load-board work moved out of the founder's hands",
        detail:
          "The agent now runs scheduled searches instead of asking the owner to sit in front of a laptop for most of the day.",
      },
      {
        value: "4-5 hrs",
        label: "between scheduled freight scans",
        detail:
          "Hermes refreshes the load search throughout the day against the fleet's lanes, size constraints, and refrigerated freight requirements.",
      },
      {
        value: "Owner-approved",
        label: "before dispatch",
        detail:
          "The system prepares the work, but the founder still approves confirmed loads before driver instructions go out.",
      },
    ],
    challenge:
      "The founder was spending five to six hours a day searching load boards, sending bids, negotiating rates, checking driver routes, and trying to keep trucks from returning empty. The business needed more coverage without turning the owner into a full-time dispatcher.",
    approach: [
      "Installed Hermes on a dedicated Mac mini so the dispatch workflow could run locally, under the founder's control.",
      "Connected Truckstop and DAT, then constrained searches by Frostbox's refrigerated fleet, preferred lanes, and Pacific Northwest operating region.",
      "Encoded the founder's bidding and negotiation style into reusable agent instructions so emails sound like the operator, not a chatbot.",
      "Connected route visibility from Motive's GPS and ELD system so Hermes can begin return-load searches before a truck reaches its destination.",
      "Kept the final decision human: when a load is ready, Hermes sends the founder an iMessage approval request before driver details and paperwork move forward.",
    ],
    outcomes: [
      "Load discovery, first-pass bidding, follow-up emails, and return-load scouting now run as scheduled jobs throughout the day.",
      "The founder spends less time refreshing load boards and more time deciding which work is worth taking.",
      "Drivers receive approved load details after the founder confirms the plan, preserving human control over dispatch.",
      "A separate outreach job contacts past customers when trucks are empty, turning old relationships into another freight source.",
    ],
    narrative: [
      {
        heading: "The work before the work",
        paragraphs: [
          "On paper, Frostbox Logistics is in the refrigerated trucking business. In practice, the founder's day was being consumed by the work around the freight: checking load boards, watching rates move, calling and emailing brokers, then doing it again before a truck rolled home empty.",
          "That kind of work is hard to hand off. It is repetitive, but not simple. A good bid depends on lane, timing, equipment, temperature sensitivity, driver position, and the founder's sense of what a fair rate sounds like in a real conversation.",
        ],
      },
      {
        heading: "A local agent, not a replacement dispatcher",
        paragraphs: [
          "Pacific AI Tech set up Hermes on a Mac mini inside the business instead of sending the workflow into another monthly software platform. The agent was taught the company's operating region, the fleet's constraints, and the founder's own negotiation habits.",
          "Every few hours, Hermes checks available freight through Truckstop and DAT. It filters for the loads Frostbox can actually run, prepares bids, drafts negotiation emails, and keeps working the thread until there is something worth putting in front of the owner.",
        ],
      },
      {
        heading: "The empty-mile problem",
        paragraphs: [
          "The second half of dispatch starts before delivery. By reading location and route context from Motive, Hermes can see when a truck is nearing its destination and begin looking for return freight a day or two ahead of arrival.",
          "That matters for a small refrigerated carrier in Oregon and Washington. Empty miles are not just wasted fuel. They are time, driver capacity, and cold-chain equipment moving without a paying load.",
        ],
      },
      {
        heading: "The founder is still the founder",
        paragraphs: [
          "The automation does not send a truck on its own. When the bid is ready and the paperwork is in motion, Hermes messages the founder on iMessage. He approves the load, and only then does the system notify the driver with pickup, destination, and load details.",
          "The result is not a founder removed from the business. It is a founder moved up a level: away from constant refresh-and-reply work, back toward judgment, relationships, and time with family.",
        ],
      },
    ],
    pullQuote:
      "The point was never to let software run the company. The point was to give the founder a dispatcher that could do the waiting, watching, drafting, and reminding while he stayed in charge.",
  },
  {
    slug: "client-story-02",
    eyebrow: "Case study / 02",
    title: "Second client story ready for details",
    seoTitle: "Second Client Story Ready for Details",
    metaDescription:
      "A draft Pacific AI Tech case study slot ready for the second approved client story.",
    clientLabel: "Client name pending approval",
    industry: "Industry pending",
    location: "Location pending",
    status: "Draft slot",
    summary:
      "This slot is ready for the second client story and can be published with a client name or as an anonymized operator profile.",
    metrics: [
      {
        value: "Pending",
        label: "approved result",
        detail: "Add a concrete result once the client approves publication.",
      },
    ],
    challenge:
      "Add the operational pain here. The strongest version names the work the client was doing manually and why it mattered to their business.",
    approach: [
      "Identified the repeatable parts of the workflow and separated them from judgment calls.",
      "Built a working automation path with review points before anything customer-facing went out.",
      "Left the client with a plain-language operating pattern they could reuse.",
    ],
    outcomes: [
      "Add the business result once approved by the client.",
      "Add the before-and-after workflow in one sentence.",
      "Add any metric, quote, or qualitative win the client is comfortable sharing.",
    ],
    narrative: [
      {
        heading: "Story pending",
        paragraphs: [
          "This page is ready for the second approved client story.",
        ],
      },
    ],
    pullQuote:
      "Add an approved quote or a short anonymized result statement once the story is ready.",
  },
];

export function getCaseStudy(slug: string) {
  return caseStudies.find((study) => study.slug === slug);
}
