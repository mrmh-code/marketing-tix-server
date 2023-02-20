const express = require('express');
const cors = require('cors');
const { MongoClient, ServerApiVersion, ObjectId } = require('mongodb');
require("dotenv").config();
const app=express();
const port =process.env.PORT || 5000

//set middleware 
app.use(cors())
app.use(express.json())

 



const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASSWORD}@cluster0.ju9ubme.mongodb.net/?retryWrites=true&w=majority`;
const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true, serverApi: ServerApiVersion.v1 });

async function run(){
    try{
        
        const userCollection=client.db('projects');
        const projectPlane=userCollection.collection('plan')
        
        app.get('/plan', async(req,res)=>{
            const query={};
            const cursor=projectPlane.find(query);
            const user=await cursor.toArray();
            res.send(user);
        })

       
        app.get('/plan/:id', async (req,res)=>{
            const id=req.params.id;
            const query={_id:new ObjectId(id)};
            const user=await projectPlane.findOne(query);
            res.send(user);
        })
    }
    finally{

    }
}
run().catch(err => console.log(err))


app.get('/',(req,res)=>{
    res.send('start node ......')
})



app.listen(port, ()=>{
    console.log(`listen from ${port}`)
})