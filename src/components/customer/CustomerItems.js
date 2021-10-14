import React, { useEffect, useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import { Divider } from 'antd';
import Avatar from '@material-ui/core/Avatar';
import Typography from '@material-ui/core/Typography';
import { useDispatch, useSelector } from "react-redux";
import { getAllCustomer } from '../../redux/customer/actions';
import Text from 'antd/lib/typography/Text';
import InfiniteScroll from 'react-infinite-scroll-component';
import { useHistory } from 'react-router';
import { base64Enc } from 'constants/commonFunc';
import styles from '../../assets/style/Main.module.css'
import { useMediaQuery } from 'react-responsive';
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
  color: '#000fff',
  fontWeight: 400,
  padding: 4,
  borderRadius: '3px'
}

const CustomerItems = ({ inputs, page, setPage }) => {

  const isMobile = useMediaQuery({
    query: "(max-width:1190px)"
  });


  const classes = useStyles()
  const dispatch = useDispatch()
  const [cusotomerList, setCustomerList] = useState([])
  const state = useSelector(state => state.Customer)
  const listCounts = state.listCounts
  const loading = state.loading
  let responseLists = state.list
  const history = useHistory()
  let restCount

  useEffect(() => {
    dispatch(getAllCustomer.call(inputs, 1))

    isMobile && window.scrollTo({
      top: 100,
      left: 100,
      behavior: 'smooth'
    });
  }, [])

  useEffect(() => {
    if (page == 1 && loading == false) {
      dispatch(getAllCustomer.call(inputs, page))
    }
  }, [inputs])

  useEffect(() => {
    if (loading == true) return
    dispatch(getAllCustomer.call(inputs, page))
  }, [page])

  useEffect(() => {
    if (responseLists && loading == false) {
      if (page == 1) {
        return setCustomerList(responseLists)
      }
      setCustomerList(cusotomerList.concat(responseLists))
    }
  }, [loading])

  const handleNextPage = () => {
    if (!loading) setPage(page + 1)
  }

  return (
    <InfiniteScroll
      hasMore={true}
      dataLength={cusotomerList.length}
      next={handleNextPage}>
      <List>
        <Text style={{ fontSize: 12, fontWeight: 500 }} ><span style={{ color: '#000fff' }}>{listCounts ? listCounts : 0}</span> 개의 고객</Text>
        <Divider style={{ margin: 0 }} />
        {cusotomerList ?
          cusotomerList.map((singleList) => {
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
                    {/* <p style={{ fontSize: 30, backgroundColor: '#000', color: '#fff' }}>{singleList.num}</p> */}
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
                    {/* <p style={{ fontSize: 12, fontWeight: 'normal', marginBottom: 0 }}>{singleList.addr1}</p> */}
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
                      {restCount > 0 && singleList.man_names ? <span style={{ fontSize: 14, color: '#333333' }}>외 {restCount}명</span> : ''}
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
                    singleList.acc_etc ? singleList.acc_etc : <span style={{ color: '#DDDDDD' }}>고객사 메모 없음</span>
                  }

                </p>
                <Divider style={{ margin: 0 }} />
              </div>
            )
          })
          : <div>
            <Typography > 고객사가 없습니다.</Typography>
          </div>
        }
      </List>
    </InfiniteScroll>
  );
}

export default CustomerItems;
