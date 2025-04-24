import express from "express";
import dotenv from "dotenv";
import connectViaMongoose from './DB-utilis/mongoose.js';
import registerRouter from './routes/register.js';
import loginRouter from './routes/login.js';
import cors from "cors"
import productRouter from "./routes/products.js";
import jwt from "jsonwebtoken";
import orderRouter from "./routes/order.js";


const app = express();

app.use(express.json());

app.use(cors());

const logger = (req, res, next) => {
    console.log(new Date().toString(), req.method, req.url);
    next();
}

app.use(logger);

dotenv.config();

await connectViaMongoose();

// Use the routers
app.use("/register", registerRouter);
app.use("/login", loginRouter);

const tokenVerify = (req, res, next) => {
    const token = req.headers["authorization"];
    try {
       jwt.verify(token, process.env.JWT_SECRET); 
       next();
    } catch(error) {
        res.status(401).json({ msg: error.message })
    }
}
app.use("/products",tokenVerify, productRouter);

app.use("/order", tokenVerify, orderRouter);

const port = 4090;

app.listen(port, () => {
  console.log(Date().toString(), `Server is running on http://localhost:${port}`);
});
