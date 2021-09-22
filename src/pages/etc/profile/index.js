import { createTheme, ThemeProvider, makeStyles } from '@material-ui/core/styles';
import { useMediaQuery } from 'react-responsive';
import { SET_NAVIBAR_SHOW } from 'constants/actionTypes';
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import React, {useState, useEffect } from 'react';
import MyAppBar from "components/styledcomponent/MyAppBar";
import AvatarUp from 'components/AvatarUp';
import { useHistory, useParams } from 'react-router';
import { Divider, Button, Avatar , Select  } from 'antd';
import Input from 'components/styledcomponent/Input';
import { RightOutlined} from "@ant-design/icons";
import { getProfileDetail, postProfilePhoto, postProfileUpd } from 'redux/etc/actions';
import cmm from 'constants/common';
import { base64Dec } from 'constants/commonFunc';
const { Option } = Select;


const myProfilePage = (props) => {  
  const state = useSelector(state => state.Etc)
  const history = useHistory()
  const params = useParams()
  const dispatch = useDispatch()  
  const [myData, setMyData] = useState(null)  
  const [inputs, setInputs] = useState(
    {
      user_name:'',
      phone_number:'',
      prevImg: null,
      fileup: null,
    }
  )  
  
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
    console.log('state::::::::::::::::::::',state)
    //setInputs({...inputs, login_idx:base64Dec(params.memberId)})
     
    //내 프로필 정보 
    dispatch(getProfileDetail.call())
    
  },[])
  
  //내 프로필 정보 fetch 후
  useEffect(()=> {
    if (state.getProfileDetailRes && state.getProfileDetailRes.length > 0) {
      setMyData(state.getProfileDetailRes)
      
      setInputs({
        ...inputs,
        user_name: state.getProfileDetailRes[0].user_name,
        phone_number: state.getProfileDetailRes[0].phone_number,
        prevImg: (cmm.isEmpty(state.getProfileDetailRes[0].thumb_url) ? '' : cmm.SERVER_API_URL + cmm.FILE_PATH_PHOTOS+state.getProfileDetailRes[0].thumb_url)
      })
      
     
    }
  },[state.getProfileDetailRes])

  const onSaveClick = (e) => {
    console.log(inputs)
    dispatch( postProfileUpd.call({user_name:inputs.user_name, phone_number:inputs.phone_number}))
    return
  }


  const handleChangeFile = e => {
    const fileUploaded = e.target.files;
    const reader = new FileReader();
    reader.onloadend = () => {
      setInputs({
        ...inputs,
        fileup: fileUploaded,
        prevImg: reader.result
      })
    }
    if (!cmm.isEmpty(e.target.files)) {
      reader.readAsDataURL(e.target.files[0]);
    }
  }

  //이미지등록 
  useEffect(() => {
    console.log('fileup')
    if (inputs.fileup !== null) {
      dispatch(postProfilePhoto.call({ fileup: inputs.fileup }))
    }
  }, [inputs.fileup])

  const handleChange = (e) => {
    setInputs({
      ...inputs,
      [e.target.name]: e.target.value
    })
  }

  return (
    (myData && myData.length > 0) &&
    <div >
      {<MyAppBar 
          barTitle={'내 프로필'}       
          showBackButton
          navigateTo={navigateTo} 
          onSaveClick={onSaveClick}
          />}     
      <div style={{height:20}}></div>
      <div style={{display:'flex',width:'100%'}}>
        <AvatarUp 
          imgsrc={cmm.isEmpty(inputs.prevImg) ? '' : inputs.prevImg}
          iconShape='square'
          style={{
            padding: 0,
            width: ((isMobile)?90:120),
            height: ((isMobile)?90:120),
          }}
          height={((isMobile)?90:120)}
          handleChange={handleChangeFile}
          />
        
        <div style={{width:"90%" }}>
          <label style={{padding:5, color:'#aaa'}}>이름 </label><br/>
          <Input
            name='user_name'
            onChange={handleChange}
            value={inputs.user_name}
            required
            placeholder="이름을 입력해주세요."
            margin="normal"
          />
          
          <Divider style={{width:'100%', margin:5}}/>
        </div>
      </div>
      <div style={{marginTop:20}}>
        <label style={{padding:5, color:'#aaa'}}>휴대폰 번호 </label><br/>
        <Input
            name='phone_number'
            onChange={handleChange}
            value={inputs.phone_number}
            required
            placeholder="휴대폰번호를 입력해주세요."
            margin="normal"
          />
          
        <Divider style={{width:'100%', margin:5}}/>
      </div>
      <div style={{marginTop:10}}>
        <label style={{padding:5, color:'#aaa'}}>이메일 </label><br/>
        <label style={{padding:5, margin:0}}>{myData[0].email}</label>
        <Divider style={{width:'100%', margin:5}}/>
      </div>
      <div style={{marginTop:10 }}>
          <label style={{padding:5, color:'#aaa'}}>맴버 구분 </label><br/>
          <label style={{padding:5, margin:0}}>{cmm.permission(myData[0].permissions)}</label>
          <Divider style={{width:'100%', margin:5}}/>
      </div>
      <div style={{marginTop:10}}>
        <label style={{padding:5, color:'#aaa'}}>소속</label><br/>        
        <label style={{padding:5, margin:0}}>{myData[0].dept_name}</label>
        <Divider style={{width:'100%', margin:5}}/>
      </div>      
    </div>
  );
}

export default myProfilePage;