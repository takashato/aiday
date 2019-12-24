import {applyMiddleware, createStore} from 'redux';
import {persistStore, persistReducer} from "redux-persist";
import thunk from "redux-thunk";
import AsyncStorage from "@react-native-community/async-storage";
import reducers from "./reducers/reducer";

const persistConfig = {
    key: 'root',
    storage: AsyncStorage,
};

const persistedReducer = persistReducer(persistConfig, reducers);

const store = createStore(persistedReducer, applyMiddleware(thunk));
export const persistor = persistStore(store);

export default store;
