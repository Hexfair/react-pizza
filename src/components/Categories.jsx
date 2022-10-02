import React from "react";

export function Categories() {

	// Хук изменения состояния категорий
	const [activeIndex, setActiveIndex] = React.useState(0);

	const categories = ['Все', 'Мясные', 'Вегетарианская', 'Гриль', 'Острые', 'Закрытые'];

	// Функция при клике на выбранную категорию
	const onClickCategory = (indexCategory) => {
		setActiveIndex(indexCategory);
	}

	return (
		<div className="categories">
			<ul>
				{categories.map((value, index) => (
					<li
						key={index}
						onClick={() => { onClickCategory(index) }}
						className={activeIndex === index ? "active" : ""}>
						{value}
					</li>
				))}
			</ul>
		</div>
	)
}
