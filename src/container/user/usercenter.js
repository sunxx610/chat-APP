import React from 'react'
import { connect } from 'react-redux'
import {Redirect} from 'react-router-dom'
import { Result, List, WhiteSpace, Modal, NavBar } from 'antd-mobile'
import browserCookie from 'browser-cookies'
import { logoutSubmit} from '../../redux/user.redux'
import { logoutMsgSubmit} from '../../redux/chatinfo.redux'
import { withRouter } from 'react-router-dom'

@withRouter
@connect(
	state=>state.user,
	{ logoutSubmit,logoutMsgSubmit }
)

class UserCenter extends React.Component {
	constructor(props){
		super(props);
		this.state = {
			
		}
		this.logout = this.logout.bind(this);
		this.edit = this.edit.bind(this);
	}

	edit(){
		this.props.history.push(`/${this.props.type}info`);
	}

	logout(){
		const alert = Modal.alert

		alert('Logout', 'Are you sure to logout?', [
		    { text: 'Cancel', onPress: () => console.log('cancel') },
		    { text: 'Confirm', onPress: () => {
		      	browserCookie.erase('userId');
		      	//window.location.href = window.location.href
		      	this.props.logoutSubmit();
            this.props.logoutMsgSubmit();
		    }}
		])
	}
	render() {
		const props = this.props
		const Item = List.Item
		const Brief = Item.Brief

		return  props.user ? (
			<div>
        {this.props.redirectTo ? <Redirect to={this.props.redirectTo}/> : null}
				<NavBar mode="dark">My account</NavBar>
				<Result 
					img={<img src={require(`../../../static/images/logo/${props.avatar}.jpg`)} style={{width:50}} alt="" />}
					title={props.type == 'restaurant' ? props.restaurantName : props.title}
					
					message={props.user}
				/>

				<List renderHeader={() => 'Introduction'}>
					<Item multipleLine >
            {props.phone ? <Brief>Phone:{props.phone }</Brief> : null}
            {props.address ? <Brief>Address:{props.address }</Brief> : null}
            {props.foodsType ? <Brief>Foods type:{props.foodsType }</Brief> : null}
						{props.avePrice ? <Brief>AvePrice:{props.avePrice }</Brief> : null}
            {props.desc.split('\n').map(v => <Brief key={v}>More: {v}</Brief>)}
					</Item>
				</List>
				<WhiteSpace></WhiteSpace>
				<List>
					<Item onClick={this.edit}>Edit info</Item>
				</List>
				<List>
					<Item onClick={this.logout}>Logout</Item>
				</List>
			</div>
		) : <Redirect to={props.redirectTo} />
				
	}
}

export default UserCenter