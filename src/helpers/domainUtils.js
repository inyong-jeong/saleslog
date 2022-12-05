import React from 'react';

/**
Check Browser Type
 IE, Safari, Chrome, FireFox, Edge, 
**/
export const isBrowser = (browser) => {
  const isIE = /*@cc_on!@*/false || !!document.documentMode;
  if (browser === 'IE')
    return isIE;
}

export const parseOrganization = (email) => {
  if (window.location.host.match(/[A-z0-9]+.saleslog.co/)) {
    return window.location.host.split('.')[0];
  } else if (!email) {
    return "theklab";
  } else {
    // for localhost only
    return email.split('@')[1].split('.')[0];
  }
}

export const getCi = () => {
  if (window.location.host.match(/[A-z0-9]+.saleslog.co/)) {
    return "/images/common/" + window.location.host.split('.')[0] + '.png';
  } else {
    return "/images/common/logo.png";
  }
}

export const isLearningLogAvailable = (organization) => {
  const whiteList = ['lsmetal', 'theklab'];
  for (const list of whiteList)
    if (list === organization)
      return true;
  return false;
}

export const checkDevelopmentMode = () => {
  return '_self' in React.createElement('div');
}