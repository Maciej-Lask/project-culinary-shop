import { Container } from 'reactstrap';
import { useSelector } from 'react-redux';
import { Row, Col } from 'react-bootstrap';
import { getAllAds } from '../../../redux/adsRedux';
import AdCard from '../../common/AdCard';


import styles from './AdsSection.module.scss';

const AdsSection = () => {

  const ads = useSelector(getAllAds);

  return (
    <div className={styles.adsSection}>
    <section className="trending-box">
      <Container>
        <h2 className="pt-5">Ads Catalog</h2>
        <Row>
          {ads.map((ad) => (
            <Col key={ad._id} xs={12} md={6} lg={4}>
              <AdCard ad={ad} />
            </Col>
          ))}
        </Row>
      </Container>
    </section>

    </div>
  );
}

export default AdsSection;