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
import { Modal, Divider, Button, Avatar, Menu, Dropdown, Input } from 'antd';
import { getWorkGroupInfo, getGroupMemberList } from 'redux/workgroup/actions';
import cmm from 'constants/common';
import { base64Enc } from 'constants/commonFunc';
import { MemoryOutlined } from '@material-ui/icons';


const useStyles = makeStyles((theme) =>({
  root: {
    width: '100%',
    backgroundColor: theme.palette.background.paper,
    marginBottom: 100, //nav bottom tab 
  }
}));
const { Search } = Input;
const WgroupMemberPage = (props) => {  
  const classes = useStyles();
  const state = useSelector(state => state.Workgroup)
  const history = useHistory()
  const dispatch = useDispatch()
  const data = state.data;
  const [isShowModal, setIsShowModal] = useState(false)
  const [memberList, setMemberList] = useState([])
  const [srch, setSrch] = useState('')
  const [groupInfo, setGroupInfo] = useState()
  
  
  const isMobile = useMediaQuery({
    query: "(max-width:991px)"
  });

  //이전페이지
  const navigateTo = () => history.push('/main/workgroup')


  const order_menu = (
    <Menu>
      <Menu.Item key={1} onClick={() => {
        alert('test');
        }} >프로필 보기
      </Menu.Item>
      <Menu.Item key={2} onClick={() => {
        alert('test');
        }} >내보내기
      </Menu.Item>
      <p>최근 접속시간: </p>
    </Menu>
  );

  useEffect(()=> {
    // 하단 네비 설정 
    dispatch({
      type: SET_NAVIBAR_SHOW,
      payload: true}
    )

    //워크그룹 정보 가져오기
    dispatch(getWorkGroupInfo.call())   
    
    console.log('test');

  },[])

  useEffect(()=> {
    //워크그룹 맴버 가져오기
    dispatch(getGroupMemberList.call({srch:srch}))
    
  },[srch])
  
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



  const onSearch = (keyword) => {
    setSrch(keyword)
  }
  
  return (
    <div >
      {<MyAppBar 
          barTitle={(groupInfo)?groupInfo.organization:'워크그룹'}        
          showBackButton
          navigateTo={navigateTo} 
          />}     
        <InfiniteScroll
          hasMore={true}
          dataLength={memberList.length} >
        <Search
          placeholder="이름,이메일 검색"
          allowClear
          onSearch={onSearch}
          style={{
            width: '100%',
            marginBottom: 10,
            marginTop: 10,
          }} />
        <List className={classes.root}>
          {((memberList) ? memberList.map((item, index) =>{
                      const { 
                        login_idx, 
                        permissions, 
                        dept_idx, 
                        dept_name, 
                        email, 
                        user_name, 
                        thumb_url, 
                        title,
                        upd_dt } = item;            
                      return (
                      <div key={index} >
                        <ListItem key={index} 
                          style={{
                            padding:5,
                            height:65,
                            backgrouondColor:'#fefefe'
                          }}>
                            <div 
                                style={{ display:'flex', width:'100%'}} >
                                  <div style={{ width:50, maxWidth:50, textAlign:'center'}}>
                                    <Avatar 
                                      src={(cmm.isEmpty(item.logo_url)) ? '':cmm.SERVER_API_URL + cmm.FILE_PATH_PHOTOS + item.thumb_url}  
                                      size={40} />
                                  </div>
                                  <div style={{ width:'90%', paddingLeft:10}}>
                                    <div style={{fontSize:14, fontWeight:500, height:21,color:'#111111'}}>{user_name}</div>
                                    <div style={{fontSize:12, fontWeight:350, lineHeight:'18px', color:'#666666'}}>{title}&nbsp;·&nbsp;{cmm.permission(permissions)}</div>
                                    <div style={{fontSize:12, fontWeight:350, lineHeight:'18px', color:'#666666'}}>{email}</div>
                                  </div>
                                  <div style={{ flex:1, fontSize:12, width:'10%', maxWidth:50, paddingRight:10, textAlign:'right', right:0, alignItems:'flex-end' }}>
                                    <Dropdown key={login_idx} event={srch} overlay={                                      
                                      <Menu key={login_idx}  style={{ width:200}}>
                                        <Menu.Item key={1} onClick={() => {                                          
                                          const param = base64Enc(login_idx)
                                           history.push(`/main/workgroup/member/profile/${param}`)
                                          }} >프로필 보기
                                        </Menu.Item>
                                        <Menu.Item key={2} onClick={() => {
                                          console.log('reaera;:::::::::::',index)
                                          alert('test');
                                          }} >내보내기
                                        </Menu.Item>
                                        <Divider  dashed style={{ margin: 2 }} />
                                        <div style={{ fontSize:12, padingLeft:20, paddingTop:10,paddingBottom:10}}>&nbsp;&nbsp;&nbsp;최근 접속시간: {item.upd_dt}</div>
                                     </Menu> } 
                                      placement="bottomRight" 
                                      trigger={['click','hover']} >
                                      <Button key={login_idx}
                                        type="link" ><EllipsisOutlined style={{ fontSize:16, fontWeight:800}} /></Button>
                                    </Dropdown>                                                                      
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
          
    </div>
  );
}

export default WgroupMemberPage;