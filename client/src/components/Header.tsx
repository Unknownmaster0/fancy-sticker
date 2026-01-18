import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faShoppingBasket, faTags } from "@fortawesome/free-solid-svg-icons";
import { useTheme } from "../context/ThemeContext";
import { Link, NavLink } from "react-router-dom";

const Header = () => {
  const { isDarkMode, toggleTheme } = useTheme();

  const darkThemeClass =
    "text-text-muted hover:text-white hover:drop-shadow-[0_0_10px_rgba(6,182,212,1)]";
  const lightThemeClass =
    "text-text-light-muted hover:text-text-dark hover:drop-shadow-[0_0_10px_rgba(217,70,239,0.5)]";

  const navLinkStyleClass = `block text-center text-base font-semibold no-underline transition-all duration-300 relative after:content-[''] after:absolute after:-bottom-[-5px] after:left-0 after:w-0 after:h-0.5 after:bg-gradient-to-r after:from-secondary-neon after:to-primary-neon after:transition-all after:duration-300 hover:after:w-full ${
    isDarkMode ? darkThemeClass : lightThemeClass
  }`;

  return (
    <header
      className={`sticky top-0 z-100 border-b-2 border-primary-neon backdrop-blur-xl shadow-[0_0_30px_rgba(217,70,239,0.3),inset_0_1px_0_rgba(217,70,239,0.1)] ${
        isDarkMode ? "bg-[rgba(10,14,39,0.85)]" : "bg-[rgba(245,245,243,0.95)]"
      }`}
    >
      <div className="flex items-center justify-between mx-auto max-w-5xl px-6 py-4">
        <Link to="/" className="flex items-center no-underline">
          <FontAwesomeIcon
            icon={faTags}
            className="w-8 h-8 mr-2 text-secondary-neon drop-shadow-[0_0_8px_rgba(6,182,212,1)] text-2xl"
          />{" "}
          <span className="text-2xl font-bold uppercase bg-clip-text bg-linear-to-r from-primary-neon via-accent-bright to-secondary-neon tracking-tight drop-shadow-[0_0_30px_rgba(217,70,239,0.5)] text-transparent">
            Fancy Sticker
          </span>
        </Link>
        <nav className="hidden lg:flex absolute lg:static top-full left-0 w-full lg:w-auto shadow-[0_10px_15px_rgba(0,0,0,0.2)] lg:shadow-none py-4 lg:py-0 z-10 lg:z-auto">
          <ul className="list-none m-0 p-0 flex gap-8 w-full lg:w-auto items-center">
            <li>
              <button
                onClick={toggleTheme}
                className="flex items-center justify-center w-10 h-10 rounded-full bg-linear-to-r from-primary-neon to-secondary-neon hover:from-accent-bright hover:to-primary-neon transition-all duration-300 drop-shadow-[0_0_15px_rgba(217,70,239,0.4)] hover:drop-shadow-[0_0_20px_rgba(217,70,239,0.6)] relative overflow-hidden group"
                title="Toggle theme"
              >
                <div className="absolute inset-0 bg-linear-to-r from-secondary-neon to-accent-bright opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                <span className="relative z-10 text-lg font-bold">
                  {isDarkMode ? "☀️" : "🌙"}
                </span>
              </button>
            </li>
            <li>
              <NavLink
                to="/home"
                className={({ isActive }) =>
                  isActive
                    ? `underline ${navLinkStyleClass}`
                    : navLinkStyleClass
                }
              >
                Home
              </NavLink>
            </li>
            <li>
              <NavLink
                to="/about"
                className={({ isActive }) =>
                  isActive
                    ? `underline ${navLinkStyleClass}`
                    : navLinkStyleClass
                }
              >
                About
              </NavLink>
            </li>
            <li>
              <NavLink
                to="/contact"
                className={({ isActive }) =>
                  isActive
                    ? `underline ${navLinkStyleClass}`
                    : navLinkStyleClass
                }
              >
                Contact
              </NavLink>
            </li>
            <li>
              <NavLink
                to="/login"
                className={({ isActive }) =>
                  isActive
                    ? `underline ${navLinkStyleClass}`
                    : navLinkStyleClass
                }
              >
                Login
              </NavLink>
            </li>
            <li>
              <NavLink
                to="/cart"
                className={({ isActive }) =>
                  isActive
                    ? `underline ${navLinkStyleClass}`
                    : navLinkStyleClass
                }
              >
                <FontAwesomeIcon icon={faShoppingBasket} />
              </NavLink>
            </li>
          </ul>
        </nav>
      </div>
    </header>
  );
};

export default Header;
