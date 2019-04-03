import React from 'react'
import PropTypes from 'prop-types'
import {TabBar} from 'antd-mobile'
import {withRouter} from 'react-router-dom'
import {connect} from 'react-redux'
import ApplicantList from "../list/applicantlist";
import UserCenter from "../user/usercenter";
import MsgList from "../msglist/msglist";
import CompanyList from "../list/companylist";
import { updateNavIndex } from '../../redux/user.redux'
@withRouter
@connect (
	state => state,
  {updateNavIndex}
)
class NavLinkBar extends React.Component{
  constructor(props) {
    super(props);
    this.state = {
      selectedTab: 0,
      hidden: false,
      fullScreen: true,
    };
  }
  componentDidMount() {
    if(this.props.user.navIndex){
      this.setState({
        selectedTab: this.props.user.navIndex
      })
    }
  }

  renderContent(pageText) {
	  switch (pageText)
    {
      case 'RecommendCustomer':
        return <ApplicantList/>;
      case 'RecommendRestaurants':
        return <CompanyList/>;
      case 'Message list':
        return <MsgList/>;
      case 'My account':
        return <UserCenter/>;
    }
  }

	render(){
    //console.log('this.props.navIndex',this.props.user.navIndex)
    const user = this.props.user
    const navList = [
      {
        path:'/restaurant',
        text:'Home',
        icon:'home',
        title:'RecommendCustomer',
        component:ApplicantList,
        hide: user.type=='customer'
      },
      {
        path:'/customer',
        text:'Home',
        icon:'home',
        title:'RecommendRestaurants',
        component:CompanyList,
        hide: user.type=='restaurant'
      },
      {
        path:'/msglist',
        text:'Message',
        icon:'msg',
        title:'Message list',
        component:MsgList
      },
      {
        path:'/usercenter',
        text:'Me',
        icon:'user',
        title:'My account',
        component:UserCenter
      }
    ].filter(v=>!v.hide)

		return (
      <div style={this.state.fullScreen ? { position: 'fixed', height: '100%', width: '100%', top: 0} : { height: 400 }}>
				<TabBar
          barTintColor='#F2F5F4'
          tintColor='#00b38a'
          unselectedTintColor="#949494"
          hidden={this.state.hidden}
        >
					{navList.map((v,i) => (
						<TabBar.Item
              badge={v.path=='/msglist' ? this.props.chat.unread:null}
							key={v.path}
							title={v.text}
							icon={{uri: require(`./img/${v.icon}.png`)}}
							selectedIcon={{uri: require(`./img/${v.icon}-active.png`)}}
							selected={this.state.selectedTab == i}
							onPress={()=>{
                this.setState({
                  selectedTab: i,
                });
                this.props.updateNavIndex(i)
							}}
						>
              {this.renderContent(v.title)}

						</TabBar.Item>
					))}
				</TabBar>
      </div>

		)
	}
}

export default NavLinkBar