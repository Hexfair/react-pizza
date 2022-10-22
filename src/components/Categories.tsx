import React from "react";
//========================================================================================================================

const categories = ['Все', 'Мясные', 'Вегетарианская', 'Гриль', 'Острые', 'Закрытые'];

// Типизация пропсов
type CategoriesProps = {
	value: number;
	onClickCategory: (i: number) => void;
}

export const Categories: React.FC<CategoriesProps> = ({ value, onClickCategory }) => {
	return (
		<div className="categories">
			<ul>
				{categories.map((categoryName, index) => (
					<li
						key={index}
						onClick={() => { onClickCategory(index) }}
						className={value === index ? "active" : ""}>
						{categoryName}
					</li>
				))}
			</ul>
		</div>
	)
}
