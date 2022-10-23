import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { fetchPizzas } from "./asyncActions";
import { PizzaItem, PizzaSliceState, Status } from "./types";

const initialState: PizzaSliceState = {
	items: [],
	status: Status.LOADING
}


export const pizzaSlice = createSlice({
	name: 'pizza',
	initialState,
	reducers: {
		setItems(state, action: PayloadAction<PizzaItem[]>) {
			state.items = action.payload;
		},
	},
	extraReducers: (builder) => {
		builder.addCase(fetchPizzas.pending, (state) => {
			state.status = Status.LOADING;
			state.items = [];
		});
		builder.addCase(fetchPizzas.fulfilled, (state, action) => {
			state.items = action.payload;
			state.status = Status.SUCCESS;
		});
		builder.addCase(fetchPizzas.rejected, (state) => {
			state.status = Status.ERROR;
			state.items = [];
		});
	},

	// extraReducers: {
	// 	[fetchPizzas.pending]: (state, action) => {
	// 		state.status = 'loading';
	// 		state.items = [];
	// 	},
	// 	[fetchPizzas.fulfilled]: (state, action) => {
	// 		state.items = action.payload;
	// 		state.status = 'success';
	// 	},
	// 	[fetchPizzas.rejected]: (state, action) => {
	// 		state.status = 'error';
	// 		state.items = [];
	// 	},
	// }
})


export const { setItems } = pizzaSlice.actions;

export default pizzaSlice.reducer;