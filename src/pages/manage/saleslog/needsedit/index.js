import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import MyAppBar from 'components/styledcomponent/MyAppBar';
import Container from 'components/needsedit/Container'
import { getLogList } from 'redux/actions';
import { base64Dec } from 'constants/commonFunc';
import { SET_NAVIBAR_SHOW } from 'constants/actionTypes';

const NeedsEdit = (props) => {

  const dispatch = useDispatch();
  const state = useSelector(state => state.SalesLog)

  const [NeedsLog, setNeedsLog] = useState([])
  const handleOnBack = () => {
    props.history.goBack()
  }

  useEffect(() => {
    dispatch(getLogList.call({
      sidx: base64Dec(props.match.params.id)
    }))
  }, [])

  useEffect(() => {
    dispatch({
      type: SET_NAVIBAR_SHOW,
      payload: false
    })
  }, [])



  useEffect(() => {
    if (state.log) {
      const Log = state.log.log;
      const NeedsLog = Log.split(/((?<=[가-힣]음)[ \\?\\!\\.]+[\n]+)|((?<=[가-힣]임)[ \\?\\!\\.]+[\n]+)|((?<=[가-힣]함)[ \\?\\!\\.]+[\n]+)|((?<=[가-힣])[\\.\\?\\!]+[ \n]+)|(\n)/)
        .filter(sentence => sentence !== undefined).filter(sentence => sentence.length > 5);
      setNeedsLog(NeedsLog)
      state.loglistresponse = false;
    }
  }, [state.log])
  // useEffect(() => {
  //   const result = NeedsLog.filter(sentence => sentence !== '');
  //   setNeedsLog(result);
  // }, [NeedsLog])
  return (
    <div id='root'>
      <MyAppBar barTitle={'니즈 학습 도구'}
        showBackButton
        onNeedsTrain
        navigateTo={handleOnBack}
        params={props.match.params.id}
      />
      <div className='content_body'>
        <Container keywords={NeedsLog.length > 0 && NeedsLog} params={props.match.params.id} logneeds={state.logneeds && state.logneeds} />
      </div>
    </div>
  )
}

export default NeedsEdit;