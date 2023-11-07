import React from 'react';
import { Card, Button } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { IMAGES_URL } from '../../config';

import styles from './AdCard.module.scss';

const AdCard = ({ ad }) => {
  return (
    <Card className="mb-4">
      <Card.Img  className={styles.image} variant="top" src={`${IMAGES_URL}/${ad.image}`} alt={ad.title} />
      <Card.Body>
        <Card.Title>{ad.title}</Card.Title>
        <Card.Text>Price: {ad.price} $</Card.Text>
        <Link to={`/product/${ad.id}`}>
          <Button variant="primary">Read more</Button>
        </Link>
      </Card.Body>
    </Card>
  );
};

export default AdCard;
