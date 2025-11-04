import { useEffect, useRef, useState } from "react";
import "../../style/pages/header.css";
import { userInfo } from "../../api/userInfo";
import { contactsApi } from "../../api/contacts";
import { socket } from "../../socket/socket";
import { Box, TextField } from "@mui/material";
import { ButtonBlue } from "./ButtonBlue";
import { chatApi } from "../../api/chatApi";
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
              <div className="modal-window">
                <div className="modal-window__switcher">
                  <div className="modal-window__switcher-buttons">
                    <div
                      onClick={() => {
                        HandlerSwitcher("Contacts");
                      }}
                      className="modal-window__switcher-contacts"
                    >
                      Contacts
                    </div>
                    <div
                      onClick={() => {
                        HandlerSwitcher("Groups");
                      }}
                      className="modal-window__switcher-groups"
                    >
                      Groups
                    </div>
                  </div>

                  {switcher == "Contacts" ? (
                    <div className="modal-window__contacts">
                      <div className="modal-window__search">
                        <div
                          onClick={HabdleModalWindow}
                          className="modal-window__img"
                        >
                          <img
                            src="/assets/delete.png"
                            className="modal-window__img-src"
                            alt=""
                          />
                        </div>

                        <input
                          value={name}
                          onChange={(e) => setName(e.target.value)}
                          type="text"
                          className="modal-window__input"
                        />
                      </div>

                      <div className="contacts-form">
                        {findName.length > 0
                          ? findName.map((user) => (
                              <div key={user.id} className="contact-item">
                                <div className="contact-item__block">
                                  <img
                                    src={user.avatar}
                                    alt={user.name_profile}
                                    className="contact-item__block-img"
                                  />
                                  <span className="contact-item__block-name">
                                    {user.name_profile}
                                  </span>
                                  <div
                                    onClick={() => {
                                      HandlerAddConctas(user.name_profile);
                                    }}
                                    className="contact-item__block-add"
                                  >
                                    +
                                  </div>
                                </div>
                              </div>
                            ))
                          : ""}
                      </div>
                    </div>
                  ) : (
                    <div className="modal-window__groups">
                      <div className="modal-window__groups-create">
                        <button
                          onClick={() => {
                            setSwitcherCreateGroups(true);
                          }}
                          className={`modal-window__groups-create-button ${
                            switcherCreateGroups ? "hidden-element" : ""
                          }`}
                        >
                          {" "}
                          Create your groups
                        </button>
                      </div>
                      {switcherCreateGroups ? (
                        <div className="modal-window__groups-creating-groups creating-groups">
                          <div className="creating-groups">
                            {secondStep == true ? (
                              <div className="creating-groups__last-step">
                                <div className="creating-groups__last-step__buttons">
                                  {" "}
                                  <div
                                    onClick={() => {
                                      setSwitcheContacts(true);
                                    }}
                                    className="creating-groups__add-contacts"
                                  >
                                    Add Friends
                                  </div>
                                  <div
                                    onClick={() => {
                                      setSwitcheContacts(false);
                                    }}
                                    className="creating-groups__search-add-contacts"
                                  >
                                    Search Friends
                                  </div>
                                </div>

                                <div className="creating-groups__blocks">
                                  {" "}
                                  {switchContacts ? (
                                    <div className="creating-groups__blocks-frends"></div>
                                  ) : (
                                    <div>
                                      {" "}
                                      <input
                                        value={name}
                                        onChange={(e) =>
                                          setName(e.target.value)
                                        }
                                        type="text"
                                        className="modal-window__input"
                                      />
                                      <div className="contacts-form">
                                        {findName.length > 0
                                          ? findName.map((user) => (
                                              <div
                                                key={user.id}
                                                className="contact-item"
                                              >
                                                <div className="contact-item__block">
                                                  <img
                                                    src={user.avatar}
                                                    alt={user.name_profile}
                                                    className="contact-item__block-img"
                                                  />
                                                  <span className="contact-item__block-name">
                                                    {user.name_profile}
                                                  </span>
                                                  <div
                                                    onClick={() => {
                                                      HandlerAddGroupsContacts(
                                                        user.name_profile
                                                      );
                                                    }}
                                                    className="contact-item__block-add"
                                                  >
                                                    +
                                                  </div>
                                                </div>
                                              </div>
                                            ))
                                          : ""}
                                      </div>
                                    </div>
                                  )}
                                  <div className="creating-groups__blocks-button-submit">
                                    <ButtonBlue
                                      onClick={HabdleModalWindow}
                                      textButton="Submit"
                                    />
                                  </div>
                                </div>
                              </div>
                            ) : (
                              <div>
                                <div
                                  onClick={() => {
                                    setSwitcherCreateGroups(false);
                                  }}
                                  className="creating-groups__cross"
                                >
                                  <span className="creating-groups__cross-style">
                                    x
                                  </span>
                                </div>
                                <div className="creating-groups__mainBlock">
                                  {" "}
                                  <div className="creating-groups__mainBlock-avatar">
                                    <input
                                      ref={fileInputRef}
                                      type="file"
                                      accept="image/*"
                                      onChange={handleFileChange}
                                      style={{ display: "none" }}
                                    />
                                    <div
                                      className="creating-groups__mainBlock-avatar-img"
                                      onClick={handleAvatarClick}
                                      style={{
                                        backgroundImage: avatar
                                          ? `url(${avatar})`
                                          : "none",
                                        backgroundSize: "cover",
                                        backgroundPosition: "center",
                                      }}
                                    >
                                      {!avatar && (
                                        <svg
                                          className="creating-groups__mainBlock-avatar-img-svg"
                                          width="50"
                                          height="45"
                                          viewBox="0 0 38 45"
                                          fill="none"
                                          xmlns="http://www.w3.org/2000/svg"
                                        >
                                          <path
                                            d="M7.33325 11.6667C7.33325 5.22334 12.5566 0 18.9999 0C25.4432 0 30.6666 5.22334 30.6666 11.6667C30.6666 18.11 25.4432 23.3333 18.9999 23.3333C12.5566 23.3333 7.33325 18.11 7.33325 11.6667ZM18.9999 18.6667C22.8659 18.6667 25.9999 15.5327 25.9999 11.6667C25.9999 7.80067 22.8659 4.66667 18.9999 4.66667C15.1339 4.66667 11.9999 7.80067 11.9999 11.6667C11.9999 15.5327 15.1339 18.6667 18.9999 18.6667Z"
                                            fill="#F7F7FC"
                                          />
                                          <path
                                            d="M5.80059 31.134C2.29991 34.6347 0.333252 39.3826 0.333252 44.3333H4.99992C4.99992 40.6203 6.47491 37.0593 9.10042 34.4338C11.7259 31.8083 15.2869 30.3333 18.9999 30.3333C22.713 30.3333 26.2739 31.8083 28.8994 34.4338C31.5249 37.0593 32.9999 40.6203 32.9999 44.3333H37.6666C37.6666 39.3826 35.6999 34.6347 32.1992 31.134C28.6986 27.6333 23.9506 25.6667 18.9999 25.6667C14.0492 25.6667 9.30127 27.6333 5.80059 31.134Z"
                                            fill="#F7F7FC"
                                          />
                                        </svg>
                                      )}
                                    </div>
                                    <div className="creating-groups__mainBlock-avatar-plus">
                                      <svg
                                        width="24"
                                        height="24"
                                        viewBox="0 0 24 24"
                                        fill="none"
                                        xmlns="http://www.w3.org/2000/svg"
                                      >
                                        <path
                                          d="M12 22C6.47967 21.994 2.00606 17.5204 2 12V11.8C2.10993 6.30455 6.63459 1.92797 12.1307 2.0009C17.6268 2.07382 22.0337 6.5689 21.9978 12.0654C21.9619 17.5618 17.4966 21.9989 12 22ZM7 11V13H11V17H13V13H17V11H13V7.00002H11V11H7Z"
                                          fill="#F7F7FC"
                                        />
                                      </svg>
                                    </div>
                                  </div>
                                  <div className="creating-groups__mainBlock-inputs">
                                    <Box
                                      component="form"
                                      sx={{
                                        backgroundColor: "var(--neutral-dark)", // фон
                                        width: "327px", // ширина

                                        borderRadius: "4px",

                                        "& .MuiSelect-select": {
                                          display: "flex",
                                          alignItems: "center", // вирівнює контент по вертикалі
                                          height: "100%", // забирає зайвий простір
                                          padding: "10px", // додає відступи всередині
                                          color: "var(--neutral-off-white)", // колір тексту всередині
                                        },
                                        "& .MuiOutlinedInput-notchedOutline": {
                                          border: "none", // прибираємо рамку
                                        },
                                        "& .MuiSelect-icon": {
                                          top: "50%", // вирівнюємо іконку по центру
                                          transform: "translateY(-50%)", // забезпечує вертикальне центрування
                                        },
                                      }}
                                      noValidate
                                      autoComplete="off"
                                    >
                                      <TextField
                                        sx={{
                                          backgroundColor:
                                            "var(--neutral-dark)", // фон
                                          borderRadius: "4px",
                                          width: "327px", // ширина
                                          color: "var(--neutral-off-white)", // колір тексту
                                          "& .MuiInputBase-input": {
                                            color: "var(--neutral-off-white)", // колір тексту в полі введення
                                          },
                                          "& .MuiFormLabel-root": {
                                            color: "var(--neutral-off-white)", // колір тексту мітки
                                          },
                                          "& .MuiOutlinedInput-notchedOutline":
                                            {
                                              borderColor:
                                                "var(--neutral-off-white)", // колір рамки
                                            },
                                        }}
                                        value={nameGroups}
                                        onChange={(e) =>
                                          setNameGruops(e.target.value)
                                        }
                                        id="outlined-basic"
                                        label="Name Groups (Required)"
                                        variant="outlined"
                                      />
                                    </Box>
                                  </div>
                                  <div className="creating-groups__mainBlock-button">
                                    <ButtonBlue
                                      textButton="Create"
                                      onClick={CreateGropus}
                                    />
                                  </div>
                                </div>
                              </div>
                            )}
                          </div>
                        </div>
                      ) : (
                        <div className="modal-window__groups-search">
                          <input type="text" className="modal-window__input" />
                        </div>
                      )}
                    </div>
                  )}
                </div>
              </div>
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
