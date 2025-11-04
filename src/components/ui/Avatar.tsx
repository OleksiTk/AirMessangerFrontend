import { useEffect, useRef, useState } from "react";
interface AvatarProps {
  onAvatarChange?: (base64Image: File | null) => void;
  avatarUrl?: string | null;
}
function Avatar({ onAvatarChange, avatarUrl }: AvatarProps) {
  const [avatar, setAvatar] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  // Функція для відкриття файлового вибору
  const handleAvatarClick = () => {
    fileInputRef.current?.click();
  };
  useEffect(() => {
    if (avatarUrl) {
      setAvatar(avatarUrl);
    }
  }, [avatarUrl]);
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
      onAvatarChange?.(file);
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

  return (
    <div className="registrationpagesaccount__mainBlock-avatar">
      <input
        ref={fileInputRef}
        type="file"
        accept="image/*"
        onChange={handleFileChange}
        style={{ display: "none" }}
      />
      <div
        className="registrationpagesaccount__mainBlock-avatar-img"
        onClick={handleAvatarClick}
        style={{
          backgroundImage: avatar ? `url(${avatar})` : "none",
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
      >
        {!avatar && (
          <svg
            className="registrationpagesaccount__mainBlock-avatar-img-svg"
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
      <div className="registrationpagesaccount__mainBlock-avatar-plus">
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
  );
}

export default Avatar;
