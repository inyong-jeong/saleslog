const Standard = {

  fontSizes: {
    Header: '20px',
    title: '16px',
    subtitle: '12px',
    paragraph: '8px',
  },

  root: {
    margin: '10px',
    padding: '10px'
  },

  colors: {
    blue: "#1203B5",
    darkblue: "#0A0173",
    middleblue: "#180D8E",
    grey: "#666666",
    lightgrey: "#AAAAAA",
    darkgrey: "#333333",
    black: "#0F1635",
    white: "#ffffff"
  },

  size: {
    width: '343px',
    middlewidth: '224px',
    halfwidth: '168px',
    quarterwidth: '112px',
    height: '48px',
    halfhight: '28px'
  },

  common: {
    flexCenter: `
      display: flex;
      justify-contents: center;
      align-items: center;
    `,
    flexCenterColumn: `
      display: flex;
      flex-direction: column;
      justify-contents: center;
      align-items: center;
    `,
  },

  fontWeights: {
    bold: 700,
    semibold: 600,
    regular: 400
  },

  animation: {
    duration: '300ms'
  }
}

export default Standard;