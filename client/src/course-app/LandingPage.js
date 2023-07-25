import { Paper } from "@mui/material";

import "./LandingPage.css";
import { useNavigate } from "react-router-dom";

export default function CourseApp() {
  const navigate = useNavigate();

  return (
    <>
      <div className="landing-page-container">
        <Paper elevation={3} className="paper">
          <div className="project-title">
            <p> Welcome to</p>
            <p>COURSE HUB</p>
          </div>
          <div className="start-btn-container">
            <button className="home-btn" onClick={() => navigate("/home")}>
              <ion-icon
                class="arrow-icon"
                name="chevron-forward-outline"
              ></ion-icon>
            </button>
          </div>
        </Paper>
      </div>
    </>
  );
}
