import React from 'react'
import { Badge, IconButton } from '@material-ui/core';
import { ReactComponent as BlueLogo } from '../../../src/assets/icons/main/blueLogo.svg'
import { ReactComponent as Noti } from '../.././assets/icons/noti.svg'
import { ReactComponent as Person } from '../.././assets/icons/person.svg'
export default function TopMenu({ onNotiClick, onProfileClick, badgeContent }) {
  return (
    <>
      <div style={{
        height: 64,
        backgroundColor: '#fff',
        width: '100%',
        position: 'sticky',
        top: 0,
        zIndex: 100,
        display: 'flex',
        justifyContent: 'center',
        borderBottom: 'solid',
        borderColor: '#000fff',
        borderWidth: 2
      }}>
        <div style={{ width: 1190, display: 'flex', }}>
          <div style={{
            width: 180,
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center'
          }}>
            <BlueLogo width={100} height={64} />
          </div>
          <div style={{
            width: 1010,
            display: 'flex',
            justifyContent: 'right',
            alignItems: 'center'
          }}>
            <div>
              <IconButton color="inherit" onClick={onNotiClick}>
                <Badge badgeContent={badgeContent} color="secondary">
                  <Noti />
                </Badge>
              </IconButton>
            </div>
            <div>
              <IconButton color="inherit" onClick={onNotiClick}>
                <Person />
              </IconButton>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}
