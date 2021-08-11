import React from 'react';

const benefits =[{
  labels: ["가장 쉽고 빠른 영업일지 작성", "음성으로 녹음만 하면 영업일지가 텍스트로 전환되어 입력됩니다. 일지 안의 모든 내용을 손쉽게 검색할 수 있습니다."],
  image: "benefit-1.png"
}, {
  labels: ["언제 어디서나 접근할 수 있는 데이터", "PC/모바일 버전을 연동하여 언제 어디서나 영업일지를 입력하고 확인할 수 있어 현장에서 쉽고  편하게 입력할 수 있습니다."],
  image: "benefit-2.png"
}, {
  labels: ["직원의 퇴사에도 고객정보 유지", "영업사원/팀장의 퇴사에도 고객(사)정보가 공백없이 유지되며, 고객사 히스토리를 관리할 수 있습니다."],
  image: "benefit-3.png"
}, {
  labels: ["영업일지 작성부터 피드백까지", "영업팀장/관리자는 제공되는 코칭 가이드를 참고하여 영업사원의 영업일지에 피드백할 수 있어, 고객가치 중심으로 영업활동이 이루어질 수 있습니다."],
  image: "benefit-4.png"
}];

function BenefitSection(props) {
  return (
    <React.Fragment>
      {benefits.map((p, i) => 
      <section key={`benefit_${i}`} id={"benefit" + i} className="wide-60 content-section division">
        <div className="container">
          <div className={"row align-items-center "+ (i % 2 === 0 ? "flex-row-reverse" : "")}>
            <div className="col-md-6">
              <div className="img-block wow fadeInUp animated" data-wow-delay="0.6s">
                <img className="img-fluid" src={`images/common/${p.image}`} alt="benefit img"/>
              </div>
            </div>
            <div className="col-md-6">
              <div className="txt-block pc-30 wow fadeInUp" data-wow-delay="0.4s">
                <h3 className="h3-md steelblue-color">{p.labels[0]}</h3>
                  <div  className="box-list mt-4">
                    <div className="box-list-icon"><i className="fas fa-genderless"></i></div>
                    <p>{p.labels[1]}</p>
                  </div>
              </div>
            </div> 
          </div>  
        </div>   
      </section>)}
    </React.Fragment>
  );

}

export default BenefitSection;