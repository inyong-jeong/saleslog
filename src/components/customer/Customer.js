import React from 'react';
import styles from './styles/Customer.module.css'
import { useHistory } from "react-router-dom";
import CustomFab from './button/CustomFab';


const Customer = () => {

  const history = useHistory()
  const navigateTo = () => history.push('/add')

  return (
    <div className={styles.Wrapper}>
      {/* <CustomerItems value={value} /> */}
      <CustomFab navigateTo={navigateTo} />
    </div>
  );
}

export default Customer;