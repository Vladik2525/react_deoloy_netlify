import './App.css'
import Content from './Content'
import Header from './Headers'
import AddItem from './AddItem'
import ItemList from './ItemList'
import { useState, useEffect } from 'react'
import SearchItem from './searchItem'
import apiRequest from './apiRequest'
import { json } from 'react-router-dom'
import Footer from './footer'
const App = () => {
	const API_URL = 'http://localhost:3500/items'
	const [items, setItems] = useState([])
	const [newItem, setNewItem] = useState('')
	const [search, setSearch] = useState('')
	const [backgroundColor, setBackgroundColor] = useState('#e6e6e6')
	const [header, setheader] = useState('Header')
	const [headertext, setheadertext] = useState('')
	const [border, setborder] = useState('none')
	const [fetchError, setFetchError] = useState(null)
	const [isLoading, setIsLoading] = useState(true)

	const coloreditor = () => {
		if (backgroundColor === '#e6e6e6') {
			setBackgroundColor('orange')
		} else if (backgroundColor === 'orange') {
			setBackgroundColor('red')
		} else if (backgroundColor === 'red') {
			setBackgroundColor('purple')
		} else if (backgroundColor === 'purple') {
			setBackgroundColor('#e6e6e6')
		}
	}
	useEffect(() => {
		const fetchItems = async () => {
			try {
				const response = await fetch(API_URL)
				if (!response.ok) throw Error('Did not receive expected data')
				const listItems = await response.json()
				setItems(listItems);
				setFetchError(null);
			} catch (err) {
				setFetchError(err.message);
			} finally {
				setIsLoading(false)
			}
		}
		setTimeout(() => {
			(async () => await fetchItems())();
		}, 2000)
	}, [])


	const handleCheck = async (id) => {
		const listItems = items.map((item) => item.id === id ? {
			...item,
			checked: !item.checked
		} : item)
		setItems(listItems)
		localStorage.setItem('shoppinglist', JSON.stringify(listItems));

		const myItem = listItems.filter((item) => item.id === id)
		const updateOptions = {
			method: 'PATCH',
			headers: {
				'Content-Type': 'application/json'
			},
			body: JSON.stringify({ checked: myItem[0].checked })
		};
		const reqUrl = `${API_URL}/${id}`
		const result = await apiRequest(reqUrl, updateOptions);
		if (result) setFetchError(result);
	}

	const handleDelete = async (id) => {
		const listItems = items.filter((item) => item.id !== id)
		setItems(listItems)
		localStorage.setItem('shoppinglist', JSON.stringify(listItems));

		const deleteOptions = { method: 'Delete' }
		const reqUrl = `${API_URL}/${id}`
		const result = await apiRequest(reqUrl, deleteOptions);
		if (result) setFetchError(result);
	}

	const setAndSaveItems = (newItems) => {
		setItems(newItems)
		localStorage.setItem('shoppinglist', JSON.stringify(newItems));
	}

	const addItem = async (item) => {
		const id = items.length + 1;
		const myNewItem = { id, checked: false, item }
		const listItems = [...items, myNewItem]
		setAndSaveItems(listItems)

		const postOptions = {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json'
			},
			body: JSON.stringify(myNewItem)
		};
		const result = await apiRequest(API_URL, postOptions);
		if (result) setFetchError(result)
	}

	const handleSubmit = (e) => {
		e.preventDefault()
		if (!newItem) return;
		addItem(newItem)
		setNewItem('')
	}
	return (
		<div className='page'>
			<Header title={'Header'} header={header} setheader={setheader} />
			<div className="my">
				<div className='myheader'>Settings</div>
				<div>
					<div className='bac'>Item background<button className='mybutton' onClick={coloreditor}>change</button></div>
					<span className='bac'>Header text</span>
					<input placeholder='header text' onChange={(e) => {
						setheadertext(e.target.value);
					}} type='text' className='myinput' value={headertext} />
					<button className='mybutton' onClick={() => {
						if (!headertext) return
						setheader(headertext)
						setheadertext('')
					}}>set</button>
					<div><span className='bac'>Border</span> <button className='mybutton' onClick={() => {
						if (border === 'none') {
							setborder('2px solid blue')
						} else {
							setborder('none')
						}
					}}>add</button></div>

				</div>
			</div>
			<div className='programdiv' style={{ border }}>
				<AddItem
					newItem={newItem}
					setNewItem={setNewItem}
					handleSubmit={handleSubmit}
				/>
				<SearchItem
					search={search}
					setSearch={setSearch}
				/>
				<main>
					{isLoading && <p>Loading Items...</p>}
					{fetchError && isLoading && <p style={{ color: 'red', marginLeft: '80px' }}>{`Error: ${fetchError}`}</p>}
					{!fetchError && <Content />}
				</main>
				<main>
					{items.length ? (
						<ItemList
							handleCheck={handleCheck}
							handleDelete={handleDelete}
							items={items.filter(item => ((item.item).toLowerCase()).includes(search.toLowerCase()))}
							backgroundColor={backgroundColor}
							setBackgroundColor={backgroundColor}
						/>

					) : (
						<div>
							<p className='text' style={{ marginTop: '80px', marginLeft: '-600px' }}>Your list is empty</p>
						</div>
					)
					}
				</main>
			</div>
			<Footer />
		</div >

	)
}


export default App;

