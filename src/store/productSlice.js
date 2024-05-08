import { createSlice } from "@reduxjs/toolkit";
export const STATUSES=Object.freeze({
    IDLE:'idle',
    ERROR:'error',
    LOADING:'loading',
})

const initialState=[];

const productSlice=createSlice({
    name:'productt',
    initialState:{
       data:[],
       status: STATUSES.IDLE,
    },

    reducers:{
        setProducts(state, action){
            //redux:
            state.data=action.payload

        },
        setStatus(state, action){
              state.status=action.payload
        },
    }
})

export const {setProducts,setStatus }=productSlice.actions;
export default productSlice.reducer;

//thunks
//the word 'thunk. is a programming term that means "a piece of code that does some delayed work
//Rather than execute some logic now. we can write afunction body or code that can be used to perform the work latet"
export function fetchProducts(){
    return async function fetchProducts(dispatch, getState){
        dispatch(setStatus(STATUSES.LOADING))
      try {
        const res= await fetch('https://fakestoreapi.com/products');
        const data= await res.json();
        dispatch(setProducts(data));
        dispatch(setStatus(STATUSES.IDLE));

      } catch (error) {
        console.log(error);
        dispatch(setStatus(STATUSES.IDLE));
      }
    }
}