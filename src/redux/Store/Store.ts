import {configureStore} from "@reduxjs/toolkit"
import { authApi } from "../Actions/Authapi";
import { Predictapi } from "../Actions/Predictapi";
const store = configureStore({
    reducer:{
        [authApi.reducerPath]:authApi.reducer,
        [Predictapi.reducerPath]:Predictapi.reducer
    },
    middleware:(getDefaultMiddleWare)=>getDefaultMiddleWare({
        serializableCheck:true,
    }).concat([authApi.middleware,Predictapi.middleware]),
})
export default store;
