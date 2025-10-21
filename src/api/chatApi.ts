// src/api/chatApi.ts
const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

export const chatApi = {
  // Отримати чат за name_profile контакту
  async getChatWithUser(profileName: string) {
    try {
      let googleId = localStorage.getItem("googleId");
      const res = await fetch(
        `${API_BASE_URL}/chat?profileName=${profileName}&googleId=${googleId}`,
        {
          method: "GET",
          headers: { "Content-Type": "application/json" },
          credentials: "include",
        }
      );

      if (!res.ok) {
        throw new Error(`Failed to get chat: ${res.statusText}`);
      }

      return res.json();
    } catch (error) {
      console.error("Error getting chat:", error);
      throw error;
    }
  },

  // Отримати всі чати користувача
  async getUserChats() {
    try {
      const res = await fetch(`${API_BASE_URL}/chat/my-chats`, {
        method: "GET",
        headers: { "Content-Type": "application/json" },
        credentials: "include",
      });

      if (!res.ok) {
        throw new Error(`Failed to get chats: ${res.statusText}`);
      }

      return res.json();
    } catch (error) {
      console.error("Error getting chats:", error);
      throw error;
    }
  },

  // Отримати повідомлення чату
  async getChatMessages(chatId: number, limit = 50, offset = 0) {
    try {
      const res = await fetch(
        `${API_BASE_URL}/chat/${chatId}/messages?limit=${limit}&offset=${offset}`,
        {
          method: "GET",
          headers: { "Content-Type": "application/json" },
          credentials: "include",
        }
      );

      if (!res.ok) {
        throw new Error(`Failed to get messages: ${res.statusText}`);
      }

      return res.json();
    } catch (error) {
      console.error("Error getting messages:", error);
      throw error;
    }
  },

  // Надіслати повідомлення
  async sendMessage(chatId: number, content: string) {
    try {
      const res = await fetch(`${API_BASE_URL}/chat/${chatId}/message`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        credentials: "include",
        body: JSON.stringify({ content }),
      });

      if (!res.ok) {
        throw new Error(`Failed to send message: ${res.statusText}`);
      }

      return res.json();
    } catch (error) {
      console.error("Error sending message:", error);
      throw error;
    }
  },
};
