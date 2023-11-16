import React, { useState } from 'react';
import { getProductById } from '../../../redux/productsRedux';
import { useSelector } from 'react-redux';
import { IMAGES_URL } from '../../../config';

import styles from './OrderItem.module.scss';

const OrderItem = ({ product }) => {
  const [count, setCount] = useState(product.count);

  const productData = useSelector((state) => getProductById(state, product.productId));

  return (
    <div className={styles.orderItem}>
      <p>{product.title}</p>
      <div className={`row ${styles.info}`}>
        {productData && (
          <img
            className={`col-4 ${styles.image}`}
            src={`${IMAGES_URL}/${productData.image}`}
            alt={productData.title}
          ></img>
        )}
        <p className="col-md-3">Price per item: ${product.price}</p>
        <p className="col-md-2">Quantity: {count}</p>
        <p className="col-md-3">Total for this item: ${product.price * count}</p>
        {product.comment && <p className={styles.comment}>Comment: {product.comment}</p>}
      </div>
    </div>
  );
};

export default OrderItem;
