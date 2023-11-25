import { useState } from 'react';
import axios from 'axios';

const getProduct = async (newName) => {
  try {
    const response = await axios.get(`http://localhost:3001/products/name?name=${newName}`);
    const { data } = response;
    return data;
  } catch (error) {
    throw Error(error);
  }
};

const SearchBar = () => {
  const [searchTerm, setSearchTerm] = useState('');

  const handleInputChange = (event) => {
    setSearchTerm(event.target.value);
  };

  const handleSearchClick = async () => {
    try {
      const data = await getProduct(searchTerm);
      console.log(data);
      return data
    } catch (error) {
      console.error('Error en la búsqueda:', error.message);
    }
  };

  return (
    <div>
      <input
        type="text"
        placeholder="Search..."
        style={{ borderRadius: '1em 0 0 1em', width: '400px' }}
        className="text-black px-2 border rounded focus:outline-none focus:ring focus:border-blue-300 text-center"
        value={searchTerm}
        onChange={handleInputChange}
      />
      <button
        type="button"
        onClick={handleSearchClick}
        style={{
          borderRadius: '0 1em 1em 0',
          padding: '1.5px',
          borderLeft: '1px solid gray',
          paddingRight: '10px',
          paddingLeft: '5px',
        }}
        className="bg-white text-white rounded-r focus:outline-none focus:ring focus:border-blue-300"
      >
        &#128269;
      </button>
    </div>
  );
};

export default SearchBar;