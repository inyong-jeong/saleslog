import React, { useState, useEffect } from "react";
import { Row, Col, Divider, Collapse, Modal } from 'antd'
import MyAppBar from "components/styledcomponent/MyAppBar";
import { SET_NAVIBAR_SHOW } from 'constants/actionTypes';
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
import { useDispatch, useSelector } from "react-redux";
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
import { getUserInfo, getLogCount } from 'helpers/authUtils';
import StyledButton from 'components/styledcomponent/Button'
// json & excel
//import XLSX from 'xlsx';

const SALESLOG_TYPE = 'SALESLOG_TYPE'
const LEADLOG_TYPE = 'LEADLOG_TYPE'
const { Panel } = Collapse

const DashBoardPage = () => {

  const myInfo = getUserInfo();
  const state = useSelector(state => state.Dashboard)
  const Logstate = useSelector(state => state.SalesLog)
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

  const [IsVisible, setIsVisible] = useState(false);
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

  const riseColor = '#0000ff'
  const dropColor = '#EE1818'

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
    label: "???"
  }, {
    id: "2",
    label: "??????"
  }, {
    id: "3",
    label: "??????",
  },
  {
    id: "4",
    label: "?????? ??????",
  }]

  const tabs2 = [{
    id: "",
    label: "??????"
  }, {
    id: "0030001",
    label: "?????? ??????"
  }, {
    id: "0030002",
    label: "??????/??????",
  }, {
    id: "0030003",
    label: "??????",
  }]

  const tabs3 = [{
    id: "",
    label: "??????"
  }, {
    id: "0020001",
    label: "??????"
  }, {
    id: "0020002",
    label: "??????",
  }, {
    id: "0020003",
    label: "??????",
  }, {
    id: "0020004",
    label: "??????",
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
    dispatch({
      type: SET_NAVIBAR_SHOW,
      payload: true
    })

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

    dispatch(getsaleslogstat.call(bodyLog))
  }, [bodyLog])

  useEffect(() => {

    dispatch(getleadlogstat.call(bodyLogRd))
  }, [bodyLogRd])

  // ???????????? fetch ???
  useEffect(() => {
    if (state.getsaleslogstatRes) {
      return setSalesStat(state.getsaleslogstatRes)
    }
  }, [state.getsaleslogstatRes])

  // ???????????? fetch ???
  useEffect(() => {
    if (state.getleadlogstatRes) {
      setLeadStat(state.getleadlogstatRes)
    }
  }, [state.getleadlogstatRes])

  //???????????? ?????? ?????? ??????
  const onSelected = (id) => {
    setBodyLog({ ...bodyLog, dt_typ: id });
  }

  //???????????? ?????? ?????????
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

  //???????????? ?????? ?????? ??????
  const onSelected_goal = (id) => {
    setBodyLog({ ...bodyLog, sales_goal: id });
  }


  //???????????? ?????? ?????? ??????
  const onSelectedRd = (id) => {
    setBodyLogRd({ ...bodyLogRd, dt_typ: id });
  }

  //???????????? ?????? ?????????
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

  //???????????? ?????? ?????? ??????
  const onSelected_lead_gb = (id) => {

    setBodyLogRd({ ...bodyLogRd, sales_lead_gb: id });
  }

  //???????????????
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
        arrowDescText = "?????? ??????";
        break;
      case '2':
        arrowDescText = "?????? ?????? ??????";
        break;
      case '3':
        arrowDescText = "?????? ?????? ??????";
        break;
      case '4':
        arrowDescText = "";
        break;
      default:
        arrowDescText = '';
        break;
    }

    if (parseInt(data.calc_cnt) > 0) {
      arrowChartcolor = riseColor
      ArrowIcon = <Up />
    } else if (parseInt(data.calc_cnt) < 0) {
      arrowChartcolor = dropColor
      ArrowIcon = <Down />
    }

    return (
      <div style={{ marginRight: 10, marginBottom: 5 }}>
        <p style={{ marginBottom: 5, fontSize: 14, fontWeight: 500, color: '#111', }}> {data.cnt}???</p>
        <span style={{ fontSize: 11, color: '#4B4B4B' }}>{arrowDescText} </span>
        <span style={{ fontSize: 12, color: arrowChartcolor }}> {ArrowIcon} {data.calc_cnt}</span>
      </div>
    )
  }

  //bar ?????? ?????????
  const barChartData = (data) => {
    let rtn = []
    rtn[0] = { active_id: data[7].name, '??????': data[7].cnt };
    rtn[1] = { active_id: data[6].name, '??????????????????': data[6].cnt };
    rtn[2] = { active_id: data[5].name, '??????/????????????': data[5].cnt };
    rtn[3] = { active_id: data[4].name, '??????????????????': data[4].cnt };
    rtn[4] = { active_id: data[3].name, '??????': data[3].cnt };
    rtn[5] = { active_id: data[2].name, '????????????': data[2].cnt };
    rtn[6] = { active_id: data[1].name, '?????????': data[1].cnt };
    rtn[7] = { active_id: data[0].name, '??????': data[0].cnt };
    return rtn
  }

  const barChartDataRd = (data) => {
    let rtn = []
    rtn[0] = { active_id: data[0].name, '??????': data[0].cnt };
    rtn[1] = { active_id: data[1].name, '??????': data[1].cnt };
    rtn[2] = { active_id: data[2].name, '??????': data[2].cnt };
    rtn[3] = { active_id: data[3].name, '??????': data[3].cnt };
    return rtn
  }

  //pie ?????? ????????? 
  const pieChartData = (data) => {
    let rtn = [];

    if (data.length <= 0) {
      rtn[0] = { id: 'no data', label: '????????? ??????', value: 100 }
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
        <p style={{ margin: 0, color: '#666666', fontSize: 12 }}>?????? : {item.days}</p>
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

  //???????????? ??????????????????
  const handleCsvDownload = () => {
    //XLSX
    console.log('excel download click:::')
    dispatch(getlogsdownload.call({ dt_typ: bodyLog.dt_typ, from_dt: bodyLog.from_dt, to_dt: bodyLog.to_dt, sales_man: bodyLog.sales_man, dept_idx: bodyLog.dept_idx, sales_gb: '0010001' }));
  }

  //???????????? ??????????????????
  const handleCsvDownloadRd = () => {
    //XLSX
    console.log('excel download click')
    dispatch(getlogsdownload.call({ dt_typ: bodyLogRd.dt_typ, from_dt: bodyLogRd.from_dt, to_dt: bodyLogRd.to_dt, sales_man: bodyLogRd.sales_man, dept_idx: bodyLogRd.dept_idx, sales_gb: '0010002' }));
  }

  //?????? ??????

  const handleOnClick = () => {
    setIsVisible(false);
  }

  useEffect(() => {
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

  // useEffect(() => {
  //   const logcount = getLogCount();
  //   if (logcount <= 5) {
  //     setIsVisible(true);
  //   }
  // }, []);

  return (
    <>
      <MyAppBar
        barTitle={'????????????'} />
      <div className='content_body'>
        {
          isMobile ?
            <Collapse bordered={false} style={{ backgroundColor: '#fff' }} expandIconPosition='right'>
              <Panel header="??????" key="1" style={customPanelStyle}>
                <div>
                  {birthday ?
                    <p style={{ fontSize: 14, color: '#666666', fontWeight: 500 }}><BdayLogo /> {`????????? ????????? ${bday[0].man_name}??? ??? ${birthdaylist.length - 1}??? ?????????.`} </p>
                    :
                    <p onClick={handleCommingAnn} style={{ fontSize: 14, color: '#666666', cursor: 'pointer', fontWeight: 500 }}><BdayLogo /> ???????????? ????????? ???????????????</p>
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

        {sectionTitle("???????????? ??????", <Calendar />)}
        <div>?????? ?????? ??????</div>
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
              {sectionTitle("?????? ??????", <ChartIcon />)}
              <div className='mt-1' />
              <div style={isMobile ? mobileCardContainerStyle : cardContainerStyle}>
                <div style={chartCardStyle}>
                  ?????? ??????
                  <div style={{ textAlign: 'right' }}>
                    {dispPrevCnt(salesStat[0][0], SALESLOG_TYPE)}
                  </div>
                </div>
                <div style={chartCardStyle}>
                  ??????/??????
                  <div style={{ textAlign: 'right' }}>
                    {dispPrevCnt(salesStat[0][1], SALESLOG_TYPE)}
                  </div>
                </div>
                <div style={chartCardStyle}>
                  ??????
                  <div style={{ textAlign: 'right' }}>
                    {dispPrevCnt(salesStat[0][2], SALESLOG_TYPE)}
                  </div>
                </div>
              </div>
            </div>

            <div className='mt-5' />

            <Row>
              {sectionTitle("?????? ??????", <Channel />)}
            </Row>
            <div className='mt-1' />
            <DashButton3 key='channel_button' tab={tabs2} onSelected={onSelected_goal} defaultSelected={bodyLog.sales_goal} />
            <NivoBarChart key={'bar_1'} data={barChartData(salesStat[1])} labels={Baroption.xaxis.categories}
              margin={{ top: 50, right: 50, bottom: 50, left: 80 }} hideAxisBottom />

            <div className='mt-2' />
            <Row >
              {sectionTitle("?????? ?????? ??????", <Analysis />)}
              <Col sm={24} xs={24} md={24} lg={24}>
                <NivoPieChart data={pieChartData(salesStat[2])} hasData={salesStat[2].length <= 0 ? false : true} />
              </Col>
            </Row>
          </>
        }
        <Row justify='center'>
          <Col sm={12} xs={12} md={12} lg={12}>
            <StyledButton onClick={handleCsvDownload}>???????????? ?????? ????????????</StyledButton>
            <div style={{ textAlign: 'center', marginTop: 2 }}>??????????????? ????????? ?????????????????????.</div>
          </Col>
        </Row>

        <div className='mt-5' />
        <Divider style={{ borderColor: '#ccc', borderWidth: 3 }} />
        <div className='mt-5' />

        <Row>
          {sectionTitle("???????????? ??????", <Paper />)}
        </Row>
        <div>?????? ?????? ??????</div>
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
            {sectionTitle("?????? ??????", <ChartIcon />)}
            <div className='mt-1' />
            <div style={isMobile ? mobileCardContainerStyle : cardContainerStyle}>
              <div style={chartCardStyle}>
                ?????? ?????? ???
                <div style={{ textAlign: 'right' }}>
                  {dispPrevCnt(leadStat[0][0], LEADLOG_TYPE)}
                </div>
              </div>
              <div style={chartCardStyle}>
                ?????? ??????
                <div style={{ textAlign: 'right' }}>
                  {dispPrevCnt(leadStat[1][0], LEADLOG_TYPE)}
                </div>
              </div>
            </div>
          </div> : null
        }
        <div className='mt-5' />
        {sectionTitle("?????? ?????? ??????", <Paper />)}
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
                <span style={{ color: riseColor }}>??????</span>
                <div style={{ display: 'flex', justifyContent: 'space-evenly' }}>
                  {dispPrevCnt(leadStat[2][0], LEADLOG_TYPE)}
                  {dispPrevCnt(leadStat[2][1], LEADLOG_TYPE)}
                  {dispPrevCnt(leadStat[2][2], LEADLOG_TYPE)}
                  {dispPrevCnt(leadStat[2][3], LEADLOG_TYPE)}
                </div>
              </div>
              <div style={chartCardStyle}>
                <span style={{ color: dropColor }}> ??????</span>
                <div style={{ display: 'flex', justifyContent: 'space-evenly' }}>
                  {dispPrevCnt(leadStat[3][0], LEADLOG_TYPE)}
                  {dispPrevCnt(leadStat[3][1], LEADLOG_TYPE)}
                  {dispPrevCnt(leadStat[3][2], LEADLOG_TYPE)}
                  {dispPrevCnt(leadStat[3][3], LEADLOG_TYPE)}
                </div>
              </div>
            </div>

            <div className='mt-5' />
            {sectionTitle("?????? ?????? ??????", <ChartIcon />)}
            <div className='mt-1' />

            <div style={isMobile ? mobileCardContainerStyle : cardContainerStyle}>
              <div style={chartCardStyle}>
                ?????? ??????
                <div style={{ textAlign: 'right' }}>
                  {dispPrevCnt(leadStat[6][0], LEADLOG_TYPE)}
                </div>
              </div>
              <div style={chartCardStyle}>
                ??????/??????
                <div style={{ textAlign: 'right' }}>
                  {dispPrevCnt(leadStat[6][1], LEADLOG_TYPE)}
                </div>
              </div>
              <div style={chartCardStyle}>
                ??????
                <div style={{ textAlign: 'right' }}>
                  {dispPrevCnt(leadStat[6][2], LEADLOG_TYPE)}
                </div>
              </div>
            </div>


            <div className='mt-5'>
              {sectionTitle("?????? ??????", <Channel />)}
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
              {sectionTitle("?????? ?????? ??????", <Analysis />)}
              <Col sm={24} xs={24} md={24} lg={24}>
                <NivoPieChart data={pieChartData(leadStat[5])} hasData={leadStat[5].length <= 0 ? false : true} />
              </Col>
            </Row>
          </>
        }
        <Row justify='center'>
          <Col sm={12} xs={12} md={12} lg={12}>
            <StyledButton onClick={handleCsvDownloadRd}>???????????? ?????? ????????????</StyledButton>
            <div style={{ textAlign: 'center', marginTop: 2 }}>??????????????? ????????? ?????????????????????.</div>
          </Col>
        </Row>
        <div className='mt-5' />
        {/* <Modal
          visible={IsVisible}
          closable={false}
          okText='??????'
          cancelText='??????'
          onOk={handleOnClick}
          onCancel={handleOnClick}
        >
          <p>?????? 5??? ?????? ????????? ??????????????? ???????????? ???????????? ??? ????????????.</p>
        </Modal> */}
      </div>
    </>
  );
}

export default DashBoardPage;

