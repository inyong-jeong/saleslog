import React, { useState, useEffect } from 'react';
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';
import { connect } from 'react-redux';
import { getTemporaryLogLists, getTemporaryLogList, deleteTemporaryLogList } from 'redux/actions';
import { withRouter } from 'react-router-dom';
import { Divider } from 'antd';
import { base64Dec, base64Enc } from "constants/commonFunc";

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
    props.history.push(`/main/upload/${base64Enc(stemp_idx)}`)
    setModal(!modal);
    props.getTemporaryLogList(data)
  }

  const deleteLogList = (stemp_idx) => {
    const data = {
      stemp_idx: stemp_idx
    }
    props.deleteTemporaryLogList(data)
  }
  // 임시저장 리스트(여러개) 불러오기
  useEffect(() => {
    props.getTemporaryLogLists();
  }, [props.posttempres])

  // 임시저장함에서 가져온 후 리스트(여러개) 불어오기
  useEffect(() => {
    props.getTemporaryLogLists();
  }, [props.temporaryloglistresponse])

  // 자동 저장 후 리스트(어려개) 불러오기
  useEffect(() => {
    if (!props.postautoresponse) {
      props.getTemporaryLogLists();
    }
  }, [props.postautoresponse])

  return (
    <div>
      <button className='btn btn-dark' onClick={handleOnClick} style={{ cursor: 'pointer' }}>
        {`${buttonLabel} ${props.temporaryLoglists.length}`}
      </button>

      <Modal isOpen={modal} toggle={toggle} className={className}>
        <ModalHeader toggle={toggle}>임시저장 함</ModalHeader>
        <ModalBody>
          {(editbutton === false) &&
            props.temporaryLoglists &&
            props.temporaryLoglists.map((v, index) => {
              return (
                <ul style={{ cursor: 'pointer', display: 'block' }} onClick={() => getLogList(v.stemp_idx)} >
                  <li style={{ fontSize: '16px' }} key={v.stemp_idx + '_log'} id={v.stemp_idx} ><strong>{v.title}</strong></li>
                  <span >{v.meeting_date}&nbsp;</span>
                  <span >{v.meeting_etime}</span>
                  {/* <div style={{ backgroundColor: 'black', height: '1px' }}></div> */}
                  <Divider />
                </ul>
              )
            })}
          {(editbutton === true) &&
            props.temporaryLoglists &&
            props.temporaryLoglists.map((v, index) => {
              return (
                <ul style={{ display: 'block' }}  >
                  <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                    <li style={{ fontSize: '16px' }} key={v.stemp_idx + '_log'} id={v.stemp_idx} ><strong>{v.title}</strong></li>
                    <img onClick={() => deleteLogList(v.stemp_idx)}
                      style={{ cursor: 'pointer' }}
                      src={require('assets/icons/delete.png')}
                      alt='delete_logo'
                    ></img>
                  </div>

                  <span >{v.meeting_date}&nbsp;</span>
                  <span >{v.meeting_etime}</span>
                  {/* <div style={{ backgroundColor: 'black', height: '1px' }}></div> */}
                  <Divider />
                </ul>
              )
            })}
        </ModalBody>
        <ModalFooter>
          {(editbutton === false) &&
            <Button color="dark" onClick={EditContent}>편집</Button>}
          {(editbutton === false) &&
            <Button color="light" onClick={toggle}>취소</Button>}
          {(editbutton === true) &&
            <Button color="dark" onClick={toggle}>완료</Button>}
        </ModalFooter>
      </Modal>
    </div>
  );
}

const mapStateToProps = (state) => {
  const { temporaryLoglists, temporaryLoglist, temporaryloglistresponse, deletetemporaryLogresponse, posttempres, postautoresponse } = state.SalesLog;
  return { temporaryLoglists, temporaryLoglist, temporaryloglistresponse, deletetemporaryLogresponse, posttempres, postautoresponse };
};

const mapStateToDispatch = {
  getTemporaryLogLists: getTemporaryLogLists.call,
  getTemporaryLogList: getTemporaryLogList.call,
  deleteTemporaryLogList: deleteTemporaryLogList.call
}

export default withRouter(connect(mapStateToProps, mapStateToDispatch)(LogListModal));
