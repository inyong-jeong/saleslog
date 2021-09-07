import { useEffect, useState } from "react";
import { getAllCustomer } from '../../redux/customer/actions';
import { useDispatch } from "react-redux";

const useCustomerSearch = (query, pageNumber) => {

  const dispatch = useDispatch()
  const [inputs, setInputs] = useState({
    srch: query,

    pageno: pageNumber,
  })

  useEffect(() => {
    dispatch(getAllCustomer.call(inputs))
    // return () => cancel()
  }, [query, pageNumber])
}

export default useCustomerSearch;