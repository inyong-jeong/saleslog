import { regex } from 'constants/regex';

const phonesOption = [
  {
    label: '전화번호',
    value: '0'
  }, {
    label: '010',
    value: '010'
  }, {
    label: '011',
    value: '011'
  }, {
    label: '012',
    value: '012'
  }, {
    label: '013',
    value: '013'
  }, {
    label: '014',
    value: '014'
  }, {
    label: '015',
    value: '015'
  }, {
    label: '016',
    value: '016'
  }, {
    label: '017',
    value: '017'
  }, {
    label: '018',
    value: '018'
  }, {
    label: '019',
    value: '019'
  }, {
    label: '02',
    value: '02'
  }, {
    label: '031',
    value: '031'
  }];

const industryLargeCategory = [
  { 'label': '산업분류', 'value': '0' },
  { 'label': '농업, 임업 및 어업', 'value': 'A' },
  { 'label': '광업', 'value': 'B' },
  { 'label': '제조업', 'value': 'C' },
  { 'label': '전기, 가스, 증기 및 공기 조절 공급업', 'value': 'D' },
  { 'label': '수도, 하수 및 폐기물 처리, 원료 재생업', 'value': 'E' },
  { 'label': '건설업', 'value': 'F' },
  { 'label': '도매 및 소매업', 'value': 'G' },
  { 'label': '운수 및 창고업', 'value': 'H' },
  { 'label': '숙박 및 음식점업', 'value': 'I' },
  { 'label': '정보통신업', 'value': 'J' },
  { 'label': '금융 및 보험업', 'value': 'K' },
  { 'label': '부동산업', 'value': 'L' },
  { 'label': '전문, 과학 및 기술 서비스업', 'value': 'M' },
  { 'label': '사업시설 관리, 사업 지원 및 임대 서비스업', 'value': 'N' },
  { 'label': '공공 행정, 국방 및 사회보장 행정', 'value': 'O' },
  { 'label': '교육 서비스업', 'value': 'P' },
  { 'label': '보건업 및 사회복지 서비스업', 'value': 'Q' },
  { 'label': '예술, 스포츠 및 여가관련 서비스업', 'value': 'R' },
  { 'label': '협회 및 단체, 수리 및 기타 개인 서비스업', 'value': 'S' },
  { 'label': '가구 내 고용활동 및 달리 분류되지 않은 자가 소비 생산활동', 'value': 'T' },
  { 'label': '국제 및 외국기관', 'value': 'U' }
];

