import React from 'react';
import { useHistory } from 'react-router';

function LearningLogSection() {
  const history = useHistory()

  const handleOnClick = () => {
    history.push('/signup')
  }
  return (
    <div id="learninglog" className="bg-primary grey-textured wide-60 statistic-section division">
      <div className="container white-color">
        <div className="row">
          <div className="col-lg-10 offset-lg-1 section-title">
            <h3 className="h3-lg text-white">영업활동 관리부터 영업실무 역량 향상 학습까지</h3>
            <p className="p-md text-white">회원가입만 하면, 양질의 영업솔루션 자료를 공유드립니다.
            </p>
            <button className="btn btn-outline-white mt-2" onClick={handleOnClick}>가입하기</button>
          </div>
        </div>
        <div className="row">
          <div className="col-md-10 col-lg-8 offset-md-1 offset-lg-2">
            <div className="row">
              <div className="col-sm text-center">
                <div className="statistic-block wow fadeInUp" data-wow-delay="0.4s">
                  <p className="text-white">1. 통합 회원가입</p>
                </div>
              </div>
              <div className="col-sm text-center">
                <div className="statistic-block wow fadeInUp" data-wow-delay="0.4s">
                  <p className="text-white">{'>'}</p>
                </div>
              </div>
              <div className="col-sm text-center">
                <div className="statistic-block wow fadeInUp" data-wow-delay="0.6s">
                  <p className="text-white">2. 영업진단 받기</p>
                </div>
              </div>
              <div className="col-sm text-center">
                <div className="statistic-block wow fadeInUp" data-wow-delay="0.4s">
                  <p className="text-white">{'>'}</p>
                </div>
              </div>
              <div className="col-sm text-center">
                <div className="statistic-block wow fadeInUp" data-wow-delay="0.8s">
                  <p className="text-white">3. 학습 진행</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default LearningLogSection;