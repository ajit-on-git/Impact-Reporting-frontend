import { NavLink } from "react-router-dom";
import "./Header.css";

export default function Header() {
  return (
    <header className="app-header">
      <div className="header-brand">
        <h1 className="app-title">
          <span className="logo-icon">🌿</span> Sustainable Commerce AI
        </h1>
        <p className="app-subtitle">
          Generate AI-powered sustainability impact reports for eco-friendly
          products
        </p>
      </div>

      <nav className="header-nav">
        <ul className="navbar">
          <li>
            <NavLink
              to="/"
              className={({ isActive }) =>
                isActive ? "nav-link active" : "nav-link"
              }
            >
              Impact Form
            </NavLink>
          </li>
          <li>
            <NavLink
              to="/result"
              className={({ isActive }) =>
                isActive ? "nav-link active" : "nav-link"
              }
            >
              Impact Result
            </NavLink>
          </li>
        </ul>
      </nav>
    </header>
  );
}
