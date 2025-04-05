import LogoIcon from "../../../assets/logo.svg?react";
import Navigation from "../navigation/Navigation";

function Header() {
  return (
    <header style={{ color: "#fff", padding: "10px" }}>
      <div className="logo">
        <LogoIcon
          className="logo-image"
          style={{ width: "200px", height: "auto" }}
        />
      </div>
      <Navigation />
    </header>
  );
}

export default Header;
