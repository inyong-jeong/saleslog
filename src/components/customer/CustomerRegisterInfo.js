import {
  makeStyles, Typography, FormControl,
} from "@material-ui/core"
import { useState, useEffect } from "react"
import React from 'react';
import { postCustomer } from "../../redux/customer/actions";
import Input from '../styledcomponent/Input'
import { useDispatch, useSelector } from "react-redux";
import TextArea from "antd/lib/input/TextArea";
import StyledSelect from '../styledcomponent/StyledSelect';
import { useHistory } from "react-router";
import Tags from "@yaireo/tagify/dist/react.tagify" // React-wrapper file
import "@yaireo/tagify/dist/tagify.css" // Tagify CSS
import MyAppBar from "../../components/styledcomponent/MyAppBar";
import { SET_NAVIBAR_SHOW } from 'constants/actionTypes';
import { alertMessage, errorMessage } from "../../constants/commonFunc";
import { Row, Col, Tooltip } from "antd";
import { ReactComponent as Info } from '../../assets/icons/info.svg'
import { customerType, gradeTypeTooltip, stageTypeTooltip, managerTooltip, tagToolTip } from './toolTipText'
import { useScrollToTop } from "../../constants/commonFunc";
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
    marginTop: 10,
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

const CustomerRegisterInfo = () => {

  const isMobile = useMediaQuery({
    query: "(max-width:1190px)"
  });
  const navigateTo = () => {
    history.goBack()
  }

  const dispatch = useDispatch()
  const classes = useStyles()
  const state = useSelector(state => state.Customer)

  const [inputs, setInputs] = useState(
    {
      account_name: '',
      score: '',
      ceo_name: '',
      acc_tel: '',
      acc_email: '',
      zipcode: '',
      addr1: '',
      addr2: '',
      lati: 0,
      longi: 0,
      reg_num: '',
      acc_etc: '',
      tags: '',
      acc_fax: '',
      sales_gb: '',
      acc_url: '',
      man_name: '',
      dept: '',
      posi: '',
      tel: '',
    }
  )
  useScrollToTop()
  useEffect(() => {
    dispatch({
      type: SET_NAVIBAR_SHOW,
      payload: false
    })

  }, [])

  const onSaveClick = () => {
    if (!inputs.account_name || !inputs.ceo_name) {
      return errorMessage('?????????, ??????????????? ?????? ???????????????.')
    }
    if (inputs.account_name.includes('(???)' || '????????????')) {
      return errorMessage('????????????, (???) ??? ?????? ????????? ???????????? ????????? ???????????? ?????????.')
    }
    if (!inputs.sales_gb || !inputs.score) {
      return errorMessage('????????? ?????? ??? ??????/?????? ????????? ?????? ???????????????.')
    }
    // if (inputs.sales_gb === '0010001') { //??????????????? ???????????? ??? ????????? ?????? 
    //   if (!inputs.man_name || !inputs.dept) {
    //     return errorMessage('???????????? ????????? ????????????, ????????? ????????? ?????? ???????????????.')
    //   }
    // }

    if (inputs.reg_num.length > 0) {
      if (inputs.reg_num.length != 10 || inputs.reg_num.includes("-")) {
        return errorMessage('????????? ????????? 10????????? ???????????? ?????????????????????. *(-)??????')
      }

    }


    dispatch(postCustomer.call(inputs))

  }
  useEffect(() => {
    if (state.postCustomerResponse) {
      history.push({ pathname: '/main/customer', state: 'needReload' });
    }

  }, [state.postCustomerResponse])

  const handleChange = (e) => {
    if ('detail' in e) {
      const obj = e.detail.tagify.value
      const result = obj.map(e => e.value)
      setInputs(inputs => ({ ...inputs, tags: result }))
      return
    }

    setInputs({
      ...inputs,
      [e.target.name]: e.target.value
    })
  }
  const history = useHistory()

  const [tooltipTypeText, setTooltipTypeText] = useState(gradeTypeTooltip)

  const onChangeCustomer = (value) => {
    setInputs({ ...inputs, sales_gb: value })
    if (value === '0010001') {
      setGradeType(scoreType)
      setTooltipTypeText(gradeTypeTooltip)
    } else {
      setGradeType(stageType)
      setTooltipTypeText(stageTypeTooltip)
    }
  }
  const onChangeGradeType = (value) => {
    setInputs({ ...inputs, score: value })

  }

  //?????? ????????????
  const accExcelUpload = () => {
    history.push('/main/customer/registerexcel');
    // dispatch(getlogsdownload.call({ dt_typ: bodyLog.dt_typ, from_dt: bodyLog.from_dt, to_dt: bodyLog.to_dt, sales_man: bodyLog.sales_man, dept_idx: bodyLog.dept_idx, sales_gb: '0010001' }));
  }


  const [gradeType, setGradeType] = useState([])
  const scoreType = [{ 'A': 'A' }, { 'B': 'B' }, { 'C': 'C' }, { 'D': 'D' }, { 'E': 'E' }, { 'F': 'F' }, { 'BLACK': 'BLACK' }]
  const stageType = [{ '??????': '??????' }, { '??????': '??????' }, { '??????': '??????' }, { '??????': '??????' }]

  const options = []
  for (let result of gradeType) {
    options.push(<Option key={Object.values(result)}> {Object.keys(result)}</Option>)
  }
  const settings = {
    'maxTags': 5,
  }

  return (
    <>
      <MyAppBar
        barTitle={'?????? ????????????'}
        showBackButton
        navigateTo={navigateTo}
        onSaveClick={onSaveClick}
      />

      <div className='content_body'>
        <div>
          {(!isMobile) ? <Row justify='end' >
            <Col sm={7} xs={7} md={7} lg={7}>
              <StyledButton style={{ height: 25 }} onClick={accExcelUpload}>??????????????? ?????? ?????????</StyledButton>
              <div style={{ height: 10 }}></div>
            </Col>
          </Row> :
            <div style={{ height: 0 }}></div>
          }
          <Typography variant='h6' align='left' className={classes.title}>????????????</Typography>
          <div className={classes.innerBox}>
            <label className={classes.laebelStyle}>????????? <span style={{ color: 'red' }}>*</span></label>
            <Input
              name='account_name'
              onChange={handleChange}
              value={inputs.account_name}
              required
              placeholder="???????????? ??????????????????."
              margin="normal"
            />
            <p className={classes.description}>????????????, (???) ??? ?????? ????????? ???????????? ????????? ???????????? ?????????.</p>
            <label className={classes.laebelStyle}>???????????? <span style={{ color: 'red' }}>*</span></label>
            <Input
              name='ceo_name'
              onChange={handleChange}
              value={inputs.ceo_name}
              required
              placeholder="??????????????? ??????????????????."
              margin="normal"
            />
            <label className={classes.laebelStyle}>????????? ????????????</label>
            <Input
              name='reg_num'
              onChange={handleChange}
              value={inputs.reg_num}
              placeholder="????????? ??????????????????."
              margin="normal"
            />
            <label className={classes.laebelStyle}>??????</label>
            <Input
              name='addr1'
              onChange={handleChange}
              value={inputs.addr1}
              placeholder="????????? ??????????????????."
              margin="normal"
            />
          </div>
        </div>

        <div>
          <Typography variant='h6' align='left' className={classes.title}>????????????</Typography>
          <FormControl variant="outlined"
            style={{ width: '95%', margin: 10 }}>
            <div style={{ display: 'flex', alignItems: 'center' }}>
              <label className={classes.laebelStyle}>?????? ?????? <span style={{ color: 'red' }}>*</span></label>
              <Tooltip title={customerType}>
                <Info />
              </Tooltip>
            </div>
            <StyledSelect
              showArrow
              onChange={onChangeCustomer}
              showSearch={false}
              placeholder="?????? ??????">
              <Option value="0010001">????????????</Option>
              <Option value="0010002">????????????</Option>
            </StyledSelect>
          </FormControl>

          <FormControl variant="outlined"
            style={{ width: '95%', margin: 10 }}>
            <div style={{ display: 'flex', alignItems: 'center' }}>
              <label className={classes.laebelStyle}>?????? <span style={{ color: 'red' }}>*</span></label>
              <Tooltip title={tooltipTypeText}>
                <Info />
              </Tooltip>
            </div>
            <StyledSelect
              showArrow
              showSearch={false}
              onChange={onChangeGradeType}
              placeholder="??????/??????">
              {options}
            </StyledSelect>
          </FormControl>
        </div>

        <div>
          <Typography variant='h6' align='left' className={classes.title}>????????? ??????</Typography>
          <div className={classes.innerBox}>
            <label className={classes.laebelStyle}>?????? ???????????? </label>
            <Input
              name='acc_tel'
              onChange={handleChange}
              value={inputs.acc_tel}
              placeholder="?????? ??????????????? ??????????????????."
              margin="normal"
            />
            <label className={classes.laebelStyle}>?????? ????????????</label>
            <Input
              name='acc_fax'
              onChange={handleChange}
              value={inputs.acc_fax}
              placeholder="?????? ??????????????? ??????????????????"
              margin="normal"
            />
            <label className={classes.laebelStyle}>?????? ?????????</label>
            <Input
              name='acc_email'
              onChange={handleChange}
              value={inputs.acc_email}
              placeholder="?????? ???????????? ??????????????????"
              margin="normal"
            />
            <label className={classes.laebelStyle}>URL</label>
            <Input
              name='acc_url'
              onChange={handleChange}
              value={inputs.acc_url}
              type="url"
              placeholder="URL??? ??????????????????"
              margin="normal"
            />
          </div>
        </div>

        <div>
          <Typography variant='h6' align='left' className={classes.title}>
            <div style={{ display: 'flex', alignItems: 'center' }}>
              ????????? ??????
              <Tooltip title={managerTooltip}>
                <Info />
              </Tooltip>
            </div>
          </Typography>
          <div className={classes.innerBox}>
            <label className={classes.laebelStyle}>????????? ?????? </label>
            <Input
              name='man_name'
              onChange={handleChange}
              value={inputs.man_name}
              placeholder="????????? ????????? ??????????????????."
              margin="normal"
            />
            <label className={classes.laebelStyle}>????????? ??????</label>
            <Input
              name='dept'
              onChange={handleChange}
              value={inputs.dept}
              placeholder="????????? ????????? ??????????????????"
              margin="normal"
            />
            <label className={classes.laebelStyle}>????????? ??????</label>
            <Input
              name='posi'
              onChange={handleChange}
              value={inputs.posi}
              placeholder="????????? ????????? ??????????????????"
              margin="normal"
            />
            <label className={classes.laebelStyle}>????????? ?????????</label>
            <Input
              name='tel'
              onChange={handleChange}
              value={inputs.tel}
              placeholder="????????? ???????????? ??????????????????"
              margin="normal"
            />
          </div>
          <div style={{ marginLeft: '10px', fontSize: '13px', fontWeight: 500, color: '#333' }}>?????? ?????? ??? ???????????? ?????? ????????? ??? ???????????? </div>
        </div>
        <div className='mt-2'></div>
        <div>
          <Typography variant='h6' align='left' className={classes.title}>??????</Typography>
          <div className={classes.innerBox}>
            <TextArea
              rows={10}
              name='acc_etc'
              placeholder="????????? ??????????????????."
              onChange={handleChange}
              value={inputs.acc_etc}
            />
          </div>
        </div>

        <div>
          <Typography variant='h6' align='left' className={classes.title}>
            <div style={{ display: 'flex', alignItems: 'center' }}>
              ?????? ??????
              <Tooltip title={tagToolTip}>
                <Info />
              </Tooltip>
            </div>
          </Typography>
          <div className={classes.innerBox}>
            <Tags
              value={inputs.tags}
              settings={settings}
              placeholder='????????? ??????????????????'
              onChange={handleChange} />
            <p className={classes.descriptionTag}>????????? ?????? 5????????? ????????? ??? ????????????.</p>
          </div>
        </div>
        <div style={{ height: '60px' }}></div>
      </div>

    </>

  );
}
export default CustomerRegisterInfo
