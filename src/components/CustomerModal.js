import React, { useState, useEffect } from 'react';
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';
import { connect } from 'react-redux';
import { postCustomer, postCustomerManger } from 'redux/actions';
import { withRouter } from 'react-router-dom';
import { Form, Input } from 'antd';

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
    sales_gb: '',
    acc_url: '',
    man_name: '',
    dept: '',
    posi: '',
    tel: '',
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
    if (accountbody.account_name === '' || accountbody.man_name === '' || accountbody.ceo_name === '' || accountbody.dept === '') {
      return alert('필수항목 누락입니다.')
    }
    props.postCustomer(accountbody);
    setModal(!modal)
  }

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
              label="고객"
            >
              <Input
                name='account_name'
                value={accountbody.account_name}
                onChange={ChangeAccount}
              />
            </Form.Item>
            <Form.Item
              label="대표자명"
            >
              <Input
                name='ceo_name'
                value={accountbody.ceo_name}
                onChange={ChangeAccount}
              />
            </Form.Item>
            <Form.Item
              label="고객담당자"
            >
              <Input
                name='man_name'
                value={accountbody.man_name}
                onChange={ChangeAccount}
              />
            </Form.Item>
            <Form.Item
              label="담당자부서"
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
