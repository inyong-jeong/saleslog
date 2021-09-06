import {
  makeStyles, TextField, Typography,
  Divider, FormControl, InputLabel,
  NativeSelect,
  IconButton
} from "@material-ui/core"
import { useRef, useState, useEffect } from "react"
import BlueButton from './button/BlueButton'
import React from 'react';
import { postCustomer } from "../../redux/customer/actions";
import Input from '../styledcomponent/Input'
import { useDispatch, useSelector } from "react-redux";
import TextArea from "antd/lib/input/TextArea";
import StyledSelect from '../styledcomponent/StyledSelect';
import PersonAddIcon from '@material-ui/icons/PersonAdd';
import { useHistory } from "react-router";


const { Option } = StyledSelect;
const useStyles = makeStyles({
  FormControl: {
    minWidth: 120,
  },
  outer: {
    background: '#ececec',
    marginBottom: 70, //bottom navigation 뒤에 가려짐 
  },
  inner: {
    background: '#fff',
    marginBottom: 15,
  },
  title: {
    marginTop: 10,
    marginLeft: 10,
    marginBottom: 10,
    paddingTop: 10,
  },
  innerBox: {
    margin: 10,
    padding: 10,
  },

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
    }
  )

  const handleSubmit = (e) => {
    e.preventDefault()

    if (!inputs.account_name || !inputs.ceo_name) {
      return alert('필수항목을 확인하세요')
    }

    dispatch(postCustomer.call(inputs))
  }

  const handleChange = (e) => {
    const value = e.target.value
    setInputs({
      ...inputs,
      [e.target.name]: value
    })
  }
  const history = useHistory()
  const registerAccountsMan = (e) => {
    history.push('/main/customer/register_manager')
  }

  return (

    <form noValidate autoComplete="off" onSubmit={handleSubmit}>
      <div className={classes.inner}>
        <Typography variant='h6' align='left' className={classes.title}>기본정보</Typography>
        <Divider variant="fullWidth" />

        <div className={classes.innerBox}>
          <Input
            ref={inputRef}
            name='account_name'
            onChange={handleChange}
            value={inputs.account_name}
            required
            label="고객사명"
            placeholder="고객사명 입력"
            margin="normal"
          />

          <Input
            name='ceo_name'
            onChange={handleChange}
            value={inputs.ceo_name}
            required
            label="대표자명"
            placeholder="대표자명 입력"
            margin="normal"
          />
          <Input
            name='reg_num'
            onChange={handleChange}
            value={inputs.reg_num}
            label="사업자 등록번호"
            placeholder="사업자 등록번호"
            margin="normal"
          />
          <Input
            name='addr1'
            onChange={handleChange}
            value={inputs.addr1}
            label="주소"
            placeholder="주소"
            margin="normal"
          />
        </div>
      </div>

      <div className={classes.inner}>
        <Typography variant='h6' align='left' className={classes.title}>관리정보</Typography>
        <Divider variant="fullWidth" />

        <FormControl variant="outlined"
          style={{ width: 140, margin: 10 }}>
          <StyledSelect
            showArrow
            showSearch={false}
            placeholder="고객 구분">
            <Option value="거래고객">거래고객</Option>
            <Option value="리드고객">리드고객</Option>
          </StyledSelect>

        </FormControl>

        <FormControl variant="outlined"
          style={{ width: 140, margin: 10 }}>
          <StyledSelect
            showArrow
            showSearch={false}
            placeholder="리드 단계">

            <Option value="발굴">발굴</Option>
            <Option value="접촉">접촉</Option>
            <Option value="제안">제안</Option>
            <Option value="검증">검증</Option>
          </StyledSelect>
        </FormControl>
      </div>

      <div className={classes.inner}>
        <Typography variant='h6' align='left' className={classes.title}>연락처 정보</Typography>
        <Divider variant="fullWidth" />
        <div className={classes.innerBox}>
          <Input
            name='acc_tel'
            onChange={handleChange}
            value={inputs.acc_tel}
            label="대표 전화번호"
            margin="normal"
          />
          <Input
            name='acc_email'
            onChange={handleChange}
            value={inputs.acc_email}
            label="대표 이메일"
            margin="normal"
          />
        </div>
      </div>

      <div>
        <p>담당자 정보</p>
        <IconButton onClick={registerAccountsMan}>
          <PersonAddIcon />
        </IconButton>
      </div>
      <div>
        <Typography variant='h6' align='left' className={classes.title}>태그 등록</Typography>

      </div>

      <div className={classes.inner}>
        <Typography variant='h6' align='left' className={classes.title}>메모</Typography>
        <Divider variant="fullWidth" />
        <div className={classes.innerBox}>
          <TextArea
            rows={10}
            name='acc_etc'
            onChange={handleChange}
            value={inputs.acc_etc}
          />
        </div>
      </div>

      <BlueButton name='등록하기' type="submit" />
    </form>

  );
}
export default CustomerRegisterInfo
