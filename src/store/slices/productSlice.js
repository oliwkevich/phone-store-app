import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const initialState = {
  items: [],
  status: null,
  message: "none",
  isLoading: true,
};

export const productsFetch = createAsyncThunk(
  "products/productsFetch",
  async (_, { rejectWithValue }) => {
    try {
      const response = await axios.get(
        "https://6294ad4e63b5d108c1910dc0.mockapi.io/iPhones"
      );

      return response?.data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

const productSlice = createSlice({
  name: "productSlice",
  initialState,
  reducers: {},
  extraReducers: {
    [productsFetch.pending]: (state) => {
      state.items = [];
      state.status = "Items loading";
    },
    [productsFetch.fulfilled]: (state, action) => {
      state.items = action.payload;
      state.status = "Items loaded successful";
      state.isLoading = false;
    },
    [productsFetch.rejected]: (state, action) => {
      state.items = [];
      state.status = "Items loaded NO successful";
      state.message = action.payload;
      state.isLoading = false;
    },
  },
});

// export const {} = productSlice.actions;

export default productSlice.reducer;
