import express, { NextFunction } from 'express'
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
import UAParser from 'ua-parser-js'
import { rateLimit } from 'express-rate-limit'
dotenv.config()
const app = express()

connectDb()
const limiter = rateLimit({
	windowMs: 15 * 60 * 1000, 
	limit: 50, 
	standardHeaders: true, 
	legacyHeaders: false, 
  message: 'Too many requests from this IP, please try again in an hour!',
})
const botPatterns = [
  
  /bot/i,
  /crawl/i,
  /spider/i,
  /search/i,
  /robot/i,
  /archive/i,

  
  /slackbot/i,
  /googlebot/i,
  /bingbot/i,
  /facebookexternalhit/i,
  /twitterbot/i,
  /instagram/i,
  /pinterest/i,
  /linkedinbot/i,

 
  /HTTrack/i,
  /Wget/i,
  /curl/i,
  /Python-requests/i,
  /Scrapy/i,

 
  /BingPreview/i, 
  /MSNbot/i, 
  /YandexBot/i, 
  /MJ12bot/i, 
  /Exabot/i, 
  /Jyxobot/i 
];

const log = debug('app:log')
app.use(cors({
  
  credentials:true,
  
}))
app.use(limiter)
app.use(helmet());
app.use(morgan('dev'))
app.use(express.json())
app.use(express.urlencoded({ extended: true }))

log('hello world')
app.use('/', async(req:Request,res:Response,next:NextFunction)=>{
  const head = req.headers["user-agent"] || ''
  const ua = new UAParser(head)
  const isBot = botPatterns.some(pattern => pattern.test(head));
   try{
    if (isBot || ua.getDevice().type === "bot") {
     
      return res.status(
        423
      ).send('bot detected');
      
       
    } else {
      console.log(ua.getResult().browser.name);
      next();
      return;
    
      
    }

   }catch(err:any){
    return res.status(500).send("error something happened")
   }

})
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


