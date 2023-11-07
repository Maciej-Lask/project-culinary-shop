import React, { useState, useEffect } from 'react';
import { Button, Container } from 'react-bootstrap';
import CartItem from '../../common/CartItem/CartItem';
import { Link } from 'react-router-dom';

const CartPage = () => {
  const [cart, setCart] = useState({ products: [] });

  useEffect(() => {
    const storedCart = JSON.parse(localStorage.getItem('cart')) || {
      products: [],
    };
    setCart(storedCart);
  }, []);

  const updateCart = (productId, newCount) => {
    const updatedCart = { ...cart };
    const productIndex = updatedCart.products.findIndex(
      (product) => product.id === productId,
    );
    if (productIndex !== -1) {
      updatedCart.products[productIndex].count = newCount;
      localStorage.setItem('cart', JSON.stringify(updatedCart));
      setCart(updatedCart);
    }
  };

  const removeProduct = (productId) => {
    const updatedCart = { ...cart };
    const productIndex = updatedCart.products.findIndex(
      (product) => product.id === productId,
    );
    if (productIndex !== -1) {
      updatedCart.products.splice(productIndex, 1);
      localStorage.setItem('cart', JSON.stringify(updatedCart));
      setCart(updatedCart);
    }
  };

  const totalPrice = cart.products.reduce((total, product) => {
    return total + product.price * product.count;
  }, 0);

  if(cart.products.length === 0) {
     return(

    <Container >
     <h1>Cart is empty</h1>
     <Link to="/">
       <Button variant="outline-dark">Shop Now</Button>
     </Link>
    </Container>
     )
  }

  return (
    <Container>
      <h1>Cart</h1>
      {cart.products.map((product) => (
        <CartItem key={product.id} product={product} updateCart={updateCart} removeProduct={removeProduct} />
      ))}
      <p>Total Price: ${totalPrice}</p>
      <Link to="/order-summary">
        <Button variant="outline-dark">Order Summary</Button>
      </Link>
    </Container>
  );
};

export default CartPage;
