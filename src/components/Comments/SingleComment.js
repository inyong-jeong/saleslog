import React, { useState, useEffect } from 'react'
import { Comment, Avatar, Button, Input } from 'antd';
import Axios from 'axios';
import { useSelector } from 'react-redux';
import { connect } from 'react-redux';
import { postComment, deleteComment, putComment } from 'redux/actions';
import { Label } from 'reactstrap';

const { TextArea } = Input;
function SingleComment(props) {
  const user = useSelector(state => state.user);
  const [CommentValue, setCommentValue] = useState("")
  const [CommentChangeValue, setCommentChangeValue] = useState(props.comment.note)

  const [OpenReply, setOpenReply] = useState(false)
  const [openchange, setOpenChange] = useState(false);
  const handleChange = (e) => {
    setCommentValue(e.currentTarget.value)
  }

  const openReply = () => {
    setOpenReply(!OpenReply)
  }

  const onSubmit = (e) => {
    e.preventDefault();
    const data = {
      slog_idx: props.postId,
      note: CommentValue,
      parent_idx: props.idx
    }
    props.postComment(data)
  }

  const OnDelete = () => {
    const body = {
      fd_idx: props.idx
    }
    props.deleteComment(body)
  }

  const OnChange = () => {

    setOpenChange(!openchange)
  }

  const actions = [
    <span onClick={openReply} key="comment-basic-reply-to">답글달기 </span>,
    <span onClick={OnChange} key="comment-basic-delete-to">수정 </span>,
    <span onClick={OnDelete} key="comment-basic-delete-to">삭제 </span>,

  ]

  useEffect(() => {
    if (props.commentdelete) {

    }
  }, [props.commentdelete])

  const handleOnChange = (e) => {
    e.preventDefault();
    setCommentChangeValue(e.target.value);
  }


  const handleOnSubmit = () => {
    const body = {
      fd_idx: props.idx,
      note: CommentChangeValue
    }
    props.putComment(body)
    setOpenChange(!openchange)
  }
  return (
    <div>

      <Comment
        key={props.idx}
        actions={actions}
        author={props.comment.user_name}
        avatar={
          <Avatar
            src={props.comment.thumb_url}
            alt="image"
          />
        }
        content={

          openchange ?
            <>
              <input type='text' value={CommentChangeValue} onChange={handleOnChange} />
              <button onClick={handleOnSubmit}>변경</button>
            </> :
            <p>
              {props.comment.note}
            </p>
        }
        datetime={props.comment.cre_dt}
      ></Comment>


      {OpenReply &&
        <form style={{ display: 'flex' }} onSubmit={onSubmit}>
          <TextArea
            style={{ width: '100%', borderRadius: '5px' }}
            onChange={handleChange}
            value={CommentValue}
            placeholder="피드백 남기기"
          />
          <br />
          <Button style={{ width: '20%', height: '52px' }} onClick={onSubmit}>제출</Button>
        </form>
      }

    </div>
  )
}


const mapStateToProps = (state) => {
  const { commentdelete } = state.SalesLog;
  return { commentdelete };
};
const mapStateToDispatch = {
  deleteComment: deleteComment.call,
  postComment: postComment.call,
  putComment: putComment.call

}

export default connect(mapStateToProps, mapStateToDispatch)(SingleComment);


