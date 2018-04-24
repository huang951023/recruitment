const express = require('express')
const Router = express.Router()
const model = require('./model')
const User = model.getModel('user')
const Chat = model.getModel('chat')
const utils = require('utility')

//定义返回数据过滤器
const _filter = {'pwd': 0, '__v': 0};

Router.get('/list', function(req, res) {
    const { type } = req.query;
    User.find({type}, function(err, doc) {
        return res.json({code: 1, data: doc})
    })
    // User.remove({},function(){})
})

Router.post('/register', function(req, res) {
    const { user, pwd, type } = req.body
    User.findOne({user: user}, function(err, doc){
        if (doc) return res.json({code: 0, msg: '用户名已存在'})
        User.create({user, type, pwd: saltMD5(pwd)}, function(err, doc) {
            if(doc) {
                res.cookie('user_id',doc._id)
            }
            if(!err) return res.json({code: 1})
        })
    })
})

Router.post('/login', function(req, res) {
    const { user, pwd } = req.body;
    User.findOne({ user, pwd: saltMD5(pwd)}, _filter, function(err, doc) {
        if(err) return res.json({code: 0, msg: '系统出错'})
        if(doc) {
            res.cookie('user_id',doc._id)
            return res.json({code: 1, type: doc})
        } else {
            return res.json({code: 0, msg: '用户名或密码错误'})
        }
    })
})

Router.post('/updata', function(req, res) {
    const { user_id } = req.cookies;
    if (!user_id) return res.json({code: 0, msg: 'cookie信息出错'})
    const body = req.body;
    console.log(body)
    User.findByIdAndUpdate(user_id, body, function(err, doc) {
        const data = Object.assign({}, {
            user: doc.user,
            type: doc.type
        }, body)
        return res.json({code: 1, data})
    })
})

Router.post('/modinfo', function(req, res) {
    const {user_id} = req.cookies;
    if(!user_id) return null
    const body = req.body
    User.findByIdAndUpdate(user_id, body, function(err, doc) {
        const data = Object.assign({},{
            avatar: doc.avatar,
            company: doc.company,
            describe: doc.describe,
            salary: doc.salary,
            title: doc.title
        },body)
        return res.json({code: 1, data: data})
    })
})

Router.get('/info', function(req, res) {
    //用户有没有cookie
    const { user_id } = req.cookies
    if(!user_id) {
        return res.json({code: 0})
    }
    User.findOne({_id: user_id}, _filter, function(err, doc) {
        if(err) return res.json({code: 0, msg: 'cookie服务出错'})
        if(doc) return res.json({code: 1, data: doc})
    })

})
// Chat.remove({},function(err,doc){
//     console.log('清楚成功')
// })
Router.get('/getmsglist', function(req, res) {

    const user_id = req.cookies.user_id
    User.find({}, function(err, userdoc) {
        let users = {}
        userdoc.forEach(function(v) {
            users[v._id] = {name: v.user, avatar: v.avatar}
        })
        Chat.find({'$or': [{form: user_id}, {to: user_id}]}, function(err, doc) {
            if (!err) {
                return res.json({code: 1, msgs: doc, users: users})
            }
        })
    })
})

//密码加salt
function saltMD5(pwd) {
    const salt = '~!123456789QWER#$%!~';
    return utils.md5(utils.md5(pwd+salt))
}

module.exports = Router