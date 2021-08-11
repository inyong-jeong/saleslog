import React from 'react';

function ChatList(props) {
  let priorCommentsUser = '';
  let chatList = [];
  props.chatList.map((v) => {
      if (v.type === 'divider') {
        chatList.push(
          <div className="divider">
            <div className="line"></div>
            <span className="date">{v.note}</span>
           </div>
        );
      } else if (v.commenter_id === props.userId) {
        chatList.push(
            <li key={v.comment_id} id={v.comment_id} className={"clearifx " + (priorCommentsUser === v.user_id ? "next" : "")}>
                <div className="message-wrap pop-out">
                    <p>{v.note}</p>
                </div>
            </li>
        );
      } else {
        chatList.push(
        <React.Fragment>
            <li key={v.comment_id} id={v.comment_id} className={"clearifx odd " + (priorCommentsUser === v.user_id ? "next" : "")}>
                <p className="user-name">{v.user_name}</p>
                <div className="message-wrap pop-out">
                    <p className="text-dark">{v.note}</p>
                </div>
            </li>
        </React.Fragment>);
      }
      priorCommentsUser = v.user_id;
      return 0;
  });

  return (
    <React.Fragment>
      <div className="">
        <div className="chat-list">
          {chatList}
        </div>
      </div>
    </React.Fragment>
  );
}

export default ChatList;