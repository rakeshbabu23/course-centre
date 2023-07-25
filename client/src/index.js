import React from "react";
import ReactDOM from "react-dom/client";


import { BrowserRouter } from "react-router-dom";
import { Provider, useSelector } from "react-redux";
import store from "./course-app/store";


import CourseApp from "./course-app/CourseApp";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <Provider store={store}>
    <BrowserRouter>
      <CourseApp></CourseApp>
    </BrowserRouter>
  </Provider>
);
