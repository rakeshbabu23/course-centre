import { createSlice } from "@reduxjs/toolkit";
import axios from "axios";

const userInitialState = {
  isLoading: false,
  username: "",
  status: "",
  allCourses: [],
  errorMessage: "",
  requestedCourse: null,
  purchasedCourses: [],
  whetherUserBoughtCourse: "",
  count: 5,
  query: "",
  isPaymentDone: false,
  isUserLoggedOut: false,
};

const userSlice = createSlice({
  name: "user",
  initialState: userInitialState,
  reducers: {
    assigningUsername(state, action) {
      state.username = action.payload;
      state.status = "";
      state.errorMessage = "";
    },
    status(state, action) {
      state.status = action.payload.status;
      state.errorMessage = action.payload.message;
    },
    loading(state, action) {
      state.isLoading = true;
    },
    showAllCourses(state, action) {
      state.allCourses = action.payload;
      state.isLoading = false;
    },
    requestedCourse(state, action) {
      if (action.payload) {
        state.requestedCourse = action.payload.course;
        state.whetherUserBoughtCourse = action.payload.whetherUserBoughtCourse;
        state.isLoading = false;
      } else {
        state.requestedCourse = null; // Reset to null in case of failure
        state.isLoading = false;
      }
    },
    purchasedCourses(state, action) {
      state.purchasedCourses = action.payload;
      state.isLoading = false;
    },
    timerCount(state, action) {
      if (state.count >= 0) state.count = state.count - 1;
    },
    resetTimer(state, action) {
      state.count = 5;
    },
    isPaymentDone(state, action) {
      state.isPaymentDone = !state.isPaymentDone;
    },
    isUserLoggedOut(state, action) {
      state.isUserLoggedOut = !state.isUserLoggedOut;
    },
  },
});

export function login(email, password, navigate) {
  return async function (dispatch, getState) {
    try {
      const res = await axios.post("http://localhost:5001/users/login", {
        email,
        password,
      });
      localStorage.setItem("token", res.data.token);
      dispatch({ type: "user/assigningUsername", payload: res.data.username });
      navigate("/users/dashboard");
    } catch (e) {
      if (e.response) {
        const { status } = e.response;
        if (status === 400) {
          console.log(e.response.data.message);
          dispatch({
            type: "user/status",
            payload: { status: "error", message: e.response.data.message },
          });
        } else if (status === 401) {
          console.log(e.response.data.error);
          dispatch({
            type: "user/status",
            payload: { status: "error", message: e.response.data.error },
          });
        } else if (status === 402) {
          console.log(e.response.data.error);
          dispatch({
            type: "user/status",
            payload: { status: "error", message: e.response.data.error },
          });
        } else {
          console.log(e.response.data.error);
          dispatch({
            type: "user/status",
            payload: { status: "error", message: e.response.data.error },
          });
        }
      }
    }
  };
}

export function signup(username, email, password, navigate) {
  return async function (dispatch, getState) {
    try {
      const res = await axios.post("http://localhost:5001/users/signup", {
        username,
        email,
        password,
      });
      localStorage.setItem("token", res.data.token);
      dispatch({ type: "user/assigningUsername", payload: res.data.username });
      navigate("/users/dashboard");
    } catch (e) {
      if (e.response) {
        const { status } = e.response;
        if (status === 400) {
          console.log(e.response.data.message);
          dispatch({
            type: "user/status",
            payload: { status: "error", message: e.response.data.message },
          });
        } else if (status === 401) {
          console.log(e.response.data.error);
          dispatch({
            type: "user/status",
            payload: { status: "error", message: e.response.data.error },
          });
        } else {
          console.log(e.response.data.error);
          dispatch({
            type: "user/status",
            payload: { status: "error", message: e.response.data.error },
          });
        }
      }
    }
  };
}

