import React from 'react'
import Logo from '../../component/logo/logo'
import { 
	List, 
	InputItem, 
	Radio,
	WingBlank,
	WhiteSpace, 
	Button 
} from 'antd-mobile'
import { connect } from 'react-redux'
import { Redirect } from 'react-router-dom'
import { register } from '../../redux/user.redux'
import highFrom from '../../component/highfrom/highfrom'
import '../login/login.css'

@connect(
	state => state.user,
	{ register }
)
@highFrom

class Register extends React.Component {
	constructor(props){
		super(props);
		/*this.props.state = {
			user: '',
			pwd: '',
			repeatpwd: '',
			type: 'customer'
		}*/
		
		this.handleRegister = this.handleRegister.bind(this);
		this.toLogin = this.toLogin.bind(this);
	}

	/*handleChange(key, value) {
		this.setState({
			[key]: value
		})
	}*/
	componentDidMount() {
		this.props.handleChange('type', 'customer')
	}

	handleRegister(){
		this.props.register(this.props.state);
	}
  toLogin() {
    this.props.history.push('/login');
  }

	render() {
		const height = document.documentElement.clientHeight;
		let marginTop = {
			marginTop: 180
		}
		const RadioItem = Radio.RadioItem;
		return (
			<div>
				{(this.props.redirectTo && this.props.redirectTo !== '/login')? <Redirect to={this.props.redirectTo} /> : null}
				<Logo />
				<WingBlank>
					<List>
						{this.props.msg ? <p className='error-msg'>{this.props.msg}</p> : null}
						<WhiteSpace />
						<InputItem
							onChange={(v => this.props.handleChange('user', v))}
						>Username</InputItem><WhiteSpace />
						<InputItem
							type='password'
							onChange={(v => this.props.handleChange('pwd', v))}
						>Password</InputItem><WhiteSpace />
						<InputItem
							type='password'
							onChange={(v => this.props.handleChange('repeatpwd', v))}
						>Password</InputItem><WhiteSpace />
						<RadioItem 
							checked={this.props.state.type=='customer'}
							onChange={()=>this.props.handleChange('type', 'customer')}
						>
							I'm customer
						</RadioItem>
						<RadioItem 
							checked={this.props.state.type=='restaurant'}
							onChange={()=>this.props.handleChange('type', 'restaurant')}
						>
							I'm restaurant
						</RadioItem><WhiteSpace /><WhiteSpace /><WhiteSpace />
					</List>
					<Button 
						disabled={(this.props.state.user && this.props.state.pwd && this.props.state.repeatpwd) ? false : true}
						className="btn-custom" 
						type="primary" 
						onClick={this.handleRegister}
					>Register</Button>
					
					<WhiteSpace />
					<WhiteSpace />
          <span onClick={this.toLogin} className="register-custom" >Return to login</span>
					
				</WingBlank>
			</div>
		)
	}
}

export default Register;