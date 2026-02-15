import {
  Form,
  Link,
  useActionData,
  useNavigate,
  useNavigation,
  useSubmit,
  type ActionFunction,
} from "react-router-dom";
import PageTitle from "./PageTitle";
import { useEffect, useRef } from "react";
import apiClient from "../api/apiClient";
import { toast } from "react-toastify";

const Register = () => {
  const formRef = useRef<HTMLFormElement>(null);
  const actionData = useActionData();
  const navigate = useNavigate();
  const navigation = useNavigation();
  const isSubmitting = navigation.state === "submitting";

  const submit = useSubmit();

  useEffect(() => {
    if (actionData?.success) {
      toast.success("Registration completed successfully. Try login..");
      navigate("/login");
    }
  }, [actionData]);

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (!formRef.current) {
      return;
    }
    const formData = new FormData(formRef.current);
    if (!validatePasswords(formData)) {
      return;
    }
    submit(formData, { method: "post" });
  };

  /**
   * Validate Passwords Match
   */
  const validatePasswords = (formData: FormData) => {
    const password = formData.get("password");
    const confirmPwd = formData.get("confirmPwd");

    if (password !== confirmPwd) {
      toast.error("Passwords do not match!");
      return false;
    }
    return true;
  };

  const labelStyle =
    "block text-lg font-semibold text-primary-neon dark:text-light mb-2";
  const textFieldStyle =
    "w-full px-4 py-2 text-base border rounded-md transition border-primary-neon dark:border-light focus:ring focus:ring-primary-neon dark:focus:ring-secondary-neon focus:outline-none text-text-dark dark:text-text-muted bg-white dark:bg-card-bg placeholder-text-light-muted dark:placeholder-text-muted";

  return (
    <div className="flex items-center justify-center font-primary py-12">
      <div className="bg-white dark:bg-card-bg shadow-lg rounded-lg max-w-md w-full px-8 py-6 drop-shadow-[0_0_15px_rgba(217,70,239,0.2)]">
        <PageTitle title="Register" />

        <Form
          method="POST"
          ref={formRef}
          onSubmit={handleSubmit}
          className="space-y-6"
        >
          <div>
            <label htmlFor="name" className={labelStyle}>
              Name
            </label>
            <input
              id="name"
              type="text"
              name="name"
              placeholder="Your Name"
              required
              minLength={5}
              maxLength={30}
              className={textFieldStyle}
            />
            {actionData?.errors?.name && (
              <p className="text-accent-bright dark:text-accent-bright text-sm mt-1">
                {actionData.errors.name}
              </p>
            )}
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            <div>
              <label htmlFor="email" className={labelStyle}>
                Email
              </label>
              <input
                id="email"
                type="email"
                name="email"
                placeholder="Your Email"
                autoComplete="email"
                required
                className={textFieldStyle}
              />
              {actionData?.errors?.email && (
                <p className="text-accent-bright dark:text-accent-bright text-sm mt-1">
                  {actionData.errors.email}
                </p>
              )}
            </div>
            <div>
              <label htmlFor="mobileNumber" className={labelStyle}>
                Mobile Number
              </label>
              <input
                id="mobileNumber"
                type="tel"
                name="mobileNumber"
                placeholder="Your Mobile Number"
                required
                pattern="^\d{10}$"
                title="Mobile number must be exactly 10 digits"
                className={textFieldStyle}
              />
              {actionData?.errors?.mobileNumber && (
                <p className="text-accent-bright dark:text-accent-bright text-sm mt-1">
                  {actionData.errors.mobileNumber}
                </p>
              )}
            </div>
          </div>

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
              autoComplete="new-password"
              minLength={8}
              maxLength={20}
              className={textFieldStyle}
            />
            {actionData?.errors?.password && (
              <p className="text-accent-bright dark:text-accent-bright text-sm mt-1">
                {actionData.errors.password}
              </p>
            )}
          </div>

          <div>
            <label htmlFor="confirmPwd" className={labelStyle}>
              Confirm Password
            </label>
            <input
              id="confirmPwd"
              type="password"
              name="confirmPwd"
              placeholder="Confirm Your Password"
              required
              autoComplete="confirm-password"
              minLength={8}
              maxLength={20}
              className={textFieldStyle}
            />
          </div>

          {/* Submit */}
          <button
            type="submit"
            disabled={isSubmitting}
            className="w-full px-6 py-2 text-white dark:text-bg-dark text-xl rounded-md transition duration-200 font-semibold bg-primary-neon hover:brightness-110 dark:hover:brightness-90 drop-shadow-[0_0_15px_rgba(217,70,239,0.4)]"
          >
            {isSubmitting ? "Registering..." : "Register"}
          </button>
        </Form>

        {/* Login Link */}
        <p className="text-center text-text-light-muted dark:text-text-muted mt-4">
          Already have an account?{" "}
          <Link
            to="/login"
            className="text-primary-neon dark:text-secondary-neon hover:brightness-110 dark:hover:brightness-90 transition duration-200 font-semibold drop-shadow-[0_0_8px_rgba(217,70,239,0.3)]"
          >
            Login Here
          </Link>
        </p>
      </div>
    </div>
  );
};

export default Register;

export const registerAction: ActionFunction = async ({ request }) => {
  const formData = await request.formData();

  const registerData = {
    name: formData.get("name"),
    email: formData.get("email"),
    mobileNumber: formData.get("mobileNumber"),
    password: formData.get("password"),
  };

  try {
    const response = await apiClient.post("/auth/register", registerData);
    if (response.status === 201) {
      return { success: true };
    }
  } catch (error: any) {
    if (error.response && error.response?.status === 400) {
      return { success: false, errors: error.response?.data };
    }
    throw new Response(
      error.response?.data?.errorMessage ||
        error.message ||
        "Something went wrong",
      { status: error.response?.status || 500 },
    );
  }
};
