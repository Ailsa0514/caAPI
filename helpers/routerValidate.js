const Joi = require('joi')

module.exports = {
    validateBody : (schema) => {
        return (req,res,next) => {
            console.log("req.files.image---",req.files.image);
            const result = Joi.validate(req.files.image,schema);
            // console.log(result)
            if(result.error){
                return res.status(400).json(result.error);
            }
            if(!req.value)
                req.value = {};;
            if(!req.value['body'])
              req.value['body'] = {};
              req.value['body'] = result.value;
            next();
        }
    },
    schemas : {
        carBody : Joi.object().keys({
            make: Joi.string().required(),
            mode: Joi.string().required(),
            year: Joi.number().required(),
            image: Joi.string().required()
        })
    }
}