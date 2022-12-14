import {  makeStyles, Typography, FormControl } from "@material-ui/core"
import { useState, useEffect } from "react"
import React from 'react';
import { postAccFile } from "redux/customer/actions";
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
  const [accExcel, setAccExcel] = useState(null)
  useScrollToTop()

  useEffect(() => {
    dispatch({
      type: SET_NAVIBAR_SHOW,
      payload: false
    })
  }, [])

  const onSaveClick = () => {
    if (!accExcel) {
      return errorMessage('????????? ??? ??????????????? ??????????????? ?????? ?????????')
    }
    console.log(accExcel)
    dispatch(postAccFile.call({acc_excel:accExcel}))

  }

  const onChange = (e) => {
    if (e.target.files.length > 0) {
      setAccExcel(e.target.files[0])

      // const fileUploaded = e.target.files[0];
      // const reader = new FileReader();
      // reader.onloadend = () => {
      //   setAccExcel(fileUploaded)
      // }
      // if (e.target.files[0]) {
      //   reader.readAsDataURL(e.target.files[0]);
      // }

    } else {
      setAccExcel(null)
    }
  }

  return (
    <div>
      <MyAppBar
        barTitle={'??????????????? ?????? ?????????'}
        showBackButton
        navigateTo={navigateTo}
        onSaveClick={onSaveClick}
      />
      
      <Row justify='start' className={classes.innerBox}>
        <Col  sm={18} xs={18} md={18} lg={18}>
        <lebel className={classes.laebelStyle} >?????? ????????? ???????????? ?????? ???????????? ???????????? ???????????? ??? ????????????.</lebel>
        </Col>
        <Col  sm={6} xs={6} md={6} lg={6}>                
          <a href="https://backend.saleslog.co/image/saleslog_accounts_sample.xlsx" ><StyledButton style={{height:25}} >???????????? ????????????</StyledButton></a>          
        </Col>
      </Row>
      <Typography variant='h6' align='left' className={classes.title} style={{marginTop:20}}>??????????????? ?????????</Typography>
      <Row justify='start' className={classes.innerBox} >
        <Col  sm={4} xs={4} md={4} lg={4}>
        <lebel className={classes.laebelStyle} >????????? ??????:</lebel>        
        </Col>
        <Col  sm={18} xs={18} md={18} lg={18}>
        <input type="file" name="acc_excel" onChange={onChange} className={classes.input} accept='.xlsx' />
        </Col>
      </Row>
      <Row justify='start' >
        <Col sm={18} xs={18} md={18} lg={18}>
          <lebel> * ???????????? ??? ????????? ?????? ?????????</lebel><br/>
          <lebel> * ????????? ?????? ????????? ?????? ???????????? ????????? ???????????? ?????? ?????????</lebel>        
        </Col>
      </Row>
    </div>
  );
}

export default CustomerRegisterExcel;