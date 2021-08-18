import React from 'react';
import ChatBot from 'react-simple-chatbot';
import Post from 'components/chatbot/Post';
import Registration from 'components/chatbot/Post';

import Button from 'components/chatbot/Button';
import AuthNumberCheck from 'components/chatbot/AuthNumberCheck';
import AuthNumberValid from 'components/chatbot/AuthNumberValid';
import { regex } from 'constants/regex';
import { postAuthNumber } from 'redux/actions'
import { ThemeProvider } from 'styled-components';
import { connect } from 'react-redux'


const SimpleForm = (props) => {

  const theme = {
    background: '#f5f8fb',
    fontFamily: 'Helvetica Neue',
    headerBgColor: '#1203B5',
    headerFontColor: 'yellow',
    headerFontSize: '15px',
    botBubbleColor: '#DOCFDD',
    botFontColor: '#4a4a4a',
    userBubbleColor: '#fff',
    userFontColor: '#4a4a4a',
  }

  const config = {
    width: '100%',
    height: '100vh'
  }

  const hidePassword = (d) => {
    let length = 8;

    if (d.value) length = d.value.length;

    let x = "*****************************";
    let stars = x.substr(0, length);

    let password_user = document.getElementsByClassName("rsc-ts-user");
    if (password_user) password_user = password_user[password_user.length - 1];
    if (password_user) {
      password_user = password_user.childNodes[1];
      if (password_user) password_user.innerHTML = stars;
    }
  };

  const getAuthNumber = () => {
    if (props.authNumberResponse) {
      const AuthNumber = props.authNumberResponse;
      return AuthNumber;
    }
  }

  return (
    <>
      <ThemeProvider theme={theme}>
        <ChatBot
          steps={[
            {
              id: '1',
              message: '반갑습니다. 세일즈로그 멤버십 센터입니다.:) ',
              trigger: 'introduction',
            },
            {
              id: 'introduction',
              message: '제가 이름을 뭐라고 부르면 좋을까요? 이름을 알려주세요.',
              trigger: 'name',

            },
            {
              id: 'name',
              user: true,
              trigger: (input) => {
                console.log(input)
                return '2';
              }
            },
            {
              id: '2',
              message: '{previousValue}!님 세일즈로그 아이디로 사용하실 이메일 주소를 입력해주세요.',
              trigger: 'email',
            },
            {
              id: 'email',
              user: true,
              validator: (value) => {
                if (!(new RegExp(regex.email).exec(value))) {
                  return '이메일 형식이 잘못되었습니다.';
                }
                return true;
              },
              trigger: (input) => {
                // const email = input.value
                // props.postAuthNumber(email)
                return '3'
              }
            },
            {
              id: '3',
              component: <Post />,
              // message: '인증번호를 보내드렸어요 인증번호를 입력해주세요.',
              trigger: 'authnumber'
            },
            {
              id: 'authnumber',
              user: true,
              // trigger: (input) => {
              //   const AuthNumber = getAuthNumber();
              //   console.log(AuthNumber);
              //   if (Number(input) === AuthNumber) {
              //     return '4'
              //   } else if (Number(input) !== AuthNumber) {
              //     return 'authnumber_valid'
              //   }

              // }
              trigger: 'authnumber_check'
            },
            {
              id: 'authnumber_check',
              component: <AuthNumberCheck />,
              trigger: 'authnumber_valid',
            },
            {
              id: 'authnumber_valid',
              options: [
                { value: 'true', label: '인증성공', trigger: '4' },
                { value: 'false', label: '다시입력', trigger: 'authnumber' },
                { value: 'retry', label: '인증번호 재발급', trigger: '3' }
              ]
            },
            {
              id: '4',
              message: '사용하실 비밀번호를 입력해주세요. ',
              trigger: 'password',

            },
            {
              id: "password",
              user: true,
              trigger: ({ value, trigger }) => {
                hidePassword({ value, trigger });
                return "5";
              },
              inputAttributes: {
                type: "password",
              },
              placeholder: "특수문자 포함 8자 이상으로 입력해주세요.",
              validator: (value) => {
                if (value.trim().length < 8) {
                  return "비밀번호는 8자 이상으로 입력해야 합니다. ";
                } else if (value.trim().length > 20) {
                  return "비밀번호는 20자 이하로 입력해야 합니다. ";
                } else if (!(new RegExp(regex.password).exec(value))) {
                  return '비밀번호 형식이 잘못되었습니다.';
                }
                return true;
              },
            },
            {
              id: '5',
              message: '비밀번호를 한 번 더 입력해주세요.',
              trigger: 'passwordcheck',

            },
            {
              id: "passwordcheck",
              user: true,
              trigger: ({ value, steps }) => {
                hidePassword({ value, steps });
                // console.log(steps);
                if (value !== steps.password.value) {
                  return 'passwordcheck'
                }
                return "6";
              },
              inputAttributes: {
                type: "password",
              },
              placeholder: "특수문자 포함 8자 이상으로 입력해주세요.",
              validator: (value) => {
                if (value.trim().length < 8) {
                  return "비밀번호는 8자 이상으로 입력해야 합니다. ";
                } else if (value.trim().length > 20) {
                  return "비밀번호는 20자 이하로 입력해야 합니다. ";
                }
                return true;
              },
            },
            {
              id: '6',
              message: '마지막으로 조직 생성을 진행합니다. 사용하실 조직(회사)명을 입력해주세요.',
              trigger: 'organization'
            },
            {
              id: 'organization',
              user: true,
              trigger: '7'
            },
            {
              id: '7',
              message: '조직명의 계정 접속에 사용할 도메인을 입력해주세요.',
              trigger: 'domain'
            },
            {
              id: 'domain',
              message: '조직 도메인은 변경할 수 없으니 정확히 입력해주세요. www.도메인.saleslog.co',
              trigger: 'domain_check'
            },
            {
              id: 'domain_check',
              user: true,
              trigger: '8'
            },
            {
              id: '8',
              // message: '회원가입 되었습니다. 감사합니다.',
              component: <Registration />,
              trigger: 'end-message'
            },
            {
              id: 'end-message',
              component: <Button />,
              // message: '세일즈로그에 회원가입 되었습니다. 감사합니다.',
              end: true,
            },
          ]}
          {...config}
          placeholder='메시지를 입력해 주세요.'
          headerTitle='세일즈로그 회원가입'
        // bubbleStyle={{ color: 'yellow' }}
        // botAvatar='assets/images/avatar.png'
        // hideBotAvatar='true'
        // cache={true}
        />
      </ThemeProvider>
    </>
  );
}

