import {  makeStyles, Typography, FormControl } from "@material-ui/core"
import { useState, useEffect } from "react"
import React from 'react';
import { postCustomer } from "redux/customer/actions";
import Input from 'components/styledcomponent/Input'
import { useDispatch, useSelector } from "react-redux";
import TextArea from "antd/lib/input/TextArea";
import StyledSelect from 'components/styledcomponent/StyledSelect';
import { useHistory } from "react-router";
import Tags from "@yaireo/tagify/dist/react.tagify" // React-wrapper file
import "@yaireo/tagify/dist/tagify.css" // Tagify CSS
import MyAppBar from "components/styledcomponent/MyAppBar";
import { SET_NAVIBAR_SHOW } from 'constants/actionTypes';
import { alertMessage, errorMessage } from "constants/commonFunc";
import { Row, Col, Tooltip } from "antd";
import { useScrollToTop } from "constants/commonFunc";
import { clearCache, getCachingKeys, dropByCacheKey, } from "react-router-cache-route";
import StyledButton from 'components/styledcomponent/Button'
import { useMediaQuery } from "react-responsive";


window.clearCache = clearCache;
window.getCachingKeys = getCachingKeys;

const { Option } = StyledSelect;
const useStyles = makeStyles({

  title: {
    fontSize: 14,
    background: '#F6F6F6',
    paddingLeft: 10,
    paddingTop: 3,
    paddingBottom: 3,
    color: '#666666',
  },
  innerBox: {
    padding: 10,
  },
  laebelStyle: {
    marginTop: 5,
    color: '#111111',
    fontWeight: 'normal',
    fontSize: 14,
    display: 'block',
  },
  description: {
    fontSize: 12,
    color: '#666666'
  },
  descriptionTag: {
    fontSize: 12,
    margin: 0,
    padding: 0,
    color: '#666666'
  },
  addBtnStyle: {
    margin: 10,
    fontSize: 14,
    color: '#333333',
  },
  infoBox: {
    padding: 10,
  }

})

const CustomerRegisterExcel = () => {
  const isMobile = useMediaQuery({
    query: "(max-width:1190px)"
  });
  const navigateTo = () => {
    history.goBack()
  }

  const dispatch = useDispatch()
  const history = useHistory()
  const classes = useStyles()
  const state = useSelector(state => state.Customer)
  const [inputs, setInputs] = useState({
      acc_excel: ''
    })
  useScrollToTop()

  useEffect(() => {
    dispatch({
      type: SET_NAVIBAR_SHOW,
      payload: false
    })
  }, [])

  const onSaveClick = () => {
    if (!inputs.acc_excel) {
      return errorMessage('업로드 할 고객프로필 엑셀파일을 선택 하세요')
    }
    //dispatch(postCustomer.call(inputs))

  }

  return (
    <div>
      <MyAppBar
        barTitle={'고객프로필 엑셀 업로드'}
        showBackButton
        navigateTo={navigateTo}
        onSaveClick={onSaveClick}
      />
      
      <Row justify='start' className={classes.innerBox}>
        <Col  sm={18} xs={18} md={18} lg={18}>
        <lebel className={classes.laebelStyle} >엑셀 양식을 작성하여 고객 프로필을 대량으로 업로드할 수 있습니다.</lebel>
        </Col>
        <Col  sm={6} xs={6} md={6} lg={6}>                
          <a href="https://backend.saleslog.co/image/saleslog_accounts_sample.xlsx" ><StyledButton style={{height:25}} >엑셀양식 다운로드</StyledButton></a>          
        </Col>
      </Row>
      <Typography variant='h6' align='left' className={classes.title} style={{marginTop:20}}>고객프로필 업로드</Typography>
      <Row justify='start' className={classes.innerBox} >
        <Col  sm={4} xs={4} md={4} lg={4}>
        <lebel className={classes.laebelStyle} >업로드 파일:</lebel>        
        </Col>
        <Col  sm={18} xs={18} md={18} lg={18}>
        <input type="file" name="acc_excel" className={classes.input} accept="application/vnd.openxmlformats-officedocument.spreadsheetml.sheet" />
        </Col>
      </Row>
      <Row justify='start' >
        <Col sm={18} xs={18} md={18} lg={18}>
          <lebel >*파일선택 후 저장을 클릭 하세요.</lebel>        
        </Col>
      </Row>
    </div>
  );
}

export default CustomerRegisterExcel;