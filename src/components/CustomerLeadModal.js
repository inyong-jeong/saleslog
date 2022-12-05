import React, { useState, useEffect } from 'react';
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';
import { connect } from 'react-redux';
import { postCustomer, postCustomerManger } from 'redux/actions';
import { withRouter } from 'react-router-dom';
import { Form, Input, Radio, Select } from 'antd';
import { errorMessage } from "constants/commonFunc";


const CustomerModal = (props) => {
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
  const [radiocheck, setRadioCheck] = useState('0010001');
  const [combo, setComBo] = useState(1)
  const leadActivityOption =
    [{ label: '발굴', value: '발굴' },
    { label: '접촉', value: '접촉' },
    { label: '제안', value: '제안' },
    { label: '검증', value: '검증' }];

  const [accountbody, setAccountBody] = useState({
    account_name: '',
    score: '',
    ceo_name: '',
    acc_tel: '',
    acc_email: '',
    zipcode: '',
    addr1: '',
    addr2: '',
    lati: 0,
    longi: 0,
    reg_num: '',
    acc_etc: '',
    tags: '',
    acc_fax: '',
    sales_gb: '0010002',
    acc_url: '',
    man_name: '',
    dept: '',
    posi: '',
    tel: ''
  })

  const ChangeAccount = (e) => {
    if ('detail' in e) {
      const obj = e.detail.tagify.value
      console.log(obj)
      const result = obj.map(e => e.value)
      setAccountBody(inputs => ({ ...inputs, tags: result }))
      return
    }

    setAccountBody({
      ...accountbody,
      [e.target.name]: e.target.value
    })
  }

  const handleOnChange = () => {
    if (
      (accountbody.account_name === '' || accountbody.ceo_name === '' || accountbody.score === '')) {
      return alert('필수항목 누락입니다.')
    }
    props.postCustomer(accountbody);
    setModal(!modal)
  }

  const onChange = (e) => {
    setRadioCheck(e.target.value);
    setAccountBody({
      ...accountbody,
      'sales_gb': e.target.value
    })
  };

  const onLeadActivity = (option) => {
    console.log(option)
    // setLeadActivity(option.value);
    setAccountBody({
      ...accountbody,
      'score': option
    })
  }


  useEffect(() => {
    setComBo(radiocheck)
  }, [radiocheck])
  return (
    <div>
      <button className='btn btn-dark ml-2' onClick={handleOnClick}>
        {buttonLabel}
      </button>

      <Modal isOpen={modal} toggle={toggle} className={className}>
        <ModalHeader toggle={toggle}>고객 간편 등록</ModalHeader>
        <ModalBody className='d-flex flex-column justify-content-center'>
          <Form style={{ justifyContent: 'center' }}
            name="basic"
            labelCol={{
              span: 5,
            }}
            wrapperCol={{
              span: 16,
            }}
            initialValues={{
              remember: true,
            }}
            autoComplete="off"
          >
            <Form.Item
              label={<span >고객구분<span style={{ color: 'red' }}>*</span></span>}
            >
              <span><strong>리드타깃</strong></span>
            </Form.Item>
            <Form.Item
              label={<span >리드단계<span style={{ color: 'red' }}>*</span></span>}
            >
              <Select
                options={leadActivityOption}
                value={leadActivityOption.value}
                onChange={onLeadActivity}
              />
            </Form.Item>
            <Form.Item
              label={<span >고객<span style={{ color: 'red' }}>*</span></span>}
            >
              <Input
                name='account_name'
                value={accountbody.account_name}
                onChange={ChangeAccount}
              />
            </Form.Item>
            <Form.Item
              label={<span >대표자명<span style={{ color: 'red' }}>*</span></span>}
            >
              <Input
                name='ceo_name'
                value={accountbody.ceo_name}
                onChange={ChangeAccount}
              />
            </Form.Item>
            <Form.Item
              label={<span >고객담당자</span>}
            >
              <Input
                name='man_name'
                value={accountbody.man_name}
                onChange={ChangeAccount}
              />
            </Form.Item>
            <Form.Item
              label={<span >담당자부서</span>}
            >
              <Input
                name='dept'
                value={accountbody.dept}
                onChange={ChangeAccount}
              />
            </Form.Item>
          </Form>

        </ModalBody>
        <ModalFooter>
          <Button color="dark" onClick={handleOnChange}>간편등록</Button>
          <Button color="light" onClick={toggle}>취소</Button>
        </ModalFooter>
      </Modal>
    </div>
  );
}

const mapStateToProps = (state) => {
  const { postCustomerResponse, loading, postCustomerMangerResponse } = state.Customer;
  return { postCustomerResponse, loading, postCustomerMangerResponse };
};

const mapStateToDispatch = {
  postCustomer: postCustomer.call,
  postCustomerManger: postCustomerManger.call
}

export default withRouter(connect(mapStateToProps, mapStateToDispatch)(CustomerModal));
