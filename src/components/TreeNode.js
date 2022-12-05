import React, { useState, useRef, useEffect } from 'react';
import { PlusSquareOutlined, CheckOutlined, MinusOutlined } from '@ant-design/icons';
import { makeStyles } from '@material-ui/styles';
import cmm from '../constants/common';
import TreeInput from 'components/TreeInput';
import { useMediaQuery } from 'react-responsive';
import { propTypes } from 'react-bootstrap/esm/Image';


// TreeNode=============
// 
const TreeNode = (props) => {

  const hasChildren = (!cmm.isEmpty(props.children) && props.children.length > 0) ? true : false;
  const [inputs, setInputs] = useState(
    {
      dept_idx: props.dept_idx,
      dept_name: props.title,
      lvl: props.lvl,
      isChange: false,
      isDelete: false,
      isBtnShow: false,
    }
  )
  const windowSize = () => {
    const { innerWidth: width, innerHeight: height } = window;
    return {
      width,
      height
    };
  }


  const handleClick = event => {
    //console.log(event)
    // hiddenFileInput.current.click();
  };

  const isMobile = useMediaQuery({
    query: "(max-width:1190px)"
  });

  const inputChange = (data) => {

    setInputs({
      ...inputs,
      dept_idx: data.idx,
      dept_name: data.title,
      isChange: true,
    })

  }

  const handleInputFocus = (data) => {

    setInputs({
      ...inputs,
      isBtnShow: data,
    })
  }
  console.log(windowSize().width)
  const renderChildren = (children) => {
    return (
      <ul style={{ paddingLeft: 30 }}>
        {children.map((nodeProps) => {
          const { id, ...others } = nodeProps;

          return (
            <TreeNode
              key={id}
              {...others}
              regiDept={props.regiDept}
              updDept={props.updDept}
              delDept={props.delDept}
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
          display: 'flex',
          width: '100%',
          alignItems: 'center',
          background: 'none',
          margin: 15,
        }}>

        <div className="EditableItem" style={{ height: '25px' }}>
          {((props.lvl < 3) ? true : false) &&
            <PlusSquareOutlined
              style={{
                position: 'relative',
                fontSize: 14,
                top: -4,
                marginRight: 10
              }}

              onClick={(e) => {

                props.regiDept({ dept_name: '부서', parent_idx: inputs.dept_idx, level: (inputs.lvl + 1) })

              }}

            />}
          {((props.lvl < 3) ? false : true) && <span style={{ width: 25, marginRight: 10 }}>&nbsp;&nbsp;</span>}
          <TreeInput
            key={props.id}
            text={props.title}
            style={{ padding: 5, fontSize: 13, width: ((!isMobile) ? 300 : (cmm.windowSize().width - 165)) + ((3 - props.lvl) * 20) + ((props.lvl === 1) ? 14 : 0) + ((props.lvl === 2) ? 4 : 0) }}
            inputChange={inputChange}
            inputFocusChange={handleInputFocus}
            dept_idx={props.dept_idx}

          />
          {(inputs.isBtnShow || inputs.isChange) &&
            <CheckOutlined
              style={{
                position: 'relative',
                fontSize: 14,
                top: -4,
                marginLeft: 15,
              }}

              onClick={(e) => {

                props.updDept({ dept_idx: inputs.dept_idx, dept_name: inputs.dept_name })
                setInputs({
                  ...inputs,
                  isChange: false,
                })
              }}
            />}
          {(inputs.isBtnShow || inputs.isDelete) &&
            <MinusOutlined
              style={{
                position: 'relative',
                fontSize: 14,
                top: -4,
                marginLeft: 15,
              }}

              onMouseEnter={(e) => {

                setInputs({
                  ...inputs,
                  isDelete: true,
                })
              }}

              onMouseOut={(e) => {

                setInputs({
                  ...inputs,
                  isDelete: false,
                })
              }}

              onMouseDown={(e) => {

                props.delDept({ dept_idx: inputs.dept_idx })
                setInputs({
                  ...inputs,
                  isDelete: false,
                })
              }}

            />}


        </div>
      </div>
      {hasChildren && renderChildren(props.children)}
    </li>
  );
};

export default TreeNode;