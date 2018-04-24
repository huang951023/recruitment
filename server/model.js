const mongoose = require('mongoose')

const DB_URL = 'mongodb://localhost:27017/Job'
mongoose.connect(DB_URL)
mongoose.connection.on('connected', function() {
    console.log('mongodb connect success')
})

const models = {
    user: {
        'user': {type: String, require: true},
        'pwd': {type: String, require: true},
        'type': {type: String, require: true},
        'avatar': {type: String},      //头像字段
        'describe': {type: String},    //个人或职位简介字段
        'title': {type: String},       //职位名称
        'company': {type: String},     //公司名称
        'salary': {type: String}       //薪资
    },
    chat: {
        'chat_id': {type: String, require: true},
        'form': {type: String, require: true},
        'to': {type: String, require: true},
        'read': {type: Boolean, default: false},
        "content": {type: String, require: true, default: ''},
        'create_time': {type: Number, default: new Date().getTime()},

    }
}

for (let m in models) {
    mongoose.model(m, new mongoose.Schema(models[m]))
}

module.exports = {
    getModel: function(name) {
        return mongoose.model(name)
    }
}