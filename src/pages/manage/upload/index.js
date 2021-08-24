import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import { Dropdown, DropdownToggle, DropdownMenu, DropdownItem } from 'reactstrap';
import { Helmet } from "react-helmet";
import { postSalesLog, postTripSalesLog, putSalesLog, getUserAccounts, clearPostSalesLogResponse, putSalesLogCoUser } from 'redux/actions';
import Card from 'components/Card';
import Select from 'react-select';
import CreatableSelect from 'react-select/creatable';
import DatePicker from 'components/DatePicker';
// import DatePicker from 'components/styledcomponent/Datepicker';

import ButtonTab from 'components/ButtonTab';
import { getUserId } from 'helpers/authUtils';
import CouserModal from 'components/CouserModal'
import ThumbnailGroup from 'components/ThumbnailGroup';
import Divider from 'components/Divider'
import InputField from 'components/InputField'
import StyledRadio from 'components/styledcomponent/Radio'
import StyledInput from 'components/styledcomponent/Input';
import StyledButton from 'components/styledcomponent/Button';
import { Row, Col, Input } from 'antd';
const regex = {
  'title': /.{3,}/g,
  'account_name': /.{2,}/g,
  'log': /.{2,}/g
};

const translated = {
  'title': '제목',
  'account_name': '고객사명',
  'log': '일지내용'
};

const selectStyle = {
  control: (defaultStyle) => ({ ...defaultStyle, border: '1px solid #AAAAAA' }),
  indicatorSeparator: () => { }
}

const salesActivityOption = [{ label: '방문', value: 1 }, { label: '전화', value: 2 }, { label: '이메일', value: 3 }];
const salesStatusOption = [{ label: '시작', value: 0 }, { label: '수주', value: 1 }, { label: '실주', value: 2 }];

const tabs = [{
  id: "SALESLOG",
  label: "영업일지"
}, {
  id: "SALESLOG_PROJECT",
  label: "리드일지"
}];

// {
//   id: "TRIP_REPORT",
//   label: "영업일지 - 출장보고서"
// }

function getSavedLog() {
  let logList = window.localStorage.getItem('savedLog');
  if (!logList) return [];
  logList = JSON.parse(logList);
  return logList;
}

function saveLog(form) {
  let saved = window.localStorage.getItem('savedLog');
  if (!saved) saved = '[]';
  window.localStorage.setItem('savedLog', JSON.stringify(JSON.parse(saved).concat(form)));
}

export function searchAccounts(accountsNameInput, accountsList) {
  return accountsList.filter((v) => v.account_name.toLocaleLowerCase().search(accountsNameInput.toLocaleLowerCase()) !== -1);
}

