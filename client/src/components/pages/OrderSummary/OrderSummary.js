import React from 'react';
import { Container, Form, Button, Row, Col, ListGroup } from 'react-bootstrap';
import OrderItem from '../../common/OrderItem/OrderItem';
import { useState, useEffect } from 'react';
import { API_URL, AUTH_URL } from '../../../config';
import { useSelector } from 'react-redux';

const OrderSummary = () => {
  const [cart, setCart] = useState({ products: [] });
  const [status, setStatus] = useState(null); // null, success, serverError, clientError, loginError, loading

  const [name, setName] = useState('');
  const [userId, setUserId] = useState('');
  const [email, setEmail] = useState('');
  const [address, setAddress] = useState('');
  const [paymentMethod, setPaymentMethod] = useState('Credit Card');

  useEffect(() => {
    const storedCart = JSON.parse(localStorage.getItem('cart')) || {
      products: [],
    };
    setCart(storedCart);

    fetch(`${AUTH_URL}/user`, {
      method: 'GET',
      credentials: 'include',
    })
      .then((res) => res.json())
      .then((userData) => {
        setUserId(userData.id);
      })
      .catch((err) => {
        console.log(err);
      });
  }, [userId]);

  const totalPrice = cart.products.reduce((total, product) => {
    return total + product.price * product.count;
  }, 0);

  // const orderProducts = cart.products.map((product) => {
  //   const { id, ...productWithoutId } = product;
  //   return productWithoutId;
  // });

  const handleOrderSubmit = (e) => {
    e.preventDefault();
    console.log('Cart products:', cart.products);
    const orderData = {
      name: name,
      userId: userId,
      email: email,
      address: address,
      paymentMethod: paymentMethod,
      cartProducts: cart.products,
      totalPrice: totalPrice,
    };
    const options = {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(orderData),
    };
    setStatus('loading');
    console.log('Order data:', orderData);

    fetch(`${API_URL}/orders`, options)
      .then((res) => {
        console.log('Response:', res);
        if (res.status === 201) {
          setStatus('success');
          localStorage.removeItem('cart');
          setCart({ products: [] });
        } else if (res.status === 400) {
          setStatus('clientError');
        } else {
          setStatus('serverError');
        }
      })
      .catch((err) => {
        console.log(err);
        setStatus('serverError');
      });

    console.log('Order submitted');
  };

  return (
    <Container>
      <h1>Order Summary</h1>
      {status === 'serverError' && (
        <p>Something went wrong. Please try again later.</p> 
      )}
      <Row>
        <Col lg={8}>
          <h2>Your Cart</h2>
          <ListGroup>
            {cart.products.map((product) => (
              <OrderItem key={product.id} product={product} />
            ))}
          </ListGroup>
          <h5 className="my-5 text-end">Total Price: ${totalPrice}</h5>
        </Col>
        <Col lg={4}>
          <h2>Contact Information</h2>
          <Form>
            <Form.Group className="mb-3">
              <Form.Label>Name</Form.Label>
              <Form.Control
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="Enter your name"
              />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>Email</Form.Label>
              <Form.Control
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Enter your email"
              />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>Address</Form.Label>
              <Form.Control
                type="text"
                value={address}
                onChange={(e) => setAddress(e.target.value)}
                placeholder="Enter your address"
              />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>Payment Method</Form.Label>
              <Form.Control
                as="select"
                value={paymentMethod}
                onChange={(e) => setPaymentMethod(e.target.value)}
              >
                <option>Credit Card</option>
                <option>PayPal</option>
              </Form.Control>
            </Form.Group>
            <Button variant="primary" onClick={handleOrderSubmit}>
              Order
            </Button>
          </Form>
        </Col>
      </Row>
    </Container>
  );
};

export default OrderSummary;
