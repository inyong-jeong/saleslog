import React, { useState, useEffect } from "react";
import { Row, Col, Divider, Collapse } from 'antd'
import MyAppBar from "components/styledcomponent/MyAppBar";
import moment from 'moment';
import { getsaleslogstat, getleadlogstat, getlogsdownload } from 'redux/dashboard/actions';
import { getProfileInfo } from 'redux/workgroup/actions';
import DashButton from 'components/DashButton'
import DashButton5 from 'components/DashButton5'
import DashButton3 from 'components/DashButton3'
import NivoBarChart from "components/NivoBarChart";
import NivoPieChart from "components/NivoPieChart";
import { Baroption } from 'constants/chart'
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
import styles from '../../../assets/style/Main.module.css'
import { getUserInfo } from 'helpers/authUtils';
import StyledButton from 'components/styledcomponent/Button'
// json & excel
//import XLSX from 'xlsx';

const SALESLOG_TYPE = 'SALESLOG_TYPE'
const LEADLOG_TYPE = 'LEADLOG_TYPE'
const { Panel } = Collapse

const DashBoardPage = () => {

  const myInfo = getUserInfo();
  const state = useSelector(state => state.Dashboard)
  const etcState = useSelector(etcState => etcState.Etc)
  const orgState = useSelector(orgState => orgState.Organization)
  const dispatch = useDispatch()
  const history = useHistory()
  const [salesStat, setSalesStat] = useState();
  const [leadStat, setLeadStat] = useState();
  const [bday, setBday] = useState([])
  const [birthday, setBirthDay] = useState();
  const [birthdaylist, setBirthDayList] = useState([]);
  const [firstTime, setFirstTime] = useState(true)
  const isMobile = useMediaQuery({
    query: "(max-width:1190px)"
  });

  const mainGrayTitleStyle = {
    fontSize: 16,
    fontWeight: 700,
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
    gridGap: 10,
  }

  const customPanelStyle = {
    background: '#fff',
    borderRadius: 4,
    marginBottom: 24,
    border: 0,
    overflow: 'hidden',
    fontSize: 16,
    fontWeight: 700

  };


  const cardContainerStyle = {
    display: 'flex',
    gridGap: '10px',
    flexDirection: 'row',
  }

  const mobileCardContainerStyle = {
    display: 'flex',
    gridGap: '10px',
    flexDirection: 'column',
  }

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

  const [userPermission, setUserPermission] = useState(myInfo.permission)
  //SALESLOG
  const [bodyLog, setBodyLog] = useState({
    dt_typ: '1',
    from_dt: moment().format('YYYY-MM') + '-01',
    to_dt: moment().format('YYYY-MM-DD'),
    sales_man: '',
    sales_goal: '',
    dept_idx: '',
  })
  //SALESLOG LEAD
  const [bodyLogRd, setBodyLogRd] = useState({
    dt_typ: '1',
    from_dt: moment().format('YYYY-MM') + '-01',
    to_dt: moment().format('YYYY-MM-DD'),
    sales_man: '',
    sales_lead_gb: '',
    dept_idx: '',
  })

  useEffect(() => {
    dispatch(getProfileInfo.call())
    dispatch(postAnniversary.call())
    setUserPermission(myInfo.permission)
    // setFirstTime(false)
    console.log('111', firstTime)
  }, [])

  useEffect(() => {
    if (etcState.postAnniveraryResponse.length > 0) {
      setBday(etcState.postAnniveraryResponse[0])
    }
  }, [etcState.loading])

  useEffect(() => {
    // if (userPermission != 9) {
    //   orgState.organizationDashRes && dispatch(getsaleslogstat.call(bodyLog))
    //   return
    // }

    // if (firstTime) {
    //   return;
    // }
    console.log('222')
    dispatch(getsaleslogstat.call(bodyLog))
  }, [bodyLog])

  useEffect(() => {
    // if (userPermission != 9) {
    //   orgState.organizationDashRes && dispatch(getleadlogstat.call(bodyLogRd))
    //   return
    // }

    // if (firstTime) {
    //   return;
    // }

    dispatch(getleadlogstat.call(bodyLogRd))
  }, [bodyLogRd])

  // 영업일지 fetch 후
  useEffect(() => {
    if (state.getsaleslogstatRes) {
      return setSalesStat(state.getsaleslogstatRes)
    }
  }, [state.getsaleslogstatRes])

  // 리드일지 fetch 후
  useEffect(() => {
    if (state.getleadlogstatRes) {
      setLeadStat(state.getleadlogstatRes)
    }
  }, [state.getleadlogstatRes])

  //영업일지 날짜 구분 클릭
  const onSelected = (id) => {
    setBodyLog({ ...bodyLog, dt_typ: id });
  }

  //영업일지 날짜 변경시
  const onChangeFrom = (dates) => {
    if (dates) {
      setBodyLog({ ...bodyLog, from_dt: dates.format('YYYY-MM-DD') })
    }
  }
  const onChangeTo = (dates) => {
    if (dates) {
      setBodyLog({ ...bodyLog, to_dt: dates.format('YYYY-MM-DD') })
    }
  }

  //영업일지 목표 구분 클릭
  const onSelected_goal = (id) => {
    setBodyLog({ ...bodyLog, sales_goal: id });
  }


  //리드일지 날짜 구분 클릭
  const onSelectedRd = (id) => {
    setBodyLogRd({ ...bodyLogRd, dt_typ: id });
  }

  //리드일지 날짜 변경시
  const onChangeFromRd = (dates, dateStrings) => {
    if (dates) {
      setBodyLogRd({ ...bodyLogRd, from_dt: dates.format('YYYY-MM-DD') })
    }
  }
  const onChangeToRd = (dates, dateStrings) => {
    if (dates) {
      setBodyLogRd({ ...bodyLogRd, to_dt: dates.format('YYYY-MM-DD') })
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
    let rtn = []
    rtn[0] = { active_id: data[7].name, '기타': data[7].cnt };
    rtn[1] = { active_id: data[6].name, '소셜커뮤니티': data[6].cnt };
    rtn[2] = { active_id: data[5].name, '도서/전문정보': data[5].cnt };
    rtn[3] = { active_id: data[4].name, '온라인리서치': data[4].cnt };
    rtn[4] = { active_id: data[3].name, '대면': data[3].cnt };
    rtn[5] = { active_id: data[2].name, '행사참여': data[2].cnt };
    rtn[6] = { active_id: data[1].name, '이메일': data[1].cnt };
    rtn[7] = { active_id: data[0].name, '전화': data[0].cnt };
    return rtn
  }

  const barChartDataRd = (data) => {
    let rtn = []
    rtn[0] = { active_id: data[0].name, '발굴': data[0].cnt };
    rtn[1] = { active_id: data[1].name, '접촉': data[1].cnt };
    rtn[2] = { active_id: data[2].name, '제안': data[2].cnt };
    rtn[3] = { active_id: data[3].name, '검증': data[3].cnt };
    return rtn
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
    <div
      className={styles.dateItem}
      onClick={onClick}>
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

  //영업일지 실적다운로드
  const handleCsvDownload = () => {
    //XLSX
    console.log('excel download click:::')
    dispatch(getlogsdownload.call({ dt_typ: bodyLog.dt_typ, from_dt: bodyLog.from_dt, to_dt: bodyLog.to_dt, sales_man: bodyLog.sales_man, dept_idx: bodyLog.dept_idx, sales_gb: '0010001' }));
  }

  //리드일지 실적다운로드
  const handleCsvDownloadRd = () => {
    //XLSX
    console.log('excel download click')
    dispatch(getlogsdownload.call({ dt_typ: bodyLogRd.dt_typ, from_dt: bodyLogRd.from_dt, to_dt: bodyLogRd.to_dt, sales_man: bodyLogRd.sales_man, dept_idx: bodyLogRd.dept_idx, sales_gb: '0010002' }));
  }

  useEffect(() => {
    //console.log('excel::111::', state.getlogsdownloadRes);
    if (state.getlogsdownloadRes) {
      console.log('excel::::', state.getlogsdownloadRes);
    }

  }, [state.getlogsdownloadRes])

  function getBirthDayList(List) {
    let result = [];
    for (let i = 0; i < List.length; i++) {
      if (bday[i].today === 'today') {
        result = result.concat(bday[i])
      }
    }
    return result
  }

  useEffect(() => {
    if (bday.length > 0) {
      const today = 'today';
      const List = bday.map(v => v.today);
      if (List.indexOf(today) >= 0) {
        setBirthDay(true);
        setBirthDayList(getBirthDayList(bday))
      }
    }
  }, [bday.length])

  const handleCommingAnn = () => {
    history.push(`/main/etc/notice/anniversary`)
  }
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
                  {birthday ?
                    <p style={{ fontSize: 14, color: '#666666', fontWeight: 500 }}><BdayLogo /> {`오늘의 생일은 ${bday[0].man_name}님 외 ${birthdaylist.length - 1}명 입니다.`} </p>
                    :
                    <p onClick={handleCommingAnn} style={{ fontSize: 14, color: '#666666', cursor: 'pointer', fontWeight: 500 }}><BdayLogo /> 다가오는 생일을 확인하세요</p>
                  }
                  <div className='mt-1' />
                  {birthday &&
                    birthdaylist.map(item => (
                      <DateItem key={item.b_idx} item={item} onClick={() => handleAnniversary(item)} />
                    ))}
                </div>
              </Panel>
            </Collapse>
            : null
        }
        <div className='mt-5' />

        {sectionTitle("영업일지 현황", <Calendar />)}
        <div className='mt-1' />
        <DashButton
          key='sales_button'
          tab={tabs}
          onSelected={onSelected}
          onChangeFrom={onChangeFrom}
          onChangeTo={onChangeTo}
          defaultSelected={bodyLog.dt_typ} />

        <div className='mt-2' />
        {myInfo.permission != 9 ?
          <SalesLogFilterDash
            key={'log'}
            id={'log'}
            data={bodyLog}
            setData={setBodyLog} /> : null}

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
              margin={{ top: 50, right: 50, bottom: 50, left: 80 }} hideAxisBottom />

            <div className='mt-2' />
            <Row >
              {sectionTitle("영업 니즈 현황", <Analysis />)}
              <Col sm={24} xs={24} md={24} lg={24}>
                <NivoPieChart data={pieChartData(salesStat[2])} hasData={salesStat[2].length <= 0 ? false : true} />
              </Col>
            </Row>
            <div className='mt-5' />
          </>
        }
        <Row justify='center'>
          <Col sm={12} xs={12} md={12} lg={12}>
            <StyledButton onClick={handleCsvDownload}>영업일지 실적 다운로드</StyledButton>
          </Col>
        </Row>
        <Divider style={{ borderColor: '#dfdfdf' }} />
        <div className='mt-5' />

        <Row>
          {sectionTitle("리드관리 현황", <Paper />)}
        </Row>
        <div className='mt-1' />

        <DashButton key='sales_buttonRd'
          tab={tabs}
          onChangeFrom={onChangeFromRd}
          onChangeTo={onChangeToRd}
          onSelected={onSelectedRd}
          defaultSelected={bodyLogRd.dt_typ} />
        <div className='mt-2' />
        {myInfo.permission != 9 ?
          <SalesLogFilterDash
            key={'logRd'}
            id={'logRd'}
            data={bodyLogRd}
            setData={setBodyLogRd} />
          : null
        }
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
                hideAxisLeft
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
            <div>
              <DashButton5
                key='lead_channel_button'
                tab={tabs3}
                onSelected={onSelected_lead_gb}
                defaultSelected={bodyLogRd.sales_lead_gb} />
            </div>
            <Row >
              <NivoBarChart
                key={'bar_3'}
                data={barChartData(leadStat[4])}
                labels={Baroption.xaxis.categories}
                margin={{ top: 50, right: 50, bottom: 50, left: 80 }}
                hideAxisBottom
              />
            </Row>
            <div className='mt-2'></div>

            <Row>
              {sectionTitle("리드 니즈 현황", <Analysis />)}
              <Col sm={24} xs={24} md={24} lg={24}>
                <NivoPieChart data={pieChartData(leadStat[5])} hasData={leadStat[5].length <= 0 ? false : true} />
              </Col>

            </Row>

            <div className='mt-5'></div>
          </>
        }
        <Row justify='center'>
          <Col sm={12} xs={12} md={12} lg={12}>
            <StyledButton onClick={handleCsvDownloadRd}>리드일지 실적 다운로드</StyledButton>
          </Col>
        </Row>
        <div className='mt-5' />
      </div>
    </>
  );
}

export default DashBoardPage;

