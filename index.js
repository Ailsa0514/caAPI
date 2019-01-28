const express = require("express");
const path = require('path');
const loggor = require("morgan")
const bodyParser = require("body-parser")
const mongoose = require("mongoose")
const formidableMiddleware = require('express-formidable');



// 实例化一个express对象a
const app = express();
// 连接数据库
mongoose.connect('mongodb://localhost/dbCar')
// 监听数据库
mongoose.connection.once('open', () => {
    console.log("数据库连接成功")
})

// Middlewares   
app.use(loggor('dev'))
app.use(bodyParser.json());
app.use(formidableMiddleware({
    encoding: 'utf-8',
    uploadDir: './uploads',
    multiples: true, // req.files to be arrays of files
}));
// Routes
//静态资源服务
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));
app.use('/node_modules', express.static(path.join(__dirname, 'node_modules')));

// 注册路由
const car = require('./routes/car')
const icon = require('./routes/icon')
const clothes = require('./routes/clothes')
app.use('/car',car)
app.use('/icon',icon)
app.use('/clothes',clothes)


//  Catch 404 Errors and forward them to error handler 
app.use((req,res,next) => {
    const err = new Error('Not Found');
    err.status = 404 ;
    next(err);
})

// Error handler function
app.use((err,req,res,next) => {
    const error = app.get('env') === 'development' ? err : {}; 
    const status = err.status || 500;

    // 返回客户端信息
    res.status(status).json({
        error : {
            message: error.message
        }
    })
    // 后台返回
    console.error(err);
})

//  请求头部设置
app.all("*", function(req, res, next) { 
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-control-Allow-Headers", "xCors");
    res.header("Access-Control-Allow-Methods", "GET,POST,DELETE,PUT,OPTIONS,HEAD,FETCH");
    res.header("Access-control-max-age", 1000);       //测试通过
    next();
})


// Start the server

const port = app.get('port') || 3000;
app.listen(port,() => console.log(`Server is listening on port ${port}`))
