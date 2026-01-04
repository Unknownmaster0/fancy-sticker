import PageTitle from "./PageTitle";
import { type ReactNode } from "react";

const PageHeading = ({ children }: { children: ReactNode }) => {
  return (
    <div className="page-heading-container">
      <PageTitle title={"Explore Fancy Sticker!!!!"} />
      <p className="page-heading-paragraph">{children}</p>
    </div>
  );
};

export default PageHeading;
