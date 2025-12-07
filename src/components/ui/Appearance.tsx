import React, { useState } from "react";
import { useAppDispatch, useAppSelector } from "../../store/hooks"; // Твої хуки
import { setPrimaryColor, setThemePreset } from "../../store/themeSlice";
import styles from "../../style/pages/Appearance.module.css";
import ArrowBackIosIcon from "@mui/icons-material/ArrowBackIos";
import { useNavigate } from "react-router-dom";
import { userInfo } from "../../api/userInfo";
import { log } from "three";

const PRESET_COLORS = [
  { name: "Blue Ocean", primary: "#3b82f6", bg: "#eff6ff" },
  { name: "Forest", primary: "#10b981", bg: "#ecfdf5" },
  { name: "Love", primary: "#ec4899", bg: "#fdf2f8" },
  { name: "Dark Mode", primary: "#6366f1", bg: "#1e293b" },
];

const Appearance = () => {
  const dispatch = useAppDispatch();
  const { primaryColor, backgroundColor } = useAppSelector(
    (state) => state.theme
  );
  const navigate = useNavigate();
  // Локальний стейт для кастомного кольору (щоб не диспатчити на кожен рух миші в color picker)
  const [customColor, setCustomColor] = useState(primaryColor);
  const setNewTheme = async (theme: string) => {
    dispatch(setPrimaryColor(theme));
    try {
      const response = await userInfo.setTheme(theme);
      if (response) {
        console.log("Theme updated successfully", response);
      }
    } catch (error) {
      console.log(error);
    }
  };
  const handleColorChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const color = e.target.value;
    setCustomColor(color);
    dispatch(setPrimaryColor(color));
    setNewTheme(color);
  };

  return (
    <div className={styles.container}>
      <div className={styles.buttonBack}>
        <div onClick={() => navigate(-1)} className={styles.buttonBackIcon}>
          <ArrowBackIosIcon sx={{ color: "white" }} />
        </div>
      </div>
      <div className={styles.containerBlocks}>
        {" "}
        <h2 className={styles.header}>Appearance Settings</h2>
        <div className={styles.containerBlocks}>
          {" "}
          <div
            className={styles.chatPreview}
            style={
              {
                "--primary-color": primaryColor,
                "--bg-color": backgroundColor,
              } as React.CSSProperties
            }
          >
            <div className={styles.chatHeader}>
              <div className={styles.avatar}></div>
              <div className={styles.name}>John Doe</div>
            </div>

            <div className={styles.chatBody}>
              <div className={`${styles.message} ${styles.incoming}`}>
                Hello what do you think about this color theme?
              </div>
              <div className={`${styles.message} ${styles.outgoing}`}>
                It looks great! I really like this color.
              </div>
              <div className={`${styles.message} ${styles.incoming}`}>
                Glad to hear that 😊
              </div>
            </div>

            <div className={styles.chatInput}>
              <div className={styles.inputPlaceholder}>Write a message...</div>
              <div className={styles.sendBtn}>➤</div>
            </div>
          </div>
        </div>
        <div className={styles.controls}>
          <h3 className={styles.presetsHeader}>Choose a theme</h3>

          <div className={styles.presets}>
            {PRESET_COLORS.map((preset) => (
              <button
                onClick={() => {
                  setNewTheme(preset.primary);
                  dispatch(setThemePreset(preset));
                }}
                key={preset.name}
                className={styles.presetBtn}
                style={{ backgroundColor: preset.primary }}
              >
                {preset.name}
              </button>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Appearance;
