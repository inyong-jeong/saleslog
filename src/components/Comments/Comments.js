import React, { useState, useEffect } from 'react'
import { Button, Input, Collapse, Divider } from 'antd';
import { useSelector } from 'react-redux';
import SingleComment from 'components/Comments//SingleComment';
import ReplyComment from 'components/Comments//ReplyComment';
import { connect } from 'react-redux';
import { postComment } from 'redux/actions';
import { ReactComponent as FeedbackIcon } from 'assets/icons/main/feedback.svg'

const { Panel } = Collapse;

const { TextArea } = Input;


function Comments(props) {
  const [Comment, setComment] = useState("")

  const handleChange = (e) => {
    setComment(e.currentTarget.value)
  }

  const onSubmit = (e) => {
    e.preventDefault();
    const data = {
      slog_idx: props.postId,
      note: Comment,
      parent_idx: 0
    }
    props.postComment(data)
    setComment('')
  }

  return (
    <>
      <Collapse defaultActiveKey={['1']} ghost>
        <Panel header={<div className='feedback mt-1' style={{ display: 'inline-block' }}><span style={{ verticalAlign: 'middle' }}><FeedbackIcon /> 피드백 {props.CommentLists.length}개</span></div>} key="1">
          {props.CommentLists && props.CommentLists.map((comment, index) => (
            (!comment.parent_idx &&
              <React.Fragment>
                <SingleComment key={comment.fd_idx} comment={comment} postId={props.postId} idx={comment.fd_idx} refreshFunction={props.refreshFunction} />
                <ReplyComment key={index} CommentLists={props.CommentLists} postId={props.postId} parentCommentId={comment.fd_idx} refreshFunction={props.refreshFunction} />
                <Divider />
              </React.Fragment>
            )
          ))}

          <form style={{ display: 'flex' }} onSubmit={onSubmit}>
            <TextArea
              style={{ width: '100%', borderRadius: '5px' }}
              onChange={handleChange}
              value={Comment}
              placeholder="피드백 남기기"
            />
            <br />
            <Button style={{ width: '20%', height: '52px', backgroundColor: 'black', color: 'white' }} onClick={onSubmit}>게시</Button>
          </form>
        </Panel>
      </Collapse>
      {/* <br />
      <p> 피드백 {props.CommentLists.length}개 보기</p>
      <hr /> */}
    </>
  )
}

const mapStateToProps = (state) => {
  const { comment } = state.SalesLog;
  return { comment };
};
const mapStateToDispatch = {
  postComment: postComment.call,
}

export default connect(mapStateToProps, mapStateToDispatch)(Comments);

