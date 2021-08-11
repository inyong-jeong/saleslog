import React from 'react';

const contents = [{
  title: "STT",
  icon: "images/icon/icon-stt.png",
  content: "영업현장에서 영업일지를 말로 하면 자동으로 텍스트로 전환합니다."
}, {
  title: "머신러닝",
  icon: "images/icon/icon-ml.png",
  content: "AI를 통해 영업일지를 정교하게 자동 분석하여 고객사 니즈를 파악할 수 있습니다."
}, {
  title: "피드백",
  icon: "images/icon/icon-feedback.png",
  content: "영업관리자/팀장은 영업사원의 영업일지마다 개별 코칭 및 피드백을 할 수 있습니다."
}, {
  title: "고객 니즈 코칭 가이드",
  icon: "images/icon/icon-guide.png",
  content: "고객의 상위니즈를 발굴하기 위한 핵심 가이드를 제공합니다"
}, {
  title: "알림 서비스",
  icon: "images/icon/icon-noti.png",
  content: "새 영업일지 등록, 피드백 등 새로운 업데이트 내용을 실시간 알림 받을 수 있습니다."  
}, {
  title: "리포팅",
  icon: "images/icon/icon-report.png",
  content: "영업활동 통계 리포트를 파이그래프로 한 눈에 확인할 수 있고,  PDF, 엑셀파일로 다운로드할 수 있습니다."
}];

function FeatureSection(prosp) {
  return (
    <React.Fragment>
      <section id="feature" className="bg-light wide-50 services-section division">
        <div className="container">
          <div className="row"> 
            <div className="col-lg-10 offset-lg-1 section-title"> 
              <h3 className="h3-md">주요 기능</h3>
            </div>    
          </div>          
          <div className="row">
            <div className="col-lg-10 offset-lg-1">
              <div className="row">
                  {contents.map((v) => 
                    <div className="col-sm-6" key={v.title}>
                      <div className="sbox-4 wow fadeInUp" data-wow-delay="0.4s">
                        <img className="img-70" src={v.icon} alt={v.content}/> 
                        <div className="sbox-4-txt">
                          <h5 className="h5-sm">{v.title}</h5>
                          <p>
                          {v.content}
                          </p>
                        </div>  
                      </div>              
                    </div>)}              
                </div>
            </div>    
          </div>      


        </div>        
      </section>  
    </React.Fragment>
  );
}

export default FeatureSection;