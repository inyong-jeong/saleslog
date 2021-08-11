
import React from 'react';

function NeedsGuideList(props) {
  let guideList = [];
  const needstype = props.needstype;

  const handleDeleteOnClick = (index) =>{
    props.handleDeleteClick(index, needstype, "needs")
  }

      if (needstype === "operation" && props.guidetype === "needs") {
        guideList.push(
        <ul className="row mt-3 col-12 border border-dark border-left-0 border-right-0 border-bottom-0">
          <h4 className="col-12 mt-1 mb-1">내부활동</h4>
            <li className="col-12">현금흐름 관리</li>
            <li className="col-12">총비용 절감 KSF</li>
            <li className="col-12">비효율적인 투자 제한/감축</li>
            <li className="col-12">대체품 발굴</li>
            <li className="col-12">업무프로세스 변화</li>
            <li className="col-12">인력 조정</li>
        </ul>
      )
        
      if(props.guideList.operation){
        props.guideList.operation.needs.map((v,i) => {
          guideList.push(
            <div className="col-12">
              <span className="date">{v}</span>
              <button className="btn btn-xs font-12 text-secondary" style={{cursor: 'pointer'}} onClick={() => handleDeleteOnClick(i)}><i className="fe-trash"></i></button>
            </div>
          );
        })
      } 
        
        
      } else if (needstype === "personal" && props.guidetype === "needs") {
        guideList.push(
          <ul className="row mt-3 col-12 border border-dark border-left-0 border-right-0 border-bottom-0">
            <h4 className="col-12 mt-1 mb-1">내부활동</h4>
            <li className="col-12">업무 조정 KSF</li>
            <li className="col-12">업무 협력</li>
          </ul>
        )
        if (props.guideList.personal) {
          props.guideList.personal.needs.map((v,i) => {
            guideList.push(
              <div className="divider col-12">
                <span className="date">{v}</span>
                <button className="btn btn-xs font-12 text-secondary" style={{cursor: 'pointer'}} onClick={() => handleDeleteOnClick(i)}><i className="fe-trash"></i></button>
              </div>
            );
          })
        } 
      } else if (needstype === "strategy" && props.guidetype === "needs") {
        guideList.push(
          <ul className="row mt-3 col-12 border border-dark border-left-0 border-right-0 border-bottom-0">
          <h4 className="col-12 mt-1 mb-1">내부활동</h4>
          <li className="col-12">신시장 KSF</li>
          <li className="col-12">고객발굴</li>
          <li className="col-12">고객니즈정의</li>
          <li className="col-12">신제품 개발 역량 강화</li>
          <li className="col-12">의사결정 프로세스 변화</li>
          <li className="col-12">투자여력 확보</li>
        </ul>
        )
      if (props.guideList.strategy) {
        props.guideList.strategy.needs.map((v,i) => {
          guideList.push(
            <div className="divider col-12">
              <span className="date">{v}</span>
              <button className="btn btn-xs font-12 text-secondary" style={{cursor: 'pointer'}} onClick={() => handleDeleteOnClick(i)}><i className="fe-trash"></i></button>
            </div>
          );
        })
      } } 
  return (
    <React.Fragment>
        <div className="guide-list">
          {guideList}
        </div>
    </React.Fragment>
  );
}

export default NeedsGuideList;