import Image from "next/image";
import Link from "next/link";

import { Separator } from "@/components/ui/separator";
import { contactEmail } from "@/lib/site";

export function SiteFooter() {
  return (
    <footer className="pat-site-foot">
      <div className="pat-wrap">
        <div className="pat-foot-top">
          <div className="pat-foot-display">
            Free your <em>evenings.</em>
            <br />
            Free your <em>weekends.</em>
          </div>
          <div className="pat-foot-logo" aria-hidden="true">
            <Image
              src="/pacific-ai-tech/img/logo-pine.png"
              alt=""
              width={225}
              height={512}
            />
          </div>
        </div>
        <Separator className="pat-foot-rule" />
        <div className="pat-foot-grid">
          <div>
            <h4>Pacific AI Tech</h4>
            <p>
              A two-person consultancy helping the Pacific Northwest&apos;s
              small operators put AI to work quietly, locally, on their own
              machines, then feel confident using it without us in the room.
            </p>
          </div>
          <div>
            <h4>Pages</h4>
            <ul>
              <li>
                <Link href="/">Index</Link>
              </li>
              <li>
                <Link href="/#what-we-do">What we do</Link>
              </li>
              <li>
                <Link href="/case-studies">Case studies</Link>
              </li>
              <li>
                <Link href="/#pricing">Pricing</Link>
              </li>
              <li>
                <a href="/sitemap.xml">Sitemap</a>
              </li>
            </ul>
          </div>
          <div>
            <h4>Region</h4>
            <ul>
              <li>Portland, OR</li>
              <li>Vancouver</li>
              <li>Salem, OR</li>
              <li>Olympia, WA</li>
            </ul>
          </div>
          <div>
            <h4>Contact</h4>
            <ul>
              <li>
                <a href={`mailto:${contactEmail}`}>{contactEmail}</a>
              </li>
            </ul>
          </div>
        </div>
        <div className="pat-foot-bottom">
          <span>© 2025 Pacific AI Tech LLC · Portland, OR</span>
          <span>v 26.05 · built on a porch</span>
        </div>
      </div>
    </footer>
  );
}
