import app from "./app.js";
import client from "./db/client.js";
import cookieParser from 'cookie-parser';
import authRouter from './routes/auth.js';
const PORT = process.env.PORT ?? 3000;

await client.connect();

app.listen(PORT, () => {
    console.log(`Listening on port ${PORT}`)
    
    const app = express();
app.use(express.json());
app.use(cookieParser());
app.use('/auth', authRouter);

});