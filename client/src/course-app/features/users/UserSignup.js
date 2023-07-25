import axios from "axios";
import Button from "../../Button";
import "../../button.css";
import "../../login.css";
import { useState, useEffect } from "react";
import { useNavigate, Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { signup, isUserLoggedOut } from "./userSlice";

export default function UserSignup() {
  const navigate = useNavigate();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [email, setEmail] = useState("");

  const user = useSelector((store) => store.user);
  const dispatch = useDispatch();
  useEffect(function () {
    dispatch({
      type: "user/status",
      payload: { status: "", message: "" },
    });
  }, []);
  useEffect(() => {
    console.log("in persist effect");
    const handleBackNavigation = (event) => {
      if (user.isUserLoggedOut) {
        navigate("/home");
        dispatch(isUserLoggedOut());
      }
    };
    window.addEventListener("popstate", handleBackNavigation);
  });
  function handleUserSignup() {
    dispatch(signup(username, email, password, navigate));
  }

  return (
    <div className="login-container">
      <div className="grid box-container" style={{ overflow: "hidden" }}>
        <div
          className="input-fields"
          style={{ marginRight: "1px solid black" }}
        >
          <input
            className={`input-field ${
              user.status === "error" && username === "" ? "red-color" : ""
            }`}
            onFocus={(e) => {
              e.target.classList.remove("red-color");
            }}
            value={username}
            placeholder="Username"
            onChange={(e) => {
              setUsername(e.target.value);
              dispatch({
                type: "user/status",
                payload: { status: "", message: "" },
              });
            }}
          ></input>
          <input
            className={`input-field ${
              user.status === "error" && email === "" ? "red-color" : ""
            }`}
            onFocus={(e) => {
              e.target.classList.remove("red-color");
            }}
            value={email}
            placeholder="Email"
            onChange={(e) => {
              setEmail(e.target.value);
              dispatch({
                type: "user/status",
                payload: { status: "", message: "" },
              });
            }}
          ></input>

          <input
            type="password"
            className={`input-field ${
              user.status === "error" && password === "" ? "red-color" : ""
            }`}
            onFocus={(e) => {
              e.target.classList.remove("red-color");
            }}
            value={password}
            placeholder="Password"
            onChange={(e) => {
              setPassword(e.target.value);
              dispatch({
                type: "user/status",
                payload: { status: "", message: "" },
              });
            }}
          ></input>
          <Button>
            <button className="btn login-btn" onClick={handleUserSignup}>
              Register
            </button>
          </Button>
          <div style={{ marginTop: "5px", fontSize: "16px", color: "red" }}>
            {user.status === "error" ? (
              <p>{user.errorMessage}</p>
            ) : (
              <p style={{ opacity: "0" }}>kmk</p>
            )}
          </div>
          <p className="sign-up-option">
            Already a user,<Link to="/users/login">Login</Link>
          </p>
        </div>
        <div style={{ borderLeft: "2px solid black" }}>
          <img
            src="https://static.vecteezy.com/system/resources/previews/003/689/230/non_2x/online-registration-or-sign-up-login-for-account-on-smartphone-app-user-interface-with-secure-password-mobile-application-for-ui-web-banner-access-cartoon-people-illustration-vector.jpg"
            alt="user"
          ></img>
        </div>
      </div>
    </div>
  );
}
