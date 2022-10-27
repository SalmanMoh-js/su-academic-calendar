import { createStore, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import { masterReducer } from '../Reducers/masterReducer';
import autoMergeLevel2 from 'redux-persist/lib/stateReconciler/autoMergeLevel2';
import { persistStore, persistReducer } from 'redux-persist';
import AsyncStorage from '@react-native-async-storage/async-storage';

const persistConfig = {
  key: 'root',
  storage: AsyncStorage,
  stateReconciler: autoMergeLevel2,
};
const persistedReducer = persistReducer(persistConfig, masterReducer);
export const store = createStore(persistedReducer, applyMiddleware(thunk));

export const persistor = persistStore(store);
