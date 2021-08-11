import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import DatePicker from 'components/DatePicker';
import Select from 'react-select';
import ConditionsList from 'components/ConditionsList';
import { setAccounts, setUsers, onDeletedUser, setFromDate, setToDate, setPage } from 'redux/actions';
import { fromDateInit } from 'helpers/timeUtils';
import ButtonTab from 'components/ButtonTab';
import { convertTimeToFormat } from 'helpers/timeUtils';

const compare = (a, b) => {
  let nameA = a.account_name.toUpperCase();
  let nameB = b.account_name.toUpperCase();
  if (nameA < nameB) {
    return -1;
  }
  if (nameA > nameB) {
    return 1;
  }
  return 0;
}

const selectStyle = {
  indicatorSeparator: () => { },
  control: (defaultStyle) => ({ ...defaultStyle, border: 'none' })
}

function FilterForm(props) {
  const [accountsList, setAccounts] = useState([]);
  const [selectedAccList, setSelectedAccList] = useState([]);
  const [conditionList, setConditions] = useState([]);
  const [adate, setadate] = useState(undefined);
  const [pdate, setpdate] = useState(undefined);

  const tabs = [{
    id: "DAILY",
    label: "일간"
  }, {
    id: "WEEKLY",
    label: "주간"
  }, {
    id: "MONTHLY",
    label: "월간",
  }, {
    id: "THEREEMONTHLY",
    label: "3개월간",
  }, {
    id: "SIXMONTHLY",
    label: "6개월간",
  }];

  useEffect(() => {
    props.accounts.sort(compare);
    setAccounts(props.accounts);
  }, [props.accounts]);
  console.log(props.users);
  useEffect(() => {
    setConditions([].concat(selectedAccList).concat(props.users));
  }, [props.users]);

  const [form, setForm] = useState({
    sort: '',
    fromDate: fromDateInit(),
    toDate: new Date(),
    accounts: [],
  });

  const onAccountChange = (v) => {
    setConditions([...conditionList].concat({
      id: v.value,
      type: 'account',
      label: v.label
    }));
    let nac = selectedAccList.concat({
      id: v.value,
      type: 'account',
      label: v.label
    });
    setSelectedAccList(nac);
    props.setAccounts(nac.map((v) => v.id));
  }
  const onConditionClick = (condition, index) => {
    if (condition.type === 'account') {
      accountsList.push({
        account_id: condition.id,
        account_name: condition.label
      });

      selectedAccList.splice(selectedAccList.findIndex(() => condition.id), 1);
      setSelectedAccList(selectedAccList);
      props.setAccounts(selectedAccList.map((v) => v.id));

    } else if (condition.type === 'user') {
      props.onDeletedUser(condition);
    }
    conditionList.splice(index, 1);
    setConditions([...conditionList]);
  }

  const onFromDateChange = (nextDate) => {
    if (!nextDate)
      return;
    setForm({
      ...form,
      fromDate: nextDate[0]
    });
    const fromDate = nextDate[0].getTime();
    props.setFromDate(fromDate);
  }

  const onToDateChange = (nextDate) => {
    if (!nextDate)
      return;
    setForm({
      ...form,
      toDate: nextDate[0]
    });
    const toDate = nextDate[0].getTime();
    props.setToDate(toDate);
  }

  const onSelected = (id) => {
    if (id === "DAILY") {
      const day = new Date() - (24 * 60 * 60 * 1000);
      setForm({
        ...form,
        fromDate: day
      });
      props.setFromDate(day);
      const nowdate = new Date();
      const beforedate = convertTimeToFormat(day);
      const presentdate = convertTimeToFormat(nowdate);
      setadate(beforedate);
      setpdate(presentdate);
    } else if (id === "WEEKLY") {
      const week = new Date() - (7 * 24 * 60 * 60 * 1000);
      setForm({
        ...form,
        fromDate: week
      });
      props.setFromDate(week);
      const nowdate = new Date();
      const beforedate = convertTimeToFormat(week);
      const presentdate = convertTimeToFormat(nowdate);
      setadate(beforedate);
      setpdate(presentdate);
    } else if (id === "MONTHLY") {
      const month = new Date() - (24 * 60 * 60 * 1000 * 31);
      setForm({
        ...form,
        fromDate: month
      });
      props.setFromDate(month);
      const nowdate = new Date();
      const beforedate = convertTimeToFormat(month);
      const presentdate = convertTimeToFormat(nowdate);
      setadate(beforedate);
      setpdate(presentdate);
    } else if (id === "THEREEMONTHLY") {
      const threemonth = new Date() - (24 * 60 * 60 * 1000 * 31 * 3);
      setForm({
        ...form,
        fromDate: threemonth
      });
      props.setFromDate(threemonth);
      const nowdate = new Date();
      const beforedate = convertTimeToFormat(threemonth);
      const presentdate = convertTimeToFormat(nowdate);
      setadate(beforedate);
      setpdate(presentdate);
    } else if (id === "SIXMONTHLY") {
      const sixmonth = new Date() - (24 * 60 * 60 * 1000 * 31 * 6);
      setForm({
        ...form,
        fromDate: sixmonth
      });
      props.setFromDate(sixmonth);
      const nowdate = new Date();
      const beforedate = convertTimeToFormat(sixmonth);
      const presentdate = convertTimeToFormat(nowdate);
      setadate(beforedate);
      setpdate(presentdate);
    }
  }

  return (
    <React.Fragment>
      <div className="row">
        <div className="col-lg-6">
          <DatePicker title="시작기간" date={form.fromDate} onDateChange={onFromDateChange} />
        </div>
        <div className="col-lg-6">
          <DatePicker title="끝기간" date={form.toDate} onDateChange={onToDateChange} />
        </div>
      </div>
      <div className="row">
        <div className="col-6">
          <ButtonTab tab={tabs} onSelected={onSelected} defaultSelected="DAILY" />
        </div>
        <div className="col-6">
          {(adate && pdate) ? <h4 > 기간 : {adate} ~ {pdate}</h4> : <h4> 전체기간 </h4>}
        </div>
      </div>
      {/* accounts */}
      <div className="row mb-2 mt-2 d-flex align-items-center">
        <label className="col-sm-auto font-14">고객사</label>
        <div className="col-lg-11">
          <div style={{ height: '54px', whiteSpace: 'nowrap', paddingTop: '4px' }}>
            <Select
              placeholder="고객사를 선택하세요"
              options={accountsList.map((v) => ({ label: v.account_name, value: v.account_id }))}
              // value={l}
              onChange={onAccountChange}
              styles={selectStyle} />
          </div>
        </div>
      </div>

      {/* selected */}
      <div className="row mb-2">
        <div className="col-12">
          <div className="card" style={{ backgroundColor: '#EDEDED' }}>
            <div className="card-body">
              <ConditionsList conditions={conditionList} onConditionClick={onConditionClick} />
            </div>
          </div>
        </div>
      </div>

      {/* <div className="row mb-2">
        <div className="col-12 d-flex justify-content-end">
          <Dropdown isOpen={sortOpen} toggle={() => setSortOpen(!sortOpen)}>
            <DropdownToggle tag="a" className="font-14 text-primary m-1" style={{cursor: 'pointer'}}><i className="fe-bar-chart mr-2"></i>정렬순서</DropdownToggle>
            <DropdownMenu>
              <DropdownItem onClick={SortNewest}>최신순</DropdownItem>
              <DropdownItem onClick={SortPast}>과거순</DropdownItem>
            </DropdownMenu>
          </Dropdown>

        </div>
      </div> */}
    </React.Fragment>
  );
}

const mapStateToProps = (state) => {
  const { accounts } = state.Account;
  const { fromDate, toDate, page, users } = state.Filter;
  const selectedAccounts = state.Filter.selectedAccounts;
  const selectedUsers = state.Filter.selectedUsers;
  const salesLog = state.SalesLog;

  return { accounts, selectedAccounts, selectedUsers, fromDate, toDate, page, users, salesLog };
}

export default connect(mapStateToProps, { setAccounts, setUsers, onDeletedUser, setFromDate, setToDate, setPage })(FilterForm);

