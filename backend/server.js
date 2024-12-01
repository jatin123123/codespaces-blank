const http=require('http');
const app = require('./app');
const PORT=process.env.PORT || 3000;
const server=http.createServer(app);

const dbConnect=require("./config/db");

dbConnect();

server.listen(PORT,()=>console.log(`App is runing on localhost:${PORT}`));