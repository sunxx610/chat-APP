import React from 'react'
import {
	NavBar,
	InputItem, 
	TextareaItem, 
	WingBlank,
	WhiteSpace, 
	Button
} from 'antd-mobile'
import LogoInfo from '../../component/logoinfo/logoinfo'
import { connect } from 'react-redux'
import { Redirect } from 'react-router-dom'
import { update } from '../../redux/user.redux'

@connect(
	state=>state.user,
	{ update }
)

class Customerinfo extends React.Component{
	constructor(props) {
		super(props)
		this.state = {
			title:'',
			desc: '',
			foodsType: '',
			address: '',
      phone:'',
      avatar:''
		}
	}
  componentDidMount() {
    var obj = this.state;
    for(var att in obj) {
      if(obj.hasOwnProperty(att)) {
        if(!obj[att]) {
          //console.log('state[att]',this.state[att])
          //console.log('props[att]',typeof this.props[att],this.props[att])
          this.setState({
            [att]: this.props[att]
          })
        }
      }
    }
  }

  onChange(key,val){
		this.setState({
			[key]:val
		})
	}
  leftback() {
    this.props.history.push('/usercenter');
  }
	render(){
		const path = this.props.location.pathname;
		const redirect = this.props.redirectTo;
		const radius = {
			borderRadius: 0 
		}
			
		return (
			<div>
				{redirect && redirect!==path ? <Redirect to={this.props.redirectTo} /> : null}
				<NavBar
          onLeftClick={() => {
            this.leftback()
          }}
          mode="dark"
          leftContent="Back"
        >Complete information</NavBar>
				<WingBlank>
					<LogoInfo 
						selectLogo={(imgNum)=>{
							//console.log(imgNum);
							this.setState({
								avatar: imgNum
							})
						}}
					/>
          <InputItem
            value={(this.state.title)}
            onChange={(v)=>this.onChange('title',v)}
          >
            Nick name
          </InputItem>
          <InputItem
            value={(this.state.foodsType)}
            editable
            onChange={(v)=>this.onChange('foodsType',v)}
          >
            Preferred
          </InputItem>
          <InputItem
            value={(this.state.phone)}
            onChange={(v)=>this.onChange('phone',v)}
          >
            Phone
          </InputItem>
          <InputItem
            value={(this.state.address)}
            onChange={(v)=>this.onChange('address',v)}
          >
            Area
          </InputItem>
          <TextareaItem
            onChange={(v)=>this.onChange('desc',v)}
            rows={3}
            value={(this.state.desc)}
            autoHeight
            title='My info'
          />
					<Button 
						disabled={(this.state.title && this.state.foodsType && this.state.phone && this.state.address&& this.state.desc) ? false : true}
						onClick={()=>{this.props.update(this.state)}}
						type='primary'
						style={radius}
					>保存</Button>
				</WingBlank>
			</div>
		)
	}
}

export default Customerinfo;