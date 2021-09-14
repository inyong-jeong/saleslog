import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import { Helmet } from "react-helmet";
import {
  postSalesLog, selectAccounts, selectAccountperson,
  postTemporarySalesLog, uploadFile, getUserList
} from 'redux/actions';
import Select from 'react-select';
import CreatableSelect from 'react-select/creatable';
import Divider from 'components/Divider'
import { TimePicker, Radio, DatePicker, Input } from 'antd';
import moment from 'moment';
import CouserModal from 'components/CouserModal'
import CouserList from 'components/CouserList';
import LogListModal from 'components/LogListModal'

const selectStyle = {
  control: (defaultStyle) => ({ ...defaultStyle, border: '1px solid #AAAAAA' }),
  indicatorSeparator: () => { }
}

const salesActivityOption =
  [{ label: '니즈조사', value: '0050001' },
  { label: '동향/정보수집', value: '0050002' },
  { label: '제안', value: '0050003' }];

const salesChannelOption =
  [{ label: '전화', value: '0050001' },
  { label: '이메일', value: '0050002' },
  { label: '대면', value: '0050003' },
  { label: '행사참여', value: '0050004' },
  { label: '온라인 리서치', value: '0050005' },
  { label: '도서-전문정보', value: '0050006' },
  { label: '소셜 커뮤니티', value: '0050007' },
  { label: '기타', value: '005000' }];

const leadActivityOption =
  [{ label: '조사', value: '0050001' },
  { label: '접촉', value: '0050002' },
  { label: '제안', value: '0050003' },
  { label: '검증', value: '0050004' }];
console.log(salesChannelOption);

