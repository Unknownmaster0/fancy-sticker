import { isRouteErrorResponse, Link, useRouteError } from "react-router-dom";
import PageTitle from "./PageTitle";
import errorImage from "../assets/util/error.png";

const ErrorPage = () => {
  let errorTitle = "Oops! Page Not Found";
  let errorMessage =
    "The page you are looking for might have been removed, had its name changed, or is temporarily unavailable.";

  const routeError = useRouteError();

  if (routeError) {
    console.error(routeError);
    if (isRouteErrorResponse(routeError)) {
      errorTitle = `${routeError.status} ${routeError.statusText}`;
      errorMessage = routeError.data?.message || errorMessage;
    } else if (routeError instanceof Error) {
      errorTitle = routeError.name || "An Unexpected Error Occurred";
      errorMessage = routeError.message;
    }
  }

  return (
    <div className="py-12 font-primary">
      <div className="max-w-4xl mx-auto px-4">
        <PageTitle title={errorTitle} />
      </div>
      <div className="text-center text-text-light-muted dark:text-text-muted flex flex-col items-center">
        <p className="max-w-xl px-2 mx-auto leading-6 mb-4">{errorMessage}</p>
        <img
          src={errorImage}
          alt="Error"
          className="w-full max-w-xl mx-auto mb-6"
        />
        <Link
          to="/home"
          className="py-3 px-6 text-white dark:text-bg-dark text-xl rounded-md transition duration-200 font-semibold bg-primary-neon hover:brightness-110 dark:hover:brightness-90 drop-shadow-[0_0_15px_rgba(217,70,239,0.4)]"
        >
          Back to Home
        </Link>
      </div>
    </div>
  );
};

export default ErrorPage;
