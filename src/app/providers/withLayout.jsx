import React from "react";
import Header from "shared/components/header";
import ButtonToUp from "widgets/buttonToUp/ButtonToUp";
import Decorations from "widgets/decorations/Decorations";
import Footer from "shared/components/footer";

export default function WithLayout({ children, toggleTheme }) {
  return (
    <div className="bg-white dark:bg-black h-[100vh]">
      <Decorations />

      <Header toggleTheme={toggleTheme} />

      {children}

      <ButtonToUp />

      <Footer />
    </div>
  );
}
