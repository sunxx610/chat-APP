import React from 'react'
import {connect} from 'react-redux'
import {
	NavBar, 
	SearchBar,
	Carousel
} from 'antd-mobile'
import {Switch, Route, BrowserRouter} from 'react-router-dom'
import AuthRoute from '../../component/authroute/authroute'
import NavLinkBar from '../navlinkbar/navlinkbar'
import ApplicantList from '../list/applicantlist'
import CompanyList from '../list/companylist'
import UserCenter from '../user/usercenter'
import MsgList from '../msglist/msglist'

import {
	getMsgList, 
	sendMsg, 
	recvMsg,
} from '../../redux/chatinfo.redux'
import {clearRedirectTo} from '../../redux/user.redux'
import ApplicantInfo from "../info/customerinfo";
import CompanyInfo from "../info/restaurantinfo";

@connect(
	state=>state,
	{getMsgList, recvMsg,clearRedirectTo}
)


class Dashboard extends React.Component{
	componentDidMount() {
		if(!this.props.chat.chatmsg.length) {
			this.props.getMsgList();
			this.props.recvMsg();
		}
    this.props.clearRedirectTo()
  }

	render(){
		const { pathname } = this.props.location
		const user = this.props.user



		return (
			<div>
				<AuthRoute />
				<div>
					<Switch>
						<Route path='/customerinfo' component={ApplicantInfo}></Route>
						<Route path='/restaurantinfo' component={CompanyInfo}></Route>
            <Route component={NavLinkBar}></Route>
					</Switch>
				</div>
			</div>
		)

		
	}

}

export default Dashboard