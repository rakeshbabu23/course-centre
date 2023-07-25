import { useState } from "react";

import styles from "./CourseCard.module.css";
import EditDetails from "./EditDetails";

export default function CourseCard({ children }) {
  const [edit, setEdit] = useState(false);

  const getShortDescription = (description) => {
    const words = description.trim().split(" ");
    return words.slice(0, 5).join(" ");
  };

  const [showFullDescription, setShowFullDescription] = useState(false);

  return (
    <>
      <>
        <div className={styles["course-card"]}>
          <div>
            <img
              className={styles["course-img"]}
              src={children.imageLink}
              alt="mern"
            ></img>
          </div>
          <div className={styles["course-content"]}>
            <div className={styles["course-title"]}>{children.title}</div>
            <div className={styles["course-desc"]}>
              {showFullDescription
                ? children.description
                : getShortDescription(children.description)}
              {children.description.split(" ").length > 5 && (
                <span
                  className={styles["more-link"]}
                  onClick={() => setShowFullDescription(!showFullDescription)}
                >
                  {showFullDescription ? " ...less" : " ...more"}
                </span>
              )}
            </div>

            <div className={styles["course-price"]}>${children.price}</div>
            <div className={styles["course-inner-content"]}>
              <div>
                <p
                  className={
                    children.published === true
                      ? styles["status-published"]
                      : styles[`status-not-published`]
                  }
                >
                  {children.published === true ? "Published" : "Not Published"}
                </p>
              </div>
              <div>
                <button
                  className={styles["edit-course-btn"]}
                  onClick={() => setEdit((edit) => !edit)}
                >
                  Edit
                </button>
              </div>
            </div>
          </div>
        </div>
      </>
      <>
        {edit && (
          <div className={styles["edit-details-container"]}>
            <EditDetails
              setEdit={setEdit}
              title={children.title}
              price={children.price}
              description={children.description}
              published={children.published}
              imageLink={children.imageLink}
              id={children._id}
            />
          </div>
        )}
      </>
    </>
  );
}
