import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Col, Popover, Button, Select, Tabs, Collapse, Input, Modal } from 'antd'
import StyledCard from 'components/styledcomponent/Card'
import { useHistory } from 'react-router';
import FullTabs from "components/styledcomponent/FullTabs";
import { base64Dec } from 'constants/commonFunc';
import { postNeedsTrain, getNeedsTrainDefine, postNeedsTrainSave } from 'redux/actions';
import { errorMessage } from '../../constants/commonFunc'
import { useScrollToTop } from 'constants/commonFunc';
import { CloseOutlined } from '@ant-design/icons'
const Container = ({ keywords, params, logneeds }) => {

  useScrollToTop();


  const state = useSelector(state => state.SalesLog);
  const dispatch = useDispatch();
  const { Panel } = Collapse;
  const { TabPane } = Tabs;
  const history = useHistory();

  const NeedsOption =
    [
      { label: '전략니즈', value: '전략' },
      { label: '제품니즈', value: '제품' },
      { label: '개인니즈', value: '개인' },
      { label: '운영니즈', value: '운영' },
      { label: '니즈제외', value: '제외' }
    ];

  const [words, setWords] = useState([]);
  const [SelectedList, setSelectedList] = useState([]);
  const [tabkey, setTabKey] = useState('1');
  const [result, setResult] = useState([]);
  const [Index, setIndex] = useState(undefined);
  const [body, setBody] = useState({
    slog_idx: Number(base64Dec(params)),
    sentence: '',
    keywords1: '',
    keywords2: '',
    new_needs_cod: ''
  })
  const [data, setData] = useState({
    n_type: '01',
  })
  const [AccountData, setAccountData] = useState([]);
  const [ProductData, setProductData] = useState([]);
  const [CompetitorData, setCompetitorData] = useState([]);
  const [HeadQuarterData, setHeadQuarterData] = useState([]);

  //모달 boolean

  const [isModalVisible, setIsModalVisible] = useState(false);


  //니즈학슴 저장 데이터

  const [SaveData, setSaveData] = useState({
    n_type: '',
    txt: ''
  })
  //keyword 클릭
  const handleOnClick = (sentence, v) => {
    setIndex(v.index);
    setBody({ ...body, sentence: sentence });
    let result = sentence.split(' ');
    result = new Set(result);
    setWords(setKeywordObject([...result]));
    setSelectedList([]);
  }

  function setBackColor(List, index) {
    for (let i = 0; i < List.length; i++) {
      if (i === index) {
        result[i].trigger = true;
      } else {
        result[i].trigger = false;
      }
    }
    return result;
  }



  useEffect(() => {
    if (Index || Index === 0) {
      if (logneeds.length > 0) {
        const Result = setBackColor(result, Index);
        setResult(Result);
      }
      else {
        const Result = setBackColor(keywords, Index);
        setResult(Result);
      }
    }
  }, [Index])

  // 문장에 색깔 입히기
  function setKeywordsColor(sentence, NeedsList) {
    let result = [];
    for (let i = 0; i < sentence.length; i++) {
      for (let j = 0; j < NeedsList.length; j++) {
        if (NeedsList[j].total === 1) {
          // NeedsList[j].needs.replace(/(\s*)/g, "");
          // sentence[i].replace(/(\s*)/g, "")
          sentence[i] = sentence[i].trim();
          NeedsList[j].needs = NeedsList[j].needs.trim();
          if (sentence[i] === NeedsList[j].needs) {
            if (NeedsList[j].needs_cod === '운영') {
              result[i] = { sentence: sentence[i], color: '#e2f0d9', needs_code: NeedsList[j].needs_cod, index: i, trigger: false }
            } else if (NeedsList[j].needs_cod === '전략') {
              result[i] = { sentence: sentence[i], color: '#deebf7', needs_code: NeedsList[j].needs_cod, index: i, trigger: false }
            } else if (NeedsList[j].needs_cod === '제품') {
              result[i] = { sentence: sentence[i], color: '#fff2cc', needs_code: NeedsList[j].needs_cod, index: i, trigger: false }
            } else if (NeedsList[j].needs_cod === '개인') {
              result[i] = { sentence: sentence[i], color: '#fbe5d6', needs_code: NeedsList[j].needs_cod, index: i, trigger: false }
            }
          }
          else if (sentence[i] !== NeedsList[j].needs) {
            if (result[i] === undefined) {
              result[i] = { sentence: sentence[i], color: 'white', needs_code: '미분류', index: i, trigger: false }
            }
          }
        }
        else if (NeedsList[j].total !== 1) {
          const sentences = NeedsList[j].needs.split('\n');
          for (let k = 0; k < sentences.length; k++) {
            if (sentence[i] === sentences[k]) {
              if (NeedsList[j].needs_cod === '운영') {
                result[i] = { sentence: sentences[k], color: '#e2f0d9', needs_code: NeedsList[j].needs_cod, index: i, trigger: false }
              } else if (NeedsList[j].needs_cod === '전략') {
                result[i] = { sentence: sentences[k], color: '#deebf7', needs_code: NeedsList[j].needs_cod, index: i, trigger: false }
              } else if (NeedsList[j].needs_cod === '제품') {
                result[i] = { sentence: sentences[k], color: '#fff2cc', needs_code: NeedsList[j].needs_cod, index: i, trigger: false }
              } else if (NeedsList[j].needs_cod === '개인') {
                result[i] = { sentence: sentences[k], color: '#fbe5d6', needs_code: NeedsList[j].needs_cod, index: i, trigger: false }
              }
            }
            else if (sentence[i] !== sentences[k]) {
              if (result[i] === undefined) {
                result[i] = { sentence: sentence[i], color: 'white', needs_code: '미분류', index: i, trigger: false }
              }
            }
          }
        }
      }
    }
    return result;
  }



  useEffect(() => {
    dispatch(getNeedsTrainDefine.call(data));
  }, [data])

  useEffect(() => {
    if (state.definelistresponse) {
      if (data.n_type === '01') {
        setCompetitorData(state.definelist)
        setData({ ...data, n_type: '02' })
        state.definelistresponse = false;
      } else if (data.n_type === '02') {
        setAccountData(state.definelist)
        setData({ ...data, n_type: '03' })
        state.definelistresponse = false;
      } else if (data.n_type === '03') {
        setProductData(state.definelist)
        setData({ ...data, n_type: '04' })
        state.definelistresponse = false;
      } else if (data.n_type === '04') {
        setHeadQuarterData(state.definelist)
        state.definelistresponse = false;
      }
    }
  }, [state.definelistresponse])


  function setNoKeywordsColor(List) {
    let result = []
    for (let i = 0; i < List.length; i++) {
      result[i] = { sentence: List[i], index: i, needs_code: '미분류' }
    }
    return result;
  }

  useEffect(() => {
    if (keywords && logneeds.length > 0) {
      const result = setKeywordsColor(keywords, logneeds)
      setResult(result);
    } else if (keywords && logneeds.length === 0) {

      const result = setNoKeywordsColor(keywords);
      setResult(result);
    }
  }, [logneeds, keywords])



  // 선택키워드 change -> body data reset
  useEffect(() => {
    let keywords1 = [];
    let keywords2 = [];
    for (let i = 0; i < SelectedList.length; i++) {
      if (SelectedList[i].color === 'primary') {
        keywords1 = keywords1.concat(SelectedList[i].name);
      } else if (SelectedList[i].color === 'ghost') {
        keywords2 = keywords2.concat(SelectedList[i].name);
      }
    }
    setBody({ ...body, keywords1: keywords1, keywords2: keywords2 })
  }, [SelectedList])


  // keyword 에 id 할당
  function setKeywordObject(List) {
    let result = [];
    for (let i = 0; i < List.length; i++) {
      result[i] = { id: List[i], name: List[i] }

    }
    return result;
  }

  //keyword에 색상 할당
  function setKeywordColor(List) {
    for (let i = 0; i < List.length; i++) {
      if (tabkey === '1') {
        List[i].color = 'primary';
      } else if (tabkey === '2') {
        List[i].color = 'ghost';
      }
    }
    return List;
  }
  //니즈 선택
  const onNeeds = (option) => {
    setBody({ ...body, new_needs_cod: option })
  };

  const handleOnClickWords = (name) => {
    const result = words.filter(list => list.id !== name);
    const sresult = words.filter(list => list.id === name);
    setWords(result);
    setSelectedList(SelectedList.concat(setKeywordColor(sresult)));
  }

  const handleOnDeleteWords = (name) => {
    const result = SelectedList.filter(list => list.id !== name);
    const sresult = SelectedList.filter(list => list.id === name);
    setWords(words.concat(sresult));
    setSelectedList(result);
  }


  // tab 바뀔 때 sets
  const onTabChange = (key) => {
    switch (key) {
      case '1':
        setTabKey('1')
        // setData({ ...data, log_gb: '1', })
        break
      case '2':
        setTabKey('2')
        // setData({ ...data, log_gb: '2' })
        break
      default:
      // setData({ ...data, log_gb: '' })
    }
  }

  const postNeedsClick = () => {
    if (body.keywords1.length === 0) {
      return errorMessage('핵심 키워드를 선택해주세요')
    } else if (body.keywords2.length === 0) {
      return errorMessage('식별 키워드를 선택해주세요')
    } else if (body.new_needs_cod === '') {
      return errorMessage('적용 할 니즈를 선택해주세요')
    }
    dispatch(postNeedsTrain.call(body));
  }

  const handleOnChange = (e) => {
    if (e.target.name === 'Account') {
      setAccountData(e.target.value);
      setSaveData({ ...SaveData, n_type: '02', txt: e.target.value })
    } else if (e.target.name === 'Product') {
      setProductData(e.target.value);
      setSaveData({ ...SaveData, n_type: '03', txt: e.target.value })
    } else if (e.target.name === 'Competitor') {
      setCompetitorData(e.target.value);
      setSaveData({ ...SaveData, n_type: '01', txt: e.target.value })
    } else if (e.target.name === 'HeadQuarter') {
      setHeadQuarterData(e.target.value);
      setSaveData({ ...SaveData, n_type: '04', txt: e.target.value })
    }
  }

  const handleOnSave = () => {
    dispatch(postNeedsTrainSave.call(SaveData))
  }

  const showModal = () => {
    setIsModalVisible(true);
  };

  const handleCancel = () => {
    setIsModalVisible(false);
  };


  return (
    <div>
      <div style={{ overflow: 'hidden', clear: 'both' }}>
        <Modal visible={isModalVisible} onCancel={handleCancel} footer={null}
          title='아래 순서와 같이 학습을 요청할 수 있습니다.'
        >
          <p>
            1. 학습 할 문장 분류를 선택합니다.<br /><br />
            2. 학습 할 키워드 항목을 선택합니다. <Button>명사</Button> 또는<Button>동사, 형용사</Button><br /><br />
            3. 선택한 항목에 적용한 키워드를 선택 후 <Button>학습요청</Button>&nbsp;을 클릭합니다.<br /><br />
            4. <Button>학습 요청 목록</Button>&nbsp;에서 학습상태를 확인 할 수 있습니다.
          </p>
        </Modal>
        <h4><strong>학습 방법</strong></h4>
        <br />
        <div className='mt-1'></div>
        <div style={{ fontSize: '14px', color: '#000000' }}>
          문장을 구성하는 단어와 어절, 형태소 구성을 인공지능이 학습하여 고객 니즈를 분석합니다.<br /><br />
          <button style={{ backgroundColor: 'white' }} >명사 </button>&nbsp;&nbsp;<button style={{ backgroundColor: 'white' }} >동사, 형용사</button> 키워드를 추가하여 학습할 수 있습니다.
          &nbsp;

          <Button onClick={showModal}>학습 방법 보기</Button>
          <div className='mt-1'></div>

          {/* 키워드 종류를 선택 후 일지에서 키워드 상자를 선택해주세요.<br /> */}
          <br />
        </div>

        <div className='mt-1'></div>
        <div className='mt-1'></div>
        <Col sm={24} xs={24} md={24} lg={24}>
          <StyledCard title={<>&nbsp;&nbsp;<span>문장 분류 (각 문장을 누르면 AI학습이 시작됩니다.)</span>
            {/* <Tooltip title="각 문장을 누르면 AI학습이 시작됩니다.">
              <Info />
            </Tooltip> */}
            <br />
            <span style={{ fontSize: '12px', color: 'grey' }}>
              * 입력한 문장의 마침표, 띄어쓰기, 임, 함, 음, 엔터를 기준으로 문장을 분류합니다.</span>
          </>
          }>
            <div style={{ whiteSpace: 'pre-wrap', wordWrap: 'break-word' }}>
              {result.length > 0 ? result.map((v, i) => {
                return (
                  <Popover key={i}
                    content={<div>{v.needs_code}</div>}
                    placement="left"
                  >
                    <div className='needs_list mb-1' onClick={() => handleOnClick(v.sentence, v)} key={i} style={{ border: '1px solid #f0f0f0', padding: 10, backgroundColor: v.trigger ? '#F6F6F6' : v.color, cursor: 'pointer' }}>{v.sentence}</div>
                  </Popover>
                )
              })
                :
                result.map((v, i) => {
                  return (
                    <Popover key={i}
                      content={<div >{v.needs_code}</div>}
                      placement="right"
                    >
                      <div className='needs_list mb-1' onClick={() => handleOnClick(v.sentence, v)} key={i} style={{ border: '1px solid #f0f0f0', padding: 10, cursor: 'pointer', backgroundColor: v.trigger ? '#F6F6F6' : 'white' }}>{v.sentence}</div>
                    </Popover>
                  )
                })
              }
            </div>
          </StyledCard>
        </Col>
        <div className='mt-1'></div>
        <StyledCard title={
          <>
            <span style={{ fontSize: '12px' }}>* 키워드를 선택해 주세요</span>
            <div className='mb-1'></div>
            <FullTabs type='line' defaultActiveKey="1" onChange={onTabChange} activeKey={tabkey}>
              <TabPane tab='명사' key="1">
              </TabPane>
              <TabPane tab='동사 또는 형용사' key="2">
              </TabPane>
            </FullTabs>
          </>

        }>
          {
            words.map((v, i) => {
              return (
                <Button onClick={() => handleOnClickWords(v.name)} id={v.name} key={v.name} style={{ margin: 5 }} >{v.name}</Button>
              )
            })
          }
        </StyledCard>
        <div className='mt-1'></div>
        <StyledCard title='선택한 키워드'>
          {
            SelectedList.map((v, i) => {
              return (
                <Button type={v.color} onClick={() => handleOnDeleteWords(v.name)} id={v.name} key={v.name} style={{ margin: 5, border: '1px solid #f0f0f0' }} >
                  <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                    <span>{v.name}</span>&nbsp;&nbsp;<CloseOutlined />
                  </div>
                </Button>
              )
            })
          }
        </StyledCard>
        <div className='mt-1'></div>
        <StyledCard title='Ai 학습 적용'>
          <div style={{ display: 'flex', justifyContent: 'space-between' }}>

            <Select placeholder='적용 할 니즈를 선택해주세요'
              options={NeedsOption}
              value={NeedsOption.value}
              onChange={onNeeds}
              style={{ width: '50%' }} />

            <Button onClick={postNeedsClick} style={{ border: '1px solid #f0f0f0' }}>학습 요청</Button>
          </div>

        </StyledCard>
        <div className='mt-1'></div>
        <br />
        <div style={{ fontSize: '12px', color: '#grey' }}>
          * 각 명칭에 대한 설명을 수정 할 수 있습니다.
        </div>
        <br />

        <Collapse  >
          <Panel header="경쟁사 명칭" key="1">
            <Input.TextArea
              name='Competitor'
              value={CompetitorData}
              onChange={handleOnChange}
              style={{ height: '300px' }}
              spellCheck="false"
            ></Input.TextArea>
            <div className='mt-1'></div>
            <div style={{ textAlign: 'right' }}>
              <Button onClick={handleOnSave}>저장</Button>
            </div>
          </Panel>
          <Panel header="고객사 명칭" key="2">
            <Input.TextArea
              name='Account'
              value={AccountData}
              onChange={handleOnChange}
              style={{ height: '300px' }}
              spellCheck="false"
            ></Input.TextArea>
            <div className='mt-1'></div>
            <div style={{ textAlign: 'right' }}>
              <Button onClick={handleOnSave} >저장</Button>
            </div>
          </Panel>
          <Panel header="제품 명칭" key="3">
            <Input.TextArea
              name='Product'
              value={ProductData}
              onChange={handleOnChange}
              style={{ height: '300px' }}
              spellCheck="false"
            ></Input.TextArea>
            <div className='mt-1'></div>
            <div style={{ textAlign: 'right' }}>
              <Button onClick={handleOnSave}>저장</Button>
            </div>
          </Panel>
          <Panel header="본사 명칭" key="4">
            <Input.TextArea
              name='HeadQuarter'
              value={HeadQuarterData}
              onChange={handleOnChange}
              style={{ height: '300px' }}
              spellCheck="false"
            ></Input.TextArea>
            <div className='mt-1'></div>
            <div style={{ textAlign: 'right' }}>
              <Button onClick={handleOnSave}>저장</Button>
            </div>
          </Panel>
        </Collapse>
        <div className='mt-1'></div>
      </div>
    </div>
  );
}

export default Container;






