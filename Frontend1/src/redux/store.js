import {configureStore} from '@reduxjs/toolkit'
import userReducer from '../features/userSlice.js'
import productReducer from '../features/productSlice.js'
export const store=configureStore({
    reducer:{
        userData:userReducer,
        productData: productReducer,
    }
})