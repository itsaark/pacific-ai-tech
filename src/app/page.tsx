import { SiteNav } from "@/components/site-nav";
import { Hero } from "@/components/hero";
import { ValueProps } from "@/components/value-props";
import { HowItWorks } from "@/components/how-it-works";
import { Pricing } from "@/components/pricing";
import { Capabilities } from "@/components/capabilities";
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
        <ValueProps />
        <HowItWorks />
        <Pricing />
        <Capabilities />
        <Testimonials />
        <FaqSection />
        <BookingForm />
      </main>
      <SiteFooter />
    </>
  );
}
