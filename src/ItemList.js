import LineItem from './LineItem'
const ItemList = ({ items, handleCheck, handleDelete, backgroundColor, setBackgroundColor }) => {
	return (
		<div>
			{items.map((item) => (
				<LineItem
					setBackgroundColor={setBackgroundColor}
					backgroundColor={backgroundColor}
					key={item.id}
					item={item}
					handleCheck={handleCheck}
					handleDelete={handleDelete}
					aria-label={`Delete ${item.item}`}
				/>
			))}
		</div>
	)
}

export default ItemList