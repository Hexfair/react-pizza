import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';
import axios from 'axios';
import { Sort } from './filterSlice';
//========================================================================================================================

type PizzaItem = {
	id: string;
	title: string;
	price: number;
	imageUrl: string;
	sizes: number[];
	types: number[];
}

export enum Status {
	LOADING = 'loading',
	SUCCESS = 'success',
	ERROR = 'error',
}

export type SearchPizzaParams = {
	sortBy: string;
	order: string;
	category: string;
	search: string;
	currentPage: string;
}
interface PizzaSliceState {
	items: PizzaItem[];
	status: Status;
}

const initialState: PizzaSliceState = {
	items: [],
	status: Status.LOADING
}

export const fetchPizzas = createAsyncThunk(
	'pizza/fetchPizzasStatus',
	async (params: SearchPizzaParams) => {
		const { sortBy, order, category, search, currentPage } = params;
		const { data } = await axios.get<PizzaItem[]>(`https://633b5933c1910b5de0c41000.mockapi.io/items?page=${currentPage}&limit=4&${category}&sortBy=${sortBy}&order=${order}${search}`);
		return data;
	}
)

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