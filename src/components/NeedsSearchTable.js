import React from 'react';
import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import { Spinner } from 'reactstrap';
// import ThumbnailGroup from 'components/ThumbnailGroup';
import { convertTimeToFormat } from 'helpers/timeUtils';

function NeedsSearchTable(props) {

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
                <th>날짜</th>
                <th>제목</th>
                {/* <th>작성자</th> */}
                <th>고객사</th>
                {/* <th>공동</th> */}
              </tr>
            </thead>
            <tbody>
              {(props.searchsalesLogList ? props.searchsalesLogList.length : 1) === 0 && <div className="w-100 text-center position-absolute mt-3">선택된 조건에 일지가 없습니다.</div>}
              {props.getSalesLogNeedsResponse && props.getSalesLogNeedsResponse.map((v, i) => {
                return (
                  <tr key={v.log_id} id={v.log_id} style={{ cursor: 'pointer' }} onClick={() => onSalesLogClick(v.log_id)}>
                    <td>{convertTimeToFormat(v.creation_date)}</td>
                    <td>{v.sentence}({v.comment_count})</td>
                    {/* <td>{v.user_name}</td> */}
                    <td>{v.account_name}</td>
                    {/* <td><ThumbnailGroup thumbnails={[{user_name: v.user_name, user_id: v.user_id}]}/></td> */}
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
  const { searchsalesLogList, getSalesLogNeedsResponse } = state.SalesLog;
  return { searchsalesLogList, getSalesLogNeedsResponse };
}

export default withRouter(connect(mapStateToProps, {})(NeedsSearchTable));