import Search from "./search/Search";
import Logo from "./ui/Logo";
import { Link } from "react-router-dom";
import "./Header.css";
import Avatar from "./ui/Avatar";
import { IoMdSearch } from "react-icons/io";
import { TbBrandFeedly } from "react-icons/tb";
import { useState } from "react";
import Icon from "./ui/Icon";
import { CgClose } from "react-icons/cg";
import { HiMiniBars3 } from "react-icons/hi2";
import ThemeSwitch from "./ThemeSwitch";

const Header = () => {
  const [searchOpen, setSearchOpen] = useState(false);

  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <header className="header">
      <div className="header-top">
        <Link to="/" className="logo">
          <Logo />
        </Link>

        <div className="header-icons">
          <Link to="/feed" className="header-icon" title="Feed">
            <Icon icon={<TbBrandFeedly size={24} />} />
          </Link>
          <Icon
            onClick={() => setSearchOpen((prev) => !prev)}
            className="header-icon"
            title="Search"
            icon={<IoMdSearch size={24} />}
          />
          <Icon
            onClick={() => setMenuOpen((prev) => !prev)}
            className="header-icon menu-toggle"
            title="Menu"
            icon={<HiMiniBars3 size={24} />}
          />
        </div>
      </div>

      <div className={`header-search ${searchOpen ? "open" : ""}`}>
        <Search />
      </div>

      <nav className={`header-nav ${menuOpen ? "open" : ""}`}>
        <div className="header-nav-actions">
          <ThemeSwitch />
          <Icon
            onClick={() => setMenuOpen(false)}
            className="header-nav-close"
            icon={<CgClose size={24} />}
          />
        </div>

        <ul>
          <li>
            <Link to="/feed" onClick={() => setMenuOpen(false)}>
              Feed
            </Link>
          </li>
          <li>
            <Link to="/about" onClick={() => setMenuOpen(false)}>
              About
            </Link>
          </li>
          <li className="header-nav-profile">
            <Link to="/profile" onClick={() => setMenuOpen(false)}>
              Profile
            </Link>
          </li>
        </ul>
      </nav>

      <ThemeSwitch className="theme-icon" />

      <Link to="/profile" className="header-avatar-icon">
        <Avatar />
      </Link>
    </header>
  );
};

export default Header;
