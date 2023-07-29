import { PayloadAction, createSlice } from "@reduxjs/toolkit";


interface noteCount {
    ongoing: number,
    complete: number, 
}

const initialState: noteCount = {
    ongoing: 0, 
    complete: 0
}

const countSlice = createSlice({
    name: "count", 
    initialState,
    reducers: {
        add: (state) => {state.ongoing += 1},

        subtract: (state) => {state.complete -= 1}, 
    }
})

export const { add, subtract } = countSlice.actions;
export default countSlice.reducer;