import { ICategory } from "@/types/categorytypes";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";

// Initial state
interface CategoryState {
  categories: ICategory[]; // Make sure to type it as ICategory[]
  loading: boolean;
  error: string | null;
}

const initialState: CategoryState = {
  categories: [],
  loading: false,
  error: null,
};

// Category slice
const categorySlice = createSlice({
  name: "category",
  initialState,
  reducers: {
    addCategory: (state, action: PayloadAction<ICategory>) => {
      state.categories.push(action.payload); // This is fine, no need to return anything
    },
    removeCategory: (state, action: PayloadAction<string>) => {
      state.categories = state.categories.filter(
        (category) => category._id !== action.payload
      );
    },
    setCategories: (state, action: PayloadAction<ICategory[]>) => {
      state.categories = action.payload; // This is useful for setting initial data
    },
  },
});

export const { addCategory, removeCategory, setCategories } = categorySlice.actions;

export default categorySlice.reducer;
