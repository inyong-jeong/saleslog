import {
  POST_SUPPORT_INQUIRY,
  GET_SUPPORT_INQUIRY_LISTS,
  GET_SUPPORT_INQUIRY_DETAIL,
  POST_EDIT_INQUIRY,
  POST_DELETE_INQUIRY,
} from '../../constants/actionTypes'

import { fetchActionGenerator } from '../utils'

export const postSupportInquiry = fetchActionGenerator(POST_SUPPORT_INQUIRY, 'body')
export const getSupportInquiryLists = fetchActionGenerator(GET_SUPPORT_INQUIRY_LISTS, 'body')
export const getSupportInquiryDetail = fetchActionGenerator(GET_SUPPORT_INQUIRY_DETAIL, 'body')
export const postEditInquiry = fetchActionGenerator(POST_EDIT_INQUIRY, 'body')
export const postDeleteInquiry = fetchActionGenerator(POST_DELETE_INQUIRY, 'body')
