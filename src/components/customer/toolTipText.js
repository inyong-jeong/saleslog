import React from 'react'

export const customerType = () => {
  return (
    <div>
      세일즈 활동 목적에 따라서 고객을 구분해서 등록하고 관리하세요.
      <br />
      거래고객 : 현재 거래 중인 고객
      <br />
      리드고객 : 신규 고객으로 유치하고자 하는 타깃 고객
    </div>
  )
}


export const gradeTypeTooltip = () => {
  return (
    <div>
      고객의 거래규모, 신용도, 재무상태 등 거래와 관련된 다양한 요소를 참고하여 임의의 관리 등급을 지정해서 관리할 수 있습니다.
    </div>
  )
}

export const stageTypeTooltip = () => {
  return (
    <div>
      리드 단계는 [발굴] → [조사] → [제안] → [검증] 으로 과정을 구분합니다.
      <br />
      향후 거래가 발생한 경우 ‘거래고객‘ 으로 고객 구분을 변경해서 관리할 수 있습니다.
      <br />
      리드 단계는 상황에 따라 축소 또는 생략할 수 있습니다.
    </div>
  )
}

export const managerTooltip =
  `고객(기업)의 대표자, 핵심 관리자, 거래 담당자 등 정보는 거래 가능성을 높이는 효과적인 정보 자원입니다.
`
export const tagToolTip =
  `태그는 고객 목록에 고객 정보와 함께 출력되는 인식이 용이한 핵심키워드 입니다.`