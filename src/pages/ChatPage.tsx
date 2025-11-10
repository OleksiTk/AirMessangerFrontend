import React, { useEffect, useState, useRef } from "react";
import { useParams, useNavigate, useLocation } from "react-router-dom";
import "../style/pages/chat.css";
import { chatApi } from "../api/chatApi";
import { socket } from "../socket/socket";
import { toast, ToastContainer } from "react-toastify";
import { useImageModal } from "../hooks/useImageModal";
import EmojiPicker, { Theme } from "emoji-picker-react";
const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

interface Message {
  chatId: string;
  content: string;
  createdAt: string;
  id: number;
  isRead: boolean;
  senderId: string;
  files: FileMessage[];
  isLoading?: boolean;
  tempId?: string;
}
interface FileMessage {
  fileName: string;
  fileSize: number;
  fileType: string;
  fileUrl: string;
  id: number;
  messageId: number;
}
interface Chat {
  id: number;
  isGroup: Boolean;

  participants: [
    {
      id: number;
      chatId: string;
      userId: string;
      user: {
        avatar: string;
        name: string;
        last_name: string;
      };
    }
  ];
  chat: {
    id: string;
    avatar: string;
    name: string;
    participants: [
      {
        id: number;
        chatId: string;
        userId: string;
        user: {
          avatar: string;
          name: string;
          last_name: string;
        };
      }
    ];
  };
}

