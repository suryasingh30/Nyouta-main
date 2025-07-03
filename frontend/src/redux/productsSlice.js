import { createSlice } from "@reduxjs/toolkit";

const productSlice = createSlice({
    name: 'product',
    initialState: {
        photoBooksProducts: [],

        freeGreetingsProducts: [],

        weddingProducts: [],

        selectedProduct: null,

        allProducts: [],
    },
    reducers: {
        setPhotoBooksProducts : (state, action)=>{
            state.photoBooksProducts = action.payload
        },
        setFreeGreetingsProducts : (state, action)=>{
            state.freeGreetingsProducts = action.payload
        },
        setWeddingProducts : (state, action)=>{
            state.weddingProducts = action.payload
        },
        setSelectedProduct : (state, action)=>{
            state.selectedProduct = action.payload
        },
        setAllProduct : (state, action)=>{
            state.allProducts = action.payload
        }
    }
})

export const { setPhotoBooksProducts, setFreeGreetingsProducts, setWeddingProducts, setSelectedProduct, setAllProduct } = productSlice.actions;
export default productSlice.reducer