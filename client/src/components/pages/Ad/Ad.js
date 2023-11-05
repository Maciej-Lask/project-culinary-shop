import React from 'react';
import { Container, Card, Button, Spinner } from 'react-bootstrap';
import { useSelector } from 'react-redux';
import { json, useParams } from 'react-router-dom';
import { IMAGES_URL, API_URL } from '../../../config';
import { getProductById } from '../../../redux/productsRedux';
import styles from './Product.module.scss';
// import + and - icons
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlus, faMinus } from '@fortawesome/free-solid-svg-icons';
import { useState } from 'react';

const Product = () => {
  const { id } = useParams();
  const product = useSelector((state) => getProductById(state, id));
  
  const [productCount, setProductCount] = useState(1);


  const handleAddToCart = () => {
    console.log('added to cart');
  };

    const incrementProductCount = () => {
      setProductCount(productCount + 1);
    };

    const decrementProductCount = () => {
      if (productCount > 1) {
        setProductCount(productCount - 1);
      }
    };

  return (
    <div className={styles.productPage}>
      <Container className={styles.productPageContainer}>
        {product ? (
          <>
            <h2 className="pt-5">{product.title}</h2>
            <Card>
              <Card.Img
                className={styles.image}
                src={`${IMAGES_URL}/${product.image}`}
                alt={product.title}
              />
              <Card.Body>
                <Card.Title>{product.title}</Card.Title>
                <Card.Text>{product.description}</Card.Text>
                <Card.Text>Price: ${product.price * productCount}</Card.Text>
                <div className="row justify-content-center">
                  <Button
                    variant="primary"
                    className={`${styles.button} col-md-10 col-lg-3 `}
                    onClick={handleAddToCart}
                  >
                    Add to Cart
                  </Button>
                  <Button
                    className={`${styles.button} ${styles.countMinus} col-5 col-md-3 col-lg-1`}
                    onClick={decrementProductCount}
                  >
                    <FontAwesomeIcon icon={faMinus} />
                  </Button>
                  <p
                    className={`${styles.button} ${styles.count} col-md-3 col-lg-1`}
                  >
                    {productCount}
                  </p>
                  <Button
                    className={`${styles.button} ${styles.countPlus} col-5 col-md-3 col-lg-1`}
                    onClick={incrementProductCount}
                  >
                    <FontAwesomeIcon icon={faPlus} />
                  </Button>
                </div>
              </Card.Body>
            </Card>
          </>
        ) : (
          <Spinner
            color="primary"
            className="standard-box d-block me-auto ms-auto"
          />
        )}
      </Container>
    </div>
  );
};

export default Product;
