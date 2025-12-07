import { createSlice, type PayloadAction } from "@reduxjs/toolkit";

interface CounterState {
  value: number;
}

const initialState: CounterState = {
  value: 0,
};

export const counterSlice = createSlice({
  name: "counter",
  initialState,
  reducers: {
    increment: (state) => {
      // В RTK можна писати "мутабельно", під капотом працює Immer
      state.value += 1;
    },
    decrement: (state) => {
      state.value -= 1;
    },
    incrementByAmount: (state, action: PayloadAction<number>) => {
      state.value += action.payload;
    },
  },
});

// Експортуємо екшени для використання в компонентах
export const { increment, decrement, incrementByAmount } = counterSlice.actions;

// Експортуємо редюсер для стору
export default counterSlice.reducer;
