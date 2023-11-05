import { Container } from 'reactstrap';
import { useSelector } from 'react-redux';
import { Row, Col } from 'react-bootstrap';
import { getAllProducts } from '../../../redux/productsRedux';
import AdCard from '../../common/AdCard';


import styles from './AdsSection.module.scss';

const AdsSection = () => {

  const products = useSelector(getAllProducts);

  return (
    <div className={styles.adsSection}>
      <section className="trending-box">
        <Container>
          <h2 className={styles.sectionTitle}>Browse Products</h2>
          <Row>
            {products.map((product) => (
              <Col key={product.id} xs={12} md={4} lg={3}>
                <AdCard ad={product} />
              </Col>
            ))}
          </Row>
        </Container>
      </section>
    </div>
  );
}

export default AdsSection;