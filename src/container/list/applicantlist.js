import React from 'react'
import axios from 'axios'
import { connect } from 'react-redux'
import {
	Card, 
	WhiteSpace,
	WingBlank
} from 'antd-mobile'
import { getUserList } from '../../redux/chatuser.redux'
import AuthList from './authlist'

@connect(
	state=>state.chatuser,
	{ getUserList }
)

class ApplicantList extends React.Component{
	constructor(props) {
		super(props);
		this.state = {
			data: []
		}
	}
	componentDidMount() {
		this.props.getUserList('customer');
	}
	render(){
    //console.log('getUserList-customer',this.props.userList)
		return  <AuthList userList={this.props.userList} />
		
	}

}
export default ApplicantList