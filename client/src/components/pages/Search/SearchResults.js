import React, { useEffect, useState } from 'react';
import { Container, Row, Col, Spinner } from 'react-bootstrap';
import { useParams } from 'react-router-dom';
import { API_URL } from '../../../config';
import ProductCard from '../../common/ProductCard/ProductCard';
import styles from './SearchResults.module.scss';

const Search = () => {
  const { searchPhrase } = useParams();
  const [searchResults, setSearchResults] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch(`${API_URL}/products/search/${searchPhrase}`)
      .then((response) => response.json())
      .then((data) => {
        setSearchResults(data);
        setLoading(false);
      })
      .catch((error) => {
        console.error('Error fetching search results:', error);
        setLoading(false);
      });
  }, [searchPhrase]);

  return (
    <Container>
      <h1 className={styles.title}>Search Results for: {searchPhrase}</h1>
      {loading ? (
        <Spinner
          color="primary"
          className="standard-box d-block me-auto ms-auto"
        />
      ) : (
        <div className="search-results">
          <Row>
            {searchResults.map((product) => (
              <Col key={product.id} xs={12} md={6} lg={4}>
                <ProductCard product={product} />
              </Col>
            ))}
          </Row>
        </div>
      )}
    </Container>
  );
};

export default Search;
