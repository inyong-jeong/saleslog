import React from 'react';

function AccountsList(props) {
  return (
    <React.Fragment>
      {props.accounts.map((v, i) => 
        <button 
          key={v.account_id + '' + i} 
          onClick={() => props.onAccountClick(v.account_id, v.account_name, i)}
          className="btn btn-white btn-rounded border waves-effect ml-1 mr-1 mb-1 d-inline-block">
          {v.account_name}
        </button>
      )}
    </React.Fragment>
  );
}

export default AccountsList;