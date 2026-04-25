import { Pool } from "pg";
import dotenv from 'dotenv';

dotenv.config();    

const pool = new Pool({
    user: "postgres",
    host: "localhost",
    database: "doculex_db",
    password: "987432",
    port: 5432,
});

pool.connect()
.then(()=>{
    console.log("Pool connected!");
    // console.log("Pool connected!",pool);
})
.catch(()=>{
    console.log("Pool not connected!");
})


export default pool;
