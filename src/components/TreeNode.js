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
const TreeNode = (props) => {  
  console.log('props.children::::::::::::::::',props.children.length)
  const hasChildren = (!cmm.isEmpty(props.children) && props.children.length > 0)?true:false;
  const classes = useStyles();  
  const { changeTitle } = props;

  
  const handleClick = event => {
    // hiddenFileInput.current.click();
  };

  const renderChildren = (children) => {
    return (
        <ul style={{ paddingLeft:30 }}>
          { children.map((nodeProps) => {
              const { id, ...others } = nodeProps;
              console.log('TreeNode nodeProps:::::::::',id, nodeProps)
              
              return (
                <TreeNode
                  key={id}                  
                  {...others}
                />
              );
          })}
        </ul>
    );
  }
  
  return (
    
    <li key={props.id}>
      <div className="Treenode" 
            style={{ 
              alignItems: 'center',
              background: 'none',
              margin: 10,
            }}>
        
        <div className="EditableItem" style={{ height: '25px'}}>
          {((props.lvl < 3)?true:false) && 
            <PlusSquareOutlined 
                  style={{ 
                    position:'relative', 
                    fontSize:16 ,
                    top:-4, 
                    marginRight:10
                  }}
                  onClick={ props.addChild }
                  
                  />}
          {((props.lvl < 3)?false:true) && <span style={{ width:25, marginRight:10 }}>&nbsp;&nbsp;</span>}
          <input name={props.id}
                className="EditableItem-Text"
                onChange={(e) => { changeTitle(e.target.value) }}
                value={props.title}
                placeholder="부서 or 팀 명"
              />
          <CheckOutlined  style={{ padding:10, fontSize:16 }}/>&nbsp;&nbsp;&nbsp;
          <DeleteOutlined  style={{ fontSize:16 }}/>&nbsp;
        </div>
      </div>
      {hasChildren && renderChildren(props.children)}
    </li> 
  );
};

export default TreeNode;