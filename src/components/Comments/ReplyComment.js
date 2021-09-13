import React, { useEffect, useState } from 'react'
import SingleComment from './SingleComment';

function ReplyComment(props) {

  const [ChildCommentNumber, setChildCommentNumber] = useState(0)
  const [OpenReplyComments, setOpenReplyComments] = useState(false)
  useEffect(() => {

    let commentNumber = 0;
    props.CommentLists.map((comment) => {

      if (comment.parent_idx === props.parentCommentId) {
        commentNumber++
      }
    })
    setChildCommentNumber(commentNumber)
  }, [props.CommentLists, props.parentCommentId])


  let renderReplyComment = (parentCommentId) =>
    props.CommentLists.map((comment, index) => (
      <React.Fragment>
        {comment.parent_idx === parentCommentId &&
          <div style={{ width: '80%', marginLeft: '40px' }}>
            <SingleComment key={comment.fd_idx} comment={comment} postId={props.postId} idx={comment.fd_idx} refreshFunction={props.refreshFunction} />
            <ReplyComment key={comment.cre_id} CommentLists={props.CommentLists} parentCommentId={comment.fd_idx} postId={props.postId} refreshFunction={props.refreshFunction} />
          </div>
        }
      </React.Fragment>
    ))

  const handleChange = () => {
    setOpenReplyComments(!OpenReplyComments)
  }


  return (
    <div>

      {ChildCommentNumber > 0 &&
        <p style={{ fontSize: '14px', margin: 0, color: 'gray', cursor: 'pointer' }}
          onClick={handleChange} >
          답글 {ChildCommentNumber}개 더보기
        </p>
      }

      {OpenReplyComments &&
        renderReplyComment(props.parentCommentId)
      }

    </div>
  )
}

export default ReplyComment