export const industryMediumCategory =
{
  'A': [
    {
      'label': '농업',
      'value': '01'
    },
    {
      'label': '임업',
      'value': '02'
    },
    {
      'label': '어업',
      'value': '03'
    }
  ],
  'B': [
    {
      'label': '석탄, 원유 및 천연가스 광업',
      'value': '05'
    },
    {
      'label': '금속 광업',
      'value': '06'
    },
    {
      'label': '비금속광물 광업; 연료용 제외',
      'value': '07'
    },
    {
      'label': '광업 지원 서비스업',
      'value': '08'
    }
  ],
  'C': [
    {
      'label': '식료품 제조업',
      'value': '10'
    },
    {
      'label': '음료 제조업',
      'value': '11'
    },
    {
      'label': '담배 제조업',
      'value': '12'
    },
    {
      'label': '섬유제품 제조업; 의복 제외',
      'value': '13'
    },
    {
      'label': '의복, 의복 액세서리 및 모피제품 제조업',
      'value': '14'
    },
    {
      'label': '가죽, 가방 및 신발 제조업',
      'value': '15'
    },
    {
      'label': '목재 및 나무제품 제조업; 가구 제외',
      'value': '16'
    },
    {
      'label': '펄프, 종이 및 종이제품 제조업',
      'value': '17'
    },
    {
      'label': '인쇄 및 기록매체 복제업',
      'value': '18'
    },
    {
      'label': '코크스, 연탄 및 석유정제품 제조업',
      'value': '19'
    },
    {
      'label': '화학 물질 및 화학제품 제조업; 의약품 제외',
      'value': '20'
    },
    {
      'label': '의료용 물질 및 의약품 제조업',
      'value': '21'
    },
    {
      'label': '고무 및 플라스틱제품 제조업',
      'value': '22'
    },
    {
      'label': '비금속 광물제품 제조업',
      'value': '23'
    },
    {
      'label': '1차 금속 제조업',
      'value': '24'
    },
    {
      'label': '금속 가공제품 제조업; 기계 및 가구 제외',
      'value': '25'
    },
    {
      'label': '전자 부품, 컴퓨터, 영상, 음향 및 통신장비 제조업',
      'value': '26'
    },
    {
      'label': '의료, 정밀, 광학 기기 및 시계 제조업',
      'value': '27'
    },
    {
      'label': '전기장비 제조업',
      'value': '28'
    },
    {
      'label': '기타 기계 및 장비 제조업',
      'value': '29'
    },
    {
      'label': '자동차 및 트레일러 제조업',
      'value': '30'
    },
    {
      'label': '기타 운송장비 제조업',
      'value': '31'
    },
    {
      'label': '가구 제조업',
      'value': '32'
    },
    {
      'label': '기타 제품 제조업',
      'value': '33'
    },
    {
      'label': '산업용 기계 및 장비 수리업',
      'value': '34'
    }
  ],
  'D': [
    {
      'label': '전기, 가스, 증기 및 공기 조절 공급업',
      'value': '35'
    }
  ],
  'E': [
    {
      'label': '수도업',
      'value': '36'
    },
    {
      'label': '하수, 폐수 및 분뇨 처리업',
      'value': '37'
    },
    {
      'label': '폐기물 수집, 운반, 처리 및 원료 재생업',
      'value': '38'
    },
    {
      'label': '환경 정화 및 복원업',
      'value': '39'
    }
  ],
  'F': [
    {
      'label': '종합 건설업',
      'value': '41'
    },
    {
      'label': '전문직별 공사업',
      'value': '42'
    }
  ],
  'G': [
    {
      'label': '자동차 및 부품 판매업',
      'value': '45'
    },
    {
      'label': '도매 및 상품 중개업',
      'value': '46'
    },
    {
      'label': '소매업; 자동차 제외',
      'value': '47'
    }
  ],
  'H': [
    {
      'label': '육상 운송 및 파이프라인 운송업',
      'value': '49'
    },
    {
      'label': '수상 운송업',
      'value': '50'
    },
    {
      'label': '항공 운송업',
      'value': '51'
    },
    {
      'label': '창고 및 운송관련 서비스업',
      'value': '52'
    }
  ],
  'I': [
    {
      'label': '숙박업',
      'value': '55'
    },
    {
      'label': '음식점 및 주점업',
      'value': '56'
    }
  ],
  'J': [
    {
      'label': '출판업',
      'value': '58'
    },
    {
      'label': '영상ㆍ오디오 기록물 제작 및 배급업',
      'value': '59'
    },
    {
      'label': '방송업',
      'value': '60'
    },
    {
      'label': '우편 및 통신업',
      'value': '61'
    },
    {
      'label': '컴퓨터 프로그래밍, 시스템 통합 및 관리업',
      'value': '62'
    },
    {
      'label': '정보서비스업',
      'value': '63'
    }
  ],
  'K': [
    {
      'label': '금융업',
      'value': '64'
    },
    {
      'label': '보험 및 연금업',
      'value': '65'
    },
    {
      'label': '금융 및 보험관련 서비스업',
      'value': '66'
    }
  ],
  'L': [
    {
      'label': '부동산업',
      'value': '68'
    }
  ],
  'M': [
    {
      'label': '연구개발업',
      'value': '70'
    },
    {
      'label': '전문 서비스업',
      'value': '71'
    },
    {
      'label': '건축 기술, 엔지니어링 및 기타 과학기술 서비스업',
      'value': '72'
    },
    {
      'label': '기타 전문, 과학 및 기술 서비스업',
      'value': '73'
    }
  ],
  'N': [
    {
      'label': '사업시설 관리 및 조경 서비스업',
      'value': '74'
    },
    {
      'label': '사업 지원 서비스업',
      'value': '75'
    },
    {
      'label': '임대업; 부동산 제외',
      'value': '76'
    }
  ],
  'O': [
    {
      'label': '공공 행정, 국방 및 사회보장 행정',
      'value': '84'
    }
  ],
  'P': [
    {
      'label': '교육 서비스업',
      'value': '85'
    }
  ],
  'Q': [
    {
      'label': '보건업',
      'value': '86'
    },
    {
      'label': '사회복지 서비스업',
      'value': '87'
    }
  ],
  'R': [
    {
      'label': '창작, 예술 및 여가관련 서비스업',
      'value': '90'
    },
    {
      'label': '스포츠 및 오락관련 서비스업',
      'value': '91'
    }
  ],
  'S': [
    {
      'label': '협회 및 단체',
      'value': '94'
    },
    {
      'label': '개인 및 소비용품 수리업',
      'value': '95'
    },
    {
      'label': '기타 개인 서비스업',
      'value': '96'
    }
  ],
  'T': [
    {
      'label': '가구 내 고용활동',
      'value': '97'
    },
    {
      'label': '달리 분류되지 않은 자가 소비를 위한 가구의 재화 및 서비스 생산활동',
      'value': '98'
    }
  ],
  'U': [
    {
      'label': '국제 및 외국기관',
      'value': '99'
    }
  ]
};

