import { faHeart } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useTheme } from "../../context/ThemeContext";

const Footer = () => {
  const { isDarkMode } = useTheme();

  return (
    <footer
      className={`flex justify-center items-center py-8 px-4 border-t-2 border-primary-neon font-medium transition-all duration-300 ${
        isDarkMode
          ? "bg-linear-to-r from-[rgba(217,70,239,0.1)] via-transparent to-[rgba(6,182,212,0.1)] text-text-muted drop-shadow-[0_0_10px_rgba(217,70,239,0.2)]"
          : "bg-linear-to-r from-[rgba(217,70,239,0.05)] via-transparent to-[rgba(6,182,212,0.05)] text-text-light-muted drop-shadow-[0_0_5px_rgba(217,70,239,0.1)]"
      }`}
    >
      Buit with{" "}
      <FontAwesomeIcon
        icon={faHeart}
        aria-hidden="true"
        className="text-red mx-2 animate-pulse drop-shadow-[0_0_8px_rgba(236,72,153,0.6)]"
        style={{ animation: "pulse 1.5s infinite" }}
      />{" "}
      by{" "}
      <a
        href="https://sagar-me.vercel.app/"
        target="_blank"
        rel="noreferrer"
        className="bg-clip-text bg-linear-to-r from-primary-neon to-secondary-neon font-bold px-2 no-underline transition-all duration-300 relative drop-shadow-[0_0_15px_rgba(217,70,239,0.5)] hover:drop-shadow-[0_0_20px_rgba(217,70,239,0.8),0_0_10px_rgba(6,182,212,0.6)] text-transparent"
      >
        Sagar Singh
      </a>
    </footer>
  );
};

export default Footer;
