import Image from "next/image";
import Link from "next/link";
import { Separator } from "@/components/ui/separator";
import {
  businessPhoneDisplay,
  businessPhoneHref,
  contactEmail,
} from "@/lib/site";

export function SiteFooter() {
  return (
    <footer className="pat-site-foot">
      <div className="pat-wrap">
        <div className="pat-foot-top">
          <div className="pat-foot-display">
            Free your <span>evenings.</span>
            <br />
            Free your <span>weekends.</span>
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
        <div className="pat-foot-colophon">
          <div className="pat-foot-note">
            <h2>Address</h2>
            <address>1455 SW Broadway, Portland, OR 97201</address>
          </div>
          <div className="pat-foot-contact">
            <h2>Contact</h2>
            <a href={`mailto:${contactEmail}`}>{contactEmail}</a>
            <a href={businessPhoneHref}>{businessPhoneDisplay}</a>
          </div>
          <div className="pat-foot-region">
            <h2>Region</h2>
            <p>Oregon &amp; Washington · virtual consulting · selected on-site work</p>
          </div>
        </div>
        <div className="pat-foot-bottom">
          <p>© 2026 Pacific AI Tech LLC · Portland, OR · v 26.08 · built on a porch</p>
          <nav aria-label="Company and legal">
            <Link href="/about">About</Link>
            <Link href="/privacy">Privacy</Link>
            <Link href="/terms">Terms</Link>
          </nav>
        </div>
      </div>
    </footer>
  );
}
