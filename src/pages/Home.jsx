import React from "react";

import { Categories } from "../components/Categories";
import { Sort } from "../components/Sort";
import { PizzaBlock } from "../components/PizzaBlock/PizzaBlock";
import { PizzaBlockSceleton } from "../components/PizzaBlock/PizzaBlockSceleton";


export function Home() {

	const [items, setItems] = React.useState([]);
	const [isLoading, setIsLoading] = React.useState(true);

	React.useEffect(() => {
		fetch('https://633b5933c1910b5de0c41000.mockapi.io/items')
			.then((response) => response.json())
			.then((arr) => {
				setItems(arr);
				setIsLoading(false);	// Выключить показ скелетона после загрузки пицц с сервера
			})
	}, [])

	return (
		<>
			<div className="content__top">
				<Categories />
				<Sort />
			</div>
			<h2 className="content__title">Все пиццы</h2>
			<div className="content__items">
				{isLoading
					? [...new Array(6)].map((_, index) => <PizzaBlockSceleton key={index} />)		// Отобразить массив скелетонов
					: items.map((obj) => <PizzaBlock key={obj.id} {...obj} />)									// Отобразить реальные пиццы
				}
			</div>
		</>
	)
}
