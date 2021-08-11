import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import { getNotifications, getEntityNotifications } from "redux/actions";
import Card from 'components/Card';
import ListCard from 'components/ListCard';
import ChatList from 'components/ChatList';

function Notifications(props) {
  const [selectedNoti, setSelectedNoti] = useState();
  const [chatList, setChatList] = useState([]);

  const mapper = (v) => {
    return {
      id: v.noti_id,
      title: v.note
    };
  }

  const onNotiClick = (index) => {
    setSelectedNoti(index);
    props.getEntityNotifications(props.notifications[index].entity_id);
  };

  useEffect(() => {
    setChatList(props.entityNoti);
  }, [props.entityNoti]);

  return (
    <React.Fragment>
      <div className="container">
        <div className="row">
          <div className="col-12">
            <h4 className="page-title" style={{lineHeight: '75px'}}>알림페이지</h4>
          </div>          
        </div>  
        <div className="row">
          <div className="col-4">
            <ListCard title="최근 알림" contents={props.notifications} mapper={mapper} onClick={onNotiClick} />
          </div>
          <div className="col-8">
            <Card title="알림 상세" style={{height: '600px'}}>
              {selectedNoti !== undefined ? 
                <ChatList chatList={chatList} userId={props.user.user_id}/> :
                <div className="text-center">
                  알림을 선택하세요
                </div>
              }
            </Card>
          </div>        
        </div>      
      </div>
    </React.Fragment>
  );
}

const mapStateToProps = (state) => {
  const { notifications, entityNoti } = state.Notification;
  const { user } = state.User;
  return { notifications, user, entityNoti };
}

const dispatchToProps = {
  getNotifications: getNotifications.call,
  getEntityNotifications: getEntityNotifications.call
}

export default connect(mapStateToProps, dispatchToProps)(Notifications);