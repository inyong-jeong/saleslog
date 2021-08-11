import React, { useState, useEffect } from 'react';
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';
import Select from 'react-select';
import { connect } from 'react-redux';


const DatePickerModal = (props) => {
  const {
    buttonLabel,
    className
  } = props;

  const [year, setYear] = useState();
  const [month, setMonth] = useState();

  const yearOptions = [];
  const startYear = (new Date().getYear() + 1900);
  for (let i = 0 ; i < 10; ++i)
    yearOptions.push({label: (startYear - i) + '년', value: (startYear - i)});
  const monthOptions = [];
  for (let i = 1; i <= 12; ++i)
    monthOptions.push({label: i + '월', value: i});


  const onConfirm = (e) => {
    e.preventDefault();
    if (props.onConfirmClick)
      props.onConfirmClick(year, month);
  }


  return (
    <div>
      <Modal isOpen={props.modal} toggle={props.toggle} className={className}>
        <ModalHeader toggle={props.toggle}>월별 실적 다운로드</ModalHeader>
        <ModalBody>
        <Select 
          placeholder='년'
          name="names"
          options={yearOptions}
          onChange={(v) => setYear(v.value)}
          className="basic-multi-select"
          classNamePrefix="select"/>
        <Select 
          placeholder='월'
          name="names"
          options={monthOptions}
          onChange={(v) => setMonth(v.value)}
          className="basic-multi-select"
          classNamePrefix="select"/>
        </ModalBody>        
        <ModalFooter>
          <Button color="primary" onClick={onConfirm}>선택</Button>{' '}
          <Button color="secondary" onClick={props.toggle}>닫기</Button>
        </ModalFooter>
      </Modal>
    </div>
  );
}

export default connect(null, null)(DatePickerModal);