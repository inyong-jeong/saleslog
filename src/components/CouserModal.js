import React, { useState, useEffect } from 'react';
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';
import Select from 'react-select';
import { connect } from 'react-redux';
import { putSalesLogCoUser, getUserList } from 'redux/actions';


const CouserModal = (props) => {
  const {
    buttonLabel,
    className
  } = props;

  const [modal, setModal] = useState(false);
  const [input, setInput] = useState("");

  const [value, setValue] = useState('');
  const [id, setId] = useState('');

  const options = props.userlist ? props.userlist.map((v) => ({ label: v.user_name + '/' + v.title + '/' + v.dept_name + ' ' + v.email, value: v.login_idx })) : undefined
  const toggle = () => setModal(!modal);
  const handleOnClick = () => {
    setModal(!modal);
  }

  const AddCoUser = (e) => {
    props.handleonInsert(value, id)
    setValue('');
    setId('');
    e.preventDefault();
    props.SearchChange(input.value, input.label, input.dept_idx, input.title)
    window.alert("공동작성자가 추가되었습니다.")
    setModal(!modal);
  }

  const handleChange = (selectedOption) => {
    setValue(selectedOption.label);
    setId(selectedOption.value);

    setInput(selectedOption);
  }


  useEffect(() => {
    // if (!props.salesLog)
    const data = {
      srch: ''
    }
    props.getUserList(data);
  }, [input])
  // useEffect(() => {
  //   props.putSalesLogCoUser(props.salesLog.log_id, input.val
  // }, [props.putSalesLogCoUserResponse]);

  return (
    <div>
      <label color="primary" onClick={handleOnClick} style={{ cursor: 'pointer' }}>
        <img className="ml-2" src={require('assets/icons/profile_plus.png')} alt='profile_plus_logo' />
      </label>
      <Modal isOpen={modal} toggle={toggle} className={className}>
        <ModalHeader toggle={toggle}>공동작성자 추가</ModalHeader>
        <ModalBody>
          <Select
            placeholder='이름 또는 이메일을 입력하세요'
            name="names"
            options={options}
            onChange={handleChange}
            className="basic-multi-select"
            classNamePrefix="select" />
        </ModalBody>
        <ModalFooter>
          <Button color="primary" onClick={AddCoUser}>등록</Button>{' '}
          <Button color="secondary" onClick={toggle}>취소</Button>
        </ModalFooter>
      </Modal>
    </div>
  );
}

const mapStateToProps = (state) => {
  const { userlist, putSalesLogCoUseeResponse, salesLog, salesLogLoading } = state.SalesLog;
  return { userlist, putSalesLogCoUseeResponse, salesLog, salesLogLoading };
};

const mapStateToDispatch = {
  getUserList: getUserList.call
  // putSalesLogCoUser: putSalesLogCoUser.call
}


export default connect(mapStateToProps, mapStateToDispatch)(CouserModal);