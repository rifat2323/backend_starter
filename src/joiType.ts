import joi from 'joi'

export const loginJoiSchema = joi.object({
 email:joi.string().email({allowUnicode:true}).required(),
 password:joi.string().min(8).required()


})
export const createUsers = joi.object({
 email:joi.string().email({allowUnicode:true}).required(),
 password:joi.string().min(8).required(),
 name:joi.string().min(3).max(20).trim().required()


})