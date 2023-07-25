import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import Navbar from "../../Navbar";
import { useDispatch, useSelector } from "react-redux";
import { courseDetails, buyCourse, isUserLoggedOut } from "./userSlice";

import { MoonLoader } from "react-spinners";
import styles from "./CourseDetails.module.css";

const desc = styles["course-details-description"];
const owner = styles["course-details-owner"];

export default function CourseDetails() {
  const { courseId } = useParams();
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);
  const dispatch = useDispatch();
  const user = useSelector((store) => store.user);

  useEffect(
    function () {
      dispatch(courseDetails(courseId, navigate));
    },
    [courseId, dispatch, navigate]
  );
  function handleLogout() {
    localStorage.removeItem("token");
    dispatch(isUserLoggedOut());
    navigate("/users/login");
  }

  function handleBuyCourse() {
    dispatch(buyCourse(courseId, navigate));
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
      {user.isLoading === false && user.requestedCourse && (
        <>
          <div className={styles["course-details-header"]}>
            <div className={styles["course-details-text"]}>
              <h2 className={styles["course-details-title"]}>
                {user.requestedCourse.title}
              </h2>
              <p className={`${desc}`}>{user.requestedCourse.description}</p>
              <p className={`${desc}`}>
                Created by{" "}
                <span className={`${desc} ${owner}`}>
                  {user.requestedCourse.owner.username}
                </span>
              </p>
            </div>

            <aside className={styles["course-img-buy-card"]}>
              <div className={styles["course-img"]}>
                <img
                  src={user.requestedCourse.imageLink}
                  alt="course-img"
                ></img>
              </div>
              <div className={styles["course-buy-container"]}>
                {user.whetherUserBoughtCourse === courseId ? (
                  <div
                    onClick={() => navigate("/users/purchasedCourses")}
                    className={styles.purchased}
                    style={{ display: "flex", cursor: "pointer" }}
                  >
                    <p>Already Purchased</p>
                    <span style={{ alignSelf: "center" }}>
                      <ion-icon
                        style={{ fontSize: "1.6rem" }}
                        name="arrow-forward-outline"
                      ></ion-icon>
                    </span>
                  </div>
                ) : (
                  <button
                    className={styles["course-buy-btn"]}
                    onClick={handleBuyCourse}
                  >
                    Enroll Now
                  </button>
                )}
              </div>
            </aside>
          </div>
        </>
      )}
      {isLoading === false && !user.requestedCourse && (
        <div>Course details not available.</div>
      )}
    </>
  );
}
