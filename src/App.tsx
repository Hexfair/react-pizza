import React from "react";
import { Routes, Route } from "react-router-dom";

import { Home } from "./pages/Home";

import "./scss/app.scss";
import { MainLayout } from "./layout/MainLayout";
//========================================================================================================================

// export const SearchContext = React.createContext('');
const Cart = React.lazy(() => import('./pages/Cart'));
const FullPizza = React.lazy(() => import('./pages/FullPizza'));
const NotFound = React.lazy(() => import('./pages/NotFound'));

function App() {
	// const [searchValue, setSearchValue] = React.useState(''); // Хук для работы инпута - строки поиска
	return (
		<Routes>
			<Route path="/" element={<MainLayout />}>
				<Route path="" element={<Home />} />
				<Route
					path="cart"
					element={
						<React.Suspense fallback={<div>Загрузка...</div>}>
							<Cart />
						</React.Suspense>} />
				<Route
					path="pizza/:id"
					element={
						<React.Suspense fallback={<div>Загрузка...</div>}>
							<FullPizza />
						</React.Suspense>} />
				<Route
					path="*"
					element={
						<React.Suspense fallback={<div>Загрузка...</div>}>
							< NotFound />
						</React.Suspense>} />
			</Route >
		</Routes >
	);
}

export default App;