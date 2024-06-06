import React from "react";
import s from "./Breadcumbs.module.scss";

export default function Breadcumbs(props) {
  const { nav = [] } = props;

  return (
    <div className="container breadcumbs text-white flex p-7">
      {nav.map((item, i) => (
        <a href={item.path} className={s.link + " py-1"} data-arrow=">">
          {item.title}
        </a>
      ))}
    </div>
  );
}
