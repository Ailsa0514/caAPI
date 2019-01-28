const fs = require("fs");
const path = require("path")
const uuidv1 = require('uuid/v1');
const Car = require("../models/carModel")

module.exports = {
    index : async (req,res,next) => {
        const  car = await Car.find({});
        // console.log("car",car)
        res.status(200).json({msg:"操作成功",data:car,state:1});
    },
    newCar :async  (req,res,next) => {
        let newCar = req.fields;
        let name = uuidv1() ;   //获取一个随机字符
        //  获取上传文件的后缀名
        let extraName = path.extname( req.files.image.name)       //  .jpg
        // 当前图片的上传上一级路径
        let catalog = path.resolve(__dirname, '..')
        // 获取当前的图片上传路径
        let oldPath = catalog + "/" + req.files.image.path
        let newPath = catalog + "/uploads/" + name + extraName ;
        // 读取文件并且重命名
        fs.rename(oldPath, newPath , (err) => {
            if (err) throw err;
            console.log('Rename complete!');
        });
        // 将新的地址连同数据插入数据库
        newCar.image = "/uploads/" + name + extraName ;
        const car = new Car(newCar);
        await car.save()
        res.status(200).json({msg:"操作成功",data:car,state:1}) 
    },
    getCar : async (req,res,next) => {
        console.log("req.params.id",req.params.id)
        const car = await Car.findById(req.params.id)
        res.status(200).json({msg:"操作成功",data:car,state:1})
    }

}




















