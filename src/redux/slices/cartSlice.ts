import { RootState } from './../store';
import { createSlice, PayloadAction } from '@reduxjs/toolkit';

export type CartItem = {
	id: string;
	title: string;
	price: number;
	imageUrl: string;
	type: string;
	size: number;
	count: number;
}

interface CartSliceState {
	totalPrice: number;
	items: CartItem[],
}

const initialState: CartSliceState = {
	totalPrice: 0,
	items: [],
}

export const cartSlice = createSlice({
	name: 'cart',
	initialState,
	reducers: {
		addItem(state, action: PayloadAction<CartItem>) {
			const findItem = state.items.find(obj => obj.id === action.payload.id);
			if (findItem) {
				findItem.count++;
			} else {
				state.items.push({
					...action.payload,
					count: 1,
				})
			}
			state.totalPrice = state.items.reduce((sum, obj) => {
				return (obj.price * obj.count) + sum;
			}, 0)
		},
		minusItem(state, action: PayloadAction<string>) {
			const findItem = state.items.find(obj => obj.id === action.payload);
			if (findItem) {
				findItem.count--;
			}
			state.totalPrice = state.items.reduce((sum, obj) => {
				return (obj.price * obj.count) + sum;
			}, 0)
		},
		removeItem(state, action: PayloadAction<string>) {
			state.items = state.items.filter(obj => obj.id !== action.payload);
		},
		clearItems(state) {
			state.items = [];
			state.totalPrice = 0;
		},
	},
})

// Селекторы
export const selectorCart = (state: RootState) => state.cart;
export const selectorCartItemById = (id: string) => (state: RootState) => state.cart.items.find(obj => obj.id === id)


export const { addItem, minusItem, removeItem, clearItems } = cartSlice.actions;

export default cartSlice.reducer;