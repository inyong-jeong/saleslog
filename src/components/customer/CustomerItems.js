import React, { useCallback, useEffect, useState, useRef } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import { Divider } from 'antd';
import Avatar from '@material-ui/core/Avatar';
import Typography from '@material-ui/core/Typography';
import { useSelector } from "react-redux";
import Text from 'antd/lib/typography/Text';
import { useHistory } from 'react-router';
import { base64Enc } from 'constants/commonFunc';
import styles from '../../assets/style/Main.module.css'

const useStyles = makeStyles((theme) => ({
  square: {
    color: '#000',
    backgroundColor: '#e2e2e2',
    width: theme.spacing(7),
    height: theme.spacing(7),
    marginRight: 10,
  }
}));

const bluebox = {
  fontSize: 12,
  backgroundColor: '#F6F6F6',
  marginLeft: 6,
  color: '#398FFF',
  fontWeight: 400,
  padding: 4,
  borderRadius: '3px'
}
const CustomerItems = ({ page, setPage, tabkey }) => {

  const classes = useStyles()
  const [customerList, setCustomerList] = useState([])
  const state = useSelector(state => state.Customer)
  const listCounts = state.listCounts
  const isLoading = state.loading
  let responseLists = state.list
  const history = useHistory()
  let restCount
  const [hasMore, setHasMore] = useState(true)


  useEffect(() => {
    if (responseLists && !isLoading) {
      if (page == 1) {
        setHasMore(true)
        setCustomerList(responseLists)
        return
      }
      if (customerList.length >= listCounts) {
        setHasMore(false)
      }
      setCustomerList(new Set([...customerList, ...responseLists]))
    }
  }, [isLoading])

  const observerRef = useRef()
  const observer = useCallback((node) => {
    if (isLoading) return
    if (observerRef.current) observerRef.current.disconnect()

    observerRef.current = new IntersectionObserver((entries) => {

      if (entries[0].isIntersecting && hasMore) {
        setPage(page => page + 1)
      }
    })
    node && observerRef.current.observe(node)
  }, [isLoading, hasMore])

  return (

    <List>
      <Text style={{ fontSize: 12, fontWeight: 500 }} ><span style={{ color: '#398FFF' }}>{listCounts ? listCounts : 0}</span> ?????? ??????</Text>
      <Divider style={{ margin: 0 }} />
      {customerList ?
        customerList.map((singleList) => {
          return (
            <div
              key={singleList.num}
              className={styles.wrapper}
              onClick={() =>
                history.push({
                  pathname: `/main/customer/details/${base64Enc(singleList.acc_idx)}/${base64Enc(singleList.accm_idxs)}`
                })}>
              <ListItem style={{ height: 120 }}>
                <div>
                  <Avatar
                    alt={singleList.account_name}
                    className={classes.square}
                    variant="rounded" >
                    {singleList.account_name.charAt(0)}
                  </Avatar>
                </div>
                <div>
                  <p style={{ display: 'inline', fontSize: 14, fontWeight: 500 }}>{singleList.account_name}
                    {singleList.score ?
                      <span style={bluebox}>
                        {singleList.score}
                      </span>
                      : ''}
                  </p>
                  <br />
                  {
                    singleList.tags ?
                      singleList.tags.split(',').map((singleTag) =>
                        <span key={singleTag} style={{ fontSize: 14, fontWeight: 300, marginBottom: 0, color: '#666666' }}>
                          #{singleTag} </span>
                      )
                      : ''}
                  <p style={{ fontSize: 14, fontWeight: 400, marginBottom: 0, color: '#333333' }}><span style={{ fontWeight: 500, color: '#111111' }}>{singleList.ceo_name}</span> {singleList.reg_num}</p>
                  <div style={{ marginTop: 6 }}>
                    {
                      singleList.man_names ?
                        singleList.man_names.split(',').map((singleName, index, array) => {
                          if (array.length > 3) {
                            restCount = array.length - 3
                          } else {
                            restCount = 0
                          }
                          if (index < 3) {
                            return <p key={singleName} className={styles.managerWrapper}>{singleName}</p>
                          }
                        })
                        : ''}
                    {restCount > 0 && singleList.man_names ? <span style={{ fontSize: 14, color: '#333333' }}>??? {restCount}???</span> : ''}
                  </div>

                </div>
              </ListItem>
              <Divider dashed style={{ margin: 0 }} />
              <p style={{
                textOverflow: 'ellipsis',
                whiteSpace: 'nowrap',
                fontSize: 12,
                margin: 10,
                fontWeight: 400
              }}>
                {
                  singleList.acc_etc ? singleList.acc_etc : <span style={{ color: '#DDDDDD' }}>????????? ?????? ??????</span>
                }

              </p>
              <Divider style={{ margin: 0 }} />
            </div>
          )
        })
        : <div>
          <Typography > ???????????? ????????????.</Typography>
        </div>
      }
      <div ref={observer} />
    </List>

  );
}

export default React.memo(CustomerItems);
