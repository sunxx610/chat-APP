const mongoose = require('mongoose')

const DB_URL = 'mongodb://127.0.0.1:27017/restaurant'
mongoose.connect(DB_URL);

const models = {
	user: {
		'user': {'type': String, 'require': true},
		'pwd': {'type': String, 'require': true},
		'type': {'type': String, 'require': true},
		// 头像
		'avatar': {'type':String},
		'desc': {'type':String},
		'address': {'type':String},
		'foodsType': {'type':String},
		'title':{'type':String},
		'restaurantName': {'type':String},
		'phone': {'type':String},
		'avePrice': {'type':String},
		'create_time': {'type':Number, 'default':new Date().getTime()},

	},
	chat: {
		'chatid': {'type':String, 'require':true},
		'from': {'type':String, 'require':true},
		'to': {'type':String, 'require':true},
		'read': {'type':Boolean, default:false},
		'content': {'type':String, 'require':true, default:''},
		'create_time': {'type':Number, 'default':new Date().getTime()},
	},
	/*jobinfo: {
		'jobname': {'type':String, 'require':true},
		'jobsalary': {'type':String, 'require':true},
		'jobdesc': {'type':String, 'require':true},
		'create_time': {'type':Number, 'default':new Date().getTime()},
	}*/
}

for(let m in models) {
	mongoose.model(m, new mongoose.Schema(models[m]))

}

module.exports = {
	getModel: function(name) {
		return mongoose.model(name); 
	}
}