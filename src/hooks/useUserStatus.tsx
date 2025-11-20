// hooks/useUserStatus.ts
import { useEffect, useState } from "react";
import { socket } from "../socket/socket";

interface UserStatus {
  userId: string;
  googleId?: string;
  isOnline: boolean;
  lastSeen?: Date;
  name_profile?: string;
  avatar?: string;
  name?: string;
}

export const useUserStatus = () => {
  const [onlineUsers, setOnlineUsers] = useState<Map<string, UserStatus>>(
    new Map()
  );

  useEffect(() => {
    // Запитуємо статус контактів при підключенні
    const requestContactsStatus = () => {
      if (socket.connected) {
        console.log("📤 Requesting contacts status...");
        socket.emit("get:contacts:status");
      }
    };

    // Якщо вже підключено - запитуємо статус
    if (socket.connected) {
      requestContactsStatus();
    }

    // Слухаємо події
    socket.on("connect", () => {
      console.log("✅ Socket connected, requesting contacts status");
      requestContactsStatus();
    });

    socket.on("contacts:status", (contacts: UserStatus[]) => {
      console.log("📋 Received contacts status:", contacts);
      const statusMap = new Map<string, UserStatus>();
      contacts.forEach((contact) => {
        // Використовуємо googleId як ключ
        const key = contact.googleId || contact.userId;
        statusMap.set(key, contact);
      });
      setOnlineUsers(statusMap);
    });

    socket.on("user:online", (data: UserStatus) => {
      console.log("👤 User came online:", data);
      setOnlineUsers((prev) => {
        const newMap = new Map(prev);
        const key = data.googleId || data.userId;
        newMap.set(key, { ...data, isOnline: true });
        return newMap;
      });
    });

    socket.on("user:offline", (data: UserStatus) => {
      console.log("👤 User went offline:", data);
      setOnlineUsers((prev) => {
        const newMap = new Map(prev);
        const key = data.googleId || data.userId;
        newMap.set(key, { ...data, isOnline: false });
        return newMap;
      });
    });

    return () => {
      socket.off("connect");
      socket.off("contacts:status");
      socket.off("user:online");
      socket.off("user:offline");
    };
  }, []);

  const isUserOnline = (googleId: string) => {
    return onlineUsers.get(googleId)?.isOnline || false;
  };

  const getLastSeen = (googleId: string) => {
    return onlineUsers.get(googleId)?.lastSeen;
  };

  return { onlineUsers, isUserOnline, getLastSeen };
};
