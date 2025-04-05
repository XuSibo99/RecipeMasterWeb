function Navigation() {
  return (
    <nav>
      <ul
        style={{
          display: "flex",
          justifyContent: "space-around",
          listStyle: "none",
          margin: 0,
          padding: 0,
        }}
      >
        <li>
          <a href="/ai-suggestion" style={{ color: "#333" }}>
            AI Suggestion
          </a>
        </li>
        <li>
          <a href="/meal-planner" style={{ color: "#333" }}>
            Meal Planner
          </a>
        </li>
        <li>
          <a href="/rating-comments" style={{ color: "#333" }}>
            Rating Comments
          </a>
        </li>
        <li>
          <a href="/recipe-generation" style={{ color: "#333" }}>
            Recipe Generation
          </a>
        </li>
        <li>
          <a href="/search-discovery" style={{ color: "#333" }}>
            Search Discovery
          </a>
        </li>
        <li>
          <a href="/shopping-list" style={{ color: "#333" }}>
            Shopping List
          </a>
        </li>
        <li>
          <a href="/user-submit" style={{ color: "#333" }}>
            User Submit
          </a>
        </li>
      </ul>
    </nav>
  );
}

export default Navigation;
