import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    city: null,
    hotel: null,
    startDate: null,
    endDate: null
};

const searchSlice = createSlice({
    name: "search",
    initialState,
    reducers: {
        setCity: (state, action) => {
            state.city = action.payload;
        },
        setHotel: (state, action) => {
            state.hotel = action.payload;
        },
        setDates: (state, action) => {
            const { startDate, endDate } = action.payload;
            state.startDate = startDate;
            state.endDate = endDate;
        }
    }
});

export const { setCity, setHotel, setDates } = searchSlice.actions;
export default searchSlice.reducer;

