import { NavLink } from "react-router-dom";
import "./Navigation.css";

const navItems = [
  { label: "AI Suggestion", path: "/ai-suggestion" },
  { label: "Meal Planner", path: "/meal-planner" },
  { label: "Rating Comments", path: "/rating-comments" },
  { label: "Recipe Generation", path: "/recipe-generation" },
  { label: "Search Discovery", path: "/search-discovery" },
  { label: "Shopping List", path: "/shopping-list" },
  { label: "User Submit", path: "/user-submit" },
];

function Navigation() {
  return (
    <nav className="nav-bar">
      <ul className="nav-list">
        {navItems.map((item) => (
          <li key={item.path} className="nav-item">
            <NavLink
              to={item.path}
              className={({ isActive }) =>
                isActive ? "nav-link active" : "nav-link"
              }
            >
              {item.label}
            </NavLink>
          </li>
        ))}
      </ul>
    </nav>
  );
}

export default Navigation;
