import LogoIcon from "../../../assets/logo.svg?react";
import Navigation from "../navigation/Navigation";
import "./Header.css";

function Header() {
  return (
    <header className="header">
      <div className="header-logo">
        <LogoIcon className="logo-icon" />
      </div>
      <Navigation />
    </header>
  );
}

export default Header;
