import React from 'react';
import { connect } from 'react-redux';
import { authorizeRequest } from 'redux/actions';
import Header from 'components/landing/Header';
import HeroSection from 'components/landing/HeroSection';
import BenefitSection from 'components/landing/BenefitSection';
import FeatureSection from 'components/landing/FeatureSection';
import LearningLogSection from 'components/landing/LearningLogSection';
import PricingSection from 'components/landing/PricingSection';
import DownloadSection from 'components/landing/DownloadSection';
import Footer from 'components/landing/Footer';

function Landing(props) {

  const onSignInClick = (e) => {
    e.preventDefault();
    // props.authorizeRequest();
    props.history.push('/signin')
  }

  const onSignUpClick = (e) => {
    e.preventDefault();
    window.location.href = 'https://sso.theklab.co/signup/policy';
  }

  return (
    <React.Fragment>
      <div id="landing">
        <Header onSignInClick={onSignInClick} onSignUpClick={onSignUpClick} />
        <HeroSection onSignInClick={onSignInClick} />
        <BenefitSection />
        <FeatureSection />
        <LearningLogSection />
        <PricingSection />
        <DownloadSection />
        <Footer />
      </div>
    </React.Fragment>
  );
}

export default connect(null, { authorizeRequest })(Landing);