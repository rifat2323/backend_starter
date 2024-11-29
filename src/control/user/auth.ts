import { createUsers, loginJoiSchema } from "../../joiType";
import User from "../../models/User";
import { Request,Response } from "express"
import sanitizeHtml from "sanitize-html"
import bcrypt from "bcrypt";
import  createJwt  from "../../funcations/CreateJwt";


/**
 * @description login user with email and password
 * @param {Request} req - request object
 * @param {Response} res - response object
 * @returns {Promise<void>}
 * @throws {Error} - if any error occurs
 */
   export const LoginUserFn = async (req: Request, res: Response) => {
    try {
       
        const email = sanitizeHtml(req.query.email as string);
        const password = sanitizeHtml(req.query.password as string);
        if(!email || !password){
             res.status(400).send("All fields are required")
             return
        }

       
        const { error, value } = loginJoiSchema.validate({ email, password });
        if (error) {
             res.status(400).send(error?.message);
             return
        }

       
        const findUser = await User.findOne({ email: value.email }).lean();
        if (!findUser ) {
             res.status(404).send("User not found");
            return
        }

      
        const isMatch = await bcrypt.compare(value.password, findUser.password);
        if (!isMatch) {
           res.status(404).send("Password does not match");
           return
        }

       
        const [access_token, refresh_token] = await Promise.all([
            createJwt({ user_id: findUser._id }, "access_token"),
            createJwt({ user_id: findUser._id }, "refresh_token")
        ]);

     
        res.cookie("access_token", access_token, { maxAge: 1000 * 60 * 60 * 24,httpOnly:true,sameSite:"none",secure:true });
        res.cookie("refresh_token", refresh_token, { maxAge: 1000 * 60 * 60 * 24,httpOnly:true,sameSite:"none",secure:true });
          res.status(200).json({ login: true, cookieSend: true });
          return

    } catch (error: any) {
         res.status(500).send(error.message);
         return
    }
};


/**
 * @description Create a new user
 * @param {Request} req - request object
 * @param {Response} res - response object
 * @returns {Promise<void>}
 * @throws {Error} - if any error occurs
 */
export const createUser = async (req:Request, res:Response) => {
    
   
    const name =sanitizeHtml( req.body.name as string)
    const email = sanitizeHtml(req.body.email as string)
    const password =sanitizeHtml( req.body.password as string)
    if(!name || !email || !password){
         res.status(400).send("All fields are required")
         return
    }
     
    const {error,value} = createUsers.validate({name,email,password})
    if(error){
         res.status(400).send(error?.message)
         return
    }

 try{

    const [findUser, hashedPassword] = await Promise.all([
        User.findOne({ email: value.email }).lean(),
        bcrypt.hash(value.password, 8) 
    ]);
    if(findUser){
         res.status(400).send("User already exist")
         return
    }
  
    const create = await User.create({
        name:value.name,
        email:value.email,
        password:hashedPassword
    })
     res.status(200).json(create)
     return

 }catch(error){
    console.log(error)
     res.status(500).send(error)
     return
 }

}









