import { createSlice, type PayloadAction } from "@reduxjs/toolkit";

interface ThemeState {
  primaryColor: string;
  backgroundColor: string;
}

const initialState: ThemeState = {
  primaryColor: "#3b82f6", // Дефолтний синій
  backgroundColor: "#f3f4f6", // Дефолтний сірий фон
};

export const themeSlice = createSlice({
  name: "theme",
  initialState,
  reducers: {
    setPrimaryColor: (state, action: PayloadAction<string>) => {
      state.primaryColor = action.payload;
    },
    setThemePreset: (
      state,
      action: PayloadAction<{ primary: string; bg: string }>
    ) => {
      state.primaryColor = action.payload.primary;
      state.backgroundColor = action.payload.bg;
    },
  },
});

export const { setPrimaryColor, setThemePreset } = themeSlice.actions;
export default themeSlice.reducer;
