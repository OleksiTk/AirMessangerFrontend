import { TextField } from "@mui/material";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import Box from "@mui/material/Box";
import { ButtonBlue } from "../components/ui/ButtonBlue";

import { userInfo } from "../api/userInfo";
import Avatar from "../components/ui/Avatar";
function RegistrationPagesAccount() {
  const [name, setName] = useState("");
  const [lastName, setLastName] = useState("");
  const navigate = useNavigate();
  const [selectedAvatar, setSelectedAvatar] = useState<File | null>(null);

  const handleSubmit = async () => {
    try {
      if (!name || !lastName) {
        alert("Будь ласка, заповніть усі поля");
        return;
      }

      let compressedFileString: string | null = null;

      // Конвертуємо File у string (base64)
      if (selectedAvatar) {
        const compressedFile = await compressImage(selectedAvatar);
        compressedFileString = await fileToBase64(compressedFile);
      }

      console.log("Compressed file (base64):", compressedFileString);

      const registerAccount = await userInfo.ChangeInfoProfile(
        compressedFileString, // ← Тепер це string, а не File
        name,
        lastName
      );

      if (registerAccount) {
        console.log("User:", registerAccount);

        navigate("/chats");
      }
    } catch (error) {
      console.error(error);
    } finally {
    }
  };

  const handleAvatarChange = (base64Image: File | null) => {
    setSelectedAvatar(base64Image);
    console.log("Отримали картинку в батьківському компоненті:", base64Image);
  };
  // Функція обробки вибраного файлу

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
    <div className="registrationpagesaccount">
      <div className="registrationpagesaccount-container">
        <div className="registrationpagesaccount__backBlock">
          <div className="registrationpagesaccount__backBlock-button">
            <Link
              to={"/registrationStep3Telephone"}
              className="registrationPagesstepone__backButton"
            >
              <svg
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M8.28796 12L14.298 18.01L15.712 16.596L11.112 11.996L15.712 7.39599L14.298 5.98999L8.28796 12Z"
                  fill="#F7F7FC"
                />
              </svg>
            </Link>
          </div>
          <div className="registrationpagesaccount__backBlock-text">
            Your Profile
          </div>
        </div>
        <div className="registrationpagesaccount__mainBlock">
          <Avatar onAvatarChange={handleAvatarChange} />
          <div className="registrationpagesaccount__mainBlock-inputs">
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
                  backgroundColor: "var(--neutral-dark)", // фон
                  borderRadius: "4px",
                  width: "327px", // ширина
                  color: "var(--neutral-off-white)", // колір тексту
                  "& .MuiInputBase-input": {
                    color: "var(--neutral-off-white)", // колір тексту в полі введення
                  },
                  "& .MuiFormLabel-root": {
                    color: "var(--neutral-off-white)", // колір тексту мітки
                  },
                  "& .MuiOutlinedInput-notchedOutline": {
                    borderColor: "var(--neutral-off-white)", // колір рамки
                  },
                }}
                value={name}
                onChange={(e) => setName(e.target.value)}
                id="outlined-basic"
                label="First Name (Required)"
                variant="outlined"
              />
            </Box>
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
                  backgroundColor: "var(--neutral-dark)", // фон
                  borderRadius: "4px",
                  width: "327px", // ширина
                  color: "var(--neutral-off-white)", // колір тексту
                  "& .MuiInputBase-input": {
                    color: "var(--neutral-off-white)", // колір тексту в полі введення
                  },
                  "& .MuiFormLabel-root": {
                    color: "var(--neutral-off-white)", // колір тексту мітки
                  },
                  "& .MuiOutlinedInput-notchedOutline": {
                    borderColor: "var(--neutral-off-white)", // колір рамки
                  },
                }}
                value={lastName}
                onChange={(e) => setLastName(e.target.value)}
                id="outlined-basic"
                label="Last Name (Optional)"
                variant="outlined"
              />
            </Box>
          </div>
        </div>
        <div className="registrationpagesaccount__buttonSubmit">
          <div>
            <ButtonBlue textButton="Save" onClick={handleSubmit} />
          </div>
        </div>
      </div>
    </div>
  );
}

export default RegistrationPagesAccount;
