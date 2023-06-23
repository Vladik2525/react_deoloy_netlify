const SearchItem = ({ search, setSearch }) => {
	return (
		<form className="searchform" onSubmit={(e) => e.preventDefault()}>
			<input
				className="searchinput"
				id="search"
				type="text"
				role="searchbox"
				placeholder="Search Items"
				value={search}
				onChange={(e) => setSearch(e.target.value)}
			/>
		</form>
	)
}

export default SearchItem