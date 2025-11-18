import { Container } from "@mui/material";
import { useEffect, useState } from "react";
import SearchInput from "./SearchInput";
import { useNavigate } from "react-router-dom";
import { contactsApi } from "../../api/contacts";
import { socket } from "../../socket/socket";
import { chatApi } from "../../api/chatApi";
import ChatSkeletonLoader from "./ChatSkeletonLoader";
interface Contact {
  id: number;
  avatar?: string | null;
  name?: string | null;
  name_profile?: string;
}

interface MappedContact {
  id?: number;
  avatar?: string | null;
  name?: string | null;
  name_profile: string;
}

function PeopleContacts({ Pages }: { Pages: string }) {
  const [activePage, setActivePage] = useState("");
  const [contacts, setContacts] = useState<MappedContact[]>([]);
  const [loading, setLoading] = useState(false);
  const [groups, setGroups] = useState<MappedContact[]>([]);
  const navigate = useNavigate();
  useEffect(() => {
    setActivePage(Pages);
    console.log("ця умова робить");

    // Встановлення підключення та слухання подій сокета
    socket.on("connect", () => {
      console.log("Підключено до серверу з id:", socket.id);
    });

    // Обробник для отримання нових доданих контактів
    socket.on("contacts_new_add", (data) => {
      console.log("Нове повідомлення про додавання контактів", data);

      // Оновлюємо список контактів після того, як додали новий контакт
      getContacts();
    });

    socket.on("disconnect", () => {
      console.log("Відключено від серверу");
    });

    // Очистка після демонтажу компонента
    return () => {
      socket.off("connect");
      socket.off("contacts_new_add");
      socket.off("disconnect");
    };
  }, [getContacts]);
  useEffect(() => {
    setActivePage(Pages);
  }, [Pages]);

  useEffect(() => {
    getContacts();
    getGroups();
  }, []);

  useEffect(() => {
    console.log("🔁 contacts updated:", contacts);
  }, [contacts]);

  async function getContacts() {
    try {
      setLoading(true);
      const response = await contactsApi.getContacts();
      console.log("contacts response", response);

      if (response && Array.isArray(response.data)) {
        const mappedContacts: MappedContact[] = response.data.map(
          (element: Contact) => ({
            id: element.id,
            avatar: element.avatar || "",
            name: element.name || "",
            name_profile: element.name_profile || "", // ✅ name_profile для URL
          })
        );

        setContacts(mappedContacts);
        console.log("mapped contacts:", mappedContacts);
      }
    } catch (error) {
      console.error("Error fetching contacts:", error);
    } finally {
      setLoading(false);
    }
  }
  async function getGroups() {
    try {
      setLoading(true);
      const response = await chatApi.getGroups();
      console.log("fetch groups", response);

      if (response) {
        const mappedContacts = response.getGroups.result.map(
          (element: any) => ({
            id: element.id,
            avatar: element.chat.avatar || "",
            name: element.chat.name || "",
            name_profile: element.chat.name || "", // ✅ name_profile для URL
          })
        );

        setGroups(mappedContacts);
        console.log("mapped groups:", mappedContacts);
      }
    } catch (error) {
      console.error("Error fetching contacts:", error);
    } finally {
      setLoading(false);
    }
  }
  // Обробник для переходу до чату
  const handleNavigateToChat = (nameProfile: string) => {
    navigate(`/chat/${nameProfile}`); // ✅ Використовуємо name_profile як параметр
  };
  const handleNavigateToChatGroups = (nameProfile: string) => {
    navigate(`/chat-groups/${nameProfile}`); // ✅ Використовуємо name_profile як параметр
  };
  if (loading) {
    return (
      <div className="main__chats">
        <div className="main__chats-input-search">
          <Container maxWidth="sm" sx={{ paddingLeft: 0 }}>
            <SearchInput />
          </Container>
        </div>
        <ChatSkeletonLoader />
      </div>
    );
  }

  return (
    <div className="main__chats">
      <div className="main__chats-input-search">
        <Container maxWidth="sm" sx={{ paddingLeft: 0 }}>
          <SearchInput />
        </Container>
      </div>

      {contacts.map((element) => (
        <div
          className="main__chats-groups main-groups"
          onClick={() => handleNavigateToChat(element.name_profile)}
          key={element.id}
        >
          <div className="main-groups__icon">
            <img
              className="main-groups__icon-avatar"
              src={
                element.avatar ||
                "https://static.vecteezy.com/system/resources/previews/060/605/418/non_2x/default-avatar-profile-icon-social-media-user-free-vector.jpg"
              }
              alt="avatar"
            />
            <div className="main-groups__icon-active">
              <svg
                width="16"
                height="16"
                viewBox="0 0 16 16"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M8 1C11.866 1 15 4.13401 15 8C15 11.866 11.866 15 8 15C4.13401 15 1 11.866 1 8C1 4.13401 4.13401 1 8 1Z"
                  fill="#2CC069"
                  stroke="#F7F7FC"
                />
              </svg>
            </div>
          </div>
          <div className="main-groups__information">
            <div className="main-groups__information__name">{element.name}</div>
            <div className="main-groups__information__lastmessage">
              How is it going?
            </div>
          </div>
          {activePage == "chats" ? (
            <div className="main-groups__notifications main-notifications">
              <div className="main-notifications__days">17/6</div>
              <div className="main-notifications__count">3</div>
            </div>
          ) : (
            <div></div>
          )}
        </div>
      ))}
      {groups.map((element) => (
        <div
          className="main__chats-groups main-groups"
          onClick={() => handleNavigateToChatGroups(element.name_profile)}
          key={element.id}
        >
          <div className="main-groups__icon">
            <img
              className="main-groups__icon-avatar"
              src={
                element.avatar ||
                "https://static.vecteezy.com/system/resources/previews/060/605/418/non_2x/default-avatar-profile-icon-social-media-user-free-vector.jpg"
              }
              alt="avatar"
            />
            <div className="main-groups__icon-active">
              <svg
                width="16"
                height="16"
                viewBox="0 0 16 16"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M8 1C11.866 1 15 4.13401 15 8C15 11.866 11.866 15 8 15C4.13401 15 1 11.866 1 8C1 4.13401 4.13401 1 8 1Z"
                  fill="#2CC069"
                  stroke="#F7F7FC"
                />
              </svg>
            </div>
          </div>
          <div className="main-groups__information">
            <div className="main-groups__information__name">{element.name}</div>
            <div className="main-groups__information__lastmessage">
              How is it going?
            </div>
          </div>
          {activePage == "chats" ? (
            <div className="main-groups__notifications main-notifications">
              <div className="main-notifications__days">17/6</div>
              <div className="main-notifications__count">3</div>
            </div>
          ) : (
            <div></div>
          )}
        </div>
      ))}
    </div>
  );
}

export default PeopleContacts;
