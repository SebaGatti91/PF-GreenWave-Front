import React, { useContext } from 'react';
import { CartContext } from './CartContext';

const Cart = () => {
  const [cart] = useContext(CartContext);

  return (
    <div>
      {cart.map((product, index) => (
        <h2 key={index}>{product.name}</h2>
      ))}
    </div>
  );
};

export default Cart;
