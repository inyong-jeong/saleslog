import React, { useState, useEffect } from 'react';
import { connect, useSelector } from 'react-redux';
import MyAppBar from '../../../components/styledcomponent/MyAppBar';
import {
  postSalesLog, selectAccounts, selectAccountperson,
  postTemporarySalesLog, uploadFile, getUserList, getLogList,
  clearLog, putSalesLog, clearTempLog, postAutoSalesLog
} from 'redux/actions';
import { errorMessage, alertMessage } from "constants/commonFunc";
import { useDispatch } from "react-redux";
import { SET_NAVIBAR_SHOW } from 'constants/actionTypes';
import StyledSelect from 'components/styledcomponent/StyledSelect';
import { base64Dec } from "constants/commonFunc";

import Divider from 'components/Divider'
import { TimePicker, Radio, DatePicker, Tooltip } from 'antd';
import Input from 'components/styledcomponent/Input'

import CouserModal from 'components/CouserModal'
import UcouserList from 'components/UcouserList';
import LogListModal from 'components/LogListModal'
import CustomerLeadModal from 'components/CustomerLeadModal'
import CustomerModal from 'components/CustomerModal'
import moment from 'moment';
import { ReactComponent as Info } from 'assets/icons/info.svg'
import 'moment/locale/ko';
import { useIdleTimer } from 'react-idle-timer'


const { Option } = StyledSelect;
const selectStyle = {
  control: (defaultStyle) => ({ ...defaultStyle, border: '1px solid #AAAAAA' }),
  indicatorSeparator: () => { }
}

const salesActivityOption =
  [{ label: '니즈조사', value: '0030001' },
  { label: '동향/정보수집', value: '0030002' },
  { label: '제안', value: '0030003' }];

const salesChannelOption =
  [{ label: '전화', value: '0040001' },
  { label: '이메일', value: '0040002' },
  { label: '대면', value: '0040003' },
  { label: '행사참여', value: '0040004' },
  { label: '온라인 리서치', value: '0040005' },
  { label: '도서-전문정보', value: '0040006' },
  { label: '소셜 커뮤니티', value: '0040007' },
  { label: '기타', value: '0040008' }];

const leadActivityOption =
  [{ label: '발굴', value: '0020001' },
  { label: '접촉', value: '0020002' },
  { label: '제안', value: '0020003' },
  { label: '검증', value: '0020004' }];



