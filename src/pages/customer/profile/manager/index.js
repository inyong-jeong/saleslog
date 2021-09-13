import React, { useState, useEffect } from 'react';
import { useLocation } from 'react-router';
import MyAppBar from '../../../../components/styledcomponent/MyAppBar';
import { useMediaQuery } from 'react-responsive';
import { useHistory } from 'react-router';
import { useStyles } from '../../registerManager';
import Typography from '@material-ui/core/Typography';

const ManagerProfilePage = () => {

  const classes = useStyles()
  const lineStyle = {
    borderWidth: '1px',
    borderColor: '#dddddd',
    borderStyle: 'dashed'
  };

  const location = useLocation()
  const history = useHistory()

  const [customerId, setCustomerId] = useState()
  const [mangerId, setManagerId] = useState()

  useEffect(() => {
    //console.log(location.state)
  }, [location.accm_idx])
  const isMobile = useMediaQuery({
    query: "(max-width:991px)"
  });

  const navigateTo = () => {
    history.push({
      pathname: '/main/customer',
      state: {}
    })

  }

  const onEditClick = () => {
    history.push({
      pathname: '/main/manager/edit',
      state: {
        editMode: true,
        accm_idx: '',
        acc_idx: '',
      }
    })

  }
  return (
    <div>
      {isMobile && <MyAppBar barTitle={'담당자 프로필 '}
        showBackButton
        navigateTo={navigateTo}
        onEditClick={onEditClick}
      />}

      {/* loading 끝나면 뿌리기  */}
      <>
        <div>
          <Typography variant='h6' align='left' className={classes.title}>기본 정보</Typography>
          <div className={classes.innerBox}>
            <label className={classes.laebelStyle}>담당자명 </label>
            <p className={classes.showDetails}>{ }</p>
            <h1 style={lineStyle} />

            <label className={classes.laebelStyle}>직급 및 소속</label>
            <p className={classes.showDetails}>{ }</p>
            <h1 style={lineStyle} />
          </div>

          <Typography variant='h6' align='left' className={classes.title}>연락처 정보</Typography>
          <div className={classes.innerBox}>
            <label className={classes.laebelStyle}>이메일 주소</label>
            <p className={classes.showDetails}>{ }</p>
            <h1 style={lineStyle} />

            <label className={classes.laebelStyle}>휴대폰 번호</label>
            <p className={classes.showDetails}>{ }</p>
            <h1 style={lineStyle} />

            <label className={classes.laebelStyle}>회사 전화번호</label>
            <p className={classes.showDetails}>{ }</p>
            <h1 style={lineStyle} />

            <label className={classes.laebelStyle}>팩스 번호</label>
            <p className={classes.showDetails}>{ }</p>
            <h1 style={lineStyle} />

            <label className={classes.laebelStyle}>자택 주소</label>
            <p className={classes.showDetails}>{ }</p>
            <h1 style={lineStyle} />
          </div>

          <Typography variant='h6' align='left' className={classes.title}>기념일</Typography>
          <div className={classes.innerBox}>
            <label className={classes.laebelStyle}>생일 </label>
            <p className={classes.showDetails}>{ }</p>
            <h1 style={lineStyle} />

            <label className={classes.laebelStyle}>결혼기념일</label>
            <p className={classes.showDetails}>{ }</p>
            <h1 style={lineStyle} />
          </div>

          <Typography variant='h6' align='left' className={classes.title}>기타 정보</Typography>
          <div className={classes.innerBox}>
            <label className={classes.laebelStyle}>인물 메모 </label>
            <p className={classes.showDetails}>{ }</p>
            <h1 style={lineStyle} />

            <label className={classes.laebelStyle}>성격/성향</label>
            <p className={classes.showDetails}>{ }</p>
            <h1 style={lineStyle} />

            <label className={classes.laebelStyle}>성격/성향</label>
            <p className={classes.showDetails}>{ }</p>
            <h1 style={lineStyle} />

            <label className={classes.laebelStyle}>관심사</label>
            <p className={classes.showDetails}>{ }</p>
            <h1 style={lineStyle} />

            <label className={classes.laebelStyle}>건강/취미</label>
            <p className={classes.showDetails}>{ }</p>
            <h1 style={lineStyle} />

            <label className={classes.laebelStyle}>경력</label>
            <p className={classes.showDetails}>{ }</p>
            <h1 style={lineStyle} />

            <label className={classes.laebelStyle}>출신 학교</label>
            <p className={classes.showDetails}>{ }</p>
            <h1 style={lineStyle} />

            <label className={classes.laebelStyle}>가족 관계</label>
            <p className={classes.showDetails}>{ }</p>
            <h1 style={lineStyle} />
          </div>

        </div>


      </>

    </div>
  );
}

export default ManagerProfilePage;