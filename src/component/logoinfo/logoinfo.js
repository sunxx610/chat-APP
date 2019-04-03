import React from 'react'
import { Result, List, WhiteSpace, Modal } from 'antd-mobile'
import logoImg from './000.png'
import './logo.css'
import {connect} from 'react-redux'

@connect(
  state => state.user,
)
// const initImg = './000.png';

class LogoInfo extends React.Component{
	constructor(props) {
		super(props);
		this.state = {
			avatar: ''
		}
		//console.log(this.state.avatar);
		this.handleImg = this.handleImg.bind(this);
	}
  componentDidMount(){
    this.setState({
      avatar: this.props.avatar
    })
  }
	handleImg(){
		var num = Math.round(Math.random()*10) + 1;
		// console.log(num);
		this.setState({
			avatar: num
		});
		this.props.selectLogo(num);
	}

	render(){
    //console.log('logchildren',this.state)
		return (
			<div>
				<div className="logoinfo-label">Click you change avatar</div>
				<div className="logoinfo-container" >
					<img 
						onClick={ this.handleImg}
						src={(this.state.avatar) ? require(`../../../static/images/logo/${this.state.avatar}.jpg`) : require('./000.png')}
						alt="" title="avatar"
					/>
				</div>
			</div>
		)
	}
}

export default LogoInfo
