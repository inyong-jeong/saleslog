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
import { useScrollToTop } from "constants/commonFunc";
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

})

const CustomerEditPage = () => {

  const navigateTo = () => history.goBack()
  const params = useParams()
  const dispatch = useDispatch()
  const classes = useStyles()
  const state = useSelector(state => state.Customer)
  const acc_details = state.customerDetails

  useScrollToTop()
  useEffect(() => {
    dispatch({
      type: SET_NAVIBAR_SHOW,
      payload: false
    })
    dispatch(getCustomerDetails.call({ acc_idx: base64Dec(params.accId) }))
  }, [])

  const [gradeType, setGradeType] = useState([])
  const scoreType = [{ 'A': 'A' }, { 'B': 'B' }, { 'C': 'C' }, { 'D': 'D' }, { 'E': 'E' }, { 'F': 'F' }, { 'BLACK': 'BLACK' }]
  const stageType = [{ '??????': '??????' }, { '??????': '??????' }, { '??????': '??????' }, { '??????': '??????' }]
  const stageTypeArray = ['??????', '??????', '??????', '??????']
  const scoreTypeArray = ['A', 'B', 'C', 'D', 'E', 'F', 'BLACK']
  const options = []
  for (let result of gradeType) {
    options.push(<Option key={Object.values(result)}> {Object.keys(result)}</Option>)
  }

  //???????????? ???????????? 
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
      acc_idx: '', //????????? id 
      man_name: '',
      dept: '',
      posi: '',
      tel: '',
    }
  )

  const onSaveClick = () => {
    if (!inputs.account_name || !inputs.ceo_name) {
      return errorMessage('?????????, ??????????????? ?????? ???????????????.')
    }
    if (inputs.account_name.includes('(???)' || '????????????')) {
      return errorMessage('????????????, (???) ??? ?????? ????????? ???????????? ????????? ???????????? ?????????.')
    }

    if (inputs.sales_gb === '0010001') {
      if (stageTypeArray.includes(inputs.score)) {
        return errorMessage('???????????? ????????? ????????? ???????????? ?????????.')
      }

      // if (!acc_details.man_names) {
      //   if (!inputs.man_name || !inputs.dept) {
      //     return errorMessage('???????????? ????????? ????????????, ????????? ????????? ?????? ???????????????.')
      //   }
      // }

    } else {
      if (scoreTypeArray.includes(inputs.score)) {
        return errorMessage('???????????? ????????? ????????? ???????????? ?????????.')
      }
    }

    dispatch(postEditCustomer.call(inputs))
  }

  useEffect(() => {
    if (state.postCustomerEditResponse) {
      history.push({ pathname: '/main/customer', state: 'needReload' });
    }
  }, [state.postCustomerEditResponse])

  //console.log('????????? ??????:::', inputs)
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
        barTitle={'?????? ????????????'}
        showBackButton
        navigateTo={navigateTo}
        onSaveClick={onSaveClick}
      />
      {acc_details && <div className='content_body'>
        <div>
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
            <label className={classes.laebelStyle}>????????? ?????? <span style={{ color: 'red' }}>*</span></label>
            <StyledSelect
              defaultValue={acc_details.sales_gb ? acc_details.sales_gb : null}
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
            <label className={classes.laebelStyle}>?????? <span style={{ color: 'red' }}>*</span></label>
            <StyledSelect
              defaultValue={acc_details.score}
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
        {acc_details.man_names ?
          null
          :
          <div>
            <Typography variant='h6' align='left' className={classes.title}>????????? ??????</Typography>

            <div className={classes.innerBox}>
              <label className={classes.laebelStyle}>????????? ?????? </label>
              {/* <span style={{ fontSize: 12, color: 'red' }}>(* ???????????? ????????????)</span> */}
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
          </div>

        }

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
          <Typography variant='h6' align='left' className={classes.title}>?????? ??????</Typography>
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
      }
    </>
  );
}

export default CustomerEditPage;