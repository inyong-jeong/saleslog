import { SET_NAVIBAR_SHOW } from 'constants/actionTypes';
import { useSelector, useDispatch } from "react-redux";
import React, { useState, useEffect } from 'react';
import MyAppBar from "components/styledcomponent/MyAppBar";
import { useHistory } from 'react-router';
import { Divider, Button } from 'antd';
import { getDeptInfo, postDeptRegi, postDeptUpd, postDeptDel } from 'redux/workgroup/actions';
import cmm from 'constants/common';
import TreeNode from 'components/TreeNode';
import { ExclamationCircleOutlined } from '@ant-design/icons';

const WgroupDeptPage = (props) => {

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
    dispatch(postDeptUpd.call(data))
  }

  const delDept = (data) => {
    dispatch(postDeptDel.call(data))
  }

  useEffect(() => {
    // 하단 네비 설정   
    dispatch({
      type: SET_NAVIBAR_SHOW,
      payload: true
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
    }
  }, [updRes]);

  useEffect(() => {
    dispatch(getDeptInfo.call(inputs))
    state.postDeptDelRes = false;
    delRes = false

  }, [delRes])



  //
  //json tree data 
  const getTreeData = (array) => {

    if (!array || array.length <= 0) {
      return null;
    }

    var map = {};
    for (var i = 0; i < array.length; i++) {
      var obj = { "dept_idx": array[i]['dept_idx'], "title": array[i]['dept_name'], "lvl": array[i]['lvl'] };
      obj.children = [];
      map[obj.dept_idx] = obj;
      var parent = array[i]['parent_idx'] || '-';

      if (!map[parent]) {
        map[parent] = {
          children: []
        };
      }
      map[parent].children.push(obj);
    }

    return map['-'].children;

  }

  return (
    <>
      <MyAppBar
        barTitle={'조직도 설정'}
        showBackButton
        navigateTo={navigateTo}
      />
      <div
        style={{
          display: 'flex',
          width: '100%',
          height: 40,
          alignItems: 'center',
        }}>
        <div style={{ width: '50%' }}><span>조직도 분류</span>&nbsp;<ExclamationCircleOutlined /> </div>
        <div style={{ width: '50%', display: 'flex', justifyContent: 'flex-end' }}>
          <Button
            onClick={(e) => {
              e.preventDefault();
              regiDept({ dept_name: '부서', parent_idx: 0, level: 1 });
            }}


          >대분류등록</Button>
        </div>
      </div>
      <Divider style={{ margin: 5 }} />
      <div className="Tree"
        style={{
          display: 'flex',
          width: '100%',
        }}>
        <ul>
          {inputs.nodes.map((nodeProps) => {
            const { id, ...others } = nodeProps;
            return (
              <TreeNode
                key={id}
                {...others}
                regiDept={regiDept}
                updDept={updDept}
                delDept={delDept}
              />
            )
          })}
        </ul>
      </div>

      <Divider style={{ margin: '30,10' }} />

    </>
  );
}

export default WgroupDeptPage;