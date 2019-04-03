import React from 'react'
import Logo from '../../component/logo/logo'
import {
  List,
  InputItem,
  WingBlank,
  WhiteSpace,
  Button
} from 'antd-mobile'
import {connect} from 'react-redux'
import {Redirect} from 'react-router-dom'
import {login} from '../../redux/user.redux'
import highForm from '../../component/highfrom/highfrom'
import './login.css'

@connect(
  state => state.user,
  {login}
)
@highForm

class Login extends React.Component {
  constructor(props) {
    super(props);
    /*this.state = {
      user: '',
      pwd: ''
    }*/

    this.toRegister = this.toRegister.bind(this);
    this.handleLogin = this.handleLogin.bind(this);
  }

  /*handleChange(key, value) {
    this.setState({
      [key]: value
    })
  }*/
  handleLogin() {
    this.props.login(this.props.state);
  }

  toRegister() {
    //console.log('redirect to ', this.props.redirectTo)
    this.props.history.push('/register');
  }


  render() {
    return (
      <div>
        {(this.props.redirectTo && this.props.redirectTo !== '/login') ? <Redirect to={this.props.redirectTo}/> : null}
        <Logo/>
        <WingBlank>
          <List>
            {this.props.msg ? <p className='error-msg'>{this.props.msg}</p> : null}
            <InputItem
              onChange={(v => this.props.handleChange('user', v))}
            ><span className="input-custom">Username</span></InputItem>
            <WhiteSpace/>
            <InputItem
              onChange={(v => this.props.handleChange('pwd', v))}
              type="password"
            ><span className="input-custom">Password</span></InputItem>
          </List>
          <WhiteSpace/>
          <WhiteSpace/>
          <WhiteSpace/>
          <WhiteSpace/>
          <Button
            onClick={this.handleLogin}
            disabled={(this.props.state.user && this.props.state.pwd) ? false : true}
            className="btn-custom"
            type="primary"
          >Login</Button>
          <WhiteSpace/>
          <WhiteSpace/>

          <span
            onClick={this.toRegister}
            className="register-custom"
          >Register now</span>
        </WingBlank>
      </div>
    )
  }
}

export default Login;