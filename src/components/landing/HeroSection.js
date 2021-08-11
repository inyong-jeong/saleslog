import React from 'react';

function HeroSection(props) {
  return (
    <section id="hero" className="bg-scroll hero-section division">
        <div className="container">           
          <div className="row d-flex align-items-center">
            <div className="col-md-6 col-lg-5">
              <div className="hero-txt mb-40 white-color">
                <h1 className="hero-title">세일즈로그</h1>
                <h4 className="mt-4">
                  언택트 시대의 불확실성 극복을 위한 영업활동의 안내자
                </h4>
                <div className="stores-badge mt-4">
                  <button className="btn btn-primary mr-2 mt-1 btn-lg" onClick={props.onSignInClick}>한 달 무료 체험하기</button>
                  {/* <button className="btn btn-secondary btn-outline mt-1 ml-2 btn-lg">소개서 보기</button> */}
                </div>
                  <p className="mt-4 text-dark">
                    영업일지는 고객(사)의 숨은 니즈를  
                    <br/>
                    발굴 할 수 있는 소중한 영업자산입니다
                    <br/>
                    세일즈로그를 통해 고객정보를 쉽게 자산화하고,
                    <br/>
                    회사 공동의 영업자산으로 활용해보세요!                  
                  </p>                
              </div>
            </div>
            <div className="col-md-6 col-lg-7"> 
              <div className="hero-3-img text-center">        
                <img className="img-fluid fadeInUp animated" src="images/common/hero.png" alt="hero img"/>
              </div>
            </div>
        </div>
      <div className="bg-fixed hero-3-wave"></div>
      </div>
    </section>   
  );
}

export default HeroSection;