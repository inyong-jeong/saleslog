
const INIT_STATE = {
  dashBoardStat: {}
}
const Stat = (state=INIT_STATE, action) => {
  switch (String(action.type)) {
    case 'GET_DASHBOARD_STAT':
      return {...state};
    case 'GET_DASHBOARD_STAT_SUCCESS':
      return {...state, dashBoardStat: action.payload.response};
    case 'GET_DASHBOARD_STAT_ERROR':
      return {...state, error: action.payload.error};
    case 'GET_STAT_TYPE':
      return {...state};
    case 'GET_STAT_TYPE_SUCCESS':
      return {...state, dashBoardStat: action.payload.response};
    case 'GET_SALES_LOG_SHEET_SUCCESS':
      return {...state, sheet: action.payload.response};
    case 'GET_STAT_TYPE_ERROR':
    default:
      return {...state};      
  }
};

export default Stat;