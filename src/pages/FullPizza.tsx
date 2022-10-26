import React from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';
//============================================================================================================

const FullPizza: React.FC = () => {
	const params = useParams();
	const [pizza, setPizza] = React.useState<{
		imageUrl: string,
		title: string,
		price: number,
	}>();
	const navigate = useNavigate();

	React.useEffect(() => {
		async function fetchPizza() {
			try {
				const { data } = await axios.get(`https://633b5933c1910b5de0c41000.mockapi.io/items/` + params.id);
				setPizza(data);
			} catch {
				alert('Ошибка при получении пиццы');
				navigate('/');
			}
		}
		fetchPizza();
	}, [])

	// Если в переменной pizza еще нет никаких пицц, то будет ошибка, так как JS будет пытаться найти
	// imageUrl, title и price у indefined. Чтобы избежать этого, сделаем простую проверку
	if (!pizza) {
		return <>'Загрузка....'</>
	}

	return (
		<div className='container'>
			<img src={pizza.imageUrl} alt='Пицца' />
			<h2>{pizza.title}</h2>
			<p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Perspiciatis illum ut quidem repudiandae minus quisquam est harum fugit iure, eveniet earum distinctio debitis quod laudantium beatae aliquid necessitatibus, veritatis animi.</p>
			<h4>{pizza.price} p</h4>
		</div >
	)
}

export default FullPizza;