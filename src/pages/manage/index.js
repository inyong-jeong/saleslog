import React from 'react';
import { connect } from 'react-redux';
import { Helmet } from "react-helmet";
import { getSalesLogs, getUserAccounts, getUserTree, setPage, setFromDate, setToDate, clearSalesLogs } from 'redux/actions';
import FilterForm from 'components/manage/FilterForm';
import SalesLogTable from 'components/manage/SalesLogTable';
import Card from 'components/Card';
import ItemTree from 'components/ItemTree';
import equal from 'fast-deep-equal';
import MobileMenu from 'components/MobileMenu'

const DefaultManageContent = (props) => {

  return (
    <div className="container-fluid">
      <div className="row">
        <div className="col">
          <div className="page-title-box">
            <h4 className="page-title">영업일지</h4>
          </div>
        </div>
      </div>
      <div className="row">
        {/* <div className="col-lg-3 col-sm-12">
          <Card title="사원조직도" className="tree-card">
            {props.tree && <ItemTree items={props.tree} />}
          </Card>
        </div> */}
        <div className="col-lg-12 col-sm-12">
          <FilterForm />
          {/* <SalesLogTable /> */}
        </div>
      </div>
      <div className="row">
        <MobileMenu />
      </div>
    </div>
  );
}


class DefaultManage extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      scrollEnd: false,
      loadAllContents: false,
      page: 0
    };
    const userId = this.props.user.user_id;
    // this.props.getSalesLogs(props.filter);
    // this.props.getUserTree(userId);
    // this.props.getUserAccounts(userId);
  }

  _infiniteScroll = () => {
    let scrollHeight = Math.max(document.documentElement.scrollHeight, document.body.scrollHeight);
    let scrollTop = Math.max(document.documentElement.scrollTop, document.body.scrollTop);

    let clientHeight = document.documentElement.clientHeight;

    // if (scrollTop + clientHeight === scrollHeight && !this.state.loadAllContents) {
    //   if (!this.state.scrollEnd)
    if ((scrollTop + clientHeight) > (scrollHeight - 5)) {
      // this.state.scrollEnd = true;
      this.setState({ scrollEnd: true });
      this.props.setPage(this.props.filter.page + 1);
    }
  }

  idFilter = (state, page) => {

    let ret = { ...state };
    // ret.accounts = state.accounts.map((v) => v.id);
    ret.users = state.users.map((v) => v.id);
    ret.page = page;//
    delete ret.deletedUser;
    return ret;
  }

  componentDidUpdate(prevProps) {
    if (prevProps.filter.page !== this.props.filter.page) {
      // this.props.getSalesLogs(this.idFilter(this.props.filter, this.props.filter.page), true);
    }
    // else if (!equal(prevProps.filter.users, this.props.filter.users) || !equal(prevProps.filter.accounts, this.props.filter.accounts)) {
    else if (!equal(prevProps.filter, this.props.filter)) {
      // this.props.clearSalesLogs();
      // for (let i = 0; i <= this.props.filter.page; i++)
      //   this.props.getSalesLogs(this.idFilter(this.props.filter, i), true);
    }
  }

  componentDidMount() {
    window.addEventListener('scroll', this._infiniteScroll);
  }

  componentWillUnmount() {
    window.removeEventListener('scroll', this._infiniteScroll);
  }

  render() {
    return (
      <React.Fragment>
        <Helmet>
          <title>영업일지</title>
        </Helmet>
        {<DefaultManageContent
          {...this.props} />}
      </React.Fragment>
    )
  }
}

const mapStateToProps = (state) => {
  const { salesLogList } = state.SalesLog;
  const { user, tree } = state.User;
  const filter = state.Filter;

  return { user, tree, salesLogList, filter };
}

const dispatchToProps = {
  getSalesLogs: getSalesLogs.call,
  getUserAccounts: getUserAccounts.call,
  getUserTree: getUserTree.call,
  setPage: setPage,
  setFromDate: setFromDate,
  setToDate: setToDate,
  clearSalesLogs: clearSalesLogs
}

export default connect(mapStateToProps, dispatchToProps)(DefaultManage);