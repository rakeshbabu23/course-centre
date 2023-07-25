// import axios from "axios";
// import { applyMiddleware, createStore } from "redux";
// import thunk from "redux-thunk";
// // import { createBrowserHistory } from "history";

// // const history = createBrowserHistory();

// const initialState = {
//   coursesCreated: [],
//   isLoading: false,
//   status: "",
// };

// function courseReducer(state = initialState, action) {
//   switch (action.type) {
//     case "course/listCourses":
//       return { ...state, coursesCreated: action.payload, isLoading: false };
//     case "course/loadingState":
//       return { ...state, isLoading: true };
//     case "course/dashboardError":
//       return { ...state, status: "error" };
//     default:
//       return state;
//   }
// }

// const store = createStore(courseReducer, applyMiddleware(thunk));

// export function listAllCourses(navigate) {
//   return function (dispatch) {
//     dispatch({ type: "course/loadingState" });
//     const token = localStorage.getItem("token");
//     axios
//       .get("http://localhost:5000/admin/courses", {
//         headers: {
//           Authorization: `Bearer ${token}`,
//         },
//       })
//       .then((res) => {
//         if (res.data.courses.length > 0) {
//           console.log(res.data.courses);
//           dispatch({
//             type: "course/listCourses",
//             payload: res.data.courses,
//           });
//         } else {
//           dispatch({ type: "course/listCourse", payload: [] });
//         }
//       })
//       .catch((e) => {
//         if (e.response && e.response.status === 401) {
//           navigate("/admin/login");
//         } else if (e.response && e.response.status === 500) {
//           dispatch({ type: "course/dashboardError" });
//         }
//       });
//   };
// }

// export default store;

import { configureStore } from "@reduxjs/toolkit";
import adminReducer from "./features/admins/adminSlice";

import userReducer from "./features/users/userSlice";

const store = configureStore({
  reducer: {
    admin: adminReducer,
    user: userReducer,
  },
});
export default store;
