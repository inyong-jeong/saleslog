import React from 'react';
import { searchSalesLog } from 'redux/actions';
import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import { Spinner } from 'reactstrap';

import ThumbnailGroup from 'components/ThumbnailGroup';

import { convertTimeToFormat } from 'helpers/timeUtils';

function SalesLogTable(props) {

  const onSalesLogClick = (logId) => {
    props.history.push(`/main/manage/saleslog/${logId}`);
  }


  return (
    <React.Fragment>
      <div className="row">
        <div className="col-12">
          <table className="table sl-table">
            <thead>
              <tr>
                <th style={{ textAlign: 'start' }}>날짜</th>
                <th style={{ textAlign: 'start' }}>제목</th>
                <th style={{ textAlign: 'start' }}>작성자</th>
                <th style={{ textAlign: 'start' }}>고객사</th>
                <th style={{ textAlign: 'start' }}>공동작성자</th>
              </tr>
            </thead>
            <tbody>
              {(props.salesLogList ? props.salesLogList.length : 1) === 0 && <div className="w-100 text-center position-absolute mt-2">선택된 조건에 일지가 없습니다.(새로고침 해주세요)</div>}
              {props.salesLogList && props.salesLogList.map((v, i) => {
                return (
                  <tr key={v.log_id + '_log'} id={v.log_id} style={{ cursor: 'pointer' }} onClick={() => onSalesLogClick(v.log_id)}>
                    <td>{convertTimeToFormat(v.meeting_date)}</td>
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
  const { salesLogList, salesLogListError } = state.SalesLog;
  return { salesLogList, salesLogListError };
}

export default withRouter(connect(mapStateToProps, { searchSalesLog })(SalesLogTable));