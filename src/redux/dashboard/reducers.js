import {
  GET_SALES_STAT,
  GET_SALES_STAT_SUCCESS,
  GET_SALES_STAT_ERROR,
  GET_LEAD_STAT,
  GET_LEAD_STAT_SUCCESS,
  GET_LEAD_STAT_ERROR
} from '../../constants/actionTypes';

const initialState = {
  getsaleslogstatRes: null,
  getleadlogstatRes: null
}

const Dashboard = (state = initialState, action) => {
  switch (String(action.type)) {
    case GET_SALES_STAT:
      return { ...state }
    case GET_SALES_STAT_SUCCESS:
      return { ...state, getsaleslogstatRes: action.payload.response.message }
    case GET_SALES_STAT_ERROR:
      return { ...state, getsaleslogstatRes:  { state: false, message: action.payload.error }}
    case GET_LEAD_STAT:
      return { ...state }
    case GET_LEAD_STAT_SUCCESS:
      return { ...state, getleadlogstatRes: action.payload.response.message }
    case GET_LEAD_STAT_ERROR:
      return { ...state, getleadlogstatRes:  { state: false, message: action.payload.error }}
    default:
      return { ...state };
  }
}
export default Dashboard;