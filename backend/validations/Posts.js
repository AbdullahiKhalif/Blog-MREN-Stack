import Joi from 'joi'
export const validationPostRegistration = async(req, res, next) =>{
    const schema = Joi.object({
        title: Joi.string().min(5).max(250).required(),
        content: Joi.string().min(5).required()
    });

    const {error} = schema.validate(req.body);

    if(error){
        return res.status(400).send({status:false, message: error.details[0].message})
    }
    next();
}