import React from 'react';

function ReportCard(props) {
  return (
    <React.Fragment>
      <div className={"card " + props.className} style={props.style}>
        <div className="card-body">
          <div className="float-right">
            {props.icon && props.icon()}
          </div>
          <h4 className="header-title mb-3">
            {props.title}
          </h4>
          <h5 className="float-right">다운로드</h5>
          {props.children}
        </div>
      </div>
    </React.Fragment>
  );
  ;
}

export default ReportCard;