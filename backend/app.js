import path from 'path'
import express from 'express';
import { port } from './config/config.js';
import chalk from 'chalk';
import connectDB from './config/db.js';
import userRouter from './routes/Users.js';
import postRouter from './routes/Post.js';
import cookieParser from 'cookie-parser';
import { authenticate } from './middleWares/authMiddleWare.js';
import morgan from 'morgan';
import cors from 'cors'
import { rateLimit } from 'express-rate-limit';
import helmet from 'helmet'
import { customError } from './utill/cutomError.js';
connectDB()
const app = express();
app.use(express.json());
var whitelist = ['http://localhost:8000', 'http://localhost:5173']
var corsOptionsDelegate = function (req, callback) {
  var corsOptions;
  if (whitelist.indexOf(req.header('Origin')) !== -1) {
    corsOptions = { origin: true } // reflect (enable) the requested origin in the CORS response
  } else {
    corsOptions = { origin: false } // disable CORS for this request
  }
  callback(null, corsOptions) // callback expects two parameters: error and options
}
app.use(cors(corsOptionsDelegate))
app.use(cookieParser())
app.use(morgan("dev"))

var apiRateLimit = rateLimit({
    windowMs: 15 * 60 * 1000, // 15 minites
    max: 100,
    message: {
        status: "failed",
        message: `Rate Limted Please Wait After ${(15 * 60 * 1000) / 60 / 1000} minites`
    }
})
app.use(apiRateLimit)
app.use(helmet())
const PORT = port || 8000

app.use('/api/v1/users', userRouter)
app.use('/api/v1/test', authenticate, userRouter)
app.use('/api/v1/posts', postRouter)

if(process.env.NODE_ENV == "production"){
  const __dirname = path.resolve();
  app.use(express.static(path.join(__dirname, "/frontend/dist")));

  app.use('*', (req, res) => {
    res.sendFile(path.resolve(__dirname, 'frontend', 'dist', 'index.html'))
  })
}else{
  app.get('/api', (req, res) =>{
    res.send('Api is Running...')
  })
}

app.use((req,res,next) => {
    next(customError(404, `${req.originalUrl} The request you're looking for isn't Found ❌`));
});

app.use((error, req, res, next) =>{
    const status= error.status || 500;
    const message = error.message || "Internal Server Error.."
    res.status(status).send(message)
})

app.listen(PORT, () => {
    console.log(`${chalk.yellow.bold('Server')} is listening on ${chalk.green.bold(PORT)}`)
});
