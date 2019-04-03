import React from 'react'
import axios from 'axios'
// 难点, 若不加this.props.history显示为null
import {withRouter} from 'react-router-dom'
import {connect} from 'react-redux'
import {loadData} from '../../redux/user.redux'

@withRouter
@connect(
  null,
  {loadData}
)

class AuthRoute extends React.Component {

  componentDidMount() {
    const publicList = ['/login', '/register'];
    const pathname = this.props.location.pathname;

    // console.log(pathname, publicList);
    // if already in register/login page, don't jump to register page
    /*if( publicList.indexOf(pathname) > -1 ) {
      return null;
    }*/

    axios.get('/user/info')
      .then(res => {
        if (res.status == 200) {
          //console.log(res);
          if (res.data.code == 0) {
            // 有登录信息
            this.props.loadData(res.data.data);
            if (publicList.indexOf(pathname) > -1) {
              this.props.history.push('/dashboard');
            }
          } else {
            if (publicList.indexOf(pathname) > -1) {
              return null;
            }
            this.props.history.push('/login'); // 难点
          }

        }
      })
  }

  render() {
    return null
  }
}

export default AuthRoute;