export interface Message {
  messageId: string;
  name: string;
  mobileNumber: string;
  email: string;
  message: string;
  createdAt: string;
  status: "OPEN" | "CLOSED";
}
