import { createTheme, ThemeProvider, makeStyles } from '@material-ui/core/styles';
import { useMediaQuery } from 'react-responsive';
import { SET_NAVIBAR_SHOW } from 'constants/actionTypes';
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import React, {useState, useEffect } from 'react';
import MyAppBar from "components/styledcomponent/MyAppBar";
import  IconLabel from 'components/IconLabel';
import { useHistory } from 'react-router';
import { Modal, Divider, Button } from 'antd';
import { getWorkGroupInfo } from 'redux/workgroup/actions';
import cmm from 'constants/common';


const useStyles = makeStyles({
  bottomBar: {
    width: '100%',
    position: 'fixed',
    bottom: 60,
    left:0,
    display: 'flex',
    verticalAlign: 'middle',
    alignItems: 'center',
    justifyContent:'center'
  },

});

const theme = createTheme({
  palette: {
    primary: {
      main: '#0000FF',
    }
  },
});

const WgroupManagePage = (props) => {  
  const classes = useStyles();
  const state = useSelector(state => state.Workgroup)
  const history = useHistory()
  const navigateTo = () => history.push('/main/customer')
  const navigateNext = () => { setIsShowModal(true)}
  const dispatch = useDispatch()
  const data = state.data;
  const [isShowModal, setIsShowModal] = useState(false)
  // body
  const [inputs, setInputs] = useState(
    {
      data: null,
    }
  )
  
  const isMobile = useMediaQuery({
    query: "(max-width:991px)"
  });

 

  useEffect(()=> {
    // 하단 네비 설정 
    dispatch({
      type: SET_NAVIBAR_SHOW,
      payload: true}
    )

    //워크그룹 정보 가져오기
    dispatch(getWorkGroupInfo.call())

  },[])

  
  useEffect(()=> {
    if (!cmm.isEmpty(data)) {
      console.log('workgroup data:::::::',data)
      setInputs({ ...inputs, data:data[0], prevImg: (cmm.isEmpty(data[0].logo_url)?'':cmm.SERVER_API_URL + cmm.FILE_PATH_FILES + data[0].logo_url) })      
    }
      
  },[data])

  return (
    <ThemeProvider theme={theme}>
      {<MyAppBar 
          barTitle={(cmm.isEmpty(inputs.data))?'워크그룹':inputs.data.organization} 
          navigateTo={navigateTo} 
          navigateNext={navigateNext} 
          />}     
      <div style={{height:20}}></div>
      <IconLabel title="정보 수정" pathUri="main/workgroup/register"></IconLabel>
      <Divider style={{margin:10}}/>
      <IconLabel title="맴버 관리" pathUri="main/customer"></IconLabel>
      <Divider style={{margin:10}}/>
      <IconLabel title="조직도 설정" pathUri="main/workgroup/dept"></IconLabel>
      <Divider style={{margin:10}}/>
      <div className={classes.bottomBar} >
        <IconLabel title="워크그룹 나가기" pathUri="main/customer" isIcon={false}></IconLabel>
        <div>&nbsp; |&nbsp; </div>
        <IconLabel title="워크그룹 삭제" pathUri="main/customer" isIcon={false}></IconLabel>
      </div>
      <Modal
        title="워크그룹 선택"
        style={{ positon:'fixed', left:0, top:100}}
        visible={isShowModal}
        width={((isMobile)?'90%':'50%')}        
        onOk={() => { setIsShowModal(false) }}
        onCancel={() => { setIsShowModal(false) }}
        footer={[
          <div key={1} 
              style={{
                position:'absolute', 
                display:'flex',
                justifyContent:'center',
                backgroundColor:'#ffffff',
                left:0, 
                width:'100%', 
                height:70
              }}><div
                    style={{ 
                      margin:5, 
                      fontSize:16, 
                      width:'90%', 
                      backgroundColor:'#333333',
                      height:48,
                    }}><Button 
                          ghost
                          style={{  
                            fontSize:16, 
                            width:'100%', 
                            height:'100%'
                          }}
                          key={1} 
                          onClick={() => { 
                              setIsShowModal(false)
                          }}>워크그룹 생성</Button></div>
          </div>
        ]}
        >
          <Button 
              onClick={() => { setIsShowModal(false)}}
              style={{ width:100}}
              
              >test</Button>
      </Modal>
    </ThemeProvider>
  );
}

export default WgroupManagePage;