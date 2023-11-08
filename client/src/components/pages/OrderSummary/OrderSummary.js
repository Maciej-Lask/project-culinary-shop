import React from 'react';
import {
  Container,
  Form,
  Button,
  Row,
  Col,
  ListGroup,
} from 'react-bootstrap';
import OrderItem from '../../common/OrderItem/OrderItem';
import { useState, useEffect } from 'react';

const OrderSummary = () => {
    const [cart, setCart] = useState({ products: [] });

    useEffect(() => {
      const storedCart = JSON.parse(localStorage.getItem('cart')) || {
        products: [],
      };
      setCart(storedCart);
    }, []);
    console.log(cart);

     const totalPrice = cart.products.reduce((total, product) => {
       return total + product.price * product.count;
     }, 0);

  return (
    <Container>
      <h1>Order Summary</h1>
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
              <Form.Control type="text" placeholder="Enter your name" />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>Email</Form.Label>
              <Form.Control type="email" placeholder="Enter your email" />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>Address</Form.Label>
              <Form.Control type="text" placeholder="Enter your address" />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>Payment Method</Form.Label>
              <Form.Control as="select">
                <option>Credit Card</option>
                <option>PayPal</option>
              </Form.Control>
            </Form.Group>
            <Button
              variant="primary"
              onClick={() => console.log('Order placed')}
            >
              Order
            </Button>
          </Form>
        </Col>
      </Row>
    </Container>
  );
};

export default OrderSummary;
