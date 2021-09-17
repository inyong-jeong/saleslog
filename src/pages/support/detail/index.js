import React, { useEffect, useState } from 'react'
import MyAppBar from '../../../components/styledcomponent/MyAppBar';
import { useHistory, useParams } from 'react-router';
import { useDispatch } from 'react-redux';
import { getSupportInquiryDetail } from '../../../redux/support/actions';
import { useStyles } from '../../customer/registerManager';
import { Divider } from 'antd';
import Typography from '@material-ui/core/Typography';

const MyInquiryDetails = () => {
  const classes = useStyles()
  const history = useHistory()
  const dispatch = useDispatch()
  const params = useParams()
  //const state = useState(state => state.Support)

  const navigateTo = () => {
    history.goBack()
  }
  //  params.b_idx
  useEffect(() => {
    dispatch(getSupportInquiryDetail.call({ 'b_idx': params.b_idx }))
  }, [])

  return (
    <div>
      <MyAppBar
        barTitle='문의 상세보기'
        showBackButton
        navigateTo={navigateTo}
      />
      {/* {
        state.inquiryDetailsResponse ? */}
      <div style={{ margin: 10 }}>
        <Typography variant='h6' align='left' className={classes.title}>문의 제목</Typography>
        <div style={{ margin: 5, height: 20 }}>
          <p className={classes.showDetails}>문의 제목 여기에 </p>
        </div>
        <Typography variant='h6' align='left' className={classes.title}>문의 내용</Typography>
        <div style={{ margin: 5, height: 200 }}>
          <p className={classes.showDetails}>문의 내용 여기에</p>
        </div>
        <Divider />
      </div>
      {/* : null
      } */}
    </div>
  );
}

export default MyInquiryDetails;