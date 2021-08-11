import React, { useState, useEffect } from 'react';
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';
import Select from 'react-select';
import { connect } from 'react-redux';
import { getUserList, putSalesLogCoUser } from 'redux/actions';


const AccountModal = (props) => {
  const {
    buttonLabel,
    className
  } = props;

  const [modal, setModal] = useState(false);
  const [input, setInput] = useState("");

  const options = props.userList && props.userList.map((v) => ({ label: v.user_name, value: v.user_id }))

  const toggle = () => setModal(!modal);

  const handleOnClick = () => {
    setModal(!modal);
    props.getUserList(props.user.user_id)
  }

  const AddCoUser = (e) => {
    e.preventDefault();
    if (!props.salesLogLoading)
      props.putSalesLogCoUser(props.salesLog.log_id, input.value)
    else
      window.alert("공동작성자가 추가되었습니다.")
  }

  const handleChange = (selectedOption) => {
    setInput(selectedOption);
    console.log(selectedOption)
  }

  useEffect(() => {
    if (!props.salesLog)
      props.SearchChange(input.value)
  }, [input])
  // useEffect(() => {
  //   props.putSalesLogCoUser(props.salesLog.log_id, input.val
  // }, [props.putSalesLogCoUserResponse]);

  return (
    <div>
      <Button className="rounded-pill" color="primary" onClick={handleOnClick}>{buttonLabel}</Button>
      <Modal isOpen={modal} toggle={toggle} className={className}>
        <ModalHeader toggle={toggle}>고객사 일괄 추가</ModalHeader>
        <ModalBody>
          <div className="">
            <h4>고객사 정보를 한 번에 추가할 수 있습니다.</h4><br />
            <br />
            <strong><h4>고객사 일괄 추가 방법</h4></strong><br />
            <br />
          고객사 일괄추가 양식을 다운로드 받으세요.<br />
          샘플 양식을 참고하여 고객사 정보를 입력해주세요.<br />
          입력한 양식을 등록해주세요.<br />
            <br />
            <br />
            <br />
          </div>

          <Button color="primary" onClick={AddCoUser}>고객사 일괄추가 양식 다운로드</Button>
          <br />
          <br />
          <Button className="mr-3" color="outline-primary" onClick={AddCoUser}>첨부파일이 없습니다.</Button>
          <Button color="secondary" onClick={AddCoUser}>양식 등록하기</Button>

        </ModalBody>
        <ModalFooter>
          <Button color="primary" onClick={AddCoUser}>취소</Button>{' '}
          <Button color="secondary" onClick={toggle}>저장</Button>
        </ModalFooter>
      </Modal>
    </div>
  );
}

const mapStateToProps = (state) => {
  const { userList, putSalesLogCoUseeResponse, salesLog, salesLogLoading } = state.SalesLog;
  const { user } = state.User;
  return { user, userList, putSalesLogCoUseeResponse, salesLog, salesLogLoading };
};

const mapStateToDispatch = {
  getUserList: getUserList.call,
  putSalesLogCoUser: putSalesLogCoUser.call
}


export default connect(mapStateToProps, mapStateToDispatch)(AccountModal);