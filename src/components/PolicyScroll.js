import React from 'react';
import PolicyCheckButton from './PolicyCheckButton';

function PolicyScroll(props) {
  return (
    <React.Fragment>
      <h4 className="mt-2 mb-2">{props.title}</h4>
        <div className="card policy-card">
          <article>
          {props.content}
          </article>
        </div>
          <PolicyCheckButton id={props.id} onChange={props.onChange} checked={props.checked} required={props.required}/>
      </React.Fragment>
  );
}

export default PolicyScroll;