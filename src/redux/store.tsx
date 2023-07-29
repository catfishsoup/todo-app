import todoReducer from "./reducer";
import countReducer from './count_reducer'
import { configureStore } from "@reduxjs/toolkit";

export const store = configureStore({
  reducer: {
    //Naming reducer here
    todo: todoReducer,
    count: countReducer, 
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
