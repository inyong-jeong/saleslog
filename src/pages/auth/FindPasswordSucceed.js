import React, { useState, useEffect } from 'react';
import { Link } from "react-router-dom";

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
  const styles = {
    color: 'black',
    border: '1px solid black'
  }
  return (
    <React.Fragment>
      <div className="container" style={{ height: viewHeight }}>
        <div className="row" style={{ height: viewHeight }}>
          <div className="col-12 d-flex justify-content-center">
            <div className="text-center" style={{ position: 'absolute', top: '50%' }}>
              <h5>비밀번호 변경 안내메일을 입력하신 메일로 전송하였습니다</h5>
              <Link to='/signin' style={styles}>돌아가기</Link>
            </div>
          </div>
        </div>
      </div>
    </React.Fragment>
  );
}