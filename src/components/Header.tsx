import Search from "./Search/Search";
import Logo from "./ui/Logo";
import "./Header.css";

const Header = () => {
  return (
    <header className="header">
      <Logo />

      <Search />

      <nav>
        <ul>
          <li>
            <a href="#">Home</a>
          </li>
          <li>
            <a href="#">About</a>
          </li>
          <li>
            <a href="#">Contact</a>
          </li>
        </ul>
      </nav>
    </header>
  );
};

export default Header;
