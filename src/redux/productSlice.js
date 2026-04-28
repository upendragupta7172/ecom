// import { createSlice } from "@reduxjs/toolkit";

// export const productSlice = createSlice({
//   name: "product",
//   initialState: {
//     products: null,
//   },
//   reducers: {
//     setproducts: (state, action) => {
//       state.products = action.payload;
//     },
//   },
// });

// // ✅ productSlice ke actions yahan se export karein
// export const { setproducts } = productSlice.actions;

// export default productSlice.reducer;




import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  products: [],
};

const productSlice = createSlice({
  name: "product",
  initialState,
  reducers: {
    setProducts: (state, action) => {
      state.products = action.payload;
    },
  },
});

export const { setProducts } = productSlice.actions;
export default productSlice.reducer;