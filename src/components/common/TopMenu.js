import React from 'react'
import { ReactComponent as MainLogo } from '../../../src/assets/icons/main/logo.svg'
import { ReactComponent as WhiteLogo } from '../../../src/assets/icons/main/whiteLogo.svg'

export default function TopMenu() {
  return (
    <>
      <div style={{
        height: 64,
        backgroundColor: '#0000FF',
        width: '100%',
        // position: 'sticky',
        //top: 0,
        zIndex: 100,
      }}>
        <div style={{ marginLeft: 50 }}>
          <WhiteLogo width={100} height={64} />
        </div>
      </div>
    </>
  )
}
