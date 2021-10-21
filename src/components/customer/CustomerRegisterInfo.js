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
import { Tooltip } from "antd";
import { ReactComponent as Info } from '../../assets/icons/info.svg'
import { customerType, gradeTypeTooltip, stageTypeTooltip, managerTooltip, tagToolTip } from './toolTipText'

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
  }

})

const CustomerRegisterInfo = () => {

  const navigateTo = () => history.goBack()

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

  useEffect(() => {
    dispatch({
      type: SET_NAVIBAR_SHOW,
      payload: false
    })

  }, [])

  const onSaveClick = () => {
    if (!inputs.account_name || !inputs.ceo_name) {
      return errorMessage('고객명, 대표자명은 필수 항목입니다.')
    }
    if (inputs.account_name.includes('(주)' || '주식회사')) {
      return errorMessage('주식회사, (주) 등 법인 형태를 구분하는 표기는 기재하지 마세요.')
    }
    if (!inputs.sales_gb || !inputs.score) {
      return errorMessage('고객사 구분 및 등급/단계 선택은 필수 항목입니다.')
    }
    if (inputs.sales_gb === '0010001') { //거래고객시 담당자명 및 부서는 필수 
      if (!inputs.man_name || !inputs.dept) {
        return errorMessage('거래고객 선택시 담당자명, 담당자 부서는 필수 항목입니다.')
      }
    }

    if (inputs.reg_num.length > 0) {
      if (inputs.reg_num.length != 10 || inputs.reg_num.includes("-")) {
        return errorMessage('사업자 번호는 10자리로 숫자만을 입력해야합니다. *(-)제외')
      }

    }


    dispatch(postCustomer.call(inputs))

  }
  useEffect(() => {
    if (state.postCustomerResponse) {
      history.goBack()
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

  const [gradeType, setGradeType] = useState([])
  const scoreType = [{ 'A': 'A' }, { 'B': 'B' }, { 'C': 'C' }, { 'D': 'D' }, { 'E': 'E' }, { 'F': 'F' }, { 'BLACK': 'BLACK' }]
  const stageType = [{ '발굴': '발굴' }, { '접촉': '접촉' }, { '제안': '제안' }, { '검증': '검증' }]

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
        barTitle={'고객 등록하기'}
        showBackButton
        navigateTo={navigateTo}
        onSaveClick={onSaveClick}
      />

      <div className='content_body'>
        <div>
          <Typography variant='h6' align='left' className={classes.title}>기본정보</Typography>
          <div className={classes.innerBox}>
            <label className={classes.laebelStyle}>고객명 <span style={{ color: 'red' }}>*</span></label>
            <Input
              name='account_name'
              onChange={handleChange}
              value={inputs.account_name}
              required
              placeholder="고객명을 입력해주세요."
              margin="normal"
            />
            <p className={classes.description}>주식회사, (주) 등 법인 형태를 구분하는 표기는 기재하지 마세요.</p>
            <label className={classes.laebelStyle}>대표자명 <span style={{ color: 'red' }}>*</span></label>
            <Input
              name='ceo_name'
              onChange={handleChange}
              value={inputs.ceo_name}
              required
              placeholder="대표자명을 입력해주세요."
              margin="normal"
            />
            <label className={classes.laebelStyle}>사업자 등록번호</label>
            <Input
              name='reg_num'
              onChange={handleChange}
              value={inputs.reg_num}
              placeholder="숫자만 입력해주세요."
              margin="normal"
            />
            <label className={classes.laebelStyle}>주소</label>
            <Input
              name='addr1'
              onChange={handleChange}
              value={inputs.addr1}
              placeholder="주소를 입력해주세요."
              margin="normal"
            />
          </div>
        </div>

        <div>
          <Typography variant='h6' align='left' className={classes.title}>관리정보</Typography>
          <FormControl variant="outlined"
            style={{ width: '95%', margin: 10 }}>
            <div style={{ display: 'flex', alignItems: 'center' }}>
              <label className={classes.laebelStyle}>고객 구분 <span style={{ color: 'red' }}>*</span></label>
              <Tooltip title={customerType}>
                <Info />
              </Tooltip>
            </div>
            <StyledSelect
              showArrow
              onChange={onChangeCustomer}
              showSearch={false}
              placeholder="고객 구분">
              <Option value="0010001">거래고객</Option>
              <Option value="0010002">리드고객</Option>
            </StyledSelect>
          </FormControl>

          <FormControl variant="outlined"
            style={{ width: '95%', margin: 10 }}>
            <div style={{ display: 'flex', alignItems: 'center' }}>
              <label className={classes.laebelStyle}>구분 <span style={{ color: 'red' }}>*</span></label>
              <Tooltip title={tooltipTypeText}>
                <Info />
              </Tooltip>
            </div>
            <StyledSelect
              showArrow
              showSearch={false}
              onChange={onChangeGradeType}
              placeholder="등급/단계">
              {options}
            </StyledSelect>
          </FormControl>
        </div>

        <div>
          <Typography variant='h6' align='left' className={classes.title}>연락처 정보</Typography>
          <div className={classes.innerBox}>
            <label className={classes.laebelStyle}>대표 전화번호 </label>
            <Input
              name='acc_tel'
              onChange={handleChange}
              value={inputs.acc_tel}
              placeholder="대표 전화번호를 입력해주세요."
              margin="normal"
            />
            <label className={classes.laebelStyle}>대표 팩스번호</label>
            <Input
              name='acc_fax'
              onChange={handleChange}
              value={inputs.acc_fax}
              placeholder="대표 팩스번호를 입력해주세요"
              margin="normal"
            />
            <label className={classes.laebelStyle}>대표 이메일</label>
            <Input
              name='acc_email'
              onChange={handleChange}
              value={inputs.acc_email}
              placeholder="대표 이메일을 입력해주세요"
              margin="normal"
            />
            <label className={classes.laebelStyle}>URL</label>
            <Input
              name='acc_url'
              onChange={handleChange}
              value={inputs.acc_url}
              type="url"
              placeholder="URL을 입력해주세요"
              margin="normal"
            />
          </div>
        </div>

        <div>
          <Typography variant='h6' align='left' className={classes.title}>
            <div style={{ display: 'flex', alignItems: 'center' }}>
              담당자 정보
              <Tooltip title={managerTooltip}>
                <Info />
              </Tooltip>
            </div>
          </Typography>
          <div className={classes.innerBox}>
            <label className={classes.laebelStyle}>담당자 이름 <span style={{ fontSize: 12, color: 'red' }}>(* 거래고객 필수항목)</span></label>
            <Input
              name='man_name'
              onChange={handleChange}
              value={inputs.man_name}
              placeholder="담당자 이름을 입력해주세요."
              margin="normal"
            />
            <label className={classes.laebelStyle}>담당자 부서 <span style={{ fontSize: 12, color: 'red' }}>(* 거래고객 필수항목)</span></label>
            <Input
              name='dept'
              onChange={handleChange}
              value={inputs.dept}
              placeholder="담당자 부서를 입력해주세요"
              margin="normal"
            />
            <label className={classes.laebelStyle}>담당자 직책</label>
            <Input
              name='posi'
              onChange={handleChange}
              value={inputs.posi}
              placeholder="담당자 직책을 입력해주세요"
              margin="normal"
            />
            <label className={classes.laebelStyle}>담당자 연락처</label>
            <Input
              name='tel'
              onChange={handleChange}
              value={inputs.tel}
              placeholder="담당자 연락처를 입력해주세요"
              margin="normal"
            />
          </div>
        </div>

        <div>
          <Typography variant='h6' align='left' className={classes.title}>메모</Typography>
          <div className={classes.innerBox}>
            <TextArea
              rows={10}
              name='acc_etc'
              placeholder="내용을 입력해주세요."
              onChange={handleChange}
              value={inputs.acc_etc}
            />
          </div>
        </div>

        <div>
          <Typography variant='h6' align='left' className={classes.title}>
            <div style={{ display: 'flex', alignItems: 'center' }}>
              태그 등록
              <Tooltip title={tagToolTip}>
                <Info />
              </Tooltip>
            </div>
          </Typography>
          <div className={classes.innerBox}>
            <Tags
              value={inputs.tags}
              settings={settings}
              placeholder='태그를 입력해주세요'
              onChange={handleChange} />
            <p className={classes.descriptionTag}>태그는 최대 5개까지 입력할 수 있습니다.</p>
          </div>
        </div>
        <div style={{ height: '60px' }}></div>
      </div>

    </>

  );
}
export default CustomerRegisterInfo
