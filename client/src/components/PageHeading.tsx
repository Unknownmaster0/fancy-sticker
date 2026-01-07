import PageTitle from "./PageTitle";
import { type ReactNode } from "react";
import { useTheme } from "../context/ThemeContext";

const PageHeading = ({ children }: { children: ReactNode }) => {
  const { isDarkMode } = useTheme();

  return (
    <div className="text-center max-w-3xl mx-auto pb-8">
      <PageTitle title={"Explore Fancy Sticker!!!!"} />
      <p
        className={`text-base leading-relaxed transition-colors duration-300 ${
          isDarkMode ? "text-text-muted" : "text-text-light-muted"
        }`}
      >
        {children}
      </p>
    </div>
  );
};

export default PageHeading;
