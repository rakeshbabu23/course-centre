import { createSlice } from "@reduxjs/toolkit";
import axios from "axios";

const adminInitialState = {
  username: "",
  email: "",
  password: "",
  coursesByAdmin: [],
  isLoading: false,
  saveEditedCourse: false,
  saveNewCourse: false,
  status: "",
  errorMessage: "",
  isAdminLoggedOut: false,
};

const adminSlice = createSlice({
  name: "admin",
  initialState: adminInitialState,
  reducers: {
    listAllCourses(state, action) {
      state.coursesByAdmin = action.payload;
      state.isLoading = false;
    },
    loading(state, action) {
      state.isLoading = true;
    },
    assigningUsername(state, action) {
      state.username = action.payload;
      state.status = "";
      state.errorMessage = "";
    },
    saveEditedCourse(state, action) {
      state.saveEditedCourse = !state.saveEditedCourse;
    },
    saveNewCourse(state, action) {
      state.saveNewCourse = !state.saveNewCourse;
    },
    status(state, action) {
      state.status = action.payload.status;
      state.errorMessage = action.payload.message;
    },
    isAdminLoggedOut(state, action) {
      state.isAdminLoggedOut = !state.isAdminLoggedOut;
    },
  },
});

export function signup(username, email, password, navigate) {
  return async function (dispatch, getState) {
    try {
      const res = await axios.post(
        "https://course-app-ugni.onrender.com/admin/signup",
        {
          username,
          email,
          password,
        }
      );
      localStorage.setItem("token", res.data.token);
      dispatch({ type: "admin/assigningUsername", payload: res.data.username });
      navigate("/admin/dashboard");
    } catch (e) {
      if (e.response) {
        const { status } = e.response;
        if (status === 400) {
          console.log(e.response.data.message);
          dispatch({
            type: "admin/status",
            payload: { status: "error", message: e.response.data.message },
          });
        } else if (status === 401) {
          console.log(e.response.data.error);
          dispatch({
            type: "admin/status",
            payload: { status: "error", message: e.response.data.error },
          });
        } else {
          console.log(e.response.data.error);
          dispatch({
            type: "admin/status",
            payload: { status: "error", message: e.response.data.error },
          });
        }
      }
    }
  };
}

export function login(email, password, navigate) {
  return async function (dispatch, getState) {
    try {
      const res = await axios.post(
        "https://course-app-ugni.onrender.com/admin/login",
        {
          email,
          password,
        }
      );
      //msg,username,token
      localStorage.setItem("token", res.data.token);
      console.log(email);
      const username = res.data.username;
      dispatch({ type: "admin/assigningUsername", payload: username });

      navigate("/admin/dashboard");
    } catch (e) {
      if (e.response) {
        const { status } = e.response;
        if (status === 400) {
          console.log(e.response.data.message);
          dispatch({
            type: "admin/status",
            payload: { status: "error", message: e.response.data.message },
          });
        } else if (status === 401) {
          console.log(e.response.data.error);
          dispatch({
            type: "admin/status",
            payload: { status: "error", message: e.response.data.error },
          });
        } else {
          console.log(e.response.data.error);
          dispatch({
            type: "admin/status",
            payload: { status: "error", message: e.response.data.error },
          });
        }
      }
    }
  };
}

export function listAllCourses(navigate) {
  const token = localStorage.getItem("token");
  if (!token) navigate("/admin/login");
  console.log("rendering");
  console.log("token is " + token);
  return async function (dispatch, getState) {
    const token = localStorage.getItem("token");
    try {
      dispatch({ type: "admin/loading" });
      const res = await axios.get(
        "https://course-app-ugni.onrender.com/admin/courses",

        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      console.log("re-rendering");
      dispatch({ type: "admin/listAllCourses", payload: res.data.courses });
    } catch (e) {
      if (e.response) {
        const { status } = e.response;
        if (status === 500) {
          dispatch({ type: "admin/status", payload: "error" });
        }
      }
    }
  };
}
export function addCourse(
  title,
  description,
  price,
  published,
  imageLink,
  navigate
) {
  const token = localStorage.getItem("token");
  if (!token) navigate("/admin/login");
  return async function (dispatch, getState) {
    try {
      const res = await axios.post(
        "https://course-app-ugni.onrender.com/admin/courses",
        {
          title,
          description,
          price,
          published,
          imageLink,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      dispatch({ type: "admin/saveNewCourse" });
    } catch (e) {
      if (e.response) {
        const { status } = e.response;
        if (status === 503) {
          dispatch({
            type: "admin/status",
            payload: { status: "error", message: e.response.data.error },
          });
        } else if (status === 400) {
          dispatch({
            type: "admin/status",
            payload: { status: "error", message: e.response.data.message },
          });
        } else if (status === 500) {
          console.log(e.response.data.error);
          dispatch({
            type: "admin/status",
            payload: { status: "error", message: e.response.data.error },
          });
        }
      }
    }
  };
}

export function editCourse(
  title,
  description,
  price,
  published,
  image,
  id,
  navigate
) {
  return async function (dispatch, getState) {
    const token = localStorage.getItem("token");
    if (!token) navigate("/admin/login");
    try {
      const res = await axios.post(
        "https://course-app-ugni.onrender.com/admin/courses/" + id,
        {
          title,
          description,
          price,
          published,
          imageLink: image,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      console.log(res.data);
      dispatch({ type: "admin/saveEditedCourse" });
    } catch (e) {
      if (e.response) {
        const { status } = e.response;
        if (status === 400) {
          console.log(e.response.data.error);
        } else if (status === 404) {
          console.log(e.response.data.message);
        } else {
          console.log(e.response.data.error);
        }
      }
    }
  };
}
export const {
  loading,
  assigningUsername,
  editingCourse,
  saveEditedCourse,
  saveNewCourse,
  isAdminLoggedOut,
} = adminSlice.actions;

export default adminSlice.reducer;
