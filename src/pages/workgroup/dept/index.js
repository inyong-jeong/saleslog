import { createTheme, ThemeProvider, makeStyles } from '@material-ui/core/styles';
import { useMediaQuery } from 'react-responsive';
import { SET_NAVIBAR_SHOW } from 'constants/actionTypes';
import { useSelector, useDispatch } from "react-redux";
import React, { useState, useEffect } from 'react';
import MyAppBar from "components/styledcomponent/MyAppBar";
import  AvatarUp from 'components/AvatarUp';
import  IconLabel from 'components/IconLabel';
import Input from 'components/styledcomponent/Input'
import { useHistory } from 'react-router';
import { Divider, notification } from 'antd';
import { getDeptInfo, postWorkGroupLogo, postWorkGroupUpd } from 'redux/workgroup/actions';
import  cmm  from 'constants/common';
import { PlusOutlined, MinusOutlined, FormOutlined } from '@ant-design/icons';
import Icon from '@ant-design/icons/lib/components/Icon';
import postcssFlexbugsFixes from 'postcss-flexbugs-fixes';
import  TreeNode  from 'components/TreeNode';


const useStyles = makeStyles({
  bottomBar: {
    width: '100%',
    position: 'fixed',
    bottom: 60,
    left:0,
    display: 'flex',
    verticalAlign: 'middle',
    alignItems: 'center',
    justifyContent:'center'
  },
});

const theme = createTheme({
  palette: {
    primary: {
      main: '#0000FF',
    }
  },
});


