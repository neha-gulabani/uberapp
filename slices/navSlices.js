import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    start: null,
    destination: null,
    travelTimeInformation: null
}

//create actions which will be dispatched

export const navSlices = createSlice({
    name: 'nav',
    initialState,
    reducers: {
        setStart: (state, action) => {
            state.start = action.payload;
        },
        setDest: (state, action) => {
            state.destination = action.payload;
        },
        setTravelTimeInfo: (state, action) => {
            state.travelTimeInformation = action.payload;
        }
    }
});

export const { setStart, setDest, setTravelTimeInfo } = navSlices.actions;

//Selectors - help in retrieving the data which will be dispatched
export const selectStart = (state) => state.nav.start;
export const selectDest = (state) => state.nav.destination;
export const selectTravelTimeInfo = (state) => state.nav.travelTimeInformation;

export default navSlices.reducer;