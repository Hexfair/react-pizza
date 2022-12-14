import React from "react";
import { useSelector, useDispatch } from 'react-redux';
import qs from 'qs';
import { useNavigate } from "react-router-dom";

import { Categories } from "../components/Categories";
import { SortPopup as Sort, sortList } from "../components/Sort";
import { PizzaBlock } from "../components/PizzaBlock/PizzaBlock";
import { PizzaBlockSceleton } from "../components/PizzaBlock/PizzaBlockSceleton";
import { Pagination } from "../components/Pagination/Pagination";
import { RootState, useAppDispatch } from "../redux/store";
import { selectorFilter } from "../redux/filter/selectors";
import { selectorPizza } from "../redux/pizza/selectors";
import { setCategoryId, setCurrentPage, setFilters } from "../redux/filter/slice";
import { fetchPizzas } from "../redux/pizza/asyncActions";
import { SearchPizzaParams } from "../redux/pizza/types";
//========================================================================================================================

export const Home: React.FC = () => {
	const navigate = useNavigate();
	// const [isLoading, setIsLoading] = React.useState(true);		// Управляет тем что отображается - скелетон или пиццы
	// const [categoryId, setcategoryId] = React.useState(0);	// Хук изменения состояния категорий
	// const [sortType, setSortType] = React.useState({				// Хук для выбранного типа сортировки
	// name: 'популярности', sortProperty: 'rating'
	// });
	// const [currentPage, setCurrentPage] = React.useState(1);	// Хук изменения страницы
	// const { searchValue } = React.useContext(SearchContext);	// Хук контекста

	const isSearch = React.useRef(false);	// Переменная для работы хука с парсингом адресной строки браузера
	const isMounted = React.useRef(false);	// Переменная для работы хука с вшиванием данных из редакса в адресную строку браузера

	// Используем Редакс
	const dispatch = useAppDispatch();
	// const categoryId = useSelector((state) => state.filter.categoryId);
	// const sortType = useSelector((state) => state.filter.sort.sortProperty);
	const { categoryId, sort, currentPage, searchValue } = useSelector(selectorFilter);

	const { items, status } = useSelector(selectorPizza);


	const onChangeCategory = React.useCallback((id: number) => {
		dispatch(setCategoryId(id))
	}, [])

	const onChangePage = (number: number) => {
		dispatch(setCurrentPage(number))
	}

	/* ---- Хук для парсинга адресной строки браузера при первом рендере 
	и передачи ее в редакс, чтобы применить фильтры, сортировку и т.д. ---- */
	React.useEffect(() => {
		if (window.location.search) {
			const params = qs.parse(window.location.search.substring(1)) as unknown as SearchPizzaParams;
			const sort = sortList.find(obj => obj.sortProperty === params.sortBy)
			dispatch(setFilters({
				searchValue: params.search,
				categoryId: Number(params.category),
				currentPage: Number(params.currentPage),
				sort: sort || sortList[0],
			}));
			isSearch.current = true;
		}
	}, [])
	// --------------------------------------------------------------------

	/* ---- Основная логика + хук для получения с бэкенда пицц и ререндера пицц при сортировке и фильтрации ---- */
	const getPizzas = async () => {
		// setIsLoading(true);

		const category = categoryId > 0 ? `category=${categoryId}` : '';
		const order = sort.sortProperty.includes('-') ? 'asc' : 'desc';
		const sortBy = sort.sortProperty.replace('-', '');

		/* Вариант №1 фильтрации по поиску (инпут), когда данные статичны и нет необходимости обращаться к бэкенду 
		const pizzas = items
				.filter(obj => obj.title.toLowerCase().includes(searchValue.toLowerCase()) ? true : false)
				.map((obj) => <PizzaBlock key={obj.id} {...obj} />); */

		/* Вариант №2 фильтрации по поиску (инпут) через запрос на бэкенд */
		const search = searchValue ? `&search=${searchValue}` : '';

		dispatch(
			fetchPizzas({
				sortBy,
				order,
				category,
				search,
				currentPage: String(currentPage),
			}));
		// setIsLoading(false);

		/* Вариант №2 запроса данных (пицц) с бэкенда
				fetch(`https://633b5933c1910b5de0c41000.mockapi.io/items?page=${currentPage}&limit=4&${category}&sortBy=${sortBy}&order=${order}${search}`)
					.then((response) => response.json())
					.then((arr) => {
						setItems(arr);
						setIsLoading(false);
					}) */
	}
	// --------------------------------------------------------------------

	React.useEffect(() => {
		window.scrollTo(0, 0);
		if (!isSearch.current) {
			getPizzas();
		}
		isSearch.current = false;
	}, [categoryId, sort.sortProperty, searchValue, currentPage])
	// --------------------------------------------------------------------

	/* ---- Хук получает параметры из редакса (сортировка, фильтрация), делает из них строчку и вшивает ее в адресную строку браузера ---- */
	React.useEffect(() => {
		if (isMounted.current) {
			const queryString = qs.stringify({
				sortProperty: sort.sortProperty,
				categoryId,
				currentPage,
			});
			navigate(`?${queryString}`)
		}
		isMounted.current = true;
	}, [categoryId, sort.sortProperty, currentPage])
	// --------------------------------------------------------------------


	const pizzas = items.map((obj: any) => <PizzaBlock key={obj.id} {...obj} />);
	const skeleton = [...new Array(6)].map((_, index) => <PizzaBlockSceleton key={index} />);
	return (
		<div className="container">
			<div className="content__top">
				<Categories value={categoryId} onClickCategory={onChangeCategory} />
				<Sort value={sort} />
			</div>
			<h2 className="content__title">Все пиццы</h2>
			{
				status === 'error'
					? (<div className="content__error-info">
						<h2>Ошибка загрузки :(</h2>
						<p>
							Упс... Что то пошло не так!<br />
							Попробуйте повторить запрос позже...
						</p>
					</div>)
					: (<div className="content__items">{status === 'loading' ? skeleton : pizzas}</div>)
			}
			<Pagination currentPage={currentPage} onChangePage={onChangePage} />
		</div>
	)
}
