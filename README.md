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
import express from 'express';
import { Request, Response } from 'express';
import morgan from 'morgan';
import debug from 'debug';
import * as dotenv from 'dotenv';
import connectDb from './db/connectDb';
import createJwt from './functions/CreateJwt';
import cors from 'cors';
import helmet from "helmet";
import mongoose from 'mongoose';
import { LoginUserFn, createUser } from './control/user/auth';

dotenv.config();
const app = express();

connectDb();

const log = debug('app:log');
app.use(cors({
  credentials: true,
}));
app.use(helmet());
app.use(morgan('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

log('hello world');

app.get('/', async (_req: Request, res: Response) => {
  try {
    const l = createJwt({ user_id: "1" }, 'security_token');
    return res.status(200).send(l);
  } catch (error) {
    console.log(error);
    return res.status(500).send("hello");
  }
});

app.post('/createuser', createUser);
app.get('/login', LoginUserFn);

log('hello world2');

mongoose.connection.on("open", () => {
  console.log("connected to db");
  app.listen(3000, () => {
    console.log('Listening on port 3000');
  });
});

```


# 🧪 test
 test command
  ```bash
  npm run test
  ```
