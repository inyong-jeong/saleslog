import React from 'react'
import { Collapse } from 'antd';
import { ReactComponent as Notice } from '../../assets/icons/main/notice.svg'

const { Panel } = Collapse
export default function RightMenu() {

  const text = (
    <p style={{ paddingLeft: 24 }}>
      A dog is a type of domesticated animal.
      Known for its loyalty and faithfulness,
      it can be found as a welcome guest in many households across the world.
    </p>
  );
  const customPanelStyle = {
    background: '#fff',
    borderRadius: 4,
    marginBottom: 24,
    border: 0,
    overflow: 'hidden',

  };


  return (
    <div style={{
      height: '100%',
      backgroundColor: '#fff',
      borderLeft: 'solid',
      borderWidth: 1,
      borderColor: '#EAEAEA'
    }}>
      <div>
        <Collapse bordered={false} defaultActiveKey={['1']} style={{ backgroundColor: '#fff' }} expandIconPosition='right'>
          <Panel header="생일" key="1" style={customPanelStyle}>
            {text}
          </Panel>
          <Panel header="시스템 공지사항" key="2" style={customPanelStyle}>
            {text}
          </Panel>
          <Panel header="워크그룹 공지사항" key="3" style={customPanelStyle}>
            {text}
          </Panel>
        </Collapse>
      </div>
    </div>
  )
}
