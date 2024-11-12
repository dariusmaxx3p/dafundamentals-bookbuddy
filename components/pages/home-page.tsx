"use client";

import { ReactLenis } from "@studio-freight/react-lenis";

export default function HomePage() {
  return (
    <ReactLenis
      root
      options={{
        duration: 300,
        infinite: true,
        orientation: "vertical",
        smoothWheel: true,
      }}
    >
      <div className="home-page"></div>
    </ReactLenis>
  );
}
