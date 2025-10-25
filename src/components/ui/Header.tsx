import { useEffect, useState } from "react";
import "../../style/pages/header.css";
import { userInfo } from "../../api/userInfo";
import { contactsApi } from "../../api/contacts";
import { socket } from "../../socket/socket";
function Header({ Pages }: { Pages: string }) {
  useEffect(() => {
    setActivePage(Pages);
    handleChangePage(Pages);
  }, [Pages]);
  const [activePage, setActivePage] = useState("");
  const [whatContent, setWhatContent] = useState("");
  const [name, setName] = useState("");
  const [modalWindow, setModalWindow] = useState(false);
  const [findName, setFindName] = useState<any[]>([]);
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

  useEffect(() => {
    FindUser();
  }, [name]);
  return (
    <header className={`header`}>
      <div className="header__text">{whatContent}</div>
      <div className="header__add-chats">
        {activePage == "chats" ? (
          <div>
            {modalWindow == true ? (
              <div className="modal-window">
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
