import jwt from 'jsonwebtoken'
import { JwtObj} from '../type'
import debug from 'debug'
const log = debug('app:log')







log("start jwt")
const createJwt =  (data:JwtObj,types: "access_token" | "refresh_token" | "security_token") =>{

   const access_token = process.env.access_token as string
   const refresh_token = process.env.refresh_token as string
   const security_token = process.env.security_token as string

   if(!access_token || !refresh_token || !security_token){
       throw new Error('env variables not found')
   }
   let token:string
   let expire:string

  


 try{
    if(types === "access_token"){
        token = access_token
        expire = "1d"
       
        
       } else if(types === "refresh_token"){
       token = refresh_token
        expire = "7d"
      
       } else if(types === "security_token"){
        token = security_token
         expire = "1h"
        
    
       } else {
        throw new Error('Invalid token type');
        
      }


    return  jwt.sign({data},token,{expiresIn:expire})

 }catch(error){
    console.log(error)
    throw error;
 }



}

log("end jwt")

export default createJwt

