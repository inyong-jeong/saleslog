import React, { useState, useEffect } from 'react';
import MyAppBar from '../../../../components/styledcomponent/MyAppBar';
import { useHistory } from 'react-router';
import { useStyles } from '../../registerManager';
import Typography from '@material-ui/core/Typography';
import { useParams } from 'react-router';
import { deleteCustomerManager, getManagerInfo } from '../../../../redux/customer/actions';
import { useDispatch, useSelector } from 'react-redux';
import { Collapse } from 'antd';
import cmm from 'constants/common';
import AvatarUp from '../../../../components/AvatarUp';
import { base64Dec, ConvertDate } from 'constants/commonFunc';
import { ExclamationCircleOutlined } from '@ant-design/icons';
import { Modal } from 'antd';
import { stat } from 'fs-extra';
import { useScrollToTop } from '../../../../constants/commonFunc';
import { ReactComponent as IdCard } from 'assets/icons/customer/idcard.svg'


const { confirm } = Modal
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
  const [managerPermission, setManagerPermission] = useState('N')
  const params = useParams()
  const dispatch = useDispatch()
  const state = useSelector(state => state.Customer)

  const managerDetails = state.managerDetails

  useScrollToTop()

  useEffect(() => {
    dispatch(getManagerInfo.call({ acc_idx: base64Dec(params.accId), accm_idx: base64Dec(params.singleId) }))
  }, [params.singleId])

  const navigateTo = () => {
    history.goBack()
  }

  const onEditClick = () => {
    history.push({
      pathname: `/main/manager/editManager/${params.singleId}/${params.accId}`,
    })
  }
  const onDeleteClick = () => {
    confirm({
      title: '해당 담당자를 삭제하시겠습니까?',
      icon: <ExclamationCircleOutlined />,
      cancelText: '취소',
      okText: '확인',
      onOk() {
        dispatch(deleteCustomerManager.call({ accm_idx: base64Dec(params.singleId) }))
        history.push({ pathname: '/main/customer' });
        window.location.reload()
      },
      onCancel() {
        //취소
      },
    })


  }


  useEffect(() => {
    if (state.getMangerResponse) {
      setPreview(cmm.SERVER_API_URL + cmm.FILE_PATH_FILES + managerDetails.man_photo)
      setManagerPermission(managerDetails.upd_yn)

      return
    }
    return setPreview(null)

  }, [state.loading])
  console.log(managerPermission)

  return (
    <div>
      <MyAppBar barTitle={'담당자 프로필'}
        showBackButton
        navigateTo={navigateTo}
        onEditClick={onEditClick}
        onDeleteClick={onDeleteClick}
        showThreeDots={managerPermission === 'Y' ? 'Y' : 'N'}
      // Dbutton={managerPermission === 'Y' ? 'Y' : 'N'}
      //Ubutton={managerPermission === 'Y' ? 'Y' : 'N'}
      />
      {
        state.getMangerResponse ?
          <>
            <div className='content_body'>
              <div style={{ display: 'flex', justifyContent: 'center', marginBottom: 10 }}>
                {managerDetails.man_photo ?
                  <AvatarUp
                    hideIcon
                    iconShape='square'
                    imgsrc={preview ? preview : null}
                    height={200}
                    style={{
                      padding: 0,
                      width: 300,
                      height: 200,
                    }} /> :
                  <div >
                    <IdCard />
                  </div>
                }
              </div>
              <Typography variant='h6' align='left' className={classes.title}>기본 정보</Typography>
              <div className={classes.innerBox}>
                <label className={classes.laebelStyle}>담당자명 </label>
                <p className={classes.showDetails}>{managerDetails.man_name}</p>
                <h1 style={lineStyle} />

                <label className={classes.laebelStyle}>직급 및 소속</label>
                <p className={classes.showDetails}>{managerDetails.dept} {managerDetails.posi}</p>
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
                <p className={classes.showDetails}>{ConvertDate(managerDetails.birthday)}</p>
                <h1 style={lineStyle} />

                <label className={classes.laebelStyle}>결혼기념일</label>
                <p className={classes.showDetails}>{ConvertDate(managerDetails.merryday)}</p>
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
          : <div></div>}
    </div>
  );
}

export default ManagerProfilePage;