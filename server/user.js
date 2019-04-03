const express = require('express')
const model = require('./model')
const utils = require('utility')
const Router = express.Router()
const User = model.getModel('user')
const Chat = model.getModel('chat')

//清空数据
// Chat.remove({}, function(e, d){})

// 让密码不显示
const _filter = {'pwd': 0, '_v': 0}

Router.get('/list', function (req, res) {
  const {type} = req.query;

  //User.remove({},function(e,d){})
  User.find({type}, function (err, doc) {
    return res.json({code: 0, data: doc})
  })
})

Router.post('/update', function (req, res) {
  // 获取cookie
  const userId = req.cookies.userId;
  if (!userId) {
    return res.json({code: 1})
  }

  const body = req.body;
  User.findByIdAndUpdate(userId, body, function (err, doc) {
    // 返回用户的用户名和type
    const data = Object.assign({}, {
      user: doc.user,
      type: doc.type,
      avatar: doc.avatar

    }, body)
    return res.json({code: 0, data})
  })
})

Router.post('/login', function (req, res) {
  const {user, pwd} = req.body;
  //User.remove({},function(e,d){});
  User.findOne({user, pwd: md5Pwd(pwd)}, _filter, function (err, doc) {
    if (!doc) {
      return res.json({code: 1, msg: '用户名或者密码错误'});
    }
    res.cookie('userId', doc._id, {maxAge: 1000 * 60 * 60 * 24 * 14});
    return res.json({code: 0, data: doc});
  })
})

Router.post('/register', function (req, res) {
  const {user, pwd, type} = req.body;

  User.findOne({user}, function (err, doc) {
    if (doc) {
      return res.json({code: 1, msg: '用户名重复'})
    }
    const userModel = new User({user, type, pwd: md5Pwd(pwd)})
    userModel.save(function (e, d) {
      if (e) {
        return res.json({code: 1, msg: '后端出错了'})
      }
      const {user, type, _id} = d
      res.cookie('userId', _id, {maxAge: 1000 * 60 * 60 * 24 * 14})
      return res.json({code: 0, data: {user, type, _id}})
    })
  })
})

Router.get('/getmsglist', function (req, res) {
  const user = req.cookies.userId

  User.find({}, function (e, doc) {
    var users = {};
    doc.forEach(v => {
      users[v._id] = {name: v.user, avatar: v.avatar}
    })
    Chat.find({'$or': [{from: user}, {to: user}]}, function (err, doc) {
      if (!err) {
        return res.json({code: 0, msgs: doc, users: users})
      }
    })
  })
  // '$or':[{from:user, to:user}]

})

Router.post('/readmsg', function (req, res) {
  const userId = req.cookies.userId
  const {from} = req.body
  Chat.updateMany({from, to: userId}, {'$set': {read: true}}, function (err, doc) {
    //console.log('readmsg',doc)
    if (!err) {
      return res.json({code: 0,num:doc.nModified})
    }
    return res.json({code: 1, msg: 'read msg wrong'})
  })
})

Router.get('/info', function (req, res) {
  const {userId} = req.cookies;
  if (!userId) {
    return res.json({code: 1})
  }
  User.findOne({_id: userId}, _filter, function (err, doc) {
    if (err) {
      return res.json({code: 1, msg: 'Backend wrong'});
    }
    if (doc) {
      return res.json({code: 0, data: doc})
    }
  })

})

function md5Pwd(pwd) {
  const salt = 'pengpppp_hshshh@::&8d111ccd0';
  return utils.md5(utils.md5(pwd + salt))
}

module.exports = Router