import { useState, useEffect, useRef } from "react";
import {
  Form,
  useActionData,
  useLoaderData,
  useNavigation,
  type ActionFunction,
} from "react-router-dom";
import apiClient from "../../api/apiClient";
import type { Message } from "../../types/message";
import { useTheme } from "../../context/ThemeContext";
import PageTitle from "../PageTitle";
import { toast } from "react-toastify";

const AdminMessages = () => {
  const messages: Message[] = useLoaderData();
  const { isDarkMode } = useTheme();
  const navigation = useNavigation();
  const actionData = useActionData();
  const isSubmitting = navigation.state === "submitting";
  const [expandedMessageId, setExpandedMessageId] = useState<number | null>(
    null,
  );
  const previousActionDataRef = useRef<any>(null);

  useEffect(() => {
    // Only process if actionData has changed from what we last processed
    if (actionData && actionData !== previousActionDataRef.current) {
      previousActionDataRef.current = actionData;
      
      if (actionData.success) {
        toast.success(actionData.message || "Action completed successfully");
        setExpandedMessageId(null);
      } else {
        toast.error(actionData.error || "Failed to process action, retry...");
      }
    }
  }, [actionData]);

  const toggleExpandMessage = (messageId: number) => {
    setExpandedMessageId(expandedMessageId === messageId ? null : messageId);
  };

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    });
  };

  if (!messages || messages.length === 0) {
    return (
      <div
        className={`min-h-screen pt-10 ${
          isDarkMode
            ? "bg-bg-dark text-text-main"
            : "bg-bg-light text-text-dark"
        }`}
      >
        <PageTitle title="Messages" />
        <div
          className={`max-w-6xl mx-auto px-4 py-16 text-center ${
            isDarkMode ? "bg-bg-dark" : "bg-bg-light"
          }`}
        >
          <p
            className={`text-lg ${
              isDarkMode ? "text-text-muted" : "text-text-light-muted"
            }`}
          >
            No open messages at the moment.
          </p>
        </div>
      </div>
    );
  }

  return (
    <div
      className={`min-h-screen pt-10 ${
        isDarkMode ? "bg-bg-dark text-text-main" : "bg-bg-light text-text-dark"
      }`}
    >
      <PageTitle title="Customer Messages" />

      <div className="max-w-7xl mx-auto px-4 py-8">
        {/* Desktop Grid View */}
        <div className="hidden lg:grid lg:grid-cols-1 gap-6">
          {/* Header Row */}
          <div
            className={`rounded-xl p-6 font-bold grid grid-cols-6 gap-4 items-center ${
              isDarkMode
                ? "bg-card-bg border-2 border-primary-neon border-opacity-40"
                : "bg-card-light border-2 border-primary-neon border-opacity-50"
            }`}
          >
            <div className="text-primary-neon">Name</div>
            <div className="text-secondary-neon">Mobile</div>
            <div className="text-accent-bright">Email</div>
            <div className="text-accent-lime col-span-2">Message</div>
            <div className="text-accent-orange text-center">Action</div>
          </div>

          {/* Message Rows */}
          {messages.map((message) => (
            <div
              key={message.messageId}
              className={`rounded-xl p-6 grid grid-cols-6 gap-4 items-center border-2 transition-all duration-300 ${
                isDarkMode
                  ? "bg-card-bg border-primary-neon border-opacity-30 hover:border-opacity-60 hover:shadow-lg hover:shadow-primary-neon/30"
                  : "bg-card-light border-primary-neon border-opacity-40 hover:border-opacity-80 hover:shadow-lg hover:shadow-primary-neon/20"
              }`}
            >
              {/* Name */}
              <div className="truncate">
                <p className="font-semibold text-primary-neon">
                  {message.name}
                </p>
              </div>

              {/* Mobile Number */}
              <div className="truncate">
                <p
                  className={`${
                    isDarkMode ? "text-text-muted" : "text-text-light-muted"
                  }`}
                >
                  {message.mobileNumber}
                </p>
              </div>

              {/* Email */}
              <div className="truncate">
                <p
                  className={`text-sm ${
                    isDarkMode ? "text-text-muted" : "text-text-light-muted"
                  }`}
                >
                  {message.email}
                </p>
              </div>

              {/* Message Preview (truncated) */}
              <div className="col-span-2 truncate">
                <p className="text-sm">{message.message}</p>
              </div>

              {/* Action Button */}
              <div className="flex justify-center">
                <button
                  type="button"
                  onClick={() => toggleExpandMessage(message.messageId)}
                  className={`px-3 py-2 rounded-lg font-semibold text-sm transition-all duration-300 ${
                    isDarkMode
                      ? "bg-primary-neon/20 text-primary-neon hover:bg-primary-neon/40"
                      : "bg-primary-neon/10 text-primary-neon hover:bg-primary-neon/20"
                  }`}
                >
                  {expandedMessageId === message.messageId ? "Hide" : "View"}
                </button>
              </div>
            </div>
          ))}
        </div>

        {/* Mobile Card View */}
        <div className="lg:hidden space-y-4">
          {messages.map((message) => (
            <div
              key={message.messageId}
              className={`rounded-xl border-2 transition-all duration-300 overflow-hidden ${
                isDarkMode
                  ? "bg-card-bg border-primary-neon border-opacity-30 hover:border-opacity-60 hover:shadow-lg hover:shadow-primary-neon/30"
                  : "bg-card-light border-primary-neon border-opacity-40 hover:border-opacity-80 hover:shadow-lg hover:shadow-primary-neon/20"
              }`}
            >
              {/* Card Header */}
              <div
                onClick={() => toggleExpandMessage(message.messageId)}
                className="p-4 cursor-pointer"
              >
                <div className="flex justify-between items-start gap-2">
                  <div className="flex-1">
                    <p className="font-bold text-primary-neon text-lg">
                      {message.name}
                    </p>
                    <p
                      className={`text-sm ${
                        isDarkMode ? "text-text-muted" : "text-text-light-muted"
                      }`}
                    >
                      {message.mobileNumber}
                    </p>
                  </div>
                  <svg
                    className={`w-5 h-5 text-primary-neon shrink-0 transition-transform duration-300 ${
                      expandedMessageId === message.messageId
                        ? "rotate-180"
                        : ""
                    }`}
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M19 14l-7 7m0 0l-7-7m7 7V3"
                    />
                  </svg>
                </div>
              </div>

              {/* Card Content - Expandable */}
              {expandedMessageId === message.messageId && (
                <div
                  className={`border-t-2 p-4 ${
                    isDarkMode
                      ? "border-primary-neon border-opacity-20 bg-card-bg"
                      : "border-primary-neon border-opacity-30"
                  }`}
                >
                  <div className="space-y-3">
                    <div>
                      <p
                        className={`text-xs font-semibold uppercase ${
                          isDarkMode
                            ? "text-text-muted"
                            : "text-text-light-muted"
                        }`}
                      >
                        Email
                      </p>
                      <p className="text-secondary-neon text-sm">
                        {message.email}
                      </p>
                    </div>

                    <div>
                      <p
                        className={`text-xs font-semibold uppercase ${
                          isDarkMode
                            ? "text-text-muted"
                            : "text-text-light-muted"
                        }`}
                      >
                        Message
                      </p>
                      <p className="text-sm mt-1">{message.message}</p>
                    </div>

                    <div>
                      <p
                        className={`text-xs font-semibold uppercase ${
                          isDarkMode
                            ? "text-text-muted"
                            : "text-text-light-muted"
                        }`}
                      >
                        Received
                      </p>
                      <p className="text-xs text-accent-lime">
                        {formatDate(message.createdAt)}
                      </p>
                    </div>

                    <Form method="PATCH" className="w-full">
                      <input type="hidden" name="action" value="close" />
                      <input
                        type="hidden"
                        name="messageId"
                        value={message.messageId}
                      />
                      <button
                        type="submit"
                        disabled={isSubmitting}
                        className={`w-full px-4 py-2 rounded-lg font-semibold transition-all duration-300 mt-4 ${
                          isSubmitting
                            ? "opacity-50 cursor-not-allowed"
                            : "hover:shadow-lg hover:shadow-accent-orange/50"
                        } bg-accent-orange text-white hover:bg-opacity-90 disabled:hover:bg-accent-orange`}
                      >
                        {isSubmitting ? "Closing..." : "Close Message"}
                      </button>
                    </Form>
                  </div>
                </div>
              )}
            </div>
          ))}
        </div>

        {/* Message Details Modal (for expanded long messages on desktop) */}
        {expandedMessageId && (
          <div className="hidden lg:flex fixed inset-0 z-50 bg-black/50 items-center justify-center p-4">
            <div
              className={`rounded-xl max-w-2xl w-full max-h-[90vh] overflow-y-auto border-2 border-primary-neon ${
                isDarkMode
                  ? "bg-card-bg border-opacity-40"
                  : "bg-card-light border-opacity-50"
              }`}
            >
              <div className="p-6">
                <div className="flex justify-between items-start mb-6">
                  <div>
                    <p className="text-2xl font-bold text-primary-neon">
                      {
                        messages.find((m) => m.messageId === expandedMessageId)
                          ?.name
                      }
                    </p>
                    <p
                      className={`text-sm mt-1 ${
                        isDarkMode ? "text-text-muted" : "text-text-light-muted"
                      }`}
                    >
                      {
                        messages.find((m) => m.messageId === expandedMessageId)
                          ?.mobileNumber
                      }
                    </p>
                  </div>
                  <button
                    onClick={() => setExpandedMessageId(null)}
                    className="text-2xl text-primary-neon hover:text-accent-bright transition-colors"
                  >
                    ✕
                  </button>
                </div>

                <div className="space-y-4">
                  <div>
                    <p className="text-sm font-semibold text-secondary-neon uppercase mb-2">
                      Email
                    </p>
                    <p className="text-sm">
                      {
                        messages.find((m) => m.messageId === expandedMessageId)
                          ?.email
                      }
                    </p>
                  </div>

                  <div>
                    <p className="text-sm font-semibold text-accent-bright uppercase mb-2">
                      Message
                    </p>
                    <p className="text-sm whitespace-pre-wrap">
                      {
                        messages.find((m) => m.messageId === expandedMessageId)
                          ?.message
                      }
                    </p>
                  </div>

                  <div>
                    <p
                      className={`text-xs font-semibold uppercase ${
                        isDarkMode ? "text-text-muted" : "text-text-light-muted"
                      } mb-1`}
                    >
                      Received
                    </p>
                    <p className="text-xs text-accent-lime">
                      {formatDate(
                        messages.find((m) => m.messageId === expandedMessageId)
                          ?.createdAt || "",
                      )}
                    </p>
                  </div>
                </div>

                <div className="mt-6">
                  <Form method="PATCH" className="w-full">
                    <input type="hidden" name="action" value="close" />
                    <input
                      type="hidden"
                      name="messageId"
                      value={expandedMessageId || ""}
                    />
                    <button
                      type="submit"
                      disabled={isSubmitting}
                      className={`w-full px-6 py-3 rounded-lg font-semibold transition-all duration-300 ${
                        isSubmitting
                          ? "opacity-50 cursor-not-allowed"
                          : "hover:shadow-lg hover:shadow-accent-orange/50"
                      } bg-accent-orange text-white hover:bg-opacity-90 disabled:hover:bg-accent-orange`}
                    >
                      {isSubmitting ? "Closing..." : "Close Message"}
                    </button>
                  </Form>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export async function AdminMessagesLoader() {
  try {
    const response = (await apiClient("/admin/messages")).data;
    console.log("Open Messages:", response);
    // Transform API response to match Message type
    const transformedMessages =
      response.contacts?.map((contact: any) => ({
        messageId: contact.id,
        name: contact.name,
        email: contact.email,
        mobileNumber: contact.mobileNumber,
        message: contact.message,
        createdAt: contact.createdAt,
        status: contact.status,
      })) || [];
    return transformedMessages;
  } catch (error: any) {
    throw new Response(
      error.response?.data?.message || "Failed to load messages",
      { status: error.status || 500 },
    );
  }
}

export const AdminMessagesAction: ActionFunction = async ({ request }) => {
  if (request.method !== "PATCH") {
    throw new Response("Method not allowed", { status: 405 });
  }

  const formData = await request.formData();
  const action = formData.get("action");
  const messageId = formData.get("messageId");

  if (!action || !messageId) {
    throw new Response("Missing action or messageId", { status: 400 });
  }

  try {
    if (action === "close") {
      await apiClient.patch(`/admin/messages/${messageId}/close`);
      return { success: true, message: "Message closed successfully" };
    } else {
      throw new Response("Invalid action", { status: 400 });
    }
  } catch (error: any) {
    if (error.response?.status === 400) {
      return { success: false, error: error.response?.data?.message };
    }
    throw new Response(
      error.response?.data?.message || "Failed to process message action",
      { status: error.response?.status || 500 },
    );
  }
};

export default AdminMessages;
