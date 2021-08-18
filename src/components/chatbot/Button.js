import React from 'react';
import { withRouter } from 'react-router-dom';

const Post = (props) => {

  const { steps } = props;

  console.log(steps);

  const handleOnClick = () => {
    props.history.push('/signin')
  }
  return (
    <div>
      <button onClick={handleOnClick}>세일즈로그 이용하기</button>
    </div>
  )

}

export default withRouter(Post);