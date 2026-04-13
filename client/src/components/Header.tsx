import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faAngleDown,
  faShoppingBasket,
  faTags,
} from "@fortawesome/free-solid-svg-icons";
import { useTheme } from "../context/ThemeContext";
import { Link, NavLink, useLocation, useNavigate } from "react-router-dom";
import { useCart } from "../store/cart-context";
import { useAuth } from "../store/auth-context";
import { useEffect, useRef, useState } from "react";
import { toast } from "react-toastify";

const Header = () => {
  const { isDarkMode, toggleTheme } = useTheme();
  const { totalQuantity } = useCart();
  const { isAuthenticated, user, logOut } = useAuth();
  const userMenuRef = useRef<HTMLDivElement>(null);
  const [isUserMenuOpen, setIsUserMenuOpen] = useState(false);
  const [isAdminMenuOpen, setIsAdminMenuOpen] = useState(false);
  const isAdmin = user?.roles.includes("ROLE_ADMIN"); // Replace with actual admin check
  const navigate = useNavigate();
  const location = useLocation();

  const toggleUserMenu = () => setIsUserMenuOpen((prev) => !prev);
  const toggleAdminMenu = () => setIsAdminMenuOpen((prev) => !prev);

  const handleLogout = (event: React.FormEvent) => {
    event.preventDefault();
    logOut();
    toast.success("Logged out successfully!");
    navigate("/home");
  };

  useEffect(() => {
    setIsUserMenuOpen(false);
    setIsAdminMenuOpen(false);
    const handleClickOutside = (event: MouseEvent) => {
      if (
        userMenuRef.current &&
        !userMenuRef.current.contains(event.target as Node)
      ) {
        setIsUserMenuOpen(false);
        setIsAdminMenuOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
  }, [location.pathname]);

  const darkThemeClass =
    "text-text-muted hover:text-white hover:drop-shadow-[0_0_10px_rgba(6,182,212,1)]";
  const lightThemeClass =
    "text-text-light-muted hover:text-text-dark hover:drop-shadow-[0_0_10px_rgba(217,70,239,0.5)]";

  const navLinkStyleClass = `block text-center text-base font-semibold no-underline transition-all duration-300 relative after:content-[''] after:absolute after:-bottom-[-5px] after:left-0 after:w-0 after:h-0.5 after:bg-gradient-to-r after:from-secondary-neon after:to-primary-neon after:transition-all after:duration-300 hover:after:w-full ${
    isDarkMode ? darkThemeClass : lightThemeClass
  }`;

  const dropdownLinkClass = `block w-full text-left px-4 py-2 text-lg font-semibold transition-colors duration-200 ${
    isDarkMode
      ? "text-text-muted hover:bg-[rgba(217,70,239,0.15)] hover:text-text-main"
      : "text-text-dark hover:bg-[rgba(217,70,239,0.08)]"
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
              {isAuthenticated ? (
                <div className="relative" ref={userMenuRef}>
                  <button
                    onClick={toggleUserMenu}
                    className="relative text-primary flex items-center gap-2"
                  >
                    <span className={navLinkStyleClass}>
                      {user &&
                        `Hello ${user?.name.length > 5 ? `${user?.name.slice(0, 5)}...` : user?.name}`}
                    </span>
                    <FontAwesomeIcon
                      icon={faAngleDown}
                      className="text-primary-neon dark:text-light w-6 h-6"
                    />
                  </button>
                  {isUserMenuOpen && (
                    <div
                      className={`absolute right-0 w-48 rounded-md shadow-lg z-20 transition ease-in-out duration-200 border border-primary-neon backdrop-blur-xl ${isDarkMode ? "bg-[rgba(10,14,39,0.95)]" : "bg-[rgba(245,245,243,0.98)]"}`}
                    >
                      <ul className="py-2">
                        <li>
                          <Link to="/profile" className={dropdownLinkClass}>
                            Profile
                          </Link>
                        </li>
                        <li>
                          <Link to="/orders" className={dropdownLinkClass}>
                            Orders
                          </Link>
                        </li>
                        {isAdmin && (
                          <li>
                            <button
                              onClick={toggleAdminMenu}
                              className={`${dropdownLinkClass} flex items-center justify-between`}
                            >
                              Admin
                              <FontAwesomeIcon
                                icon={faAngleDown}
                                className={`text-primary-neon w-6 h-6`}
                              />
                            </button>
                            {isAdminMenuOpen && (
                              <ul className="ml-4 mt-2 space-y-2">
                                <li>
                                  <Link
                                    to="/admin/orders"
                                    className={dropdownLinkClass}
                                  >
                                    Orders
                                  </Link>
                                </li>
                                <li>
                                  <Link
                                    to="/admin/messages"
                                    className={dropdownLinkClass}
                                  >
                                    Messages
                                  </Link>
                                </li>
                              </ul>
                            )}
                          </li>
                        )}

                        <li>
                          <Link
                            to="/home"
                            onClick={handleLogout}
                            className={dropdownLinkClass}
                          >
                            Logout
                          </Link>
                        </li>
                      </ul>
                    </div>
                  )}
                </div>
              ) : (
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
              )}
            </li>
            <li>
              <NavLink to="/cart" className={"relative text-primary-neon py-2"}>
                <FontAwesomeIcon
                  icon={faShoppingBasket}
                  className="text-primary-neon w-6"
                />
                <div className="absolute -top-2 -right-5 bg-secondary-neon text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
                  {totalQuantity}
                </div>
              </NavLink>
            </li>
          </ul>
        </nav>
      </div>
    </header>
  );
};

export default Header;
