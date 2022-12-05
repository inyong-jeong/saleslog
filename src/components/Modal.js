import React, { useState, useEffect } from 'react';
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';
import { connect } from 'react-redux';
import { getTemporaryLogLists, getTemporaryLogList, deleteTemporaryLogList } from 'redux/actions';
import { withRouter } from 'react-router-dom';
// import LogModal from 'components/Modal';

// import { Checkbox, Divider } from 'antd'

const LogModal = (props) => {
  const {
    buttonLabel,
    className
  } = props;
  const [modal, setModal] = useState(false);
  const toggle = () => {
    setModal(!modal)
  };
  const handleOnClick = () => {
    setModal(!modal);
  }

  const handleOnChange = () => {

  }
  return (
    <div>
      <label color="primary" onClick={handleOnClick} style={{ cursor: 'pointer' }}>
        {buttonLabel}
      </label>

      <Modal isOpen={modal} toggle={toggle} className={className}>
        <ModalHeader toggle={toggle}>일지 편집</ModalHeader>
        <ModalBody className='d-flex flex-column justify-content-center'>
          삭제하신 일지는 복구할 수 없습니다. 일지를 삭제할까요?
        </ModalBody>
        <ModalFooter>
          <Button color="primary" onClick={handleOnChange}>삭제</Button>
          <Button color="secondary" onClick={toggle}>취소</Button>
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

export default withRouter(connect(mapStateToProps, mapStateToDispatch)(LogModal));
