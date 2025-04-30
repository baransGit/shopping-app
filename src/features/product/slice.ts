import {createSlice,PayloadAction} from '@reduxjs/toolkit'
import {Product} from './types/Product'

export interface ProductState {
    items: Product[]
    loading: boolean
    error: string | null
}

const initialState:ProductState = {
    items:[],
    loading:false,
    error:null,
}

const productSlice = createSlice({
    name:'products',
    initialState,
    reducers:{
        setLoading:(state,action:PayloadAction<boolean>)=>{
            state.loading = action.payload
        },
        setProducts:(state,action:PayloadAction<Product[]>)=>{
            state.items=action.payload
        },
        setError:(state,action:PayloadAction<string>)=>{
            state.error = action.payload
        },
    }
})

export const {setLoading,setProducts,setError} = productSlice.actions
export default productSlice.reducer