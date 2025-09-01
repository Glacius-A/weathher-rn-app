import { combineReducers, configureStore, Reducer } from "@reduxjs/toolkit";
import userSlice from "./userSlice";
import weatherCurrentSlice from "./weatherCurrentSlice";
import weatherOtherSlice from "./weatherOtherSlice";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { persistReducer, persistStore } from "redux-persist";

const persistConfig = (key: string) => ({
  key,
  storage: AsyncStorage,
});

const rootReducer = combineReducers({
  user: persistReducer(persistConfig("user"), userSlice),
  weatherCurrent: persistReducer(
    persistConfig("weatherCurrent"),
    weatherCurrentSlice
  ),
  weatherOther: persistReducer(
    persistConfig("weatherOther"),
    weatherOtherSlice
  ),
});

export type RootStateReducer = ReturnType<typeof rootReducer>;

const appReducer = (state: RootStateReducer | undefined, action: any) => {
  // console.log('ACTION', action.type);
  if (action.type === "auth/logout") {
    AsyncStorage.removeItem("persist:root");
    return rootReducer(undefined, action);
  }
  return rootReducer(state, action);
};

const store = configureStore({
  reducer: appReducer,
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
export type AppStore = typeof store;

export default store;
export const persistor = persistStore(store);
