import { useState } from "react";
import { useDispatch } from "react-redux";
import { editCourse } from "./adminSlice";
import { useNavigate } from "react-router-dom";
import Modall from "./Modall";
import styles from "./EditDetails.module.css";

export default function EditDetails(props) {
  const [title, setTitle] = useState(props.title);
  const [desc, setDesc] = useState(props.description);
  const [price, setPrice] = useState(props.price);
  const [image, setImage] = useState(props.imageLink);
  const [published, setPublished] = useState(props.published);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  function handleSave() {
    dispatch(
      editCourse(title, desc, price, published, image, props.id, navigate)
    );
    props.setEdit((edit) => !edit);
  }

  return (
    <Modall>
      <div className={styles["edit-container"]}>
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "1fr 1fr",
          }}
        >
          <h2 style={{ color: "#6b46e9", justifySelf: "start" }}>
            Edit Course
          </h2>
          <div style={{ justifySelf: "end" }}>
            <ion-icon
              onClick={() => props.setEdit((edit) => !edit)}
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
          <label className={styles["label"]}>Title</label>
          <input
            className={styles["edit-fields"]}
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />
        </div>
        <div>
          <label className={styles["label"]}>Description</label>
          <textarea
            className={styles["edit-fields"]}
            value={desc}
            onChange={(e) => setDesc(e.target.value)}
          />
        </div>
        <div>
          <label className={styles["label"]}>Price</label>
          <input
            className={styles["edit-fields"]}
            value={price}
            onChange={(e) => setPrice(e.target.value)}
          />
        </div>
        <div>
          <label className={styles["label"]}>Image</label>
          <input
            className={styles["edit-fields"]}
            value={image}
            onChange={(e) => setImage(e.target.value)}
          />
        </div>
        <div>
          <label className={styles["label"]}>Publish</label>
          <select
            className={styles["edit-fields"]}
            value={published}
            onChange={(e) => setPublished(e.target.value)}
          >
            <option value="false">False</option>
            <option value="true">True</option>
          </select>
        </div>
        <div>
          <button className={styles["save-button"]} onClick={handleSave}>
            Save
          </button>
        </div>
      </div>
    </Modall>
  );
}
