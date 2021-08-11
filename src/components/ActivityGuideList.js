
import React from 'react';


function ActivityGuideList(props) {

  let guideList = [];
  const needstype = props.needstype;

  const handleDeleteOnClick = (index) =>{
    props.handleDeleteClick(index, needstype, "activity")
  }

      if (needstype === "operation" && props.guidetype === "activity") {
        guideList.push(
          <ul className="row col-12 border border-dark border-left-0 border-right-0 border-bottom-0">
            <h4 className="col-12 mt-1 mb-1">고객사 요청 예상 내용</h4>
            <li className="col-12">대금지금 연기 가능성</li>
            <li className="col-12">결제조건 변경 가능성</li>
            <li className="col-12">사업/굼 연기 가능성</li>
            <li className="col-12">가격 인하 요구 수준</li>
            <li className="col-12">변화된 프로세스에 자사 프로세스의 변화 요구 가능성</li>
            <li className="col-12">인력조정에 따른 업무변화 및 업무량 증가</li>
          </ul>
        )
        props.guideList.operation ? props.guideList.operation.activity.map((v,i) => {
            guideList.push(
              <div className="col-12">
                <span className="date">{v}</span>
                <button className="btn btn-xs font-12 text-secondary" style={{cursor: 'pointer'}} onClick={() => handleDeleteOnClick(i)}><i className="fe-trash"></i></button>
              </div>
            );
          }) : props.guideList.map((v) => {
            guideList.push(
              <div className="divider">
                <span className="date">{v}</span>
              </div>
            );
          })
      }else if (needstype === "personal" && props.guidetype === "activity") {
        guideList.push(
          <ul className="row col-12 border border-dark border-left-0 border-right-0 border-bottom-0">
          <h4 className="col-12 mt-1 mb-1">고객사 요청 예상 내용</h4>
          <li className="col-12">시장/고객/업무에 관한 정보 요청</li>
          <li className="col-12">KPI 달성을 위한 협력관계 구성에 필요한 인적 네트워크 소개 요청</li>
          <li className="col-12">업무 일부 대행 요청</li>
        </ul>
        )
        props.guideList.personal ? props.guideList.personal.activity.map((v,i) => {
          guideList.push(
            <div className="divider col-12">
              <span className="date">{v}</span>
              <button className="btn btn-xs font-12 text-secondary" style={{cursor: 'pointer'}} onClick={() => handleDeleteOnClick(i)}><i className="fe-trash"></i></button>
            </div>
          );
        }) : props.guideList.map((v) => {
          guideList.push(
            <div className="divider">
              <span className="date">{v}</span>
            </div>
          );
        })
      }else if (needstype === "strategy" && props.guidetype === "activity") {
        guideList.push(
          <ul className="row col-12 border border-dark border-left-0 border-right-0 border-bottom-0">
            <h4 className="col-12 mt-1 mb-1">고객사 요청 예상 내용</h4>
            <li className="col-12">파트너 발굴지원 요구 가능성</li>
            <li className="col-12">기존 파트너 관계 재설정 가능성</li>
            <li className="col-12">필요한 시장/고객정보 요청 가능성</li>
            <li className="col-12">가격 인하 요구 가능성</li>
            <li className="col-12">변화된 프로세스에 자사 프로세스의 변화 요구 가능성</li>
            <li className="col-12">투자협력 가능성</li>
          </ul>
        )
      props.guideList.strategy ? props.guideList.strategy.activity.map((v,i) => {
        guideList.push(
          <div className="divider col-12">
            <span className="date">{v}</span>
            <button className="btn btn-xs font-12 text-secondary" style={{cursor: 'pointer'}} onClick={() => handleDeleteOnClick(i)}><i className="fe-trash"></i></button>
          </div>
        );
      }) : props.guideList.map((v) => {
        guideList.push(
          <div className="divider">
            <span className="date">{v}</span>
          </div>
        );
      })
      } 
  return (
    <React.Fragment>
        <div className="guide-list">
          {guideList}
        </div>
    </React.Fragment>
  );
}

export default ActivityGuideList;