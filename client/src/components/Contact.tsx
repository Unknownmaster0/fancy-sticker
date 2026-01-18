import { useEffect, useRef } from "react";
import {
  Form,
  useActionData,
  useNavigate,
  useNavigation,
  type ActionFunction,
} from "react-router-dom";
import PageTitle from "./PageTitle";
import apiClient from "../api/apiClient";
import { isAxiosError } from "axios";

const Contact = () => {
  const formRef = useRef<HTMLFormElement>(null);
  const navigation = useNavigation();
  const isSubmitting = navigation.state === "submitting";
  const actionData = useActionData();
  const navigate = useNavigate();

  useEffect(() => {
    if (actionData?.success) {
      formRef.current?.reset();
      navigate("/home");
    }
  }, [actionData]);

  const labelStyle =
    "block text-lg font-semibold text-primary-neon dark:text-light mb-2";
  const textFieldStyle =
    "w-full px-4 py-2 text-base border rounded-md transition border-primary-neon dark:border-light focus:ring focus:ring-primary-neon dark:focus:ring-secondary-neon focus:outline-none text-text-dark dark:text-text-muted bg-white dark:bg-card-bg placeholder-text-light-muted dark:placeholder-text-muted";

  return (
    <div className="max-w-6xl mx-auto px-6 py-8 font-primary">
      {/* Page Title */}
      <PageTitle title="Contact Us" />
      {/* Contact Info */}
      <p className="max-w-3xl mx-auto mt-8 text-text-light-muted dark:text-text-muted mb-8 text-center">
        We’d love to hear from you! If you have any questions, feedback, or
        suggestions, please don’t hesitate to reach out.
      </p>

      {/* Contact Form */}
      <Form method="POST" ref={formRef} className="space-y-6 max-w-3xl mx-auto">
        {/* Name Field */}
        <div>
          <label htmlFor="name" className={labelStyle}>
            Name
          </label>
          <input
            id="name"
            name="name"
            type="text"
            placeholder="Your Name"
            className={textFieldStyle}
            required
            minLength={5}
            maxLength={30}
          />
        </div>

        {/* Email and mobile Row */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
          {/* Email Field */}
          <div>
            <label htmlFor="email" className={labelStyle}>
              Email
            </label>
            <input
              id="email"
              name="email"
              type="email"
              placeholder="Your Email"
              className={textFieldStyle}
              required
            />
          </div>

          {/* Mobile Field */}
          <div>
            <label htmlFor="mobileNumber" className={labelStyle}>
              Mobile Number
            </label>
            <input
              id="mobileNumber"
              name="mobileNumber"
              type="tel"
              required
              pattern="^\d{10}$"
              title="Mobile number must be exactly 10 digits"
              placeholder="Your Mobile Number"
              className={textFieldStyle}
            />
          </div>
        </div>

        {/* Message Field */}
        <div>
          <label htmlFor="message" className={labelStyle}>
            Message
          </label>
          <textarea
            id="message"
            name="message"
            rows={4}
            placeholder="Your Message"
            className={textFieldStyle}
            required
            minLength={5}
            maxLength={500}
          ></textarea>
        </div>

        {/* Submit Button */}
        <div className="text-center">
          <button
            type="submit"
            disabled={isSubmitting}
            className="px-6 py-2 text-white dark:text-bg-dark text-xl rounded-md transition duration-200 font-semibold bg-primary-neon hover:brightness-110 dark:hover:brightness-90 drop-shadow-[0_0_15px_rgba(217,70,239,0.4)] disabled:opacity-60 disabled:cursor-not-allowed"
          >
            {isSubmitting ? "Submitting..." : "Submit"}
          </button>
        </div>
      </Form>
    </div>
  );
};

export default Contact;

export const contactFormAction: ActionFunction = async ({ request }) => {
  const formData = await request.formData();

  // process the data here (e.g., send an email, store in database, etc.)
  const name = formData.get("name");
  const email = formData.get("email");
  const mobileNumber = formData.get("mobileNumber");
  const message = formData.get("message");

  try {
    await apiClient.post("/contacts", {
      name,
      email,
      mobileNumber,
      message,
    });
    return { success: true };
  } catch (error) {
    let errorTitle = "OOPs some error occured!!!";
    let errorMessage = "Something went wrong, Please try again...";
    let status: number | undefined = 500;
    if (isAxiosError(error)) {
      errorTitle = error.name;
      errorMessage = error.message;
      status = error.status;
    } else if (error instanceof Error) {
      console.error("Error submitting contact form:", error.message);
      errorTitle = error.name;
      errorMessage = error.message;
    }

    throw new Response(errorMessage, { status });
  }
};