function UploadSalesLog(props) {

  const [channelindex, setChannelIndex] = useState('');
  const [activityindex, setActivitylIndex] = useState('');

  const [accountsList, setAccountsList] = useState([]);
  const [accountspersonList, setAccountsPersonList] = useState([]);
  const [selectedAccount, setSelectedAccount] = useState(0);
  const [selectedAccountperson, setSelectedAccountPerson] = useState(0);
  const [error, setError] = useState();
  const [dateString, setDateString] = useState('');
  const [location, setLocation] = useState('');
  const [title, setTitle] = useState('')
  const [content, setContent] = useState('')
  const [start, setStart] = useState('');
  const [end, setEnd] = useState('');
  const [radiocheck, setRadioCheck] = useState('');
  const [activity, setActivity] = useState('');
  const [leadactivity, setLeadActivity] = useState('');
  const [channel, setChannel] = useState('');
  const InputStyle = { border: '1px solid #AAAAAA' }
  const { TextArea } = Input;
  const format = 'HH:mm';
  const Dateformat = 'YYYY-MM-DD';
  const [selectedFiles, setSelectedFiles] = useState(undefined);
  const [message, setMessage] = useState("");
  const [isFilePicked, setIsFilePicked] = useState(false);
  const [couser, setCoUser] = useState([])
  const [couserlist, setCoUserList] = useState('');

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

  useEffect(() => {
    //일지작성 부분 수정 할때 다시수정해야 되서 작업 중지.
    if (temporaryLogListId) {
      const { meeting_date, meeting_stime, meeting_etime, acc_idx, accm_idx, sales_gb, sales_goal, sales_lead_gb
        , sales_activity, title, log, addr } = props.temporaryLoglist[0]
      const index = getSeletedChannel(sales_activity);
      const activityindex = getSeletedActivity(sales_goal)
      console.log(index)
      console.log(activityindex)
      // setDateString(meeting_date)
      // setStart(meeting_stime)
      // setEnd(meeting_etime)
      // setSelectedAccount(acc_idx)
      // setSelectedAccountPerson(accm_idx)
      // setRadioCheck(sales_gb)
      // setLeadActivity(sales_lead_gb)
      setActivitylIndex(activityindex)
      setChannelIndex(index)
      setLocation(addr)
      setTitle(title)
      setContent(log)
      // setFromData({
      //   ...fromData,
      //   'title': title
      // })
    }
  }, [temporaryLogListId])

  useEffect(() => {
    //일지작성 부분 수정 할때 다시수정해야 되서 작업 중지.
    if (props.match.params.id) {
      const { meeting_date, meeting_stime, meeting_etime, acc_idx, accm_idx, sales_gb, sales_goal, sales_lead_gb
        , sales_activity, title, log, addr } = props.log[0]
      const index = getSeletedChannel(sales_activity);
      const activityindex = getSeletedActivity(sales_goal)
      console.log(index)
      console.log(activityindex)
      // setDateString(meeting_date)
      // setStart(meeting_stime)
      // setEnd(meeting_etime)
      // setSelectedAccount(acc_idx)
      // setSelectedAccountPerson(accm_idx)
      // setRadioCheck(sales_gb)
      // setLeadActivity(sales_lead_gb)
      setActivitylIndex(activityindex)
      setChannelIndex(index)
      setLocation(addr)
      setTitle(title)
      setContent(log)
      // setFromData({
      //   ...fromData,
      //   'title': title
      // })
    }
  }, [props.match.params.id])

  const [fromData, setFromData] = useState({
    acc_idx: (!selectedAccount.value) ? 0 : selectedAccount.value,
    accm_idx: (!accountspersonList.value) ? 0 : accountspersonList.value,
    sales_gb: radiocheck,
    sales_lead_gb: leadactivity,
    sales_goal: activity,
    sales_activity: channel,
    meeting_date: dateString,
    meeting_stime: start,
    meeting_etime: end,
    title: title,
    log: content,
    addr: location,
    lati: 0,
    longi: 0,
    score: '',
    cousers: couser,
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

  useEffect(() => {
    props.selectAccounts()
  }, [])

  useEffect(() => {
    if (selectedAccount.value) {
      const accountperson = {
        acc_idx: selectedAccount.value
      }
      props.selectAccountperson(accountperson);
    }
  }, [selectedAccount])

  // useEffect(() => {
  //   if (isFilePicked === 'true') {
  //     const formData = new FormData();
  //     formData.append('File', selectedFiles)
  //     setSelectedFiles(formData)
  //   } else return;
  // }, [isFilePicked])

  const onDatePickerChange = (date) => {
    const convertdate = moment(date).format('YYYY-MM-DD');
    setDateString(date)
    setFromData({
      ...fromData,
      'meeting_date': convertdate
    })
  }
  const onChangesSartValue = (stime) => {
    const convertstime = moment(stime).format('HH:mm');
    setStart(stime)
    setFromData({
      ...fromData,
      'meeting_stime': convertstime
    })
  }

  const onChangeEndValue = (etime) => {
    const convertetime = moment(etime).format('HH:mm');
    setEnd(etime)
    setFromData({
      ...fromData,
      'meeting_etime': convertetime
    })
  }

  const onAccountSelectChange = (v, action) => {
    setSelectedAccount(v);
    setFromData({
      ...fromData,
      'acc_idx': v.value
    })
  };

  const onAccountPersonSelectChange = (v, action) => {
    setSelectedAccountPerson(v);
    setFromData({
      ...fromData,
      'accm_idx': v.value
    })
  }

  const onChange = (e) => {
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
      'sales_activity': option.value
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
    setSelectedFiles(event.target.files);
    setFromData({
      ...fromData,
      'fileup': event.target.files
    })
    setIsFilePicked(true);
  }



  const onChangeLocation = (e) => {
    setLocation(e.target.value)
    setFromData({
      ...fromData,
      'addr': e.target.value
    })
  }

  const onChangeTitle = (e) => {
    setTitle(e.target.value)
    setFromData({
      ...fromData,
      'title': title
    })
  }
  const onChangeContent = (e) => {
    setContent(e.target.value)
    setFromData({
      ...fromData,
      'log': content
    })
  }

  const handleOnChange = (login_idx, user_name) => {
    console.log(user_name.split('/'));
    const couserlist = {
      id: login_idx,
      user_name,
    };
    setCoUser(couser.concat(couserlist))
    setCoUserList(user_name);
  }

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

  const onCancel = () => {
    props.history.push(`/main/manage/saleslog/${props.match.params.id}`)
  }
  return (
    <React.Fragment>
      <Helmet>
        <title>
          세일즈로그 - 일지 쓰기
        </title>
      </Helmet>
      <div className="container">
        <div className="row">
          {/* <button onClick={test}></button> */}
          <div className="col" style={{ display: 'flex', justifyContent: 'space-between' }}>
            <img
              src={require('assets/icons/back.png')}
              onClick={handleOnBack}
              alt='back_logo'
              style={{ cursor: 'pointer' }} />
            {!props.match.params.id ? <h4 > <strong>일지 쓰기</strong></h4> : <h4 > <strong>일지 수정</strong></h4>}
            <div ></div>
          </div>
        </div>
        <div className='mt-2'></div>
        < Divider />
        <div className='mt-3'></div>
        <div className="row">
          <div className="col-12">
            <h4>활동 일시</h4>
            {/* <ButtonTab tab={tabs} onSelected={onSelected} defaultSelected="SALESLOG" /> */}
          </div>
        </div>
        <div className='mt-2'></div>
        <DatePicker className='col-12' placeholder='활동일시'
          defaultValue={moment('0000-00-00', Dateformat)}
          format={Dateformat}
          value={dateString}
          onChange={onDatePickerChange} />
        <div className='mt-2'></div>
        <TimePicker className='col-6'
          defaultValue={moment('00:00', format)}
          format={format}
          value={start}
          onChange={onChangesSartValue}
          placeholder='00:00' />
        <TimePicker className='col-6'
          defaultValue={moment('00:00', format)}
          format={format}
          value={end}
          onChange={onChangeEndValue}
          placeholder='00:00' />
        <div className='mt-2'></div>
        <div className="row">
          <div className="col-12">
            <h4>일지 구분</h4>
          </div>
        </div>
        <div className='mt-2'></div>
        <div className='row'>
          <div className='col-12' style={{ display: 'flex' }}>
            <Radio.Group onChange={onChange} value={radiocheck}>
              <Radio value={'0050001'}>영업일지</Radio>
              <Radio value={'0050002'}>리드일지</Radio>
            </Radio.Group>
          </div>
        </div>
        <div className='mt-2'></div>
        < Divider />
        <div className='mt-3'></div>
        <div className="mt-2"></div>
        <div className="row">
          <div className="col-12">
            <h4>고객사</h4>
          </div>
        </div>
        <div className="mt-2"></div>
        <div className="row">
          <div className="col-12">
            <CreatableSelect
              isClearable
              placeholder="고객사 검색"
              // formatCreateLabel={(v) => `새로운 고객사 "${v}"만들기`}
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
            <h4>담당자 정보</h4>
          </div>
        </div>
        <div className="mt-2"></div>
        <div className="row">
          <div className="col-12">
            <CreatableSelect
              isClearable
              placeholder="고객사 담당자를 선택해주세요"
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
        {radiocheck === '0050002' ?
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
            <h4>영업활동 구분</h4><img src={require('assets/icons/caution.png')} alt='caution_logo' />
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
            <h4>채널 구분</h4><img src={require('assets/icons/caution.png')} alt='caition_logo' />
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
            value={location}
            onChange={onChangeLocation}
            style={InputStyle} />
        </div>
        <div className="mt-2"></div>
        <Divider />
        <div className="mt-3"></div>
        <div className="row">
          <div className="col-12">
            <h4>제목</h4>
          </div>
        </div>
        <div className="mt-2"></div>
        <div className="input-group">
          <Input type="text"
            className="form-control"
            placeholder="제목을 입력하세요"
            style={InputStyle}
            value={title}
            onChange={onChangeTitle} />
        </div>
        <div className="mt-3"></div>
        <div className="row" style={{ display: 'flex', justifyContent: 'space-between', margin: '0px 2px 0px 2px' }}>
          <h4>내용</h4>
          {!props.match.params.id ? <LogListModal buttonLabel='임시저장함' /> : <></>}

        </div>
        <div className="mt-2"></div>
        <div className="input-group">
          <TextArea className="form-control"
            placeholder='내용을 입력해주세요'
            style={{ height: '391px', border: '1px solid #AAAAAA' }}
            value={content}
            onChange={onChangeContent}
          />
        </div>
        {!props.match.params.id ? <div className="row mt-1" style={{ display: 'flex' }}>
          <div className='col-10'>
            <label className='input-file-button' htmlfor='input-file' style={{ backgroundColor: 'white', padding: '5px', cursor: 'pointer' }}>
              <img src={require('assets/icons/clip.png')} alt='clip_logo' />
            </label>
            <input type='file' id='input-file' onChange={selectFile} multiple />
            <img src={require('assets/icons/voice.png')} alt='voice_logo' />
          </div>
          <div className='col-2'>
            <CouserModal SearchChange={handleOnChange} handleonInsert={handleonInsert} />
            <CouserList lists={lists} handleonRemove={handleonRemove} />
          </div>
        </div> : <div className='mt-1'></div>}
        {!props.match.params.id ? <div className="row">
          <div className="col-12 d-flex justify-content-center">
            <button className="btn btn-primary" onClick={onFormSubmit} >
              등록
            </button>
            <button className="btn btn-primary ml-2" onClick={onFormTemporarySubmit} >
              임시저장
            </button>
          </div>
        </div> :
          <div className="row">
            <div className="col-12 d-flex justify-content-center">
              <button className="btn btn-primary" onClick={onFormSubmit} >
                수정
              </button>
              <button className="btn btn-primary ml-2" onClick={onCancel} >
                취소
              </button>
            </div>
          </div>
        }
      </div >
    </React.Fragment >
  );
}

const mapStateToProps = (state) => {
  const { accounts, accountslist, accountpersonlist } = state.Account;
  const { userList, temporaryLoglist, log } = state.SalesLog;
  return { accounts, userList, accountslist, accountpersonlist, temporaryLoglist, log };
};
const mapStateToDispatch = {
  postSalesLog: postSalesLog.call,
  postTemporarySalesLog: postTemporarySalesLog.call,
  selectAccounts: selectAccounts.call,
  selectAccountperson: selectAccountperson.call,
  uploadFile: uploadFile.all,
  getUserList: getUserList.call
}

export default connect(mapStateToProps, mapStateToDispatch)(UploadSalesLog);
