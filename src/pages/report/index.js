import React, { useState, useEffect, useRef } from 'react';
import { connect } from 'react-redux';
import ApexChart from 'components/ReportLineChart';
import ApexAccountChart from 'components/ReportAccountLineChart';
import ApexFeedbackChart from 'components/ReportFeedbackLineChart';
import ApexTeamChart from 'components/ReportTeamLineChart';
import BarChart from 'components/ReportBarChart';
import DatePickerModal from 'components/DatePickerModal';
import ReportCard from 'components/ReportCard';
import { getStatType1, getStatType2, getStatType3, getStatType4, getStatType5, getSalesLogSheet } from 'redux/actions';

function Report(props) {
  const [date, setdate] = useState("");
  const [datePickerModal, setDatePickerModal] = useState(false);
  const [sheetLoading, setSheetLoading] = useState(false);
  const elementRef = useRef();


  const pickerToggle = () => setDatePickerModal(!datePickerModal);
  const updateData = (timeline) => {
    setdate(timeline);
  }

  const getSheets = (year, month) => {
    setSheetLoading(true);
    props.getSalesLogSheet(year, month);
  }

  const handleOnClick = (e) => {
    window.print();
  }

  let toDate = new Date().getTime();
  let fromDate = new Date() - (16 * 24 * 60 * 60 * 1000 * 31);

  // useEffect(() => {
  //   props.getStatType1(1, fromDate, toDate)
  //   props.getStatType2(2, fromDate, toDate)
  //   props.getStatType3(3, fromDate, toDate)
  //   props.getStatType4(4, fromDate, toDate)
  //   props.getStatType5(5, fromDate, toDate)
  // }, [date])

  useEffect(() => {
    if (props.sheet) {
      var url = window.URL.createObjectURL(props.sheet);
      var a = document.createElement('a');
      a.href = url;
      a.download = "실적통계.xlsx";
      document.body.appendChild(a);
      a.click();
      a.remove();
      setDatePickerModal(false);
      setSheetLoading(false);
    }
  }, [props.sheet]);

  // useEffect(() => {
  //   const divElement = elementRef.current;
  // }, []);
  switch (date) {
    case 'one_month':
      fromDate = new Date() - (2 * 24 * 60 * 60 * 1000 * 31);
      break
    case 'three_month':
      fromDate = new Date() - (4 * 24 * 60 * 60 * 1000 * 31);
      break
    case 'six_months':
      fromDate = new Date() - (7 * 24 * 60 * 60 * 1000 * 31);
      break
    case 'one_year':
      fromDate = new Date() - (13 * 24 * 60 * 60 * 1000 * 31);
      break
    case 'all':
      fromDate = new Date() - (16 * 24 * 60 * 60 * 1000 * 31);
      break
    default:
  }

  return (
    <React.Fragment>
      <div class="container-fluid">
        <div className="row">
          <div className="col-12">
            <div className="page-title-box">
              <div className="float-right" style={{ marginTop: '22px' }}>
                {/* <button className="btn btn-primary"><i className="fe-clipboard"></i> 리포트 생성</button> */}
              </div>
              <h4 className="page-title">리포트</h4>
            </div>
          </div>
        </div>
        <div className="row">
          <div className="col-12">
            <div className="btn-group mb-2">
            </div>
          </div>
        </div>
        <div class="toolbar">
          <button id="one_month"
            onClick={() => updateData('one_month')} className="btn btn-outline-secondary btn-xs mb-3">
            1개월
          </button>
          &nbsp;
          <button id="three_month"
            onClick={() => updateData('three_month')} className="btn btn-outline-secondary btn-xs mb-3">
            3개월
          </button>
          &nbsp;
          <button id="six_months"
            onClick={() => updateData('six_months')} className="btn btn-outline-secondary btn-xs mb-3">
            6개월
          </button>
          &nbsp;
          <button id="one_year"
            onClick={() => updateData('one_year')} className="btn btn-outline-secondary btn-xs mb-3">
            1년
          </button>
          &nbsp;
          <button id="all"
            onClick={() => updateData('all')} className="btn btn-outline-secondary btn-xs mb-3">
            전체기간
          </button>
        </div>
        <button className="btn btn-primary float-right" onClick={handleOnClick}>전체출력</button>
        <button id="all"
          onClick={() => setDatePickerModal(true)} className="btn btn-primary btn-xs mb-3" disabled={sheetLoading}>
          실적 통계
          <i className="fe-arrow-down"></i>
        </button>
        <DatePickerModal onConfirmClick={getSheets} modal={datePickerModal} toggle={pickerToggle} />
        <div className="row">
          {/* <div className="col-6" ref={elementRef}>
            <ReportCard title="영업사원별 실적">
              <h5 className="">건/월별(평균)</h5>
              <ApexChart />
            </ReportCard>
          </div>
          <div className="col-6">
            <ReportCard title="인당실적 분포">
              <h5 className="">인당 실적/건</h5>
              <BarChart />
            </ReportCard>
          </div> */}
        </div>
        <div className="row">
          {/* <div className="col-6">
            <ReportCard title="피드백 실적">
              <h5 className="">피드백 수/실적</h5>
              <ApexFeedbackChart />
            </ReportCard>
          </div>
          <div className="col-6">
            <ReportCard title="팀별 실적">
              <h5> 팀/실적 수</h5>
              <ApexTeamChart />
            </ReportCard>
          </div>
          <div className="col-12">
            <ReportCard title="거래처별 분포" style={{ padding: '10px' }}>
              <h5 className="">고객사/실적</h5>
              <ApexAccountChart />
            </ReportCard>
          </div> */}
        </div>
      </div>
    </React.Fragment>
  );
}

const mapStateToProps = (state) => {
  const { salesLogReport1,
    salesLogReport2,
    salesLogReport3,
    salesLogReport4,
    salesLogReport5 } = state.SalesLog;
  const { sheet } = state.Stat;
  return { salesLogReport1, salesLogReport2, salesLogReport3, salesLogReport4, salesLogReport5, sheet };
}

const dispatchToProps = {
  getStatType1: getStatType1.call,
  getStatType2: getStatType2.call,
  getStatType3: getStatType3.call,
  getStatType4: getStatType4.call,
  getStatType5: getStatType5.call,
  getSalesLogSheet: getSalesLogSheet.call
}

export default connect(mapStateToProps, dispatchToProps)(Report);