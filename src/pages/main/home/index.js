import React, { useState, useEffect } from "react";
import { Row, Col, DatePicker, Divider, Collapse } from 'antd'
import MyAppBar from "components/styledcomponent/MyAppBar";
import cmm from 'constants/common';
import moment from 'moment';
import { getsaleslogstat, getleadlogstat, getorganization, getorganizationusers } from 'redux/dashboard/actions';
import DashButton from 'components/DashButton'
import DashButton5 from 'components/DashButton5'
import DashButton3 from 'components/DashButton3'
import NivoBarChart from "components/NivoBarChart";
import NivoPieChart from "components/NivoPieChart";
import { dountseries, barseries, leadseries, LeadOption, Baroption, dountOption } from 'constants/chart'
import SalesLogFilterDash from 'components/SalesLogFilterDash';
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import { useMediaQuery } from "react-responsive";
import { ReactComponent as Calendar } from '../../../assets/icons/main/calendar.svg'
import { ReactComponent as Channel } from '../../../assets/icons/main/channel.svg'
import { ReactComponent as Analysis } from '../../../assets/icons/main/analysis.svg'
import { ReactComponent as ChartIcon } from '../../../assets/icons/main/chart.svg'
import { ReactComponent as Paper } from '../../../assets/icons/main/paper.svg'
import { ReactComponent as Down } from '../../../assets/icons/main/downArrow.svg'
import { ReactComponent as Up } from '../../../assets/icons/main/upArrow.svg'
import { ReactComponent as BdayLogo } from '../../../assets/icons/main/bday.svg'
import { base64Enc } from 'constants/commonFunc';
import { useHistory } from "react-router";
import { postAnniversary } from "../../../redux/etc/actions";

const SALESLOG_TYPE = 'SALESLOG_TYPE'
const LEADLOG_TYPE = 'LEADLOG_TYPE'
const { Panel } = Collapse

