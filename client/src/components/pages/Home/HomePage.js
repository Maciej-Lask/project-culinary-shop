import SearchForm from '../../features/SearchForm/SearchForm';
import AdsSection from '../../features/AdsSection/AdsSection';
import styles from './HomePage.module.scss';

const HomePage = () => (
  <div className={styles.homePage}>
    <SearchForm />
    <AdsSection className={styles.products} />
  </div>
);

export default HomePage;
