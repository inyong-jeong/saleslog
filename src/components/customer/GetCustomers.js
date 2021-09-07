import React, { useEffect, useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import { Divider } from 'antd';
// import ListItemText from '@material-ui/core/ListItemText';
// import ListItemAvatar from '@material-ui/core/ListItemAvatar';
import Avatar from '@material-ui/core/Avatar';
import Typography from '@material-ui/core/Typography';
import { useDispatch, useSelector } from "react-redux";
import { getAllCustomer } from '../../redux/customer/actions';
import Text from 'antd/lib/typography/Text';
import useCustomerSearch from '../../model/customer/useCustomerSearch';


const useStyles = makeStyles((theme) => ({
  root: {
    width: '100%',
    backgroundColor: theme.palette.background.paper,
    marginBottom: 70,//nav bottom tab 
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

const GetCustomer = ({
  value: query = '',
  isSearchClicked
}) => {

  const classes = useStyles()
  const dispatch = useDispatch()
  const state = useSelector(state => state.Customer)
  const [pageNumber, setPageCount] = useState(1)
  const listCounts = state.listCounts

  const [inputs, setInputs] = useState({
    srch: query,
    pageno: pageNumber,
  })


  const [cusotomerList, setCustomerList] = useState([])

  useEffect(() => {

  }, [isSearchClicked])
  useCustomerSearch(query, pageNumber)


  return (

    <List className={classes.root}>
      <Text style={{ fontSize: 12 }}>{listCounts ? listCounts : 0} 개의 고객사</Text>
      <Divider style={{ margin: 0 }} />
      {cusotomerList ?
        cusotomerList.map((singleList, index) => {
          return (
            <div>
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
                  <div style={{ marginTop: 6, }}>
                    {singleList.man_names ?
                      singleList.man_names.split(',').map((singleName, index) => {
                        return (
                          <p key={index} style={graybox}>{singleName}</p>
                        )
                      }) : ''
                    }

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

  );
}

export default GetCustomer;