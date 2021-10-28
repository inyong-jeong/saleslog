import React, { useState } from 'react';
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';


const SignUpModal = (props) => {
  const {
    className
  } = props;
  const [modal, setModal] = useState(false);
  const toggle = () => setModal(!modal);

  return (
    <>
      <div onClick={toggle} className='mb-1 mr-1' style={{ float: 'right', fontSize: '14px', cursor: 'pointer' }}>
        <u>자세히 보기</u>
      </div>
      <Modal scrollable={true} isOpen={modal} toggle={toggle} className={className} style={{ color: 'black' }} >
        <ModalHeader toggle={toggle}>서비스 이용 약관 및 개인정보 처리방침</ModalHeader>
        <ModalBody>
          <div >
            주식회사 더클랩(제휴회사를 포함하여 이하 “더클랩”)에서 이용자의 정보를 안전하게 보호하고 관리하는 것은 우리의 최고가치 중 하나입니다. 세일즈로그 웹사이트에 방문하는 자 및 세일즈로그 서비스(세일즈로그 웹사이트를 포함하여 이하 ‘세일즈로그’) 이용자로부터 수집한 정보를 사용 및 보호하는 방법을 쉽게 이해할 수 있도록 본 개인정보 처리방침(이하 “개인정보 처리방침”)을 제정합니다.
            본 개인정보 처리방침은 여러분이 필요할 경우 전문을 읽을 수 있도록 항상 공개되어 있습니다. 개인정보 처리방침이 개정될 때는 여러분이 개정 세부 사항 및 개정 사유를 쉽게 알 수 있도록 공지하겠습니다.
            <br />
            <br />
            <p>[개인정보의 처리 목적]</p>
            세일즈로그는 개인정보를 다음의 목적을 위해 처리합니다. 처리한 개인정보는 다음의 목적 이외의 용도로는 사용되지 않으며 이용 목적이 변경될 시에는 사전동의를 구할 예정입니다.
            ① 웹사이트 회원가입 및 관리
            - 회원 가입 의사 확인, 회원제 서비스 제공에 따른 본인 식별·인증, 회원자격 유지·관리, 제한적 본인확인제 시행에 따른 본인확인, 서비스 부정 이용 방지, 각종 고지·통지, 고충 처리, 분쟁 조정을 위한 기록 보존 등을 목적으로 개인정보를 처리합니다.
            ② 재화 또는 서비스 제공
            - 서비스 제공, 청구서 발송, 콘텐츠 제공, 맞춤 서비스 제공, 본인인증, 나이 인증, 요금 결제·정산 등을 목적으로 개인정보를 처리합니다.
            ③ 마케팅 및 광고에의 활용
            - 신규 서비스(제품) 개발 및 맞춤 서비스 제공, 이벤트 및 광고성 정보 제공 및 참여기회 제공, 서비스의 유효성 확인, 접속 빈도 파악 또는 회원의 서비스 이용에 대한 통계 등을 목적으로 개인정보를 처리합니다.
            <br />
            <br />
            <p>[개인정보의 처리 및 보유 기간]</p>
            ① 세일즈로그는 법령에 따른 개인정보 보유·이용 기간 또는 정보주체로부터 개인정보를 수집 시에 동의 받은 개인정보 보유, 이용 기간 내에서 개인정보를 처리, 보유합니다.
            ② 각각의 개인정보 처리 및 보유 기간은 다음과 같습니다.
            개인정보파일명
            운영 목적
            운영(수집) 근거
            운영(수집) 항목
            보유 기간
            회원정보
            세일즈로그 서비스 이용
            정보주체의 동의
            이메일, 비밀번호, 이름, 결제정보
            회원탈퇴 시까지
            <br />
            <br />
            <p>개인정보의 제3자 제공에 관한 사항]</p>
            ① 세일즈로그는 정보주체의 동의, 법률의 특별한 규정 등 개인정보 보호법 제17조 및 제18조에 해당하는 경우에만 개인정보를 제3자에게 제공합니다.
            ② 세일즈로그는 정보주체의 개인정보를 처리 목적으로 명시한 범위를 초과하여 제3자에게 제공하지 않습니다. 다만, 다음 각호의 경우에는 제3자에게 제공할 수 있습니다.
            가. 정보주체로부터 별도의 동의를 받는 경우
            나. 다른 법률에 특별한 규정이 있는 경우
            다. 정보주체가 의사표시를 할 수 없는 상태에 있거나 주소불명 등으로 사전동의를 받을 수 없을 경우로서 명백히 정보주체 또는 제3자의 급박한 생명, 신체, 재산의 이익을 위하여 필요하다고 인정되는 경우
            라. 통계작성 및 학술연구 등의 목적을 위하여 필요한 경우로서 특정 개인을 알아볼 수 없는 형태로 개인정보를 제공하는 경우
            마. 개인정보를 목적 외의 용도로 이용하거나 이를 제3자에게 제공하지 아니하면 다른 법률에서 정하는 소관 업무를 수행할 수 없는 경우로서 개인정보보호위원회의 심의･의결을 거친 경우
            바. 조약, 그 밖의 국제협정 이행을 위하여 외국 정부 또는 국제기구에 제공하는 데 필요한 경우
            사. 범죄의 수사와 공소의 제기 및 유지를 위하여 필요한 경우
            아. 법원의 재판업무 수행을 위하여 필요한 경우
            자. 형(形) 및 감호, 보호처분의 집행을 위하여 필요한 경우
            <br />
            <br />
            <p>[개인정보처리 위탁]</p>
            ① 세일즈로그는 원활한 개인정보 업무처리를 위하여 다음과 같이 개인정보 처리업무를 위탁하고 있습니다.
            위탁 받는 자(수탁자)
            위탁 업무의 내용
            위탁 기간
            카페24
            정보시스템 운영
            회원 탈퇴 또는 위탁업무 종료시까지
            KG이니시스
            구매 및 요금 결제
            ② 세일즈로그는 위탁계약 체결 시 개인정보 보호법 제26조에 따라 위탁업무 수행목적 외 개인정보 처리금지, 기술적·관리적 보호조치, 재위탁 제한, 수탁자에 대한 관리·감독, 손해배상 등 책임에 관한 사항을 계약서 등 문서에 명시하고, 수탁자가 개인정보를 안전하게 처리하는지를 감독하고 있습니다.
            ③ 더클랩은 개인정보를 외국의 다른 사업자에게 제공하지 않습니다. 다만, 정보시스템 운영 및 요금 결제, 고객 지원 등을 위해 위탁을 하고 있습니다. 위탁하는 업무에 대해서는 안전하게 관리될 수 있도록 관리와 감독을 시행하고 있습니다.
            ④ 위탁업무의 내용이나 수탁자가 변경될 경우에는 지체없이 본 개인정보 처리방침을 통하여 공개하도록 하겠습니다.
            <br />
            <br />
            <p>      [정보주체의 권리·의무 및 그 행사 방법]</p>

            이용자는 개인정보 주체로써 다음과 같은 권리를 행사할 수 있습니다.
            ① 정보주체는 더클랩에 대해 언제든지 개인정보 열람, 정정, 삭제, 처리정지 요구 등의 권리를 행사할 수 있습니다.
            ② 제1항에 따른 권리 행사는 더클랩에 대해 개인정보 보호법 시행령 제41조제1항에 따라 서면, 전자우편, 모사전송(FAX) 등을 통하여 하실 수 있으며 더클랩은 이에 대해 지체 없이 조치하겠습니다.
            ③ 제1항에 따른 권리 행사는 정보주체의 위임을 받은 자 등 대리인을 통하여 하실 수 있습니다. 이 경우 개인정보 보호법 시행규칙 별지 제11호 서식에 따른 위임장을 제출하셔야 합니다.
            ④ 개인정보 열람 및 처리정지 요구는 개인정보보호법 제35조 제5항, 제37조 제2항에 의하여 정보주체의 권리가 제한될 수 있습니다.
            ⑤ 개인정보의 정정 및 삭제 요구는 다른 법령에서 그 개인정보가 수집 대상으로 명시되어 있는 경우에는 그 삭제를 요구할 수 없습니다.
            ⑥ 더클랩은 정보주체 권리에 따른 열람의 요구, 정정·삭제의 요구, 처리정지의 요구 시 열람 등 요구를 한 자가 본인이거나 정당한 대리인 인지를 확인합니다.
            <br />
            <br />
            <p>      [개인정보의 파기]</p>

            세일즈로그는 원칙적으로 개인정보 처리 목적이 달성된 경우에는 지체없이 해당 개인정보를 파기합니다. 파기의 절차, 기한 및 방법은 다음과 같습니다.
            ① 파기 절차
            - 이용자가 입력한 정보는 목적 달성 후 별도의 DB에 옮겨져(종이의 경우 별도의 서류) 내부 방침 및 기타 관련 법령에 따라 일정기간 저장된 후 혹은 즉시 파기됩니다. 이때, DB로 옮겨진 개인정보는 법률에 의한 경우가 아니고서는 다른 목적으로 이용되지 않습니다.
            ② 파기 기한
            - 이용자의 개인정보는 개인정보의 보유 기간이 경과된 경우에는 보유 기간의 종료일로부터 5일 이내에, 개인정보의 처리 목적 달성, 해당 서비스의 폐지, 사업의 종료 등 그 개인정보가 불필요하게 되었을 때는 개인정보의 처리가 불필요한 것으로 인정되는 날로부터 5일 이내에 그 개인정보를 파기합니다.
            ③ 파기 방법
            가. 전자적 파일 형태의 정보는 기록을 재생할 수 없는 기술적 방법을 사용합니다.
            나. 종이에 출력된 개인정보는 분쇄기로 분쇄하거나 소각을 통하여 파기합니다.
            <br />
            <br />
            <p>      [개인정보 자동 수집 장치의 설치•운영 및 거부에 관한 사항]</p>

            ① 더클랩은 개별적인 맞춤 서비스를 제공하기 위해 이용정보를 저장하고 수시로 불러오는 ‘쿠키(cookie)’를 사용합니다.
            ② 쿠키는 웹사이트를 운영하는 데 이용되는 서버가 이용자의 컴퓨터 브라우저에 보내는 소량의 정보이며 이용자들의 PC 컴퓨터 내의 하드디스크에 저장되기도 합니다.
            가. 쿠키의 사용 목적 : 더클랩은 쿠키를 통해 수집하는 정보는 '개인정보의 수집 및 이용 목적' 이외의 용도로는 사용되지 않습니다.
나. 쿠키의 설치•운영 및 거부 : 웹브라우저 상단의 도구> 인터넷 옵션> 개인정보 메뉴의 옵션 설정을 통해 쿠키 저장을 거부할 수 있습니다.
            다. 쿠키 저장을 거부할 경우 맞춤형 서비스 이용에 어려움이 발생할 수 있습니다.
            ③ 더클랩은 여러분이 세일즈로그를 이용할 때 자동으로 여러분이 사용하는 장치의 유형, 운영체제 버전, 장치 고유 식별번호를 수집합니다. 그 외에도 여러분의 신용카드 정보, 통신사 정보, 할인 코드 또는 상품권 번호, 또는 유료 서비스 사용 시 여러분이 세일즈로그에서 결제하는데 필요한 다른 정보를 수집할 수 있습니다.
            ④ 모바일 분석 : 더클랩은 여러분의 모바일 기기에서 세일즈로그 기능성을 더욱 잘 이해하기 위하여 모바일 분석 소프트웨어를 사용합니다. 이 소프트웨어는 애플리케이션 이용 빈도, 애플리케이션 내에서 발생한 사건, 집계된 사용량, 성능 데이터, 오류 정보 등의 정보를 기록할 수 있습니다.
            <br />
            <br />
            <p>      [개인정보 보호책임자 지정]</p>

            ① 더클랩은 개인정보 처리에 관한 업무를 총괄해서 책임지고, 개인정보 처리와 관련한 정보주체의 불만 처리 및 피해구제 등을 위하여 아래와 같이 개인정보 보호책임자를 지정하고 있습니다.  <br />
            가. 개인정보 보호책임자  <br />
            <br />
            - 성명 : 박정윤  <br />
            - 소속 : 서비스개발부  <br />
            - 연락처 : 070-4179-3848, support@theklab.co
            <br />
            <br />
            나. 개인정보 보호 담당부서  <br />
            - 부서명 : 인프라운영팀  <br />
            - 담당자 : 정인용  <br />
            - 연락처 : 070-4179-3848, support@theklab.co  <br />
            <br />
            ② 세일즈로그를 이용하시는 모든 분은 더클랩의 서비스(또는 사업)를 이용하시면서 발생한 모든 개인정보 보호 관련 문의, 불만 처리, 피해구제 등에 관한 사항을 개인정보 보호책임자 및 담당부서로 문의하실 수 있습니다.
            ③ 더클랩은 정보주체의 문의에 대해 지체 없이 답변 및 처리해드릴 것입니다.
            개인정보 처리방침 변경
            ① 이 개인정보처리방침은 시행일로부터 적용되며, 법령 및 방침에 따른 변경내용의 추가, 삭제 및 정정이 있는 경우에는 변경사항의 시행 7일 전부터 공지 사항을 통하여 고지할 것입니다.
            <br />
            <br />
            <p>      [개인정보의 안전성 확보 조치]</p>

            세일즈로그는 개인정보보호법 제29조에 따라 다음과 같이 안전성 확보에 필요한 기술적/관리적 및 물리적 조치를 하고 있습니다.
            ① 정기적인 자체 감사 실시
            - 개인정보 취급 관련 안정성 확보를 위해 정기적(분기 1회)으로 자체 감사를 시행하고 있습니다.
            ② 개인정보 취급 직원의 최소화 및 교육
            - 개인정보를 취급하는 직원을 지정하고 담당자에 한정시켜 최소화하여 개인정보를 관리하는 대책을 시행하고 있습니다.
            ③ 내부관리계획의 수립 및 시행
            - 개인정보의 안전한 처리를 위하여 내부관리계획을 수립하고 시행하고 있습니다.
            ④ 해킹 등에 대비한 기술적 대책
            - 세일즈로그는 해킹이나 컴퓨터 바이러스 등에 의한 개인정보 유출 및 훼손을 막기 위하여 보안프로그램을 설치하고 주기적인 갱신·점검을 하며 외부로부터 접근이 통제된 구역에 시스템을 설치하고 기술적/물리적으로 감시 및 차단하고 있습니다.
            ⑤ 개인정보의 암호화
            - 이용자의 개인정보인 비밀번호는 암호화되어 저장 및 관리되고 있어, 본인만이 알 수 있으며 중요한 데이터는 파일 및 전송 데이터를 암호화하거나 파일 잠금 기능을 사용하는 등의 별도 보안 기능을 사용하고 있습니다.
            ⑥ 접속기록의 보관 및 위변조 방지
            - 개인정보처리시스템에 접속한 기록을 최소 2년 이상 보관, 관리하고 있으며, 접속 기록이 위변조 및 도난, 분실되지 않도록 보안기능 사용하고 있습니다.
            ⑦ 개인정보에 대한 접근 제한
            - 개인정보를 처리하는 데이터베이스시스템에 대한 접근권한의 부여, 변경, 말소를 통하여 개인정보에 대한 접근통제를 위하여 필요한 조치를 하고 있으며 침입차단시스템을 이용하여 외부로부터의 무단 접근을 통제하고 있습니다.
            ⑧ 문서보안을 위한 잠금장치 사용
            - 개인정보가 포함된 서류, 보조저장매체 등을 잠금장치가 있는 안전한 장소에 보관하고 있습니다.
            ⑨ 비인가자에 대한 출입 통제
            - 개인정보를 보관하고 있는 물리적 보관 장소를 별도로 두고 이에 대해 출입통제 절차를 수립, 운영하고 있습니다.
            정보주체의 권익침해에 대한 구제 방법
            아래의 기관은 더클랩과는 별개의 기관으로서, 세일즈로그의 자체적인 개인정보 불만 처리, 피해구제 결과에 만족하지 못하시거나 보다 자세한 도움이 필요하시면 문의하여 주시기 바랍니다.  <br />
            <br />
            가. 개인정보 침해신고센터 (한국인터넷진흥원 운영)  <br />
            - 소관 업무 : 개인정보 침해 사실 신고, 상담 신청  <br />
            - 홈페이지 : privacy.kisa.or.kr  <br />
            - 전화 : (국번 없이) 118  <br />
            - 주소 : (58324) 전남 나주시 진흥길 9(빛가람동 301-2) 3층 개인정보 침해신고센터  <br />
            <br />
            나. 개인정보 분쟁조정위원회  <br />
            - 소관업무 : 개인정보 분쟁 조정신청, 집단분쟁 조정 (민사적 해결)  <br />
            - 홈페이지 : www.kopico.go.kr  <br />
            - 전화 : (국번 없이) 1833-6972  <br />
            - 주소 : (03171) 서울특별시 종로구 세종대로 209 정부서울청사 4층  <br />
            다. 대검찰청 사이버수사단 : 02-3280-3573 (www.spo.go.kr)  <br />
            라. 경찰청 사이버안전국 : (국번 없이) 182 (http://cyberbureau.police.go.kr)  <br />
            <br />
            <br />
            시행일 : 2021. 11. 1

            <p style={{ marginBottom: 10 }}></p>
          </div>
          <div>
            주식회사 더클랩(“Saleslog”)에서 운영 및 제공하는 Saleslog 서비스, 웹사이트 또는 모바일 애플리케이션(이하 통칭하여 "서비스")에 오신 것을 환영합니다. 세일즈 협업 툴 Saleslog(이하 “서비스”라 함)는 이용자의 권리 및 의무를 인지할 수 있도록 이용약관(이하 “본 이용약관”이라 함)을 제정했습니다. 귀하는 서비스에 접속 또는 이용함으로써 본 이용약관 및 개인정보 처리방침에 따른 법적 효력을 적용 받는 것에 동의합니다.
            <br />
            <br />
            <p>서비스 설명 및 약관 동의</p>
            본 이용약관에서 사용하는 용어의 정의 및 해석은 다음과 같습니다.
            “서비스”는 이용자가 워크그룹 멤버들과 함께 세일즈 활동과 관련된 정보와 의견을 공유하는 플랫폼, ‘세일즈로그’를 의미합니다.
            “계정”은 세일즈로그를 이용하기 위해 필요한 이메일 주소 및 비밀번호로 구성된 로그인 계정을 의미합니다.
            “포스팅”은 기호, 문자, 소리, 그림, 영상 등으로 구성된 메시지, 사진, 비디오, 파일 또는 링크로써 세일즈로그에 등록한 것을 의미합니다.
            “데이터”는 포스팅, 개인정보 또는 세일즈로그에 제공되는 기타 콘텐츠 또는 정보를 의미합니다. 본 이용약관에서 정의되지 않은 용어의 의미는 개인정보처리방침 상 정의에 따릅니다.
            <br />
            <br />
            <p>  약관 개정</p>

            본 이용약관은 이용자가 쉽게 참고할 수 있도록 게시하며, 회사는 개정 사항이 있는 경우 이를 사전에 이용자에게 고지합니다. 회사는 본 이용약관을 개정할 수 있습니다. 이용약관을 개정할 경우 회사는 개정약관의 효력 발생 7일 이전까지 웹사이트에 약관 개정의 내용, 개정사유, 개정약관의 적용 일자에 대하여 공지사항을 게시할 것입니다. 그러나 이용자에게 불리한 개정 내용이 있는 경우 회사는 개정약관의 적용일자 30일 전에 개정 사항의 내용을 고지 및 웹사이트에 게시할 것입니다.
            이용자가 개정된 약관 내용에 동의하지 않을 경우, 이용자는 서비스 이용을 중단하고 본 이용약관에 따른 이용계약을 해지할 수 있습니다.
            이용자가 개정약관 시행일 이후에도 서비스를 계속 이용할 경우 개정된 내용에 동의한 것으로 간주합니다.
            <br />
            <br />

            <p>계정</p>
            여러분이 서비스를 이용하고자 한다면 우선적으로 계정을 신청해야 합니다. 계정 신청 방법은 본 이용약관에 동의 후 이메일 주소를 제공하고 비밀번호를 설정하는 것으로 할 수 있습니다.
            아래에 해당하는 경우 계정 신청을 거절하거나 승인을 보류할 수 있습니다.
            ① 동일한 이메일 주소의 계정을 회사에서 삭제한 적이 있는 경우
            ② 제3자의 이름, 이메일 주소, 다른 사람의 개인정보로 계정 개설을 시도한 적이 있는 경우
            ③ 계정 신청 절차에서 필수적 정보를 제공하지 않거나 잘못된 정보를 제공하는 경우
            ④ 그 밖에 법적인 또는 정당한 사유가 있는 경우 여러분의 계정 신청을 받아들이지 않을 수 있습니다.
            여러분의 연령이 계정 신청이 가능한 법적 연령(만 14세 이상)에 미달한다면, 계정 신청에 대한 여러분의 부모님 또는 법적 보호자의 동의가 필요합니다. 여러분의 계정 개설 행위가 앞서 말한 계약조건에 위반하는 것으로 판명되면, 회사는 여러분의 서비스 이용을 금지시키거나 즉시 계정을 삭제할 수 있습니다.
            계정은 신청자 본인만 이용할 수 있으며, 다른 사람이 여러분의 계정을 이용하도록 승인하지 않습니다. 이용자는 다른 사람이 계정을 무단으로 이용하는 것을 막기 위하여 비밀번호를 안전하게 관리할 책임이 있습니다. 이용자는 제3자에 의하여 계정이 무단으로 이용되었음을 안 경우 회사에 무단 이용 사실에 대하여 알려야 합니다.
            <br />
            <br />
            <p> 의무와 권리</p>

            서비스를 불법적인 목적으로 사용하면 안됩니다. 회사는 본 이용약관 및 서비스 정책에 따라 개인적이며 양도 불가능 한 비독점적 이용 라이선스를 여러분에게 부여합니다. 회사는 서비스품질 및 이용경험 개선을 위하여 제공 기능(서비스)의 특징이나 기능의 변경 또는 중단할 수 있는 권리를 가집니다.q
            또한, 회사는 서비스를 여러 개로 분할할 수 있고 요금제, 이용자 상태, 등록 정보 또는 회사가 설정한 다른 조건 등에 따라 각 이용자에게 서비스의 전부 또는 일부를 변경하여 제공할 수 있으며, 서비스와 구성 요소(모든 지적재산권)들에 대한 모든 권리와 권원, 이익은 회사가 소유합니다.
            이용자는 적법하고 승인 받은 목적을 위하여만 서비스를 이용할 수 있고, 더클랩이 정한 방식에 위반하여 서비스를 남용할 수 없습니다. 이용자는 회사에 의하여 제공받거나 승인되지 않은 다른 방식을 사용하여 서비스 제공을 방해하거나 서비스에 접속하여서는 안됩니다. 이용자는 서비스 이용자의 정보를 수집, 이용 또는 제공하여서는 안되며, 제3자의 권리 및 이익(저작권을 포함하나 이에 제한되지 아니함)을 침해하거나 공공질서, 법률, 미풍양속에 위반되는 행위나 포스팅을 등록하면 안됩니다. 이용자는 회사의 사전 동의 없이 서비스 및 서비스에 포함된 소프트웨어의 전부 또는 일부를 복제, 변경, 배포, 판매, 이전, 임대, 담보 제공, 타인에 대한 사용 허락을 하면 안됩니다. 이용자는 서비스의 역설계 또는 서비스에 포함된 소프트웨어 소스코드 추출 시도, 서비스의 복제, 분해, 재현, 기타 변경 행위 등을 하면 안됩니다. 이용자가 본 이용약관 및 관련 법령, 회사의 정책을 준수하지 않는 경우 회사는 이를 조사하거나 해당 이용자의 서비스 이용을 일시적 또는 영구적 금지할 수 있습니다.
            <br />
            <br />
            <p> 데이터 사용
            </p>
            서비스의 쾌적한 제공/운영을 위하여 이용자는 이용자가 생성한 정보 및 포스팅 등 데이터를 회사가 사용함에 동의해야 합니다. 회사는 이용자와 멤버들에게 데이터를 제공하기 위하여 전송, 저장 및 복제할 필요가 있고, 이용자가 검색할 수 있도록 데이터에 색인 할 필요가 있으며 이용자의 사용 중단 및 탈퇴 후에도 다른 멤버의 원활한 서비스 이용과 서비스의 개선 및 개발 등을 위하여 데이터 사용 동의는 존속됩니다.
            서비스에서 제공하는 정보는 다른 이용자나 단체 등이 생성한 정보를 포함하며, 회사는 다른 이용자나 단체 등이 생성한 정보에 대하여 책임을 부담하지 않습니다.
            <br />
            <br />
            <p> 정보 수집 및 이용</p>

            회사는 이용자에게 더 나은 서비스 제공을 위하여 정보를 수집 및 이용할 수 있습니다.
            회사는 서비스 데이터와 관련 기술 및 운영 성과와 관련한 정보를 수집, 이용 및 분석할 수 있고, 그것을 사업적으로 이용하거나 사업과 관련하여 통계적 또는 식별불가능한 형태로 공개할 수 있습니다.
            <br />
            <br />
            <p>비용</p>

            이용자는 서비스의 유료 플랜을 신청할 수 있습니다. 신청한 유료 플랜에 맞게 이용료가 부과되며, 이용료는 선불로 결제됩니다. 미납액이 발생하는 경우 여러분에게 납부 의무가 있으며 30일 이상 미납이 지속될 경우 서비스에 제한이 있을 수 있습니다.
            <br />
            <br />
            <p> 탈퇴</p>

            이용자는 언제든지 서비스에서 탈퇴할 수 있습니다. 이용자가 더 이상 서비스 이용을 원하지 않는 경우, 이용자는 언제든지 서비스에서 탈퇴할 수 있습니다. 유료 플랜 이용자의 경우 계약 기간까지 선불 결제된 비용은 환불되지 않습니다. 탈퇴가 아닌 계약의 해지는 결제 관리 메뉴에서 직접 설정해주셔야 처리됩니다.
            <br />
            <br />
            <p>서비스 중단
            </p>
            회사는 365일 쉬지 않고 서비스를 중단없이 쾌적한 상태로 제공하고자 노력합니다. 그러나 유지보수 또는 그 밖에 피할 수 없는 원인(불가항력적 사건)으로 인하여 정기적 또는 일시적으로 서비스 이용이 제한될 수 있습니다. 이러한 경우 회사는 상황이 허락하는 한 최선을 다하여 이용자에게 미리 고지하고 쾌적한 이용을 위하여 노력하겠습니다. 관련하여 회사는 본 이용약관에 규정되지 않은 내용은 이용자에게 보증하지 않으며, 서비스 이용 관련으로 이용자에게 발생하는 질병 및 상해, 제3자에 의한 이용자 계정 도용과 승인되지 않은 접속을 원인으로 발생한 손해, 제3자에 의한 서비스의 방해 또는 중단을 원인으로 발생한 손해, 제3자에 의한 버그, 바이러스, 트로이목마, 기타 유사한 것 등의 전송을 원인으로 발생한 손해, 데이터의 누락 또는 파손을 원인으로 발생한 손해, 제3자의 서비스 이용 과정에서 이용자에게 발생한 손해(명예훼손을 포함하며 이에 제한되지 아니함)에 대하여 어떠한 책임도 부담하지 않습니다.
            <br />
            <br />
            <p> 연락처</p>
            <br />
            세일즈로그 팀은 다양한 의견과 제안을 환영합니다. 협업 등 제안 뿐 아니라 본 이용약관에 위배되는 의심 행위를 알고 있거나 의심되는 경우 support@theklab.co 로 연락해주세요. 우리 팀도 이용자의 계정 이메일 주소로 세일즈로그 업데이트 정보와 함께 세일즈 활동에 필요한 정보와 혜택 등을 제공합니다.
            <br />
            <br />
            <p> 준거법 및 관할 법원
            </p>
            서비스에 대한 일체의 행위는 대한민국 법에 의하며, 관할 법원은 서울중앙지방법원으로 합니다.

            <br />
            <br />
            공포일: 2021. 10. 1
            <br />
            시행일: 2021. 11. 1
            <p style={{ marginBottom: 10 }}></p>
          </div>
        </ModalBody>
        <ModalFooter>
          <Button color="dark" onClick={toggle}>확인</Button>{' '}
        </ModalFooter>
      </Modal>
    </>
  );
}

export default (SignUpModal);