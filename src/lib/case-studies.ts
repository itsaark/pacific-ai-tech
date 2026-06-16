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
    slug: "kristi-blain-real-estate-ai-assistant",
    eyebrow: "Case study / Kristi Blain",
    title: "A real-estate workday that stops disappearing into notes",
    seoTitle: "AI Assistant for Kristi Blain Real Estate",
    metaDescription:
      "How Pacific AI Tech helped Kristi Blain, a real estate broker in the Eugene and Coburg area, run Claude Cowork on a MacBook Pro for listing research, follow-ups, Canva flyers, PDFs, and client work.",
    clientLabel: "Kristi Blain",
    clientUrl: "https://www.zillow.com/profile/CEGkristi",
    industry: "Residential real estate",
    location: "Eugene and Coburg, Oregon",
    status: "Published",
    publishedDate: "2026-06-16",
    modifiedDate: "2026-06-16",
    heroImage: {
      src: "/pacific-ai-tech/img/case-studies/kristi-blain-real-estate-ai-assistant-ascii.jpg",
      alt: "ASCII-style image of a red residential home representing real estate research and client work",
      width: 1800,
      height: 1200,
      caption:
        "Kristi Blain's Claude Cowork setup watches listings, gathers property context, and keeps client follow-up organized between showings.",
    },
    summary:
      "Kristi Blain is a real estate broker in the Eugene and Coburg area. Pacific AI Tech helped her move from scattered tabs, notes, county records, reminders, and end-of-day memory work into a local Claude Cowork setup on a MacBook Pro.",
    metrics: [
      {
        value: "Daily",
        label: "listing brief",
        detail:
          "Claude Cowork reviews new homes in Kristi's areas of interest and turns them into a practical market brief.",
      },
      {
        value: "End of day",
        label: "relationship notes and tasks",
        detail:
          "A guided AskKit check-in captures who she met, what she learned, and what still needs follow-up.",
      },
      {
        value: "Weekly PDF",
        label: "client and property review",
        detail:
          "Conversation notes, property research, and pending work are formatted into a clean PDF she can review at week's end.",
      },
    ],
    challenge:
      "Kristi's best work happens away from the desk: showing homes, meeting buyers and sellers, following local inventory, checking county records, and remembering the small details that make a client feel heard. The problem was not a lack of effort. It was that the administrative work kept following her home.",
    approach: [
      "Advised Kristi to move to a newer MacBook Pro so Claude Cowork could run efficiently on her own laptop.",
      "Set up a daily listing-research automation for the Eugene, Coburg, and surrounding areas she watches closely.",
      "Built an end-of-day AskKit workflow that captures people met, details learned, commitments made, and follow-up tasks.",
      "Configured Claude Cowork to research properties through public county records, collect relevant documents, and organize reminders around key transaction dates.",
      "Connected Claude Cowork to Kristi's Canva account so open-house flyer work can start from a listing request instead of a blank design file.",
      "Taught Kristi how to use Dispatch while she is out showing homes so she can reach files and context on the MacBook running at home.",
    ],
    outcomes: [
      "Kristi starts the day with a sharper view of new listings instead of rebuilding the same search from scratch.",
      "Meeting notes and follow-up tasks are captured before the details fade.",
      "Property research, county records, document reminders, and important dates are organized into reviewable work instead of loose tabs and memory.",
      "When Kristi needs an open-house flyer, Claude Cowork can pull the Zillow listing context, gather the house photos, prepare the Canva design, and leave Kristi to approve and order the print run.",
      "Remote access through Dispatch gives Kristi more room to be present with clients while her home laptop keeps the back-office context available.",
    ],
    narrative: [
      {
        heading: "The quiet tax on a real-estate day",
        paragraphs: [
          "A real-estate agent's calendar looks mobile from the outside: showings, calls, client meetings, quick stops, longer conversations in driveways and kitchens. But the work has a second life at the desk. Listings have to be watched. Property details have to be checked. County records have to be found. Names, needs, and promises have to make it out of the day intact.",
          "For Kristi Blain, a real estate broker with Triple Oaks Realty in the Eugene and Coburg area, the goal was not to automate the human part of the business. It was to protect it from the paperwork around it.",
        ],
      },
      {
        heading: "A laptop that remembers the market",
        paragraphs: [
          "Pacific AI Tech first advised Kristi to upgrade to a newer MacBook Pro so Claude Cowork could run comfortably on her own machine. Then we set up the laptop to do the kind of watching that usually eats the first part of a workday.",
          "Each day, Claude Cowork reviews new listings in the areas Kristi cares about and turns the search into a plain-language breakdown: what came on the market, what stands out, which homes may matter for active clients, and where a closer look is worth her time.",
        ],
      },
      {
        heading: "The end-of-day check-in",
        paragraphs: [
          "The second workflow is less about listings and more about memory. At the end of the day, AskKit walks Kristi through who she met, what she learned, what each person may need next, and which loose ends should not be trusted to tomorrow morning.",
          "During the week, Claude Cowork turns those notes into a structured PDF: client context, property research, pending tasks, documents to find, reminders to send, and dates that matter, including closing and other transaction milestones.",
        ],
      },
      {
        heading: "Research without the tab pile",
        paragraphs: [
          "Real-estate research is often scattered across listing pages, county records, saved files, email threads, and calendar reminders. We taught Claude Cowork how Kristi likes that work gathered and formatted, then gave it access to the local file context it needs to keep research moving.",
          "The setup helps with county property information, document retrieval, date reminders, and the kind of back-and-forth that can otherwise turn a client day into an administrative night.",
        ],
      },
      {
        heading: "A flyer that starts with the listing",
        paragraphs: [
          "Open-house marketing used to mean another small production cycle: find the listing, pull the right photos, open a design tool, lay out the flyer, check the details, and get it ready for print.",
          "Now Claude Cowork is connected to Kristi's Canva account. When she needs a flyer, she can ask for it in plain language. The system knows the Zillow listing context, gathers the house imagery, builds the Canva design, and leaves Kristi with the part that should stay hers: review it, approve it, and order the printed flyers for the open house.",
        ],
      },
      {
        heading: "Out with clients, still connected",
        paragraphs: [
          "We also trained Kristi on Dispatch, so when she is away from the house showing homes or meeting clients, she can still reach the files and context on the MacBook Pro running Claude Cowork at home.",
          "That is the practical point of the system: not to replace her judgment, but to let the machine keep the trail warm while she is doing the work that actually requires her presence.",
        ],
      },
    ],
    pullQuote:
      "The best version of this setup does not make the agent less personal. It makes the admin less able to steal the day.",
  },
];

export function getCaseStudy(slug: string) {
  return caseStudies.find((study) => study.slug === slug);
}