function ChatPage() {
  const MAX_FILES = 4; // Максимальна кількість файлів

  const { profileName } = useParams<{ profileName: string }>();
  const location = useLocation();
  const isGroupChat = location.pathname.includes("/chat-groups");
  const { openImage, ImageModal } = useImageModal();
  const messageRefs = useRef<{ [key: string]: HTMLDivElement | null }>({});
  const [highlightedMessageId, setHighlightedMessageId] = React.useState<
    string | null | number
  >(null);
  const navigate = useNavigate();
  const currentSocket = socket;
  const [SearchTextValue, setSearchTextValue] = useState("");
  const [chat, setChat] = useState<Chat | null>(null);
  const [messages, setMessages] = useState<Message[]>([]);
  const [newMessage, setNewMessage] = useState("");
  const [newFilesMessage, setNewFilesMessage] = useState("");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [isConnected, setIsConnected] = useState(false);
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const typingTimeoutRef = useRef<number | null>(null);
  const oneTryToTakeData = useRef<boolean>(true);
  const [currentUserProfile, setCurrentUserProfile] = useState("");
  const currentUserGoogleId = localStorage.getItem("googleId");
  const fileInputRef = useRef<HTMLInputElement>(null);
  const modalFileInputRef = useRef<HTMLInputElement>(null);
  const [filesArray, setFilesArray] = useState<File[]>([]);
  const [isGroup, setIsGroup] = useState<boolean>(false);
  const [modalWindowFiles, setModalWindowFiles] = useState<boolean>(false);
  const [openEmojiPicker, setOpenEmojiPicker] = useState<boolean>(false);
  const [emojiInMessage, setEmojiInMessage] = useState<number | null>(null);
  const [openEmojiInMessageContext, setOpenEmojiInMessageContext] =
    useState<boolean>(false);
  const handleSvgClick = () => {
    fileInputRef.current?.click();
  };
  const handleModalAddFiles = () => {
    // В модальному вікні використовуємо modalFileInputRef
    modalFileInputRef.current?.click();
  };
  const CancelSendFiles = () => {
    setModalWindowFiles(false);
    setFilesArray([]);
  };
  const handleFooterFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFiles = Array.from(e.target.files || []);

    if (selectedFiles.length > 0) {
      setFilesArray((prevFiles) => {
        const totalFiles = prevFiles.length + selectedFiles.length;

        // Перевірка ліміту
        if (totalFiles > MAX_FILES) {
          toast.warn(`${"max 4 files"}`, {
            position: "top-right",
            autoClose: 5000,
            hideProgressBar: false,
            closeOnClick: false,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "dark",
          });
          return prevFiles;
        }
        const newArray = [...prevFiles, ...selectedFiles];
        console.log(
          "Updated files array:",
          newArray.map((f) => f.name)
        );
        return newArray;
      });
      setModalWindowFiles(true);
    }
    e.target.value = "";
  };
  const handleModalFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFile = Array.from(e.target.files || []);

    if (selectedFile) {
      setFilesArray((prevFiles) => {
        const totalFiles = prevFiles.length + selectedFile.length;

        // Перевірка ліміту
        if (totalFiles > MAX_FILES) {
          toast.warn(`${"max 4 files"}`, {
            position: "top-right",
            autoClose: 5000,
            hideProgressBar: false,
            closeOnClick: false,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "dark",
          });
          return prevFiles;
        }
        const newArray = [...prevFiles, ...selectedFile];
        console.log(
          "Updated files array:",
          newArray.map((f) => f.name)
        );
        return newArray;
      });
    }
    e.target.value = "";
  };
  const sendMessageWithFiles = async () => {
    try {
      if (filesArray.length > 0) {
        if (!chat) return;
        if (!newFilesMessage.trim()) {
          toast.warn(`pls write any message`, {
            position: "top-right",
            autoClose: 5000,
            hideProgressBar: false,
            closeOnClick: false,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "dark",
          });
          return;
        }

        // Генеруємо тимчасовий ID
        const tempId = `temp_${Date.now()}`;

        // Додаємо повідомлення з флагом isLoading
        const tempMessage: Message = {
          chatId: isGroupChat ? chat.chat.id : String(chat.id),
          content: newFilesMessage,
          createdAt: new Date().toISOString(),
          id: 0,
          isRead: false,
          senderId: currentUserGoogleId!,
          files: [],
          isLoading: true,
          tempId: tempId,
        };

        setMessages((prev) => [...prev, tempMessage]);
        setModalWindowFiles(false);
        const fileTake = await chatApi.upLoadFile(profileName!, filesArray);

        if (isGroupChat) {
          currentSocket.emit("send_message", {
            chatId: chat.chat.id,
            content: newFilesMessage,
            googleId: currentUserGoogleId,
            files: fileTake,
            tempId: tempId, // Передаємо tempId на сервер
          });
        } else {
          currentSocket.emit("send_message", {
            chatId: chat.id,
            content: newFilesMessage,
            googleId: currentUserGoogleId,
            files: fileTake,
            tempId: tempId,
          });
        }

        setFilesArray([]);
        setNewFilesMessage("");
      }
    } catch (error) {
      console.error("Error sending files:", error);
      // Видаляємо тимчасове повідомлення у разі помилки
      setMessages((prev) => prev.filter((msg) => !msg.isLoading));
      toast.error("Failed to send files", {
        position: "top-right",
        autoClose: 5000,
        theme: "dark",
      });
    }
  };
  const CheckImgFullScreen = (e: React.MouseEvent<HTMLImageElement>) => {
    const imgSrc = e.currentTarget.src;
    openImage(imgSrc);
  };
  const SearchText = (foundText: string) => {
    if (!foundText.trim()) return;
    setTimeout(() => {
      const foundMessage = messages.find((message) =>
        message.content.toLowerCase().includes(foundText.toLowerCase())
      );

      if (foundMessage) {
        // Скролимо до повідомлення
        const messageElement = messageRefs.current[foundMessage.id];
        if (messageElement) {
          messageElement.scrollIntoView({
            behavior: "smooth",
            block: "center",
          });

          // Підсвічуємо повідомлення
          setHighlightedMessageId(foundMessage.id);

          // Прибираємо підсвітку через 2 секунди
          setTimeout(() => {
            setHighlightedMessageId(null);
          }, 2000);
        }
      }
    }, 1000);
    // Знаходимо перше повідомлення з текстом
  };
  useEffect(() => {
    console.log(emojiInMessage);
  }, [emojiInMessage]);
  useEffect(() => {
    SearchText(SearchTextValue);
  }, [SearchTextValue]);
  // Автоскрол
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  // Завантажити чат  з API
  useEffect(() => {
    if (!oneTryToTakeData.current) {
      oneTryToTakeData.current = false;
      return;
    }
    if (!profileName) {
      setError("Profile name not provided");
      setLoading(false);
      console.log("Profile name not provided");

      return;
    }

    const fetchChat = async () => {
      try {
        setLoading(true);
        const isGroupChat = location.pathname.includes("/chat-groups");

        let chatData;
        if (isGroupChat) {
          // Логіка для групових чатів
          chatData = await chatApi.getGroupsChats(profileName);
          console.log("Group chat loaded:", chatData);
          setChat(chatData.chat);
          setMessages(chatData.chat.messages || []);
          setIsGroup(true);
        } else {
          // Логіка для приватних чатів
          chatData = await chatApi.getChatWithUser(profileName);
          console.log("Private chat loaded:", chatData);
          setChat(chatData);
          setMessages(chatData.messages || []);
        }

        setChat(chatData);
        setCurrentUserProfile("lol");
      } catch (err) {
        const errorMessage =
          err instanceof Error ? err.message : "Failed to load chat";
        setError(errorMessage);
      } finally {
        setLoading(false);
      }
    };

    fetchChat();
  }, []);

  // Socket.IO підключення
  useEffect(() => {
    console.log("Socket setup check:", {
      hasChat: !!chat,
      chatId: chat?.id,
      hasGoogleId: !!currentUserGoogleId,
      hasProfile: !!currentUserProfile,
      socketConnected: currentSocket.connected,
    });
    console.log("chats id", chat?.id);
    console.log(chat);

    if (!chat?.id || !currentUserGoogleId || !currentUserProfile) {
      console.log("⏳ Waiting for complete chat data...", {
        chat: chat?.id,
        googleId: currentUserGoogleId,
        profile: currentUserProfile,
      });
      return;
    }

    console.log("Initializing socket handlers for chat:", chat.id);

    // Підключаємось до сокета
    const handleConnect = () => {
      setIsConnected(true);
      console.log("Socket connected:", currentSocket.id);
      if (isGroupChat) {
        currentSocket.emit("join_chat", {
          chatId: chat.chat.id,
          googleId: currentUserGoogleId,
          name_profile: currentUserProfile,
        });
      } else {
        currentSocket.emit("join_chat", {
          chatId: chat.id,
          googleId: currentUserGoogleId,
          name_profile: currentUserProfile,
        });
      }
      // Приєднуємось до чату
    };

    const handleDisconnect = () => {
      setIsConnected(false);
      console.log("Socket disconnected");
    };

    // Отримуємо нові повідомлення
    const handleReceiveMessage = (message: Message & { tempId?: string }) => {
      console.log("New message received:", message);
      setMessages((prev) => {
        // Якщо є tempId, замінюємо тимчасове повідомлення
        if (message.tempId) {
          return prev.map((msg) =>
            msg.tempId === message.tempId
              ? { ...message, isLoading: false, tempId: undefined }
              : msg
          );
        }

        // Перевіряємо чи повідомлення вже є
        if (prev.some((msg) => msg.id === message.id)) {
          return prev;
        }
        return [...prev, message];
      });
    };

    // Сповіщення про друкування
    const handleUserTyping = (data: {
      name_profile: string;
      isTyping: boolean;
    }) => {
      if (data.name_profile !== currentUserProfile) {
        setIsTyping(data.isTyping);

        // Автоматично ховаємо "typing..." через 3 секунди
        if (data.isTyping && typingTimeoutRef.current) {
          clearTimeout(typingTimeoutRef.current);
        }
        if (data.isTyping) {
          typingTimeoutRef.current = setTimeout(() => {
            setIsTyping(false);
          }, 3000);
        }
      }
    };

    // Користувач приєднався
    const handleUserJoined = (data: { name_profile: string }) => {
      console.log(`${data.name_profile} joined`);
    };

    // Користувач залишив
    const handleUserLeft = (data: { name_profile: string }) => {
      console.log(`${data.name_profile} left`);
    };

    // Повідомлення прочитане
    const handleMessageRead = (data: { messageId: number }) => {
      setMessages((prev) =>
        prev.map((msg) =>
          msg.id === data.messageId ? { ...msg, isRead: true } : msg
        )
      );
    };

    // Реєструємо всі обробники
    currentSocket.on("connect", handleConnect);
    currentSocket.on("disconnect", handleDisconnect);
    currentSocket.on("receive_message", handleReceiveMessage);
    currentSocket.on("user_typing", handleUserTyping);
    currentSocket.on("user_joined", handleUserJoined);
    currentSocket.on("user_left", handleUserLeft);
    currentSocket.on("message_read", handleMessageRead);

    // Якщо вже підключені
    if (currentSocket.connected) {
      handleConnect();
    }

    // Cleanup function
    return () => {
      console.log("Cleaning up socket handlers");

      // Видаляємо ВСІ обробники при unmount
      currentSocket.off("connect", handleConnect);
      currentSocket.off("disconnect", handleDisconnect);
      currentSocket.off("receive_message", handleReceiveMessage);
      currentSocket.off("user_typing", handleUserTyping);
      currentSocket.off("user_joined", handleUserJoined);
      currentSocket.off("user_left", handleUserLeft);
      currentSocket.off("message_read", handleMessageRead);

      currentSocket.emit("leave_chat", {
        chatId: chat.id,
        name_profile: currentUserProfile,
      });

      if (typingTimeoutRef.current) {
        clearTimeout(typingTimeoutRef.current);
      }
    };
  }, [chat]);

  // Надіслати повідомлення
  const handleSendMessage = async () => {
    if (!newMessage.trim() || !chat || !currentUserGoogleId) {
      return;
    }
    if (!profileName) {
      setError("Profile name not provided");
      setLoading(false);
      return;
    }

    // Генеруємо тимчасовий ID
    const tempId = `temp_${Date.now()}`;

    // Створюємо тимчасове повідомлення з флагом isLoading
    const tempMessage: Message = {
      chatId: isGroupChat ? chat.chat.id : String(chat.id),
      content: newMessage,
      createdAt: new Date().toISOString(),
      id: 0, // Тимчасовий ID
      isRead: false,
      senderId: currentUserGoogleId,
      files: [],
      isLoading: true, // Флаг завантаження
      tempId: tempId, // Унікальний тимчасовий ідентифікатор
    };
    setOpenEmojiPicker(false);
    // Додаємо повідомлення до списку
    setMessages((prev) => [...prev, tempMessage]);

    // Очищуємо поле вводу
    const messageToSend = newMessage;
    setNewMessage("");

    // Відправляємо повідомлення на сервер
    if (isGroupChat) {
      currentSocket.emit("send_message", {
        chatId: chat.chat.id,
        content: messageToSend,
        googleId: currentUserGoogleId,
        tempId: tempId, // Передаємо tempId щоб потім знайти і замінити повідомлення
      });
    } else {
      currentSocket.emit("send_message", {
        chatId: chat.id,
        content: messageToSend,
        googleId: currentUserGoogleId,
        tempId: tempId,
      });
    }

    currentSocket.emit("typing", {
      chatId: isGroupChat ? chat.chat.id : chat.id,
      name_profile: currentUserProfile,
      isTyping: false,
    });
  };

  const handleKeyPress = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
      return;
    }

    // ✅ Повідомляємо, що користувач друкує (тільки якщо є текст)
    if (newMessage.trim() && chat) {
      currentSocket.emit("typing", {
        chatId: chat.id,
        name_profile: currentUserProfile,
        isTyping: true,
      });

      // ✅ Зупиняємо через 2 секунди
      if (typingTimeoutRef.current) {
        clearTimeout(typingTimeoutRef.current);
      }
      typingTimeoutRef.current = setTimeout(() => {
        currentSocket.emit("typing", {
          chatId: chat.id,
          name_profile: currentUserProfile,
          isTyping: false,
        });
      }, 2000);
    }
  };
  useEffect(() => {
    console.log(filesArray);
  }, [filesArray]);
  if (loading) {
    return (
      <div className="chat">
        <div className="container">
          <div style={{ textAlign: "center", padding: "20px" }}>
            Loading chat...
          </div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="chat">
        <div className="container">
          <div style={{ textAlign: "center", padding: "20px", color: "red" }}>
            Error: {error}
            <button onClick={() => navigate(-1)} style={{ marginTop: "10px" }}>
              Go Back
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="chat">
      <div className="container">
        <ToastContainer
          position="top-right"
          autoClose={5000}
          hideProgressBar={false}
          newestOnTop={false}
          closeOnClick={false}
          rtl={false}
          pauseOnFocusLoss
          draggable
          pauseOnHover
          theme="dark"
        />
        {/* Header */}
        <header className="header-chat">
          <div className="header-chat__arrow" onClick={() => navigate(-1)}>
            <svg
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M8.28809 12L14.2981 18.01L15.7121 16.596L11.1121 11.996L15.7121 7.39599L14.2981 5.98999L8.28809 12Z"
                fill="#F7F7FC"
              />
            </svg>
          </div>
          <div className="header-chat__name">
            {isGroup ? (
              <div className="header-chat__name-group">
                <img
                  src={chat?.chat?.avatar}
                  alt="avatar group"
                  className="header-chat__name-avatar"
                />
                <span className="header-chat__name-text">
                  {chat?.chat?.name}
                </span>
              </div>
            ) : (
              <div>
                {chat?.participants?.map((p) => {
                  if (p.userId !== currentUserGoogleId) {
                    return (
                      <div key={p.userId} className="header-chat__name-group">
                        <img
                          className="header-chat__name-avatar"
                          src={p.user.avatar || `/assets/NoneUserAvatar.jpg`}
                          alt="avatar"
                        />
                        {chat?.participants?.find(
                          (p) => p.userId !== currentUserGoogleId
                        )?.user?.name || "name"}{" "}
                        {chat?.participants?.find(
                          (p) => p.userId !== currentUserGoogleId
                        )?.user?.last_name || "last_name"}
                      </div>
                    );
                  }
                })}
              </div>
            )}
          </div>
          <div className="header-chat__settings">
            <div className="header-chat__settings-search">
              <div className="header-chat__settings-search-input">
                <input
                  value={SearchTextValue}
                  onChange={(e) => setSearchTextValue(e.target.value)}
                  type="text"
                  placeholder="Search..."
                  className="header-chat__settings-search-input-field"
                />
                <svg
                  className="header-chat__settings-search-input-icon"
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M18.677 19.607L12.962 13.891C10.4196 15.6984 6.91642 15.2563 4.90285 12.8739C2.88929 10.4915 3.03714 6.96358 5.24298 4.75799C7.44824 2.55144 10.9765 2.40295 13.3594 4.4164C15.7422 6.42986 16.1846 9.93344 14.377 12.476L20.092 18.192L18.678 19.606L18.677 19.607ZM9.48498 4.99997C7.58868 4.99955 5.95267 6.33066 5.56745 8.18742C5.18224 10.0442 6.15369 11.9163 7.89366 12.6702C9.63362 13.4242 11.6639 12.8528 12.7552 11.302C13.8466 9.75126 13.699 7.64731 12.402 6.26399L13.007 6.86399L12.325 6.18399L12.313 6.17199C11.5648 5.41917 10.5464 4.99712 9.48498 4.99997Z"
                    fill="#F7F7FC"
                  />
                </svg>
              </div>
            </div>
          </div>
        </header>

        {/* Messages */}
        <main className="main-chats">
          <div className="main-chats__chat">
            {modalWindowFiles && (
              <>
                <div
                  className="main-chats__backdrop"
                  onClick={() => setModalWindowFiles(false)}
                />
                <div className="main-chats__send-files send-files-modal">
                  <div className="send-files-modal__container">
                    <div className="send-files-modal__main">
                      <h2 className="send-files-modal__title">
                        Send File{" "}
                        {filesArray.length != null ? filesArray.length : ""}
                      </h2>
                      <div className="send-files-modal__files">
                        {filesArray.map((file, index) => {
                          const isImage = file.type.startsWith("image/");

                          return (
                            <div key={index} className="send-files-modal__file">
                              {isImage ? (
                                // Якщо це картинка
                                <div className="send-files-modal__files-image">
                                  <img
                                    src={URL.createObjectURL(file)}
                                    alt={file.name}
                                    className="send-files-modal__file-img"
                                  />
                                  <button
                                    onClick={() => {
                                      // Видаляємо файл з масиву за індексом
                                      setFilesArray((prevFiles) =>
                                        prevFiles.filter((_, i) => i !== index)
                                      );

                                      // Опціонально: Очищуємо fileValues якщо це був останній файл
                                    }}
                                    className="send-files-modal__file-remove"
                                  >
                                    X
                                  </button>
                                </div>
                              ) : (
                                // Якщо це інший файл (PDF, DOCX, TXT тощо)
                                <div className="send-files-modal__files-object">
                                  <span className="file-icon">📄</span>
                                  <span className="file-name">{file.name}</span>
                                  <span className="file-size">
                                    {(file.size / 1024).toFixed(2)} KB
                                  </span>
                                  <button
                                    onClick={() => {
                                      // Видаляємо файл з масиву за індексом
                                      setFilesArray((prevFiles) =>
                                        prevFiles.filter((_, i) => i !== index)
                                      );
                                    }}
                                    className="send-files-modal__file-remove"
                                  >
                                    X
                                  </button>
                                </div>
                              )}

                              {/* Кнопка видалення */}
                            </div>
                          );
                        })}
                      </div>
                    </div>
                    <div className="send-files-modal__footer">
                      <input
                        type="text"
                        className="send-files-modal__text"
                        placeholder="description"
                        value={newFilesMessage}
                        onChange={(e) => setNewFilesMessage(e.target.value)}
                      />
                      <div className="send-files-modal__buttons">
                        {" "}
                        <button
                          className="send-files-modal__add-files"
                          onClick={handleModalAddFiles}
                        >
                          Add Files
                        </button>
                        <input
                          type="file"
                          multiple
                          ref={modalFileInputRef}
                          style={{ display: "none" }}
                          onChange={handleModalFileSelect}
                        />
                        <button
                          onClick={CancelSendFiles}
                          className="send-files-modal__cancel-send"
                        >
                          Cancel
                        </button>
                        <button
                          onClick={sendMessageWithFiles}
                          className="send-files-modal__apply-send"
                        >
                          Send
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              </>
            )}

            {messages.map((message) => (
              <div
                onMouseEnter={() => {
                  setEmojiInMessage(message.id);
                  setOpenEmojiInMessageContext(true);
                }}
                onMouseLeave={() => {
                  setEmojiInMessage(null);
                  setOpenEmojiInMessageContext(false);
                }}
                ref={(el) => {
                  messageRefs.current[message.id] = el;
                }}
                key={message.tempId || message.id}
                className={`
                  ${
                    message.senderId === currentUserGoogleId
                      ? "main-chats__chat-you"
                      : "main-chats__chat-friends"
                  }
                                  ${
                                    highlightedMessageId === message.id
                                      ? "highlighted"
                                      : ""
                                  }
`}
                style={{
                  filter: message.isLoading ? "blur(2px)" : "none",
                  opacity: message.isLoading ? 0.6 : 1,
                  position: "relative",
                  transition: "all 0.3s ease",
                }}
              >
                {openEmojiInMessageContext && message.id === emojiInMessage && (
                  <div className="emoji-picker">
                    <EmojiPicker
                      theme={Theme.DARK}
                      reactionsDefaultOpen={true}
                      className="emoji-picker-component"
                    />
                  </div>
                )}
                {isGroup ? (
                  <>
                    {chat?.chat?.participants?.map((p) => {
                      if (p.userId === message.senderId) {
                        return (
                          <img
                            key={p.userId}
                            className="main-chats__chat-avatar"
                            src={p.user.avatar || `/assets/NoneUserAvatar.jpg`}
                            alt="avatar"
                          />
                        );
                      }
                    })}
                  </>
                ) : (
                  <>
                    {chat?.participants?.map((p) => {
                      if (p.userId === message.senderId) {
                        return (
                          <img
                            key={p.userId}
                            className="main-chats__chat-avatar"
                            src={p.user.avatar || `/assets/NoneUserAvatar.jpg`}
                            alt="avatar"
                          />
                        );
                      }
                    })}
                  </>
                )}

                <div
                  className={
                    message.senderId === currentUserGoogleId
                      ? "chat-you"
                      : "chat-friends"
                  }
                >
                  {message.isLoading && (
                    <div className="loader-message">
                      <div className="loader-message__spinner" />
                    </div>
                  )}
                  <div
                    className={
                      message.senderId === currentUserGoogleId
                        ? "chat-you__message"
                        : "chat-friends__message"
                    }
                  >
                    <div
                      className={
                        message.senderId === currentUserGoogleId
                          ? "chat-you__message__name"
                          : "chat-friends__message__name"
                      }
                    >
                      {isGroup ? (
                        <>
                          {chat?.chat?.participants?.map((p) => {
                            if (p.userId === message.senderId) {
                              return p.user.name;
                            } else {
                              return "";
                            }
                          })}
                        </>
                      ) : (
                        <>
                          {chat?.participants?.map((p) => {
                            if (p.userId === message.senderId) {
                              return p.user.name;
                            } else {
                              return "";
                            }
                          })}
                        </>
                      )}
                    </div>
                    {message.files?.length > 0
                      ? message.files.map((file) => {
                          return (
                            <div
                              key={file.id}
                              className={
                                message.senderId === currentUserGoogleId
                                  ? "chat-you__message__block-main"
                                  : "chat-friends__message__block-main"
                              }
                            >
                              {file.fileType.startsWith("image/") ? (
                                <>
                                  <img
                                    className={
                                      message.senderId === currentUserGoogleId
                                        ? "chat-you__message__img"
                                        : "chat-friends__message__img"
                                    }
                                    onClick={CheckImgFullScreen}
                                    src={`${API_BASE_URL}${file.fileUrl}`}
                                    alt={file.fileName || "image"}
                                  />
                                  <ImageModal />
                                </>
                              ) : (
                                <a
                                  href={`${API_BASE_URL}${file.fileUrl}`}
                                  target="_blank"
                                  rel="noopener noreferrer"
                                  className={
                                    message.senderId === currentUserGoogleId
                                      ? "chat-you__message__file"
                                      : "chat-friends__message__file"
                                  }
                                >
                                  {file.fileName || "Download file"}
                                </a>
                              )}
                            </div>
                          );
                        })
                      : null}
                    <div
                      className={
                        message.senderId === currentUserGoogleId
                          ? "chat-you__message__content"
                          : "chat-friends__message__content"
                      }
                    >
                      {message.content}
                    </div>
                  </div>
                  <div
                    className={
                      message.senderId === currentUserGoogleId
                        ? "chat-you__message-time"
                        : "chat-friends__message-time"
                    }
                  >
                    {message.createdAt ? (
                      <div>
                        {new Date(message.createdAt).toLocaleTimeString(
                          "uk-UA",
                          {
                            hour: "2-digit",
                            minute: "2-digit",
                          }
                        )}{" "}
                        ·{" "}
                        {message.isLoading
                          ? "Sending..."
                          : message.isRead
                          ? "Read"
                          : "Sent"}
                      </div>
                    ) : (
                      <div>
                        {new Date().toLocaleTimeString("uk-UA", {
                          hour: "2-digit",
                          minute: "2-digit",
                        })}{" "}
                        ·{" "}
                        {message.isLoading
                          ? "Sending..."
                          : message.isRead
                          ? "Read"
                          : "Sent"}
                      </div>
                    )}
                  </div>
                </div>
              </div>
            ))}
            {isTyping && (
              <div className="main-chats__chat-friends">
                <div className="chat-friends">
                  <div
                    className="chat-friends__message"
                    style={{ fontStyle: "italic", opacity: 0.7 }}
                  >
                    typing...
                  </div>
                </div>
              </div>
            )}
            <div ref={messagesEndRef} />
          </div>
        </main>

        {/* Footer */}
        <footer className="footer">
          <div className="footer__container">
            <div className="footer__plus-add-file">
              <svg
                width="14"
                height="14"
                viewBox="0 0 14 14"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
                onClick={handleSvgClick}
              >
                <path d="M8 8V14H6V8H0V6H6V0H8V6H14V8H8Z" fill="#ADB5BD" />
              </svg>
              <input
                type="file"
                ref={fileInputRef}
                multiple
                style={{ display: "none" }}
                onChange={handleFooterFileSelect}
              />
            </div>
            <div className="footer__emoji">
              <img
                src="/assets/happiness.png"
                alt="emoji"
                className="footer__emoji-icon"
                onClick={() => setOpenEmojiPicker((prev) => !prev)}
              />
              <div>
                <EmojiPicker
                  theme={Theme.DARK}
                  className="footer__emoji-picker"
                  open={openEmojiPicker}
                  onEmojiClick={(emoji) => {
                    setNewMessage((prev) => `${prev} ${emoji.emoji}`);

                    console.log(emoji, "emoji ");
                  }}
                />
              </div>
            </div>
            <div className="footer__input">
              <input
                id="messageInput"
                name="message"
                type="text"
                className="footer__input-text"
                value={newMessage}
                onChange={(e) => setNewMessage(e.target.value)}
                onKeyPress={handleKeyPress}
                placeholder="Type a message..."
              />
            </div>
            <div
              className="footer__send"
              onClick={handleSendMessage}
              style={{
                opacity: isConnected && newMessage.trim() ? 1 : 0.5,
                cursor:
                  isConnected && newMessage.trim() ? "pointer" : "not-allowed",
              }}
            >
              <svg
                width="18"
                height="18"
                viewBox="0 0 18 18"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M17.7825 0.21751C17.6813 0.116765 17.5534 0.0470131 17.4139 0.0164552C17.2744 -0.0141027 17.1291 -0.0041961 16.995 0.0450103L0.495001 6.04501C0.352702 6.09898 0.230191 6.19497 0.143739 6.32023C0.0572872 6.44548 0.0109863 6.59407 0.0109863 6.74626C0.0109863 6.89845 0.0572872 7.04704 0.143739 7.17229C0.230191 7.29755 0.352702 7.39354 0.495001 7.44751L6.9375 10.02L11.6925 5.25001L12.75 6.30751L7.9725 11.085L10.5525 17.5275C10.6081 17.6671 10.7043 17.7867 10.8286 17.8709C10.953 17.9552 11.0998 18.0002 11.25 18C11.4016 17.9969 11.5486 17.9479 11.6718 17.8596C11.795 17.7712 11.8885 17.6476 11.94 17.505L17.94 1.00501C17.9911 0.872318 18.0034 0.727833 17.9755 0.588403C17.9477 0.448973 17.8807 0.320343 17.7825 0.21751Z"
                  fill="#375FFF"
                />
              </svg>
            </div>
          </div>
        </footer>
      </div>
    </div>
  );
}

export default ChatPage;
