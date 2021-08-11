import React from 'react';
import Card from 'components/Card';

function Settings(props) {
  return (
    <React.Fragment>
      <div className="container">
        <div className="row">
          <div className="col-12">
            <h4 className="page-title" style={{lineHeight: '75px'}}>설정</h4>            
          </div>
        </div>
        <div className="row">
          <div className="col-12">
            <Card title="일반">

            </Card>
          </div>
        </div>
      </div>
    </React.Fragment>
  );
}

export default Settings;