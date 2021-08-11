import React, { useState, useEffect } from 'react';
import { Dropdown, DropdownToggle, DropdownMenu, DropdownItem } from 'reactstrap';
import { connect } from 'react-redux';
import BoardDatePicker from 'components/BoardDatePicker';
import AccountsList from 'components/AccountsList';
import ConditionsList from 'components/ConditionsList';
import { setAccounts, setUsers, onDeletedUser, setFilterFromDate, setFilterToDate, setFilterPage, setFilterOrder } from 'redux/actions';
import {Link} from "react-router-dom";
import { fromDateInit } from 'helpers/timeUtils';
import Card from 'components/Card';
import inputField from 'components/InputField';




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

function FilterForm(props) {
  const [accountsList, setAccounts] = useState([]);
  const [selectedAccList, setSelectedAccList] = useState([]);
  const [conditionList, setConditions] = useState([]);
  const [sortOpen, setSortOpen] = useState(false);
  // const [orderdata, setOrderData] = useState();
  useEffect(() => {
    props.accounts.sort(compare);
    setAccounts(props.accounts);
  }, [props.accounts]);

  useEffect(() => {
    setConditions([].concat(selectedAccList).concat(props.users));
  }, [props.users]);

  const [form, setForm] = useState({
    fromDate: fromDateInit(),
    toDate: new Date(),
    order:1
  });

  const onAccountClick = (accountId, name, index) => {
    setConditions([...conditionList].concat({
      id: accountId,
      type: 'account',
      label: name
    }));
    accountsList.splice(index,1);
    setAccounts([...accountsList]);
    let nac = selectedAccList.concat({
      id: accountId,
      type: 'account',
      label: name
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

      let nac = selectedAccList.splice(selectedAccList.findIndex(() => condition.id), 0);
      setSelectedAccList(nac);
      props.setAccounts(nac.map((v) => v.id));

      accountsList.sort(compare);
      setAccounts(accountsList);
    } else if (condition.type === 'user') {
      props.onDeletedUser(condition);
    }
    conditionList.splice(index, 1);
    setConditions([...conditionList]);
  }

  const onFromDateChnage = (nextDate) => {
    if (!nextDate)
      return;
    setForm({
      ...form,
      fromDate: nextDate[0]
    });
  } 

  const onToDateChange = (nextDate) => {
    if (!nextDate)
      return;
    setForm({
      ...form,
      toDate: nextDate[0]
    });
  }

  const OrderDataChange = (nextData) => {
    if (!nextData)
      return;
    setForm({
      ...form,
      order: nextData
    });
    const order = nextData
    props.setFilterOrder(order);
  }

  const handleOnSearch = () => {
    props.setFilterFromDate(form.fromDate.getTime());
    props.setFilterToDate(form.toDate.getTime());
  }

  return (
    <React.Fragment>
      <div className="row mt-2 mb-3">
        <h5 className="col-lg-1 col-md-2 col-sm-2">공지구분</h5>
        <div className="col-6">
            <div className="card" style={{display:'inline'}}>
              <div className="form-check form-check-inline">
                <input className="form-check-input" type="radio" name="inlineRadioOptions" id="inlineRadio1" value="option1"/>
                <label className="form-check-label" for="inlineRadio1">전체 공지</label>
              </div>
              <div className="form-check form-check-inline">
                <input className="form-check-input" type="radio" name="inlineRadioOptions" id="inlineRadio2" value="option2"/>
                <label className="form-check-label" for="inlineRadio2">팀 공지</label>
              </div>
            </div>
        </div>
      </div>
      {/* <div className="row mb-2">
        <h5 className="col-lg-1 col-md-2 col-sm-2">제목</h5>
        <div className="col-6">
          <div className="card" style={{backgroundColor: '#WHITE'}}>
              <input
                    type="text"
                    // onChange=
                    // value=
                    type ="text" 
                    name="title"
                    placeholder="제목을 입력하세요"
                    className="form-control"/>
          </div>
        </div>
      </div> */}
      {/* <div className="row mb-2">
        <h5 className="col-lg-1 col-md-2 col-sm-2">기간</h5>
        <div className="col-lg-2 col-md-2 col-sm-4 ml-2">
          <BoardDatePicker title="" date={form.fromDate} onDateChange={onFromDateChnage} />
        </div>
        <span>~~~</span>
        <div className="col-lg-2 col-md-2 col-sm-4">
          <BoardDatePicker title="" date={form.toDate} onDateChange={onToDateChange} />
        </div>
        <div > 
        <button className="btn btn-outline-secondary btn-xs ml-3 mr-2 " style={{padding:'4px 22px'}}>1주</button>
        <button className="btn btn-outline-secondary btn-xs mr-2 " style={{padding:'4px 22px'}} >1개월</button>
        <button className="btn btn-outline-secondary btn-xs mr-2" style={{padding:'4px 22p x'}} >3개월</button>
        <button className="btn btn-outline-secondary btn-xs mr-2 " style={{padding:'4px 22px'}} >6개월</button>
        <button className="btn btn-outline-secondary btn-xs mr-2 " style={{padding:'4px 22px'}} >1년</button>
        <button className="btn btn-outline-secondary btn-xs mr-2" style={{padding:'4px 22px'}} >전체</button>
        </div>
      </div> */}
      <div className="row">
        <div className="col-9 d-flex justify-content">
          <Dropdown isOpen={sortOpen} toggle={() => setSortOpen(!sortOpen)}>
            {/* <DropdownToggle tag="a" className="font-14 text-primary m-1" style={{cursor: 'pointer'}}><i className="fe-bar-chart mr-2"></i>정렬순서</DropdownToggle> */}
            <DropdownMenu>
              <DropdownItem onClick={() => OrderDataChange(1)}>최신순</DropdownItem>
              <DropdownItem onClick={() => OrderDataChange(2)}>과거순</DropdownItem>
              <DropdownItem onClick={() => OrderDataChange(3)}>조회수 순</DropdownItem>
              <DropdownItem onClick={() => OrderDataChange(4)}>제목순</DropdownItem>
            </DropdownMenu>
          </Dropdown>
        </div>
        <div className="col-lg-3 col-md-3 col-sm-3">
                <div className="d-flex justify-content-end align-items-center">
                  <Link to="/main/board/register">
                      <button type="button" className="btn btn-primary mb-1 mt-1">작성 (admin)</button>
                      </Link>
                      <button type="button" className="btn btn-primary mb-1 mt-1 ml-2" onClick={handleOnSearch}>
                        <i className="fe-search mr-1 col-lg-3 col-md-3 col-sm-3"></i>
                        검색
                      </button>
                  
                </div>
              </div>
      </div>
     
    </React.Fragment>
  );
}

const mapStateToProps = (state) => {
  const { accounts } = state.Account;
  const { fromDate, toDate, page, order } = state.BoardFilter;

  return { accounts, fromDate, toDate, page, order };
}

export default connect(mapStateToProps, { setAccounts, setUsers, onDeletedUser, setFilterFromDate, setFilterToDate, setFilterPage, setFilterOrder })(FilterForm);
