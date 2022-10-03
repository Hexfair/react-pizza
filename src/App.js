import React from "react";
import "./scss/app.scss";
// Импорт компонентов
import { Header } from "./components/Header";
import { Categories } from "./components/Categories";
import { Sort } from "./components/Sort";
import { PizzaBlock } from "./components/PizzaBlock";


function App() {

	const [items, setItems] = React.useState([])
	React.useEffect(() => {
		fetch('https://633b5933c1910b5de0c41000.mockapi.io/items')
			.then((response) => response.json())
			.then((arr) => setItems(arr))
	}, [])

	return (
		<div className="wrapper">
			<Header />
			<div className="content">
				<div className="container">
					<div className="content__top">
						<Categories />
						<Sort />
					</div>
					<h2 className="content__title">Все пиццы</h2>
					<div className="content__items">
						{items.map((obj) => (
							<PizzaBlock key={obj.id} {...obj} />
						))}
					</div>
				</div>
			</div>
		</div>
	);
}

export default App;