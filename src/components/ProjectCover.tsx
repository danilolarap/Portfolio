"use client";

import { useEffect, useRef, useState } from "react";

export default function ProjectCover({
  src,
  title,
}: {
  src: string;
  title: string;
}) {
  const [unavailable, setUnavailable] = useState(false);
  const [loaded, setLoaded] = useState(false);
  const imageRef = useRef<HTMLImageElement>(null);

  useEffect(() => {
    const image = imageRef.current;
    if (image?.complete) {
      if (image.naturalWidth > 0) setLoaded(true);
      else setUnavailable(true);
    }
  }, [src]);

  if (unavailable) {
    return (
      <div className="project-cover-placeholder" aria-label={title}>
        <span>{title}</span>
      </div>
    );
  }

  return (
    <a
      className="project-cover-link"
      href={src}
      target="_blank"
      rel="noopener noreferrer"
      aria-label={title}
    >
      <img
        ref={imageRef}
        className="project-cover"
        src={src}
        alt={title}
        width={1600}
        height={900}
        loading="lazy"
        style={{ visibility: loaded ? "visible" : "hidden" }}
        onLoad={() => setLoaded(true)}
        onError={() => setUnavailable(true)}
      />
    </a>
  );
}
