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

      <div id="services"></div>
      <Services />

      <div id="cases"></div>
      <Cases />

      <div id="ourTechnology"></div>
      <OurTechnology />

      <div id="team"></div>
      <Team />

      <div id="reviews" className="pb-10"></div>
      <Revives />

      <div id="contact"></div>
      <Decorations />
    </div>
  );
}
