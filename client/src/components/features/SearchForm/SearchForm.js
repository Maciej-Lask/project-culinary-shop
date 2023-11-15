import React, { useState } from 'react';
import { Form, Button } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import styles from './SearchForm.module.scss';
import { FaSearch } from 'react-icons/fa';

const SearchForm = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const navigate = useNavigate();

  const handleSearch = () => {
    navigate(`/search/${searchTerm}`);
  };

  return (
    <Form className={` ${styles.searchForm} row mx-auto`}>
      <Form.Group className="col-9" controlId="searchTerm">
        <Form.Control
          type="text"
          placeholder="Enter search term"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
      </Form.Group>
      <Button
        className={`${styles.submitSearch} col-1`}
        variant="warning"
        onClick={handleSearch}
      >
        <FaSearch/>
      </Button>
    </Form>
  );
};

export default SearchForm;
