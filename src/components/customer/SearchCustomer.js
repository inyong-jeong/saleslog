import React from 'react';
import styles from './styles/Customer.module.css'
const SearchCustomer = ({ value, onChange }) => {
  return (

    <input placeholder='...검색'
      className={styles.SearchInput}
      style={{ marginBottom: 10 }}
      value={value}
      onChange={onChange}
    />

  );
}

export default SearchCustomer;