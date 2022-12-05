import React from 'react';
import styles from './styles/Customer.module.css'
const Search = ({ value, onChange }) => {
  return (
    <input placeholder='...검색'
      className={styles.SearchInput}
      style={{ marginBottom: 10, width: '100%' }}
      value={value}
      onChange={onChange}
    />

  );
}

export default Search;