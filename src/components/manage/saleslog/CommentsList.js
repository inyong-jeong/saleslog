import React, { useState } from 'react';
import { Spinner } from 'reactstrap';
import ChatList from 'components/ChatList';
import ProfileThumbnail from 'components/ProfileThumbnail';


export default function CommentsList(props) {
    const [commentInput, setCommentInput] = useState("");

    const handleSubmitClick = () => {
        props.handleSubmitClick(commentInput);
    }

	return (
		<React.Fragment>
			<div className="row">
                <div className="col-12">
                    <div className="">
                        <ChatList chatList={props.commentsList} userId={props.user.user_id}/>
                    </div>
                </div>
                <div className="col-12">
                    <div className="row d-flex align-items-center">
                        <ProfileThumbnail size={55} className="col-sm-auto" />
                        <input className="form-control col ml-2 mr-2" type="text" value={commentInput} onChange={(e) =>  setCommentInput(e.target.value) } name="" placeholder="피드백 댓글 추가하기" />
                        <button className="btn btn-primary col-auto" onClick={() => handleSubmitClick()}>추가</button>
                    </div>
                </div>
                {props.error && <p className="text-danger" style={{padding: '12px 120px 12px 55px'}}>{props.error}</p>}
            </div>
            {props.commentLoading && <div style={{width: '100%', textAlign: 'center'}}><Spinner style={{display: 'inline-block'}}color="primary"/></div>}            
		</React.Fragment>
	);
}