const WgroupDeptPage = (props) => {  
  const classes = useStyles();
  const state = useSelector(state => state.Workgroup)
  const history = useHistory()
  const navigateTo = () => history.push('/main/workgroup')
  const dispatch = useDispatch()
  const data = state.getDeptInfoRes;
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

  function initializedСopy(nodes, location) {
    const nodesCopy = [];
    for (let i = 0; i < nodes.length; i++) {
        const { children, title, key, lvl } = nodes[i];        
        const hasChildren = children !== undefined;
        const id = location ? `${location}.${i + 1}` : `${i + 1}`;
        nodesCopy[i] = { 
                children: hasChildren ? initializedСopy(children, id) : undefined,
                changeTitle: changeTitle(id),
                removeNode: removeNode(id),
                addChild: addChild(key),
                id,
                title,
                key,
                lvl,
        };
    }
    return nodesCopy;
  }

  const isMobile = useMediaQuery({
    query: "(max-width:991px)"
  });


  function changeTitle(id) {
    return (newTitle) => {
        id = id.split(".").map((str) => parseInt(str));
        const nodes = initializedСopy(this.state.nodes);
        let changingNode = nodes[id[0] - 1];

        if (id.length > 1) {
            for (let i = 1; i < id.length; i++) {
                changingNode = changingNode.children[id[i] - 1];
            }
        }

        changingNode.title = newTitle;
        this.setState({ nodes });
    };
  }

  function addRootElement() {
      const id = this.state.nodes.length ? `${this.state.nodes.length + 1}` : "1";
      const newNode = { 
          children: undefined,
          changeTitle: this.changeTitle(id),
          removeNode: this.removeNode(id),
          addChild: this.addChild(id),
          id,
          title: "",
          key:"",
          lvl:"",
      };
      
      const nodes = [...this.state.nodes, newNode];
      this.setState({ nodes });
  }

  function addChild(key) {
      return () => {
        console.log('addchild::::',key)
          // id = id.split(".").map((str) => parseInt(str));
          // const nodes = initializedСopy(inputs.nodes);
          // let changingNode = nodes[id[0] - 1];

          // if (id.length > 1) {
          //     for (let i = 1; i < id.length; i++) {
          //         changingNode = changingNode.children[id[i] - 1];
          //     }
          // }

          // if (changingNode.children === undefined) {
          //     changingNode.children = [];
          // }
          
          // id = `${id.join(".")}.${changingNode.children.length + 1}`;

          // changingNode.children = [
          //     ...changingNode.children,
          //     { 
          //         children: undefined,
          //         changeTitle: this.changeTitle(id),
          //         removeNode: this.removeNode(id),
          //         addChild: this.addChild(id),
          //         id,
          //         title: "",
          //         key:"",
          //         lvl:"",
          //     }];

          // this.setState({ nodes });
      }
  }

  function removeNode(id) {
      return () => {
          id = id.split(".").map((str) => parseInt(str));
          const nodes = initializedСopy(this.state.nodes);

          if (id.length === 1) {
              const newNodes = [
                  ...nodes.slice(0, [id[0] - 1]),
                  ...nodes.slice(id[0])
              ];

              this.setState( { nodes: initializedСopy(newNodes) } );

          } else {
              let changingNode = nodes[id[0] - 1];
              
              for (let i = 2; i < id.length; i++) {
                  changingNode = changingNode.children[id[i - 1] - 1];
              }

              const index = id[id.length - 1] - 1;

              const newChildren = [
                  ...changingNode.children.slice(0, index),
                  ...changingNode.children.slice(index + 1),
              ];
              changingNode.children = newChildren;

              this.setState({ nodes: initializedСopy(nodes) });
          }
      }
  }



  useEffect(()=> {
    // 하단 네비 설정   
    dispatch({
      type: SET_NAVIBAR_SHOW,
      payload: true}
    )

    //부서 정보 가져오기
    dispatch(getDeptInfo.call(inputs))
  },[])

  
  useEffect(()=> {
    if (!cmm.isEmpty(data)) {
      setInputs({ 
        ...inputs, 
        treedata :getTreeData(data) ,        
        nodes : initializedСopy(getTreeData(data)),        
      })      
      console.log(cmm.getTreeData(data), data);
    }
      
  },[data])

  const onSaveClick = (e) => {
    if (!inputs.comp_name || !inputs.comp_domain) {
      return alert('워크그룹 이름,URL 은 필수 항목입니다.')
    }
    if (inputs.comp_name.includes('(주)' || '주식회사')) {
      return alert('주식회사, (주) 등 법인 형태를 구분하는 표기는 기재하지 마세요.')
    }
    dispatch(postWorkGroupUpd.call(inputs))
    return
  }


//
//json tree data 
  const getTreeData = (array) => {  
    var map = {};
    for(var i = 0; i < array.length; i++){
      var obj = {"key" : array[i]['dept_idx'], "title" : array[i]['dept_name'] , "lvl" : array[i]['lvl'] };
      obj.children = [];
      map[obj.key] = obj;
      var parent = array[i]['parent_idx'] || '-';

      if(!map[parent]){
        map[parent] = {
          children: []
        };
      }
      map[parent].children.push(obj);
    }

    return map['-'].children;

  }


  const handleChange = (e) => {
    setInputs({
      ...inputs,
      [e.target.name]: e.target.value
    })
  }

  const onSelect = (selectedKeys, info) => {
    console.log('selected::::::::',selectedKeys, info);
    console.log(info.nativeEvent);

  }
//      <Tree data={inputs.treedata}/>

  return (
    <ThemeProvider theme={theme}>
      {isMobile && <MyAppBar 
        barTitle={'조직도 설정'}         
        showBackButton
        navigateTo={navigateTo} 
        
        selectable	={true}
        />}     
      <div style={{height:40}}></div>
      <div className="Tree" 
          style={{
            display:'flex',
            width: '100%',        
          }}>
        <ul>
          {inputs.nodes.map((nodeProps) =>{
            const { id, ...others } = nodeProps;
            console.log('nodeProps:::::::::',id, nodeProps)
            return (
              <TreeNode
                key={id}
                {...others}                
              />
            )
          })}
        </ul>
      </div>

      <Divider style={{margin:'30,10'}}/>            

    </ThemeProvider>
  );
}

export default WgroupDeptPage;