import React from 'react';

function Card(props) {
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
          {props.children}
        </div>
      </div>
    </React.Fragment>
  );
;}

export default Card;