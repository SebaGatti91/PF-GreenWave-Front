'use client'
import { useState } from 'react';
import validatePost from './validation';
import Card from '../components/card/Card';
import image from "../../../public/images/Green-Wave.png"
import "../../../public/estilos/postbutton.css"
export default function PostProduct() {
    const [errors, setErrors] = useState({})
  const [product, setProduct] = useState({
    id: '',
    name: '',
    img: '',
    status: '',
    price: '',
    description: '',
    rating: ''
  });
  const [file, setFile] = useState(null);
  const handleChange = (e) => {
    let newProduct
    if (e.target.name === 'price') {
      const price = parseFloat(e.target.value);
      if (!isNaN(price)) {
      newProduct={ ...product, price: price.toFixed(2) + "$" };
    }
    }
    if (e.target.name === 'imgFile') {
      setFile(e.target.files[0]);
      newProduct = { ...product,[e.target.name]:e.target.value ,img: '' }; 
    } else if (e.target.name === 'img') {
      newProduct={ ...product, [e.target.name]: e.target.value };
      setFile(null); 
    } else {
      newProduct = { ...product, [e.target.name]: e.target.value };
    } 
    setProduct(newProduct)
    const validateErrors = validatePost(newProduct)
    setErrors(validateErrors)
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    const validationErrors =validatePost(product)
    setErrors(validationErrors)
    if (Object.keys(validationErrors).length !== 0){
        return 'all required fields'
    }try {
        const response = await 
        fetch('url', {
            method: 'POST',
            body: FormData
        })
        if(!response.ok){
            throw new Error('internal Server Error');
        } 
        setProduct({
            id: '',
            name: '',
            img: '',
            status: '',
            price: '',
            description: '',
            rating: ''
          });
          setFile(null);
          setErrors(null);
          }catch(error){
            setErrors(error.message)
          }
    
        }
        console.log(product);
   

  return (
    <div className='form m-20'>
        <div className="flex">
        <div className="w-1/2">
   <form className="bg-custom-green text-black rounded-lg p-8 max-w-lg mx-auto" onSubmit={handleSubmit}>
  <h2 className="text-2xl font-bold mb-8 text-center">Postear Producto</h2>
  <div className="mb-4">
    <label className="block mb-2">Nombre</label>
    <input type="text" name="name" onChange={handleChange} className="w-full px-3 py-2 border border-gray-300 rounded" />
    {errors.name && <p className='text-red-500 text-sm italic'>{errors.name}</p>}
  </div>
  <div className="mb-4">
  <label className="block mb-2">Precio</label>
  <div className="flex">
    <span className="bg-gray-200 p-2 border border-r-0 border-gray-300 rounded-l">$</span>
    <input type="number" min="0" name="price" onChange={handleChange} className="w-full px-3 py-2 border border-gray-300 rounded-r" />
  </div>
    {errors.price && <p className='text-red-500 text-sm italic'>{errors.price}</p>}
</div>
  <div className="mb-4">
    <label className="block mb-2">agrega una imagen</label>
    <input type="text" name="img" onChange={handleChange} className="w-full px-3 py-2 border border-gray-300 rounded" />
    {errors.image && <p className='text-red-500 text-sm italic'>{errors.image}</p>}
  </div>
  <div className="mb-4">
    <label className="block mb-2">O selecciona una imagen para subir:</label>
    <input type="file" name="imgFile" onChange={handleChange} className="w-full px-3 py-2 border border-gray-300 rounded" />
  </div>
  <div className="mb-4">
    <label className="block mb-2">Descripción</label>
    <textarea name="description" onChange={handleChange} className="w-full px-3 py-2 border border-gray-300 rounded"></textarea>
    {errors.description && <p className='text-red-500 text-sm italic'>{errors.description}</p>}
  </div>
  <div>
  <button id="button"><span>Click me</span></button>
  </div> 
</form>

    </div>
    <div className="w-1/2 h-200">
       
          <Card
            id={product.id}
            name={product.name}
            img={product?.img || image }
            price={product.price} 
            description={product.description}
            showStars={false}
            showbuybutton={false}
            showdescription={true}
          />
        
        </div>
        </div>
    </div>
    
  );
}
