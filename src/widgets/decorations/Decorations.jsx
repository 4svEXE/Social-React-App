import React from "react";
import "./Decorations.css";

import img1 from "public/img/decorations/1.png";
import img2 from "public/img/decorations/2.png";
import img3 from "public/img/decorations/3.png";
import img4 from "public/img/decorations/4.png";
import img5 from "public/img/decorations/5.png";

function Decorations() {
  return (
    <div className="Decorations w-screen">
      <img src={img1} alt="" />
      <img src={img2} alt="" />
      <img src={img3} alt="" />
      <img src={img4} alt="" />
      <img src={img5} alt="" />

      <div className="blured-boxes">
        <div className="box-decor hidden lg:flex"></div>
      </div>
    </div>
  );
}

export default Decorations;