export function listAllCoursesForUser(searchQuery, price, navigate) {
  const token = localStorage.getItem("token");
  if (!token) navigate("/users/login");

  return async function (dispatch, getState) {
    try {
      dispatch({ type: "user/loading" });
      const res = await axios.get(
        `http://localhost:5001/users/courses?title=${searchQuery}&price=${price}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      const courses = res.data.courses;

      if (courses.length === 0)
        dispatch({ type: "user/showAllCourses", payload: [] });
      else dispatch({ type: "user/showAllCourses", payload: res.data.courses });
    } catch (e) {
      if (e.response) {
        const { status } = e.response;
        if (status === 401) {
          console.log(e.response.data.error);
          dispatch({
            type: "user/status",
            payload: { status: "error", message: e.response.data.error },
          });
        } else {
          console.log(e.response.data.error);
          dispatch({
            type: "user/status",
            payload: { status: "error", message: e.response.data.error },
          });
        }
      }
    }
  };
}

export function courseDetails(courseId, navigate) {
  const token = localStorage.getItem("token");
  if (!token) navigate("/users/login");
  return async function (dispatch, getState) {
    dispatch({ type: "user/loading" });
    try {
      const res = await axios.get(
        `http://localhost:5001/users/courses/${courseId}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      dispatch({
        type: "user/requestedCourse",
        payload: {
          course: res.data.course,
          whetherUserBoughtCourse: res.data.purchased,
        },
      });
    } catch (e) {
      dispatch({
        type: "user/requestedCourse",
        payload: null, // Dispatch null in case of failure
      });
      if (e.response) {
        const { status } = e.response;
        if (status === 404) {
          console.log(e.response.data.error);
          dispatch({
            type: "user/status",
            payload: { status: "error", message: e.response.data.error },
          });
        } else if (status === 401) {
          console.log(e.response.data.error);
          dispatch({
            type: "user/status",
            payload: { status: "error", message: e.response.data.error },
          });
        } else {
          console.log(e.response.data.error);
          dispatch({
            type: "user/status",
            payload: { status: "error", message: e.response.data.error },
          });
        }
      }
    }
  };
}

export function buyCourse(courseId, navigate) {
  const token = localStorage.getItem("token");
  if (!token) navigate("/users/login");
  return async function (dispatch, getState) {
    dispatch({ type: "user/loading" });
    try {
      const res = await axios.post(
        `http://localhost:5001/users/courses/${courseId}`,
        {},
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      dispatch({ type: "user/isPaymentDone" });
      navigate("/payment");
    } catch (e) {
      if (e.response) {
        const { status } = e.response;
        if (status === 401) {
          console.log(e.response.data);
          dispatch({
            type: "user/status",
            payload: { status: "error", message: e.response.data.error },
          });
        } else if (status === 402) {
          console.log(e.response.data.error);
          dispatch({
            type: "user/status",
            payload: { status: "error", message: e.response.data.error },
          });
        } else if (status === 403) {
          console.log(e.response.data.error);
          dispatch({
            type: "user/status",
            payload: { status: "error", message: e.response.data.message },
          });
        } else {
          console.log(e.response.data.error);
          dispatch({
            type: "user/status",
            payload: { status: "error", message: e.response.data.error },
          });
        }
      }
    }
  };
}

export function purchasedCourses(navigate) {
  const token = localStorage.getItem("token");
  if (!token) navigate("/users/login");
  return async function (dispatch, getState) {
    dispatch({ type: "user/loading" });
    try {
      const res = await axios.get(
        "http://localhost:5001/users/courses/purchasedCourses",
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      dispatch({
        type: "user/purchasedCourses",
        payload: res.data.courses,
      });
    } catch (e) {
      if (e.response) {
        const { status } = e.response;
        if (status === 401) {
          console.log(e.response.data);
          dispatch({
            type: "user/status",
            payload: { status: "error", message: e.response.data.error },
          });
        } else if (status === 402) {
          console.log(e.response.data.error);
          dispatch({
            type: "user/status",
            payload: { status: "error", message: e.response.data.error },
          });
        } else {
          console.log(e.response.data.error);
          dispatch({
            type: "user/status",
            payload: { status: "error", message: e.response.data.error },
          });
        }
      }
    }
  };
}

let timerInterval;
let redirectTimeout;

export function payment(navigate) {
  const token = localStorage.getItem("token");
  if (!token) {
    // Check if the 'navigate' function is defined and is a function
    if (typeof navigate === "function") {
      navigate("/users/login");
    } else {
      console.error("navigate function is not defined or not a function");
      return;
    }
  }

  return async function (dispatch, getState) {
    try {
      const res = await axios.post(
        "http://localhost:5001/users/payments",
        {},
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (res.status === 200) {
        const dispatchTimerCount = () => {
          dispatch({ type: "user/timerCount" });
        };
        timerInterval = setInterval(dispatchTimerCount, 1000);
        function navigateToPurchasedCourses() {
          clearInterval(timerInterval);
          clearTimeout(redirectTimeout);
          navigate("/users/purchasedCourses");
          dispatch({ type: "user/resetTimer" });
          dispatch({ type: "user/isPaymentDone" });
        }
        redirectTimeout = setTimeout(navigateToPurchasedCourses, 5000);
      }
    } catch (e) {
      if (e.response) {
        const { status } = e.response;
        if (status === 401) {
          dispatch({
            type: "user/status",
            payload: { status: "error", message: e.response.data.error },
          });
        }
      }
    }
  };
}

export const { assigningUsername, isPaymentDone, isUserLoggedOut } =
  userSlice.actions;
export default userSlice.reducer;
