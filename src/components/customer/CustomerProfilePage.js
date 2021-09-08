import React, { useEffect } from 'react';
import { useStyles } from '../../pages/customer/registerManager';
import Typography from '@material-ui/core/Typography';

const CustomerProfilePage = () => {

  const classes = useStyles()

  useEffect(() => {
    //고객사 프로필 가져오기 
  }, [])
  const lineStyle = {
    borderWidth: '1px',
    borderColor: '#dddddd',
    borderStyle: 'dashed'
  };

  return (
    <div style={{ paddingLeft: 5, paddingRight: 5 }}>
      <div>
        <Typography variant='h6' align='left' className={classes.title}>기본 정보</Typography>
        <div className={classes.innerBox}>
          <label className={classes.laebelStyle}>고객명 </label>
          <h1 style={lineStyle} />

          <label className={classes.laebelStyle}>대표 이미지 </label>
          <h1 style={lineStyle} />

          <label className={classes.laebelStyle}>대표자명 </label>
          <h1 style={lineStyle} />

          <label className={classes.laebelStyle}>사업자 등록번호</label>
          <h1 style={lineStyle} />

          <label className={classes.laebelStyle}>주소</label>
          <h1 style={lineStyle} />
        </div>
      </div>

      <div>
        <Typography variant='h6' align='left' className={classes.title}>관리 정보</Typography>
        <div className={classes.innerBox}>
          <label className={classes.laebelStyle}>관리 정보 </label>
          <br />
          <label className={classes.laebelStyle}>연락처 정보 </label>

        </div>
      </div>

      <div>
        <Typography variant='h6' align='left' className={classes.title}>연락처 정보</Typography>
        <div className={classes.innerBox}>
          <label className={classes.laebelStyle}>대표 전화번호 </label>
          <h1 style={lineStyle} />

          <label className={classes.laebelStyle}>대표 팩스번호</label>
          <h1 style={lineStyle} />

          <label className={classes.laebelStyle}>대표 이메일</label>
          <h1 style={lineStyle} />

          <label className={classes.laebelStyle}>URL</label>

        </div>
      </div>
      <div>
        <Typography variant='h6' align='left' className={classes.title}>메모</Typography>
        <div className={classes.innerBox}>
          <p>메모 내용을 이곳에 적지요. 내용이 들어갈 자리 몇줄이 들어가든 유저가 작성하는 대로 텍스트가 솔팅되도록 설정 내용이 들어갈 자리 몇줄이 들어가든 유저가 작성하는 대로 텍스트가 솔팅되도록 설정 내용이 들어갈 자리 몇줄이 들어가든 유저가 작성하는 대로 텍스트가 솔팅되도록 설정내용이 들어갈 자리 몇줄이 들어가든 유저가 작성하는 대로 텍스트가 솔팅되도록 설정 내용이 들어갈 자리 몇줄이 들어가든 유저가 작성하는 대로 텍스트가 솔팅되도록 설정 내용이 들어갈 자리 몇줄이 들어가든 유저가 작성하는 대로 텍스트가 솔팅되도록 설정내용이 들어갈 자리 몇줄이 들어가든 유저가 작성하는 대로 텍스트가 솔팅되도록 설정 내용이 들어갈 자리 몇줄이 들어가든 유저가 작성하는 대로 텍스트가 솔팅되도록 설정 내용이 들어갈 자리 몇줄이 들어가든 유저가 작성하는 대로 텍스트가 솔팅되도록 설정</p>
        </div>
      </div>

      <div>
        <Typography variant='h6' align='left' className={classes.title}>태그</Typography>
        <div className={classes.innerBox}>
          태그가 여기에.. 아직 안함
        </div>
      </div>
    </div>
  )
}

export default CustomerProfilePage;