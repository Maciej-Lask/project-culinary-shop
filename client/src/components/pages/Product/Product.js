import React from 'react';
import {
  Container,
  Card,
  Button,
  Spinner,
  Modal,
  Carousel,
} from 'react-bootstrap';
import { useSelector } from 'react-redux';
import { Link, useParams } from 'react-router-dom';
import { IMAGES_URL } from '../../../config';
import { getProductById } from '../../../redux/productsRedux';
import styles from './Product.module.scss';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlus, faMinus } from '@fortawesome/free-solid-svg-icons';
import { useState } from 'react';
import ProductCarousel from '../../features/ProductsCarousel/ProductsCarousel';

const Product = () => {
  const { id } = useParams();
  const product = useSelector((state) => getProductById(state, id));

  const [productCount, setProductCount] = useState(1);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleAddToCart = () => {
    const cart = JSON.parse(localStorage.getItem('cart')) || { products: [] };
    const existingProductIndex = cart.products.findIndex(
      (item) => item.productId === product.id,
    );

    if (existingProductIndex !== -1) {
      cart.products[existingProductIndex].count += productCount;
    } else {
      cart.products.push({
        productId: product.id,
        count: productCount,
        price: product.price,
      });
    }

    localStorage.setItem('cart', JSON.stringify(cart));
    setIsModalOpen(true);
  };

  const incrementProductCount = () => {
    setProductCount(productCount + 1);
  };

  const decrementProductCount = () => {
    if (productCount > 1) {
      setProductCount(productCount - 1);
    }
  };
  const closeModal = () => {
    setIsModalOpen(false);
  };

  return (
    <div className={styles.productPage}>
      <Container className={styles.productPageContainer}>
        <Modal show={isModalOpen} onHide={closeModal}>
          <Modal.Header closeButton>
            <Modal.Title>Added to cart</Modal.Title>
          </Modal.Header>
          <Modal.Footer>
            <Link to="/cart" onClick={closeModal}>
              <Button variant="outline-warning">Go to Cart</Button>
            </Link>
            <Link to="/" onClick={closeModal}>
              <Button variant="secondary" onClick={closeModal}>
                Continue shopping
              </Button>
            </Link>
          </Modal.Footer>
        </Modal>
        {product ? (
          <>
            <h2 className="pt-5">{product.title}</h2>
            <Card>
              <ProductCarousel product={product} />
              <Card.Body>
                <Card.Title>{product.title}</Card.Title>
                <Card.Text>{product.description}</Card.Text>
                <Card.Text>Price: ${product.price * productCount}</Card.Text>
                <div className={`row  ${styles.buttonsRow}`}>
                  <Button
                    variant="secondary"
                    className={`${styles.button} col-md-10 col-lg-3 `}
                    onClick={handleAddToCart}
                  >
                    Add to Cart
                  </Button>
                  <Button
                    variant="secondary"
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
                    variant="secondary"
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
