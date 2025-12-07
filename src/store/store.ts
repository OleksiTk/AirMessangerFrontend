import { configureStore } from "@reduxjs/toolkit";
import counterReducer from "./getBackgroundInChats";
import themeReducer from "./themeSlice";
export const store = configureStore({
  reducer: {
    counter: counterReducer,
    theme: themeReducer,
    // user: userReducer, // тут додаються інші слайси
  },
});

// Типізація для TypeScript (дуже важливо!)
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
