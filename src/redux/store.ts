import { configureStore } from "@reduxjs/toolkit";
import authReducer from "./features/auth/authSlice";
import userReducer from "./features/user/userSlice";
import { baseApi } from "./api/baseApi";
import bikeCompareReducer from "./features/bike/bikeCompareSlice";
import {
  persistReducer,
  persistStore,
  FLUSH,
  REHYDRATE,
  PAUSE,
  PERSIST,
  PURGE,
  REGISTER,
} from "redux-persist";
import storage from "redux-persist/lib/storage";

const persistConfig = {
  key: "auth",
  storage,
};
const persistConfigUser = {
  key: "coupon",
  storage,
};
const persistConfigBikeCompare = {
  key: "bike",
  storage,
};

const persistAuthReducer = persistReducer(persistConfig, authReducer);
const persistUserReducer = persistReducer(persistConfigUser, userReducer);
const persisBikeCompareReducer = persistReducer(
  persistConfigBikeCompare,
  bikeCompareReducer
);

export const store = configureStore({
  reducer: {
    [baseApi.reducerPath]: baseApi.reducer,
    auth: persistAuthReducer,
    user: persistUserReducer,
    bikeCompare: persisBikeCompareReducer,
  },
  middleware: (getDefaultMiddlewares) =>
    getDefaultMiddlewares({
      serializableCheck: {
        ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
      },
    }).concat(baseApi.middleware),
});
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
export const persistor = persistStore(store);
