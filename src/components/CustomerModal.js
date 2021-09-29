import React, { useState, useEffect } from 'react';
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';
import { connect } from 'react-redux';
import { postCustomer, postCustomerManger } from 'redux/actions';
import { withRouter } from 'react-router-dom';
import { Form, Input, Radio, Select } from 'antd';

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
    sales_gb: '0010001',
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
    if (accountbody.account_name === '' || accountbody.man_name === '' || accountbody.ceo_name === '' || accountbody.dept === '') {
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
              label="고객구분"
            >
              <Radio.Group onChange={onChange} value={radiocheck}>
                <Radio value={'0010001'}>거래고객</Radio>
                <Radio value={'0010002'}>리드타깃</Radio>
              </Radio.Group>
            </Form.Item>
            {radiocheck === '0010002' ?
              <Form.Item
                label="리드단계"
              >
                <Select
                  options={leadActivityOption}
                  value={leadActivityOption.value}
                  onChange={onLeadActivity}

                />
              </Form.Item>
              : null}

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
