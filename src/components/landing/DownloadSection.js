import React from 'react';

function DownloadSection(props) {
  return (
    <section id="download" className="bg-primary cta-section wide-60">
      <div className=" cta-3-content division">
        <div className="container white-color">
          <div className="row d-flex align-items-center">
            <div className="col-md-6">
              <div className="cta-txt pc-45">
                <h3 className="h3-lg text-white">지금 무료로 다운로드!</h3>
                <div className="mt-4">
                  <a href="https://www.apple.com/kr/app-store/" className="store">
                    <img className="appstore-white" width="140" src="images/common/appstore-tra-white.png" alt="appstore link" />
                  </a>
                  <a href="https://play.google.com/store/apps/details?id=com.saleslog" className="store ml-2">
                    <img className="googleplay-white" width="140" src="images/common/googleplay-tra-white.png" alt="playstore link" />
                  </a>
                </div>
              </div>
            </div>
            <div className="col-md-6">
              <div className="cta-3-img text-center pr-45">
                <img className="img-fluid" src="images/common/download.png" alt="download img" />
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default DownloadSection;