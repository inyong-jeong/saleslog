import React, { useState, useEffect } from "react";
import { Helmet } from "react-helmet";
import { Row, Col, TimePicker, Radio, DatePicker, Input, Space, Card, Select } from 'antd'
import moment from 'moment';
import StyledButton from 'components/styledcomponent/Button'
import StyledCard from 'components/styledcomponent/Card'

import DashButton from 'components/DashButton'
import DashButton5 from 'components/DashButton5'
import { connect } from 'react-redux'
import Chart from 'react-apexcharts';

const { RangePicker } = DatePicker;

function DashBoard(props) {




  const [biglist, setBigList] = useState(undefined);
  const [middlelist, setMiddleList] = useState(undefined);
  const [smalllist, setSmallList] = useState(undefined);

  const [selectedOrganization1, setSelectedOrganization1] = useState(undefined);
  const [selectedOrganization2, setSelectedOrganization2] = useState(undefined);
  const [selectedOrganization3, setSelectedOrganization3] = useState(undefined);
  const [selectedOrganizationuser, setSelectedOrganizationUser] = useState(undefined);

  const [dateString, setDateString] = useState('');
  const Dateformat = 'YYYY-MM-DD';
  const [fromData, setFromData] = useState({
    sales_goal: '',
    sales_activity: '',
    meeting_date: dateString,
  })
  const [filterdata, setFilterData] = useState({
    dept_idx: 0,
    typ: 'lvl'
  })
  const [data, setData] = useState({
    dept_idx: 0,
    typ: 'tree'
  })
  const onDatePickerChange = (date) => {
    const convertdate = moment(date).format('YYYY-MM-DD');
    setDateString(date)
    setFromData({
      ...fromData,
      'meeting_date': convertdate
    })
  }


  const onOrganizationSelectChange1 = (v) => {
    console.log(v)
    setSelectedOrganization1(v);
    // setBigList(props.organizationlist)
    setFilterData({ ...filterdata, 'dept_idx': v })
    setData({ ...data, 'dept_idx': v })
  }

  const onOrganizationSelectChange2 = (v) => {
    setSelectedOrganization2(v);
    // setMiddleList(props.organizationlist)
    setFilterData({ ...filterdata, 'dept_idx': v })
    setData({ ...data, 'dept_idx': v })
  }
  const onOrganizationSelectChange3 = (v) => {
    setSelectedOrganization3(v);
    // setSmallList(props.organizationlist)
    setFilterData({ ...filterdata, 'dept_idx': v })
    setData({ ...data, 'dept_idx': v })
  }

  function filterList(label) {
    let list = []
    for (let i = 0; i < props.organizationuserlist.length; i++) {
      for (let j = 0; j < label.length; j++) {
        if (label[j] === props.organizationuserlist[i].user_name) {
          list = list.concat(props.organizationuserlist[i].dept_idx);
        } else if (label === []) {
          list = [];
        }
      }
    }
    return list
  }

  const onOrganizationUserSelectChange = (label) => {
    setSelectedItems(label);
    console.log(filterList(label));
    let memberlist = filterList(label)
    setSelectedOrganizationUser(memberlist);
    // setFilterData({ ...filterdata, 'dept_idx': v, 'typ': 'tree' })
    // setData({ ...data, 'dept_idx': v })
  }
  const [selectedItems, setSelectedItems] = useState([])
  const filteredlist = props.organizationuserlist && props.organizationuserlist.map(v => v.user_name);
  const filteredOptions = filteredlist && filteredlist.filter((v) => !selectedItems.includes(v))
  const selectStyle =
    { width: '100%' }

  const dountseries = [1, 1, 1, 1]
  const barseries = [{
    data: [1200, 945, 600, 523, 458, 43, 78, 9]
  }]

  const leadseries = [{
    data: [274, 40, 30, 100]
  }]

  const LeadOption = {

    tooltip: {
      theme: 'dark',
      x: {
        show: false
      },
      y: {
        title: {
          formatter: function () {
            return ''
          }
        }
      }
    },

    title: {
      text: '영업일지 ',
      align: 'center',
      floating: true
    },
    subtitle: {
      text: '영업일지 채널에 다른 영업일지 건수',
      align: 'center',
    },
    xaxis: {
      categories: ['전화', '조사', '접촉', '검증']
    },
    yaxis: {
      labels: {
        show: false
      }
    },
    plotOptions: {
      bar: {
        barHeight: '100%',
        distributed: true,
        horizontal: false,
        dataLabels: {
          position: 'bottom'
        },
      }
    },

    dataLabels: {
      enabled: true,
      textAnchor: 'start',
      style: {
        colors: ['#fff']
      },
      formatter: function (val, opt) {
        return opt.w.globals.labels[opt.dataPointIndex] + ":  " + val
      },
      offsetX: 0,
      dropShadow: {
        enabled: true
      }
    },
  };

  const Baroption = {

    tooltip: {
      theme: 'dark',
      x: {
        show: false
      },
      y: {
        title: {
          formatter: function () {
            return ''
          }
        }
      }
    },

    title: {
      text: '영업일지 ',
      align: 'center',
      floating: true
    },
    subtitle: {
      text: '영업일지 채널에 다른 영업일지 건수',
      align: 'center',
    },
    xaxis: {
      categories: ['전화', '이메일', '행사 참여', '대면', '온라인 리서치', '도서/전문정보', '소셜 커뮤니티', '기타']
    },
    yaxis: {
      labels: {
        show: false
      }
    },
    plotOptions: {
      bar: {
        barHeight: '100%',
        distributed: true,
        horizontal: true,
        dataLabels: {
          position: 'bottom'
        },
      }
    },

    dataLabels: {
      enabled: true,
      textAnchor: 'start',
      style: {
        colors: ['#fff']
      },
      formatter: function (val, opt) {
        return opt.w.globals.labels[opt.dataPointIndex] + ":  " + val
      },
      offsetX: 0,
      dropShadow: {
        enabled: true
      }
    },
  };

  const dountOption = {
    labels: ['전략니즈', '상품니즈', '운영니즈', '개인니즈']

  }
  return (
    <React.Fragment>
      <Helmet>
        세일즈로그 - 메인페이지
      </Helmet>
      <div className='mt-5'></div>
      <Row>
        <Col sm={22} xs={22} md={22} lg={22}><strong><h3>영업일지 현황</h3></strong></Col>
        <Col sm={2} xs={2} md={2} lg={2}><u>상세조회</u></Col>
      </Row>
      <DashButton first='월' second='분기' third='반기' fourth='기간선택' />
      <div className='mt-2'></div>
      <Row gutter={4} >
        <Col sm={12} xs={12} md={12} lg={12} >
          <DatePicker className='col-12' placeholder='활동일시'
            defaultValue={moment('0000-00-00', Dateformat)}
            format={Dateformat}
            value={dateString}
            onChange={onDatePickerChange} />
        </Col>
        <Col sm={12} xs={12} md={12} lg={12}>
          <DatePicker className='col-12' placeholder='활동일시'
            defaultValue={moment('0000-00-00', Dateformat)}
            format={Dateformat}
            value={dateString}
            onChange={onDatePickerChange} />
        </Col>
      </Row>
      <div className='mt-2'></div>

      <Row gutter={6}>
        <Col sm={6} xs={6} md={6} lg={6}>
          <Select placeholder='대분류'
            style={selectStyle}
            options={biglist && biglist.map((v) => { return { value: v.dept_idx, label: v.dept_name } })}
            value={selectedOrganization1}
            onChange={onOrganizationSelectChange1}
          />
        </Col>
        <Col sm={6} xs={6} md={6} lg={6}>
          <Select placeholder='중분류'
            style={selectStyle}
            options={middlelist && middlelist.map((v) => { return { value: v.dept_idx, label: v.dept_name } })}
            onChange={onOrganizationSelectChange2}
            value={selectedOrganization2} />
        </Col>
        <Col sm={6} xs={6} md={6} lg={6}>
          <Select placeholder='소분류'
            style={selectStyle}
            options={smalllist && smalllist.map((v) => { return { value: v.dept_idx, label: v.dept_name } })}
            onChange={onOrganizationSelectChange3}
            value={selectedOrganization3} />
        </Col>
        <Col sm={6} xs={6} md={6} lg={6}>
          <Select placeholder='멤버'
            mode='multiple'
            style={selectStyle}
            onChange={onOrganizationUserSelectChange}
            value={selectedItems}
          >
            {filteredOptions && filteredOptions.map((item, index) => (
              <Select.Option key={index} value={item}>
                {item}
              </Select.Option>
            ))}
          </Select>
        </Col>
      </Row>
      <div className='mt-2'></div>

      <Row>
        <Col sm={24} xs={24} md={24} lg={24}>
          <Card title='영업 활동'>
            <p>니즈 파악</p>
            <p>동향/정보</p>
            <p>제안</p>
          </Card>
        </Col>
      </Row>
      <div className='mt-5'></div>

      <Row>
        <Col sm={22} xs={22} md={22} lg={22}><strong><h3>영업일지 채널</h3></strong></Col>
      </Row>
      <div className='mt-2'></div>

      <Row>
        <Col sm={24} xs={24} md={24} lg={24}>
          <DashButton first='전체' second='니즈조사' third='동향정보' fourth='제안' />
        </Col>
      </Row>
      <Row >
        <Col sm={24} xs={24} md={24} lg={24}>
          <Chart options={Baroption} series={barseries} type="bar" height='500' />
        </Col>
      </Row>
      <Row >
        <Col sm={24} xs={24} md={24} lg={24}>
          <StyledCard title='니즈 분석'>
            <Chart options={dountOption} series={dountseries} type="donut" width='400' />
          </StyledCard>
        </Col>
      </Row>
      <div className='mt-5'></div>

      <Row>
        <Col sm={22} xs={22} md={22} lg={22}><strong><h3>리드관리 현황</h3></strong></Col>
        <Col sm={2} xs={2} md={2} lg={2}><u>상세조회</u></Col>
      </Row>
      <div className='mt-2'></div>

      <Row>
        <Col sm={24} xs={24} md={24} lg={24}>
          <DashButton first='월' second='분기' third='반기' fourth='기간선택' />
        </Col>
      </Row>
      <div className='mt-2'></div>

      <Row gutter={4} >
        <Col sm={12} xs={12} md={12} lg={12} >
          <DatePicker className='col-12' placeholder='활동일시'
            defaultValue={moment('0000-00-00', Dateformat)}
            format={Dateformat}
            value={dateString}
            onChange={onDatePickerChange} />
        </Col>
        <Col sm={12} xs={12} md={12} lg={12}>
          <DatePicker className='col-12' placeholder='활동일시'
            defaultValue={moment('0000-00-00', Dateformat)}
            format={Dateformat}
            value={dateString}
            onChange={onDatePickerChange} />
        </Col>
      </Row>
      <div className='mt-2'></div>

      <Row gutter={6}>
        <Col sm={6} xs={6} md={6} lg={6}>
          <Select placeholder='대분류'
            style={selectStyle}
            options={biglist && biglist.map((v) => { return { value: v.dept_idx, label: v.dept_name } })}
            value={selectedOrganization1}
            onChange={onOrganizationSelectChange1}
          />
        </Col>
        <Col sm={6} xs={6} md={6} lg={6}>
          <Select placeholder='중분류'
            style={selectStyle}
            options={middlelist && middlelist.map((v) => { return { value: v.dept_idx, label: v.dept_name } })}
            onChange={onOrganizationSelectChange2}
            value={selectedOrganization2} />
        </Col>
        <Col sm={6} xs={6} md={6} lg={6}>
          <Select placeholder='소분류'
            style={selectStyle}
            options={smalllist && smalllist.map((v) => { return { value: v.dept_idx, label: v.dept_name } })}
            onChange={onOrganizationSelectChange3}
            value={selectedOrganization3} />
        </Col>
        <Col sm={6} xs={6} md={6} lg={6}>
          <Select placeholder='멤버'
            mode='multiple'
            style={selectStyle}
            onChange={onOrganizationUserSelectChange}
            value={selectedItems}
          >
            {filteredOptions && filteredOptions.map((item, index) => (
              <Select.Option key={index} value={item}>
                {item}
              </Select.Option>
            ))}
          </Select>
        </Col>
      </Row>
      <Row >
        <Col sm={24} xs={24} md={24} lg={24}>
          <Chart options={LeadOption} series={leadseries} type="bar" height='500' />
        </Col>
      </Row>
      <div className='mt-5'></div>

      <Row>
        <Col sm={22} xs={22} md={22} lg={22}><strong><h3>리드채널</h3></strong></Col>
      </Row>
      <Row>
        <Col sm={24} xs={24} md={24} lg={24}>
          <DashButton5 first='전체' second='발굴' third='조사' fourth='접촉' fifth='검증' />
        </Col>
      </Row>
      <Row >
        <Col sm={24} xs={24} md={24} lg={24}>
          <Chart options={Baroption} series={barseries} type="bar" height='500' />
        </Col>
      </Row>
      <div className='mt-5'></div>

      <Row>
        <Col sm={22} xs={22} md={22} lg={22}><strong><h3>리드니즈 분석</h3></strong></Col>
      </Row>
      <Row >
        <Col sm={24} xs={24} md={24} lg={24}>
          <StyledCard title='니즈 분석'>
            <Chart options={dountOption} series={dountseries} type="donut" width='400' />
          </StyledCard>
        </Col>
      </Row>
      <div className='mt-5'></div>

      <Row>
        <Col sm={24} xs={24} md={24} lg={24}>
          <StyledButton>실적 다운로드</StyledButton>
        </Col>

      </Row>
      <div className='mt-2'></div>
    </React.Fragment>
  );
}

const mapStateToProps = (state) => {
  const { organizationlist, bigresponse, organizationuserlist } = state.Organization;
  return { organizationlist, bigresponse, organizationuserlist };
};
const mapStateToDispatch = {

}
export default connect(mapStateToProps, mapStateToDispatch)(DashBoard);