function UploadSalesLog(props) {
  const [isPost, setIsPost] = useState(true);
  const [accountsList, setAccountsList] = useState([]);
  const [selectedAccount, setSelectedAccount] = useState(0);
  const [logForm, setLogForm] = useState({
    'title': '',
    'meeting_date': new Date().getTime(),
    'account_id': '',
    'account_name': '',
    'sales_activity': 0,
    'log': '',
    'project_name': '',
    'project_status': 0,
    'co_users': ''
  });
  const [tripLogForm, setTripLogForm] = useState({
    'title': '',
    'trip_date': new Date().getTime(),
    'account_id': '',
    'user_id': '',
    'account_name': '',
    'sales_activity': 0,
    'log': '',
    'present_report': '',
    'post_report': '',
    'implication_needs': '',
    'implication_strategy': ''
  });
  const [savedLogOpen, setSavedLogOpen] = useState(false);
  const [error, setError] = useState();
  const [savedLogList] = useState(getSavedLog());
  const [toggle, setToggle] = useState(0);
  const [coUsers, setCoUsers] = useState([]);
  let body = props.salesLog;

  // useEffect(() => {
  //   if (body) {
  //     setCoUsers([{
  //       user_id: body.user_id,
  //       user_name: body.user_name
  //     }].concat(JSON.parse(body.co_users)));
  //   }
  // }, [body]);
  // useEffect(() => {
  //   if (props.match.params.id && props.location.state) {
  //     setIsPost(false);
  //     const { title, meeting_date, account_id, user_id, account_name, log, project_name, co_users, present_report, post_report, implication_needs, implication_strategy } = props.location.state;
  //     setLogForm({
  //       title: title,
  //       meeting_date: meeting_date,
  //       account_name: account_name,
  //       account_id: account_id,
  //       log: log,
  //       project_name: project_name,
  //       co_users: co_users,
  //       present_report: present_report,
  //       post_report: post_report,
  //       implication_needs: implication_needs,
  //       implication_strategy: implication_strategy
  //     });
  //     setTripLogForm({
  //       title: title,
  //       meeting_date: meeting_date,
  //       account_name: account_name,
  //       account_id: account_id,
  //       user_id: user_id,
  //       log: log,
  //       present_report: present_report,
  //       post_report: post_report,
  //       implication_needs: implication_needs,
  //       implication_strategy: implication_strategy
  //     });
  //   }
  //   props.getUserAccounts(getUserId());
  // }, []);

  useEffect(() => {
    if (props.postSalesLogError) {
      setError('전송에 실패했습니다.');
    }
  }, [props.postSalesLogError]);

  useEffect(() => {
    setAccountsList(props.accounts);
  }, [props.accounts]);

  const onFormChange = (e) => {
    setLogForm({
      ...logForm,
      [e.target.name]: e.target.value
    });
    setAccountsList(searchAccounts(logForm.account_name, props.accounts));
  }

  const onTripFormChange = (e) => {
    setTripLogForm({
      ...tripLogForm,
      [e.target.name]: e.target.value
    });
    setAccountsList(searchAccounts(tripLogForm.account_name, props.accounts));
  }

  const onDateChange = (nextDate) => {
    if (!nextDate) {
      return;
    }
    setLogForm({
      ...logForm,
      'meeting_date': nextDate[0].getTime()
    });
    setTripLogForm({
      ...tripLogForm,
      'trip_date': nextDate[0].getTime()
    });
  }

  const onSalesActivity = (v) => {
    setLogForm({
      ...logForm,
      'sales_activity': v
    });
    setTripLogForm({
      ...tripLogForm,
      'sales_activity': v
    });
  }

  const onSalesStatus = (v) => {
    setLogForm({
      ...logForm,
      'project_status': v
    });
  }

  const handleOnChange = (index) => {
    setLogForm({
      ...logForm,
      'co_users': [index]
    });
  }

  const checkFormValid = () => {
    let form = Object.keys(logForm);
    for (const key of form) {
      if (regex[key] && !new RegExp(regex[key]).exec(logForm[key])) {
        setError(`${translated[key]}을 확인해주세요`);
        return false;
      }
    }
    return true;
  }

  const checkTripFormValid = () => {
    let form = Object.keys(tripLogForm);
    for (const key of form) {
      if (regex[key] && !new RegExp(regex[key]).exec(tripLogForm[key])) {
        setError(`${translated[key]}을 확인해주세요`);
        return false;
      }
    }
    return true;
  }

  const onFormSubmit = (e) => {
    if (!checkFormValid())
      return;
    if (isPost) {
      logForm.sales_activity = logForm.sales_activity.value;
      logForm.project_status = logForm.project_status.value;
      if (logForm.account_id === 'new') {
        delete logForm.account_id;
        logForm.account_name = logForm.account_name.label;
      }
      else {
        delete logForm.account_name;

      }
      props.postSalesLog(logForm);
    } else {
      props.putSalesLog(logForm);
    }
  }

  const onTripFormSubmit = (e) => {
    // if (!checkTripFormValid())
    //   return;
    if (isPost) {
      tripLogForm.sales_activity = tripLogForm.sales_activity.value;
      tripLogForm.user_id = props.user.user_id;
      if (tripLogForm.account_id === 'new') {
        delete logForm.account_id;
        tripLogForm.account_name = tripLogForm.account_name.label;
      }
      else {
        delete tripLogForm.account_name;
      }
      props.postTripSalesLog(tripLogForm);
    }
  }

  const onAccountSelectChange = (v, action) => {
    if (action.action === 'create-option') {
      setLogForm({ ...logForm, account_name: v, account_id: 'new' });
      setTripLogForm({ ...tripLogForm, account_name: v, account_id: 'new' });
      setSelectedAccount(v);
      return;
    }
    setSelectedAccount(v);
    setLogForm({
      ...logForm,
      account_id: v.value,
      account_name: v.label
    });
    setTripLogForm({
      ...tripLogForm,
      account_id: v.value,
      account_name: v.label
    });
  }
  const onSaveClick = (e) => {
    if (!checkFormValid())
      return;
    saveLog(logForm);
  }

  const onTripSaveClick = (e) => {
    if (!checkFormValid())
      return;
    saveLog(tripLogForm);
  }

  const onSavedLogClick = (e) => {
    setLogForm(savedLogList[savedLogList.length - e.target.id]);
  }

  // useEffect(() => {
  //   if (props.postSalesLogResponse !== null) {
  //     props.clearPostSalesLogResponse();
  //     props.history.push('/main/manage');
  //   }
  // }, [props.postSalesLogResponse]);

  const onSelected = (id) => {
    if (id === "SALESLOG") {
      setToggle(0);
    } else if (id === "SALESLOG_PROJECT") {
      setToggle(1);
    } else if (id === "TRIP_REPORT") {
      setToggle(2);
    }
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
            <img src={require('assets/icons/back.png')} />
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
        <DatePicker title='미팅 일자' />
        <div class="row">
          <div class='col-6'>
            <div class="form-group">
              <div class='input-group date' id='datetimepicker3'>
                <input type='text' class="form-control" />
                <span class="input-group-addon">
                  <span class="glyphicon glyphicon-time"></span>
                </span>
              </div>
            </div>
          </div>
          <div class='col-6'>
            <div class="form-group">
              <div class='input-group date' id='datetimepicker3'>
                <input type='text' class="form-control" />
                <span class="input-group-addon">
                  <span class="glyphicon glyphicon-time"></span>
                </span>
              </div>
            </div>
          </div>
        </div>
        <div className="row">
          <div className="col-12">
            <h4>일지 구분</h4>
          </div>
        </div>
        <div className='mt-2'></div>
        <div className='row'>
          <div className='col-12' style={{ display: 'flex' }}>
            <div className='mr-3'>
              <StyledRadio >영업일지</StyledRadio>
            </div>
            <div>
              <StyledRadio>리드일지</StyledRadio>
            </div>
          </div>
        </div>
        <div className='mt-2'></div>
        < Divider />
        <div className='mt-3'></div>
        {/* <div className="row">
          <div className="col-12">
            <div className="d-flex justify-content-end align-items-center">
              <ThumbnailGroup thumbnails={coUsers} className="d-inline mr-3" />
              <CouserModal buttonLabel='공동작성자 추가' SearchChange={handleOnChange} />
              <Dropdown id="saved-log" className="search-box ml-2" isOpen={savedLogOpen} toggle={() => setSavedLogOpen(!savedLogOpen)}>
                <DropdownToggle tag="button" className="d-inline btn btn-primary" style={{ 'display': 'none' }}>저장된 일지</DropdownToggle>
                <DropdownMenu right>
                  {savedLogList.reverse().map((v, i) =>
                    <DropdownItem key={"savedLog_" + i} id={i} onClick={onSavedLogClick}>{v.title}</DropdownItem>
                  )}
                </DropdownMenu>
              </Dropdown>
            </div>
          </div>
        </div> */}
        {/* {(toggle === 0 || toggle === 1) && <div className="row">
          <div className="col-lg-3 col-md-4 col-sm-6">
            <DatePicker title="미팅일자" date={logForm.meeting_date} onDateChange={onDateChange} />
          </div>
        </div>}
        {toggle === 2 && <div className="row">
          <div className="col-lg-3 col-md-4 col-sm-6">
            <DatePicker title="미팅일자" date={tripLogForm.trip_date} onDateChange={onDateChange} />
          </div>
        </div>} */}
        {/* <div className="row">
          <div className="col-12">
            <Select
              placeholder="프로젝트 현황을 선택해주세요"
              options={salesStatusOption}
              value={logForm.project_status}
              onChange={onSalesStatus}
              styles={selectStyle}
            />
          </div>
        </div> */}
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
              options={accountsList.map((v) => { return { value: v.account_id, label: v.account_name } })}
              value={selectedAccount}
              onChange={onAccountSelectChange}
              styles={selectStyle} />
            {(logForm.account_id === 'new' || logForm.account_id === 'new ') && <small>입력된 새로운 고객사를 생성합니다.</small>}
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
              formatCreateLabel={(v) => `새로운 고객사 "${v}"만들기`}
              options={accountsList.map((v) => { return { value: v.account_id, label: v.account_name } })}
              value={selectedAccount}
              onChange={onAccountSelectChange}
              styles={selectStyle} />
            {(logForm.account_id === 'new' || logForm.account_id === 'new ') && <small>입력된 새로운 고객사를 생성합니다.</small>}
          </div>
        </div>
        <div className="mt-3"></div>
        <div className='mt-2'></div>
        < Divider />
        <div className='mt-3'></div>
        <div className="row">
          <div className="col-12" style={{ display: 'flex' }}>
            <h4>영업활동 구분</h4><img src={require('assets/icons/caution.png')} />
          </div>
        </div>
        <div className='mt-3'></div>
        <div className="row">
          <div className="col-12">
            <Select
              placeholder="영업활동 구분을 선택해주세요."
              options={salesActivityOption}
              value={logForm.sales_activity}
              onChange={onSalesActivity}
              styles={selectStyle}
            />
          </div>
        </div>
        <div className='mt-2'></div>
        <div className="row">
          <div className="col-12" style={{ display: 'flex' }}>
            <h4>채널 구분</h4><img src={require('assets/icons/caution.png')} />
          </div>
        </div>
        <div className='mt-3'></div>
        <div className="row">
          <div className="col-12">
            <Select
              placeholder="영업 채널을 선택해주세요."
              options={salesActivityOption}
              value={logForm.sales_activity}
              onChange={onSalesActivity}
              styles={selectStyle}
            />
          </div>
        </div>
        <div className="mt-2"></div>
        <div className="row">
          <div className="col-12">
            <h4>영업 장소</h4>
          </div>
        </div>
        <div className="mt-2"></div>
        <div className='row' >
          <div class='col-9'>
            <div class="form-group">
              <div class='input-group date' id='datetimepicker3'>
                <input type='text' class="form-control" placeholder='주소' />
                <span class="input-group-addon">
                  <span class="glyphicon glyphicon-time"></span>
                </span>
              </div>
            </div>
          </div>
          <div class='col-3'>
            <div class="form-group">
              <div class='input-group date' id='datetimepicker3'>
                <input type='button' class="form-control" />
                <span class="input-group-addon">
                  <span class="glyphicon glyphicon-time"></span>
                </span>
              </div>
            </div>
          </div>

        </div>
        {/* <Row>
          <Col xl={24}>
            <Input
              style={{ fontSize: '16px' }}
              // id="user_email"
              // title="이메일"
              placeholder="주소"
            />
          </Col>
          <Col span={12}>
            <StyledButton >주소 검색</StyledButton>
          </Col>
        </Row> */}

        {/* <div className="card col-10" style={{ border: '2px solid #DDDDDD', height: '48px', }}>
          <div className="card-body" >
          </div>
        </div> */}
        <div className="mt-2"></div>
        {/* {toggle === 2 && <div className="row">
          <div className="col-12">
            <Card title="영업활동 구분">
              <Select
                placeholder="영업활동을 선택해주세요"
                options={salesActivityOption}
                value={tripLogForm.sales_activity}
                onChange={onSalesActivity}
                styles={selectStyle}
              />
            </Card>
          </div>
        </div>} */}
        <div className="row">
          <div className="col-12 d-flex justify-content-center">
            {error && <p className="text-danger">{error}</p>}
          </div>
          <div className="col-12 d-flex justify-content-center">
            {(toggle === 0 || toggle === 1) && <button className="btn btn-primary" onClick={onFormSubmit} disabled={props.submitLoading}>
              {props.submitLoading && <span className="spinner-border spinner-border-sm mr-1" role="status" aria-hidden="true"></span>}
              전송
            </button>}
            {toggle === 2 && <button className="btn btn-primary" onClick={onTripFormSubmit} disabled={props.submitLoading}>
              {props.submitLoading && <span className="spinner-border spinner-border-sm mr-1" role="status" aria-hidden="true"></span>}
              전송
            </button>}
            {(toggle === 0 || toggle === 1) && <button className="btn btn-secondary ml-1" onClick={onSaveClick}>
              임시저장
            </button>}
            {(toggle === 2) && <button className="btn btn-secondary ml-1" onClick={onTripSaveClick}>
              임시저장
            </button>}
          </div>
        </div>
      </div>
    </React.Fragment >
  );
}

const mapStateToProps = (state) => {
  const { user } = state.User;
  const { accounts } = state.Account;
  const { salesLogLoading, submitLoading, postSalesLogError, postSalesLogResponse, putSalesLogResponse } = state.SalesLog;
  return { user, accounts, salesLogLoading, submitLoading, postSalesLogError, postSalesLogResponse, putSalesLogResponse };
};

const mapStateToDispatch = {
  postSalesLog: postSalesLog.call,
  postTripSalesLog: postTripSalesLog.call,
  putSalesLog: putSalesLog.call,
  getUserAccounts: getUserAccounts.call,
  clearPostSalesLogResponse: clearPostSalesLogResponse,
  putSalesLogCoUser: putSalesLogCoUser.call
}

export default connect(mapStateToProps, mapStateToDispatch)(UploadSalesLog);