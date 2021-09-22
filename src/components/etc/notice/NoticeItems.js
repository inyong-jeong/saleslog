import React, { useEffect, useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import { Divider } from 'antd';
import Avatar from '@material-ui/core/Avatar';
import Typography from '@material-ui/core/Typography';
import { useDispatch, useSelector } from "react-redux";
//import { getAllCustomer } from 'redux/customer/actions';
import { base64Enc } from 'constants/commonFunc';
import InfiniteScroll from 'react-infinite-scroll-component';
import { useHistory, useLocation } from 'react-router';

const useStyles = makeStyles((theme) => ({
  root: {
    width: '100%',
    backgroundColor: theme.palette.background.paper,
    marginBottom: 100, //nav bottom tab 
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

export const grayboxLink = {
  display: 'inline',
  marginRight: 5,
  fontSize: 11,
  backgroundColor: '#666666',
  color: '#fff',
  padding: 3,
  borderRadius: '2px',
  cursor: 'pointer'
}
const bluebox = {
  fontSize: 11,
  backgroundColor: '#4B7DFF',
  marginLeft: 6,
  color: '#fff',
  padding: 4,
  borderRadius: '2px'
}

const NoticeItems = ({ page, setPage, data, loading, noticeType }) => {

  const classes = useStyles()
  const dispatch = useDispatch()
  //const [cusotomerList, setCustomerList] = useState([])
  //const state = useSelector(state => state.Customer)
  //const listCounts = state.listCounts
  //const loading = state.loading
  //let responseLists = state.list
  const history = useHistory()
  let restCount

  useEffect(() => {
    console.log('data::::::::::::::::::::::',data)
    //dispatch(getAllCustomer.call(inputs, 1))
  }, [])

  const handleNextPage = () => {
    //if (listCounts >= cusotomerList.length) {
      // console.log('page::::::::::::', page)
      if (loading == true) return
      setPage(page + 1)
    //}
  }

  return (
    <InfiniteScroll
      hasMore={true}
      dataLength={20}
      next={handleNextPage}>
      {/* {loading && <CircularProgress />} */}
      <List className={classes.root}>        
        {data ?
          data.map((singleList, index) => {
            return (
              <div onClick={() => {
                (noticeType === 'group') ?
                  history.push({pathname: `/main/etc/notice/group/detail/${base64Enc(singleList.b_idx)}/`}):
                  history.push({pathname: `/main/etc/notice/system/detail/${base64Enc(singleList.b_idx)}/`})
              }} key={singleList.num}>
                <ListItem style={{ height: 50 }}>
                  <div style={{display:'flex', width:'100%', alignItems:'center', justifyContent:'stretch'}}>
                    <p style={{ width:'80%',fontSize: 14, fontWeight: '500', marginBottom: 0 }}>{singleList.title}</p>
                    {/*<p style={{ width:'20%',fontSize: 12, fontWeight: 'normal', marginBottom: 0 }}>조회수:{singleList.show_count}</p>*/}
                    <p style={{ width:'20%',fontSize: 12, fontWeight: 'normal', marginBottom: 0 }}>{singleList.cre_dt}</p>
                  </div>
                </ListItem>
                <Divider style={{ margin: 0 }} />
              </div>
            )
          })
          : <div>
            <Typography > 공지사항이 업습니다.</Typography>
          </div>
        }
      </List>
    </InfiniteScroll>
  );
}

export default NoticeItems;
