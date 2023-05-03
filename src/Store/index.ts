import { configureStore, combineReducers } from "@reduxjs/toolkit";
import { userReducer } from "./UserReducer";
import thunk from "redux-thunk";
import { linkReducer } from "./LinkReducer";
import {disclaimerReducer} from "./DisclaimerReducer"

const rootReducer = combineReducers({
  user: userReducer,
  link: linkReducer,
  disclaimer: disclaimerReducer,
});

export const store = configureStore({
  reducer: rootReducer,
  middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(thunk),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
