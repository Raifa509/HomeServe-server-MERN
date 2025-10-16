//import all installed libraries

require('dotenv').config()
const express=require('express')
const cors=require('cors')


//create server
const homeserveServer=express()


//enable cors
homeserveServer.use(cors())

//parse json
homeserveServer.use(express.json())

const PORT=3000

homeserveServer.listen(PORT,()=>{
    console.log(`HomeServe server started at Port: ${PORT} ,waiting for client request!!!`);
})


homeserveServer.get('/',(req,res)=>{
    res.status(200).send(`<h2>HomeServe server started...</h2>`)
})