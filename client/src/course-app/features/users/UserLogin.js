import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import "../../login.css";
import Button from "../../Button";
import { useDispatch, useSelector } from "react-redux";
import { login, isUserLoggedOut } from "./userSlice";

export default function UserLogin() {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const dispatch = useDispatch();
  const user = useSelector((store) => store.user);

  // function handleUserLogin() {
  //   if (email === "" || password === "") setUserLoginError(true);
  //   console.log(email);

  //   axios
  //     .post("http://localhost:5000/users/login", { email, password })
  //     .then((res) => {
  //       console.log(res.data.token);
  //       localStorage.setItem("token", res.data.token);
  //       navigate("/users/dashboard");
  //     })
  //     .catch((e) => {
  //       if (e.response && e.response.status === 401) {
  //         setUserLoginError((userLoginError) => !userLoginError);
  //       }
  //     });
  // }
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
  function handleUserLogin() {
    dispatch(login(email, password, navigate));
  }
  return (
    <div className="login-container">
      <div className="grid box-container" style={{ overflow: "hidden" }}>
        <div style={{ borderRight: "2px solid black", overflow: "hidden" }}>
          <img
            src="https://img.freepik.com/premium-vector/secure-login-sign-up-concept-illustration-user-use-secure-login-password-protection-website-social-media-account-vector-flat-style_7737-2270.jpg?w=2000"
            alt="user-login"
          ></img>
        </div>
        <div className="input-fields">
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
            <button className="btn login-btn" onClick={handleUserLogin}>
              Login
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
            New user,<Link to="/users/signup">Signup</Link>
          </p>
        </div>
      </div>
    </div>
  );
}
