import React, { useState, useEffect } from 'react'
import StyledButton from 'components/styledcomponent/Button'
import { Button } from 'antd';
import { Row, Col, DatePicker } from 'antd'
import moment from 'moment';
import { defaults } from 'autoprefixer';
import cmm from 'constants/common';

const { RangePicker } = DatePicker;

export default function DashButton({ tab, onSelected, defaultSelected, onChange }) {

  const [selected, setSelected] = useState(defaultSelected);
  const [dte, setDte] = useState({
    sdt:'',
    edt:''
  });
  
  const handleOnClick = (id) => {
    //e.preventDefault();
    if (onSelected) {      
      onSelected(id)
      setSelected(id)
    }
  }

  
  //마운트 될 때 
  useEffect(() => {
    setDte({...dte, sdt:moment().format('YYYY-MM')+'-01', edt:moment().add().format('YYYY-MM-DD')})
  }, [])
  
  
  
  return (
    <>
      <Row gutter={[6, 6]}>
        {tab && tab.map((v) => {          
          return <Col sm={8} xs={8} md={4} lg={4}>
            <Button style={{ width:'100%',height:40,color:(selected == v.id)?'#ffffff':'#111111', fontSize: 14, backgroundColor:(selected == v.id)?'#333333':'#ffffff', border: (selected == v.id)?'1px solid #333333':'1px solid #e1e1e1', padding: 1, margin: 0}}
            key={v.id} id={v.id} onClick={() => {handleOnClick(v.id)}}>{v.label}</Button>
          </Col>
          })
        }
        {(selected == 4 ) &&  
          <RangePicker key={1} className='col-sm-12 col-xs-12 col-md-6 col-lg-6'
            placeholder={[dte.sdt, dte.edt]}
            defaultValue={[moment(moment().format('YYYY-MM')+'-01'), moment()]}
            format={'YYYY-MM-DD'}            
            onChange={onChange}
        />
      }
      </Row>
    </>
  )
}


