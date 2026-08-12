export type CaseStudy = {
  slug: string;
  title: string;
  seoTitle: string;
  metaDescription: string;
  clientLabel: string;
  clientUrl?: string;
  founderName?: string;
  industry: string;
  location: string;
  services: string[];
  topics: string[];
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
  pullQuoteAttribution?: string;
};

export const caseStudies: CaseStudy[] = [
  {
    slug: "frostbox-logistics-ai-dispatch",
    title: "The dispatcher who stopped living inside the load boards",
    seoTitle: "AI Dispatch Automation for Frostbox Logistics",
    metaDescription:
      "How Pacific AI Tech helped Frostbox Logistics use a local Hermes agent to monitor Truckstop and DAT, draft bids, scout return loads, and keep owner approval.",
    clientLabel: "Frostbox Logistics",
    clientUrl: "https://www.frostboxlogistics.com/",
    industry: "Refrigerated trucking",
    location: "Coburg, Oregon · Pacific Northwest",
    services: [
      "Local AI agent setup",
      "Hadley AI assistant configuration",
      "Dispatch workflow automation",
      "Load-board monitoring",
      "Broker email drafting",
      "Route-aware return-load scouting",
      "Human approval workflow",
    ],
    topics: [
      "Hermes AI agent",
      "Hadley AI assistant",
      "Truckstop",
      "DAT",
      "Motive GPS and ELD",
      "refrigerated freight",
      "cold-chain logistics",
      "owner-approved dispatch",
      "Pacific Northwest freight",
    ],
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
          "The founder calls his AI assistant Hadley. He texts and chats with Hadley so often that his family started wondering who this new person was and why he seemed busier than ever. The answer was simple: Hadley was making it possible for him to do more business while the load searches, drafts, follow-ups, and reminders kept moving in the background.",
        ],
      },
    ],
    pullQuote:
      "After we set up Hadley, I started texting and chatting with her more than anyone else. My family started asking who this new person was and why I seemed to be working more than ever. The reason is simple: Hadley makes it much easier for me to do more business. She handles everything in the background so I can focus on the business.",
    pullQuoteAttribution: "Founder of Frostbox Logistics",
  },
  {
    slug: "kristi-blain-real-estate-ai-assistant",
    title: "A real-estate workday that stops disappearing into notes",
    seoTitle: "AI Assistant for Kristi Blain Real Estate",
    metaDescription:
      "How Pacific AI Tech helped Kristi Blain run Claude Cowork for listing research, client follow-up, Canva flyers, property PDFs, and transaction reminders.",
    clientLabel: "Kristi Blain",
    clientUrl: "https://www.zillow.com/profile/CEGkristi",
    industry: "Residential real estate",
    location: "Eugene and Coburg, Oregon",
    services: [
      "Claude Cowork setup",
      "Real-estate listing research automation",
      "AskKit end-of-day workflow",
      "Client follow-up system",
      "Canva flyer automation",
      "Property research and PDF workflow",
      "Remote Dispatch training",
    ],
    topics: [
      "residential real estate",
      "Eugene Oregon real estate",
      "Coburg Oregon real estate",
      "Zillow listing research",
      "county records",
      "open-house marketing",
      "client relationship notes",
      "transaction reminders",
    ],
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
  {
    slug: "northbank-home-inspection-ai-automation",
    title: "How AI automation gave a solo home inspector his time back",
    seoTitle: "Home Inspector AI Automation | Northbank",
    metaDescription:
      "AI automation for home inspectors helped Northbank capture missed calls, answer report questions, and save Will Graff time and money. See what changed.",
    clientLabel: "Northbank Home Inspection",
    clientUrl: "https://www.northbankhomeinspection.com/",
    founderName: "Will Graff",
    industry: "Residential home inspection",
    location: "Vancouver, Washington · Portland metro",
    services: [
      "AI voice assistant workflow",
      "Missed-call intake automation",
      "Caller summary and follow-up routing",
      "Inspection report question answering",
      "Text message automation",
      "Email response automation",
      "AI marketing planning",
    ],
    topics: [
      "AI automation for home inspectors",
      "AI receptionist for home inspectors",
      "home inspection answering service",
      "missed-call lead capture",
      "inspection report questions",
      "customer text automation",
      "email response automation",
      "Vancouver Washington home inspector",
      "Portland metro home inspection",
    ],
    publishedDate: "2026-08-11",
    modifiedDate: "2026-08-11",
    heroImage: {
      src: "/pacific-ai-tech/img/case-studies/northbank-home-inspection-ai-automation-ascii.jpg",
      alt: "ASCII-style image of a Northbank home inspector examining a house exterior from a ladder",
      width: 1920,
      height: 1280,
      caption:
        "Northbank Home Inspection serves Vancouver, Washington and the Portland area with detailed, same-day home inspection reports.",
    },
    summary:
      "Will Graff runs Northbank Home Inspection alone. Calls arrived while he was on roofs and in crawlspaces. Report questions arrived after the job. Pacific AI Tech built phone, text, and email workflows to catch both without pulling him away from the work only he could do.",
    metrics: [
      {
        value: "On-site coverage",
        label: "when Will cannot answer",
        detail:
          "A voice assistant speaks with the caller, gathers their name, phone number, and reason for calling, then sends Will a clear follow-up summary.",
      },
      {
        value: "Report-aware",
        label: "answers to client questions",
        detail:
          "The workflow finds the relevant inspection report and uses that document to respond to routine questions about the home's findings.",
      },
      {
        value: "Phone, text & email",
        label: "connected communication workflows",
        detail:
          "Common inquiries no longer have to wait for Will to finish an inspection and manually rebuild the same answer in another channel.",
      },
    ],
    challenge:
      "Will Graff runs Northbank Home Inspection as a solo operator. The better he focused on an inspection, the easier it was to miss the next caller. After the report went out, client questions pulled him back into work he had already documented. Will first tried to build the automations himself, but the setup became another time-consuming job instead of a solution.",
    approach: [
      "Turned Will's stalled do-it-yourself automation work into a practical implementation he could use without becoming his own automation engineer.",
      "Built a missed-call voice workflow that answers when Will is unavailable instead of asking every caller to leave an unstructured voicemail.",
      "Taught the voice assistant to collect the caller's name, phone number, and reason for calling so Will receives the context he needs for a useful callback.",
      "Created a report-aware text workflow that locates the relevant home inspection report and answers common client questions using the report as its source.",
      "Extended the same approach to email so repeat questions can be handled consistently across the channels Northbank's customers already use.",
      "Kept Will focused on the work that requires a licensed inspector's presence while the system handles intake, document lookup, and routine communication around it.",
      "Started planning the next workflow: using AI to help Northbank prepare and maintain its marketing work.",
    ],
    outcomes: [
      "Prospective customers can share what they need even when Will cannot safely or practically pick up the phone on site.",
      "Will receives a concise message with the caller's contact details and request, making follow-up faster and more informed.",
      "Existing clients can get answers to common report questions without waiting for Will to stop an inspection and search through the document manually.",
      "Routine questions can be handled across text and email from the same underlying inspection context.",
      "Will has more room to complete inspections, work on the business, and protect time with his family.",
      "The expert setup replaced hours of trial-and-error work and, in Will's words, saved a tremendous amount of time and money.",
      "With the communication workflows in place, Northbank is beginning to explore AI-assisted marketing as the next area of the business.",
    ],
    narrative: [
      {
        heading: "When the phone rings in a crawlspace",
        paragraphs: [
          "Will Graff had a frustrating problem: doing the job well made him harder to reach. When he was on a roof, inside an attic, or halfway through a crawlspace, the phone did not care. It rang anyway.",
          "That is where AI automation for home inspectors becomes practical, not futuristic. Will runs Northbank Home Inspection across Vancouver, Washington and the Portland area. His inspections produce detailed, same-day reports with photos, videos, thermal imaging, and recommendations. The work demands his attention on site. The phone demands it everywhere else.",
        ],
      },
      {
        heading: "The DIY setup became another job",
        paragraphs: [
          "Will tried to build the automations himself first. He learned enough to see what was possible. Then he watched the setup consume the same time the system was supposed to save.",
          "That is a common trap for small-business owners. The software looks simple from the outside. The real work is connecting the phone, messages, reports, rules, and handoffs so the whole thing behaves like one reliable workflow. Instead of becoming his own automation engineer, Will brought in Pacific AI Tech to finish the job around the way Northbank already worked.",
        ],
      },
      {
        heading: "A voice assistant after the ring",
        paragraphs: [
          "Pacific AI Tech built a custom workflow for the moments when Will cannot answer. Instead of dropping the caller into a generic voicemail box, a voice assistant joins the call, explains that it can take the details, and asks the practical questions Will needs answered.",
          "The assistant collects the caller's name, phone number, and reason for calling. It then sends Will a concise message with the context intact. When he comes off the roof or finishes the inspection, he knows who called, what they need, and which number to call back without replaying a voicemail or beginning the conversation from zero.",
        ],
      },
      {
        heading: "The report becomes the answer source",
        paragraphs: [
          "The second workflow begins after the inspection report is delivered. A client may text about an electrical note, a recommendation, or another detail that is already documented but not easy to interpret without reopening the full report.",
          "We built a system that finds the relevant report and uses the document itself to answer common questions. The response stays tied to the inspection context Will already created, while unusual questions and anything that needs an inspector's judgment can still come back to him.",
        ],
      },
      {
        heading: "One system across phone, text, and email",
        paragraphs: [
          "Clients do not all return through the same door. Some text. Others send email. Without a shared workflow, the same question can turn into the same manual search and explanation more than once.",
          "Northbank's email workflow now follows the same pattern as the text system: identify the request, retrieve the relevant report context, and prepare the routine answer from the source material. The result is not a separate chatbot for every channel. It is one repeatable way to use the business's own work wherever the customer follows up.",
        ],
      },
      {
        heading: "Time back pays twice",
        paragraphs: [
          "A home inspection cannot be automated away. Someone still has to walk the roof, enter the crawlspace, inspect the systems, document the evidence, and explain what matters. That is why the communication around the inspection is such a useful place to apply AI.",
          "Will describes the result less like software and more like an invisible assistant: always running in the background, watching for the calls and questions that would otherwise wait for him, and taking care of the routine work around them.",
          "The payoff shows up twice. Will spends less time wrestling with software and less time repeating work after the system is running. He can stay present on site, complete more inspections, spend more time with his family, and work on Northbank's next stage of growth. The next workflow he is exploring with Pacific AI Tech is AI-assisted marketing.",
        ],
      },
    ],
    pullQuote:
      "I tried setting these automations up on my own, but I spent too much time getting lost in the setup. Working with an expert was much easier, and it has saved me a tremendous amount of time and money. It feels like I have an invisible assistant running in the background, watching out for me and taking care of things.",
    pullQuoteAttribution: "Will Graff, founder of Northbank Home Inspection",
  },
];

export function getCaseStudy(slug: string) {
  return caseStudies.find((study) => study.slug === slug);
}
