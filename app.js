import express from 'express';
import cookieParser from 'cookie-parser';
import usersRouter from './api/users.js';
import productsRouter from './api/products.js';
import ordersRouter from './api/orders.js';
import cors from "cors";

const app = express();

app.use(express.json());
app.use(cookieParser());
app.use(cors({origin:["http://localhost:5174", "http://localhost:5173"]}))

app.use('/users', usersRouter);
app.use('/products', productsRouter);
app.use('/orders', ordersRouter);

app.use((err, req, res, next) => {
  console.error(err);
  res.status(500).send("Sorry! Something went wrong");
});


export default app;
