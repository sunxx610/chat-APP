import React from 'react'
import axios from 'axios'
import { connect } from 'react-redux'
import { getUserList } from '../../redux/chatuser.redux'
import AuthList from './authlist'

@connect(
	state=>state.chatuser,
	{ getUserList }
)

class CompanyList extends React.Component{
	
	componentDidMount() {
		this.props.getUserList('restaurant');
	}
	render(){
    //console.log('getUserList-restaurant',this.props.userList)
		return 	<AuthList userList={this.props.restaurantList} />
	}

}
export default CompanyList

