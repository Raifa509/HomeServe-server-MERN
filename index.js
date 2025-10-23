//import all installed libraries

require('dotenv').config()
const express=require('express')
const cors=require('cors')
const router=require('./routing/router')
require('./database/connection')


//create server
const homeserveServer=express()

//enable cors
homeserveServer.use(cors())

//parse json
homeserveServer.use(express.json())


//route
homeserveServer.use(router)

//for static files
homeserveServer.use('/uploads',express.static('./uploads'))

const PORT=3000

homeserveServer.listen(PORT,()=>{
    console.log(`HomeServe server started at Port: ${PORT} ,waiting for client request!!!`);
})


homeserveServer.get('/',(req,res)=>{
    res.status(200).send(`<h2>HomeServe server started...</h2>`)
})

// homeserveServer.post('/',(req,res)=>{
//         res.status(200).send(`POST request SUCCESS`)
// })
