import { Link } from "react-router-dom";
import PageTitle from "./PageTitle";

const Login = () => {
  const labelStyle =
    "block text-lg font-semibold text-primary-neon dark:text-light mb-2";
  const textFieldStyle =
    "w-full px-4 py-2 text-base border rounded-md transition border-primary-neon dark:border-light focus:ring focus:ring-primary-neon dark:focus:ring-secondary-neon focus:outline-none text-text-dark dark:text-text-muted bg-white dark:bg-card-bg placeholder-text-light-muted dark:placeholder-text-muted";
  return (
    <div className="flex items-center justify-center font-primary py-12">
      <div className="bg-white dark:bg-card-bg shadow-lg rounded-lg max-w-md w-full px-8 py-6 drop-shadow-[0_0_15px_rgba(217,70,239,0.2)]">
        {/* Title */}
        <PageTitle title="Login" />
        {/* Form */}
        <form className="space-y-6">
          {/* Email Field */}
          <div>
            <label htmlFor="username" className={labelStyle}>
              Username
            </label>
            <input
              id="username"
              type="text"
              name="username"
              placeholder="Your Username"
              required
              className={textFieldStyle}
            />
          </div>

          {/* Password Field */}
          <div>
            <label htmlFor="password" className={labelStyle}>
              Password
            </label>
            <input
              id="password"
              type="password"
              name="password"
              placeholder="Your Password"
              required
              minLength={8}
              maxLength={20}
              className={textFieldStyle}
            />
          </div>

          {/* Submit Button */}
          <div>
            <button
              type="submit"
              className="w-full px-6 py-2 text-white dark:text-bg-dark text-xl rounded-md transition duration-200 font-semibold bg-primary-neon hover:brightness-110 dark:hover:brightness-90 drop-shadow-[0_0_15px_rgba(217,70,239,0.4)]"
            >
              Login
            </button>
          </div>
        </form>

        {/* Register Link */}
        <p className="text-center text-text-light-muted dark:text-text-muted mt-4">
          Don't have an account?{" "}
          <Link
            to="/register"
            className="text-primary-neon dark:text-secondary-neon hover:brightness-110 dark:hover:brightness-90 transition duration-200 font-semibold drop-shadow-[0_0_8px_rgba(217,70,239,0.3)]"
          >
            Register Here
          </Link>
        </p>
      </div>
    </div>
  );
};

export default Login;
