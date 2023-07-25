import Button from "../../Button";
import "../../button.css";
import "../../login.css";
import { useEffect, useState } from "react";
import { useNavigate, Link } from "react-router-dom";

import { useDispatch, useSelector } from "react-redux";
import { signup, isAdminLoggedOut } from "./adminSlice";

export default function Signup() {
  const navigate = useNavigate();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [email, setEmail] = useState("");
  const dispatch = useDispatch();
  const admin = useSelector((store) => store.admin);

  useEffect(function () {
    dispatch({
      type: "admin/status",
      payload: { status: "", message: "" },
    });
  }, []);
  useEffect(() => {
    console.log("in persist effect");
    const handleBackNavigation = (event) => {
      if (admin.isAdminLoggedOut) {
        navigate("/home");
        dispatch(isAdminLoggedOut());
      }
    };
    window.addEventListener("popstate", handleBackNavigation);
  });
  function handleAdminSignup() {
    dispatch(signup(username, email, password, navigate));
  }

  return (
    <div className="login-container">
      <div className="grid box-container ">
        <div className="input-fields">
          <input
            className={`input-field ${
              admin.status === "error" && username === "" ? "red-color" : ""
            }`}
            value={username}
            onFocus={(e) => {
              e.target.classList.remove("red-color");
            }}
            placeholder="Username"
            onChange={(e) => {
              setUsername(e.target.value);
              dispatch({
                type: "admin/status",
                payload: { status: "", message: "" },
              });
            }}
          ></input>
          <input
            className={`input-field ${
              admin.status === "error" && email === "" ? "red-color" : ""
            }`}
            onFocus={(e) => {
              e.target.classList.remove("red-color");
            }}
            value={email}
            placeholder="Email"
            onChange={(e) => {
              setEmail(e.target.value);
              dispatch({
                type: "admin/status",
                payload: { status: "", message: "" },
              });
            }}
          ></input>
          <input
            type="password"
            className={`input-field ${
              admin.status === "error" && password === "" ? "red-color" : ""
            }`}
            onFocus={(e) => {
              e.target.classList.remove("red-color");
            }}
            value={password}
            placeholder="Password"
            onChange={(e) => {
              setPassword(e.target.value);
              dispatch({
                type: "admin/status",
                payload: { status: "", message: "" },
              });
            }}
          ></input>
          <Button>
            <button className="btn login-btn" onClick={handleAdminSignup}>
              Register
            </button>
          </Button>
          <div style={{ marginTop: "5px", fontSize: "16px", color: "red" }}>
            {admin.status === "error" ? (
              <p>{admin.errorMessage}</p>
            ) : (
              <p style={{ opacity: "0" }}>kmk</p>
            )}
          </div>
          <p className="sign-up-option">
            Existing user,<Link to="/admin/login">Login</Link>
          </p>
        </div>

        <div className="image-container">
          <img
            src="https://img.freepik.com/free-vector/man-look-graphic-chart-business-analytics-concept-big-data-processing-icon_39422-761.jpg"
            alt="admin"
          ></img>
        </div>
      </div>
    </div>
  );
}
