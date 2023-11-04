import React from 'react';
import { Container, Card, Button, Spinner } from 'react-bootstrap';
import { useSelector } from 'react-redux';
import { json, useParams } from 'react-router-dom';
import { IMAGES_URL, API_URL } from '../../../config';
// import { useNavigate } from 'react-router-dom';
// import { useDispatch } from 'react-redux';
import { getProductById } from '../../../redux/productsRedux';

const Ad = () => {
  // const navigate = useNavigate();
  // const dispatch = useDispatch();
  const { id } = useParams();
  const product = useSelector((state) => getProductById(state, id));

  const handleAddToCart = () => {
    console.log('added to cart');
  };

  return (
    <Container>
      <h2 className="pt-5">{product.title}</h2>
      {product ? (
        <Card className="mt-4">
          <Card.Img
            variant="top"
            src={`${IMAGES_URL}/${product.image}`}
            alt={product.title}
          />
          <Card.Body>
            <Card.Title>{product.title}</Card.Title>
            <Card.Text>{product.description}</Card.Text>
            <Card.Text>Price: ${product.price}</Card.Text>

            <Button
              variant="primary"
              className="mr-2"
              onClick={handleAddToCart}
            >
              Add to Cart
            </Button>
          </Card.Body>
        </Card>
      ) : (
        <Spinner
          color="primary"
          className="standard-box d-block me-auto ms-auto"
        />
      )}
    </Container>
  );
};

export default Ad;
