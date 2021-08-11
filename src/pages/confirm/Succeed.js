import React, { useState, useEffect} from 'react';
import { Link } from 'react-router-dom';

export default function Succeed(props) {
  const [viewHeight, setViewHeight] = useState(window.innerHeight);
  
  useEffect(() => {
      window.addEventListener('resize', updateWindowDimensions);

      return () => {
          window.removeEventListener('resize', updateWindowDimensions);
      };
  }, []);

  const updateWindowDimensions = () => {
      setViewHeight(window.innerHeight);
  }

  return (
    <React.Fragment>
      <div className="container" style={{height: viewHeight}}>
        <div className="row" style={{height: viewHeight}}>
          <div className="col-12 d-flex justify-content-center">
            <div className="text-center" style={{position: 'absolute', top: '50%'}}>
            <h5>계정 인증이 확인되었습니다.</h5>
            <button className="btn btn-primary mt-2"><Link to="/signin">돌아가기</Link></button>          
            </div>
          </div>
        </div>
      </div>    
    </React.Fragment>
  );
}