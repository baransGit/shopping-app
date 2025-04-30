import { combineReducers } from '@reduxjs/toolkit'
import productReducer from '../../features/product/slice'
import cartReducer from '../../features/cart/slice'

const rootReducer = combineReducers({
    products: productReducer,
    cart: cartReducer
})

export type RootState = ReturnType<typeof rootReducer>
export default rootReducer