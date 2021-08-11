import React from 'react';
import { withRouter } from 'react-router-dom';

const defaultTheme = {
  'backgroundColor': '#EDEDED'
};

function ListCard(props) {
  const cardList = props.contents;

  const handleOnClick = (logId) =>{
    props.history.push(`/main/manage/saleslog/${logId}`);
  }

  return (
    <React.Fragment>
    <div className="card" style={defaultTheme} >
      <div className="card-body">
        <h4 className="header-title mb-3">
          {props.title}
        </h4>
        {cardList && cardList.map((v, i) => {
          return (
            <div className="row" key={v.log_id + '_log'} id={v.log_id} onClick={() => handleOnClick(v.log_id)}>
              <div className="col">
                <div className="card mb-2 radius" style={{cursor: 'pointer'}}>
                  <div className="card-body p-2">
                    <h5>{v.title}</h5>
                    <p className="mb-1">
                      <span className="text-nowrap mb-2 d-inline-block">
                        <i className="mdi mdi-comment-multiple-outline text-muted"></i>
                        <b>{v.comments_count}</b> 
                      </span>
                    </p>
                  </div>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
    </React.Fragment>
  );
}


export default withRouter(ListCard);