import React from 'react'
import {
  NavBar,
  InputItem,
  TextareaItem,
  WingBlank,
  WhiteSpace,
  Button
} from 'antd-mobile'
import LogoInfo from '../../component/logoinfo/logoinfo.js'
import {connect} from 'react-redux'
import {Redirect} from 'react-router-dom'
import {update} from '../../redux/user.redux'

@connect(
  state => state.user,
  {update}
)
class Restaurantinfo extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      restaurantName: '',
      phone: '',
      address: '',
      foodsType: '',
      avePrice: '',
      desc: '',
      avatar:'',
    }

    this.leftback = this.leftback.bind(this);
  }

  componentDidMount() {
    //console.log('restaurantinfo-props',this.props)
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

  onChange(key, val) {
    this.setState({
      [key]: val
    })
  }

  leftback() {
    this.props.history.push('/usercenter');
  }

  render() {
    //console.log('restaurantinfo-props', this.props)
    //console.log('restaurantinfo-state',this.state)

    const path = this.props.location.pathname;
    const radius = {
      borderRadius: 0
    }

    return (
      <div>
        {this.props.redirectTo && this.props.redirectTo !== path ? <Redirect to={this.props.redirectTo}/> : null}
        <NavBar
          onLeftClick={() => {
            this.leftback()
          }}
          mode="dark"
          leftContent="Back"
        >Restaurant Information</NavBar>
        <WingBlank>
          <LogoInfo
            selectLogo={(imgNum) => {
              this.setState({
                avatar: imgNum
              })
            }}
          />
          <InputItem
            value={(this.state.restaurantName)}
            onChange={(v)=>this.onChange('restaurantName',v)}
          >
            Name
          </InputItem>
          <InputItem
            value={(this.state.phone)}
            onChange={(v)=>this.onChange('phone',v)}
          >
            phone
          </InputItem>
          <InputItem
            value={(this.state.address)}
            onChange={(v)=>this.onChange('address',v)}
          >
            Address
          </InputItem>
          <InputItem
            value={(this.state.foodsType)}
            editable
            onChange={(v)=>this.onChange('foodsType',v)}
          >
            Foods type
          </InputItem>
          <InputItem
            value={(this.state.avePrice)}
            onChange={(v)=>this.onChange('avePrice',v)}
          >
            AvePrice
          </InputItem>
          <TextareaItem
            onChange={(v)=>this.onChange('desc',v)}
            rows={2}
            value={(this.state.desc)}
            autoHeight
            title='Description'
          />
          <Button
            disabled={(this.state.restaurantName && this.state.phone && this.state.address && this.state.foodsType && this.state.avePrice && this.state.desc && this.state.avatar) ? false : true}
            onClick={() => {
              this.props.update(this.state)
            }}
            type='primary'
            style={radius}
          >Save</Button>
          <WhiteSpace/>
          <WhiteSpace/>
          <WhiteSpace/>
        </WingBlank>
      </div>
    )
  }
}

export default Restaurantinfo;