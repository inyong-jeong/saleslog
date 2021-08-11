import React from 'react';
import SearchTable from 'components/manage/SearchTable';

function Search(props) {

  return (
    <React.Fragment>
      <div className="container-fluid">
        <div className="row">
          <div className="col-2"></div>
          <div className="col-lg-8 col-sm-4 mt-5">
            <SearchTable />
          </div>
          <div className="col-2"></div>
        </div>
      </div>
    </React.Fragment>
  );
}

export default Search;