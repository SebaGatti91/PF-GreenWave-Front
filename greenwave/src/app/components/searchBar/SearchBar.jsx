const SearchBar = () => {
    return (
        <div>
            <input
                type="text"
                placeholder="Search..."
                style={{ borderRadius: '1em 0 0 1em', width: '500px' }}
                className=" text-black px-2 border rounded focus:outline-none focus:ring focus:border-blue-300 text-center"
            />
            <button
                type="button"
                style={{ borderRadius: '0 1em 1em 0', padding: '1.5px', borderLeft: '1px solid gray', paddingRight: '10px', paddingLeft: '5px' }}
                className="bg-white text-white rounded-r focus:outline-none focus:ring focus:border-blue-300"
            >
                &#128269;
            </button>
        </div>
    )
}

export default SearchBar;