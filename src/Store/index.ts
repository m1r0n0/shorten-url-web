import { configureStore, combineReducers } from "@reduxjs/toolkit";
import { UserIdReducer } from "./UserIdReducer";
import { userEmailReducer } from "./UserEmailReducer";
import thunk from "redux-thunk";

const rootReducer = combineReducers({
  userId: UserIdReducer,
  userEmail: userEmailReducer,
});

export const store = configureStore({
  reducer: rootReducer,
  middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(thunk),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
