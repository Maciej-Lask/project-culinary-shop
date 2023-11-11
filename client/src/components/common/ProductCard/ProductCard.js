import React from 'react';
import { Card, Button } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { IMAGES_URL } from '../../../config';

import styles from './ProductCard.module.scss';

const ProductCard = ({ product }) => {
  return (
    <Card className="mb-4">
      <Card.Img
        className={styles.image}
        variant="top"
        src={`${IMAGES_URL}/${product.image}`}
        alt={product.title}
      />
      <Card.Body>
        <Card.Title>{product.title}</Card.Title>
        <Card.Text>Price: {product.price} $</Card.Text>
        <Link to={`/product/${product.id}`}>
          <Button variant="outline-dark">Read more</Button>
        </Link>
      </Card.Body>
    </Card>
  );
};

export default ProductCard;
