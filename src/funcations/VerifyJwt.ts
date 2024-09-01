import jwt from 'jsonwebtoken'

import debug from 'debug'
const log = debug('app:log')

log("verify  jwt")

const verifyJwt = (userToken:string,types: "access_token" | "refresh_token" | "security_token") => {
    const access_token = process.env.access_token as string
    const refresh_token = process.env.refresh_token as string
    const security_token = process.env.security_token as string
 
    if(!access_token || !refresh_token || !security_token){
        throw new Error('env variables not found')
    } 
    let token:string
    if(types === "access_token"){
        token = access_token
        
       
        
       } else if(types === "refresh_token"){
       token = refresh_token
        
      
       } else if(types === "security_token"){
        token = security_token
        
        
    
       } else {
        throw new Error('Invalid token type');
        
      }
   
 const s =   jwt.verify(userToken,token, (err:any, decoded:any) => {

       if(err || undefined){
        throw new Error('Invalid token')
       }
       return decoded

   })
   return s


}
log(" end verify  jwt")
export default verifyJwt