const SearchBar = () => {
    return (
        <div>
            <input
                type="text"
                placeholder="Search..."
                style={{ borderRadius: '1em 1em', width: '500px'}}
                className="px-2 border rounded focus:outline-none focus:ring focus:border-blue-300 text-center"
            />
        </div>
    )
}

export default SearchBar;