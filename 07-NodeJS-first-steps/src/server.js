import http from 'node:http';
import {loadEnvFile} from 'node:process';
import {handleRoutes} from './routes.js';

loadEnvFile()
const PORT = process.env.PORT ?? 3000;

const server = http.createServer(handleRoutes);

server.listen(PORT,()=>{
    console.log("Server is running on port", PORT)
})