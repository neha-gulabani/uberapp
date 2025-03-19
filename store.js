import { configureStore } from "@reduxjs/toolkit";
import navReducer from './slices/navSlices'
//configuring the redux store to dispatch and retrieve data
export const store = configureStore({
    reducer: {
        nav: navReducer
    }
})