const DashBoardPage = () => {

  const state = useSelector(state => state.Dashboard)
  const etcState = useSelector(etcState => etcState.Etc)
  const dispatch = useDispatch()
  const history = useHistory()
  const [salesStat, setSalesStat] = useState();
  const [leadStat, setLeadStat] = useState();
  const [bday, setBday] = useState([])

  const isMobile = useMediaQuery({
    query: "(max-width:1190px)"
  });

  const mainGrayTitleStyle = {
    fontSize: 14,
    fontWeight: 500,
    color: '#111111',
    margin: 0
  }

  const textAndIconAlignStyle = {
    display: 'flex',
    alignItems: 'center',
    marginBottom: 5,

  }
  const chartCardStyle = {
    backgroundColor: '#F2F2F2',
    height: 80,
    padding: 10,
    borderRadius: 2,
    color: '#333333',
    fontSize: 14,
    fontWeight: 500,
    width: '100%',

  }

  const leadChartCardWrapperStyle = {
    display: 'flex',
    flexDirection: 'column',
    margin: 15,
    gridGap: 10,
  }

  const customPanelStyle = {
    background: '#fff',
    borderRadius: 4,
    marginBottom: 24,
    border: 0,
    overflow: 'hidden',
  };


  const cardContainerStyle = {
    display: 'flex',
    gridGap: '10px',
    flexDirection: 'row',
    gridGap: 10,
  }

  const mobileCardContainerStyle = {
    display: 'flex',
    gridGap: '10px',
    flexDirection: 'column',
    gridGap: 10,

  }
  //분류 선택 index (1:영업일지 대분류,2:영업 중분류,3:영업소분류,4:리드대분류,5:리드중분류,6:리드소분류)
  const [selDept, setSelDept] = useState(0);
  const selectStyle = { width: '100%' }
  const tabs = [{
    id: "1",
    label: "월"
  }, {
    id: "2",
    label: "분기"
  }, {
    id: "3",
    label: "반기",
  },
  {
    id: "4",
    label: "기간 선택",
  }]

  const tabs2 = [{
    id: "",
    label: "전체"
  }, {
    id: "0030001",
    label: "니즈 조사"
  }, {
    id: "0030002",
    label: "동향/정보",
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

  // birthday 
  useEffect(() => {
    dispatch(postAnniversary.call())
  }, [])

  useEffect(() => {
    if (etcState.postAnniveraryResponse) {
      setBday(etcState.postAnniveraryResponse[0])
    }

  }, [etcState.loading])

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
    dt_typ: '1',
    from_dt: moment().format('YYYY-MM') + '-01',
    to_dt: moment().format('YYYY-MM-DD'),
    sales_man: '',
    sales_lead_gb: '',
  })

  // bodyLog 값 바뀔 때 dispatch
  useEffect(() => {
    if (state.loading) {
      dispatch(getsaleslogstat.call(bodyLog))
      console.log('SALES bodylog ---use effect RAN---')
    }

  }, [bodyLog])

  // bodyLogRd 값 바뀔 때 dispatch
  useEffect(() => {
    if (state.loading) {
      dispatch(getleadlogstat.call(bodyLogRd))
      console.log('LEAD bodylog ---use effect RAN---')
    }
  }, [bodyLogRd])

  // 영업일지 fetch 후
  useEffect(() => {
    if (state.getsaleslogstatRes) {
      console.log('영업일지 STATE::', state.getsaleslogstatRes)
      setSalesStat(state.getsaleslogstatRes)
    }
  }, [state.getsaleslogstatRes])

  // 리드일지 fetch 후
  useEffect(() => {
    if (state.getleadlogstatRes) {
      console.log('리드일지 STATE :: ', state.getleadlogstatRes)
      setLeadStat(state.getleadlogstatRes)
    }
  }, [state.getleadlogstatRes])

  //영업일지 날짜 구분 클릭
  const onSelected = (id) => {
    //console.log('date click:::::::::::::::', id)
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
    // console.log('date click:::::::::::::::', id)
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
  const dispPrevCnt = (data, TYPE) => {

    let bodyType = ''

    if (TYPE === SALESLOG_TYPE) {
      bodyType = bodyLog.dt_typ
    } else {
      bodyType = bodyLogRd.dt_typ
    }

    let arrowDescText = '';
    let arrowChartcolor = '';
    let ArrowIcon = "";
    switch (bodyType) {
      case '1':
        arrowDescText = "전월 대비";
        break;
      case '2':
        arrowDescText = "이전 분기 대비";
        break;
      case '3':
        arrowDescText = "이전 반기 대비";
        break;
      case '4':
        arrowDescText = "";
        break;
      default:
        arrowDescText = '';
        break;
    }


    if (parseInt(data.calc_cnt) > 0) {
      arrowChartcolor = '#0000ff';
      ArrowIcon = <Up />
    } else if (parseInt(data.calc_cnt) < 0) {
      arrowChartcolor = '#EE1818';
      ArrowIcon = <Down />
    }

    return (
      <div style={{ marginRight: 10, marginBottom: 5 }}>
        <p style={{ marginBottom: 5, fontSize: 14, fontWeight: 500, color: '#111', }}> {data.cnt}건</p>
        <span style={{ fontSize: 11, color: '#4B4B4B' }}>{arrowDescText} </span>
        <span style={{ fontSize: 12, color: arrowChartcolor }}> {ArrowIcon} {data.calc_cnt}</span>
      </div>
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

    rtn[0] = { active_id: data[0].name, '발굴': data[0].cnt };
    rtn[1] = { active_id: data[1].name, '접촉': data[1].cnt };
    rtn[2] = { active_id: data[2].name, '제안': data[2].cnt };
    rtn[3] = { active_id: data[3].name, '검증': data[3].cnt };

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

    if (data.length <= 0) {
      rtn[0] = { id: 'no data', label: '데이터 없음', value: 100 }
    } else {
      for (let i = 0; i < data.length; i++) {
        rtn[i] = { id: data[i].needs_cod + ' (' + data[i].percent + '%)', label: data[i].needs_cod, value: data[i].total };
      }

    }

    return rtn;
  }

  const handleAnniversary = (item) => {
    history.push(`/main/manager/profile/${base64Enc(item.acc_idx)}/${base64Enc(item.accm_idx)}`)
  }

  const DateItem = ({ item, onClick }) => (
    <div style={{ cursor: 'pointer' }} onClick={onClick}>
      <div style={{ display: 'flex', marginBottom: 2, alignItems: 'center' }}>
        <p style={{ margin: 0, fontWeight: 500, fontSize: 14, color: '#111111' }}>{item.man_name}</p>
        <p style={{ margin: 0, fontWeight: 400, fontSize: 12, color: '#666666', marginLeft: 5, flexGrow: 2 }}>{item.account_name}</p>
        <p style={{ margin: 0, color: '#666666', fontSize: 12 }}>날짜 : {item.days}</p>
      </div>
      <Divider style={{ margin: 0 }} />
    </div>
  )

  const sectionTitle = (title, icon) => (
    <p style={textAndIconAlignStyle}>
      <p style={{ margin: 0 }}> {icon} &nbsp; </p>
      <p style={mainGrayTitleStyle}> {title} </p>
    </p>
  )

  return (
    <>
      <MyAppBar
        barTitle={'홈'} />
      <div className='content_body'>
        {
          isMobile ?
            <Collapse bordered={false} style={{ backgroundColor: '#fff' }} expandIconPosition='right'>
              <Panel header="생일" key="1" style={customPanelStyle}>
                <div>
                  <p style={{ fontSize: 12, color: '#666666' }}><BdayLogo /> 오늘 기준 7일 내 생일만 표시됩니다.</p>
                  <div className='mt-1' />
                  {
                    bday.map((item, index) => (
                      <DateItem key={item.b_idx} item={item} onClick={() => handleAnniversary(item)} />
                    ))
                  }
                </div>
              </Panel>
            </Collapse>

            : null
        }
        {sectionTitle("영업일지 현황", <Calendar />)}
        <div className='mt-1' />
        <DashButton key='sales_button' tab={tabs} onSelected={onSelected} onChange={onChange} defaultSelected={bodyLog.dt_typ} />
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
        <div className='mt-2' />
        <SalesLogFilterDash key={'log'} id={'log'} data={bodyLog} setData={setBodyLog} />
        <div className='mt-5' />

        {salesStat &&
          <>
            <div>
              {sectionTitle("영업 목적", <ChartIcon />)}
              <div className='mt-1' />
              <div style={isMobile ? mobileCardContainerStyle : cardContainerStyle}>
                <div style={chartCardStyle}>
                  니즈 조사
                  <div style={{ textAlign: 'right' }}>
                    {dispPrevCnt(salesStat[0][0], SALESLOG_TYPE)}
                  </div>
                </div>
                <div style={chartCardStyle}>
                  동향/정보
                  <div style={{ textAlign: 'right' }}>
                    {dispPrevCnt(salesStat[0][1], SALESLOG_TYPE)}
                  </div>
                </div>
                <div style={chartCardStyle}>
                  제안
                  <div style={{ textAlign: 'right' }}>
                    {dispPrevCnt(salesStat[0][2], SALESLOG_TYPE)}
                  </div>
                </div>
              </div>
            </div>

            <div className='mt-5' />

            <Row>
              {sectionTitle("영업 채널", <Channel />)}
            </Row>
            <div className='mt-1' />
            <DashButton3 key='channel_button' tab={tabs2} onSelected={onSelected_goal} defaultSelected={bodyLog.sales_goal} />
            <NivoBarChart key={'bar_1'} data={barChartData(salesStat[1])} labels={Baroption.xaxis.categories}
              margin={{ top: 50, right: 50, bottom: 50, left: 80 }} />

            <div className='mt-5' />
            <Row >
              {sectionTitle("영업 니즈 현황", <Analysis />)}
              <Col sm={24} xs={24} md={24} lg={24}>
                <NivoPieChart data={pieChartData(salesStat[2])} hasData={salesStat[2].length <= 0 ? false : true} />
              </Col>
            </Row>
            <div className='mt-5' />
          </>
        }
        <Divider style={{ borderColor: '#dfdfdf' }} />

        <Row>
          {sectionTitle("리드관리 현황", <Paper />)}
        </Row>
        <div className='mt-1' />

        <DashButton key='sales_buttonRd' tab={tabs} onSelected={onSelectedRd} onChange={onChangeRd} defaultSelected={bodyLogRd.dt_typ} />
        <div className='mt-2' />
        <SalesLogFilterDash key={'logRd'} id={'logRd'} data={bodyLogRd} setData={setBodyLogRd} />

        <div className='mt-5' />
        {leadStat ?
          <div>
            {sectionTitle("리드 고객", <ChartIcon />)}
            <div className='mt-1' />
            <div style={isMobile ? mobileCardContainerStyle : cardContainerStyle}>
              <div style={chartCardStyle}>
                리드 고객 수
                <div style={{ textAlign: 'right' }}>
                  {dispPrevCnt(leadStat[0][0], LEADLOG_TYPE)}
                </div>
              </div>
              <div style={chartCardStyle}>
                고객 전환
                <div style={{ textAlign: 'right' }}>
                  {dispPrevCnt(leadStat[1][0], LEADLOG_TYPE)}
                </div>
              </div>
            </div>
          </div> : null
        }
        <div className='mt-5' />
        {sectionTitle("리드 단계 현황", <Paper />)}
        <div className='mt-1' />
        {leadStat &&
          <>
            <Row >
              <NivoBarChart
                key={'bar_2'}
                data={barChartDataRd(leadStat[2])}
                labels={Baroption.needslabel.categories}
                barType='vertical'
                margin={{ top: 10, right: 30, bottom: 50, left: 30 }} />
            </Row>
            <div className='mt-1' />

            <div style={leadChartCardWrapperStyle}>
              <div style={chartCardStyle}>
                유입
                <div style={{ display: 'flex', justifyContent: 'space-evenly' }}>
                  {dispPrevCnt(leadStat[2][0], LEADLOG_TYPE)}
                  {dispPrevCnt(leadStat[2][1], LEADLOG_TYPE)}
                  {dispPrevCnt(leadStat[2][2], LEADLOG_TYPE)}
                  {dispPrevCnt(leadStat[2][3], LEADLOG_TYPE)}
                </div>
              </div>
              <div style={chartCardStyle}>
                드롭
                <div style={{ display: 'flex', justifyContent: 'space-evenly' }}>
                  {dispPrevCnt(leadStat[3][0], LEADLOG_TYPE)}
                  {dispPrevCnt(leadStat[3][1], LEADLOG_TYPE)}
                  {dispPrevCnt(leadStat[3][2], LEADLOG_TYPE)}
                  {dispPrevCnt(leadStat[3][3], LEADLOG_TYPE)}
                </div>
              </div>
            </div>

            <div className='mt-5' />
            {sectionTitle("리드 활동 목적", <ChartIcon />)}
            <div className='mt-1' />

            <div style={isMobile ? mobileCardContainerStyle : cardContainerStyle}>
              <div style={chartCardStyle}>
                니즈 조사
                <div style={{ textAlign: 'right' }}>
                  {dispPrevCnt(leadStat[6][0], LEADLOG_TYPE)}
                </div>
              </div>
              <div style={chartCardStyle}>
                동향/정보
                <div style={{ textAlign: 'right' }}>
                  {dispPrevCnt(leadStat[6][1], LEADLOG_TYPE)}
                </div>
              </div>
              <div style={chartCardStyle}>
                제안
                <div style={{ textAlign: 'right' }}>
                  {dispPrevCnt(leadStat[6][2], LEADLOG_TYPE)}
                </div>
              </div>
            </div>


            <div className='mt-5'>
              {sectionTitle("리드 채널", <Channel />)}
            </div>
            <div className='mt-1' />
            <Row>
              <Col sm={24} xs={24} md={24} lg={24}>
                <DashButton5 key='lead_channel_button' tab={tabs3} onSelected={onSelected_lead_gb} defaultSelected={bodyLogRd.sales_lead_gb} />
              </Col>
            </Row>
            <Row >
              <NivoBarChart key={'bar_3'} data={barChartData(leadStat[4])} labels={Baroption.xaxis.categories}
                margin={{ top: 50, right: 50, bottom: 50, left: 80 }} />
              {/* <Col sm={24} xs={24} md={24} lg={24}>
            <Chart options={Baroption} series={barseries} type="bar" />
          </Col> */}
            </Row>
            <div className='mt-5'></div>

            <Row>
              {sectionTitle("리드 니즈 현황", <Analysis />)}
              <Col sm={24} xs={24} md={24} lg={24}>
                <NivoPieChart data={pieChartData(leadStat[5])} hasData={leadStat[5].length <= 0 ? false : true} />
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
      </div>
    </>
  );
}

export default DashBoardPage;

