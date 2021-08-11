import React, { useState } from 'react';
import { withRouter } from 'react-router-dom';
import { Switch, Route } from 'react-router-dom';
import BootstrapTable from 'react-bootstrap-table-next';
import ItemTree from 'components/ItemTree';
import Card from 'components/Card';
import { Dropdown, DropdownToggle, DropdownMenu, DropdownItem } from 'reactstrap';

import UserAddForm from 'components/organization/UserAddForm';

const columns = [{
  dataField: 'user_name',
  text: '이름',
  headerStyle: {
    color: '#525454',
    fontSize: '14px',
    width: '15%'
  }
}, {
  dataField: 'email',
  text: '이메일',
  headerStyle: {
    color: '#525454',   
    fontSize: '14px',
    width: '15%'
  }
}, {
  dataField: 'dept_name',
  text: '부서',
  headerStyle: {
    color: '#525454',
    fontSize: '14px' 
  }
}, {
  dataField: 'title',
  text: '직위',
  headerStyle: {
    color: '#525454',
    fontSize: '14px'   
  }
}, {
  dataField: 'none',
  text: '작업',
  headerStyle: {
    color: '#525454',
    fontSize: '14px'
  }
}];

function UserTable(props) {
  const [inviteOpen, setInviteOpen] = useState(false);
  const userList = props.userList || [];

  function renderActionButton(cell, row) {
    const onUserEditClcik = () => {
      props.history.push(`${props.match.url}/${row.user_id}/edit`);
    }

    const onUserDeleteClick = () => {
    }

    return (
      <React.Fragment>
        <button className="btn btn-xs font-17 text-secondary" onClick={onUserEditClcik}><i className="fe-edit"></i></button>
        <button className="btn btn-xs font-17 text-secondary" onClick={onUserDeleteClick}><i className="fe-trash"></i></button>
      </React.Fragment>
    );
  }

  columns[4].formatter = renderActionButton;

  return (
    <React.Fragment>
      <div className="row justify-content-end mb-2">
          <div className="col d-flex justify-content-end">
            <Dropdown isOpen={inviteOpen} toggle={() => setInviteOpen(!inviteOpen)}>
              <DropdownToggle tag="button" className="btn btn-primary">조직원 추가 <i className="fe-user-plus"></i></DropdownToggle>
              <DropdownMenu right>
                <DropdownItem>이메일초대</DropdownItem>
                <div className="dropdown-item">
                  <input className="form-control" type="text" style={{width: '184px'}}/><button className="btn btn-primary mt-2">초대</button>
                </div>
              </DropdownMenu>
            </Dropdown>
          </div>
      </div>

      {/* organization_member managing */}
      <div className="row">
        <div className="col-3">
          <Card title="조직도" style={{backgroundColor: '#EDEDED'}}>
            <ItemTree items={props.userTree}/>
          </Card>
        </div>
        <div className="col-9">
          <Card>
            <Switch>
              <Route path={`/main/organization/:org_id/member`} render={() => <BootstrapTable keyField='user_id' classes="table-centered" bordered={false} columns={columns} data={userList}/>} exact />
              <Route path={`/main/organization/:org_id/member/:user_id/edit`} render={() => <UserAddForm />} exact />
            </Switch>
          </Card>
        </div>
      </div>
    </React.Fragment>
  );
}

export default withRouter(UserTable);
