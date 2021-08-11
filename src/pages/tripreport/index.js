import React from 'react';
import TripReportTable from 'components/tripreport/TripReportTable';

function TripReport(props) {

  return (
    <React.Fragment>
      <div className="container-fluid">
        <div className="row">
          <div className="col-2"></div>
          <div className="col-lg-8 col-sm-4 mt-5">
            <TripReportTable />
          </div>
          <div className="col-2"></div>
        </div>
      </div>
    </React.Fragment>
  );
}

export default TripReport;