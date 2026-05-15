import { SiteNav } from "@/components/site-nav";
import { Hero } from "@/components/hero";
import { MapBand } from "@/components/map-band";
import { Automations } from "@/components/automations";
import { Testimonials } from "@/components/testimonials";
import { FaqSection } from "@/components/faq-section";
import { BookingForm } from "@/components/booking-form";
import { SiteFooter } from "@/components/site-footer";

export default function Home() {
  return (
    <>
      <a id="top" aria-hidden="true" style={{ position: "absolute", top: 0 }} />
      <SiteNav />
      <main>
        <Hero />
        <MapBand />
        <Automations />
        <Testimonials />
        <FaqSection />
        <BookingForm />
      </main>
      <SiteFooter />
    </>
  );
}
