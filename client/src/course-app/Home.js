import { Link } from "react-router-dom";
import Card from "./Card";
import "./Card.css";
import "./Home.css";
export default function Home() {
  return (
    <div className="container home-cards">
      <Card>
        <div>
          <p className="home-card-text">Post</p>
          <p className="home-card-text">A</p>
          <p className="home-card-text">Course</p>
        </div>
        <div className="home-card-btn">
          <Link className="link" to="/admin/login">
            Click here
          </Link>
        </div>
      </Card>
      <Card>
        <div>
          <p className="home-card-text">Register</p>
          <p className="home-card-text">A</p>
          <p className="home-card-text">Course</p>
        </div>
        <div className="home-card-btn">
          <Link className="link" to="/users/login">
            Click here
          </Link>
        </div>
      </Card>
    </div>
  );
}
