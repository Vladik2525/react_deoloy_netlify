import { FaPlus } from "react-icons/fa"
import { useRef } from "react"
const AddItem = ({ newItem, setNewItem, handleSubmit }) => {
	const inputRef = useRef()
	return (
		<form className="addItemForm" onSubmit={handleSubmit}>
			<input className="additem"
				autoFocus
				ref={inputRef}
				id='addItem'
				type="text"
				placeholder="Add item"
				required
				value={newItem}
				onChange={(e) => setNewItem(e.target.value)}
			/>
			<button
				className="button"
				type="submit"
				aria-label='Add item'
				onClick={() => inputRef.current.focus()}
			>
				<FaPlus />

			</button>
		</form >
	)
}

export default AddItem