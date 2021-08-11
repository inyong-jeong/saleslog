import React from 'react';
import Card from 'components/Card';
import { Link } from 'react-router-dom';

function InfoTable(props) {
  return (
    <React.Fragment>
      {/* organization information managing */}
      <div className="row">
        <div className="col">
          <Card title="조직 정보 관리">
            {props.organizationForm.map((v, i) => {
              return (
                <div key={v.id} className="row mb-2">
                  <label className="col-3 text-dark">{v.label}</label>
                  <div className="col-9">
                    <p>{props.organization[v.id]}</p>
                    {v.btn && <button className="btn btn-xs btn-secondary"><Link to={`/main/profile/${props.user.user_id}/password`} className="text-white">비밀번호 변경</Link></button>}                       
                  </div>
                </div>                    
              );
            })}
          </Card>
        </div>
      </div>
    </React.Fragment>
  );
}

export default InfoTable;