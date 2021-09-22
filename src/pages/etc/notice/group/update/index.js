import { useMediaQuery } from 'react-responsive';
import { SET_NAVIBAR_SHOW } from 'constants/actionTypes';
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import React, {useState, useEffect } from 'react';
import MyAppBar from "components/styledcomponent/MyAppBar";
import { useHistory, useParams } from 'react-router';
import { Divider, Button,  Select  } from 'antd';
import TextArea from "antd/lib/input/TextArea";
import Input from 'components/styledcomponent/Input';
import { RightOutlined} from "@ant-design/icons";
import { getNoticeGrpDetail, postNoticeGrpUpd } from 'redux/etc/actions';
import { base64Dec } from 'constants/commonFunc';
import cmm from 'constants/common';

const grpNoticeUpd = (props) => {  
  const state = useSelector(state => state.Etc)
  const history = useHistory()
  const params = useParams()
  const dispatch = useDispatch()  
  const [noticeData, setNoticeData] = useState([])  
  const [noticeId, setNoticeId] = useState(null)  
  const [inputs, setInputs] = useState(
    {
      title:'',
      content:''
    }
  )  
  
  const isMobile = useMediaQuery({
    query: "(max-width:991px)"
  });

  //이전페이지
  const navigateTo = () => history.push({pathname:`/main/etc/notice/group/detail/${params.noticeId}/`})

  
  useEffect(()=> {
    // 하단 네비 설정 
    dispatch({
      type: SET_NAVIBAR_SHOW,
      payload: true}
    )
    console.log('param::::::::::::::',params.noticeId)
    setNoticeId(base64Dec(params.noticeId))
    //공지사항 상세 
    dispatch(getNoticeGrpDetail.call({b_idx:base64Dec(params.noticeId)}))
    
  },[])
  
  
  //공지사항 상세 fetch 후
  useEffect(() => {
    if (state.getNoticeGrpDetailRes) {      
      setNoticeData(state.getNoticeGrpDetailRes[0])     
      setInputs({...inputs, title:state.getNoticeGrpDetailRes[0][0].title, content:state.getNoticeGrpDetailRes[0][0].content})
      console.log('title',state.getNoticeGrpDetailRes[0][0].title)
    }
  }, [state.getNoticeGrpDetailRes])

  //저장
  const onSaveClick = (e) => {
    console.log('noticeId;::::::::::::::::::::',noticeId)
    if (cmm.isEmpty(inputs.title)) {
      return alert('제목을 입력하세요.')
    }
    if (cmm.isEmpty(inputs.content)) {
      return alert('내용을 입력하세요.')
    }
    console.log('noticeId;::::::::::::::::::::',noticeId)
    //공지사항 수정
    dispatch( postNoticeGrpUpd.call({b_idx:noticeId, title:inputs.title, content:inputs.content }))
    return
  }

  //공지사항 수정 fetch 후
  useEffect(() => {
    if (state.postNoticeGrpUpdRes) {
      state.postNoticeGrpUpdRes = false;
      history.push({pathname:`/main/etc/notice/group/detail/${params.noticeId}/`})
    }
  }, [state.postNoticeGrpUpdRes])

  const handleChange = (e) => {
    setInputs({
      ...inputs,
      [e.target.name]: e.target.value
    })
  }

  return (
    <div >
      {<MyAppBar 
          barTitle={'워크그룹 공지 수정'}       
          showBackButton
          navigateTo={navigateTo} 
          onSaveClick={onSaveClick}
          />}     
      
      <div style={{marginTop:20}}>
        <label style={{padding:5, color:'#aaa'}}>제목 </label><br/>
        <Input
            name='title'
            onChange={handleChange}
            value={inputs.title}
            required
            placeholder="제목을 입력해주세요."
            margin="normal"
          />
        <Divider style={{width:'100%', margin:5}}/>
      </div>
      <div style={{marginTop:10}}>
        <label style={{padding:5, color:'#aaa'}}>공지내용 </label><br/>
        <TextArea
              rows={10}
              name='content'
              placeholder="내용을 입력해주세요."
              onChange={handleChange}
              value={inputs.content}
            />
        <Divider style={{width:'100%', margin:5}}/>
      </div>
    </div>
  );
}

export default grpNoticeUpd;