const fs = require('fs')
const path = require('path')
const uuidv1 = require('uuid/v1');
const Cloth = require('../models/clothes')

module.exports = {
    index: async (req,res,next) => {
        let cloth = await Cloth.find({});
        res.status(200).json({msg:"操作成功",data :cloth }) 
    },
    newClothes : async (req,res,next) => {
        
        let newCloth = req.fields;
        let name = uuidv1();
        let extname = path.extname(req.files.images.name)
        let catalog = path.resolve(__dirname,'..')
        let oldPath = catalog + '/' + req.files.images.path
        let newPath = catalog + '/uploads/' + name + extname
        fs.rename(oldPath,newPath,(err)=>{
            if (err) throw err
            console.log("Rename Complte!")
        })

        newCloth.images = "/uploads/" + name + extname;
        const cloth = new Cloth(newCloth);
        await cloth.save();
        res.status(200).json({msg:"操作成功",data:cloth})
    },
    getClothes :async (req,res,next) => {
        let id = req.params.id
        let cloth = await Cloth.findById(id)
        res.status(200).json({msg:"操作成功",data:cloth})
    }
    
}