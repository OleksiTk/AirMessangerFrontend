import ArrowBackIosIcon from "@mui/icons-material/ArrowBackIos";
import LogoutIcon from "@mui/icons-material/Logout";
import { useNavigate } from "react-router-dom";
import "../style/pages/accounts.css";
import { useEffect, useRef, useState } from "react";
import Avatar from "../components/ui/Avatar";
import { ButtonBlue } from "../components/ui/ButtonBlue";
import { userInfo } from "../api/userInfo";
import { ToastContainer, toast } from "react-toastify";
import { authApi } from "../api/authApi";

function Account() {
  const navigate = useNavigate();
  const [selectedAvatar, setSelectedAvatar] = useState<File | null>(null);
  const [avatar, setAvatar] = useState<string | null>("");
  const [name, setName] = useState("");
  const [lastName, setLastName] = useState("");
  const firstFetching = useRef(true);

  const handleAvatarChange = (base64Image: File | null) => {
    setSelectedAvatar(base64Image);
    console.log("Отримали картинку в батьківському компоненті:", base64Image);
  };

  const fetchDataUser = async () => {
    try {
      const fetchData = await userInfo.GetInfoUser();
      if (fetchData) {
        console.log("succes", fetchData);
        setName(fetchData[0].name);
        setLastName(fetchData[0].last_name);
        setAvatar(fetchData[0].avatar);
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    if (firstFetching.current) {
      fetchDataUser();
      firstFetching.current = false;
    }
  }, []);

  const handlerSaveProfile = async () => {
    try {
      if (!name || !lastName) {
        toast.warn(`${"please write all fields"}`, {
          position: "top-right",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: false,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "dark",
        });
        console.log("нема полів", name, lastName, avatar);
        return;
      }

      let compressedFileString: string | null = null;
      if (selectedAvatar) {
        const compressedFile = await compressImage(selectedAvatar);
        compressedFileString = await fileToBase64(compressedFile);
      }

      console.log("Compressed file (base64):", compressedFileString);
      const switchNewDataForProfile = await userInfo.ChangeInfoProfile(
        compressedFileString,
        name,
        lastName
      );
      console.log("succes switch data profile", switchNewDataForProfile);
    } catch (error) {
      console.log(error);
    }
  };

  const handleLogout = () => {
    // Очищаємо всі cookies
    document.cookie.split(";").forEach((c) => {
      document.cookie = c
        .replace(/^ +/, "")
        .replace(/=.*/, "=;expires=" + new Date().toUTCString() + ";path=/");
    });
    const clearToken = authApi.logout();
    console.log("logout token", clearToken);
    if (clearToken) {
      navigate("/");
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
        resolve(reader.result as string);
      };
      reader.onerror = (error) => {
        reject(error);
      };
    });
  }

  return (
    <div className="account">
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
      <header className="account__header">
        <div onClick={() => navigate(-1)} className="account__header-back">
          <ArrowBackIosIcon sx={{ color: "white" }} />
        </div>
        <button onClick={handleLogout} className="account__header-logout">
          <LogoutIcon sx={{ fontSize: 20, marginRight: "8px" }} />
          Logout
        </button>
      </header>
      <main className="account__main-container">
        <div className="account__main-avatar">
          <Avatar onAvatarChange={handleAvatarChange} avatarUrl={avatar} />
        </div>
        <div className="account__main-fields">
          <input
            type="text"
            className="account__input"
            placeholder="First Name (Required)"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
          <input
            type="text"
            className="account__input"
            placeholder="Last Name (Required)"
            value={lastName}
            onChange={(e) => setLastName(e.target.value)}
          />
        </div>
        <div className="account__main-save-button">
          <ButtonBlue onClick={handlerSaveProfile} textButton="Save" />
        </div>
      </main>
      <footer className="account__footer"></footer>
    </div>
  );
}

export default Account;
