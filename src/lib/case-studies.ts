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
  {
    slug: "aspen-pest-control-ai-marketing-automation",
    title: "How AI turned nearly 8,000 service histories into a neighborhood growth engine",
    seoTitle: "AI Marketing Automation for Pest Control",
    metaDescription:
      "AI marketing automation helped Aspen turn service reports into neighborhood campaigns and find new Clark County homeowners each week. See how it works.",
    clientLabel: "Aspen Pest Control",
    clientUrl: "https://aspenpestservice.com/",
    founderName: "Joseph H.",
    industry: "Residential and commercial pest control",
    location: "Vancouver, Washington · Vancouver–Portland metro",
    services: [
      "Pest activity neighborhood modeling",
      "Service report data automation",
      "Geographic customer clustering",
      "AI campaign generation",
      "New development monitoring",
      "Clark County public-record monitoring",
      "Weekly new-homeowner marketing workflow",
    ],
    topics: [
      "AI marketing automation for pest control",
      "pest control neighborhood targeting",
      "pest activity modeling",
      "home service marketing automation",
      "new homeowner marketing",
      "Clark County property sales data",
      "route density marketing",
      "Vancouver Washington pest control",
      "local customer acquisition",
    ],
    publishedDate: "2026-08-11",
    modifiedDate: "2026-08-11",
    heroImage: {
      src: "/pacific-ai-tech/img/case-studies/aspen-pest-control-ai-marketing-automation-ascii.jpg",
      alt: "ASCII-style image of an Aspen pest control technician treating the exterior of a Vancouver-area home",
      width: 1920,
      height: 1280,
      caption:
        "Aspen Pest Control serves homes across the Vancouver and Portland metro area, generating local service data with every completed visit.",
    },
    summary:
      "Aspen Pest Control already had the raw material for smarter growth: service history from nearly 8,000 residential homes. Pacific AI Tech built two end-to-end workflows that turn technician reports into neighborhood campaigns and Clark County public records into a weekly new-homeowner audience.",
    metrics: [
      {
        value: "~8,000 homes",
        label: "feeding the neighborhood model",
        detail:
          "Aspen's existing residential service history gives the workflow a substantial first-party view of which pest issues appear in different parts of the Vancouver area.",
      },
      {
        value: "Every report",
        label: "becomes a fresh local signal",
        detail:
          "When a technician completes a service report, the workflow extracts the address and pest context, updates its geographic cluster, and prepares a neighborhood-specific campaign.",
      },
      {
        value: "Weekly",
        label: "new-homeowner campaign list",
        detail:
          "A second workflow monitors Clark County property and development information, compiles newly sold homes, and turns the current list into a focused marketing audience.",
      },
    ],
    challenge:
      "Aspen had years of useful field knowledge distributed across thousands of service reports, but turning that history into neighborhood-level marketing required repeated exports, address work, pest categorization, geographic grouping, and campaign preparation. At the same time, new neighborhoods and recent home sales created another valuable audience that changed every week. The company needed both opportunities to move from occasional research projects into reliable operating workflows.",
    approach: [
      "Connected Aspen's completed service reports to an automated intake that extracts the service address and relevant pest findings after a technician updates the system.",
      "Grouped those signals geographically to model aggregate pest patterns by neighborhood instead of treating every Vancouver-area household as if it faced the same problem.",
      "Built campaign generation into the workflow so each meaningful neighborhood cluster can produce marketing tailored to the pests appearing nearby.",
      "Set up monitoring for new residential development and Clark County's public property information so the business can keep track of changing housing activity.",
      "Created a weekly process that identifies newly sold homes, compiles the current homeowner audience, and prepares it for a targeted pest-control marketing campaign.",
      "Kept the system focused on campaign preparation and audience relevance, leaving Aspen's team in control of the marketing that goes out.",
    ],
    outcomes: [
      "Technician reports now do more than close the service visit: they continuously improve Aspen's picture of local pest activity.",
      "Neighborhood campaigns can reflect actual nearby service patterns instead of relying on one generic message across the entire metro area.",
      "The workflow turns a growing first-party data set into a repeatable local acquisition system without rebuilding the analysis by hand for every campaign.",
      "New construction and recent property sales are monitored as an ongoing source of timely marketing opportunities.",
      "Aspen receives a fresh weekly audience of new homeowners who may be evaluating pest protection for a property they just purchased.",
      "The two systems connect field operations and public information directly to marketing while keeping final campaign decisions with Aspen's team.",
    ],
    narrative: [
      {
        heading: "The answer was already in the service reports",
        paragraphs: [
          "Aspen Pest Control had a useful problem: too much local knowledge to analyze by hand. After serving nearly 8,000 residential homes, the business could see that pest activity was not evenly distributed across the Vancouver area. One neighborhood might be producing ant calls. Another might be seeing rodents or wasps. But those patterns were buried inside individual service records.",
          "That is the opportunity behind AI marketing automation for pest control. Aspen did not need another generic campaign writer. It needed a system that could turn the work its technicians were already documenting into a clearer picture of what was happening street by street and neighborhood by neighborhood.",
        ],
      },
      {
        heading: "One technician report starts the workflow",
        paragraphs: [
          "The first automation begins when a service person updates a completed report in Aspen's existing system. The workflow takes the report, extracts the address and relevant pest context, then adds that observation to the appropriate geographic cluster.",
          "The important part is the handoff. No one has to remember to export the record, clean the address, update a map, compare nearby jobs, and open a marketing document. The completed service report is the trigger. The rest of the chain starts on its own.",
        ],
      },
      {
        heading: "From pest cluster to neighborhood campaign",
        paragraphs: [
          "As service signals accumulate, the model builds an aggregate view of which pest issues are appearing in which neighborhoods. The output is not a prediction about one particular household. It is a practical marketing signal drawn from Aspen's own work in the surrounding area.",
          "The system then turns that signal into a neighborhood-specific campaign. Homeowners near a cluster of relevant service activity can receive a message about the pests Aspen is actually encountering nearby, instead of a broad promotion written for the entire Vancouver–Portland market.",
        ],
      },
      {
        heading: "The week a house gets a new owner",
        paragraphs: [
          "The second workflow watches a different signal: change. New neighborhoods are built. Homes sell. New owners move into properties with unfamiliar crawlspaces, landscaping, entry points, and seasonal pest patterns.",
          "Pacific AI Tech set up an automation that monitors residential development and public Clark County property information. Each week, it compiles newly sold homes into a current marketing audience so Aspen can introduce its services when pest protection is likely to be part of a new homeowner's checklist.",
        ],
      },
      {
        heading: "Marketing that starts with operations",
        paragraphs: [
          "The two automations look like marketing systems, but both begin somewhere more useful: Aspen's operations. One starts with what technicians find in the field. The other starts with verifiable changes in the local housing market.",
          "That makes the campaigns more specific without asking the team to become full-time data analysts. Reports update the neighborhood model. Public records refresh the new-homeowner list. AI prepares the campaign work. Aspen's team keeps control of what gets sent and how the company shows up in the communities it serves.",
        ],
      },
    ],
    pullQuote:
      "The useful part is not that AI can write another ad. It is that every completed service report and every week of local property activity can now tell Aspen where its next relevant campaign should begin.",
  },
  {
    slug: "paragon-international-ai-purchase-order-automation",
    title: "Purchase orders used to wait for someone to open the attachment",
    seoTitle: "AI Purchase Order Automation for Paragon",
    metaDescription:
      "How Pacific AI Tech helped Paragon International use a Hermes agent to read Gmail purchase orders, extract data, catch duplicates, and print valid POs.",
    clientLabel: "Paragon International",
    clientUrl: "https://www.paragonconcessions.com/",
    industry: "Concession equipment manufacturing",
    location: "Nevada, Iowa",
    services: [
      "Local Hermes agent setup",
      "Gmail inbox monitoring",
      "Purchase order classification",
      "Multi-format document reading",
      "OCR for scans and photographed orders",
      "Order data extraction",
      "Duplicate purchase order detection",
      "Network printer workflow",
      "Document filing and naming",
      "Audit logging",
    ],
    topics: [
      "purchase order automation",
      "AI purchase order processing",
      "email purchase order OCR",
      "Gmail document intake",
      "manufacturer order entry automation",
      "scanned purchase order processing",
      "duplicate purchase order detection",
      "concession equipment manufacturer",
      "intelligent document processing",
      "Hermes AI agent",
      "sales order intake",
    ],
    publishedDate: "2026-08-15",
    modifiedDate: "2026-08-15",
    heroImage: {
      src: "/pacific-ai-tech/img/case-studies/paragon-international-ai-purchase-order-automation-ascii.jpg",
      alt: "ASCII-style image of popcorn being scooped from a commercial popcorn machine into a striped bag",
      width: 1600,
      height: 1067,
      caption:
        "Paragon International manufactures commercial concession equipment in Nevada, Iowa, including popcorn machines used in stadiums, schools, and restaurants.",
    },
    summary:
      "Paragon International is a U.S. manufacturer of commercial concession equipment in Nevada, Iowa. Purchase orders arrive by email as PDFs, Word files, spreadsheets, scans, and photos. Pacific AI Tech set up a Hermes agent to watch Gmail, classify the mail, extract order data, catch duplicates, print valid POs, and file the work.",
    metrics: [
      {
        value: "24/7",
        label: "Gmail inbox watch",
        detail:
          "The agent monitors one or more inboxes continuously so a purchase order does not sit unseen until someone happens to open the next message.",
      },
      {
        value: "Six types",
        label: "of incoming mail sorted first",
        detail:
          "Each email is classified as a purchase order, quote request, cancellation, return/RMA, customer inquiry, or other before any printing or filing happens.",
      },
      {
        value: "Print + file",
        label: "when the purchase order is valid",
        detail:
          "Valid orders print to the network printer, get a consistent file name, land in organized folders, and leave a log the team can audit later.",
      },
    ],
    challenge:
      "Paragon receives purchase orders from customers such as Amazon, Home Depot, distributors, school systems, and other commercial buyers. The orders arrive by email in many formats: PDFs, Word documents, Excel spreadsheets, scanned pages, and photographs of printed forms. Someone had to open each attachment, decide what the message was, identify the customer, pull the order details, watch for duplicates, print the valid POs, and file the rest. The factory could not start from an unread inbox.",
    approach: [
      "Set up a Hermes agent to monitor one or more Gmail inboxes continuously and download incoming attachments as they arrive.",
      "Taught the agent to read PDFs, Word documents, Excel spreadsheets, scanned PDFs, and image files, using OCR when the page was a scan or a photograph of a purchase order.",
      "Built a classification step that separates purchase orders from quote requests, cancellations, returns and RMAs, customer inquiries, and other mail before any order work begins.",
      "Configured customer identification and extraction into a standardized order structure so mixed inbound formats become the same kind of record.",
      "Added duplicate purchase-order detection so the same order is not printed, filed, or treated as new work a second time.",
      "Connected valid purchase orders to Paragon's network printer, then saved and renamed the documents into organized folders with a consistent naming convention.",
      "Moved processed mail into Gmail labels and wrote audit logs so the team can see what the agent classified, extracted, printed, filed, or held back.",
    ],
    outcomes: [
      "Incoming mail is watched around the clock instead of waiting for the next person to open Gmail.",
      "Attachments in different formats are read as documents, not left as a pile of files that someone has to interpret one by one.",
      "Purchase orders are separated from quotes, cancellations, returns, and ordinary questions before they reach the printer.",
      "Valid purchase orders print automatically, land in named folders, and leave a record of what happened.",
      "Duplicate orders are caught before they become a second print job or a second trip through the shop.",
      "The team can review logs when something looks off, instead of reconstructing the inbox by memory.",
    ],
    narrative: [
      {
        heading: "The order is already in the inbox",
        paragraphs: [
          "Paragon International builds commercial concession equipment in Nevada, Iowa: popcorn machines, snow cone machines, cotton candy equipment, fryers, and the other machines that show up at stadiums, schools, and restaurant counters. The manufacturing work is straightforward once the order is clear. The delay was earlier than that.",
          "Customers such as Amazon, Home Depot, distributors, and school systems send purchase orders by email. Some attach a clean PDF. Others send a spreadsheet. Some forward a Word document. Some photograph a printed form and send the picture. Until someone opened that attachment, the factory did not yet have an order. It had a file.",
        ],
      },
      {
        heading: "Not every email is a purchase order",
        paragraphs: [
          "The same inboxes also receive quote requests, cancellations, returns, RMAs, and ordinary customer questions. Treating all of that mail as an order would create as much trouble as missing a real PO.",
          "Pacific AI Tech set up Hermes to classify each incoming message first. The agent identifies the customer and decides whether the mail is a purchase order, a quote request, a cancellation, a return, an inquiry, or something else. Only then does the order path continue.",
        ],
      },
      {
        heading: "Read the page that arrived",
        paragraphs: [
          "Purchase-order automation fails when it expects one template. Paragon's customers do not share a form. A useful system has to read the page that actually arrived, including scans and photographs that are not already text.",
          "The Hermes setup reads PDFs, Word documents, Excel files, scanned PDFs, and image formats such as JPG, PNG, and TIFF. When the attachment is a picture of a printed order, OCR turns the page into text the agent can use. The extracted details then go into one standardized structure, so a photo of a PO and a native spreadsheet can become the same kind of record.",
        ],
      },
      {
        heading: "The same order twice is worse than a late one",
        paragraphs: [
          "A missed purchase order delays the shop. A duplicated one wastes material, time, and follow-up. Because the same customer can resend a PO, forward it again, or attach it to a new thread, the workflow has to notice when the order has already been seen.",
          "Duplicate detection sits in front of printing and filing. If the agent recognizes a purchase order it has already processed, it does not send a second copy to the printer or create a second official file.",
        ],
      },
      {
        heading: "A valid PO should leave the inbox and hit the printer",
        paragraphs: [
          "When the message is a valid purchase order, the rest of the work is physical and boring on purpose. The agent prints the order to Paragon's network printer, renames the document with a consistent convention, and saves it into the right folder.",
          "Processed mail moves into Gmail labels so the inbox is no longer the archive. Logs record what was classified, extracted, printed, filed, or held back. The team can audit the trail later without reconstructing the day from memory.",
        ],
      },
      {
        heading: "The agent does the reading. The company still owns the order.",
        paragraphs: [
          "This is not a new purchasing portal and not another monthly document platform. It is a Hermes agent taught the shape of Paragon's inbound mail, the document formats customers actually send, and the point at which a purchase order should become paper on the shop side of the building.",
          "The useful change is not that nobody looks at orders anymore. It is that the shop no longer waits for someone to open every attachment before the real work can start.",
        ],
      },
    ],
    pullQuote:
      "The useful part is not that AI can open an email. It is that a purchase order can arrive as a PDF, a spreadsheet, or a photo of a printed form and still become the same structured order the shop can act on.",
  },
];

export function getCaseStudy(slug: string) {
  return caseStudies.find((study) => study.slug === slug);
}
