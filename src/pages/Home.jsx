import React from "react";
import { SearchContext } from "../App";
import { useSelector, useDispatch } from 'react-redux';
import { setCategoryId, setCurrentPage } from '../redux/slices/filterSlice';
import axios from "axios";

import { Categories } from "../components/Categories";
import { Sort } from "../components/Sort";
import { PizzaBlock } from "../components/PizzaBlock/PizzaBlock";
import { PizzaBlockSceleton } from "../components/PizzaBlock/PizzaBlockSceleton";
import { Pagination } from "../components/Pagination/Pagination";
//========================================================================================================================

export function Home() {

	const [items, setItems] = React.useState([]);
	const [isLoading, setIsLoading] = React.useState(true);		// Управляет тем что отображается - скелетон или пиццы
	// const [categoryId, setcategoryId] = React.useState(0);	// Хук изменения состояния категорий
	// const [sortType, setSortType] = React.useState({				// Хук для выбранного типа сортировки
	// name: 'популярности', sortProperty: 'rating'
	// });
	// const [currentPage, setCurrentPage] = React.useState(1);	// Хук изменения страницы
	const { searchValue } = React.useContext(SearchContext);	// Хук контекста

	// Используем Редакс
	const dispatch = useDispatch();
	// const categoryId = useSelector((state) => state.filter.categoryId);
	// const sortType = useSelector((state) => state.filter.sort.sortProperty);
	const { categoryId, sort, currentPage } = useSelector((state) => state.filter);


	const onChangeCategory = (id) => {
		dispatch(setCategoryId(id))
	}

	const onChangePage = (number) => {
		dispatch(setCurrentPage(number))
	}

	React.useEffect(() => {
		setIsLoading(true);

		const category = categoryId > 0 ? `category=${categoryId}` : '';
		const order = sort.sortProperty.includes('-') ? 'asc' : 'desc';
		const sortBy = sort.sortProperty.replace('-', '');

		// Вариант фильтрации через запрос на бэкенд
		const search = searchValue ? `&search=${searchValue}` : '';

		axios.get(`https://633b5933c1910b5de0c41000.mockapi.io/items?page=${currentPage}&limit=4&${category}&sortBy=${sortBy}&order=${order}${search}`)
			.then((res) => {
				setItems(res.data);
				setIsLoading(false);
			});

		// 	fetch(`https://633b5933c1910b5de0c41000.mockapi.io/items?page=${currentPage}&limit=4&${category}&sortBy=${sortBy}&order=${order}${search}`)
		// 		.then((response) => response.json())
		// 		.then((arr) => {
		// 			setItems(arr);
		// 			setIsLoading(false);
		// 		})

		window.scrollTo(0, 0);
	}, [categoryId, sort.sortProperty, searchValue, currentPage])

	// Вариант фильтрации, когда данные статичны и нет необходимости обращаться к бэкенду 
	// const pizzas = items
	// 	.filter(obj => obj.title.toLowerCase().includes(searchValue.toLowerCase()) ? true : false)
	// 	.map((obj) => <PizzaBlock key={obj.id} {...obj} />);

	const pizzas = items.map((obj) => <PizzaBlock key={obj.id} {...obj} />);
	const skeleton = [...new Array(6)].map((_, index) => <PizzaBlockSceleton key={index} />);

	return (
		<div className="container">
			<div className="content__top">
				<Categories value={categoryId} onClickCategory={onChangeCategory} />
				<Sort />
			</div>
			<h2 className="content__title">Все пиццы</h2>
			<div className="content__items">
				{isLoading ? skeleton : pizzas}
			</div>
			<Pagination currentPage={currentPage} onChangePage={onChangePage} />
		</div>
	)
}
