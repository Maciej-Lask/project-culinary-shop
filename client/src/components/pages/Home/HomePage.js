import SearchForm from '../../features/SearchForm/SearchForm';
import ProductsSection from '../../features/ProductsSection/ProductsSection';
import styles from './HomePage.module.scss';

const HomePage = () => (
  <div className={styles.homePage}>
    <SearchForm />
    <ProductsSection className={styles.products} />
  </div>
);

export default HomePage;
