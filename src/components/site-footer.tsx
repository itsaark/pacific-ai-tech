import Image from "next/image";
import { Separator } from "@/components/ui/separator";
import { contactEmail } from "@/lib/site";

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
            <h2>Colophon</h2>
            <p>
              A two-person consultancy helping the Pacific Northwest&apos;s
              small operators put AI to work quietly, locally, on their own
              machines, then feel confident using it without us in the room.
            </p>
          </div>
          <div className="pat-foot-contact">
            <h2>Contact</h2>
            <a href={`mailto:${contactEmail}`}>{contactEmail}</a>
          </div>
          <div className="pat-foot-region">
            <h2>Region</h2>
            <p>Greater Portland · Vancouver · nearby Oregon and Washington towns</p>
          </div>
        </div>
        <p className="pat-foot-bottom">
          © 2026 Pacific AI Tech LLC · Portland, OR · v 26.05 · built on a porch
        </p>
      </div>
    </footer>
  );
}
