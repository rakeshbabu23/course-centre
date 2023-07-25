import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { addCourse } from "./adminSlice";
import { useNavigate } from "react-router-dom";
import styles from "./PostCourse.module.css";
import Modall from "./Modall";
export default function PostCourse({ setPostCourse }) {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [price, setPrice] = useState("");
  const [imageLink, setImageLink] = useState("");
  const [published, setPublished] = useState(false);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const admin = useSelector((store) => store.admin);
  function saveFunction() {
    if (!title || !description || !price || !imageLink) {
      dispatch({
        type: "admin/status",
        payload: {
          status: "error",
          message: "All fields are mandatory",
        },
      });
    } else {
      dispatch(
        addCourse(title, description, price, published, imageLink, navigate)
      );

      if (admin.status !== "error") {
        setPostCourse(false);
        setTitle("");
        setPrice("");
        setPublished("");
        setDescription("");
        setImageLink("");
      }
    }
  }

  return (
    <>
      <Modall>
        <div className={styles["edit-container"]}>
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "1fr 1fr",
            }}
          >
            <h2 style={{ color: "#6b46e9", justifySelf: "start" }}>
              Add Course
            </h2>
            <div style={{ justifySelf: "end" }}>
              <ion-icon
                onClick={() => {
                  setPostCourse((postCourse) => !postCourse);
                  dispatch({
                    type: "admin/status",
                    payload: {
                      status: "",
                      message: "",
                    },
                  });
                }}
                className={styles["close-option"]}
                style={{
                  fontSize: "32px",
                  cursor: "pointer",
                }}
                name="close-outline"
              ></ion-icon>
            </div>
          </div>
          <div>
            <label className={styles["label"]}>title</label>
            <input
              value={title}
              className={styles["edit-fields"]}
              onChange={(e) => setTitle(e.target.value)}
            ></input>
          </div>
          <div>
            <label className={styles["label"]}>description</label>
            <input
              value={description}
              className={styles["edit-fields"]}
              onChange={(e) => setDescription(e.target.value)}
            ></input>
          </div>
          <div>
            <label className={styles["label"]}>price</label>
            <input
              value={price}
              className={styles["edit-fields"]}
              onChange={(e) => setPrice(e.target.value)}
            ></input>
          </div>
          <div>
            <label className={styles["label"]}>publish</label>
            <select
              className={styles["edit-fields"]}
              style={{ height: "2.5rem" }}
              onChange={(e) => setPublished(e.target.value)}
            >
              <option value="false">false</option>
              <option value="true">true</option>
            </select>
          </div>
          <div>
            <label className={styles["label"]}>Image link</label>
            <input
              className={styles["edit-fields"]}
              value={imageLink}
              onChange={(e) => setImageLink(e.target.value)}
            ></input>
          </div>
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "1fr 1fr",
            }}
          >
            <div>
              <button className={styles["save-button"]} onClick={saveFunction}>
                save
              </button>
            </div>
            <h2 style={{ justifySelf: "end" }}>
              {admin.status === "error" ? admin.errorMessage : ""}
            </h2>
          </div>
        </div>
      </Modall>
    </>
  );
}
