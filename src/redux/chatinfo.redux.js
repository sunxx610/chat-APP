import axios from 'axios'
import io from 'socket.io-client'

const socket = io.connect('http://34.73.239.235:3001')


//gain the chat
const MSG_LIST = 'MSG_LIST'
const MSG_RECV = 'MSG_RECV'
const MSG_READ = 'MSG_READ'
const LOGOUT = 'LOGOUT'

const initState = {
  chatmsg: [],
  users: {},
  unread: 0
}

export function chat(state = initState, action) {
  //console.log(state);
  switch (action.type) {
    case MSG_LIST:
      return {
        ...state,
        users: action.payload.users,
        chatmsg: action.payload.msgs,
        unread: action.payload.msgs.filter(v => !v.read && v.to == action.payload.userId).length
      }
    case MSG_RECV:
      const unreadFlag = action.payload.msg.to == action.payload.userId ? 1 : 0
      return {...state, chatmsg: [...state.chatmsg, action.payload.msg], unread: state.unread + unreadFlag}
    case MSG_READ:
      const {from, num} = action.payload;
      return {
        ...state, chatmsg: state.chatmsg.map(v => ({
          ...v, read: from == v.from ? true : v.read
        })), unread: state.unread - num
      }
    case LOGOUT:
      return {...initState, redirectTo: '/login'}
    default:
      return state
  }
}

// action
function msgList(msgs, users, userId) {
  // console.log(msgs, users);
  return {type: MSG_LIST, payload: {msgs, users, userId}}
}

function msgRecv(msg, userId) {
  return {type: MSG_RECV, payload: {msg, userId}}
}

function msgRead({from, userId, num}) {
  return {type: MSG_READ, payload: {from, userId, num}}
}

export function logoutMsgSubmit() {
  // socket.close();
  socket.removeAllListeners()
  return {type: LOGOUT}
}

export function recvMsg() {
  return (dispatch, setState) => {
    socket.on('recvmsg', function (data) {
      //console.log('recvmsg', data);
      const userId = setState().user._id
      dispatch(msgRecv(data, userId))
    })
  }
}

export function sendMsg({from, to, msg}) {
  return dispatch => {
    console.log('sendMSG',msg)
    socket.emit('sendmsg', {from, to, msg})
  }
}

export function readMsg(from) {
  return (dispatch, getState) => {
    axios.post('/user/readmsg', {from})
      .then(res => {
        const userId = getState().user._id
        if (res.status == 200 && res.data.code == 0) {
          //console.log('num',res.data.num)
          dispatch(msgRead({from, userId, num: res.data.num}))
        }
      })
  }

}

export function getMsgList() {
  return (dispatch, getState) => {
    axios.get('/user/getmsglist')
      .then(res => {
        //console.log(res);
        if (res.status == 200 && res.data.code == 0) {
          const userId = getState().user._id
          // console.log('getState',getState())
          dispatch(msgList(res.data.msgs, res.data.users, userId))
        }
      })
  }
}