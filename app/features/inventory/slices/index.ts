import { createSlice, type PayloadAction } from "@reduxjs/toolkit";


type UpdatePayload<T> = {
  id: string;
} & Partial<T>;

type WithId<T> = T & { id: string };

interface InventoryItem{
    name:string,
    price:number,
    measureUnit:string,
    images:string[]
    location:string,
    quantity:number,
    status:string
}



const inventorySlice = createSlice({
    name:'inventory',
    initialState:[] as WithId<InventoryItem>[],
    reducers:{
        addInventory:(state,action:PayloadAction<WithId<InventoryItem>>)=>{
           state.push(action.payload) 
        },
        updateInventory(state,action:PayloadAction<UpdatePayload<InventoryItem>>){
            return state.map(ele=>ele.id == action.payload.id ? {...ele,...action.payload} : ele )
        }
    }
})


export const {addInventory,updateInventory} = inventorySlice.actions
export default inventorySlice.reducer