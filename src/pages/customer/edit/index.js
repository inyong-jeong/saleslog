import {
  makeStyles, Typography, FormControl,
} from "@material-ui/core"
import { useState, useEffect } from "react"
import React from 'react';
import { getCustomerDetails, postEditCustomer } from "../../../redux/customer/actions";
import Input from '../../../components/styledcomponent/Input'
import { useDispatch, useSelector } from "react-redux";
import TextArea from "antd/lib/input/TextArea";
import StyledSelect from '../../../components/styledcomponent/StyledSelect';
import { useHistory } from "react-router";
import Tags from "@yaireo/tagify/dist/react.tagify" // React-wrapper file
import "@yaireo/tagify/dist/tagify.css" // Tagify CSS
import MyAppBar from "../../../components/styledcomponent/MyAppBar";
import { SET_NAVIBAR_SHOW } from 'constants/actionTypes';
import { useParams } from "react-router";
import { errorMessage } from "../../../constants/commonFunc";
import { base64Dec } from 'constants/commonFunc';

const { Option } = StyledSelect;
const useStyles = makeStyles({
  FormControl: {
    minWidth: 120,
  },
  outer: {
    background: '#ececec',
    marginBottom: 70, //bottom navigation 뒤에 가려짐 
  },

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

})

const CustomerEditPage = () => {

  const navigateTo = () => history.goBack()

  const params = useParams()
  const dispatch = useDispatch()
  const classes = useStyles()
  const state = useSelector(state => state.Customer)
  const acc_details = state.customerDetails

  useEffect(() => {
    dispatch({
      type: SET_NAVIBAR_SHOW,
      payload: false
    })
    dispatch(getCustomerDetails.call({ acc_idx: base64Dec(params.accId) }))
  }, [])

  const [gradeType, setGradeType] = useState([])
  const scoreType = [{ 'A': 'A' }, { 'B': 'B' }, { 'C': 'C' }, { 'D': 'D' }, { 'E': 'E' }, { 'F': 'F' }, { 'BLACK': 'BLACK' }]
  const stageType = [{ '발굴': '발굴' }, { '접촉': '접촉' }, { '제안': '제안' }, { '검증': '검증' }]
  const stageTypeArray = ['발굴', '접촉', '제안', '검증']
  const scoreTypeArray = ['A', 'B', 'C', 'D', 'E', 'F', 'BLACK']
  const options = []
  for (let result of gradeType) {
    options.push(<Option key={Object.values(result)}> {Object.keys(result)}</Option>)
  }

  //기존정보 보여주기 
  useEffect(() => {
    if (state.loading === false) {
      if (inputs.sales_gb === '0010001') {
        setGradeType(scoreType)
      } else {
        setGradeType(stageType)
      }

      setInputs(
        {
          ...inputs,
          account_name: acc_details.account_name,
          score: acc_details.score,
          ceo_name: acc_details.ceo_name,
          acc_tel: acc_details.acc_tel,
          acc_email: acc_details.acc_email,
          zipcode: acc_details.zipcode,
          addr1: acc_details.addr1,
          addr2: acc_details.addr2,
          lati: 0,
          longi: 0,
          reg_num: acc_details.reg_num,
          acc_etc: acc_details.acc_etc,
          tags: acc_details.tags,
          acc_fax: acc_details.acc_fax,
          sales_gb: acc_details.sales_gb,
          acc_url: acc_details.acc_url,
          acc_idx: acc_details.acc_idx,
        }
      )
    }
  }, [state.loading])

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
      acc_idx: '', //고객사 id 
      man_name: '',
      dept: '',
      posi: '',
      tel: '',
    }
  )

  const onSaveClick = () => {
    if (!inputs.account_name || !inputs.ceo_name) {
      return errorMessage('고객명, 대표자명은 필수 항목입니다.')
    }
    if (inputs.account_name.includes('(주)' || '주식회사')) {
      return errorMessage('주식회사, (주) 등 법인 형태를 구분하는 표기는 기재하지 마세요.')
    }

    if (inputs.sales_gb === '0010001') {
      if (stageTypeArray.includes(inputs.score)) {
        return errorMessage('거래고객 선택시 등급을 선택해야 합니다.')
      }

      if (!acc_details.man_names) {
        if (!inputs.man_name || !inputs.dept) {
          return errorMessage('거래고객 선택시 담당자명, 담당자 부서는 필수 항목입니다.')
        }
      }

    } else {
      if (scoreTypeArray.includes(inputs.score)) {
        return errorMessage('리드고객 선택시 단계를 선택해야 합니다.')
      }
    }

    dispatch(postEditCustomer.call(inputs))
    history.goBack()
  }

  console.log('고객사 수정:::', inputs)
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

  const onChangeCustomer = (value) => {
    setInputs({ ...inputs, sales_gb: value })
    if (value === '0010001') {
      setGradeType(scoreType)

    } else {
      setGradeType(stageType)

    }
  }
  const onChangeGradeType = (value) => {
    setInputs({ ...inputs, score: value })

  }

  const settings = {
    'maxTags': 5,
  }

  return (
    <>
      <MyAppBar
        barTitle={'고객 수정하기'}
        showBackButton
        navigateTo={navigateTo}
        onSaveClick={onSaveClick}
      />
      {acc_details && <div className='content_body'>
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
            <label className={classes.laebelStyle}>고객사 구분 <span style={{ color: 'red' }}>*</span></label>
            {/* <Tooltip title={descb1}>
              <InfoCircleOutlined style={{ color: 'rgba(0,0,0,.45)' }} />
            </Tooltip> */}

            <StyledSelect
              defaultValue={acc_details.sales_gb ? acc_details.sales_gb : null}
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
            <label className={classes.laebelStyle}>구분 <span style={{ color: 'red' }}>*</span></label>
            <StyledSelect
              defaultValue={acc_details.score}
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
        {acc_details.man_names ?
          null
          :
          <div>
            <Typography variant='h6' align='left' className={classes.title}>담당자 정보</Typography>
            {/* <p className={classes.descriptionTag}>고객사 수정시 담당자는 1명만 보입니다. 자세한 담당자는 고객 프로필에서 확인하세요.</p> */}
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

        }

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
          <Typography variant='h6' align='left' className={classes.title}>태그 등록</Typography>
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
      }
    </>
  );
}

export default CustomerEditPage;