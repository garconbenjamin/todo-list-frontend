import type { Action, ThunkAction } from "@reduxjs/toolkit";
import { combineSlices, configureStore } from "@reduxjs/toolkit";
import { setupListeners } from "@reduxjs/toolkit/query";
import {
  persistStore,
  persistReducer,
  FLUSH,
  REHYDRATE,
  PAUSE,
  PERSIST,
  PURGE,
  REGISTER,
} from "redux-persist";
import { PersistGate } from "redux-persist/integration/react";
import storage from "redux-persist/lib/storage";

import { taskSlice } from "./reducers/taskSlice";
import { userSlice } from "./reducers/userSlice";

const persistConfig = {
  key: "root",
  version: 1,
  storage,
  whitelist: ["user"],
};
const rootReducer = combineSlices(userSlice, taskSlice);
const persistedReducer = persistReducer(persistConfig, rootReducer);

export type RootState = ReturnType<typeof rootReducer>;

const makeStore = () => {
  const store = configureStore({
    reducer: persistedReducer,
    middleware: (getDefaultMiddleware) =>
      getDefaultMiddleware({
        serializableCheck: {
          ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
        },
      }),

    devTools: process.env.NODE_ENV !== "production",
  });

  setupListeners(store.dispatch);
  return store;
};

const store = makeStore();
const persistor = persistStore(store);

export { PersistGate, store, persistor };
export type AppStore = typeof store;

export type AppDispatch = AppStore["dispatch"];
export type AppThunk<ThunkReturnType = void> = ThunkAction<
  ThunkReturnType,
  RootState,
  unknown,
  Action
>;
