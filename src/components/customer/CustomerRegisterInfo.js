import {
  makeStyles, Typography, FormControl,
} from "@material-ui/core"
import { useState, useEffect } from "react"
import React from 'react';
import { getCustomerDetails, postCustomer, postEditCustomer } from "../../redux/customer/actions";
import Input from '../styledcomponent/Input'
import { useDispatch, useSelector } from "react-redux";
import TextArea from "antd/lib/input/TextArea";
import StyledSelect from '../styledcomponent/StyledSelect';
import { useHistory } from "react-router";
import Tags from "@yaireo/tagify/dist/react.tagify" // React-wrapper file
import "@yaireo/tagify/dist/tagify.css" // Tagify CSS
import { useMediaQuery } from 'react-responsive';
import MyAppBar from "../../components/styledcomponent/MyAppBar";
import { SET_NAVIBAR_SHOW } from 'constants/actionTypes';


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
  addBtnStyle: {
    margin: 10,
    fontSize: 14,
    color: '#333333',
  }

})

const CustomerRegisterInfo = () => {
  const isMobile = useMediaQuery({
    query: "(max-width:991px)"
  });

  const navigateTo = () => history.push('/main/customer')

  const dispatch = useDispatch()
  const classes = useStyles()

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

  //조건
  /*
  1. 고객명 띄어쓰기 없음, 주식회사, (주) 예외처리
  2. 대표자 총 3명까지
  3. 사업자 번호 숫자만 허용 10자리 (- 로 출력되게 나중에 처리)
  4. 고객구분  라벨 메시지 
  거래고객 : 현재 거래 중인 고객- 리드고객  : 신규 고객으로 유치하고자 하는 타깃 고객
  거래고객일떄 등급 메시지 : - 고객의 거래규모, 신용도, 재무상태 등 거래와 관련된 다양한 요소를 참고하여 임의의 관리 등급을 지정해서 관리할 수 있습니다.
  리드고객일떄  둥굽 메시지 : - 리드관리는 [발굴] → [조사] → [제안] → [검증] 단계로 과정을 구분합니다. 향후 고객으로 전환된 경우 ‘영업활동‘ 고객으로 고객 구분을 변경해서 관리할 수 있습니다.- 리드관리 단계는 상황에 따라 축소 또는 생략할 수 있습니다.리드 단계의 정의- 발굴 : 잠재고객으로 선정 후 고객의 니즈 파악, 거래가능성 등 조사를 진행 중인 단계- 접촉 : 잠재고객과 접촉을 위한 사전 활동 또는 접촉 중인 단계- 제안 : 자사의 상품(서비스)에 대한 규격, 품질, 가격 등 구체적 제안 및 제안을 준비하거나 진행 중인 단계- 검증 : 자사의 상품(서비스) 공급(계약)을 위한 최종 검증(POC) 및 검증과 유사한 활동이 진행 중인 단계
  5. 담당자 라벨 메시지
  - 고객(기업)의 대표자, 핵심 관리자, 거래 담당자 등 임직원 인물 정보는 거래 가능성을 높이는 효과적인 세일즈 활동에 핵심 자원입니다.
  6. 태그 메시지
  - 태그는 고객 목록에 고객 정보와 함께 출력되는 인식이 용이한 핵심키워드 입니다.
  7. 태그 인식자 # ? (가능할지 확인)
  8. 
  */

  const onSaveClick = (e) => {
    if (!inputs.account_name || !inputs.ceo_name || !inputs.man_name || !inputs.dept) {
      return alert('고객명, 대표자명, 담당자명, 담당자 부서는 필수 항목입니다.')
    }
    if (inputs.account_name.includes('(주)' || '주식회사')) {
      return alert('주식회사, (주) 등 법인 형태를 구분하는 표기는 기재하지 마세요.')
    }
    dispatch(postCustomer.call(inputs))

    setInterval(() => {
      history.push({
        pathname: '/main/customer',
        state: {
          needRefresh: true,
        }
      })
    }, 1000);
  }

  useEffect(() => {
    dispatch({
      type: SET_NAVIBAR_SHOW,
      payload: false
    })
    // setCustomerId(null)
    // setEditMode(null)

  }, [])

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
    if (value == '0010001') {
      setGradeType(scoreType)
    } else {
      setGradeType(stageType)
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
      {isMobile && <MyAppBar
        barTitle={'고객 등록하기'}
        showBackButton
        navigateTo={navigateTo}
        onSaveClick={onSaveClick}
      />}

      <div>
        <div>
          <Typography variant='h6' align='left' className={classes.title}>기본정보</Typography>
          <div className={classes.innerBox}>
            <label className={classes.laebelStyle}>고객명 *</label>
            <Input
              name='account_name'
              onChange={handleChange}
              value={inputs.account_name}
              required
              placeholder="고객명을 입력해주세요."
              margin="normal"
            />
            <p className={classes.description}>주식회사, (주) 등 법인 형태를 구분하는 표기는 기재하지 마세요.</p>
            <label className={classes.laebelStyle}>대표자명 *</label>
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
            <label className={classes.laebelStyle}>고객사 구분</label>
            {/* <Tooltip title={desc1}>
            <InfoCircleOutlined style={{ color: 'rgba(0,0,0,.45)' }} />
          </Tooltip> */}
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
            <label className={classes.laebelStyle}>구분</label>
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
          <Typography variant='h6' align='left' className={classes.title}>담당자 정보</Typography>
          <div className={classes.innerBox}>
            <label className={classes.laebelStyle}>담당자 이름 *</label>
            <Input
              name='man_name'
              onChange={handleChange}
              value={inputs.man_name}
              placeholder="담당자 이름을 입력해주세요."
              margin="normal"
            />
            <label className={classes.laebelStyle}>담당자 부서 *</label>
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
          <Typography variant='h6' align='left' className={classes.title}>태그 등록</Typography>
          <div className={classes.innerBox}>
            <Tags
              value={inputs.tags}
              settings={settings}
              placeholder='태그를 입력해주세요'
              onChange={handleChange} />
            {/* <p className={classes.descriptionTag}>태그당 입력가능 한 글자 수는 10자입니다.</p> */}
            <p className={classes.descriptionTag}>태그는 최대 5개까지 입력할 수 있습니다.</p>
          </div>
        </div>
        {/* <BlueButton name='등록하기' type="submit" /> */}
        <div style={{ height: '60px' }}></div>
      </div>

    </>

  );
}
export default CustomerRegisterInfo
