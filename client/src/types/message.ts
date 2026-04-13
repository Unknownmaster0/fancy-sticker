export interface Message {
  messageId: number;
  name: string;
  mobileNumber: string;
  email: string;
  message: string;
  createdAt: string;
  status: "OPEN" | "CLOSED";
}
