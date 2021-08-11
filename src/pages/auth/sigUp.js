import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import ChatBot from 'react-simple-chatbot';

const Review = (props) => {
  const [state, setState] = useState({ name: '', gender: '', age: '' });

  useEffect(() => {
    const { steps } = props;
    const { name, gender, age } = steps;
    setState({ name, gender, age });
  }, [props])

  const { name, gender, age } = state;
  return (
    <div style={{ width: '100%' }}>
      <h3>Summary</h3>
      <table>
        <tbody>
          <tr>
            <td>Name</td>
            <td>{name.value}</td>
          </tr>
          <tr>
            <td>Gender</td>
            <td>{gender.value}</td>
          </tr>
          <tr>
            <td>Age</td>
            <td>{age.value}</td>
          </tr>
        </tbody>
      </table>
    </div>
  );
}

Review.propTypes = {
  steps: PropTypes.object,
};

Review.defaultProps = {
  steps: undefined,
};

const SimpleForm = () => {

  console.log(1)
  return (
    <ChatBot
      steps={[
        {
          id: '1',
          message: '안녕하세요 세일즈로그에 오신 것을 환영합니다. 서비스이용을 위해 이메일을 입력해주세요.',
          trigger: 'name',
        },
        {
          id: 'name',
          user: true,
          trigger: '3',
        },
        {
          id: '3',
          message: '안녕하세욧 {previousValue}!님  비밀번호를 입력해주세요',
          trigger: 'gender',
        },
        {
          id: 'gender',
          options: [
            { value: 'male', label: 'Male', trigger: '5' },
            { value: 'female', label: 'Female', trigger: '5' },
          ],
        },
        {
          id: '5',
          message: '몇살이에요?',
          trigger: 'age',
        },
        {
          id: 'age',
          user: true,
          trigger: '7',
          validator: (value) => {
            if (isNaN(value)) {
              return 'value must be a number';
            } else if (value < 0) {
              return 'value must be positive';
            } else if (value > 120) {
              return `${value}? Come on!`;
            }

            return true;
          },
        },
        {
          id: '7',
          message: '틀린 정보가 있는지 확인하여 주세요',
          trigger: 'review',
        },
        {
          id: 'review',
          component: <Review />,
          asMessage: true,
          trigger: 'update',
        },
        {
          id: 'update',
          message: '수정하는 것을 원하시나요??',
          trigger: 'update-question',
        },
        {
          id: 'update-question',
          options: [
            { value: 'yes', label: 'Yes', trigger: 'update-yes' },
            { value: 'no', label: 'No', trigger: 'end-message' },
          ],
        },
        {
          id: 'update-yes',
          message: '수정하고있은 정보가 무엇입니까?',
          trigger: 'update-fields',
        },
        {
          id: 'update-fields',
          options: [
            { value: 'name', label: 'Name', trigger: 'update-name' },
            { value: 'gender', label: 'Gender', trigger: 'update-gender' },
            { value: 'age', label: 'Age', trigger: 'update-age' },
          ],
        },
        {
          id: 'update-name',
          update: 'name',
          trigger: '7',
        },
        {
          id: 'update-gender',
          update: 'gender',
          trigger: '7',
        },
        {
          id: 'update-age',
          update: 'age',
          trigger: '7',
        },
        {
          id: 'end-message',
          message: '세일즈로그에 회원가입 되었습니다. 감사합니다.',
          end: true,
        },
      ]}
    />
  );

}

export default SimpleForm;