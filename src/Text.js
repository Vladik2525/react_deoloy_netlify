import React from "react";
import { useState, useEffect } from "react";





export const Text = () => {
	const [text, setText] = useState("");
	const [color, setColor] = useState('black');
	let [fontSize, setSize] = useState(16);
	let Textsize = (event) => {
		setSize(+event.target.value);
	}

	useEffect(() => {
		console.log('COMPONENT MOUNTED')
	}, [])



	const handleClick = () => {
		setColor('black')
		if (color === 'black') {
			setColor('red')
		} else if (color === 'red') {
			setColor('green')
		} else if (color === 'green') {
			setColor('blue')
		} else if (color === 'blue') {
			setColor('yellow')
		} else if (color === 'yellow') {
			setColor('purple')
		} else if (color === 'purple') {
			setColor('orange')
		} else if (color === 'orange') {
			setColor('pink')
		}
	}
	return (
		<div>
			<input className="input"
				onChange={(event) => {
					setText(event.target.value)
				}}
			/>
			<h1 className="text" style={{ color, fontSize }} >{text}</h1>
			<button onClick={handleClick}>Change Color</button>
			<select onChange={Textsize}>
				<option>10</option>
				<option>20</option>
				<option>30</option>
				<option>40</option>
				<option value={'50'} >50 не нажимать</option>
			</select>
		</div>
	)
}