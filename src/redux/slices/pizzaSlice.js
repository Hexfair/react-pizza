import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
//========================================================================================================================

export const fetchPizzas = createAsyncThunk(
	'pizza/fetchPizzasStatus',
	async (params) => {
		const { sortBy, order, category, search, currentPage } = params;
		const res = await axios.get(`https://633b5933c1910b5de0c41000.mockapi.io/items?page=${currentPage}&limit=4&${category}&sortBy=${sortBy}&order=${order}${search}`);
		return res.data;
	}
)

const initialState = {
	items: [],
	status: 'loading', // loading | success | error
}

export const pizzaSlice = createSlice({
	name: 'pizza',
	initialState,
	reducers: {
		setItems(state, action) {
			state.items = action.payload;
		},
	},
	extraReducers: {
		[fetchPizzas.pending]: (state, action) => {
			state.status = 'loading';
			state.items = [];
		},
		[fetchPizzas.fulfilled]: (state, action) => {
			state.items = action.payload;
			state.status = 'success';
		},
		[fetchPizzas.rejected]: (state, action) => {
			state.status = 'error';
			console.log(333)
			state.items = [];
		},
	}
})

export const { setItems } = pizzaSlice.actions;

export default pizzaSlice.reducer;