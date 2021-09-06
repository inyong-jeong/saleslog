import {
  FILTER_EMPLOYEE,
  FILTER_GRADE,
  FILTER_SORT_TYPE
} from 'constants/actionTypes'

export const filterSortType = (sortType) => ({
  type: FILTER_SORT_TYPE,
  payload: { sortType }
})

export const filterGrade = (grade) => ({
  type: FILTER_GRADE,
  payload: { grade }
})
export const filterEmployee = (employee) => ({
  type: FILTER_EMPLOYEE,
  payload: { employee }
})