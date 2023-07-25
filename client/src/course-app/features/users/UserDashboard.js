import { useNavigate, useSearchParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import Navbar from "../../Navbar";
import { MoonLoader } from "react-spinners";
import { useEffect, useState } from "react";
import { listAllCoursesForUser, isUserLoggedOut } from "./userSlice";
import styles from "./UserDashboard.module.css";
const MIN_PRICE = 1999;
const MAX_PRICE = 9999;
export default function UserDashboard() {
  const [filter, setFilter] = useState(false);
  const [query, setQuery] = useState("");
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [searchParam, setSearchParam] = useSearchParams("");
  const [selectedPrice, setSelectedPrice] = useState(MAX_PRICE);

  const user = useSelector((store) => store.user);

  useEffect(
    function () {
      let q = searchParam.get("title");
      let p = searchParam.get("price");
      console.log(p);
      if (q === null) q = "";
      if (p === null) p = "";
      // const k = parseInt(p)
      setQuery(q);
      const price = p === "" ? "" : parseInt(p);
      console.log("price is" + price);

      dispatch(listAllCoursesForUser(q, price, navigate));
    },
    [navigate, dispatch, searchParam]
  );

  useEffect(() => {
    const handlePopstate = () => {
      console.log(hasQueryParams());
      if (!hasQueryParams()) {
        setFilter(false);
      }
    };
    window.addEventListener("popstate", handlePopstate);

    return () => {
      window.removeEventListener("popstate", handlePopstate);
    };
  }, []);
  function handleLogout() {
    localStorage.removeItem("token");
    dispatch(isUserLoggedOut());
    navigate("/users/login");
  }

  function handleFilterBtn() {
    setFilter((filter) => !filter);
    setSelectedPrice(MAX_PRICE);
  }

  function handlePurchasedCoursesRoute() {
    navigate("/users/purchasedCourses");
  }
  const handleKeyPress = (event) => {
    if (event.key === "Enter") {
      if (query === "") return;
      //searchParam.set("title", query);
      dispatch(listAllCoursesForUser(query, "", navigate));
      if (searchParam.get("price") !== null) {
        navigate(
          `/users/dashboard?title=${query}&price=${searchParam.get("price")}`
        );
      } else {
        navigate(`/users/dashboard?title=${query}`);
      }

      console.log("Search query:", query);
    }
  };

  function handleViewMore(id) {
    navigate(`/users/courses/${id}`);
  }

  const handlePriceChange = (event) => {
    const newPrice = parseInt(event.target.value);
    setSelectedPrice(parseInt(event.target.value));
    console.log("hello1 " + filter + "     " + user.isLoading);
    navigate(`/users/dashboard?title=${query}&price=${newPrice}`);
    console.log("hello2 " + filter + "     " + user.isLoading);
  };

  function hasQueryParams() {
    return searchParam.get("title") || searchParam.get("price");
  }
  return (
    <>
      {filter === false && user.isLoading === true && (
        <div className={styles["loading-container"]}>
          <MoonLoader
            color="purple"
            loading={user.isLoading}
            className={styles.override}
            size={50}
          />
        </div>
      )}
      <div>
        {filter === true && user.isLoading === true && (
          <>
            <nav className={styles.nav}>
              <Navbar display={true}>
                <div className={styles["form-box"]}>
                  <input
                    type="text"
                    value={query}
                    onChange={(e) => setQuery(e.target.value)}
                    onKeyDown={handleKeyPress}
                    className={styles["navbar-input-box"]}
                    placeholder="Search..."
                  ></input>
                  <button
                    className={styles["log-out-btn"]}
                    onClick={handlePurchasedCoursesRoute}
                  >
                    My courses
                  </button>
                  <button
                    className={styles["log-out-btn"]}
                    onClick={handleLogout}
                  >
                    Log out
                  </button>
                </div>
              </Navbar>
            </nav>
            <div style={{ padding: "0 3.2rem" }}>
              <section className={styles["dashboard-options"]}>
                <div className={styles["sort-and-filter"]}>
                  <button
                    onClick={handleFilterBtn}
                    className={styles["filter-btn"]}
                  >
                    <ion-icon
                      style={{ fontSize: "1.2rem" }}
                      className={styles["filter-icon"]}
                      name="filter-outline"
                    ></ion-icon>
                    Filter
                  </button>
                </div>
              </section>
              <div style={{ display: "flex" }}>
                <aside
                  style={{ width: "18rem" }}
                  className={
                    filter
                      ? styles["vertical-progress-bar-container"]
                      : styles["display-progress"]
                  }
                >
                  <input
                    type="range"
                    min={MIN_PRICE}
                    max={MAX_PRICE}
                    value={selectedPrice}
                    step={1000}
                    onChange={handlePriceChange}
                    className="vertical-progress-bar"
                  ></input>
                  <div
                    style={{ fontSize: "1.2rem" }}
                    className="vertical-progress-bar-label"
                  >
                    Min to :{" "}
                    <span style={{ color: "#7950f2" }}>${selectedPrice}</span>
                  </div>
                </aside>

                <div className={styles["loading-container2"]}>
                  <MoonLoader
                    color="purple"
                    className={styles.override}
                    size={50}
                  />
                </div>
              </div>
            </div>
          </>
        )}
      </div>

      {user.isLoading === false && (
        <>
          <nav className={styles.nav}>
            <Navbar display={true}>
              <div className={styles["form-box"]}>
                <input
                  type="text"
                  value={query}
                  onChange={(e) => setQuery(e.target.value)}
                  onKeyDown={handleKeyPress}
                  className={styles["navbar-input-box"]}
                  placeholder="Search..."
                ></input>
                <button
                  className={styles["log-out-btn"]}
                  onClick={handlePurchasedCoursesRoute}
                >
                  My courses
                </button>
                <button
                  className={styles["log-out-btn"]}
                  onClick={handleLogout}
                >
                  Log out
                </button>
              </div>
            </Navbar>
          </nav>
          <div className={styles["user-dashboard-container"]}>
            <div className={styles.container}>
              <div>
                {hasQueryParams() && (
                  <section className={styles["dashboard-options"]}>
                    <div className={styles["sort-and-filter"]}>
                      <button
                        onClick={handleFilterBtn}
                        className={styles["filter-btn"]}
                      >
                        <ion-icon
                          style={{ fontSize: "1.2rem" }}
                          className={styles["filter-icon"]}
                          name="filter-outline"
                        ></ion-icon>
                        Filter
                      </button>
                    </div>
                  </section>
                )}

                <section
                  className={filter && styles["course-and-filter-container"]}
                >
                  <aside
                    className={
                      filter
                        ? styles["vertical-progress-bar-container"]
                        : styles["display-progress"]
                    }
                  >
                    <input
                      type="range"
                      min={MIN_PRICE}
                      max={MAX_PRICE}
                      value={selectedPrice}
                      step={1000}
                      onChange={handlePriceChange}
                      className="vertical-progress-bar"
                    ></input>
                    <div
                      style={{ fontSize: "1.2rem" }}
                      className="vertical-progress-bar-label"
                    >
                      Min to :{" "}
                      <span style={{ color: "#7950f2" }}>${selectedPrice}</span>
                    </div>
                  </aside>

                  <div>
                    {user.allCourses.length === 0 && (
                      <h1
                        style={{
                          height: "50vh",
                          display: "flex",
                          justifyContent: "center",
                          alignItems: "center",
                        }}
                      >
                        Sorry requested courses not available right now
                      </h1>
                    )}
                    {user.allCourses.map((course) => {
                      return (
                        <>
                          <div className={styles["course-container"]}>
                            <div
                              onClick={() => handleViewMore(course._id)}
                              className={styles.course}
                            >
                              <div className={styles["course-img-container"]}>
                                <img
                                  className={styles["course-img"]}
                                  src={course.imageLink}
                                  alt="course-pic"
                                ></img>
                              </div>
                              <div className={styles["course-text"]}>
                                <p className={styles["course-title"]}>
                                  {course.title}
                                </p>
                                <p className={styles["course-desc"]}>
                                  {course.description}
                                </p>
                                <p className={styles["course-owner"]}>
                                  {course.owner.username}
                                </p>
                              </div>
                            </div>
                          </div>
                        </>
                      );
                    })}
                  </div>
                </section>
              </div>
            </div>
          </div>
        </>
      )}
    </>
  );
}
