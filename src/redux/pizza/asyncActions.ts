import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { PizzaItem, SearchPizzaParams } from "./types";

export const fetchPizzas = createAsyncThunk(
	'pizza/fetchPizzasStatus',
	async (params: SearchPizzaParams) => {
		const { sortBy, order, category, search, currentPage } = params;
		const { data } = await axios.get<PizzaItem[]>(`https://633b5933c1910b5de0c41000.mockapi.io/items?page=${currentPage}&limit=4&${category}&sortBy=${sortBy}&order=${order}${search}`);
		return data;
	}
)