import {
  POST_SUPPORT_INQUIRY,
  POST_SUPPORT_INQUIRY_ERROR,
  POST_SUPPORT_INQUIRY_SUCCESS,
  GET_SUPPORT_INQUIRY_LISTS,
  GET_SUPPORT_INQUIRY_LISTS_ERROR,
  GET_SUPPORT_INQUIRY_LISTS_SUCCESS,
  GET_SUPPORT_INQUIRY_DETAIL,
  GET_SUPPORT_INQUIRY_DETAIL_SUCCESS,
  GET_SUPPORT_INQUIRY_DETAIL_ERROR,
  POST_EDIT_INQUIRY,
  POST_EDIT_INQUIRY_ERROR,
  POST_EDIT_INQUIRY_SUCCESS,
  POST_DELETE_INQUIRY,
  POST_DELETE_INQUIRY_ERROR,
  POST_DELETE_INQUIRY_SUCCESS
} from '../../constants/actionTypes'

const initialState = {
  loading: true,
  postInquiryResponse: null,
  deleteInquiryResponse: null,
  postEditInquiryResponse: null,
  getInquiryListsResponse: null,
  inquiryDetails: null,
  inquiryDetailsResponse: null,
  inquiryLists: null,

}
const Support = (state = initialState, action) => {
  switch (String(action.type)) {

    case POST_SUPPORT_INQUIRY:
      return { ...state, loading: true }
    case POST_SUPPORT_INQUIRY_SUCCESS:
      return { ...state, loading: false, postInquiryResponse: true }
    case POST_SUPPORT_INQUIRY_ERROR:
      return { ...state, loading: false, postInquiryResponse: false }
    default: return { ...state }

    case GET_SUPPORT_INQUIRY_LISTS:
      return { ...state, loading: true }
    case GET_SUPPORT_INQUIRY_LISTS_SUCCESS:
      return { ...state, loading: false, getInquiryListsResponse: true, inquiryLists: action.payload.response }
    case GET_SUPPORT_INQUIRY_LISTS_ERROR:
      return { ...state, loading: false, getInquiryListsResponse: false, }

    case GET_SUPPORT_INQUIRY_DETAIL:
      return { ...state, loading: true }
    case GET_SUPPORT_INQUIRY_DETAIL_SUCCESS:
      return { ...state, loading: false, inquiryDetailsResponse: true, inquiryDetails: action.payload.response.message[0] }
    case GET_SUPPORT_INQUIRY_DETAIL_ERROR:
      return { ...state, loading: false, inquiryDetailsResponse: false }

  }


}
export default Support