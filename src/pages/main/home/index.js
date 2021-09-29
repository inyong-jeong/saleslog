import React, { useState, useEffect } from "react";
import { Helmet } from "react-helmet";
import { Row, Col, DatePicker, Card, Select, Divider } from 'antd'
import MyAppBar from "components/styledcomponent/MyAppBar";
import cmm from 'constants/common';
import moment from 'moment';
import StyledButton from 'components/styledcomponent/Button'
import StyledCard from 'components/styledcomponent/Card'
import { getsaleslogstat, getleadlogstat, getorganization, getorganizationusers } from 'redux/actions';
import DashButton from 'components/DashButton'
import DashButton5 from 'components/DashButton5'
import DashButton3 from 'components/DashButton3'
import NivoBarChart from "components/NivoBarChart";
import { ResponsiveBar } from '@nivo/bar'
import { connect } from 'react-redux'
import Chart from 'react-apexcharts';
import { dountseries, barseries, leadseries, LeadOption, Baroption, dountOption } from 'constants/chart'
import Filter from 'components/Filter'
const { RangePicker } = DatePicker;

function DashBoard(props) {

  const [date, setDate] = useState(undefined)
  const [biglist, setBigList] = useState(undefined);
  const [middlelist, setMiddleList] = useState(undefined);
  const [smalllist, setSmallList] = useState(undefined);
  const [key, setKey] = useState(0);
  const [selectedOrganization1, setSelectedOrganization1] = useState(undefined);
  const [selectedOrganization2, setSelectedOrganization2] = useState(undefined);
  const [selectedOrganization3, setSelectedOrganization3] = useState(undefined);
  const [selectedOrganizationuser, setSelectedOrganizationUser] = useState(undefined);

  const [selectedItems, setSelectedItems] = useState([])
  const filteredlist = props.organizationuserlist && props.organizationuserlist.map(v => v.user_name);
  const filteredOptions = filteredlist && filteredlist.filter((v) => !selectedItems.includes(v))
  const selectStyle = { width: '100%' }
  const tabs = [{
    id: "1",
    label: "이번달"
  }, {
    id: "2",
    label: "분기"
  }, {
    id: "3",
    label: "반기",
  },
  {
    id: "4",
    label: "기간선택",
  }]

  const tabs2 = [{
    id: "ALL",
    label: "전체"
  }, {
    id: "NEEDS",
    label: "니즈 조사"
  }, {
    id: "INFORMATION",
    label: "동항 정보",
  }, {
    id: "SUGGESTION",
    label: "제안",
  }]

  const tabs3 = [{
    id: "ALL",
    label: "전체"
  }, {
    id: "EXCAVAITON",
    label: "발굴"
  }, {
    id: "INVESTIGATION",
    label: "조사",
  }, {
    id: "APPROACH",
    label: "접촉",
  }, {
    id: "VERIFICATION",
    label: "검증",
  }]

  const chartLbl = [{
    id: "ALL",
    label: "전체"
  }, {
    id: "EXCAVAITON",
    label: "발굴"
  }, {
    id: "INVESTIGATION",
    label: "조사",
  }, {
    id: "APPROACH",
    label: "접촉",
  }, {
    id: "VERIFICATION",
    label: "검증",
  }]

  const sampleData = [
    
    
    {
      "active_id": "기타",
      "기타": 0,
    },    
    {
      "active_id": "소셜커뮤니티",
      "소셜커뮤니티": 50,
    },
    {
      "active_id": "도서/전문정보",
      "도서/전문정보": 16,
    },
    {
      "active_id": "온라인리서치",
      "온라인리서치": 32,
    },
    {
      "active_id": "대면",
      "대면": 200,
    },
    {
      "active_id": "행사참여",
      "행사참여": 32,
    },
    {
      "active_id": "이메일",
      "이메일": 59,
    },
    {
      "active_id": "전화",
      "전화": 163,
    },

  ]
  const [filterdata, setFilterData] = useState({
    dept_idx: 0,
    typ: 'lvl'
  })

  const [data, setData] = useState({
    dept_idx: 0,
    typ: 'tree'
  })

  //영업일지 검색용 body
  const [bodyLog, setBodyLog] = useState({
    dt_typ:1,
    from_dt: '',
    to_dt: '',
    sales_man: '',
    sales_goal:'',
  })

  //리드일지 검색용 body
  const [bodyRdLog, setBodyRdLog] = useState({
    dt_typ:1,
    from_dt: '',
    to_dt: '',
    sales_man: '',
    sales_goal:'',
  })


  // bodyLog 값 바뀔 때 dispatch
  useEffect(() => {
    // if (props.stat) {
    //   props.getsaleslogstat(body)
    // }
  }, [bodyLog])

  // bodyRdLog 값 바뀔 때 dispatch
  useEffect(() => {
    
    // if (props.stat) {
    //   props.getsaleslogstat(body)
    // }
  }, [bodyRdLog])

  //마운트 될 때 
  useEffect(() => {
    //
  }, [])
  

  // 대분류 선택
  useEffect(() => {
    if (selectedOrganization1) {
      props.getorganization(filterdata)
      setKey(1)
    }
  }, [selectedOrganization1])

  useEffect(() => {
    if (props.organizationuserlist) {
      const userlist = props.organizationuserlist.map(v => v.login_idx);
      console.log(userlist)
     // setBodyLog({ ...bodyLog, 'sales_man': userlist })
    }
  }, [props.organizationuserlist])

  useEffect(() => {
    if (props.organizationlist) {
      if (key === 0) {
        setBigList(props.organizationlist)
      } else if (key === 1) {
        setMiddleList(props.organizationlist)
      } else if (key === 2) {
        setSmallList(props.organizationlist)
      }
    }
  }, [props.organizationlist])

  //중분류 선택
  useEffect(() => {
    if (selectedOrganization2) {
      props.getorganization(filterdata)
      setKey(2)
    }
  }, [selectedOrganization2])

  // 소분류 선택
  useEffect(() => {
    if (selectedOrganization3) {
      props.getorganizationusers(data)
      // setKey(3)
    }
  }, [selectedOrganization3])

  // 멤버 선택
  useEffect(() => {
    if (selectedOrganizationuser) {
      console.log(selectedOrganizationuser)
      //setBody({ ...body, 'sales_man': selectedOrganizationuser })
      // props.searchLogList(props.data)
    }
  }, [selectedOrganizationuser])

  // useEffect(() => {
  //   props.getorganizationusers(data)
  // }, [data])

  const onOrganizationSelectChange1 = (v) => {
    console.log(v)
    setSelectedOrganization1(v);
    setFilterData({ ...filterdata, 'dept_idx': v })
    setData({ ...data, 'dept_idx': v })
  }

  const onOrganizationSelectChange2 = (v) => {
    setSelectedOrganization2(v);
    setFilterData({ ...filterdata, 'dept_idx': v })
    setData({ ...data, 'dept_idx': v })
  }
  const onOrganizationSelectChange3 = (v) => {
    setSelectedOrganization3(v);
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
    let memberlist = filterList(label)
    setSelectedOrganizationUser(memberlist);
  }

  // const getMonthlyStat = () => {
  //   const fromdate = new Date() - (24 * 60 * 60 * 1000 * 31);
  //   setBody({ ...body, 'fromdate': fromdate, 'todate': new Date().getTime() })
  // }
  // const getThreeMonthlyStat = () => {
  //   const fromdate = new Date() - (24 * 60 * 60 * 1000 * 31 * 3);
  //   setBody({ ...body, 'fromdate': fromdate, 'todate': new Date().getTime() })
  // }
  // const getSixMonthlyStat = () => {
  //   const fromdate = new Date() - (24 * 60 * 60 * 1000 * 31 * 6);
  //   setBody({ ...body, 'fromdate': fromdate, 'todate': new Date().getTime() })
  // }
  // const getYearlyStat = () => {
  //   const fromdate = new Date() - (24 * 60 * 60 * 1000 * 31 * 12);
  //   setBody({ ...body, 'fromdate': fromdate, 'todate': new Date().getTime() })
  // }

  //영업일지 날짜 구분 클릭
  const onSelected = (id) => {    
    console.log('date click:::::::::::::::',id)
      setBodyLog({...bodyLog, dt_typ:id});
  }

  //영업일지 날짜 변경시
  function onChange(dates, dateStrings) {
    console.log('From: ', dates[0]._d.getTime(), ', to: ', dates[1]._d.getTime());
    if (dates) {
      setBodyLog({ ...bodyLog, 'fromdate': dates[0]._d.getTime(), 'todate': dates[1]._d.getTime() })
    }
  }

  //리드일지 날짜 구분 클릭
  const onSelectedRd = (id) => {    
    console.log('date click:::::::::::::::',id)
      setBodyRdLog({...bodyRdLog, dt_typ:id});
  }

  //리드일지 날짜 변경시
  function onChangeRd(dates, dateStrings) {
    console.log('From: ', dates[0]._d.getTime(), ', to: ', dates[1]._d.getTime());
    if (dates) {
      setBodyRdLog({ ...bodyRdLog, 'fromdate': dates[0]._d.getTime(), 'todate': dates[1]._d.getTime() })
    }
  }

  return (
    <>
      <MyAppBar
        barTitle={'홈'}/>
      <div className='content_body'>
        <p><span style={{fontSize:16, fontWeight:700}}>영업일지 현황</span></p>
        <DashButton key='sales_button' tab={tabs} onSelected={onSelected} onChange={onChange} defaultSelected={bodyLog.dt_typ} />
        
        <div className='mt-2'></div>
        {/* <Row gutter={4} >
          <Col sm={24} xs={24} md={24} lg={24} >
            <RangePicker className='col-12'
              placeholder={['0000.00.00', '0000.00.00']}
              ranges={{
                Today: [moment(), moment()],
                'This Month': [moment().startOf('month'), moment().endOf('month')],
              }}
              onChange={onChange}
            />
          </Col>
        </Row> */}
        <div className='mt-2'></div>

        <Filter
          selectStyle={selectStyle}
          biglist={biglist}
          selectedOrganization1={selectedOrganization1}
          onOrganizationSelectChange1={onOrganizationSelectChange1}
          middlelist={middlelist}
          onOrganizationSelectChange2={onOrganizationSelectChange2}
          selectedOrganization2={selectedOrganization2}
          smalllist={smalllist}
          onOrganizationSelectChange3={onOrganizationSelectChange3}
          selectedOrganization3={selectedOrganization3}
          selectedItems={selectedItems}
          filteredOptions={filteredOptions}
          onOrganizationUserSelectChange={onOrganizationUserSelectChange}
        />
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
          <Col sm={22} xs={22} md={22} lg={22}><strong><h1>영업일지 채널</h1></strong></Col>
        </Row>
        <div className='mt-2'></div>
        <DashButton3 key='channel_button' tab={tabs2}  defaultSelected='ALL' />
        {/* <Row justify='center' > */}
        {/* <Col sm={24} xs={24} md={24} lg={24}> */}      
        <NivoBarChart data={sampleData} />

        {/* </Col> */}
        {/* </Row> */}
        <Row >
          <Col sm={24} xs={24} md={24} lg={24}>
            <StyledCard title='니즈 분석'>
              <Chart options={dountOption} series={dountseries} type="donut" />
            </StyledCard>
          </Col>
        </Row>
        <div className='mt-5'></div>
        <Divider style={{ borderColor: 'black' }} />
        <Row>
          <Col sm={22} xs={22} md={22} lg={22}><strong><h3>리드관리 현황</h3></strong></Col>
          {/* <Col sm={2} xs={2} md={2} lg={2}><u>상세조회</u></Col> */}
        </Row>
        <div className='mt-2'></div>
        <DashButton key='sales_buttonRd' tab={tabs} onSelected={onSelectedRd} onChange={onChangeRd} defaultSelected={bodyRdLog.dt_typ}  />
        
        <div className='mt-2'></div>
        <Filter
          selectStyle={selectStyle}
          biglist={biglist}
          selectedOrganization1={selectedOrganization1}
          onOrganizationSelectChange1={onOrganizationSelectChange1}
          middlelist={middlelist}
          onOrganizationSelectChange2={onOrganizationSelectChange2}
          selectedOrganization2={selectedOrganization2}
          smalllist={smalllist}
          onOrganizationSelectChange3={onOrganizationSelectChange3}
          selectedOrganization3={selectedOrganization3}
          selectedItems={selectedItems}
          filteredOptions={filteredOptions}
          onOrganizationUserSelectChange={onOrganizationUserSelectChange}
        />
        <Row >
          <Col sm={24} xs={24} md={24} lg={24}>
            <Chart options={LeadOption} series={leadseries} type="bar" />
          </Col>
        </Row>
        <div className='mt-5'></div>

        <Row>
          <Col sm={22} xs={22} md={22} lg={22}><strong><h3>리드채널</h3></strong></Col>
        </Row>
        <Row>
          <Col sm={24} xs={24} md={24} lg={24}>
            <DashButton5 key='lead_channel_button' tab={tabs3}  defaultSelected='ALL' />
          </Col>
        </Row>
        <Row >
          <Col sm={24} xs={24} md={24} lg={24}>
            <Chart options={Baroption} series={barseries} type="bar" />
          </Col>
        </Row>
        <div className='mt-5'></div>

        <Row>
          <Col sm={22} xs={22} md={22} lg={22}><strong><h3>리드니즈 분석</h3></strong></Col>
        </Row>
        <Row justify='center' >
          <Col sm={24} xs={24} md={24} lg={24}>
            <div >
              <StyledCard title='니즈 분석' style={{ justifyContent: 'center' }}>
                <Chart options={dountOption} series={dountseries} type="donut" />
              </StyledCard>
            </div>

          </Col>
        </Row>
        <div className='mt-5'></div>

        <Row justify='center'>
          <Col sm={12} xs={12} md={6} lg={6}>
            <StyledButton>실적 다운로드</StyledButton>
          </Col>

        </Row>
        <div className='mt-2'></div>
      </div>
    </>
  );
}

const mapStateToProps = (state) => {
  const { stat } = state.Dashboard;
  const { organizationlist, organizationuserlist } = state.Organization;

  return { stat, organizationlist, organizationuserlist };
};
const mapStateToDispatch = {
  getsaleslogstat: getsaleslogstat.call,
  getleadlogstat: getleadlogstat.call,
  getorganization: getorganization.call,
  getorganizationusers: getorganizationusers.call,
}
export default connect(mapStateToProps, mapStateToDispatch)(DashBoard);





