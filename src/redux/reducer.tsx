import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { v4 as uuidv4 } from "uuid";

//Setting the notes structure
interface noteObject {
  value: string;
  id: string;
  checked: boolean;
}

//Initialize the initial array of object 'notes'

//Create action and reducers without typecheck
const todosSlice = createSlice({
  name: "todos",
  initialState: [] as noteObject[],
  reducers: {
  //state is the initial value, action is what you passed into parameter as value to update the state 
    addNote: (state, action: PayloadAction<noteObject>) => [
      ...state,
      action.payload,
    ],
    
    deleteNote: (state, action: PayloadAction<noteObject>) =>
      state.filter((note) => note !== action.payload),
  },
});


export const {addNote, deleteNote} = todosSlice.actions;
export default todosSlice.reducer; 
