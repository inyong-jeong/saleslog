import React, { useEffect, useState } from 'react';
import { useStyles } from '../../pages/customer/registerManager';
import Typography from '@material-ui/core/Typography';
import { useLocation } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux';
import { getCustomerDetails } from '../../redux/customer/actions';
import { Button } from 'antd';
import { SET_NAVIBAR_SHOW } from 'constants/actionTypes';


const CustomerProfilePage = () => {
  const classes = useStyles()
  const lineStyle = {
    borderWidth: '1px',
    borderColor: '#dddddd',
    borderStyle: 'dashed'
  };

  const dispatch = useDispatch()
  const location = useLocation()
  const state = useSelector(state => state.Customer)
  const acc_details = state.customerDetails
  const [customerId, setCustomerId] = useState(null)

  useEffect(() => {
    dispatch({
      type: SET_NAVIBAR_SHOW,
      payload: false
    })
  }, [])

  useEffect(() => {
    setCustomerId(location.state.acc_idx)
  }, [location])


  useEffect(() => {
    customerId && dispatch(getCustomerDetails.call({ acc_idx: customerId }))
  }, [customerId])

  const registerAccountsMan = () => {

  }

  return (
    <div style={{ paddingLeft: 5, paddingRight: 5, marginBottom: 70 }}>
      {state.getCustomerDetailsResponse ?
        <>
          <div>
            <Typography variant='h6' align='left' className={classes.title}>기본 정보</Typography>
            <div className={classes.innerBox}>
              <label className={classes.laebelStyle}>고객명 </label>
              <p className={classes.showDetails}>{acc_details.account_name}</p>
              <h1 style={lineStyle} />

              <label className={classes.laebelStyle}>대표자명 </label>
              <p className={classes.showDetails}>{acc_details.ceo_name}</p>
              <h1 style={lineStyle} />

              <label className={classes.laebelStyle}>사업자 등록번호</label>
              <p className={classes.showDetails}>{acc_details.reg_num}</p>
              <h1 style={lineStyle} />

              <label className={classes.laebelStyle}>주소</label>
              <p className={classes.showDetails}>{acc_details.addr1}</p>
              <h1 style={lineStyle} />
            </div>
          </div>

          <div>
            <Typography variant='h6' align='left' className={classes.title}>관리 정보</Typography>
            <div className={classes.innerBox}>
              <label className={classes.laebelStyle}> 고객구분 </label>
              {
                acc_details.sales_gb == '0010001' ? <p className={classes.showDetails}>거래고객</p> :
                  <p className={classes.showDetails}>리드고객</p>
              }
              <label className={classes.laebelStyle}>등급/단계</label>
              <p className={classes.showDetails}>{acc_details.score}</p>
            </div>
          </div>

          <div>
            <Typography variant='h6' align='left' className={classes.title}>연락처 정보</Typography>
            <div className={classes.innerBox}>
              <label className={classes.laebelStyle}>대표 전화번호 </label>
              <p className={classes.showDetails}>{acc_details.acc_tel}</p>
              <h1 style={lineStyle} />

              <label className={classes.laebelStyle}>대표 팩스번호</label>
              <p className={classes.showDetails}>{acc_details.acc_fax}</p>
              <h1 style={lineStyle} />

              <label className={classes.laebelStyle}>대표 이메일</label>
              <p className={classes.showDetails}>{acc_details.acc_email}</p>
              <h1 style={lineStyle} />

              <label className={classes.laebelStyle}>URL</label>
              <p className={classes.showDetails}>{acc_details.acc_url}</p>
            </div>
          </div>

          <div>
            <Typography variant='h6' align='left' className={classes.title}>담당자 정보</Typography>
            <div className={classes.innerBox}>
              <Button className={classes.addBtnStyle} onClick={registerAccountsMan}> + 담당자 추가 </Button>
            </div>
          </div>

          <div>
            <Typography variant='h6' align='left' className={classes.title}>메모</Typography>
            <div className={classes.innerBox}>
              <p style={{
                color: '#111111',
                fontSize: 12
              }}>{acc_details.acc_etc}</p>
            </div>
          </div>

          <div>
            <Typography variant='h6' align='left' className={classes.title}>태그</Typography>
            <div className={classes.innerBox}>
              <p className={classes.showDetails}>
                {
                  acc_details.tags ?
                    acc_details.tags.split(',').map((singleTag) =>
                      <span key={singleTag} style={{ fontSize: 12, fontWeight: 'normal', marginBottom: 0, color: '#666666', }}>
                        #{singleTag} </span>
                    )
                    : ''}
              </p>
            </div>
          </div>
        </> : console.log('loading...')
      }
    </div>
  )
}

export default CustomerProfilePage;