function UploadSalesLog(props) {

  const dispatch = useDispatch()
  const state = useSelector(state => state.SalesLog)
  const state2 = useSelector(state => state.Customer)

  let putresponse = state.putlog;
  let postresponse = state.postlog;
  // let deletetempresponse = state.deletetempresponse;
  //공동작성자 리스트
  const [lists, setLists] = useState([
  ]);

  //일지 등록 스테이트
  const [accountsList, setAccountsList] = useState([]);
  const [accountspersonList, setAccountsPersonList] = useState([]);
  const [selectedAccount, setSelectedAccount] = useState(null);
  const [selectedAccountperson, setSelectedAccountPerson] = useState([]);
  const [radiocheck, setRadioCheck] = useState('0010001');
  const [activity, setActivity] = useState(null);
  const [leadactivity, setLeadActivity] = useState(null);
  const [channel, setChannel] = useState(null);
  const [isFilePicked, setIsFilePicked] = useState(false);


  const InputStyle = { border: '1px solid #AAAAAA' }
  const [selectedFiles, setSelectedFiles] = useState(undefined);
  const [message, setMessage] = useState("");
  const [error, setError] = useState();
  //날짜 스테이트
  const [dateString, setDateString] = useState(moment());
  const [start, setStart] = useState(moment());
  const [end, setEnd] = useState(moment());
  const { TextArea } = Input;

  const id = props.match.params.id && base64Dec(props.match.params.id);

  function getCousrList(v) {
    let result = []
    for (let i = 0; i < v.length; i++) {
      result = result.concat(v[i].login_idx)
    }
    return result;
  }

  // 고객 이름 넣으면 고객 idx 리턴하는 함수.
  function FilterAccount(label) {
    let list = [];
    for (let i = 0; i < accountsList.length; i++) {
      if (label === accountsList[i].account_name) {
        list = list.concat(accountsList[i].acc_idx);
      }
    }
    return list;
  }

  //리드 4단계 자동으로 고정시키는 함수
  function getScoreIndex(key) {
    let result = undefined;
    for (let i = 0; i < accountsList.length; i++) {
      if (accountsList[i].acc_idx === key) {
        result = i
      }
    }
    return result
  }

  //리드 단계에서 score 넣으면 idx 리턴하는 함수
  function getScoreIdx(label) {
    let result = undefined;
    for (let i = 0; i < leadActivityOption.length; i++) {
      if (leadActivityOption[i].label === label) {
        result = leadActivityOption[i].value;
      }
    }
    return result;
  }

  const handleOnIdle = event => {

    //일지작성 할 때 자동 임시저장
    if (getLastActiveTime() && !props.match.params.id) {
      props.postAutoSalesLog(fromData)

      // 임시저장 할 때 자동 임시저장
    } else if (getLastActiveTime() && base64Dec(props.match.params.id).length < 2) {
      props.postAutoSalesLog(fromData)
    }
  }

  const { getLastActiveTime } = useIdleTimer({
    timeout: 20000,
    onIdle: handleOnIdle,
  })

  // 고객사 간편등록 하면 바로 고객검색 란에 fix
  useEffect(() => {
    if (state2.postCustomerResponse) {
      console.log(FilterAccount(state2.accountBody.body.account_name))
      setSelectedAccount(FilterAccount(state2.accountBody.body.account_name));
      setFromData({ ...fromData, acc_idx: FilterAccount(state2.accountBody.body.account_name)[0] })
      setLeadActivity(getScoreIdx(state2.accountBody.body.score))
      // setSelectedAccountPerson(props.accountpersonlist[0].accm_idx);
      state2.postCustomerResponse = false;
    }
  }, [accountsList])

  // 고객사 간편등록 하면 바로 고객담당자 란에 fix
  useEffect(() => {
    if (props.accountpersonlist.length === 1 && selectedAccount !== null) {
      setSelectedAccountPerson(props.accountpersonlist[0].accm_idx);
      setFromData({ ...fromData, accm_idx: props.accountpersonlist[0].accm_idx })

    }
  }, [props.accountpersonlist])

  useEffect(() => {
    //고객사 fetch
    props.selectAccounts({ sales_gb: props.salesgb });
    // log load
    if (id && props.temporaryloglistresponse === false) {
      const data = {
        sidx: id
      }
      props.getLogList(data)
    }
  }, [])

  useEffect(() => {
    if (props.log) {
      //데이터 set
      setRadioCheck(props.log.sales_gb)
      setSelectedAccount(props.log.acc_idx)
      setSelectedAccountPerson(props.log.accm_idx)
      setLeadActivity(props.log.sales_lead_gb)
      setActivity(props.log.sales_goal)
      setChannel(props.log.sales_activity)
      setDateString(moment(new Date(props.log.meeting_date)));
      setStart(moment(new Date(`2021-09-18 ${props.log.meeting_stime}`)));
      setEnd(moment(new Date(`2021-09-18 ${props.log.meeting_etime}`)));
      setFromData({
        acc_idx: props.log.acc_idx,
        accm_idx: props.log.accm_idx,
        slog_idx: id,
        title: props.log.title,
        log: props.log.log,
        addr: props.log.addr,
        sales_gb: props.log.sales_gb,
        sales_lead_gb: props.log.sales_lead_gb,
        sales_goal: props.log.sales_goal,
        sales_activity: props.log.sales_activity,
        meeting_date: props.log.meeting_date,
        meeting_stime: props.log.meeting_stime,
        meeting_etime: props.log.meeting_etime,
        lati: props.log.lati,
        longi: props.log.longi,
      })
    }
    return () => { props.clearLog() }
  }, [props.log])

  //임시저장
  useEffect(() => {
    if (props.temporaryLoglist) {
      setRadioCheck(props.temporaryLoglist.sales_gb);
      setSelectedAccount(props.temporaryLoglist.acc_idx === 0 ? null : props.temporaryLoglist.acc_idx)
      setSelectedAccountPerson(props.temporaryLoglist.accm_idx === 0 ? null : props.temporaryLoglist.accm_idx)
      setLeadActivity(props.temporaryLoglist.sales_lead_gb === 'null' ? null : props.temporaryLoglist.sales_lead_gb)
      setActivity(props.temporaryLoglist.sales_goal === 'null' ? null : props.temporaryLoglist.sales_goal)
      setChannel(props.temporaryLoglist.sales_activity === 'null' ? null : props.temporaryLoglist.sales_activity)
      setDateString(moment(new Date(props.temporaryLoglist.meeting_date)));
      setStart(moment(new Date(`2021-09-18 ${props.temporaryLoglist.meeting_stime}`)));
      setEnd(moment(new Date(`2021-09-18 ${props.temporaryLoglist.meeting_etime}`)));
      setFromData({
        acc_idx: props.temporaryLoglist.acc_idx,
        accm_idx: props.temporaryLoglist.accm_idx,
        title: props.temporaryLoglist.title,
        log: props.temporaryLoglist.log,
        addr: props.temporaryLoglist.addr,
        sales_gb: props.temporaryLoglist.sales_gb,
        sales_lead_gb: props.temporaryLoglist.sales_lead_gb === 'null' ? null : props.temporaryLoglist.sales_lead_gb,
        sales_goal: props.temporaryLoglist.sales_goal === 'null' ? null : props.temporaryLoglist.sales_goal,
        sales_activity: props.temporaryLoglist.sales_activity === 'null' ? null : props.temporaryLoglist.sales_activity,
        meeting_date: props.temporaryLoglist.meeting_date,
        meeting_stime: props.temporaryLoglist.meeting_stime,
        meeting_etime: props.temporaryLoglist.meeting_etime,
        lati: props.temporaryLoglist.lati,
        longi: props.temporaryLoglist.longi,
        score: props.temporaryLoglist.score,
        cousers: props.temporaryLoglist.cousers
      })
      console.log(fromData)
    }
    return () => { props.clearTempLog() }
  }, [props.temporaryloglistresponse])

  const [fromData, setFromData] = useState({
    acc_idx: 0,
    accm_idx: 0,
    sales_gb: radiocheck,
    sales_lead_gb: leadactivity,
    sales_goal: activity,
    sales_activity: channel,
    meeting_date: moment().format('YYYY-MM-DD'),
    meeting_stime: moment().format('HH:mm'),
    meeting_etime: moment().format('HH:mm'),
    title: '',
    log: '',
    addr: '',
    lati: 0,
    longi: 0,
    score: '',
    cousers: lists,
    fileup: selectedFiles
  })

  useEffect(() => {
    if (props.postSalesLogError) {
      setError('전송에 실패했습니다.');
    }
  }, [props.postSalesLogError]);

  useEffect(() => {
    setAccountsList(props.accountslist);
  }, [props.accountslist]);

  useEffect(() => {
    setAccountsPersonList(props.accountpersonlist);
  }, [props.accountpersonlist]);


  //고객사 등록했을 때 고객사 재검색
  useEffect(() => {
    if (props.postCustomerResponse) {
      const data = {
        sales_gb: radiocheck
      }
      console.log(data);
      props.selectAccounts(data)
    }

  }, [props.postCustomerResponse])
  console.log(fromData)


  // 고객 담당자 불러오기
  useEffect(() => {
    if (selectedAccount) {
      const accountperson = {
        acc_idx: selectedAccount
      }
      props.selectAccountperson(accountperson);
    }
  }, [selectedAccount])

  const onDatePickerChange = (date) => {
    console.log(date)
    setDateString(date)
    const convertdate = moment(date).format('YYYY-MM-DD');
    setFromData({
      ...fromData,
      'meeting_date': convertdate
    })
  }
  const onChangesSartValue = (stime) => {
    setStart(stime)
    const convertstime = moment(stime).format('HH:mm');
    setFromData({
      ...fromData,
      'meeting_stime': convertstime
    })
  }

  const onChangeEndValue = (etime) => {
    setEnd(etime)
    const convertetime = moment(etime).format('HH:mm');
    setFromData({
      ...fromData,
      'meeting_etime': convertetime
    })
  }

  const onChange = (e) => {
    console.log(e.target.value);
    setSelectedAccount(null);
    setSelectedAccountPerson(null);
    setLeadActivity(null);
    setRadioCheck(e.target.value);
    setFromData({
      ...fromData,
      acc_idx: 0,
      accm_idx: 0,
      sales_gb: e.target.value,
      sales_lead_gb: null,
    })
  };

  const onLeadActivity = (option) => {
    setLeadActivity(option);
    setFromData({
      ...fromData,
      'sales_lead_gb': option
    })
  }

  const onSalesActivity = (option) => {
    setActivity(option);
    setFromData({
      ...fromData,
      'sales_goal': option
    })
  };

  const onSalesChannel = (option) => {
    setChannel(option);
    setFromData({
      ...fromData,
      'sales_activity': option
    })
  };

  const selectFile = (event) => {

    setSelectedFiles(event.target.files);
    setFromData({
      ...fromData,
      'fileup': event.target.files
    })
    setIsFilePicked(true);
  }

  const onChangeLocation = (e) => {
    setFromData({
      ...fromData,
      'addr': e.target.value
    })
  }

  const onChangeTitle = (e) => {
    setFromData({
      ...fromData,
      'title': e.target.value
    })
  }
  const onChangeContent = (e) => {
    setFromData({
      ...fromData,
      'log': e.target.value
    })
  }



  //공동작성자 


  function getFields(input, field) {
    let output = [];
    for (let i = 0; i < input.length; ++i)
      output.push(input[i][field]);
    return output;
  }

  //공동작성자 추가
  const handleonInsert = (name, login_idx, thumb_url) => {
    console.log(login_idx);
    const list = {
      id: login_idx,
      name,
      thumb_url
    };
    setLists(lists.concat(list));
  };

  //공동작성자 삭제
  const handleonRemove = (id) => {
    console.log(id);
    setLists(lists.filter(list => list.id !== id));
  }

  //공동작성자 data set
  useEffect(() => {
    if (lists) {
      const result = getFields(lists, 'id')
      setFromData({ ...fromData, cousers: result })
    }
  }, [lists])

  const handleOnBack = () => {
    props.history.goBack()
  };

  // 일지 작성
  const onFormSubmit = () => {
    if (fromData.acc_idx === 0 || fromData.accm_idx === 0) {
      return errorMessage('고객, 고객 담당자는 필수항목입니다.')
    }
    if (fromData.sales_goal === null || fromData.sales_activity === null) {
      return errorMessage('영업 목적, 영업채널은 필수항목입니다.')
    }
    if (fromData.title === '' || fromData.log === '') {
      return errorMessage('제목, 내용은 필수항목입니다.')
    }
    props.postSalesLog(fromData)
  }

  useEffect(() => {
    if (postresponse) {
      props.history.push('/main/manage');
      state.postlog = false;
    }
  }, [postresponse])

  //일지 수정

  const onFormRevise = () => {
    if (fromData.acc_idx === 0 || fromData.accm_idx === 0) {
      return errorMessage('고객, 고객 담당자는 필수항목입니다.')
    }
    if (fromData.sales_goal === null || fromData.sales_activity === null) {
      return errorMessage('영업 목적, 영업채널은 필수항목입니다.')
    }
    if (fromData.title === '' || fromData.log === '') {
      return errorMessage('제목, 내용은 필수항목입니다.')
    }
    props.putSalesLog(fromData)
  }
  useEffect(() => {
    if (putresponse) {
      props.history.push('/main/manage');
      state.putlog = false;
    }

  }, [putresponse])

  //일지 임시저장
  const onFormTemporarySubmit = () => {
    delete fromData.fileup;
    props.postTemporarySalesLog(fromData)
  }



  const getSalesAccount = () => {
    const data = {
      sales_gb: '0010001'
    }
    props.selectAccounts(data)
  }

  const getLeadAccount = () => {
    const data = {
      sales_gb: '0010002'
    }
    props.selectAccounts(data)
  }

  const onAccountSelectChange = (v, actiontype) => {
    console.log(v);
    setLeadActivity(accountsList[getScoreIndex(v)].score)
    setSelectedAccountPerson(null);
    setSelectedAccount(v);
    setFromData({
      ...fromData,
      'acc_idx': v,
      'score': accountsList[getScoreIndex(v)].score
    })
  };

  const onAccountPersonSelectChange = (v, actiontype) => {
    setSelectedAccountPerson(v);
    setFromData({
      ...fromData,
      'accm_idx': v
    })
  }

  const labelStyle = {
    marginTop: 10,
    color: '#111111',
    fontWeight: 'normal',
    fontSize: 14,
    display: 'block',
  }

  //bottom bar 안보기에 
  useEffect(() => {
    dispatch({
      type: SET_NAVIBAR_SHOW,
      payload: false
    })
  }, [])

  return (
    <React.Fragment>
      <MyAppBar
        barTitle={'일지 쓰기'}
        showBackButton
        paramId={id}
        onRevise={onFormRevise}
        onSaveClick={onFormSubmit}
        navigateTo={handleOnBack}
        tempSaveClick={onFormTemporarySubmit} />
      <div className="container">
        <div className='mt-3'></div>
        <div className="row">
          <div className="col-12">
            <label style={labelStyle}> 활동 일시 <span style={{ color: 'red' }}>*</span></label>
            {/* <ButtonTab tab={tabs} onSelected={onSelected} defaultSelected="SALESLOG" /> */}
          </div>
        </div>
        <div className='mt-2'></div>
        <DatePicker className='col-12'
          inputReadOnly={true}
          defaultValue={moment}
          format={'YYYY-MM-DD'}
          value={dateString}
          onChange={onDatePickerChange} />
        <div className='mt-2'></div>
        <TimePicker className='col-6'
          inputReadOnly={true}
          format={'HH:mm'}
          defaultValue={moment}
          value={start}
          onChange={onChangesSartValue}
        />
        <TimePicker className='col-6'
          inputReadOnly={true}
          format={'HH:mm'}
          defaultValue={moment}
          value={end}
          onChange={onChangeEndValue}
        />
        <div className='mt-2'></div>
        <div className="row">
          <div className="col-12">
            <label style={labelStyle}> 일지 구분 <span style={{ color: 'red' }}>*</span></label>

          </div>
        </div>
        <div className='mt-2'></div>
        <div className='row'>
          <div className='col-12' style={{ display: 'flex' }}>
            <Radio.Group onChange={onChange} value={radiocheck}>
              <Radio onClick={getSalesAccount} value={'0010001'}>영업일지</Radio>
              <Radio onClick={getLeadAccount} value={'0010002'}>리드일지</Radio>
            </Radio.Group>
            {radiocheck === '0010001' && <div>* 거래고객 조회</div>}
            {radiocheck === '0010002' && <div>* 리드타깃 조회</div>}

          </div>
        </div>
        <div className='mt-2'></div>
        < Divider />
        <div className='mt-3'></div>
        <div className="mt-2"></div>
        <div className="row">
          <div className="col-12" style={{ display: 'flex', alignItems: 'center' }}>
            <label style={labelStyle}> 고객 <span style={{ color: 'red' }}>*</span></label>
            {radiocheck === '0010001' && <CustomerModal buttonLabel='고객 간편 등록' />}
            {radiocheck === '0010002' && <CustomerLeadModal buttonLabel='고객 간편 등록' />}
          </div>
        </div>
        <div className="mt-2"></div>
        <div className="row">
          <div className="col-12">
            <StyledSelect
              placeholder="고객 검색"
              showSearch
              // mode='multiple'
              value={selectedAccount}
              filterOption={(input, option) =>
                option.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
              }
              // options={accountsList && accountsList.map((v, index) => { return { value: v.acc_idx, label: v.account_name, number: index } })}
              onChange={onAccountSelectChange}
              styles={selectStyle} >
              {accountsList.length > 0 && accountsList.map((item, index) => (
                <StyledSelect.Option key={index} value={item.acc_idx}>
                  {item.account_name}
                </StyledSelect.Option>
              ))
              }
            </StyledSelect>

          </div>
        </div>
        <div className="mt-3"></div>
        <div className="mt-2"></div>
        <div className="row">
          <div className="col-12">
            {radiocheck === '0010001' && <label style={labelStyle}> 담당자 정보 <span style={{ color: 'red' }}>*</span></label>}
            {radiocheck === '0010002' && <label style={labelStyle}> 담당자 정보 </label>}

          </div>
        </div>
        <div className="mt-2"></div>
        <div className="row">
          <div className="col-12">
            <StyledSelect
              placeholder="고객 담당자를 선택해주세요"
              options={accountspersonList && accountspersonList.map((v) => { return { value: v.accm_idx, label: v.man_name } })}
              value={selectedAccountperson}
              onChange={onAccountPersonSelectChange}
              styles={selectStyle} />
          </div>
        </div>
        <div className="mt-3"></div>
        <div className='mt-2'></div>
        < Divider />
        <div className='mt-3'></div>
        {radiocheck === '0010002' ?
          <div className="row">
            <div className="col-12">
              <label style={labelStyle}> 리드 단계 <span style={{ color: 'red' }}>*</span></label>
              <StyledSelect
                disabled={true}
                placeholder="리드단계"
                options={leadActivityOption}
                value={leadactivity}
                onChange={onLeadActivity}
                styles={selectStyle}
              />
              <div className='mt-3'></div>
              < Divider />
              <div className='mt-2'></div>
            </div>
          </div>
          : null}
        <div className="row">
          <div className="col-12" style={{ display: 'flex' }}>
            <label style={labelStyle}> 영업 목적 <span style={{ color: 'red' }}>*</span>
              <Tooltip title="고객에 대한 전반적 '정보/동향수집', '특정내용,수요,기술에 대한 니즈조사
              , '실질적인 제안, 검증, 협의 등' 영업활동의 목적(의도)을 선택해주세요.">
                <Info />
              </Tooltip>
            </label>

          </div>
        </div>
        <div className='mt-2'></div>
        <div className="row">
          <div className="col-12">
            <StyledSelect
              isSearchable={false}
              placeholder="영업 목적을 선택해주세요."
              options={salesActivityOption}
              value={activity}
              // defaultValue={salesActivityOption}
              onChange={onSalesActivity}
              styles={selectStyle}
            />
          </div>
        </div>
        <div className='mt-3'></div>
        <div className="row">
          <div className="col-12" style={{ display: 'flex' }}>
            <label style={labelStyle}> 영업 채널 <span style={{ color: 'red' }}>*</span>
              <Tooltip title="영업 목적을 위해 사용한 채널을 선택해주세요.
               2개 이상 채널을 병행한 경우 활용 가중치가 높거나 핵심적인 채널을 선택해주세요.">
                <Info />
              </Tooltip>
            </label>

          </div>
        </div>
        <div className='mt-2'></div>
        <div className="row">
          <div className="col-12">
            <StyledSelect
              isSearchable={false}
              placeholder="영업 채널을 선택해주세요."
              options={salesChannelOption}
              value={channel}
              onChange={onSalesChannel}
              styles={selectStyle}
            />
          </div>
        </div>
        <div className="mt-3"></div>
        <div className="row">
          <div className="col-12">
            <label style={labelStyle}> 영업 장소 </label>
          </div>
        </div>
        <div className="mt-2"></div>
        <div className="input-group">
          <Input type="text"
            className="form-control"
            placeholder="상세주소 입력"
            value={fromData.addr}
            onChange={onChangeLocation}
          />
        </div>
        <div className="mt-2"></div>
        <Divider />
        <div className="mt-3"></div>
        <div className="row">
          <div className="col-12">
            <label style={labelStyle}> 제목 <span style={{ color: 'red' }}>*</span></label>

          </div>
        </div>
        <div className="mt-2"></div>
        <div className="input-group">
          <Input type="text"
            className="form-control"
            placeholder="제목을 입력하세요"
            value={fromData.title}
            onChange={onChangeTitle} />
        </div>
        <div className="mt-3"></div>
        <div className="row" style={{ display: 'flex', justifyContent: 'space-between', margin: '0px 2px 0px 2px' }}>
          <label style={labelStyle}> 내용 <span style={{ color: 'red' }}>*</span></label>

          {!id ? <LogListModal buttonLabel='임시저장함' /> : <></>}
          {(id ? id.length < 3 : false) && <LogListModal buttonLabel='임시저장함' />}


        </div>
        <div className="mt-2"></div>
        <div className="input-group">
          <TextArea className="form-control"
            placeholder='내용을 입력해주세요'
            style={{ height: '391px', whiteSpace: 'pre' }}
            value={fromData.log}
            onChange={onChangeContent}
          />
        </div>
        <div className='mt-1'></div>
        {!id ? <>
          <div style={{ display: 'flex', justifyContent: 'space-between' }}>
            <div>
              <img src={require('assets/icons/clip.png')} alt='clip_logo' />
              <input type='file' id='input-file' onChange={selectFile} accept='.xlsx, .ppt, .pdf, .doc, .txt, .png, .jpg, .gif '
                multiple />
            </div>
            <div>
              <CouserModal handleonInsert={handleonInsert} />
            </div>
          </div>
          <div ></div>
          <div style={{ float: 'right' }}>
            <UcouserList lists={lists} handleonRemove={handleonRemove} />
          </div>
        </> : <div className='mt-1'></div>}
        {(id ? id.length < 3 : false) && <>
          <div style={{ display: 'flex', justifyContent: 'space-between' }}>
            <div>
            </div>
            <div>
              <CouserModal handleonInsert={handleonInsert} />
            </div>
          </div>
          <div ></div>
          <div style={{ float: 'right' }}>
            <UcouserList lists={lists} handleonRemove={handleonRemove} />
          </div>
        </>}
        <div className='mt-5'></div>
      </div >
    </React.Fragment >
  );
}

const mapStateToProps = (state) => {
  const { accounts, accountslist, accountpersonlist } = state.Account;
  const { userList, temporaryLoglist, log, logcouser, temporaryloglistresponse, tempodone, salesgb } = state.SalesLog;
  const { postCustomerResponse } = state.Customer
  return {
    accounts, userList, accountslist,
    accountpersonlist, temporaryLoglist, log, logcouser,
    postCustomerResponse, temporaryloglistresponse, tempodone, salesgb
  };
};
const mapStateToDispatch = {
  postSalesLog: postSalesLog.call,
  postTemporarySalesLog: postTemporarySalesLog.call,
  selectAccounts: selectAccounts.call,
  selectAccountperson: selectAccountperson.call,
  uploadFile: uploadFile.call,
  getUserList: getUserList.call,
  getLogList: getLogList.call,
  putSalesLog: putSalesLog.call,
  clearLog,
  clearTempLog,
  postAutoSalesLog: postAutoSalesLog.call
}

export default connect(mapStateToProps, mapStateToDispatch)(UploadSalesLog);
