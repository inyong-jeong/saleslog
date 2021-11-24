import React from 'react';

function PricingSection(props) {

  const handleOnClick = () => {
    window.location.href = 'https://theklab.co/contact'
  }

  const handleOnFreeClick = () => {
    window.location.href = 'https://saleslog.co/#/signup'
  }
  return (
    <section id="pricing" className="bg-lightgrey grey-textured wide-60 pricing-section">
      <div className="container">
        <div className="row">
          <div className="col-lg-10 offset-lg-1 section-title">
            <h3 className="h3-md steelblue-color">요금 안내</h3>
            <p className="p-md">세일즈로그는 3가지 상품으로 제공되며, 필요에 맞게 선택하여 이용하실 수 있습니다.
            </p>
          </div>
        </div>
        <div className="row d-flex align-items-center pricing-row primary-theme">
          <div className="col-md-4">
            <div className="pricing-table highlight wow fadeInUp" data-wow-delay="0.4s">
              <div className="pricing-plan steelblue-color">
                <h5 className="h5-lg">체험</h5>
                <p className="text-dark">무료</p>
                <p className="p-md"><br />작성하는 영업일지가 20개 이하일 때 적합한 상품</p>
              </div>
              <ul className="features steelblue-color">
                {/* <li><i className="fas fa-stop-circle"></i> 등록가능 구성인원: 5명</li> */}
                {/* <li><i className="fas fa-stop-circle"></i> 등록가능 고객사수: 3개</li> */}
                {/* <li><i className="fas fa-stop-circle"></i> 등록가능 영업일지수: 10개</li> */}
                <li><i className="fas fa-stop-circle"></i> 저장 용량: 1Gb</li>
                <li><i className="fas fa-stop-circle"></i> 1인 워크그룹수: 무제한</li>
                <li><i className="fas fa-stop-circle"></i> 2인 워크그룹수: -</li>
                <li><i className="fas fa-stop-circle"></i> 최대 등록 고객: 500</li>
                <li><i className="fas fa-stop-circle"></i> 멀티 태스킹: Mobile & PC</li>
                {/* <li><i className="fas fa-stop-circle"></i> 영업일지 음성기록</li> */}
                <li><i className="fas fa-stop-circle"></i> 영업일지 피드백</li>
                <li><i className="fas fa-stop-circle"></i> 알림 기능</li>
                <li><i className="fas fa-stop-circle"></i> 검색 기능</li>
                <li className="disabled-option"><i className="fas fa-stop-circle"></i> 권한 관리 기능</li>
                <li className="disabled-option"><i className="fas fa-stop-circle"></i> 통계 리포트 내보내기</li>
                <li className="disabled-option"><i className="fas fa-stop-circle"></i> API 연동</li>
              </ul>
              <button href="#" className="btn btn-primary black-hover" onClick={handleOnFreeClick}>한달 무료 체험</button>
            </div>
          </div>
          <div className="col-md-4">
            <div className="pricing-table highlight wow fadeInUp" data-wow-delay="0.7s">
              <div className="pricing-plan steelblue-color">
                <h5 className="h5-lg">베이직</h5>
                <p className="text-dark">43,000₩ 인당 월</p>
                <p className="p-md">등록 영업일지 수 제한 없이 영업일지 & 고객정보 DB관리를 이용할 수 있는 상품</p>
              </div>
              <ul className="features steelblue-color">
                {/* <li><i className="fas fa-stop-circle"></i> 등록가능 구성원인원: 100명</li>
                <li><i className="fas fa-stop-circle"></i> 무제한 고객사수 등록</li>
                <li><i className="fas fa-stop-circle"></i> 무제한 영업일지 등록</li> */}
                <li><i className="fas fa-stop-circle"></i> 저장 용량: 1Gb</li>

                <li><i className="fas fa-stop-circle"></i> 1인 워크그룹수: 무제한</li>
                <li><i className="fas fa-stop-circle"></i> 2인 워크그룹수: 1개</li>
                <li><i className="fas fa-stop-circle"></i> 최대 등록 고객: 무제한</li>
                <li><i className="fas fa-stop-circle"></i> 멀티 태스킹: Mobile & PC</li>
                {/* <li><i className="fas fa-stop-circle"></i> 영업일지 음성기록</li> */}
                <li><i className="fas fa-stop-circle"></i> 영업일지 피드백</li>
                <li><i className="fas fa-stop-circle"></i> 알림 기능</li>
                <li><i className="fas fa-stop-circle"></i> 검색 기능</li>
                <li><i className="fas fa-stop-circle"></i> 권한 관리 기능</li>
                <li><i className="fas fa-stop-circle"></i> 통계 리포트 내보내기</li>
                <li className="disabled-option"><i className="fas fa-stop-circle"></i> API 연동</li>
              </ul>
              <button href="#" className="btn btn-secondary black-hover" onClick={handleOnClick}>지금 문의하기</button>
            </div>
          </div>
          <div className="col-md-4">
            <div className="pricing-table highlight wow fadeInUp" data-wow-delay="1s">
              <div className="pricing-plan steelblue-color">
                <h5 className="h5-lg">프리미엄</h5>
                <p className="text-dark">79,000₩ 인당 월</p>
                <p className="p-md"><br />사내 시스템과 연계 API 연동이 지원되는 상품</p>
              </div>
              <ul className="features steelblue-color">
                {/* <li><i className="fas fa-stop-circle"></i> 무제한 구성원 등록</li>
                <li><i className="fas fa-stop-circle"></i> 무제한 고객사수 등록</li>
                <li><i className="fas fa-stop-circle"></i> 무제한 영업일지 등록</li> */}
                <li><i className="fas fa-stop-circle"></i> 저장 용량: 1Gb</li>

                <li><i className="fas fa-stop-circle"></i> 1인 워크그룹수: 무제한</li>
                <li><i className="fas fa-stop-circle"></i> 2인 워크그룹수: 5개</li>
                <li><i className="fas fa-stop-circle"></i> 최대 등록 고객: 무제한</li>
                <li><i className="fas fa-stop-circle"></i> 멀티 태스킹: Mobile & PC</li>
                {/* <li><i className="fas fa-stop-circle"></i> 영업일지 음성기록</li> */}
                <li><i className="fas fa-stop-circle"></i> 영업일지 피드백</li>
                <li><i className="fas fa-stop-circle"></i> 알림 기능</li>
                <li><i className="fas fa-stop-circle"></i> 검색 기능</li>
                <li><i className="fas fa-stop-circle"></i> 권한 관리 기능</li>
                <li><i className="fas fa-stop-circle"></i> 통계 리포트 내보내기</li>
                <li><i className="fas fa-stop-circle"></i> API 연동</li>
              </ul>
              <button type='button' className="btn btn-secondary black-hover" onClick={handleOnClick}>지금 문의하기</button>
            </div>
          </div>
        </div>
        <div className="row">
          <div className="col-lg-8 offset-lg-2 wow fadeInUp" data-wow-delay="1s">
            <div className="pricing-notice mb-40 text-start">
              <small className=""><span>1)</span> 상기 안내된 이용 가격은 부가가치세(VAT)가 포함되지 않은 가격입니다.</small>
            </div>
            <div className="pricing-notice mb-40 text-start">
              <small className=""><span>2)</span> 세일즈로그 이용 구성원들의 비용이 합산되어 사내 담당자가 등록한 신용/체크카드로 매월 자동결제 됩니다.</small>
            </div>
            <div className="pricing-notice mb-40 text-start">
              <small className=""><span>3)</span> 엔터프라이즈는 세일즈로그 이용 구성원 수가 많은수록 단가가 낮아지는 구조입니다. 문의를 남겨주시면 사용 인원에 맞추어 제안드리겠습니다.</small>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
// https://www.saleslog.co/#/signup
export default PricingSection;

// location.href='https://theklab.co/contact'