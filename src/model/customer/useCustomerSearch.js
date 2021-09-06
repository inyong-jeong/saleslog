import { useEffect, useState } from "react";
import { getAllCustomer } from '../../redux/customer/actions';
import { useDispatch } from "react-redux";
import { cancel } from "redux-saga/effects";

const useCustomerSearch = (query, pageNumber) => {

  const dispatch = useDispatch()
  const [inputs, setInputs] = useState({
    srch: query,
    // order: sortType, // 1. 최근 (디폴트) 2. 고객명순
    // sales_gb: tabCode,
    // score: grade,
    // users: employee,
    pageno: pageNumber,
  })

  useEffect(() => {
    dispatch(getAllCustomer.call(inputs))
    // return () => cancel()
  }, [query, pageNumber])
}

export default useCustomerSearch;