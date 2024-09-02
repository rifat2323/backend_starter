# 💣 How to Start
here is some command for you
```bash
npm run dev
#for dev mode
npm run build
#for build  
npm run start
# run the build file
npm run test
# test the api endpoint
```


# 🚀 **Backend Starter Project** with TypeScript

Welcome to your backend starter project! This setup uses TypeScript and several key libraries to help you get started quickly with a robust backend.

## 📦 **Dependencies**

Here's a list of the libraries used in this project:

- **Express**: Fast, unopinionated, minimalist web framework for Node.js. 🌐
- **Mongoose**: MongoDB object modeling tool designed to work in an asynchronous environment. 📊
- **TypeScript**: Superset of JavaScript that adds static types. 🔍
- **Joi**: Schema description language and data validator for JavaScript. ✅
- **bcrypt**: Library to hash passwords. 🔒
- **jsonwebtoken**: JSON Web Token implementation. 🛡️
- **morgan**: HTTP request logger middleware. 📝
- **debug**: Tiny JavaScript debugging utility. 🕵️
- **dotenv**: Loads environment variables from a `.env` file. 📄
- **cors**: Middleware for Cross-Origin Resource Sharing. 🔄
- **helmet**: Helps secure your Express apps by setting various HTTP headers. 🛡️
- **sanitize-html**: Sanitizes HTML to prevent XSS attacks. 🛠️

## 📂 **Project Structure**

### `index.ts`

The entry point of the application, where the Express server is set up and middleware is configured.

```typescript
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

 ...
```

# 🤖 bot detection

```javascript
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

```
# funcation for bot
```typescript
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
```


# 🧪 test
 test command
  ```bash
  npm run test
  ```
