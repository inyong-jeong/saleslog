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
const useStyles = makeStyles((theme) => ({
  root: {
    width: '100%',
    backgroundColor: theme.palette.background.paper,
    marginBottom: 70, //nav bottom tab 
  },
  square: {
    color: '#000',
    backgroundColor: '#e2e2e2',
    width: theme.spacing(7),
    height: theme.spacing(7),
    marginRight: 10,
  }
}));

const graybox = {
  display: 'inline',
  marginRight: 5,
  fontSize: 11,
  backgroundColor: '#666666',
  color: '#fff',
  padding: 3,
  borderRadius: '2px'
}
const bluebox = {
  display: 'inline',
  fontSize: 11,
  backgroundColor: '#000fff',
  marginLeft: 6,
  color: '#fff',
  padding: 4,
  borderRadius: '2px'
}

const CustomerItems = ({ inputs, page, setPage }) => {

  const classes = useStyles()
  const dispatch = useDispatch()
  const [cusotomerList, setCustomerList] = useState([])
  const state = useSelector(state => state.Customer)
  const listCounts = state.listCounts
  const loading = state.loading
  let responseLists = state.list
  const [isBottom, setIsBottom] = useState(false)
  const [listCount, setListCount] = useState(listCounts)
  const history = useHistory()
  let restCount

  useEffect(() => {
    dispatch(getAllCustomer.call(inputs, page))
    console.log('inputs changed', inputs)
  }, [inputs])

  //paging 
  useEffect(() => {
    if (responseLists && loading == false) {
      if (page == 1) {
        setCustomerList(responseLists)
      } else {
        setCustomerList(cusotomerList.concat(responseLists))
      }
    }
  }, [loading])

  useEffect(() => {
    dispatch(getAllCustomer.call(inputs, page))
  }, [isBottom])

  const handleNextPage = () => {
    setPage(page + 1)
    setIsBottom(isBottom => !isBottom)
  }

  useEffect(() => {
    setListCount(listCounts)
  }, [listCounts])

  return (
    <InfiniteScroll
      hasMore={true}
      dataLength={10}
      next={handleNextPage}
    >
      <List className={classes.root}>
        <Text style={{ fontSize: 12 }}>{listCounts ? listCounts : 0} 개의 고객</Text>
        <Divider style={{ margin: 0 }} />
        {cusotomerList ?
          cusotomerList.map((singleList, index) => {
            return (
              <div onClick={() => history.push(`/main/customer/details/${singleList.acc_idx}`)} key={index}>
                <ListItem>
                  <div>
                    <Avatar alt={singleList.account_name} src="/static/images/avatar/1.jpg" className={classes.square} variant="rounded" />
                  </div>
                  <div>
                    <p style={{ display: 'inline', fontSize: 14, fontWeight: '500' }}>{singleList.account_name}
                      {singleList.sales_lead_gb_t ?
                        <p style={bluebox}>
                          {singleList.sales_lead_gb_t}
                        </p>
                        : ''}
                    </p>
                    <p style={{ fontSize: 12, fontWeight: 'normal', marginBottom: 0 }}>{singleList.ceo_name} {singleList.reg_num}</p>
                    <p style={{ fontSize: 12, fontWeight: 'normal', marginBottom: 0 }}>{singleList.addr1}</p>
                    <div style={{ marginTop: 6 }}>
                      {singleList.man_names ?
                        singleList.man_names.split(',').map((singleName, index, array) => {
                          if (array.length > 3) restCount = array.length - 3
                          if (index < 3) {
                            return <p key={index} style={graybox}>{singleName}</p>
                          }
                        })
                        : ''}
                      {restCount > 0 && singleList.man_names ? <span style={{ fontSize: 12, color: '#333333' }}>외 {restCount}명</span> : ''}
                    </div>
                  </div>
                </ListItem>
                <Divider dashed style={{ margin: 0 }} />
                <p style={{
                  textOverflow: 'ellipsis',
                  whiteSpace: 'nowrap',
                  fontSize: 12,
                  margin: 10,
                }}>
                  {
                    singleList.acc_etc ? singleList.acc_etc : <p style={{ color: '#DDDDDD' }}>고객사 메모 없음</p>
                  }

                </p>
                <Divider style={{ margin: 0 }} />
              </div>
            )
          })
          : <div>
            <Typography> 고객사를 가져오는데 오류가 발생했습니다.</Typography>
          </div>
        }
      </List>
    </InfiniteScroll>
  );
}

export default CustomerItems;