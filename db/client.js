import {Client} from 'pg';
import dotenv from 'dotenv';
dotenv.config();

console.log(process.env.DATABASE_URL)
const client = new Client({connectionString: process.env.DATABASE_URL})

export default client;