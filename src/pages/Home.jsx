import React from "react";
import Cowchain from "./Home/Cowchain";
import Services from "./Home/Services";
import Cases from "./Home/Cases";
import OurTechnology from "./Home/OurTechnology";
import Team from "./Home/Team";
import Revives from "./Home/Reviews";
import Decorations from "widgets/decorations/Decorations";

export default function HomePage() {
  return (
    <div className="w-full flex-col content-center items-center justify-center bg-white dark:bg-editor-dark">
      <Cowchain />

      <Services id="services" />

      <Cases id="cases" />

      <OurTechnology id="ourTechnology" />

      <Team id="team" />

      <Revives id="reviews" />

      <Decorations id="contact" />
    </div>
  );
}
