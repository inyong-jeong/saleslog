import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import { Helmet } from "react-helmet";
import { postSalesLog, putSalesLog, getUserAccounts, clearPostSalesLogResponse, putSalesLogCoUser } from 'redux/actions';
import Card from 'components/Card';
import AccountCard from 'components/AccountCard';
import Select from 'react-select';
import CreatableSelect from 'react-select/creatable';
import { getUserId } from 'helpers/authUtils';
import AccountModal from 'components/AccountModal'
import AccountTakeModal from 'components/AccountTakeModal'





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
  control: (defaultStyle) => ({ ...defaultStyle, border: 'none' }),
  indicatorSeparator: () => { }
}

const salesActivityOption = [{ label: '방문', value: 1 }, { label: '전화', value: 2 }, { label: '이메일', value: 3 }];
const salesStatusOption = [{ label: '시작', value: 0 }, { label: '수주', value: 1 }, { label: '실주', value: 2 }];

const tabs = [{
  id: "SALESLOG",
  label: "영업일지"
}, {
  id: "SALESLOG_PROJECT",
  label: "영업일지 - 프로젝트"
}];

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
  const [savedLogOpen, setSavedLogOpen] = useState(false);
  const [error, setError] = useState();
  const [savedLogList] = useState(getSavedLog());
  const [toggle, setToggle] = useState(false);
  const [coUsers, setCoUsers] = useState([]);
  let body = props.salesLog;

  useEffect(() => {
    if (body) {
      setCoUsers([{
        user_id: body.user_id,
        user_name: body.user_name
      }].concat(JSON.parse(body.co_users)));
    }
  }, [body]);

  useEffect(() => {
    if (props.match.params.id && props.location.state) {
      setIsPost(false);
      const { title, meeting_date, account_id, account_name, log, project_name, co_users } = props.location.state;
      setLogForm({
        title: title,
        meeting_date: meeting_date,
        account_name: account_name,
        account_id: account_id,
        log: log,
        project_name: project_name,
        co_users: co_users
      });
    }
    props.getUserAccounts(getUserId());
  }, []);

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

  const onDateChange = (nextDate) => {
    if (!nextDate) {
      return;
    }
    setLogForm({
      ...logForm,
      'meeting_date': nextDate[0].getTime()
    });
  }

  const onSalesActivity = (v) => {
    setLogForm({
      ...logForm,
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

  const onAccountSelectChange = (v, action) => {
    if (action.action === 'create-option') {
      setLogForm({ ...logForm, account_name: v, account_id: 'new' });
      setSelectedAccount(v);
      return;
    }
    setSelectedAccount(v);
    setLogForm({
      ...logForm,
      account_id: v.value,
      account_name: v.label
    });
  }

  const onSaveClick = (e) => {
    if (!checkFormValid())
      return;
    saveLog(logForm);
  }

  const onSavedLogClick = (e) => {
    setLogForm(savedLogList[savedLogList.length - e.target.id]);
  }

  useEffect(() => {
    if (props.postSalesLogResponse !== null) {
      props.clearPostSalesLogResponse();
      props.history.push('/main/manage');
    }
  }, [props.postSalesLogResponse]);

  const onSelected = (id) => {
    if (id === "SALESLOG") {
      setToggle(false);
    } else if (id === "SALESLOG_PROJECT") {
      setToggle(true);
    }
  }

  return (
    <React.Fragment>
      <Helmet>
        <title>
          세일즈로그 - 고객사
        </title>
      </Helmet>
      <div className="container">
        <div className="row">
          <div className="col-9">
            <div className="page-title-box">
              <h4 className="page-title">고객사</h4>
            </div>
          </div>
          <div className="col-3">
            <div className="page-title-right mt-3">
              {/* <button className="page-title mt-3 mr-1 btn btn-outline-primary rounded-pill" style={{width:'115px'}}>일괄추가</button>
                <button className="page-title mt-3 btn btn-secondary rounded-pill" style={{width: '115px'}}>다운로드</button> */}
              <AccountModal buttonLabel='일괄 추가' SearchChange={handleOnChange} />
            </div>
          </div>
        </div>
        <div className="row">
          <div className="col-6">
            <AccountCard title="고객사">
              <div className="d-flex">
                <h5 className="ml-4">등급</h5>
                <h5 className="ml-4">이름</h5>
                <h5 className="ml-5">담당자</h5>
              </div>
            </AccountCard>
          </div>
          <div className="col-6">
            <AccountCard title="자사">
              <div className="d-flex">
                <h5 className="ml-4">현재 담당 영업사원</h5>
                <h5 className="ml-4">인수받을 영업사원</h5>
              </div>
            </AccountCard>
          </div>
        </div>
        <div className="row">
          <div className="col-12">
            <div className="float-right d-flex">
              {/* <button className="page-title mt-3 mr-1 btn btn-outline-primary rounded-pill" style={{ width: '115px' }}>취소</button>
              <button className="page-title mt-3 btn btn-primary rounded-pill" style={{ width: '115px' }}>인수인계 하기</button> */}
              <AccountTakeModal buttonLabel='취소' SearchChange={handleOnChange} />
              <AccountTakeModal buttonLabel='인수인계 하기' SearchChange={handleOnChange} />

            </div>
          </div>
        </div>
      </div>
    </React.Fragment>
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
  putSalesLog: putSalesLog.call,
  getUserAccounts: getUserAccounts.call,
  clearPostSalesLogResponse: clearPostSalesLogResponse,
  putSalesLogCoUser: putSalesLogCoUser.call
}

export default connect(mapStateToProps, mapStateToDispatch)(UploadSalesLog);