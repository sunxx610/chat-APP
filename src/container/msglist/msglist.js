import React from 'react'
import {connect} from 'react-redux'
import {List, NavBar, WingBlank,Badge} from 'antd-mobile'
import {withRouter} from 'react-router-dom'

@withRouter

@connect(
  state => state
)
class MsgList extends React.Component {
  getLast(arr) {
    return arr[arr.length - 1]
  }

  render() {
    //console.log(this.props);
    const Item = List.Item
    const Brief = Item.Brief
    const userId = this.props.user._id
    const username = this.props.chat.users
    const msgListInfo = {}

    this.props.chat.chatmsg.forEach(v => {
      msgListInfo[v.chatid] = msgListInfo[v.chatid] || [];
      msgListInfo[v.chatid].push(v)
    })
    // console.log(msgListInfo)
    // 以最新Message排序
    const chatlist = Object.values(msgListInfo).sort((a, b) => {
      const last_a = this.getLast(a).create_time
      const last_b = this.getLast(b).create_time
      // console.log(this.getLast(a), last_a);
      // console.log(this.getLast(b),last_b);

      return last_b - last_a;
    })

    // console.log(chatlist);
    return (
      <div>
        <NavBar mode="dark">Message list</NavBar>
        {chatlist[0] ? chatlist.map(v => {
            const lastItem = this.getLast(v)
            const targetId = v[0].from == userId ? v[0].to : v[0].from
            const name = username[targetId] ? username[targetId].name : ''
            const avatar = username[targetId] ? username[targetId].avatar : ''
            const unreadNum = v.filter(v => !v.read && v.to == userId).length

            return (
              <div key={lastItem._id}>
                <List>
                  <Item
                    extra={<Badge text={unreadNum}/>}
                    thumb={require(`../../../static/images/logo/${avatar}.jpg`)}
                    arrow="horizontal"
                    onClick={() => {
                      this.props.history.push(`/chat/${targetId}`);
                    }}
                  >
                    {name}
                    <Brief>{lastItem.content}</Brief>
                  </Item>
                </List>
              </div>
            )
          }) :
          <WingBlank>
            <p>暂无Message，快去发Message吧</p>
          </WingBlank>
        }

      </div>

    )
  }
}

export default MsgList;