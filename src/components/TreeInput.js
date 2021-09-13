import React, { useState, useRef, useEffect } from 'react';
import { PlusSquareOutlined, CheckOutlined, DeleteOutlined } from '@ant-design/icons';
import { makeStyles } from '@material-ui/styles';
import cmm from '../constants/common';

const useStyles = makeStyles({
  circle: {
    left:-20, 
    top:35, 
    backgroundColor:'rgba(52, 52, 52, 0.5)', 
    alignItems:'center', 
    justifyContent:'center'
  },
  square: {
    left:-15, 
    top:43, 
    backgroundColor:'rgba(52, 52, 52, 0.5)', 
    alignItems:'center', 
    justifyContent:'center'
  },


})

// TreeNode=============
// 
const TreeInput = (props) => {  
  const [inputTxt, setInputTxt] = useState()
  const classes = useStyles();  
  
  
  useEffect(()=> {
    setInputTxt(props.text);
  },[])

  const handleChange = (e) => {    
    //console.log(e.target, e.target.className);
    props.inputChange({idx:e.target.className, title:e.target.value});
    setInputTxt(e.target.value);
  };

  const handleInputFocus = () => {
    props.inputFocusChange(true);
  };

  const handleInputBlur = () => {
    props.inputFocusChange(false);
  };

  return (
          <input id={props.key}
                className={props.dept_idx}
                onChange={ handleChange }
                onFocus={handleInputFocus}
                onBlur={handleInputBlur}
                value={inputTxt}
                placeholder="부서 or 팀 명"
                style={props.style}
                dept_idx={props.dept_idx}
              />
  );
};

export default TreeInput;