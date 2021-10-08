import React from 'react'
import MyAppBar from '../../components/styledcomponent/MyAppBar';
import { useHistory } from 'react-router';
import FullTabs from '../../components/styledcomponent/FullTabs';
import InquiryPage from '../../components/support/InquiryPage';
import MyInquiryLists from '../../components/support/MyInquiryLists';

const { TabPane } = FullTabs
const SupportPage = () => {
  const history = useHistory()
  const navigateTo = () => {
    history.goBack()
  }
  const onTabChange = () => {

  }
  return (
    <div>
      <MyAppBar
        barTitle='지원센터'
        // showBackButton
        navigateTo={navigateTo}
      />
      <div className='content_body'>
        <FullTabs
          defaultActiveKey="1"
          onChange={onTabChange}
        >
          <TabPane tab='1:1 문의하기' key='1'>
            <InquiryPage />
          </TabPane>
          <TabPane tab='내 문의내역' key='2'>
            <MyInquiryLists />
          </TabPane>
        </FullTabs>
      </div>
    </div>
  );
}

export default SupportPage;