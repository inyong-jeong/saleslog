import React, { useState, useEffect } from 'react';
import MyAppBar from '../../../../components/styledcomponent/MyAppBar';
import { useHistory } from 'react-router';
import { useStyles } from '../../registerManager';
import Typography from '@material-ui/core/Typography';
import { useParams } from 'react-router';
import { getManagerInfo } from '../../../../redux/customer/actions';
import { useDispatch, useSelector } from 'react-redux';
import { Collapse } from 'antd';
import cmm from 'constants/common';
import AvatarUp from '../../../../components/AvatarUp';

const { Panel } = Collapse
const ManagerProfilePage = () => {

  const classes = useStyles()
  const lineStyle = {
    borderWidth: '1px',
    borderColor: '#dddddd',
    borderStyle: 'dashed'
  };
  const history = useHistory()
  const [preview, setPreview] = useState(null)
  const params = useParams()
  const dispatch = useDispatch()
  const state = useSelector(state => state.Customer)

  const managerDetails = state.managerDetails

  useEffect(() => {
    dispatch(getManagerInfo.call({ acc_idx: params.accId, accm_idx: params.singleId }))
  }, [])

  const navigateTo = () => {
    history.goBack()
  }

  const onEditClick = () => {
    history.push({
      pathname: `/main/manager/editManager/${params.singleId}/${params.accId}`,
    })
  }

  useEffect(() => {
    state.getMangerResponse ? setPreview(cmm.SERVER_API_URL + cmm.FILE_PATH_FILES + managerDetails.man_photo) : setPreview(null)
  }, [state.loading])

  return (
    <div>
      <MyAppBar barTitle={'담당자 프로필'}
        showBackButton
        navigateTo={navigateTo}
        onEditClick={onEditClick}
      />
      {
        state.getMangerResponse ?
          <>
            <div>
              <div style={{ display: 'flex', justifyContent: 'center', margin: 10 }}>
                {managerDetails.man_photo ?
                  <AvatarUp
                    hideIcon
                    iconShape='square'
                    imgsrc={preview ? preview : ''}
                    height={200}
                    style={{
                      padding: 0,
                      width: 300,
                      height: 200,
                    }} /> : <p style={{ color: '#666', fontSize: 12, margin: 0, padding: 0 }}>등록된 명함이 없습니다.</p>}

              </div>
              <Typography variant='h6' align='left' className={classes.title}>기본 정보</Typography>
              <div className={classes.innerBox}>
                <label className={classes.laebelStyle}>담당자명 </label>
                <p className={classes.showDetails}>{managerDetails.man_name}</p>
                <h1 style={lineStyle} />

                <label className={classes.laebelStyle}>직급 및 소속</label>
                <p className={classes.showDetails}>{managerDetails.dept}</p>
                <h1 style={lineStyle} />
              </div>

              <Typography variant='h6' align='left' className={classes.title}>연락처 정보</Typography>
              <div className={classes.innerBox}>
                <label className={classes.laebelStyle}>이메일 주소</label>
                <p className={classes.showDetails}>{managerDetails.email}</p>
                <h1 style={lineStyle} />

                <label className={classes.laebelStyle}>휴대폰 번호</label>
                <p className={classes.showDetails}>{managerDetails.tel}</p>
                <h1 style={lineStyle} />

                <label className={classes.laebelStyle}>회사 전화번호</label>
                <p className={classes.showDetails}>{managerDetails.org_tel}</p>
                <h1 style={lineStyle} />

                <label className={classes.laebelStyle}>팩스 번호</label>
                <p className={classes.showDetails}>{managerDetails.fax}</p>
                <h1 style={lineStyle} />

                <label className={classes.laebelStyle}>자택 주소</label>
                <p className={classes.showDetails}>{managerDetails.local_area}</p>
                <h1 style={lineStyle} />
              </div>

              <Typography variant='h6' align='left' className={classes.title}>기념일</Typography>
              <div className={classes.innerBox}>
                <label className={classes.laebelStyle}>생일 </label>
                <p className={classes.showDetails}>{managerDetails.birthday}</p>
                <h1 style={lineStyle} />

                <label className={classes.laebelStyle}>결혼기념일</label>
                <p className={classes.showDetails}>{managerDetails.merryday}</p>
                <h1 style={lineStyle} />
              </div>

              <Typography variant='h6' align='left' className={classes.title}>기타 정보</Typography>
              <div style={{ padding: 5 }}>
                <Collapse accordion ghost expandIconPosition='right'>
                  <Panel header="인물 메모" key="1" >
                    <p className={classes.showDetails}>{managerDetails.etc}</p>
                  </Panel>
                  <Panel header="성격/성향" key="2" >
                    <p className={classes.showDetails}>{managerDetails.personality}</p>
                  </Panel>
                  <Panel header="관심사" key="3" >
                    <p className={classes.showDetails}>{managerDetails.interest}</p>
                  </Panel>

                  <Panel header="건강/취미" key="4" >
                    <p className={classes.showDetails}>{managerDetails.hobby}</p>
                  </Panel>

                  <Panel header="경력" key="5" >
                    <p className={classes.showDetails}>{managerDetails.org_history}</p>
                  </Panel>

                  <Panel header="출신 학교" key="6" >
                    <p className={classes.showDetails}>{managerDetails.school}</p>
                  </Panel>

                  <Panel header="가족 관계" key="7" >
                    <p className={classes.showDetails}>{managerDetails.family}</p>
                  </Panel>
                </Collapse>
              </div>
            </div>
          </>

          : console.log('담당자 profile 로딩중 ')}
    </div>
  );
}

export default ManagerProfilePage;