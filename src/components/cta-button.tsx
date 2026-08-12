import { ArrowRight } from "lucide-react";

import { Button } from "@/components/ui/button";

type CtaButtonProps = {
  href: string;
  children: React.ReactNode;
  variant?: "default" | "outline";
};

export function CtaButton({
  href,
  children,
  variant = "default",
}: CtaButtonProps) {
  const isExternal = href.startsWith("http");

  return (
    <Button
      render={
        <a
          href={href}
          target={isExternal ? "_blank" : undefined}
          rel={isExternal ? "noopener noreferrer" : undefined}
        />
      }
      nativeButton={false}
      variant={variant === "outline" ? "outline" : "default"}
      className={variant === "outline" ? "pat-btn" : "pat-btn pat-btn-primary"}
    >
      {children}
      <ArrowRight data-icon="inline-end" />
    </Button>
  );
}
