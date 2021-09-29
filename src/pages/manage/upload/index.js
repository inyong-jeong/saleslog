import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import { Helmet } from "react-helmet";
import MyAppBar from '../../../components/styledcomponent/MyAppBar';
import {
  postSalesLog, selectAccounts, selectAccountperson,
  postTemporarySalesLog, uploadFile, getUserList, getLogList, clearLog, putSalesLog
} from 'redux/actions';
import Select from 'react-select';
import CreatableSelect from 'react-select/creatable';
import Divider from 'components/Divider'
import { TimePicker, Radio, DatePicker, Input } from 'antd';
import CouserModal from 'components/CouserModal'
import CouserList from 'components/CouserList';
import LogListModal from 'components/LogListModal'
import CustomerModal from 'components/CustomerModal'
import moment from 'moment';
import 'moment/locale/ko';
// import { getLogLists, getLogList } from '../../../redux/saleslog/actions';

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
  [{ label: '조사', value: '0020001' },
  { label: '접촉', value: '0020002' },
  { label: '제안', value: '0020003' },
  { label: '검증', value: '0020004' }];
console.log(salesChannelOption);

function UploadSalesLog(props) {



  const [channelindex, setChannelIndex] = useState('');
  const [activityindex, setActivitylIndex] = useState('');
  const [accountindex, setAccountIndex] = useState('');


  //일지 등록 스테이트
  const [accountsList, setAccountsList] = useState([]);
  const [accountspersonList, setAccountsPersonList] = useState([]);
  const [selectedAccount, setSelectedAccount] = useState(0);
  const [selectedAccountperson, setSelectedAccountPerson] = useState(0);
  const [radiocheck, setRadioCheck] = useState('0010001');
  const [activity, setActivity] = useState('');
  const [leadactivity, setLeadActivity] = useState('');
  const [channel, setChannel] = useState('');
  const [isFilePicked, setIsFilePicked] = useState(false);
  const [couser, setCoUser] = useState([])
  const [couserlist, setCoUserList] = useState('');



  const InputStyle = { border: '1px solid #AAAAAA' }
  const [selectedFiles, setSelectedFiles] = useState(undefined);
  const [message, setMessage] = useState("");
  const [error, setError] = useState();


  //날짜 스테이트

  const [dateString, setDateString] = useState(moment());
  const [start, setStart] = useState(moment());
  const [end, setEnd] = useState(moment());


  const { TextArea } = Input;


  const temporaryLogListId = props.temporaryLoglist ? props.temporaryLoglist[0] : null

  function getSeletedChannel(key) {
    let result = undefined;
    for (let i = 0; i < salesChannelOption.length; i++) {
      if (salesChannelOption[i].value === key) {
        result = i;
      }
    }
    return result
  }

  function getSeletedActivity(key) {
    let result = undefined;
    for (let i = 0; i < salesActivityOption.length; i++) {
      if (salesActivityOption[i].value === key) {
        result = i;
      }
    }
    return result
  }

  function getCousrList(v) {
    let result = []
    for (let i = 0; i < v.length; i++) {
      result = result.concat(v[i].login_idx)
    }
    return result;
  }


  useEffect(() => {
    if (props.match.params.id) {
      console.log(1111111111);
      const data = {
        sidx: props.match.params.id
      }
      props.getLogList(data)
      // console.log(props.log[0]);

    }
  }, [props.match.params.id])

  useEffect(() => {
    if (props.log) {
      const index = getSeletedChannel(props.log.sales_activity);
      const activityindex = getSeletedActivity(props.log.sales_goal)

      //영업활동 채널 데이터 set
      setSelectedAccount({ label: '테스트', value: 10000035 })
      setSelectedAccountPerson({ label: '담당자 테스트', value: 10000006 })
      setActivitylIndex(activityindex)
      setChannelIndex(index)
      //날짜 및 시간 데이터 set
      setDateString(moment(new Date(props.log.meeting_date)));
      setStart(moment(new Date(`2021-09-18 ${props.log.meeting_stime}`)));
      setEnd(moment(new Date(`2021-09-18 ${props.log.meeting_etime}`)));

      setFromData({
        slog_idx: props.match.params.id,
        title: props.log.title,
        log: props.log.log,
        addr: props.log.addr,
        // acc_idx: props.log.acc_idx,
        // accm_idx: props.log.accm_idx,
        sales_gb: props.log.sales_gb,
        sales_lead_gb: props.log.sales_lead_gb,
        sales_goal: props.log.sales_goal,
        sales_activity: props.log.sales_activity,
        meeting_date: props.log.meeting_date,
        meeting_stime: props.log.meeting_stime,
        meeting_etime: props.log.meeting_etime,
        lati: 0,
        longi: 0,
        score: '',
      })
      console.log(fromData)
    }
    return () => { props.clearLog() }
  }, [props.log])


  // useEffect(() => {
  //   //일지작성 부분 수정 할때 다시수정해야 되서 작업 중지.
  //   if (props.match.params.id) {

  //     console.log(props.match.params.id)
  //     const { meeting_date, meeting_stime, meeting_etime, acc_idx, accm_idx, sales_gb, sales_goal, sales_lead_gb
  //       , sales_activity, title, log, addr } = props.log[0]
  //     const index = getSeletedChannel(sales_activity);
  //     const activityindex = getSeletedActivity(sales_goal)
  //     console.log(index)
  //     console.log(activityindex)
  //     setDateString(new Date(meeting_date));
  //     setStart(meeting_stime)
  //     setEnd(meeting_etime)
  //     setSelectedAccount(acc_idx)
  //     setSelectedAccountPerson(accm_idx)
  //     setRadioCheck(sales_gb)
  //     setLeadActivity(sales_lead_gb)
  //     setActivitylIndex(activityindex)
  //     setChannelIndex(index)
  //     setLocation(addr)
  //     setTitle(title)
  //     setContent(log)
  //     setFromData({
  //       ...fromData,
  //       'title': title
  //     })
  //   }
  // }, [props.match.params.id])


  const [fromData, setFromData] = useState({
    acc_idx: (!selectedAccount.value) ? 0 : selectedAccount.value,
    accm_idx: (!accountspersonList.value) ? 0 : accountspersonList.value,
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
    cousers: couser,
    fileup: selectedFiles
  })
  console.log(fromData)

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

  // 고객 검색

  useEffect(() => {

    const data = {
      sales_gb: '0010001'
    }
    props.selectAccounts(data)
  }, [])
  console.log(fromData);
  useEffect(() => {
    if (selectedAccount) {
      const accountperson = {
        acc_idx: selectedAccount.value
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

  // const onAccountSelectChange = (v, action) => {
  //   console.log(v)
  //   console.log(action)
  //   setSelectedAccount(v);
  //   setFromData({
  //     ...fromData,
  //     'acc_idx': v.value
  //   })
  // };

  // const onAccountPersonSelectChange = (v, action) => {
  //   setSelectedAccountPerson(v);
  //   setFromData({
  //     ...fromData,
  //     'accm_idx': v.value
  //   })
  // }

  const onChange = (e) => {
    console.log(e.target.value);
    setRadioCheck(e.target.value);
    setFromData({
      ...fromData,
      'sales_gb': e.target.value
    })
  };

  const onLeadActivity = (option) => {
    setLeadActivity(option.value);
    setFromData({
      ...fromData,
      'sales_lead_gb': option.value
    })
  }

  const onSalesActivity = (option) => {
    // setActivitylIndex(option)
    setActivity(option.value);
    setFromData({
      ...fromData,
      'sales_goal': option.value
    })
  };

  const onSalesChannel = (option) => {
    // setChannelIndex(option);
    setChannel(option.value);
    setFromData({
      ...fromData,
      'sales_activity': option.value
    })
  };

  const selectFile = (event) => {
    console.log(event)
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



  const handleOnChange = (login_idx, user_name) => {
    const couserlists = {
      id: login_idx,
      user_name,
    };

    setCoUser(couser.concat(couserlists))
    setCoUserList(user_name);
  }
  useEffect(() => {
    if (couser) {
      const result = getFields(couser, 'id')
      const realresult = result.join(',');
      setFromData({ ...fromData, cousers: realresult })
    }
  }, [couser])

  const handleOnBack = () => {
    props.history.push('/main/manage');
  };

  function getFields(input, field) {
    let output = [];
    for (let i = 0; i < input.length; ++i)
      output.push(input[i][field]);
    return output;
  }

  const onFormSubmit = () => {

    const result = getFields(couser, 'id');
    setFromData({
      ...fromData,
      // 'cousers': couser.join(',')
      'cousers': result

    })
    props.postSalesLog(fromData)
    window.alert("일지가 등록되었습니다.")

  }

  const onFormRevise = () => {
    props.putSalesLog(fromData)
    window.alert("일지가 수정 되었습니다.")
  }
  const onFormTemporarySubmit = () => {
    const result = getFields(couser, 'id');
    setFromData({
      ...fromData,
      // 'cousers': couser.join(',')
      'cousers': result

    })
    props.postTemporarySalesLog(fromData)
    window.alert("일지가 임시저장 되었습니다.")

  }
  const [lists, setLists] = useState([
  ]);

  const handleonInsert = (name, login_idx) => {
    const list = {
      id: login_idx,
      name,
    };
    setLists(lists.concat(list));
  };

  const handleonRemove = (id) => {
    setLists(lists.filter(list => list.id !== id));
    setCoUser(couser.filter(couserList => couserList.id !== id))
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
    console.log(v)
    if (actiontype.action === 'clear') {
      setSelectedAccount(v);
      setFromData({
        ...fromData,
        'acc_idx': ''
      })
    } else {
      setSelectedAccount(v);
      setFromData({
        ...fromData,
        'acc_idx': v.value
      })
    }

  };

  const onAccountPersonSelectChange = (v, actiontype) => {
    if (actiontype.action === 'clear') {
      setSelectedAccountPerson(v);
      setFromData({
        ...fromData,
        'accm_idx': ''
      })
    } else {
      setSelectedAccountPerson(v);
      setFromData({
        ...fromData,
        'accm_idx': v.value
      })
    }

  }
  console.log(props.match.params.id)
  return (
    <React.Fragment>
      <MyAppBar
        barTitle={'일지 쓰기'}
        showBackButton
        paramId={props.match.params.id}
        onRevise={onFormRevise}
        onSaveClick={onFormSubmit}
        navigateTo={handleOnBack}
        tempSaveClick={onFormTemporarySubmit} />
      <div className="container">
        <div className='mt-3'></div>
        <div className="row">
          <div className="col-12">
            <h4>* 활동 일시</h4>
            {/* <ButtonTab tab={tabs} onSelected={onSelected} defaultSelected="SALESLOG" /> */}
          </div>
        </div>
        <div className='mt-2'></div>
        <DatePicker className='col-12'
          defaultValue={moment}
          format={'YYYY-MM-DD'}
          value={dateString}
          onChange={onDatePickerChange} />
        <div className='mt-2'></div>
        <TimePicker className='col-6'
          format={'HH:mm'}

          defaultValue={moment}
          value={start}
          onChange={onChangesSartValue}
        />
        <TimePicker className='col-6'
          format={'HH:mm'}

          defaultValue={moment}
          value={end}
          onChange={onChangeEndValue}
        />
        <div className='mt-2'></div>
        <div className="row">
          <div className="col-12">
            <h4>* 일지 구분</h4>
          </div>
        </div>
        <div className='mt-2'></div>
        <div className='row'>
          <div className='col-12' style={{ display: 'flex' }}>
            <Radio.Group onChange={onChange} value={radiocheck}>
              <Radio onClick={getSalesAccount} value={'0010001'}>영업일지</Radio>
              <Radio onClick={getLeadAccount} value={'0010002'}>리드일지</Radio>
            </Radio.Group>
            <div>* 일지구분을 선택하면 고객 리스트가 조회됩니다.</div>
          </div>
        </div>
        <div className='mt-2'></div>
        < Divider />
        <div className='mt-3'></div>
        <div className="mt-2"></div>
        <div className="row">
          <div className="col-12" style={{ display: 'flex', alignItems: 'center' }}>
            <h4 className='mr-1' style={{ fontSize: '16px' }}>* 고객</h4>
            <CustomerModal buttonLabel='고객 간편 등록' />
          </div>
        </div>
        <div className="mt-2"></div>
        <div className="row">
          <div className="col-12">
            <Select
              // isClearable
              placeholder="고객 검색"
              // formatCreateLabel={(v) => `새로운 고객 "${v}"만들기`}
              options={accountsList && accountsList.map((v) => { return { value: v.acc_idx, label: v.account_name } })}
              value={selectedAccount}
              onChange={onAccountSelectChange}
              styles={selectStyle} />
            {/* {(logForm.account_id === 'new' || logForm.account_id === 'new ') && <small>입력된 새로운 고객사를 생성합니다.</small>} */}
          </div>
        </div>
        <div className="mt-3"></div>
        <div className="mt-2"></div>
        <div className="row">
          <div className="col-12">
            <h4>* 담당자 정보</h4>
          </div>
        </div>
        <div className="mt-2"></div>
        <div className="row">
          <div className="col-12">
            <Select
              // isClearable
              placeholder="고객 담당자를 선택해주세요"
              // formatCreateLabel={(v) => `새로운 담당자 "${v}"만들기`}
              options={accountspersonList && accountspersonList.map((v) => { return { value: v.accm_idx, label: v.man_name } })}
              value={selectedAccountperson}
              onChange={onAccountPersonSelectChange}
              styles={selectStyle} />
            {/* {(logForm.account_id === 'new' || logForm.account_id === 'new ') && <small>입력된 새로운 담당자를 생성합니다.</small>} */}
          </div>
        </div>
        <div className="mt-3"></div>
        <div className='mt-2'></div>
        < Divider />
        <div className='mt-3'></div>
        {radiocheck === '0010002' ?
          <div className="row">
            <div className="col-12">
              <Select
                placeholder="리드단계를 선택해주세요."
                options={leadActivityOption}
                value={leadActivityOption.activity}
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
            <h4>* 영업활동 구분</h4><img src={require('assets/icons/caution.png')} alt='caution_logo' />
          </div>
        </div>
        <div className='mt-2'></div>
        <div className="row">
          <div className="col-12">
            <Select
              placeholder="영업활동 구분을 선택해주세요."
              options={salesActivityOption}
              value={salesActivityOption[activityindex]}
              // defaultValue={salesActivityOption}
              onChange={onSalesActivity}
              styles={selectStyle}
            />
          </div>
        </div>
        <div className='mt-3'></div>
        <div className="row">
          <div className="col-12" style={{ display: 'flex' }}>
            <h4>* 채널 구분</h4><img src={require('assets/icons/caution.png')} alt='caition_logo' />
          </div>
        </div>
        <div className='mt-2'></div>
        <div className="row">
          <div className="col-12">
            <Select
              placeholder="영업 채널을 선택해주세요."
              options={salesChannelOption}
              value={salesChannelOption[channelindex]}
              // defaultValue={salesChannelOption[0]}
              onChange={onSalesChannel}
              styles={selectStyle}
            />
          </div>
        </div>
        <div className="mt-3"></div>
        <div className="row">
          <div className="col-12">
            <h4>영업 장소</h4>
          </div>
        </div>
        <div className="mt-2"></div>
        <div className="input-group">
          <Input type="text"
            className="form-control"
            placeholder="상세주소 입력"
            value={fromData.addr}
            onChange={onChangeLocation}
            style={InputStyle} />
        </div>
        <div className="mt-2"></div>
        <Divider />
        <div className="mt-3"></div>
        <div className="row">
          <div className="col-12">
            <h4>* 제목</h4>
          </div>
        </div>
        <div className="mt-2"></div>
        <div className="input-group">
          <Input type="text"
            className="form-control"
            placeholder="제목을 입력하세요"
            style={InputStyle}
            value={fromData.title}
            onChange={onChangeTitle} />
        </div>
        <div className="mt-3"></div>
        <div className="row" style={{ display: 'flex', justifyContent: 'space-between', margin: '0px 2px 0px 2px' }}>
          <h4>* 내용</h4>
          {!props.match.params.id ? <LogListModal buttonLabel='임시저장함' /> : <></>}

        </div>
        <div className="mt-2"></div>
        <div className="input-group">
          <TextArea className="form-control"
            placeholder='내용을 입력해주세요'
            style={{ height: '391px', border: '1px solid #AAAAAA' }}
            value={fromData.log}
            onChange={onChangeContent}
          />
        </div>
        {!props.match.params.id ? <div className="row ml-1 mr-1 mt-1" style={{ display: 'flex', justifyContent: 'space-between' }}>
          <div >
            <img src={require('assets/icons/clip.png')} alt='clip_logo' />
            <input type='file' id='input-file' onChange={selectFile} multiple />
            {/* <img src={require('assets/icons/voice.png')} alt='voice_logo' /> */}
          </div>
          <div >
            <CouserModal SearchChange={handleOnChange} handleonInsert={handleonInsert} />
            <CouserList lists={lists} handleonRemove={handleonRemove} />
          </div>
        </div> : <div className='mt-1'></div>}
        {!props.match.params.id ? <div className="row">
          <div className="col-12 d-flex justify-content-center">
            {/* <button className="btn btn-primary" onClick={onFormSubmit} >
              등록
            </button>
            <button className="btn btn-primary ml-2" onClick={onFormTemporarySubmit} >
              임시저장
            </button> */}
          </div>
        </div> :
          // <div className="row">
          //   <div className="col-12 d-flex justify-content-center">
          //     <button className="btn btn-primary" onClick={onFormSubmit} >
          //       수정
          //     </button>
          //   </div>
          // </div>
          null
        }
      </div >
    </React.Fragment >
  );
}

const mapStateToProps = (state) => {
  const { accounts, accountslist, accountpersonlist } = state.Account;
  const { userList, temporaryLoglist, log, logcouser } = state.SalesLog;
  return { accounts, userList, accountslist, accountpersonlist, temporaryLoglist, log, logcouser };
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
  clearLog
}

export default connect(mapStateToProps, mapStateToDispatch)(UploadSalesLog);
