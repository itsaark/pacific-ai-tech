import Image from "next/image";
import { ArrowUpRight, CalendarDays } from "lucide-react";

import { bookingUrl } from "@/lib/site";

export function FounderSection() {
  return (
    <div className="pat-wrap pat-founder-shell">
      <section
        id="founders"
        className="pat-founder"
        aria-labelledby="founder-title"
      >
        <div className="pat-founder-main">
          <div className="pat-founder-photos" aria-label="Co-founder profiles">
            <a
              className="pat-founder-photo"
              href="https://www.linkedin.com/in/aarkkodur/"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="View Aark Kodur on LinkedIn"
            >
              <span className="pat-founder-photo-image">
                <Image
                  src="/pacific-ai-tech/img/founder.jpg"
                  alt="Aark Kodur"
                  width={462}
                  height={482}
                  sizes="(max-width: 620px) calc((100vw - 76px) / 2), 132px"
                />
              </span>
              <span className="pat-founder-photo-name">Aark Kodur</span>
            </a>
            <a
              className="pat-founder-photo pat-founder-photo-shayan"
              href="https://www.linkedin.com/in/shayanjalalipour/"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="View Shayan Jalalipour on LinkedIn"
            >
              <span className="pat-founder-photo-image">
                <Image
                  src="/pacific-ai-tech/img/shayan-jalalipour.jpg"
                  alt="Shayan Jalalipour"
                  width={654}
                  height={900}
                  sizes="(max-width: 620px) calc((100vw - 76px) / 2), 132px"
                />
              </span>
              <span className="pat-founder-photo-name">Shayan Jalalipour</span>
            </a>
          </div>
          <div className="pat-founder-copy">
            <span className="pat-founder-label">Co-founders</span>
            <a className="pat-founder-title" href={bookingUrl}>
              <h2 id="founder-title">Talk to Aark &amp; Shayan</h2>
              <ArrowUpRight data-icon="inline-end" />
            </a>
            <p>
              Software engineering from Amazon meets AI/ML research from
              Portland State. We help Pacific Northwest operators put AI agents
              to work on their own machines and understand how to use them well.
            </p>
          </div>
        </div>
        <div className="pat-founder-actions" aria-label="Co-founder links">
          <a
            href="https://www.linkedin.com/in/aarkkodur/"
            target="_blank"
            rel="noopener noreferrer"
            className="pat-founder-action"
          >
            <span>Aark LinkedIn</span>
            <ArrowUpRight data-icon="inline-end" />
          </a>
          <a
            href="https://www.linkedin.com/in/shayanjalalipour/"
            target="_blank"
            rel="noopener noreferrer"
            className="pat-founder-action"
          >
            <span>Shayan LinkedIn</span>
            <ArrowUpRight data-icon="inline-end" />
          </a>
          <a href={bookingUrl} className="pat-founder-action primary">
            <CalendarDays data-icon="inline-start" />
            <span>Book a call</span>
          </a>
        </div>
      </section>
    </div>
  );
}
