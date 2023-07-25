import { useEffect } from "react";

import { MoonLoader } from "react-spinners";
import styles from "./PurchasedCourses.module.css";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import Navbar from "../../Navbar";
import { purchasedCourses } from "./userSlice";

export default function PurchasedCourses() {
  const navigate = useNavigate();
  const user = useSelector((store) => store.user);
  const dispatch = useDispatch();
  console.log("purchased component");
  useEffect(
    function () {
      dispatch(purchasedCourses(navigate));
    },
    [navigate, dispatch]
  );

  useEffect(() => {
    console.log("in persist effect");
    const handleBackNavigation = (event) => {
      if (!user.isPaymentDone) {
        navigate("/users/dashboard");
      }
    };
    window.addEventListener("popstate", handleBackNavigation);
  }, [navigate]);

  function handleLogout() {
    localStorage.removeItem("token");
    navigate("/users/login");
  }
  return (
    <>
      {user.isLoading === true && (
        <div className={styles["loading-container"]}>
          <MoonLoader
            color="purple"
            loading={user.isLoading}
            className={styles.override}
            size={50}
          />
        </div>
      )}
      {user.isLoading === false && (
        <>
          <nav className={styles.nav}>
            <Navbar display={true}>
              <div className={styles["form-box"]}>
                <input
                  type="text"
                  className={styles["navbar-input-box"]}
                  placeholder="Search..."
                ></input>
                <button
                  className={styles["log-out-btn"]}
                  onClick={handleLogout}
                >
                  Log out
                </button>
              </div>
            </Navbar>
          </nav>
        </>
      )}
      {user.isLoading === false && (
        <>
          <div className={styles.container}>
            {user.purchasedCourses.length === 0 && (
              <h1
                style={{
                  height: "50vh",
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                }}
              >
                You have not purchased any courses
              </h1>
            )}
            <div className={styles.courses}>
              {user.purchasedCourses.map((course) => {
                return (
                  <div className={styles["course-container"]}>
                    <div className={styles.course}>
                      <div className={styles["course-img-container"]}>
                        <img
                          className={styles["course-img"]}
                          src={course.imageLink}
                          alt="course-pic"
                        ></img>
                      </div>
                      <div className={styles["course-text"]}>
                        <p className={styles["course-title"]}>{course.title}</p>
                        <p className={styles["course-desc"]}>
                          {course.description}
                        </p>
                        <p className={styles["course-owner"]}>
                          {course.owner.username}
                        </p>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </>
      )}
    </>
  );
}
