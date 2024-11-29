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
import cookieParser from 'cookie-parser'

const app = express()
dotenv.config()
app.use(cors({
  origin:process.env.CLIENT_URL,

  
  credentials:true,
  
}))


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

app.use(cookieParser())
app.use(limiter)
app.use(helmet());
app.use(morgan('dev'))
app.use(express.json())
app.use(express.urlencoded({ extended: true }))

log('hello world')
app.use('/', async (req: Request, res: Response, next: NextFunction) => {
  const head = req.headers['user-agent'] || '';
  const ua =  UAParser.UAParser(head)
  const isBot = botPatterns.some((pattern) => pattern.test(head));

  try {
    if (isBot || ua.device.type === undefined) {
      res.status(423).send('bot detected');
      return
    } else {
      console.log(ua.browser.name);
      next(); // Move to the next middleware
    }
  } catch (err: any) {
    res.status(500).send('error something happened');
  }
});

app.get('/', async(_req:Request,res:Response)=>{
  try{
   const l=  createJwt({user_id:"1"},'security_token')
      res.status(200).send(l)
      return
  }catch(error){
    console.log(error)
     res.status(500).send("hello")
     return
  }
})

app.post('/createuser',createUser )
app.get('/login',LoginUserFn )
app.get('/check',(req:Request,res:Response)=>{
  const cookie  = req.cookies
  console.log(cookie)
 try{
   res.status(200).send(cookie)
   return

 }catch(error){
  console.log(error)
   res.status(500).send(error)
   return
 }

})


log('hello world2')








mongoose.connection.on("open",()=>{
  console.log("connected to db")
  app.listen(80, () => {
    console.log('Listening on port 3000')
  })

})


