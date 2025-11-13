// src/api/chatApi.ts
const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

export const chatApi = {
  // Отримати чат за name_profile контакту
  async getChatWithUser(profileName: string) {
    try {
      const res = await fetch(
        `${API_BASE_URL}/api/chat?profileName=${profileName}`,
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
  async upLoadFile(profileName: string, file: File[] | undefined) {
    try {
      const formData = new FormData();
      if (file) {
        file.forEach((f) => {
          console.log(f);

          formData.append("array", f);
        });
      }
      const res = await fetch(
        `${API_BASE_URL}/api/chat?profileName=${profileName}`,
        {
          method: "POST",
          body: formData,
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
  async createChats(avatar: string | null, name_groups: string) {
    try {
      if (!avatar || !name_groups) {
        return console.log("this fields requrieds");
      }

      const res = await fetch(`${API_BASE_URL}/api/chat/create-groups`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          avatar: avatar,
          name_groups: name_groups,
        }),
        credentials: "include",
      });

      return res.json();
    } catch (error) {
      console.log("something went wrong on create chats", error);
    }
  },
  async addToGroupsUser(name_profile: string) {
    try {
      if (!name_profile) {
        return console.log("this fields requrieds");
      }

      const res = await fetch(`${API_BASE_URL}/api/chat/add-to-groups`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name_profile,
        }),
        credentials: "include",
      });

      return res.json();
    } catch (error) {
      console.log("something went wrong on add", error);
    }
  },
  async getGroups() {
    try {
      const res = await fetch(`${API_BASE_URL}/api/chat/get-groups`, {
        method: "GET",
        headers: { "Content-Type": "application/json" },
        credentials: "include",
      });

      if (!res.ok) {
        throw new Error(`Failed to get chat: ${res.statusText}`);
      }

      return res.json();
    } catch (error) {
      console.error("Error getting chat:", error);
      throw error;
    }
  },
  async getGroupsChats(profileName: string) {
    try {
      const res = await fetch(
        `${API_BASE_URL}/api/chat/GroupsName/${profileName}`,
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
      const res = await fetch(`${API_BASE_URL}/api/chat/my-chats`, {
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
  async createEmojiMessages(
    profileName: string,
    emojiName: string,
    imageUrl: string
  ) {
    try {
      const DataSend = {
        emojiName: emojiName,
        imageUrl: imageUrl,
      };
      const res = await fetch(
        `${API_BASE_URL}/api/chat?profileName=${profileName}`,
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          credentials: "include",
          body: JSON.stringify(DataSend),
        }
      );

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
        `${API_BASE_URL}/api/chat/${chatId}/messages?limit=${limit}&offset=${offset}`,
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
      const res = await fetch(`${API_BASE_URL}/api/chat/${chatId}/message`, {
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
