import { Form, useActionData, useLoaderData, useNavigate, useNavigation, type ActionFunction } from "react-router-dom";
import PageTitle from "./PageTitle";
import { useEffect, useState } from "react";
import { useTheme } from "../context/ThemeContext";
import apiClient from "../api/apiClient";
import type ProfileType from "../types/profile";
import { useAuth } from "../store/auth-context";
import { toast } from "react-toastify";

const Profile = () => {
  const initialProfileData : ProfileType = useLoaderData();
  const actionData = useActionData();
  const [profileData, setProfileData] = useState<ProfileType>(initialProfileData);
  const navigation = useNavigation();
  const isSubmitting = navigation.state === "submitting";
  const navigate = useNavigate();
  const {logOut} = useAuth();
  const { isDarkMode } = useTheme();

  useEffect(() => {
    if (actionData?.success) {
      if (actionData.profileData.emailUpdated) {
        // If email is updated, then user must logged in with new credentials.
        sessionStorage.setItem("skipRedirectPath", "true");
        logOut();
        toast.success("Profile updated successfully. Please login again with new credentials.");
        navigate("/login");
      } else {
        setProfileData(actionData.profileData);
        toast.success("Profile updated successfully.");
      }
    }
  }, [actionData]);

  const labelStyle = `block text-lg font-semibold mb-2 ${
    isDarkMode ? "text-text-main" : "text-text-dark"
  }`;

  const h2Style = `block text-2xl font-semibold mb-2 ${
    isDarkMode ? "text-text-main" : "text-text-dark"
  }`;

  const textFieldStyle = `w-full px-4 py-2 text-base rounded-md transition focus:outline-none border ${
    isDarkMode
      ? "bg-card-bg text-text-main border-border-color placeholder:text-text-muted"
      : "bg-card-light text-text-dark border-border-color placeholder:text-text-light-muted"
  }`;

  return (
  <div className="max-w-6xl min-h-213 mx-auto px-6 py-8 font-primary bg-normalbg dark:bg-darkbg">
      <PageTitle title="My Profile" />

      <Form method="PUT" className="space-y-6 max-w-3xl mx-auto">
        <div>
          <h2 className={h2Style}>Personal Details</h2>
          <label htmlFor="name" className={labelStyle}>
            Name
          </label>
          <input
            id="name"
            name="name"
            type="text"
            placeholder="Your Name"
            className={textFieldStyle}
            value={profileData?.name}
            onChange={(e) =>
              setProfileData((prev) => ({ ...prev, name: e.target.value }))
            }
            required
            minLength={5}
            maxLength={30}
          />
          {actionData?.errors?.name && (
            <p className="text-red-500 text-sm mt-1">
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
              name="email"
              type="email"
              placeholder="Your Email"
              value={profileData?.email}
              onChange={(e) =>
                setProfileData((prev) => ({ ...prev, email: e.target.value }))
              }
              className={textFieldStyle}
              required
            />
            {actionData?.errors?.email && (
              <p className="text-red-500 text-sm mt-1">
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
              name="mobileNumber"
              type="tel"
              required
              pattern="^\d{10}$"
              title="Mobile number must be exactly 10 digits"
              value={profileData?.mobileNumber}
              onChange={(e) =>
                setProfileData((prev) => ({
                  ...prev,
                  mobileNumber: e.target.value,
                }))
              }
              placeholder="Your Mobile Number"
              className={textFieldStyle}
            />
            {actionData?.errors?.mobileNumber && (
              <p className="text-red-500 text-sm mt-1">
                {actionData.errors.mobileNumber}
              </p>
            )}
          </div>
        </div>

        <div>
          <h2 className={h2Style}>Address Details</h2>
          <label htmlFor="street" className={labelStyle}>
            Street
          </label>
          <input
            id="street"
            name="street"
            type="text"
            placeholder="Street details"
            value={profileData?.street || ""}
            onChange={(e) =>
              setProfileData((prev) => ({
                ...prev,
                street: e.target.value,
              }))
            }
            className={textFieldStyle}
            required
            minLength={5}
            maxLength={30}
          />
          {actionData?.errors?.street && (
            <p className="text-red-500 text-sm mt-1">
              {actionData.errors.street}
            </p>
          )}
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
          <div>
            <label htmlFor="city" className={labelStyle}>
              City
            </label>
            <input
              id="city"
              name="city"
              type="text"
              placeholder="Your City"
              value={profileData?.city || ""}
              onChange={(e) =>
                setProfileData((prev) => ({
                  ...prev,
                  city: e.target.value,
                }))
              }
              className={textFieldStyle}
              required
              minLength={3}
              maxLength={30}
            />
            {actionData?.errors?.city && (
              <p className="text-red-500 text-sm mt-1">
                {actionData.errors.city}
              </p>
            )}
          </div>

          <div>
            <label htmlFor="state" className={labelStyle}>
              State
            </label>
            <input
              id="state"
              name="state"
              type="text"
              required
              minLength={2}
              maxLength={30}
              placeholder="Your State"
              value={profileData?.state || ""}
              onChange={(e) =>
                setProfileData((prev) => ({
                  ...prev,
                  state: e.target.value,
                }))
              }
              className={textFieldStyle}
            />
            {actionData?.errors?.state && (
              <p className="text-red-500 text-sm mt-1">
                {actionData.errors.state}
              </p>
            )}
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
          <div>
            <label htmlFor="postalCode" className={labelStyle}>
              Postal Code
            </label>
            <input
              id="postalCode"
              name="postalCode"
              type="text"
              placeholder="Your Postal Code"
              value={profileData?.postalCode || ""}
              onChange={(e) =>
                setProfileData((prev) => ({
                  ...prev,
                  postalCode: e.target.value,
                }))
              }
              className={textFieldStyle}
              required
              pattern="^\d{6}$"
              title="Postal code must be exactly 6 digits"
            />
            {actionData?.errors?.postalCode && (
              <p className="text-red-500 text-sm mt-1">
                {actionData.errors.postalCode}
              </p>
            )}
          </div>

          <div>
            <label htmlFor="country" className={labelStyle}>
              Country
            </label>
            <input
              id="country"
              name="country"
              type="text"
              required
              minLength={3}
              maxLength={30}
              placeholder="Your Country"
              value={profileData?.country || ""}
              onChange={(e) =>
                setProfileData((prev) => ({
                  ...prev,
                  country: e.target.value,
                }))
              }
              className={textFieldStyle}
            />
            {actionData?.errors?.country && (
              <p className="text-red-500 text-sm mt-1">
                {actionData.errors.country}
              </p>
            )}
          </div>
        </div>

        <div className="text-center">
          <button
            type="submit"
            disabled={isSubmitting}
            className={`px-6 py-2 mt-8 text-xl rounded-md transition duration-200 ${
              isDarkMode
                ? "bg-primary-neon text-text-main hover:opacity-90"
                : "bg-primary-neon text-white hover:opacity-90"
            }`}
          >
            {isSubmitting ? "Saving..." : "Save"}
          </button>
        </div>
      </Form>
    </div>
  );
}

export async function profileLoader() {
  try {
    const response = await apiClient.get("/profile");
    console.log(response)
    return response.data;
  } catch (error : any) {
    throw new Response(
      error.response?.data?.errorMessage ||
        error.message ||
        "Failed to fetch profile details. Please try again.",
      { status: error.status || 500 }
    );
  }
}

export const profileAction : ActionFunction = async ({ request }) => {
  const data = await request.formData();

  const profileData = {
    name: data.get("name"),
    email: data.get("email"),
    mobileNumber: data.get("mobileNumber"),
    street: data.get("street"),
    city: data.get("city"),
    state: data.get("state"),
    postalCode: data.get("postalCode"),
    country: data.get("country"),
  };
  try {
    const response = await apiClient.put("/profile", profileData);
    return { success: true, profileData: response.data };
  } catch (error : any) {
    if (error.response?.status === 400) {
      return { success: false, errors: error.response?.data };
    }
    throw new Response(
      error.response?.data?.errorMessage ||
        error.message ||
        "Failed to save profile details. Please try again.",
      { status: error.status || 500 }
    );
  }
}

export default Profile
