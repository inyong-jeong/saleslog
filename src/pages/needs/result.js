import React from 'react';
import NeedsSearchTable from 'components/NeedsSearchTable';

function Needs(props) {

  return (
    <React.Fragment>
      <div className="container-fluid">
        <div className="row">
          <div className="col-2"></div>
          <div className="col-lg-8 col-sm-4 mt-5">
            <NeedsSearchTable />
          </div>
          <div className="col-2"></div>
        </div>
      </div>
    </React.Fragment>
  );
}

export default Needs;