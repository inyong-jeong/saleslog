import {
  makeStyles, Typography, FormControl,
} from "@material-ui/core"
import { useRef, useState } from "react"
import BlueButton from './button/BlueButton'
import React from 'react';
import { postCustomer } from "../../redux/customer/actions";
import Input from '../styledcomponent/Input'
import { useDispatch } from "react-redux";
import TextArea from "antd/lib/input/TextArea";
import StyledSelect from '../styledcomponent/StyledSelect';
import { useHistory } from "react-router";
import Tags from "@yaireo/tagify/dist/react.tagify" // React-wrapper file
import "@yaireo/tagify/dist/tagify.css" // Tagify CSS

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

  const dispatch = useDispatch()
  const classes = useStyles()
  const inputRef = useRef()


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

  const handleSubmit = (e) => {
    e.preventDefault()

    if (!inputs.account_name || !inputs.ceo_name) {
      return alert('필수항목을 확인하세요')
    }
    if (inputs.account_name.includes('(주)' || '주식회사')) {
      return alert('주식회사, (주) 등 법인 형태를 구분하는 표기는 기재하지 마세요.')
    }
    dispatch(postCustomer.call(inputs))
    history.push('/main/customer')
  }

  const handleChange = (e) => {
    const value = e.target.value

    setInputs({
      ...inputs,
      [e.target.name]: value
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
    console.log(inputs)
  }
  const [gradeType, setGradeType] = useState([])
  const scoreType = [{ 'A': 'A' }, { 'B': 'B' }, { 'C': 'C' }, { 'D': 'D' }, { 'E': 'E' }, { 'F': 'F' }, { 'BLACK': 'BLACK' }]
  const stageType = [{ '발굴': '발굴' }, { '접촉': '접촉' }, { '제안': '제안' }, { '검증': '검증' }]

  const options = []
  for (let result of gradeType) {
    options.push(<Option key={Object.values(result)}> {Object.keys(result)}</Option>)
  }


  const onTagChange = (e) => {
    e.preventDefault()
    const obj = e.detail.tagify.value

    const result = obj.map(e =>
      e.value
    )
    const overTen = result.find(elem => elem.length > 10)
    if (overTen) {
      //   return alert("태그 1개당 10글자를 넘을 수 없습니다.")
    }
    setInputs({
      ...inputs,
      'tags': result
    })
  }

  const settings = {
    'maxTags': 3,
  }

  const desc1 = ""
  return (

    <form noValidate autoComplete="off" onSubmit={handleSubmit}>
      <div>
        <Typography variant='h6' align='left' className={classes.title}>기본정보</Typography>
        <div className={classes.innerBox}>
          <label className={classes.laebelStyle}>고객명
          </label>
          <Input
            ref={inputRef}
            name='account_name'
            onChange={handleChange}
            value={inputs.account_name}
            required
            label="고객사명"
            placeholder="고객명을 입력해주세요."
            margin="normal"
          />
          <p className={classes.description}>주식회사, (주) 등 법인 형태를 구분하는 표기는 기재하지 마세요.</p>
          <label className={classes.laebelStyle}>대표자명</label>
          <Input
            name='ceo_name'
            onChange={handleChange}
            value={inputs.ceo_name}
            required
            label="대표자명"
            placeholder="대표자명을 입력해주세요."
            margin="normal"
          />
          <label className={classes.laebelStyle}>사업자 등록번호</label>
          <Input
            name='reg_num'
            onChange={handleChange}
            value={inputs.reg_num}
            label="사업자 등록번호"
            placeholder="숫자만 입력해주세요."
            margin="normal"
          />
          <label className={classes.laebelStyle}>주소</label>
          <Input
            name='addr1'
            onChange={handleChange}
            value={inputs.addr1}
            label="주소"
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
          <label className={classes.laebelStyle}>담당자 이름 </label>
          <Input
            name='man_name'
            onChange={handleChange}
            value={inputs.man_name}
            placeholder="담당자 이름을 입력해주세요."
            margin="normal"
          />
          <label className={classes.laebelStyle}>담당자 부서</label>
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
          {/* <Button className={classes.addBtnStyle} onClick={registerAccountsMan}> + 담당자 추가 </Button> */}
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
            settings={settings}
            placeholder='태그를 입력해주세요'
            onChange={onTagChange} />
          <p className={classes.descriptionTag}>태그당 입력가능 한 글자 수는 10자입니다.</p>
          <p className={classes.descriptionTag}>태그는 최대 3개까지 입력할 수 있습니다.</p>
        </div>
      </div>
      <BlueButton name='등록하기' type="submit" />

      <div style={{ height: '60px' }}></div>
    </form>

  );
}
export default CustomerRegisterInfo
