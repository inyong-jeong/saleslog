import React, { useEffect } from 'react';
import { searchSalesLog } from 'redux/actions';
import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import { Spinner } from 'reactstrap';
import { getTripsSalesLog } from 'redux/tripreport/actions';
import ThumbnailGroup from 'components/ThumbnailGroup';

import { convertTimeToFormat } from 'helpers/timeUtils';

function TripReportTable(props) {

  useEffect(() => {
    props.getTripsSalesLog(0, new Date().getTime())
  }, [])
  const onSalesLogClick = (report_id) => {
    props.history.push(`/main/tripreport/triplog/${report_id}`);
  }

  return (
    <React.Fragment>
      <div className="row">
        <div className="col-12">
          <table className="table sl-table">
            <thead>
              <tr>
                <th>날짜</th>
                <th>제목</th>
                <th>작성자</th>
                <th>고객사</th>
                <th>공동</th>
              </tr>
            </thead>
            <tbody>
              {(props.getTripsSalesLogList ? props.getTripsSalesLogList.length : 1) === 0 && <div className="w-100 text-center position-absolute mt-3">선택된 조건에 일지가 없습니다.</div>}
              {props.getTripsSalesLogList && props.getTripsSalesLogList.map((v, i) => {
                return (
                  <tr key={v.report_id} id={v.report_id} style={{ cursor: 'pointer' }} onClick={() => onSalesLogClick(v.report_id)}>
                    <td>{convertTimeToFormat(v.trip_date)}</td>
                    <td>{v.title}({v.comment_count})</td>
                    <td>{v.user_name}</td>
                    <td>{v.account_name}</td>
                    <td><ThumbnailGroup thumbnails={[{ user_name: v.user_name, user_id: v.user_id }]} /></td>
                  </tr>
                );
              })}
              {props.loading && <Spinner color="primary" />}
            </tbody>
          </table>
        </div>
      </div>
    </React.Fragment>
  );
}

const mapStateToProps = (state) => {
  const { getTripsSalesLogList } = state.TripReport;
  return { getTripsSalesLogList };
}


const dispatchToProps = {
  getTripsSalesLog: getTripsSalesLog.call,
}

export default withRouter(connect(mapStateToProps, dispatchToProps)(TripReportTable));