import io from "socket.io-client";

const baseUrl =
  import.meta.env.VITE_API_BASE_URL?.replace("/api", "") ||
  "http://localhost:3000";

// Створюємо socket БЕЗ автопідключення
export const socket = io(baseUrl, {
  autoConnect: false, // ❗ Важливо!
  withCredentials: true,
  transports: ["websocket", "polling"],
  reconnection: true,
  reconnectionDelay: 1000,
  reconnectionAttempts: 5,
});

// Функція для підключення socket
export const connectSocket = () => {
  const userId = localStorage.getItem("googleId");

  if (!userId) {
    console.warn("⚠️ No googleId found, socket not connected");
    return;
  }

  // Встановлюємо auth перед підключенням
  socket.auth = { userId };

  // Підключаємось
  if (!socket.connected) {
    socket.connect();
    console.log("🔌 Socket connecting with userId:", userId);
  }
};

// Функція для відключення
export const disconnectSocket = () => {
  if (socket.connected) {
    socket.disconnect();
    console.log("🔌 Socket disconnected");
  }
};
