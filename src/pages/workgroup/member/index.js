import { createTheme, ThemeProvider, makeStyles } from '@material-ui/core/styles';
import { useMediaQuery } from 'react-responsive';
import { SET_NAVIBAR_SHOW } from 'constants/actionTypes';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import InfiniteScroll from 'react-infinite-scroll-component';
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import React, {useState, useEffect } from 'react';
import MyAppBar from "components/styledcomponent/MyAppBar";
import {EllipsisOutlined} from "@ant-design/icons";
import { useHistory } from 'react-router';
import { Modal, Divider, Button, Avatar } from 'antd';
import { getWorkGroupInfo, getGroupMemberList } from 'redux/workgroup/actions';
import cmm from 'constants/common';

const useStyles = makeStyles((theme) =>({
  root: {
    width: '100%',
    backgroundColor: theme.palette.background.paper,
    marginTop:20,
    marginBottom: 100, //nav bottom tab 
  },
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

}));

const theme = createTheme({
  palette: {
    primary: {
      main: '#0000FF',
    }
  },
});

const WgroupMemberPage = (props) => {  
  const classes = useStyles();
  const state = useSelector(state => state.Workgroup)
  const history = useHistory()
  const dispatch = useDispatch()
  const data = state.data;
  const [isShowModal, setIsShowModal] = useState(false)
  const [memberList, setMemberList] = useState([])
  const [groupInfo, setGroupInfo] = useState()
  
  
  const isMobile = useMediaQuery({
    query: "(max-width:991px)"
  });

  //이전페이지
  const navigateTo = () => history.push('/main/workgroup')

  useEffect(()=> {
    // 하단 네비 설정 
    dispatch({
      type: SET_NAVIBAR_SHOW,
      payload: true}
    )

    //워크그룹 정보 가져오기
    dispatch(getWorkGroupInfo.call())   

    //워크그룹 맴버 가져오기
    dispatch(getGroupMemberList.call({srch:''}))

  },[])
  
  useEffect(()=> {
    if (state.data && state.data.length > 0) {
      setGroupInfo(state.data[0]);
    }
      
  },[state.data])

  useEffect(()=> {
    if (state.getGroupMemberListRes) {
      setMemberList(state.getGroupMemberListRes);
    }      
  },[state.getGroupMemberListRes])

  
  return (
    <ThemeProvider theme={theme}>
      {<MyAppBar 
          barTitle={(groupInfo)?groupInfo.organization:'워크그룹'}        
          showBackButton
          navigateTo={navigateTo} 
          />}     
        <InfiniteScroll
          hasMore={true}
          dataLength={memberList.length} >
        <List className={classes.root}>
          {((memberList) ? memberList.map((item, index) =>{
                      const { login_idx, 
                        permissions, 
                        dept_idx, 
                        dept_name, 
                        email, 
                        user_name, 
                        thumb_url, 
                        title } = item;            
                      return (
                      <div key={index} >
                      <ListItem key={index} 
                        style={{
                          padding:5,
                          height:65,
                          backgrouondColor:'#fefefe'
                        }}>
                           <div 
                              style={{ display:'flex', width:'100%' }} >
                                <Avatar 
                                  src={(cmm.isEmpty(item.logo_url)) ? '':cmm.SERVER_API_URL + cmm.FILE_PATH_PHOTOS + item.thumb_url}  
                                  size={40} />
                                <div style={{ width:'80%', paddingLeft:10}}>
                                  <div style={{fontSize:14, fontWeight:500, height:21,color:'#111111'}}>{user_name}</div>
                                  <div style={{fontSize:12, fontWeight:350, lineHeight:'18px', color:'#666666'}}>{title}&nbsp;·&nbsp;{cmm.permision(permissions)}</div>
                                  <div style={{fontSize:12, fontWeight:350, lineHeight:'18px', color:'#666666'}}>{email}</div>
                                </div>
                                <div style={{ fontSize:12, width:30, paddingLeft:10, textAlign:'right', right:10, justifyContent:'center' }}>
                                  <EllipsisOutlined />&nbsp;&nbsp;
                                </div>
                            </div>
                          </ListItem>
                          <Divider dashed style={{ margin: 3 }} />
                        </div>
                      )
                    }):'')

          }
          </List>
        </InfiniteScroll>
          
    </ThemeProvider>
  );
}

export default WgroupMemberPage;