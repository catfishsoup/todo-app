import { PayloadAction, createSlice } from "@reduxjs/toolkit";

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
    
    deleteNote: (state, action: PayloadAction<string>) =>
      state.filter(note => note.id !== action.payload), 
      
    crossNote: (state, action: PayloadAction<noteObject>) => 
      state.map((note) => {
        if(note.id === action.payload.id) {
          console.log('check?', action.payload)
          return {...note, checked: !action.payload.checked}
        }
        return note
      })
    
    
  },
});


//Exporting individually
export const {addNote, deleteNote, crossNote} = todosSlice.actions;
export default todosSlice.reducer; 