const mapStateToProps = (state) => {
  const { authNumberResponse, authNumberError } = state.Auth;
  return { authNumberResponse, authNumberError };
}

const dispatchToProps = {
  postAuthNumber: postAuthNumber.call
}

export default connect(mapStateToProps, dispatchToProps)(SimpleForm);

// const Review = (props) => {
//   const [state, setState] = useState({ name: '', email: '', authnumber: '', passwordcheck: '', organization: '', domain: '' });


//   useEffect(() => {
//     const { steps } = props;
//     const { name, email, organization, domain } = steps;
//     setState({ name, email, organization, domain });
//   }, [props])


//   const { name, email, organization, domain } = state;
//   return (
//     <div style={{ width: '100%' }}>
//       <h3>Summary</h3>
//       <table>
//         <tbody>
//           <tr>
//             <td>Name</td>
//             <td>{name.value}</td>
//           </tr>
//           <tr>
//             <td>Email</td>
//             <td>{email.value}</td>
//           </tr>
//           <tr>
//             <td>Oraganization</td>
//             <td>{organization.value}</td>
//           </tr>
//           <tr>
//             <td>Domain</td>
//             <td>{domain.value}</td>
//           </tr>
//         </tbody>
//       </table>
//     </div>
//   );
// }

// Review.propTypes = {
//   steps: PropTypes.object,
// };

// Review.defaultProps = {
//   steps: undefined,
// };

// validator: (value) => {
//   if (isNaN(value)) {
//     return '인증번호는 숫자여야 합니다.';
//   } else if (value > 9999) {
//     return `${value}? 인증번호는 4자리 입니다. 다시입력해주세요.`;
//   } else if (value !== `${props.authNumberResponse}`) {
//     return '인증번호가 틀렸습니다. 다시입력해주세요.';
//   }
//   return true;
// },