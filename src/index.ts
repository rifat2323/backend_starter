import express from 'express'
import { Request,Response } from 'express'
import morgan from 'morgan'
import debug from 'debug'
import * as dotenv from 'dotenv'
import connectDb from './db/connectDb'
import createJwt from './funcations/CreateJwt'
import cors from 'cors'
import helmet from "helmet";

import mongoose from 'mongoose'
import { LoginUserFn,createUser } from './control/user/auth'
dotenv.config()
const app = express()

connectDb()

const log = debug('app:log')
app.use(cors({
  
  credentials:true,
  
}))
app.use(helmet());
app.use(morgan('dev'))
app.use(express.json())
app.use(express.urlencoded({ extended: true }))

log('hello world')
app.get('/', async(_req:Request,res:Response)=>{
  try{
   const l=  createJwt({user_id:"1"},'security_token')
     return res.status(200).send(l)
  }catch(error){
    console.log(error)
    return res.status(500).send("hello")
  }
})

app.post('/createuser',createUser )
app.get('/login',LoginUserFn )


log('hello world2')








mongoose.connection.on("open",()=>{
  console.log("connected to db")
  app.listen(3000, () => {
    console.log('Listening on port 3000')
  })

})


