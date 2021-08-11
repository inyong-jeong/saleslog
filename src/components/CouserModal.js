import React, { useState, useEffect } from 'react';
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';
import Select from 'react-select';
import { connect } from 'react-redux';
import { getUserList, putSalesLogCoUser } from 'redux/actions';


const CouserModal = (props) => {
  const {
    buttonLabel,
    className
  } = props;

  const [modal, setModal] = useState(false);
  const [input, setInput] = useState("");

  const options = props.userList.map((v) => ({label: v.user_name, value: v.user_id}))

  const toggle = () => setModal(!modal);

  const handleOnClick = () => {
      setModal(!modal);
      props.getUserList(props.user.user_id)
    }

  const AddCoUser = (e) => {
    e.preventDefault();
    if(!props.salesLogLoading)
    props.putSalesLogCoUser(props.salesLog.log_id, input.value)
    else
    window.alert("공동작성자가 추가되었습니다.")
  }

  const handleChange = (selectedOption) => {
    setInput(selectedOption);
    console.log(selectedOption)
  }

  useEffect(() => {
    if(!props.salesLog)
    props.SearchChange(input.value)
  },[input])
  // useEffect(() => {
  //   props.putSalesLogCoUser(props.salesLog.log_id, input.val
  // }, [props.putSalesLogCoUserResponse]);

  return (
    <div>
      <Button color="primary" onClick={handleOnClick}>{buttonLabel}</Button>
      <Modal isOpen={modal} toggle={toggle} className={className}>
        <ModalHeader toggle={toggle}>공동작성자 추가</ModalHeader>
        <ModalBody>
        <Select 
                placeholder='공동작성자'
                name="names"
                options={options}
                onChange={handleChange}
                className="basic-multi-select"
                classNamePrefix="select"/>
        </ModalBody>
        <ModalFooter>
          <Button color="primary" onClick={AddCoUser}>추가</Button>{' '}
          <Button color="secondary" onClick={toggle}>닫기</Button>
        </ModalFooter>
      </Modal>
    </div>
  );
}

const mapStateToProps = (state) => {
  const { userList, putSalesLogCoUseeResponse, salesLog, salesLogLoading} = state.SalesLog;
  const { user } = state.User;
  return { user, userList, putSalesLogCoUseeResponse, salesLog, salesLogLoading};
};

const mapStateToDispatch = {
  getUserList: getUserList.call,
  putSalesLogCoUser: putSalesLogCoUser.call
}


export default connect(mapStateToProps, mapStateToDispatch)(CouserModal);