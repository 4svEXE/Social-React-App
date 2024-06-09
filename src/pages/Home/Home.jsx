import React from "react";
import Cowchain from "./components/Cowchain";
import Services from "./components/Services";
import Cases from "./components/Cases";
import OurTechnology from "./components/OurTechnology";
import Team from "./components/Team";
import Revives from "./components/Reviews";
import Decorations from "widgets/decorations/Decorations";

export default function HomePage() {
  return (
    <div className="w-full flex-col content-center items-center justify-center bg-white dark:bg-editor-dark">
      <Cowchain />

      <div id="services">
        <Services />
      </div>

      <Decorations />

      <div id="cases">
        <Cases />
      </div>

      <div id="ourTechnology">
        <OurTechnology />
      </div>

      <div id="team">
        <Team />
      </div>

      <div id="reviews">
        <Revives />
      </div>

      <div id="contact"></div>
      
    </div>
  );
}
