import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    city: null,
    hotel: {
        name: null,
        lat: null,
        lng: null,
    },
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
            state.hotel = {
                name: action.payload.name,
                lat: action.payload.lat,
                lng: action.payload.lng,
            };
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
