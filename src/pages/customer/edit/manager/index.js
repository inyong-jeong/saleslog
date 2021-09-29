import MyAppBar from '../../../../components/styledcomponent/MyAppBar';
import React, { useState, useEffect } from 'react';
import { Typography } from "@material-ui/core"
import { Collapse } from 'antd';
import { useDispatch } from "react-redux";
import Input from '../../../../components/styledcomponent/Input'
import TextArea from "antd/lib/input/TextArea";
import { DatePicker } from "antd";
import 'moment/locale/ko';
import locale from 'antd/es/date-picker/locale/ko_KR';
import { useHistory, useParams } from 'react-router';
import { useStyles } from '../../registerManager';
import { getManagerInfo, postEditManager, postEditNamecard } from '../../../../redux/customer/actions';
import { SET_NAVIBAR_SHOW } from '../../../../constants/actionTypes';
import { useSelector } from 'react-redux';
import moment from 'moment';
import { errorMessage } from '../../../../constants/commonFunc';
import AvatarUp from '../../../../components/AvatarUp';
import cmm from 'constants/common';
import { base64Dec, base64Enc } from 'constants/commonFunc';
import { alertMessage } from '../../../../constants/commonFunc';
const { Panel } = Collapse
const EditCustomerManager = () => {
  const classes = useStyles()
  const params = useParams()
  const history = useHistory()
  const dispatch = useDispatch()
  const state = useSelector(state => state.Customer)
  const managerDetails = state.managerDetails
  const [preview, setPreview] = useState(null)
  const [chagnedPhoto, setChagnedPhoto] = useState(null)

  useEffect(() => {
    dispatch({
      type: SET_NAVIBAR_SHOW,
      payload: false
    })
    dispatch(getManagerInfo.call({ acc_idx: base64Dec(params.accId), accm_idx: base64Dec(params.singleId) }))
  }, [])

  const [accountMangerInputs, setAccoutManagerInputs] = useState(
    {
      acc_idx: base64Dec(params.accId),
      man_name: '',
      accm_idx: base64Dec(params.singleId),
      dept: '',
      posi: '',
      birthday: '',
      merryday: '',
      email: '',
      tel: '',
      org_tel: '',
      fax: '',
      school: '',
      local_area: '',
      personality: '',
      interest: '',
      hobby: '',
      org_history: '',
      family: '',
      etc: '',
    }
  )

  useEffect(() => {
    if (state.loading === false) {
      setAccoutManagerInputs(
        {
          ...accountMangerInputs,
          acc_idx: base64Dec(params.accId),
          accm_idx: base64Dec(params.singleId),
          man_name: managerDetails.man_name,
          dept: managerDetails.dept,
          posi: managerDetails.posi,
          birthday: managerDetails.birthday,
          merryday: managerDetails.merryday,
          email: managerDetails.email,
          tel: managerDetails.tel,
          org_tel: managerDetails.org_tel,
          fax: managerDetails.fax,
          school: managerDetails.school,
          local_area: managerDetails.local_area,
          personality: managerDetails.personality,
          interest: managerDetails.interest,
          hobby: managerDetails.hobby,
          org_history: managerDetails.org_history,
          family: managerDetails.family,
          etc: managerDetails.etc,
        }
      )
      setPreview(cmm.SERVER_API_URL + cmm.FILE_PATH_FILES + managerDetails.man_photo)
    }
  }, [state.loading])

  const navigateTo = () => {
    history.goBack()
  }


  //file
  const handleChange = (e) => {
    if (!e.target.files[0].name.match(/.(jpg|jpeg|png|gif)$/i)) {
      return alertMessage('이미지 파일만 등록 가능합니다.')
    }
    const value = e.target.value

    setAccoutManagerInputs({
      ...accountMangerInputs,
      [e.target.name]: value
    })
  }

  const onSaveClick = (e) => {
    if (!accountMangerInputs.man_name || !accountMangerInputs.posi) {
      return errorMessage('담당자명과 직급 및 소속은 필수 항목입니다.')
    }
    //담당자 정보 수정 
    dispatch(postEditManager.call(accountMangerInputs))
    //명함 사진 수정 
    dispatch(postEditNamecard.call({
      acc_idx: base64Dec(params.accId),
      accm_idx: base64Dec(params.singleId),
      man_photo: chagnedPhoto ? chagnedPhoto : ''
    }))
    history.goBack()
  }

  const handleFileChange = (e) => {

    let reader = new FileReader();
    reader.onloadend = () => {
      setAccoutManagerInputs({
        ...accountMangerInputs,
        man_photo: e.target.files
      })
      setPreview(reader.result)
      setChagnedPhoto(e.target.files)
    }

    if (e.target.files[0]) {
      reader.readAsDataURL(e.target.files[0]);
    }
  }

  const onChangeBirthday = (date, dateString) => {
    setAccoutManagerInputs({ ...accountMangerInputs, 'birthday': dateString })
  }
  const onChangeMarryDay = (date, dateString) => {
    setAccoutManagerInputs({ ...accountMangerInputs, 'merryday': dateString })
  }

  return (

    <div>
      <MyAppBar barTitle={'담당자 프로필 수정'} showBackButton navigateTo={navigateTo} onSaveClick={onSaveClick} />

      <div>
        <div>
          <div style={{ display: 'flex', justifyContent: 'center', margin: 10 }}>
            <AvatarUp
              iconShape='square'
              imgsrc={preview ? preview : ''}
              height={200}
              style={{
                padding: 0,
                width: 300,
                height: 200,
              }}
              handleChange={handleFileChange} />
          </div>
        </div>
        <div>
          <Typography variant='h6' align='left' className={classes.title}>기본정보</Typography>
          <div className={classes.innerBox}>
            <label className={classes.laebelStyle}>담당자명 <span style={{ color: 'red' }}>*</span>
            </label>
            <Input
              name='man_name'
              onChange={handleChange}
              value={accountMangerInputs.man_name}
              required
              placeholder="담당자명"
              margin="normal"
            />
            <label className={classes.laebelStyle}>직급 및 소속 <span style={{ color: 'red' }}>*</span></label>
            <Input
              name='posi'
              onChange={handleChange}
              value={accountMangerInputs.posi}
              placeholder="직급"
              margin="normal"
            />
            <Input
              style={{ marginTop: 5 }}
              name='dept'
              onChange={handleChange}
              value={accountMangerInputs.dept}
              placeholder="소속"
              margin="normal"
            />
          </div>
        </div>


        <div>
          <Typography variant='h6' align='left' className={classes.title}>연락처 정보</Typography>
          <div className={classes.innerBox}>
            <label className={classes.laebelStyle}>이메일 주소</label>
            <Input
              name='email'
              onChange={handleChange}
              value={accountMangerInputs.email}
              placeholder="이메일을 입력해주세요."
              margin="normal"
            />
            <label className={classes.laebelStyle}>휴대폰 번호</label>
            <Input
              name='tel'
              onChange={handleChange}
              value={accountMangerInputs.tel}
              placeholder="휴대폰 번호를 입력해주세요"
              margin="normal"
            />
            <label className={classes.laebelStyle}>회사 전화번호</label>
            <Input
              name='org_tel'
              onChange={handleChange}
              value={accountMangerInputs.org_tel}
              placeholder="회사 전화번호를 입력해주세요"
              margin="normal"
            />

            <label className={classes.laebelStyle}>팩스 번호</label>
            <Input
              value={accountMangerInputs.fax}
              name='fax'
              onChange={handleChange}
              placeholder="팩스번호를 입력해주세요"
              margin="normal"
            />

            <label className={classes.laebelStyle}>자택 주소 </label>
            <Input
              name='local_area'
              value={accountMangerInputs.local_area}
              onChange={handleChange}
              placeholder="주소를 입력해주세요"
              margin="normal"
            />
          </div>
        </div>

        <div>
          <Typography variant='h6' align='left' className={classes.title}>기념일</Typography>
          <div className={classes.innerBox}>
            <label className={classes.laebelStyle}>생일 </label>
            <br />
            <DatePicker onChange={onChangeBirthday} locale={locale} style={{ width: '100%' }} name='birthday' value={
              accountMangerInputs.birthday !== "" ?
                moment(accountMangerInputs.birthday) :
                null} />
            <br />
            <label className={classes.laebelStyle}>결혼기념일 </label>
            <br />
            <DatePicker onChange={onChangeMarryDay} locale={locale} style={{ width: '100%' }} name='merryday' value={
              accountMangerInputs.merryday !== "" ?
                moment(accountMangerInputs.merryday) :
                null} />
          </div>
        </div>
        <div>
          <Typography variant='h6' align='left' className={classes.title}>기타 정보 </Typography>
          <div style={{ padding: 10 }}>
            <Collapse accordion ghost expandIconPosition='right'>
              <Panel header="인물 메모" key="1" >
                <TextArea
                  placeholder="담당자를 한 눈에 떠올릴 수 있도록 인물 총평을 기록해두시면 세일즈 활동에 불필요 한 실수를 최소화하는데 도움됩니다."
                  rows={6}
                  name='etc'
                  onChange={handleChange}
                  value={accountMangerInputs.etc}
                />
              </Panel>
              <Panel header="성격/성향" key="2">
                <TextArea
                  placeholder="담당자의 성격과 성향에 대한 인식을 기록해두세요. 실질적인 거래 관계에 있어 성격과 성향은 상황에 따라 조심해야 할 부분이면서 동시에 활용하면 좋은 기본 정보입니다."
                  rows={6}
                  name='personality'
                  onChange={handleChange}
                  value={accountMangerInputs.personality}
                />
              </Panel>
              <Panel header="관심사" key="3">
                <TextArea
                  placeholder="떠오르거나 예상되는 담당자의 관심사를 기록하고 더욱 구체화하세요. 관심사는 공통점을 발견하는 좋은 대화 소재가 됩니다."
                  rows={6}
                  name='interest'
                  onChange={handleChange}
                  value={accountMangerInputs.interest}
                />
              </Panel>
              <Panel header="건강/취미" key="4">
                <TextArea
                  placeholder="담당자의 건강과 취미 내용을 기록하고 계속 업데이트하세요. 건강 상태를 기억해주는 것은 상대방에게 고맙고 특별한 사람이라는 인식을 전해주고, 취미 정보는 개인적 유대감 형성을 위한 좋은 기회가 될 수 있습니다."
                  rows={6}
                  name='hobby'
                  onChange={handleChange}
                  value={accountMangerInputs.hobby}
                />
              </Panel>
              <Panel header="경력" key="5">
                <TextArea
                  placeholder="담당자의 경력을 확인하고 기록하세요. 대부분 경제활동을 하는 사람은 현재 또는 과거의 동료로부터 많은 영향력을 받게 됩니다. 인적 네트워크를 통해 전해 듣거나 추천 받은 긍정적 경험 또는 개인평가는 확실한 경쟁력으로 작용됩니다."
                  rows={6}
                  name='org_history'
                  onChange={handleChange}
                  value={accountMangerInputs.org_history}
                />
              </Panel>
              <Panel header="출신 학교" key="6">
                <TextArea
                  placeholder="담당자의 출신 학교는 확인하고 기록하세요. 출신 학교는 선후배 이해관계를 중심으로 명분 없는 부탁과 승인을 고려할 수 있는 핵심 정보입니다."
                  rows={6}
                  name='school'
                  onChange={handleChange}
                  value={accountMangerInputs.school}
                />
              </Panel>
              <Panel header="가족 관계" key="7">
                <TextArea
                  placeholder="담당자의 가족관계를 세부적으로 확인하고 기록하세요. 거의 대부분 사람들은 가족이 가장 중요합니다. 담당자의 자녀, 배우자, 부모, 형제자매의 사소한 일까지 기억하고 언급한다면 정량적으로 측정할 수 없는 긍정적인 영향력이 틀림없이 작용될 것입니다."
                  rows={6}
                  name='family'
                  onChange={handleChange}
                  value={accountMangerInputs.family}
                />
              </Panel>
            </Collapse>
          </div>
        </div>
        <div style={{ height: '60px' }}></div>
      </div>
    </div>


  );
}

export default EditCustomerManager;