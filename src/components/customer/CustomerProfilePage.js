import React, { useEffect, useState } from 'react';
import { useStyles } from '../../pages/customer/registerManager';
import Typography from '@material-ui/core/Typography';
import { useDispatch, useSelector } from 'react-redux';
import { getCustomerDetails } from '../../redux/customer/actions';
import { Button } from 'antd';
import { useHistory } from 'react-router';
import { base64Enc } from 'constants/commonFunc';
import styles from '../../assets/style/Main.module.css'
const CustomerProfilePage = ({ customerId, managerId, onPermission }) => {

  const classes = useStyles()
  const lineStyle = {
    borderWidth: '1px',
    borderColor: '#dddddd',
    borderStyle: 'dashed'
  };
  const history = useHistory()
  const dispatch = useDispatch()
  const state = useSelector(state => state.Customer)
  const acc_details = state.customerDetails
  const [singleId, setSingleId] = useState(null)

  const manIds = []
  const manNames = []
  const names_ids = []
  useEffect(() => {
    customerId && dispatch(getCustomerDetails.call({ acc_idx: customerId }))
  }, [customerId])

  const registerAccountsMan = () => {
    history.push({
      pathname: `/main/customer/register_manager/${base64Enc(customerId)}/${base64Enc(managerId)}`,
    })

  }
  const managerClick = e => {
    const value = e.target.innerHTML

    names_ids.forEach((val, idIndex) => {
      if (val == value) {
        return setSingleId(idIndex)
      }
    })
  }
  useEffect(() => {

    singleId &&
      history.push({
        pathname: `/main/manager/profile/${base64Enc(customerId)}/${base64Enc(singleId)}`,
      })
  }, [singleId])

  useEffect(() => {
    state.getCustomerDetailsResponse && onPermission(acc_details.upd_yn)
  }, [acc_details])

  return (
    <div>
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
              <h1 style={lineStyle} />
            </div>
          </div>

          <div>
            <Typography variant='h6' align='left' className={classes.title}>담당자 정보</Typography>
            <div className={classes.innerBox}>
              <label className={classes.laebelStyle}>담당자</label>
              <p style={{ fontSize: 12, color: '#333333' }}>담당자를 클릭하여 담당자 상세정보를 확인하세요.</p>

              <div>
                {acc_details.man_names &&
                  acc_details.man_names.split(',').map(singleName => {
                    manNames.push(singleName)
                  })
                }
                {acc_details.accm_idxs &&
                  acc_details.accm_idxs.split(',').map(manId => {
                    manIds.push(manId)
                  })
                }
                {
                  manNames.map((obj, index) => {
                    names_ids[manIds[index]] = obj
                    return <p key={manIds[index]} onClick={managerClick} className={styles.managerWrapper}>{obj}</p>
                  })
                }
              </div>
              <Button style={{ marginTop: 15, fontSize: 14 }} onClick={registerAccountsMan}> + 담당자 추가 </Button>
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
        </> : null
      }
    </div>
  )
}

export default CustomerProfilePage;