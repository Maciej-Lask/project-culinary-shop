import { Container } from 'reactstrap';
import { useSelector } from 'react-redux';
import { Row, Col } from 'react-bootstrap';
import { getAllProducts } from '../../../redux/productsRedux';
import ProductCard from '../../common/ProductCard/ProductCard';

import styles from './ProductsSection.module.scss';

const ProductsSection = () => {
  const products = useSelector(getAllProducts);

  return (
    <div className={styles.productsSection}>
      <section className="trending-box">
        <Container>
          <h2 className={styles.sectionTitle}>Browse Products</h2>
          <Row>
            {products.map((product) => (
              <Col key={product.id} xs={12} md={4} lg={3}>
                <ProductCard product={product} />
              </Col>
            ))}
          </Row>
        </Container>
      </section>
    </div>
  );
};

export default ProductsSection;
