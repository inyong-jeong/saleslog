import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import { Helmet } from "react-helmet";
import { postSalesLog, selectAccounts, selectAccountperson, postTemporarySalesLog, uploadFile } from 'redux/actions';
import Select from 'react-select';
import CreatableSelect from 'react-select/creatable';
import Divider from 'components/Divider'
import 'antd/dist/antd.css';
import { TimePicker, Radio, DatePicker, Input } from 'antd';
import moment from 'moment';
import useInput from 'hooks/useInput';

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
  { label: '온라인 리서치', value: 2 },
  { label: '도서-전문정보', value: '0050005' },
  { label: '소셜 커뮤니티', value: '0050006' },
  { label: '기타', value: '0050007' }];

const leadActivityOption =
  [{ label: '조사', value: '0050001' },
  { label: '접촉', value: '0050002' },
  { label: '제안', value: '0050003' },
  { label: '검증', value: '0050004' }];

function UploadSalesLog(props) {
  const [accountsList, setAccountsList] = useState([]);
  const [accountspersonList, setAccountsPersonList] = useState([]);
  const [selectedAccount, setSelectedAccount] = useState(0);
  const [selectedAccountperson, setSelectedAccountPerson] = useState(0);
  const [error, setError] = useState();

  const [dateString, onDatePickerChange] = useState('');
  const [location, onChangeLocation] = useInput('');
  const [title, onChangeTitle] = useInput('')
  const [content, onChangeContent] = useInput('')
  const [start, onChangesSartValue] = useState('');
  const [end, onChangeEndValue] = useState('');
  const [radiocheck, setValue] = useState('0050001');
  const [activity, setActivity] = useState('0050001');
  const [leadactivity, setLeadActivity] = useState('0050001');
  // const [imgBase64, setImgBase64] = useState([]); // 파일 base64
  // const [imgFile, setImgFile] = useState(null);	//파일	

  const [channel, setChannel] = useState('0050001');
  const date = moment(dateString).format('YYYY-MM-DD');
  const startTime = moment(start).format('HH:mm');
  const endTime = moment(end).format('HH:mm');
  const InputStyle = { border: '1px solid #AAAAAA' }
  const { TextArea } = Input;
  const format = 'HH:mm';
  const Dateformat = 'YYYY-MM-DD';
  const [selectedFiles, setSelectedFiles] = useState(undefined);
  const [message, setMessage] = useState("");
  const [isFilePicked, setIsFilePicked] = useState(false);

  const fromData = {
    acc_idx: selectedAccount.value,
    accm_idx: '10000002',
    sales_gb: radiocheck,
    sales_lead_gb: leadactivity,
    sales_goal: activity,
    sales_activity: channel,
    meeting_date: date,
    meeting_stime: startTime,
    meeting_etime: endTime,
    title: title,
    log: content,
    addr: location,
    lati: 0,
    longi: 0,
    score: '',
    cousers: '',
    fileup: selectedFiles
  }

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


  const onAccountSelectChange = (v, action) => {
    setSelectedAccount(v);
  };

  const onAccountPersonSelectChange = (v, action) => {
    setSelectedAccountPerson(v);
  }

  const handleOnBack = () => {
    props.history.push('/main/manage');
  };

  const onChange = (e) => {
    setValue(e.target.value);
  };

  const onSalesActivity = (option) => {
    setActivity(option.value);
  };

  const onLeadActivity = (option) => {
    setLeadActivity(option.value);
  }

  const onSalesChannel = (option) => {
    setChannel(option.value);
  };

  const onFormSubmit = () => {
    props.postSalesLog(fromData)
  }

  const onFormTemporarySubmit = () => {
    props.postTemporarySalesLog(fromData)
  }



  const selectFile = (event) => {
    setSelectedFiles(event.target.files);
    setIsFilePicked(true);
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
          <div className="col" style={{ display: 'flex', justifyContent: 'space-between' }}>
            <img
              src={require('assets/icons/back.png')}
              onClick={handleOnBack}
              alt='back_logo'
              style={{ cursor: 'pointer' }} />
            <h4 > <strong>일지 쓰기</strong></h4>
            <h4 >등록</h4>
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
              formatCreateLabel={(v) => `새로운 고객사 "${v}"만들기`}
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
            <h4>고객사 담당자</h4>
          </div>
        </div>
        <div className="mt-2"></div>
        <div className="row">
          <div className="col-12">
            <CreatableSelect
              isClearable
              placeholder="고객사 담당자를 선택해주세요"
              formatCreateLabel={(v) => `새로운 담당자 "${v}"만들기`}
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
                // value={activity}
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
              // value={activity}
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
              // value={channel}
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
          <h4>임시저장</h4>
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
        <div className="row mt-1" style={{ display: 'flex' }}>
          <div className='col-11'>
            <input type='file' id='file' onChange={selectFile} multiple />
            {/* {isFilePicked ?
              Array(selectedFiles).map((v) => { return <p>{v.name}</p> })
              : <p>선택된 파일 없음</p>
            } */}
            {/* <img onClick={UploadFile} src={require('assets/icons/clip.png')} alt='clip_logo' style={{ cursor: 'pointer' }} /> */}
            <img src={require('assets/icons/voice.png')} alt='voice_logo' />
          </div>
          <div className='col-1'>
            <img className="ml-2" src={require('assets/icons/profile_plus.png')} alt='profile_plus_logo' />
          </div>
        </div>
        <div className="row">
          <div className="col-12 d-flex justify-content-center">
            <button className="btn btn-primary" onClick={onFormSubmit} disabled={props.submitLoading}>
              {props.submitLoading && <span className="spinner-border spinner-border-sm mr-1"></span>}
              등록
            </button>
            <button className="btn btn-primary" onClick={onFormTemporarySubmit} disabled={props.submitLoading}>
              {props.submitLoading && <span className="spinner-border spinner-border-sm mr-1"></span>}
              임시저장
            </button>
          </div>
        </div>
      </div>
    </React.Fragment >
  );
}

const mapStateToProps = (state) => {
  const { accounts, accountslist, accountpersonlist } = state.Account;
  const { salesLogLoading, submitLoading, postSalesLogError, postSalesLogResponse } = state.SalesLog;
  return { accounts, salesLogLoading, submitLoading, postSalesLogError, postSalesLogResponse, accountslist, accountpersonlist };
};
const mapStateToDispatch = {
  postSalesLog: postSalesLog.call,
  postTemporarySalesLog: postTemporarySalesLog.call,
  selectAccounts: selectAccounts.call,
  selectAccountperson: selectAccountperson.call,
  uploadFile: uploadFile.all
}

export default connect(mapStateToProps, mapStateToDispatch)(UploadSalesLog);
