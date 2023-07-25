import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import "../../login.css";
import Button from "../../Button";
import { useDispatch, useSelector } from "react-redux";
import { isAdminLoggedOut, login } from "./adminSlice";

export default function AdminLogin() {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const dispatch = useDispatch();
  const admin = useSelector((store) => store.admin);
  useEffect(function () {
    dispatch({
      type: "admin/status",
      payload: { status: "", message: "" },
    });
  }, []);
  useEffect(() => {
    const handleBackNavigation = (event) => {
      if (admin.isAdminLoggedOut) {
        navigate("/home");
        dispatch(isAdminLoggedOut());
      }
    };
    window.addEventListener("popstate", handleBackNavigation);
  });
  function handleClick() {
    dispatch(login(email, password, navigate));
  }
  return (
    <div className="login-container">
      <div className="grid box-container ">
        <div className="image-container">
          <img
            src="https://cdni.iconscout.com/illustration/premium/thumb/user-login-7210570-5857593.png"
            alt="admin"
          ></img>
        </div>
        <div className="input-fields">
          <input
            className={`input-field ${
              admin.status === "error" && email === "" ? "red-color" : ""
            }`}
            value={email}
            placeholder="Email"
            onChange={(e) => {
              setEmail(e.target.value);
              dispatch({
                type: "admin/status",
                payload: { status: "", message: "" },
              });
            }}
            onFocus={(e) => {
              e.target.classList.remove("red-color");
            }}
          ></input>

          <input
            type="password"
            className={`input-field ${
              admin.status === "error" && password === "" ? "red-color" : ""
            }`}
            value={password}
            placeholder="Password"
            onChange={(e) => {
              setPassword(e.target.value);
              dispatch({
                type: "admin/status",
                payload: { status: "", message: "" },
              });
            }}
            onFocus={(e) => {
              e.target.classList.remove("red-color");
            }}
          ></input>

          <Button>
            <button className="btn login-btn" onClick={() => handleClick()}>
              Login
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
            New user,<Link to="/admin/signup">Signup</Link>
          </p>
        </div>
      </div>
    </div>
  );
}
