import React, { useEffect } from 'react'
import MyAppBar from '../../../components/styledcomponent/MyAppBar';
import { useHistory, useParams } from 'react-router';
import { useDispatch, useSelector } from 'react-redux';
import { getSupportInquiryDetail } from '../../../redux/support/actions';
import { useStyles } from '../../customer/registerManager';
import { Divider } from 'antd';
import Typography from '@material-ui/core/Typography';

const MyInquiryDetails = () => {
  const classes = useStyles()
  const history = useHistory()
  const dispatch = useDispatch()
  const params = useParams()
  const state = useSelector(state => state.Support)

  const navigateTo = () => {
    history.goBack()
  }

  useEffect(() => {
    dispatch(getSupportInquiryDetail.call({ 'b_idx': params.id }))

  }, [])
  return (
    <div>
      <MyAppBar
        barTitle='문의 상세보기'
        showBackButton
        navigateTo={navigateTo}
      />
      {
        state.inquiryDetailsResponse ?
          <div className='content_body'>

            <Typography variant='h6' align='left' className={classes.title}>문의 제목</Typography>
            <div style={{ marginLeft: 5, marginRight: 5, marginTop: 10, marginBottom: 10, height: 20 }}>

              <p className={classes.showDetails}>{state.inquiryDetails[0].title}</p>
            </div>
            <Typography variant='h6' align='left' className={classes.title}>문의 내용</Typography>
            <div style={{ marginLeft: 5, marginRight: 5, marginTop: 10, marginBottom: 10, height: 200 }}>
              <p className={classes.showDetails}>{state.inquiryDetails[0].q_content}</p>
            </div>
            <Divider />
          </div>
          : <p className={classes.showDetails}>문의 내역이 존재하지 않습니다.</p>
      }
    </div>
  );
}

export default MyInquiryDetails;