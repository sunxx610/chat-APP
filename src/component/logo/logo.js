import React from 'react'
import {
  WingBlank,
  WhiteSpace
} from 'antd-mobile'
import UserImg from './111.png'
import './logo.css'

class Logo extends React.Component {
  render() {
    return (
      <div className="logo-container">
        <WingBlank>
          <span>Restaurant Chat</span>
          <img src={UserImg} alt=""/>
        </WingBlank>
      </div>
    )
  }
}

export default Logo;