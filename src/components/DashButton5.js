import React, { useState, useEffect } from 'react'
import { Button } from 'antd';
import { Row, Col } from 'antd'
import moment from 'moment';

export default function DashButton({ tab, onSelected, defaultSelected }) {

  const [selected, setSelected] = useState(defaultSelected);
  const [dte, setDte] = useState({
    sdt: '',
    edt: ''
  });

  useEffect(() => {
    setDte({ ...dte, sdt: moment().format('YYYY-MM') + '-01', edt: moment().add().format('YYYY-MM-DD') })
  }, [])

  const handleOnClick = (id) => {
    if (onSelected) {
      onSelected(id)
      setSelected(id)
    }
  }

  return (
    <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
      {tab && tab.map((v) => {
        return (
          <Button
            style={{ width: '100%', height: 40, color: (selected == v.id) ? '#ffffff' : '#111111', fontSize: 14, backgroundColor: (selected == v.id) ? '#333333' : '#ffffff', border: (selected == v.id) ? '1px solid #333333' : '1px solid #e1e1e1', padding: 1, margin: 2 }}
            key={v.id}
            id={v.id}
            onClick={() => { handleOnClick(v.id) }}>
            {v.label}

          </Button>)

      })
      }

    </div>
  )
}


