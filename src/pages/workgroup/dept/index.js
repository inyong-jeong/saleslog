import { SET_NAVIBAR_SHOW } from 'constants/actionTypes';
import { useSelector, useDispatch } from "react-redux";
import React, { useState, useEffect } from 'react';
import MyAppBar from "components/styledcomponent/MyAppBar";
import { useHistory } from 'react-router';
import { Divider, Button, Tooltip, Modal } from 'antd';
import { getDeptInfo, postDeptRegi, postDeptUpd, postDeptDel } from 'redux/workgroup/actions';
import cmm from 'constants/common';
import { useMediaQuery } from 'react-responsive';
import SortableTree, { toggleExpandedForAll, changeNodeAtPath } from "react-sortable-tree-patch-react-17";
import FileExplorerTheme from "react-sortable-tree-theme-full-node-drag";
import TreeInput from 'components/TreeInput';
import { PlusSquareOutlined, CheckOutlined, MinusSquareOutlined, MinusOutlined } from '@ant-design/icons';
import { ReactComponent as Info } from '../../../assets/icons/info.svg'
import { ExclamationCircleOutlined } from '@ant-design/icons';
import { copySync } from 'fs-extra';
const { confirm } = Modal;

const WgroupDeptPage = () => {

  const state = useSelector(state => state.Workgroup)
  const history = useHistory()
  const navigateTo = () => history.push('/main/workgroup')
  const dispatch = useDispatch()
  const data = state.getDeptInfoRes;
  let regiRes = state.postDeptRegiRes;
  let updRes = state.postDeptUpdRes;
  let delRes = state.postDeptDelRes;
  //const updRes = state.getDeptInfoRes;

  // body
  const [inputs, setInputs] = useState(
    {
      dept_idx: '0',
      typ: 'tree',
      errResult: '',
      treedata: [],
      nodes: [],
      isChange: false,
    }
  )
  // regi/upd/del body
  const [inputs_regi, setInputs_regi] = useState(
    {
      dept_idx: 0,
      dept_name: '',
      parent_idx: 0,
      level: 1,


    }
  )
  const [treeExpanded, setTreeExpanded] = useState([])
  const [focusId, setFocusId] = useState(0);
  

  const isMobile = useMediaQuery({
    query: "(max-width:1190px)"
  });


  function initializedСopy(nodes, location) {
    const nodesCopy = [];
    if (cmm.isEmpty(nodes)) {
      return [];
    }
    for (let i = 0; i < nodes.length; i++) {
      const { children, title, dept_idx, lvl } = nodes[i];
      const hasChildren = children !== undefined;
      const id = location ? `${location}.${i + 1}` : `${i + 1}`;
      nodesCopy[i] = {
        children: hasChildren ? initializedСopy(children, id) : undefined,
        id,
        title,
        dept_idx,
        lvl,
      };
    }
    return nodesCopy;
  }

  function addRootElement() {
    const id = this.state.nodes.length ? `${this.state.nodes.length + 1}` : "1";
    const newNode = {
      children: undefined,
      id,
      title: "",
      dept_idx: "",
      lvl: "",
    };

    const nodes = [...this.state.nodes, newNode];
    this.setState({ nodes });
  }


  const regiDept = (data) => {
    dispatch(postDeptRegi.call(data))
  }

  const updDept = (data) => {
    //console.log('updDept::: ',data)
    dispatch(postDeptUpd.call(data))
  }

  const delDept = (data) => {
    confirm({
      title: '정말 삭제 하시겠습니까?',
      icon: <ExclamationCircleOutlined />,
      cancelText: '취소',
      okText: '확인',
      onOk() {
        dispatch(postDeptDel.call(data))
      },
      onCancel() {
        //취소
      },
    })

  }

  useEffect(() => {
    // 하단 네비 설정   
    dispatch({
      type: SET_NAVIBAR_SHOW,
      payload: false
    }
    )

    //부서 정보 가져오기
    dispatch(getDeptInfo.call(inputs))
  }, [])

  //부서리스트 fetch 후
  useEffect(() => {

    if (!cmm.isEmpty(data)) {

      setInputs({
        ...inputs,
        treedata: getTreeData(data),
        nodes: initializedСopy(getTreeData(data)),
      })

    }

  }, [data])

  //부서등록/수정/삭제 fetch 후
  useEffect(() => {
    dispatch(getDeptInfo.call(inputs))
    state.postDeptRegiRes = false;
    regiRes = false;
  }, [regiRes]);

  useEffect(() => {

    if (!cmm.isEmpty(updRes)) {
      dispatch(getDeptInfo.call(inputs))
      state.postDeptUpdRes = false;
      updRes = false;
      setFocusId(0)
    }
  }, [updRes]);

  useEffect(() => {
    dispatch(getDeptInfo.call(inputs))
    state.postDeptDelRes = false;
    delRes = false

  }, [delRes])


  //처음 inputs.treedata=[] 일때 가져옴
  const getTreeData = (array) => {

    //console.log('array::getTreeData:::',array);

    if (!array || array.length <= 0) {
      return null;
    }

    let map = {};
    let expanded = true;
    for (let i = 0; i < array.length; i++) {
      if (treeExpanded && treeExpanded.length > 0) {
        for (let j = 0; j < treeExpanded.length; j++) {
          if (array[i]['dept_idx'] === treeExpanded[j].dept_idx) {
            expanded = treeExpanded[j].expanded;
            break;
          }
        }
      }

      let obj = { "dept_idx": array[i]['dept_idx'], "title": array[i]['dept_name'], "lvl": array[i]['lvl'], "expanded": expanded };
      obj.children = [];
      map[obj.dept_idx] = obj;
      let parent = array[i]['parent_idx'] || '-';

      if (!map[parent]) {
        map[parent] = {
          children: []
        };
      }
      map[parent].children.push(obj);
    }

    return map['-'].children;

  }

  // // inputs.treedata 있는 경우 expanded 없데이트 함
  // const getTreeData_re = (array) => {
  //   if (!array || array.length <= 0) {
  //     return null;
  //   }

  //   let map = {};
  //   let expanded = true;
  //   for (let i = 0; i < array.length; i++) {

  //     if (treeExpanded && treeExpanded.length > 0) {
  //       for(let j = 0; j < treeExpanded.length; j++) {
  //         if (array[i]['dept_idx'] == treeExpanded[j].dept_idx) {
  //           expanded = treeExpanded[j].expanded;
  //           break;
  //         }
  //       } 

  //     }
  //     let obj = { "dept_idx": array[i]['dept_idx'], "title": array[i]['dept_name'], "lvl": array[i]['lvl'], "expanded": expanded };
  //     obj.children = [];
  //     map[obj.dept_idx] = obj;
  //     let parent = array[i]['parent_idx'] || '-';

  //     if (!map[parent]) {
  //       map[parent] = {
  //         children: []
  //       };
  //     }
  //     map[parent].children.push(obj);
  //   }

  //   return map['-'].children;

  // }

  // tree 수정시 treeData 적용
  const setTreeData = (data) => {
    let arr = inputs.treedata;
    for (let i = 0; i < arr.length; i++) {
      if (arr[i].dept_idx == data.idx) {
        arr[i].title = data.title;
        break;
      } else if (arr[i].children) {
        let child = arr[i].children;
        for (let j = 0; j < child.length; j++) {
          if (child[j].dept_idx == data.idx) {
            child[j].title = data.title;
            break;
          } else if (child[j].children) {
            let child2 = child[j].children;
            for (let k = 0; k < child2.length; k++) {
              if (child2[k].dept_idx == data.idx) {
                child2[k].title = data.title;
                break;
              } else if (child2[k].children) {
                let child3 = child2[k].children;
                for (let l = 0; l < child3.length; l++) {
                  if (child3[l].dept_idx == data.idx) {
                    child3[l].title = data.title;
                    break;
                  } else if (child3[l].children) {
                    let child4 = child3[l].children;
                    for (let m = 0; m < child4.length; m++) {
                      if (child4[m].dept_idx == data.idx) {
                        child4[m].title = data.title;
                        break;
                      }
                    }
                    child3[l].children = child4;
                  }
                }
                child2[k].children = child3;
              }
            }
            child[j].children = child2;
          }
        }
        arr[i].children = child;
      }
    }
    return arr;
  }


  // tree onChange
  const updateTreeData = (treedata) => {
    setInputs({ ...inputs, treedata: treedata })
  }

  // tree 확대/축소를 기록함
  const updateTreeExpanded = (data) => {

    let arr = treeExpanded;
    let isSet = false;
    for (let i = 0; i < arr.length; i++) {
      if (arr[i].dept_idx === data.node.dept_idx) {
        arr[i].expanded = data.expanded;
        isSet = true;
        break;
      }
    }
    if (!isSet) {
      arr[arr.length] = { dept_idx: data.node.dept_idx, expanded: data.expanded };
    }
    setTreeExpanded(arr);
  }

  // tree 수정
  const inputChange = (data) => {
    //console.log('inputChange:::',data)
    
    setInputs({
      ...inputs,
      treedata: setTreeData(data)
    })
  }

  const handleInputFocus = (data, dept_idx) => {
    //console.log('focus',data,dept_idx)
    if (data) {
      setFocusId(dept_idx)
    }
  }

  const getNodeKey = ({ treeIndex }) => treeIndex;


  return (
    <>
      <MyAppBar
        barTitle={'조직도 설정'}
        showBackButton
        navigateTo={navigateTo}
      />
      <div className='content_body'>

        <div style={{ display: 'flex', alignItems: 'center' }}>
          <p style={{ color: '#333', fontSize: 14 }}> 조직도 분류 &nbsp;
            <Tooltip title={<>
              <span style={{ color: 'red' }}>- '대분류 추가' 아이콘으로 첫 분류가 시작되는 조직을 추가할 수 있습니다.</span>
              <br />
              <br />

              <span>- '+' 아이콘으로 하위 조직을 생성할 수 있습니다.</span>
              <br />
              <br />

              <span>- '-' 아이콘은 조직 삭제를 위한 것입니다. 기존 멤버는 무소속으로 변경됩니다.</span>
            </>
            }

            >
              <Info />
            </Tooltip>
          </p>
          <p style={{ marginLeft: 'auto' }}>
            <Button
              onClick={(e) => {
                e.preventDefault();
                regiDept({ dept_name: '부서', parent_idx: 0, level: 1 });
              }}> 대분류 등록</Button>
          </p>
        </div>
        <Divider style={{ margin: 5 }} />
        {(inputs.treedata && inputs.treedata.length > 0) &&
          <div style={{ height: window.innerHeight }}>
            <SortableTree
              theme={FileExplorerTheme}
              rowHeight={50}
              scaffoldBlockPxWidth={(isMobile) ? 25 : 44}
              treeData={inputs.treedata}
              onChange={updateTreeData}
              onVisibilityToggle={updateTreeExpanded}
              maxDepth={5}
              canDrag={false}
              canDrop={false}
              isVirtualized={true}
              generateNodeProps={({ node, path }) => ({
                title: (
                  <TreeInput
                    key={node.dept_idx}
                    text={node.title}
                    style={{ fontSize: 12, color: '#666666', border: 'none', width: 150 }}
                    inputChange={inputChange}
                    inputFocusChange={handleInputFocus}
                    dept_idx={node.dept_idx}

                  />
                ),
                buttons: [
                  <>{node.dept_idx === focusId  && <CheckOutlined
                    style={{
                      position: 'relative',
                      fontSize: 16,
                      color: '#777777',
                      top: -2,
                      marginLeft: 10,
                    }}

                    onClick={(e) => {
                      console.log('onclick::',node, inputs.treedata);                    
                      updDept({ dept_idx: node.dept_idx, dept_name: node.title })
                    }}
                  />}</>,
                  (node.lvl !== 5) &&
                  <PlusSquareOutlined
                    style={{
                      position: 'relative',
                      fontSize: 16,
                      color: '#777777',
                      top: -2,
                      marginLeft: 10,
                    }}

                    onClick={(e) => {

                      regiDept({ dept_name: '부서', parent_idx: node.dept_idx, level: (node.lvl + 1) })

                    }}
                  />,
                  <MinusSquareOutlined
                    style={{
                      position: 'relative',
                      fontSize: 16,
                      color: '#777777',
                      top: -2,
                      marginLeft: 10,
                    }}

                    onClick={(e) => {

                      delDept({ dept_idx: node.dept_idx })

                    }}
                  />,
                ]
              })}
            />


          </div>
        }
        <Divider style={{ margin: 10 }} />
      </div>
    </>
  );
}


export default WgroupDeptPage;