export const userForm = [
  {
    type: 'header', label: '인증정보'
  }, {
    type: 'divider'
  }, {
    type: 'form', id: 'email', label: '이메일', inputType: 'email', maxLength: 40, regex: regex.email,
    btn: {
      label: '중복확인'
    }
  }, {
    type: 'form', id: 'password', label: '비밀번호', placeholder: '영문/숫자 8자 이상', maxLength: 20, inputType: 'password', regex: regex.password,
  }, {
    type: 'form', id: 'passwordConfirm', label: '비밀번호 확인', maxLength: 20, inputType: 'password', regex: regex.password,
  }, {
    type: 'header', label: '회원정보'
  }, {
    type: 'divider',
  }, {
    type: 'form', id: 'user_name', label: '성명', maxLength: 10, regex: regex.name
  }, {
    type: 'form',
    id: 'ph',
    multiFields: [
      { type: 'form-select', id: 'ph1', label: '전화번호', col: 2, options: phonesOption },
      { type: 'form', id: 'ph2', label: null, inputType: 'tel', col: 2, regex: regex.ph2 },
      { type: 'form', id: 'ph3', label: null, inputType: 'tel', col: 2, regex: regex.ph3 }
    ],
  }, {
    type: 'form-radio',
    label: '이메일 수신 여부',
    id: 'receive_email',
    multiFields: [{ id: 'accept', label: '수신동의' }, { id: 'deny', label: '수신동의 안함' }]
  }];

export const userCompanyForm = [
  {
    type: 'header', label: '기업정보'
  }, {
    type: 'divider'
  }, {
    type: 'form', id: 'organization_code', label: '기업 코드', maxLength: 15, regex: regex.organization_code, note: '기업 코드의 경우 관리자에게 문의하세요'
  }];

export const companyForm = [
  {
    type: 'header', label: '기업정보',
  }, {
    type: 'divider'
  }, {
    type: 'form', id: 'organization_name', label: '기업명', note: '*법인기업: 기업형태에 맞게 기재', maxLength: 15, regex: regex.organization_title, required: true,
  }, {
    type: 'form', id: 'ceo_name', label: '대표자명', maxLength: 20, note: '*공동 대표의 경우 전부 기재', regex: regex.ceo_name
  }, {
    type: 'form', id: 'industry',
    multiFields: [
      { type: 'form-select', id: 'industry_large', label: '기업분류', col: 3, options: industryLargeCategory, required: true },
      { type: 'form-select', id: 'industry_medium', label: null, col: 3, options: [{ label: '', value: '' }], required: true }
    ]
  }, {
    type: 'form', label: '주소', id: 'address', disabled: true,
    btn: {
      label: '우편번호'
    }
  }, {
    type: 'form',
    label: '상세주소',
    id: 'address_detail',
    required: true
  }, {
    type: 'form',
    id: 'ph_corp',
    multiFields: [
      { type: 'form', id: 'ph1_corp', label: '전화번호', col: 2, regex: regex.ph1_corp },
      { type: 'form', id: 'ph2_corp', col: 2, regex: regex.ph2_corp },
      { type: 'form', id: 'ph3_corp', col: 2, regex: regex.ph3_corp }
    ],
  }, {
    type: 'form',
    id: 'fax_corp',
    multiFields: [
      { type: 'form', id: 'fax1_corp', label: '팩스번호', col: 2, regex: regex.fax1, placeholder: '선택입력', required: false },
      { type: 'form', id: 'fax2_corp', col: 2, regex: regex.fax2, required: false },
      { type: 'form', id: 'fax3_corp', col: 2, regex: regex.fax3, required: false }
    ]
  }, {
    type: 'form', id: 'registration_number', label: '사업자등록번호', maxLength: 20, note: '*`-` 제외하고 입력', regex: regex.registration_number
  }];
