import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

export default function Error(props) {
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
            <h5>유효하지 않은 활성화 링크입니다.</h5>
            <button className="btn btn-primary mt-2"><Link to="/signin">돌아가기</Link></button>
            </div>
          </div>
        </div>
      </div>
    </React.Fragment>
  );
}