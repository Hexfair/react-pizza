import React from 'react';
import debounce from 'lodash.debounce';

import styles from './Search.module.scss'
import { useDispatch } from 'react-redux';
import { setSearchValue } from '../../redux/filter/slice';
//========================================================================================================================

export const Search: React.FC = () => {
	const dispatch = useDispatch();

	const [value, setValue] = React.useState('');			// Локальный стейт инпута - нужен для debounce
	// const { setSearchValue } = React.useContext(SearchContext);	// Глобальный стейт инпута

	// Делаем фокус в инпуте после того, как нажали крестик, то есть очистили инпут
	const inputRef = React.useRef<HTMLInputElement>(null);
	const onClickClear = (event: React.MouseEvent<SVGSVGElement>) => {
		dispatch(setSearchValue(''));
		setValue('');
		// if (inputRef.current) {
		// 	inputRef.current.focus();
		// }
		inputRef.current?.focus(); // Второй вариант проверки на null с помощью оператора опциональной последовательности
	}

	// Делаем так, чтобы при вводе текста в инпут запрос на сервак не отправлялся после каждого символа
	// Запрос будет отправляться только после работы функции debounce через определенный интервал времени
	const updateSearchValue = React.useCallback(
		debounce((str) => {
			dispatch(setSearchValue(str))
		}, 750),
		[],
	);
	const onChangeInput = (event: React.ChangeEvent<HTMLInputElement>) => {
		setValue(event.target.value);
		updateSearchValue(event.target.value)
	}

	return (
		<div className={styles.root}>
			<svg className={styles.icon} version="1.1" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 129 129" enableBackground="new 0 0 129 129">
				<path d="M51.6,96.7c11,0,21-3.9,28.8-10.5l35,35c0.8,0.8,1.8,1.2,2.9,1.2s2.1-0.4,2.9-1.2c1.6-1.6,1.6-4.2,0-5.8l-35-35   c6.5-7.8,10.5-17.9,10.5-28.8c0-24.9-20.2-45.1-45.1-45.1C26.8,6.5,6.5,26.8,6.5,51.6C6.5,76.5,26.8,96.7,51.6,96.7z M51.6,14.7   c20.4,0,36.9,16.6,36.9,36.9C88.5,72,72,88.5,51.6,88.5c-20.4,0-36.9-16.6-36.9-36.9C14.7,31.3,31.3,14.7,51.6,14.7z" />
			</svg>
			<input
				ref={inputRef}
				value={value} // Это делает инпут контролируемым
				onChange={onChangeInput}
				className={styles.input}
				placeholder='Поиск пиццы...' />
			{value &&
				<svg onClick={onClickClear} className={styles.cancel} enableBackground="new 0 0 32 32" version="1.1" viewBox="0 0 32 32" xmlns="http://www.w3.org/2000/svg" >
					<path d="M17.459,16.014l8.239-8.194c0.395-0.391,0.395-1.024,0-1.414c-0.394-0.391-1.034-0.391-1.428,0  l-8.232,8.187L7.73,6.284c-0.394-0.395-1.034-0.395-1.428,0c-0.394,0.396-0.394,1.037,0,1.432l8.302,8.303l-8.332,8.286  c-0.394,0.391-0.394,1.024,0,1.414c0.394,0.391,1.034,0.391,1.428,0l8.325-8.279l8.275,8.276c0.394,0.395,1.034,0.395,1.428,0  c0.394-0.396,0.394-1.037,0-1.432L17.459,16.014z" fill="#121313" />
				</svg>}
		</div >
	)
}
