import React from 'react';

function Footer() {
  return (
    <footer id="footer" className="wide-40 footer division">
      <div className="container">
        <div className="row justify-content-between">
          <div className="col">
            <a href="https://theklab.co/privacy">개인정보처리방침</a>
            &nbsp;&nbsp; | &nbsp;&nbsp;
            <a href="https://theklab.co/contact">제휴 및 문의</a>
            &nbsp;&nbsp; | &nbsp;&nbsp;
            <a href="https://theklab.co/termofuse">이용 약관</a>
            &nbsp;&nbsp; | &nbsp;&nbsp;
            <a href="https://theklab.co/about">회사 소개</a>
          </div>
          <div className="col">
            <div className="footer-socials-links">
              <ul className="foo-socials text-right clearfix">
                <li key="id1">
                  <a href="https://www.facebook.com/theklab" className="ico-facebook mr-2"><i className="fab fa-facebook-f"></i></a>
                  <a href="https://blog.naver.com/saleslog" className="ico-facebook"><i className="fas fa-blog"></i></a>
                </li>
              </ul>
            </div>
          </div>
        </div>
        <div className="bottom-footer">
          <div className="row justify-content-between">
            <div className="col-md-6">
              <div>
                <small>주식회사 더클랩, 서울특별시 용산구 청파로 101 나진상가 10동 101호<br /></small>
              </div>
              <div>
                <small>사업자등록번호: 615-86-17501</small>
              </div>
              <div>
                <small>통신판매업신고번호: 2020-서울강남-03477</small>
              </div>
              <div>
                <small>대표전화: 02-6166-0100</small>
              </div>
              <div>
                <small>CopyRight 2021 THEKLAB CORP.ALRIGHT RESERVED</small>
              </div>
            </div>
            <div className="col-md-6 text-right">
              <a href="https://theklab.co">
                <img src="images/common/foot_logo.png" width="142" alt="theklab logo" />
              </a>
            </div>
          </div>
        </div>


      </div>
    </footer>
  );
}

export default Footer;
