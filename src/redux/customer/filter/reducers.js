import {
  FILTER_EMPLOYEE,
  FILTER_GRADE,
  FILTER_SORT_TYPE
} from 'constants/actionTypes'

let initialState = {
  sortType: '',
  grade: [],
  employee: ''
}

const CustomerFilter = (state = initialState, action) => {
  switch (action.type) {
    case FILTER_SORT_TYPE:
      return { ...state, sortType: action.payload.sortType }
    case FILTER_GRADE:
      return { ...state, sortType: action.payload.grade }
    case FILTER_EMPLOYEE:
      return { ...state, sortType: action.payload.employee }
    default:
      return { ...state }
  }
}
export default CustomerFilter