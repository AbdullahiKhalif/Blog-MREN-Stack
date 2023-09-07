import Joi from "joi";

export const validationUserRegistarion = async(req, res, next) =>{
    const schema = Joi.object({
        username: Joi.string().min(5).max(30).required(),
        email: Joi.string().email().required(),
        password: Joi.string().min(5).required()
    });

    const {error} = schema.validate(req.body);

    if(error){
        return res.status(500).send({status:false, message: error.details[0].message})
    }
    next();
}


export const validationUserLogin = async(req, res, next) =>{
    const schema = Joi.object({
        username: Joi.string().min(5).max(30).required(),
        password: Joi.string().min(5).required()
    });

    const {error} = schema.validate(req.body);

    if(error){
        return res.status(500).send({status:false, message: error.details[0].message})
    }
    next();
}
