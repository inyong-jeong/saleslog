import React, { useState, useEffect } from 'react'
import { Button } from 'antd';
import { Row, Col, DatePicker } from 'antd'
import moment from 'moment';
import { useMediaQuery } from "react-responsive";

export default function DashButton({ tab, onSelected, defaultSelected, onChangeFrom, onChangeTo }) {

  const [selected, setSelected] = useState(defaultSelected);
  const [sdt, setSdt] = useState(moment())
  const [edt, setEdt] = useState(moment())

  const handleOnClick = (id) => {
    //e.preventDefault();
    if (onSelected) {
      onSelected(id)
      setSelected(id)
    }
  }

  const isMobile = useMediaQuery({
    query: "(max-width:1190px)"
  });



  //마운트 될 때 
  useEffect(() => {
    //setDte({ ...dte, sdt: moment().format('YYYY-MM') + '-01', edt: moment().add().format('YYYY-MM-DD') })
    setSdt(moment(moment().format('YYYY-MM') + '-01'));
    setEdt(moment());

  }, [])

  const handleonChangeFrom = (v) => {
    setSdt(moment(v))
    onChangeFrom(v);
  }

  const handleonChangeTo = (v) => {
    setEdt(moment(v))
    onChangeTo(v);
  }

  return (
    <>
      <Row gutter={[6, 6]}>
        {tab && tab.map((v) => {
          return <Col sm={6} xs={6} md={6} lg={6}>
            <Button key={v.id} style={{ width: '100%', height: 40, color: (selected == v.id) ? '#ffffff' : '#111111', fontSize: 14, backgroundColor: (selected == v.id) ? '#333333' : '#ffffff', border: (selected == v.id) ? '1px solid #333333' : '1px solid #e1e1e1', padding: 1, margin: 0 }}
              key={v.id} id={v.id} onClick={() => { handleOnClick(v.id) }}>{v.label}</Button>
          </Col>
        })
        }
      </Row>
      {(selected == 4) &&
        <Row gutter={[6, 6]} style={{ marginTop: 5 }}>
          {/* <Col sm={isMobile?12:6} xs={isMobile?12:6} md={isMobile?12:6} lg={isMobile?12:6}> */}
          <Col sm={12} xs={12} md={12} lg={12}>
            <DatePicker key={1} style={{ width: '100%' }}
              defaultValue={sdt}
              format={'YYYY.MM.DD'}
              allowClear={false}
              inputReadOnly={true}
              onChange={handleonChangeFrom}
            />
          </Col>
          <Col sm={12} xs={12} md={12} lg={12}>
            <DatePicker key={1} style={{ width: '100%' }}
              defaultValue={edt}
              format={'YYYY.MM.DD'}
              allowClear={false}
              inputReadOnly={true}
              onChange={handleonChangeTo}
            />
          </Col>
        </Row>
      }

    </>
  )
}


