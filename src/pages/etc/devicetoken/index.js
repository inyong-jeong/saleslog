import { useMediaQuery } from 'react-responsive';
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import React, { useState, useEffect } from 'react';
import { useHistory, useParams } from 'react-router';
import { postDtokenRegi  } from 'redux/etc/actions';
import cmm from 'constants/common';


const myDevice = () => {

  const state = useSelector(state => state.Etc)
  const history = useHistory()
  const params = useParams()
  const dispatch = useDispatch()
  const [deviceToken, setDeviceToken] = useState(params.device)
  const [inputs, setInputs] = useState(
    {
      device_token: params.device,
    }
  )

  const isMobile = useMediaQuery({
    query: "(max-width:1190px)"
  });

  useEffect(() => {
    dispatch(postDtokenRegi.call())

  }, [])


  return (
    <div ></div>
  );
}

export default myDevice;