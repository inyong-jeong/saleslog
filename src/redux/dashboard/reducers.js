import {
  GET_SALES_STAT,
  GET_SALES_STAT_SUCCESS,
  GET_SALES_STAT_ERROR,
  GET_LEAD_STAT,
  GET_LEAD_STAT_SUCCESS,
  GET_LEAD_STAT_ERROR,
  GET_LOGS_EXCEL_DOWNLOAD,
  GET_LOGS_EXCEL_DOWNLOAD_SUCCESS,
  GET_LOGS_EXCEL_DOWNLOAD_ERROR
} from '../../constants/actionTypes';

const initialState = {
  getsaleslogstatRes: null,
  getleadlogstatRes: null,
  loading: true,
  getlogsdownloadRes: null,
}

const Dashboard = (state = initialState, action) => {
  switch (String(action.type)) {

    case GET_SALES_STAT:
      return { ...state, loading: true }
    case GET_SALES_STAT_SUCCESS:
      return { ...state, getsaleslogstatRes: action.payload.response.message, loading: false }
    case GET_SALES_STAT_ERROR:
      return { ...state, getsaleslogstatRes: false, loading: false }

    case GET_LEAD_STAT:
      return { ...state, loading: true }
    case GET_LEAD_STAT_SUCCESS:
      return { ...state, getleadlogstatRes: action.payload.response.message, loading: false }
    case GET_LEAD_STAT_ERROR:
      return { ...state, getleadlogstatRes: false, loading: false }

    case GET_LOGS_EXCEL_DOWNLOAD:
      console.log('excel reducer!!')
      return { ...state, loading: true }
    case GET_LOGS_EXCEL_DOWNLOAD_SUCCESS:
      return { ...state, getlogsdownloadRes: action.payload.response.message, loading: false }
    case GET_LOGS_EXCEL_DOWNLOAD_ERROR:
      return { ...state, getlogsdownloadRes: false, loading: false }
  
    default:
      return { ...state };
  }
}
export default Dashboard;