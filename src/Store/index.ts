import { configureStore, combineReducers } from "@reduxjs/toolkit";
import { userReducer } from "./UserReducer";
import thunk from "redux-thunk";
import { linkReducer } from "./LinkReducer";

const rootReducer = combineReducers({
  user: userReducer,
  goal: linkReducer,
});

export const store = configureStore({
  reducer: rootReducer,
  middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(thunk),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
