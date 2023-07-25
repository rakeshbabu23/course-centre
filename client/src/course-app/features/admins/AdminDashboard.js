import Navbar from "../../Navbar";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { MoonLoader } from "react-spinners";
import styles from "./AdminDashboard.module.css";
import CourseCard from "./CourseCard";
import { listAllCourses, isAdminLoggedOut } from "./adminSlice";
import { useDispatch, useSelector } from "react-redux";
import PostCourse from "./PostCourse";
import { Add } from "@mui/icons-material";
import { purple } from "@mui/material/colors";
export default function AdminDashboard() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [postCourse, setPostCourse] = useState(false);

  const admin = useSelector((store) => store.admin);

  useEffect(() => {
    dispatch(listAllCourses(navigate));
  }, [dispatch, navigate, admin.saveNewCourse, admin.saveEditedCourse]);

  function handleLogout() {
    localStorage.removeItem("token");
    dispatch(isAdminLoggedOut());
    navigate("/admin/login");
  }

  return (
    <>
      {admin.isLoading === true && (
        <div className={styles["loading-container"]}>
          <MoonLoader
            color="purple"
            loading={admin.isLoading}
            className={styles.override}
            size={50}
          />
        </div>
      )}

      {admin.isLoading === false && (
        <>
          <div className={styles["container-for-courses"]}>
            <Navbar>
              <button onClick={handleLogout} className={styles["log-out-link"]}>
                Log out
              </button>
            </Navbar>

            <div className={styles.welcome}>Welcome {admin.username}</div>
            <section className={styles["cards-container"]}>
              {admin.coursesByAdmin.length === 0 && (
                <h1
                  style={{
                    fontSize: "1.8rem",
                    height: "50vh",
                    textAlign: "center",
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                  }}
                >
                  You don't have any courses
                </h1>
              )}
              <div className={styles["course-cards-container"]}>
                {admin.coursesByAdmin.map((course, index) => {
                  return <CourseCard key={index}>{course}</CourseCard>;
                })}
              </div>
              <div className={styles["add-course-btn"]}>
                <Add
                  sx={{
                    fontSize: "2rem",
                    fontWeight: 900,
                    color: purple[500],
                  }}
                  style={{ cursor: "pointer" }}
                  onClick={() => setPostCourse((postCourse) => !postCourse)}
                />
              </div>
            </section>
          </div>
        </>
      )}

      {postCourse && (
        // <Modal closeModal={() => setPostCourse(false)}>
        <PostCourse setPostCourse={setPostCourse} />
        // </Modal>
      )}
    </>
  );
}
