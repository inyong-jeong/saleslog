import React, { useState, useEffect } from "react";
import { Helmet } from "react-helmet";
import { Row, Col, DatePicker, Card, Select, Divider } from 'antd'
import MyAppBar from "components/styledcomponent/MyAppBar";
import cmm from 'constants/common';
import moment from 'moment';
import StyledButton from 'components/styledcomponent/Button'
import StyledCard from 'components/styledcomponent/Card'
import { getsaleslogstat, getleadlogstat, getorganization, getorganizationusers } from 'redux/dashboard/actions';
import DashButton from 'components/DashButton'
import DashButton5 from 'components/DashButton5'
import DashButton3 from 'components/DashButton3'
import NivoBarChart from "components/NivoBarChart";
import NivoPieChart from "components/NivoPieChart";
import { ResponsiveBar } from '@nivo/bar'
import { connect } from 'react-redux'
import Chart from 'react-apexcharts';
import { dountseries, barseries, leadseries, LeadOption, Baroption, dountOption } from 'constants/chart'
import SalesLogFilterDash from 'components/SalesLogFilterDash';
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";

import Filter from 'components/Filter'
const { RangePicker } = DatePicker;

const DashBoardPage = (props) => {
  const state = useSelector(state => state.Dashboard)
  const dispatch = useDispatch()

  const [salesStat, setSalesStat] = useState();
  const [leadStat, setLeadStat] = useState();

  //분류 선택 index (1:영업일지 대분류,2:영업 중분류,3:영업소분류,4:리드대분류,5:리드중분류,6:리드소분류)
  const [selDept, setSelDept] = useState(0);
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
    id: "",
    label: "전체"
  }, {
    id: "0030001",
    label: "니즈 조사"
  }, {
    id: "0030002",
    label: "동항 정보",
  }, {
    id: "0030003",
    label: "제안",
  }]

  const tabs3 = [{
    id: "",
    label: "전체"
  }, {
    id: "0020001",
    label: "발굴"
  }, {
    id: "0020002",
    label: "접촉",
  }, {
    id: "0020003",
    label: "제안",
  }, {
    id: "0020004",
    label: "검증",
  }]

  const sampleData = [
    {
      "id": "haskell",
      "label": "haskell",
      "value": 449,
      "color": "hsl(178, 70%, 50%)"
    },
    {
      "id": "python",
      "label": "python",
      "value": 399,
      "color": "hsl(215, 70%, 50%)"
    },
    {
      "id": "ruby",
      "label": "ruby",
      "value": 503,
      "color": "hsl(156, 70%, 50%)"
    },
    {
      "id": "erlang",
      "label": "erlang",
      "value": 275,
      "color": "hsl(118, 70%, 50%)"
    },
    {
      "id": "php",
      "label": "php",
      "value": 102,
      "color": "hsl(179, 70%, 50%)"
    }
  ]


  //부서 조회 용
  const [inputDept, setinputDept] = useState({
    dept_idx: 0,
    typ: 'lvl'
  })
  //부서별 사용자 조회 
  const [inputUser, setInputUser] = useState({
    dept_idx: 0,
    typ: 'tree'
  })

  //영업일지 검색용 body
  const [bodyLog, setBodyLog] = useState({
    dt_typ: '1',
    from_dt: moment().format('YYYY-MM') + '-01',
    to_dt: moment().format('YYYY-MM-DD'),
    sales_man: '',
    sales_goal: '',
  })

  //리드일지 검색용 body
  const [bodyLogRd, setBodyLogRd] = useState({
    dt_typ: 1,
    from_dt: moment().format('YYYY-MM') + '-01',
    to_dt: moment().format('YYYY-MM-DD'),
    sales_man: '',
    sales_lead_gb: '',
  })


  // bodyLog 값 바뀔 때 dispatch
  useEffect(() => {
    console.log('bodyLog::::::::::::change:::::::::::::', bodyLog)
    dispatch(getsaleslogstat.call(bodyLog))

  }, [bodyLog])

  // bodyLogRd 값 바뀔 때 dispatch
  useEffect(() => {
    dispatch(getleadlogstat.call(bodyLogRd))
    //props.getleadlogstat(bodyLogRd)
  }, [bodyLogRd])

  //마운트 될 때 
  useEffect(() => {
    //console.log('start!!!!!!!!!!!!!!!', bodyLog)
    dispatch(getsaleslogstat.call(bodyLog))
    dispatch(getleadlogstat.call(bodyLogRd))
    //props.getsaleslogstat(bodyLog)
  }, [])

  // 영업일지 fetch 후
  useEffect(() => {
    if (state.getsaleslogstatRes) {
      console.log('영업일지::::::::::::::::::', state.getsaleslogstatRes)
      setSalesStat(state.getsaleslogstatRes)
      console.log('salesstat:::', salesStat)

    }
  }, [state.getsaleslogstatRes])


  // 리드일지 fetch 후
  useEffect(() => {
    if (state.getleadlogstatRes) {
      console.log('리드일지:::::::::::::::', state.getleadlogstatRes)
      setLeadStat(state.getleadlogstatRes)
      console.log('leadstat:::', salesStat)
    }
  }, [state.getleadlogstatRes])

  //영업일지 날짜 구분 클릭
  const onSelected = (id) => {
    console.log('date click:::::::::::::::', id)
    setBodyLog({ ...bodyLog, dt_typ: id });
  }

  //영업일지 날짜 변경시
  const onChange = (dates) => {
    if (dates && dates.length > 1) {
      setBodyLog({ ...bodyLog, from_dt: dates[0].format('YYYY-MM-DD'), to_dt: dates[1].format('YYYY-MM-DD') })
    }
  }

  //영업일지 목표 구분 클릭
  const onSelected_goal = (id) => {
    console.log('date click:::::::::::::::', id)
    setBodyLog({ ...bodyLog, sales_goal: id });
  }


  //리드일지 날짜 구분 클릭
  const onSelectedRd = (id) => {
    setBodyLogRd({ ...bodyLogRd, dt_typ: id });
  }

  //리드일지 날짜 변경시
  const onChangeRd = (dates, dateStrings) => {
    if (dates && dates.length > 1) {
      setBodyLogRd({ ...bodyLogRd, from_dt: dates[0].format('YYYY-MM-DD'), to_dt: dates[1].format('YYYY-MM-DD') })
    }
  }

  //리드일지 목표 구분 클릭
  const onSelected_lead_gb = (id) => {

    setBodyLogRd({ ...bodyLogRd, sales_lead_gb: id });
  }


  //전월문자열
  const dispPrevCnt = (data) => {

    let st = '';
    let cl = '';
    let ar = "";
    console.log(data)
    console.log(bodyLog)
    if (data.calc_cod !== 0) {
      switch (bodyLog.dt_typ) {
        case '1':
          st = "전월 대비";
          break;
        case '2':
          st = "이전 분기 대비";
          break;
        case '3':
          st = "이전 반기 대비";
          break;
        case '4':
          st = "";
          break;
        default:
          st = '';
          break;

      }
    }


    if (parseInt(data.calc_cnt) > 0) {
      cl = '#0000ff';
      ar = "▲";
    } else if (parseInt(data.calc_cnt) < 0) {
      cl = '#ff00ff';
      ar = "▼";
    }

    return (
      <>
        <span style={{ fontSize: 12, color: '#aaaaaa' }}>{st}</span>
        <span style={{ fontSize: 12, color: cl }}>{ar} {data.calc_cnt}</span>&nbsp;&nbsp;&nbsp;
        <span style={{ fontSize: 16 }}>{data.cnt}건</span>
      </>
    )
  }

  //bar 차트 데이타
  const barChartData = (data) => {
    let rtn = [];
    let j = 0;

    rtn[0] = { active_id: data[7].name, '기타': data[7].cnt };
    rtn[1] = { active_id: data[6].name, '소셜커뮤니티': data[6].cnt };
    rtn[2] = { active_id: data[5].name, '도서/전문정보': data[5].cnt };
    rtn[3] = { active_id: data[4].name, '온라인리서치': data[4].cnt };
    rtn[4] = { active_id: data[3].name, '대면': data[3].cnt };
    rtn[5] = { active_id: data[2].name, '행사참여': data[2].cnt };
    rtn[6] = { active_id: data[1].name, '이메일': data[1].cnt };
    rtn[7] = { active_id: data[0].name, '전화': data[0].cnt };



    // for (let i = data.length -1 ; i >= 0; i--) {
    //   let st = data[i].name;
    //   rtn[j] = { active_id: data[i].name, st: data[i].cnt };
    //   j = j+1;
    // }
    // console.log('chart::::::::::::::data:::::::',rtn);
    return rtn;
  }

  const barChartDataRd = (data) => {
    let rtn = [];
    let j = 0;

    rtn[0] = { active_id: data[3].name, '검증': data[3].cnt };
    rtn[1] = { active_id: data[2].name, '제안': data[2].cnt };
    rtn[2] = { active_id: data[1].name, '접촉': data[1].cnt };
    rtn[3] = { active_id: data[0].name, '발굴': data[0].cnt };



    // for (let i = data.length -1 ; i >= 0; i--) {
    //   let st = data[i].name;
    //   rtn[j] = { active_id: data[i].name, st: data[i].cnt };
    //   j = j+1;
    // }
    // console.log('chart::::::::::::::data:::::::',rtn);
    return rtn;
  }


  //pie 차트 데이타 
  const pieChartData = (data) => {
    let rtn = [];


    for (let i = 0; i < data.length; i++) {
      rtn[i] = { id: data[i].needs_cod + ' (' + data[i].percent + '%)', label: data[i].needs_cod, value: data[i].total };
    }

    return rtn;
  }

  return (
    <>
      <MyAppBar
        barTitle={'홈'} />
      <div className='content_body'>
        <p><span style={{ fontSize: 16, fontWeight: 700 }}>영업일지 현황</span></p>
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
        <SalesLogFilterDash key={'log'} id={'log'} data={bodyLog} setData={setBodyLog} />
        <div className='mt-2'></div>

        {(salesStat) &&
          <>
            <Row>
              <Col sm={24} xs={24} md={24} lg={24}>
                <Card title='영업 활동'>
                  <Row>
                    <Col style={{ width: '50%' }}><span>니즈 조사</span></Col>
                    <Col style={{ width: '50%', textAlign: 'right' }}>
                      {dispPrevCnt(salesStat[0][0])}
                    </Col>
                  </Row>
                  <Row>
                    <Col style={{ width: '50%' }}><span>동향/정보</span></Col>
                    <Col style={{ width: '50%', textAlign: 'right' }}>
                      {dispPrevCnt(salesStat[0][1])}
                    </Col>
                  </Row>
                  <Row>
                    <Col style={{ width: '50%' }}><span>제안</span></Col>
                    <Col style={{ width: '50%', textAlign: 'right' }}>
                      {dispPrevCnt(salesStat[0][2])}
                    </Col>
                  </Row>
                </Card>
              </Col>
            </Row>

            <div className='mt-5'></div>

            <Row>
              {/* <Col sm={22} xs={22} md={22} lg={22}><strong><h1>영업일지 채널</h1></strong></Col> */}
              <p><span style={{ fontSize: 16, fontWeight: 700 }}>영업일지 채널</span></p>
            </Row>
            <div className='mt-2'></div>

            <DashButton3 key='channel_button' tab={tabs2} onSelected={onSelected_goal} defaultSelected={bodyLog.sales_goal} />
            {/* <Row justify='center' > */}
            {/* <Col sm={24} xs={24} md={24} lg={24}> */}
            <NivoBarChart key={'bar_1'} data={barChartData(salesStat[1])} labels={Baroption.xaxis.categories}
              margin={{ top: 50, right: 50, bottom: 50, left: 100 }} />
            <div className='mt-2'></div>
            <Row >
              <p><span style={{ fontSize: 14, fontWeight: 400, marginLeft: 20 }}>니즈 분석</span></p>
              <Col sm={24} xs={24} md={24} lg={24}>
                <NivoPieChart data={pieChartData(salesStat[2])} />
              </Col>
            </Row>
            <div className='mt-5'></div>
          </>
        }

        <Divider style={{ borderColor: 'black' }} />
        <Row>

          <p><span style={{ fontSize: 16, fontWeight: 700 }}>리드관리 현황</span></p>
          {/* <Col sm={2} xs={2} md={2} lg={2}><u>상세조회</u></Col> */}
        </Row>
        <div className='mt-2'></div>
        <DashButton key='sales_buttonRd' tab={tabs} onSelected={onSelectedRd} onChange={onChangeRd} defaultSelected={bodyLogRd.dt_typ} />

        <div className='mt-2'></div>
        <SalesLogFilterDash key={'logRd'} id={'logRd'} data={bodyLogRd} setData={setBodyLogRd} />
        {(leadStat) &&
          <>
            <Row >
              <NivoBarChart key={'bar_2'} data={barChartDataRd(leadStat[2])} labels={Baroption.needslabel.categories} barType='vertical'
                margin={{ top: 80, right: 50, bottom: 50, left: 30 }} />
            </Row>
            <div className='mt-5'></div>

            <Row>

              <p><span style={{ fontSize: 16, fontWeight: 700 }}>리드채널</span></p>
              {/* <Col sm={22} xs={22} md={22} lg={22}><strong><h3>리드채널</h3></strong></Col> */}
            </Row>
            <Row>
              <Col sm={24} xs={24} md={24} lg={24}>
                <DashButton5 key='lead_channel_button' tab={tabs3} onSelected={onSelected_lead_gb} defaultSelected={bodyLogRd.sales_lead_gb} />
              </Col>
            </Row>
            <Row >
              <NivoBarChart key={'bar_3'} data={barChartData(leadStat[4])} labels={Baroption.xaxis.categories}
                margin={{ top: 50, right: 50, bottom: 50, left: 100 }} />
              {/* <Col sm={24} xs={24} md={24} lg={24}>
            <Chart options={Baroption} series={barseries} type="bar" />
          </Col> */}
            </Row>
            <div className='mt-5'></div>



            <Row>
              <p><span style={{ fontSize: 14, fontWeight: 400, marginLeft: 20 }}>리드니즈 분석</span></p>
              <Col sm={24} xs={24} md={24} lg={24}>
                <NivoPieChart data={pieChartData(leadStat[5])} />
              </Col>

            </Row>

            <div className='mt-5'></div>
          </>
        }
        {/* <Row justify='center'>
          <Col sm={12} xs={12} md={6} lg={6}>
            <StyledButton>실적 다운로드</StyledButton>
          </Col>

        </Row> */}
        <div className='mt-2'></div>
      </div>
    </>
  );
}


export default DashBoardPage;
// const mapStateToProps = (state) => {
//   const { getsaleslogstatRes, getleadlogstatRes } = state.Dashboard;

//   return { getsaleslogstatRes, getleadlogstatRes };
// };
// const mapStateToDispatch = {
//   getsaleslogstat: getsaleslogstat.call,
//   getleadlogstat: getleadlogstat.call
// }
// export default connect(mapStateToProps, mapStateToDispatch)(DashBoardPage);





