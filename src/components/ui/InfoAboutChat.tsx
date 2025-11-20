import { useEffect, useRef, useState } from "react";
import "../../style/ui/modelWindowChatinfo.css";
import { userInfo } from "../../api/userInfo";
import { chatApi } from "../../api/chatApi";
function InfoAboutChat({
  isGroupChatCheck,
  isOpenModelInfoChat,
  nameProfile,
  avatarUser,
  nameUser,
  membersInGroup,
  isOnline,
}: {
  isGroupChatCheck: boolean;
  isOpenModelInfoChat: (value: boolean) => void;
  nameProfile: string;
  avatarUser: string;
  nameUser: string;
  membersInGroup?: Array<any>;
  isOnline?: boolean;
}) {
  const [isGroupChat, setIsGroupChat] = useState(isGroupChatCheck);
  const [chatsMembers, setChatsMembers] = useState(membersInGroup || []);
  const [isOpenAddPeople, setIsOpenAddPeople] = useState(false);
  const [findName, setFindName] = useState<string>("");
  const [arrayName, setArrayName] = useState<Array<any>>([]);
  const modalRef = useRef<HTMLDivElement>(null);

  // Закриття модалки при кліку на backdrop
  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (modalRef.current && !modalRef.current.contains(e.target as Node)) {
        isOpenModelInfoChat(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [isOpenModelInfoChat]);

  // Закриття по ESC
  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        isOpenModelInfoChat(false);
      }
    };

    document.addEventListener("keydown", handleEscape);
    return () => document.removeEventListener("keydown", handleEscape);
  }, [isOpenModelInfoChat]);

  async function FindUser() {
    try {
      if (!findName.trim()) {
        setArrayName([]);
        return;
      }

      const contacts = await userInfo.GetInfoContacts(findName);

      if (contacts && Array.isArray(contacts)) {
        setArrayName(contacts);
      }
    } catch (error) {
      console.error("Error finding user:", error);
    }
  }

  async function HandlerAddGroupsContacts(name_profile: string) {
    try {
      const addContacts = await chatApi.addToGroupsUser(name_profile);

      if (addContacts) {
        const userToAdd = arrayName.find(
          (u) => u.name_profile === name_profile
        );

        if (userToAdd) {
          setChatsMembers((prev) => [...prev, { user: userToAdd }]);
        }
      }
    } catch (error) {
      console.log(error);
    }
  }

  useEffect(() => {
    const timeoutId = setTimeout(() => {
      FindUser();
    }, 300); // Debounce 300ms

    return () => clearTimeout(timeoutId);
  }, [findName]);
  return (
    <div className="model-info-chat" ref={modalRef}>
      <div className="model-info-chat__container">
        {isGroupChat ? (
          <>
            {isOpenAddPeople ? (
              <div className="model-info-chat__group-chat--search-people">
                <div className="model-info-chat__group-chat--search-people--header">
                  <span
                    onClick={() => {
                      setIsOpenAddPeople(false);
                    }}
                    className="model-info-chat__group-chat--search-people--header--back-arrow"
                  >
                    <img
                      className="model-info-chat__group-chat--search-people--header--back-arrow-img"
                      src="/assets/arrow.png"
                      alt="close"
                    />
                  </span>
                  <h2>Add People</h2>
                </div>
                <div className="model-info-chat__group-chat--search-people--body">
                  <input
                    onChange={(e) => setFindName(e.target.value)}
                    value={findName}
                    type="text"
                    placeholder="Search people"
                    className="model-info-chat__group-chat--search-people--body--input"
                  />
                </div>
                <div className="model-info-chat__group-chat--search-people--footer">
                  <div className="model-info-chat__group-chat--search-people--footer--members-list">
                    {arrayName.map((user, index) => (
                      <div
                        key={index}
                        className="model-info-chat__group-chat--search-people--footer--members-item"
                      >
                        <img
                          src={user.avatar}
                          alt="member-avatar"
                          className="model-info-chat__group-chat--search-people--footer--members-item--avatar"
                        />
                        <span className="model-info-chat__group-chat--search-people--footer--members-item--name">
                          {user.name_profile}
                        </span>
                        <button
                          onClick={() => {
                            HandlerAddGroupsContacts(user.name_profile);
                          }}
                          className="model-info-chat__group-chat--search-people--footer--members-item--add-button"
                        >
                          +
                        </button>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            ) : (
              <div className="model-info-chat__group-chat">
                <div className="model-info-chat__group-chat--header">
                  <h2>Group Info</h2>
                  <span
                    onClick={() => {
                      isOpenModelInfoChat(false);
                      setIsGroupChat(false);
                    }}
                    className="model-info-chat__group-chat--header--close"
                  >
                    <img
                      className="model-info-chat__group-chat--header--close-img"
                      src="/assets/x-button.png"
                      alt="close"
                    />
                  </span>
                </div>
                <div className="model-info-chat__group-chat--body">
                  <div className="model-info-chat__group-chat-avatar">
                    <img
                      src={avatarUser}
                      alt="avatar"
                      className="model-info-chat__group-chat-avatar-img"
                    />
                  </div>
                  <div className="model-info-chat__group-chat-name">
                    {nameProfile}
                    <div className="model-info-chat__group-chat-name--members">
                      Members {chatsMembers.length}
                    </div>
                  </div>
                </div>
                <hr className="separator" />
                <div className="model-info-chat__group-chat--footer">
                  <div className="model-info-chat__group-chat--footer--members">
                    <img
                      src="/assets/group-chat (2).png"
                      alt="Members Icon"
                      className="model-info-chat__group-chat--footer-icon"
                    />
                    <div className="model-info-chat__group-chat--footer-title">
                      Members
                    </div>
                    <div
                      className="model-info-chat__group-chat--footer--add-people"
                      onClick={() => {
                        setIsOpenAddPeople(true);
                      }}
                    >
                      <img src="/assets/invite.png" alt="" />
                    </div>
                  </div>

                  <div className="model-info-chat__group-chat--footer--members-list">
                    {chatsMembers.map((member, index) => (
                      <div
                        key={index}
                        className="model-info-chat__group-chat--footer--member-item"
                      >
                        <img
                          src={member.user.avatar}
                          alt="member-avatar"
                          className="model-info-chat__group-chat--footer--member-item--avatar"
                        />
                        <span className="model-info-chat__group-chat--footer--member-item--name">
                          {member.user.name} {member.user.last_name}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            )}
          </>
        ) : (
          <div className="model-info-chat__single-chat">
            <div className="model-info-chat__single-chat--header">
              <h2 className="model-info-chat__single-chat--header--title">
                User Info
              </h2>
              <span
                onClick={() => {
                  isOpenModelInfoChat(false);
                }}
                className="model-info-chat__single-chat--header--close"
              >
                <img
                  className="model-info-chat__single-chat--header--close-img"
                  src="/assets/x-button.png"
                  alt="close"
                />
              </span>
            </div>
            <div className="model-info-chat__single-chat--body">
              <div className="model-info-chat__single-chat-avatar">
                <img
                  src={avatarUser}
                  alt="avatar"
                  className={`model-info-chat__single-chat-avatar-img ${
                    isOnline ? "online" : "offline"
                  }`}
                />
              </div>
              <div className="model-info-chat__single-chat-name">
                {nameUser}
              </div>
            </div>
            <hr className="separator" />
            <div className="model-info-chat__single-chat--footer">
              <div className="model-info-chat__single-chat--mobile">
                <span className="model-info-chat__single-chat--mobile--icon">
                  <img
                    src="/assets/information.png"
                    className="model-info-chat__single-chat--mobile--icon-img"
                    alt="phone"
                  />
                </span>
                <div className="model-info-chat__single-chat--mobile--info">
                  +111 222 333
                  <p className="model-info-chat__single-chat--mobile--info--label">
                    Mobile
                  </p>
                </div>
              </div>
              <div className="model-info-chat__single-chat--username">
                <span className="model-info-chat__single-chat--username--icon">
                  <img
                    src="/assets/id-card.png"
                    className="model-info-chat__single-chat--username--icon-img"
                    alt="phone"
                  />
                </span>
                <span className="model-info-chat__single-chat--username--info">
                  {nameProfile}
                  <p className="model-info-chat__single-chat--username--info--label">
                    Username
                  </p>
                </span>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default InfoAboutChat;
