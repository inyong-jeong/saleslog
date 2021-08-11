import React, { useState, useEffect } from "react";
import { connect } from "react-redux";
import { Helmet } from "react-helmet";
import { getDashBoardStat, getNotableSalesLogs } from 'redux/actions';
import BarChart from 'components/BarChart';
import ListCard from 'components/ListCard';
import NotableListCard from 'components/NotableListCard';
import ButtonTab from 'components/ButtonTab';
import { convertTimeToFormat } from 'helpers/timeUtils';

const metricsList = [{
  id: 'log_count',
  title: '영업일지',
  icon: 'fe-book'
}, {
  id: 'account_visit',
  title: '고객사 방문수',
  icon: 'fe-trending-up'
}, {
  id: 'comment_count',
  title: '피드백 수',
  icon: 'fe-message-square'
}, {
  id: 'needs_count',
  title: '니즈 수',
  icon: 'fe-flag'
}];

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

function DashBoard(props) {

  const [needsData, setNeedsData] = useState(undefined);
  const [adate, setadate] = useState(0);
  const [pdate, setpdate] = useState(0);
  const [date, setDate] = useState(undefined)

  const getMonthlyStat = () => {
    const month = new Date() - (24 * 60 * 60 * 1000 * 31);
    const bdate = new Date() - (24 * 60 * 60 * 1000 * 31);
    const nowdate = new Date();
    const beforedate = convertTimeToFormat(bdate);
    const presentdate = convertTimeToFormat(nowdate);
    setadate(beforedate);
    setpdate(presentdate);
    setDate(2)
    props.getDashBoardStat(month, new Date().getTime());
  }
  const getWeeklyStat = () => {
    const week = new Date() - (7 * 24 * 60 * 60 * 1000);
    const bdate = new Date() - (7 * 24 * 60 * 60 * 1000);
    const nowdate = new Date();
    const beforedate = convertTimeToFormat(bdate);
    const presentdate = convertTimeToFormat(nowdate);
    setadate(beforedate);
    setpdate(presentdate);
    setDate(1)
    props.getDashBoardStat(week, new Date().getTime());
  }

  const getDailyStat = () => {
    const day = new Date() - (24 * 60 * 60 * 1000);
    const bdate = new Date() - (24 * 60 * 60 * 1000);
    const nowdate = new Date();
    const beforedate = convertTimeToFormat(bdate);
    const presentdate = convertTimeToFormat(nowdate);
    setadate(beforedate);
    setpdate(presentdate);
    setDate(0)
    props.getDashBoardStat(day, new Date().getTime());
  }

  const getThreeMonthlyStat = () => {
    const month = new Date() - (24 * 60 * 60 * 1000 * 31 * 3);
    const bdate = new Date() - (24 * 60 * 60 * 1000 * 31) * 3;
    const nowdate = new Date();
    const beforedate = convertTimeToFormat(bdate);
    const presentdate = convertTimeToFormat(nowdate);
    setadate(beforedate);
    setpdate(presentdate);
    setDate(3)
    props.getDashBoardStat(month, new Date().getTime());
  }

  const getSixMonthlyStat = () => {
    const month = new Date() - (24 * 60 * 60 * 1000 * 31 * 6);
    const bdate = new Date() - (24 * 60 * 60 * 1000 * 31 * 6);
    const nowdate = new Date();
    const beforedate = convertTimeToFormat(bdate);
    const presentdate = convertTimeToFormat(nowdate);
    setadate(beforedate);
    setpdate(presentdate);
    setDate(4)
    props.getDashBoardStat(month, new Date().getTime());
  }

  useEffect(() => {
    const { strategy_count, operation_count, product_count, personal_count } = props.dashBoardStat;
    setNeedsData([strategy_count, operation_count, product_count, personal_count]);
  }, [props.dashBoardStat]);

  useEffect(() => {
    // getMonthlyStat();
    // props.getNotableSalesLogs(0);
  }, []);

  const onSelected = (id) => {
    if (id === "DAILY") {
      // getDailyStat();
    } else if (id === "WEEKLY") {
      // getWeeklyStat();
    } else if (id === "MONTHLY") {
      // getMonthlyStat();
    } else if (id === "THEREEMONTHLY") {
      // getThreeMonthlyStat();
    } else if (id === "SIXMONTHLY") {
      // getSixMonthlyStat();
    }
  }
  return (
    <React.Fragment>
      <Helmet>
        세일즈로그 - 메인페이지
      </Helmet>
      <div className="container-fluid">

        <div className="row">
          <div className="col-12">
            <div className="page-title-box">
              <div className="float-right" style={{ marginTop: '22px' }}>
                <ButtonTab tab={tabs} onSelected={onSelected} defaultSelected="MONTHLY" />
              </div>
            </div>
            <h4 className="page-title" style={{ lineHeight: '75px' }}>전체요약</h4>
            <h5 className="float-right mb-3">{adate} ~ {pdate}</h5>
          </div>
        </div>
        <div className="row">

          {metricsList.map((v, i) => {
            return (
              <div className="col-lg-3 col-md-6 col-sm-6">
                <div className="card radius">
                  <div className="card-body">
                    <div className="row">
                      <div className="col-4">
                        <div className="avatar-sm bg-primary border-primary">
                          <i className={v.icon + " font-22 avatar-title"}></i>
                        </div>
                      </div>
                      <div className="col-8">
                        <div className="text-right">
                          <p className="text-muted mb-1 text-truncate">{v.title}</p>
                          <h3 className="mt-1 text-dark"><span data-plugin="counterup">{props.dashBoardStat[v.id]}</span>개</h3>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            );
          })}

        </div>

        <div className="row">
          <div className="col-lg-6 col-md-12">
            <BarChart data={needsData} date={date} />
          </div>
          <div className="col-lg-3 col-md-6">
            <NotableListCard
              title="중요표시 영업일지"
              contents={''} />
          </div>
          <div className="col-lg-3 col-md-6">
            <ListCard
              title="공지사항" />
          </div>
        </div>

      </div>
    </React.Fragment>
  );
}
//contents={props.notableSalesLogList}
const mapStateToProps = (state) => {
  const { user } = state.User;
  const { dashBoardStat } = state.Stat;
  const { notableSalesLogList } = state.SalesLog;
  return { user, dashBoardStat, notableSalesLogList };
}

const dispatchToProps = {
  getDashBoardStat: getDashBoardStat.call,
  getNotableSalesLogs: getNotableSalesLogs.call,
};

export default connect(mapStateToProps, dispatchToProps)(DashBoard);
