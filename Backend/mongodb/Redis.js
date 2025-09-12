import dotenv from "dotenv"
import Redis from "ioredis"
dotenv.config()
const redisdatadb = new Redis(process.env.REDIS_URLS);
console.log(redisdatadb)
 export default redisdatadb