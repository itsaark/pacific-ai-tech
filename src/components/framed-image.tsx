import Image from "next/image";

type FramedImageProps = {
  src: string;
  alt: string;
  sizes: string;
  preload?: boolean;
  className?: string;
};

export function FramedImage({
  src,
  alt,
  sizes,
  preload = false,
  className = "",
}: FramedImageProps) {
  return (
    <div className={`pat-ascii-frame ${className}`}>
      <Image src={src} alt={alt} fill sizes={sizes} preload={preload} />
    </div>
  );
}
