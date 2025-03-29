import { configureStore } from "@reduxjs/toolkit";
import categoryReducer from "@/redux/actions/category_Slice"
import adminReducer from "@/redux/actions/adminSlice"
import customerReducer from "@/redux/actions/customerSlice";
import mediaReducer from "@/redux/actions/mediaSlice"
import brandReducer from "@/redux/actions/brandsSlice"
import productsReducer from "@/redux/actions/product_Slice"
import storeSellerReducer from "@/redux/actions/storeSellerSlice"


import storage from 'redux-persist/lib/storage';
import {  persistReducer } from "redux-persist";
import {combineReducers} from '@reduxjs/toolkit'
// import { version } from "os";


const persistConfig = {
  key: 'root',
  version:1,
  storage,
};

const rootReducer = combineReducers({
  category: categoryReducer, //
  admin:adminReducer,
  customer: customerReducer, 
  media: mediaReducer,
  brand: brandReducer,
  products: productsReducer,
  storeSeller: storeSellerReducer,



});
const persistedReducer = persistReducer(persistConfig, rootReducer);


export const store = configureStore({
  reducer: persistedReducer,
    devTools: import.meta.env.MODE !== "production",
    middleware: (getDefaultMiddleware) =>
      getDefaultMiddleware({
        serializableCheck: {
          // Ignore these paths for non-serializable checks
          ignoredActions: ['persist/PERSIST'],
          ignoredPaths: ['register'], // Ignore the specific non-serializable value
        },
      }),
  });

  export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
