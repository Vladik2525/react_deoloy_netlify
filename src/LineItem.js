import { FaTrashAlt } from 'react-icons/fa'
import './App.css'
const LineItem = ({ item, handleCheck, handleDelete, backgroundColor, setBackgroundColor }) => {
	return (
		<div style={{ backgroundColor }} className='container' key={item.id}>
			<input
				className='item'
				type='checkbox'
				checked={item.checked}
				onChange={() => handleCheck(item.id)}
			/>
			<label style={(item.checked) ? { textDecoration: 'line-through' } : null} className='task'>{item.item}</label>
			<FaTrashAlt onClick={() => handleDelete(item.id)} className='bin' role='button' />
		</div>
	)
}

export default LineItem