招聘WebApp
===========================
一个简单的webapp,实现简单的招聘系统。
****
## 目录
* [简述](#简述)
* [所用技术栈](#所用技术栈)
* [启动](#启动)
* [效果预览](#效果预览)   
  * [登录](#登录)      
  * [注册](#注册)        
  * [genuis](#genuis)      
  * [boss](#boss)        
  * [消息列表](#消息列表)     
  * [个人中心](#个人中心)        
  * [设置](#设置)        

## 简述
大学毕业设计作品，系统功能比较少，所有代码个人完成，思路是借鉴网上已有的系统，基本上是基于JavaScript开发，
用的`create_react_app`脚手架省去了大部分的配置，目前还有很多BUG,还有部分功能没有完善。
****
## 所用技术栈
* react
* redux
* react-redux
* react-route4
* antd-mobile
* axios
* express
* socket.io
* mongoose
* mongoDB
## 启动
安装node_modules: npm install   
前端启动： npm start   
后端启动： nodemon server/server.js   
## 效果预览
### 登录  
通常的登录功能，点击登录，后天会判断你的登录信息是genuis还是boss，并储存信息到cookie中
![登录gif](https://github.com/chengminying/repository/blob/master/gif/login.gif)
****
### 注册
在注册页面可以选择用户的身份，成功注册后并跳转到信息完善页面进一步完善用户的信息，比如招聘的岗位、求职岗位、薪资等。   
![注册gif](https://github.com/chengminying/repository/blob/master/gif/register.gif)
****
### genuis
genuis页面代表当前用户的类型是求职者，在genuis页面可以查看到boss发布的职位信息，点击卡片能和boss聊天
![genuis页面gif](https://github.com/chengminying/repository/blob/master/gif/genuis.gif)
### boss
boss页面是招聘者显示的页面，在boss页面可以看到求职者的信息，并同样点击卡片，和求职者聊天
![boss页面gif](https://github.com/chengminying/repository/blob/master/gif/boss.gif)
****
### 消息列表
消息列表可以显示未读消息和别人发来的消息，每个用户发来的消息独立存在，点击列表可以和指定的用户继续聊天。这个聊天功能还没有完善，并且还有很多bug。   
![msg页面gif](https://github.com/chengminying/repository/blob/master/gif/msg.gif)
****
### 个人中心
个人中心可以显示当前用户的信息，并修改navBar和其颜色，还可以跳转到设置页
![个人中心页面gif](https://github.com/chengminying/repository/blob/master/gif/userInfo.gif)
****
### 设置
修改当前用户的信息。
![set页面gif](https://github.com/chengminying/repository/blob/master/gif/set.gif)
****
