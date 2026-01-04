import { faHeart } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import "./footer.css";

const Footer = () => {
  return (
    <footer className="footer">
      Buit with{" "}
      <FontAwesomeIcon
        icon={faHeart}
        aria-hidden="true"
        className="footer-icon"
      />{" "}
      by{" "}
      <a href="https://sagar-me.vercel.app/" target="_blank" rel="noreferrer">
        Sagar Singh
      </a>
    </footer>
  );
};

export default Footer;
