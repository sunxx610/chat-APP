import React from 'react'
import PropTypes from 'prop-types'
import {
  Card,
  WhiteSpace,
  WingBlank,
  SearchBar,
  Carousel
} from 'antd-mobile'
import {withRouter} from 'react-router-dom'
import carouselImg_0 from './img/0.jpg'
import carouselImg_1 from './img/1.jpg'
import carouselImg_2 from './img/3.jpg'
import './list.css'

@withRouter

class AuthList extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      data: [carouselImg_0, carouselImg_1, carouselImg_2],
      imgHeight: 176,
    }
    this.handleTime = this.handleTime.bind(this);
  }


  static propTypes = {
    userList: PropTypes.array.isRequired
  }

  handleClick(v) {
    this.props.history.push(`/chat/${v._id}`);
  }

  handleTime(data) {
    let dataDate = new Date(data);
    let month = dataDate.getMonth() + 1;
    let date = dataDate.getDate();
    return month + '/' + date
  }

  render() {
    // console.log(this.props);
    return (
      <div>
        <Carousel
          autoplay={true}
          infinite
          // beforeChange={(from, to) => console.log(`slide from ${from} to ${to}`)}
          // afterChange={index => console.log('slide to', index)}
        >
          {this.state.data.map(val => (
            <a
              key={val}
              href="javascript:;"
              style={{display: 'inline-block', width: '100%', height: this.state.imgHeight}}
            >
              <img
                src={val}
                alt=""
                style={{width: '100%', verticalAlign: 'top'}}
                onLoad={() => {
                  // fire window resize event to change height
                  window.dispatchEvent(new Event('resize'));
                  this.setState({imgHeight: 'auto'});
                }}
              />
            </a>
          ))}
        </Carousel>
        <div className="header-tips">
          <div className="header-tips-content clearfix">
            <div className="tips tips-worker">
              <a href="javascript:;"><img className="img-radius" src={require('./img/work.png')}/>
                <p>Resume</p></a>
              
            </div>
            <div className="tips tips-worker">
              <a href="http://rushisun.com">
                <img className="img-radius" src={require('./img/live.png')}/>
                <p>Demo</p>
              </a>
            </div>
            <div className="tips tips-worker">
              <a href="https://github.com/sunxx610">
                <img className="img-radius" src={require('./img/zhi.png')}/>
                <p>GitHub</p></a>
            </div>
            <div className="tips tips-worker">
              <a href="http://www.linkedin.com/in/michael-sun-1158a591">
                <img className="img-radius" src={require('./img/ai.png')}/>
                <p>Community</p>
              </a>
            </div>
          </div>
        </div>
        <div className="list-header">
          <div className="list-header-title">
            - Recommends for you -
          </div>
        </div>
        {this.props.userList.map(v => (
          v.avatar ?
            <div
              onClick={() => this.handleClick(v)}
              key={v._id}
            >
              <div className="list-content">
                <div className="clearfix">
                  <div className="tips-info-left">
                    <p className="tips-info-title">{v.restaurantName || v.title}</p>
                    <p className="tips-info-ask">{v.address}</p>
                  </div>
                  <div className="tips-info-right">
                    <p className="tips-info-avePrice">{v.foodsType}</p>
                    {/*<p className="tips-info-date">{this.handleTime(v.create_time)}</p>*/}
                  </div>
                </div>
                <div className="clearfix">
                  <div className="tips-user-left">
                    <img src={require(`../../../static/images/logo/${v.avatar}.jpg`)}/>
                  </div>
                    <div className="tips-user-right">
                      <p className="tips-margin">{v.phone}</p>
                      <p className="tips-margin tips-second">{v.desc}</p>
                    </div>
                </div>
              </div>
              <div className="list-whitespace"></div>
            </div>
            : null

        ))}
      </div>
    )
  }
}

export default AuthList