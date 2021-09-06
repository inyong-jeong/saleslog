import React, { useState, useEffect } from 'react';
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';
import { connect } from 'react-redux';
import { getTemporaryLogLists, getTemporaryLogList, deleteTemporaryLogList } from 'redux/actions';
import { withRouter } from 'react-router-dom';
// import { Checkbox, Divider } from 'antd'

const LogListModal = (props) => {
  const {
    buttonLabel,
    className
  } = props;
  const [editbutton, setEditButton] = useState(false);
  const [modal, setModal] = useState(false);
  const toggle = () => {
    setModal(!modal)
    setEditButton(false);
  };
  const handleOnClick = () => {
    setModal(!modal);
  }
  const EditContent = (e) => {
    setEditButton(true);
  }

  const getLogList = (stemp_idx) => {
    const data = {
      stemp_idx: stemp_idx
    }
    props.history.push(`/main/upload/${stemp_idx}`)
    setModal(!modal);
    props.getTemporaryLogList(data)
  }

  const deleteLogList = (stemp_idx) => {
    const data = {
      stemp_idx: stemp_idx
    }
    props.deleteTemporaryLogList(data)
  }

  useEffect(() => {
    props.getTemporaryLogLists();
  }, [])

  useEffect(() => {
    props.getTemporaryLogLists();
  }, [props.deletetemporaryLogresponse])
  return (
    <div>
      <label color="primary" onClick={handleOnClick} style={{ cursor: 'pointer' }}>
        {buttonLabel}
      </label>
      <label>{props.temporaryLoglists.length}</label>

      <Modal isOpen={modal} toggle={toggle} className={className}>
        <ModalHeader toggle={toggle}>임시저장 함</ModalHeader>
        <ModalBody>
          {(editbutton === false) &&
            props.temporaryLoglists &&
            props.temporaryLoglists.map((v, index) => {
              return (
                <ul style={{ cursor: 'pointer', display: 'block' }} onClick={() => getLogList(v.stemp_idx)} >
                  <li key={v.stemp_idx + '_log'} id={v.stemp_idx} >{v.title}</li>
                  <span >{v.meeting_date}&nbsp;</span>
                  <span >{v.meeting_etime}</span>
                  <div style={{ backgroundColor: 'black', height: '1px' }}></div>
                </ul>
              )
            })}
          {(editbutton === true) &&
            props.temporaryLoglists &&
            props.temporaryLoglists.map((v, index) => {
              return (
                <ul style={{ display: 'block' }}  >
                  <div style={{ display: 'flex' }}>
                    <li key={v.stemp_idx + '_log'} id={v.stemp_idx} >{v.title}</li>
                    <img onClick={() => deleteLogList(v.stemp_idx)}
                      style={{ cursor: 'pointer' }}
                      src={require('assets/icons/delete.png')}
                      alt='delete_logo'
                    ></img>
                  </div>

                  <span >{v.meeting_date}&nbsp;</span>
                  <span >{v.meeting_etime}</span>
                  <div style={{ backgroundColor: 'black', height: '1px' }}></div>
                </ul>
              )
            })}
        </ModalBody>
        <ModalFooter>
          {(editbutton === false) &&
            <Button color="primary" onClick={EditContent}>편집</Button>}
          {(editbutton === false) &&
            <Button color="secondary" onClick={toggle}>취소</Button>}
          {(editbutton === true) &&
            <Button color="primary" onClick={toggle}>완료</Button>}
        </ModalFooter>
      </Modal>
    </div>
  );
}

const mapStateToProps = (state) => {
  const { temporaryLoglists, temporaryLoglist, temporaryloglistresponse, deletetemporaryLogresponse } = state.SalesLog;
  return { temporaryLoglists, temporaryLoglist, temporaryloglistresponse, deletetemporaryLogresponse };
};

const mapStateToDispatch = {
  getTemporaryLogLists: getTemporaryLogLists.call,
  getTemporaryLogList: getTemporaryLogList.call,
  deleteTemporaryLogList: deleteTemporaryLogList.call
}

export default withRouter(connect(mapStateToProps, mapStateToDispatch)(LogListModal));
