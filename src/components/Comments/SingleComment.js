import React, { useState, useEffect } from 'react'
import { Comment, Avatar, Button, Input } from 'antd';
import { connect } from 'react-redux';
import { postComment, deleteComment, putComment, getprofile } from 'redux/actions';
import { LaptopWindowsOutlined } from '@material-ui/icons';
import cmm from 'constants/common';
import moment from 'moment';


const { TextArea } = Input;

function SingleComment(props) {
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
    setOpenReply(!OpenReply)

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
    <>{props.comment.upd_yn === 'Y' && <span onClick={OnChange} key="comment-basic-delete-to">수정 </span>}</>,
    <>{props.comment.del_yn === 'Y' && <span onClick={OnDelete} key="comment-basic-delete-to">삭제 </span>}</>,
  ]

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
        author={<div>{props.comment.user_name} {props.comment.title}</div>}
        avatar={
          <Avatar
            src={cmm.SERVER_API_URL + cmm.FILE_PATH_PHOTOS + props.comment.thumb_url}
            alt="image"
          />
        }
        content={

          openchange ?
            <>
              <input style={{ border: '1px solid #9d9d9d' }} type='text' value={CommentChangeValue} onChange={handleOnChange} />
              <button className='comment_submit' style={{ color: 'white', backgroundColor: 'black', border: 'none', height: '25.63px' }} onClick={handleOnSubmit}>변경</button>
            </> :
            <p>
              {props.comment.note}
            </p>
        }
        datetime={moment(props.comment.cre_dt).format('YYYY-MM-DD HH:mm')}
      ></Comment>


      {OpenReply &&
        <form style={{ display: 'flex' }} onSubmit={onSubmit}>
          <TextArea
            style={{ width: '100%', borderRadius: '5px' }}
            onChange={handleChange}
            value={CommentValue}
            placeholder="답글 남기기"
          />
          <br />
          <Button style={{ width: '20%', height: '52px', backgroundColor: 'black', color: 'white' }} onClick={onSubmit}>게시</Button>
        </form>
      }

    </div>
  )
}


const mapStateToProps = (state) => {
  const { commentdelete, commentres } = state.SalesLog;
  const { profileinformation } = state.Profile;

  return { commentdelete, profileinformation, commentres };
};
const mapStateToDispatch = {
  deleteComment: deleteComment.call,
  postComment: postComment.call,
  putComment: putComment.call,
  // getprofile: getprofile.call

}

export default connect(mapStateToProps, mapStateToDispatch)(SingleComment);


