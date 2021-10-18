import React, { useState, useEffect } from 'react';
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';
import Select from 'react-select';
import { connect } from 'react-redux';
import { putSalesLogCoUser, getUserList } from 'redux/actions';
import { errorMessage, successMessage } from "constants/commonFunc";
import { ReactComponent as PersonIcon } from 'assets/icons/log/person.svg'


const CouserModal = (props) => {
  const {
    className
  } = props;

  const [modal, setModal] = useState(false);
  const [input, setInput] = useState("");

  const [value, setValue] = useState('');
  const [id, setId] = useState('');
  const [thumburl, setThumbUrl] = useState('')

  const options = props.userlist ? props.userlist.map((v) => ({ label: v.user_name + ' ' + v.title + ' ' + v.dept_name + ' (' + v.email + ')', value: v.login_idx, url: v.thumb_url })) : undefined
  const toggle = () => setModal(!modal);
  const handleOnClick = () => {
    setModal(!modal);
  }

  const AddCoUser = (e) => {
    props.handleonInsert(value, id, thumburl)
    setValue('');
    setId('');
    setId('');
    e.preventDefault();
    // props.SearchChange(input.value, input.label, input.dept_idx, input.title)
    // successMessage("공동작성자가 추가되었습니다.")
    setModal(!modal);
  }

  const handleChange = (selectedOption) => {
    console.log(selectedOption);
    setValue(selectedOption.label);
    setId(selectedOption.value);
    setThumbUrl(selectedOption.url)
    // setInput(selectedOption);
    // props.SearchChange(selectedOption.value, selectedOption.label)

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
    <>
      <label color="primary" onClick={handleOnClick} style={{ cursor: 'pointer' }}>
        <PersonIcon />

      </label>
      <div style={{ display: 'inline-block', verticalAlign: '-3px', marginLeft: '3px' }}>공동작성자</div>
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
          <Button color="dark" onClick={AddCoUser}>등록</Button>{' '}
          <Button color="light" onClick={toggle}>취소</Button>
        </ModalFooter>
      </Modal>
    </>
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