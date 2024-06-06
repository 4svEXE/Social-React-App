import React from "react";
import s from "./Breadcumbs.module.scss";

export default function Breadcumbs(props) {
  const { nav = [] } = props;

  return (
    <section className="breadcumbs text-black dark:text-white flex py-7">
      {nav.map((item) => (
        <a href={item.path} className={s.link + " py-1"} data-arrow=">">
          {item.title}
        </a>
      ))}
    </section>
  );
}
