const express=require('express')
require('dotenv').config()
const { MongoClient, ServerApiVersion } = require('mongodb');
const cors=require('cors')
const app=express()
const port=process.env.PORT || 5000

//middleware
app.use(cors())
app.use(express.json())
const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@cluster0.e4gyv.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0`;
// const uri = "mongodb+srv://CRUD_COFFEE_SERVER:xIZ8O8QZgq6P7COY@cluster0.e4gyv.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0";

// Create a MongoClient with a MongoClientOptions object to set the Stable API version
const client = new MongoClient(uri, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  }
});

async function run() {
  try {
    // Connect the client to the server	(optional starting in v4.7)
    await client.connect();
   
const CoffeeCollection=client.db("Coffee_DB").collection('coffees');
    
app.post('/coffees',async(req,res)=>{
    const newCoffees=req.body;
    const result=await CoffeeCollection.insertOne(newCoffees);
    res.send(result);

})

app.get('/coffees',async(req,res)=>{
    const cursor=CoffeeCollection.find();
    const result=await cursor.toArray();
    res.send(result);
})



    // Send a ping to confirm a successful connection
    await client.db("admin").command({ ping: 1 });
    console.log("Pinged your deployment. You successfully connected to MongoDB!");
  } finally {
    // Ensures that the client will close when you finish/error
    // await client.close();
  }
}
run().catch(console.dir);




app.get("/",(req,res)=>{
    res.send("Coffe Crud Server is runninng")
})

app.listen(port,()=>{
    console.log(`Coffee Server is running on port ${port}`)
})

// xIZ8O8QZgq6P7COY
//CRUD_COFFEE_SERVER