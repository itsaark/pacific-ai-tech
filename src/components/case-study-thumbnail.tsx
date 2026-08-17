import Image from "next/image";

import type { CaseStudy } from "@/lib/case-studies";

type CaseStudyThumbnailProps = {
  image: NonNullable<CaseStudy["heroImage"]>;
};

export function CaseStudyThumbnail({ image }: CaseStudyThumbnailProps) {
  return (
    <div className="pat-case-index-thumb" aria-hidden="true">
      <Image
        src={image.src}
        alt=""
        width={image.width}
        height={image.height}
        sizes="(max-width: 620px) calc(100vw - 40px), (max-width: 1080px) calc(50vw - 62px), 540px"
      />
    </div>
  );
}
