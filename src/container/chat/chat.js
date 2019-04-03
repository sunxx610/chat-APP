import React from 'react'
import {List, InputItem, NavBar} from 'antd-mobile'
import {connect} from 'react-redux'
import {getMsgList, sendMsg, recvMsg, readMsg} from '../../redux/chatinfo.redux'
import {getChatId} from '../../util'


@connect(
  state => state,
  {getMsgList, sendMsg, recvMsg, readMsg}
)

class Chat extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      text: '',
      msg: []
    }
  }

  componentDidMount() {
    //console.log('this.props.chat.chatmsg.length', this.props.chat.chatmsg.length)
    if (!this.props.chat.chatmsg.length) {
      this.props.getMsgList();
      this.props.recvMsg();
    }
    if(this.footerDiv)
    this.footerDiv.scrollIntoView({behavior: "smooth"});
  }

  componentWillUpdate() {
    if(this.footerDiv)
    this.footerDiv.scrollIntoView({behavior: "smooth"});
  }

  componentWillUnmount() {
    const to = this.props.match.params.user;
    this.props.readMsg(to);
  }

  handleSubmit() {
    // socket.emit('sendmsg', {text: this.state.text});
    // this.setState({text: ''})
    // console.log(this.props);
    // console.log(this.state);
    const from = this.props.user._id
    const to = this.props.match.params.user
    const msg = this.state.text
    this.props.sendMsg({from, to, msg});
    this.setState({text: ''})
  }

  render() {
    // console.log(this.props);
    const userId = this.props.match.params.user;
    const Item = List.Item
    const users = this.props.chat.users
    const chatid = getChatId(userId, this.props.user._id)
    // console.log('this.props.chat.chatmsg', this.props.chat.chatmsg)
    const chatmsgs = this.props.chat.chatmsg.filter(v => v.chatid == chatid)

    if (!users[userId]) {
      return null
    }

    return (
      <div id="chat-page">
        <NavBar
          className="chatNavBar"
          mode="dark"
          leftContent="Back"
          onLeftClick={() => {
            this.props.history.goBack()
          }}
        >
          {users[userId].name}
        </NavBar>
        <div className="chatContent">
          {chatmsgs.map(v => {
            const avatar = require(`../../../static/images/logo/${users[v.from].avatar}.jpg`)
            return v.from == userId ? (
              <List
                key={v._id}>
                <Item
                  thumb={avatar}
                  wrap
                >{v.content}</Item>
              </List>
            ) : (
              <List
                key={v._id}>
                <Item
                  extra={<img src={avatar}/>}
                  className="chat-me"
                  wrap
                  multipleLine
                >{v.content}</Item>
              </List>
            )

          })}
        </div>
        <div
          style={{height: 45}}
          ref={el => this.footerDiv = el}
        ></div>
        <div
          className="stick-footer"
        >
          <List>
            <InputItem
              maxLength={28}
              placeholder="Please type in"
              value={this.state.text}
              onChange={v => {
                this.setState({text: v})
              }}
              extra={<span onClick={() => this.handleSubmit()}>Send</span>}
            ></InputItem>
          </List>
        </div>
      </div>

    )
  }
}

export default Chat