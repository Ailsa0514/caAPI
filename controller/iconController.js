
const fs = require("fs");
const path = require("path")
const uuidv1 = require('uuid/v1');
const Icon = require('../models/iconModel')


module.exports = {
    index:async (req,res,next) => {
       const icon = await Icon.find({});
       res.status(200).json({msg:"操作成功",data:icon})
    },
    upIcon:async (req,res,next) => {
            let newIcon = req.fields;
            // 创建一个随机数字
            let name = uuidv1() ;
            //   获取当前上传数据的图片后缀名
            let extraName = path.extname(req.files.icon.name)
            // 获取上传的路径
            let catalog = path.resolve(__dirname, '..');
            // 获取当前的图片上传路径
            let oldPath = catalog + "/" + req.files.icon.path;
            //  生成新的路径
            let newPath = catalog + "/uploads/" + name + extraName ;

            // 读取文件并且重命名
            fs.rename(oldPath, newPath , (err) => {
                if (err) throw err;
                console.log('Rename complete!');
            });
            newIcon.icon =  "/uploads/" + name + extraName ;
            const icon = new Icon(newIcon)
            await icon.save();
            res.status(200).json({msg:"操作成功",data:icon,state:1}) 
    }

}