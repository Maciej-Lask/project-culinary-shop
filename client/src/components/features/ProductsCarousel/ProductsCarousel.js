import React from 'react';
import Carousel from 'react-bootstrap/Carousel';
import { IMAGES_URL } from '../../../config';
import styles from './ProductsCarousel.module.scss';

const ProductCarousel = ({ product }) => {
  const { gallery } = product;
  return (
    <Carousel className={styles.carousel}>
      {gallery.map((image, index) => (
        <Carousel.Item key={index}>
          <img
            className={`d-block w-100 ${styles.image}`}
            src={`${IMAGES_URL}/${image.image}`}
            alt={product.title}
          />
        </Carousel.Item>
      ))}
    </Carousel>
  );
};

export default ProductCarousel;
