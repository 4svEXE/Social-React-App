import React from "react";
import { HashRouter } from "react-router-dom";
import { Provider } from 'react-redux'; // Додай цей імпорт, якщо ще не додав

export default function WithRouter({ children }) {
  // const PUBLIC_URL = 'https://4svexe.github.io/Social-React-App/'
  const PUBLIC_URL = '/'
  return (
    <HashRouter basename={PUBLIC_URL} >

        {children}

    </HashRouter>
  );
}
