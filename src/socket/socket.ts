import io from "socket.io-client";
const baseUrl =
  import.meta.env.VITE_API_BASE_URL?.replace("/api", "") ||
  "http://localhost:3000";
export const socket = io(baseUrl, {
  withCredentials: true,
  transports: ["websocket", "polling"],
  reconnection: true,
  reconnectionDelay: 1000,
  reconnectionAttempts: 5,
});
