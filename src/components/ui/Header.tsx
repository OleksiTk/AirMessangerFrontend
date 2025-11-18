import { useEffect, useRef, useState } from "react";
import "../../style/pages/header.css";
import { userInfo } from "../../api/userInfo";
import { contactsApi } from "../../api/contacts";
import { socket } from "../../socket/socket";
import { Box, TextField } from "@mui/material";
import { ButtonBlue } from "./ButtonBlue";
import { chatApi } from "../../api/chatApi";
import ModelWindowHeader from "./ModelWindowHeader";
function Header({ Pages }: { Pages: string }) {
  useEffect(() => {
    setActivePage(Pages);
    handleChangePage(Pages);
  }, [Pages]);
  const [activePage, setActivePage] = useState("");
  const [whatContent, setWhatContent] = useState("");
  const [name, setName] = useState("");
  const [modalWindow, setModalWindow] = useState(false);
  const [switcher, setSwitcher] = useState("Contacts");
  const [findName, setFindName] = useState<any[]>([]);
  const [switcherCreateGroups, setSwitcherCreateGroups] = useState(false);
  const [avatar, setAvatar] = useState<string | null>(null);
  const [avatarFile, setAvatarFile] = useState<File | null>(null); // ← ВАЖЛИВО!
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [secondStep, setSecondStep] = useState(false);
  const [switchContacts, setSwitcheContacts] = useState(true);
  const [nameGroups, setNameGruops] = useState("");
  function handleChangePage(page: string) {
    if (page == "chats") {
      setWhatContent("Chats");
    } else if (page == "contacts") {
      setWhatContent("Contacts");
    } else {
      setWhatContent("More");
    }
  }
  function HabdleModalWindow() {
    if (modalWindow == true) {
      setModalWindow(false);
    } else {
      setModalWindow(true);
    }
  }
  function HandlerAddConctas(name_profile: string) {
    addContacts(name_profile);
  }
  async function addContacts(name_profile: string) {
    try {
      const addContacts = await contactsApi.addContacts(name_profile);

      if (addContacts) {
        socket.emit("add_contacts", { message: "Add contatcs sussec" });

        console.log("succes", addContacts);
      }
    } catch (error) {
      console.log(error);
    }
  }
  async function FindUser() {
    try {
      if (!name.trim()) {
        // ← Перевіримо, чи не пуста строка
        setFindName([]);
        return;
      }

      console.log("Пошук контакту:", name);
      const contacts = await userInfo.GetInfoContacts(name);

      if (contacts && Array.isArray(contacts)) {
        console.log("Found users:", contacts);
        setFindName(contacts);
      }
    } catch (error) {
      console.error("Error finding user:", error);
    }
  }
  async function HandlerAddGroupsContacts(name_profile: string) {
    try {
      const addContacts = await chatApi.addToGroupsUser(name_profile);

      if (addContacts) {
        console.log("succes", addContacts);
      }
    } catch (error) {
      console.log(error);
    }
  }
  function HandlerSwitcher(whatSwitcher: string) {
    if (whatSwitcher) {
      setSwitcher(whatSwitcher);
    }
  }
  useEffect(() => {
    FindUser();
  }, [name]);
  const CreateGropus = async () => {
    try {
      let compressedFileString: string | null = null;

      // Конвертуємо File у string (base64)
      if (avatarFile) {
        const compressedFile = await compressImage(avatarFile);
        compressedFileString = await fileToBase64(compressedFile);
      }

      console.log("Compressed file (base64):", compressedFileString);
      if (!compressedFileString || !nameGroups) {
        return console.log("dont have fields pls write");
      }
      const createNewGroups = await chatApi.createChats(
        compressedFileString,
        nameGroups
      );
      if (createNewGroups.check == "ok") {
        console.log(createNewGroups);
        setAvatarFile(null);
        setAvatar(null);
        setNameGruops("");
        setSecondStep(true);
      }
    } catch (error) {
      console.error(error);
    } finally {
    }
  };
  // Функція для відкриття файлового вибору
  const handleAvatarClick = () => {
    fileInputRef.current?.click();
  };

  // Функція обробки вибраного файлу
  const handleFileChange = (event: any) => {
    const file = event.target.files[0];

    if (file) {
      // Перевірка типу файлу
      if (!file.type.startsWith("image/")) {
        alert("Будь ласка, виберіть зображення");
        return;
      }

      // Перевірка розміру (наприклад, максимум 5MB)
      if (file.size > 5 * 1024 * 1024) {
        alert("Розмір файлу не повинен перевищувати 5MB");
        return;
      }
      setAvatarFile(file);
      // Створення URL для превʼю
      const reader = new FileReader();
      reader.onloadend = () => {
        if (typeof reader.result === "string") {
          setAvatar(reader.result);
        }
      };
      reader.readAsDataURL(file);
    }
  };
  async function compressImage(file: File): Promise<File> {
    return new Promise((resolve) => {
      const reader = new FileReader();

      reader.readAsDataURL(file);
      reader.onload = (event) => {
        const img = new Image();
        img.src = event.target?.result as string;

        img.onload = () => {
          const canvas = document.createElement("canvas");
          let width = img.width;
          let height = img.height;

          // Зменшуємо розміри, якщо занадто великі
          const maxWidth = 800;
          const maxHeight = 800;

          if (width > height) {
            if (width > maxWidth) {
              height = Math.round((height * maxWidth) / width);
              width = maxWidth;
            }
          } else {
            if (height > maxHeight) {
              width = Math.round((width * maxHeight) / height);
              height = maxHeight;
            }
          }

          canvas.width = width;
          canvas.height = height;

          const ctx = canvas.getContext("2d")!;
          ctx.drawImage(img, 0, 0, width, height);

          // Стискаємо з якістю 0.7
          canvas.toBlob(
            (blob) => {
              if (blob) {
                const compressedFile = new File([blob], file.name, {
                  type: "image/jpeg",
                  lastModified: Date.now(),
                });
                resolve(compressedFile);
              }
            },
            "image/jpeg",
            0.7
          );
        };
      };
    });
  }
  function fileToBase64(file: File): Promise<string> {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => {
        resolve(reader.result as string); // "data:image/jpeg;base64,/9j/4AAQSkZJRg..."
      };
      reader.onerror = (error) => {
        reject(error);
      };
    });
  }
  return (
    <header className={`header`}>
      <div className="header__text">{whatContent}</div>
      <div className="header__add-chats">
        {activePage == "chats" ? (
          <div>
            {modalWindow == true ? (
              <>
                <div className="modal-blur-bg"></div>
                <ModelWindowHeader
                  isOpenModelWindow={modalWindow}
                  setIsOpenModelWindow={setModalWindow}
                />
              </>
            ) : (
              ""
            )}

            <svg
              onClick={HabdleModalWindow}
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path d="M19 10H17V7H14V5H17V2H19V5H22V7H19V10Z" fill="#F7F7FC" />
              <path
                d="M21 12H19V15H8.334C7.90107 14.9988 7.47964 15.1393 7.134 15.4L5 17V5H12V3H5C3.89543 3 3 3.89543 3 5V21L7.8 17.4C8.14582 17.1396 8.56713 16.9992 9 17H19C20.1046 17 21 16.1046 21 15V12Z"
                fill="#F7F7FC"
              />
            </svg>
          </div>
        ) : (
          <div>
            {whatContent != "More" ? (
              <svg
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M13 13V19H11V13H5V11H11V5H13V11H19V13H13Z"
                  fill="#F7F7FC"
                />
              </svg>
            ) : (
              <div></div>
            )}
          </div>
        )}
      </div>
    </header>
  );
}

export default Header;
