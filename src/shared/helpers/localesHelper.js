import i18next from "i18next";
let localesHelper = {};

localesHelper.toggleLanguage = () => {
  let language = window.localStorage.getItem("i18nextLng");

  language === "en"
    ? i18next.changeLanguage("uk-UA")
    : i18next.changeLanguage("en");
};

export default localesHelper;
